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
  
  // Coverage configuration
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
  
  // Test file patterns
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/__tests__/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/', 
    '<rootDir>/node_modules/', 
    '<rootDir>/__tests__/e2e/'
  ],
  
  // Transform configuration
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid|@supabase|@stripe|lucide-react|framer-motion|@heroicons)/)'
  ],
  
  // File extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lusotown/(.*)$': '<rootDir>/../packages/$1/src',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/mocks/fileMock.js'
  },
  
  // Timeouts
  testTimeout: 15000,
  
  // Global setup
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  
  // Setup for Portuguese community testing
  setupFiles: ['<rootDir>/__tests__/setup/global.js']
}

module.exports = createJestConfig(customJestConfig)
