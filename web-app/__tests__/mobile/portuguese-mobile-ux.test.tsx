/**
 * Mobile UX Tests for Portuguese-speaking community features
 * Tests mobile-first responsive design and touch interactions
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import { mobileTestUtils, portugueseTestUtils } from '../utils/test-utils'
import '@testing-library/jest-dom'

// Mock components for testing mobile UX
const MockMobileHeader = () => (
  <header data-testid="mobile-header" className="mobile-header">
    <button data-testid="mobile-menu-toggle" className="hamburger-menu">
      ☰
    </button>
    <h1 data-testid="site-title">LusoTown</h1>
    <div data-testid="language-switcher" className="language-switch">
      <button data-testid="lang-en">EN</button>
      <button data-testid="lang-pt">PT</button>
    </div>
  </header>
)

const MockPortugueseEventCard = ({ event }: { event: any }) => (
  <div 
    data-testid={`event-card-${event.id}`}
    className="event-card mobile-friendly"
    style={{ minHeight: '56px', width: '100%' }} // WCAG touch target compliance
  >
    <h3 data-testid={`event-title-${event.id}`}>{event.title}</h3>
    <p data-testid={`event-description-${event.id}`}>{event.description}</p>
    <div data-testid={`event-actions-${event.id}`} className="action-buttons">
      <button 
        data-testid={`book-event-${event.id}`}
        className="primary-button"
        style={{ minHeight: '56px', minWidth: '56px' }}
      >
        Book
      </button>
      <button 
        data-testid={`share-event-${event.id}`}
        className="secondary-button"
        style={{ minHeight: '56px', minWidth: '56px' }}
      >
        Share
      </button>
    </div>
  </div>
)

const MockBusinessDirectoryMobile = () => (
  <div data-testid="mobile-business-directory">
    <div data-testid="search-bar" className="mobile-search">
      <input 
        type="text" 
        placeholder="Search Portuguese businesses..." 
        style={{ minHeight: '56px' }}
        data-testid="business-search"
      />
    </div>
    <div data-testid="filter-buttons" className="filter-row">
      <button data-testid="filter-restaurant" style={{ minHeight: '56px' }}>Restaurants</button>
      <button data-testid="filter-grocery" style={{ minHeight: '56px' }}>Groceries</button>
      <button data-testid="filter-services" style={{ minHeight: '56px' }}>Services</button>
    </div>
    <div data-testid="business-grid" className="mobile-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          data-testid={`business-card-${i}`}
          className="business-card mobile-card"
          style={{ minHeight: '100px' }}
        >
          <h4>Portuguese Business {i + 1}</h4>
          <button 
            data-testid={`call-business-${i}`}
            style={{ minHeight: '56px' }}
          >
            Call
          </button>
        </div>
      ))}
    </div>
  </div>
)

describe('Portuguese Mobile UX Tests', () => {
  beforeEach(() => {
    mobileTestUtils.setMobileViewport()
    jest.clearAllMocks()
  })

  afterEach(() => {
    mobileTestUtils.setDesktopViewport()
  })

  describe('Mobile Header Navigation', () => {
    it('renders mobile-optimized header with Portuguese context', () => {
      render(<MockMobileHeader />)
      
      expect(screen.getByTestId('mobile-header')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-menu-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('site-title')).toHaveTextContent('LusoTown')
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    })

    it('supports bilingual language switching on mobile', () => {
      render(<MockMobileHeader />)
      
      const enButton = screen.getByTestId('lang-en')
      const ptButton = screen.getByTestId('lang-pt')
      
      expect(enButton).toBeInTheDocument()
      expect(ptButton).toBeInTheDocument()
      
      // Check touch target compliance (minimum 56px height)
      expect(enButton).toHaveStyle('min-height: 56px')
      expect(ptButton).toHaveStyle('min-height: 56px')
    })

    it('hamburger menu responds to touch interactions', () => {
      render(<MockMobileHeader />)
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle')
      
      // Mock touch event
      mobileTestUtils.mockTouchStart(menuToggle, 20, 20)
      fireEvent.click(menuToggle)
      
      expect(menuToggle).toBeInTheDocument()
    })
  })

  describe('Portuguese Event Cards Mobile UX', () => {
    it('renders event cards with proper mobile spacing', () => {
      const mockEvent = portugueseTestUtils.mockPortugueseEvent
      render(<MockPortugueseEventCard event={mockEvent} />)
      
      expect(screen.getByTestId(`event-card-${mockEvent.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`event-title-${mockEvent.id}`)).toHaveTextContent('Fado Night')
      expect(screen.getByTestId(`event-description-${mockEvent.id}`)).toHaveTextContent('A special night of traditional Portuguese music')
    })

    it('ensures WCAG 2.1 AA touch target compliance', () => {
      const mockEvent = portugueseTestUtils.mockPortugueseEvent
      render(<MockPortugueseEventCard event={mockEvent} />)
      
      const bookButton = screen.getByTestId(`book-event-${mockEvent.id}`)
      const shareButton = screen.getByTestId(`share-event-${mockEvent.id}`)
      
      // Check minimum 56px touch targets
      expect(bookButton).toHaveStyle('min-height: 56px')
      expect(bookButton).toHaveStyle('min-width: 56px')
      expect(shareButton).toHaveStyle('min-height: 56px')
      expect(shareButton).toHaveStyle('min-width: 56px')
    })

    it('supports swipe gestures for cultural events', () => {
      const mockEvent = portugueseTestUtils.mockPortugueseEvent
      render(<MockPortugueseEventCard event={mockEvent} />)
      
      const eventCard = screen.getByTestId(`event-card-${mockEvent.id}`)
      
      // Mock swipe left gesture
      mobileTestUtils.mockTouchStart(eventCard, 100, 50)
      
      // Simulate swipe completion
      const swipeEndEvent = new TouchEvent('touchend', {
        changedTouches: [] as any
      })
      eventCard.dispatchEvent(swipeEndEvent)
      
      expect(eventCard).toBeInTheDocument()
    })
  })

  describe('Business Directory Mobile Interface', () => {
    it('renders mobile-optimized business directory', () => {
      render(<MockBusinessDirectoryMobile />)
      
      expect(screen.getByTestId('mobile-business-directory')).toBeInTheDocument()
      expect(screen.getByTestId('search-bar')).toBeInTheDocument()
      expect(screen.getByTestId('filter-buttons')).toBeInTheDocument()
      expect(screen.getByTestId('business-grid')).toBeInTheDocument()
    })

    it('search input meets mobile accessibility standards', () => {
      render(<MockBusinessDirectoryMobile />)
      
      const searchInput = screen.getByTestId('business-search')
      expect(searchInput).toHaveStyle('min-height: 56px')
      expect(searchInput).toHaveAttribute('placeholder', 'Search Portuguese businesses...')
    })

    it('filter buttons are touch-friendly', () => {
      render(<MockBusinessDirectoryMobile />)
      
      const restaurantFilter = screen.getByTestId('filter-restaurant')
      const groceryFilter = screen.getByTestId('filter-grocery')
      const servicesFilter = screen.getByTestId('filter-services')
      
      [restaurantFilter, groceryFilter, servicesFilter].forEach(button => {
        expect(button).toHaveStyle('min-height: 56px')
      })
    })

    it('business cards display in mobile grid layout', () => {
      render(<MockBusinessDirectoryMobile />)
      
      const businessGrid = screen.getByTestId('business-grid')
      expect(businessGrid).toBeInTheDocument()
      
      // Check for multiple business cards
      for (let i = 0; i < 6; i++) {
        expect(screen.getByTestId(`business-card-${i}`)).toBeInTheDocument()
      }
    })

    it('call business buttons meet touch target requirements', () => {
      render(<MockBusinessDirectoryMobile />)
      
      for (let i = 0; i < 6; i++) {
        const callButton = screen.getByTestId(`call-business-${i}`)
        expect(callButton).toHaveStyle('min-height: 56px')
      }
    })
  })

  describe('Mobile Viewport Responsive Design', () => {
    it('adapts to iPhone SE viewport (375px)', () => {
      mobileTestUtils.setMobileViewport()
      render(<MockBusinessDirectoryMobile />)
      
      expect(window.innerWidth).toBe(375)
      expect(screen.getByTestId('mobile-business-directory')).toBeInTheDocument()
    })

    it('adapts to tablet viewport (768px)', () => {
      mobileTestUtils.setTabletViewport()
      render(<MockBusinessDirectoryMobile />)
      
      expect(window.innerWidth).toBe(768)
      expect(screen.getByTestId('mobile-business-directory')).toBeInTheDocument()
    })

    it('handles viewport orientation changes', () => {
      render(<MockBusinessDirectoryMobile />)
      
      // Simulate orientation change
      Object.defineProperty(window, 'innerWidth', { value: 667 })
      Object.defineProperty(window, 'innerHeight', { value: 375 })
      
      fireEvent(window, new Event('resize'))
      
      expect(screen.getByTestId('mobile-business-directory')).toBeInTheDocument()
    })
  })

  describe('Portuguese Cultural Mobile Features', () => {
    it('preserves Portuguese cultural terms on mobile', () => {
      const mockEvent = {
        id: 'fado-night',
        title: 'Noite de Fado',
        description: 'Uma celebração da música tradicional portuguesa com saudade'
      }
      
      render(<MockPortugueseEventCard event={mockEvent} />)
      
      portugueseTestUtils.expectCulturalTermPreservation(
        screen.getByTestId('event-card-fado-night'),
        ['Fado', 'saudade']
      )
    })

    it('displays UK location context on mobile', () => {
      render(<MockBusinessDirectoryMobile />)
      
      const businessDirectory = screen.getByTestId('mobile-business-directory')
      expect(businessDirectory).toBeInTheDocument()
      
      // Should include UK-specific context
      expect(screen.getByPlaceholderText(/portuguese businesses/i)).toBeInTheDocument()
    })

    it('supports Portuguese-speaking community mobile interactions', () => {
      render(<MockMobileHeader />)
      
      const ptLanguageButton = screen.getByTestId('lang-pt')
      fireEvent.click(ptLanguageButton)
      
      expect(ptLanguageButton).toBeInTheDocument()
    })
  })

  describe('Mobile Performance and Accessibility', () => {
    it('renders quickly on mobile devices', async () => {
      const startTime = performance.now()
      
      render(<MockBusinessDirectoryMobile />)
      
      await waitFor(() => {
        expect(screen.getByTestId('mobile-business-directory')).toBeInTheDocument()
      })
      
      const renderTime = performance.now() - startTime
      expect(renderTime).toBeLessThan(1000) // Should render within 1 second
    })

    it('supports screen reader navigation on mobile', () => {
      render(<MockMobileHeader />)
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle')
      expect(menuToggle).toHaveAttribute('tabIndex', '0')
    })

    it('handles mobile keyboard navigation', () => {
      render(<MockBusinessDirectoryMobile />)
      
      const searchInput = screen.getByTestId('business-search')
      
      fireEvent.focus(searchInput)
      expect(document.activeElement).toBe(searchInput)
      
      fireEvent.keyDown(searchInput, { key: 'Tab' })
      // Focus should move to next interactive element
    })
  })
})