// Test utilities for LusoTown platform
// Portuguese-speaking community focused testing helpers

// Mock IntersectionObserver with proper interface compliance
global.IntersectionObserver = class IntersectionObserver implements IntersectionObserver {
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}
  
  observe() {}
  unobserve() {}
  disconnect() {}
  
  get root() { return null }
  get rootMargin() { return '0px' }
  get thresholds() { return [0] }
  
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver implements ResizeObserver {
  constructor(public callback: ResizeObserverCallback) {}
  
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock MutationObserver
global.MutationObserver = class MutationObserver implements MutationObserver {
  constructor(public callback: MutationCallback) {}
  
  observe() {}
  disconnect() {}
  
  takeRecords(): MutationRecord[] {
    return []
  }
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
})

// Mock fetch for API testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
) as jest.MockedFunction<typeof fetch>

// Export test utilities
export const testUtils = {
  // Mock Portuguese user data
  mockPortugueseUser: {
    id: 'user-123',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@example.com',
    location: 'London, UK',
    culturalBackground: 'Portuguese',
    membershipTier: 'premium',
    isVerified: true,
    preferences: {
      language: 'pt',
      culturalInterests: ['fado', 'food', 'festivals'],
      notificationSettings: {
        events: true,
        matches: true,
        messages: true
      }
    }
  },

  // Mock English user living in London
  mockEnglishUser: {
    id: 'user-456',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    location: 'Camden, London',
    culturalBackground: 'British',
    membershipTier: 'community',
    isVerified: false,
    preferences: {
      language: 'en',
      culturalInterests: ['networking', 'cultural-exchange'],
      notificationSettings: {
        events: true,
        matches: false,
        messages: true
      }
    }
  },

  // Mock Portuguese cultural events
  mockPortugueseEvent: {
    id: 'event-123',
    title: 'Festa de São João',
    title_en: 'St. John Festival',
    description: 'Celebração tradicional portuguesa com música, dança e comida',
    description_en: 'Traditional Portuguese celebration with music, dance and food',
    date: '2024-06-24T19:00:00Z',
    location: 'Portuguese Cultural Centre, London',
    price: 20,
    currency: 'GBP',
    category: 'cultural',
    cultural_tags: ['traditional', 'music', 'food', 'santos_populares'],
    capacity: 100,
    registered_count: 45,
    image_url: 'https://example.com/sao-joao.jpg',
    organizer: {
      name: 'Centro Cultural Português',
      verified: true
    }
  },

  // Mock API responses
  mockApiResponse: (data: any, status = 200) => {
    return Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data))
    })
  },

  // Mock Supabase client
  mockSupabaseClient: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null })
  },

  // Mock Next.js router
  mockRouter: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    route: '/',
    basePath: '',
    isLocaleDomain: true,
    isReady: true,
    isPreview: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    }
  },

  // Setup function for common test environment
  setupTestEnvironment: () => {
    // Mock window methods
    window.scrollTo = jest.fn()
    window.alert = jest.fn()
    window.confirm = jest.fn(() => true)
    
    // Mock performance API
    if (!window.performance) {
      window.performance = {
        now: jest.fn(() => Date.now()),
        mark: jest.fn(),
        measure: jest.fn()
      } as any
    }

    // Mock getUserMedia for streaming tests
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: jest.fn().mockResolvedValue({
          getTracks: () => [],
          getVideoTracks: () => [],
          getAudioTracks: () => []
        }),
        enumerateDevices: jest.fn().mockResolvedValue([])
      }
    })
  },

  // Cleanup function
  cleanupTestEnvironment: () => {
    jest.clearAllMocks()
    localStorageMock.clear()
  }
}

export default testUtils
