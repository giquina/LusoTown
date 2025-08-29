'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'

interface ProfileCreationWizardProps {
  onComplete?: () => void
}

export default function ProfileCreationWizard({ onComplete }: ProfileCreationWizardProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    heritage: '',
    interests: [],
    location: ''
  })

  const steps = [
    {
      id: 1,
      title: t('profile.wizard.step1.title') || 'Basic Information',
      description: t('profile.wizard.step1.description') || 'Tell us about yourself'
    },
    {
      id: 2,
      title: t('profile.wizard.step2.title') || 'Cultural Heritage',
      description: t('profile.wizard.step2.description') || 'Share your Portuguese-speaking background'
    },
    {
      id: 3,
      title: t('profile.wizard.step3.title') || 'Interests & Goals',
      description: t('profile.wizard.step3.description') || 'What brings you to the community?'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('profile.wizard.title') || 'Complete Your Profile'}
        </h1>
        <p className="text-gray-600">
          {t('profile.wizard.subtitle') || 'Join the Portuguese-speaking community in the UK'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{t('profile.wizard.step')} {currentStep} {t('profile.wizard.of')} {steps.length}</span>
          <span>{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentStep / steps.length) * 100}%`,
              backgroundColor: colors.primary 
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-gray-600 mb-6">
          {steps[currentStep - 1].description}
        </p>

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.wizard.name') || 'Full Name'}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.wizard.location') || 'Location in UK'}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.wizard.heritage') || 'Portuguese-speaking Heritage'}
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.heritage}
                onChange={(e) => setFormData({ ...formData, heritage: e.target.value })}
              >
                <option value="">Select your heritage</option>
                <option value="portugal">Portugal</option>
                <option value="brazil">Brazil</option>
                <option value="cape-verde">Cape Verde</option>
                <option value="angola">Angola</option>
                <option value="mozambique">Mozambique</option>
                <option value="guinea-bissau">Guinea-Bissau</option>
                <option value="sao-tome">São Tomé and Príncipe</option>
                <option value="east-timor">East Timor</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.wizard.interests') || 'Community Interests'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Events', 'Business', 'Students', 'Culture', 'Food', 'Music'].map((interest) => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ 
                            ...formData, 
                            interests: [...formData.interests, interest] 
                          })
                        } else {
                          setFormData({
                            ...formData,
                            interests: formData.interests.filter(i => i !== interest)
                          })
                        }
                      }}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-md ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('profile.wizard.previous') || 'Previous'}
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-md text-white"
          style={{ backgroundColor: colors.primary }}
        >
          {currentStep === steps.length 
            ? t('profile.wizard.complete') || 'Complete Profile'
            : t('profile.wizard.next') || 'Next'
          }
        </button>
      </div>
    </div>
  )
}