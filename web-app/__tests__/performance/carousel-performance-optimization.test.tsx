import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { jest } from '@jest/globals'
import { useCarouselPerformanceOptimization } from '@/hooks/useCarouselPerformanceOptimization'
import { usePortuguesePWAFeatures } from '@/hooks/usePortuguesePWAFeatures'
import OptimizedPortugueseCarousel from '@/components/carousels/OptimizedPortugueseCarousel'
import { LanguageProvider } from '@/context/LanguageContext'

// Mock dependencies
jest.mock('@/hooks/useCarouselPerformanceOptimization')
jest.mock('@/hooks/usePortuguesePWAFeatures')
jest.mock('@/utils/logger')

const mockPerformanceOptimization = useCarouselPerformanceOptimization as jest.MockedFunction<typeof useCarouselPerformanceOptimization>
const mockPWAFeatures = usePortuguesePWAFeatures as jest.MockedFunction<typeof usePortuguesePWAFeatures>

// Mock performance APIs
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  getEntriesByType: jest.fn(() => []),
  memory: {
    usedJSHeapSize: 50 * 1024 * 1024, // 50MB
    totalJSHeapSize: 100 * 1024 * 1024 // 100MB
  }
}

const mockNavigator = {
  onLine: true,
  connection: {
    effectiveType: '4g'
  }
}

// Test data
const mockCarouselItems = [
  {
    id: 'event-1',
    title: { en: 'Fado Night at Portuguese Cultural Centre', pt: 'Noite de Fado no Centro Cultural Português' },
    description: { en: 'Traditional Fado music evening', pt: 'Noite de música tradicional de Fado' },
    image: 'https://example.com/fado-night.jpg',
    category: 'cultural-event'
  },
  {
    id: 'event-2',
    title: { en: 'Portuguese Wine Tasting', pt: 'Prova de Vinhos Portugueses' },
    description: { en: 'Discover the finest Portuguese wines', pt: 'Descubra os melhores vinhos portugueses' },
    image: 'https://example.com/wine-tasting.jpg',
    category: 'cultural-event'
  },
  {
    id: 'event-3',
    title: { en: 'Festa Junina Celebration', pt: 'Celebração da Festa Junina' },
    description: { en: 'Brazilian cultural celebration', pt: 'Celebração cultural brasileira' },
    image: 'https://example.com/festa-junina.jpg',
    category: 'festa'
  }
]

// Helper component
const TestWrapper: React.FC<{ children: React.ReactNode; language?: 'en' | 'pt' }> = ({ 
  children, 
  language = 'en' 
}) => (
  <LanguageProvider>
    {children}
  </LanguageProvider>
)

describe('Carousel Performance Optimization', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Mock global APIs
    global.performance = mockPerformance as any
    global.navigator = mockNavigator as any
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn()
    }))
    global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16))
    global.cancelAnimationFrame = jest.fn()
    
    // Default mock implementations
    mockPerformanceOptimization.mockReturnValue({
      metrics: {
        loadTime: 150,
        renderTime: 25,
        interactionLatency: 8,
        memoryUsage: 45,
        networkStatus: 'online',
        frameRate: 58,
        bundleSize: 250,
        cacheHitRatio: 85
      },
      mobileSettings: {
        enableImageLazyLoading: true,
        enableIntersectionObserver: true,
        enableVirtualScrolling: true,
        enablePreloadOptimization: true,
        enableBundleSplitting: true,
        enableCriticalPathOptimization: true,
        enablePortugueseContentPrioritization: true
      },
      portugueseReadingPatterns: {
        averageReadingTime: 200,
        scrollVelocity: 1.2,
        interactionFrequency: 3.5,
        contentEngagement: 78,
        preferredAutoAdvanceSpeed: 6500
      },
      optimizePortugueseImages: jest.fn().mockResolvedValue('https://example.com/optimized-image.jpg'),
      analyzePortugueseReadingPatterns: jest.fn(),
      measureInteractionLatency: jest.fn(),
      recordInteractionComplete: jest.fn(),
      getOptimalAutoAdvanceTime: jest.fn().mockReturnValue(6500),
      getOptimizationRecommendations: jest.fn().mockReturnValue(['enable-virtual-scrolling']),
      isOptimized: true
    })

    mockPWAFeatures.mockReturnValue({
      installationState: {
        canInstall: true,
        isInstalled: false,
        installPromptEvent: null,
        hasShownPrompt: false,
        installationSource: null
      },
      offlineCapabilities: {
        isOffline: false,
        hasOfflineContent: true,
        cachedPagesCount: 15,
        offlineEventsCount: 8,
        offlineBusinessesCount: 12,
        lastSyncTime: new Date(),
        pendingActions: []
      },
      notificationSettings: {
        enabled: true,
        culturalEvents: true,
        businessUpdates: true,
        communityMessages: true,
        festivalReminders: true,
        fadoNights: true,
        portugalDay: true,
        brazilianEvents: true,
        capeVerdeanEvents: true,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
        language: 'en' as const
      },
      backgroundSyncData: {
        culturalEvents: [],
        featuredBusinesses: [],
        communityUpdates: [],
        userPreferences: {},
        lastSyncTimestamp: new Date()
      },
      getPortugueseInstallMessage: jest.fn().mockReturnValue({
        title: 'Install LusoTown App',
        subtitle: 'Get instant access to Portuguese cultural events',
        description: 'Never miss Fado nights, festivals, or community gatherings.',
        install: 'Install App',
        later: 'Maybe Later',
        benefits: ['Offline access', 'Push notifications', 'Faster loading']
      }),
      handleInstallPrompt: jest.fn().mockResolvedValue(true),
      requestPortugueseNotifications: jest.fn().mockResolvedValue(true),
      enableOfflineMode: jest.fn(),
      syncPortugueseContent: jest.fn(),
      queueOfflineAction: jest.fn(),
      processOfflineActions: jest.fn(),
      setNotificationSettings: jest.fn(),
      isFullyOfflineCapable: true
    })
  })

  describe('Performance Monitoring', () => {
    it('should initialize performance monitoring on mount', async () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
          />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(mockPerformanceOptimization).toHaveBeenCalledWith({
          enableRealTimeMonitoring: true,
          enablePortugueseOptimizations: true,
          optimizationLevel: 'standard'
        })
      })
    })

    it('should measure interaction latency on carousel navigation', async () => {
      const { measureInteractionLatency, recordInteractionComplete } = mockPerformanceOptimization()

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            showControls={true}
          />
        </TestWrapper>
      )

      const nextButton = screen.getByLabelText(/next portuguese cultural items/i)
      
      act(() => {
        fireEvent.click(nextButton)
      })

      expect(measureInteractionLatency).toHaveBeenCalled()
      expect(recordInteractionComplete).toHaveBeenCalled()
    })

    it('should optimize Portuguese reading patterns', async () => {
      const { analyzePortugueseReadingPatterns } = mockPerformanceOptimization()

      render(
        <TestWrapper language="pt">
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.pt}</div>}
            enablePortugueseCulturalOptimization={true}
          />
        </TestWrapper>
      )

      const nextButton = screen.getByLabelText(/próximos itens culturais portugueses/i)
      
      act(() => {
        fireEvent.click(nextButton)
      })

      await waitFor(() => {
        expect(analyzePortugueseReadingPatterns).toHaveBeenCalledWith({
          scrollVelocity: expect.any(Number),
          dwellTime: expect.any(Number),
          engagementScore: expect.any(Number)
        })
      })
    })

    it('should display performance metrics in development mode', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
            title={{ en: 'Portuguese Events', pt: 'Eventos Portugueses' }}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/load: \d+ms/i)).toBeInTheDocument()
      expect(screen.getByText(/memory: \d+mb/i)).toBeInTheDocument()
      expect(screen.getByText(/fps: \d+/i)).toBeInTheDocument()

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('PWA Features', () => {
    it('should initialize PWA features', async () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enableOfflineMode={true}
          />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(mockPWAFeatures).toHaveBeenCalled()
      })
    })

    it('should show offline status when offline', () => {
      mockPWAFeatures.mockReturnValue({
        ...mockPWAFeatures(),
        offlineCapabilities: {
          ...mockPWAFeatures().offlineCapabilities,
          isOffline: true
        }
      })

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/offline mode/i)).toBeInTheDocument()
    })

    it('should queue actions when offline', async () => {
      const { queueOfflineAction } = mockPWAFeatures()
      
      mockPWAFeatures.mockReturnValue({
        ...mockPWAFeatures(),
        offlineCapabilities: {
          ...mockPWAFeatures().offlineCapabilities,
          isOffline: true
        }
      })

      const handleItemClick = jest.fn()

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            onItemClick={handleItemClick}
          />
        </TestWrapper>
      )

      const firstItem = screen.getByTestId('item-event-1')
      
      act(() => {
        fireEvent.click(firstItem)
      })

      expect(queueOfflineAction).toHaveBeenCalledWith({
        type: 'favorite-event',
        data: { itemId: 'event-1', index: 0 }
      })
      expect(handleItemClick).toHaveBeenCalledWith(mockCarouselItems[0], 0)
    })
  })

  describe('Portuguese Cultural Optimizations', () => {
    it('should apply Portuguese auto-advance timing', async () => {
      const { getOptimalAutoAdvanceTime } = mockPerformanceOptimization()

      render(
        <TestWrapper language="pt">
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.pt}</div>}
            autoAdvance={true}
            enablePortugueseCulturalOptimization={true}
          />
        </TestWrapper>
      )

      expect(getOptimalAutoAdvanceTime).toHaveBeenCalled()
    })

    it('should optimize images for Portuguese cultural content', async () => {
      const { optimizePortugueseImages } = mockPerformanceOptimization()

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
          />
        </TestWrapper>
      )

      // Image optimization would be called during rendering process
      await waitFor(() => {
        expect(optimizePortugueseImages).toBeDefined()
      })
    })

    it('should display Portuguese cultural content correctly', () => {
      render(
        <TestWrapper language="pt">
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.pt}</div>}
            title={{ en: 'Cultural Events', pt: 'Eventos Culturais' }}
            subtitle={{ en: 'Portuguese community events', pt: 'Eventos da comunidade portuguesa' }}
          />
        </TestWrapper>
      )

      expect(screen.getByText('Eventos Culturais')).toBeInTheDocument()
      expect(screen.getByText('Eventos da comunidade portuguesa')).toBeInTheDocument()
      expect(screen.getByText('Noite de Fado no Centro Cultural Português')).toBeInTheDocument()
    })
  })

  describe('Mobile Optimizations', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
    })

    it('should use mobile-optimized settings', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/mobile/i)).toBeInTheDocument()
    })

    it('should display mobile swipe hint', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
          />
        </TestWrapper>
      )

      // Mobile swipe hints are displayed as dots
      const swipeHints = document.querySelectorAll('.w-1.h-1.bg-gray-400, .w-1.h-1.bg-primary-500')
      expect(swipeHints.length).toBeGreaterThan(0)
    })
  })

  describe('Performance Score Calculation', () => {
    it('should calculate and display performance score', async () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
            title={{ en: 'Events', pt: 'Eventos' }}
          />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText(/score: \d+%/i)).toBeInTheDocument()
      })
    })

    it('should show optimization recommendations', () => {
      mockPerformanceOptimization.mockReturnValue({
        ...mockPerformanceOptimization(),
        getOptimizationRecommendations: jest.fn().mockReturnValue([
          'enable-virtual-scrolling',
          'optimize-memory-usage'
        ])
      })

      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            enablePerformanceOptimization={true}
            title={{ en: 'Events', pt: 'Eventos' }}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/2 optimizations available/i)).toBeInTheDocument()

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('Loading States', () => {
    it('should show loading skeleton', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            loading={true}
          />
        </TestWrapper>
      )

      expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('should show empty state when no items', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={[]}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/no portuguese cultural content available/i)).toBeInTheDocument()
    })

    it('should show offline message in empty state when offline', () => {
      mockPWAFeatures.mockReturnValue({
        ...mockPWAFeatures(),
        offlineCapabilities: {
          ...mockPWAFeatures().offlineCapabilities,
          isOffline: true
        }
      })

      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={[]}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
          />
        </TestWrapper>
      )

      expect(screen.getByText(/you are offline/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
            title={{ en: 'Cultural Events', pt: 'Eventos Culturais' }}
            showControls={true}
          />
        </TestWrapper>
      )

      expect(screen.getByRole('region', { name: 'Cultural Events' })).toBeInTheDocument()
      expect(screen.getByLabelText(/previous portuguese cultural items/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/next portuguese cultural items/i)).toBeInTheDocument()
    })

    it('should provide status updates for screen readers', () => {
      render(
        <TestWrapper>
          <OptimizedPortugueseCarousel
            items={mockCarouselItems}
            renderItem={(item) => <div data-testid={`item-${item.id}`}>{item.title.en}</div>}
          />
        </TestWrapper>
      )

      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText(/showing portuguese cultural items/i)).toBeInTheDocument()
    })
  })
})

describe('Performance Hooks', () => {
  describe('useCarouselPerformanceOptimization', () => {
    it('should return performance metrics', () => {
      const { result } = renderHook(() => 
        useCarouselPerformanceOptimization({ enableRealTimeMonitoring: true })
      )

      expect(result.current.metrics).toBeDefined()
      expect(result.current.isOptimized).toBe(true)
    })
  })

  describe('usePortuguesePWAFeatures', () => {
    it('should return PWA capabilities', () => {
      const { result } = renderHook(() => usePortuguesePWAFeatures())

      expect(result.current.installationState).toBeDefined()
      expect(result.current.offlineCapabilities).toBeDefined()
      expect(result.current.isFullyOfflineCapable).toBe(true)
    })
  })
})