'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HeartIcon, UserGroupIcon, BuildingOfficeIcon, SparklesIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export interface MembershipApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  
  // Location
  currentCity: string
  postcode: string
  
  // Membership specific fields (filled by child forms)
  membershipType: 'cultural' | 'social' | 'community' | 'business'
  heritage?: string[]
  culturalInterests?: string[]
  preferences?: string[]
  businessMarkets?: string[]
  
  // Additional Info
  aboutMe: string
  linkedin?: string
  instagram?: string
  
  // Application status
  applicationDate?: string
  status?: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected'
}

interface MembershipApplicationFormProps {
  membershipType: 'cultural' | 'social' | 'community' | 'business'
  initialData?: Partial<MembershipApplicationData>
  children?: React.ReactNode // For membership-specific components
  onSubmit: (data: MembershipApplicationData) => Promise<void>
  onSaveDraft?: (data: MembershipApplicationData) => void
  isLoading?: boolean
  submitButtonText?: string
}

const MEMBERSHIP_CONFIG = {
  cultural: {
    title: 'Cultural Membership Application',
    icon: SparklesIcon,
    color: 'primary',
    description: 'Join London\'s most exclusive Portuguese-speaking cultural circle'
  },
  social: {
    title: 'Social Membership Application', 
    icon: HeartIcon,
    color: 'rose',
    description: 'Join our elite Lusophone dating community'
  },
  community: {
    title: 'Community Membership Application',
    icon: UserGroupIcon,
    color: 'blue', 
    description: 'Connect with the UK\'s premier Portuguese-speaking community'
  },
  business: {
    title: 'Business Membership Application',
    icon: BuildingOfficeIcon,
    color: 'emerald',
    description: 'Join the UK\'s premier Lusophone business network'
  }
}

export function MembershipApplicationForm({
  membershipType,
  initialData,
  children,
  onSubmit,
  onSaveDraft,
  isLoading = false,
  submitButtonText = 'Submit Application'
}: MembershipApplicationFormProps) {
  const { t } = useLanguage()
  const config = MEMBERSHIP_CONFIG[membershipType]
  
  const [formData, setFormData] = useState<MembershipApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentCity: '',
    postcode: '',
    membershipType,
    aboutMe: '',
    linkedin: '',
    instagram: '',
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (onSaveDraft) {
      const interval = setInterval(() => {
        onSaveDraft(formData)
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [formData, onSaveDraft])

  // Calculate progress
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'currentCity', 'aboutMe']
    const completedFields = requiredFields.filter(field => formData[field as keyof MembershipApplicationData])
    setProgress((completedFields.length / requiredFields.length) * 100)
  }, [formData])

  const updateFormData = (updates: Partial<MembershipApplicationData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear related errors
    Object.keys(updates).forEach(key => {
      if (errors[key]) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[key]
          return newErrors
        })
      }
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.currentCity.trim()) {
      newErrors.currentCity = 'Current city is required'
    }

    if (!formData.aboutMe.trim()) {
      newErrors.aboutMe = 'Please tell us about yourself'
    } else if (formData.aboutMe.trim().length < 50) {
      newErrors.aboutMe = 'Please provide at least 50 characters about yourself'
    }

    // Membership-specific validation
    if (membershipType === 'cultural' && (!formData.heritage || formData.heritage.length === 0)) {
      newErrors.heritage = 'Please select your Portuguese heritage'
    }

    if (membershipType === 'business' && (!formData.businessMarkets || formData.businessMarkets.length === 0)) {
      newErrors.businessMarkets = 'Please select at least one business market of interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit({
        ...formData,
        applicationDate: new Date().toISOString(),
        status: 'submitted'
      })
    } catch (error) {
      console.error('Application submission error:', error)
    }
  }

  const Icon = config.icon

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          {config.title}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {config.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-primary-600 mb-2">
          <span>Application Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  placeholder="Your first name"
                  required
                  className={errors.firstName ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  placeholder="Your last name"
                  required
                  className={errors.lastName ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className={errors.email ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="+44 7XXX XXXXXX"
                  required
                  className={errors.phone ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                  max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Current City"
                  value={formData.currentCity}
                  onChange={(e) => updateFormData({ currentCity: e.target.value })}
                  placeholder="London, Manchester, Edinburgh..."
                  required
                  className={errors.currentCity ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.currentCity && (
                  <p className="mt-2 text-sm text-red-600">{errors.currentCity}</p>
                )}
              </div>

              <div>
                <Input
                  label="Postcode"
                  value={formData.postcode}
                  onChange={(e) => updateFormData({ postcode: e.target.value.toUpperCase() })}
                  placeholder="SW1A 1AA"
                  className="uppercase"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership-Specific Fields */}
        {children && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Membership Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {React.cloneElement(children as React.ReactElement, {
                formData,
                updateFormData,
                errors
              })}
            </CardContent>
          </Card>
        )}

        {/* About Me & Social */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
              <span>Tell Us About Yourself</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.aboutMe}
                onChange={(e) => updateFormData({ aboutMe: e.target.value })}
                rows={4}
                className={`w-full rounded-md border px-3 py-2 text-sm resize-none ${
                  errors.aboutMe ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:border-primary-500 focus:ring-primary-500`}
                placeholder="Tell us about your Portuguese heritage, cultural interests, what you're looking for in our community, and what makes you passionate about Portuguese culture..."
                required
              />
              <div className="mt-2 flex justify-between">
                {errors.aboutMe && (
                  <p className="text-sm text-red-600">{errors.aboutMe}</p>
                )}
                <p className="text-sm text-gray-500">
                  {formData.aboutMe.length}/500 characters (minimum 50)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="LinkedIn Profile (optional)"
                  value={formData.linkedin}
                  onChange={(e) => updateFormData({ linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Input
                  label="Instagram Profile (optional)"
                  value={formData.instagram}
                  onChange={(e) => updateFormData({ instagram: e.target.value })}
                  placeholder="@yourusername"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-between items-center">
          {onSaveDraft && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onSaveDraft(formData)}
            >
              Save Draft
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={isLoading || progress < 80}
            className="ml-auto px-8 py-3 text-base min-h-[44px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>{submitButtonText}</span>
              </div>
            )}
          </Button>
        </div>

        {progress < 80 && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span className="text-sm">
              Please complete at least 80% of the form to submit your application.
            </span>
          </div>
        )}
      </form>
    </div>
  )
}