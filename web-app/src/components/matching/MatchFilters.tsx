'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { CULTURAL_INTEREST_CATEGORIES, LANGUAGE_PROFICIENCY_LEVELS, UK_PORTUGUESE_COMMUNITIES } from '@/config/cultural-preferences'

interface MatchFilters {
  ageRange: [number, number]
  maxDistance: number
  culturalBackground: string[]
  interests: string[]
  languageProficiency: string
  education: string
  lookingFor: string[]
  minCompatibility: number
}

interface MatchFiltersProps {
  filters: MatchFilters
  onFiltersChange: (filters: MatchFilters) => void
  onApply: () => void
}

export default function MatchFilters({
  filters,
  onFiltersChange,
  onApply
}: MatchFiltersProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const culturalBackgrounds = [
    { id: 'portugal', name: 'Portugal', flag: '🇵🇹' },
    { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
    { id: 'angola', name: 'Angola', flag: '🇦🇴' },
    { id: 'cape_verde', name: 'Cape Verde', flag: '🇨🇻' },
    { id: 'mozambique', name: 'Mozambique', flag: '🇲🇿' },
    { id: 'guinea_bissau', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { id: 'sao_tome', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { id: 'timor_leste', name: 'Timor-Leste', flag: '🇹🇱' }
  ]

  const lookingForOptions = [
    { id: 'dating', name: { en: 'Dating', pt: 'Encontros' } },
    { id: 'relationship', name: { en: 'Long-term Relationship', pt: 'Relacionamento Sério' } },
    { id: 'friendship', name: { en: 'Friendship', pt: 'Amizade' } },
    { id: 'cultural_connection', name: { en: 'Cultural Connection', pt: 'Conexão Cultural' } },
    { id: 'language_exchange', name: { en: 'Language Exchange', pt: 'Intercâmbio de Idiomas' } },
    { id: 'networking', name: { en: 'Professional Networking', pt: 'Networking Profissional' } }
  ]

  const educationLevels = [
    { id: '', name: { en: 'Any Education Level', pt: 'Qualquer Nível de Educação' } },
    { id: 'high_school', name: { en: 'High School', pt: 'Ensino Secundário' } },
    { id: 'some_college', name: { en: 'Some College', pt: 'Ensino Superior Incompleto' } },
    { id: 'bachelors', name: { en: "Bachelor's Degree", pt: 'Licenciatura' } },
    { id: 'masters', name: { en: "Master's Degree", pt: 'Mestrado' } },
    { id: 'doctorate', name: { en: 'Doctorate', pt: 'Doutoramento' } },
    { id: 'professional', name: { en: 'Professional Degree', pt: 'Formação Profissional' } }
  ]

  const updateFilter = <K extends keyof MatchFilters>(key: K, value: MatchFilters[K]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const toggleArrayItem = <T,>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('matching.filter_preferences', 'Filter Preferences')}
        </h3>
        <button
          onClick={() => onFiltersChange({
            ageRange: [18, 65],
            maxDistance: 25,
            culturalBackground: [],
            interests: [],
            languageProficiency: '',
            education: '',
            lookingFor: [],
            minCompatibility: 60
          })}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          {t('common.reset', 'Reset')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.age_range', 'Age Range')}: {filters.ageRange[0]} - {filters.ageRange[1]}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="18"
              max="80"
              value={filters.ageRange[0]}
              onChange={(e) => updateFilter('ageRange', [parseInt(e.target.value), filters.ageRange[1]])}
              className="w-full"
              style={{ accentColor: colors.primary }}
            />
            <input
              type="range"
              min="18"
              max="80"
              value={filters.ageRange[1]}
              onChange={(e) => updateFilter('ageRange', [filters.ageRange[0], parseInt(e.target.value)])}
              className="w-full"
              style={{ accentColor: colors.primary }}
            />
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.max_distance', 'Maximum Distance')}: {filters.maxDistance}km
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={filters.maxDistance}
            onChange={(e) => updateFilter('maxDistance', parseInt(e.target.value))}
            className="w-full"
            style={{ accentColor: colors.primary }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5km</span>
            <span>50km</span>
            <span>100km</span>
          </div>
        </div>

        {/* Cultural Background */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.cultural_background', 'Cultural Background')}
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {culturalBackgrounds.map((background) => (
              <button
                key={background.id}
                onClick={() => updateFilter('culturalBackground', toggleArrayItem(filters.culturalBackground, background.id))}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm ${
                  filters.culturalBackground.includes(background.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span>{background.flag}</span>
                <span>{background.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Proficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.portuguese_proficiency', 'Portuguese Proficiency')}
          </label>
          <select
            value={filters.languageProficiency}
            onChange={(e) => updateFilter('languageProficiency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.any', 'Any Level')}</option>
            {LANGUAGE_PROFICIENCY_LEVELS.map((level) => (
              <option key={level.level} value={level.level}>
                {language === 'pt' ? level.namePt : level.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.interests', 'Interests')}
          </label>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {CULTURAL_INTEREST_CATEGORIES.map((category) => (
              <div key={category.id}>
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  {category.icon} {language === 'pt' ? category.namePt : category.nameEn}
                </h4>
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {category.interests.slice(0, 4).map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => updateFilter('interests', toggleArrayItem(filters.interests, interest.id))}
                      className={`px-2 py-1 rounded text-xs ${
                        filters.interests.includes(interest.id)
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest.emoji} {language === 'pt' ? interest.namePt : interest.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.education_level', 'Education Level')}
          </label>
          <select
            value={filters.education}
            onChange={(e) => updateFilter('education', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {educationLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Looking For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.looking_for', 'Looking For')}
          </label>
          <div className="space-y-2">
            {lookingForOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => updateFilter('lookingFor', toggleArrayItem(filters.lookingFor, option.id))}
                className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                  filters.lookingFor.includes(option.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Compatibility Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('matching.min_compatibility', 'Minimum Compatibility')}: {filters.minCompatibility}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={filters.minCompatibility}
            onChange={(e) => updateFilter('minCompatibility', parseInt(e.target.value))}
            className="w-full"
            style={{ accentColor: colors.primary }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.culturalBackground.length > 0 || 
        filters.interests.length > 0 || 
        filters.lookingFor.length > 0 || 
        filters.languageProficiency ||
        filters.education ||
        filters.minCompatibility > 60) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t('matching.active_filters', 'Active Filters')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.culturalBackground.map(bg => (
              <span key={bg} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {culturalBackgrounds.find(c => c.id === bg)?.flag} {culturalBackgrounds.find(c => c.id === bg)?.name}
              </span>
            ))}
            {filters.interests.slice(0, 3).map(interestId => (
              <span key={interestId} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {CULTURAL_INTEREST_CATEGORIES
                  .flatMap(cat => cat.interests)
                  .find(interest => interest.id === interestId)?.emoji
                } 
                {CULTURAL_INTEREST_CATEGORIES
                  .flatMap(cat => cat.interests)
                  .find(interest => interest.id === interestId)?.[language === 'pt' ? 'namePt' : 'nameEn']
                }
              </span>
            ))}
            {filters.interests.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{filters.interests.length - 3} more interests
              </span>
            )}
            {filters.lookingFor.map(lf => (
              <span key={lf} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {lookingForOptions.find(o => o.id === lf)?.name[language]}
              </span>
            ))}
            {filters.languageProficiency && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                🇵🇹 {LANGUAGE_PROFICIENCY_LEVELS.find(l => l.level === filters.languageProficiency)?.[language === 'pt' ? 'namePt' : 'nameEn']}
              </span>
            )}
            {filters.education && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                🎓 {educationLevels.find(e => e.id === filters.education)?.name[language]}
              </span>
            )}
            {filters.minCompatibility > 60 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                ❤️ {filters.minCompatibility}%+ compatibility
              </span>
            )}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onApply}
          className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.primary }}
        >
          {t('common.apply_filters', 'Apply Filters')}
        </button>
      </div>
    </div>
  )
}