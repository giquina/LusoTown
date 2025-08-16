'use client'

import { useState } from 'react'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useAuthRequired } from '@/hooks/useAuthRequired'
import { formatEventDate } from '@/lib/dateUtils'
import { toast } from 'react-hot-toast'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  maxAttendees: number
  currentAttendees: number
  category: string
  price: number
  currency?: string
  imageUrl?: string
  hostName?: string
  hostImage?: string
  membershipRequired?: 'free' | 'core' | 'premium'
  requiresApproval?: boolean
  featured?: boolean
  averageRating?: number
  totalReviews?: number
}

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  endTime,
  location,
  maxAttendees,
  currentAttendees,
  category,
  price,
  currency = 'GBP',
  imageUrl,
  hostName,
  hostImage,
  membershipRequired = 'free',
  requiresApproval = false,
  featured = false,
  averageRating = 0,
  totalReviews = 0
}: EventCardProps) {
  const { addToCart, isInCart, addToSaved, isSaved } = useCart()
  const { language } = useLanguage()
  const { requireAuthForCart, requireAuthForDetails } = useAuthRequired()
  const [addingToCart, setAddingToCart] = useState(false)
  
  const isPortuguese = language === 'pt'
  const inCart = isInCart(title)
  const savedItem = isSaved(title)

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

  const spotsLeft = maxAttendees - currentAttendees
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  const handleAddToCart = async () => {
    if (inCart) {
      toast.success(isPortuguese ? 'Já está no carrinho!' : 'Already in cart!')
      return
    }

    const cartItemData = {
      type: 'event',
      title,
      description,
      price,
      currency,
      imageUrl,
      eventDate: date,
      eventTime: time,
      eventLocation: location,
      eventCategory: category,
      spotsLeft,
      requiresApproval,
      membershipRequired,
      maxQuantity: Math.min(spotsLeft, 4), // Max 4 tickets per person
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
      metadata: {
        hostName,
        endTime,
        featured,
        averageRating,
        totalReviews
      }
    }

    const addToCartAction = () => {
      setAddingToCart(true)
      
      try {
        addToCart(cartItemData)
      } catch (error) {
        toast.error(isPortuguese ? 'Erro ao adicionar ao carrinho' : 'Error adding to cart')
      } finally {
        setAddingToCart(false)
      }
    }

    // Use auth-required hook - will show popup if not authenticated
    requireAuthForCart(addToCartAction, id, title, cartItemData)
  }

  const handleSaveForLater = () => {
    addToSaved({
      type: 'event',
      title,
      description,
      imageUrl,
      category,
      eventDate: date,
      eventTime: time,
      eventLocation: location,
      eventPrice: price,
      metadata: {
        hostName,
        currency,
        spotsLeft,
        membershipRequired,
        featured
      }
    })
  }

  return (
    <div className={`h-[500px] sm:h-[550px] lg:h-[600px] flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group ${featured ? "ring-2 ring-yellow-300" : ""}`}>
      {/* Image */}
      <div className="relative h-48 sm:h-52 bg-cover bg-center rounded-t-xl overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={featured}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="text-4xl">🎉</div>
          </div>
        )}
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              ⭐ {isPortuguese ? 'DESTAQUE' : 'FEATURED'}
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            itemId={id}
            itemType="event"
            itemTitle={title}
            itemDescription={description}
            itemImageUrl={imageUrl}
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          />
        </div>
        

        {/* Bottom Overlays Container - Fixed positioning to prevent overlap */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="flex items-end justify-between gap-2">
            {/* Category Badge */}
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
              {category}
            </span>
            
            {/* Availability Status */}
            <div className="flex-shrink-0">
              {isFull ? (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {isPortuguese ? 'LOTADO' : 'FULL'}
                </span>
              ) : isAlmostFull ? (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {spotsLeft} {isPortuguese ? 'vagas' : 'spots'} left
                </span>
              ) : (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {spotsLeft} {isPortuguese ? 'vagas' : 'spots'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section - flexible */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        {/* Title - ensure full visibility */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        
        {/* Subtitle - ensure full visibility */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
          {description}
        </p>
        
        {/* Event details - one line format */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-gray-500 truncate mr-2">{hostName || 'Event Host'}</span>
          <span className="text-primary-600 font-medium flex-shrink-0">{spotsLeft} spots available</span>
        </div>
        
        {/* Date, Time & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDaysIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <span className="font-medium text-gray-900 truncate">{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <span className="font-medium text-gray-600 truncate">
              {formatTime(time)}{endTime && ` - ${formatTime(endTime)}`}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 text-right">
          <div className="text-lg sm:text-xl font-bold text-primary-600">
            {formatPrice(price, currency)}
          </div>
          {membershipRequired !== 'free' && (
            <div className="text-xs text-gray-500 capitalize font-medium">
              {isPortuguese ? 'Membro' : 'Member'}
            </div>
          )}
        </div>

        {/* Warnings */}
        <div className="mb-4 space-y-1">
          {requiresApproval && (
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
        
        {/* CTA button - always at bottom */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => requireAuthForDetails(
                () => window.location.href = `/events/${id}`,
                id,
                `/events/${id}`
              )}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm"
            >
              {isPortuguese ? 'Ver Detalhes' : 'View Details'}
            </button>
            
            {isFull ? (
              <button className="border border-red-300 text-red-600 bg-red-50 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 transition-colors text-center text-sm">
                {isPortuguese ? 'Lista' : 'Waitlist'}
              </button>
            ) : (
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart || inCart}
                className={`font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center text-sm flex items-center justify-center gap-1 ${
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
                    <span className="hidden sm:inline">{isPortuguese ? 'No Carrinho' : 'In Cart'}</span>
                    <span className="sm:hidden">{isPortuguese ? 'Carrinho' : 'Cart'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{isPortuguese ? 'Adicionar' : 'Add to Cart'}</span>
                    <span className="sm:hidden">{isPortuguese ? 'Adicionar' : 'Add'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}