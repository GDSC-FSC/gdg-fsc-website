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

import { $ } from 'bun';
import path from 'node:path';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src/lib/logger';

/**
 * Cleanup Script
 * @module scripts/cleanup
 * @description Orchestrates the removal of build artifacts and cache directories.
 */
@selfExecute
export class CleanupScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = path.resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run().catch(this.handleError);
  }

  @execTime('Cleanup')
  async run() {
    logger.info('🧹 Starting cleanup...\n');

    const tasks = [
      {
        name: 'Clear Next.js cache',
        command: 'rm -rf .next',
      },
      {
        name: 'Clear TypeScript build info',
        command: 'rm -rf tsconfig.tsbuildinfo',
      },
      {
        name: 'Clear test cache',
        command: 'rm -rf coverage .vitest',
      },
    ];

    for (const task of tasks) {
      try {
        logger.info(`📦 ${task.name}...`);
        await $`${task.command.split(' ')}`;
        logger.success('   ✅ Done\n');
      } catch (error: unknown) {
        logger.warn(`   ⚠️  Skipped (${error instanceof Error ? error.message : 'error'})\n`);
      }
    }

    logger.success('✨ Cleanup complete!\n');
    logger.info('💡 Next steps:');
    logger.info('   1. Restart dev server: nr dev');
    logger.info('   2. Run type checks: bun src/__tests__/type-check.ts');
    logger.info('   3. Test APIs: bun src/__tests__/api-manual-test.ts\n');
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
