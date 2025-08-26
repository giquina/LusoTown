'use client'

import React, { useEffect, useState } from 'react'
import { TooltipProvider } from '@/context/TooltipContext'
import { TooltipRenderer } from '@/components/ui/Tooltip'
import GlobalUserGuidance, { WelcomeBanner } from '@/components/GlobalUserGuidance'
import OnboardingChecklist, { onboardingActions } from '@/components/OnboardingChecklist'
import { useLanguage } from '@/context/LanguageContext'

interface GlobalUXState {
  isFirstVisit: boolean
  hasCompletedOnboarding: boolean
  currentUserJourney: 'discovery' | 'engagement' | 'retention'
  guidanceLevel: 'beginner' | 'intermediate' | 'advanced'
  mobileOptimized: boolean
}

interface GlobalUXEnhancementProviderProps {
  children: React.ReactNode
}

export default function GlobalUXEnhancementProvider({ 
  children 
}: GlobalUXEnhancementProviderProps) {
  const { language } = useLanguage()
  const [uxState, setUXState] = useState<GlobalUXState>({
    isFirstVisit: true,
    hasCompletedOnboarding: false,
    currentUserJourney: 'discovery',
    guidanceLevel: 'beginner',
    mobileOptimized: true
  })

  // Initialize UX enhancement system
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      // Check device capabilities and optimize for mobile
      const isMobile = window.innerWidth < 768
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const mobileOptimized = isMobile || hasTouch

      // Load user journey state
      const savedJourney = localStorage.getItem('lusotown-user-journey')
      const journeyData = savedJourney ? JSON.parse(savedJourney) : null

      // Determine user journey stage
      const hasProfile = localStorage.getItem('lusotown-user-profile')
      const hasAttendedEvent = localStorage.getItem('lusotown-attended-events')
      const hasCompletedOnboarding = localStorage.getItem('lusotown-onboarding-complete')

      let userJourney: GlobalUXState['currentUserJourney'] = 'discovery'
      let guidanceLevel: GlobalUXState['guidanceLevel'] = 'beginner'

      if (hasCompletedOnboarding) {
        userJourney = 'retention'
        guidanceLevel = 'advanced'
      } else if (hasProfile && hasAttendedEvent) {
        userJourney = 'engagement'
        guidanceLevel = 'intermediate'
      }

      setUXState({
        isFirstVisit: !localStorage.getItem('lusotown-has-visited'),
        hasCompletedOnboarding: !!hasCompletedOnboarding,
        currentUserJourney: userJourney,
        guidanceLevel: guidanceLevel,
        mobileOptimized: mobileOptimized
      })

      // Save mobile optimization preference
      localStorage.setItem('lusotown-mobile-optimized', mobileOptimized.toString())
      
    } catch (error) {
      console.error('Failed to initialize UX enhancement system:', error)
    }
  }, [])

  // Handle onboarding step completion events
  useEffect(() => {
    const handleOnboardingStep = (event: CustomEvent<{ step: string }>) => {
      const { step } = event.detail
      
      // Update local progress tracking
      const progressKey = `lusotown-onboarding-${step}-completed`
      localStorage.setItem(progressKey, 'true')
      
      // Check if all steps are completed
      const allSteps = ['profile', 'event', 'business', 'connection']
      const completedSteps = allSteps.filter(stepId => 
        localStorage.getItem(`lusotown-onboarding-${stepId}-completed`)
      )
      
      if (completedSteps.length === allSteps.length) {
        localStorage.setItem('lusotown-onboarding-complete', 'true')
        setUXState(prev => ({
          ...prev,
          hasCompletedOnboarding: true,
          currentUserJourney: 'retention',
          guidanceLevel: 'advanced'
        }))
      } else if (completedSteps.length >= 2) {
        setUXState(prev => ({
          ...prev,
          currentUserJourney: 'engagement',
          guidanceLevel: 'intermediate'
        }))
      }
    }

    window.addEventListener('lusotown-onboarding-step', handleOnboardingStep as EventListener)
    return () => {
      window.removeEventListener('lusotown-onboarding-step', handleOnboardingStep as EventListener)
    }
  }, [])

  // Mobile touch optimization
  useEffect(() => {
    if (!uxState.mobileOptimized) return

    // Add mobile-specific touch classes to body
    document.body.classList.add('mobile-optimized', 'touch-optimized')
    
    // Add Portuguese cultural theme classes
    document.body.classList.add('portuguese-theme', `lang-${language}`)
    
    // Add CSS custom properties for mobile touch targets
    document.documentElement.style.setProperty('--touch-target-size', '44px')
    document.documentElement.style.setProperty('--mobile-spacing', '16px')
    document.documentElement.style.setProperty('--mobile-border-radius', '12px')

    return () => {
      document.body.classList.remove(
        'mobile-optimized', 
        'touch-optimized', 
        'portuguese-theme',
        `lang-${language}`
      )
    }
  }, [uxState.mobileOptimized, language])

  // Progressive enhancement based on user journey
  const shouldShowWelcomeBanner = uxState.isFirstVisit && uxState.currentUserJourney === 'discovery'
  const shouldShowOnboardingChecklist = !uxState.hasCompletedOnboarding && 
    uxState.currentUserJourney !== 'retention'
  const shouldShowAdvancedGuidance = uxState.guidanceLevel === 'advanced'

  return (
    <TooltipProvider>
      <div className="global-ux-enhancement-wrapper">
        {/* Welcome Banner for First-Time Visitors */}
        {shouldShowWelcomeBanner && <WelcomeBanner />}
        
        {/* Main Content */}
        <div className={`
          main-content-wrapper
          ${shouldShowWelcomeBanner ? 'pt-20 md:pt-16' : ''}
          ${uxState.mobileOptimized ? 'mobile-optimized' : ''}
        `}>
          {children}
        </div>

        {/* Onboarding Checklist Sidebar */}
        {shouldShowOnboardingChecklist && <OnboardingChecklist />}
        
        {/* Global User Guidance System */}
        <GlobalUserGuidance />
        
        {/* Tooltip Renderer */}
        <TooltipRenderer />
        
        {/* Mobile UX Enhancement Styles */}
        <style jsx global>{`
          .mobile-optimized {
            touch-action: manipulation;
          }
          
          .mobile-optimized button,
          .mobile-optimized a,
          .mobile-optimized [role="button"] {
            min-height: var(--touch-target-size, 44px);
            min-width: var(--touch-target-size, 44px);
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
          }
          
          .portuguese-theme {
            --primary-color: #D4A574;
            --secondary-color: #8B4513;
            --accent-color: #228B22;
            --action-color: #DC143C;
          }
          
          .guidance-tooltip-wrapper {
            position: relative;
          }
          
          .guidance-tooltip-wrapper[data-tooltip-priority="high"] {
            z-index: 1000;
          }
          
          .guidance-tooltip-wrapper[data-tooltip-priority="medium"] {
            z-index: 999;
          }
          
          .guidance-tooltip-wrapper[data-tooltip-priority="low"] {
            z-index: 998;
          }
          
          /* Mobile-specific improvements */
          @media (max-width: 767px) {
            .mobile-optimized .text-sm {
              font-size: 0.9rem;
            }
            
            .mobile-optimized .text-xs {
              font-size: 0.8rem;
            }
            
            .mobile-optimized .p-2 {
              padding: 0.75rem;
            }
            
            .mobile-optimized .gap-2 {
              gap: 0.75rem;
            }
            
            .mobile-optimized .rounded-lg {
              border-radius: var(--mobile-border-radius, 12px);
            }
          }
          
          /* Accessibility improvements */
          @media (prefers-reduced-motion: reduce) {
            .guidance-tooltip-wrapper,
            .tooltip-renderer,
            .onboarding-checklist {
              transition: none !important;
              animation: none !important;
            }
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .guidance-tooltip-wrapper {
              border: 2px solid transparent;
            }
            
            .guidance-tooltip-wrapper:focus-within {
              border-color: currentColor;
            }
          }
        `}</style>
      </div>
    </TooltipProvider>
  )
}

// Export utility functions for external use
export const globalUXActions = {
  markUserAsExperienced: () => {
    localStorage.setItem('lusotown-user-experienced', 'true')
  },
  
  resetUserGuidance: () => {
    const keysToRemove = [
      'lusotown-has-visited',
      'lusotown-user-guidance',
      'lusotown-dismissed-tooltips',
      'lusotown-onboarding-progress',
      'lusotown-onboarding-complete'
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    window.location.reload()
  },
  
  triggerOnboardingStep: onboardingActions
}

// Hook for accessing UX enhancement state
export function useGlobalUX() {
  const [state, setState] = useState<GlobalUXState>({
    isFirstVisit: true,
    hasCompletedOnboarding: false,
    currentUserJourney: 'discovery',
    guidanceLevel: 'beginner',
    mobileOptimized: true
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompleted = localStorage.getItem('lusotown-onboarding-complete')
      const isFirst = !localStorage.getItem('lusotown-has-visited')
      
      setState({
        isFirstVisit: isFirst,
        hasCompletedOnboarding: !!hasCompleted,
        currentUserJourney: hasCompleted ? 'retention' : isFirst ? 'discovery' : 'engagement',
        guidanceLevel: hasCompleted ? 'advanced' : isFirst ? 'beginner' : 'intermediate',
        mobileOptimized: window.innerWidth < 768 || 'ontouchstart' in window
      })
    }
  }, [])

  return state
}