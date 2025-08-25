'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { useSubscription } from '@/context/SubscriptionContext'
import { authService } from '@/lib/auth'
import MembershipTiers from '@/components/MembershipTiers'
import MembershipPortal from '@/components/MembershipPortal'
import { 
  CheckCircleIcon, 
  CreditCardIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  HeartIcon,
  UsersIcon as UsersIcon,
  CalendarDaysIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function SubscriptionPage() {
  const { language, t } = useLanguage()
  const { 
    subscription,
    trial,
    hasActiveSubscription,
    isInTrial,
    trialDaysRemaining,
    isLoading,
    createSubscription,
    cancelSubscription,
    membershipTier
  } = useSubscription()
  
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  
  const isPortuguese = language === 'pt'
  const user = authService.getCurrentUser()

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      window.location.href = ROUTES.login
    }
  }, [user])

  const handleSubscribe = async () => {
    setIsCreatingSubscription(true)
    try {
      await createSubscription()
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setIsCreatingSubscription(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm(
      isPortuguese 
        ? 'Tem a certeza que quer cancelar a sua subscrição?' 
        : 'Are you sure you want to cancel your subscription?'
    )) return

    setIsCancelling(true)
    try {
      await cancelSubscription()
    } catch (error) {
      console.error('Cancel error:', error)
    } finally {
      setIsCancelling(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen">
          <div className="container-width w-full">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center shadow-lg">
                    <HeartIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">LusoTown</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'A Sua Subscrição' : 'Your Subscription'}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {isPortuguese 
                    ? 'Gerir a sua subscrição da comunidade de falantes de português de Londres'
                    : 'Manage your London Portuguese-speaking community subscription'
                  }
                </p>
              </motion.div>

              {/* Premium Membership Tiers */}
              {!hasActiveSubscription && !isInTrial && (
                <MembershipTiers showCurrentTier={false} allowUpgrade={true} />
              )}

              {/* Member Portal for Active Members */}
              {hasActiveSubscription && user && (
                <MembershipPortal userId={user.id} />
              )}

              <div className="grid lg:grid-cols-3 gap-8 mt-12">
                {/* Current Status */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Estado da Subscrição' : 'Subscription Status'}
                    </h2>

                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : hasActiveSubscription ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                          <span className="font-semibold text-green-900">
                            {isPortuguese ? 'Subscrição Ativa' : 'Active Subscription'}
                          </span>
                        </div>
                        {subscription && (
                          <div className="space-y-2 text-sm text-green-700">
                            <p>
                              <strong>{isPortuguese ? 'Tipo:' : 'Plan:'}</strong> {isPortuguese ? 'Membro da Comunidade' : 'Community Member'} (£19.99/mês)
                            </p>
                            <p>
                              <strong>{isPortuguese ? 'Renova em:' : 'Renews on:'}</strong>{' '}
                              {subscription.current_period_end && 
                                new Date(subscription.current_period_end).toLocaleDateString()
                              }
                            </p>
                            <p>
                              <strong>{isPortuguese ? 'Estado:' : 'Status:'}</strong>{' '}
                              {subscription.status === 'active' 
                                ? (isPortuguese ? 'Ativa' : 'Active')
                                : subscription.status
                              }
                            </p>
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={handleCancel}
                            disabled={isCancelling}
                            className="text-sm text-red-600 hover:text-red-700 underline disabled:opacity-50"
                          >
                            {isCancelling 
                              ? (isPortuguese ? 'Cancelando...' : 'Cancelling...')
                              : (isPortuguese ? 'Cancelar Subscrição' : 'Cancel Subscription')
                            }
                          </button>
                        </div>
                      </div>
                    ) : isInTrial ? (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <ClockIcon className="w-6 h-6 text-amber-600" />
                          <span className="font-semibold text-amber-900">
                            {isPortuguese ? 'Período de Teste' : 'Trial Period'}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-amber-700">
                          <p>
                            {isPortuguese 
                              ? `${trialDaysRemaining} dias restantes no seu teste gratuito`
                              : `${trialDaysRemaining} days remaining in your free trial`
                            }
                          </p>
                          {trial && (
                            <p>
                              <strong>{isPortuguese ? 'Teste termina em:' : 'Trial ends on:'}</strong>{' '}
                              {new Date(trial.trial_end).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleSubscribe}
                            disabled={isCreatingSubscription}
                            className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {isCreatingSubscription ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                {isPortuguese ? 'Processando...' : 'Processing...'}
                              </>
                            ) : (
                              <>
                                <CreditCardIcon className="w-4 h-4" />
                                {isPortuguese ? 'Subscrever Agora' : 'Subscribe Now'}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                          <span className="font-semibold text-red-900">
                            {isPortuguese ? 'Subscrição Necessária' : 'Subscription Required'}
                          </span>
                        </div>
                        <p className="text-sm text-red-700 mb-4">
                          {isPortuguese 
                            ? 'Para aceder às funcionalidades da LusoTown, precisa de uma subscrição ativa.'
                            : 'To access LusoTown features, you need an active subscription.'
                          }
                        </p>
                        <button
                          onClick={handleSubscribe}
                          disabled={isCreatingSubscription}
                          className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isCreatingSubscription ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              {isPortuguese ? 'Processando...' : 'Processing...'}
                            </>
                          ) : (
                            <>
                              <CreditCardIcon className="w-4 h-4" />
                              {isPortuguese ? 'Começar Subscrição' : 'Start Subscription'}
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'O que está incluído na sua subscrição:' : 'What\'s included in your subscription:'}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: UsersIcon,
                          title: isPortuguese ? 'Rede Comunitária' : 'Community Network',
                          description: isPortuguese ? 'Conecte-se com 750+ falantes de português' : 'Connect with Portuguese speakers'
                        },
                        {
                          icon: CalendarDaysIcon,
                          title: isPortuguese ? 'Eventos Culturais' : 'Cultural Events',
                          description: isPortuguese ? 'Acesso a eventos e experiências exclusivas' : 'Access to exclusive events and experiences'
                        },
                        {
                          icon: ShieldCheckIcon,
                          title: isPortuguese ? 'Serviços Premium' : 'Premium Services',
                          description: isPortuguese ? 'Reservas de transporte e motorista' : 'Transport and driver bookings'
                        },
                        {
                          icon: HeartIcon,
                          title: isPortuguese ? 'Suporte Comunitário' : 'Community Support',
                          description: isPortuguese ? 'Apoio e assistência da comunidade' : 'Community support and assistance'
                        }
                      ].map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <IconComponent className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Preço' : 'Pricing'}
                    </h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">£19.99</div>
                      <div className="text-sm text-gray-600 mb-3">
                        {isPortuguese ? 'por mês' : 'per month'}
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        {isPortuguese ? 'Comunidade de falantes de português em Londres' : 'London Portuguese-speaking community'}
                      </div>
                      {!hasActiveSubscription && !isInTrial && (
                        <button
                          onClick={handleSubscribe}
                          disabled={isCreatingSubscription}
                          className="w-full btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isCreatingSubscription 
                            ? (isPortuguese ? 'Processando...' : 'Processing...')
                            : (isPortuguese ? 'Subscrever' : 'Subscribe')
                          }
                        </button>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      {isPortuguese ? 'Precisa de ajuda?' : 'Need help?'}
                    </h3>
                    <div className="space-y-3">
                      <a 
                        href={ROUTES.contact} 
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <span>{isPortuguese ? 'Contactar Suporte' : 'Contact Support'}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href={ROUTES.faq} 
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <span>{isPortuguese ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href={ROUTES.terms} 
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <span>{isPortuguese ? 'Termos de Serviço' : 'Terms of Service'}</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}