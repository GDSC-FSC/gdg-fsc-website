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

import { vCache } from '@raegen/vite-plugin-vitest-cache';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import sharp from 'sharp';
import { defineConfig, loadEnv } from 'vite';
import { imagetools } from 'vite-imagetools';
import { comlink } from 'vite-plugin-comlink';
import { compression } from 'vite-plugin-compression2';
import csp from 'vite-plugin-csp-guard';
import Inspect from 'vite-plugin-inspect';
import lqip from 'vite-plugin-lqip';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { logger } from '../../packages/shared/utils/src';
import { app } from './src/constants';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 **/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const env = loadEnv(mode, process.cwd(), '');

  const SENTRY_ORG = env.SENTRY_ORG || env.VITE_SENTRY_ORG;
  const SENTRY_PROJECT = env.SENTRY_PROJECT || env.VITE_SENTRY_PROJECT;
  const SENTRY_AUTH_TOKEN = env.SENTRY_AUTH_TOKEN || env.VITE_SENTRY_AUTH_TOKEN;
  const SENTRY_RELEASE = env.SENTRY_RELEASE || env.VITE_SENTRY_RELEASE;

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@gdg-fsc/utils': path.resolve(
          __dirname,
          '../../packages/shared/dist/utils/src/lib/index.js',
        ),
        '@gdg-fsc/classes': path.resolve(
          __dirname,
          '../../packages/shared/dist/classes/src/index.js',
        ),
        '@gdg-fsc/decorators': path.resolve(
          __dirname,
          '../../packages/shared/dist/decorators/src/index.js',
        ),
        '@gdg-fsc/shared': path.resolve(__dirname, '../../packages/shared/dist/index.js'),
      },
      mainFields: ['browser', 'module', 'main'],
    },
    worker: {
      plugins: () => [comlink()],
    },
    plugins: [
      vCache({
        dir: '.vitest-cache',
        states: ['pass', 'skip'],
        silent: false,
      }),
      imagetools({
        include: '**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
        exclude: 'public/**/*',
        removeMetadata: true,
        cache: {
          enabled: true,
          dir: '.cache/imagetools',
          retention: 604_800,
        },
        defaultDirectives: () => new URLSearchParams({ format: 'webp' }),
        namedExports: true,
      }),
      lqip({
        sharp: {
          resize: {
            width: 64,
            height: 64,
            fit: 'cover',
            kernel: sharp.kernel.lanczos3,
          },
          webp: {
            smartSubsample: true,
            quality: 60,
          },
          blur: 2.5,
        },
      }),
      comlink(),
      csp({
        algorithm: 'sha256',
        dev: {
          // Disabled in dev - CSP breaks Vite HMR, Million Lint, sonner, next-themes
          run: false,
          outlierSupport: ['tailwind'],
        },
        build: {
          sri: true,
          outlierSupport: [],
        },
        policy: {
          'default-src': ["'self'"],
          'script-src': ["'self'", 'https://*.sentry.io', 'https://*.google-analytics.com'],
          'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          'img-src': ["'self'", 'data:', 'https:'],
          'font-src': ["'self'", 'data:', 'https:'],
          'connect-src': ["'self'", 'https:', 'wss:'],
          'frame-src': ["'self'"],
          'worker-src': ["'self'"],
        },
        override: false,
        type: 'SPA',
        features: {
          mpa: false,
          cssInJs: false,
        },
        debug: false,
      }),
      /**
       * @see https://www.npmjs.com/package/vite-tsconfig-paths
       */
      tsconfigPaths({
        projects: ['./tsconfig.json'],
      }),
      /**
       * @see https://www.npmjs.com/package/vite-plugin-inspect
       */
      Inspect({
        build: true,
        outputDir: '.vite-inspect',
      }),
      // Million Lint disabled - causes TypeError with Hono/Elysia backend proxy
      // See: https://github.com/aidenybai/million/issues
      // TODO: Re-enable once Million Lint fixes Hono compatibility
      // MillionLint.vite({
      //   react: '19',
      //   lite: true, // Enable lite mode for faster builds
      //   filter: {
      //     // Limit scope to only your app components
      //     include: '**/components/**/*.{tsx,jsx}',
      //     exclude: '**/node_modules/**/*',
      //   },
      //   optimizeDOM: false, // Disable DOM optimization to reduce complexity
      // }),
      /**
       * @see https://www.npmjs.com/package/vite-plugin-compression2
       */
      compression({
        algorithms: ['brotliCompress', 'gzip'],
        exclude: ['**/*.map', '**/*.gz', '**/*.br'],
        threshold: 10240, // 10KB, adjust as needed
        deleteOriginalAssets: false,
        skipIfLargerOrEqual: true,
        // filename: '[path][base].gz', // Optional: customize output filename
      }),
      /**
       * @see https://www.npmjs.com/package/vite-bundle-analyzer
       */
      // unstableRolldownAdapter(
      //   analyzer({
      //     openAnalyzer: true,
      //     analyzerMode: 'static',
      //   }),
      // ),
      react({
        tsDecorators: true,
        disableOxcRecommendation: true,
      }),
      // Sentry plugin - only enabled when all required env vars are set
      SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN
        ? sentryVitePlugin({
            authToken: SENTRY_AUTH_TOKEN,
            org: SENTRY_ORG,
            project: SENTRY_PROJECT,
            release: {
              // Automatically detect release name or use env override
              name: SENTRY_RELEASE,
              inject: true,
              create: true,
              finalize: true,
            },
            sourcemaps: {
              // Only upload source maps from the dist directory
              assets: 'dist/**/*.map',
              // Ignore node_modules and test files
              ignore: ['**/node_modules/**', '**/*.test.*', '**/*.cy.*'],
            },
            debug: isDevelopment,
            telemetry: true,
            errorHandler: (err) =>
              Error.isError(err)
                ? logger.warn('[sentry-vite-plugin]', { err })
                : logger.warn('[sentry-vite-plugin]', err),
            bundleSizeOptimizations: {
              excludeDebugStatements: true,
              excludeTracing: false,
              excludeReplayShadowDom: true,
              excludeReplayIframe: true,
              excludeReplayWorker: true,
            },
            reactComponentAnnotation: {
              enabled: true,
              ignoredComponents: ['Provider', 'RouterProvider'],
            },
          })
        : false,
      /**
       * @see https://www.npmjs.com/package/vite-plugin-pwa
       */
      VitePWA({
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*'],
          maximumFileSizeToCacheInBytes: (1_024 * 2) ** 2, //
        },
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['**/*'],
      }),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: isDevelopment ? 'http://localhost:3000' : app.url,
          changeOrigin: true,
          // Note: No rewrite needed - backend expects /api/v1 prefix
          secure: !isDevelopment,
          // Increase timeout for slow external API cold starts (Render.com)
          timeout: 60000,
          configure: (proxy) => {
            proxy.on('error', (err, _req, res) => {
              console.error('[Proxy Error]', err.message);
              if (res && 'writeHead' in res) {
                res.writeHead(504, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Proxy timeout', message: err.message }));
              }
            });
          },
        },
      },
    },
    build: {
      minify: true,
      sourcemap: true,
      chunkSizeWarningLimit: (1024 * 2) ** 2, // Increased from default 500kb to 1000kb
      rollupOptions: {
        output: {
          advancedChunks: {
            // groups: [{ name: 'vendor', test: /\/react(?:-dom)?// }]

            groups: [
              {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                minSize: 100_000,
                maxSize: 250_000,
              },
            ],
          },
        },
      },
    },
    ssr: {
      resolve: {
        conditions: ['browser', 'worker', 'worked', 'import'],
      },
      external: ['stream', 'buffer', 'crypto', 'path', 'fs', 'os', 'url'],
    },
  };
});
