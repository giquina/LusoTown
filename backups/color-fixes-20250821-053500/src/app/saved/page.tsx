'use client'
import Image from 'next/image'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import {
  HeartIcon as HeartSolidIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  XMarkIcon,
  ShoppingCartIcon,
  TrashIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/solid'
import { HeartIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

export default function SavedItemsPage() {
  const { savedItems, removeFromSaved, addToCart, isInCart, cartCount } = useCart()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'all' | 'event' | 'business' | 'feed' | 'group'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'date'>('recent')
  
  const isPortuguese = language === 'pt'

  const filteredItems = activeTab === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.type === activeTab)

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'date':
        if (a.eventDate && b.eventDate) {
          return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        }
        return 0
      case 'recent':
      default:
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <CalendarDaysIcon className="w-5 h-5 text-primary-500" />
      case 'business':
        return <BuildingStorefrontIcon className="w-5 h-5 text-secondary-500" />
      case 'feed':
        return <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-500" />
      case 'group':
        return <UserGroupIcon className="w-5 h-5 text-green-500" />
      default:
        return <HeartIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      'event': isPortuguese ? 'Evento' : 'Event',
      'business': isPortuguese ? 'Negócio' : 'Business',
      'feed': isPortuguese ? 'Publicação' : 'Post',
      'group': isPortuguese ? 'Grupo' : 'Group'
    }
    return labels[type as keyof typeof labels] || 'Item'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleAddToCart = (item: typeof savedItems[0]) => {
    if (item.type === 'event' && item.eventPrice !== undefined) {
      addToCart({
        type: 'event',
        title: item.title,
        description: item.description,
        price: item.eventPrice,
        currency: 'GBP',
        imageUrl: item.imageUrl,
        eventDate: item.eventDate,
        eventTime: item.eventTime,
        eventLocation: item.eventLocation,
        eventCategory: item.category,
        metadata: item.metadata
      })
      toast.success(isPortuguese ? 'Adicionado ao carrinho!' : 'Added to cart!')
    }
  }

  const getTabCount = (type: 'all' | 'event' | 'business' | 'feed' | 'group') => {
    if (type === 'all') return savedItems.length
    return savedItems.filter(item => item.type === type).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                {isPortuguese ? 'Itens Guardados' : 'Saved Items'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-8"
              >
                {isPortuguese 
                  ? 'Todos os eventos, negócios e publicações que guardaste. Acede facilmente ao conteúdo que mais gostas.'
                  : 'All the events, businesses, and posts you\'ve saved. Easily access your favorite content anytime.'
                }
              </motion.p>
              
              {savedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center items-center gap-6 mb-8"
                >
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">{savedItems.length}</div>
                    <div className="text-sm text-gray-600">{isPortuguese ? 'Itens Guardados' : 'Saved Items'}</div>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-2xl font-bold text-secondary-600">{cartCount}</div>
                    <div className="text-sm text-gray-600">{isPortuguese ? 'No Carrinho' : 'In Cart'}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              
              {savedItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isPortuguese ? 'Nenhum item guardado' : 'No saved items yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isPortuguese 
                      ? 'Começa a guardar os teus eventos, negócios e publicações favoritas clicando no ícone do coração.'
                      : 'Start saving your favorite events, businesses, and posts by clicking the heart icon.'
                    }
                  </p>
                  <a 
                    href={ROUTES.events} 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    {isPortuguese ? 'Explorar Eventos' : 'Explore Events'}
                    <ArrowRightIcon className="w-5 h-5" />
                  </a>
                </motion.div>
              ) : (
                <>
                  {/* Filters and Controls */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        { key: 'all', label: isPortuguese ? 'Todos' : 'All' },
                        { key: 'event', label: isPortuguese ? 'Eventos' : 'Events' },
                        { key: 'business', label: isPortuguese ? 'Negócios' : 'Businesses' },
                        { key: 'feed', label: isPortuguese ? 'Publicações' : 'Posts' },
                        { key: 'group', label: isPortuguese ? 'Grupos' : 'Groups' }
                      ].map((tab) => {
                        const count = getTabCount(tab.key as any)
                        return (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                              activeTab === tab.key
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {getTypeIcon(tab.key)}
                            {tab.label} ({count})
                          </button>
                        )
                      })}
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FunnelIcon className="w-5 h-5 text-gray-400" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                        >
                          <option value="recent">{isPortuguese ? 'Mais Recentes' : 'Most Recent'}</option>
                          <option value="alphabetical">{isPortuguese ? 'Alfabética' : 'Alphabetical'}</option>
                          <option value="date">{isPortuguese ? 'Data do Evento' : 'Event Date'}</option>
                        </select>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {sortedItems.length} {isPortuguese ? (sortedItems.length === 1 ? 'item' : 'itens') : (sortedItems.length === 1 ? 'item' : 'items')}
                      </div>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {sortedItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            {item.imageUrl ? (
                              <Image 
                                src={item.imageUrl} 
                                alt={item.title}
                                fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                <div className="text-4xl">
                                  {item.type === 'event' ? '🎉' : 
                                   item.type === 'business' ? '🏪' : 
                                   item.type === 'group' ? '👥' : '📱'}
                                </div>
                              </div>
                            )}
                            
                            {/* Type Badge */}
                            <div className="absolute top-3 left-3">
                              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                                {getTypeIcon(item.type)}
                                {getTypeLabel(item.type)}
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromSaved(item.id)}
                              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                              title={isPortuguese ? 'Remover dos guardados' : 'Remove from saved'}
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                            
                            {/* Saved Indicator */}
                            <div className="absolute bottom-3 right-3">
                              <HeartSolidIcon className="w-6 h-6 text-red-500" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                              {item.title}
                            </h3>
                            
                            {item.description && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                            
                            {/* Type-specific details */}
                            <div className="space-y-2 mb-4">
                              {item.type === 'event' && (
                                <>
                                  {item.eventDate && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <CalendarDaysIcon className="w-4 h-4" />
                                      <span>{formatDate(item.eventDate)} • {item.eventTime}</span>
                                    </div>
                                  )}
                                  {item.eventLocation && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <MapPinIcon className="w-4 h-4" />
                                      <span className="truncate">{item.eventLocation}</span>
                                    </div>
                                  )}
                                  {item.eventPrice !== undefined && (
                                    <div className="text-lg font-bold text-primary-600">
                                      {item.eventPrice === 0 ? (isPortuguese ? 'GRÁTIS' : 'FREE') : `£${item.eventPrice}`}
                                    </div>
                                  )}
                                </>
                              )}
                              
                              {item.type === 'business' && (
                                <>
                                  {item.businessLocation && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <MapPinIcon className="w-4 h-4" />
                                      <span>{item.businessLocation}</span>
                                    </div>
                                  )}
                                  {item.businessRating && (
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                      <StarIcon className="w-4 h-4 text-yellow-500" />
                                      <span>{item.businessRating} rating</span>
                                    </div>
                                  )}
                                </>
                              )}
                              
                              {item.category && (
                                <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block">
                                  {item.category}
                                </div>
                              )}
                            </div>

                            {/* Saved info */}
                            <div className="text-xs text-gray-500 mb-4">
                              {isPortuguese ? 'Guardado em' : 'Saved'} {new Date(item.savedAt).toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB')}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              {item.type === 'event' && item.eventPrice !== undefined && (
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  disabled={isInCart(item.title)}
                                  className={`flex-1 font-medium py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
                                    isInCart(item.title)
                                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                                  }`}
                                >
                                  <ShoppingCartIcon className="w-4 h-4" />
                                  {isInCart(item.title) 
                                    ? (isPortuguese ? 'No Carrinho' : 'In Cart')
                                    : (isPortuguese ? 'Adicionar' : 'Add to Cart')
                                  }
                                </button>
                              )}
                              
                              <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2 px-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm">
                                {item.type === 'event' ? (isPortuguese ? 'Ver Evento' : 'View Event') : 
                                 item.type === 'business' ? (isPortuguese ? 'Ver Negócio' : 'View Business') : 
                                 (isPortuguese ? 'Ver Publicação' : 'View Post')}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}