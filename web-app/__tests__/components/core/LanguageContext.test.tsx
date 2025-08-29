import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import '@testing-library/jest-dom'

// Test component to access context
function TestComponent() {
  const { language, setLanguage, t } = useLanguage()
  
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="translated-text">{t('common.welcome')}</div>
      <button 
        data-testid="switch-to-portuguese" 
        onClick={() => setLanguage('pt')}
      >
        Switch to Portuguese
      </button>
      <button 
        data-testid="switch-to-english" 
        onClick={() => setLanguage('en')}
      >
        Switch to English
      </button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    global.localStorage.clear()
  })

  it('defaults to English language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('switches to Portuguese language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const switchButton = screen.getByTestId('switch-to-portuguese')
    fireEvent.click(switchButton)

    expect(screen.getByTestId('current-language')).toHaveTextContent('pt')
  })

  it('switches back to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // First switch to Portuguese
    const switchToPortuguese = screen.getByTestId('switch-to-portuguese')
    fireEvent.click(switchToPortuguese)
    expect(screen.getByTestId('current-language')).toHaveTextContent('pt')

    // Then switch back to English
    const switchToEnglish = screen.getByTestId('switch-to-english')
    fireEvent.click(switchToEnglish)
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('persists language selection in localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const switchButton = screen.getByTestId('switch-to-portuguese')
    fireEvent.click(switchButton)

    // Check if language is saved to localStorage
    expect(global.localStorage.setItem).toHaveBeenCalledWith('lusotown-language', 'pt')
  })

  it('loads language from localStorage', () => {
    // Pre-set Portuguese in localStorage
    global.localStorage.setItem('lusotown-language', 'pt')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('pt')
  })

  it('provides translation function', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // The translation function should return some text
    const translatedElement = screen.getByTestId('translated-text')
    expect(translatedElement).toBeInTheDocument()
    expect(translatedElement.textContent).not.toBe('')
  })

  it('handles missing translation keys gracefully', () => {
    function TestMissingKey() {
      const { t } = useLanguage()
      return <div data-testid="missing-key">{t('non.existent.key')}</div>
    }

    render(
      <LanguageProvider>
        <TestMissingKey />
      </LanguageProvider>
    )

    const element = screen.getByTestId('missing-key')
    // Should return the key itself when translation is missing
    expect(element.textContent).toBe('non.existent.key')
  })

  it('supports Portuguese cultural terms preservation', () => {
    function TestPortugueseTerms() {
      const { t } = useLanguage()
      return (
        <div>
          <div data-testid="fado">{t('cultural.fado')}</div>
          <div data-testid="saudade">{t('cultural.saudade')}</div>
        </div>
      )
    }

    render(
      <LanguageProvider>
        <TestPortugueseTerms />
      </LanguageProvider>
    )

    // These Portuguese cultural terms should be preserved
    expect(screen.getByTestId('fado')).toBeInTheDocument()
    expect(screen.getByTestId('saudade')).toBeInTheDocument()
  })

  it('throws error when used outside provider', () => {
    // Mock console.error to avoid noise in test output
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useLanguage must be used within a LanguageProvider')

    console.error = originalError
  })

  it('supports UK-specific Portuguese community terms', () => {
    function TestUKTerms() {
      const { t } = useLanguage()
      return (
        <div>
          <div data-testid="london-community">{t('location.london_community')}</div>
          <div data-testid="uk-portuguese">{t('community.uk_portuguese')}</div>
        </div>
      )
    }

    render(
      <LanguageProvider>
        <TestUKTerms />
      </LanguageProvider>
    )

    expect(screen.getByTestId('london-community')).toBeInTheDocument()
    expect(screen.getByTestId('uk-portuguese')).toBeInTheDocument()
  })
})