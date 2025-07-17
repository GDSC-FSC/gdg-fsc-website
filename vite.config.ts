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

import MillionLint from '@million/lint';
import { vCache } from '@raegen/vite-plugin-vitest-cache';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import sharp from 'sharp';
import { defineConfig } from 'vite';
import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer';
import { imagetools } from 'vite-imagetools';
import { comlink } from 'vite-plugin-comlink';
import { compression } from 'vite-plugin-compression2';
import csp from 'vite-plugin-csp-guard';
import Inspect from 'vite-plugin-inspect';
import lqip from 'vite-plugin-lqip';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { logger } from './interface';
import { defaultStrategy } from './node_modules/@raegen/vite-plugin-vitest-cache/dist/strategy';
import { app } from './src/constants';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 **/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode == 'development';
  return {
    optimizeDeps: {
      include: [],
      exclude: [],
    },
    worker: {
      plugins: () => [comlink()],
    },
    plugins: [
      vCache({
        dir: '.vitest-cache',
        states: ['pass', 'skip'],
        silent: false,
        strategy: defaultStrategy,
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
          run: true,
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
          'connect-src': ["'self'", 'https:'],
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
      MillionLint.vite({
        react: '19',
        lite: true, // Enable lite mode for faster builds
        filter: {
          // Limit scope to only your app components
          include: '**/components/**/*.{tsx,jsx}',
          exclude: '**/node_modules/**/*',
        },
        optimizeDOM: false, // Disable DOM optimization to reduce complexity
      }),
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
      unstableRolldownAdapter(
        analyzer({
          openAnalyzer: true,
          analyzerMode: 'static',
        }),
      ),
      react({
        tsDecorators: true,
        disableOxcRecommendation: true,
      }),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org:
          process.env.SENTRY_ORG ||
          (() => {
            throw new Error('SENTRY_ORG is not set');
          })(),
        project:
          process.env.SENTRY_PROJECT ||
          (() => {
            throw new Error('SENTRY_PROJECT is not set');
          })(),
        release: {
          // Automatically detect release name or use env override
          name: process.env.SENTRY_RELEASE,
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
            ? logger.warn('[sentry-vite-plugin]', err)
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
      }),
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
      isDevelopment && tailwindcss(),
    ].filter(Boolean),
    server: {
      proxy: {
        '/api': {
          target: isDevelopment ? 'http://localhost:3000' : app.url,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: !isDevelopment,
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
    resolve: {
      mainFields: ['browser', 'module', 'main'],
    },
    ssr: {
      resolve: {
        conditions: ['browser', 'worker', 'worked', 'import'],
      },
      external: ['stream', 'buffer', 'crypto', 'path', 'fs', 'os', 'url'],
    },
  };
});
