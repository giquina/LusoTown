'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface Language {
  code: 'en' | 'pt'
  name: string
  nativeName: string
  flag: string
  ariaLabel: string
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    ariaLabel: 'Switch to English'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    ariaLabel: 'Mudar para Português'
  }
]

interface AccessibilityEnhancedLanguageToggleProps {
  /** Show language names alongside flags */
  showNames?: boolean
  /** Compact mode for mobile */
  compact?: boolean
  /** Position of dropdown */
  dropdownPosition?: 'left' | 'right' | 'center'
}

/**
 * Fully accessible language toggle for Portuguese-speaking community
 * Implements WCAG 2.1 AA compliance with keyboard navigation and screen reader support
 */
export default function AccessibilityEnhancedLanguageToggle({
  showNames = true,
  compact = false,
  dropdownPosition = 'right'
}: AccessibilityEnhancedLanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<HTMLButtonElement[]>([])
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]
  const otherLanguages = languages.filter(lang => lang.code !== language)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Enhanced keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!isOpen) {
          openDropdown()
        } else if (focusedIndex >= 0) {
          selectLanguage(otherLanguages[focusedIndex].code)
        }
        break
        
      case 'Escape':
        event.preventDefault()
        closeDropdown()
        buttonRef.current?.focus()
        break
        
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          openDropdown()
        } else {
          const nextIndex = focusedIndex < otherLanguages.length - 1 ? focusedIndex + 1 : 0
          setFocusedIndex(nextIndex)
          optionRefs.current[nextIndex]?.focus()
        }
        break
        
      case 'ArrowUp':
        event.preventDefault()
        if (isOpen) {
          const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : otherLanguages.length - 1
          setFocusedIndex(prevIndex)
          optionRefs.current[prevIndex]?.focus()
        }
        break
        
      case 'Home':
        if (isOpen) {
          event.preventDefault()
          setFocusedIndex(0)
          optionRefs.current[0]?.focus()
        }
        break
        
      case 'End':
        if (isOpen) {
          event.preventDefault()
          const lastIndex = otherLanguages.length - 1
          setFocusedIndex(lastIndex)
          optionRefs.current[lastIndex]?.focus()
        }
        break
    }
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  const openDropdown = () => {
    setIsOpen(true)
    setFocusedIndex(0)
    announceToScreenReader(
      language === 'pt' 
        ? 'Menu de idiomas aberto. Use as setas para navegar.'
        : 'Language menu opened. Use arrow keys to navigate.'
    )
    
    // Focus first option after opening
    setTimeout(() => {
      optionRefs.current[0]?.focus()
    }, 50)
  }

  const closeDropdown = () => {
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  // Select language
  const selectLanguage = (langCode: 'en' | 'pt') => {
    const selectedLang = languages.find(lang => lang.code === langCode)
    if (selectedLang && langCode !== language) {
      setLanguage(langCode)
      announceToScreenReader(
        langCode === 'pt' 
          ? 'Idioma alterado para Português'
          : 'Language changed to English'
      )
    }
    closeDropdown()
    buttonRef.current?.focus()
  }

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 2000)
  }

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        ref={buttonRef}
        type="button"
        className={`
          inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
          min-h-[48px] touch-manipulation
          border border-gray-300 rounded-md bg-white shadow-sm
          hover:bg-gray-50 hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2
          ${compact ? 'px-2' : 'px-3'}
        `}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={
          language === 'pt'
            ? `Idioma atual: ${currentLanguage.nativeName}. Clique para alterar idioma.`
            : `Current language: ${currentLanguage.nativeName}. Click to change language.`
        }
      >
        {/* Language flag and icon */}
        <span className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={`${currentLanguage.name} flag`}>
            {currentLanguage.flag}
          </span>
          {!compact && <LanguageIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />}
        </span>
        
        {/* Language name */}
        {showNames && !compact && (
          <span className="hidden sm:inline">
            {currentLanguage.nativeName}
          </span>
        )}
        
        {/* Dropdown arrow */}
        <ChevronDownIcon 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            absolute z-50 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-lg
            min-w-[160px] max-w-[200px]
            ${dropdownPosition === 'left' ? 'right-0' : 
              dropdownPosition === 'center' ? 'left-1/2 transform -translate-x-1/2' : 
              'left-0'}
          `}
          role="listbox"
          aria-label={
            language === 'pt' 
              ? 'Selecionar idioma'
              : 'Select language'
          }
        >
          {otherLanguages.map((lang, index) => (
            <button
              key={lang.code}
              ref={el => {
                if (el) optionRefs.current[index] = el
              }}
              type="button"
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors
                min-h-[48px] touch-manipulation
                hover:bg-gray-50 focus:bg-heritage-primary/10
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-heritage-primary
                ${focusedIndex === index ? 'bg-heritage-primary/10' : ''}
              `}
              onClick={() => selectLanguage(lang.code)}
              onKeyDown={handleKeyDown}
              role="option"
              aria-selected={false}
              aria-label={lang.ariaLabel}
              tabIndex={-1}
            >
              {/* Flag */}
              <span className="text-lg" role="img" aria-label={`${lang.name} flag`}>
                {lang.flag}
              </span>
              
              {/* Language details */}
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {lang.nativeName}
                </div>
                {showNames && (
                  <div className="text-xs text-gray-500">
                    {lang.name}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        {language === 'pt' ? (
          'Use Enter ou Espaço para abrir o menu. Use setas para navegar. Pressione Escape para fechar.'
        ) : (
          'Use Enter or Space to open menu. Use arrow keys to navigate. Press Escape to close.'
        )}
      </div>
    </div>
  )
}