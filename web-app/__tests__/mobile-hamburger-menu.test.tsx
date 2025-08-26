/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from '@/components/Header'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    a: ({ children, className, href, onClick, ...props }: any) => (
      <a className={className} href={href} onClick={onClick} {...props}>
        {children}
      </a>
    ),
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    <HeritageProvider>
      {children}
    </HeritageProvider>
  </LanguageProvider>
)

describe('Mobile Hamburger Menu', () => {
  beforeEach(() => {
    // Mock window.innerWidth for mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    // Mock matchMedia for responsive design
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('(max-width: 768px)'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  test('renders mobile menu button correctly', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    // Check if mobile menu button exists
    const menuButton = screen.getByTestId('mobile-menu-button')
    expect(menuButton).toBeInTheDocument()
  })

  test('mobile menu button has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    
    // Check accessibility attributes
    expect(menuButton).toHaveAttribute('aria-label')
    expect(menuButton.getAttribute('aria-label')).toContain('menu')
  })

  test('mobile menu opens and closes correctly', async () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    
    // Initially, menu should be closed
    expect(screen.queryByText('What\'s Happening')).not.toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Menu content should appear
    await waitFor(() => {
      expect(screen.getByText('What\'s Happening')).toBeInTheDocument()
    })
    
    // Click to close menu
    fireEvent.click(menuButton)
    
    // Menu should disappear
    await waitFor(() => {
      expect(screen.queryByText('What\'s Happening')).not.toBeInTheDocument()
    })
  })

  test('mobile menu has proper z-index layering', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)

    // Check if backdrop and content have proper z-index classes
    const backdrop = document.querySelector('.z-\\[9998\\]')
    const content = document.querySelector('.z-\\[9999\\]')
    
    expect(backdrop).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  test('mobile menu items have proper touch targets', async () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)

    await waitFor(() => {
      const menuItems = document.querySelectorAll('.min-h-\\[56px\\]')
      expect(menuItems.length).toBeGreaterThan(0)
    })
  })

  test('mobile menu includes Portuguese cultural theming', async () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)

    await waitFor(() => {
      // Check for Portuguese cultural elements
      const menuContent = document.querySelector('.bg-white\\/98')
      const menuItems = document.querySelectorAll('.luxury-touch-target')
      
      expect(menuContent).toBeInTheDocument()
      expect(menuItems.length).toBeGreaterThan(0)
    })
  })

  test('mobile menu supports Portuguese community navigation', async () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)

    await waitFor(() => {
      // Check for community navigation sections
      expect(screen.getByText('Community Actions')).toBeInTheDocument()
      expect(screen.getByText('Business Solutions')).toBeInTheDocument()
      expect(screen.getByText('Find Your Match')).toBeInTheDocument()
    })
  })

  test('mobile menu has enhanced animations and interactions', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    
    // Check if button has enhanced styling classes
    expect(menuButton).toHaveClass('luxury-touch-target')
    expect(menuButton).toHaveClass('min-h-[56px]')
    expect(menuButton).toHaveClass('min-w-[56px]')
  })

  test('mobile menu backdrop closes menu when clicked', async () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )

    const menuButton = screen.getByTestId('mobile-menu-button')
    
    // Open menu
    fireEvent.click(menuButton)
    
    await waitFor(() => {
      expect(screen.getByText('What\'s Happening')).toBeInTheDocument()
    })

    // Click backdrop to close
    const backdrop = document.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    await waitFor(() => {
      expect(screen.queryByText('What\'s Happening')).not.toBeInTheDocument()
    })
  })
})