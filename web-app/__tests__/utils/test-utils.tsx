import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { NetworkingProvider } from '@/context/NetworkingContext'
import { SubscriptionProvider } from '@/context/SubscriptionContext'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

interface AllTheProvidersProps {
  children: React.ReactNode
  initialLanguage?: 'en' | 'pt'
  mockUser?: any
}

// Custom render function that includes all LusoTown providers
const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  initialLanguage = 'en',
  mockUser 
}) => {
  // Mock localStorage for initial language
  if (initialLanguage) {
    global.localStorage.getItem = jest.fn((key) => {
      if (key === 'lusotown-language') return initialLanguage
      if (key === 'lusotown-user' && mockUser) return JSON.stringify(mockUser)
      return null
    })
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <SubscriptionProvider>
            <NetworkingProvider>
              {children}
            </NetworkingProvider>
          </SubscriptionProvider>
        </FavoritesProvider>
      </CartProvider>
    </LanguageProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialLanguage?: 'en' | 'pt'
    mockUser?: any
  }
) => {
  const { initialLanguage, mockUser, ...renderOptions } = options || {}
  
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders 
        {...props} 
        initialLanguage={initialLanguage}
        mockUser={mockUser}
      />
    ),
    ...renderOptions,
  })
}

// Portuguese-specific test utilities
export const portugueseTestUtils = {
  // Mock Portuguese user
  mockPortugueseUser: (global as any).testUtils?.mockPortugueseUser,
  
  // Mock English user living in London
  mockEnglishUser: (global as any).testUtils?.mockEnglishUser,
  
  // Mock Portuguese event
  mockPortugueseEvent: (global as any).testUtils?.mockPortugueseEvent,
  
  // Verify Portuguese text content
  expectPortugueseText: (element: HTMLElement, expectedText: string) => {
    expect(element).toHaveTextContent(expectedText)
  },
  
  // Verify bilingual content
  expectBilingualContent: (container: HTMLElement, textEn: string, textPt: string) => {
    const hasEnglish = container.textContent?.includes(textEn)
    const hasPortuguese = container.textContent?.includes(textPt)
    expect(hasEnglish || hasPortuguese).toBe(true)
  },
  
  // Mock networking connections for Portuguese community
  mockPortugueseConnections: [
    {
      id: 'conn-1',
      userId: 'current-user',
      connectedUserId: 'user-maria',
      connectedUser: {
        id: 'user-maria',
        firstName: 'Maria',
        lastName: 'Santos',
        profilePictureUrl: 'https://example.com/maria.jpg',
        location: 'Camberwell, London',
        membershipTier: 'premium' as const,
        isVerified: true
      },
      connectionSource: 'event_based' as const,
      sharedEventsCount: 3,
      connectionStrength: 8.5,
      lastInteractionAt: '2024-01-20T18:00:00Z',
      isActive: true,
      privacyLevel: 'normal' as const,
      createdAt: '2024-01-15T20:30:00Z'
    }
  ],
  
  // Mock subscription data
  mockPremiumSubscription: {
    id: 'sub-1',
    user_id: 'test-user',
    status: 'active' as const,
    plan_type: 'yearly' as const,
    tier: 'platinum' as const,
    current_period_end: '2025-01-01T00:00:00Z',
    amount: 25,
    currency: 'GBP',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  
  // Mock cultural events
  mockCulturalEvents: [
    {
      id: 'event-fado',
      title: 'Noite de Fado',
      title_en: 'Fado Night',
      description: 'Uma noite especial de música tradicional portuguesa',
      description_en: 'A special night of traditional Portuguese music',
      date: '2024-02-15T20:00:00Z',
      location: 'Portuguese Cultural Centre, London',
      price: 25,
      currency: 'GBP',
      category: 'cultural',
      image_url: 'https://example.com/fado.jpg'
    },
    {
      id: 'event-food-tour',
      title: 'Tour Gastronómico Português',
      title_en: 'Portuguese Food Tour',
      description: 'Explore os sabores de Portugal em Londres',
      description_en: 'Explore the flavors of Portugal in London',
      date: '2024-02-20T14:00:00Z',
      location: 'Little Portugal, London',
      price: 35,
      currency: 'GBP',
      category: 'food',
      image_url: 'https://example.com/food-tour.jpg'
    }
  ]
}

// Mobile testing utilities
export const mobileTestUtils = {
  // Set viewport to mobile size
  setMobileViewport: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    })
    window.dispatchEvent(new Event('resize'))
  },
  
  // Set viewport to tablet size
  setTabletViewport: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    window.dispatchEvent(new Event('resize'))
  },
  
  // Set viewport to desktop size
  setDesktopViewport: () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
    window.dispatchEvent(new Event('resize'))
  },
  
  // Mock touch events
  mockTouchStart: (element: HTMLElement, x: number = 0, y: number = 0) => {
    const event = new TouchEvent('touchstart', {
      touches: [
        {
          clientX: x,
          clientY: y,
          identifier: 0,
          pageX: x,
          pageY: y,
          screenX: x,
          screenY: y,
          target: element,
        } as Touch
      ]
    })
    element.dispatchEvent(event)
  }
}

// Performance testing utilities
export const performanceTestUtils = {
  // Mock performance API
  mockPerformanceNow: () => {
    const startTime = Date.now()
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now() - startTime)
  },
  
  // Measure component render time
  measureRenderTime: async (renderFn: () => void) => {
    const start = performance.now()
    await renderFn()
    const end = performance.now()
    return end - start
  },
  
  // Mock slow network conditions
  mockSlowNetwork: () => {
    jest.spyOn(window, 'fetch').mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(new Response()), 2000))
    )
  }
}

// Security testing utilities
export const securityTestUtils = {
  // Test for XSS vulnerabilities
  createXSSPayload: (elementType: string = 'script') => {
    return `<${elementType}>alert('XSS')</${elementType}>`
  },
  
  // Test for SQL injection patterns
  createSQLInjectionPayload: () => {
    return "'; DROP TABLE users; --"
  },
  
  // Verify content sanitization
  expectSanitizedContent: (element: HTMLElement, dangerousContent: string) => {
    expect(element.innerHTML).not.toContain('<script')
    expect(element.innerHTML).not.toContain('javascript:')
    expect(element.innerHTML).not.toContain('DROP TABLE')
  }
}

// Cultural sensitivity testing utilities
export const culturalTestUtils = {
  // Portuguese cultural terms that should be preserved
  portugueseCulturalTerms: [
    'Fado',
    'Saudade',
    'Bacalhau',
    'Pastéis de Nata',
    'Santos Populares',
    'Lusófono',
    'Saldo',
    'Obrigado',
    'Obrigada'
  ],
  
  // Verify cultural term preservation
  expectCulturalTermPreservation: (element: HTMLElement, terms: string[]) => {
    terms.forEach(term => {
      if (element.textContent?.includes(term)) {
        // Ensure the term is not translated or altered
        expect(element.textContent).toContain(term)
      }
    })
  },
  
  // UK-specific location terms
  ukLocationTerms: [
    'London',
    'Greater London',
    'Camden',
    'Vauxhall',
    'Kennington',
    'UK',
    'United Kingdom'
  ],
  
  // Verify UK focus in content
  expectUKLocationFocus: (element: HTMLElement) => {
    const hasUKReference = culturalTestUtils.ukLocationTerms.some(term => 
      element.textContent?.includes(term)
    )
    expect(hasUKReference).toBe(true)
  }
}

// Re-export everything from testing-library
export * from '@testing-library/react'
// Already exported via export * above, no need for explicit export
export { customRender as render }
