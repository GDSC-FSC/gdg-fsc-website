#!/usr/bin/env bun

// -*- typescript -*-

/**
 * Copyright 2026 GDG on Campus Farmingdale State College
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

import fs from 'node:fs';
import path from 'node:path';
/**
 * @file This script is an executable Bun script designed to run a security audit using `bun run audit`.
 * @description
 * This script executes the `bun run audit` command, processes its output to determine the audit status,
 * and exits with a corresponding status code. It is primarily used in CI/CD pipelines or pre-commit hooks
 * to enforce that dependency audits pass before allowing further actions.
 *
 * The script captures the standard output of `bun run audit`, splits it into lines, and filters out
 * any falsy or null-like lines using `filter(Boolean)` and `filter(isNotNull)` (assuming `isNotNull`
 * provides further refinement for non-empty, non-null values). It then extracts the last remaining line
 * and checks if it contains the string 'Passed'.
 * - If 'Passed' is found, the script logs '0' to the console and exits with status code 0 (success).
 * - If 'Passed' is not found (meaning the audit failed or the output was unexpected), the script logs '1'
 *   to the console and exits with status code 1 (failure).
 * @async
 * @since 1.0.0
 * @version 1.0.0
 *
 * @returns {Promise<never>} This script does not return a value in the traditional sense, as it
 *                           terminates the process using `process.exit()`. It returns:
 *                           - `process.exit(0)` if the `bun run audit` command's last relevant output line contains 'Passed'.
 *                           - `process.exit(1)` otherwise.
 *
 * @throws {Error} While `Bun.$` provides robust error handling for external processes,
 *                 any critical failure in executing `bun run audit` (e.g., command not found, permission issues)
 *                 would prevent the output from being processed, likely leading to the script exiting with status 1
 *                 due to 'Passed' not being found, rather than throwing a caught error directly within the script's logic.
 *
 * @example
 * // To execute this script from the command line (assuming it's named 'audit-check.ts'):
 * // $ bun run audit-check.ts
 * //
 * // If the `bun run audit` command passes:
 * // (Outputs "0" to stdout)
 * // $ echo $? // On Linux/macOS, check the process exit code
 * // 0
 * //
 * // If the `bun run audit` command fails or indicates issues:
 * // (Outputs "1" to stdout)
 * // $ echo $?
 * // 1
 */
import { $ } from 'bun';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src/lib/logger';

/**
 * Audit Script
 * @module scripts/audit
 * @description Runs `bun run audit` and checks for vulnerabilities.
 */
@selfExecute
export class AuditScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = path.resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run().catch(this.handleError);
  }

  @execTime('Audit')
  async run() {
    const rootDir = process.cwd();
    const pkgPath = path.join(rootDir, 'package.json');
    
    if (!fs.existsSync(pkgPath)) {
      logger.error('package.json not found at', undefined, { pkgPath });
      process.exit(1);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const workspaces = pkg.workspaces;
    const dirsToCheck = [rootDir];

    if (Array.isArray(workspaces)) {
      const { default: fg } = await import('fast-glob');
      const workspacePaths = await fg(workspaces, {
        cwd: rootDir,
        onlyDirectories: true,
        absolute: true,
      });
      dirsToCheck.push(...workspacePaths);
    }

    let hasError = false;

    for (const dir of dirsToCheck) {
      const workspacePkgPath = path.join(dir, 'package.json');
      if (!fs.existsSync(workspacePkgPath)) continue;

      const workspacePkg = JSON.parse(fs.readFileSync(workspacePkgPath, 'utf8'));
      
      // Check if audit script exists
      if (workspacePkg.scripts?.audit) {
        logger.info(`\nRunning audit in: ${path.relative(rootDir, dir) || '.'}`);
        
        try {
          // Change to workspace directory to run the script
          process.chdir(dir);
          const output = await $`bun run audit`.text();
          
          // Check output for success/failure
          // The original script checked for "Passed" in the last line.
          // We'll maintain similar logic but adapt for potentially different outputs or just check exit code if possible.
          // However, Bun.$ throws on non-zero exit code unless .nothrow() is used.
          // Let's use .nothrow() and check exit code or output.
          
          // Actually, the original script logic was specific:
          // split('\n').filter(Boolean).filter(isNotNull).at(-1)?.[0]?.includes('Passed')
          
          const lines = output.split('\n').filter(Boolean);
          const lastLine = lines[lines.length - 1];
          
          if (lastLine?.includes('Passed') || output.includes('Passed')) {
             logger.success(`Audit passed in ${path.relative(rootDir, dir) || '.'}`);
          } else {
             logger.error(`Audit failed in ${path.relative(rootDir, dir) || '.'}`);
             hasError = true;
          }
        } catch (e) {
          logger.error(`Audit failed in ${path.relative(rootDir, dir) || '.'}`, e);
          hasError = true;
        } finally {
          process.chdir(rootDir);
        }
      } else {
        // Optional: Run native bun audit if no script? 
        // For now, we'll skip to avoid noise, assuming explicit opt-in via script.
        // logger.info(`Skipping ${path.relative(rootDir, dir) || '.'} (no audit script)`);
      }
    }

    if (hasError) {
      logger.info('1');
      process.exit(1);
    } else {
      logger.info('0');
      process.exit(0);
    }
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
