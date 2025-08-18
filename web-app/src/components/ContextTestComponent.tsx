'use client'

import { useCart } from '@/context/CartContext'
import { useNetworking } from '@/context/NetworkingContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useLanguage } from '@/context/LanguageContext'

// Simple test component to verify context provider architecture
export default function ContextTestComponent() {
  const { cartItems } = useCart()
  const { connections } = useNetworking()
  const { hasActiveSubscription } = useSubscription()
  const { language } = useLanguage()
  const { isLoading } = usePlatformIntegration()

  return (
    <div className="hidden">
      {/* Context test - all hooks working */}
      Cart: {cartItems.length} | 
      Network: {connections.length} | 
      Subscription: {hasActiveSubscription ? 'Y' : 'N'} | 
      Language: {language} | 
      Platform: {isLoading ? 'Loading' : 'Ready'}
    </div>
  )
}