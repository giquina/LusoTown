/**
 * Example Mobile UX Tests for LusoTown Components
 * 
 * This file demonstrates how to use the Mobile UX Testing Suite
 * to validate components for Portuguese-speaking community platform requirements.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MobileUXTestSuite, PORTUGUESE_TEST_CONTENT, mockViewport } from '../mobile-ux-tests';
import { validateMobileComponent } from '@/utils/mobile-ux-validator';
import { LanguageContext } from '@/context/LanguageContext';

// Mock components for testing
const MockEventCard: React.FC<{ title: string; description: string; language: string }> = ({
  title,
  description,
  language
}) => (
  <div className="bg-white rounded-lg shadow p-4 max-w-sm">
    <div className="mb-4">
      <img 
        src="/events/fado-night.jpg" 
        alt="Fado night event"
        className="w-full h-48 object-cover rounded"
        loading="lazy"
      />
    </div>
    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
      {title}
    </h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
      {description}
    </p>
    <button className="w-full min-h-[48px] bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
      {language === 'pt' ? 'Participar no Evento' : 'Join Event'}
    </button>
  </div>
);

const MockLanguageProvider: React.FC<{ children: React.ReactNode; language: string }> = ({
  children,
  language
}) => {
  const contextValue = {
    language,
    setLanguage: () => {},
    t: (key: string) => {
      const translations: Record<string, string> = {
        'events.join': language === 'pt' ? 'Participar no Evento' : 'Join Event',
        'events.share': language === 'pt' ? 'Partilhar Evento' : 'Share Event',
        'events.favorite': language === 'pt' ? 'Adicionar aos Favoritos' : 'Add to Favorites',
      };
      return translations[key] || key;
    }
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Example test suite
describe('Mobile UX Examples', () => {
  let testSuite: MobileUXTestSuite;

  beforeEach(() => {
    testSuite = new MobileUXTestSuite();
    
    // Mock window.matchMedia for responsive testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Portuguese Event Card Mobile Validation', () => {
    it('should pass mobile UX validation with English content', async () => {
      const component = (
        <MockLanguageProvider language="en">
          <MockEventCard 
            title="Fado Night in London"
            description="Experience authentic Portuguese fado music in the heart of London"
            language="en"
          />
        </MockLanguageProvider>
      );

      const { container } = render(component);
      const result = await validateMobileComponent(container, {
        viewports: [{ width: 375, height: 667, name: 'iPhone SE' }],
        includePortugueseText: false,
        checkAccessibility: true,
        validatePerformance: true
      });

      expect(result.score).toBeGreaterThan(80);
      expect(result.passed).toBe(true);
    });

    it('should handle Portuguese text properly on mobile', async () => {
      const component = (
        <MockLanguageProvider language="pt">
          <MockEventCard 
            title={PORTUGUESE_TEST_CONTENT.longText}
            description={PORTUGUESE_TEST_CONTENT.veryLongText}
            language="pt"
          />
        </MockLanguageProvider>
      );

      const { container } = render(component);
      
      // Test at critical mobile breakpoint
      mockViewport(375, 667);
      
      const result = await validateMobileComponent(container, {
        viewports: [{ width: 375, height: 667, name: 'iPhone SE' }],
        includePortugueseText: true,
        checkAccessibility: true,
        validatePerformance: true
      });

      // Check if Portuguese text handling is adequate
      const textElements = container.querySelectorAll('h3, p');
      let hasOverflow = false;
      
      textElements.forEach(element => {
        if (element instanceof HTMLElement) {
          if (element.scrollWidth > element.clientWidth) {
            hasOverflow = true;
          }
        }
      });

      expect(hasOverflow).toBe(false);
      expect(result.portugueseSpecificIssues.length).toBe(0);
    });

    it('should validate touch targets meet minimum requirements', async () => {
      const component = (
        <MockLanguageProvider language="pt">
          <MockEventCard 
            title="Evento Cultural"
            description="Descrição do evento cultural português"
            language="pt"
          />
        </MockLanguageProvider>
      );

      const { container } = render(component);
      mockViewport(375, 667);

      // Find all interactive elements
      const button = container.querySelector('button');
      expect(button).toBeTruthy();

      if (button) {
        const rect = button.getBoundingClientRect();
        
        // Validate minimum touch target size (44x44px)
        expect(rect.width).toBeGreaterThanOrEqual(44);
        expect(rect.height).toBeGreaterThanOrEqual(44);
        
        // Check for proper touch handling classes
        expect(button.className).toContain('min-h-');
      }
    });

    it('should preserve Portuguese heritage colors on mobile', async () => {
      const component = (
        <MockLanguageProvider language="pt">
          <MockEventCard 
            title="Evento Cultural"
            description="Descrição do evento"
            language="pt"
          />
        </MockLanguageProvider>
      );

      const { container } = render(component);
      
      // Check for Portuguese heritage colors
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      
      if (button) {
        expect(button.className).toContain('bg-red-600'); // Portuguese heritage red
      }
    });
  });

  describe('Mobile Navigation Component', () => {
    const MockMobileNavigation = () => (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
        <div className="grid grid-cols-5 h-16">
          {['Início', 'Eventos', 'Comunidade', 'Matches', 'Mensagens'].map((label, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center min-h-[48px] text-gray-600 hover:text-red-600"
            >
              <div className="h-5 w-5 mb-1 bg-gray-400 rounded" />
              <span className="text-xs font-medium line-clamp-1">
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    );

    it('should handle Portuguese navigation labels on mobile', async () => {
      const { container } = render(<MockMobileNavigation />);
      mockViewport(375, 667);

      // Check that all navigation buttons have adequate touch targets
      const buttons = container.querySelectorAll('button');
      
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        expect(rect.height).toBeGreaterThanOrEqual(44);
      });

      // Check that Portuguese labels don't overflow
      const labels = container.querySelectorAll('span');
      let hasTextOverflow = false;
      
      labels.forEach(label => {
        if (label instanceof HTMLElement && label.scrollWidth > label.clientWidth) {
          hasTextOverflow = true;
        }
      });

      expect(hasTextOverflow).toBe(false);
    });

    it('should be accessible with screen readers', async () => {
      const { container } = render(<MockMobileNavigation />);
      
      const buttons = container.querySelectorAll('button');
      
      // Each button should have accessible text
      buttons.forEach(button => {
        const text = button.textContent;
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Portuguese Form Components', () => {
    const MockPortugueseForm = () => (
      <form className="space-y-4 p-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {PORTUGUESE_TEST_CONTENT.forms.fullName}
          </label>
          <input
            type="text"
            className="w-full min-h-[48px] px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Digite seu nome completo"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {PORTUGUESE_TEST_CONTENT.forms.emailAddress}
          </label>
          <input
            type="email"
            className="w-full min-h-[48px] px-3 py-2 border border-gray-300 rounded-md"
            placeholder="seu.email@exemplo.com"
          />
        </div>

        <button
          type="submit"
          className="w-full min-h-[48px] bg-green-600 text-white rounded-md font-medium"
        >
          Enviar Formulário
        </button>
      </form>
    );

    it('should handle Portuguese form labels on mobile', async () => {
      const { container } = render(<MockPortugueseForm />);
      mockViewport(375, 667);

      const result = await validateMobileComponent(container, {
        viewports: [{ width: 375, height: 667, name: 'iPhone SE' }],
        includePortugueseText: true,
        checkAccessibility: true,
        validatePerformance: true
      });

      // Form should handle Portuguese text well
      expect(result.score).toBeGreaterThan(75);
      
      // Check input accessibility
      const inputs = container.querySelectorAll('input');
      const labels = container.querySelectorAll('label');
      
      expect(inputs.length).toBe(labels.length);
      
      inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        expect(rect.height).toBeGreaterThanOrEqual(44); // Touch-friendly inputs
      });
    });
  });

  describe('Complete Mobile UX Test Suite', () => {
    it('should run complete test suite on event card', async () => {
      const component = (
        <MockLanguageProvider language="pt">
          <MockEventCard 
            title={PORTUGUESE_TEST_CONTENT.mediumText}
            description={PORTUGUESE_TEST_CONTENT.longText}
            language="pt"
          />
        </MockLanguageProvider>
      );

      // This would run the complete test suite
      // Note: In practice, this would be more complex and might need to be adapted
      const { container } = render(component);
      
      // Run basic validation checks
      const result = await validateMobileComponent(container, {
        viewports: [
          { width: 375, height: 667, name: 'iPhone SE' },
          { width: 414, height: 896, name: 'iPhone 12' }
        ],
        includePortugueseText: true,
        checkAccessibility: true,
        validatePerformance: true
      });

      // Results should indicate successful mobile UX
      expect(result.passed).toBe(true);
      expect(result.score).toBeGreaterThan(80);
      
      console.log('Mobile UX Validation Results:', {
        score: result.score,
        passed: result.passed,
        issueCount: result.issues.length,
        recommendationCount: result.recommendations.length
      });
    });
  });
});

describe('Mobile UX Helper Functions', () => {
  describe('mockViewport', () => {
    it('should correctly mock viewport dimensions', () => {
      const originalWidth = window.innerWidth;
      const originalHeight = window.innerHeight;

      mockViewport(375, 667);
      
      expect(window.innerWidth).toBe(375);
      expect(window.innerHeight).toBe(667);

      // Restore original dimensions
      mockViewport(originalWidth, originalHeight);
    });
  });

  describe('Portuguese content detection', () => {
    it('should detect Portuguese cultural terms', () => {
      const portugueseTerms = PORTUGUESE_TEST_CONTENT.shortText;
      expect(portugueseTerms).toContain('Eventos');
      
      const longText = PORTUGUESE_TEST_CONTENT.veryLongText;
      expect(longText.length).toBeGreaterThan(100); // Verify it's actually long text
    });
  });
});

// Performance test for mobile UX validation
describe('Mobile UX Performance', () => {
  it('should complete validation within reasonable time', async () => {
    const component = (
      <MockLanguageProvider language="pt">
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <MockEventCard 
              key={i}
              title={`Evento ${i + 1}`}
              description="Descrição do evento cultural português"
              language="pt"
            />
          ))}
        </div>
      </MockLanguageProvider>
    );

    const { container } = render(component);
    const startTime = Date.now();
    
    await validateMobileComponent(container, {
      viewports: [{ width: 375, height: 667, name: 'iPhone SE' }],
      includePortugueseText: true,
      checkAccessibility: true,
      validatePerformance: true
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Validation should complete within 5 seconds even for complex components
    expect(duration).toBeLessThan(5000);
  });
});