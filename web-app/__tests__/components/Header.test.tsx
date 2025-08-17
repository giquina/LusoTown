import React from 'react'
import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import Header from '@/components/Header'
import { portugueseTestUtils, mobileTestUtils } from '../utils/test-utils'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPush.mockClear()
  })

  describe('Basic Rendering', () => {
    it('should render logo and main navigation', () => {
      render(<Header />)
      
      // Should render logo
      expect(screen.getByRole('link', { name: /lusotown/i })).toBeInTheDocument()
      
      // Should render main navigation links
      expect(screen.getByText('Events')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
    })

    it('should render language toggle', () => {
      render(<Header />)
      
      // Language toggle should be present
      const languageToggle = screen.getByRole('button', { name: /language/i })
      expect(languageToggle).toBeInTheDocument()
    })

    it('should render cart and saved items buttons', () => {
      render(<Header />)
      
      // Cart button should be present
      expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument()
      
      // Saved items button should be present
      expect(screen.getByRole('button', { name: /saved/i })).toBeInTheDocument()
    })
  })

  describe('Portuguese Language Support', () => {
    it('should display Portuguese navigation when language is set to PT', () => {
      render(<Header />, { initialLanguage: 'pt' })
      
      // Should show Portuguese navigation text
      expect(screen.getByText('Eventos')).toBeInTheDocument()
      expect(screen.getByText('Serviços')).toBeInTheDocument()
    })

    it('should display English navigation when language is set to EN', () => {
      render(<Header />, { initialLanguage: 'en' })
      
      // Should show English navigation text
      expect(screen.getByText('Events')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
    })

    it('should toggle between Portuguese and English', async () => {
      render(<Header />, { initialLanguage: 'en' })
      
      // Initial state should be English
      expect(screen.getByText('Events')).toBeInTheDocument()
      
      // Click language toggle
      const languageToggle = screen.getByRole('button', { name: /language/i })
      fireEvent.click(languageToggle)
      
      // Should switch to Portuguese
      await waitFor(() => {
        expect(screen.getByText('Eventos')).toBeInTheDocument()
      })
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      mobileTestUtils.setMobileViewport()
    })

    it('should show mobile menu button on small screens', () => {
      render(<Header />)
      
      // Mobile menu button should be visible
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      expect(mobileMenuButton).toBeInTheDocument()
    })

    it('should open mobile menu when hamburger is clicked', async () => {
      render(<Header />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      fireEvent.click(mobileMenuButton)
      
      // Mobile menu should open and show navigation links
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('should close mobile menu when close button is clicked', async () => {
      render(<Header />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      fireEvent.click(mobileMenuButton)
      
      // Wait for menu to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Click close button
      const closeButton = screen.getByRole('button', { name: /close/i })
      fireEvent.click(closeButton)
      
      // Menu should close
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should handle touch interactions properly', () => {
      render(<Header />)
      
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      
      // Simulate touch interaction
      mobileTestUtils.mockTouchStart(mobileMenuButton, 10, 10)
      fireEvent.click(mobileMenuButton)
      
      // Should open menu
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('Services Dropdown', () => {
    it('should show services dropdown on hover', async () => {
      render(<Header />)
      
      const servicesButton = screen.getByText('Services')
      
      // Hover over services
      fireEvent.mouseEnter(servicesButton)
      
      // Should show dropdown with service options
      await waitFor(() => {
        expect(screen.getByText('Cultural Tours')).toBeInTheDocument()
        expect(screen.getByText('Executive Transport')).toBeInTheDocument()
        expect(screen.getByText('Close Protection')).toBeInTheDocument()
        expect(screen.getByText('Transport & SIA')).toBeInTheDocument()
      })
    })

    it('should hide services dropdown when mouse leaves', async () => {
      render(<Header />)
      
      const servicesButton = screen.getByText('Services')
      
      // Hover over services
      fireEvent.mouseEnter(servicesButton)
      await waitFor(() => {
        expect(screen.getByText('Cultural Tours')).toBeInTheDocument()
      })
      
      // Mouse leave
      fireEvent.mouseLeave(servicesButton)
      
      // Dropdown should hide
      await waitFor(() => {
        expect(screen.queryByText('Cultural Tours')).not.toBeInTheDocument()
      })
    })

    it('should navigate to correct service page when clicked', async () => {
      render(<Header />)
      
      const servicesButton = screen.getByText('Services')
      fireEvent.mouseEnter(servicesButton)
      
      await waitFor(() => {
        expect(screen.getByText('Transport & SIA')).toBeInTheDocument()
      })
      
      // Click on Transport & SIA
      fireEvent.click(screen.getByText('Transport & SIA'))
      
      // Should navigate to transport page
      expect(mockPush).toHaveBeenCalledWith('/transport')
    })
  })

  describe('User Authentication', () => {
    it('should show login button when user is not authenticated', () => {
      render(<Header />)
      
      expect(screen.getByText('Sign In')).toBeInTheDocument()
    })

    it('should show user menu when user is authenticated', () => {
      const mockUser = portugueseTestUtils.mockPortugueseUser
      render(<Header />, { mockUser })
      
      // Should show user name or avatar
      expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    })

    it('should show premium badge for premium users', () => {
      const mockPremiumUser = {
        ...portugueseTestUtils.mockPortugueseUser,
        membershipTier: 'premium'
      }
      render(<Header />, { mockUser: mockPremiumUser })
      
      // Should show premium indicator
      expect(screen.getByTestId('premium-badge')).toBeInTheDocument()
    })

    it('should handle logout correctly', async () => {
      const mockUser = portugueseTestUtils.mockPortugueseUser
      render(<Header />, { mockUser })
      
      // Click user menu
      const userButton = screen.getByText(mockUser.name)
      fireEvent.click(userButton)
      
      // Click logout
      const logoutButton = screen.getByText('Sign Out')
      fireEvent.click(logoutButton)
      
      // Should trigger logout
      await waitFor(() => {
        expect(screen.getByText('Sign In')).toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('should render search bar on desktop', () => {
      mobileTestUtils.setDesktopViewport()
      render(<Header />)
      
      const searchInput = screen.getByPlaceholderText(/search/i)
      expect(searchInput).toBeInTheDocument()
    })

    it('should handle search input in Portuguese', async () => {
      render(<Header />, { initialLanguage: 'pt' })
      
      const searchInput = screen.getByPlaceholderText(/pesquisar/i)
      
      fireEvent.change(searchInput, { target: { value: 'fado' } })
      
      expect(searchInput).toHaveValue('fado')
    })

    it('should handle Portuguese character input correctly', async () => {
      render(<Header />, { initialLanguage: 'pt' })
      
      const searchInput = screen.getByPlaceholderText(/pesquisar/i)
      
      // Test Portuguese characters
      fireEvent.change(searchInput, { target: { value: 'São João' } })
      
      expect(searchInput).toHaveValue('São João')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<Header />)
      
      // Logo should have proper aria-label
      const logo = screen.getByRole('link', { name: /lusotown/i })
      expect(logo).toHaveAttribute('aria-label')
      
      // Navigation should have proper role
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      
      // Mobile menu button should have aria-expanded
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      expect(mobileMenuButton).toHaveAttribute('aria-expanded')
    })

    it('should be keyboard navigable', () => {
      render(<Header />)
      
      // Tab through main navigation
      const eventsLink = screen.getByText('Events')
      eventsLink.focus()
      expect(eventsLink).toHaveFocus()
      
      // Tab to services
      fireEvent.keyDown(eventsLink, { key: 'Tab' })
      const servicesLink = screen.getByText('Services')
      expect(servicesLink).toHaveFocus()
    })

    it('should support screen readers with proper semantic markup', () => {
      render(<Header />)
      
      // Should have main navigation landmark
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      
      // Should have proper heading structure
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render quickly on mobile devices', async () => {
      mobileTestUtils.setMobileViewport()
      
      const startTime = performance.now()
      render(<Header />)
      const endTime = performance.now()
      
      // Should render within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should not cause layout shifts during language changes', async () => {
      const { rerender } = render(<Header />, { initialLanguage: 'en' })
      
      // Get initial layout
      const header = screen.getByRole('banner')
      const initialHeight = header.getBoundingClientRect().height
      
      // Change language
      rerender(<Header />)
      
      // Layout should remain stable
      const newHeight = header.getBoundingClientRect().height
      expect(Math.abs(newHeight - initialHeight)).toBeLessThan(5) // Allow 5px tolerance
    })
  })

  describe('Network Connectivity', () => {
    it('should handle offline state gracefully', () => {
      // Mock offline state
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      })
      
      render(<Header />)
      
      // Should still render basic navigation
      expect(screen.getByText('Events')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
    })
  })

  describe('Portuguese Cultural Features', () => {
    it('should link to Portuguese cultural services correctly', async () => {
      render(<Header />, { initialLanguage: 'pt' })
      
      const servicesButton = screen.getByText('Serviços')
      fireEvent.mouseEnter(servicesButton)
      
      await waitFor(() => {
        expect(screen.getByText('Tours Culturais')).toBeInTheDocument()
      })
      
      // Should navigate to cultural tours
      fireEvent.click(screen.getByText('Tours Culturais'))
      expect(mockPush).toHaveBeenCalledWith('/services#cultural-tours')
    })

    it('should maintain Portuguese context in navigation', () => {
      render(<Header />, { initialLanguage: 'pt' })
      
      // Portuguese navigation should maintain cultural context
      expect(screen.getByText('Eventos')).toBeInTheDocument()
      expect(screen.getByText('Serviços')).toBeInTheDocument()
      
      // Should not show generic translations
      expect(screen.queryByText('Events (Generic)')).not.toBeInTheDocument()
    })
  })
})
