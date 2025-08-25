// Mobile App Testing Setup
import '@testing-library/jest-native/extend-expect'

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        SUPABASE_URL: 'mock-supabase-url',
        SUPABASE_ANON_KEY: 'mock-supabase-key'
      }
    }
  }
}))

jest.mock('expo-localization', () => ({
  locale: 'pt-PT'
}))

jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  scheduleNotificationAsync: jest.fn(() => Promise.resolve('notification-id'))
}))

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn()
    }),
    useRoute: () => ({
      params: {}
    })
  }
})

// Mock Supabase
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      user: jest.fn()
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      })),
      insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      update: jest.fn(() => Promise.resolve({ data: null, error: null })),
      delete: jest.fn(() => Promise.resolve({ data: null, error: null }))
    }))
  }
}))

// Performance measurement mock
global.performance = {
  now: jest.fn(() => Date.now()),
  measure: jest.fn(),
  mark: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn()
}

// Portuguese community testing utilities
global.PORTUGUESE_COMMUNITY_CONSTANTS = {
  SAMPLE_PORTUGUESE_TEXT: 'São João - Festa Tradicional Portuguesa',
  SAMPLE_USER_NAME: 'José Silva',
  SAMPLE_EVENT_TITLE: 'Fado em Lisboa - Concerto Especial',
  SAMPLE_BUSINESS_NAME: 'Restaurante O Bacalhau',
  HERITAGE_OPTIONS: ['Portugal', 'Brasil', 'Cabo Verde', 'Angola', 'Moçambique'],
  UK_CITIES: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol']
}
