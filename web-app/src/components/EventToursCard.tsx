'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  CheckIcon,
  SparklesIcon,
  AcademicCapIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Crown } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { formatEventDate } from '@/lib/dateUtils'
import { toast } from 'react-hot-toast'
import { EventTour } from '@/lib/events-tours'

interface EventToursCardProps {
  event: EventTour
  className?: string
}

export default function EventToursCard({ event, className = '' }: EventToursCardProps) {
  const { addToCart, isInCart, addToSaved, isSaved } = useCart()
  const { language, t } = useLanguage()
  const [addingToCart, setAddingToCart] = useState(false)
  
  const isPortuguese = language === 'pt'
  const inCart = isInCart(event.title)
  const savedItem = isSaved(event.title)

  const formatDate = (dateString: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateString, isPortuguese)
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatPrice = (price: number, currency: string = 'GBP') => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'
    return price === 0 ? (isPortuguese ? 'GRÁTIS' : 'FREE') : `${symbol}${price}`
  }

  const spotsLeft = event.maxAttendees - event.currentAttendees
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  const getCategoryColor = (category: string) => {
    const colors = {
      'Women 30+': 'bg-coral-500',
      'Women 40+': 'bg-premium-500',
      'Family-Friendly': 'bg-secondary-500',
      'Mixed Groups': 'bg-primary-500',
      'Cultural Heritage': 'bg-accent-500',
      'Professional Networking': 'bg-action-500'
    }
    return colors[category as keyof typeof colors] || 'bg-primary-500'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Women 30+': '👩‍💼',
      'Women 40+': '👩‍🏫',
      'Family-Friendly': '👨‍👩‍👧‍👦',
      'Mixed Groups': '🤝',
      'Cultural Heritage': '🏛️',
      'Professional Networking': '💼'
    }
    return icons[category as keyof typeof icons] || '🎯'
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: '🌟', color: 'text-green-600', label: isPortuguese ? 'Grátis' : 'Free' },
      core: { icon: '❤️', color: 'text-orange-600', label: isPortuguese ? 'Core+' : 'Core+' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'text-purple-600', label: isPortuguese ? 'Premium' : 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const handleAddToCart = async () => {
    if (inCart) {
      toast.success(isPortuguese ? 'Já está no carrinho!' : 'Already in cart!')
      return
    }

    setAddingToCart(true)
    
    try {
      addToCart({
        type: 'event',
        title: event.title,
        description: event.description,
        price: event.price,
        currency: event.currency,
        imageUrl: event.imageUrl,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventCategory: event.category,
        spotsLeft,
        requiresApproval: event.requiresApproval,
        membershipRequired: event.membershipRequired,
        maxQuantity: Math.min(spotsLeft, 4), // Max 4 tickets per person
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
        metadata: {
          hostName: event.hostName,
          endTime: event.endTime,
          featured: event.featured,
          averageRating: event.averageRating,
          totalReviews: event.totalReviews,
          groupExperience: event.groupExperience,
          ageRestriction: event.ageRestriction,
          portugueseOrigin: event.portugueseOrigin,
          highlights: event.highlights,
          groupSize: event.groupSize
        }
      })
    } catch (error) {
      toast.error(isPortuguese ? 'Erro ao adicionar ao carrinho' : 'Error adding to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleSaveForLater = () => {
    addToSaved({
      type: 'event',
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      category: event.category,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventPrice: event.price,
      metadata: {
        hostName: event.hostName,
        currency: event.currency,
        spotsLeft,
        membershipRequired: event.membershipRequired,
        featured: event.featured,
        groupExperience: event.groupExperience,
        highlights: event.highlights
      }
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col ${
        event.featured ? 'ring-2 ring-yellow-300' : ''
      } ${className}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {event.imageUrl ? (
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="text-4xl">{getCategoryIcon(event.category)}</div>
          </div>
        )}
        
        {/* Top Overlays */}
        <div className="absolute inset-x-0 top-0 p-4">
          <div className="flex items-start justify-between">
            {/* Badges Left */}
            <div className="flex flex-col gap-2">
              {event.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  {isPortuguese ? 'DESTAQUE' : 'FEATURED'}
                </span>
              )}
              {event.groupExperience && (
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <UserGroupIcon className="w-3 h-3" />
                  {isPortuguese ? 'GRUPO' : 'GROUP'}
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <div className="flex gap-2">
              <FavoriteButton
                itemId={event.id}
                itemType="event"
                itemTitle={event.title}
                itemDescription={event.description}
                itemImageUrl={event.imageUrl}
                size="sm"
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom Overlays */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between">
            {/* Category Badge */}
            <span className={`${getCategoryColor(event.category)} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
              <span className="text-sm">{getCategoryIcon(event.category)}</span>
              {event.category}
            </span>
            
            {/* Availability Status */}
            <div>
              {isFull ? (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {isPortuguese ? 'LOTADO' : 'FULL'}
                </span>
              ) : isAlmostFull ? (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {isPortuguese ? `${spotsLeft} VAGA${spotsLeft === 1 ? '' : 'S'}` : `${spotsLeft} SPOT${spotsLeft === 1 ? '' : 'S'} LEFT`}
                </span>
              ) : (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {isPortuguese ? `${spotsLeft} VAGAS` : `${spotsLeft} SPOTS`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Header - Title & Price */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
            {event.title}
          </h3>
          <div className="ml-3 text-right flex-shrink-0">
            <div className="text-lg font-bold text-primary-600">
              {formatPrice(event.price, event.currency)}
            </div>
            {event.membershipRequired !== 'free' && (
              <div className={`text-xs flex items-center justify-end gap-1 mt-1 ${getMembershipBadge(event.membershipRequired).color}`}>
                {getMembershipBadge(event.membershipRequired).icon}
                {getMembershipBadge(event.membershipRequired).label}
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDaysIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
              <div className="text-xs text-gray-500">
                {formatTime(event.time)}{event.endTime && ` - ${formatTime(event.endTime)}`}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{event.location}</div>
              <div className="text-xs text-gray-500 truncate">{event.address}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <UserGroupIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {event.currentAttendees}/{event.maxAttendees} {isPortuguese ? 'Participantes' : 'Attending'}
              </div>
              <div className="text-xs text-gray-500">
                {event.groupSize} • {isPortuguese ? 'Organizado por' : 'Hosted by'} {event.hostName}
              </div>
            </div>
          </div>

          {/* Age Restriction */}
          {event.ageRestriction && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <AcademicCapIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                {event.ageRestriction}
              </span>
            </div>
          )}

          {/* Portuguese Origins */}
          {event.portugueseOrigin && event.portugueseOrigin.length > 0 && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <GlobeAltIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {event.portugueseOrigin.map((origin) => (
                  <span key={origin} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {origin}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          {event.averageRating && event.averageRating > 0 && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <StarIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">
                  {event.averageRating.toFixed(1)} ⭐ ({event.totalReviews} {isPortuguese ? 'avaliações' : 'reviews'})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              {isPortuguese ? 'Destaques da Experiência:' : 'Experience Highlights:'}
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {event.highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  {highlight}
                </li>
              ))}
              {event.highlights.length > 2 && (
                <li className="text-gray-500 text-xs">
                  +{event.highlights.length - 2} {isPortuguese ? 'mais destaques' : 'more highlights'}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Warnings */}
        <div className="mb-4 space-y-1">
          {event.requiresApproval && (
            <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block">
              {isPortuguese ? '⏳ Requer aprovação' : '⏳ Requires approval'}
            </div>
          )}
          {isAlmostFull && (
            <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full inline-block ml-2">
              {isPortuguese ? '🔥 Últimas vagas' : '🔥 Few spots left'}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={`/events/${event.id}?type=tour`}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm"
            >
              {isPortuguese ? 'Ver Detalhes' : 'View Details'}
            </a>
            
            {isFull ? (
              <button className="border border-red-300 text-red-600 bg-red-50 font-semibold py-3 px-4 rounded-lg hover:bg-red-100 transition-colors text-center text-sm">
                {isPortuguese ? 'Lista de Espera' : 'Join Waitlist'}
              </button>
            ) : (
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart || inCart}
                className={`font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center text-sm flex items-center justify-center gap-2 ${
                  inCart 
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {addingToCart ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : inCart ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    {isPortuguese ? 'No Carrinho' : 'In Cart'}
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-4 h-4" />
                    {isPortuguese ? 'Reservar Vaga' : 'Reserve Spot'}
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Secondary Action */}
          <button
            onClick={handleSaveForLater}
            className="w-full text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <HeartIcon className="w-4 h-4" />
            {savedItem 
              ? (isPortuguese ? 'Guardado nos Favoritos' : 'Saved to Favorites')
              : (isPortuguese ? 'Guardar para Mais Tarde' : 'Save for Later')
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}