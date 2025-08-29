import React from 'react'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import { HeritageProvider } from '@/context/HeritageContext'
import Logo from '@/components/Logo'
import LanguageToggle from '@/components/LanguageToggle'

// Simplified wrapper for testing individual components
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageProvider>
    <HeritageProvider>
      {children}
    </HeritageProvider>
  </LanguageProvider>
)

describe('Header Component Dependencies', () => {
  describe('Logo Component', () => {
    it('should render logo correctly', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      )
      
      // Should render LusoTown logo
      const logoElement = screen.getByRole('img', { name: /lusotown/i })
      expect(logoElement).toBeInTheDocument()
    })

    it('should link to home page', () => {
      render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      )
      
      const logoLink = screen.getByRole('link')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Language Toggle Component', () => {
    it('should render language toggle', () => {
      render(
        <TestWrapper>
          <LanguageToggle />
        </TestWrapper>
      )
      
      // Should render language toggle button
      const languageButton = screen.getByRole('button')
      expect(languageButton).toBeInTheDocument()
    })

    it('should show current language', () => {
      render(
        <TestWrapper>
          <LanguageToggle />
        </TestWrapper>
      )
      
      // Should show English initially
      expect(screen.getByText(/en/i)).toBeInTheDocument()
    })
  })

  describe('Portuguese Community Context', () => {
    it('should support Portuguese text rendering', () => {
      const portugueseText = 'Comunidade portuguesa em Londres'
      render(
        <TestWrapper>
          <div>{portugueseText}</div>
        </TestWrapper>
      )
      
      expect(screen.getByText(portugueseText)).toBeInTheDocument()
    })

    it('should support Portuguese characters', () => {
      const specialChars = 'São João, Açores, Coração'
      render(
        <TestWrapper>
          <div>{specialChars}</div>
        </TestWrapper>
      )
      
      expect(screen.getByText(specialChars)).toBeInTheDocument()
    })
  })
})
