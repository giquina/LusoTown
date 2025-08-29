import React from 'react'
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { CartProvider } from '@/context/CartContext'
import { AuthPopupProvider } from '@/components/AuthPopupProvider'
import Logo from '@/components/Logo'
import LanguageToggle from '@/components/LanguageToggle'

// Mock auth library
jest.mock('@/lib/auth', () => ({
  isAuthenticated: () => false,
  useAuthState: () => () => {},
}))

// Mock fetch for language files
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      'common.language': 'Language',
      'nav.language_toggle': 'Language Toggle',
      'favorites.title': 'Favorites',
      'auth.signin_required': 'Please sign in',
      'auth.authentication_required': 'Authentication Required',
      'common.cancel': 'Cancel',
      'auth.sign_in': 'Sign In'
    }),
  })
) as jest.Mock

// Fixed context wrapper with correct order
const FullTestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <HeritageProvider>
        <CartProvider>
          <FavoritesProvider>
            <AuthPopupProvider>
              {children}
            </AuthPopupProvider>
          </FavoritesProvider>
        </CartProvider>
      </HeritageProvider>
    </LanguageProvider>
  )
}

describe('Portuguese Community Platform - Core Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock localStorage
    global.localStorage.getItem = jest.fn((key) => {
      if (key === 'lusotown-language') return 'en'
      return null
    })
    global.localStorage.setItem = jest.fn()
  })

  describe('🏛️ Logo Component - Portuguese Cultural Branding', () => {
    it('should render LusoTown brand name prominently', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should display London location to emphasize UK focus', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('London')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should include Portuguese and UK flags for cultural identity', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        const portugueseFlag = screen.getByLabelText('Lusophone flag')
        const ukFlag = screen.getByLabelText('United Kingdom flag')
        
        expect(portugueseFlag).toBeInTheDocument()
        expect(ukFlag).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('🇵🇹 Language Toggle - Bilingual Support', () => {
    it('should render language toggle button', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        const toggleButton = screen.getByRole('button')
        expect(toggleButton).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should show current language indicator', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('title')
      }, { timeout: 3000 })
    })

    it('should be interactive for language switching', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeEnabled()
      }, { timeout: 3000 })
    })
  })

  describe('🌍 Portuguese Text Support', () => {
    it('should render Portuguese text with special characters', async () => {
      const portugueseContent = [
        'São João',
        'Açores', 
        'Coração',
        'Ação',
        'Tradição',
        'Celebração'
      ]
      
      await act(async () => {
        render(
          <FullTestWrapper>
            <div>
              {portugueseContent.map((text, index) => (
                <span key={index} data-testid={`portuguese-${index}`}>{text}</span>
              ))}
            </div>
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        portugueseContent.forEach((text, index) => {
          expect(screen.getByTestId(`portuguese-${index}`)).toHaveTextContent(text)
        })
      })
    })

    it('should preserve Portuguese cultural terms', async () => {
      const culturalTerms = [
        'Fado',
        'Saudade', 
        'Pastéis de Nata',
        'Bacalhau',
        'Lusófono'
      ]
      
      await act(async () => {
        render(
          <FullTestWrapper>
            <div>
              {culturalTerms.map((term, index) => (
                <p key={index} data-testid={`cultural-${index}`}>{term}</p>
              ))}
            </div>
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        culturalTerms.forEach((term, index) => {
          expect(screen.getByTestId(`cultural-${index}`)).toHaveTextContent(term)
        })
      })
    })
  })

  describe('📱 Mobile-First Design Validation', () => {
    it('should render correctly on mobile viewport (375px)', async () => {
      // Set mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('♿ Accessibility - Portuguese Community Inclusive Design', () => {
    it('should have proper semantic markup for screen readers', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should have accessible button
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        
        // Should have accessible images with labels
        const images = screen.getAllByRole('img')
        images.forEach(img => {
          expect(img).toHaveAttribute('aria-label')
        })
      }, { timeout: 3000 })
    })

    it('should have proper touch targets (minimum 44px)', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('min-w-[44px]')
        expect(button).toHaveClass('min-h-[44px]')
      }, { timeout: 3000 })
    })
  })

  describe('⚡ Performance - Portuguese Community Optimization', () => {
    it('should render components within performance budget', async () => {
      const startTime = performance.now()
      
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
            <LanguageToggle />
          </FullTestWrapper>
        )
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      await waitFor(() => {
        expect(screen.getByText('LusoTown')).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Should render within reasonable time
      expect(renderTime).toBeLessThan(1000) // Increased to 1000ms for CI environment
    })
  })

  describe('🎨 Cultural Authenticity - Portuguese Heritage Preservation', () => {
    it('should maintain Portuguese cultural elements in design', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should have Portuguese flag element
        const portugueseFlag = screen.getByLabelText('Lusophone flag')
        expect(portugueseFlag).toBeInTheDocument()
        
        // Should show Portuguese flag emoji
        expect(portugueseFlag).toHaveTextContent('🇵🇹')
      }, { timeout: 3000 })
    })

    it('should emphasize connection between Portugal and UK', async () => {
      await act(async () => {
        render(
          <FullTestWrapper>
            <Logo />
          </FullTestWrapper>
        )
      })
      
      await waitFor(() => {
        // Should show both Portuguese and UK elements
        expect(screen.getByLabelText('Lusophone flag')).toBeInTheDocument()
        expect(screen.getByLabelText('United Kingdom flag')).toBeInTheDocument()
        expect(screen.getByText('London')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })
})
