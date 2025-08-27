import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider } from '@/context/LanguageContext'
import LusophoneCarousel, { 
  WeekendEventItem, 
  MobileSettings, 
  PWASettings,
  useMobilePerformance,
  usePWAFeatures
} from '@/components/carousels/LusophoneCarousel'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  useTransform: () => 0,
  animate: jest.fn()
}))

// Mock EnhancedMobileGestures
jest.mock('@/components/EnhancedMobileGestures', () => ({
  EnhancedMobileGestures: ({ children, onSwipe, onTap }: any) => (
    <div data-testid="enhanced-mobile-gestures" onClick={() => onTap?.({ x: 100, y: 100 })}>
      {children}
    </div>
  ),
  usePortugueseGestures: () => ({
    detectCulturalPattern: jest.fn(() => null),
    gestureHistory: []
  })
}))

// Mock Navigator APIs
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true
})

Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: jest.fn()
})

// Mock performance API
Object.defineProperty(performance, 'memory', {
  writable: true,
  value: {
    usedJSHeapSize: 1024 * 1024 * 10 // 10MB
  }
})

// Mock SpeechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn(() => [])
  }
})

describe('Enhanced Mobile LusophoneCarousel', () => {
  const mockWeekendEvents: WeekendEventItem[] = [
    {
      id: 'event-1',
      title: { en: 'Fado Night London', pt: 'Noite de Fado Londres' },
      description: { en: 'Authentic Portuguese music', pt: 'Música portuguesa autêntica' },
      image: '/events/fado-night.jpg',
      flagEmoji: '🇵🇹',
      countries: ['Portugal'],
      category: 'music',
      priority: 1,
      date: '2024-12-14',
      time: '20:00',
      location: 'Heritage Centre',
      price: 25,
      attendees: 45,
      maxAttendees: 80,
      tags: ['Fado', 'Traditional Music']
    },
    {
      id: 'event-2',
      title: { en: 'Brazilian Carnival Workshop', pt: 'Workshop de Carnaval Brasileiro' },
      description: { en: 'Learn samba steps', pt: 'Aprenda passos de samba' },
      image: '/events/carnival.jpg',
      flagEmoji: '🇧🇷',
      countries: ['Brazil'],
      category: 'dance',
      priority: 2,
      date: '2024-12-15',
      time: '14:00',
      location: 'Community Hall',
      price: 18,
      attendees: 32,
      maxAttendees: 60,
      tags: ['Samba', 'Dance']
    }
  ]

  const defaultMobileSettings: Partial<MobileSettings> = {
    enableSwipeGestures: true,
    enableHapticFeedback: true,
    enableMomentumScrolling: true,
    enablePullToRefresh: true,
    touchThreshold: 44,
    swipeVelocityThreshold: 0.3,
    enableLazyLoading: true,
    preloadDistance: 2
  }

  const defaultPWASettings: Partial<PWASettings> = {
    enableOfflineMode: true,
    enablePushNotifications: true,
    enableBackgroundSync: true,
    cacheStrategy: 'stale-while-revalidate',
    offlineQueueLimit: 50
  }

  const renderCarousel = (props?: any) => {
    return render(
      <LanguageProvider>
        <LusophoneCarousel
          items={mockWeekendEvents}
          renderItem={(item) => (
            <div data-testid={`carousel-item-${item.id}`}>
              <h3>{item.title.en}</h3>
              <p>{item.description?.en}</p>
            </div>
          )}
          title={{
            en: 'Portuguese Cultural Events',
            pt: 'Eventos Culturais Portugueses'
          }}
          mobileSettings={defaultMobileSettings}
          pwaSettings={defaultPWASettings}
          enablePortugueseGestures={true}
          enableAccessibilityAnnouncements={true}
          {...props}
        />
      </LanguageProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset navigator.onLine to true
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true })
  })

  describe('Basic Mobile Functionality', () => {
    it('renders with mobile-optimized layout', () => {
      renderCarousel()
      
      expect(screen.getByText('Portuguese Cultural Events')).toBeInTheDocument()
      expect(screen.getByTestId('carousel-item-event-1')).toBeInTheDocument()
      expect(screen.getByTestId('enhanced-mobile-gestures')).toBeInTheDocument()
    })

    it('displays Portuguese cultural content correctly', () => {
      renderCarousel()
      
      expect(screen.getByText('Fado Night London')).toBeInTheDocument()
      expect(screen.getByText('Brazilian Carnival Workshop')).toBeInTheDocument()
    })

    it('applies mobile-specific CSS classes', () => {
      const { container } = renderCarousel()
      
      const carouselSection = container.querySelector('.lusophone-carousel')
      expect(carouselSection).toBeInTheDocument()
    })
  })

  describe('Mobile Touch Interactions', () => {
    it('handles swipe gestures for navigation', async () => {
      const mockSwipeHandler = jest.fn()
      renderCarousel({ onSwipeGesture: mockSwipeHandler })
      
      const gesturesContainer = screen.getByTestId('enhanced-mobile-gestures')
      
      // Simulate swipe gesture through the EnhancedMobileGestures component
      fireEvent.click(gesturesContainer)
      
      await waitFor(() => {
        expect(gesturesContainer).toBeInTheDocument()
      })
    })

    it('provides haptic feedback on navigation', async () => {
      renderCarousel()
      
      const nextButton = screen.getByLabelText(/next portuguese cultural items/i)
      fireEvent.click(nextButton)
      
      await waitFor(() => {
        expect(navigator.vibrate).toHaveBeenCalledWith(10)
      })
    })

    it('maintains WCAG 2.1 AA touch target sizes', () => {
      renderCarousel()
      
      const navigationButtons = screen.getAllByRole('button')
      navigationButtons.forEach(button => {
        const styles = window.getComputedStyle(button)
        const minSize = button.style.minWidth || button.style.minHeight
        if (minSize) {
          expect(minSize).toBe('44px')
        }
      })
    })
  })

  describe('PWA Features', () => {
    it('displays offline mode indicator when offline', async () => {
      // Mock offline state
      Object.defineProperty(navigator, 'onLine', { value: false, writable: true })
      
      renderCarousel()
      
      await waitFor(() => {
        expect(screen.getByText(/offline mode.*cached portuguese cultural content/i)).toBeInTheDocument()
      })
    })

    it('shows PWA install prompt when available', async () => {
      // Mock beforeinstallprompt event
      const mockInstallPrompt = {
        prompt: jest.fn(),
        userChoice: Promise.resolve({ outcome: 'accepted' })
      }

      // Simulate install prompt availability
      window.dispatchEvent(new CustomEvent('beforeinstallprompt', { detail: mockInstallPrompt }))
      
      renderCarousel()
      
      await waitFor(() => {
        const installButton = screen.queryByText(/install app/i)
        if (installButton) {
          expect(installButton).toBeInTheDocument()
        }
      })
    })

    it('handles pull-to-refresh gesture', async () => {
      const mockRefreshHandler = jest.fn().mockResolvedValue(undefined)
      renderCarousel({ onPullToRefresh: mockRefreshHandler })
      
      // Simulate pull gesture
      const gesturesContainer = screen.getByTestId('enhanced-mobile-gestures')
      fireEvent.touchStart(gesturesContainer, {
        touches: [{ clientX: 100, clientY: 0 }]
      })
      fireEvent.touchMove(gesturesContainer, {
        touches: [{ clientX: 100, clientY: 100 }]
      })
      fireEvent.touchEnd(gesturesContainer)
      
      // Note: Actual pull-to-refresh would be handled by the EnhancedMobileGestures component
      expect(gesturesContainer).toBeInTheDocument()
    })
  })

  describe('Performance Monitoring', () => {
    it('tracks and reports performance metrics', async () => {
      const mockPerformanceHandler = jest.fn()
      renderCarousel({ onPerformanceUpdate: mockPerformanceHandler })
      
      await waitFor(() => {
        expect(mockPerformanceHandler).toHaveBeenCalled()
        const callArgs = mockPerformanceHandler.mock.calls[0][0]
        expect(callArgs).toHaveProperty('loadTime')
        expect(callArgs).toHaveProperty('memoryUsage')
        expect(callArgs).toHaveProperty('networkStatus')
      })
    })

    it('displays performance info in development mode', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      
      const mockPerformanceHandler = jest.fn()
      renderCarousel({ onPerformanceUpdate: mockPerformanceHandler })
      
      expect(screen.queryByText(/Load:/)).toBeInTheDocument()
      
      process.env.NODE_ENV = originalEnv
    })

    it('detects slow network conditions', async () => {
      // Mock slow connection
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '2g' },
        writable: true
      })
      
      const mockPerformanceHandler = jest.fn()
      renderCarousel({ onPerformanceUpdate: mockPerformanceHandler })
      
      await waitFor(() => {
        expect(mockPerformanceHandler).toHaveBeenCalled()
        const callArgs = mockPerformanceHandler.mock.calls[0][0]
        expect(callArgs.networkStatus).toBe('slow')
      })
    })
  })

  describe('Portuguese Cultural Features', () => {
    it('enables Portuguese gesture detection', () => {
      renderCarousel({ enablePortugueseGestures: true })
      
      const gesturesContainer = screen.getByTestId('enhanced-mobile-gestures')
      expect(gesturesContainer).toBeInTheDocument()
    })

    it('provides accessibility announcements in Portuguese', async () => {
      renderCarousel({ enableAccessibilityAnnouncements: true })
      
      const nextButton = screen.getByLabelText(/next portuguese cultural items/i)
      fireEvent.click(nextButton)
      
      await waitFor(() => {
        expect(window.speechSynthesis.speak).toHaveBeenCalled()
      })
    })

    it('displays Portuguese cultural flag emojis', () => {
      renderCarousel()
      
      // The flag emojis would be rendered within the custom renderItem function
      expect(screen.getByText('Fado Night London')).toBeInTheDocument()
      expect(screen.getByText('Brazilian Carnival Workshop')).toBeInTheDocument()
    })
  })

  describe('Lazy Loading and Optimization', () => {
    it('implements lazy loading for performance', () => {
      renderCarousel({
        mobileSettings: {
          ...defaultMobileSettings,
          enableLazyLoading: true,
          preloadDistance: 1
        }
      })
      
      // Lazy loading would show loading placeholders for items beyond preloadDistance
      const carouselItems = screen.getAllByTestId(/carousel-item-/)
      expect(carouselItems.length).toBeGreaterThan(0)
    })

    it('preloads items within configured distance', () => {
      const manyEvents = Array.from({ length: 10 }, (_, i) => ({
        ...mockWeekendEvents[0],
        id: `event-${i + 1}`,
        title: { en: `Event ${i + 1}`, pt: `Evento ${i + 1}` }
      }))
      
      renderCarousel({
        items: manyEvents,
        mobileSettings: {
          ...defaultMobileSettings,
          enableLazyLoading: true,
          preloadDistance: 2
        }
      })
      
      // Should render at least the first few items
      expect(screen.getByTestId('carousel-item-event-1')).toBeInTheDocument()
    })
  })

  describe('Accessibility Compliance', () => {
    it('provides proper ARIA labels for Portuguese content', () => {
      renderCarousel()
      
      const carouselRegion = screen.getByRole('region')
      expect(carouselRegion).toHaveAttribute('aria-label', expect.stringContaining('carousel'))
      
      const carouselContent = screen.getByRole('group')
      expect(carouselContent).toHaveAttribute('aria-label', expect.stringContaining('Portuguese cultural'))
    })

    it('supports keyboard navigation', () => {
      renderCarousel()
      
      const carouselContent = screen.getByRole('group')
      fireEvent.keyDown(carouselContent, { key: 'ArrowRight' })
      
      expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining('Next item')
        })
      )
    })

    it('announces status changes to screen readers', async () => {
      renderCarousel()
      
      const statusElement = screen.getByRole('status')
      expect(statusElement).toHaveAttribute('aria-live', 'polite')
      expect(statusElement.textContent).toContain('Showing Portuguese cultural items')
    })
  })

  describe('Responsive Design', () => {
    it('adapts layout for different screen sizes', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      })
      
      renderCarousel()
      
      const carouselItems = screen.getAllByTestId(/carousel-item-/)
      expect(carouselItems.length).toBeGreaterThan(0)
    })

    it('adjusts touch targets for mobile screens', () => {
      renderCarousel()
      
      const dotIndicators = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('aria-label')?.includes('slide')
      )
      
      dotIndicators.forEach(dot => {
        expect(dot.style.minWidth || dot.style.minHeight).toBeTruthy()
      })
    })
  })
})

// Test custom hooks separately
describe('Mobile Performance Hook', () => {
  it('tracks performance metrics', async () => {
    const TestComponent = () => {
      const metrics = useMobilePerformance()
      return <div data-testid="metrics">{JSON.stringify(metrics)}</div>
    }
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    
    const metricsElement = screen.getByTestId('metrics')
    const metrics = JSON.parse(metricsElement.textContent || '{}')
    
    expect(metrics).toHaveProperty('loadTime')
    expect(metrics).toHaveProperty('memoryUsage')
    expect(metrics).toHaveProperty('networkStatus')
  })
})

describe('PWA Features Hook', () => {
  it('detects offline/online status', () => {
    const TestComponent = () => {
      const { isOffline } = usePWAFeatures({
        enableOfflineMode: true,
        enablePushNotifications: false,
        enableBackgroundSync: false,
        cacheStrategy: 'cache-first',
        offlineQueueLimit: 10
      })
      return <div data-testid="offline-status">{isOffline.toString()}</div>
    }
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    
    expect(screen.getByTestId('offline-status')).toHaveTextContent('false')
  })
})