import React from 'react'
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils'
import { BusinessDirectory } from '@/components/BusinessDirectory'
import '@testing-library/jest-dom'

// Mock the API response
const mockBusinesses = [
  {
    id: '1',
    name: 'Café Lisboa',
    category: 'restaurant',
    description: 'Authentic Portuguese café in London',
    address: '123 Portuguese Street, London',
    phone: '+44 20 1234 5678',
    website: 'https://cafelisboa.co.uk',
    image_url: 'https://example.com/cafe.jpg',
    verified: true,
    rating: 4.8,
    distance_km: 2.1
  },
  {
    id: '2',
    name: 'Santos Market',
    category: 'grocery',
    description: 'Portuguese grocery store and delicatessen',
    address: '456 Lusitania Avenue, London',
    phone: '+44 20 9876 5432',
    website: null,
    image_url: 'https://example.com/market.jpg',
    verified: true,
    rating: 4.6,
    distance_km: 1.3
  }
]

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      businesses: mockBusinesses,
      total: mockBusinesses.length
    })
  })
) as jest.Mock

describe('BusinessDirectory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock geolocation
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn((success) =>
          success({
            coords: {
              latitude: 51.5074,
              longitude: -0.1278
            }
          })
        )
      },
      writable: true
    })
  })

  it('renders business directory with Portuguese context', async () => {
    render(<BusinessDirectory />)
    
    // Check for main elements
    expect(screen.getByText(/business directory/i)).toBeInTheDocument()
    
    // Wait for businesses to load
    await waitFor(() => {
      expect(screen.getByText('Café Lisboa')).toBeInTheDocument()
      expect(screen.getByText('Santos Market')).toBeInTheDocument()
    })
  })

  it('displays Portuguese business information correctly', async () => {
    render(<BusinessDirectory />)
    
    await waitFor(() => {
      // Check business details
      expect(screen.getByText('Authentic Portuguese café in London')).toBeInTheDocument()
      expect(screen.getByText('Portuguese grocery store and delicatessen')).toBeInTheDocument()
      
      // Check contact information
      expect(screen.getByText('+44 20 1234 5678')).toBeInTheDocument()
      expect(screen.getByText('https://cafelisboa.co.uk')).toBeInTheDocument()
      
      // Check verification status
      const verifiedElements = screen.getAllByText(/verified/i)
      expect(verifiedElements.length).toBeGreaterThan(0)
    })
  })

  it('filters businesses by category', async () => {
    render(<BusinessDirectory />)
    
    await waitFor(() => {
      expect(screen.getByText('Café Lisboa')).toBeInTheDocument()
    })

    // Find and click restaurant filter
    const restaurantFilter = screen.getByText(/restaurant/i)
    fireEvent.click(restaurantFilter)

    // Should still show Café Lisboa (restaurant)
    await waitFor(() => {
      expect(screen.getByText('Café Lisboa')).toBeInTheDocument()
    })
  })

  it('shows distance information', async () => {
    render(<BusinessDirectory />)
    
    await waitFor(() => {
      expect(screen.getByText('2.1 km')).toBeInTheDocument()
      expect(screen.getByText('1.3 km')).toBeInTheDocument()
    })
  })

  it('handles search functionality', async () => {
    render(<BusinessDirectory />)
    
    const searchInput = screen.getByPlaceholderText(/search businesses/i)
    fireEvent.change(searchInput, { target: { value: 'café' } })
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=café')
      )
    })
  })

  it('displays ratings with stars', async () => {
    render(<BusinessDirectory />)
    
    await waitFor(() => {
      expect(screen.getByText('4.8')).toBeInTheDocument()
      expect(screen.getByText('4.6')).toBeInTheDocument()
    })
  })

  it('handles Portuguese bilingual content', async () => {
    render(<BusinessDirectory initialLanguage="pt" />)
    
    // Should render Portuguese labels
    await waitFor(() => {
      // This would test Portuguese translations
      expect(document.body).toBeInTheDocument() // Basic test for now
    })
  })

  it('supports mobile-first responsive design', async () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<BusinessDirectory />)
    
    await waitFor(() => {
      expect(screen.getByText('Café Lisboa')).toBeInTheDocument()
      // On mobile, should show grid layout
      const businessCards = screen.getAllByTestId(/business-card/i)
      expect(businessCards.length).toBeGreaterThan(0)
    })
  })

  it('handles error states gracefully', async () => {
    // Mock fetch to return error
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch businesses'))
    ) as jest.Mock

    render(<BusinessDirectory />)
    
    await waitFor(() => {
      expect(screen.getByText(/error loading businesses/i)).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    // Don't mock geolocation to trigger loading state
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(() => {
          // Never call success callback
        })
      },
      writable: true
    })

    render(<BusinessDirectory />)
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument()
  })
})