'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Eye, 
  EyeOff,
  Volume2, 
  VolumeX,
  Type,
  Contrast,
  MousePointer,
  Keyboard,
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  Settings,
  ChevronDown,
  ChevronUp,
  Globe
} from 'lucide-react';

interface AccessibilityFeaturesProps {
  className?: string;
}

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  voiceControl: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
  colorBlindSupport: boolean;
  audioDescriptions: boolean;
  portugueseScreenReader: boolean;
  culturalAudioGuides: boolean;
}

interface PortugueseVoiceSettings {
  language: 'pt-PT' | 'pt-BR';
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
}

// Lusophone accessibility texts for screen readers
const PORTUGUESE_ACCESSIBILITY_TEXTS = {
  'pt-PT': {
    welcome: 'Bem-vindo à LusoTown, a comunidade de falantes de português em Londres',
    navigation: 'Navegação principal da comunidade de falantes de português',
    events: 'Eventos culturais portugueses próximos',
    businesses: 'Diretório de negócios portugueses',
    community: 'Membros da comunidade lusófona',
    cultural: 'Conteúdo cultural e património português'
  },
  'pt-BR': {
    welcome: 'Bem-vindo à LusoTown, a comunidade de falantes de português em Londres',
    navigation: 'Navegação principal da comunidade de falantes de português',
    events: 'Eventos culturais portugueses próximos',
    businesses: 'Diretório de negócios portugueses',
    community: 'Membros da comunidade lusófona',
    cultural: 'Conteúdo cultural e património português'
  }
};

export default function AccessibilityFeatures({ className = '' }: AccessibilityFeaturesProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Accessibility states
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    screenReader: false,
    voiceControl: false,
    keyboardNavigation: false,
    reducedMotion: false,
    colorBlindSupport: false,
    audioDescriptions: false,
    portugueseScreenReader: false,
    culturalAudioGuides: false
  });

  // Voice settings
  const [voiceSettings, setVoiceSettings] = useState<PortugueseVoiceSettings>({
    language: 'pt-PT',
    voice: '',
    rate: 1,
    pitch: 1,
    volume: 1
  });

  // UI states
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [currentReading, setCurrentReading] = useState<string>('');

  // Speech synthesis
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Voice recognition
  const [recognition, setRecognition] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);

  // Refs
  const focusIndicatorRef = useRef<HTMLDivElement>(null);
  const keyboardNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeAccessibility();
    loadAccessibilitySettings();
    setupKeyboardNavigation();
    setupVoiceFeatures();
    
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    applyAccessibilitySettings();
  }, [settings]);

  const initializeAccessibility = () => {
    // Check for user preferences from system
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, highContrast: true }));
    }

    // Check for color scheme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark-theme');
    }

    // Add ARIA labels to key elements
    addAriaLabels();
    
    // Setup focus management
    setupFocusManagement();
    
    console.log('[Accessibility] Initialized for Portuguese-speaking community platform');
  };

  const loadAccessibilitySettings = () => {
    try {
      const savedSettings = localStorage.getItem('lusotown-accessibility-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...settings, ...parsed });
      }

      const savedVoiceSettings = localStorage.getItem('lusotown-voice-settings');
      if (savedVoiceSettings) {
        const parsed = JSON.parse(savedVoiceSettings);
        setVoiceSettings({ ...voiceSettings, ...parsed });
      }
    } catch (error) {
      console.error('[Accessibility] Failed to load settings:', error);
    }
  };

  const saveAccessibilitySettings = (newSettings: AccessibilitySettings) => {
    try {
      localStorage.setItem('lusotown-accessibility-settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('[Accessibility] Failed to save settings:', error);
    }
  };

  const applyAccessibilitySettings = () => {
    const html = document.documentElement;
    const body = document.body;

    // High contrast mode
    html.classList.toggle('high-contrast', settings.highContrast);
    
    // Large text mode
    html.classList.toggle('large-text', settings.largeText);
    
    // Reduced motion
    html.classList.toggle('reduced-motion', settings.reducedMotion);
    
    // Color blind support
    html.classList.toggle('color-blind-support', settings.colorBlindSupport);

    // Keyboard navigation enhancements
    html.classList.toggle('keyboard-navigation', settings.keyboardNavigation);

    // Lusophone cultural accessibility enhancements
    if (settings.portugueseScreenReader) {
      html.setAttribute('lang', language === 'pt' ? 'pt-PT' : 'en-GB');
      addPortugueseCulturalContext();
    }
  };

  const addAriaLabels = () => {
    // Add Lusophone cultural context to ARIA labels
    const events = document.querySelectorAll('[data-event-type="portuguese"]');
    events.forEach(event => {
      if (!event.getAttribute('aria-label')) {
        event.setAttribute('aria-label', 
          language === 'pt' 
            ? 'Evento cultural português'
            : 'Lusophone cultural event'
        );
      }
    });

    // Business directory entries
    const businesses = document.querySelectorAll('[data-business-type="portuguese"]');
    businesses.forEach(business => {
      if (!business.getAttribute('aria-label')) {
        business.setAttribute('aria-label',
          language === 'pt'
            ? 'Negócio português verificado'
            : 'Verified Portuguese business'
        );
      }
    });

    // Community member profiles
    const members = document.querySelectorAll('[data-member-region]');
    members.forEach(member => {
      const region = member.getAttribute('data-member-region');
      if (!member.getAttribute('aria-label') && region) {
        const regionNames = {
          'portugal': language === 'pt' ? 'Membro de Portugal' : 'Member from Portugal',
          'brazil': language === 'pt' ? 'Membro do Brasil' : 'Member from Brazil',
          'angola': language === 'pt' ? 'Membro de Angola' : 'Member from Angola',
          'mozambique': language === 'pt' ? 'Membro de Moçambique' : 'Member from Mozambique',
          'cape-verde': language === 'pt' ? 'Membro de Cabo Verde' : 'Member from Cape Verde'
        };
        member.setAttribute('aria-label', regionNames[region as keyof typeof regionNames] || '');
      }
    });
  };

  const addPortugueseCulturalContext = () => {
    // Add Lusophone cultural landmarks to navigation
    const landmarks = document.querySelectorAll('nav, main, aside, footer');
    landmarks.forEach((landmark, index) => {
      if (!landmark.getAttribute('aria-label')) {
        const labels = {
          nav: PORTUGUESE_ACCESSIBILITY_TEXTS[voiceSettings.language].navigation,
          main: language === 'pt' ? 'Conteúdo principal da comunidade' : 'Main community content',
          aside: language === 'pt' ? 'Informações adicionais' : 'Additional information',
          footer: language === 'pt' ? 'Rodapé da página' : 'Page footer'
        };
        landmark.setAttribute('aria-label', labels[landmark.tagName.toLowerCase() as keyof typeof labels] || '');
      }
    });
  };

  const setupKeyboardNavigation = () => {
    let currentFocusIndex = 0;
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      // Lusophone cultural keyboard shortcuts
      if (e.altKey) {
        switch (e.key) {
          case 'e':
            e.preventDefault();
            navigateToSection('events');
            announceNavigation(language === 'pt' ? 'Navegando para eventos' : 'Navigating to events');
            break;
          case 'n':
            e.preventDefault();
            navigateToSection('businesses');
            announceNavigation(language === 'pt' ? 'Navegando para negócios' : 'Navigating to businesses');
            break;
          case 'c':
            e.preventDefault();
            navigateToSection('community');
            announceNavigation(language === 'pt' ? 'Navegando para comunidade' : 'Navigating to community');
            break;
          case 'h':
            e.preventDefault();
            navigateToSection('home');
            announceNavigation(language === 'pt' ? 'Navegando para início' : 'Navigating to home');
            break;
        }
      }

      // Enhanced tab navigation
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements)) as HTMLElement[];
        
        if (e.shiftKey) {
          currentFocusIndex = Math.max(0, currentFocusIndex - 1);
        } else {
          currentFocusIndex = Math.min(focusable.length - 1, currentFocusIndex + 1);
        }

        if (focusable[currentFocusIndex]) {
          focusable[currentFocusIndex].focus();
          showFocusIndicator(focusable[currentFocusIndex]);
        }
      }

      // Escape key to close modals/menus
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="fechar"]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  };

  const setupVoiceFeatures = () => {
    // Setup Speech Synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynth(window.speechSynthesis);
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const portugueseVoices = voices.filter(voice => 
          voice.lang.startsWith('pt') || voice.name.includes('Lusophone')
        );
        setAvailableVoices(portugueseVoices);
        
        // Set default Lusophone voice
        if (portugueseVoices.length > 0 && !voiceSettings.voice) {
          const defaultVoice = portugueseVoices.find(v => v.lang === 'pt-PT') || portugueseVoices[0];
          setVoiceSettings(prev => ({ ...prev, voice: defaultVoice.name }));
        }
      };

      loadVoices();
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }

    // Setup Speech Recognition for Lusophone
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = voiceSettings.language;

      recognition.onresult = (event: any) => {
        const results = Array.from(event.results);
        const transcript = results
          .map((result: any) => result[0].transcript)
          .join('');

        if (transcript.trim()) {
          handleVoiceCommand(transcript.toLowerCase());
        }
      };

      recognition.onerror = (event: any) => {
        console.error('[Accessibility] Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  };

  const setupFocusManagement = () => {
    // Enhanced focus indicators for Lusophone cultural elements
    const handleFocus = (e: FocusEvent) => {
      if (settings.keyboardNavigation) {
        showFocusIndicator(e.target as HTMLElement);
      }
    };

    const handleBlur = (e: FocusEvent) => {
      hideFocusIndicator();
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
  };

  const showFocusIndicator = (element: HTMLElement) => {
    if (!focusIndicatorRef.current) return;

    const rect = element.getBoundingClientRect();
    const indicator = focusIndicatorRef.current;

    indicator.style.display = 'block';
    indicator.style.left = `${rect.left + window.scrollX - 4}px`;
    indicator.style.top = `${rect.top + window.scrollY - 4}px`;
    indicator.style.width = `${rect.width + 8}px`;
    indicator.style.height = `${rect.height + 8}px`;

    // Announce element type and content
    if (settings.portugueseScreenReader) {
      const announcement = getElementAnnouncement(element);
      if (announcement) {
        announceToScreenReader(announcement);
      }
    }
  };

  const hideFocusIndicator = () => {
    if (focusIndicatorRef.current) {
      focusIndicatorRef.current.style.display = 'none';
    }
  };

  const getElementAnnouncement = (element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();
    const text = element.textContent?.trim() || '';
    const label = element.getAttribute('aria-label') || element.getAttribute('alt') || '';

    let announcement = '';

    switch (tagName) {
      case 'button':
        announcement = `${language === 'pt' ? 'Botão' : 'Button'}: ${label || text}`;
        break;
      case 'a':
        announcement = `${language === 'pt' ? 'Ligação' : 'Link'}: ${label || text}`;
        break;
      case 'input':
        const type = element.getAttribute('type') || 'text';
        announcement = `${language === 'pt' ? 'Campo de' : 'Input field'} ${type}: ${label || element.getAttribute('placeholder') || ''}`;
        break;
      case 'img':
        announcement = `${language === 'pt' ? 'Imagem' : 'Image'}: ${label}`;
        break;
      default:
        if (label) {
          announcement = label;
        } else if (text.length > 0 && text.length < 100) {
          announcement = text;
        }
    }

    return announcement;
  };

  const navigateToSection = (section: string) => {
    const sectionMap = {
      'home': '/',
      'events': '/events',
      'businesses': '/business-directory',
      'community': '/my-network',
      'matches': '/matches',
      'live': '/live'
    };

    const url = sectionMap[section as keyof typeof sectionMap];
    if (url) {
      window.location.href = url;
    }
  };

  const announceNavigation = (text: string) => {
    if (settings.portugueseScreenReader) {
      announceToScreenReader(text);
    }
  };

  const announceToScreenReader = (text: string) => {
    if (!speechSynth || !settings.screenReader) return;

    // Stop current speech
    speechSynth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure Lusophone voice
    const selectedVoice = availableVoices.find(voice => voice.name === voiceSettings.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.lang = voiceSettings.language;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;

    speechSynth.speak(utterance);
  };

  const readPageContent = () => {
    if (!speechSynth) return;

    if (isReading) {
      speechSynth.cancel();
      setIsReading(false);
      setCurrentReading('');
      return;
    }

    // Extract main content for reading
    const mainContent = document.querySelector('main') || document.body;
    const textContent = extractReadableText(mainContent);

    if (textContent.trim()) {
      setIsReading(true);
      setCurrentReading(textContent);
      
      const utterance = new SpeechSynthesisUtterance(textContent);
      
      const selectedVoice = availableVoices.find(voice => voice.name === voiceSettings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.lang = voiceSettings.language;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      utterance.onend = () => {
        setIsReading(false);
        setCurrentReading('');
      };

      utterance.onerror = () => {
        setIsReading(false);
        setCurrentReading('');
      };

      setCurrentUtterance(utterance);
      speechSynth.speak(utterance);
    }
  };

  const extractReadableText = (element: Element): string => {
    // Skip hidden elements and navigation
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
          text += `${nodeText  } `;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        text += extractReadableText(node as Element);
      }
    }

    return text;
  };

  const startVoiceControl = () => {
    if (!recognition) {
      addNotification({
        id: 'voice-not-supported',
        type: 'error',
        title: language === 'pt' ? 'Controlo de Voz Não Suportado' : 'Voice Control Not Supported',
        message: language === 'pt' 
          ? 'O teu navegador não suporta controlo de voz' 
          : 'Your browser does not support voice control',
        duration: 5000
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = voiceSettings.language;
      recognition.start();
      setIsListening(true);
      
      addNotification({
        id: 'voice-listening',
        type: 'info',
        title: language === 'pt' ? 'Controlo de Voz Ativo' : 'Voice Control Active',
        message: language === 'pt' 
          ? 'Diz comandos para navegar na comunidade de falantes de português' 
          : 'Say commands to navigate the Portuguese-speaking community',
        duration: 3000
      });
    }
  };

  const handleVoiceCommand = (command: string) => {
    const portugueseCommands = {
      'ir para eventos': () => navigateToSection('events'),
      'go to events': () => navigateToSection('events'),
      'ir para negócios': () => navigateToSection('businesses'),
      'go to businesses': () => navigateToSection('businesses'),
      'ir para comunidade': () => navigateToSection('community'),
      'go to community': () => navigateToSection('community'),
      'ir para início': () => navigateToSection('home'),
      'go to home': () => navigateToSection('home'),
      'ler página': () => readPageContent(),
      'read page': () => readPageContent(),
      'parar leitura': () => speechSynth?.cancel(),
      'stop reading': () => speechSynth?.cancel()
    };

    const matchedCommand = Object.keys(portugueseCommands).find(cmd => 
      command.includes(cmd.toLowerCase())
    );

    if (matchedCommand) {
      portugueseCommands[matchedCommand as keyof typeof portugueseCommands]();
      announceToScreenReader(
        language === 'pt' 
          ? 'Comando reconhecido' 
          : 'Command recognized'
      );
    }
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    saveAccessibilitySettings(newSettings);

    // Provide feedback
    addNotification({
      id: `accessibility-${key}`,
      type: 'success',
      title: language === 'pt' ? 'Definição Atualizada' : 'Setting Updated',
      message: `${key} ${value ? (language === 'pt' ? 'ativado' : 'enabled') : (language === 'pt' ? 'desativado' : 'disabled')}`,
      duration: 3000
    });
  };

  const cleanup = () => {
    if (speechSynth) {
      speechSynth.cancel();
    }
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  return (
    <div className={`accessibility-features ${className}`}>
      {/* Premium focus indicator for keyboard navigation */}
      <div
        ref={focusIndicatorRef}
        className="fixed pointer-events-none z-50 border-2 border-primary-500 rounded-lg shadow-lg transition-all duration-200"
        style={{ 
          display: 'none',
          background: 'linear-gradient(45deg, rgba(197, 40, 47, 0.1), rgba(0, 168, 89, 0.1))',
          boxShadow: '0 0 0 4px rgba(197, 40, 47, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15)'
        }}
        aria-hidden="true"
      />

      {/* High contrast overlay */}
      {settings.highContrast && (
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            mixBlendMode: 'difference',
            background: 'radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.1) 100%)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Lusophone cultural accessibility landmark */}
      <div className="sr-only" aria-live="polite">
        {language === 'pt' 
          ? 'Sistema de acessibilidade ativo para a comunidade de falantes de português'
          : 'Accessibility system active for Portuguese-speaking community'
        }
      </div>

      {/* Accessibility controls */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label={language === 'pt' ? 'Abrir definições de acessibilidade' : 'Open accessibility settings'}
        >
          <Settings className="h-5 w-5" />
        </button>

        {showSettings && (
          <div className="absolute top-14 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'pt' ? 'Acessibilidade' : 'Accessibility'}
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={language === 'pt' ? 'Fechar definições' : 'Close settings'}
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Contrast className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Alto Contraste' : 'High Contrast'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Melhor visibilidade' : 'Better visibility'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`${language === 'pt' ? 'Alto contraste' : 'High contrast'} ${settings.highContrast ? (language === 'pt' ? 'ativado' : 'enabled') : (language === 'pt' ? 'desativado' : 'disabled')}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.highContrast ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Type className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Texto Grande' : 'Large Text'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Facilita leitura' : 'Easier reading'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('largeText', !settings.largeText)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.largeText ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.largeText ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Lusophone Screen Reader */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Leitor de Ecrã PT' : 'Lusophone Screen Reader'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Leitura em português' : 'Lusophone audio reading'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('portugueseScreenReader', !settings.portugueseScreenReader)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.portugueseScreenReader ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.portugueseScreenReader ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Voice Control */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isListening ? <Mic className="h-5 w-5 text-green-600" /> : <MicOff className="h-5 w-5 text-gray-600" />}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Controlo de Voz' : 'Voice Control'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Comandos em português' : 'Lusophone voice commands'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={startVoiceControl}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isListening 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {isListening 
                    ? (language === 'pt' ? 'A Escutar' : 'Listening')
                    : (language === 'pt' ? 'Ativar' : 'Enable')
                  }
                </button>
              </div>

              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Keyboard className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Navegação por Teclado' : 'Keyboard Navigation'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Alt+E: Eventos, Alt+N: Negócios' : 'Alt+E: Events, Alt+N: Businesses'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.keyboardNavigation ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Cultural Audio Guides */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Guias Culturais Áudio' : 'Cultural Audio Guides'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'Explicações culturais' : 'Cultural explanations'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('culturalAudioGuides', !settings.culturalAudioGuides)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.culturalAudioGuides ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.culturalAudioGuides ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Audio Controls */}
            {speechSynth && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {language === 'pt' ? 'Controlo de Áudio' : 'Audio Control'}
                </h4>
                
                <div className="flex space-x-2 mb-3">
                  <button
                    onClick={readPageContent}
                    disabled={!settings.portugueseScreenReader}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isReading
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isReading ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>
                      {isReading 
                        ? (language === 'pt' ? 'Parar' : 'Stop')
                        : (language === 'pt' ? 'Ler Página' : 'Read Page')
                      }
                    </span>
                  </button>
                </div>

                {/* Voice Settings */}
                {availableVoices.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">
                      {language === 'pt' ? 'Voz Portuguesa' : 'Lusophone Voice'}
                    </label>
                    <select
                      value={voiceSettings.voice}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      {availableVoices.map(voice => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {currentReading && (
          <span>{language === 'pt' ? 'A ler conteúdo da página' : 'Reading page content'}</span>
        )}
      </div>
    </div>
  );
}