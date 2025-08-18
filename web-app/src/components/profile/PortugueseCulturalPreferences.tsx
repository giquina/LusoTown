'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

// Portuguese regions/origins with flag emojis
const PORTUGUESE_ORIGINS = [
  { value: 'portugal', emoji: '🇵🇹', flag: '/images/flags/portugal.png' },
  { value: 'azores', emoji: '🏝️', flag: '/images/flags/azores.png' },
  { value: 'madeira', emoji: '🌺', flag: '/images/flags/madeira.png' },
  { value: 'brazil', emoji: '🇧🇷', flag: '/images/flags/brazil.png' },
  { value: 'angola', emoji: '🇦🇴', flag: '/images/flags/angola.png' },
  { value: 'mozambique', emoji: '🇲🇿', flag: '/images/flags/mozambique.png' },
  { value: 'cape_verde', emoji: '🇨🇻', flag: '/images/flags/cape_verde.png' },
  { value: 'guinea_bissau', emoji: '🇬🇼', flag: '/images/flags/guinea_bissau.png' },
  { value: 'sao_tome', emoji: '🇸🇹', flag: '/images/flags/sao_tome.png' },
  { value: 'timor_leste', emoji: '🇹🇱', flag: '/images/flags/timor_leste.png' },
  { value: 'diaspora', emoji: '🌍', flag: '/images/flags/portuguese_diaspora.png' }
]

const LANGUAGE_PREFERENCES = [
  { value: 'portuguese_first', color: 'bg-green-500' },
  { value: 'bilingual', color: 'bg-blue-500' },
  { value: 'english_comfortable', color: 'bg-purple-500' },
  { value: 'learning', color: 'bg-orange-500' }
]

const CULTURAL_CELEBRATIONS = [
  { value: 'fado', emoji: '🎵', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'santos_populares', emoji: '🎉', color: 'bg-red-100 text-red-800' },
  { value: 'football', emoji: '⚽', color: 'bg-green-100 text-green-800' },
  { value: 'gastronomy', emoji: '🧁', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'christmas_traditions', emoji: '🎄', color: 'bg-red-100 text-red-800' },
  { value: 'literature_poetry', emoji: '📚', color: 'bg-blue-100 text-blue-800' },
  { value: 'religious_traditions', emoji: '⛪', color: 'bg-purple-100 text-purple-800' },
  { value: 'maritime_heritage', emoji: '⛵', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'folk_traditions', emoji: '💃', color: 'bg-pink-100 text-pink-800' },
  { value: 'crafts_arts', emoji: '🎨', color: 'bg-orange-100 text-orange-800' }
]

const PROFESSIONAL_GOALS = [
  { value: 'business_networking', emoji: '🤝', color: 'bg-blue-100 text-blue-800' },
  { value: 'social_connections', emoji: '👥', color: 'bg-green-100 text-green-800' },
  { value: 'cultural_preservation', emoji: '🏛️', color: 'bg-purple-100 text-purple-800' },
  { value: 'language_exchange', emoji: '💬', color: 'bg-orange-100 text-orange-800' },
  { value: 'mentorship', emoji: '🌟', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'community_events', emoji: '🎪', color: 'bg-pink-100 text-pink-800' },
  { value: 'entrepreneurship', emoji: '💼', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'cultural_education', emoji: '📖', color: 'bg-teal-100 text-teal-800' }
]

const CULTURAL_VALUES = [
  { value: 'family_community', emoji: '👨‍👩‍👧‍👦' },
  { value: 'tradition_respect', emoji: '🙏' },
  { value: 'hospitality', emoji: '🤗' },
  { value: 'hard_work', emoji: '💪' },
  { value: 'education', emoji: '🎓' },
  { value: 'faith_spirituality', emoji: '✨' },
  { value: 'cultural_pride', emoji: '🏆' },
  { value: 'innovation', emoji: '🚀' }
]

const LIFESTYLE_PREFERENCES = [
  { value: 'social_active', emoji: '🎉', color: 'bg-red-100 text-red-800' },
  { value: 'family_oriented', emoji: '👨‍👩‍👧‍👦', color: 'bg-blue-100 text-blue-800' },
  { value: 'career_focused', emoji: '💼', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'cultural_enthusiast', emoji: '🎭', color: 'bg-purple-100 text-purple-800' },
  { value: 'homebody', emoji: '🏠', color: 'bg-green-100 text-green-800' },
  { value: 'adventurous', emoji: '🌍', color: 'bg-orange-100 text-orange-800' },
  { value: 'spiritual', emoji: '🕯️', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'artistic', emoji: '🎨', color: 'bg-pink-100 text-pink-800' }
]

interface CulturalPreferencesData {
  origins: string[]
  language_preference: string
  cultural_celebrations: string[]
  professional_goals: string[]
  cultural_values: Record<string, number>
  lifestyle_preferences: string[]
}

interface PortugueseCulturalPreferencesProps {
  initialData?: Partial<CulturalPreferencesData>
  onChange: (data: CulturalPreferencesData) => void
  onSave?: () => Promise<void>
  saving?: boolean
  showCompletion?: boolean
}

export default function PortugueseCulturalPreferences({
  initialData,
  onChange,
  onSave,
  saving = false,
  showCompletion = true
}: PortugueseCulturalPreferencesProps) {
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState<CulturalPreferencesData>({
    origins: [],
    language_preference: '',
    cultural_celebrations: [],
    professional_goals: [],
    cultural_values: {},
    lifestyle_preferences: [],
    ...initialData
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    onChange(formData)
  }, [formData, onChange])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (formData.origins.length === 0) {
      errors.origins = t('profile.cultural.select_origin')
    }
    
    if (!formData.language_preference) {
      errors.language_preference = t('profile.cultural.select_language')
    }
    
    if (formData.cultural_celebrations.length < 3) {
      errors.cultural_celebrations = t('profile.cultural.select_celebrations')
    }
    
    if (formData.professional_goals.length === 0) {
      errors.professional_goals = t('profile.cultural.select_professional')
    }
    
    if (Object.keys(formData.cultural_values).length < 4) {
      errors.cultural_values = t('profile.cultural.rate_values')
    }
    
    if (formData.lifestyle_preferences.length < 2) {
      errors.lifestyle_preferences = t('profile.cultural.select_lifestyle')
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (validateForm() && onSave) {
      await onSave()
    }
  }

  const handleOriginToggle = (origin: string) => {
    const newOrigins = formData.origins.includes(origin)
      ? formData.origins.filter(o => o !== origin)
      : [...formData.origins, origin]
    setFormData(prev => ({ ...prev, origins: newOrigins }))
  }

  const handleCelebrationToggle = (celebration: string) => {
    const newCelebrations = formData.cultural_celebrations.includes(celebration)
      ? formData.cultural_celebrations.filter(c => c !== celebration)
      : [...formData.cultural_celebrations, celebration]
    setFormData(prev => ({ ...prev, cultural_celebrations: newCelebrations }))
  }

  const handleProfessionalToggle = (goal: string) => {
    const newGoals = formData.professional_goals.includes(goal)
      ? formData.professional_goals.filter(g => g !== goal)
      : [...formData.professional_goals, goal]
    setFormData(prev => ({ ...prev, professional_goals: newGoals }))
  }

  const handleLifestyleToggle = (lifestyle: string) => {
    const newLifestyle = formData.lifestyle_preferences.includes(lifestyle)
      ? formData.lifestyle_preferences.filter(l => l !== lifestyle)
      : [...formData.lifestyle_preferences, lifestyle]
    setFormData(prev => ({ ...prev, lifestyle_preferences: newLifestyle }))
  }

  const handleValueRating = (value: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      cultural_values: { ...prev.cultural_values, [value]: rating }
    }))
  }

  const getCompletionStatus = () => {
    return {
      origins: formData.origins.length > 0,
      language: !!formData.language_preference,
      celebrations: formData.cultural_celebrations.length >= 3,
      professional: formData.professional_goals.length > 0,
      values: Object.keys(formData.cultural_values).length >= 4,
      lifestyle: formData.lifestyle_preferences.length >= 2
    }
  }

  const completionStatus = getCompletionStatus()
  const completionPercentage = Math.round(
    (Object.values(completionStatus).filter(Boolean).length / Object.keys(completionStatus).length) * 100
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('profile.cultural.title')}
        </h2>
        <p className="text-gray-600">
          {t('profile.cultural.subtitle')}
        </p>
        {showCompletion && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#FF6B6B] h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {completionPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Portuguese Origins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.origin.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.origin.subtitle')}
          </p>
          {validationErrors.origins && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.origins}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PORTUGUESE_ORIGINS.map((origin) => (
            <label
              key={origin.value}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.origins.includes(origin.value)
                  ? 'border-[#FF6B6B] bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.origins.includes(origin.value)}
                onChange={() => handleOriginToggle(origin.value)}
                className="sr-only"
              />
              <div className="text-2xl">{origin.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {t(`profile.origin.${origin.value}`)}
                </div>
              </div>
              {formData.origins.includes(origin.value) && (
                <CheckCircleIcon className="w-5 h-5 text-[#FF6B6B]" />
              )}
            </label>
          ))}
        </div>
      </motion.div>

      {/* Language Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.language.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.language.subtitle')}
          </p>
          {validationErrors.language_preference && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.language_preference}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LANGUAGE_PREFERENCES.map((lang) => (
            <label
              key={lang.value}
              className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.language_preference === lang.value
                  ? 'border-[#FF6B6B] bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="language_preference"
                value={lang.value}
                checked={formData.language_preference === lang.value}
                onChange={(e) => setFormData(prev => ({ ...prev, language_preference: e.target.value }))}
                className="mt-1 text-[#FF6B6B] focus:ring-[#FF6B6B]"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {t(`profile.language.${lang.value}`)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t(`profile.language.${lang.value}_desc`)}
                </div>
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Cultural Celebrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.celebrations.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.celebrations.subtitle')} ({formData.cultural_celebrations.length} selected)
          </p>
          {validationErrors.cultural_celebrations && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.cultural_celebrations}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CULTURAL_CELEBRATIONS.map((celebration) => (
            <button
              key={celebration.value}
              type="button"
              onClick={() => handleCelebrationToggle(celebration.value)}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                formData.cultural_celebrations.includes(celebration.value)
                  ? 'bg-[#FF6B6B] text-white'
                  : `${celebration.color} hover:opacity-80`
              }`}
            >
              <span className="text-lg">{celebration.emoji}</span>
              <span className="flex-1 text-left">
                {t(`profile.celebrations.${celebration.value}`)}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Professional Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.professional.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.professional.subtitle')} ({formData.professional_goals.length} selected)
          </p>
          {validationErrors.professional_goals && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.professional_goals}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PROFESSIONAL_GOALS.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => handleProfessionalToggle(goal.value)}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                formData.professional_goals.includes(goal.value)
                  ? 'bg-[#FF6B6B] text-white'
                  : `${goal.color} hover:opacity-80`
              }`}
            >
              <span className="text-lg">{goal.emoji}</span>
              <span className="flex-1 text-left">
                {t(`profile.professional.${goal.value}`)}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cultural Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.values.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.values.subtitle')} ({Object.keys(formData.cultural_values).length}/8 rated)
          </p>
          {validationErrors.cultural_values && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.cultural_values}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {CULTURAL_VALUES.map((value) => (
            <div key={value.value} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{value.emoji}</span>
                <span className="font-medium text-gray-900">
                  {t(`profile.values.${value.value}`)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleValueRating(value.value, rating)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    {(formData.cultural_values[value.value] || 0) >= rating ? (
                      <StarIconSolid className="w-6 h-6 text-[#FF6B6B]" />
                    ) : (
                      <StarIcon className="w-6 h-6 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lifestyle Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t('profile.lifestyle.title')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t('profile.lifestyle.subtitle')} ({formData.lifestyle_preferences.length} selected)
          </p>
          {validationErrors.lifestyle_preferences && (
            <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <ExclamationCircleIcon className="w-4 h-4" />
              {validationErrors.lifestyle_preferences}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {LIFESTYLE_PREFERENCES.map((lifestyle) => (
            <button
              key={lifestyle.value}
              type="button"
              onClick={() => handleLifestyleToggle(lifestyle.value)}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                formData.lifestyle_preferences.includes(lifestyle.value)
                  ? 'bg-[#FF6B6B] text-white'
                  : `${lifestyle.color} hover:opacity-80`
              }`}
            >
              <span className="text-lg">{lifestyle.emoji}</span>
              <span className="flex-1 text-left">
                {t(`profile.lifestyle.${lifestyle.value}`)}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Completion Status */}
      {showCompletion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6"
        >
          <h4 className="font-medium text-gray-900 mb-4">
            {t('profile.cultural.completion')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(completionStatus).map(([key, completed]) => (
              <div key={key} className={`flex items-center gap-2 ${completed ? 'text-green-600' : 'text-red-600'}`}>
                {completed ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <ExclamationCircleIcon className="w-4 h-4" />
                )}
                {completed 
                  ? t(`profile.cultural.${key}_selected`)
                  : t(`profile.cultural.select_${key}`)
                }
              </div>
            ))}
          </div>

          {onSave && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving || completionPercentage < 100}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                {saving ? t('profile.cultural.saving') : t('profile.cultural.save')}
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Complete all sections to save your cultural preferences
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}