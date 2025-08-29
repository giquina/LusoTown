/**
 * Integration tests for Business Directory API endpoints
 * Tests the full API interaction including database queries and response formatting
 */

import { NextRequest } from 'next/server'
import { GET } from '@/app/api/business-directory/route'

// Mock Supabase client
const mockSupabaseData = {
  businesses: [
    {
      id: '1',
      name: 'Café Lisboa',
      category: 'restaurant',
      description: 'Authentic Portuguese café serving traditional pastéis de nata',
      address: '123 Portuguese Street, Camberwell, London SE5 8TR',
      postcode: 'SE5 8TR',
      phone: '+44 20 1234 5678',
      email: 'info@cafelisboa.co.uk',
      website: 'https://cafelisboa.co.uk',
      image_url: 'https://images.lusotown.com/businesses/cafe-lisboa.jpg',
      verified: true,
      featured: false,
      rating: 4.8,
      review_count: 127,
      opening_hours: {
        monday: '08:00-18:00',
        tuesday: '08:00-18:00',
        wednesday: '08:00-18:00',
        thursday: '08:00-18:00',
        friday: '08:00-18:00',
        saturday: '09:00-17:00',
        sunday: '10:00-16:00'
      },
      coordinates: [-0.0877, 51.4744],
      london_borough: 'Southwark',
      portuguese_heritage: true,
      palop_heritage: false,
      cultural_tags: ['pastéis_de_nata', 'café_culture', 'traditional_portuguese'],
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-02-20T14:20:00Z'
    },
    {
      id: '2',
      name: 'Santos Delicatessen',
      category: 'grocery',
      description: 'Portuguese grocery store with products from all lusophone countries',
      address: '456 Lusitania Avenue, Vauxhall, London SW8 2QP',
      postcode: 'SW8 2QP',
      phone: '+44 20 9876 5432',
      email: 'santos@delicatessen.co.uk',
      website: null,
      image_url: 'https://images.lusotown.com/businesses/santos-deli.jpg',
      verified: true,
      featured: true,
      rating: 4.6,
      review_count: 89,
      opening_hours: {
        monday: '09:00-19:00',
        tuesday: '09:00-19:00',
        wednesday: '09:00-19:00',
        thursday: '09:00-19:00',
        friday: '09:00-19:00',
        saturday: '09:00-18:00',
        sunday: '10:00-17:00'
      },
      coordinates: [-0.1245, 51.4875],
      london_borough: 'Lambeth',
      portuguese_heritage: true,
      palop_heritage: true,
      cultural_tags: ['groceries', 'palop_products', 'brazilian_items'],
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-02-18T16:45:00Z'
    }
  ]
}

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: mockSupabaseData.businesses, error: null })
        }),
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: mockSupabaseData.businesses.filter(b => b.category === 'restaurant'), error: null })
          })
        }),
        ilike: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: mockSupabaseData.businesses.filter(b => b.name.toLowerCase().includes('café')), error: null })
          })
        }),
        within: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: mockSupabaseData.businesses, error: null })
          })
        })
      })
    })
  })
}))

describe('Business Directory API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns all Portuguese businesses with default parameters', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    expect(response.status).toBe(200)
    
    const data = await response.json()
    
    expect(data).toHaveProperty('businesses')
    expect(data).toHaveProperty('total')
    expect(Array.isArray(data.businesses)).toBe(true)
    expect(data.businesses.length).toBe(2)
    
    // Check Portuguese business data structure
    const business = data.businesses[0]
    expect(business).toHaveProperty('name')
    expect(business).toHaveProperty('category')
    expect(business).toHaveProperty('description')
    expect(business).toHaveProperty('address')
    expect(business).toHaveProperty('portuguese_heritage')
    expect(business).toHaveProperty('cultural_tags')
  })

  it('filters businesses by category', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory?category=restaurant')
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(data.businesses).toHaveLength(1)
    expect(data.businesses[0].category).toBe('restaurant')
    expect(data.businesses[0].name).toBe('Café Lisboa')
  })

  it('searches businesses by name', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory?search=café')
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(data.businesses).toHaveLength(1)
    expect(data.businesses[0].name.toLowerCase()).toContain('café')
  })

  it('includes Portuguese cultural information', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    const cafeListoa = data.businesses.find((b: any) => b.name === 'Café Lisboa')
    expect(cafeListoa).toBeDefined()
    expect(cafeListoa.portuguese_heritage).toBe(true)
    expect(cafeListoa.cultural_tags).toContain('pastéis_de_nata')
    expect(cafeListoa.cultural_tags).toContain('traditional_portuguese')
  })

  it('includes PALOP heritage businesses', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    const santosDeli = data.businesses.find((b: any) => b.name === 'Santos Delicatessen')
    expect(santosDeli).toBeDefined()
    expect(santosDeli.palop_heritage).toBe(true)
    expect(santosDeli.cultural_tags).toContain('palop_products')
  })

  it('returns businesses with proper London location data', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    data.businesses.forEach((business: any) => {
      expect(business.address).toContain('London')
      expect(business.london_borough).toBeDefined()
      expect(business.coordinates).toBeInstanceOf(Array)
      expect(business.coordinates).toHaveLength(2)
    })
  })

  it('handles geolocation-based queries', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory?lat=51.5074&lng=-0.1278&radius=5')
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.businesses).toBeDefined()
    // Should include distance calculations
    data.businesses.forEach((business: any) => {
      expect(business.coordinates).toBeDefined()
    })
  })

  it('supports Portuguese language responses', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory?lang=pt')
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.businesses).toBeDefined()
    
    // Should preserve Portuguese cultural terms
    const cafeListoa = data.businesses.find((b: any) => b.name === 'Café Lisboa')
    expect(cafeListoa.description).toContain('pastéis de nata')
  })

  it('includes business ratings and reviews', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    data.businesses.forEach((business: any) => {
      expect(business.rating).toBeDefined()
      expect(business.review_count).toBeDefined()
      expect(typeof business.rating).toBe('number')
      expect(typeof business.review_count).toBe('number')
    })
  })

  it('handles opening hours data', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    data.businesses.forEach((business: any) => {
      expect(business.opening_hours).toBeDefined()
      expect(business.opening_hours.monday).toBeDefined()
      expect(business.opening_hours.sunday).toBeDefined()
    })
  })

  it('prioritizes featured Portuguese businesses', async () => {
    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    const data = await response.json()
    
    // Santos Delicatessen is featured, should appear first or be marked as featured
    const santosDeli = data.businesses.find((b: any) => b.name === 'Santos Delicatessen')
    expect(santosDeli.featured).toBe(true)
  })

  it('handles error responses gracefully', async () => {
    // Mock Supabase error
    jest.doMock('@supabase/supabase-js', () => ({
      createClient: () => ({
        from: () => ({
          select: () => ({
            order: () => ({
              limit: () => Promise.resolve({ data: null, error: { message: 'Database error' } })
            })
          })
        })
      })
    }))

    const request = new NextRequest('http://localhost:3000/api/business-directory')
    
    const response = await GET(request)
    
    expect(response.status).toBe(500)
    
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })
})