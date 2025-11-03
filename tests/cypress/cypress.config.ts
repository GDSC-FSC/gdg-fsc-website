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

import path from 'node:path';
import vitePreprocessor from 'cypress-vite';

export default (await import('cypress')).defineConfig({
  viewportWidth: 1_000,
  viewportHeight: 800,
  defaultCommandTimeout: 40_000,
  pageLoadTimeout: 120_000,
  video: true,
  watchForFileChanges: false,
  scrollBehavior: 'center',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? '5173' : '8811');
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on('task', {
        log: (message) => {
          console.log(message);

          return null;
        },
      });
      // DEBUG=cypress-vite
      on(
        'file:preprocessor',
        vitePreprocessor({
          configFile: path.resolve(__dirname, 'vite.config.ts'),
          mode: 'development',
        }),
      );

      return { ...config, ...configOverrides };
    },
  },
});
