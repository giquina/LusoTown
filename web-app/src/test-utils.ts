/**
 * Testing utilities for LusoTown platform
 * Provides reusable test helpers, mocks, and setup functions
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Custom render function with providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // TODO: Add providers wrapper when contexts are needed
  return render(ui, options);
}

// Mock data generators
export const mockUser = {
  id: 'test-user-123',
  email: 'test@lusotown.com',
  name: 'Test User',
  role: 'user' as const,
  membershipTier: 'premium' as const,
  profileImage: '/test-avatar.jpg',
  joinedDate: '2024-01-01',
  interests: ['Portuguese Culture', 'Networking'],
  favoriteEvents: ['event-1', 'event-2'],
  location: 'London, UK',
};

export const mockEvent = {
  id: 'test-event-123',
  title: 'Portuguese Cultural Night',
  description: 'Join us for an evening of Portuguese culture',
  date: '2024-12-25',
  time: '19:00',
  location: 'Camden, London',
  price: 25.00,
  currency: 'GBP',
  category: 'Cultural',
  attendees: 45,
  maxAttendees: 100,
};

// Test helper functions
export const createMockEvent = (overrides = {}) => ({
  ...mockEvent,
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  ...mockUser,
  ...overrides,
});

// Mock localStorage
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Setup test environment
export const setupTestEnvironment = () => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  // Mock window.matchMedia
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
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
  };

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
  };
};

// Async test helpers
export const waitForAsync = (ms: number = 0) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const flushPromises = () => new Promise(setImmediate);

// Mock API responses
export const mockApiResponse = <T>(data: T) =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  } as Response);

export const mockApiError = (status: number = 400, message: string = 'Bad Request') =>
  Promise.reject({
    ok: false,
    status,
    json: () => Promise.resolve({ error: message }),
  });

export default {
  renderWithProviders,
  setupTestEnvironment,
  mockUser,
  mockEvent,
  createMockEvent,
  createMockUser,
  waitForAsync,
  flushPromises,
  mockApiResponse,
  mockApiError,
};
