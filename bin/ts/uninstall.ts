import { execSync } from 'node:child_process';

const packages: [string, ...string[]] = process.argv.slice(2) as [string, ...string[]];

if (packages.length === 0) {
  console.error('Please provide at least one package name to uninstall.');
  process.exit(1);
}

const packageList = packages.join(' ');

execSync(`bun remove --ignore-scripts ${packageList}`, { stdio: 'inherit' });

console.log(`Successfully uninstalled: ${packageList}`);
