'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CommandLineIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface KeyboardShortcut {
  id: string;
  keys: string[];
  description: {
    en: string;
    pt: string;
  };
  action: {
    en: string;
    pt: string;
  };
  category: 'navigation' | 'interaction' | 'accessibility' | 'search' | 'general';
  icon: React.ComponentType<{ className?: string }>;
  context?: string; // Where this shortcut is available
}

const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  // Navigation
  {
    id: 'tab-navigation',
    keys: ['Tab'],
    description: {
      en: 'Navigate between interactive elements',
      pt: 'Navegar entre elementos interativos'
    },
    action: {
      en: 'Move to next focusable element',
      pt: 'Mover para o próximo elemento focalizável'
    },
    category: 'navigation',
    icon: ArrowRightIcon
  },
  {
    id: 'shift-tab-navigation',
    keys: ['Shift', 'Tab'],
    description: {
      en: 'Navigate backwards between elements',
      pt: 'Navegar para trás entre elementos'
    },
    action: {
      en: 'Move to previous focusable element',
      pt: 'Mover para o elemento focalizável anterior'
    },
    category: 'navigation',
    icon: ArrowLeftIcon
  },
  {
    id: 'arrow-navigation',
    keys: ['↑', '↓', '←', '→'],
    description: {
      en: 'Navigate within lists and menus',
      pt: 'Navegar dentro de listas e menus'
    },
    action: {
      en: 'Move between options',
      pt: 'Mover entre opções'
    },
    category: 'navigation',
    icon: CommandLineIcon
  },
  
  // Interaction
  {
    id: 'enter-activate',
    keys: ['Enter'],
    description: {
      en: 'Activate buttons and links',
      pt: 'Ativar botões e links'
    },
    action: {
      en: 'Click focused element',
      pt: 'Clicar no elemento focalizado'
    },
    category: 'interaction',
    icon: CommandLineIcon
  },
  {
    id: 'space-activate',
    keys: ['Space'],
    description: {
      en: 'Activate buttons and checkboxes',
      pt: 'Ativar botões e caixas de seleção'
    },
    action: {
      en: 'Toggle or activate',
      pt: 'Alternar ou ativar'
    },
    category: 'interaction',
    icon: CommandLineIcon
  },
  
  // Accessibility
  {
    id: 'escape-close',
    keys: ['Esc'],
    description: {
      en: 'Close modals and menus',
      pt: 'Fechar modais e menus'
    },
    action: {
      en: 'Cancel or close',
      pt: 'Cancelar ou fechar'
    },
    category: 'accessibility',
    icon: XMarkIcon
  },
  
  // Search
  {
    id: 'ctrl-k-search',
    keys: ['Ctrl', 'K'],
    description: {
      en: 'Open quick search',
      pt: 'Abrir busca rápida'
    },
    action: {
      en: 'Focus search bar',
      pt: 'Focalizar barra de busca'
    },
    category: 'search',
    icon: MagnifyingGlassIcon,
    context: 'Global'
  },
  {
    id: 'slash-search',
    keys: ['/'],
    description: {
      en: 'Quick search activation',
      pt: 'Ativação de busca rápida'
    },
    action: {
      en: 'Focus search field',
      pt: 'Focalizar campo de busca'
    },
    category: 'search',
    icon: MagnifyingGlassIcon
  },
  
  // General
  {
    id: 'alt-l-lusobot',
    keys: ['Alt', 'L'],
    description: {
      en: 'Open LusoBot chat assistant',
      pt: 'Abrir assistente de chat LusoBot'
    },
    action: {
      en: 'Launch Portuguese AI assistant',
      pt: 'Lançar assistente IA português'
    },
    category: 'interaction',
    icon: ChatBubbleLeftRightIcon,
    context: 'LusoBot'
  },
  {
    id: 'alt-h-help',
    keys: ['Alt', 'H'],
    description: {
      en: 'Show keyboard shortcuts help',
      pt: 'Mostrar ajuda de atalhos de teclado'
    },
    action: {
      en: 'Open this help panel',
      pt: 'Abrir este painel de ajuda'
    },
    category: 'general',
    icon: QuestionMarkCircleIcon
  }
];

interface KeyboardNavigationHintsProps {
  className?: string;
  showOnFirstVisit?: boolean;
  compact?: boolean;
  categories?: Array<'navigation' | 'interaction' | 'accessibility' | 'search' | 'general'>;
}

export default function KeyboardNavigationHints({
  className = '',
  showOnFirstVisit = true,
  compact = false,
  categories
}: KeyboardNavigationHintsProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Check first visit and setup keyboard listener
  useEffect(() => {
    // Check if user has seen keyboard hints before
    const hasSeenKeyboardHints = localStorage.getItem('lusotown-keyboard-hints-shown');
    if (!hasSeenKeyboardHints && showOnFirstVisit) {
      setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        localStorage.setItem('lusotown-keyboard-hints-shown', 'true');
      }, 5000);
    }

    // Listen for Alt+H to show keyboard shortcuts
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setIsVisible(!isVisible);
      }
      
      // Listen for Escape to close
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, showOnFirstVisit]);

  // Filter shortcuts based on categories
  const filteredShortcuts = KEYBOARD_SHORTCUTS.filter(shortcut => {
    if (categories && categories.length > 0) {
      return categories.includes(shortcut.category);
    }
    if (selectedCategory === 'all') return true;
    return shortcut.category === selectedCategory;
  });

  const getCategoryName = (category: string) => {
    const names = {
      all: language === 'pt' ? 'Todos' : 'All',
      navigation: language === 'pt' ? 'Navegação' : 'Navigation',
      interaction: language === 'pt' ? 'Interação' : 'Interaction',
      accessibility: language === 'pt' ? 'Acessibilidade' : 'Accessibility',
      search: language === 'pt' ? 'Busca' : 'Search',
      general: language === 'pt' ? 'Geral' : 'General'
    };
    return names[category as keyof typeof names] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      navigation: 'bg-blue-100 text-blue-800',
      interaction: 'bg-green-100 text-green-800',
      accessibility: 'bg-purple-100 text-purple-800',
      search: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatKeys = (keys: string[]) => {
    return keys.join(' + ');
  };

  const KeyboardKey = ({ keyText }: { keyText: string }) => (
    <span className="inline-block px-2 py-1 text-xs font-mono bg-gray-200 text-gray-700 rounded border border-gray-300 shadow-sm">
      {keyText}
    </span>
  );

  return (
    <>
      {/* Keyboard hints panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed inset-x-4 top-20 z-[9999] max-w-4xl mx-auto ${className}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-primary-600 text-white p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <CommandLineIcon className="w-6 h-6" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {language === 'pt' ? 'Atalhos de Teclado' : 'Keyboard Shortcuts'}
                      </h2>
                      <p className="text-primary-100 text-sm">
                        {language === 'pt' 
                          ? 'Navegue mais rápido com o teclado'
                          : 'Navigate faster with keyboard shortcuts'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
                    aria-label={language === 'pt' ? 'Fechar atalhos' : 'Close shortcuts'}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Category filter */}
                {!compact && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {['all', 'navigation', 'interaction', 'accessibility', 'search', 'general'].map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? 'bg-white text-primary-600'
                            : 'bg-primary-500 hover:bg-primary-400 text-white'
                        }`}
                      >
                        {getCategoryName(category)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Shortcuts list */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {filteredShortcuts.map(shortcut => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(shortcut.category)}`}>
                          <shortcut.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {shortcut.description[language === 'pt' ? 'pt' : 'en']}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {shortcut.action[language === 'pt' ? 'pt' : 'en']}
                          </p>
                          {shortcut.context && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded mt-1">
                              {shortcut.context}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {shortcut.keys.map((key, index) => (
                          <React.Fragment key={key}>
                            {index > 0 && <span className="text-gray-400 text-sm">+</span>}
                            <KeyboardKey keyText={key} />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with tip */}
              <div className="bg-blue-50 border-t border-blue-200 p-4">
                <div className="flex items-center space-x-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    <strong>{language === 'pt' ? 'Dica:' : 'Tip:'}</strong>{' '}
                    {language === 'pt' 
                      ? 'Pressione Alt + H a qualquer momento para mostrar/ocultar estes atalhos'
                      : 'Press Alt + H anytime to show/hide these shortcuts'
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating help button */}
      {!isVisible && (
        <div className="fixed bottom-20 right-4 z-[100]">
          <button
            onClick={() => setIsVisible(true)}
            className="p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors group"
            title={language === 'pt' ? 'Atalhos de teclado (Alt + H)' : 'Keyboard shortcuts (Alt + H)'}
          >
            <CommandLineIcon className="w-5 h-5" />
            <span className="sr-only">
              {language === 'pt' ? 'Mostrar atalhos de teclado' : 'Show keyboard shortcuts'}
            </span>
          </button>
        </div>
      )}

      {/* Accessibility announcements */}
      <div className="sr-only" aria-live="polite">
        {language === 'pt' ? (
          <p>
            Atalhos de teclado disponíveis para navegação mais rápida. 
            Pressione Alt + H para mostrar a lista completa de atalhos.
          </p>
        ) : (
          <p>
            Keyboard shortcuts available for faster navigation. 
            Press Alt + H to show the complete list of shortcuts.
          </p>
        )}
      </div>
    </>
  );
}

// Hook for keyboard navigation management
export function useKeyboardNavigation() {
  const [shortcutsVisible, setShortcutsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Global keyboard shortcuts
      if (event.altKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setShortcutsVisible(!shortcutsVisible);
      }

      if (event.altKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        // Trigger LusoBot chat
        const lusoBotWidget = document.querySelector('[data-testid="lusobot-widget"]');
        if (lusoBotWidget) {
          (lusoBotWidget as HTMLElement).click();
        }
      }

      if (event.key === '/' && !isInputFocused()) {
        event.preventDefault();
        // Focus search
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="busca"], input[placeholder*="Busca"]');
        if (searchInput) {
          (searchInput as HTMLElement).focus();
        }
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        // Focus search
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="busca"], input[placeholder*="Busca"]');
        if (searchInput) {
          (searchInput as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcutsVisible]);

  const isInputFocused = () => {
    const activeElement = document.activeElement;
    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.getAttribute('contenteditable') === 'true'
    );
  };

  return {
    shortcutsVisible,
    showShortcuts: () => setShortcutsVisible(true),
    hideShortcuts: () => setShortcutsVisible(false),
    toggleShortcuts: () => setShortcutsVisible(!shortcutsVisible)
  };
}

// Compact keyboard hints for specific contexts
export function CompactKeyboardHints({ 
  shortcuts, 
  className = '' 
}: { 
  shortcuts: string[];
  className?: string;
}) {
  const { language } = useLanguage();
  const filteredShortcuts = KEYBOARD_SHORTCUTS.filter(s => shortcuts.includes(s.id));

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filteredShortcuts.map(shortcut => (
        <div
          key={shortcut.id}
          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
          title={shortcut.description[language === 'pt' ? 'pt' : 'en']}
        >
          <span className="text-gray-600">
            {shortcut.action[language === 'pt' ? 'pt' : 'en']}
          </span>
          <div className="flex items-center space-x-1">
            {shortcut.keys.map((key, index) => (
              <React.Fragment key={key}>
                {index > 0 && <span className="text-gray-400">+</span>}
                <span className="px-1 py-0.5 bg-white text-xs rounded border">
                  {key}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Demo component
export function KeyboardNavigationDemo() {
  const { language } = useLanguage();
  const { showShortcuts, hideShortcuts, toggleShortcuts } = useKeyboardNavigation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {language === 'pt' ? 'Navegação por Teclado' : 'Keyboard Navigation'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={showShortcuts}
          className="p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {language === 'pt' ? 'Mostrar Atalhos' : 'Show Shortcuts'}
        </button>
        <button
          onClick={hideShortcuts}
          className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {language === 'pt' ? 'Ocultar Atalhos' : 'Hide Shortcuts'}
        </button>
        <button
          onClick={toggleShortcuts}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {language === 'pt' ? 'Alternar Atalhos' : 'Toggle Shortcuts'}
        </button>
      </div>

      <CompactKeyboardHints 
        shortcuts={['tab-navigation', 'enter-activate', 'escape-close']}
        className="mt-4"
      />
    </div>
  );
}