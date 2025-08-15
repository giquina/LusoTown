'use client'

import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, StarIcon, CurrencyPoundIcon } from '@heroicons/react/24/outline'
import { Crown, Shield, Car, Users } from 'lucide-react'
import { pricingEngine, PricingBreakdown } from '@/lib/chauffeurPricing'

interface ServiceTier {
  id: string
  name: string
  namePortuguese: string
  price: number
  originalPrice?: number
  description: string
  descriptionPortuguese: string
  features: string[]
  featuresPortuguese: string[]
  popular: boolean
  color: string
  minimumHours?: number
  maximumHours?: number
}

interface OptimizedChauffeurServiceCardProps {
  tier: ServiceTier
  isPortuguese: boolean
  onBookNow: () => void
  index: number
  membershipLevel?: 'free' | 'family' | 'ambassador'
  selectedDate?: string
  showPricing?: boolean
  duration?: number
}

const OptimizedChauffeurServiceCard = memo<OptimizedChauffeurServiceCardProps>(({ 
  tier, 
  isPortuguese, 
  onBookNow, 
  index,
  membershipLevel = 'free',
  selectedDate,
  showPricing = true,
  duration = 4
}) => {
  // Memoized color classes for performance
  const colorClasses = useMemo(() => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        button: 'bg-primary-600 hover:bg-primary-700',
        text: 'text-primary-600',
        badge: 'bg-primary-100 text-primary-800',
        gradient: 'from-primary-500 to-primary-600'
      },
      secondary: {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        button: 'bg-secondary-600 hover:bg-secondary-700',
        text: 'text-secondary-600',
        badge: 'bg-secondary-100 text-secondary-800',
        gradient: 'from-secondary-500 to-secondary-600'
      },
      premium: {
        bg: 'bg-premium-50',
        border: 'border-premium-200',
        button: 'bg-premium-600 hover:bg-premium-700',
        text: 'text-premium-600',
        badge: 'bg-premium-100 text-premium-800',
        gradient: 'from-premium-500 to-premium-600'
      },
      action: {
        bg: 'bg-action-50',
        border: 'border-action-200',
        button: 'bg-action-600 hover:bg-action-700',
        text: 'text-action-600',
        badge: 'bg-action-100 text-action-800',
        gradient: 'from-action-500 to-action-600'
      }
    }
    return colorMap[tier.color as keyof typeof colorMap] || colorMap.primary
  }, [tier.color])

  // Memoized pricing calculation
  const pricingBreakdown = useMemo(() => {
    if (!showPricing || !selectedDate) return null
    
    try {
      return pricingEngine.calculatePricing({
        serviceId: tier.id,
        serviceType: 'tier',
        date: selectedDate,
        duration,
        membershipLevel,
        eventType: 'leisure'
      })
    } catch (error) {
      console.warn('Error calculating pricing:', error)
      return null
    }
  }, [tier.id, selectedDate, duration, membershipLevel, showPricing])

  // Memoized tier icon
  const tierIcon = useMemo(() => {
    const iconMap = {
      essential: <Car className="w-6 h-6" />,
      premium: <Shield className="w-6 h-6" />,
      vip: <Crown className="w-6 h-6" />,
      elite: <Users className="w-6 h-6" />
    }
    return iconMap[tier.id as keyof typeof iconMap] || <Car className="w-6 h-6" />
  }, [tier.id])

  // Memoized features display
  const displayFeatures = useMemo(() => {
    const features = isPortuguese ? tier.featuresPortuguese : tier.features
    return features.slice(0, 6) // Limit features for better UI
  }, [tier.features, tier.featuresPortuguese, isPortuguese])

  // Memoized discount display
  const discountInfo = useMemo(() => {
    if (!pricingBreakdown?.discounts.length) return null
    
    const totalDiscount = pricingBreakdown.discounts.reduce((sum, d) => sum + d.amount, 0)
    const discountPercentage = (totalDiscount / pricingBreakdown.subtotal) * 100
    
    return {
      amount: totalDiscount,
      percentage: discountPercentage,
      originalPrice: pricingBreakdown.subtotal
    }
  }, [pricingBreakdown])

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02 }
  }), [])

  const buttonVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }), [])

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
        tier.popular 
          ? 'border-premium-300 shadow-2xl ring-2 ring-premium-100' 
          : `${colorClasses.border} hover:shadow-2xl`
      } transition-all duration-300 group`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-gradient-to-r from-premium-600 to-premium-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl">
            <div className="flex items-center space-x-2">
              <StarIcon className="w-4 h-4" />
              <span>{isPortuguese ? 'Mais Popular' : 'Most Popular'}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header Section */}
      <div className={`${colorClasses.bg} px-6 py-8 text-center relative overflow-hidden ${
        tier.popular ? 'pt-12' : ''
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          {/* Service Icon */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorClasses.gradient} text-white shadow-lg`}
          >
            {tierIcon}
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isPortuguese ? tier.namePortuguese : tier.name}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {isPortuguese ? tier.descriptionPortuguese : tier.description}
          </p>

          {/* Pricing Section */}
          <div className="space-y-2">
            {pricingBreakdown && discountInfo ? (
              <div className="space-y-1">
                {/* Discounted Price */}
                <div className="flex items-center justify-center space-x-2">
                  {discountInfo.amount > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      £{discountInfo.originalPrice.toFixed(0)}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">
                    £{pricingBreakdown.finalPrice.toFixed(0)}
                  </span>
                </div>
                
                {/* Discount Badge */}
                {discountInfo.amount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {isPortuguese ? 'Poupança' : 'Save'} £{discountInfo.amount.toFixed(0)}
                  </motion.div>
                )}
                
                <p className="text-sm text-gray-500">
                  {isPortuguese ? `para ${duration} horas` : `for ${duration} hours`}
                </p>
              </div>
            ) : (
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">£{tier.price}</span>
                <span className="text-gray-500 ml-2">/hour</span>
              </div>
            )}
          </div>
          
          {/* Membership Savings Indicator */}
          {membershipLevel !== 'free' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                membershipLevel === 'ambassador' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              <Crown className="w-3 h-3 mr-1" />
              {membershipLevel === 'ambassador' 
                ? (isPortuguese ? 'Desconto Embaixador' : 'Ambassador Discount')
                : (isPortuguese ? 'Desconto Família' : 'Family Discount')
              }
            </motion.div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-6">
        <ul className="space-y-3">
          {displayFeatures.map((feature, featureIndex) => (
            <motion.li 
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * featureIndex }}
              viewport={{ once: true }}
              className="flex items-start group-hover:text-gray-900 transition-colors"
            >
              <CheckCircleIcon className={`w-5 h-5 ${colorClasses.text} mt-0.5 mr-3 flex-shrink-0`} />
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        {tier.features.length > 6 && (
          <div className="mt-3 text-center">
            <span className={`text-xs ${colorClasses.text} font-medium`}>
              {isPortuguese ? `+${tier.features.length - 6} mais características` : `+${tier.features.length - 6} more features`}
            </span>
          </div>
        )}
      </div>

      {/* Action Section */}
      <div className="px-6 pb-6">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onBookNow}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu ${
            tier.popular
              ? 'bg-gradient-to-r from-premium-600 to-premium-700 hover:from-premium-700 hover:to-premium-800 text-white'
              : `bg-gradient-to-r ${colorClasses.gradient} hover:opacity-90 text-white`
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {pricingBreakdown ? (
              <>
                <CurrencyPoundIcon className="w-5 h-5" />
                <span>{isPortuguese ? 'Reservar por' : 'Book for'} £{pricingBreakdown.finalPrice.toFixed(0)}</span>
              </>
            ) : (
              <span>{isPortuguese ? 'Reservar Agora' : 'Book Now'}</span>
            )}
          </div>
        </motion.button>
        
        {/* Service Level Indicator */}
        <div className="mt-4 flex justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses.badge}`}>
            {tier.id === 'essential' && (
              <>
                <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                {isPortuguese ? 'Nível Essencial' : 'Essential Level'}
              </>
            )}
            {tier.id === 'premium' && (
              <>
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                {isPortuguese ? 'Nível Premium' : 'Premium Level'}
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
        
        {/* Duration Constraints */}
        {(tier.minimumHours || tier.maximumHours) && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              {isPortuguese ? 'Duração: ' : 'Duration: '}
              {tier.minimumHours && `${tier.minimumHours}h min`}
              {tier.minimumHours && tier.maximumHours && ' - '}
              {tier.maximumHours && `${tier.maximumHours}h max`}
            </p>
          </div>
        )}
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  )
})

// Add display name for debugging
OptimizedChauffeurServiceCard.displayName = 'OptimizedChauffeurServiceCard'

export default OptimizedChauffeurServiceCard