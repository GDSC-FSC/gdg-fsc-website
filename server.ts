/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { spawn } from 'node:child_process';
import { generateKeyPairSync } from 'node:crypto';
import fs from 'node:fs';
import { bearer } from '@elysiajs/bearer';
import { cors } from '@elysiajs/cors';
import { opentelemetry, record } from '@elysiajs/opentelemetry';
import { serverTiming } from '@elysiajs/server-timing';
import { swagger } from '@elysiajs/swagger';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import type { SocketAddress } from 'bun';
import { Elysia } from 'elysia';
import { ip } from 'elysia-ip';
import { DefaultContext, type Generator, rateLimit } from 'elysia-rate-limit';
import { elysiaHelmet } from 'elysiajs-helmet';
import jwt from 'jsonwebtoken';
import logixlysia from 'logixlysia';
import { app as application } from './src/constants';
import { Stringify } from './src/utils';
import { logger } from "./shared/utils";

/**
 * Generates a unique identifier for rate limiting based on the request's IP address.
 */
const ipGenerator: Generator<{ ip: SocketAddress }> = (_r, _s, { ip }) => ip?.address ?? 'unknown';

/**
 * The current application version, loaded from package.json.
 */
const version: string =
  (await import('./package.json').then((t) => t.version).catch(console.error)) || 'N/A';

/**
 * Checks if Docker is running on the system.
 */
const checkDocker = async (): Promise<boolean> => {
  try {
    const { stdout } = await Bun.$`systemctl is-active docker`;
    return stdout.toString().trim() === 'active';
  } catch (error) {
    logger.error('Docker is not running or systemctl command failed:', error);
    return false;
  }
};

/**
 * Starts a Jaeger tracing container using Docker.
 * Logs output to ./logs/jaeger.log.
 */
const runJaeger = (): void => {
  const [out, err] = Array(2).fill(fs.openSync('./logs/jaeger.log', 'a'));

  const jaeger = spawn(
    'docker',
    [
      'run',
      '--rm',
      '--name',
      'jaeger',
      '-p',
      '5778:5778',
      '-p',
      '16686:16686',
      '-p',
      '4317:4317',
      '-p',
      '4318:4318',
      '-p',
      '14250:14250',
      '-p',
      '14268:14268',
      '-p',
      '9411:9411',
      'jaegertracing/jaeger:2.1.0',
    ],
    {
      detached: true,
      stdio: ['ignore', out, err],
    },
  );

  jaeger.unref();
};

/**
 * Middleware for timing and logging the duration of each request.
 */
const timingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) =>
    logger.info(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
  );

/**
 * The secret used for signing and verifying JWT tokens.
 */
const JWT_SECRET: string = process.env.JWT_SECRET || 'dev_secret';

/**
 * Authentication route for registering a new user.
 * Generates an RSA key pair and returns a JWT and the private key.
 */
const authRoute = new Elysia().post('/auth/register', () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  const token = jwt.sign({ pub: publicKey.export({ type: 'pkcs1', format: 'pem' }) }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 30,
  });

  return {
    token,
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
  };
});

/**
 * Middleware to require JWT Bearer authentication.
 */
const requireAuth = new Elysia().use(bearer()).derive(({ bearer }) => {
  if (!bearer) throw new Error('Missing Bearer token');
  try {
    const payload = jwt.verify(bearer, JWT_SECRET) as { pub: string };
    return { publicKey: payload.pub };
  } catch {
    throw new Error('Invalid or expired token');
  }
});

/**
 * Utility routes for root, status, version, info, and health endpoints.
 */
const utilityRoute = new Elysia()
  .use(timingMiddleware)
  .get(
    '/',
    () =>
      record('root.get', () => {
        return Stringify({
          message: `Welcome to the ${application.name} API. Don't be naughty >:(`,
          status: 200,
        });
      }),
    {
      detail: {
        summary: 'Root endpoint',
        description: 'Welcome message for the API',
        tags: ['Utility'],
      },
    },
  )
  .head(
    '/',
    ({ set }) =>
      record('root.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Root HEAD',
        description: 'HEAD for root endpoint',
        tags: ['Utility'],
      },
    },
  )
  .options(
    '/',
    () =>
      record('root.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Root OPTIONS',
        description: 'CORS preflight for root',
        tags: ['Utility'],
      },
    },
  )
  .get(
    '/status',
    async () =>
      record('status.get', async () => {
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();
        const appVersion = version;
        return Stringify({
          message: 'Application status',
          status: 200,
          data: {
            uptime: `${uptime.toFixed(2)} seconds`,
            memory: {
              rss: `${(memoryUsage.rss / 1_024 / 1_024).toFixed(2)} MB`,
              heapTotal: `${(memoryUsage.heapTotal / 1_024 / 1_024).toFixed(2)} MB`,
              heapUsed: `${(memoryUsage.heapUsed / 1_024 / 1_024).toFixed(2)} MB`,
              external: `${(memoryUsage.external / 1_024 / 1_024).toFixed(2)} MB`,
            },
            version: appVersion,
            environment: process.env.NODE_ENV || 'development',
          },
        });
      }),
    {
      detail: {
        summary: 'Get application status',
        description: 'Returns uptime, memory usage, version, and environment',
        tags: ['Utility'],
      },
    },
  )
  .head(
    '/status',
    ({ set }) =>
      record('status.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Status HEAD',
        description: 'HEAD for status endpoint',
        tags: ['Utility'],
      },
    },
  )
  .options(
    '/status',
    () =>
      record('status.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Status OPTIONS',
        description: 'CORS preflight for status',
        tags: ['Utility'],
      },
    },
  )
  .get(
    '/version',
    async () =>
      record('version.get', async () => {
        const appVersion = version;
        return Stringify({
          version: appVersion,
          status: 200,
        });
      }),
    {
      detail: {
        summary: 'Get API version',
        description: 'Returns the current API version',
        tags: ['Info'],
      },
    },
  )
  .head(
    '/version',
    ({ set }) =>
      record('version.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Version HEAD',
        description: 'HEAD for version endpoint',
        tags: ['Info'],
      },
    },
  )
  .options(
    '/version',
    () =>
      record('version.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Version OPTIONS',
        description: 'CORS preflight for version',
        tags: ['Info'],
      },
    },
  )
  .get(
    '/info',
    () =>
      record('info.get', () => {
        return Stringify({
          message: `Information about the ${application.name} API`,
          status: 200,
          data: {
            contact: `${application.email}`,
            documentationUrl: 'https://docs.your-api.com',
          },
        });
      }),
    {
      detail: {
        summary: 'Get API info',
        description: 'Returns information about the API',
        tags: ['Info'],
      },
    },
  )
  .head(
    '/info',
    ({ set }) =>
      record('info.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Info HEAD',
        description: 'HEAD for info endpoint',
        tags: ['Info'],
      },
    },
  )
  .options(
    '/info',
    () =>
      record('info.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Info OPTIONS',
        description: 'CORS preflight for info',
        tags: ['Info'],
      },
    },
  )
  .get(
    '/health',
    async () =>
      record('health.get', () => {
        return Stringify({ message: 'ok', status: 200 });
      }),
    {
      detail: {
        summary: 'Health check',
        description: 'Returns ok if the API is healthy',
        tags: ['Health'],
      },
    },
  )
  .head(
    '/health',
    ({ set }) =>
      record('health.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Health HEAD',
        description: 'HEAD for health endpoint',
        tags: ['Health'],
      },
    },
  )
  .options(
    '/health',
    () =>
      record('health.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Health OPTIONS',
        description: 'CORS preflight for health',
        tags: ['Health'],
      },
    },
  );

/**
 * Protected route that requires authentication.
 */
const protectedRoute = new Elysia()
  .use(requireAuth)
  .get(
    '/example',
    (ctx: { publicKey: string }) =>
      record('protected.example.get', () => {
        return Stringify({
          message: 'You have access!',
          yourPublicKey: ctx.publicKey,
        });
      }),
    {
      detail: {
        summary: 'Protected Example',
        description: 'An example endpoint that requires authentication',
        tags: ['Protected'],
      },
    },
  )
  .head(
    '/example',
    ({ set }) =>
      record('protected.example.head', () => {
        set.status = 200;
        return;
      }),
    {
      detail: {
        summary: 'Protected Example HEAD',
        description: 'HEAD for protected example endpoint',
        tags: ['Protected'],
      },
    },
  )
  .options(
    '/example',
    () =>
      record('protected.example.options', () => {
        return Stringify({
          message: 'CORS preflight response',
          status: 204,
          allow: 'GET,OPTIONS,HEAD',
        });
      }),
    {
      detail: {
        summary: 'Protected Example OPTIONS',
        description: 'CORS preflight for protected example',
        tags: ['Protected'],
      },
    },
  );

/**
 * OpenTelemetry resource for Jaeger tracing.
 */
const otelResource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'elysia-api',
});

/**
 * OTLP trace exporter for sending traces to Jaeger.
 */
const otlpExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
  keepAlive: true,
});

/**
 * Batch span processor for OpenTelemetry.
 */
const batchSpanProcessor = new BatchSpanProcessor(otlpExporter, {
  maxExportBatchSize: 512,
  scheduledDelayMillis: 5_000,
  exportTimeoutMillis: 30_000,
  maxQueueSize: 2_048,
});

/**
 * Content Security Policy and permissions constants for Helmet.
 */
const permission = {
  SELF: "'self'",
  UNSAFE_INLINE: "'unsafe-inline'",
  HTTPS: 'https:',
  DATA: 'data:',
  NONE: "'none'",
  BLOB: 'blob:',
} as const;

/**
 * Main API application instance with all middleware and routes.
 */
const api = new Elysia({ prefix: '/api/v1' })
  .trace(async ({ onBeforeHandle, onAfterHandle, onError }) => {
    onBeforeHandle(({ begin, onStop }) => {
      onStop(({ end }) => {
        logger.info('BeforeHandle took', {
          '⏰': `${end - begin}ms`,
        });
      });
    });
    onAfterHandle(({ begin, onStop }) => {
      onStop(({ end }) => {
        logger.info('AfterHandle took', {
          '⏰': `${end - begin}ms`,
        });
      });
    });
    onError(({ begin, onStop }) => {
      onStop(({ end, error }) => {
        logger.error(`Error occurred after ${end - begin}ms`, error);
      });
    });
  })
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: 'simple',
        timestamp: {
          translateTime: 'yyyy-mm-dd HH:MM:ss.SSS',
        },
        logFilePath: './logs/server.log',
        ip: true,
        customLogFormat: '🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}',
      },
    }),
  )
  .use(
    elysiaHelmet({
      csp: {
        defaultSrc: [permission.SELF],
        scriptSrc: [permission.SELF, permission.UNSAFE_INLINE],
        styleSrc: [permission.SELF, permission.UNSAFE_INLINE],
        imgSrc: [permission.SELF, permission.DATA, permission.HTTPS],
        useNonce: true,
      },
      hsts: {
        maxAge: 31_536_000,
        includeSubDomains: true,
        preload: true,
      },
      frameOptions: 'DENY',
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: {
        camera: [permission.NONE],
        microphone: [permission.NONE],
      },
    }),
  )
  .use(ip())
  .use(
    opentelemetry({
      resource: otelResource,
      spanProcessors: [batchSpanProcessor],
    }),
  )
  .use(
    serverTiming({
      trace: {
        request: true,
        parse: true,
        transform: true,
        beforeHandle: true,
        handle: true,
        afterHandle: true,
        error: true,
        mapResponse: true,
        total: true,
      },
    }),
  )
  .use(
    cors({
      origin: application.url,
      methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
      exposeHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86_400,
      credentials: true,
    }),
  )
  .use(
    rateLimit({
      duration: 60_000,
      max: 100,
      headers: true,
      scoping: 'scoped',
      countFailedRequest: true,
      errorResponse: new Response(
        Stringify({
          error: 'Too many requests',
        }),
        { status: 429 },
      ),
      generator: ipGenerator,
      context: new DefaultContext(10_000),
    }),
  )
  .use(authRoute)
  .use(requireAuth)
  .use(protectedRoute)
  .use(utilityRoute)
  .onError(({ code, error, set }) => {
    logger.error(Stringify({ ERROR: error }));
    set.status = code === 'NOT_FOUND' ? 404 : 500;
    return Stringify({
      error: Error.isError?.(error) ? Stringify({ error }) : Stringify({ error }),
      status: set.status,
    });
  });

/**
 * Root application instance, includes Swagger documentation and the main API.
 */
const root = new Elysia()
  .use(
    swagger({
      path: '/swagger',
      documentation: {
        info: {
          title: '🦊 Elysia Advanced API',
          version: '1.0.0',
          description: `\nWelcome to the **Elysia Advanced API**! \nThis API demonstrates advanced features including authentication, \nsecurity, observability, and more.\n\n- 🚀 **Fast** and modern API with [ElysiaJS](https://elysiajs.com)\n- 🔒 Security best practices (Helmet, Rate Limiting, CORS)\n- 📊 Observability (OpenTelemetry, Jaeger)\n- 📝 Auto-generated OpenAPI docs\n\n> **Contact:** [Your Name](mailto:${application.email})  \n> **Docs:** [API Docs](https://docs.your-api.com)
          `,
          termsOfService: 'https://your-api.com/terms',
          contact: {
            name: 'API Support',
            url: 'https://your-api.com/support',
            email: application.email,
          },
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
          },
        },
        externalDocs: {
          description: 'Find more info here',
          url: 'https://github.com/your-org/your-repo',
        },
        tags: [
          {
            name: 'Utility',
            description: 'Endpoints for status, version, and root  API info.',
          },
          {
            name: 'Health',
            description: 'Health check endpoints for uptime  monitoring.',
          },
          {
            name: 'Info',
            description: 'General API information endpoints.',
          },
          {
            name: 'Protected',
            description: 'Endpoints that require authentication  (JWT Bearer).',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'Enter your JWT Bearer token to access  protected endpoints.',
            },
          },
        },
      },
    }),
  )
  .use(api)
  .listen(3_000);

export type API = typeof api;

const shutdown = async (): Promise<void> => {
  logger.info('Shutting down 🦊 Elysia');
  await batchSpanProcessor.forceFlush();
  await root.stop();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);

const initializeJaeger = async (): Promise<void> => {
  if (await checkDocker()) {
    logger.info('Docker is running. Checking for Jaeger container...');
    try {
      await Bun.$`docker inspect -f {{.State.Running}} jaeger`.text();
      logger.info('Jaeger container is already running.');
    } catch {
      logger.info('Jaeger container not found or not running. Starting Jaeger...');
      runJaeger();
    }
  } else {
    logger.error('Docker is not running. Please start Docker to use Jaeger tracing.');
    process.exit(1);
  }

  logger.info(`🦊 Elysia is running at ${root.server?.hostname}:${root.server?.port}`);
};

process.env.MODE === 'development' && require.main === module && initializeJaeger();
