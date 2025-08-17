'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { 
  HeartIcon as HeartSolidIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import { 
  HeartIcon,
  UserGroupIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'

// Mock data for favorites
const mockFavorites = [
  {
    id: '1',
    type: 'event',
    title: 'Noite de Fado & Vinho Verde',
    description: 'Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine.',
    date: '2025-08-16',
    time: '19:00',
    location: 'A Toca Restaurant, Stockwell',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
    category: 'Music & Entertainment',
    liked: true
  },
  {
    id: '2',
    type: 'business',
    title: 'Casa do Pão',
    description: 'Authentic Portuguese bakery and café in Shoreditch with the best pastéis de nata in London.',
    category: 'Café & Bakery',
    location: 'Shoreditch, London',
    rating: 4.8,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1574329818413-10376febd3f0?w=600&h=400&fit=crop&auto=format',
    liked: true
  },
  {
    id: '3',
    type: 'feed',
    title: 'Beautiful sunset at Hyde Park',
    description: 'Just enjoyed a lovely evening walk at Hyde Park. The sunset was absolutely magical! #HydePark #Sunset #London',
    author: 'Maria Santos',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=100&h=100&fit=crop&crop=face&auto=format',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    liked: true
  },
  {
    id: '4',
    type: 'event',
    title: 'Portuguese Book Club',
    description: 'Discussing "O Guarani" by José de Alencar. All Portuguese speakers and literature lovers welcome!',
    date: '2025-08-18',
    time: '18:30',
    location: 'Champor-Champor Restaurant, Elephant & Castle',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
    category: 'Books & Reading',
    liked: true
  }
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [activeTab, setActiveTab] = useState('all')

  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === activeTab)

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <CalendarDaysIcon className="w-5 h-5" />
      case 'business':
        return <BuildingStorefrontIcon className="w-5 h-5" />
      case 'feed':
        return <ChatBubbleLeftRightIcon className="w-5 h-5" />
      default:
        return <HeartIcon className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'event':
        return 'Event'
      case 'business':
        return 'Business'
      case 'feed':
        return 'Feed Post'
      default:
        return 'Item'
    }
  }

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                My <span className="gradient-text">Favorites</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                All the events, businesses, and posts you've saved. Easily access your favorite content anytime.
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'all'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Favorites
                </button>
                <button
                  onClick={() => setActiveTab('event')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'event'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                  Events
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'business'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BuildingStorefrontIcon className="w-5 h-5" />
                  Businesses
                </button>
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'feed'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Feed Posts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Favorites List */}
        <section className="py-12 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-16">
                  <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start saving your favorite events, businesses, and feed posts by clicking the heart icon.
                  </p>
                  <a 
                    href="/events" 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    Explore Events
                    <ArrowRightIcon className="w-5 h-5" />
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((favorite) => (
                    <div 
                      key={favorite.id} 
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {favorite.imageUrl ? (
                          <Image
                            src={favorite.imageUrl}
                            alt={favorite.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                            <div className="text-4xl">
                              {favorite.type === 'event' ? '🎉' : 
                               favorite.type === 'business' ? '🏪' : '📱'}
                            </div>
                          </div>
                        )}
                        
                        {/* Type Badge */}
                        <div className="absolute top-3 left-3">
                          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                            {getTypeIcon(favorite.type)}
                            {getTypeLabel(favorite.type)}
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFavorite(favorite.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                        
                        {/* Liked Indicator */}
                        <div className="absolute bottom-3 right-3">
                          <HeartSolidIcon className="w-6 h-6 text-red-500" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {favorite.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {favorite.description}
                        </p>
                        
                        {/* Type-specific details */}
                        {favorite.type === 'event' && (
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDaysIcon className="w-4 h-4" />
                              <span>{favorite.date} at {favorite.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{favorite.location}</span>
                            </div>
                            <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full inline-block">
                              {favorite.category}
                            </div>
                          </div>
                        )}
                        
                        {favorite.type === 'business' && (
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{favorite.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(favorite.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {favorite.rating} ({favorite.reviewCount} reviews)
                              </span>
                            </div>
                            <div className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full inline-block">
                              {favorite.category}
                            </div>
                          </div>
                        )}
                        
                        {favorite.type === "feed" && (
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={favorite.authorAvatar || ""}
                                alt={favorite.author || "User avatar"}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{favorite.author}</div>
                                <div className="text-xs text-gray-500">{favorite.timestamp}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <HeartSolidIcon className="w-4 h-4" />
                                {favorite.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                {favorite.comments}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Action Button */}
                        <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center">
                          {favorite.type === 'event' ? 'View Event Details' : 
                           favorite.type === 'business' ? 'View Business' : 
                           'View Post'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}