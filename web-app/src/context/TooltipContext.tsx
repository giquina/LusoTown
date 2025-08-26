'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

interface TooltipState {
  id: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
  targetElement?: HTMLElement | null
  isVisible: boolean
}

interface TooltipContextType {
  tooltip: TooltipState | null
  showTooltip: (config: {
    id: string
    content: string
    targetElement: HTMLElement
    position?: 'top' | 'bottom' | 'left' | 'right'
  }) => void
  hideTooltip: (id?: string) => void
  isTooltipDismissed: (id: string) => boolean
  dismissTooltip: (id: string) => void
  resetDismissedTooltips: () => void
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined)

interface TooltipProviderProps {
  children: ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [dismissedTooltips, setDismissedTooltips] = useState<Set<string>>(new Set())

  // Load dismissed tooltips from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const dismissed = localStorage.getItem('lusotown-dismissed-tooltips')
        if (dismissed) {
          setDismissedTooltips(new Set(JSON.parse(dismissed)))
        }
      } catch (error) {
        console.error('Failed to load dismissed tooltips:', error)
      }
    }
  }, [])

  // Save dismissed tooltips to localStorage
  const saveDismissedTooltips = useCallback((dismissed: Set<string>) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lusotown-dismissed-tooltips', JSON.stringify(Array.from(dismissed)))
      } catch (error) {
        console.error('Failed to save dismissed tooltips:', error)
      }
    }
  }, [])

  const showTooltip = useCallback((config: {
    id: string
    content: string
    targetElement: HTMLElement
    position?: 'top' | 'bottom' | 'left' | 'right'
  }) => {
    // Don't show if already dismissed
    if (dismissedTooltips.has(config.id)) {
      return
    }

    setTooltip({
      id: config.id,
      content: config.content,
      position: config.position || 'top',
      targetElement: config.targetElement,
      isVisible: true
    })
  }, [dismissedTooltips])

  const hideTooltip = useCallback((id?: string) => {
    setTooltip(current => {
      if (!current) return null
      if (id && current.id !== id) return current
      return { ...current, isVisible: false }
    })

    // Clear the tooltip after animation
    setTimeout(() => {
      setTooltip(current => {
        if (!current || current.isVisible) return current
        return null
      })
    }, 200)
  }, [])

  const isTooltipDismissed = useCallback((id: string) => {
    return dismissedTooltips.has(id)
  }, [dismissedTooltips])

  const dismissTooltip = useCallback((id: string) => {
    const newDismissed = new Set(dismissedTooltips)
    newDismissed.add(id)
    setDismissedTooltips(newDismissed)
    saveDismissedTooltips(newDismissed)
    hideTooltip(id)
  }, [dismissedTooltips, saveDismissedTooltips, hideTooltip])

  const resetDismissedTooltips = useCallback(() => {
    setDismissedTooltips(new Set())
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('lusotown-dismissed-tooltips')
      } catch (error) {
        console.error('Failed to clear dismissed tooltips:', error)
      }
    }
  }, [])

  // Hide tooltip on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && tooltip?.isVisible) {
        hideTooltip()
      }
    }

    if (tooltip?.isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [tooltip?.isVisible, hideTooltip])

  const contextValue: TooltipContextType = {
    tooltip,
    showTooltip,
    hideTooltip,
    isTooltipDismissed,
    dismissTooltip,
    resetDismissedTooltips
  }

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  )
}

export function useTooltip() {
  const context = useContext(TooltipContext)
  if (context === undefined) {
    throw new Error('useTooltip must be used within a TooltipProvider')
  }
  return context
}