module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverage: true,
    coverageReporters: ['html', 'text-summary']
  };