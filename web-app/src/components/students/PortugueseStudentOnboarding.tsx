'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  MapPinIcon,
  UsersIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  GlobeEuropeAfricaIcon,
  BookOpenIcon,
  HeartIcon,
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CurrencyPoundIcon,
  PhoneIcon,
  EnvelopeIcon,
  FlagIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleIconSolid,
  AcademicCapIcon as AcademicCapIconSolid
} from '@heroicons/react/24/solid'
import { UNIVERSITY_PARTNERSHIPS, getUniversityById } from '@/config/universities'

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
  completed: boolean
  required: boolean
}

interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  universityId: string
  studentId: string
  studyLevel: 'undergraduate' | 'postgraduate' | 'phd' | 'exchange'
  studyYear: string
  course: string
  portugueseLevel: 'native' | 'fluent' | 'intermediate' | 'beginner'
  countryOfOrigin: string
  interests: string[]
  needsAccommodation: boolean
  needsJobSupport: boolean
  wantsNetworking: boolean
  preferredLanguage: 'pt' | 'en' | 'both'
}

export default function PortugueseStudentOnboarding() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    preferredLanguage: 'both',
    interests: [],
    needsAccommodation: false,
    needsJobSupport: false,
    wantsNetworking: true
  })
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  const markStepCompleted = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]))
  }

  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-4 rounded-full w-16 h-16 mx-auto mb-4">
          <UsersIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to LusoTown!</h3>
        <p className="text-gray-600">Let's start by getting to know you better</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={profile.firstName || ''}
            onChange={(e) => updateProfile({ firstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={profile.lastName || ''}
            onChange={(e) => updateProfile({ lastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country of Origin *
        </label>
        <select
          value={profile.countryOfOrigin || ''}
          onChange={(e) => updateProfile({ countryOfOrigin: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Select your country</option>
          <option value="portugal">Portugal</option>
          <option value="brazil">Brazil</option>
          <option value="angola">Angola</option>
          <option value="mozambique">Mozambique</option>
          <option value="cape-verde">Cape Verde</option>
          <option value="guinea-bissau">Guinea-Bissau</option>
          <option value="sao-tome">São Tomé and Príncipe</option>
          <option value="timor-leste">Timor-Leste</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Portuguese Language Level
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'native', label: 'Native', icon: '🇵🇹' },
            { value: 'fluent', label: 'Fluent', icon: '💬' },
            { value: 'intermediate', label: 'Intermediate', icon: '📚' },
            { value: 'beginner', label: 'Beginner', icon: '🌱' }
          ].map((level) => (
            <button
              key={level.value}
              onClick={() => updateProfile({ portugueseLevel: level.value as any })}
              className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                profile.portugueseLevel === level.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg mb-1">{level.icon}</div>
              <div className="text-sm font-medium">{level.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const UniversityStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-br from-secondary-500 to-accent-500 p-4 rounded-full w-16 h-16 mx-auto mb-4">
          <AcademicCapIconSolid className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">University Information</h3>
        <p className="text-gray-600">Help us connect you with your university's Portuguese community</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your University *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNIVERSITY_PARTNERSHIPS.map((uni) => (
            <button
              key={uni.id}
              onClick={() => updateProfile({ universityId: uni.id })}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                profile.universityId === uni.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-lg">
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{uni.shortName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{uni.name}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{uni.portugueseStudents} Portuguese students</span>
                    {uni.hasPortugueseProgram && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-100 text-primary-800">
                        Portuguese Program
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID *
          </label>
          <input
            type="text"
            value={profile.studentId || ''}
            onChange={(e) => updateProfile({ studentId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your student ID number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University Email *
          </label>
          <input
            type="email"
            value={profile.email || ''}
            onChange={(e) => updateProfile({ email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="your.name@university.ac.uk"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Level
          </label>
          <select
            value={profile.studyLevel || ''}
            onChange={(e) => updateProfile({ studyLevel: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select study level</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
            <option value="phd">PhD</option>
            <option value="exchange">Exchange Student</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Study
          </label>
          <select
            value={profile.studyYear || ''}
            onChange={(e) => updateProfile({ studyYear: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
            <option value="masters">Master's</option>
            <option value="phd">PhD</option>
            <option value="exchange">Exchange</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course/Field of Study
        </label>
        <input
          type="text"
          value={profile.course || ''}
          onChange={(e) => updateProfile({ course: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., Business Administration, Computer Science, Medicine"
        />
      </div>
    </div>
  )

  const InterestsStep = () => {
    const availableInterests = [
      { id: 'cultural-events', label: 'Portuguese Cultural Events', icon: <FlagIcon className="w-5 h-5" /> },
      { id: 'study-groups', label: 'Study Groups', icon: <BookOpenIcon className="w-5 h-5" /> },
      { id: 'sports', label: 'Sports & Recreation', icon: <HeartIcon className="w-5 h-5" /> },
      { id: 'food', label: 'Portuguese Cuisine', icon: <MapPinIcon className="w-5 h-5" /> },
      { id: 'music-dance', label: 'Music & Dance', icon: <GlobeEuropeAfricaIcon className="w-5 h-5" /> },
      { id: 'career', label: 'Career Development', icon: <BriefcaseIcon className="w-5 h-5" /> },
      { id: 'language-exchange', label: 'Language Exchange', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
      { id: 'volunteering', label: 'Community Volunteering', icon: <UsersIcon className="w-5 h-5" /> },
      { id: 'travel', label: 'Travel & Exploration', icon: <MapPinIcon className="w-5 h-5" /> },
      { id: 'arts', label: 'Arts & Crafts', icon: <StarIcon className="w-5 h-5" /> }
    ]

    const toggleInterest = (interestId: string) => {
      const currentInterests = profile.interests || []
      const newInterests = currentInterests.includes(interestId)
        ? currentInterests.filter(id => id !== interestId)
        : [...currentInterests, interestId]
      updateProfile({ interests: newInterests })
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-accent-500 to-premium-500 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <HeartIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Interests</h3>
          <p className="text-gray-600">Select what you'd like to get involved with in the Portuguese-speaking community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableInterests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                profile.interests?.includes(interest.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  profile.interests?.includes(interest.id)
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {interest.icon}
                </div>
                <span className="font-medium text-gray-900">{interest.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Support Preferences</h4>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.needsAccommodation}
                onChange={(e) => updateProfile({ needsAccommodation: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <HomeIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">I need help finding accommodation</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.needsJobSupport}
                onChange={(e) => updateProfile({ needsJobSupport: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">I'm interested in part-time work opportunities</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.wantsNetworking}
                onChange={(e) => updateProfile({ wantsNetworking: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">I want to connect with other Portuguese-speaking students</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    )
  }

  const ReviewStep = () => {
    const university = profile.universityId ? getUniversityById(profile.universityId) : null

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-premium-500 to-primary-500 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <CheckCircleIconSolid className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h3>
          <p className="text-gray-600">Review your information and complete your LusoTown profile</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {profile.firstName} {profile.lastName}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Country:</span>
                <span className="ml-2 font-medium text-gray-900 capitalize">
                  {profile.countryOfOrigin?.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Portuguese Level:</span>
                <span className="ml-2 font-medium text-gray-900 capitalize">
                  {profile.portugueseLevel}
                </span>
              </div>
            </div>
          </div>

          {university && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">University</h4>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">{university.shortName}</h5>
                  <p className="text-sm text-gray-600 mb-2">{university.name}</p>
                  <div className="flex flex-wrap items-center text-xs text-gray-500 space-x-4">
                    <span>{profile.studyLevel} - {profile.studyYear}</span>
                    <span>{profile.course}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Interests ({profile.interests?.length || 0} selected)
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.map((interestId) => (
                <span
                  key={interestId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {interestId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Support Preferences</h4>
            <div className="space-y-2 text-sm">
              {profile.needsAccommodation && (
                <div className="flex items-center text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  Help with accommodation
                </div>
              )}
              {profile.needsJobSupport && (
                <div className="flex items-center text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  Part-time work opportunities
                </div>
              )}
              {profile.wantsNetworking && (
                <div className="flex items-center text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  Connect with Portuguese-speaking students
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">What happens next?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              We'll verify your student status with {university?.shortName}
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              You'll get access to Portuguese student community groups
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Receive personalized event recommendations
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Connect with mentors and support networks
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const steps: OnboardingStep[] = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Tell us about yourself',
      component: <PersonalInfoStep />,
      completed: completedSteps.has(0),
      required: true
    },
    {
      id: 'university',
      title: 'University',
      description: 'Academic information',
      component: <UniversityStep />,
      completed: completedSteps.has(1),
      required: true
    },
    {
      id: 'interests',
      title: 'Interests',
      description: 'What interests you?',
      component: <InterestsStep />,
      completed: completedSteps.has(2),
      required: false
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Complete your profile',
      component: <ReviewStep />,
      completed: completedSteps.has(3),
      required: true
    }
  ]

  const canProceed = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return !!(profile.firstName && profile.lastName && profile.countryOfOrigin && profile.portugueseLevel)
      case 1:
        return !!(profile.universityId && profile.studentId && profile.email && profile.studyLevel)
      case 2:
        return true // Interests step is optional
      case 3:
        return true // Review step
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed(currentStep)) {
      markStepCompleted(currentStep)
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    try {
      // Submit the profile data
      const response = await fetch('/api/students/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        // Handle successful onboarding
        alert('Welcome to LusoTown! Your profile has been created successfully.')
        // Redirect to student dashboard or main app
      } else {
        alert('There was an error creating your profile. Please try again.')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('There was an error creating your profile. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Student Onboarding</h1>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    index < currentStep || step.completed
                      ? 'bg-primary-500 text-white'
                      : index === currentStep
                      ? 'bg-primary-100 text-primary-600 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircleIconSolid className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-xs ${
                      index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${
                    index < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-4">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed(currentStep)}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed(currentStep)}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-premium-500 to-accent-500 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Complete Registration
                <CheckCircleIcon className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}