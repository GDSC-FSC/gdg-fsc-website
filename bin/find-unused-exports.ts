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

import fg from 'fast-glob';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import {
    type ClassDeclaration,
    type FunctionDeclaration,
    Node,
    Project,
    type ReferencedSymbol,
    type ReferenceEntry,
    SyntaxKind,
    type VariableDeclaration,
} from 'ts-morph';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src/lib/logger';

type ExportedDeclaration = VariableDeclaration | FunctionDeclaration | ClassDeclaration;

type Opts = {
  root: string;
  include: string[];
  exclude: string[];
  logAll: boolean;
};

/**
 * Find Unused Exports Script
 * @module scripts/find-unused-exports
 * @description Finds unused top-level exports.
 */
@selfExecute
export class FindUnusedExportsScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run(rootDir).catch(this.handleError);
  }

  @execTime('Find Unused Exports')
  async run(rootDir: string) {
    const args = process.argv.slice(2);
    const getFlag = (name: string, def = ''): string => {
      const idx = args.indexOf(`--${name}`);
      if (idx === -1) return def;
      const nextArg = args[idx + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        return nextArg;
      }
      return def;
    };
    const hasFlag = (name: string): boolean => args.includes(`--${name}`);

    const options: Opts = {
      root: getFlag('root', rootDir),
      include: getFlag('include', 'src')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      exclude: getFlag('exclude', 'node_modules,.next,dist,build,out,src/generated')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      logAll: hasFlag('log-all'),
    };

    const patterns = options.include.map(
      (seg) => `${seg.replace(/\/+$/, '')}/**/*.{ts,tsx,js,jsx}`,
    );
    const ignore = [...options.exclude.map((seg) => `${seg.replace(/\/+$/, '')}/**`), '**/*.d.ts'];

    logger.info('Starting unused exports scan...');

    const files = await fg(patterns, { cwd: options.root, ignore, absolute: true });

    if (files.length === 0) {
      logger.warn('No files matched the include/exclude patterns. Exiting.');
      return;
    }

    const project = this.createProject(options.root);
    project.addSourceFilesAtPaths(files);

    logger.info(`Analyzing ${project.getSourceFiles().length} files...`);

    const unusedExports = this.scanProjectForUnusedExports(project, options.root, options.logAll);

    this.printResults(unusedExports);
  }

  private createProject(rootPath: string): Project {
    const tsConfigPath = join(rootPath, 'tsconfig.json');
    return new Project({
      tsConfigFilePath: existsSync(tsConfigPath) ? tsConfigPath : undefined,
      skipAddingFilesFromTsConfig: true,
    });
  }

  private scanProjectForUnusedExports(
    project: Project,
    rootPath: string,
    logAll: boolean,
  ): { name: string; type: string; filePath: string }[] {
    const unusedExports: { name: string; type: string; filePath: string }[] = [];

    for (const sourceFile of project.getSourceFiles()) {
      const fileUnusedExports = this.analyzeSourceFile(sourceFile, rootPath, logAll);
      unusedExports.push(...fileUnusedExports);
    }

    return unusedExports;
  }

  private analyzeSourceFile(
    sourceFile: ReturnType<Project['getSourceFiles']>[number],
    rootPath: string,
    logAll: boolean,
  ): { name: string; type: string; filePath: string }[] {
    const filePath = sourceFile.getFilePath();
    const relativePath = relative(rootPath, filePath);
    const unusedExports: { name: string; type: string; filePath: string }[] = [];

    const declarations = this.collectExportedDeclarations(sourceFile);

    for (const declaration of declarations) {
      const name = declaration.getName() || '(anonymous)';
      const type = this.getDeclarationType(declaration);
      const symbol = declaration.getSymbol();

      if (!symbol) continue;

      const isUsed = this.isExternallyUsed(declaration, filePath);

      if (!isUsed) {
        unusedExports.push({ name, type, filePath: relativePath });
      }

      if (logAll) {
        logger.info(`[${isUsed ? 'USED' : 'UNUSED'}] ${type.padEnd(8)}: ${name} (${relativePath})`);
      }
    }

    return unusedExports;
  }

  private collectExportedDeclarations(
    sourceFile: ReturnType<Project['getSourceFiles']>[number],
  ): ExportedDeclaration[] {
    const declarations: ExportedDeclaration[] = [];
    // Get exported functions
    for (const f of sourceFile
      .getFunctions()
      .filter((n) => this.isTopLevel(n))
      .filter((f) => f.isExported())) {
      declarations.push(f);
    }

    // Get exported classes
    for (const c of sourceFile
      .getClasses()
      .filter((n) => this.isTopLevel(n))
      .filter((c) => c.isExported())) {
      declarations.push(c);
    }

    // Get exported variable declarations
    for (const vs of sourceFile.getVariableStatements().filter((vs) => vs.isExported())) {
      for (const d of vs.getDeclarations()) {
        declarations.push(d);
      }
    }

    return declarations;
  }

  private isTopLevel(d: Node): boolean {
    return d.getParent()?.getKind() === SyntaxKind.SourceFile;
  }

  private getDeclarationType(node: Node): string {
    if (Node.isClassDeclaration(node)) return 'Class';
    if (Node.isFunctionDeclaration(node)) return 'Function';
    if (Node.isVariableDeclaration(node)) return 'Variable';
    return 'Declaration';
  }

  private isExternallyUsed(declaration: ExportedDeclaration, filePath: string): boolean {
    const references = declaration.findReferences();
    const allReferenceEntries = references.flatMap((ref: ReferencedSymbol) => ref.getReferences());

    const externalUsages = allReferenceEntries.filter((ref: ReferenceEntry) => {
      const referencingFile = ref.getNode().getSourceFile().getFilePath();
      return referencingFile !== filePath;
    });

    return externalUsages.length > 0;
  }

  private printResults(unusedExports: { name: string; type: string; filePath: string }[]): void {
    logger.info('\n--- Unused Top-Level Exports Found ---');

    if (unusedExports.length === 0) {
      logger.success('🎉 No unused exported symbols found!');
      return;
    }

    const grouped = unusedExports.reduce(
      (acc, exp) => {
        acc[exp.filePath] ??= [];
        acc[exp.filePath]?.push(exp);
        return acc;
      },
      {} as Record<string, typeof unusedExports>,
    );

    for (const [filePath, exports] of Object.entries(grouped)) {
      logger.info(`\n📄 ${filePath}:`);
      for (const exp of exports) {
        logger.info(`  - ${exp.type.padEnd(8)}: ${exp.name}`);
      }
    }

    logger.info(`\nTotal unused exports: ${unusedExports.length}`);
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
