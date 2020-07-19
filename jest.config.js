const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/common/**/*.ts',
    '<rootDir>/ext/**/*.ts',
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/barrel.ts',
    '!<rootDir>/src/app/**/icons.ts',
    '!<rootDir>/src/app/**/module.ts'
  ],
  coverageReporters: ['json-summary', 'text', 'html'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || { }, {
    prefix: '<rootDir>/'
  }),
  preset: 'jest-preset-angular',
  reporters: ['default', ['jest-junit', { outputDirectory: './reports/junit' } ]],
  roots: ['<rootDir>/common/', '<rootDir>/ext/', '<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  testResultsProcessor: 'jest-junit',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },  
  transformIgnorePatterns: ['^.+\\.js$']
};
