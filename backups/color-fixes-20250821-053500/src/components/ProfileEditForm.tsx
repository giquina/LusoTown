'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UserProfile } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

interface ProfileEditFormProps {
  profile: UserProfile | null
  formData: any
  onChange: (field: string, value: any) => void
  interestCategories: Record<string, string[]>
  locations: string[]
  onSave: () => void
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
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Informações Básicas' : 'Basic Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Nome' : 'First Name'}
            </label>
            <input
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => onChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder={isPortuguese ? 'Seu nome' : 'Your first name'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Apelido' : 'Last Name'}
            </label>
            <input
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => onChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder={isPortuguese ? 'Seu apelido' : 'Your last name'}
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isPortuguese ? 'Biografia' : 'Bio'}
        </label>
        <textarea
          value={formData.bio || ''}
          onChange={(e) => onChange('bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          placeholder={isPortuguese ? 
            'Conte-nos um pouco sobre si...' : 
            'Tell us a bit about yourself...'
          }
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isPortuguese ? 'Localização' : 'Location'}
        </label>
        <select
          value={formData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">
            {isPortuguese ? 'Selecione uma área' : 'Select an area'}
          </option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Interests */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 mb-3">
          {isPortuguese ? 'Interesses' : 'Interests'}
        </h4>
        <div className="space-y-4">
          {Object.entries(interestCategories).map(([category, interests]) => (
            <div key={category}>
              <h5 className="text-sm font-medium text-gray-700 mb-2">{category}</h5>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const currentInterests = formData.interests || []
                      const newInterests = currentInterests.includes(interest)
                        ? currentInterests.filter((i: string) => i !== interest)
                        : [...currentInterests, interest]
                      onChange('interests', newInterests)
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      (formData.interests || []).includes(interest)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSave}
          disabled={saving}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {isPortuguese ? 'A guardar...' : 'Saving...'}
            </span>
          ) : (
            isPortuguese ? 'Guardar Alterações' : 'Save Changes'
          )}
        </motion.button>
      </div>
    </div>
  )
}