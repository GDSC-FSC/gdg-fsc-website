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
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PackageJson } from 'type-fest';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { Stringify } from '../packages/shared/utils/src/lib/helpers';
import { logger } from '../packages/shared/utils/src/lib/logger';

/**
 * Package Cost Script
 * @module scripts/package-cost
 * @description Analyzes package sizes.
 */
@selfExecute
export class PackageCostScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = join(__dirname, '..');
    process.chdir(rootDir);
    this.run(rootDir).catch(this.handleError);
  }

  @execTime('Package Cost')
  async run(rootDir: string) {
    const packageJsonPath = join(rootDir, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson;
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    const allDependencies = [...dependencies, ...devDependencies];

    const OUTPUT_DIR = `${rootDir}/scripts/out`;

    const packageSizes = allDependencies
      .map((packageName) => this.getPackageSize(packageName))
      .filter(Boolean)
      .filter(this.isNotNull);

    const sortedPackageSizes = packageSizes.toSorted((a, b) => b.size - a.size);

    const LOW_THRESHOLD = 1_000_000; // 1 MB
    const MEDIUM_THRESHOLD = 10_000_000; // 10 MB

    const categorizedPackages = {
      high: sortedPackageSizes.filter((pkg) => pkg.size > MEDIUM_THRESHOLD),
      medium: sortedPackageSizes.filter(
        (pkg) => pkg.size > LOW_THRESHOLD && pkg.size <= MEDIUM_THRESHOLD,
      ),
      low: sortedPackageSizes.filter((pkg) => pkg.size <= LOW_THRESHOLD),
    };

    mkdirSync(OUTPUT_DIR, { recursive: true });

    writeFileSync(
      `${OUTPUT_DIR}/high.json`,
      Stringify([...categorizedPackages.high].map((e) => e.name)),
      {
        flag: 'w',
      },
    );

    writeFileSync(
      `${OUTPUT_DIR}/medium.json`,
      Stringify([...categorizedPackages.medium].map((e) => e.name)),
      {
        flag: 'w',
      },
    );

    writeFileSync(
      `${OUTPUT_DIR}/low.json`,
      Stringify([...categorizedPackages.low].map((e) => e.name)),
      {
        flag: 'w',
      },
    );

    logger.info('\n📦 Package Size Summary:');
    logger.info(`   🔴 High (> 10 MB): ${categorizedPackages.high.length} packages`);
    logger.info(`   🟡 Medium (1-10 MB): ${categorizedPackages.medium.length} packages`);
    logger.info(`   🟢 Low (< 1 MB): ${categorizedPackages.low.length} packages`);
    logger.info(
      `\n📊 Total size: ${(sortedPackageSizes.reduce((sum: number, pkg: { name: string; size: number }) => sum + pkg.size, 0) / 1_000_000).toFixed(2)} MB`,
    );
    logger.info(`\n📄 Results saved to ${OUTPUT_DIR}/package-sizes.json`);
  }

  private getPackageSize(packageName: string): { name: string; size: number } | null {
    try {
      const result = execSync(`npm view ${packageName} dist.unpackedSize --json`, {
        encoding: 'utf-8',
      });
      const size = JSON.parse(result) as number;
      return {
        name: packageName,
        size: size,
      };
    } catch (error) {
      logger.error(
        `Failed to get size for ${packageName}:`,
        error instanceof Error ? error : undefined,
        { message: error instanceof Error ? error.message : String(error) },
      );
      return null;
    }
  }

  private isNotNull<Value>(value: Value): value is Exclude<Value, null> {
    return value !== null;
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
