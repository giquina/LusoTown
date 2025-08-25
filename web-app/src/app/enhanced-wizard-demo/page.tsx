'use client'

import { useState } from 'react'
import EnhancedMobileWelcomeWizard from '@/components/EnhancedMobileWelcomeWizard'
import { useLanguage } from '@/context/LanguageContext'
import LuxuryCard from '@/components/ui/LuxuryCard'

export default function EnhancedWizardDemo() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState<string>('')
  const { t } = useLanguage()

  const handleWizardComplete = (membershipId: string) => {
    setSelectedMembership(membershipId)
    setIsWizardOpen(false)
    console.log('Membership selected:', membershipId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Demo Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enhanced Mobile Welcome Wizard Demo
          </h1>
          <p className="text-lg text-gray-600">
            Experience the premium Lusophone community membership selection
          </p>
        </div>

        {/* Demo Controls */}
        <LuxuryCard className="mb-8 p-6 text-center">
          <button
            onClick={() => setIsWizardOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
          >
            Open Enhanced Welcome Wizard
          </button>
          
          {selectedMembership && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Selected Membership: <strong>{selectedMembership}</strong>
              </p>
              <button
                onClick={() => setSelectedMembership('')}
                className="mt-2 text-sm text-green-600 hover:text-green-800"
              >
                Clear Selection
              </button>
            </div>
          )}
        </LuxuryCard>

        {/* Features Overview */}
        <LuxuryCard className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Component Features
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• 4 Premium Lusophone membership options</li>
            <li>• Comprehensive Portuguese-speaking cultural focus</li>
            <li>• PALOP heritage celebration and recognition</li>
            <li>• Bilingual support (EN/PT) with translation system</li>
            <li>• Mobile-first responsive design</li>
            <li>• Luxury card components with premium styling</li>
            <li>• Framer Motion animations and interactions</li>
            <li>• Flag flow animation representing all Portuguese-speaking nations</li>
            <li>• ZERO hardcoding - uses configuration and translation systems</li>
            <li>• Proper error handling and loading states</li>
            <li>• LocalStorage persistence for selections</li>
            <li>• Accessibility compliant with ARIA labels</li>
          </ul>
        </LuxuryCard>

        {/* Membership Options Preview */}
        <LuxuryCard className="p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Membership Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎭</span>
                <span className="font-semibold text-purple-800">Cultural</span>
              </div>
              <p className="text-sm text-purple-600">
                Exclusive Lusophone cultural events and heritage celebrations
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💎</span>
                <span className="font-semibold text-red-800">Elite Connections</span>
              </div>
              <p className="text-sm text-red-600">
                Curated Portuguese-speaking community networking
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🤝</span>
                <span className="font-semibold text-green-800">Premium Community</span>
              </div>
              <p className="text-sm text-green-600">
                Access to global Lusophone diaspora network
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💼</span>
                <span className="font-semibold text-blue-800">Business Network</span>
              </div>
              <p className="text-sm text-blue-600">
                PALOP & Lusophone business opportunities across markets
              </p>
            </div>
          </div>
        </LuxuryCard>
      </div>

      {/* Enhanced Mobile Welcome Wizard */}
      <EnhancedMobileWelcomeWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleWizardComplete}
      />
    </div>
  )
}