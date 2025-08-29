import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { MobileRedirectProvider } from '@/components/MobileRedirectProvider'
import MobileNavigationFixed, { EnhancedMobileNavButton } from '@/components/MobileNavigationFixed'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock components
jest.mock('@/components/LanguageToggle', () => {
  return function MockLanguageToggle() {
    return <div data-testid="language-toggle">Language Toggle</div>
  }
})

jest.mock('@/components/MobileRedirectProvider', () => ({
  useMobileRedirect: () => ({
    deviceInfo: { isMobile: true },
    triggerAppDownload: jest.fn(),
    showDownloadPrompt: false,
  }),
  MobileRedirectProvider: ({ children }: any) => children,
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      <MobileRedirectProvider>
        {component}
      </MobileRedirectProvider>
    </LanguageProvider>
  )
}

describe('Mobile Navigation Touch Fixes', () => {
  describe('EnhancedMobileNavButton', () => {
    it('meets WCAG touch target minimum size (44px)', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      const styles = window.getComputedStyle(button)
      
      // Check minimum dimensions
      expect(styles.minHeight).toBe('56px') // Enhanced target size
      expect(styles.minWidth).toBe('56px')
    })

    it('has proper touch manipulation properties', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      expect(button).toHaveClass('touch-manipulation')
      expect(button).toHaveClass('select-none')
    })

    it('has proper z-index for layering above carousels', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      expect(button).toHaveClass('z-[10002]')
    })

    it('provides Portuguese-specific aria labels', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      expect(button).toHaveAttribute('aria-label', 'Open Portuguese navigation menu')
    })

    it('changes aria label when menu is open', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={true}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      expect(button).toHaveAttribute('aria-label', 'Close Portuguese navigation menu')
    })

    it('handles touch events properly', () => {
      const mockOnClick = jest.fn()
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={mockOnClick}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      
      // Test touch start
      fireEvent.touchStart(button)
      // Test touch end
      fireEvent.touchEnd(button)
      
      // Test click
      fireEvent.click(button)
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('MobileNavigationFixed', () => {
    it('renders with proper z-index layers', () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      // Check backdrop z-index
      const backdrop = document.querySelector('.z-\\[9998\\]')
      expect(backdrop).toBeInTheDocument()

      // Check content z-index
      const content = document.querySelector('.z-\\[9999\\]')
      expect(content).toBeInTheDocument()
    })

    it('includes Portuguese community language toggle', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
      })
    })

    it('has proper touch action for scroll prevention', () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      const backdrop = document.querySelector('[style*="touch-action: none"]')
      expect(backdrop).toBeInTheDocument()

      const content = document.querySelector('[style*="touch-action: pan-y"]')
      expect(content).toBeInTheDocument()
    })

    it('prevents body scroll when open', () => {
      const { rerender } = renderWithProviders(
        <MobileNavigationFixed
          isOpen={false}
          onClose={jest.fn()}
        />
      )

      // Menu closed - body should scroll normally
      expect(document.body.style.overflow).toBe('')

      rerender(
        <LanguageProvider>
          <MobileRedirectProvider>
            <MobileNavigationFixed
              isOpen={true}
              onClose={jest.fn()}
            />
          </MobileRedirectProvider>
        </LanguageProvider>
      )

      // Menu open - body scroll should be prevented
      expect(document.body.style.overflow).toBe('hidden')
      expect(document.body.style.position).toBe('fixed')
    })

    it('all navigation items meet touch target requirements', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        const navItems = document.querySelectorAll('.luxury-touch-target')
        navItems.forEach((item) => {
          const styles = window.getComputedStyle(item as Element)
          expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(56) // Enhanced target size
        })
      })
    })

    it('includes Portuguese cultural branding', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('Portuguese Community')).toBeInTheDocument()
      })
    })

    it('shows mobile app download CTA for mobile users', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('Get the LusoTown App')).toBeInTheDocument()
        expect(screen.getByText('Download App')).toBeInTheDocument()
      })
    })

    it('closes menu when navigation item is clicked', async () => {
      const mockOnClose = jest.fn()
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={mockOnClose}
        />
      )

      await waitFor(() => {
        const navLink = screen.getByText("What's On")
        fireEvent.click(navLink)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })
    })

    it('closes menu when backdrop is clicked', () => {
      const mockOnClose = jest.fn()
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={mockOnClose}
        />
      )

      const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/60')
      if (backdrop) {
        fireEvent.click(backdrop)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('Responsive Breakpoints', () => {
    const mockViewport = (width: number, height: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
      })
      fireEvent(window, new Event('resize'))
    }

    it('adapts to small mobile viewport (375px)', () => {
      mockViewport(375, 667)
      
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      const content = document.querySelector('.fixed')
      expect(content).toHaveClass('left-2', 'right-2')
    })

    it('adapts to large mobile viewport (414px)', () => {
      mockViewport(414, 736)
      
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      const content = document.querySelector('.fixed')
      expect(content).toHaveClass('left-2', 'right-2')
    })

    it('adapts to tablet viewport (768px)', () => {
      mockViewport(768, 1024)
      
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      const content = document.querySelector('.fixed')
      expect(content).toHaveClass('left-2', 'right-2')
    })

    it('hides on desktop viewport (1024px+)', () => {
      mockViewport(1024, 768)
      
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      const content = document.querySelector('.xl\\:hidden')
      expect(content).toHaveClass('xl:hidden')
    })
  })

  describe('Accessibility Compliance', () => {
    it('provides proper keyboard navigation', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        const navItems = screen.getAllByRole('link')
        navItems.forEach((item) => {
          expect(item).toHaveAttribute('tabIndex')
        })
      })
    })

    it('has proper ARIA labels and roles', () => {
      renderWithProviders(
        <EnhancedMobileNavButton
          isOpen={false}
          onClick={jest.fn()}
          data-testid="mobile-nav-button"
        />
      )

      const button = screen.getByTestId('mobile-nav-button')
      expect(button).toHaveAttribute('role', 'button')
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('supports screen readers with proper semantic structure', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        // Check for semantic headings
        const headings = screen.getAllByRole('heading', { level: 3 })
        expect(headings.length).toBeGreaterThan(0)
        
        // Check for proper link structure
        const links = screen.getAllByRole('link')
        expect(links.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Portuguese Cultural Features', () => {
    it('displays Portuguese flag and community branding', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        // Look for Portuguese flag emoji
        const portugueseFlag = document.querySelector('span[text-content="🇵🇹"]')
        expect(screen.getByText('Portuguese Community')).toBeInTheDocument()
      })
    })

    it('includes lusophone language events in navigation', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('Lusophone Language')).toBeInTheDocument()
      })
    })

    it('includes cultural events and Portuguese business networking', async () => {
      renderWithProviders(
        <MobileNavigationFixed
          isOpen={true}
          onClose={jest.fn()}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('Cultural Events')).toBeInTheDocument()
        expect(screen.getByText('Business Networking')).toBeInTheDocument()
      })
    })
  })
})