'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'
import { 
  CheckCircleIcon, 
  UserCircleIcon, 
  CalendarDaysIcon, 
  BuildingStorefrontIcon,
  UserGroupIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

interface ChecklistStep {
  id: string
  titleKey: string
  descriptionKey: string
  icon: React.ComponentType<{ className?: string }>
  completed: boolean
  progress: number
  url?: string
}

interface OnboardingProgress {
  profileCompleted: boolean
  firstEventAttended: boolean
  businessDiscovered: boolean
  connectionMade: boolean
  overallProgress: number
  isVisible: boolean
  hasStarted: boolean
}

export default function OnboardingChecklist() {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState<OnboardingProgress>({
    profileCompleted: false,
    firstEventAttended: false,
    businessDiscovered: false,
    connectionMade: false,
    overallProgress: 0,
    isVisible: true,
    hasStarted: false
  })

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lusotown-onboarding-progress')
        if (saved) {
          const parsed = JSON.parse(saved) as OnboardingProgress
          setProgress(parsed)
          setIsVisible(parsed.isVisible && !isAllCompleted(parsed))
        } else {
          // First time user - show checklist
          setIsVisible(true)
          setProgress(prev => ({ ...prev, isVisible: true, hasStarted: true }))
        }
      } catch (error) {
        console.error('Failed to load onboarding progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: Partial<OnboardingProgress>) => {
    if (typeof window !== 'undefined') {
      try {
        const updated = { ...progress, ...newProgress }
        const calculatedProgress = calculateOverallProgress(updated)
        const finalProgress = { ...updated, overallProgress: calculatedProgress }
        
        setProgress(finalProgress)
        localStorage.setItem('lusotown-onboarding-progress', JSON.stringify(finalProgress))
      } catch (error) {
        console.error('Failed to save onboarding progress:', error)
      }
    }
  }, [progress])

  // Calculate overall progress
  const calculateOverallProgress = (progressData: OnboardingProgress): number => {
    const steps = [
      progressData.profileCompleted,
      progressData.firstEventAttended,
      progressData.businessDiscovered,
      progressData.connectionMade
    ]
    const completedSteps = steps.filter(Boolean).length
    return Math.round((completedSteps / steps.length) * 100)
  }

  // Check if all steps are completed
  const isAllCompleted = (progressData: OnboardingProgress): boolean => {
    return progressData.profileCompleted && 
           progressData.firstEventAttended && 
           progressData.businessDiscovered && 
           progressData.connectionMade
  }

  // Define checklist steps
  const checklistSteps: ChecklistStep[] = [
    {
      id: 'profile',
      titleKey: 'onboarding.checklist.profile',
      descriptionKey: 'onboarding.checklist.profile_desc',
      icon: UserCircleIcon,
      completed: progress.profileCompleted,
      progress: progress.profileCompleted ? 100 : 0,
      url: '/profile/edit'
    },
    {
      id: 'event',
      titleKey: 'onboarding.checklist.event',
      descriptionKey: 'onboarding.checklist.event_desc',
      icon: CalendarDaysIcon,
      completed: progress.firstEventAttended,
      progress: progress.firstEventAttended ? 100 : 0,
      url: '/events'
    },
    {
      id: 'business',
      titleKey: 'onboarding.checklist.business',
      descriptionKey: 'onboarding.checklist.business_desc',
      icon: BuildingStorefrontIcon,
      completed: progress.businessDiscovered,
      progress: progress.businessDiscovered ? 100 : 0,
      url: '/business-directory'
    },
    {
      id: 'connection',
      titleKey: 'onboarding.checklist.connection',
      descriptionKey: 'onboarding.checklist.connection_desc',
      icon: UserGroupIcon,
      completed: progress.connectionMade,
      progress: progress.connectionMade ? 100 : 0,
      url: '/matches'
    }
  ]

  // Handle step click
  const handleStepClick = (step: ChecklistStep) => {
    if (step.url) {
      window.location.href = step.url
    }
  }

  // Handle dismiss
  const handleDismiss = () => {
    saveProgress({ isVisible: false })
    setIsVisible(false)
  }

  // Handle collapse toggle
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Mock functions to mark steps as completed (would be called by actual user actions)
  const markStepCompleted = useCallback((stepId: string) => {
    const updates: Partial<OnboardingProgress> = {}
    
    switch (stepId) {
      case 'profile':
        updates.profileCompleted = true
        break
      case 'event':
        updates.firstEventAttended = true
        break
      case 'business':
        updates.businessDiscovered = true
        break
      case 'connection':
        updates.connectionMade = true
        break
    }
    
    saveProgress(updates)
  }, [saveProgress])

  // Don't render if not visible or all completed
  if (!isVisible || isAllCompleted(progress)) {
    return null
  }

  const completedCount = checklistSteps.filter(step => step.completed).length
  const totalCount = checklistSteps.length

  return (
    <div
      className={`
        fixed right-4 top-1/2 -translate-y-1/2 z-30
        w-80 max-w-[calc(100vw-2rem)]
        transition-all duration-300 ease-out
        ${isCollapsed ? 'transform translate-x-72' : ''}
      `}
      style={{
        '--portuguese-gold': PORTUGUESE_COLORS.gold[500],
        '--portuguese-gold-50': PORTUGUESE_COLORS.gold[50],
        '--portuguese-brown': PORTUGUESE_COLORS.brown[700],
        '--portuguese-shadow': DESIGN_TOKENS.shadows.portuguese
      } as React.CSSProperties}
    >
      <div className="
        bg-white border-2 border-[var(--portuguese-gold)]
        rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-95
        overflow-hidden
      ">
        {/* Header */}
        <div className="
          bg-gradient-to-r from-[var(--portuguese-gold)] to-[var(--portuguese-brown)]
          text-white p-4 relative
        ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t('onboarding.checklist.title')}
                </h3>
                <p className="text-sm opacity-90">
                  {t('onboarding.checklist.progress', { 
                    completed: completedCount, 
                    total: totalCount 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleCollapse}
                className="
                  p-2 rounded-lg hover:bg-white/20 transition-colors
                  min-h-[44px] min-w-[44px] flex items-center justify-center
                  touch-manipulation
                "
                aria-label={isCollapsed ? 'Expand checklist' : 'Collapse checklist'}
              >
                {isCollapsed ? 
                  <ChevronLeftIcon className="w-5 h-5" /> : 
                  <ChevronRightIcon className="w-5 h-5" />
                }
              </button>
              
              <button
                onClick={handleDismiss}
                className="
                  p-2 rounded-lg hover:bg-white/20 transition-colors
                  min-h-[44px] min-w-[44px] flex items-center justify-center
                  touch-manipulation
                "
                aria-label="Dismiss checklist"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500 ease-out"
                style={{ width: `${progress.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        {!isCollapsed && (
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              {t('onboarding.checklist.subtitle')}
            </p>

            {checklistSteps.map((step, index) => {
              const IconComponent = step.completed ? CheckCircleIconSolid : step.icon
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  className={`
                    w-full text-left p-3 rounded-xl transition-all duration-200
                    border-2 group hover:scale-102
                    min-h-[60px] flex items-center gap-4
                    touch-manipulation
                    ${step.completed 
                      ? 'bg-green-50 border-green-200 hover:border-green-300' 
                      : 'bg-[var(--portuguese-gold-50)] border-[var(--portuguese-gold)] hover:border-[var(--portuguese-brown)] hover:bg-[var(--portuguese-gold-50)]'
                    }
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 p-2 rounded-lg transition-colors
                    ${step.completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-[var(--portuguese-gold)] text-white'
                    }
                  `}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`
                        font-medium text-sm
                        ${step.completed ? 'text-green-800' : 'text-[var(--portuguese-brown)]'}
                      `}>
                        {t(step.titleKey)}
                      </h4>
                      {step.completed && (
                        <CheckCircleIconSolid className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className={`
                      text-xs mt-1
                      ${step.completed ? 'text-green-600' : 'text-gray-600'}
                    `}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRightIcon className={`
                    w-4 h-4 transition-transform group-hover:translate-x-1
                    ${step.completed ? 'text-green-500' : 'text-[var(--portuguese-gold)]'}
                  `} />
                </button>
              )
            })}

            {/* Completion message */}
            {completedCount === totalCount && (
              <div className="
                bg-gradient-to-r from-green-50 to-emerald-50 
                border-2 border-green-200 rounded-xl p-4 text-center
              ">
                <SparklesIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-800 mb-1">
                  {t('onboarding.checklist.complete')}
                </h4>
                <p className="text-sm text-green-600">
                  {t('onboarding.checklist.complete_desc')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Export functions for external components to mark steps as completed
export const onboardingActions = {
  markProfileCompleted: () => {
    const event = new CustomEvent('lusotown-onboarding-step', { 
      detail: { step: 'profile' } 
    })
    window.dispatchEvent(event)
  },
  markEventAttended: () => {
    const event = new CustomEvent('lusotown-onboarding-step', { 
      detail: { step: 'event' } 
    })
    window.dispatchEvent(event)
  },
  markBusinessDiscovered: () => {
    const event = new CustomEvent('lusotown-onboarding-step', { 
      detail: { step: 'business' } 
    })
    window.dispatchEvent(event)
  },
  markConnectionMade: () => {
    const event = new CustomEvent('lusotown-onboarding-step', { 
      detail: { step: 'connection' } 
    })
    window.dispatchEvent(event)
  }
}