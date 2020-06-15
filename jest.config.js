const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/ext/**/*.ts',
    '<rootDir>/src/app/**/*.ts'
  ],
  coverageReporters: ['json-summary', 'text', 'html'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || { }, {
    prefix: '<rootDir>/'
  }),
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/ext/', '<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transformIgnorePatterns: ['^.+\\.js$'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts']
};
