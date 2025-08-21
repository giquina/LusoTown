'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, StarIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Crown } from 'lucide-react'
import { isServiceAvailable, getServiceStatus, getAvailabilityStyles, getAvailabilityLabel } from '@/lib/serviceAvailability'

interface ServiceTier {
  id: string
  name: string
  namePortuguese: string
  price: number
  description: string
  descriptionPortuguese: string
  features: string[]
  featuresPortuguese: string[]
  popular: boolean
  color: string
  image?: string
  imageAlt?: string
  imageAltPortuguese?: string
  serviceKey?: string // Map to service availability system
}

interface TransportServiceCardProps {
  tier: ServiceTier
  isPortuguese: boolean
  onBookNow: () => void
  index: number
}

export default function TransportServiceCard({ 
  tier, 
  isPortuguese, 
  onBookNow, 
  index 
}: TransportServiceCardProps) {
  // Check service availability
  const serviceKey = tier.serviceKey || tier.id;
  const serviceStatus = getServiceStatus(serviceKey);
  const available = isServiceAvailable(serviceKey);
  const availabilityStyles = serviceStatus ? getAvailabilityStyles(serviceStatus.status) : null;
  const availabilityLabel = serviceStatus ? getAvailabilityLabel(serviceStatus.status, isPortuguese) : null;
  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'from-primary-50 to-primary-100',
        border: 'border-primary-200',
        button: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800',
        text: 'text-primary-600',
        badge: 'bg-primary-100 text-primary-800'
      },
      secondary: {
        bg: 'from-secondary-50 to-secondary-100',
        border: 'border-secondary-200',
        button: 'bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800',
        text: 'text-secondary-600',
        badge: 'bg-secondary-100 text-secondary-800'
      },
      premium: {
        bg: 'from-premium-50 to-premium-100',
        border: 'border-premium-200',
        button: 'bg-gradient-to-r from-premium-600 to-premium-700 hover:from-premium-700 hover:to-premium-800',
        text: 'text-premium-600',
        badge: 'bg-premium-100 text-premium-800'
      },
      action: {
        bg: 'from-action-50 to-action-100',
        border: 'border-action-200',
        button: 'bg-gradient-to-r from-action-600 to-action-700 hover:from-action-700 hover:to-action-800',
        text: 'text-action-600',
        badge: 'bg-action-100 text-action-800'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.primary
  }

  const colors = getColorClasses(tier.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 ${
        tier.popular ? 'border-premium-300 shadow-3xl scale-105' : colors.border
      } overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-transecondary-y-3 hover:scale-105 group h-[750px] sm:h-[800px] flex flex-col`}
    >
      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-20">
        {available ? (
          <div className={`${availabilityStyles?.bg} ${availabilityStyles?.text} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border ${availabilityStyles?.border}`}>
            <div className="flex items-center space-x-1.5">
              <CheckCircleIcon className="w-3 h-3 flex-shrink-0" />
              <span>{availabilityLabel}</span>
            </div>
          </div>
        ) : (
          <div className={`${availabilityStyles?.bg} ${availabilityStyles?.text} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border ${availabilityStyles?.border}`}>
            <div className="flex items-center space-x-1.5">
              <ClockIcon className="w-3 h-3 flex-shrink-0" />
              <span>{availabilityLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute top-4 left-1/2 transform -transecondary-x-1/2 z-20">
          <div className="bg-gradient-to-r from-premium-600 to-premium-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl whitespace-nowrap border-2 border-white">
            <div className="flex items-center justify-center space-x-1.5">
              <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{isPortuguese ? 'Mais Popular' : 'Most Popular'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Service Image */}
      {tier.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={tier.image} 
            alt={isPortuguese ? (tier.imageAltPortuguese || tier.imageAlt || '') : (tier.imageAlt || '')}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${colors.bg} px-6 py-8 text-center ${tier.popular ? 'pt-16' : ''}`}>
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {isPortuguese ? tier.namePortuguese : tier.name}
        </h3>
        <p className="text-secondary-600 mb-4">
          {isPortuguese ? tier.descriptionPortuguese : tier.description}
        </p>
        <div className="flex items-baseline justify-center">
          <span className="text-gray-500 text-lg font-medium mr-1">From</span>
          <span className="text-4xl font-black bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">£{tier.price}</span>
          <span className="text-gray-500 ml-1 font-medium">/hour</span>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-6 flex-1 overflow-y-auto">
        <ul className="space-y-3">
          {(isPortuguese ? tier.featuresPortuguese : tier.features).map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <CheckCircleIcon className={`w-4 h-4 ${colors.text} mt-1 mr-3 flex-shrink-0`} />
              <span className="text-sm text-secondary-700 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-6">
        {available ? (
          <button
            onClick={onBookNow}
            className={`w-full ${colors.button} text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-transecondary-y-1`}
          >
            {isPortuguese ? 'Reservar' : 'Book Now'}
          </button>
        ) : (
          <div className="space-y-3">
            <button
              className="w-full bg-secondary-400 text-white py-4 px-6 rounded-2xl font-bold cursor-not-allowed opacity-60"
              disabled
            >
              {serviceStatus?.status === 'fully_booked' 
                ? (isPortuguese ? 'Esgotado' : 'Fully Booked')
                : (isPortuguese ? 'Indisponível' : 'Unavailable')
              }
            </button>
            {serviceStatus?.waitingListAvailable && (
              <button
                onClick={() => {
                  // Handle waiting list signup
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waiting List'}
              </button>
            )}
            {serviceStatus?.estimatedAvailability && (
              <p className="text-xs text-secondary-600 text-center">
                {isPortuguese ? 'Estimativa: ' : 'Estimated: '}
                {isPortuguese ? serviceStatus.estimatedAvailabilityPortuguese : serviceStatus.estimatedAvailability}
              </p>
            )}
          </div>
        )}
        
        {/* Security Level Indicator */}
        <div className="mt-4 flex justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colors.badge} shadow-md`}>
            {tier.id === 'essential' && (
              <>
                <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                {isPortuguese ? 'Nível Básico' : 'Basic Level'}
              </>
            )}
            {tier.id === 'premium' && (
              <>
                <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                {isPortuguese ? 'Nível Premium' : 'Premium Level'}
              </>
            )}
            {tier.id === 'vip' && (
              <>
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                {isPortuguese ? 'Nível VIP' : 'VIP Level'}
              </>
            )}
            {tier.id === 'elite' && (
              <>
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                {isPortuguese ? 'Nível Elite' : 'Elite Level'}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}