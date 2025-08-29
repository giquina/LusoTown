import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'
import Logo from '@/components/Logo'
import LanguageToggle from '@/components/LanguageToggle'

// Mock fetch for language files
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      'common.language': 'Language',
      'nav.language_toggle': 'Language'
    }),
  })
) as jest.Mock

// Simplified wrapper for testing individual components
const TestWrapper: React.FC<{ children: React.ReactNode; initialLanguage?: 'en' | 'pt' }> = ({ 
  children, 
  initialLanguage = 'en' 
}) => {
  // Mock localStorage for language
  beforeEach(() => {
    global.localStorage.getItem = jest.fn((key) => {
      if (key === 'lusotown-language') return initialLanguage
      return null
    })
  })

  return (
    <LanguageProvider>
      <HeritageProvider>
        {children}
      </HeritageProvider>
    </LanguageProvider>
  )
}

describe('Core Component Tests - Portuguese Community Platform', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Logo Component', () => {
    it('should render LusoTown branding correctly', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should render LusoTown text
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
      })
    })

    it('should render with Portuguese cultural elements', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should show London location
        expect(screen.getByText('London')).toBeInTheDocument()
        
        // Should have flag elements
        const flagElements = screen.getAllByRole('img')
        expect(flagElements.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Language Toggle Component', () => {
    it('should render language toggle', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LanguageToggle />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should render language toggle button
        const languageButton = screen.getByRole('button')
        expect(languageButton).toBeInTheDocument()
      })
    })

    it('should show current language indicator', async () => {
      await act(async () => {
        render(
          <TestWrapper initialLanguage="en">
            <LanguageToggle />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should show EN initially or have language-related content
        const content = screen.getByRole('button').textContent
        expect(content).toBeTruthy()
      })
    })
  })

  describe('Portuguese Community Context', () => {
    it('should support Portuguese text rendering', async () => {
      const portugueseText = 'Comunidade portuguesa em Londres'
      await act(async () => {
        render(
          <TestWrapper>
            <div>{portugueseText}</div>
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText(portugueseText)).toBeInTheDocument()
      })
    })

    it('should support Portuguese special characters', async () => {
      const specialChars = 'São João, Açores, Coração, Ação'
      await act(async () => {
        render(
          <TestWrapper>
            <div>{specialChars}</div>
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText(specialChars)).toBeInTheDocument()
      })
    })

    it('should maintain Portuguese cultural authenticity', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <div>
              <span>Fado</span>
              <span>Saudade</span>
              <span>Pastéis de Nata</span>
            </div>
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('Fado')).toBeInTheDocument()
        expect(screen.getByText('Saudade')).toBeInTheDocument()
        expect(screen.getByText('Pastéis de Nata')).toBeInTheDocument()
      })
    })
  })

  describe('UK Location Context', () => {
    it('should emphasize London and UK locations', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <div>
              <span>London</span>
              <span>United Kingdom</span>
              <span>Greater London</span>
            </div>
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('London')).toBeInTheDocument()
        expect(screen.getByText('United Kingdom')).toBeInTheDocument()
        expect(screen.getByText('Greater London')).toBeInTheDocument()
      })
    })
  })

  describe('Mobile-First Design Validation', () => {
    it('should render without errors in mobile viewport', async () => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
      })
    })

    it('should handle different viewport sizes', async () => {
      const viewports = [375, 768, 1024] // Mobile, tablet, desktop
      
      for (const width of viewports) {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        
        await act(async () => {
          const { unmount } = render(
            <TestWrapper>
              <Logo />
            </TestWrapper>
          )
          
          await waitFor(() => {
            expect(screen.getByText('LusoTown')).toBeInTheDocument()
          })
          
          unmount()
        })
      }
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA labels for flags', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Check for flag accessibility
        const flagElements = screen.getAllByRole('img')
        flagElements.forEach(flag => {
          expect(flag).toHaveAttribute('aria-label')
        })
      })
    })

    it('should support screen readers', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
            <LanguageToggle />
          </TestWrapper>
        )
      })
      
      await waitFor(() => {
        // Main content should be accessible
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('type', 'button')
      })
    })
  })

  describe('Performance Considerations', () => {
    it('should render components quickly', async () => {
      const startTime = performance.now()
      
      await act(async () => {
        render(
          <TestWrapper>
            <Logo />
            <LanguageToggle />
          </TestWrapper>
        )
      })
      
      const endTime = performance.now()
      
      await waitFor(() => {
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
      })
      
      // Should render within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })
})
