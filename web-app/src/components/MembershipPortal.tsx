'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  CalendarDaysIcon,
  GiftIcon,
  UsersIcon as UserGroupIcon,
  SparklesIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  CurrencyPoundIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { supabase, getMembershipTierConfig, type MembershipBenefit, type MembershipUsage, type PortugueseCommunityPartnership } from '@/lib/supabase'

interface MembershipPortalProps {
  userId: string
}

export default function MembershipPortal({ userId }: MembershipPortalProps) {
  const { language } = useLanguage()
  const { membershipTier, subscription, serviceDiscount } = useSubscription()
  const [benefits, setBenefits] = useState<MembershipBenefit[]>([])
  const [usage, setUsage] = useState<MembershipUsage[]>([])
  const [partnerships, setPartnerships] = useState<PortugueseCommunityPartnership[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const isPortuguese = language === 'pt'
  const tierConfig = getMembershipTierConfig(membershipTier)
  
  useEffect(() => {
    if (membershipTier !== 'none') {
      loadMembershipData()
    }
  }, [membershipTier, userId])
  
  const loadMembershipData = async () => {
    setIsLoading(true)
    try {
      // Load tier benefits
      const { data: benefitsData, error: benefitsError } = await supabase
        .from('membership_benefits')
        .select('*')
        .eq('tier', membershipTier)
        .eq('is_active', true)
        .order('sort_order')
      
      if (benefitsError) throw benefitsError
      setBenefits(benefitsData || [])
      
      // Load usage history
      const { data: usageData, error: usageError } = await supabase
        .from('membership_usage')
        .select('*')
        .eq('user_id', userId)
        .order('usage_date', { ascending: false })
        .limit(50)
      
      if (usageError) throw usageError
      setUsage(usageData || [])
      
      // Load available partnerships
      const { data: partnershipsData, error: partnershipsError } = await supabase
        .from('portuguese_community_partnerships')
        .select('*')
        .or(`required_tier.eq.${membershipTier},required_tier.is.null`)
        .eq('is_active', true)
      
      if (partnershipsError) throw partnershipsError
      setPartnerships(partnershipsData || [])
      
    } catch (error) {
      console.error('Error loading membership data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const calculateStats = () => {
    const currentYear = new Date().getFullYear()
    const currentYearUsage = usage.filter(u => new Date(u.usage_date).getFullYear() === currentYear)
    
    const totalSavings = currentYearUsage.reduce((sum, u) => sum + (u.amount_saved || 0), 0)
    const serviceUsageCount = currentYearUsage.filter(u => u.service_type?.includes('transport')).length
    const eventAttendance = currentYearUsage.filter(u => u.benefit_type === 'cultural_events').length
    const networkingEvents = currentYearUsage.filter(u => u.benefit_type === 'business_networking').length
    
    return {
      totalSavings,
      serviceUsageCount,
      eventAttendance,
      networkingEvents,
      totalUsage: currentYearUsage.length
    }
  }
  
  const stats = calculateStats()
  
  if (membershipTier === 'none') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserGroupIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isPortuguese ? 'Associação Necessária' : 'Membership Required'}
        </h3>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Subscreva um plano premium para aceder ao portal de benefícios.'
            : 'Subscribe to a premium plan to access the benefits portal.'
          }
        </p>
      </div>
    )
  }
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">
          {isPortuguese ? 'Carregando benefícios...' : 'Loading benefits...'}
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 ${tierConfig.color === 'amber' ? 'bg-amber-100 text-amber-800' : tierConfig.color === 'gray' ? 'bg-gray-100 text-gray-800' : tierConfig.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
          <SparklesIcon className="w-5 h-5" />
          <span className="font-semibold">
            {isPortuguese ? tierConfig.namePortuguese : tierConfig.name}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Portal de Benefícios' : 'Benefits Portal'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese ? tierConfig.descriptionPortuguese : tierConfig.description}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CurrencyPoundIcon className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {isPortuguese ? 'Poupanças' : 'Savings'}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            £{stats.totalSavings.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            {isPortuguese ? 'Este ano' : 'This year'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {isPortuguese ? 'Serviços' : 'Services'}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.serviceUsageCount}
          </div>
          <div className="text-xs text-gray-500">
            {isPortuguese ? 'Reservas' : 'Bookings'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <CalendarDaysIcon className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {isPortuguese ? 'Eventos' : 'Events'}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.eventAttendance}
          </div>
          <div className="text-xs text-gray-500">
            {isPortuguese ? 'Participados' : 'Attended'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {isPortuguese ? 'Rede' : 'Network'}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {stats.networkingEvents}
          </div>
          <div className="text-xs text-gray-500">
            {isPortuguese ? 'Eventos' : 'Events'}
          </div>
        </div>
      </motion.div>

      {/* Service Discount Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <ArrowTrendingUpIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isPortuguese ? 'Desconto Ativo' : 'Active Discount'}
            </h3>
            <p className="text-gray-600">
              {isPortuguese 
                ? `Receba ${serviceDiscount}% de desconto em todos os serviços premium`
                : `Receive ${serviceDiscount}% discount on all premium services`
              }
            </p>
          </div>
          <div className="ml-auto text-3xl font-bold text-primary-600">
            {serviceDiscount}%
          </div>
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Seus Benefícios' : 'Your Benefits'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GiftIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{benefit.benefit_name}</h4>
                  {benefit.benefit_description && (
                    <p className="text-sm text-gray-600 mb-2">{benefit.benefit_description}</p>
                  )}
                  {benefit.benefit_value && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {benefit.benefit_value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Portuguese-speaking community Partnerships */}
      {partnerships.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Parcerias Comunitárias' : 'Community Partnerships'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {partnerships.map((partnership) => (
              <div key={partnership.id} className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserGroupIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{partnership.partner_name}</h4>
                    {partnership.partnership_description && (
                      <p className="text-sm text-gray-600 mb-2">{partnership.partnership_description}</p>
                    )}
                    {partnership.member_benefits && (
                      <p className="text-sm text-green-600">{partnership.member_benefits}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Usage */}
      {usage.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Uso Recente' : 'Recent Usage'}
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {usage.slice(0, 10).map((usageItem, index) => (
                <div key={usageItem.id} className={`p-4 ${index !== usage.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {usageItem.benefit_type.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {usageItem.service_type} " {new Date(usageItem.usage_date).toLocaleDateString()}
                      </div>
                    </div>
                    {usageItem.amount_saved && usageItem.amount_saved > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          £{usageItem.amount_saved.toFixed(2)} {isPortuguese ? 'poupado' : 'saved'}
                        </div>
                        {usageItem.discount_applied && (
                          <div className="text-xs text-gray-500">
                            {usageItem.discount_applied}% {isPortuguese ? 'desconto' : 'discount'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}