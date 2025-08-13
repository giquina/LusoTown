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
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function FavoriteButton({
  itemId,
  itemType,
  itemTitle,
  itemDescription,
  itemImageUrl,
  size = 'md',
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
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full transition-colors ${className}`}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
    >
      {isLiked ? (
        <HeartSolidIcon 
          className={`${sizeClasses[size]} text-red-500 hover:text-red-600 transition-colors`} 
        />
      ) : (
        <HeartOutlineIcon 
          className={`${sizeClasses[size]} text-gray-400 hover:text-red-500 transition-colors`} 
        />
      )}
    </button>
  )
}