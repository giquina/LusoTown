'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { MembershipApplicationForm, MembershipApplicationData } from '@/components/membership/MembershipApplicationForm'
import { HeritageSelector } from '@/components/membership/HeritageSelector'
import { BusinessMarketSelector } from '@/components/membership/BusinessMarketSelector'
import { BuildingOfficeIcon, CheckCircleIcon, ClockIcon, UsersIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

interface BusinessMembershipFormProps {
  formData: MembershipApplicationData
  updateFormData: (updates: Partial<MembershipApplicationData>) => void
  errors: Record<string, string>
}

function BusinessMembershipForm({ formData, updateFormData, errors }: BusinessMembershipFormProps) {
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

      {/* Business Market Interests */}
      <BusinessMarketSelector
        selectedMarkets={formData.businessMarkets || []}
        onMarketsChange={(businessMarkets) => updateFormData({ businessMarkets })}
        maxSelection={6}
        required={true}
        error={errors.businessMarkets}
      />

      {/* Business Profile */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Your Business Profile <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Tell us about your professional background and business interests
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { value: 'entrepreneur', label: 'Entrepreneur / Business Owner', icon: '🚀' },
            { value: 'executive', label: 'C-Level Executive', icon: '👨‍💼' },
            { value: 'investor', label: 'Investor / Venture Capitalist', icon: '💰' },
            { value: 'consultant', label: 'Business Consultant', icon: '🎯' },
            { value: 'professional_services', label: 'Professional Services (Law, Finance, etc.)', icon: '⚖️' },
            { value: 'technology', label: 'Technology & Innovation', icon: '💻' },
            { value: 'import_export', label: 'Import/Export Trade', icon: '📦' },
            { value: 'real_estate', label: 'Real Estate & Property', icon: '🏢' },
            { value: 'hospitality', label: 'Hospitality & Tourism', icon: '🍽️' },
            { value: 'healthcare', label: 'Healthcare & Medical', icon: '🏥' },
            { value: 'education', label: 'Education & Training', icon: '🎓' },
            { value: 'creative', label: 'Creative Industries & Media', icon: '🎨' }
          ].map((profile) => {
            const profiles = formData.preferences || []
            const isSelected = profiles.includes(profile.value)
            
            return (
              <button
                key={profile.value}
                type="button"
                onClick={() => {
                  const newProfiles = isSelected
                    ? profiles.filter(p => p !== profile.value)
                    : [...profiles, profile.value]
                  updateFormData({ preferences: newProfiles })
                }}
                className={`
                  p-4 rounded-lg border text-left transition-colors
                  ${isSelected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-25'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{profile.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{profile.label}</div>
                  </div>
                  {isSelected && <CheckCircleIcon className="h-5 w-5 text-emerald-600" />}
                </div>
              </button>
            )
          })}
        </div>
        
        {formData.preferences && formData.preferences.length > 0 && (
          <div className="mt-4 text-sm text-emerald-600">
            {formData.preferences.length} profiles selected
          </div>
        )}
      </div>

      {/* Business Goals */}
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          What are your main business objectives with our network?
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select your primary goals for joining our business community
        </p>
        
        <div className="space-y-3">
          {[
            {
              value: 'market_expansion',
              title: 'Market Expansion',
              description: 'Expand business into Portuguese-speaking markets',
              icon: '🌍'
            },
            {
              value: 'networking',
              title: 'Professional Networking',
              description: 'Connect with other Portuguese business professionals',
              icon: '🤝'
            },
            {
              value: 'partnerships',
              title: 'Strategic Partnerships',
              description: 'Find business partners and collaboration opportunities',
              icon: '🤜🤛'
            },
            {
              value: 'investment',
              title: 'Investment Opportunities',
              description: 'Seek funding or find investment opportunities',
              icon: '💵'
            },
            {
              value: 'knowledge_sharing',
              title: 'Knowledge Sharing',
              description: 'Share expertise and learn from other professionals',
              icon: '🧠'
            },
            {
              value: 'market_insights',
              title: 'Market Insights',
              description: 'Access intelligence about Portuguese-speaking markets',
              icon: '📊'
            }
          ].map((goal) => {
            const businessGoals = formData.preferences || []
            const isSelected = businessGoals.includes(goal.value)
            
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => {
                  const newGoals = isSelected
                    ? businessGoals.filter(g => g !== goal.value)
                    : [...businessGoals, goal.value]
                  updateFormData({ preferences: newGoals })
                }}
                className={`
                  w-full p-4 rounded-lg border text-left transition-colors
                  ${isSelected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-25'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">{goal.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{goal.title}</div>
                    <div className="text-sm text-gray-600">{goal.description}</div>
                  </div>
                  {isSelected && <CheckCircleIcon className="h-6 w-6 text-emerald-600 mt-1" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name (Optional)
          </label>
          <input
            type="text"
            value={(formData as any).companyName || ''}
            onChange={(e) => updateFormData({ companyName: e.target.value } as any)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Your company or organization name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry / Sector
          </label>
          <select
            value={(formData as any).industry || ''}
            onChange={(e) => updateFormData({ industry: e.target.value } as any)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Select your industry...</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance & Banking</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="hospitality">Hospitality & Tourism</option>
            <option value="real_estate">Real Estate</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="consulting">Consulting</option>
            <option value="legal">Legal Services</option>
            <option value="marketing">Marketing & Advertising</option>
            <option value="construction">Construction</option>
            <option value="transportation">Transportation & Logistics</option>
            <option value="energy">Energy & Utilities</option>
            <option value="food_beverage">Food & Beverage</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default function BusinessMembershipPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved draft from localStorage
  const [initialData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('business-membership-draft')
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
      localStorage.setItem('business-membership-application', JSON.stringify(data))
      localStorage.removeItem('business-membership-draft')
      
      setShowSuccess(true)
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/membership-success?type=business')
      }, 3000)
      
    } catch (error) {
      console.error('Application submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = (data: MembershipApplicationData) => {
    localStorage.setItem('business-membership-draft', JSON.stringify({
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
            Thank you for applying to our business membership. We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
          <BuildingOfficeIcon className="h-10 w-10 text-emerald-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Join the UK's Premier Lusophone Business Network
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Access exclusive business opportunities across ALL Portuguese-speaking markets. 
          From PALOP emerging markets to Brazilian enterprises, Lusophone EU connections to global Lusophone trade.
        </p>

        {/* Business Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-primary-900 mb-2">Global Market Access</h3>
            <p className="text-sm text-gray-600">
              Direct connections to $2.5T+ combined GDP across Portuguese-speaking markets worldwide
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-primary-900 mb-2">Elite Business Network</h3>
            <p className="text-sm text-gray-600">
              Connect with C-level executives, investors, and entrepreneurs from Portuguese-speaking business community
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-primary-900 mb-2">Market Intelligence</h3>
            <p className="text-sm text-gray-600">
              Exclusive market insights, trade data, and business opportunities across Lusophone markets
            </p>
          </div>
        </div>

        {/* Market Opportunities */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-primary-900 mb-6">Market Opportunities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🇧🇷</div>
              <div className="font-semibold text-emerald-700">Brazil</div>
              <div className="text-sm text-gray-600">$2.1T Economy</div>
              <div className="text-xs text-emerald-600">215M Market</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <div className="font-semibold text-emerald-700">PALOP Nations</div>
              <div className="text-sm text-gray-600">$200B+ Combined</div>
              <div className="text-xs text-emerald-600">60M+ People</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🇵🇹</div>
              <div className="font-semibold text-emerald-700">Portugal</div>
              <div className="text-sm text-gray-600">$238B Economy</div>
              <div className="text-xs text-emerald-600">EU Gateway</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🇬🇧</div>
              <div className="font-semibold text-emerald-700">UK Diaspora</div>
              <div className="text-sm text-gray-600">500K+ Speakers</div>
              <div className="text-xs text-emerald-600">High Purchasing Power</div>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">850+</div>
            <div className="text-sm text-gray-600">Business Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">£125M+</div>
            <div className="text-sm text-gray-600">Deals Facilitated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">15+</div>
            <div className="text-sm text-gray-600">Countries Connected</div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <MembershipApplicationForm
        membershipType="business"
        initialData={initialData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
        submitButtonText="Apply for Business Membership"
      >
        <BusinessMembershipForm />
      </MembershipApplicationForm>

      {/* Business Services */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Exclusive Business Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <ChartBarIcon className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Market Research & Analytics</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive market analysis, competitor intelligence, and business opportunity reports across Portuguese-speaking markets.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <GlobeAltIcon className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">International Trade Facilitation</h4>
                  <p className="text-sm text-gray-600">
                    Connect with importers, exporters, distributors, and supply chain partners across Lusophone markets.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <UsersIcon className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Executive Networking Events</h4>
                  <p className="text-sm text-gray-600">
                    VIP business dinners, industry roundtables, investor meetups, and exclusive corporate partnerships.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <BuildingOfficeIcon className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Business Development Support</h4>
                  <p className="text-sm text-gray-600">
                    Strategic consulting, market entry guidance, partnership facilitation, and business expansion support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-emerald-600 text-xl mt-1">💰</span>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Investment & Funding Connections</h4>
                  <p className="text-sm text-gray-600">
                    Access to Portuguese-speaking investors, venture capitalists, and funding opportunities across global markets.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-emerald-600 text-xl mt-1">🎯</span>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">Cultural Business Intelligence</h4>
                  <p className="text-sm text-gray-600">
                    Navigate cultural nuances, business etiquette, and local practices for successful market penetration.
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