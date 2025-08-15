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
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        button: 'bg-primary-600 hover:bg-primary-700',
        text: 'text-primary-600',
        badge: 'bg-primary-100 text-primary-800'
      },
      secondary: {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        button: 'bg-secondary-600 hover:bg-secondary-700',
        text: 'text-secondary-600',
        badge: 'bg-secondary-100 text-secondary-800'
      },
      premium: {
        bg: 'bg-premium-50',
        border: 'border-premium-200',
        button: 'bg-premium-600 hover:bg-premium-700',
        text: 'text-premium-600',
        badge: 'bg-premium-100 text-premium-800'
      },
      action: {
        bg: 'bg-action-50',
        border: 'border-action-200',
        button: 'bg-action-600 hover:bg-action-700',
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
      className={`relative bg-white rounded-xl shadow-lg border-2 ${
        tier.popular ? 'border-premium-300 shadow-xl scale-105' : colors.border
      } overflow-hidden hover:shadow-2xl transition-all duration-300`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-premium-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4" />
              <span>{isPortuguese ? 'Mais Popular' : 'Most Popular'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`${colors.bg} px-6 py-8 text-center ${tier.popular ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? tier.namePortuguese : tier.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {isPortuguese ? tier.descriptionPortuguese : tier.description}
        </p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">£{tier.price}</span>
          <span className="text-gray-500 ml-1">/hour</span>
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
          className={`w-full ${colors.button} text-white py-4 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg transform hover:scale-105 duration-200`}
        >
          {isPortuguese ? 'Reservar Agora' : 'Book Now'}
        </button>
        
        {/* Security Level Indicator */}
        <div className="mt-4 flex justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
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