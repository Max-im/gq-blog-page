'use strict'

module.exports = {
  testMatch: ['**/*.test.js'],
  verbose: true,
  bail: true,
  rootDir: 'tests',
  globalSetup: '<rootDir>/settings/globalSetup.js',
  globalTeardown: '<rootDir>/settings/globalTeardown.js',
}