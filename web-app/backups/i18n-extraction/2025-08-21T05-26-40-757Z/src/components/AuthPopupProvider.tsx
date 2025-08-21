'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export type AuthPopupType = 'add-to-cart' | 'view-details' | null

interface AuthPopupContextType {
  showPopup: (type: AuthPopupType, intent?: AuthIntent) => void
  hidePopup: () => void
  currentPopup: AuthPopupType
  authIntent: AuthIntent | null
}

export interface AuthIntent {
  type: 'add-to-cart' | 'view-details'
  eventId?: string
  eventTitle?: string
  redirectPath?: string
  data?: any
}

const AuthPopupContext = createContext<AuthPopupContextType | undefined>(undefined)

export function AuthPopupProvider({ children }: { children: ReactNode }) {
  const [currentPopup, setCurrentPopup] = useState<AuthPopupType>(null)
  const [authIntent, setAuthIntent] = useState<AuthIntent | null>(null)
  
  const showPopup = useCallback((type: AuthPopupType, intent?: AuthIntent) => {
    // Don't show popup if user is already authenticated
    if (isAuthenticated()) {
      return
    }
    
    setCurrentPopup(type)
    setAuthIntent(intent || null)
  }, [])
  
  const hidePopup = useCallback(() => {
    setCurrentPopup(null)
    setAuthIntent(null)
  }, [])
  
  const contextValue = useMemo(() => ({
    showPopup,
    hidePopup,
    currentPopup,
    authIntent
  }), [showPopup, hidePopup, currentPopup, authIntent])
  
  return (
    <AuthPopupContext.Provider value={contextValue}>
      {children}
    </AuthPopupContext.Provider>
  )
}

export function useAuthPopup() {
  const context = useContext(AuthPopupContext)
  if (context === undefined) {
    throw new Error('useAuthPopup must be used within an AuthPopupProvider')
  }
  return context
}