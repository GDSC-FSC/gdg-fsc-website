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

/**
 * @see https://www.douglasgoulart.com/writings/creating-a-complete-nodejs-test-environment-with-vitest-postgresql-and-prisma
 * @see https://github.com/doougui/node-test-env
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
    clearMocks: true,
    server: {
      deps: {
        inline: ['@gdg-fsc/interface'],
      },
    },
    coverage: {
      provider: 'v8',
      exclude: ['dist'],
      include: ['src'],
      reporter: ['html', 'lcov'],
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@gdg-fsc/interface': path.resolve(__dirname, '../../packages/interface/index.ts'),
      '@gdg-fsc/utils': path.resolve(__dirname, '../../packages/shared/utils/src/lib/index.ts'),
      '@gdg-fsc/classes': path.resolve(__dirname, '../../packages/shared/classes/src/lib/index.ts'),
      '@gdg-fsc/decorators': path.resolve(__dirname, '../../packages/shared/decorators/src/lib/index.ts'),
      '@': path.resolve(__dirname, '../../apps/frontend/src'),
      'react': path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, '../../node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, '../../node_modules/react/jsx-dev-runtime.js'),
    },
  },
});
