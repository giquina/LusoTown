'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import {
  XMarkIcon,
  KeyboardIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline'
import keyboardNavEN from '@/i18n/keyboard-navigation-en.json'
import keyboardNavPT from '@/i18n/keyboard-navigation-pt.json'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const { language } = useLanguage()
  const translations = language === 'pt' ? keyboardNavPT : keyboardNavEN

  const [focusedShortcut, setFocusedShortcut] = useState<string | null>(null)

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Focus the modal when opened
      const modal = document.getElementById('keyboard-shortcuts-modal')
      if (modal) {
        modal.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const closeButtonProps = useEnhancedKeyboardNavigation({
    onClick: onClose,
    culturalContext: 'general',
    ariaLabel: translations.keyboard.shortcuts.hide_shortcuts,
    announceActions: true
  })

  const shortcuts = [
    {
      category: 'Portuguese Cultural Navigation',
      items: [
        {
          keys: ['Alt', 'S'],
          description: translations.keyboard.shortcuts.skip_to_content,
          cultural: true
        },
        {
          keys: ['Alt', 'C'],
          description: translations.keyboard.shortcuts.go_to_community,
          cultural: true
        },
        {
          keys: ['Alt', 'H'],
          description: translations.keyboard.shortcuts.go_to_home,
          cultural: true
        }
      ]
    },
    {
      category: 'General Navigation',
      items: [
        {
          keys: ['Tab'],
          description: translations.keyboard.instructions.tab_navigation
        },
        {
          keys: ['Enter', 'Space'],
          description: translations.keyboard.instructions.enter_activate
        },
        {
          keys: ['Arrow Keys'],
          description: translations.keyboard.instructions.arrow_navigate
        },
        {
          keys: ['Escape'],
          description: translations.keyboard.instructions.escape_close
        }
      ]
    },
    {
      category: 'Post Interactions',
      items: [
        {
          keys: ['Enter'],
          description: `${translations.post.like} / ${translations.post.comment}`
        },
        {
          keys: ['Space'],
          description: translations.post.share
        }
      ]
    },
    {
      category: 'Profile Actions',
      items: [
        {
          keys: ['Enter'],
          description: `${translations.profile.like} / ${translations.profile.follow}`
        },
        {
          keys: ['Arrow Left/Right'],
          description: `${translations.profile.previous_photo} / ${translations.profile.next_photo}`
        }
      ]
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          id="keyboard-shortcuts-modal"
          className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-shortcuts-title"
          tabIndex={-1}
        >
          {/* Header */}
          <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <KeyboardIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="keyboard-shortcuts-title" className="text-xl font-bold text-gray-900">
                    {language === 'pt' ? 'Atalhos de Teclado da Comunidade Portuguesa' : 'Portuguese Community Keyboard Shortcuts'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' 
                      ? 'Navegação otimizada para a comunidade lusófona no Reino Unido' 
                      : 'Optimized navigation for Portuguese-speaking community in the UK'
                    }
                  </p>
                </div>
              </div>
              
              <button
                {...closeButtonProps}
                className="p-2 text-gray-400 hover:text-gray-600 focus:text-gray-600 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px] min-w-[44px]"
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </header>
          
          {/* Content */}
          <main className="px-6 py-6">
            {/* Cultural Context Info */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-6 border border-primary-200">
              <div className="flex items-start gap-3">
                <CommandLineIcon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {language === 'pt' ? 'Atalhos Culturais Portugueses' : 'Portuguese Cultural Shortcuts'}
                  </h3>
                  <p className="text-sm text-primary-800">
                    {language === 'pt' 
                      ? 'Estes atalhos foram desenvolvidos especificamente para a comunidade portuguesa no Reino Unido, utilizando mnemónicos em português para facilitar a navegação.'
                      : 'These shortcuts were designed specifically for the Portuguese community in the UK, using Portuguese mnemonics to enhance navigation ease.'
                    }
                  </p>
                  <ul className="mt-2 text-sm text-primary-700">
                    <li>• <strong>Alt+S</strong> = <em>Saltar</em> ({language === 'pt' ? 'pular conteúdo' : 'skip content'})</li>
                    <li>• <strong>Alt+C</strong> = <em>Comunidade</em> ({language === 'pt' ? 'página da comunidade' : 'community page'})</li>
                    <li>• <strong>Alt+H</strong> = <em>Home</em> ({language === 'pt' ? 'página inicial' : 'home page'})</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Shortcuts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {shortcuts.map((category, categoryIndex) => (
                <section key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    {category.items.some(item => item.cultural) && (
                      <span className="text-lg" role="img" aria-label="Portuguese flag">🇵🇹</span>
                    )}
                    {language === 'pt' && category.category === 'Portuguese Cultural Navigation' ? 'Navegação Cultural Portuguesa' :
                     language === 'pt' && category.category === 'General Navigation' ? 'Navegação Geral' :
                     language === 'pt' && category.category === 'Post Interactions' ? 'Interações de Publicações' :
                     language === 'pt' && category.category === 'Profile Actions' ? 'Ações do Perfil' :
                     category.category
                    }
                  </h3>
                  
                  <div className="space-y-3">
                    {category.items.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className={`flex items-center justify-between p-3 bg-white rounded-lg border transition-all ${
                          shortcut.cultural 
                            ? 'border-primary-200 bg-gradient-to-r from-primary-25 to-secondary-25' 
                            : 'border-gray-200'
                        } ${
                          focusedShortcut === `${categoryIndex}-${shortcutIndex}` 
                            ? 'ring-2 ring-primary-500' 
                            : ''
                        }`}
                        onFocus={() => setFocusedShortcut(`${categoryIndex}-${shortcutIndex}`)}
                        onBlur={() => setFocusedShortcut(null)}
                        tabIndex={0}
                        role="listitem"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {shortcut.keys.map((key, keyIndex) => (
                              <div key={keyIndex} className="flex items-center gap-1">
                                <kbd className={`px-2 py-1 text-xs font-mono rounded ${
                                  shortcut.cultural
                                    ? 'bg-primary-100 text-primary-800 border border-primary-300'
                                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                                }`}>
                                  {key}
                                </kbd>
                                {keyIndex < shortcut.keys.length - 1 && (
                                  <span className="text-gray-400 text-xs">+</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-700">
                            {shortcut.description}
                          </span>
                        </div>
                        
                        {shortcut.cultural && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                              {language === 'pt' ? 'Cultural' : 'Cultural'}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {language === 'pt' 
                  ? 'Pressione Escape para fechar esta janela a qualquer momento'
                  : 'Press Escape to close this window at any time'
                }
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'pt' 
                  ? 'Otimizado para navegação por teclado e acessibilidade WCAG 2.1 AA'
                  : 'Optimized for keyboard navigation and WCAG 2.1 AA accessibility'
                }
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}