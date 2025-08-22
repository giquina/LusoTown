'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Premium Accessibility Hook for Portuguese Community
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
  const { language, t } = useLanguage();
  
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

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    language: language === 'pt' ? 'pt-PT' : 'en-GB',
    voice: '',
    rate: 1,
    pitch: 1,
    volume: 1,
    enabled: false
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>('');
  
  // Refs
  const speechSynth = useRef<SpeechSynthesis | null>(null);
  const recognition = useRef<any>(null);
  const focusHistory = useRef<HTMLElement[]>([]);
  const keyboardShortcuts = useRef<KeyboardShortcuts>({});

  // Initialize accessibility features
  useEffect(() => {
    initializeAccessibility();
    loadSettings();
    setupVoiceFeatures();
    setupKeyboardNavigation();
    
    return () => {
      cleanup();
    };
  }, []);

  // Apply settings when they change
  useEffect(() => {
    applyAccessibilitySettings();
  }, [settings]);

  // Update voice language when app language changes
  useEffect(() => {
    setVoiceSettings(prev => ({
      ...prev,
      language: language === 'pt' ? 'pt-PT' : 'en-GB'
    }));
  }, [language]);

  const initializeAccessibility = useCallback(() => {
    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const prefersLargeText = window.matchMedia('(prefers-font-size: large)').matches;

    setSettings(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
      largeText: prefersLargeText || false
    }));

    // Add Portuguese cultural accessibility context
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-PT' : 'en-GB');
    document.body.classList.add('portuguese-heritage-a11y');

    // Add skip links
    addSkipLinks();

    console.log('[Accessibility] Premium accessibility initialized for Portuguese community');
  }, [language]);

  const loadSettings = useCallback(() => {
    try {
      const savedSettings = localStorage.getItem('lusotown-accessibility-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      }

      const savedVoiceSettings = localStorage.getItem('lusotown-voice-settings');
      if (savedVoiceSettings) {
        const parsed = JSON.parse(savedVoiceSettings);
        setVoiceSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('[Accessibility] Failed to load settings:', error);
    }
  }, []);

  const saveSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      localStorage.setItem('lusotown-accessibility-settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('[Accessibility] Failed to save settings:', error);
    }
  }, [settings]);

  const applyAccessibilitySettings = useCallback(() => {
    const html = document.documentElement;
    const body = document.body;

    // Apply CSS classes based on settings
    html.classList.toggle('high-contrast', settings.highContrast);
    html.classList.toggle('large-text', settings.largeText);
    html.classList.toggle('reduced-motion', settings.reducedMotion);
    html.classList.toggle('keyboard-navigation', settings.keyboardNavigation);
    html.classList.toggle('color-blind-support', settings.colorBlindSupport);
    body.classList.toggle('a11y-optimized', true);

    // Portuguese cultural enhancements
    if (settings.portugueseCulturalContext) {
      addPortugueseCulturalLabels();
      enhancePortugueseNavigation();
    }

    // Touch target enhancement for mobile
    if (settings.touchTargetEnhancement || isMobileDevice()) {
      html.classList.add('touch-enhanced');
    }

    console.log('[Accessibility] Settings applied:', settings);
  }, [settings]);

  const setupVoiceFeatures = useCallback(() => {
    // Speech Synthesis
    if ('speechSynthesis' in window) {
      speechSynth.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const portugueseVoices = voices.filter(voice => 
          voice.lang.startsWith('pt') || 
          voice.lang.startsWith('en') ||
          voice.name.toLowerCase().includes('portuguese')
        );
        setAvailableVoices(portugueseVoices);
        
        if (portugueseVoices.length > 0 && !voiceSettings.voice) {
          const preferredVoice = portugueseVoices.find(v => v.lang === voiceSettings.language) || 
                                portugueseVoices[0];
          setVoiceSettings(prev => ({ ...prev, voice: preferredVoice.name }));
        }
      };

      loadVoices();
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }

    // Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = voiceSettings.language;

      recognition.current.onresult = (event: any) => {
        const results = Array.from(event.results);
        const transcript = results
          .map((result: any) => result[0].transcript)
          .join('');

        if (transcript.trim()) {
          handleVoiceCommand(transcript.toLowerCase());
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error('[Accessibility] Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [voiceSettings.language, voiceSettings.voice]);

  const setupKeyboardNavigation = useCallback(() => {
    // Portuguese cultural keyboard shortcuts
    keyboardShortcuts.current = {
      'alt+e': () => navigateToSection('/events'),
      'alt+c': () => navigateToSection('/community'),
      'alt+n': () => navigateToSection('/my-network'),
      'alt+s': () => navigateToSection('/services'),
      'alt+h': () => navigateToSection('/'),
      'alt+p': () => navigateToSection('/profile'),
      'alt+t': () => navigateToSection('/transport'),
      'alt+l': () => navigateToSection('/live'),
      'escape': () => closeFocusTrap(),
      'f1': () => showAccessibilityHelp()
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      const shortcut = `${e.altKey ? 'alt+' : ''}${e.ctrlKey ? 'ctrl+' : ''}${e.shiftKey ? 'shift+' : ''}${e.key.toLowerCase()}`;
      
      if (keyboardShortcuts.current[shortcut]) {
        e.preventDefault();
        keyboardShortcuts.current[shortcut]();
      }

      // Focus management
      if (e.key === 'Tab' && settings.focusManagement) {
        manageFocus(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [settings.keyboardNavigation, settings.focusManagement]);

  const addSkipLinks = useCallback(() => {
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.id = 'skip-links';
    skipLinksContainer.innerHTML = `
      <a href="#main-content" class="skip-link">
        ${language === 'pt' ? 'Ir para o conteúdo principal' : 'Skip to main content'}
      </a>
      <a href="#navigation" class="skip-link">
        ${language === 'pt' ? 'Ir para a navegação' : 'Skip to navigation'}
      </a>
      <a href="#accessibility-settings" class="skip-link">
        ${language === 'pt' ? 'Definições de acessibilidade' : 'Accessibility settings'}
      </a>
    `;
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }, [language]);

  const addPortugueseCulturalLabels = useCallback(() => {
    // Add cultural context to navigation elements
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    navElements.forEach(nav => {
      if (!nav.hasAttribute('aria-label')) {
        nav.setAttribute('aria-label', 
          language === 'pt' 
            ? 'Navegação da comunidade portuguesa'
            : 'Portuguese community navigation'
        );
      }
      nav.setAttribute('data-cultural-nav', 'portuguese');
    });

    // Add cultural context to main content
    const mainContent = document.querySelector('main, [role="main"]');
    if (mainContent && !mainContent.hasAttribute('aria-label')) {
      mainContent.setAttribute('aria-label',
        language === 'pt'
          ? 'Conteúdo principal da LusoTown'
          : 'LusoTown main content'
      );
      mainContent.setAttribute('data-cultural-main', 'portuguese');
    }

    // Enhance Portuguese business directory
    const businessCards = document.querySelectorAll('[data-business-type="portuguese"]');
    businessCards.forEach(card => {
      if (!card.hasAttribute('aria-label')) {
        card.setAttribute('aria-label',
          language === 'pt'
            ? 'Negócio português verificado na comunidade'
            : 'Verified Portuguese business in community'
        );
      }
    });

    // Enhance Portuguese events
    const eventCards = document.querySelectorAll('[data-event-type="portuguese"]');
    eventCards.forEach(card => {
      if (!card.hasAttribute('aria-label')) {
        card.setAttribute('aria-label',
          language === 'pt'
            ? 'Evento cultural português'
            : 'Portuguese cultural event'
        );
      }
    });
  }, [language]);

  const enhancePortugueseNavigation = useCallback(() => {
    // Add Portuguese heritage styling to navigation
    const navItems = document.querySelectorAll('.luxury-nav-item, [role="tab"]');
    navItems.forEach(item => {
      item.classList.add('portuguese-nav-enhanced');
    });
  }, []);

  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!settings.screenReader) return;

    setCurrentAnnouncement(message);
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only portuguese-announcement';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
      setCurrentAnnouncement('');
    }, 1000);
  }, [settings.screenReader]);

  const speakText = useCallback((text: string, options: Partial<VoiceSettings> = {}) => {
    if (!speechSynth.current || !voiceSettings.enabled) return;

    speechSynth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    const selectedVoice = availableVoices.find(voice => voice.name === voiceSettings.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.lang = options.language || voiceSettings.language;
    utterance.rate = options.rate || voiceSettings.rate;
    utterance.pitch = options.pitch || voiceSettings.pitch;
    utterance.volume = options.volume || voiceSettings.volume;

    speechSynth.current.speak(utterance);
  }, [voiceSettings, availableVoices]);

  const startVoiceControl = useCallback(() => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.lang = voiceSettings.language;
      recognition.current.start();
      setIsListening(true);
      
      announceToScreenReader(
        language === 'pt' 
          ? 'Controlo de voz ativo. Diga comandos para navegar.'
          : 'Voice control active. Say commands to navigate.'
      );
    }
  }, [isListening, voiceSettings.language, language, announceToScreenReader]);

  const handleVoiceCommand = useCallback((command: string) => {
    const portugueseCommands = {
      'ir para eventos': () => navigateToSection('/events'),
      'go to events': () => navigateToSection('/events'),
      'ir para comunidade': () => navigateToSection('/community'),
      'go to community': () => navigateToSection('/community'),
      'ir para negócios': () => navigateToSection('/business-directory'),
      'go to businesses': () => navigateToSection('/business-directory'),
      'ir para início': () => navigateToSection('/'),
      'go home': () => navigateToSection('/'),
      'ler página': () => readCurrentPage(),
      'read page': () => readCurrentPage(),
      'parar leitura': () => speechSynth.current?.cancel(),
      'stop reading': () => speechSynth.current?.cancel(),
      'aumentar texto': () => saveSettings({ largeText: true }),
      'large text': () => saveSettings({ largeText: true }),
      'alto contraste': () => saveSettings({ highContrast: !settings.highContrast }),
      'high contrast': () => saveSettings({ highContrast: !settings.highContrast })
    };

    const matchedCommand = Object.keys(portugueseCommands).find(cmd => 
      command.includes(cmd.toLowerCase())
    );

    if (matchedCommand) {
      portugueseCommands[matchedCommand as keyof typeof portugueseCommands]();
      announceToScreenReader(
        language === 'pt' 
          ? 'Comando reconhecido e executado'
          : 'Command recognized and executed'
      );
    }
  }, [language, settings.highContrast, announceToScreenReader, saveSettings]);

  const navigateToSection = useCallback((path: string) => {
    window.location.href = path;
  }, []);

  const readCurrentPage = useCallback(() => {
    const mainContent = document.querySelector('main, [role="main"]');
    if (!mainContent) return;

    const textContent = extractReadableText(mainContent);
    if (textContent.trim()) {
      speakText(textContent);
    }
  }, [speakText]);

  const extractReadableText = useCallback((element: Element): string => {
    // Skip hidden elements and scripts
    if (element.getAttribute('aria-hidden') === 'true' || 
        element.classList.contains('sr-only') ||
        ['SCRIPT', 'STYLE', 'NAV'].includes(element.tagName)) {
      return '';
    }

    let text = '';
    
    // Add heading context
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
      const level = element.tagName.substring(1);
      text += `${language === 'pt' ? 'Título nível' : 'Heading level'} ${level}: `;
    }

    // Process child nodes
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nodeText = node.textContent?.trim() || '';
        if (nodeText.length > 0) {
          text += `${nodeText} `;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        text += extractReadableText(node as Element);
      }
    }

    return text;
  }, [language]);

  const manageFocus = useCallback((e: KeyboardEvent) => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="tab"]'
      )
    ) as HTMLElement[];

    const currentFocused = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentFocused);

    if (e.shiftKey) {
      // Previous element
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        focusableElements[prevIndex].focus();
      }
    } else {
      // Next element
      const nextIndex = currentIndex + 1;
      if (nextIndex < focusableElements.length) {
        focusableElements[nextIndex].focus();
      }
    }

    // Store focus history
    if (currentFocused && focusHistory.current.length < 10) {
      focusHistory.current.push(currentFocused);
    }
  }, []);

  const closeFocusTrap = useCallback(() => {
    // Close any open modals or dropdowns
    const modals = document.querySelectorAll('[role="dialog"], [aria-modal="true"]');
    modals.forEach(modal => {
      const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="fechar"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    });
  }, []);

  const showAccessibilityHelp = useCallback(() => {
    const helpText = language === 'pt' ? `
      Atalhos de Teclado da LusoTown:
      Alt+E: Eventos portugueses
      Alt+C: Comunidade
      Alt+N: Minha rede
      Alt+S: Serviços
      Alt+H: Página inicial
      Alt+P: Perfil
      F1: Esta ajuda
      Escape: Fechar menus
    ` : `
      LusoTown Keyboard Shortcuts:
      Alt+E: Portuguese Events
      Alt+C: Community
      Alt+N: My Network
      Alt+S: Services
      Alt+H: Home
      Alt+P: Profile
      F1: This help
      Escape: Close menus
    `;
    
    announceToScreenReader(helpText, 'assertive');
  }, [language, announceToScreenReader]);

  const isMobileDevice = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const cleanup = useCallback(() => {
    if (speechSynth.current) {
      speechSynth.current.cancel();
    }
    if (recognition.current && isListening) {
      recognition.current.stop();
    }
  }, [isListening]);

  // Public API
  return {
    // Settings
    settings,
    voiceSettings,
    updateSettings: saveSettings,
    updateVoiceSettings: setVoiceSettings,
    
    // Voice features
    availableVoices,
    isListening,
    speakText,
    startVoiceControl,
    announceToScreenReader,
    
    // Navigation
    navigateToSection,
    manageFocus,
    showAccessibilityHelp,
    
    // Status
    currentAnnouncement,
    
    // Utilities
    isMobile: isMobileDevice(),
    isHighContrast: settings.highContrast,
    isLargeText: settings.largeText,
    isReducedMotion: settings.reducedMotion,
    isKeyboardNavigation: settings.keyboardNavigation,
    
    // Cleanup
    cleanup
  };
}