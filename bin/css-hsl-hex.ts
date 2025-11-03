import { readFileSync, writeFileSync } from 'node:fs';

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    return [l, l, l].map((v) => Math.round(v * 255)) as [number, number, number];
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
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
  const hslRegex =
    /(--[a-zA-Z0-9-]+:\s*)(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%(?:\s*;|\s*\/\s*\d+%)?(?:\s*\/\*\s*#[a-fA-F0-9]{6}\s*\*\/)?/g;

  return cssContent.replace(hslRegex, (match, prefix, h, s, l) => {
    const hexColor = hslToHex(Number(h), Number(s), Number(l));
    const comment = `/* ${hexColor} */`;

    if (!match.includes(comment)) {
      return `${prefix}${h} ${s}% ${l}%; ${comment}`;
    }

    return match;
  });
};

const updateCssFile = (filePath: string): void => {
  const cssContent = readFileSync(filePath, 'utf-8');
  const updatedCssContent = processCssContent(cssContent);
  writeFileSync(filePath, updatedCssContent, 'utf-8');
  console.log(`Updated CSS file: ${filePath}`);
};

if (require.main === module) {
  (async () => {
    const cssFiles = (await Bun.$`find src -name '*.css'`.text()).split('\n').filter(Boolean);
    cssFiles.forEach(updateCssFile);
  })();
}
