'use client'

import WelcomePopup from './WelcomePopup'
import WelcomeBanner from './WelcomeBanner'
import { WelcomePopupProvider } from './WelcomePopupProvider'

/**
 * Complete Welcome System Integration
 * 
 * This component provides the complete welcome experience for new LusoTown users:
 * - Welcome popup with 3-step onboarding flow
 * - Country/heritage selection from all Portuguese-speaking nations
 * - Interest selection with routing to relevant pages
 * - Welcome banner for users who chose "Explore First"
 * - 7-day skip functionality
 * - localStorage persistence for user preferences
 */
export default function WelcomeSystem() {
  return (
    <WelcomePopupProvider>
      <WelcomePopup />
      <WelcomeBanner />
    </WelcomePopupProvider>
  )
}