'use client'

import { useState, useEffect } from 'react'
import { useFavorites } from '@/context/FavoritesContext'
import { HeartIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function FavoriteNotification() {
  const { favorites } = useFavorites()
  const [lastAdded, setLastAdded] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (favorites.length > 0) {
      const lastItem = favorites[favorites.length - 1]
      setLastAdded(lastItem.title)
      setIsVisible(true)
      
      // Hide notification after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [favorites])

  return (
    <AnimatePresence>
      {isVisible && lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HeartIcon className="w-4 h-4 text-coral-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Saved to Favourites</h4>
                <p className="text-secondary-600 text-xs mt-1 line-clamp-2">{lastAdded}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}