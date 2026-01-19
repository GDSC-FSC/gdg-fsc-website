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

import depcheck from 'depcheck';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import type { PackageJson } from 'type-fest';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src/lib/logger';

type DepcheckResult = {
  dependencies: string[];
  devDependencies: string[];
  missing: Record<string, string[]>;
  using: Record<string, string[]>;
  invalidFiles: Record<string, Error>;
  invalidDirs: Record<string, Error>;
};

/**
 * Check Unused Script
 * @module scripts/check-unused
 * @description Checks for unused dependencies.
 */
@selfExecute
export class CheckUnusedScript {
  private bun$:
    | ((
        strings: TemplateStringsArray,
        ...expr: (string | number | boolean | undefined | null)[]
      ) => Promise<unknown>)
    | null = null;

  constructor() {
    this.init();
  }

  private init() {
    const rootDir = path.resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run(rootDir).catch(this.handleError);
  }

  @execTime('Check Unused')
  async run(rootDir: string) {
    try {
      const { $ } = await import('bun');
      this.bun$ = $;
    } catch {}

    const pkgPath = path.join(rootDir, 'package.json');

    logger.info('Project root:', { rootDir });

    if (!fs.existsSync(pkgPath)) {
      logger.error('package.json not found at', undefined, { pkgPath });
      process.exit(1);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as PackageJson;
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
      logger.info(`\nChecking: ${path.relative(rootDir, dir) || '.'}`);
      const success = await this.checkDirectory(dir, rootDir);
      if (!success) hasError = true;
    }

    if (hasError) {
      process.exitCode = 2;
    }
  }

  private async checkDirectory(dir: string, rootDir: string): Promise<boolean> {
    const pkgPath = path.join(dir, 'package.json');
    if (!fs.existsSync(pkgPath)) return true;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as PackageJson;
    const OUT_DIR = path.join(rootDir, 'scripts', 'out', path.relative(rootDir, dir) || 'root');
    await fsp.mkdir(OUT_DIR, { recursive: true });

    await this.ensureDepcheckInstalled(rootDir);

    const options: depcheck.Options = {
      ignoreMatches: [
        '@types/*',
        'typescript',
        'eslint*',
        'prettier*',
        'autoprefixer',
        'postcss',
        'tailwindcss',
        '@gdg-fsc/*', // Ignore workspace packages
      ],
      ignorePatterns: [
        '.*', // Ignore all dotfiles and dot directories
        'dist',
        'build',
        'out',
        'coverage',
        'public',
        'node_modules',
        'bin',
        'prisma',
        'storybook-static',
      ],
      skipMissing: false,
      parsers: {
        '**/*.ts': depcheck.parser.typescript,
        '**/*.tsx': depcheck.parser.typescript,
        '**/*.js': depcheck.parser.es6,
        '**/*.jsx': depcheck.parser.jsx,
      },
      detectors: [
        depcheck.detector.importDeclaration,
        depcheck.detector.requireCallExpression,
        depcheck.detector.exportDeclaration,
        depcheck.detector.typescriptImportEqualsDeclaration,
      ],
      specials: [
        depcheck.special.eslint,
        depcheck.special.jest,
        depcheck.special.babel,
        depcheck.special.webpack,
        depcheck.special.bin,
      ],
    };

    const result = await logger.time(
      `depcheck: ${path.relative(rootDir, dir) || '.'}`,
      async () => (await depcheck(dir, options)) as DepcheckResult,
    );

    const allTopLevel = [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ];

    const unusedDeps = result.dependencies ?? [];
    const unusedDevDeps = result.devDependencies ?? [];
    const missing = result.missing ?? {};

    const usedTopLevel = allTopLevel.filter(
      (d) => !unusedDeps.includes(d) && !unusedDevDeps.includes(d),
    );

    const maybeUnusedSubDeps = new Set<string>();

    for (const dep of usedTopLevel) {
      const depPkgPath = path.join(rootDir, 'node_modules', dep, 'package.json');
      if (!fs.existsSync(depPkgPath)) continue;

      try {
        const depPkg = JSON.parse(fs.readFileSync(depPkgPath, 'utf8')) as PackageJson;
        const subs = Object.keys(depPkg.dependencies ?? {});
        for (const sub of subs) {
          if (!allTopLevel.includes(sub) && !missing[sub]) {
            maybeUnusedSubDeps.add(sub);
          }
        }
      } catch {
        // ignore unreadable package.json for a sub-dependency
      }
    }

    const outputs = {
      unusedDependencies: Array.from(unusedDeps).sort((a, b) => a.localeCompare(b)),
      unusedDevDependencies: Array.from(unusedDevDeps).sort((a, b) => a.localeCompare(b)),
      missingDependencies: Object.fromEntries(
        Object.entries(missing).sort(([a], [b]) => a.localeCompare(b)),
      ),
      potentialUnusedSubDependencies: Array.from(maybeUnusedSubDeps).sort((a, b) =>
        a.localeCompare(b),
      ),
      summary: {
        totalTopLevel: allTopLevel.length,
        unusedDependencies: unusedDeps.length,
        unusedDevDependencies: unusedDevDeps.length,
        missingDependencies: Object.keys(missing).length,
        potentialUnusedSubDependencies: maybeUnusedSubDeps.size,
      },
    };

    await this.writeJsonAtomic(path.join(OUT_DIR, 'dependencies-report.json'), outputs);
    
    logger.info(JSON.stringify(outputs.summary, null, 2));

    if (
      outputs.unusedDependencies.length ||
      outputs.unusedDevDependencies.length ||
      Object.keys(outputs.missingDependencies).length
    ) {
      return false;
    }
    return true;
  }

  private async ensureDepcheckInstalled(rootDir: string) {
    try {
      require.resolve('depcheck', { paths: [rootDir] });
    } catch {
      if (this.bun$) {
        logger.info('Installing depcheck via Bun…');
        await this.bun$`bun add -D depcheck`;
      } else {
        logger.info('Installing depcheck via npm…');
        const { spawnSync } = await import('node:child_process');
        const r = spawnSync('npm', ['i', '-D', 'depcheck'], { stdio: 'inherit', cwd: rootDir });
        if (r.status !== 0) process.exit(r.status ?? 1);
      }
    }
  }

  private async writeJsonAtomic<T>(dest: string, data: T) {
    const tmp = `${dest}.tmp-${Date.now()}`;
    await fsp.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
    await fsp.rename(tmp, dest);
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
