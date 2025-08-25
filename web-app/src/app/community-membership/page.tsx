'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { MembershipApplicationForm, MembershipApplicationData } from '@/components/membership/MembershipApplicationForm'
import { HeritageSelector } from '@/components/membership/HeritageSelector'
import { CulturalInterestsPicker } from '@/components/membership/CulturalInterestsPicker'
import { UserGroupIcon, CheckCircleIcon, ClockIcon, UsersIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

interface CommunityMembershipFormProps {
  formData: MembershipApplicationData
  updateFormData: (updates: Partial<MembershipApplicationData>) => void
  errors: Record<string, string>
}

function CommunityMembershipForm({ formData, updateFormData, errors }: CommunityMembershipFormProps) {
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

      {/* Community Interests */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Community Interests <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          What aspects of the Portuguese-speaking community are you most interested in?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'PALOP heritage celebration and pride',
            'Brazilian cultural events and networking',
            'Portuguese traditions and customs',
            'Cape Verdean music and community',
            'Angolan business and culture',
            'Mozambican heritage events',
            'Cross-cultural Lusophone experiences',
            'Portuguese language preservation',
            'Second-generation community support',
            'Professional networking opportunities',
            'Youth mentorship and guidance',
            'Senior community support',
            'Family cultural education',
            'Community volunteer activities'
          ].map((interest) => {
            const interests = formData.preferences || []
            const isSelected = interests.includes(interest)
            
            return (
              <button
                key={interest}
                type="button"
                onClick={() => {
                  const newInterests = isSelected
                    ? interests.filter(i => i !== interest)
                    : [...interests, interest]
                  updateFormData({ preferences: newInterests })
                }}
                className={`
                  p-3 rounded-lg border text-left transition-colors text-sm
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {isSelected && <CheckCircleIcon className="h-4 w-4 text-blue-600" />}
                  <span>{interest}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        {formData.preferences && formData.preferences.length > 0 && (
          <div className="mt-4 text-sm text-blue-600">
            {formData.preferences.length} interests selected
          </div>
        )}
      </div>

      {/* Cultural Interests */}
      <CulturalInterestsPicker
        selectedInterests={formData.culturalInterests || []}
        onInterestsChange={(culturalInterests) => updateFormData({ culturalInterests })}
        maxSelection={8}
        required={false}
        error={errors.culturalInterests}
      />

      {/* Community Participation Level */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          How would you like to participate in the community?
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select your preferred level of community involvement
        </p>
        
        <div className="space-y-3">
          {[
            {
              value: 'active_volunteer',
              title: 'Active Volunteer',
              description: 'Help organize events, mentor newcomers, and contribute regularly',
              icon: '🙋‍♀️'
            },
            {
              value: 'regular_participant',
              title: 'Regular Participant',
              description: 'Attend events regularly and engage with community members',
              icon: '👥'
            },
            {
              value: 'occasional_member',
              title: 'Occasional Member',
              description: 'Join events when available and stay connected online',
              icon: '📱'
            },
            {
              value: 'supporter',
              title: 'Community Supporter',
              description: 'Support the community through donations and spreading awareness',
              icon: '💝'
            },
            {
              value: 'cultural_contributor',
              title: 'Cultural Contributor',
              description: 'Share cultural knowledge, teach traditions, or provide expert insights',
              icon: '🎭'
            }
          ].map((level) => {
            const participationLevel = formData.preferences || []
            const isSelected = participationLevel.includes(level.value)
            
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => {
                  // For participation level, allow only one selection
                  const newLevel = isSelected ? [] : [level.value]
                  updateFormData({ preferences: newLevel })
                }}
                className={`
                  w-full p-4 rounded-lg border text-left transition-colors
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">{level.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium mb-1">{level.title}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                  {isSelected && <CheckCircleIcon className="h-6 w-6 text-blue-600 mt-1" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function CommunityMembershipPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved draft from localStorage
  const [initialData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('community-membership-draft')
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
      localStorage.setItem('community-membership-application', JSON.stringify(data))
      localStorage.removeItem('community-membership-draft')
      
      setShowSuccess(true)
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/membership-success?type=community')
      }, 3000)
      
    } catch (error) {
      console.error('Application submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = (data: MembershipApplicationData) => {
    localStorage.setItem('community-membership-draft', JSON.stringify({
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
            Thank you for applying to our community membership. We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <UserGroupIcon className="h-10 w-10 text-blue-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Join the UK's Premier Portuguese-Speaking Community
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Connect with successful Portuguese speakers from across the global diaspora. 
          From London to Edinburgh, Manchester to Cardiff - unite with your community nationwide.
        </p>

        {/* Community Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-primary-900 mb-2">UK-Wide Network</h3>
            <p className="text-sm text-gray-600">
              Connect with Portuguese speakers across England, Scotland, Wales, and Northern Ireland
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-primary-900 mb-2">Mutual Support</h3>
            <p className="text-sm text-gray-600">
              Job opportunities, housing help, legal advice, and community support from fellow Portuguese speakers
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
            <div className="text-3xl mb-3">🎪</div>
            <h3 className="font-semibold text-primary-900 mb-2">Community Events</h3>
            <p className="text-sm text-gray-600">
              Regional meetups, cultural festivals, family events, and celebrations across all Portuguese-speaking nations
            </p>
          </div>
        </div>

        {/* Community Highlights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-primary-900 mb-6">Our Growing Community</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">25+</div>
              <div className="text-sm text-gray-600">UK Cities</div>
            </div>
            
            <div className="space-y-2">
              <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">2,150+</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            
            <div className="space-y-2">
              <CalendarDaysIcon className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-blue-600">120+</div>
              <div className="text-sm text-gray-600">Monthly Events</div>
            </div>
            
            <div className="space-y-2">
              <span className="text-2xl">🏆</span>
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Regional Presence */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Strong Presence Across the UK</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '🏴󠁧󠁢󠁥󠁮󠁧󠁿 London • Manchester • Birmingham • Leeds',
              '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Edinburgh • Glasgow • Aberdeen',
              '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cardiff • Swansea • Newport',
              '🇮🇪 Belfast • Derry/Londonderry'
            ].map((region, index) => (
              <span 
                key={index}
                className="inline-block bg-white px-4 py-2 rounded-full text-sm text-gray-700 border border-gray-200"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <MembershipApplicationForm
        membershipType="community"
        initialData={initialData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
        submitButtonText="Join Our Community"
      >
        <CommunityMembershipForm />
      </MembershipApplicationForm>

      {/* Community Values */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Our Community Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Inclusivity First</h4>
                  <p className="text-sm text-gray-600">
                    We welcome Portuguese speakers from ALL backgrounds - Portugal, Brazil, PALOP nations, mixed heritage, and language learners.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Cultural Celebration</h4>
                  <p className="text-sm text-gray-600">
                    Every Portuguese-speaking culture is honored and celebrated - from Fado to Samba, Kizomba to Morna.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Mutual Support</h4>
                  <p className="text-sm text-gray-600">
                    We help each other succeed in the UK - from job opportunities to housing, from legal advice to childcare.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Language Preservation</h4>
                  <p className="text-sm text-gray-600">
                    Protecting Portuguese language for future generations through education, events, and cultural transmission.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Next Generation</h4>
                  <p className="text-sm text-gray-600">
                    Supporting Portuguese heritage youth and second-generation community members in maintaining cultural connections.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">UK Integration</h4>
                  <p className="text-sm text-gray-600">
                    Helping Portuguese speakers thrive in British society while maintaining cultural identity and pride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}