'use client'

import { useCallback } from 'react'
import { isAuthenticated } from '@/lib/auth'
import { useAuthPopup, type AuthIntent } from '@/components/AuthPopupProvider'

/**
 * Hook for handling authentication-required actions
 * Returns a function that either executes the action (if authenticated) 
 * or shows the appropriate auth popup (if not authenticated)
 */
export function useAuthRequired() {
  const { showPopup } = useAuthPopup()
  
  const requireAuth = useCallback((
    action: () => void,
    popupType: 'add-to-cart' | 'view-details',
    intent?: Partial<AuthIntent>
  ) => {
    if (isAuthenticated()) {
      // User is authenticated, execute the action
      action()
    } else {
      // User is not authenticated, show popup
      showPopup(popupType, {
        type: popupType,
        ...intent
      })
    }
  }, [showPopup])
  
  /**
   * Specifically for add to cart actions
   */
  const requireAuthForCart = useCallback((
    addToCartAction: () => void,
    eventId?: string,
    eventTitle?: string,
    cartItemData?: any
  ) => {
    requireAuth(addToCartAction, 'add-to-cart', {
      eventId,
      eventTitle,
      data: cartItemData
    })
  }, [requireAuth])
  
  /**
   * Specifically for view details actions
   */
  const requireAuthForDetails = useCallback((
    viewDetailsAction: () => void,
    eventId?: string,
    redirectPath?: string
  ) => {
    requireAuth(viewDetailsAction, 'view-details', {
      eventId,
      redirectPath
    })
  }, [requireAuth])
  
  return {
    requireAuth,
    requireAuthForCart,
    requireAuthForDetails,
    isAuthenticated: isAuthenticated()
  }
}