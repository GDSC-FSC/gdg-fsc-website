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

import 'dotenv/config';
const PORT = `${process.env.PORT}` || '5173';

export default (await import('@playwright/test')).defineConfig({
  testDir: './tests/pw',
  timeout: 40 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, // runMode: 1, openMode: 0
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${PORT}/`,
    trace: 'on-first-retry',
    viewport: { width: 1000, height: 800 }, // viewportWidth/viewportHeight
    video: 'on',
    actionTimeout: 40 * 1000,
    navigationTimeout: 120 * 1000,
  },

  projects: [
    ...(await Promise.all(
      [
        {
          name: 'chromium',
          use: 'Desktop Chrome',
        },
        {
          name: 'firefox',
          use: 'Desktop Firefox',
        },
        {
          name: 'webkit',
          use: 'Desktop Safari',
        },
        {
          name: 'Mobile Chrome',
          use: 'Pixel 5',
        },
        {
          name: 'Mobile Safari',
          use: 'iPhone 12',
        },
        {
          name: 'Microsoft Edge',
          use: 'Desktop Edge',
          channel: 'msedge',
        },
        {
          name: 'Google Chrome',
          use: 'Desktop Chrome',
          channel: 'chrome',
        },
      ].map(async ({ name, use, channel }) => {
        const { devices } = await import('@playwright/test');
        return {
          name,
          use: {
            ...(devices[use] || {}),
            ...(channel ? { channel } : {}),
          },
        };
      }),
    )),
  ],

  /**
   * Development server configuration
   * Starts a local dev server before running tests
   * Can be disabled with --skip-server-start flag for CI environments
   * where the server is started separately
   *
   * @property {string} command - Command to start the dev server
   * @property {string} url - URL where the server will be available
   * @property {boolean} reuseExistingServer - Whether to reuse an existing server instance
   * @property {number} timeout - How long to wait for the server to start (ms)
   */
  ...(!process.argv.includes('--skip-server-start')
    ? {
        webServer: {
          command: 'bun run dev',
          url: 'http://127.0.0.1:3000',
          reuseExistingServer: !process.env.CI,
          timeout: Number(process.env.PLAYWRIGHT_WEBSERVER_TIMEOUT) || 120000, // 2 minutes to start the server
          stdout: 'pipe',
          stderr: 'pipe',
          env: {
            PORT,
          },
        },
      }
    : {}),
});
