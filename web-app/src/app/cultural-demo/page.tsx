'use client'

import { useState } from 'react'
import PortugueseCulturalPreferences from '@/components/profile/PortugueseCulturalPreferences'

export default function CulturalDemoPage() {
  const [culturalData, setCulturalData] = useState({
    origins: [],
    language_preference: '',
    cultural_celebrations: [],
    professional_goals: [],
    cultural_values: {},
    lifestyle_preferences: []
  })

  const handleSave = async () => {
    console.log('Cultural preferences saved:', culturalData)
    alert('Cultural preferences saved! (Demo only - check console for data)')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container-width py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Portuguese Cultural Preferences Demo
            </h1>
            <p className="text-lg text-gray-600">
              Interactive demo of the Portuguese cultural background component for LusoTown profiles
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <PortugueseCulturalPreferences
              initialData={culturalData}
              onChange={setCulturalData}
              onSave={handleSave}
              saving={false}
              showCompletion={true}
            />
          </div>

          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Form Data:</h3>
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify(culturalData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}