import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { NetworkingProvider, useNetworking } from '@/context/NetworkingContext'
import { portugueseTestUtils } from '../utils/test-utils'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

describe('NetworkingContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NetworkingProvider>{children}</NetworkingProvider>
  )

  describe('Initialization', () => {
    it('should initialize with empty state when no saved data', () => {
      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      expect(result.current.connections).toEqual([])
      expect(result.current.stats.totalConnections).toBe(0)
      expect(result.current.loading).toBe(false)
    })

    it('should load saved connections from localStorage', () => {
      const mockConnections = portugueseTestUtils.mockPortugueseConnections
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      expect(result.current.connections).toHaveLength(1)
      expect(result.current.connections[0].connectedUser.firstName).toBe('Maria')
    })
  })

  describe('Connection Management', () => {
    it('should sort connections by recent activity', () => {
      const mockConnections = [
        {
          ...portugueseTestUtils.mockPortugueseConnections[0],
          lastInteractionAt: '2024-01-10T10:00:00Z'
        },
        {
          ...portugueseTestUtils.mockPortugueseConnections[0],
          id: 'conn-2',
          connectedUserId: 'user-carlos',
          connectedUser: {
            ...portugueseTestUtils.mockPortugueseConnections[0].connectedUser,
            id: 'user-carlos',
            firstName: 'Carlos'
          },
          lastInteractionAt: '2024-01-20T10:00:00Z'
        }
      ]

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const sortedConnections = result.current.getConnections('recent')
      expect(sortedConnections[0].connectedUser.firstName).toBe('Carlos')
      expect(sortedConnections[1].connectedUser.firstName).toBe('Maria')
    })

    it('should filter connections by search query', () => {
      const mockConnections = portugueseTestUtils.mockPortugueseConnections
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const filteredConnections = result.current.searchConnections('Maria')
      expect(filteredConnections).toHaveLength(1)
      expect(filteredConnections[0].connectedUser.firstName).toBe('Maria')
    })

    it('should filter connections by location', () => {
      const mockConnections = portugueseTestUtils.mockPortugueseConnections
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const filteredConnections = result.current.filterConnections({
        location: 'Camberwell'
      })
      expect(filteredConnections).toHaveLength(1)
      expect(filteredConnections[0].connectedUser.location).toContain('Camberwell')
    })

    it('should filter connections by membership tier', () => {
      const mockConnections = portugueseTestUtils.mockPortugueseConnections
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const filteredConnections = result.current.filterConnections({
        membershipTier: 'premium'
      })
      expect(filteredConnections).toHaveLength(1)
      expect(filteredConnections[0].connectedUser.membershipTier).toBe('premium')
    })
  })

  describe('Portuguese Cultural Features', () => {
    it('should provide Portuguese conversation starters', () => {
      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const culturalStarters = result.current.getConversationStarters('cultural')
      expect(culturalStarters.length).toBeGreaterThan(0)
      
      const fadoStarter = culturalStarters.find(starter => 
        starter.text_pt.includes('Fado')
      )
      expect(fadoStarter).toBeDefined()
      expect(fadoStarter?.text_en).toContain('Fado')
    })

    it('should include Portuguese cultural context in conversation starters', () => {
      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const allStarters = result.current.getConversationStarters()
      const portugueseTerms = ['Fado', 'Santos Populares', 'tradição portuguesa']
      
      const hasPortugueseContent = allStarters.some(starter =>
        portugueseTerms.some(term => 
          starter.text_pt.includes(term) || starter.context?.includes(term)
        )
      )
      
      expect(hasPortugueseContent).toBe(true)
    })
  })

  describe('Notifications', () => {
    it('should track unread notifications count', () => {
      const mockNotifications = [
        {
          id: 'notif-1',
          type: 'new_connection' as const,
          title: 'New Connection!',
          message: 'You connected with Maria',
          isRead: false,
          createdAt: '2024-01-08T19:45:00Z'
        },
        {
          id: 'notif-2',
          type: 'milestone' as const,
          title: 'Achievement Unlocked!',
          message: 'Cultural Enthusiast badge earned',
          isRead: true,
          createdAt: '2024-01-20T18:00:00Z'
        }
      ]

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-network-notifications') {
          return JSON.stringify(mockNotifications)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      expect(result.current.getUnreadNotificationsCount()).toBe(1)
    })

    it('should mark notifications as read', () => {
      const mockNotifications = [
        {
          id: 'notif-1',
          type: 'new_connection' as const,
          title: 'New Connection!',
          message: 'You connected with Maria',
          isRead: false,
          createdAt: '2024-01-08T19:45:00Z'
        }
      ]

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-network-notifications') {
          return JSON.stringify(mockNotifications)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      act(() => {
        result.current.markNotificationAsRead('notif-1')
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lusotown-network-notifications',
        expect.stringContaining('"isRead":true')
      )
    })
  })

  describe('Network Analytics', () => {
    it('should calculate network analytics correctly', () => {
      const mockConnections = [
        {
          ...portugueseTestUtils.mockPortugueseConnections[0],
          connectionStrength: 8.5,
          firstMetEvent: {
            id: 'event-fado',
            title: 'Fado Night',
            date: '2024-01-15'
          }
        },
        {
          ...portugueseTestUtils.mockPortugueseConnections[0],
          id: 'conn-2',
          connectionStrength: 6.2,
          firstMetEvent: {
            id: 'event-food',
            title: 'Food Tour',
            date: '2024-01-20'
          }
        }
      ]

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      const analytics = result.current.getNetworkAnalytics()
      
      expect(analytics.averageConnectionStrength).toBeCloseTo(7.4, 1)
      expect(analytics.strongConnectionsPercent).toBe(50) // 1 out of 2 connections >= 7
    })
  })

  describe('Data Export', () => {
    it('should export connections as CSV', () => {
      const mockCreateObjectURL = jest.fn(() => 'mock-url')
      const mockClick = jest.fn()
      
      global.URL.createObjectURL = mockCreateObjectURL
      global.Blob = jest.fn(() => ({})) as any
      
      // Mock createElement and appendChild
      const mockAnchor = {
        setAttribute: jest.fn(),
        click: mockClick,
      }
      jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any)
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as any)
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor as any)

      const mockConnections = portugueseTestUtils.mockPortugueseConnections
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return JSON.stringify(mockConnections)
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      act(() => {
        result.current.exportConnections('csv')
      })

      expect(mockClick).toHaveBeenCalled()
      expect(mockAnchor.setAttribute).toHaveBeenCalledWith('download', 'lusotown-connections.csv')
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('LocalStorage error')
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      // Should not crash and should initialize with empty data
      expect(result.current.connections).toEqual([])
      expect(result.current.loading).toBe(false)
    })

    it('should handle malformed JSON in localStorage', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown-connections') {
          return 'invalid-json'
        }
        return null
      })

      const { result } = renderHook(() => useNetworking(), { wrapper })
      
      // Should not crash and should initialize with empty data
      expect(result.current.connections).toEqual([])
    })
  })
})
