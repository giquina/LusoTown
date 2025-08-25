'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { MembershipApplicationForm, MembershipApplicationData } from '@/components/membership/MembershipApplicationForm'
import { HeritageSelector } from '@/components/membership/HeritageSelector'
import { CulturalInterestsPicker } from '@/components/membership/CulturalInterestsPicker'
import { HeartIcon, CheckCircleIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline'

interface SocialMembershipFormProps {
  formData: MembershipApplicationData
  updateFormData: (updates: Partial<MembershipApplicationData>) => void
  errors: Record<string, string>
}

function SocialMembershipForm({ formData, updateFormData, errors }: SocialMembershipFormProps) {
  return (
    <div className="space-y-8">
      {/* Heritage Selection */}
      <HeritageSelector
        selectedHeritage={formData.heritage || []}
        onHeritageChange={(heritage) => updateFormData({ heritage })}
        required={false}
        multiSelect={true}
        placeholder="Select your Portuguese heritage background (optional)..."
        error={errors.heritage}
      />

      {/* Heritage Preferences for Dating */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Heritage Preferences for Dating (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-4">
          What Portuguese-speaking backgrounds are you interested in connecting with?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Open to all Portuguese-speaking backgrounds',
            'Specific PALOP heritage preferred (Angola, Cape Verde, etc.)',
            'Brazilian culture preferred',
            'Portuguese heritage preferred',
            'Mixed/multicultural preferred',
            'Language connection most important',
            'Cultural authenticity important',
            'Second-generation Portuguese-speakers',
            'Recent Portuguese emigrants',
            'Portuguese language learners'
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
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-25'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {isSelected && <CheckCircleIcon className="h-4 w-4 text-rose-600" />}
                  <span>{preference}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        {formData.preferences && formData.preferences.length > 0 && (
          <div className="mt-4 text-sm text-rose-600">
            {formData.preferences.length} preferences selected
          </div>
        )}
      </div>

      {/* Cultural Interests */}
      <CulturalInterestsPicker
        selectedInterests={formData.culturalInterests || []}
        onInterestsChange={(culturalInterests) => updateFormData({ culturalInterests })}
        maxSelection={6}
        required={false}
        error={errors.culturalInterests}
      />

      {/* Relationship Goals */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          What are you looking for?
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Tell us about your relationship goals and interests
        </p>
        
        <div className="space-y-3">
          {[
            { value: 'serious_relationship', label: 'Serious long-term relationship', icon: '💍' },
            { value: 'casual_dating', label: 'Casual dating and getting to know people', icon: '☕' },
            { value: 'portuguese_connection', label: 'Connection with Portuguese heritage', icon: '🇵🇹' },
            { value: 'cultural_companion', label: 'Cultural events companion', icon: '🎭' },
            { value: 'language_partner', label: 'Portuguese language practice partner', icon: '🗣️' },
            { value: 'activity_partner', label: 'Activity and adventure partner', icon: '🌟' }
          ].map((goal) => {
            const relationshipGoals = formData.preferences || []
            const isSelected = relationshipGoals.includes(goal.value)
            
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => {
                  const newGoals = isSelected
                    ? relationshipGoals.filter(g => g !== goal.value)
                    : [...relationshipGoals, goal.value]
                  updateFormData({ preferences: newGoals })
                }}
                className={`
                  w-full p-4 rounded-lg border text-left transition-colors
                  ${isSelected
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-25'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{goal.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{goal.label}</div>
                  </div>
                  {isSelected && <CheckCircleIcon className="h-5 w-5 text-rose-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function SocialMembershipPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved draft from localStorage
  const [initialData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('social-membership-draft')
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
      localStorage.setItem('social-membership-application', JSON.stringify(data))
      localStorage.removeItem('social-membership-draft')
      
      setShowSuccess(true)
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/membership-success?type=social')
      }, 3000)
      
    } catch (error) {
      console.error('Application submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = (data: MembershipApplicationData) => {
    localStorage.setItem('social-membership-draft', JSON.stringify({
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
            Thank you for applying to our social membership. We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
          <HeartIcon className="h-10 w-10 text-rose-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Join Elite Lusophone Dating Community
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Meet accomplished Portuguese speakers from all backgrounds - Brazil, Angola, Portugal, Cape Verde, 
          Mozambique, and beyond. Connect with people who share your cultural passion and values.
        </p>

        {/* Social Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-100">
            <div className="text-3xl mb-3">💕</div>
            <h3 className="font-semibold text-primary-900 mb-2">Cultural Compatibility</h3>
            <p className="text-sm text-gray-600">
              AI-powered matching based on Portuguese heritage, cultural interests, and shared values across all Lusophone backgrounds
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-100">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-semibold text-primary-900 mb-2">Elite Community</h3>
            <p className="text-sm text-gray-600">
              Connect with successful professionals, entrepreneurs, and accomplished Portuguese speakers across the UK
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-100">
            <div className="text-3xl mb-3">🎉</div>
            <h3 className="font-semibold text-primary-900 mb-2">Exclusive Social Events</h3>
            <p className="text-sm text-gray-600">
              VIP dating events, cultural mixers, Portuguese wine tastings, and intimate social gatherings
            </p>
          </div>
        </div>

        {/* Success Stories Teaser */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-6 mb-12">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="text-sm italic text-gray-700">
              "I found my soulmate through LusoTown's social community. We bonded over our shared love for Brazilian music and Portuguese poetry. Six months later, we're planning our wedding!" 
              <footer className="mt-2 text-rose-600 font-medium">— Ana & Carlos, London</footer>
            </blockquote>
            <blockquote className="text-sm italic text-gray-700">
              "As a Cape Verdean-Portuguese mixed heritage person, I struggled to find someone who understood both cultures. LusoTown connected me with amazing people who celebrate all sides of Portuguese identity."
              <footer className="mt-2 text-rose-600 font-medium">— Maria, Manchester</footer>
            </blockquote>
          </div>
        </div>

        {/* Membership Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-rose-600">420+</div>
            <div className="text-sm text-gray-600">Singles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">89%</div>
            <div className="text-sm text-gray-600">Match Success</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">65+</div>
            <div className="text-sm text-gray-600">Couples Connected</div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <MembershipApplicationForm
        membershipType="social"
        initialData={initialData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
        submitButtonText="Apply for Social Membership"
      >
        <SocialMembershipForm />
      </MembershipApplicationForm>

      {/* Safety & Privacy Notice */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-rose-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Your Safety & Privacy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Verified Profiles</h4>
                  <p className="text-sm text-gray-600">All members go through our verification process</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Privacy Protection</h4>
                  <p className="text-sm text-gray-600">Your information is never shared without consent</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Safe Environment</h4>
                  <p className="text-sm text-gray-600">Curated community with strict behavioral standards</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Professional Moderation</h4>
                  <p className="text-sm text-gray-600">24/7 community support and safety monitoring</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Exclusive Access</h4>
                  <p className="text-sm text-gray-600">Members-only events and interactions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-rose-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-900">Cultural Respect</h4>
                  <p className="text-sm text-gray-600">Community guidelines that honor Portuguese heritage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}