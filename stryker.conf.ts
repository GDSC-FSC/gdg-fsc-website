export default {
  mutator: 'typescript',
  packageManager: 'npm',
  reporters: ['progress', 'html', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'off',
  // '!{classes,decorators}/**/*.test.ts'
  mutate: ['./ts/{classes,decorators}/**/*.ts'],
  thresholds: {
    break: 95,
  },
};
// TODO: 🚩 Finish
