'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import WelcomeSystem from '@/components/WelcomeSystem'
import { useLanguage } from '@/context/LanguageContext'

export default function WelcomeDemoPage() {
  const { t } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  const handleShowPopup = () => {
    // Clear localStorage to ensure popup shows
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lusotown-welcome-seen')
      localStorage.removeItem('lusotown-welcome-skip-until')
      localStorage.removeItem('lusotown-show-banner')
    }
    setShowPopup(true)
  }

  const handleShowBanner = () => {
    // Set banner to show
    if (typeof window !== 'undefined') {
      localStorage.setItem('lusotown-show-banner', 'true')
    }
    setShowBanner(true)
  }

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lusotown-welcome-seen')
      localStorage.removeItem('lusotown-welcome-skip-until')
      localStorage.removeItem('lusotown-show-banner')
      localStorage.removeItem('lusotown-user-preferences')
    }
    setShowPopup(false)
    setShowBanner(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome System Component */}
      {showPopup && <WelcomeSystem />}
      {showBanner && <WelcomeSystem />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h1 className="text-3xl font-bold text-primary-900 mb-4">
              🌍 Welcome Popup Demo
            </h1>
            <p className="text-gray-700 mb-6">
              Test the new LusoTown welcome popup system with improved cultural inclusivity 
              and user experience.
            </p>

            {/* Demo Controls */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Demo Controls</h2>
                
                <button
                  onClick={handleShowPopup}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Show Welcome Popup
                </button>
                
                <button
                  onClick={handleShowBanner}
                  className="w-full bg-gradient-to-r from-accent-500 to-premium-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-accent-600 hover:to-premium-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Show Welcome Banner
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Reset All Preferences
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Features</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Culturally inclusive Portuguese-speaking message</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Flag flow animation (🇵🇹🇧🇷🇦🇴🇲🇿🇨🇻 → 🇬🇧)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Three clear user paths: Get Started, Explore First, Skip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Proper skip button positioning (top-right)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Country and interest-based routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>7-day skip memory functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Mobile responsive with accessibility features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>ESC key dismissal support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Information */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Implementation</h2>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Components Created:</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• <code>WelcomePopup.tsx</code> - Main popup with 3-step flow</li>
                    <li>• <code>WelcomePopupProvider.tsx</code> - Context provider</li>
                    <li>• <code>WelcomeBanner.tsx</code> - Top banner for "Explore First"</li>
                    <li>• <code>WelcomeSystem.tsx</code> - Integration component</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• localStorage preference management</li>
                    <li>• Smooth Framer Motion animations</li>
                    <li>• Portuguese brand color integration</li>
                    <li>• Bilingual EN/PT support</li>
                    <li>• Smart routing based on user preferences</li>
                    <li>• Community statistics display</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Usage Instructions:</h3>
              <p className="text-blue-800 text-sm">
                To integrate this system into your app, add <code className="bg-blue-200 px-1 rounded">
                &lt;WelcomeSystem /&gt;</code> to your layout or specific pages where you want the 
                welcome popup to appear for new users.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}