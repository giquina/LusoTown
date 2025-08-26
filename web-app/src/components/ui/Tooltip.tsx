'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTooltip } from '@/context/TooltipContext'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface TooltipPosition {
  top: number
  left: number
  position: 'top' | 'bottom' | 'left' | 'right'
}

export function TooltipRenderer() {
  const { tooltip, hideTooltip, dismissTooltip } = useTooltip()
  const { t } = useLanguage()
  const [position, setPosition] = useState<TooltipPosition | null>(null)
  const [mounted, setMounted] = useState(false)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate optimal tooltip position
  const calculatePosition = useCallback((targetElement: HTMLElement, preferredPosition: string): TooltipPosition => {
    const rect = targetElement.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const tooltipWidth = 280 // Estimated tooltip width
    const tooltipHeight = 100 // Estimated tooltip height
    const offset = 12 // Distance from target element

    // Mobile-first: Prefer bottom position on small screens
    const isMobile = windowWidth < 768
    let position = preferredPosition as 'top' | 'bottom' | 'left' | 'right'

    // Calculate positions for each direction
    const positions = {
      top: {
        top: rect.top - tooltipHeight - offset,
        left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        position: 'top' as const
      },
      bottom: {
        top: rect.bottom + offset,
        left: rect.left + (rect.width / 2) - (tooltipWidth / 2),
        position: 'bottom' as const
      },
      left: {
        top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
        left: rect.left - tooltipWidth - offset,
        position: 'left' as const
      },
      right: {
        top: rect.top + (rect.height / 2) - (tooltipHeight / 2),
        left: rect.right + offset,
        position: 'right' as const
      }
    }

    // Check if preferred position fits on screen
    const preferred = positions[position]
    const fitsHorizontally = preferred.left >= 0 && preferred.left + tooltipWidth <= windowWidth
    const fitsVertically = preferred.top >= 0 && preferred.top + tooltipHeight <= windowHeight

    if (fitsHorizontally && fitsVertically) {
      return preferred
    }

    // Mobile fallback: Try bottom, then top
    if (isMobile) {
      if (positions.bottom.top + tooltipHeight <= windowHeight) {
        return positions.bottom
      }
      if (positions.top.top >= 0) {
        return positions.top
      }
    }

    // Desktop fallback: Try all positions
    const fallbackOrder = isMobile 
      ? ['bottom', 'top', 'right', 'left'] 
      : ['top', 'bottom', 'right', 'left']

    for (const pos of fallbackOrder) {
      const candidate = positions[pos as keyof typeof positions]
      const candidateFitsH = candidate.left >= 0 && candidate.left + tooltipWidth <= windowWidth
      const candidateFitsV = candidate.top >= 0 && candidate.top + tooltipHeight <= windowHeight
      
      if (candidateFitsH && candidateFitsV) {
        return candidate
      }
    }

    // Last resort: Center on screen (mobile safe)
    return {
      top: Math.max(20, (windowHeight / 2) - (tooltipHeight / 2)),
      left: Math.max(20, (windowWidth / 2) - (tooltipWidth / 2)),
      position: 'bottom'
    }
  }, [])

  // Update position when tooltip changes
  useEffect(() => {
    if (tooltip?.targetElement && tooltip.isVisible) {
      const newPosition = calculatePosition(tooltip.targetElement, tooltip.position)
      setPosition(newPosition)
    } else {
      setPosition(null)
    }
  }, [tooltip, calculatePosition])

  // Handle outside click
  useEffect(() => {
    if (!tooltip?.isVisible) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      const tooltipElement = document.querySelector('[data-tooltip-content]')
      
      if (tooltipElement && !tooltipElement.contains(target)) {
        hideTooltip()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [tooltip?.isVisible, hideTooltip])

  if (!mounted || !tooltip?.isVisible || !position) {
    return null
  }

  const tooltipContent = (
    <div
      data-tooltip-content
      className={`
        fixed z-50 max-w-xs w-full transition-all duration-200 ease-out
        ${tooltip.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
      style={{
        top: position.top,
        left: Math.max(20, Math.min(position.left, window.innerWidth - 320)), // 20px margin + 300px width
        '--tooltip-bg': PORTUGUESE_COLORS.gold[50],
        '--tooltip-border': PORTUGUESE_COLORS.gold[500],
        '--tooltip-text': PORTUGUESE_COLORS.brown[900],
        '--tooltip-shadow': DESIGN_TOKENS.shadows.portuguese
      } as React.CSSProperties}
    >
      <div
        className="
          relative bg-[var(--tooltip-bg)] border-2 border-[var(--tooltip-border)]
          rounded-xl p-4 shadow-lg text-[var(--tooltip-text)]
          backdrop-blur-sm bg-opacity-95
        "
      >
        {/* Arrow indicator */}
        <div
          className={`
            absolute w-3 h-3 bg-[var(--tooltip-bg)] border-[var(--tooltip-border)]
            transform rotate-45
            ${position.position === 'top' ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-t-2 border-l-2 border-r-0 border-b-0' : ''}
            ${position.position === 'bottom' ? 'top-[-8px] left-1/2 -translate-x-1/2 border-b-2 border-r-2 border-t-0 border-l-0' : ''}
            ${position.position === 'left' ? 'right-[-8px] top-1/2 -translate-y-1/2 border-l-2 border-b-2 border-t-0 border-r-0' : ''}
            ${position.position === 'right' ? 'left-[-8px] top-1/2 -translate-y-1/2 border-r-2 border-t-2 border-b-0 border-l-0' : ''}
          `}
        />

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed font-medium">
            {tooltip.content}
          </p>

          {/* Action buttons */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={() => hideTooltip(tooltip.id)}
              className="
                text-xs text-[var(--tooltip-text)] opacity-75 hover:opacity-100
                transition-opacity duration-150 
                min-h-[44px] flex items-center justify-center px-3
                touch-manipulation
              "
              aria-label={t('tooltip.close')}
            >
              {t('guidance.dismiss')}
            </button>

            <button
              onClick={() => dismissTooltip(tooltip.id)}
              className="
                bg-[var(--tooltip-border)] text-white rounded-lg px-4 py-2
                text-sm font-medium transition-all duration-150
                hover:scale-105 active:scale-95
                min-h-[44px] min-w-[44px] flex items-center justify-center
                touch-manipulation
                focus:outline-none focus:ring-2 focus:ring-[var(--tooltip-border)] focus:ring-offset-2
              "
              aria-label={t('guidance.dismiss')}
            >
              ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(tooltipContent, document.body)
}

// Hook for easy tooltip attachment to elements
export function useTooltipTrigger(config: {
  id: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
}) {
  const { showTooltip, hideTooltip, isTooltipDismissed } = useTooltip()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const trigger = config.trigger || 'hover'
  const delay = config.delay || 500

  const handleShow = useCallback((element: HTMLElement) => {
    if (isTooltipDismissed(config.id)) return

    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const id = setTimeout(() => {
      showTooltip({
        id: config.id,
        content: config.content,
        targetElement: element,
        position: config.position
      })
    }, delay)

    setTimeoutId(id)
  }, [config, showTooltip, isTooltipDismissed, delay, timeoutId])

  const handleHide = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    hideTooltip(config.id)
  }, [config.id, hideTooltip, timeoutId])

  const props = {
    onMouseEnter: trigger === 'hover' ? (e: React.MouseEvent<HTMLElement>) => handleShow(e.currentTarget) : undefined,
    onMouseLeave: trigger === 'hover' ? handleHide : undefined,
    onClick: trigger === 'click' ? (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      handleShow(e.currentTarget)
    } : undefined,
    onFocus: trigger === 'focus' ? (e: React.FocusEvent<HTMLElement>) => handleShow(e.currentTarget) : undefined,
    onBlur: trigger === 'focus' ? handleHide : undefined,
  }

  return props
}

export default TooltipRenderer