'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon,
  SparklesIcon,
  CurrencyPoundIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  TruckIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  HeartIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { Crown, Car, Shield, Users, Calendar, Heart, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useNetworking } from '@/context/NetworkingContext'

interface UnifiedPremiumExperienceProps {
  showUpgradePrompt?: boolean
  onUpgradeClick?: () => void
  currentService?: 'transport' | 'events' | 'networking' | 'community'
}

export default function UnifiedPremiumExperience({ 
  showUpgradePrompt = false,
  onUpgradeClick,
  currentService 
}: UnifiedPremiumExperienceProps) {
  const { language, t } = useLanguage()
  const { 
    getProgressiveUpgradeOptions,
    calculateMembershipBenefits,
    updateJourneyProgress,
    bridgeOpportunities
  } = usePlatformIntegration()
  const { hasActiveSubscription, membershipTier, serviceDiscount, createSubscription } = useSubscription()
  const { connections, stats } = useNetworking()
  
  const [selectedTier, setSelectedTier] = useState<'bronze' | 'silver' | 'gold' | 'platinum'>('silver')
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const isPortuguese = language === 'pt'

  const upgradeOptions = getProgressiveUpgradeOptions()
  const membershipBenefits = calculateMembershipBenefits()

  const premiumTiers = [
    {
      id: 'bronze',
      name: isPortuguese ? 'Bronze' : 'Bronze',
      price: '£25',
      period: isPortuguese ? 'por ano' : 'per year',
      popular: false,
      description: isPortuguese ? 'Perfeito para começar' : 'Perfect for getting started',
      transportDiscount: 10,
      features: [
        {
          category: 'transport',
          items: [
            isPortuguese ? '10% desconto em todos os transportes' : '10% discount on all transport',
            isPortuguese ? 'Reservas prioritárias' : 'Priority bookings',
            isPortuguese ? 'Cancelamento flexível' : 'Flexible cancellation'
          ]
        },
        {
          category: 'community',
          items: [
            isPortuguese ? 'Acesso a eventos premium' : 'Premium event access',
            isPortuguese ? 'Networking básico' : 'Basic networking',
            isPortuguese ? 'Suporte em português' : 'Portuguese support'
          ]
        }
      ]
    },
    {
      id: 'silver',
      name: isPortuguese ? 'Silver' : 'Silver',
      price: '£45',
      period: isPortuguese ? 'por ano' : 'per year',
      popular: true,
      description: isPortuguese ? 'Melhor valor para famílias' : 'Best value for families',
      transportDiscount: 15,
      features: [
        {
          category: 'transport',
          items: [
            isPortuguese ? '15% desconto em todos os transportes' : '15% discount on all transport',
            isPortuguese ? 'Reservas de grupo gratuitas' : 'Free group bookings',
            isPortuguese ? 'Upgrade gratuito quando disponível' : 'Free upgrade when available',
            isPortuguese ? 'Transporte compartilhado com desconto' : 'Discounted shared transport'
          ]
        },
        {
          category: 'community',
          items: [
            isPortuguese ? 'Eventos exclusivos para membros' : 'Exclusive member events',
            isPortuguese ? 'Networking avançado' : 'Advanced networking',
            isPortuguese ? 'Mensagens ilimitadas' : 'Unlimited messaging',
            isPortuguese ? 'Perfil verificado' : 'Verified profile'
          ]
        }
      ]
    },
    {
      id: 'gold',
      name: isPortuguese ? 'Gold' : 'Gold',
      price: '£85',
      period: isPortuguese ? 'por ano' : 'per year',
      popular: false,
      description: isPortuguese ? 'Para profissionais ativos' : 'For active professionals',
      transportDiscount: 20,
      features: [
        {
          category: 'transport',
          items: [
            isPortuguese ? '20% desconto em todos os transportes' : '20% discount on all transport',
            isPortuguese ? 'Acesso a veículos premium' : 'Premium vehicle access',
            isPortuguese ? 'Serviço de concierge' : 'Concierge service',
            isPortuguese ? 'Reservas last-minute sem taxa' : 'Fee-free last-minute bookings'
          ]
        },
        {
          category: 'community',
          items: [
            isPortuguese ? 'Eventos de networking executivo' : 'Executive networking events',
            isPortuguese ? 'Matchmaking profissional' : 'Professional matchmaking',
            isPortuguese ? 'Acesso a parcerias de negócios' : 'Business partnership access',
            isPortuguese ? 'Consultoria cultural' : 'Cultural consulting'
          ]
        }
      ]
    },
    {
      id: 'platinum',
      name: isPortuguese ? 'Platinum' : 'Platinum',
      price: '£150',
      period: isPortuguese ? 'por ano' : 'per year',
      popular: false,
      description: isPortuguese ? 'Experiência VIP completa' : 'Complete VIP experience',
      transportDiscount: 25,
      features: [
        {
          category: 'transport',
          items: [
            isPortuguese ? '25% desconto em todos os transportes' : '25% discount on all transport',
            isPortuguese ? 'Transporte VIP ilimitado' : 'Unlimited VIP transport',
            isPortuguese ? 'Motorista pessoal dedicado' : 'Dedicated personal driver',
            isPortuguese ? 'Segurança pessoal incluída' : 'Personal security included'
          ]
        },
        {
          category: 'community',
          items: [
            isPortuguese ? 'Acesso a eventos exclusivos VIP' : 'VIP exclusive event access',
            isPortuguese ? 'Introduções pessoais high-level' : 'High-level personal introductions',
            isPortuguese ? 'Assessoria cultural personalizada' : 'Personalized cultural advisory',
            isPortuguese ? 'Suporte 24/7 dedicado' : 'Dedicated 24/7 support'
          ]
        }
      ]
    }
  ]

  const selectedTierDetails = premiumTiers.find(tier => tier.id === selectedTier)

  const handleUpgrade = async () => {
    setIsUpgrading(true)
    
    try {
      const sessionId = await createSubscription(selectedTier)
      if (sessionId) {
  updateJourneyProgress('premium_upgrade_initiated', { tier: selectedTier, from: currentService })
        onUpgradeClick?.()
      }
    } catch (error) {
      console.error('Upgrade error:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const calculateAnnualSavings = (discountPercent: number) => {
    // Average Portuguese community member uses £200 in transport services per year
    const averageSpending = 200
    return Math.round(averageSpending * (discountPercent / 100))
  }

  const getServiceSpecificBenefits = () => {
    switch (currentService) {
      case 'transport':
        return {
          title: isPortuguese ? 'Benefícios de Transporte Premium' : 'Premium Transport Benefits',
          benefits: [
            {
              icon: CurrencyPoundIcon,
              title: isPortuguese ? 'Descontos Garantidos' : 'Guaranteed Discounts',
              description: isPortuguese ? `${serviceDiscount}% desconto em todos os transportes` : `${serviceDiscount}% discount on all transport`
            },
            {
              icon: UserGroupIcon,
              title: isPortuguese ? 'Reservas de Grupo' : 'Group Bookings',
              description: isPortuguese ? 'Organize transporte com suas conexões' : 'Organize transport with your connections'
            },
            {
              icon: ShieldCheckIcon,
              title: isPortuguese ? 'Proteção Premium' : 'Premium Protection',
              description: isPortuguese ? 'Cobertura completa e suporte 24/7' : 'Full coverage and 24/7 support'
            }
          ]
        }
      
      case 'events':
        return {
          title: isPortuguese ? 'Benefícios de Eventos Premium' : 'Premium Event Benefits',
          benefits: [
            {
              icon: CalendarDaysIcon,
              title: isPortuguese ? 'Acesso Prioritário' : 'Priority Access',
              description: isPortuguese ? 'Reserve os melhores eventos antes de todos' : 'Book the best events before everyone'
            },
            {
              icon: TruckIcon,
              title: isPortuguese ? 'Transporte Incluído' : 'Transport Included',
              description: isPortuguese ? 'Transporte premium para eventos selecionados' : 'Premium transport to selected events'
            },
            {
              icon: UserGroupIcon,
              title: isPortuguese ? 'Networking VIP' : 'VIP Networking',
              description: isPortuguese ? 'Encontros exclusivos com outros membros premium' : 'Exclusive meetups with other premium members'
            }
          ]
        }
      
      case 'networking':
        return {
          title: isPortuguese ? 'Benefícios de Networking Premium' : 'Premium Networking Benefits',
          benefits: [
            {
              icon: Users,
              title: isPortuguese ? 'Matches Ilimitados' : 'Unlimited Matches',
              description: isPortuguese ? 'Conecte-se com quantos portugueses quiser' : 'Connect with as many Portuguese speakers as you want'
            },
            {
              icon: SparklesIcon,
              title: isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events',
              description: isPortuguese ? 'Networking events apenas para membros premium' : 'Networking events only for premium members'
            },
            {
              icon: Crown,
              title: isPortuguese ? 'Perfil Destacado' : 'Featured Profile',
              description: isPortuguese ? 'Sua perfil aparece primeiro nas buscas' : 'Your profile appears first in searches'
            }
          ]
        }
      
      default:
        return {
          title: isPortuguese ? 'Benefícios da Plataforma Premium' : 'Premium Platform Benefits',
          benefits: [
            {
              icon: SparklesIcon,
              title: isPortuguese ? 'Experiência Completa' : 'Complete Experience',
              description: isPortuguese ? 'Acesso a todos os serviços premium' : 'Access to all premium services'
            },
            {
              icon: UserGroupIcon,
              title: isPortuguese ? 'Comunidade VIP' : 'VIP Community',
              description: isPortuguese ? 'Conecte-se com a elite portuguesa em Londres' : 'Connect with the Portuguese elite in London'
            },
            {
              icon: TrendingUp,
              title: isPortuguese ? 'Valor Crescente' : 'Growing Value',
              description: isPortuguese ? 'Mais benefícios adicionados mensalmente' : 'More benefits added monthly'
            }
          ]
        }
    }
  }

  const serviceSpecificBenefits = getServiceSpecificBenefits()

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-premium-100 text-premium-700 rounded-full text-sm font-medium mb-6">
              <Crown className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Experiência Premium Unificada' : 'Unified Premium Experience'}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese 
                ? 'Um Plano, Todos os Benefícios' 
                : 'One Plan, All Benefits'
              }
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Transporte premium, eventos exclusivos, networking VIP e suporte da comunidade portuguesa - tudo numa só subscrição'
                : 'Premium transport, exclusive events, VIP networking, and Portuguese community support - all in one subscription'
              }
            </p>
          </motion.div>
        </div>

        {/* Current Membership Status */}
        {hasActiveSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-premium-600 to-accent-600 rounded-xl p-6 text-white mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {isPortuguese ? 'Membro Ativo' : 'Active Member'} - {membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)}
                </h3>
                <p className="opacity-90">
                  {isPortuguese 
                    ? `Você economiza ${membershipBenefits.transportDiscount}% em todos os serviços`
                    : `You save ${membershipBenefits.transportDiscount}% on all services`
                  }
                </p>
                <p className="text-sm opacity-75 mt-1">
                  {isPortuguese 
                    ? `Economia anual estimada: £${calculateAnnualSavings(membershipBenefits.transportDiscount)}`
                    : `Estimated annual savings: £${calculateAnnualSavings(membershipBenefits.transportDiscount)}`
                  }
                </p>
              </div>
              <Crown className="w-12 h-12 opacity-80" />
            </div>
          </motion.div>
        )}

        {/* Service-Specific Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {serviceSpecificBenefits.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceSpecificBenefits.benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Pricing Tiers */}
        {!hasActiveSubscription && (
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                {premiumTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedTier === tier.id
                        ? 'bg-white text-primary-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tier.name}
                    {tier.popular && (
                      <span className="ml-1 text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full">
                        {isPortuguese ? 'Popular' : 'Popular'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedTierDetails && (
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-primary-200 p-8 max-w-4xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedTierDetails.name} {isPortuguese ? 'Membro' : 'Member'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedTierDetails.description}
                  </p>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {selectedTierDetails.price}
                  </div>
                  <div className="text-gray-500">
                    {selectedTierDetails.period}
                  </div>
                  <div className="text-sm text-secondary-600 mt-2">
                    {isPortuguese 
                      ? `Economia anual estimada: £${calculateAnnualSavings(selectedTierDetails.transportDiscount)}`
                      : `Estimated annual savings: £${calculateAnnualSavings(selectedTierDetails.transportDiscount)}`
                    }
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {selectedTierDetails.features.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        {category.category === 'transport' ? (
                          <Car className="w-5 h-5 mr-2 text-primary-600" />
                        ) : (
                          <Users className="w-5 h-5 mr-2 text-secondary-600" />
                        )}
                        {category.category === 'transport' 
                          ? (isPortuguese ? 'Transporte' : 'Transport')
                          : (isPortuguese ? 'Comunidade' : 'Community')
                        }
                      </h4>
                      <div className="space-y-3">
                        {category.items.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleUpgrade}
                    disabled={isUpgrading}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 disabled:opacity-50 inline-flex items-center"
                  >
                    {isUpgrading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {isPortuguese ? 'Processando...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        {isPortuguese ? 'Tornar-se Membro' : 'Become Member'} {selectedTierDetails.name}
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    {isPortuguese 
                      ? 'Pode cancelar a qualquer momento. Garantia de 30 dias.'
                      : 'Cancel anytime. 30-day guarantee.'
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {isPortuguese ? 'Mais Que Uma Subscrição' : 'More Than a Subscription'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            {isPortuguese
              ? 'LusoTown Premium não é apenas um desconto - é o seu passaporte para a comunidade portuguesa mais vibrante de Londres. Transporte seguro, eventos exclusivos, networking profissional e amizades para a vida.'
              : 'LusoTown Premium isn\'t just a discount - it\'s your passport to London\'s most vibrant Portuguese community. Safe transport, exclusive events, professional networking, and friendships for life.'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{connections.length}+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Conexões ativas' : 'Active connections'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">£{calculateAnnualSavings(15)}+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Economia anual' : 'Annual savings'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">50+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Eventos exclusivos' : 'Exclusive events'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-coral-600">24/7</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Suporte português' : 'Portuguese support'}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}