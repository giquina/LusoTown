'use client'

import { useEffect, useRef, useCallback } from 'react'

export interface FocusableElement extends HTMLElement {
  disabled?: boolean
  tabIndex?: number
}

export interface FocusManagementOptions {
  restoreFocus?: boolean
  initialFocus?: 'first' | 'last' | 'element'
  initialFocusElement?: HTMLElement | (() => HTMLElement | null)
  preventScroll?: boolean
}

/**
 * Custom hook for comprehensive focus management
 * Essential for modal dialogs, widgets, and keyboard navigation
 */
export function useFocusManagement(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean,
  options: FocusManagementOptions = {}
) {
  const {
    restoreFocus = true,
    initialFocus = 'first',
    initialFocusElement,
    preventScroll = false
  } = options

  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)
  const isInitializedRef = useRef(false)

  // Get all focusable elements within the container
  const getFocusableElements = useCallback((container: HTMLElement): FocusableElement[] => {
    const focusableSelectors = [
      'button:not([disabled]):not([aria-hidden="true"])',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
      'select:not([disabled]):not([aria-hidden="true"])',
      'textarea:not([disabled]):not([aria-hidden="true"])',
      'a[href]:not([aria-hidden="true"])',
      '[tabindex]:not([tabindex="-1"]):not([disabled]):not([aria-hidden="true"])',
      'details:not([aria-hidden="true"])',
      'summary:not([aria-hidden="true"])',
      'iframe:not([aria-hidden="true"])',
      'object:not([aria-hidden="true"])',
      'embed:not([aria-hidden="true"])',
      '[contenteditable]:not([contenteditable="false"]):not([aria-hidden="true"])'
    ].join(', ')

    const elements = Array.from(
      container.querySelectorAll<FocusableElement>(focusableSelectors)
    )

    // Filter out elements that are not actually focusable
    return elements.filter(element => {
      // Skip if disabled
      if (element.disabled) return false
      
      // Skip if has negative tabindex (unless it's exactly -1, which we'll handle)
      const tabIndex = element.tabIndex
      if (tabIndex < -1) return false
      
      // Check if element is visible
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden') return false
      
      // Check if element has dimensions
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return false
      
      return true
    })
  }, [])

  // Focus the first focusable element
  const focusFirst = useCallback(() => {
    if (!containerRef.current) return false
    
    const focusableElements = getFocusableElements(containerRef.current)
    if (focusableElements.length > 0) {
      focusableElements[0].focus({ preventScroll })
      return true
    }
    return false
  }, [containerRef, getFocusableElements, preventScroll])

  // Focus the last focusable element
  const focusLast = useCallback(() => {
    if (!containerRef.current) return false
    
    const focusableElements = getFocusableElements(containerRef.current)
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus({ preventScroll })
      return true
    }
    return false
  }, [containerRef, getFocusableElements, preventScroll])

  // Focus a specific element
  const focusElement = useCallback((element: HTMLElement | (() => HTMLElement | null)) => {
    const targetElement = typeof element === 'function' ? element() : element
    if (targetElement) {
      targetElement.focus({ preventScroll })
      return true
    }
    return false
  }, [preventScroll])

  // Handle keyboard navigation within the focus trap
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || !containerRef.current) return

    const { key, shiftKey, target } = event
    
    if (key === 'Tab') {
      const focusableElements = getFocusableElements(containerRef.current)
      
      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const currentElement = target as HTMLElement

      if (shiftKey) {
        // Shift + Tab: moving backwards
        if (currentElement === firstElement) {
          event.preventDefault()
          lastElement.focus({ preventScroll })
        }
      } else {
        // Tab: moving forwards
        if (currentElement === lastElement) {
          event.preventDefault()
          firstElement.focus({ preventScroll })
        }
      }
    }

    // Escape key handling for modals/widgets
    if (key === 'Escape') {
      // Let parent components handle escape if they want to
      // Don't prevent default here to allow bubbling
    }
  }, [isActive, containerRef, getFocusableElements, preventScroll])

  // Set up focus management when active state changes
  useEffect(() => {
    if (isActive) {
      // Store the previously focused element
      if (restoreFocus) {
        previouslyFocusedElementRef.current = document.activeElement as HTMLElement
      }

      // Set initial focus
      setTimeout(() => {
        if (!containerRef.current) return

        let focusSet = false

        // Try initial focus strategies
        if (initialFocusElement) {
          focusSet = focusElement(initialFocusElement)
        }

        if (!focusSet) {
          if (initialFocus === 'first') {
            focusSet = focusFirst()
          } else if (initialFocus === 'last') {
            focusSet = focusLast()
          }
        }

        // If no focus was set, focus the container itself
        if (!focusSet && containerRef.current) {
          containerRef.current.tabIndex = -1
          containerRef.current.focus({ preventScroll })
        }

        isInitializedRef.current = true
      }, 0)

      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown, true)

      return () => {
        document.removeEventListener('keydown', handleKeyDown, true)
      }
    } else if (isInitializedRef.current) {
      // Restore focus when deactivated
      if (restoreFocus && previouslyFocusedElementRef.current) {
        // Small delay to ensure the element is still in the DOM
        setTimeout(() => {
          if (previouslyFocusedElementRef.current && 
              document.contains(previouslyFocusedElementRef.current)) {
            previouslyFocusedElementRef.current.focus({ preventScroll })
          }
        }, 0)
      }
      
      isInitializedRef.current = false
    }
  }, [isActive, handleKeyDown, restoreFocus, focusFirst, focusLast, focusElement, initialFocus, initialFocusElement, containerRef, preventScroll])

  return {
    focusFirst,
    focusLast,
    focusElement,
    getFocusableElements: () => containerRef.current ? getFocusableElements(containerRef.current) : []
  }
}

/**
 * Hook to manage focus indicators with Portuguese cultural styling
 */
export function useFocusIndicator() {
  useEffect(() => {
    // Add CSS custom properties for Portuguese cultural focus styles
    const style = document.createElement('style')
    style.id = 'lusotown-focus-styles'
    style.textContent = `
      :root {
        --focus-ring-color: rgb(34 197 94); /* Portuguese green */
        --focus-ring-offset: 2px;
        --focus-ring-width: 2px;
        --focus-ring-style: solid;
      }

      /* High contrast focus styles for accessibility */
      @media (prefers-contrast: high) {
        :root {
          --focus-ring-color: #000000;
          --focus-ring-width: 3px;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .lusotown-focus-smooth {
          transition: none !important;
        }
      }

      /* Portuguese cultural focus styles */
      .lusotown-focus {
        outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color) !important;
        outline-offset: var(--focus-ring-offset) !important;
      }

      .lusotown-focus-smooth {
        transition: outline 0.15s ease-in-out;
      }

      /* Portuguese heritage colors for special focus states */
      .lusotown-focus-primary {
        --focus-ring-color: rgb(34 197 94); /* Green */
      }

      .lusotown-focus-secondary {
        --focus-ring-color: rgb(239 68 68); /* Red */
      }

      .lusotown-focus-accent {
        --focus-ring-color: rgb(251 191 36); /* Gold/Yellow */
      }

      /* Focus styles for different component types */
      .lusotown-widget-focus {
        outline: 2px solid rgb(34 197 94);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
      }

      .lusotown-button-focus {
        outline: 2px solid rgb(34 197 94);
        outline-offset: 2px;
      }

      .lusotown-card-focus {
        outline: 2px solid rgb(34 197 94);
        outline-offset: 2px;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
      }
    `

    // Only add if not already present
    if (!document.getElementById('lusotown-focus-styles')) {
      document.head.appendChild(style)
    }

    return () => {
      const existingStyle = document.getElementById('lusotown-focus-styles')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  const addFocusClasses = useCallback((element: HTMLElement, type: 'widget' | 'button' | 'card' = 'widget') => {
    element.classList.add('lusotown-focus-smooth')
    element.classList.add(`lusotown-${type}-focus`)
  }, [])

  const removeFocusClasses = useCallback((element: HTMLElement, type: 'widget' | 'button' | 'card' = 'widget') => {
    element.classList.remove('lusotown-focus-smooth')
    element.classList.remove(`lusotown-${type}-focus`)
  }, [])

  return {
    addFocusClasses,
    removeFocusClasses
  }
}

/**
 * Hook for skip links and keyboard shortcuts
 */
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, altKey, ctrlKey } = event

      // Skip to main content (Alt+M)
      if (altKey && key === 'm') {
        event.preventDefault()
        const mainContent = document.getElementById('main-content') || 
                           document.querySelector('main') ||
                           document.querySelector('[role="main"]')
        if (mainContent) {
          (mainContent as HTMLElement).focus()
        }
      }

      // Skip to navigation (Alt+N)
      if (altKey && key === 'n') {
        event.preventDefault()
        const navigation = document.querySelector('nav') ||
                          document.querySelector('[role="navigation"]')
        if (navigation) {
          const firstLink = navigation.querySelector('a, button')
          if (firstLink) {
            (firstLink as HTMLElement).focus()
          }
        }
      }

      // Open LusoBot with keyboard shortcut (Alt+L)
      if (altKey && key === 'l') {
        event.preventDefault()
        const lusoBotButton = document.querySelector('[aria-label*="LusoBot"]')
        if (lusoBotButton) {
          (lusoBotButton as HTMLElement).click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}