/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Compiled output is not a test source; ignoring it avoids running stale
  // copies of the suite after `npm run build`.
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
};