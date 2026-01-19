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

import { execSync } from 'node:child_process';
import path from 'node:path';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src/lib/logger';

/**
 * Unused Tree Shake Script
 * @module scripts/unused-tree-shake
 * @description Formats TypeScript files using tsr.
 */
@selfExecute
export class UnusedTreeShakeScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = path.resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run().catch(this.handleError);
  }

  @execTime('Unused Tree Shake')
  async run() {
    const output = execSync(
      [
        'bunx tsr',
        '--write',
        '--recursive',
        // pass entrypoints that represent roots of your graphs
        // (e.g. app/pages, feature entry files, etc.)
        String.raw`^src/(main|index)\\.ts$`,
        String.raw`^src/app/.*\\.(ts|tsx)$`,
        // no --exclude (tsr does not support it)
        // use tsconfig to scope files instead
      ].join(' '),
      { encoding: 'utf-8', shell: '/bin/bash' },
    ).toString();

    logger.info(output);
  }

  private handleError(error: unknown) {
    if (error instanceof BaseError) {
      logger.error(error.toString());
    } else {
      logger.error('Unexpected error', error);
    }
    process.exit(1);
  }
}
