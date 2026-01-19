/**
 * Copyright (c) 2026 GDG on Campus Farmingdale State College
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { logger } from '../packages/shared/utils/src/lib/logger';

const { execSync } = await import('node:child_process');

try {
  logger.info(
    execSync(
      String.raw`bunx madge --extensions js,jsx,ts,tsx . --exclude "/(^|\\/)..+\\/|node_modules\\/|dist\\/|coverage\\/|public\\/|storybook-static\\/|docker\\/|\\.unlighthouse\\/|\\.vite-inspect\\//" -i apps/docs/code/codebase-graph.png`,
    ).toString(),
  );
} catch (error: any) {
  if (error.stdout?.toString().includes('Image created')) {
    logger.info(error.stdout.toString());
    process.exit(0);
  }
  if (error.stdout) logger.info(error.stdout.toString());
  if (error.stderr) logger.error(error.stderr.toString());
  logger.error(error);
  process.exit(1);
}
