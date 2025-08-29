
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SafeDOM } from '@/lib/security/safe-dom';

// Premium Accessibility Hook for Portuguese-speaking community
interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
  voiceControl: boolean;
  colorBlindSupport: boolean;
  portugueseCulturalContext: boolean;
  touchTargetEnhancement: boolean;
  focusManagement: boolean;
}

interface VoiceSettings {
  language: 'pt-PT' | 'pt-BR' | 'en-GB';
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
  enabled: boolean;
}

interface KeyboardShortcuts {
  [key: string]: () => void;
}

export function useAccessibility() {
  const { language } = useLanguage();
  
  // State management
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    keyboardNavigation: false,
    screenReader: false,
    voiceControl: false,
    colorBlindSupport: false,
    portugueseCulturalContext: true,
    touchTargetEnhancement: false,
    focusManagement: false
  });

  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>('');
  
  const addSkipLinks = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // SECURITY FIX: Use SafeDOM to safely create skip links
    const skipLinksData = [
      {
        href: '#main-content',
        text: language === 'pt' ? 'Ir para o conteúdo principal' : 'Skip to main content'
      },
      {
        href: '#navigation', 
        text: language === 'pt' ? 'Ir para a navegação' : 'Skip to navigation'
      },
      {
        href: '#accessibility-settings',
        text: language === 'pt' ? 'Definições de acessibilidade' : 'Accessibility settings'
      }
    ];
    
    const skipLinksContainer = SafeDOM.createSkipLinks(skipLinksData);
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }, [language]);

  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!settings.screenReader || typeof window === 'undefined') return;

    setCurrentAnnouncement(message);
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only portuguese-announcement';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
      setCurrentAnnouncement('');
    }, 1000);
  }, [settings.screenReader]);

  // Public API
  return {
    settings,
    currentAnnouncement,
    announceToScreenReader,
    isHighContrast: settings.highContrast,
    isLargeText: settings.largeText,
    isReducedMotion: settings.reducedMotion,
    isKeyboardNavigation: settings.keyboardNavigation,
  };
}
