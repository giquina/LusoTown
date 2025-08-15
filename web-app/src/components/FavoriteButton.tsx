'use client'

import { useState, useEffect } from 'react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useFavorites } from '@/context/FavoritesContext'
import { toast } from 'react-hot-toast'

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
      return `${baseClasses} w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm ${className}`
    }
    
    return `${baseClasses} ${className}`
  }

  return (
    <button
      onClick={handleClick}
      className={getButtonClasses()}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
    >
      {isLiked ? (
        <HeartSolidIcon 
          className={`${sizeClasses[size]} text-action-500 hover:text-action-600 transition-colors`} 
        />
      ) : (
        <HeartOutlineIcon 
          className={`${sizeClasses[size]} ${variant === 'overlay' ? 'text-gray-600' : 'text-gray-400'} hover:text-action-500 transition-colors`} 
        />
      )}
    </button>
  )
}