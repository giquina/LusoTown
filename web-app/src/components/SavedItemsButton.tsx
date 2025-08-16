'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { isAuthenticated, useAuthState } from '@/lib/auth'

interface SavedItemsButtonProps {
  showCount?: boolean
  iconOnly?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function SavedItemsButton({ 
  showCount = true, 
  iconOnly = true,
  size = 'medium',
  className = ''
}: SavedItemsButtonProps) {
  const { savedCount } = useCart()
  const { t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
  }, [])

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      setIsLoggedIn(!!user)
    })
    return unsubscribe
  }, [])

  // Don't render if user is not authenticated
  if (!isLoggedIn) {
    return null
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'p-2'
      case 'large':
        return 'p-3'
      default:
        return 'p-3'
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4'
      case 'large':
        return 'w-7 h-7'
      default:
        return 'w-5 h-5 sm:w-6 sm:h-6'
    }
  }

  return (
    <Link 
      href="/saved"
      className={`relative text-gray-600 hover:text-primary-500 transition-colors group ${getSizeClasses()} ${className} min-h-[44px] min-w-[44px] flex items-center justify-center`}
      title={t('favorites.view-all')}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {savedCount > 0 ? (
          <HeartSolidIcon className={`${getIconSize()} text-action-500`} />
        ) : (
          <HeartIcon className={getIconSize()} />
        )}
        
        {/* Count Badge */}
        {showCount && savedCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-action-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold"
          >
            {savedCount > 99 ? '99+' : savedCount}
          </motion.div>
        )}
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          {savedCount > 0 
            ? `${savedCount} saved ${savedCount === 1 ? 'item' : 'items'}`
            : t('favorites.view-all')
          }
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </motion.div>
      
      {/* Label for non-icon-only mode */}
      {!iconOnly && (
        <span className="ml-2 font-medium text-sm">
          {t('favorites.title')}
        </span>
      )}
    </Link>
  )
}