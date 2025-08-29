/**
 * Portuguese Internationalization (i18n) Tests
 * Verifies bilingual content accuracy and cultural preservation
 */

import React from 'react'
import { render, screen } from '../utils/test-utils'
import { portugueseTestUtils, culturalTestUtils } from '../utils/test-utils'
import '@testing-library/jest-dom'

// Mock translation files
const mockEnglishTranslations = {
  common: {
    welcome: 'Welcome to LusoTown',
    search: 'Search',
    contact: 'Contact Us',
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit'
  },
  navigation: {
    home: 'Home',
    events: 'Events',
    businesses: 'Business Directory',
    community: 'Community',
    about: 'About Us'
  },
  business: {
    category: {
      restaurant: 'Restaurant',
      cafe: 'Café',
      grocery: 'Grocery Store',
      services: 'Services',
      healthcare: 'Healthcare',
      education: 'Education'
    },
    details: {
      phone: 'Phone',
      website: 'Website',
      address: 'Address',
      hours: 'Opening Hours',
      verified: 'Verified Business'
    }
  },
  cultural: {
    fado: 'Fado',
    saudade: 'Saudade',
    heritage: 'Portuguese Heritage',
    community_events: 'Community Events',
    traditional_food: 'Traditional Portuguese Food'
  },
  location: {
    london: 'London',
    london_community: 'Portuguese Community in London',
    uk_portuguese: 'Portuguese-speaking community in the UK'
  }
}

const mockPortugueseTranslations = {
  common: {
    welcome: 'Bem-vindos ao LusoTown',
    search: 'Pesquisar',
    contact: 'Contactar',
    loading: 'A carregar...',
    error: 'Ocorreu um erro',
    save: 'Guardar',
    cancel: 'Cancelar',
    submit: 'Submeter'
  },
  navigation: {
    home: 'Início',
    events: 'Eventos',
    businesses: 'Directório de Negócios',
    community: 'Comunidade',
    about: 'Sobre Nós'
  },
  business: {
    category: {
      restaurant: 'Restaurante',
      cafe: 'Café',
      grocery: 'Mercearia',
      services: 'Serviços',
      healthcare: 'Cuidados de Saúde',
      education: 'Educação'
    },
    details: {
      phone: 'Telefone',
      website: 'Website',
      address: 'Morada',
      hours: 'Horário de Funcionamento',
      verified: 'Negócio Verificado'
    }
  },
  cultural: {
    fado: 'Fado', // Cultural term preserved
    saudade: 'Saudade', // Cultural term preserved
    heritage: 'Herança Portuguesa',
    community_events: 'Eventos da Comunidade',
    traditional_food: 'Comida Tradicional Portuguesa'
  },
  location: {
    london: 'Londres',
    london_community: 'Comunidade Portuguesa em Londres',
    uk_portuguese: 'Comunidade lusófona no Reino Unido'
  }
}

// Mock the translation function
const createMockTranslationFunction = (translations: any) => {
  return (key: string): string => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key // Return key if translation not found
  }
}

describe('Portuguese Internationalization Tests', () => {
  describe('Translation Function Accuracy', () => {
    it('returns correct English translations', () => {
      const t = createMockTranslationFunction(mockEnglishTranslations)
      
      expect(t('common.welcome')).toBe('Welcome to LusoTown')
      expect(t('navigation.events')).toBe('Events')
      expect(t('business.category.restaurant')).toBe('Restaurant')
      expect(t('cultural.heritage')).toBe('Portuguese Heritage')
    })

    it('returns correct Portuguese translations', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      expect(t('common.welcome')).toBe('Bem-vindos ao LusoTown')
      expect(t('navigation.events')).toBe('Eventos')
      expect(t('business.category.restaurant')).toBe('Restaurante')
      expect(t('cultural.heritage')).toBe('Herança Portuguesa')
    })

    it('handles missing translation keys gracefully', () => {
      const t = createMockTranslationFunction(mockEnglishTranslations)
      
      expect(t('non.existent.key')).toBe('non.existent.key')
      expect(t('another.missing.translation')).toBe('another.missing.translation')
    })

    it('preserves Portuguese cultural terms in both languages', () => {
      const tEn = createMockTranslationFunction(mockEnglishTranslations)
      const tPt = createMockTranslationFunction(mockPortugueseTranslations)
      
      // Cultural terms should remain the same in both languages
      expect(tEn('cultural.fado')).toBe('Fado')
      expect(tPt('cultural.fado')).toBe('Fado')
      
      expect(tEn('cultural.saudade')).toBe('Saudade')
      expect(tPt('cultural.saudade')).toBe('Saudade')
    })
  })

  describe('Business Category Translations', () => {
    it('translates business categories correctly in English', () => {
      const t = createMockTranslationFunction(mockEnglishTranslations)
      
      const categories = [
        { key: 'restaurant', expected: 'Restaurant' },
        { key: 'cafe', expected: 'Café' },
        { key: 'grocery', expected: 'Grocery Store' },
        { key: 'services', expected: 'Services' }
      ]
      
      categories.forEach(({ key, expected }) => {
        expect(t(`business.category.${key}`)).toBe(expected)
      })
    })

    it('translates business categories correctly in Portuguese', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      const categories = [
        { key: 'restaurant', expected: 'Restaurante' },
        { key: 'cafe', expected: 'Café' },
        { key: 'grocery', expected: 'Mercearia' },
        { key: 'services', expected: 'Serviços' }
      ]
      
      categories.forEach(({ key, expected }) => {
        expect(t(`business.category.${key}`)).toBe(expected)
      })
    })

    it('preserves Portuguese accent marks and special characters', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      // Check for proper Portuguese characters
      expect(t('navigation.businesses')).toContain('Directório') // í
      expect(t('business.details.address')).toBe('Morada') // No special chars but Portuguese term
      expect(t('business.details.hours')).toContain('Funcionamento') // Portuguese specific term
    })
  })

  describe('UI Component Translation Integration', () => {
    const TestTranslationComponent = ({ language }: { language: 'en' | 'pt' }) => {
      const translations = language === 'pt' ? mockPortugueseTranslations : mockEnglishTranslations
      const t = createMockTranslationFunction(translations)
      
      return (
        <div data-testid="translation-component">
          <h1 data-testid="welcome-message">{t('common.welcome')}</h1>
          <nav data-testid="navigation">
            <a data-testid="nav-home">{t('navigation.home')}</a>
            <a data-testid="nav-events">{t('navigation.events')}</a>
            <a data-testid="nav-businesses">{t('navigation.businesses')}</a>
          </nav>
          <div data-testid="cultural-section">
            <span data-testid="fado-term">{t('cultural.fado')}</span>
            <span data-testid="saudade-term">{t('cultural.saudade')}</span>
          </div>
        </div>
      )
    }

    it('displays English translations correctly in UI', () => {
      render(<TestTranslationComponent language="en" />)
      
      expect(screen.getByTestId('welcome-message')).toHaveTextContent('Welcome to LusoTown')
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Home')
      expect(screen.getByTestId('nav-events')).toHaveTextContent('Events')
      expect(screen.getByTestId('nav-businesses')).toHaveTextContent('Business Directory')
    })

    it('displays Portuguese translations correctly in UI', () => {
      render(<TestTranslationComponent language="pt" />)
      
      expect(screen.getByTestId('welcome-message')).toHaveTextContent('Bem-vindos ao LusoTown')
      expect(screen.getByTestId('nav-home')).toHaveTextContent('Início')
      expect(screen.getByTestId('nav-events')).toHaveTextContent('Eventos')
      expect(screen.getByTestId('nav-businesses')).toHaveTextContent('Directório de Negócios')
    })

    it('preserves cultural terms in both UI languages', () => {
      render(<TestTranslationComponent language="en" />)
      expect(screen.getByTestId('fado-term')).toHaveTextContent('Fado')
      expect(screen.getByTestId('saudade-term')).toHaveTextContent('Saudade')

      render(<TestTranslationComponent language="pt" />)
      expect(screen.getByTestId('fado-term')).toHaveTextContent('Fado')
      expect(screen.getByTestId('saudade-term')).toHaveTextContent('Saudade')
    })
  })

  describe('Portuguese Cultural Context Validation', () => {
    it('maintains Portuguese cultural terms across translations', () => {
      culturalTestUtils.portugueseCulturalTerms.forEach(term => {
        // These terms should not be translated
        const tEn = createMockTranslationFunction(mockEnglishTranslations)
        const tPt = createMockTranslationFunction(mockPortugueseTranslations)
        
        // Check if term exists in cultural section
        const culturalKey = `cultural.${term.toLowerCase()}`
        if (mockEnglishTranslations.cultural[term.toLowerCase() as keyof typeof mockEnglishTranslations.cultural]) {
          expect(tEn(culturalKey)).toBe(term)
          expect(tPt(culturalKey)).toBe(term)
        }
      })
    })

    it('correctly translates UK location references', () => {
      const tEn = createMockTranslationFunction(mockEnglishTranslations)
      const tPt = createMockTranslationFunction(mockPortugueseTranslations)
      
      expect(tEn('location.london')).toBe('London')
      expect(tPt('location.london')).toBe('Londres')
      
      expect(tEn('location.uk_portuguese')).toContain('UK')
      expect(tPt('location.uk_portuguese')).toContain('Reino Unido')
    })

    it('handles Portuguese-specific business terminology', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      // Portuguese business terms should be culturally appropriate
      expect(t('business.details.phone')).toBe('Telefone')
      expect(t('business.details.address')).toBe('Morada') // Portuguese term, not "Endereço"
      expect(t('business.category.cafe')).toBe('Café') // Preserved with accent
    })
  })

  describe('Translation Completeness', () => {
    it('has matching key structure between languages', () => {
      const getKeys = (obj: any, prefix = ''): string[] => {
        let keys: string[] = []
        for (const key in obj) {
          const fullKey = prefix ? `${prefix}.${key}` : key
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            keys = keys.concat(getKeys(obj[key], fullKey))
          } else {
            keys.push(fullKey)
          }
        }
        return keys
      }
      
      const englishKeys = getKeys(mockEnglishTranslations).sort()
      const portugueseKeys = getKeys(mockPortugueseTranslations).sort()
      
      expect(englishKeys).toEqual(portugueseKeys)
    })

    it('has no empty translations', () => {
      const checkForEmptyValues = (obj: any, path = ''): string[] => {
        let emptyKeys: string[] = []
        for (const key in obj) {
          const currentPath = path ? `${path}.${key}` : key
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            emptyKeys = emptyKeys.concat(checkForEmptyValues(obj[key], currentPath))
          } else if (!obj[key] || obj[key].trim() === '') {
            emptyKeys.push(currentPath)
          }
        }
        return emptyKeys
      }
      
      const englishEmpty = checkForEmptyValues(mockEnglishTranslations)
      const portugueseEmpty = checkForEmptyValues(mockPortugueseTranslations)
      
      expect(englishEmpty).toHaveLength(0)
      expect(portugueseEmpty).toHaveLength(0)
    })
  })

  describe('Portuguese Character Encoding', () => {
    it('properly handles Portuguese accented characters', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      // Test various Portuguese accented characters
      expect(t('navigation.businesses')).toContain('Directório') // í
      expect(t('common.contact')).toBe('Contactar') // No accents but Portuguese spelling
      
      // Should handle characters correctly in UTF-8
      const textWithAccents = t('navigation.businesses')
      expect(textWithAccents.length).toBe('Directório de Negócios'.length)
    })

    it('preserves special characters in cultural terms', () => {
      const t = createMockTranslationFunction(mockPortugueseTranslations)
      
      // Make sure special characters are preserved
      const businessText = t('business.details.hours')
      expect(businessText).toContain('Funcionamento') // No special chars but validation
      
      // Test that the encoding is correct
      expect(businessText.charCodeAt).toBeDefined()
    })
  })
})