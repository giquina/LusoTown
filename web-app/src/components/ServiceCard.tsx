'use client'

import { motion } from 'framer-motion'
import { StarIcon, CheckCircleIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon, Users, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { addServiceToCart, createServiceCartItem } from '@/lib/serviceCartUtils'

interface Service {
  id: string
  name: string
  namePortuguese: string
  price: number
  maxPrice: number
  priceUnit: string
  priceUnitPortuguese: string
  icon: React.ComponentType<any>
  color: string
  image: string
  description: string
  descriptionPortuguese: string
  features: string[]
  featuresPortuguese: string[]
  popular: boolean
  testimonials: number
  rating: number
  bookings: string
  premium?: boolean
}

interface ServiceCardProps {
  service: Service
  isPortuguese: boolean
  onBookNow: () => void
  index: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isPortuguese, onBookNow, index }) => {
  const IconComponent = service.icon
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  
  const isServiceFavorited = isFavorite(service.id, 'service')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    const success = addServiceToCart(
      {
        id: service.id,
        name: service.name,
        namePortuguese: service.namePortuguese,
        price: service.price,
        maxPrice: service.maxPrice,
        priceUnit: service.priceUnit,
        priceUnitPortuguese: service.priceUnitPortuguese,
        description: service.description,
        descriptionPortuguese: service.descriptionPortuguese,
        image: service.image,
        category: service.color,
        rating: service.rating
      },
      addToCart,
      isPortuguese
    )
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isServiceFavorited) {
      removeFromFavorites(service.id, 'service')
    } else {
      addToFavorites({
        id: service.id,
        type: 'service',
        title: isPortuguese ? service.namePortuguese : service.name,
        description: isPortuguese ? service.descriptionPortuguese : service.description,
        url: `/services#${service.id}`,
        imageUrl: service.image,
        category: service.color,
        addedAt: new Date().toISOString()
      })
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        text: 'text-primary-600',
        button: 'bg-primary-600 hover:bg-primary-700',
        icon: 'text-primary-500'
      },
      secondary: {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        text: 'text-secondary-600',
        button: 'bg-secondary-600 hover:bg-secondary-700',
        icon: 'text-secondary-500'
      },
      premium: {
        bg: 'bg-premium-50',
        border: 'border-premium-200',
        text: 'text-premium-600',
        button: 'bg-premium-600 hover:bg-premium-700',
        icon: 'text-premium-500'
      },
      accent: {
        bg: 'bg-accent-50',
        border: 'border-accent-200',
        text: 'text-accent-600',
        button: 'bg-accent-600 hover:bg-accent-700',
        icon: 'text-accent-500'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.primary
  }

  const colorClasses = getColorClasses(service.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${colorClasses.border} overflow-hidden group h-[600px] sm:h-[650px] flex flex-col`}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.text} text-sm font-semibold rounded-full border ${colorClasses.border}`}>
            {isPortuguese ? 'Mais Popular' : 'Most Popular'}
          </div>
        </div>
      )}

      {/* Premium Badge */}
      {service.premium && (
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 bg-premium-100 text-premium-700 text-sm font-semibold rounded-full border border-premium-200 flex items-center">
            <StarIcon className="w-4 h-4 mr-1" />
            {isPortuguese ? 'Premium' : 'Premium'}
          </div>
        </div>
      )}

      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={isPortuguese ? service.namePortuguese : service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Service Icon */}
        <div className={`absolute bottom-4 left-4 p-3 bg-white rounded-xl shadow-lg ${colorClasses.icon}`}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
              isServiceFavorited 
                ? 'bg-action-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-white'
            }`}
          >
            <HeartIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="p-2 bg-white/90 text-gray-600 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {isPortuguese ? service.namePortuguese : service.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {isPortuguese ? service.descriptionPortuguese : service.description}
          </p>
          
          {/* Pricing */}
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              £{service.price}
            </span>
            {service.maxPrice !== service.price && (
              <span className="text-lg text-gray-500">
                - £{service.maxPrice}
              </span>
            )}
            <span className="text-sm text-gray-500">
              /{isPortuguese ? service.priceUnitPortuguese : service.priceUnit}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 flex-1">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            {isPortuguese ? 'Características' : 'Features'}
          </h4>
          <ul className="space-y-2">
            {(isPortuguese ? service.featuresPortuguese : service.features).slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircleIcon className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${colorClasses.icon}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between mb-6 py-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-gray-700">{service.rating}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{service.testimonials}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">{service.bookings}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          className={`w-full ${colorClasses.button} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center group`}
        >
          <span>{isPortuguese ? 'Reservar Agora' : 'Book Now'}</span>
          <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ServiceCard