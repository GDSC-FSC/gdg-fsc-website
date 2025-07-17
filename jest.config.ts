/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/jest'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tests/jest/tsconfig.test.json',
      },
    ],
  },
} satisfies import('ts-jest').JestConfigWithTsJest;
