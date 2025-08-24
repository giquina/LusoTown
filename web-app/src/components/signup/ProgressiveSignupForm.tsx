/**
 * Progressive Multi-Step Signup Form
 * Enhanced Portuguese community signup with dual-audience targeting
 */

"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  EnhancedSignupForm, 
  FormStep, 
  SIGNUP_STEPS,
  PrimaryInterest,
  BusinessInterest,
  SocialInterest,
  CulturalInterest,
  CulturalBadge,
  PortugueseOriginWithRegions,
  UKLocationExpanded
} from '@/types/enhanced-signup'
import CulturalFlagSelector from './CulturalFlagSelector'
import UKLocationSelector from './UKLocationSelector'
import CulturalBadgeSelector from './CulturalBadgeSelector'
import SuccessStoryRotator from './SuccessStoryRotator'
import PartnershipHighlight from './PartnershipHighlight'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SparklesIcon,
  BriefcaseIcon,
  HeartIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface ProgressiveSignupFormProps {
  initialData?: Partial<EnhancedSignupForm>
  onSubmit: (data: EnhancedSignupForm) => void
  onStepChange?: (step: number) => void
  className?: string
}

const PRIMARY_INTERESTS_OPTIONS: { value: PrimaryInterest; label: string; labelPt: string; icon: any; description: string }[] = [
  {
    value: 'business-networking',
    label: 'Business Networking',
    labelPt: 'Networking de Negócios',
    icon: BriefcaseIcon,
    description: 'Connect with Portuguese entrepreneurs and professionals'
  },
  {
    value: 'dating-romance',
    label: 'Dating & Romance',
    labelPt: 'Namoro e Romance',
    icon: HeartIcon,
    description: 'Find meaningful relationships within Portuguese culture'
  },
  {
    value: 'cultural-events',
    label: 'Cultural Events',
    labelPt: 'Eventos Culturais',
    icon: SparklesIcon,
    description: 'Experience authentic Portuguese cultural experiences'
  },
  {
    value: 'professional-development',
    label: 'Professional Development',
    labelPt: 'Desenvolvimento Profissional',
    icon: UserIcon,
    description: 'Advance your career through Portuguese connections'
  },
  {
    value: 'friendship-social',
    label: 'Friendship & Social',
    labelPt: 'Amizade e Social',
    icon: UserIcon,
    description: 'Build lasting friendships in the Portuguese community'
  },
  {
    value: 'dance-cultural-arts',
    label: 'Dance & Cultural Arts',
    labelPt: 'Dança e Artes Culturais',
    icon: SparklesIcon,
    description: 'Explore Portuguese dance, music, and artistic traditions'
  },
  {
    value: 'food-cultural-experiences',
    label: 'Food & Cultural Experiences',
    labelPt: 'Comida e Experiências Culturais',
    icon: SparklesIcon,
    description: 'Discover Portuguese cuisine and culinary traditions'
  }
]

export default function ProgressiveSignupForm({
  initialData = {},
  onSubmit,
  onStepChange,
  className = ""
}: ProgressiveSignupFormProps) {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<EnhancedSignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),
    primaryInterests: [],
    businessTrack: [],
    socialTrack: [],
    culturalTrack: [],
    portugueseOrigin: {
      country: 'portugal',
      region: undefined,
      culturalBackground: undefined
    },
    ukLocation: 'London',
    languagePreference: 'both',
    culturalVerificationBadges: [],
    culturalEvents: [],
    profileVisibility: 'both',
    eventNotifications: true,
    partnerEventInterest: false,
    ...initialData
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = SIGNUP_STEPS
  const currentStepData = steps[currentStep]

  useEffect(() => {
    onStepChange?.(currentStep)
  }, [currentStep, onStepChange])

  const updateFormData = (updates: Partial<EnhancedSignupForm>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear related errors
    const updatedFields = Object.keys(updates)
    setErrors(prev => {
      const newErrors = { ...prev }
      updatedFields.forEach(field => delete newErrors[field])
      return newErrors
    })
  }

  const validateStep = (stepIndex: number): boolean => {
    const stepData = steps[stepIndex]
    const newErrors: Record<string, string> = {}

    // Validation for each step
    switch (stepData.id) {
      case 'basic-info':
        if (!formData.firstName.trim()) {
          newErrors.firstName = t('validation.first-name-required', 'First name is required')
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = t('validation.last-name-required', 'Last name is required')
        }
        if (!formData.email.trim()) {
          newErrors.email = t('validation.email-required', 'Email is required')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t('validation.email-invalid', 'Please enter a valid email address')
        }
        break

      case 'cultural-background':
        if (!formData.portugueseOrigin.country) {
          newErrors.portugueseOrigin = t('validation.portuguese-origin-required', 'Please select your Portuguese origin')
        }
        if (!formData.ukLocation) {
          newErrors.ukLocation = t('validation.uk-location-required', 'Please select your UK location')
        }
        break

      case 'interests-goals':
        if (formData.primaryInterests.length === 0) {
          newErrors.primaryInterests = t('validation.primary-interests-required', 'Please select at least one primary interest')
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  const handleInterestToggle = (interest: PrimaryInterest) => {
    const currentInterests = formData.primaryInterests || []
    const isSelected = currentInterests.includes(interest)
    
    const newInterests = isSelected
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    updateFormData({ primaryInterests: newInterests })
  }

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'basic-info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="h-4 w-4 inline mr-2" />
                  {t('signup.first-name', 'First Name')}
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.firstName 
                      ? 'border-red-300 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-primary-400'
                  }`}
                  placeholder="João"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="h-4 w-4 inline mr-2" />
                  {t('signup.last-name', 'Last Name')}
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.lastName 
                      ? 'border-red-300 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-primary-400'
                  }`}
                  placeholder="Silva"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <EnvelopeIcon className="h-4 w-4 inline mr-2" />
                {t('signup.email', 'Email Address')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-400' 
                    : 'border-gray-300 focus:ring-primary-400'
                }`}
                placeholder="joao@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <PhoneIcon className="h-4 w-4 inline mr-2" />
                {t('signup.phone', 'Phone Number')} {language === 'pt' ? '(Opcional)' : '(Optional)'}
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="+44 7XXX XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 inline mr-2" />
                {t('signup.date-of-birth', 'Date of Birth')}
              </label>
              <input
                type="date"
                value={formData.dateOfBirth.toISOString().split('T')[0]}
                onChange={(e) => updateFormData({ dateOfBirth: new Date(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
            </div>
          </div>
        )

      case 'cultural-background':
        return (
          <div className="space-y-6">
            <CulturalFlagSelector
              value={formData.portugueseOrigin}
              onChange={(origin) => updateFormData({ portugueseOrigin: origin })}
              showRegions={true}
              showCulturalBackground={true}
            />
            {errors.portugueseOrigin && (
              <p className="text-sm text-red-600">{errors.portugueseOrigin}</p>
            )}

            <UKLocationSelector
              value={formData.ukLocation}
              onChange={(location) => updateFormData({ ukLocation: location })}
              showCommunitySize={true}
              showCulturalEvents={true}
            />
            {errors.ukLocation && (
              <p className="text-sm text-red-600">{errors.ukLocation}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('signup.language-preference', 'Language Preference')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'en', label: '🇬🇧 English', description: 'I prefer events in English' },
                  { value: 'pt', label: '🇵🇹 Português', description: 'I prefer events in Portuguese' },
                  { value: 'both', label: '🌍 Both', description: 'I\'m comfortable with both languages' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ languagePreference: option.value as any })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.languagePreference === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'interests-goals':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('signup.primary-interests', 'What brings you to LusoTown?')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRIMARY_INTERESTS_OPTIONS.map((option, index) => {
                  const isSelected = formData.primaryInterests.includes(option.value)
                  const IconComponent = option.icon
                  
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleInterestToggle(option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          isSelected 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {language === 'pt' ? option.labelPt : option.label}
                        </span>
                        {isSelected && (
                          <CheckIcon className="h-5 w-5 text-primary-500 ml-auto" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {option.description}
                      </p>
                    </motion.button>
                  )
                })}
              </div>
              {errors.primaryInterests && (
                <p className="mt-2 text-sm text-red-600">{errors.primaryInterests}</p>
              )}
            </div>

            {/* Partnership Highlights */}
            {(formData.primaryInterests.includes('dance-cultural-arts') || 
              formData.primaryInterests.includes('cultural-events')) && (
              <PartnershipHighlight
                partner="chocolate-kizomba"
                showFullDetails={false}
                onInterestToggle={(interested) => updateFormData({ partnerEventInterest: interested })}
              />
            )}
          </div>
        )

      case 'verification-preferences':
        return (
          <div className="space-y-6">
            <CulturalBadgeSelector
              badges={['business-owner-verified', 'single-culturally-connected', 'dance-community-member', 'language-exchange-leader']}
              selected={formData.culturalVerificationBadges || []}
              onSelectionChange={(badges) => updateFormData({ culturalVerificationBadges: badges })}
              showVerificationProcess={true}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('signup.profile-visibility', 'Profile Visibility')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'business', label: 'Business Only', description: 'Show only to business network' },
                  { value: 'social', label: 'Social Only', description: 'Show only to social connections' },
                  { value: 'both', label: 'Both Networks', description: 'Show to all community members' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ profileVisibility: option.value as any })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.profileVisibility === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eventNotifications"
                  checked={formData.eventNotifications}
                  onChange={(e) => updateFormData({ eventNotifications: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="eventNotifications" className="ml-3 text-sm text-gray-700">
                  {t('signup.event-notifications', 'Receive notifications about Portuguese cultural events')}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="partnerEventInterest"
                  checked={formData.partnerEventInterest}
                  onChange={(e) => updateFormData({ partnerEventInterest: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="partnerEventInterest" className="ml-3 text-sm text-gray-700">
                  {t('signup.partner-event-interest', 'I\'m interested in partner events (Chocolate Kizomba, Fado nights, etc.)')}
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('signup.step', 'Step')} {currentStep + 1} {t('signup.of', 'of')} {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% {t('signup.complete', 'complete')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
          >
            {/* Step Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">
                {currentStepData.subtitle}
              </p>
              {currentStepData.culturalContext && (
                <p className="text-sm text-primary-600 mt-2 font-medium">
                  {currentStepData.culturalContext}
                </p>
              )}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                {t('signup.back', 'Back')}
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                {currentStep === steps.length - 1 
                  ? t('signup.complete-signup', 'Complete Signup')
                  : t('signup.next', 'Next')
                }
                {currentStep < steps.length - 1 && (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Success Stories */}
          <SuccessStoryRotator
            filterByType={
              formData.primaryInterests.includes('business-networking') ? 'business' :
              formData.primaryInterests.includes('dating-romance') ? 'romance' :
              formData.primaryInterests.includes('cultural-events') ? 'cultural' :
              null
            }
            autoRotate={true}
            interval={10000}
            showControls={false}
          />

          {/* Step Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('signup.signup-progress', 'Signup Progress')}
            </h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    index === currentStep 
                      ? 'bg-primary-50 text-primary-700'
                      : index < currentStep
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === currentStep
                      ? 'bg-primary-500 text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index < currentStep ? (
                      <CheckIcon className="h-3 w-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}