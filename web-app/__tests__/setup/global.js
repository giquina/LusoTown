// Global test setup for LusoTown Portuguese community platform
// This file runs before each test file

// Mock global environment
global.console = {
  ...console,
  // Reduce console noise during testing
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,
  error: console.error,
}

// Mock Next.js environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_TOTAL_MEMBERS = '750'
process.env.NEXT_PUBLIC_TOTAL_STUDENTS = '2150'
process.env.NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS = '8'

// Mock window object for browser APIs - more carefully
if (typeof window !== 'undefined' && !window.location.href.includes('localhost:3000')) {
  delete window.location
  window.location = {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: ''
  }
}

// Mock fetch for API calls
global.fetch = jest.fn()

// Mock crypto for UUID generation
if (!global.crypto) {
  global.crypto = {}
}
global.crypto.randomUUID = jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9))
