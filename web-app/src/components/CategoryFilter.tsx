'use client'

import { motion } from 'framer-motion'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { EVENT_TOUR_CATEGORIES } from '@/lib/events-tours'
import { Typography, Spacing, IconSystem, getButtonStyles, cn } from '@/lib/design'

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (category?: string) => void
  eventCounts?: Record<string, number>
  className?: string
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  eventCounts = {},
  className = '' 
}: CategoryFilterProps) {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'

  const getCategoryDisplayName = (category: string) => {
    const translations = {
      'Women 30+': isPortuguese ? 'Mulheres 30+' : 'Women 30+',
      'Women 40+': isPortuguese ? 'Mulheres 40+' : 'Women 40+',
      'Family-Friendly': isPortuguese ? 'Famílias' : 'Family-Friendly',
      'Mixed Groups': isPortuguese ? 'Grupos Mistos' : 'Mixed Groups',
      'Cultural Heritage': isPortuguese ? 'Herança Cultural' : 'Cultural Heritage',
      'Professional Networking': isPortuguese ? 'Rede Profissional' : 'Professional Networking'
    }
    return translations[category as keyof typeof translations] || category
  }

  const getCategoryDescription = (category: string) => {
    const descriptions = {
      'Women 30+': isPortuguese 
        ? 'Experiências exclusivas para mulheres portuguesas na casa dos 30'
        : 'Exclusive experiences for Portuguese women in their 30s',
      'Women 40+': isPortuguese 
        ? 'Networking profissional para mulheres portuguesas estabelecidas'
        : 'Professional networking for established Portuguese women',
      'Family-Friendly': isPortuguese 
        ? 'Experiências culturais perfeitas para famílias portuguesas'
        : 'Cultural experiences perfect for Portuguese families',
      'Mixed Groups': isPortuguese 
        ? 'Experiências abertas para todos os membros da comunidade'
        : 'Open experiences for all community members',
      'Cultural Heritage': isPortuguese 
        ? 'Celebrações e preservação das tradições portuguesas'
        : 'Portuguese cultural celebrations and heritage preservation',
      'Professional Networking': isPortuguese 
        ? 'Desenvolvimento empresarial e de carreira'
        : 'Business and career development experiences'
    }
    return descriptions[category as keyof typeof descriptions] || ''
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header - improved hierarchy */}
      <div className={cn('flex items-center', Spacing.sm)}>
        <AdjustmentsHorizontalIcon className={cn(IconSystem.sizes.md, 'text-primary-500')} />
        <h3 className={Typography.heading3}>
          {isPortuguese ? 'Filtrar por Categoria' : 'Filter by Category'}
        </h3>
      </div>

      {/* All Categories Option */}
      <motion.button
        onClick={() => onCategoryChange(undefined)}
        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
          !selectedCategory
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className={cn('flex items-center', Spacing.sm)}>
            <div className={cn(IconSystem.containers.medium, 'bg-gradient-to-br from-primary-500 to-secondary-500')}>
              <span className="text-xl text-white">🎯</span>
            </div>
            <div>
              <div className={cn(
                Typography.label,
                !selectedCategory ? 'text-primary-700' : 'text-gray-900'
              )}>
                {isPortuguese ? 'Todas as Categorias' : 'All Categories'}
              </div>
              <div className={Typography.caption}>
                {isPortuguese ? 'Ver todas as experiências disponíveis' : 'See all available experiences'}
              </div>
            </div>
          </div>
          {Object.values(eventCounts).reduce((a, b) => a + b, 0) > 0 && (
            <span className={cn(
              Typography.badge,
              'px-2 py-1 rounded-full',
              !selectedCategory
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700'
            )}>
              {Object.values(eventCounts).reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>
      </motion.button>

      {/* Individual Categories */}
      <div className="space-y-3">
        {Object.entries(EVENT_TOUR_CATEGORIES).map(([category, info]) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedCategory === category
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className={cn('flex items-center', Spacing.sm)}>
                <div className={cn(IconSystem.containers.medium, IconSystem.categories.professional.bg)}>
                  <span className="text-xl text-white">{info.icon}</span>
                </div>
                <div>
                  <div className={cn(
                    Typography.label,
                    'break-words leading-tight',
                    selectedCategory === category ? 'text-primary-700' : 'text-gray-900'
                  )}>
                    {getCategoryDisplayName(category)}
                  </div>
                  <div className={cn(Typography.caption, 'break-words leading-relaxed')}>
                    {getCategoryDescription(category)}
                  </div>
                </div>
              </div>
              {eventCounts[category] && (
                <span className={cn(
                  Typography.badge,
                  'px-2 py-1 rounded-full',
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}>
                  {eventCounts[category]}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Filter Stats */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          {isPortuguese ? 'Estatísticas de Experiências' : 'Experience Statistics'}
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="text-center p-2 bg-white rounded">
            <div className="font-bold text-primary-600">
              {Object.values(eventCounts).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-gray-600">
              {isPortuguese ? 'Total' : 'Total'}
            </div>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <div className="font-bold text-secondary-600">
              {Object.keys(EVENT_TOUR_CATEGORIES).length}
            </div>
            <div className="text-gray-600">
              {isPortuguese ? 'Categorias' : 'Categories'}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      {Object.values(eventCounts).some(count => count > 0) && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            {isPortuguese ? 'Categorias Populares' : 'Popular Categories'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(eventCounts)
              .filter(([_, count]) => count > 0)
              .sort(([_, a], [__, b]) => b - a)
              .slice(0, 6)
              .map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`flex items-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors min-w-0 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="flex-shrink-0">{EVENT_TOUR_CATEGORIES[category as keyof typeof EVENT_TOUR_CATEGORIES]?.icon}</span>
                  <span className="truncate">{getCategoryDisplayName(category)}</span>
                  <span className={`px-1 py-0.5 rounded-full text-xs flex-shrink-0 ${
                    selectedCategory === category
                      ? 'bg-white/20'
                      : 'bg-white'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {selectedCategory && (
        <motion.button
          onClick={() => onCategoryChange(undefined)}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPortuguese ? 'Limpar Filtros' : 'Clear Filters'}
        </motion.button>
      )}
    </div>
  )
}