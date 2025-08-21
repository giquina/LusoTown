'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface FavoriteItem {
  id: string
  type: 'event' | 'business' | 'feed'
  title: string
  description?: string
  imageUrl?: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (item: FavoriteItem) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('lusotown-favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Error parsing saved favorites:', error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lusotown-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      // Prevent duplicates
      if (prev.some(fav => fav.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id)
  }

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id)
    } else {
      addFavorite(item)
    }
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}