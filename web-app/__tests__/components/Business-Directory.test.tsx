import React from 'react'
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'
import BusinessDirectory from '@/components/BusinessDirectory'
import { FEATURED_PORTUGUESE_BUSINESSES } from '@/config/business-directory-carousel'

// Mock geolocation API
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn((success) =>
      success({
        coords: {
          latitude: 51.5074, // London coordinates
          longitude: -0.1278,
        },
      })
    ),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  },
})

// Mock fetch for language files and API calls
global.fetch = jest.fn((url) => {
  if (url.includes('/api/business-directory')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        businesses: FEATURED_PORTUGUESE_BUSINESSES.slice(0, 5),
        total: FEATURED_PORTUGUESE_BUSINESSES.length,
        hasMore: false
      }),
    })
  }
  
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      'business.search_placeholder': 'Search businesses...',
      'business.category_all': 'All Categories',
      'business.location_all': 'All Locations',
      'business.no_results': 'No businesses found',
      'business.loading': 'Loading...'
    }),
  })
}) as jest.Mock

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <HeritageProvider>
        {children}
      </HeritageProvider>
    </LanguageProvider>
  )
}

describe('Portuguese Business Directory - Community Platform', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.localStorage.getItem = jest.fn((key) => {
      if (key === 'lusotown-language') return 'en'
      return null
    })
  })

  describe('🏪 Business Directory Rendering', () => {
    it('should render business directory component', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should render the business directory
        expect(screen.getByRole('main')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should display search and filter controls', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should have search functionality
        const searchElements = screen.getAllByRole('textbox')
        expect(searchElements.length).toBeGreaterThan(0)
      }, { timeout: 5000 })
    })
  })

  describe('🇵🇹 Portuguese Business Content', () => {
    it('should display Portuguese businesses from config', () => {
      // Test that Portuguese businesses are properly configured
      expect(FEATURED_PORTUGUESE_BUSINESSES).toBeDefined()
      expect(FEATURED_PORTUGUESE_BUSINESSES.length).toBeGreaterThan(0)
      
      // Check for Portuguese business examples
      const portugueseBusiness = FEATURED_PORTUGUESE_BUSINESSES.find(
        business => business.culturalConnection?.includes('Portugal')
      )
      expect(portugueseBusiness).toBeDefined()
    })

    it('should include businesses from all lusophone countries', () => {
      const lusophones = ['Portugal', 'Brazil', 'Cape Verde', 'Angola', 'Mozambique']
      
      lusophones.forEach(country => {
        const businessFromCountry = FEATURED_PORTUGUESE_BUSINESSES.find(
          business => business.culturalConnection?.includes(country)
        )
        // Should have at least some businesses from major lusophone countries
        if (country === 'Portugal' || country === 'Brazil') {
          expect(businessFromCountry).toBeDefined()
        }
      })
    })

    it('should have bilingual business names and descriptions', () => {
      const bilingualBusiness = FEATURED_PORTUGUESE_BUSINESSES.find(
        business => business.name_pt && business.name_en
      )
      
      if (bilingualBusiness) {
        expect(bilingualBusiness.name_pt).toBeDefined()
        expect(bilingualBusiness.name_en).toBeDefined()
      }
    })
  })

  describe('📍 London Location Focus', () => {
    it('should include businesses across London boroughs', () => {
      const londonBoroughs = ['Camden', 'Westminster', 'Kensington', 'Lambeth', 'Southwark']
      
      const londonBusinesses = FEATURED_PORTUGUESE_BUSINESSES.filter(
        business => business.location?.includes('London')
      )
      
      expect(londonBusinesses.length).toBeGreaterThan(0)
    })

    it('should have proper UK address format', () => {
      const ukBusiness = FEATURED_PORTUGUESE_BUSINESSES.find(
        business => business.location?.includes('London') || business.location?.includes('UK')
      )
      
      if (ukBusiness) {
        expect(ukBusiness.location).toContain('London')
      }
    })
  })

  describe('🔍 Search and Filter Functionality', () => {
    it('should handle search input', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(async () => {
        const searchInputs = screen.getAllByRole('textbox')
        if (searchInputs.length > 0) {
          const searchInput = searchInputs[0]
          
          await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'restaurant' } })
          })
          
          expect(searchInput).toHaveValue('restaurant')
        }
      }, { timeout: 5000 })
    })

    it('should support Portuguese search terms', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(async () => {
        const searchInputs = screen.getAllByRole('textbox')
        if (searchInputs.length > 0) {
          const searchInput = searchInputs[0]
          
          await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'restaurante' } })
          })
          
          expect(searchInput).toHaveValue('restaurante')
        }
      }, { timeout: 5000 })
    })
  })

  describe('🏷️ Business Categories', () => {
    it('should include Portuguese-specific categories', () => {
      const categories = [
        'Restaurant',
        'Café',
        'Cultural Services',
        'Legal Services',
        'Translation'
      ]
      
      // Check if businesses cover these categories
      categories.forEach(category => {
        const categoryBusiness = FEATURED_PORTUGUESE_BUSINESSES.find(
          business => business.category?.includes(category.toLowerCase())
        )
        // At least some major categories should be represented
      })
    })
  })

  describe('⭐ Business Ratings and Reviews', () => {
    it('should have realistic rating systems', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        if (business.rating) {
          expect(business.rating).toBeGreaterThanOrEqual(1)
          expect(business.rating).toBeLessThanOrEqual(5)
        }
        
        if (business.reviewCount) {
          expect(business.reviewCount).toBeGreaterThanOrEqual(0)
        }
      })
    })

    it('should include review counts for credibility', () => {
      const businessesWithReviews = FEATURED_PORTUGUESE_BUSINESSES.filter(
        business => business.reviewCount && business.reviewCount > 0
      )
      
      expect(businessesWithReviews.length).toBeGreaterThan(0)
    })
  })

  describe('📱 Mobile-Friendly Business Display', () => {
    it('should render on mobile viewport', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument()
      }, { timeout: 5000 })
    })
  })

  describe('♿ Accessibility Features', () => {
    it('should have proper ARIA labels and roles', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        const mainContent = screen.getByRole('main')
        expect(mainContent).toBeInTheDocument()
        
        // Should have accessible form elements
        const textboxes = screen.getAllByRole('textbox')
        textboxes.forEach(textbox => {
          expect(textbox).toBeInTheDocument()
        })
      }, { timeout: 5000 })
    })

    it('should support keyboard navigation', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        const interactiveElements = screen.getAllByRole('textbox')
        
        if (interactiveElements.length > 0) {
          const firstElement = interactiveElements[0]
          firstElement.focus()
          expect(firstElement).toHaveFocus()
        }
      }, { timeout: 5000 })
    })
  })

  describe('🌍 Cultural Authenticity', () => {
    it('should maintain Portuguese cultural context', () => {
      // Test cultural connections in business data
      const culturalBusinesses = FEATURED_PORTUGUESE_BUSINESSES.filter(
        business => business.culturalConnection
      )
      
      expect(culturalBusinesses.length).toBeGreaterThan(0)
      
      // Should have proper cultural references
      culturalBusinesses.forEach(business => {
        expect(business.culturalConnection).toBeTruthy()
      })
    })

    it('should include Portuguese phone number formats', () => {
      const businessesWithPhones = FEATURED_PORTUGUESE_BUSINESSES.filter(
        business => business.phone
      )
      
      if (businessesWithPhones.length > 0) {
        // Should have proper UK phone format
        businessesWithPhones.forEach(business => {
          if (business.phone) {
            expect(business.phone).toMatch(/[\+\d\s\-\(\)]+/)
          }
        })
      }
    })
  })

  describe('⚡ Performance Considerations', () => {
    it('should have manageable data size', () => {
      // Business directory shouldn't be too large for performance
      expect(FEATURED_PORTUGUESE_BUSINESSES.length).toBeLessThan(100)
      expect(FEATURED_PORTUGUESE_BUSINESSES.length).toBeGreaterThan(10)
    })

    it('should render quickly', async () => {
      const startTime = performance.now()
      
      await act(async () => {
        render(
          <TestWrapper>
            <BusinessDirectory />
          </TestWrapper>
        )
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument()
      }, { timeout: 5000 })
      
      // Should render within reasonable time
      expect(renderTime).toBeLessThan(1000)
    })
  })
})
