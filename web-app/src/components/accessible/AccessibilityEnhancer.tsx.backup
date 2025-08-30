'use client'

import React, { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface AccessibilityEnhancerProps {
  children: React.ReactNode
  /** Skip link destination for keyboard navigation */
  skipLinkTarget?: string
  /** Enable Portuguese-specific keyboard shortcuts */
  enablePortugueseShortcuts?: boolean
  /** High contrast mode toggle */
  enableHighContrast?: boolean
  /** Focus management for Portuguese community */
  manageFocus?: boolean
}

/**
 * Accessibility enhancer for Portuguese-speaking community platform
 * Implements WCAG 2.1 AA compliance with Portuguese cultural context
 */
export default function AccessibilityEnhancer({
  children,
  skipLinkTarget = '#main-content',
  enablePortugueseShortcuts = true,
  enableHighContrast = true,
  manageFocus = true
}: AccessibilityEnhancerProps) {
  const { t, language } = useLanguage()
  const skipLinkRef = useRef<HTMLAnchorElement>(null)
  const [isHighContrast, setIsHighContrast] = React.useState(false)
  const [announcements, setAnnouncements] = React.useState<string[]>([])

  // Portuguese-specific keyboard shortcuts
  useEffect(() => {
    if (!enablePortugueseShortcuts) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content (Alt + S for "Saltar")
      if (event.altKey && event.key === 's') {
        event.preventDefault()
        const target = document.querySelector(skipLinkTarget) as HTMLElement
        if (target) {
          target.focus()
          announceToScreenReader(t('accessibility.skipToContent') || 'Saltar para conteúdo principal')
        }
      }

      // Toggle high contrast (Alt + C for "Contraste")
      if (event.altKey && event.key === 'c') {
        event.preventDefault()
        toggleHighContrast()
      }

      // Help overlay (Alt + H for "Ajuda")
      if (event.altKey && event.key === 'h') {
        event.preventDefault()
        showHelpOverlay()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enablePortugueseShortcuts, t, skipLinkTarget])

  // Announce to screen readers in Portuguese/English
  const announceToScreenReader = (message: string) => {
    setAnnouncements(prev => [...prev, message])
    // Clear announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1))
    }, 1000)
  }

  // Toggle high contrast mode for Portuguese community
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
    document.documentElement.classList.toggle('high-contrast', !isHighContrast)
    const message = !isHighContrast 
      ? t('accessibility.highContrastEnabled') || 'Alto contraste ativado'
      : t('accessibility.highContrastDisabled') || 'Alto contraste desativado'
    announceToScreenReader(message)
  }

  // Show help overlay with Portuguese instructions
  const showHelpOverlay = () => {
    const helpText = language === 'pt' 
      ? `Atalhos de teclado disponíveis:
         Alt + S: Saltar para conteúdo principal
         Alt + C: Alternar modo de alto contraste
         Alt + H: Mostrar ajuda
         Tab: Navegar entre elementos
         Enter ou Espaço: Ativar botões`
      : `Available keyboard shortcuts:
         Alt + S: Skip to main content
         Alt + C: Toggle high contrast mode
         Alt + H: Show help
         Tab: Navigate between elements
         Enter or Space: Activate buttons`
    
    announceToScreenReader(helpText)
    
    // Create temporary help dialog
    const existingDialog = document.getElementById('accessibility-help-dialog')
    if (existingDialog) {
      existingDialog.remove()
    }

    const dialog = document.createElement('div')
    dialog.id = 'accessibility-help-dialog'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-labelledby', 'help-title')
    dialog.setAttribute('aria-modal', 'true')
    dialog.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'
    
    dialog.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full max-h-80 overflow-y-auto">
        <h2 id="help-title" class="text-lg font-semibold mb-4 text-heritage-primary">
          ${language === 'pt' ? 'Ajuda de Acessibilidade' : 'Accessibility Help'}
        </h2>
        <div class="space-y-2 text-sm">
          <pre class="whitespace-pre-wrap font-sans">${helpText}</pre>
        </div>
        <button 
          type="button"
          class="mt-4 px-4 py-2 bg-heritage-primary text-white rounded hover:bg-heritage-primary/90 focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2"
          onclick="this.closest('#accessibility-help-dialog').remove(); document.body.focus();"
        >
          ${language === 'pt' ? 'Fechar' : 'Close'}
        </button>
      </div>
    `

    document.body.appendChild(dialog)
    const closeButton = dialog.querySelector('button')
    closeButton?.focus()

    // Close on Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dialog.remove()
        document.removeEventListener('keydown', handleEscape)
      }
    }
    document.addEventListener('keydown', handleEscape)
  }

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a
        ref={skipLinkRef}
        href={skipLinkTarget}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-heritage-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-heritage-secondary"
        onFocus={() => announceToScreenReader(t('accessibility.skipLinkFocused') || 'Link para saltar conteúdo focado')}
      >
        {t('accessibility.skipToMainContent') || 'Saltar para conteúdo principal'}
      </a>

      {/* High contrast toggle button */}
      {enableHighContrast && (
        <button
          type="button"
          className="fixed top-4 right-20 z-40 sr-only focus:not-sr-only bg-heritage-primary text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-heritage-secondary"
          onClick={toggleHighContrast}
          aria-label={
            isHighContrast 
              ? t('accessibility.disableHighContrast') || 'Desativar alto contraste'
              : t('accessibility.enableHighContrast') || 'Ativar alto contraste'
          }
        >
          {isHighContrast ? '🔆' : '🌙'} {t('accessibility.contrast') || 'Contraste'}
        </button>
      )}

      {/* Live region for announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Main content with enhanced accessibility */}
      <div
        className={`accessibility-enhanced ${isHighContrast ? 'high-contrast' : ''}`}
        data-accessibility-enhanced="true"
      >
        {children}
      </div>

      {/* Portuguese community accessibility styles */}
      <style jsx>{`
        .high-contrast {
          filter: contrast(150%) brightness(110%);
        }
        
        .high-contrast .text-heritage-primary {
          color: #000000 !important;
          background-color: #ffffff !important;
        }
        
        .high-contrast .bg-heritage-primary {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        
        .high-contrast button:focus,
        .high-contrast a:focus,
        .high-contrast input:focus,
        .high-contrast textarea:focus {
          outline: 3px solid #ffff00 !important;
          outline-offset: 2px !important;
        }
      `}</style>
    </>
  )
}