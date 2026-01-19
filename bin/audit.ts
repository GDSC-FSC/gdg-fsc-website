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
    const dirsToCheck = await this.getDirectoriesToAudit(rootDir);
    const hasError = await this.auditAllWorkspaces(dirsToCheck, rootDir);

    process.exit(hasError ? 1 : 0);
  }

  private async getDirectoriesToAudit(rootDir: string): Promise<string[]> {
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

    return dirsToCheck;
  }

  private async auditAllWorkspaces(dirsToCheck: string[], rootDir: string): Promise<boolean> {
    let hasError = false;

    for (const dir of dirsToCheck) {
      const failed = await this.auditWorkspace(dir, rootDir);
      if (failed) hasError = true;
    }

    return hasError;
  }

  private async auditWorkspace(dir: string, rootDir: string): Promise<boolean> {
    const workspacePkgPath = path.join(dir, 'package.json');
    if (!fs.existsSync(workspacePkgPath)) return false;

    const workspacePkg = JSON.parse(fs.readFileSync(workspacePkgPath, 'utf8'));
    if (!workspacePkg.scripts?.audit) return false;

    const relativePath = path.relative(rootDir, dir) || '.';
    logger.info(`\nRunning audit in: ${relativePath}`);

    try {
      process.chdir(dir);
      const output = await $`bun run audit`.text();
      const passed = output.includes('Passed');

      if (passed) {
        logger.success(`Audit passed in ${relativePath}`);
        return false;
      }

      logger.error(`Audit failed in ${relativePath}`);
      return true;
    } catch (e) {
      logger.error(`Audit failed in ${relativePath}`, e);
      return true;
    } finally {
      process.chdir(rootDir);
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
