import React from 'react'
import '@testing-library/jest-dom'

// Helper function to strip framer-motion props
const stripFramerProps = (props) => {
  const {
    whileHover,
    whileTap,
    animate,
    initial,
    exit,
    variants,
    transition,
    ...cleanProps
  } = props
  return cleanProps
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Enhanced Framer Motion Mock with prop filtering
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement('div', stripFramerProps(props), children),
    section: ({ children, ...props }) => React.createElement('section', stripFramerProps(props), children),
    header: ({ children, ...props }) => React.createElement('header', stripFramerProps(props), children),
    nav: ({ children, ...props }) => React.createElement('nav', stripFramerProps(props), children),
    h1: ({ children, ...props }) => React.createElement('h1', stripFramerProps(props), children),
    h2: ({ children, ...props }) => React.createElement('h2', stripFramerProps(props), children),
    h3: ({ children, ...props }) => React.createElement('h3', stripFramerProps(props), children),
    p: ({ children, ...props }) => React.createElement('p', stripFramerProps(props), children),
    span: ({ children, ...props }) => React.createElement('span', stripFramerProps(props), children),
    button: ({ children, ...props }) => React.createElement('button', stripFramerProps(props), children),
    a: ({ children, ...props }) => React.createElement('a', stripFramerProps(props), children),
    li: ({ children, ...props }) => React.createElement('li', stripFramerProps(props), children),
    ul: ({ children, ...props }) => React.createElement('ul', stripFramerProps(props), children),
    article: ({ children, ...props }) => React.createElement('article', stripFramerProps(props), children),
    main: ({ children, ...props }) => React.createElement('main', stripFramerProps(props), children),
    aside: ({ children, ...props }) => React.createElement('aside', stripFramerProps(props), children),
    form: ({ children, ...props }) => React.createElement('form', stripFramerProps(props), children),
    input: (props) => React.createElement('input', stripFramerProps(props)),
    textarea: ({ children, ...props }) => React.createElement('textarea', stripFramerProps(props), children),
    img: (props) => React.createElement('img', stripFramerProps(props)),
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useMotionValue: (initial) => ({
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn(),
  }),
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
  Toaster: () => null,
}))

// Mock window.matchMedia for mobile testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url')

// Setup Portuguese locale for testing
global.Intl = {
  ...Intl,
  DateTimeFormat: jest.fn(() => ({
    format: jest.fn(date => date.toLocaleDateString('pt-PT')),
    formatToParts: jest.fn(),
  })),
  NumberFormat: jest.fn(() => ({
    format: jest.fn(number => number.toLocaleString('pt-PT')),
  })),
}

// Global test utilities
global.testUtils = {
  mockPortugueseUser: {
    id: 'test-user-pt',
    name: 'João Silva',
    email: 'joao@example.com',
    language: 'pt',
    location: 'Lisboa, Portugal',
    membershipTier: 'premium',
  },
  mockEnglishUser: {
    id: 'test-user-en',
    name: 'John Smith',
    email: 'john@example.com',
    language: 'en',
    location: 'London, United Kingdom',
    membershipTier: 'free',
  },
  mockPortugueseEvent: {
    id: 'event-fado',
    title: 'Noite de Fado',
    title_en: 'Fado Night',
    description: 'Uma noite especial de música tradicional portuguesa',
    description_en: 'A special night of traditional Portuguese music',
    date: '2024-02-15T20:00:00Z',
    location: 'Portuguese Cultural Centre, London',
    price: 25,
    currency: 'GBP',
    category: 'cultural',
  },
}
