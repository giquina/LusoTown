const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // Performance optimizations
  maxWorkers: '50%',
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/lib/supabase.ts',
    '!**/*.config.js',
    '!coverage/**',
    '!.next/**',
    '!node_modules/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  testMatch: [
    '<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/__tests__/e2e/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid|@supabase|@stripe|lucide-react|framer-motion)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Enhanced module mapping for monorepo
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lusotown/(.*)$': '<rootDir>/../packages/$1/src'
  },
  // Test timeout for Portuguese content loading
  testTimeout: 10000,
}

module.exports = createJestConfig(customJestConfig)
