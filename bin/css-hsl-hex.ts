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

import { readFileSync, writeFileSync } from 'node:fs';

const hslToRgb = (hInput: number, sInput: number, lInput: number): [number, number, number] => {
  const h = hInput / 360;
  const s = sInput / 100;
  const l = lInput / 100;

  if (s === 0) {
    return [l, l, l].map((v) => Math.round(v * 255)) as [number, number, number];
  }

  const hue2rgb = (p: number, q: number, tInput: number): number => {
    let t = tInput;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);

  return [r, g, b].map((v) => Math.round(v * 255)) as [number, number, number];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const hslToHex = (h: number, s: number, l: number): string => {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

const processCssContent = (cssContent: string): string => {
  const hslRegex = /(--[\w-]+:\s*)([\d.]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*(?:;|\/[\d\s%.]+))?/gi;

  return cssContent.replaceAll(
    hslRegex,
    (match: string, _prefix: string, h: string, s: string, l: string, offset: number, string: string) => {
      const hexColor = hslToHex(Number(h), Number(s), Number(l));
      const comment = `/* ${hexColor} */`;

      const remaining = string.slice(offset + match.length);
      if (!remaining.trimStart().startsWith(comment)) {
        return match.trimEnd().endsWith(';') ? `${match} ${comment}` : `${match}; ${comment}`;
      }

      return match;
    }
  );
};

import { logger } from '../packages/shared/utils/src/lib/logger';

const updateCssFile = (filePath: string): void => {
  const cssContent = readFileSync(filePath, 'utf-8');
  const updatedCssContent = processCssContent(cssContent);
  writeFileSync(filePath, updatedCssContent, 'utf-8');
  logger.info(`Updated CSS file: ${filePath}`);
};

if (require.main === module) {
  const cssFiles = (await Bun.$`find src -name '*.css'`.text()).split('\n').filter(Boolean);
  cssFiles.forEach(updateCssFile);
}
