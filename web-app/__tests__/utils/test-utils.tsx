import React, { ReactElement } from 'react'
import { render, RenderOptions, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock context providers to prevent actual API calls during testing
const MockLanguageProvider = ({ children, initialLanguage = 'en' }) => {
  return (
    <div data-testid="language-provider" data-language={initialLanguage}>
      {children}
    </div>
  )
}

const MockContextProvider = ({ children, name }) => {
  const providerId = name.toLowerCase() + '-provider'
  return (
    <div data-testid={providerId}>
      {children}
    </div>
  )
}

interface AllTheProvidersProps {
  children: React.ReactNode
  initialLanguage?: 'en' | 'pt'
  mockUser?: any
}

// Custom render function that includes mock LusoTown providers
const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  initialLanguage = 'en',
  mockUser 
}) => {
  return (
    <MockLanguageProvider initialLanguage={initialLanguage}>
      <MockContextProvider name="Heritage">
        <MockContextProvider name="Cart">
          <MockContextProvider name="Favorites">
            <MockContextProvider name="Subscription">
              <MockContextProvider name="Networking">
                {children}
              </MockContextProvider>
            </MockContextProvider>
          </MockContextProvider>
        </MockContextProvider>
      </MockContextProvider>
    </MockLanguageProvider>
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
  mockPortugueseUser: {
    id: 'test-user-pt',
    name: 'João Silva',
    email: 'joao@example.com',
    language: 'pt',
    location: 'Lisboa, Portugal',
    membershipTier: 'premium',
  },
  
  mockEnglishUser: {
    id: 'test-user-en',
    name: 'John Smith',
    email: 'john@example.com',
    language: 'en',
    location: 'London, United Kingdom',
    membershipTier: 'free',
  },
  
  mockPortugueseEvent: {
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
  }
}

// Mobile testing utilities
export const mobileTestUtils = {
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
  
  mockTouchStart: (element: HTMLElement, x: number = 0, y: number = 0) => {
    const touch = {
      clientX: x,
      clientY: y,
      identifier: 0,
      pageX: x,
      pageY: y,
      screenX: x,
      screenY: y,
      target: element,
    } as Touch

    const event = new TouchEvent('touchstart', {
      touches: [touch]
    })
    element.dispatchEvent(event)
  }
}

export * from '@testing-library/react'
export { customRender as render }
export { screen, fireEvent, waitFor }
