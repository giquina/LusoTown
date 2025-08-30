/**
 * Enhanced Keyboard Navigation Hook for Portuguese Community Platform
 * Provides comprehensive WCAG 2.1 AA compliant keyboard navigation
 * with Portuguese cultural shortcuts (Alt+S, Alt+C, Alt+H)
 */

import { useCallback, useEffect, KeyboardEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'

export interface EnhancedKeyboardNavigationOptions {
  onClick?: () => void
  onEnter?: () => void
  onSpace?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onHome?: () => void
  onEnd?: () => void
  onPageUp?: () => void
  onPageDown?: () => void
  disabled?: boolean
  enableFocusManagement?: boolean
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
  ariaLabel?: string
  announceActions?: boolean
}

export interface PortugueseKeyboardShortcuts {
  'Alt+S': () => void  // "Saltar" - Skip navigation
  'Alt+C': () => void  // "Comunidade" - Community page
  'Alt+H': () => void  // "Ajuda" - Help/Home page
}

export const useEnhancedKeyboardNavigation = (options: EnhancedKeyboardNavigationOptions) => {
  const {
    onClick,
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onPageUp,
    onPageDown,
    disabled = false,
    enableFocusManagement = true,
    culturalContext = 'general',
    ariaLabel,
    announceActions = false
  } = options

  const { t, language } = useLanguage()
  const router = useRouter()

  // Portuguese cultural shortcuts handler
  const handlePortugueseShortcuts = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      switch (event.key.toLowerCase()) {
        case 's':
          // Alt+S: Skip to main content (Saltar)
          event.preventDefault()
          const mainContent = document.querySelector('main') || document.querySelector('[role="main"]')
          if (mainContent) {
            (mainContent as HTMLElement).focus()
            if (announceActions) {
              // Announce skip navigation
              const announcement = language === 'pt' ? 'Saltando para conteúdo principal' : 'Skipping to main content'
              announceToScreenReader(announcement)
            }
          }
          break

        case 'c':
          // Alt+C: Navigate to Community (Comunidade)
          event.preventDefault()
          router.push(ROUTES.COMMUNITY.ROOT)
          if (announceActions) {
            const announcement = language === 'pt' ? 'Navegando para Comunidade' : 'Navigating to Community'
            announceToScreenReader(announcement)
          }
          break

        case 'h':
          // Alt+H: Navigate to Home/Help (Ajuda/Home)
          event.preventDefault()
          router.push(ROUTES.HOME)
          if (announceActions) {
            const announcement = language === 'pt' ? 'Navegando para página inicial' : 'Navigating to home page'
            announceToScreenReader(announcement)
          }
          break
      }
    }
  }, [router, language, announceActions])

  // Main keyboard event handler
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (disabled) return

    // Handle Portuguese shortcuts first
    handlePortugueseShortcuts(event)

    const { key } = event

    switch (key) {
      case 'Enter':
        event.preventDefault()
        if (onEnter) {
          onEnter()
        } else if (onClick) {
          onClick()
        }
        if (announceActions) {
          const announcement = language === 'pt' ? 'Ativado' : 'Activated'
          announceToScreenReader(announcement)
        }
        break

      case ' ':
      case 'Space':
        event.preventDefault()
        if (onSpace) {
          onSpace()
        } else if (onClick) {
          onClick()
        }
        if (announceActions) {
          const announcement = language === 'pt' ? 'Ativado' : 'Activated'
          announceToScreenReader(announcement)
        }
        break

      case 'Escape':
        if (onEscape) {
          event.preventDefault()
          onEscape()
          if (announceActions) {
            const announcement = language === 'pt' ? 'Cancelado' : 'Cancelled'
            announceToScreenReader(announcement)
          }
        }
        break

      case 'ArrowUp':
        if (onArrowUp) {
          event.preventDefault()
          onArrowUp()
        }
        break

      case 'ArrowDown':
        if (onArrowDown) {
          event.preventDefault()
          onArrowDown()
        }
        break

      case 'ArrowLeft':
        if (onArrowLeft) {
          event.preventDefault()
          onArrowLeft()
        }
        break

      case 'ArrowRight':
        if (onArrowRight) {
          event.preventDefault()
          onArrowRight()
        }
        break

      case 'Home':
        if (onHome) {
          event.preventDefault()
          onHome()
        }
        break

      case 'End':
        if (onEnd) {
          event.preventDefault()
          onEnd()
        }
        break

      case 'PageUp':
        if (onPageUp) {
          event.preventDefault()
          onPageUp()
        }
        break

      case 'PageDown':
        if (onPageDown) {
          event.preventDefault()
          onPageDown()
        }
        break

      default:
        // No action needed for other keys
        break
    }
  }, [
    disabled,
    onClick,
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onPageUp,
    onPageDown,
    handlePortugueseShortcuts,
    announceActions,
    language
  ])

  // Screen reader announcement utility
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  // Focus management utilities
  const focusNext = useCallback(() => {
    if (!enableFocusManagement) return
    
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element)
    const nextIndex = (currentIndex + 1) % focusableElements.length
    ;(focusableElements[nextIndex] as HTMLElement).focus()
  }, [enableFocusManagement])

  const focusPrevious = useCallback(() => {
    if (!enableFocusManagement) return
    
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element)
    const previousIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
    ;(focusableElements[previousIndex] as HTMLElement).focus()
  }, [enableFocusManagement])

  // Generate appropriate ARIA label based on cultural context
  const getAriaLabel = useCallback(() => {
    if (ariaLabel) return ariaLabel
    
    const baseLabel = language === 'pt' ? 'Botão interativo da comunidade portuguesa' : 'Portuguese community interactive button'
    
    if (culturalContext && culturalContext !== 'general') {
      const culturalLabels = {
        portugal: language === 'pt' ? 'Conteúdo português' : 'Portuguese content',
        brazil: language === 'pt' ? 'Conteúdo brasileiro' : 'Brazilian content',
        'cape-verde': language === 'pt' ? 'Conteúdo cabo-verdiano' : 'Cape Verdean content',
        angola: language === 'pt' ? 'Conteúdo angolano' : 'Angolan content',
        mozambique: language === 'pt' ? 'Conteúdo moçambicano' : 'Mozambican content'
      }
      return `${baseLabel} - ${culturalLabels[culturalContext]}`
    }
    
    return baseLabel
  }, [ariaLabel, culturalContext, language])

  return {
    // Main keyboard handler
    onKeyDown: handleKeyDown,
    
    // Standard accessibility attributes
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
    'aria-label': getAriaLabel(),
    
    // Cultural context attributes
    'data-cultural-context': culturalContext,
    'data-keyboard-enhanced': true,
    'data-portuguese-shortcuts': true,
    
    // Focus management utilities
    focusNext,
    focusPrevious,
    announceToScreenReader,
    
    // Portuguese keyboard shortcuts info
    shortcuts: {
      'Alt+S': language === 'pt' ? 'Saltar para conteúdo principal' : 'Skip to main content',
      'Alt+C': language === 'pt' ? 'Ir para Comunidade' : 'Go to Community',
      'Alt+H': language === 'pt' ? 'Ir para página inicial' : 'Go to Home page'
    }
  }
}

/**
 * Simplified hook for basic interactive elements
 */
export const useBasicKeyboardNavigation = (onClick?: () => void, disabled = false) => {
  return useEnhancedKeyboardNavigation({
    onClick,
    disabled,
    enableFocusManagement: false,
    announceActions: false
  })
}

/**
 * Hook specifically for Portuguese cultural components
 */
export const usePortugueseKeyboardNavigation = (
  options: EnhancedKeyboardNavigationOptions & {
    heritage?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
  }
) => {
  const { heritage = 'general', ...navigationOptions } = options
  
  return useEnhancedKeyboardNavigation({
    ...navigationOptions,
    culturalContext: heritage,
    announceActions: true,
    enableFocusManagement: true
  })
}

export default useEnhancedKeyboardNavigation