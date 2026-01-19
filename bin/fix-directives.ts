#!/usr/bin/env bun

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

/**
 * Fix misplaced `'use client'` / `'use server'` directives across a repo.
 *
 * - Removes any occurrences (even if wrapped like `('use client')` or with backticks)
 * - Reinserts a single canonical directive at the very top of the module
 *   (after shebang and leading comments), before imports/other code.
 *
 * Usage:
 *   bun scripts/fix-directives.ts                       # dry-run
 *   bun scripts/fix-directives.ts --write               # write in-place
 *   bun scripts/fix-directives.ts --write --mode=auto   # default: auto
 *   bun scripts/fix-directives.ts --write --mode=client # force 'use client'
 *   bun scripts/fix-directives.ts --write --mode=server # force 'use server'
 *   bun scripts/fix-directives.ts --include=src/<glob>/*.{ts,tsx,js,jsx}
 */

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import fg from 'fast-glob';
import MagicString from 'magic-string';
import fs from 'node:fs/promises';
import path from 'node:path';
import { BaseError } from '../packages/shared/classes/src';
import { execTime, selfExecute } from '../packages/shared/decorators/src';
import { logger } from '../packages/shared/utils/src';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Mode = 'auto' | 'client' | 'server';
type DirectiveType = 'client' | 'server';
type NodeWithRange = { start?: number; end?: number };

interface ParsedArgs {
  write: boolean;
  mode: Mode;
  include: string;
}

interface DirectiveInfo {
  found: Set<DirectiveType>;
  toRemove: NodeWithRange[];
}

interface ProcessResult {
  changed: boolean;
  skipped: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PARSER_PLUGINS = [
  'jsx',
  'typescript',
  'importMeta',
  'topLevelAwait',
  'classProperties',
  'classPrivateProperties',
  'decorators-legacy',
] as const;

const DEFAULT_INCLUDE = '**/*.{ts,tsx,js,jsx,mts,mjs,cts,cjs}';
const IGNORE_PATTERNS = ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'];

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/** Parse CLI arguments into a structured object */
function parseArgs(): ParsedArgs {
  const argv = new Map<string, string | boolean>();
  for (const a of process.argv.slice(2)) {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(a);
    if (m?.[1]) argv.set(m[1], m[2] ?? true);
  }
  return {
    write: argv.get('write') === true,
    mode: (argv.get('mode') as Mode) || 'auto',
    include: (argv.get('include') as string) || DEFAULT_INCLUDE,
  };
}

/** Safely parse code into AST, returns null on failure */
function tryParse(code: string): ReturnType<typeof parse> | null {
  try {
    return parse(code, {
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      startLine: 1,
      plugins: [...PARSER_PLUGINS],
    });
  } catch {
    return null;
  }
}

/** Extract directive type from a directive value string */
function extractDirectiveType(value: string): DirectiveType | null {
  if (value === 'use client') return 'client';
  if (value === 'use server') return 'server';
  return null;
}

/** Find all directive occurrences in the AST */
function findDirectives(ast: ReturnType<typeof parse>): DirectiveInfo {
  const found = new Set<DirectiveType>();
  const toRemove: NodeWithRange[] = [];

  traverse(ast, {
    Program(p) {
      for (const d of p.node.directives) {
        const type = extractDirectiveType(d.value.value);
        if (type) {
          found.add(type);
          toRemove.push(d as unknown as NodeWithRange);
        }
      }
    },
    ExpressionStatement(p) {
      if (p.parent.type !== 'Program') return;
      // @ts-expect-error – different babel versions expose different fields
      const expr = p.node.expression?.expression ?? p.node.expression;
      if (!expr) return;

      const value = getExpressionDirectiveValue(expr);
      if (value) {
        found.add(value);
        toRemove.push(p.node as unknown as NodeWithRange);
      }
    },
  });

  return { found, toRemove };
}

/** Extract directive value from expression (StringLiteral or TemplateLiteral) */
function getExpressionDirectiveValue(expr: {
  type: string;
  value?: string;
  quasis?: Array<{ value: { cooked: string } }>;
}): DirectiveType | null {
  if (expr.type === 'StringLiteral' && expr.value) {
    return extractDirectiveType(expr.value);
  }
  if (expr.type === 'TemplateLiteral' && expr.quasis?.length === 1) {
    return extractDirectiveType(expr.quasis[0].value.cooked);
  }
  return null;
}

/** Determine which directive to use based on mode and found directives */
function determineTarget(mode: Mode, found: Set<DirectiveType>): 'use client' | 'use server' {
  if (mode === 'client') return 'use client';
  if (mode === 'server') return 'use server';
  return found.has('client') ? 'use client' : 'use server';
}

/** Remove nodes from MagicString by their ranges */
function removeNodes(s: MagicString, nodes: NodeWithRange[]): void {
  for (const n of nodes) {
    if (typeof n.start === 'number' && typeof n.end === 'number') {
      s.remove(n.start, n.end);
    }
  }
}

/** Calculate insertion point for directive (after shebang + whitespace) */
function getInsertionPoint(code: string, shebangEnd: number): number {
  const leading = code.slice(shebangEnd);
  const m = /^\s*/.exec(leading);
  return m ? shebangEnd + m[0].length : shebangEnd;
}

/** Insert directive at the correct position if not already present */
function insertDirective(
  s: MagicString,
  target: 'use client' | 'use server',
  insertAt: number,
): void {
  const directiveLine = `'${target}';\n`;
  const updated = s.toString();
  const alreadyTop = updated.slice(insertAt, insertAt + directiveLine.length).startsWith(directiveLine);
  if (!alreadyTop) {
    s.prependLeft(insertAt, directiveLine);
  }
}

/** Process a single file and fix its directives */
async function processFile(
  file: string,
  args: ParsedArgs,
): Promise<ProcessResult> {
  const full = path.resolve(file);
  const code = await fs.readFile(full, 'utf8');

  if (!/use\s+(client|server)/.test(code)) {
    return { changed: false, skipped: false };
  }

  const ast = tryParse(code);
  if (!ast) return { changed: false, skipped: false };

  const { found, toRemove } = findDirectives(ast);
  if (found.size === 0) return { changed: false, skipped: false };

  if (found.size > 1 && args.mode === 'auto') {
    return { changed: false, skipped: true };
  }

  const s = new MagicString(code);
  const shebangMatch = /^#!.*\n/.exec(code);
  const shebangEnd = shebangMatch ? shebangMatch[0].length : 0;
  const target = determineTarget(args.mode, found);

  removeNodes(s, toRemove);

  // Validate the updated code parses correctly
  if (!tryParse(s.toString())) {
    return { changed: false, skipped: false };
  }

  const insertAt = getInsertionPoint(s.toString(), shebangEnd);
  insertDirective(s, target, insertAt);

  const out = s.toString();
  if (out === code) return { changed: false, skipped: false };

  if (args.write) {
    await fs.writeFile(full, out, 'utf8');
  } else {
    const rel = path.relative(process.cwd(), full);
    logger.info(`[dry-run] would fix: ${rel} -> ${target}`);
  }

  return { changed: true, skipped: false };
}

/** Log the final summary */
function logSummary(write: boolean, changedCount: number, skippedCount: number): void {
  const skippedMsg = skippedCount ? `, skipped (both client/server present): ${skippedCount}` : '';
  if (write) {
    logger.info(`\nWrote fixes to ${changedCount} file(s)${skippedMsg}.`);
  } else {
    logger.info(`\nDone (dry-run). Files to change: ${changedCount}${skippedMsg}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Class
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fix Directives Script
 * @module scripts/fix-directives
 * @description Fix misplaced 'use client' / 'use server' directives.
 */
@selfExecute
export class FixDirectivesScript {
  constructor() {
    this.init();
  }

  private init() {
    const rootDir = path.resolve(__dirname, '..');
    process.chdir(rootDir);
    this.run().catch(this.handleError);
  }

  @execTime('Fix Directives')
  async run() {
    const args = parseArgs();

    const files = await fg([args.include], {
      dot: false,
      ignore: IGNORE_PATTERNS,
    });

    let changedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const result = await processFile(file, args);
      if (result.changed) changedCount++;
      if (result.skipped) skippedCount++;
    }

    logSummary(args.write, changedCount, skippedCount);
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
