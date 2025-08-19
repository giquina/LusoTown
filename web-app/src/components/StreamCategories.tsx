'use client'

import { motion } from 'framer-motion'
import { Crown, Lock, Users, Briefcase, GraduationCap, Music, Camera } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface StreamCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  isPremium: boolean
  streamCount: number
}

interface StreamCategoriesProps {
  categories: StreamCategory[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
  hasActiveSubscription: boolean
}

export default function StreamCategories({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  hasActiveSubscription 
}: StreamCategoriesProps) {
  const { language } = useLanguage()

  const getColorClasses = (color: string, isSelected: boolean, isPremium: boolean, hasAccess: boolean) => {
    const colorMap = {
      primary: {
        bg: isSelected ? 'bg-primary-100 border-primary-500' : 'bg-white border-gray-200 hover:border-primary-300',
        text: isSelected ? 'text-primary-700' : 'text-gray-700',
        icon: isSelected ? 'text-primary-600' : 'text-primary-500',
        gradient: 'from-primary-500 to-primary-600'
      },
      secondary: {
        bg: isSelected ? 'bg-secondary-100 border-secondary-500' : 'bg-white border-gray-200 hover:border-secondary-300',
        text: isSelected ? 'text-secondary-700' : 'text-gray-700',
        icon: isSelected ? 'text-secondary-600' : 'text-secondary-500',
        gradient: 'from-secondary-500 to-secondary-600'
      },
      action: {
        bg: isSelected ? 'bg-action-100 border-action-500' : 'bg-white border-gray-200 hover:border-action-300',
        text: isSelected ? 'text-action-700' : 'text-gray-700',
        icon: isSelected ? 'text-action-600' : 'text-action-500',
        gradient: 'from-action-500 to-action-600'
      },
      accent: {
        bg: isSelected ? 'bg-accent-100 border-accent-500' : 'bg-white border-gray-200 hover:border-accent-300',
        text: isSelected ? 'text-accent-700' : 'text-gray-700',
        icon: isSelected ? 'text-accent-600' : 'text-accent-500',
        gradient: 'from-accent-500 to-accent-600'
      },
      premium: {
        bg: isSelected ? 'bg-premium-100 border-premium-500' : 'bg-white border-gray-200 hover:border-premium-300',
        text: isSelected ? 'text-premium-700' : 'text-gray-700',
        icon: isSelected ? 'text-premium-600' : 'text-premium-500',
        gradient: 'from-premium-500 to-premium-600'
      },
      coral: {
        bg: isSelected ? 'bg-coral-100 border-coral-500' : 'bg-white border-gray-200 hover:border-coral-300',
        text: isSelected ? 'text-coral-700' : 'text-gray-700',
        icon: isSelected ? 'text-coral-600' : 'text-coral-500',
        gradient: 'from-coral-500 to-coral-600'
      }
    }

    const baseColors = colorMap[color as keyof typeof colorMap] || colorMap.primary
    
    if (isPremium && !hasAccess) {
      return {
        bg: 'bg-gray-100 border-gray-300 opacity-75',
        text: 'text-gray-500',
        icon: 'text-gray-400',
        gradient: 'from-gray-400 to-gray-500'
      }
    }

    return baseColors
  }

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      'portuguese-culture': Music,
      'business-workshops': Briefcase,
      'community-events': Users,
      'student-sessions': GraduationCap,
      'vip-business': Crown,
      'behind-scenes': Camera
    }
    
    return iconMap[categoryId as keyof typeof iconMap] || Users
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Categorias 🇵🇹' : 'Categories 🇵🇹'}
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {categories.reduce((total, cat) => total + cat.streamCount, 0)} {language === 'pt' ? 'ao vivo' : 'live'}
        </div>
      </div>

      {/* All Categories Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategorySelect('all')}
        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 mb-4 ${
          selectedCategory === 'all'
            ? 'bg-gray-100 border-gray-500 text-gray-700'
            : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600`}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">
                {language === 'pt' ? 'Todas as Categorias' : 'All Categories'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'pt' ? 'Ver todo o conteúdo' : 'View all content'}
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600">
            {categories.reduce((total, cat) => total + cat.streamCount, 0)}
          </div>
        </div>
      </motion.button>

      {/* Mobile: Horizontal Scroll Categories */}
      <div className="block sm:hidden mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none]">
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          {/* All Categories Chip */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategorySelect('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border-2 transition-all touch-manipulation ${
              selectedCategory === 'all'
                ? 'bg-primary-100 border-primary-500 text-primary-700'
                : 'bg-white border-gray-200 text-gray-700 active:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'pt' ? 'Todas' : 'All'}
            </span>
            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
              {categories.reduce((total, cat) => total + cat.streamCount, 0)}
            </span>
          </motion.button>

          {/* Category Chips */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const hasAccess = !category.isPremium || hasActiveSubscription
            const colors = getColorClasses(category.color, isSelected, category.isPremium, hasAccess)
            const IconComponent = getCategoryIcon(category.id)

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: hasAccess ? 0.95 : 1 }}
                onClick={() => hasAccess && onCategorySelect(category.id)}
                disabled={!hasAccess}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border-2 transition-all touch-manipulation ${colors.bg} ${
                  hasAccess ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div className="relative">
                  <IconComponent className="w-4 h-4" />
                  {category.isPremium && (
                    <Crown className="w-2.5 h-2.5 text-premium-500 absolute -top-1 -right-1" />
                  )}
                </div>
                <span className={`text-sm font-medium ${colors.text}`}>
                  {category.name.split(' ')[0]} {/* Show first word only on mobile */}
                </span>
                <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                  {category.streamCount}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Desktop: Category Grid */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id
          const hasAccess = !category.isPremium || hasActiveSubscription
          const colors = getColorClasses(category.color, isSelected, category.isPremium, hasAccess)
          const IconComponent = getCategoryIcon(category.id)

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: hasAccess ? 1.02 : 1 }}
              whileTap={{ scale: hasAccess ? 0.98 : 1 }}
              onClick={() => hasAccess && onCategorySelect(category.id)}
              disabled={!hasAccess}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${colors.bg} ${
                hasAccess ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between h-full">
                <div className="flex items-start gap-3 flex-1 text-left">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${colors.gradient} relative`}>
                    <IconComponent className="w-5 h-5 text-white" />
                    {category.isPremium && (
                      <div className="absolute -top-1 -right-1 bg-premium-500 rounded-full p-0.5">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${colors.text} mb-1`}>
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {category.description}
                    </div>
                    {category.isPremium && !hasActiveSubscription && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-premium-600">
                        <Lock className="w-3 h-3" />
                        <span>{language === 'pt' ? 'Premium Necessário' : 'Premium Required'}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`text-sm font-medium ${colors.text} ml-2`}>
                  {category.streamCount}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Premium Upgrade Prompt */}
      {categories.some(cat => cat.isPremium && !hasActiveSubscription) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-premium-50 to-coral-50 border border-premium-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="bg-premium-500 p-2 rounded-lg">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? 'Desbloqueie Conteúdo Premium' : 'Unlock Premium Content'}
              </div>
              <div className="text-xs text-gray-600">
                {language === 'pt' 
                  ? 'Aceda a workshops exclusivos, mesas redondas VIP e conteúdo dos bastidores.'
                  : 'Access exclusive workshops, VIP roundtables, and behind-the-scenes content.'
                }
              </div>
            </div>
            <a
              href="/subscription"
              className="px-4 py-2 bg-premium-600 text-white text-sm font-medium rounded-lg hover:bg-premium-700 transition-colors"
            >
              {language === 'pt' ? 'Upgrade' : 'Upgrade'}
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}