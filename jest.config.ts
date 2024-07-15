import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: false,
};

export default config;
