
/**
 * Jest configuration
 */
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  rootDir: './',
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -20
    }
  }
};
