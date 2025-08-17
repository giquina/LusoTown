'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TrophyIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CrownIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { getMembershipTierConfig, type MembershipTier } from '@/lib/supabase'
import { PortuguesePricingEngine, type PricingConfig } from '@/lib/dynamicPricing'

interface MembershipTiersProps {
  showCurrentTier?: boolean
  allowUpgrade?: boolean
  compact?: boolean
  showAnnualDiscount?: boolean
  userSegment?: string
  promoCode?: string
}

export default function MembershipTiers({ 
  showCurrentTier = true, 
  allowUpgrade = true,
  compact = false,
  showAnnualDiscount = true,
  userSegment,
  promoCode
}: MembershipTiersProps) {
  const { language } = useLanguage()
  const { membershipTier, createSubscription, upgradeSubscription } = useSubscription()
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState<string | null>(null)
  const [showMonthly, setShowMonthly] = useState(false)
  
  const isPortuguese = language === 'pt'
  
  const tiers: MembershipTier[] = ['basic', 'student', 'professional', 'business', 'vip']
  
  const getIcon = (tier: MembershipTier) => {
    switch (tier) {
      case 'basic': return StarIcon
      case 'student': return AcademicCapIcon
      case 'professional': return BriefcaseIcon
      case 'business': return BuildingOfficeIcon
      case 'vip': return CrownIcon
      default: return StarIcon
    }
  }
  
  const getColorClasses = (tier: MembershipTier) => {
    switch (tier) {
      case 'basic':
        return {
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          button: 'bg-gray-500 hover:bg-gray-600 text-white',
          badge: 'bg-gray-100 text-gray-800'
        }
      case 'student':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          badge: 'bg-blue-100 text-blue-800'
        }
      case 'professional':
        return {
          border: 'border-primary-200',
          bg: 'bg-primary-50',
          iconBg: 'bg-primary-100',
          iconText: 'text-primary-600',
          button: 'bg-primary-500 hover:bg-primary-600 text-white',
          badge: 'bg-primary-100 text-primary-800'
        }
      case 'business':
        return {
          border: 'border-amber-200',
          bg: 'bg-amber-50',
          iconBg: 'bg-amber-100',
          iconText: 'text-amber-600',
          button: 'bg-amber-500 hover:bg-amber-600 text-white',
          badge: 'bg-amber-100 text-amber-800'
        }
      case 'vip':
        return {
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-600',
          button: 'bg-purple-500 hover:bg-purple-600 text-white',
          badge: 'bg-purple-100 text-purple-800'
        }
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-white',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          button: 'bg-primary-500 hover:bg-primary-600 text-white',
          badge: 'bg-gray-100 text-gray-800'
        }
    }
  }
  
  const handleSubscribe = async (tier: MembershipTier) => {
    setIsCreating(tier)
    try {
      await createSubscription(tier, showMonthly ? 'monthly' : 'yearly')
    } catch (error) {
      console.error('Error creating subscription:', error)
    } finally {
      setIsCreating(null)
    }
  }
  
  const handleUpgrade = async (tier: MembershipTier) => {
    setIsUpgrading(tier)
    try {
      await upgradeSubscription(tier)
    } catch (error) {
      console.error('Error upgrading subscription:', error)
    } finally {
      setIsUpgrading(null)
    }
  }
  
  const formatPrice = (price: number) => {
    return PortuguesePricingEngine.formatPortuguesePrice(price)
  }
  
  const getPricingConfig = (tier: MembershipTier): PricingConfig => {
    if (promoCode) {
      const promoConfig = PortuguesePricingEngine.getPromotionalPricing(tier, promoCode)
      if (promoConfig) return promoConfig
    }
    
    return PortuguesePricingEngine.calculateOptimizedPricing(tier, userSegment)
  }
  
  const canUpgrade = (tier: MembershipTier) => {
    if (membershipTier === 'basic') return true
    
    const tierOrder = ['basic', 'student', 'professional', 'business', 'vip']
    const currentIndex = tierOrder.indexOf(membershipTier)
    const targetIndex = tierOrder.indexOf(tier)
    
    return targetIndex > currentIndex
  }
  
  return (
    <section className="py-12">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isPortuguese ? 'Associa��o Premium LusoTown' : 'LusoTown Premium Membership'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {isPortuguese
              ? 'Junte-se ao nosso programa de associa��o premium e aceda a servi�os exclusivos da comunidade portuguesa de Londres.'
              : 'Join our premium membership program and access exclusive services for London\'s Portuguese community.'
            }
          </p>
          <div className="text-sm text-gray-500">
            {isPortuguese
              ? 'Receita projetada: �450,000-750,000 anuais de 150-250 membros'
              : 'Projected revenue: �450,000-750,000 annually from 150-250 members'
            }
          </div>
        </motion.div>

        {/* Current Tier Display */}
        {showCurrentTier && membershipTier !== 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getColorClasses(membershipTier).badge}`}>
              <span className="text-sm font-medium">
                {isPortuguese ? 'Membro Atual:' : 'Current Member:'} {getMembershipTierConfig(membershipTier).namePortuguese || getMembershipTierConfig(membershipTier).name}
              </span>
            </div>
          </motion.div>
        )}

        {/* Membership Tiers Grid */}
        <div className={`grid gap-6 ${compact ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'}`}>
          {tiers.map((tier, index) => {
            const config = getMembershipTierConfig(tier)
            const pricingConfig = getPricingConfig(tier)
            const colors = getColorClasses(tier)
            const IconComponent = getIcon(tier)
            const isCurrentTier = membershipTier === tier
            const canUpgradeToTier = canUpgrade(tier)
            const isProcessing = isUpgrading === tier || isCreating === tier
            const displayPrice = showMonthly ? pricingConfig.currentMonthlyPrice : pricingConfig.currentYearlyPrice
            
            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  isCurrentTier ? 'border-primary-300 ring-2 ring-primary-100' : colors.border
                } overflow-hidden ${compact ? 'p-4' : 'p-6'}`}
              >
                {/* Popular Badge for Professional */}
                {tier === 'professional' && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {isPortuguese ? 'Popular' : 'Popular'}
                  </div>
                )}
                
                {/* Student Badge */}
                {tier === 'student' && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {isPortuguese ? '50% Desconto' : '50% Off'}
                  </div>
                )}
                
                {/* Promo Badge */}
                {pricingConfig.promoCode && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    -{pricingConfig.discountPercentage}%
                  </div>
                )}

                {/* Current Tier Badge */}
                {isCurrentTier && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                    {isPortuguese ? 'Atual' : 'Current'}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 ${colors.iconText}`} />
                </div>

                {/* Tier Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? config.namePortuguese : config.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(config.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isPortuguese ? 'por ano' : 'per year'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatPrice(Math.round(config.price / 12))} {isPortuguese ? 'por m�s' : 'per month'}
                  </div>
                </div>

                {/* Description */}
                <p className={`text-gray-600 mb-6 ${compact ? 'text-sm' : ''}`}>
                  {isPortuguese ? config.descriptionPortuguese : config.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {(isPortuguese ? config.featuresPortuguese : config.features).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-gray-700 ${compact ? 'text-sm' : ''}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  {isCurrentTier ? (
                    <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                      {isPortuguese ? 'Plano Atual' : 'Current Plan'}
                    </div>
                  ) : canUpgradeToTier && allowUpgrade ? (
                    <button
                      onClick={() => membershipTier === 'basic' ? handleSubscribe(tier) : handleUpgrade(tier)}
                      disabled={isProcessing}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${colors.button}`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {isPortuguese ? 'Processando...' : 'Processing...'}
                        </>
                      ) : (
                        <>
                          {membershipTier === 'basic' 
                            ? (isPortuguese ? 'Subscrever' : 'Subscribe')
                            : (isPortuguese ? 'Atualizar' : 'Upgrade')
                          }
                          <ArrowRightIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg text-center font-medium">
                      {isPortuguese ? 'N�o Dispon�vel' : 'Not Available'}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Benef�cios de Associa��o' : 'Membership Benefits'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {isPortuguese ? 'Integra��o Comunit�ria' : 'Community Integration'}
                </h4>
                <p>
                  {isPortuguese
                    ? 'Convites autom�ticos para eventos culturais portugueses e acesso � C�mara de Com�rcio'
                    : 'Automatic invitations to Portuguese cultural events and Chamber of Commerce access'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {isPortuguese ? 'Ponte Servi�o-Comunidade' : 'Service-to-Community Bridge'}
                </h4>
                <p>
                  {isPortuguese
                    ? 'Clientes de servi�os qualificam automaticamente para membros da comunidade'
                    : 'Service clients automatically qualify for community membership'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {isPortuguese ? 'Gest�o de Benef�cios' : 'Benefits Management'}
                </h4>
                <p>
                  {isPortuguese
                    ? 'Portal de membro com rastreamento de benef�cios e aplica��o autom�tica de descontos'
                    : 'Member portal with benefits tracking and automatic discount application'
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}