'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { Crown } from 'lucide-react'

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
}

interface ChauffeurServiceCardProps {
  tier: ServiceTier
  isPortuguese: boolean
  onBookNow: () => void
  index: number
}

export default function ChauffeurServiceCard({ 
  tier, 
  isPortuguese, 
  onBookNow, 
  index 
}: ChauffeurServiceCardProps) {
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
      } overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-premium-600 to-premium-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4" />
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
      <div className={`bg-gradient-to-br ${colors.bg} px-6 py-8 text-center ${tier.popular ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {isPortuguese ? tier.namePortuguese : tier.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {isPortuguese ? tier.descriptionPortuguese : tier.description}
        </p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-black bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">£{tier.price}</span>
          <span className="text-gray-500 ml-1 font-medium">/hour</span>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-8">
        <ul className="space-y-4">
          {(isPortuguese ? tier.featuresPortuguese : tier.features).map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <CheckCircleIcon className={`w-5 h-5 ${colors.text} mt-0.5 mr-3 flex-shrink-0`} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <button
          onClick={onBookNow}
          className={`w-full ${colors.button} text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1`}
        >
          {isPortuguese ? 'Reservar Agora' : 'Book Now'}
        </button>
        
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
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                {isPortuguese ? 'Nível Médio' : 'Medium Level'}
              </>
            )}
            {tier.id === 'vip' && (
              <>
                <Crown className="w-3 h-3 mr-2" />
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