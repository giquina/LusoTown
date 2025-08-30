'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'

interface FilterOptions {
  categories: Array<{ id: string; name: { en: string; pt: string }; icon: string }>
  cities: Array<{ id: string; name: string; count: number }>
  culturalFocus: Array<{ id: string; name: { en: string; pt: string }; flag: string }>
}

interface SelectedFilters {
  category: string
  city: string
  culturalFocus: string
  rating: number
  priceRange: string
  features: string[]
}

interface BusinessFilterProps {
  filterOptions: FilterOptions
  selectedFilters: SelectedFilters
  onFilterChange: (filterType: string, value: any) => void
  onClearFilters: () => void
}

export default function BusinessFilter({
  filterOptions,
  selectedFilters,
  onFilterChange,
  onClearFilters
}: BusinessFilterProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const priceRanges = [
    { id: '£', name: '£ - Budget Friendly', description: 'Under £15 per person' },
    { id: '££', name: '££ - Moderate', description: '£15-30 per person' },
    { id: '£££', name: '£££ - Upscale', description: '£30-50 per person' },
    { id: '££££', name: '££££ - Fine Dining', description: '£50+ per person' }
  ]

  const features = [
    { id: 'delivery', name: { en: 'Delivery', pt: 'Entrega' }, icon: '🚚' },
    { id: 'takeaway', name: { en: 'Takeaway', pt: 'Take Away' }, icon: '🥡' },
    { id: 'verified', name: { en: 'Verified', pt: 'Verificado' }, icon: '✓' },
    { id: 'premium', name: { en: 'Premium', pt: 'Premium' }, icon: '⭐' }
  ]

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = selectedFilters.features.includes(featureId)
      ? selectedFilters.features.filter(f => f !== featureId)
      : [...selectedFilters.features, featureId]
    onFilterChange('features', newFeatures)
  }

  const renderStars = (rating: number, interactive: boolean = true) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onFilterChange('rating', i === selectedFilters.rating ? 0 : i)}
          className={`${
            interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
          } transition-transform ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          disabled={!interactive}
        >
          ★
        </button>
      )
    }
    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('business.filters', 'Filters')}
        </h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          {t('common.clear_all', 'Clear All')}
        </button>
      </div>

      {/* Business Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.category', 'Category')}
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
              selectedFilters.category === ''
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {t('common.all_categories', 'All Categories')}
          </button>
          {filterOptions.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilterChange('category', category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm flex items-center space-x-2 ${
                selectedFilters.category === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.city', 'City')}
        </label>
        <select
          value={selectedFilters.city}
          onChange={(e) => onFilterChange('city', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{t('common.all_cities', 'All Cities')}</option>
          {filterOptions.cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name} ({city.count.toLocaleString()})
            </option>
          ))}
        </select>
      </div>

      {/* Cultural Focus */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.cultural_focus', 'Cultural Focus')}
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('culturalFocus', '')}
            className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
              selectedFilters.culturalFocus === ''
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {t('common.all', 'All')}
          </button>
          {filterOptions.culturalFocus.map((focus) => (
            <button
              key={focus.id}
              onClick={() => onFilterChange('culturalFocus', focus.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm flex items-center space-x-2 ${
                selectedFilters.culturalFocus === focus.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>{focus.flag}</span>
              <span>{focus.name[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.price_range', 'Price Range')}
        </label>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('priceRange', '')}
            className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
              selectedFilters.priceRange === ''
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {t('common.any_price', 'Any Price')}
          </button>
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => onFilterChange('priceRange', range.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                selectedFilters.priceRange === range.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{range.name}</div>
              <div className="text-xs text-gray-500">{range.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.minimum_rating', 'Minimum Rating')}
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedFilters.rating === 0 
                ? t('common.any_rating', 'Any Rating')
                : `${selectedFilters.rating}+ ${t('common.stars', 'stars')}`
              }
            </span>
          </div>
          <div className="flex space-x-1">
            {renderStars(selectedFilters.rating)}
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('business.features', 'Features')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`px-3 py-2 rounded-lg border text-sm flex items-center space-x-2 ${
                selectedFilters.features.includes(feature.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>{feature.icon}</span>
              <span className="text-xs">{feature.name[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedFilters.category || selectedFilters.city || selectedFilters.culturalFocus || 
        selectedFilters.rating > 0 || selectedFilters.priceRange || selectedFilters.features.length > 0) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t('business.active_filters', 'Active Filters')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.category && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {filterOptions.categories.find(c => c.id === selectedFilters.category)?.name[language]}
              </span>
            )}
            {selectedFilters.city && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: colors.secondary }}
              >
                {filterOptions.cities.find(c => c.id === selectedFilters.city)?.name}
              </span>
            )}
            {selectedFilters.culturalFocus && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: colors.accent }}
              >
                {filterOptions.culturalFocus.find(c => c.id === selectedFilters.culturalFocus)?.name[language]}
              </span>
            )}
            {selectedFilters.rating > 0 && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: colors.action }}
              >
                {selectedFilters.rating}+ ★
              </span>
            )}
            {selectedFilters.priceRange && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-600 text-white"
              >
                {selectedFilters.priceRange}
              </span>
            )}
            {selectedFilters.features.map(featureId => {
              const feature = features.find(f => f.id === featureId)
              return feature ? (
                <span 
                  key={featureId}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white"
                >
                  {feature.icon} {feature.name[language]}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}