/**
 * useKeyboardNavigation - Portuguese Community Platform Keyboard Navigation Hook
 * Provides WCAG 2.1 AA compliant keyboard navigation for Portuguese-speaking community
 */

import { useCallback, KeyboardEvent } from 'react'

interface KeyboardNavigationOptions {
  onClick?: () => void
  onEnter?: () => void
  onSpace?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  disabled?: boolean
}

export const useKeyboardNavigation = (options: KeyboardNavigationOptions) => {
  const {
    onClick,
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    disabled = false
  } = options

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (disabled) return

    const { key, code } = event

    switch (key) {
      case 'Enter':
        event.preventDefault()
        if (onEnter) {
          onEnter()
        } else if (onClick) {
          onClick()
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
        break

      case 'Escape':
        if (onEscape) {
          event.preventDefault()
          onEscape()
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
    onArrowRight
  ])

  return {
    onKeyDown: handleKeyDown,
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled
  }
}

/**
 * Portuguese Community specific keyboard navigation patterns
 */
export const usePortugueseKeyboardNavigation = (options: KeyboardNavigationOptions & {
  culturalContext?: 'portuguese' | 'brazilian' | 'cape-verdean' | 'angolan' | 'mozambican' | 'general'
}) => {
  const { culturalContext = 'general', ...navigationOptions } = options
  
  const navigation = useKeyboardNavigation(navigationOptions)

  return {
    ...navigation,
    'data-cultural-context': culturalContext,
    'aria-label': `Portuguese community navigation button - ${culturalContext}`
  }
}

export default useKeyboardNavigation