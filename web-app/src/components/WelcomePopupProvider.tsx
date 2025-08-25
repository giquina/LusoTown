'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface WelcomePopupContextType {
  isVisible: boolean
  showWelcomePopup: () => void
  hideWelcomePopup: () => void
  shouldShowBanner: boolean
  dismissBanner: () => void
}

const WelcomePopupContext = createContext<WelcomePopupContextType | undefined>(undefined)

interface WelcomePopupProviderProps {
  children: ReactNode
}

export function WelcomePopupProvider({ children }: WelcomePopupProviderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldShowBanner, setShouldShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check welcome popup and banner state on mount
  useEffect(() => {
    if (!mounted) return

    if (typeof window !== 'undefined') {
      const hasSeenWelcome = localStorage.getItem('lusotown-welcome-seen')
      const skipUntil = localStorage.getItem('lusotown-welcome-skip-until')
      const showBanner = localStorage.getItem('lusotown-show-banner')
      
      // Show welcome popup if user hasn't seen it and skip period hasn't expired
      if (!hasSeenWelcome && (!skipUntil || new Date().getTime() > parseInt(skipUntil))) {
        setIsVisible(true)
      }
      
      // Show banner if user chose "Explore First"
      if (showBanner === 'true' && !hasSeenWelcome) {
        setShouldShowBanner(true)
      }
    }
  }, [mounted])

  const showWelcomePopup = useCallback(() => {
    setIsVisible(true)
  }, [])

  const hideWelcomePopup = useCallback(() => {
    setIsVisible(false)
  }, [])

  const dismissBanner = useCallback(() => {
    setShouldShowBanner(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lusotown-welcome-seen', 'true')
      localStorage.removeItem('lusotown-show-banner')
    }
  }, [])

  const contextValue: WelcomePopupContextType = {
    isVisible,
    showWelcomePopup,
    hideWelcomePopup,
    shouldShowBanner,
    dismissBanner
  }

  return (
    <WelcomePopupContext.Provider value={contextValue}>
      {children}
    </WelcomePopupContext.Provider>
  )
}

export function useWelcomePopup() {
  const context = useContext(WelcomePopupContext)
  if (context === undefined) {
    throw new Error('useWelcomePopup must be used within a WelcomePopupProvider')
  }
  return context
}