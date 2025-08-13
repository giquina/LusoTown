'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { UserProfile } from '@/lib/supabase'

interface ProfileFormData {
  first_name: string
  last_name?: string
  bio: string
  location: string
  date_of_birth: string
  interests: string[]
  preferences: {
    looking_for: 'friendship' | 'activity_partners' | 'networking' | 'all'
    age_range_min: number
    age_range_max: number
    preferred_locations: string[]
  }
  privacy_settings: {
    show_age: boolean
    show_location: boolean
    allow_messages: 'everyone' | 'connections' | 'premium'
    profile_visibility: 'public' | 'members_only' | 'connections_only'
  }
}

interface ProfileEditFormProps {
  profile: UserProfile | null
  formData: ProfileFormData
  onChange: (field: keyof ProfileFormData, value: any) => void
  interestCategories: Record<string, string[]>
  locations: string[]
  onSave: () => Promise<void>
  saving: boolean
}

export default function ProfileEditForm({ 
  profile,
  formData, 
  onChange, 
  interestCategories, 
  locations,
  onSave,
  saving
}: ProfileEditFormProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required'
    }
    
    if (!formData.bio.trim()) {
      errors.bio = 'Bio is required'
    } else if (formData.bio.length < 20) {
      errors.bio = 'Bio must be at least 20 characters long'
    }
    
    if (!formData.location) {
      errors.location = 'Location is required'
    }
    
    if (!formData.date_of_birth) {
      errors.date_of_birth = 'Date of birth is required'
    } else {
      const birthDate = new Date(formData.date_of_birth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13) {
        errors.date_of_birth = 'Users under 13 require parental consent'
      }
    }
    
    if (formData.interests.length < 3) {
      errors.interests = 'Please select at least 3 interests'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (validateForm()) {
      await onSave()
    }
  }

  const getFieldError = (field: string) => validationErrors[field]
  const hasError = (field: string) => !!validationErrors[field]

  // Calculate age from date of birth for display
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    return today.getFullYear() - birthDate.getFullYear()
  }
  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    onChange('interests', newInterests)
  }

  const handleLocationToggle = (location: string) => {
    const currentLocations = formData.preferences.preferred_locations || []
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter(l => l !== location)
      : [...currentLocations, location]
    onChange('preferences', { ...formData.preferences, preferred_locations: newLocations })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
        <p className="text-gray-600">
          Share information about yourself to help others connect with you.
        </p>
      </div>

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={(e) => onChange('first_name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${
              hasError('first_name') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            placeholder="Enter your first name"
            required
          />
          {hasError('first_name') && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {getFieldError('first_name')}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name (Optional)
          </label>
          <input
            type="text"
            id="last_name"
            value={formData.last_name || ''}
            onChange={(e) => onChange('last_name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth * {formData.date_of_birth && `(Age: ${calculateAge(formData.date_of_birth)})`}
          </label>
          <input
            type="date"
            id="date_of_birth"
            value={formData.date_of_birth}
            onChange={(e) => onChange('date_of_birth', e.target.value)}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${
              hasError('date_of_birth') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            required
          />
          {hasError('date_of_birth') && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {getFieldError('date_of_birth')}
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            You must be at least 30 years old to join AdyaTribe
          </p>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Primary Location *
          </label>
          <select
            id="location"
            value={formData.location}
            onChange={(e) => onChange('location', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${
              hasError('location') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select your area</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {hasError('location') && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {getFieldError('location')}
            </div>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            About Me *
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent resize-none ${
              hasError('bio') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            placeholder="Tell us about yourself, your interests, and what you're looking for in connections..."
            maxLength={500}
            required
          />
          <div className="flex justify-between items-center mt-1">
            <div>
              {hasError('bio') && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {getFieldError('bio')}
                </div>
              )}
            </div>
            <div className={`text-sm ${formData.bio.length < 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.bio.length}/500 characters {formData.bio.length >= 20 ? '✅' : `(need ${20 - formData.bio.length} more)`}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connection Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900">Connection Preferences</h3>
        
        {/* Looking For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are you looking for? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: 'friendship', label: 'Friendship', description: 'Casual friends and social connections' },
              { value: 'activity_partners', label: 'Activity Partners', description: 'People to join activities and events' },
              { value: 'networking', label: 'Networking', description: 'Professional and career connections' },
              { value: 'all', label: 'All of the Above', description: 'Open to all types of connections' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.preferences.looking_for === option.value
                    ? 'border-[#FF6B6B] bg-red-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="looking_for"
                  value={option.value}
                  checked={formData.preferences.looking_for === option.value}
                  onChange={(e) => onChange('preferences', {
                    ...formData.preferences, 
                    looking_for: e.target.value as 'friendship' | 'activity_partners' | 'networking' | 'all'
                  })}
                  className="mt-1 text-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <div>
                  <div className="font-medium text-sm text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Age Range Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Preferred Age Range for Connections
          </label>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Minimum Age</span>
                <span className="text-sm font-medium text-gray-900">{formData.preferences.age_range_min}</span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                value={formData.preferences.age_range_min}
                onChange={(e) => onChange('preferences', { 
                  ...formData.preferences, 
                  age_range_min: parseInt(e.target.value) 
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((formData.preferences.age_range_min - 18) / 47) * 100}%, #d1d5db ${((formData.preferences.age_range_min - 18) / 47) * 100}%, #d1d5db 100%)`
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Maximum Age</span>
                <span className="text-sm font-medium text-gray-900">{formData.preferences.age_range_max}</span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                value={formData.preferences.age_range_max}
                onChange={(e) => onChange('preferences', { 
                  ...formData.preferences, 
                  age_range_max: parseInt(e.target.value) 
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((formData.preferences.age_range_max - 18) / 47) * 100}%, #d1d5db ${((formData.preferences.age_range_max - 18) / 47) * 100}%, #d1d5db 100%)`
                }}
              />
            </div>
            <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              Looking to connect with women aged {formData.preferences.age_range_min} - {formData.preferences.age_range_max}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
          <p className={`text-sm mt-1 ${hasError('interests') ? 'text-red-600' : 'text-gray-600'}`}>
            Select at least 3 interests to help us match you with like-minded members.
            ({formData.interests.length} selected)
            {hasError('interests') && (
              <span className="flex items-center gap-1 mt-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {getFieldError('interests')}
              </span>
            )}
          </p>
        </div>

        {Object.entries(interestCategories).map(([category, interests]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        ))}

        {formData.interests.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Selected Interests</h4>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Preferred Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Preferred Areas</h3>
          <p className="text-sm text-gray-600 mt-1">
            Select areas where you'd like to connect with members and attend events.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {locations.map((location) => (
            <label
              key={location}
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                (formData.preferences.preferred_locations || []).includes(location)
                  ? 'border-[#FF6B6B] bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={(formData.preferences.preferred_locations || []).includes(location)}
                onChange={() => handleLocationToggle(location)}
                className="text-[#FF6B6B] focus:ring-[#FF6B6B] rounded"
              />
              <span className="text-sm text-gray-900">{location}</span>
            </label>
          ))}
        </div>

        {(formData.preferences.preferred_locations || []).length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">
              Preferred Areas ({(formData.preferences.preferred_locations || []).length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {(formData.preferences.preferred_locations || []).map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {location}
                  <button
                    type="button"
                    onClick={() => handleLocationToggle(location)}
                    className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Form Validation Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
      >
        <h4 className="font-medium text-gray-900 mb-3">Profile Completion Status</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className={`flex items-center gap-2 ${formData.first_name ? 'text-green-600' : 'text-red-600'}`}>
            {formData.first_name ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.first_name ? 'Name completed' : 'Add your first name'}
          </div>
          
          <div className={`flex items-center gap-2 ${formData.date_of_birth ? 'text-green-600' : 'text-red-600'}`}>
            {formData.date_of_birth ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.date_of_birth ? 'Date of birth completed' : 'Add your date of birth'}
          </div>
          
          <div className={`flex items-center gap-2 ${formData.bio.length >= 20 ? 'text-green-600' : 'text-red-600'}`}>
            {formData.bio.length >= 20 ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.bio.length >= 20 
              ? 'Bio completed' 
              : `Bio needs ${20 - formData.bio.length} more characters`
            }
          </div>
          
          <div className={`flex items-center gap-2 ${formData.location ? 'text-green-600' : 'text-red-600'}`}>
            {formData.location ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.location ? 'Location completed' : 'Select your primary location'}
          </div>
          
          <div className={`flex items-center gap-2 ${formData.interests.length >= 3 ? 'text-green-600' : 'text-red-600'}`}>
            {formData.interests.length >= 3 ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.interests.length >= 3 
              ? 'Interests completed' 
              : `Select ${3 - formData.interests.length} more interests`
            }
          </div>
          
          <div className={`flex items-center gap-2 ${formData.preferences.looking_for ? 'text-green-600' : 'text-yellow-600'}`}>
            {formData.preferences.looking_for ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4" />
            )}
            {formData.preferences.looking_for ? 'Preferences completed' : 'Set connection preferences'}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving || Object.keys(validationErrors).length > 0}
            className="w-full flex items-center justify-center gap-2 bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            All required fields must be completed to save your profile
          </p>
        </div>
      </motion.div>
    </div>
  )
}