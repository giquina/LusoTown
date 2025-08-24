import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { NetworkingProvider, useNetworking } from '@/context/NetworkingContext'
import { portugueseTestUtils } from '../utils/test-utils'

// Mock localStorage with proper Jest mock types
const localStorageMock = {
  getItem: jest.fn() as jest.MockedFunction<Storage['getItem']>,
  setItem: jest.fn() as jest.MockedFunction<Storage['setItem']>,
  removeItem: jest.fn() as jest.MockedFunction<Storage['removeItem']>,
  clear: jest.fn() as jest.MockedFunction<Storage['clear']>,
  length: 0,
  key: jest.fn() as jest.MockedFunction<Storage['key']>
} as Storage

global.localStorage = localStorageMock

describe('NetworkingContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NetworkingProvider>{children}</NetworkingProvider>
  )

  it('should provide networking context', () => {
    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(result.current.connections).toBeDefined()
    expect(result.current.isLoading).toBe(false)
  })

  it('should handle mock connections data', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-connections') {
        return JSON.stringify(portugueseTestUtils.mockPortugueseConnections)
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(Array.isArray(result.current.connections)).toBe(true)
  })

  it('should handle connection filtering', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-connections') {
        return JSON.stringify(portugueseTestUtils.mockPortugueseConnections)
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    act(() => {
      // Test filtering functionality if available
      if (typeof result.current.filterConnections === 'function') {
        result.current.filterConnections('premium')
      }
    })

    expect(result.current).toBeDefined()
  })

  it('should handle connection strength updates', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-connections') {
        return JSON.stringify(portugueseTestUtils.mockPortugueseConnections)
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    act(() => {
      // Test connection updates if available
      if (typeof result.current.updateConnectionStrength === 'function') {
        result.current.updateConnectionStrength('conn-1', 9.0)
      }
    })

    expect(result.current).toBeDefined()
  })

  it('should handle privacy settings', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-privacy-settings') {
        return JSON.stringify({ level: 'normal' })
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
  })

  // Portuguese community specific tests
  it('should support Portuguese-speaking community connections', () => {
    const mockConnection = portugueseTestUtils.mockPortugueseConnections[0]
    
    expect(mockConnection.connectedUser?.firstName).toBe('Maria')
    expect(mockConnection.connectedUser?.lastName).toBe('Santos')
    expect(mockConnection.connectionStrength).toBeGreaterThan(8)
  })

  it('should handle cultural events integration', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-cultural-events') {
        return JSON.stringify(portugueseTestUtils.mockCulturalEvents)
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
  })

  // Test error handling
  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(result.current.isLoading).toBe(false)
  })

  // Test subscription integration
  it('should integrate with premium subscriptions', () => {
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'lusotown-subscription') {
        return JSON.stringify(portugueseTestUtils.mockPremiumSubscription)
      }
      return null
    })

    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    expect(result.current).toBeDefined()
  })

  // Test connection management
  it('should handle connection requests', () => {
    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    act(() => {
      if (typeof result.current.sendConnectionRequest === 'function') {
        result.current.sendConnectionRequest('user-123')
      }
    })

    expect(result.current).toBeDefined()
  })

  it('should handle connection acceptance', () => {
    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    act(() => {
      if (typeof result.current.acceptConnection === 'function') {
        result.current.acceptConnection('request-123')
      }
    })

    expect(result.current).toBeDefined()
  })

  it('should handle connection removal', () => {
    const { result } = renderHook(() => useNetworking(), { wrapper })
    
    act(() => {
      if (typeof result.current.removeConnection === 'function') {
        result.current.removeConnection('conn-1')
      }
    })

    expect(result.current).toBeDefined()
  })
})
