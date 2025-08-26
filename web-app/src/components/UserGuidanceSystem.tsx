'use client'

import React, { createContext, useContext, ReactNode } from 'react'

// Beginner guidance system is fully disabled. This file keeps a minimal API to avoid breaking imports.

interface UserGuidanceContextType {
  isFirstTimeVisitor: boolean
  showGuidance: boolean
  currentStep: number
  completedSteps: string[]
  hideGuidance: () => void
  showGuidanceFor: (_section: string) => void
  markStepComplete: (_stepId: string) => void
  resetGuidance: () => void
}

const UserGuidanceContext = createContext<UserGuidanceContextType | null>(null)

export function UserGuidanceProvider({ children }: { children: ReactNode }) {
  const value: UserGuidanceContextType = {
    isFirstTimeVisitor: false,
    showGuidance: false,
    currentStep: 0,
    completedSteps: [],
    hideGuidance: () => {},
    showGuidanceFor: () => {},
    markStepComplete: () => {},
    resetGuidance: () => {},
  }
  return <UserGuidanceContext.Provider value={value}>{children}</UserGuidanceContext.Provider>
}

export function useUserGuidance() {
  const ctx = useContext(UserGuidanceContext)
  if (!ctx) throw new Error('useUserGuidance must be used within UserGuidanceProvider')
  return ctx
}

// UI stubs (render nothing)
export function WelcomeGuidanceBanner() { return null }
export function GuidedTour() { return null }
export function HelpTooltip({ children }: { content: string; position?: 'top' | 'bottom' | 'left' | 'right'; children: ReactNode }) { return <>{children}</> }
export function QuickHelpButton() { return null }
export function OnboardingChecklist() { return null }