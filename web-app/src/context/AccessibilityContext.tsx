'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useLanguage } from '@/context/LanguageContext';

interface AccessibilityContextType {
  // Settings
  isHighContrast: boolean;
  isLargeText: boolean;
  isReducedMotion: boolean;
  isKeyboardNavigation: boolean;
  isScreenReaderActive: boolean;
  isVoiceControlActive: boolean;
  isMobile: boolean;
  
  // Actions
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleKeyboardNavigation: () => void;
  toggleScreenReader: () => void;
  toggleVoiceControl: () => void;
  
  // Utilities
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  speakText: (text: string) => void;
  navigateToSection: (path: string) => void;
  showAccessibilityHelp: () => void;
  
  // Focus management
  manageFocus: (direction: 'next' | 'previous') => void;
  trapFocus: (element: HTMLElement) => void;
  releaseFocus: () => void;
  
  // Status
  currentAnnouncement: string;
  availableVoices: SpeechSynthesisVoice[];
  isListening: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const { language, t } = useLanguage();
  const accessibility = useAccessibility();
  const [focusTrapped, setFocusTrapped] = useState<HTMLElement | null>(null);

  // Enhanced actions
  const toggleHighContrast = () => {
    accessibility.updateSettings({ highContrast: !accessibility.settings.highContrast });
    accessibility.announceToScreenReader(
      language === 'pt' 
        ? `Alto contraste ${!accessibility.settings.highContrast ? 'ativado' : 'desativado'}`
        : `High contrast ${!accessibility.settings.highContrast ? 'enabled' : 'disabled'}`
    );
  };

  const toggleLargeText = () => {
    accessibility.updateSettings({ largeText: !accessibility.settings.largeText });
    accessibility.announceToScreenReader(
      language === 'pt'
        ? `Texto grande ${!accessibility.settings.largeText ? 'ativado' : 'desativado'}`
        : `Large text ${!accessibility.settings.largeText ? 'enabled' : 'disabled'}`
    );
  };

  const toggleReducedMotion = () => {
    accessibility.updateSettings({ reducedMotion: !accessibility.settings.reducedMotion });
    accessibility.announceToScreenReader(
      language === 'pt'
        ? `Movimento reduzido ${!accessibility.settings.reducedMotion ? 'ativado' : 'desativado'}`
        : `Reduced motion ${!accessibility.settings.reducedMotion ? 'enabled' : 'disabled'}`
    );
  };

  const toggleKeyboardNavigation = () => {
    accessibility.updateSettings({ keyboardNavigation: !accessibility.settings.keyboardNavigation });
    accessibility.announceToScreenReader(
      language === 'pt'
        ? `Navegação por teclado ${!accessibility.settings.keyboardNavigation ? 'ativada' : 'desativada'}`
        : `Keyboard navigation ${!accessibility.settings.keyboardNavigation ? 'enabled' : 'disabled'}`
    );
  };

  const toggleScreenReader = () => {
    accessibility.updateSettings({ screenReader: !accessibility.settings.screenReader });
    accessibility.announceToScreenReader(
      language === 'pt'
        ? `Leitor de ecrã ${!accessibility.settings.screenReader ? 'ativado' : 'desativado'}`
        : `Screen reader ${!accessibility.settings.screenReader ? 'enabled' : 'disabled'}`
    );
  };

  const toggleVoiceControl = () => {
    accessibility.startVoiceControl();
  };

  const manageFocus = (direction: 'next' | 'previous') => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="button"]:not([aria-disabled="true"]), [role="tab"]:not([aria-disabled="true"])'
      )
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % focusableElements.length;
      focusableElements[nextIndex]?.focus();
    } else {
      const prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
      focusableElements[prevIndex]?.focus();
    }
  };

  const trapFocus = (element: HTMLElement) => {
    setFocusTrapped(element);
    element.classList.add('focus-trap-active');
    
    const focusableElements = Array.from(
      element.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
        
        if (e.shiftKey) {
          const prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          focusableElements[prevIndex]?.focus();
        } else {
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex]?.focus();
        }
      }
      
      if (e.key === 'Escape') {
        releaseFocus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    element.setAttribute('data-focus-trap-handler', 'true');
  };

  const releaseFocus = () => {
    if (focusTrapped) {
      focusTrapped.classList.remove('focus-trap-active');
      const handler = focusTrapped.querySelector('[data-focus-trap-handler]');
      if (handler) {
        handler.removeAttribute('data-focus-trap-handler');
      }
      setFocusTrapped(null);
    }
  };

  // Enhanced Portuguese cultural announcements
  const announceWithCulturalContext = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const culturalPrefix = language === 'pt' ? 'LusoTown: ' : 'LusoTown: ';
    accessibility.announceToScreenReader(culturalPrefix + message, priority);
  };

  // Portuguese voice-optimized text speaking
  const speakPortugueseText = (text: string) => {
    if (language === 'pt') {
      // Add Portuguese pronunciation hints
      const enhancedText = text
        .replace(/LusoTown/g, 'Luso Town')
        .replace(/UK/g, 'Reino Unido')
        .replace(/London/g, 'Londres');
      
      accessibility.speakText(enhancedText, { language: 'pt-PT' });
    } else {
      accessibility.speakText(text);
    }
  };

  const contextValue: AccessibilityContextType = {
    // Settings
    isHighContrast: accessibility.settings.highContrast,
    isLargeText: accessibility.settings.largeText,
    isReducedMotion: accessibility.settings.reducedMotion,
    isKeyboardNavigation: accessibility.settings.keyboardNavigation,
    isScreenReaderActive: accessibility.settings.screenReader,
    isVoiceControlActive: accessibility.isListening,
    isMobile: accessibility.isMobile,
    
    // Actions
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleKeyboardNavigation,
    toggleScreenReader,
    toggleVoiceControl,
    
    // Utilities
    announceToScreenReader: announceWithCulturalContext,
    speakText: speakPortugueseText,
    navigateToSection: accessibility.navigateToSection,
    showAccessibilityHelp: accessibility.showAccessibilityHelp,
    
    // Focus management
    manageFocus,
    trapFocus,
    releaseFocus,
    
    // Status
    currentAnnouncement: accessibility.currentAnnouncement,
    availableVoices: accessibility.availableVoices,
    isListening: accessibility.isListening
  };

  // Initialize Portuguese cultural accessibility on mount
  useEffect(() => {
    // Add Portuguese heritage class to body
    document.body.classList.add('portuguese-heritage-a11y');
    
    // Set initial language for screen readers
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-PT' : 'en-GB');
    
    // Announce Portuguese-speaking community accessibility ready
    setTimeout(() => {
      announceWithCulturalContext(
        language === 'pt' 
          ? 'Sistema de acessibilidade português ativo'
          : 'Portuguese accessibility system active'
      );
    }, 1000);

    return () => {
      document.body.classList.remove('portuguese-heritage-a11y');
      accessibility.cleanup();
    };
  }, [language]);

  // Handle system preference changes
  useEffect(() => {
    const handlePrefersColorScheme = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    };

    const handlePrefersReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches && !accessibility.settings.reducedMotion) {
        accessibility.updateSettings({ reducedMotion: true });
        announceWithCulturalContext(
          language === 'pt'
            ? 'Movimento reduzido ativado automaticamente'
            : 'Reduced motion enabled automatically'
        );
      }
    };

    const handlePrefersContrast = (e: MediaQueryListEvent) => {
      if (e.matches && !accessibility.settings.highContrast) {
        accessibility.updateSettings({ highContrast: true });
        announceWithCulturalContext(
          language === 'pt'
            ? 'Alto contraste ativado automaticamente'
            : 'High contrast enabled automatically'
        );
      }
    };

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    darkModeQuery.addEventListener('change', handlePrefersColorScheme);
    reducedMotionQuery.addEventListener('change', handlePrefersReducedMotion);
    highContrastQuery.addEventListener('change', handlePrefersContrast);

    // Check initial values
    handlePrefersColorScheme({ matches: darkModeQuery.matches } as MediaQueryListEvent);
    handlePrefersReducedMotion({ matches: reducedMotionQuery.matches } as MediaQueryListEvent);
    handlePrefersContrast({ matches: highContrastQuery.matches } as MediaQueryListEvent);

    return () => {
      darkModeQuery.removeEventListener('change', handlePrefersColorScheme);
      reducedMotionQuery.removeEventListener('change', handlePrefersReducedMotion);
      highContrastQuery.removeEventListener('change', handlePrefersContrast);
    };
  }, [accessibility.settings, language]);

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Portuguese cultural accessibility status */}
      {accessibility.currentAnnouncement && (
        <div 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
          role="status"
        >
          {accessibility.currentAnnouncement}
        </div>
      )}
      
      {/* Focus trap overlay */}
      {focusTrapped && (
        <div 
          className="focus-trap-active"
          aria-hidden="true"
          onClick={releaseFocus}
        />
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
}

export default AccessibilityProvider;