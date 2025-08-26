'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useTooltip } from '@/context/TooltipContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface GuidanceStep {
  id: string
  selector: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
  page?: string
  trigger?: 'auto' | 'scroll' | 'interaction'
  delay?: number
}

interface UserGuidanceState {
  isFirstVisit: boolean
  hasCompletedTour: boolean
  currentStep: number
  isActive: boolean
  dismissedSteps: string[]
}

export default function GlobalUserGuidance() {
  const { t } = useLanguage()
  const { showTooltip, isTooltipDismissed, dismissTooltip } = useTooltip()
  const pathname = usePathname()
  
  const [guidanceState, setGuidanceState] = useState<UserGuidanceState>({
    isFirstVisit: true,
    hasCompletedTour: false,
    currentStep: 0,
    isActive: false,
    dismissedSteps: []
  })

  // Define guidance steps for different pages
  const guidanceSteps: Record<string, GuidanceStep[]> = {
    '/': [
      {
        id: 'homepage-welcome',
        selector: '[data-guidance="homepage-hero"]',
        content: t('guidance.welcome.title'),
        position: 'bottom',
        trigger: 'auto',
        delay: 1000
      },
      {
        id: 'palop-selector',
        selector: '[data-guidance="palop-section"]',
        content: t('guidance.palop.title'),
        position: 'top',
        trigger: 'scroll'
      }
    ],
    '/events': [
      {
        id: 'events-calendar',
        selector: '[data-guidance="events-calendar"]',
        content: t('guidance.calendar.title'),
        position: 'bottom',
        trigger: 'auto',
        delay: 800
      }
    ],
    '/matches': [
      {
        id: 'matches-selection',
        selector: '[data-guidance="match-types"]',
        content: t('guidance.matches.title'),
        position: 'bottom',
        trigger: 'auto',
        delay: 600
      }
    ],
    '/business-directory': [
      {
        id: 'business-directory',
        selector: '[data-guidance="business-grid"]',
        content: t('guidance.business.title'),
        position: 'top',
        trigger: 'auto',
        delay: 700
      }
    ]
  }

  // Load user guidance state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lusotown-user-guidance')
        if (saved) {
          const parsed = JSON.parse(saved)
          setGuidanceState(prev => ({
            ...prev,
            ...parsed,
            isActive: !parsed.hasCompletedTour && parsed.isFirstVisit
          }))
        } else {
          // First time visitor
          setGuidanceState(prev => ({
            ...prev,
            isFirstVisit: true,
            isActive: true
          }))
        }
      } catch (error) {
        console.error('Failed to load guidance state:', error)
      }
    }
  }, [])

  // Save guidance state to localStorage
  const saveGuidanceState = useCallback((state: Partial<UserGuidanceState>) => {
    if (typeof window !== 'undefined') {
      try {
        const newState = { ...guidanceState, ...state }
        setGuidanceState(newState)
        localStorage.setItem('lusotown-user-guidance', JSON.stringify(newState))
      } catch (error) {
        console.error('Failed to save guidance state:', error)
      }
    }
  }, [guidanceState])

  // Show contextual guidance based on current page
  const showPageGuidance = useCallback(() => {
    const pageSteps = guidanceSteps[pathname]
    if (!pageSteps || !guidanceState.isActive) return

    pageSteps.forEach((step, index) => {
      if (isTooltipDismissed(step.id)) return

      const element = document.querySelector(step.selector) as HTMLElement
      if (!element) return

      const showStepTooltip = () => {
        showTooltip({
          id: step.id,
          content: step.content,
          targetElement: element,
          position: step.position
        })
      }

      if (step.trigger === 'auto') {
        setTimeout(showStepTooltip, step.delay || 500)
      } else if (step.trigger === 'scroll') {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                showStepTooltip()
                observer.unobserve(element)
              }
            })
          },
          { threshold: 0.5 }
        )
        observer.observe(element)
      }
    })
  }, [pathname, guidanceState.isActive, guidanceSteps, showTooltip, isTooltipDismissed])

  // Initialize guidance when page loads
  useEffect(() => {
    if (guidanceState.isActive) {
      const timer = setTimeout(showPageGuidance, 500)
      return () => clearTimeout(timer)
    }
  }, [showPageGuidance, guidanceState.isActive])

  // Complete tour handler
  const completeTour = useCallback(() => {
    saveGuidanceState({
      hasCompletedTour: true,
      isActive: false,
      isFirstVisit: false
    })
  }, [saveGuidanceState])

  // Skip tour handler
  const skipTour = useCallback(() => {
    saveGuidanceState({
      hasCompletedTour: true,
      isActive: false
    })
  }, [saveGuidanceState])

  // Reset tour (for testing or user request)
  const resetTour = useCallback(() => {
    saveGuidanceState({
      isFirstVisit: true,
      hasCompletedTour: false,
      currentStep: 0,
      isActive: true,
      dismissedSteps: []
    })
  }, [saveGuidanceState])

  // Don't render anything - guidance is handled through tooltips
  return null
}

// Hook for adding guidance attributes to components
export function useGuidanceAttributes(id: string) {
  return {
    'data-guidance': id,
    'data-guidance-target': true
  }
}

// Component for easy guidance integration
export function GuidanceTarget({ 
  id, 
  children, 
  className = '' 
}: { 
  id: string
  children: React.ReactNode
  className?: string 
}) {
  const guidanceProps = useGuidanceAttributes(id)
  
  return (
    <div className={className} {...guidanceProps}>
      {children}
    </div>
  )
}

// First-time visitor banner component
export function WelcomeBanner() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const hasVisited = localStorage.getItem('lusotown-has-visited')
        if (!hasVisited) {
          setIsFirstVisit(true)
          setIsVisible(true)
          localStorage.setItem('lusotown-has-visited', 'true')
        }
      } catch (error) {
        console.error('Failed to check first visit status:', error)
      }
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const handleGetStarted = () => {
    setIsVisible(false)
    // Could trigger a more detailed onboarding flow here
  }

  if (!isVisible || !isFirstVisit) {
    return null
  }

  return (
    <div
      className="
        fixed top-0 left-0 right-0 z-40
        bg-gradient-to-r from-[var(--portuguese-gold)] to-[var(--portuguese-brown)]
        text-white p-4 shadow-lg
        transform transition-transform duration-300 ease-out
      "
      style={{
        '--portuguese-gold': PORTUGUESE_COLORS.gold[500],
        '--portuguese-brown': PORTUGUESE_COLORS.brown[600]
      } as React.CSSProperties}
      role="banner"
      aria-label={t('welcome.banner.ariaLabel')}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            {window.innerWidth < 768 ? t('welcome.banner.mobileTitle') : t('welcome.banner.title')}
          </h2>
          <p className="text-sm opacity-90 hidden sm:block">
            {t('guidance.welcome.subtitle')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleGetStarted}
            className="
              bg-white text-[var(--portuguese-brown)] px-4 py-2 rounded-lg
              font-medium text-sm transition-all duration-150
              hover:scale-105 active:scale-95
              min-h-[44px] flex items-center justify-center
              touch-manipulation
            "
          >
            {t('welcome.banner.start')}
          </button>
          
          <button
            onClick={handleDismiss}
            className="
              text-white hover:text-gray-200 p-2 rounded-lg
              transition-colors duration-150
              min-h-[44px] min-w-[44px] flex items-center justify-center
              touch-manipulation
            "
            aria-label={t('welcome.banner.dismiss')}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}