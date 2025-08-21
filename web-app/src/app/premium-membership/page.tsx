'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MembershipTiers from '@/components/MembershipTiers'
import MembershipPortal from '@/components/MembershipPortal'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { authService } from '@/lib/auth'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function PremiumMembershipPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const { membershipTier, hasActiveSubscription } = useSubscription()
  
  const isPortuguese = language === 'pt'
  const user = authService.getCurrentUser()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen">
          <div className="container-width w-full">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center shadow-lg">
                    <StarIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">LusoTown Premium</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Associação Premium' : 'Premium Membership'}
                </h1>
                <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                  {isPortuguese 
                    ? 'Experiência completa da comunidade portuguesa de Londres com serviços premium e benefícios exclusivos'
                    : 'Complete London Portuguese community experience with premium services and exclusive benefits'
                  }
                </p>
              </motion.div>

              {/* Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <UserGroupIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isPortuguese ? 'Integração Comunitária' : 'Community Integration'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese
                        ? 'Clientes de serviços automaticamente qualificam para membros da comunidade'
                        : 'Service clients automatically qualify for community membership'
                      }
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CalendarDaysIcon className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese
                        ? 'Convites automáticos para eventos culturais portugueses e acesso à Câmara de Comércio'
                        : 'Automatic invitations to Portuguese cultural events and Chamber of Commerce access'
                      }
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShieldCheckIcon className="w-8 h-8 text-accent-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isPortuguese ? 'Descontos Premium' : 'Premium Discounts'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese
                        ? 'Até 25% de desconto em todos os serviços premium com rastreamento automático'
                        : 'Up to 25% discount on all premium services with automatic tracking'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Membership Portal for Active Members */}
              {hasActiveSubscription && membershipTier !== 'none' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-16"
                >
                  <MembershipPortal userId={user.id} />
                </motion.div>
              )}

              {/* Membership Tiers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: hasActiveSubscription ? 0.3 : 0.2 }}
              >
                <MembershipTiers 
                  showCurrentTier={hasActiveSubscription} 
                  allowUpgrade={true} 
                  compact={false}
                />
              </motion.div>

              {/* Revenue Optimization Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Sistema de Gestão de Benefícios' : 'Benefits Management System'}
                  </h2>
                  <p className="text-secondary-600 max-w-2xl mx-auto">
                    {isPortuguese
                      ? 'Portal completo de membro com rastreamento de benefícios e aplicação automática de descontos'
                      : 'Complete member portal with benefits tracking and automatic discount application'
                    }
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary-600 mb-2">£450K-750K</div>
                    <div className="text-sm text-secondary-600">
                      {isPortuguese ? 'Receita Projetada Anual' : 'Projected Annual Revenue'}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-600 mb-2">150-250</div>
                    <div className="text-sm text-secondary-600">
                      {isPortuguese ? 'Membros Objetivo' : 'Target Members'}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-accent-600 mb-2">4</div>
                    <div className="text-sm text-secondary-600">
                      {isPortuguese ? 'Níveis Premium' : 'Premium Tiers'}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-action-600 mb-2">25%</div>
                    <div className="text-sm text-secondary-600">
                      {isPortuguese ? 'Desconto Máximo' : 'Maximum Discount'}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section for Non-Members */}
              {!hasActiveSubscription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8"
                >
                  <div className="max-w-2xl mx-auto">
                    <SparklesIcon className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">
                      {isPortuguese ? 'Pronto para Começar?' : 'Ready to Get Started?'}
                    </h2>
                    <p className="text-primary-100 mb-6">
                      {isPortuguese
                        ? 'Junte-se à nossa comunidade premium e comece a desfrutar de benefícios exclusivos hoje.'
                        : 'Join our premium community and start enjoying exclusive benefits today.'
                      }
                    </p>
                    <button
                      onClick={() => router.push('/subscription')}
                      className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                    >
                      {isPortuguese ? 'Ver Planos' : 'View Plans'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}