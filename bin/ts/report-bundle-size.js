#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Adapted for standard Vite React TypeScript applications

import { accessSync, constants, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSize } from 'gzip-size';
import { mkdirp } from 'mkdirp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {{ raw: number, gzip: number }} ScriptSizes
 * @typedef {Record<string, ScriptSizes>} BundleSizes
 * @typedef {{
 *   buildOutputDirectory?: string,
 *   name: string
 * }} Options
 */

// Pull options from `package.json`
/** @type {Options} */
const options = getOptions();
const BUILD_OUTPUT_DIRECTORY = getBuildOutputDirectory(options);

// Check if build output directory exists
const buildRoot = join(process.cwd(), BUILD_OUTPUT_DIRECTORY);
try {
  accessSync(buildRoot, constants.R_OK);
} catch (err) {
  if (Error.isError(err)) {
    console.error(
      `No build output found at "${buildRoot}" - you may not have your working directory set correctly, or not have run "vite build".`,
    );
  }
  console.error('Unknown error');
  process.exit(1);
}

/** @type {Record<string, [number, number]>} */
const memoryCache = {};

let bundleSizes = {};

// For standard Vite React TypeScript apps, analyze the "assets" directory in the build output
const assetsDir = join(buildRoot, 'assets');
if (existsSync(assetsDir)) {
  console.log('Found "assets" directory in Vite build output, analyzing...');
  bundleSizes = await analyzeViteAssetsDirectory(assetsDir, buildRoot);
} else {
  // Fallback: analyze build directory directly
  console.log('No "assets" directory found, analyzing build directory directly...');
  bundleSizes = await analyzeBuildDirectory(buildRoot);
}

// Format and write the output
const rawData = JSON.stringify(bundleSizes, null, 2);

// Log outputs to the gh actions panel
console.log(rawData);

// Write analysis file
await mkdirp(join(buildRoot, 'analyze/'));
writeFileSync(join(buildRoot, 'analyze/__bundle_analysis.json'), rawData);

// --------------
// Analysis Functions
// --------------

/**
 * Analyze Vite "assets" directory for JS/TS bundles
 * @param {string} assetsDir
 * @param {string} buildRoot
 * @returns {Promise<BundleSizes>}
 */
async function analyzeViteAssetsDirectory(assetsDir, buildRoot) {
  /** @type {BundleSizes} */
  const sizes = {};

  const jsFiles = getAllJSFiles(assetsDir);
  sizes.assets = await getScriptSizes(jsFiles.map((f) => relative(buildRoot, f)));

  // Add individual files
  for (const file of jsFiles) {
    const relativePath = relative(buildRoot, file);
    sizes[relativePath] = await getScriptSize(relativePath);
  }

  return sizes;
}

/**
 * Fallback: analyze build directory directly
 * @param {string} buildRoot
 * @returns {Promise<BundleSizes>}
 */
async function analyzeBuildDirectory(buildRoot) {
  /** @type {BundleSizes} */
  const sizes = {};

  // Look for JS files in the build root
  const jsFiles = getAllJSFiles(buildRoot);
  if (jsFiles.length > 0) {
    sizes.root = await getScriptSizes(jsFiles.map((f) => relative(buildRoot, f)));

    // Add individual files
    for (const file of jsFiles) {
      const relativePath = relative(buildRoot, file);
      sizes[relativePath] = await getScriptSize(relativePath);
    }
  }

  return sizes;
}

/**
 * Get all JavaScript files recursively
 * @param {string} dir
 * @returns {string[]}
 */
function getAllJSFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    try {
      const entries = readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name);
        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore permission errors
    }
  }

  traverse(dir);
  return files;
}

// --------------
// Util Functions
// --------------

/**
 * @param {string[]} scriptPaths
 * @returns {Promise<ScriptSizes>}
 */
async function getScriptSizes(scriptPaths) {
  const sizes = { raw: 0, gzip: 0 };
  for (const scriptPath of scriptPaths) {
    const [rawSize, gzSize] = await getScriptSize(scriptPath);
    sizes.raw += rawSize;
    sizes.gzip += gzSize;
  }
  return sizes;
}

/**
 * @param {string} scriptPath
 * @returns {Promise<[number, number]>}
 */
async function getScriptSize(scriptPath) {
  const encoding = 'utf8';
  const p = isAbsolute(scriptPath)
    ? scriptPath
    : join(process.cwd(), BUILD_OUTPUT_DIRECTORY, scriptPath);

  if (p in memoryCache) {
    return memoryCache[p] || [0, 0];
  }

  try {
    const textContent = readFileSync(p, encoding);
    const rawSize = Buffer.byteLength(textContent, encoding);
    const gzSize = await gzipSize(textContent);
    memoryCache[p] = [rawSize, gzSize];
    return [rawSize, gzSize];
  } catch (error) {
    if (Error.isError(error)) {
      console.error(`Error reading file: ${p}`, error);
      return [0, 0];
    }
  }
}

/**
 * @param {string} [pathPrefix]
 * @returns {Options}
 */
function getOptions(pathPrefix = process.cwd()) {
  try {
    /** @type {{viteBundleAnalysis?: Partial<Options>, name: string}} */
    // @ts-ignore
    const pkg = JSON.parse(
      /** @type {string} */ (readFileSync(join(pathPrefix, 'package.json'), 'utf8')),
    );
    if (typeof pkg !== 'object' || pkg === null) {
      throw new Error('Invalid package.json format');
    }
    // Optionally support viteBundleAnalysis config in package.json
    return { ...pkg.viteBundleAnalysis, name: pkg.name };
  } catch (error) {
    if (Error.isError(error)) {
      console.error('Error reading package.json', error);
      return { name: 'unknown' };
    }
  }
}

/**
 * @param {Options} options
 * @returns {string}
 */
function getBuildOutputDirectory(options) {
  // Vite default output is "dist"
  return options.buildOutputDirectory || 'dist';
}
