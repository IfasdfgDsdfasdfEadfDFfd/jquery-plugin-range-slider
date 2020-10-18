module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts'],
  moduleNameMapper: {
    "^.+\\.(scss)$": "identity-obj-proxy",
  },
};
