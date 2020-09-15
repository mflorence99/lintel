module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './common/**/*.ts',
    './ext/**/*.ts',
    './src/app/**/*.ts',
    '!./src/app/**/barrel.ts',
    '!./src/app/**/icons.ts',
    '!./src/app/**/module.ts'
  ],
  coverageReporters: ['json-summary', 'text', 'html'],
  preset: 'jest-preset-angular',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './reports/junit' }]
  ],
  roots: ['./common/', './ext/', './src/'],
  setupFilesAfterEnv: [
    'jest-extended',
    'jest-preset-angular',
    './__mocks__/jsdom.ts'
  ],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  testResultsProcessor: 'jest-junit',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['^.+\\.js$']
};
