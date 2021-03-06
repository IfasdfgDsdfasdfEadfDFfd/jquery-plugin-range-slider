const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '@core': '<rootDir>/src/core',
    'core/utils': '<rootDir>/src/core/utils',
    '@components': '<rootDir>/src/components',
    'components/(.*)': '<rootDir>/src/components/$1',
    '@store': '<rootDir>/src/store',
  },
};
