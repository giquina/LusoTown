'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { MembershipApplicationForm, MembershipApplicationData } from '@/components/membership/MembershipApplicationForm'
import { HeritageSelector } from '@/components/membership/HeritageSelector'
import { CulturalInterestsPicker } from '@/components/membership/CulturalInterestsPicker'
import { SparklesIcon, CheckCircleIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline'

interface CulturalMembershipFormProps {
  formData: MembershipApplicationData
  updateFormData: (updates: Partial<MembershipApplicationData>) => void
  errors: Record<string, string>
}

function CulturalMembershipForm({ formData, updateFormData, errors }: CulturalMembershipFormProps) {
  return (
    <div className="space-y-8">
      {/* Heritage Selection */}
      <HeritageSelector
        selectedHeritage={formData.heritage || []}
        onHeritageChange={(heritage) => updateFormData({ heritage })}
        required={true}
        multiSelect={true}
        placeholder="Select your Portuguese heritage background..."
        error={errors.heritage}
      />

      {/* Cultural Interests */}
      <CulturalInterestsPicker
        selectedInterests={formData.culturalInterests || []}
        onInterestsChange={(culturalInterests) => updateFormData({ culturalInterests })}
        maxSelection={8}
        required={false}
        error={errors.culturalInterests}
      />

      {/* Cultural Participation Preferences */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Cultural Participation Preferences
        </label>
        <p className="text-sm text-gray-600 mb-4">
          How would you like to engage with Portuguese culture in our community?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Host cultural dinners and gatherings',
            'Participate in traditional festivals',
            'Join Portuguese language circles',
            'Attend Fado and music events',
            'Cultural education and workshops',
            'Portuguese literary discussions',
            'Traditional dance and arts',
            'Regional cuisine experiences',
            'Heritage preservation activities',
            'Mentoring Portuguese youth'
          ].map((preference) => {
            const preferences = formData.preferences || []
            const isSelected = preferences.includes(preference)
            
            return (
              <button
                key={preference}
                type="button"
                onClick={() => {
                  const newPreferences = isSelected
                    ? preferences.filter(p => p !== preference)
                    : [...preferences, preference]
                  updateFormData({ preferences: newPreferences })
                }}
                className={`
                  p-3 rounded-lg border text-left transition-colors text-sm
                  ${isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {isSelected && <CheckCircleIcon className="h-4 w-4 text-primary-600" />}
                  <span>{preference}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        {formData.preferences && formData.preferences.length > 0 && (
          <div className="mt-4 text-sm text-primary-600">
            {formData.preferences.length} preferences selected
          </div>
        )}
      </div>
    </div>
  )
}

export default function CulturalMembershipPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved draft from localStorage
  const [initialData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cultural-membership-draft')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const handleSubmit = async (data: MembershipApplicationData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save application to localStorage for now
      localStorage.setItem('cultural-membership-application', JSON.stringify(data))
      localStorage.removeItem('cultural-membership-draft')
      
      setShowSuccess(true)
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/membership-success?type=cultural')
      }, 3000)
      
    } catch (error) {
      console.error('Application submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = (data: MembershipApplicationData) => {
    localStorage.setItem('cultural-membership-draft', JSON.stringify({
      ...data,
      lastSaved: new Date().toISOString()
    }))
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to our cultural membership. We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
          <SparklesIcon className="h-10 w-10 text-primary-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Join London's Most Exclusive Portuguese-Speaking Cultural Circle
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Whether you're from Portugal, Brazil, Angola, Cape Verde, Mozambique, or any Portuguese-speaking nation - 
          celebrate ALL Lusophone cultures in London's premier cultural community
        </p>

        {/* Cultural Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-primary-100">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="font-semibold text-primary-900 mb-2">Exclusive Cultural Events</h3>
            <p className="text-sm text-gray-600">
              Private Fado nights, Brazilian cultural celebrations, PALOP heritage festivals, and intimate Portuguese gatherings
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-primary-100">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-primary-900 mb-2">Lusophone Heritage Network</h3>
            <p className="text-sm text-gray-600">
              Connect with Portuguese speakers from all backgrounds - Portugal, Brazil, Angola, Cape Verde, Mozambique, and beyond
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-primary-100">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-primary-900 mb-2">Cultural Preservation</h3>
            <p className="text-sm text-gray-600">
              Participate in preserving and celebrating Portuguese cultural traditions across all diaspora communities
            </p>
          </div>
        </div>

        {/* Membership Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">350+</div>
            <div className="text-sm text-gray-600">Cultural Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">15+</div>
            <div className="text-sm text-gray-600">Heritage Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">50+</div>
            <div className="text-sm text-gray-600">Events Yearly</div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <MembershipApplicationForm
        membershipType="cultural"
        initialData={initialData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
        submitButtonText="Apply for Cultural Membership"
      >
        <CulturalMembershipForm />
      </MembershipApplicationForm>

      {/* Application Process */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Application Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">Submit Application</h3>
              <p className="text-sm text-gray-600">
                Complete your cultural membership application with heritage details and interests
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <ClockIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">Review Process</h3>
              <p className="text-sm text-gray-600">
                Our cultural committee reviews applications within 2-3 business days
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <UsersIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">Welcome to Community</h3>
              <p className="text-sm text-gray-600">
                Join exclusive cultural events and connect with Portuguese heritage community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}