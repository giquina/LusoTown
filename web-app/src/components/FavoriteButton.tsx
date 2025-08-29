'use client'

import { useState, useEffect } from 'react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/outline'
import { useFavorites } from '@/context/FavoritesContext'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
// Removed luxury imports - using standard components

interface FavoriteButtonProps {
  itemId: string
  itemType: 'event' | 'business' | 'feed'
  itemTitle: string
  itemDescription?: string
  itemImageUrl?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'overlay'
  className?: string
}

export default function FavoriteButton({
  itemId,
  itemType,
  itemTitle,
  itemDescription,
  itemImageUrl,
  size = 'md',
  variant = 'default',
  className = ''
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(isFavorite(itemId))
  }, [itemId, isFavorite])

  const handleClick = () => {
    const item = {
      id: itemId,
      type: itemType,
      title: itemTitle,
      description: itemDescription,
      imageUrl: itemImageUrl
    }

    toggleFavorite(item)
    setIsLiked(!isLiked)

    // Show toast notification
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites', {
      icon: isLiked ? '💔' : '❤️',
      duration: 2000
    })
  }

  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const getButtonClasses = () => {
    const baseClasses = 'flex items-center justify-center rounded-full transition-colors'
    
    if (variant === 'overlay') {
      return `${baseClasses} min-w-[44px] min-h-[44px] bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm ${className}`
    }
    
    return `${baseClasses} min-w-[44px] min-h-[44px] ${className}`
  }

  return (
    <div
      onClick={handleClick}
      className={getButtonClasses()}
      hapticFeedback="light"
      rippleColor={isLiked ? "rgba(239, 68, 68, 0.3)" : "rgba(156, 163, 175, 0.3)"}
    >
      <motion.div
        className="relative flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
      >
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 10 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <HeartSolidIcon 
                className={`${sizeClasses[size]} text-action-500 hover:text-action-600`} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="unliked"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <HeartOutlineIcon 
                className={`${sizeClasses[size]} ${variant === 'overlay' ? 'text-gray-600' : 'text-gray-400'} hover:text-action-500`} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Luxury heart burst animation on like */}
        <AnimatePresence>
          {isLiked && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Heart particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-action-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60) * Math.PI / 180) * 20,
                    y: Math.sin((i * 60) * Math.PI / 180) * 20,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}