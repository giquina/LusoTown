'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { isAuthenticated } from '@/lib/auth'
import { toast } from 'react-hot-toast'
import type { AuthIntent } from '@/components/AuthPopupProvider'

/**
 * Hook to restore user intent after successful authentication
 * This should be used in the main layout or app component
 */
export function useAuthIntentRestore() {
  const router = useRouter()
  const { addToCart } = useCart()
  
  useEffect(() => {
    // Only run if user is authenticated
    if (!isAuthenticated()) return
    
    // Check for stored auth intent
    const storedIntent = localStorage.getItem('lusotown-auth-intent')
    if (!storedIntent) return
    
    try {
      const intent: AuthIntent = JSON.parse(storedIntent)
      
      // Clear the stored intent first
      localStorage.removeItem('lusotown-auth-intent')
      
      // Execute the intended action based on type
      switch (intent.type) {
        case 'add-to-cart':
          if (intent.data) {
            // Restore the add to cart action
            addToCart(intent.data)
            toast.success(
              intent.eventTitle 
                ? `Added "${intent.eventTitle}" to cart!` 
                : 'Item added to cart!',
              { icon: '🛒', duration: 3000 }
            )
          }
          break
          
        case 'view-details':
          if (intent.redirectPath) {
            // Redirect to the intended page
            router.push(intent.redirectPath)
          } else if (intent.eventId) {
            // Redirect to event details page
            router.push(`/events/${intent.eventId}`)
          }
          break
          
        default:
          console.warn('Unknown auth intent type:', intent.type)
      }
    } catch (error) {
      console.error('Error restoring auth intent:', error)
      // Clear corrupted data
      localStorage.removeItem('lusotown-auth-intent')
    }
  }, [router, addToCart])
}

/**
 * Helper function to store auth intent before redirecting to auth pages
 * This can be used in components that need to store intent before redirecting
 */
export function storeAuthIntent(intent: AuthIntent) {
  try {
    localStorage.setItem('lusotown-auth-intent', JSON.stringify(intent))
  } catch (error) {
    console.error('Error storing auth intent:', error)
  }
}

/**
 * Helper function to clear stored auth intent
 */
export function clearAuthIntent() {
  try {
    localStorage.removeItem('lusotown-auth-intent')
  } catch (error) {
    console.error('Error clearing auth intent:', error)
  }
}