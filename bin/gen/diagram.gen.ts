export default (async () =>
  console.log(
    (await import('node:child_process'))
      .execFileSync(
        'bunx',
        [
          'madge',
          '--extensions',
          'js,jsx,ts,tsx',
          '.',
          '--exclude',
          '/(^|\\/)\..+\\/|node_modules\\/',
          '-i',
          '../../docs/code/codebase-graph.png',
        ],
        { stdio: 'inherit' },
      )
      .toString(),
  ))();
