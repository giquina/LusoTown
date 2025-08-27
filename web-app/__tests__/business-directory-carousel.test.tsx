/**
 * Business Directory Carousel Tests
 * 
 * Comprehensive tests for business directory carousel implementation
 * focusing on Portuguese cultural authenticity and mobile-first design
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'

// Mock the useLanguage hook
const mockUseLanguage = {
  language: 'en',
  t: (key: string, defaultValue?: string) => defaultValue || key
}

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function Image({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock useMediaQuery hook
const mockUseMediaQuery = jest.fn()

// Mock context and hooks
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => mockUseLanguage
}))

jest.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: () => mockUseMediaQuery()
}))

jest.mock('@/hooks/useGeolocation', () => ({
  useGeolocation: () => ({
    coordinates: null,
    isLoading: false,
    error: null
  })
}))

// Mock business directory service
jest.mock('@/lib/businessDirectory', () => ({
  portugueseBusinessService: {
    searchBusinesses: jest.fn().mockResolvedValue({
      businesses: [],
      featuredBusinesses: [],
      total: 0
    })
  }
}))

// Import configuration
import {
  FEATURED_PORTUGUESE_BUSINESSES,
  BUSINESS_DIRECTORY_CATEGORIES,
  PALOP_BUSINESS_SHOWCASE,
  BUSINESS_GEOGRAPHIC_DISTRIBUTION,
  getFeaturedBusinessesByCategory,
  getBusinessesByCity,
  getPremiumBusinesses,
  getBusinessDirectoryStats
} from '@/config/business-directory-carousels'

describe('Business Directory Configuration', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false) // Desktop by default
  })

  describe('Featured Portuguese Businesses', () => {
    it('should include businesses from all lusophone countries', () => {
      const countries = [...new Set(FEATURED_PORTUGUESE_BUSINESSES.map(b => b.ownerCountry))]
      
      expect(countries).toContain('portugal')
      expect(countries).toContain('brazil')
      expect(countries).toContain('angola')
      expect(countries).toContain('cape_verde')
      
      // Should have diverse representation
      expect(countries.length).toBeGreaterThanOrEqual(3)
    })

    it('should have geographic diversity across UK cities', () => {
      const cities = [...new Set(FEATURED_PORTUGUESE_BUSINESSES.map(b => b.location.city))]
      
      expect(cities).toContain('London')
      expect(cities).toContain('Manchester')
      expect(cities).toContain('Birmingham')
      expect(cities).toContain('Edinburgh')
      
      // Should serve multiple UK cities
      expect(cities.length).toBeGreaterThanOrEqual(4)
    })

    it('should have bilingual titles and descriptions', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        expect(business.title).toHaveProperty('en')
        expect(business.title).toHaveProperty('pt')
        expect(business.description).toHaveProperty('en')
        expect(business.description).toHaveProperty('pt')
        
        // Both languages should have content
        expect(business.title.en).toBeTruthy()
        expect(business.title.pt).toBeTruthy()
        expect(business.description.en).toBeTruthy()
        expect(business.description.pt).toBeTruthy()
      })
    })

    it('should include cultural connections', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        expect(business.culturalConnection).toBeTruthy()
        expect(typeof business.culturalConnection).toBe('string')
        expect(business.culturalConnection.length).toBeGreaterThan(20)
      })
    })

    it('should have proper ratings and review counts', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        expect(business.rating).toBeGreaterThanOrEqual(0)
        expect(business.rating).toBeLessThanOrEqual(5)
        expect(business.reviewCount).toBeGreaterThanOrEqual(0)
        expect(typeof business.reviewCount).toBe('number')
      })
    })

    it('should include authentic Portuguese specialties', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        expect(Array.isArray(business.specialties)).toBe(true)
        expect(business.specialties.length).toBeGreaterThan(0)
        
        // Specialties should be culturally relevant
        business.specialties.forEach(specialty => {
          expect(typeof specialty).toBe('string')
          expect(specialty.length).toBeGreaterThan(2)
        })
      })
    })
  })

  describe('Business Directory Categories', () => {
    it('should have comprehensive category coverage', () => {
      expect(BUSINESS_DIRECTORY_CATEGORIES.length).toBeGreaterThanOrEqual(5)
      
      const categoryIds = BUSINESS_DIRECTORY_CATEGORIES.map(cat => cat.id)
      expect(categoryIds).toContain('restaurants')
      expect(categoryIds).toContain('cultural_services')
      expect(categoryIds).toContain('beauty_wellness')
      expect(categoryIds).toContain('professional_services')
      expect(categoryIds).toContain('retail')
    })

    it('should have bilingual category names and descriptions', () => {
      BUSINESS_DIRECTORY_CATEGORIES.forEach(category => {
        expect(category.name).toHaveProperty('en')
        expect(category.name).toHaveProperty('pt')
        expect(category.description).toHaveProperty('en')
        expect(category.description).toHaveProperty('pt')
        
        // Content validation
        expect(category.name.en).toBeTruthy()
        expect(category.name.pt).toBeTruthy()
        expect(category.description.en).toBeTruthy()
        expect(category.description.pt).toBeTruthy()
      })
    })

    it('should include cultural emojis', () => {
      BUSINESS_DIRECTORY_CATEGORIES.forEach(category => {
        expect(category.emoji).toBeTruthy()
        expect(typeof category.emoji).toBe('string')
        expect(category.emoji.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('should have realistic business counts and ratings', () => {
      BUSINESS_DIRECTORY_CATEGORIES.forEach(category => {
        expect(category.totalBusinesses).toBeGreaterThan(0)
        expect(category.averageRating).toBeGreaterThanOrEqual(0)
        expect(category.averageRating).toBeLessThanOrEqual(5)
        expect(Array.isArray(category.countries)).toBe(true)
        expect(category.countries.length).toBeGreaterThan(0)
      })
    })
  })

  describe('PALOP Business Showcase', () => {
    it('should feature businesses from all PALOP countries', () => {
      const palopCountries = [...new Set(PALOP_BUSINESS_SHOWCASE.map(b => b.ownerCountry))]
      
      expect(palopCountries).toContain('angola')
      expect(palopCountries).toContain('cape_verde')
      expect(palopCountries).toContain('mozambique')
      
      // Should represent multiple PALOP countries
      expect(palopCountries.length).toBeGreaterThanOrEqual(3)
    })

    it('should have proper PALOP flag emojis', () => {
      const validPalopFlags = ['🇦🇴', '🇨🇻', '🇬🇼', '🇲🇿', '🇸🇹']
      
      PALOP_BUSINESS_SHOWCASE.forEach(business => {
        expect(validPalopFlags).toContain(business.flagEmoji)
      })
    })

    it('should have cultural connections for all PALOP businesses', () => {
      PALOP_BUSINESS_SHOWCASE.forEach(business => {
        expect(business.culturalConnection).toBeTruthy()
        expect(typeof business.culturalConnection).toBe('string')
        
        // Should mention cultural heritage or traditions
        const culturalKeywords = ['cultural', 'tradition', 'heritage', 'authentic', 'community']
        const hasCulturalContent = culturalKeywords.some(keyword => 
          business.culturalConnection.toLowerCase().includes(keyword)
        )
        expect(hasCulturalContent).toBe(true)
      })
    })
  })

  describe('Geographic Distribution', () => {
    it('should cover major UK cities', () => {
      const cities = Object.keys(BUSINESS_GEOGRAPHIC_DISTRIBUTION)
      
      expect(cities).toContain('London')
      expect(cities).toContain('Manchester')
      expect(cities).toContain('Birmingham')
      expect(cities).toContain('Edinburgh')
      expect(cities).toContain('Glasgow')
    })

    it('should have realistic business counts per city', () => {
      Object.entries(BUSINESS_GEOGRAPHIC_DISTRIBUTION).forEach(([city, data]) => {
        expect(data.total).toBeGreaterThan(0)
        expect(data.total).toBeLessThan(200) // Realistic upper limit
        
        // Total should match sum of countries
        const countrySum = Object.values(data.byCountry).reduce((sum, count) => sum + count, 0)
        expect(countrySum).toBe(data.total)
        
        // Should have multiple regions for major cities
        expect(Array.isArray(data.regions)).toBe(true)
        if (city === 'London') {
          expect(data.regions.length).toBeGreaterThanOrEqual(5)
        }
      })
    })

    it('should show Portuguese and Brazilian dominance with PALOP representation', () => {
      Object.entries(BUSINESS_GEOGRAPHIC_DISTRIBUTION).forEach(([city, data]) => {
        // Portugal should be well represented
        expect(data.byCountry.portugal).toBeGreaterThan(0)
        
        // Brazil should have good representation
        expect(data.byCountry.brazil).toBeGreaterThan(0)
        
        // Should have some PALOP representation
        const palopCount = ('angola' in data.byCountry ? data.byCountry.angola : 0) + 
                          ('cape_verde' in data.byCountry ? data.byCountry.cape_verde : 0) + 
                          ('mozambique' in data.byCountry ? data.byCountry.mozambique : 0)
        
        if (city === 'London') {
          expect(palopCount).toBeGreaterThan(0)
        }
      })
    })
  })

  describe('Utility Functions', () => {
    describe('getFeaturedBusinessesByCategory', () => {
      it('should return businesses for valid categories', () => {
        const restaurants = getFeaturedBusinessesByCategory('restaurant')
        const culturalServices = getFeaturedBusinessesByCategory('cultural_services')
        
        expect(Array.isArray(restaurants)).toBe(true)
        expect(Array.isArray(culturalServices)).toBe(true)
        
        if (restaurants.length > 0) {
          restaurants.forEach(business => {
            expect(business.category).toBe('restaurant')
            expect(business.isFeatured).toBe(true)
          })
        }
      })
    })

    describe('getBusinessesByCity', () => {
      it('should filter businesses by city correctly', () => {
        const londonBusinesses = getBusinessesByCity('London')
        const manchesterBusinesses = getBusinessesByCity('Manchester')
        
        expect(Array.isArray(londonBusinesses)).toBe(true)
        expect(Array.isArray(manchesterBusinesses)).toBe(true)
        
        londonBusinesses.forEach(business => {
          expect(business.location.city).toBe('London')
        })
        
        manchesterBusinesses.forEach(business => {
          expect(business.location.city).toBe('Manchester')
        })
      })
    })

    describe('getPremiumBusinesses', () => {
      it('should return only premium businesses sorted by priority', () => {
        const premiumBusinesses = getPremiumBusinesses()
        
        expect(Array.isArray(premiumBusinesses)).toBe(true)
        
        premiumBusinesses.forEach(business => {
          expect(business.isPremium).toBe(true)
        })
        
        // Should be sorted by priority (descending)
        for (let i = 1; i < premiumBusinesses.length; i++) {
          expect(premiumBusinesses[i-1]?.priority || 0).toBeGreaterThanOrEqual(premiumBusinesses[i]?.priority || 0)
        }
      })
    })

    describe('getBusinessDirectoryStats', () => {
      it('should return comprehensive statistics', () => {
        const stats = getBusinessDirectoryStats()
        
        expect(typeof stats.totalBusinesses).toBe('number')
        expect(typeof stats.totalFeatured).toBe('number')
        expect(typeof stats.totalPremium).toBe('number')
        expect(typeof stats.totalVerified).toBe('number')
        expect(typeof stats.averageRating).toBe('number')
        expect(Array.isArray(stats.countriesRepresented)).toBe(true)
        expect(Array.isArray(stats.citiesServed)).toBe(true)
        expect(typeof stats.totalCategories).toBe('number')
        
        // Validation
        expect(stats.totalBusinesses).toBeGreaterThan(0)
        expect(stats.averageRating).toBeGreaterThanOrEqual(0)
        expect(stats.averageRating).toBeLessThanOrEqual(5)
        expect(stats.countriesRepresented).toContain('Portugal')
        expect(stats.countriesRepresented).toContain('Brazil')
        expect(stats.citiesServed).toContain('London')
        expect(stats.totalCategories).toBeGreaterThanOrEqual(5)
      })
    })
  })

  describe('Cultural Authenticity', () => {
    it('should maintain Portuguese cultural authenticity in all content', () => {
      // Check featured businesses for cultural authenticity
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        const culturalKeywords = ['portuguese', 'brazilian', 'angolan', 'authentic', 'traditional', 'cultural', 'heritage']
        const hasPortugueseCulture = culturalKeywords.some(keyword => 
          business.description.en.toLowerCase().includes(keyword) ||
          business.culturalConnection.toLowerCase().includes(keyword)
        )
        
        expect(hasPortugueseCulture).toBe(true)
      })
    })

    it('should use proper Portuguese terminology', () => {
      // Check for proper Portuguese terms in Portuguese descriptions
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        if (business.ownerCountry === 'portugal') {
          const portugueseTerms = ['português', 'portuguesa', 'autêntico', 'tradicional', 'cultural']
          const hasPortugueseTerms = portugueseTerms.some(term => 
            business.description.pt.toLowerCase().includes(term)
          )
          
          // At least some Portuguese businesses should use proper terminology
          if (business.category === 'restaurant' || business.category === 'cultural_services') {
            expect(hasPortugueseTerms).toBe(true)
          }
        }
      })
    })

    it('should include proper flag emojis for each country', () => {
      const flagMapping = {
        'portugal': '🇵🇹',
        'brazil': '🇧🇷',
        'angola': '🇦🇴',
        'cape_verde': '🇨🇻',
        'mozambique': '🇲🇿',
        'guinea_bissau': '🇬🇼',
        'sao_tome_principe': '🇸🇹'
      }

      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        const expectedFlag = flagMapping[business.ownerCountry as keyof typeof flagMapping]
        if (expectedFlag) {
          expect(business.flagEmoji).toBe(expectedFlag)
        }
      })
    })
  })

  describe('Mobile-First Design Compliance', () => {
    it('should have proper mobile breakpoint considerations', () => {
      // All carousel configurations should consider mobile
      BUSINESS_DIRECTORY_CATEGORIES.forEach(category => {
        // Categories should be designed for mobile display
        expect(category.name.en.length).toBeLessThan(25) // Mobile-friendly length
        expect(category.name.pt.length).toBeLessThan(30) // Portuguese can be longer
      })
    })

    it('should have appropriate content length for mobile cards', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        // Titles should be mobile-friendly
        expect(business.title.en.length).toBeLessThan(60)
        expect(business.title.pt.length).toBeLessThan(70)
        
        // Descriptions should be readable on mobile but not too long
        expect(business.description.en.length).toBeGreaterThan(50)
        expect(business.description.en.length).toBeLessThan(200)
      })
    })

    it('should have phone numbers in proper format', () => {
      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        // UK phone numbers should start with +44
        expect(business.contact.phone).toMatch(/^\+44/)
        
        // Should have proper formatting
        expect(business.contact.phone).toMatch(/^\+44\s\d{2,3}\s\d{3,4}\s\d{4}$/)
      })
    })
  })

  describe('Performance and Data Quality', () => {
    it('should have reasonable data sizes for carousel performance', () => {
      // Featured businesses shouldn't be too many for initial load
      expect(FEATURED_PORTUGUESE_BUSINESSES.length).toBeLessThan(20)
      
      // Categories should be manageable
      expect(BUSINESS_DIRECTORY_CATEGORIES.length).toBeLessThan(10)
      
      // PALOP showcase should be focused
      expect(PALOP_BUSINESS_SHOWCASE.length).toBeLessThan(15)
    })

    it('should have consistent data structure across all businesses', () => {
      const requiredFields = [
        'id', 'title', 'description', 'image', 'flagEmoji', 'category',
        'region', 'ownerCountry', 'ownerName', 'location', 'contact',
        'services', 'servicesPortuguese', 'rating', 'reviewCount',
        'priceRange', 'culturalConnection', 'isVerified', 'isFeatured',
        'isPremium', 'establishedYear', 'specialties', 'priority'
      ]

      FEATURED_PORTUGUESE_BUSINESSES.forEach(business => {
        requiredFields.forEach(field => {
          expect(business).toHaveProperty(field)
        })
      })
    })

    it('should have proper priority ordering for featured content', () => {
      // Premium businesses should have priority 1
      const premiumBusinesses = FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.isPremium)
      premiumBusinesses.forEach(business => {
        expect(business.priority).toBe(1)
      })
      
      // Non-premium should have lower priority
      const nonPremiumBusinesses = FEATURED_PORTUGUESE_BUSINESSES.filter(b => !b.isPremium)
      nonPremiumBusinesses.forEach(business => {
        expect(business.priority).toBeGreaterThan(1)
      })
    })
  })
})

describe('Carousel Integration Requirements', () => {
  it('should be compatible with LusophoneCarousel component', () => {
    // Verify that business items have required carousel item structure
    const sampleBusiness = FEATURED_PORTUGUESE_BUSINESSES[0]
    
    expect(sampleBusiness).toHaveProperty('id')
    expect(sampleBusiness?.title).toHaveProperty('en')
    expect(sampleBusiness?.title).toHaveProperty('pt')
    expect(sampleBusiness?.description).toHaveProperty('en')
    expect(sampleBusiness?.description).toHaveProperty('pt')
    expect(sampleBusiness).toHaveProperty('image')
    expect(sampleBusiness).toHaveProperty('flagEmoji')
    expect(sampleBusiness).toHaveProperty('category')
    expect(sampleBusiness).toHaveProperty('priority')
  })

  it('should provide proper carousel configuration options', () => {
    // Categories should work with compact carousel config
    expect(BUSINESS_DIRECTORY_CATEGORIES.length).toBeGreaterThan(3) // Good for compact display
    expect(BUSINESS_DIRECTORY_CATEGORIES.length).toBeLessThan(8) // Not too many for carousel
    
    // Featured businesses should work with standard carousel config
    const premiumCount = getPremiumBusinesses().length
    expect(premiumCount).toBeGreaterThanOrEqual(3) // Minimum for carousel
    expect(premiumCount).toBeLessThan(12) // Reasonable for auto-advance
  })
})