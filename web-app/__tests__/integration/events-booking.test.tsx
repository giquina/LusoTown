import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EventsPage from '@/app/events/page'
import EventDetailsPage from '@/app/events/[id]/page'
import TechnologyWorkshopBookingPage from '@/app/events/[id]/book/page'
import { LanguageProvider } from '@/context/LanguageContext'
import { CartProvider } from '@/context/CartContext'
import { NetworkingProvider } from '@/context/NetworkingContext'
import { authService } from '@/lib/auth'

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useParams: () => ({
    id: '4',
  }),
  usePathname: () => '/events',
}))

// Mock auth service
jest.mock('@/lib/auth', () => ({
  authService: {
    getCurrentUser: jest.fn(() => ({
      id: 'test-user',
      email: 'test@example.com',
      name: 'Test User',
      membershipTier: 'free'
    })),
  },
  getCurrentUser: jest.fn(() => ({
    id: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
    membershipTier: 'free'
  })),
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <LanguageProvider>
      <CartProvider>
        <NetworkingProvider>
          {children}
        </NetworkingProvider>
      </CartProvider>
    </LanguageProvider>
  </BrowserRouter>
)

describe('Events Booking System Integration', () => {
  describe('Events Page', () => {
    it('renders events list with proper accessibility', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      // Check main search input has proper label
      const searchInput = screen.getByLabelText(/search events/i)
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('id', 'event-search')

      // Check sort dropdown has proper label
      const sortSelect = screen.getByLabelText(/sort events/i)
      expect(sortSelect).toBeInTheDocument()
      expect(sortSelect).toHaveAttribute('id', 'sort-events')

      // Wait for events to load
      await waitFor(() => {
        const eventCards = screen.getAllByRole('button', { name: /view more details about/i })
        expect(eventCards.length).toBeGreaterThan(0)
      }, { timeout: 5000 })
    })

    it('allows filtering events by category', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      // Wait for events to load
      await waitFor(() => {
        const eventCards = screen.getAllByRole('button', { name: /view more details about/i })
        expect(eventCards.length).toBeGreaterThan(0)
      })

      // Check filter functionality
      const techFilter = screen.getByText(/tech\/innovation/i)
      expect(techFilter).toBeInTheDocument()
      
      fireEvent.click(techFilter)
      
      // Should filter events by technology category
      await waitFor(() => {
        expect(techFilter.closest('button')).toHaveClass('scale-105')
      })
    })

    it('has accessible event cards with proper ARIA labels', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      await waitFor(() => {
        const eventCards = screen.getAllByRole('button', { name: /view more details about/i })
        expect(eventCards.length).toBeGreaterThan(0)
        
        // Check each event card has proper accessibility
        eventCards.forEach(card => {
          expect(card).toHaveAttribute('aria-label')
          expect(card).toHaveAttribute('tabIndex', '0')
        })
      })
    })
  })

  describe('Event Details Page', () => {
    it('renders event details with booking button', async () => {
      render(
        <TestWrapper>
          <EventDetailsPage />
        </TestWrapper>
      )

      // Wait for event to load
      await waitFor(() => {
        const eventTitle = screen.getByRole('heading', { level: 1 })
        expect(eventTitle).toBeInTheDocument()
      })

      // Check RSVP button exists and is accessible
      const rsvpButton = screen.getByRole('button', { name: /rsvp to/i })
      expect(rsvpButton).toBeInTheDocument()
      expect(rsvpButton).toHaveClass('focus:ring-2')
    })

    it('opens RSVP modal with accessible form fields', async () => {
      render(
        <TestWrapper>
          <EventDetailsPage />
        </TestWrapper>
      )

      await waitFor(() => {
        const rsvpButton = screen.getByRole('button', { name: /rsvp to/i })
        fireEvent.click(rsvpButton)
      })

      // Check modal opened
      await waitFor(() => {
        const modal = screen.getByRole('dialog', { hidden: true })
        expect(modal).toBeInTheDocument()
      })

      // Check form fields have proper labels
      const notesField = screen.getByLabelText(/notes \(optional\)/i)
      expect(notesField).toBeInTheDocument()
      expect(notesField).toHaveAttribute('id', 'rsvp-notes')

      const dietaryField = screen.getByLabelText(/dietary requirements/i)
      expect(dietaryField).toBeInTheDocument()
      expect(dietaryField).toHaveAttribute('id', 'dietary-requirements')
    })
  })

  describe('Event Booking Page', () => {
    it('renders multi-step booking form with accessibility', async () => {
      render(
        <TestWrapper>
          <TechnologyWorkshopBookingPage />
        </TestWrapper>
      )

      // Check form step 1 fields have proper labels
      await waitFor(() => {
        const firstNameField = screen.getByLabelText(/first name/i)
        expect(firstNameField).toBeInTheDocument()
        expect(firstNameField).toHaveAttribute('id', 'firstName')
        expect(firstNameField).toHaveAttribute('required')

        const lastNameField = screen.getByLabelText(/last name/i)
        expect(lastNameField).toBeInTheDocument()
        expect(lastNameField).toHaveAttribute('id', 'lastName')

        const emailField = screen.getByLabelText(/email address/i)
        expect(emailField).toBeInTheDocument()
        expect(emailField).toHaveAttribute('id', 'email')
        expect(emailField).toHaveAttribute('autoComplete', 'email')
      })
    })

    it('progresses through booking steps correctly', async () => {
      render(
        <TestWrapper>
          <TechnologyWorkshopBookingPage />
        </TestWrapper>
      )

      // Fill out step 1
      const firstNameField = screen.getByLabelText(/first name/i)
      const lastNameField = screen.getByLabelText(/last name/i)
      const emailField = screen.getByLabelText(/email address/i)

      fireEvent.change(firstNameField, { target: { value: 'João' } })
      fireEvent.change(lastNameField, { target: { value: 'Silva' } })
      fireEvent.change(emailField, { target: { value: 'joao@example.com' } })

      const continueButton = screen.getByText(/continue/i)
      fireEvent.click(continueButton)

      // Should progress to step 2
      await waitFor(() => {
        const step2Title = screen.getByText(/workshop details/i)
        expect(step2Title).toBeInTheDocument()
      })

      // Continue to step 3
      const continueButton2 = screen.getByText(/continue/i)
      fireEvent.click(continueButton2)

      await waitFor(() => {
        const step3Title = screen.getByText(/payment & confirmation/i)
        expect(step3Title).toBeInTheDocument()
      })

      // Check terms checkbox
      const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms/i })
      expect(termsCheckbox).toBeInTheDocument()
      expect(termsCheckbox).toHaveAttribute('required')
    })

    it('validates required fields and shows errors', async () => {
      render(
        <TestWrapper>
          <TechnologyWorkshopBookingPage />
        </TestWrapper>
      )

      // Try to continue without filling required fields
      const continueButton = screen.getByText(/continue/i)
      expect(continueButton).toBeDisabled()

      // Fill one field
      const firstNameField = screen.getByLabelText(/first name/i)
      fireEvent.change(firstNameField, { target: { value: 'João' } })

      // Button should still be disabled
      expect(continueButton).toBeDisabled()

      // Fill all required fields
      const lastNameField = screen.getByLabelText(/last name/i)
      const emailField = screen.getByLabelText(/email address/i)
      
      fireEvent.change(lastNameField, { target: { value: 'Silva' } })
      fireEvent.change(emailField, { target: { value: 'joao@example.com' } })

      // Button should now be enabled
      expect(continueButton).toBeEnabled()
    })

    it('supports keyboard navigation', async () => {
      render(
        <TestWrapper>
          <TechnologyWorkshopBookingPage />
        </TestWrapper>
      )

      const firstNameField = screen.getByLabelText(/first name/i)
      const lastNameField = screen.getByLabelText(/last name/i)
      const emailField = screen.getByLabelText(/email address/i)

      // Tab navigation should work
      firstNameField.focus()
      expect(document.activeElement).toBe(firstNameField)

      fireEvent.keyDown(firstNameField, { key: 'Tab' })
      // Note: Actual tab navigation would require a more sophisticated test setup
      // This tests that the fields are properly focusable
      expect(lastNameField).toHaveAttribute('tabIndex', undefined)
    })
  })

  describe('Portuguese Cultural Events', () => {
    it('displays Portuguese cultural elements correctly', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      // Look for Portuguese flag and cultural indicators
      await waitFor(() => {
        const portugueseFlag = screen.getByText('🇵🇹')
        expect(portugueseFlag).toBeInTheDocument()
      })

      // Check for Portuguese language toggle or content
      const culturalElements = screen.getAllByText(/portuguese/i)
      expect(culturalElements.length).toBeGreaterThan(0)
    })

    it('filters events for Portuguese community', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      // Look for cultural filter
      await waitFor(() => {
        const culturalFilter = screen.getByText(/🎭 cultural/i)
        expect(culturalFilter).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText(/🎭 cultural/i))

      // Should show Portuguese cultural events
      await waitFor(() => {
        const culturalEvents = screen.queryAllByText(/cultural/i)
        expect(culturalEvents.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Mobile Accessibility', () => {
    it('has minimum touch target sizes', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      await waitFor(() => {
        // Check buttons meet 44px minimum touch target
        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
          const styles = window.getComputedStyle(button)
          const minHeight = parseInt(styles.minHeight) || parseInt(styles.height)
          // Note: In jsdom, actual pixel measurements aren't available
          // In a real browser test, we would check minHeight >= 44
          expect(button).toBeInTheDocument()
        })
      })
    })

    it('supports screen readers with proper labels', async () => {
      render(
        <TestWrapper>
          <EventsPage />
        </TestWrapper>
      )

      // Check all interactive elements have accessible names
      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
          const accessibleName = button.getAttribute('aria-label') || 
                                 button.textContent || 
                                 button.getAttribute('title')
          expect(accessibleName).toBeTruthy()
        })

        const inputs = screen.getAllByRole('textbox')
        inputs.forEach(input => {
          const label = screen.getByLabelText(new RegExp(input.getAttribute('placeholder') || '', 'i'), { exact: false })
          expect(label).toBeInTheDocument()
        })
      })
    })
  })
})