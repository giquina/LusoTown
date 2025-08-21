'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FunnelIcon,
  XMarkIcon,
  UserGroupIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ConnectionFilters as FilterType } from '@/context/NetworkingContext'

interface ConnectionFiltersProps {
  onFiltersChange: (filters: FilterType) => void
  activeFilters: FilterType
  onClearFilters: () => void
}

export default function ConnectionFilters({ 
  onFiltersChange, 
  activeFilters, 
  onClearFilters 
}: ConnectionFiltersProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = Object.keys(activeFilters).length > 0

  const handleFilterChange = (key: keyof FilterType, value: any) => {
    const newFilters = { ...activeFilters }
    if (value === '' || value === undefined) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    onFiltersChange(newFilters)
  }

  const membershipOptions = [
    { value: '', label: isPortuguese ? 'Todos os tipos' : 'All types' },
    { value: 'free', label: isPortuguese ? 'Gratuito' : 'Free' },
    { value: 'core', label: isPortuguese ? 'Comunidade' : 'Community' },
    { value: 'premium', label: isPortuguese ? 'Família' : 'Family' }
  ]

  const strengthOptions = [
    { value: '', label: isPortuguese ? 'Todas as forças' : 'All strengths' },
    { value: 'weak', label: isPortuguese ? 'Fraca (1-3)' : 'Weak (1-3)' },
    { value: 'medium', label: isPortuguese ? 'Média (4-6)' : 'Medium (4-6)' },
    { value: 'strong', label: isPortuguese ? 'Forte (7-10)' : 'Strong (7-10)' }
  ]

  const interactionOptions = [
    { value: '', label: isPortuguese ? 'Qualquer altura' : 'Any time' },
    { value: 7, label: isPortuguese ? 'Última semana' : 'Last week' },
    { value: 30, label: isPortuguese ? 'Último mês' : 'Last month' },
    { value: 90, label: isPortuguese ? 'Últimos 3 meses' : 'Last 3 months' }
  ]

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
          hasActiveFilters || showFilters
            ? 'bg-primary-50 border-primary-200 text-primary-700'
            : 'bg-white border-secondary-200 text-secondary-600 hover:border-secondary-300'
        }`}
      >
        <FunnelIcon className="w-5 h-5" />
        <span className="font-medium">
          {isPortuguese ? 'Filtros' : 'Filters'}
        </span>
        {hasActiveFilters && (
          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
            {Object.keys(activeFilters).length}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-secondary-200 z-20 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900">
                  {isPortuguese ? 'Filtrar Conexões' : 'Filter Connections'}
                </h3>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-gray-400 hover:text-secondary-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Membership Tier */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                  <UserGroupIcon className="w-4 h-4" />
                  {isPortuguese ? 'Tipo de Membro' : 'Membership Type'}
                </label>
                <select
                  value={activeFilters.membershipTier || ''}
                  onChange={(e) => handleFilterChange('membershipTier', e.target.value as any)}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  {membershipOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                  <MapPinIcon className="w-4 h-4" />
                  {isPortuguese ? 'Localização' : 'Location'}
                </label>
                <input
                  type="text"
                  placeholder={isPortuguese ? 'ex: Camberwell, Kennington...' : 'e.g. Camberwell, Kennington...'}
                  value={activeFilters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              {/* Connection Strength */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                  <StarIcon className="w-4 h-4" />
                  {isPortuguese ? 'Força da Conexão' : 'Connection Strength'}
                </label>
                <select
                  value={activeFilters.connectionStrength || ''}
                  onChange={(e) => handleFilterChange('connectionStrength', e.target.value as any)}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  {strengthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Shared Events */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  {isPortuguese ? 'Eventos Mínimos em Comum' : 'Minimum Shared Events'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="0"
                  value={activeFilters.minSharedEvents || ''}
                  onChange={(e) => handleFilterChange('minSharedEvents', parseInt(e.target.value) || undefined)}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              {/* Last Interaction */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-secondary-700 mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  {isPortuguese ? 'Última Interação' : 'Last Interaction'}
                </label>
                <select
                  value={activeFilters.lastInteractionDays || ''}
                  onChange={(e) => handleFilterChange('lastInteractionDays', parseInt(e.target.value) || undefined)}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  {interactionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Only */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={activeFilters.isVerified === true}
                    onChange={(e) => handleFilterChange('isVerified', e.target.checked || undefined)}
                    className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                  />
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-secondary-700">
                      {isPortuguese ? 'Apenas verificados' : 'Verified only'}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-secondary-200">
              <button
                onClick={onClearFilters}
                className="flex-1 px-4 py-2 text-secondary-600 hover:text-secondary-800 transition-colors text-sm font-medium"
                disabled={!hasActiveFilters}
              >
                {isPortuguese ? 'Limpar' : 'Clear'}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium text-sm"
              >
                {isPortuguese ? 'Aplicar' : 'Apply'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showFilters && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  )
}