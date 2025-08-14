'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export type CategoryType = 'Women 30+' | 'Women 40+' | 'Family-Friendly' | 'Cultural' | 'Social' | 'Sports' | 'Nightlife' | 'Day Trips' | 'Special Interests'

interface CategoryBadgeProps {
  category: CategoryType
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'minimal'
  showIcon?: boolean
  onClick?: () => void
  isSelected?: boolean
  count?: number
  className?: string
}

export default function CategoryBadge({ 
  category,
  size = 'md',
  variant = 'default',
  showIcon = true,
  onClick,
  isSelected = false,
  count,
  className = ''
}: CategoryBadgeProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt-pt' || language === 'pt-br'

  const getCategoryConfig = (cat: CategoryType) => {
    const configs = {
      'Women 30+': {
        label: isPortuguese ? 'Mulheres 30+' : 'Women 30+',
        icon: '🌸',
        colors: {
          default: 'bg-coral-100 text-coral-700 border-coral-200',
          outlined: 'border-2 border-coral-300 text-coral-700 hover:bg-coral-50',
          minimal: 'text-coral-600 hover:text-coral-700',
          selected: 'bg-coral-500 text-white border-coral-500'
        }
      },
      'Women 40+': {
        label: isPortuguese ? 'Mulheres 40+' : 'Women 40+',
        icon: '🦋',
        colors: {
          default: 'bg-premium-100 text-premium-700 border-premium-200',
          outlined: 'border-2 border-premium-300 text-premium-700 hover:bg-premium-50',
          minimal: 'text-premium-600 hover:text-premium-700',
          selected: 'bg-premium-500 text-white border-premium-500'
        }
      },
      'Family-Friendly': {
        label: isPortuguese ? 'Para Famílias' : 'Family-Friendly',
        icon: '👨‍👩‍👧‍👦',
        colors: {
          default: 'bg-secondary-100 text-secondary-700 border-secondary-200',
          outlined: 'border-2 border-secondary-300 text-secondary-700 hover:bg-secondary-50',
          minimal: 'text-secondary-600 hover:text-secondary-700',
          selected: 'bg-secondary-500 text-white border-secondary-500'
        }
      },
      'Cultural': {
        label: isPortuguese ? 'Cultural' : 'Cultural',
        icon: '🎨',
        colors: {
          default: 'bg-action-100 text-action-700 border-action-200',
          outlined: 'border-2 border-action-300 text-action-700 hover:bg-action-50',
          minimal: 'text-action-600 hover:text-action-700',
          selected: 'bg-action-500 text-white border-action-500'
        }
      },
      'Social': {
        label: isPortuguese ? 'Social' : 'Social',
        icon: '☕',
        colors: {
          default: 'bg-accent-100 text-accent-700 border-accent-200',
          outlined: 'border-2 border-accent-300 text-accent-700 hover:bg-accent-50',
          minimal: 'text-accent-600 hover:text-accent-700',
          selected: 'bg-accent-500 text-white border-accent-500'
        }
      },
      'Sports': {
        label: isPortuguese ? 'Desporto' : 'Sports',
        icon: '⚽',
        colors: {
          default: 'bg-green-100 text-green-700 border-green-200',
          outlined: 'border-2 border-green-300 text-green-700 hover:bg-green-50',
          minimal: 'text-green-600 hover:text-green-700',
          selected: 'bg-green-500 text-white border-green-500'
        }
      },
      'Nightlife': {
        label: isPortuguese ? 'Vida Noturna' : 'Nightlife',
        icon: '🌙',
        colors: {
          default: 'bg-purple-100 text-purple-700 border-purple-200',
          outlined: 'border-2 border-purple-300 text-purple-700 hover:bg-purple-50',
          minimal: 'text-purple-600 hover:text-purple-700',
          selected: 'bg-purple-500 text-white border-purple-500'
        }
      },
      'Day Trips': {
        label: isPortuguese ? 'Viagens de Dia' : 'Day Trips',
        icon: '🚌',
        colors: {
          default: 'bg-primary-100 text-primary-700 border-primary-200',
          outlined: 'border-2 border-primary-300 text-primary-700 hover:bg-primary-50',
          minimal: 'text-primary-600 hover:text-primary-700',
          selected: 'bg-primary-500 text-white border-primary-500'
        }
      },
      'Special Interests': {
        label: isPortuguese ? 'Interesses Especiais' : 'Special Interests',
        icon: '📚',
        colors: {
          default: 'bg-indigo-100 text-indigo-700 border-indigo-200',
          outlined: 'border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50',
          minimal: 'text-indigo-600 hover:text-indigo-700',
          selected: 'bg-indigo-500 text-white border-indigo-500'
        }
      }
    }
    return configs[cat] || configs['Cultural']
  }

  const getSizeClasses = (sz: typeof size) => {
    const sizes = {
      xs: 'text-xs px-2 py-1',
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-3 py-2',
      lg: 'text-base px-4 py-2.5'
    }
    return sizes[sz]
  }

  const config = getCategoryConfig(category)
  const sizeClasses = getSizeClasses(size)
  
  const getColorClasses = () => {
    if (isSelected) {
      return config.colors.selected
    }
    return config.colors[variant]
  }

  const baseClasses = `
    inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200
    ${sizeClasses}
    ${getColorClasses()}
    ${onClick ? 'cursor-pointer hover:shadow-sm transform hover:-translate-y-0.5' : ''}
    ${variant === 'outlined' ? 'bg-white' : ''}
    ${variant === 'minimal' ? 'bg-transparent' : 'border'}
    ${className}
  `

  const content = (
    <>
      {showIcon && (
        <span className={size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'}>
          {config.icon}
        </span>
      )}
      <span className="font-medium">{config.label}</span>
      {count !== undefined && (
        <span className={`
          ${variant === 'minimal' ? 'opacity-60' : 'opacity-80'}
          ${size === 'xs' ? 'text-xs' : 'text-sm'}
        `}>
          ({count})
        </span>
      )}
    </>
  )

  if (onClick) {
    return (
      <motion.button
        onClick={onClick}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <motion.span
      className={baseClasses}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.span>
  )
}

// Helper component for category filter
interface CategoryFilterProps {
  categories: CategoryType[]
  selectedCategory?: string
  onCategoryChange: (category: string) => void
  showAll?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export function CategoryFilter({ 
  categories, 
  selectedCategory = 'all', 
  onCategoryChange,
  showAll = true,
  size = 'md',
  className = ''
}: CategoryFilterProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt-pt' || language === 'pt-br'

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {showAll && (
        <CategoryBadge
          category="Cultural" // Using Cultural as base for "All" styling
          size={size}
          variant="outlined"
          showIcon={false}
          onClick={() => onCategoryChange('all')}
          isSelected={selectedCategory === 'all'}
          className="!bg-gray-100 !text-gray-700 !border-gray-200 hover:!bg-gray-200"
        >
          <span>{isPortuguese ? 'Todos' : 'All'}</span>
        </CategoryBadge>
      )}
      {categories.map((category) => (
        <CategoryBadge
          key={category}
          category={category}
          size={size}
          variant="outlined"
          onClick={() => onCategoryChange(category)}
          isSelected={selectedCategory === category}
        />
      ))}
    </div>
  )
}