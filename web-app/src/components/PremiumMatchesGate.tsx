'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Heart, 
  Sparkles, 
  Filter, 
  MessageCircle, 
  Shield, 
  Star,
  Users,
  Calendar,
  Lock,
  Zap
} from 'lucide-react'

export default function PremiumMatchesGate() {
  const { language } = useLanguage()
  const { createSubscription } = useSubscription()

  const handleUpgrade = async () => {
    await createSubscription('bronze')
  }

  const translations = {
    en: {
      title: 'Unlock Premium Matches',
      subtitle: 'Connect with More Portuguese Community Members',
      dailyLimitReached: 'Daily free match limit reached',
      upgradeMessage: 'Upgrade to Premium to continue discovering meaningful connections in the Portuguese community.',
      features: {
        unlimited: 'Unlimited daily matches',
        advanced: 'Advanced filtering options',
        priority: 'Priority profile visibility',
        insights: 'Detailed compatibility insights',
        messaging: 'Direct messaging with matches',
        verification: 'Profile verification badge',
        events: 'VIP access to exclusive events',
        support: '24/7 Portuguese community support'
      },
      pricing: {
        title: 'Choose Your Membership',
        monthly: 'Monthly',
        yearly: 'Yearly',
        save: 'Save 20%',
        bronze: {
          name: 'Bronze',
          price: '£9.99',
          period: '/month',
          yearlyPrice: '£95.99',
          description: 'Perfect for casual community connections'
        },
        silver: {
          name: 'Silver',
          price: '£19.99',
          period: '/month',
          yearlyPrice: '£191.99',
          description: 'Great for active community members'
        },
        gold: {
          name: 'Gold',
          price: '£39.99',
          period: '/month',
          yearlyPrice: '£383.99',
          description: 'Ideal for business networking'
        },
        platinum: {
          name: 'Platinum',
          price: '£79.99',
          period: '/month',
          yearlyPrice: '£767.99',
          description: 'Ultimate Portuguese community experience'
        }
      },
      buttons: {
        upgrade: 'Upgrade to Premium',
        choosePlan: 'Choose Plan',
        startFree: 'Start Free Trial',
        backToMatches: 'Back to Free Matches'
      },
      testimonials: {
        title: 'What Portuguese Community Members Say',
        maria: {
          text: 'Found amazing business connections through LusoTown Premium. The advanced filters helped me connect with Portuguese entrepreneurs in my field.',
          author: 'Maria Santos, Finance Professional'
        },
        carlos: {
          text: 'The cultural matching algorithm is incredible. I\'ve met fellow Portuguese families and we now have regular gatherings in London.',
          author: 'Carlos Oliveira, Family Man'
        },
        ana: {
          text: 'As a student, the Premium features helped me find Portuguese mentors and study groups. Worth every penny for the connections.',
          author: 'Ana Costa, Medical Student'
        }
      }
    },
    pt: {
      title: 'Desbloqueie Matches Premium',
      subtitle: 'Conecte-se com Mais Membros da Comunidade Portuguesa',
      dailyLimitReached: 'Limite diário de matches gratuitos atingido',
      upgradeMessage: 'Faça upgrade para Premium para continuar a descobrir conexões significativas na comunidade portuguesa.',
      features: {
        unlimited: 'Matches diários ilimitados',
        advanced: 'Opções de filtro avançadas',
        priority: 'Visibilidade prioritária do perfil',
        insights: 'Insights detalhados de compatibilidade',
        messaging: 'Mensagens diretas com matches',
        verification: 'Distintivo de perfil verificado',
        events: 'Acesso VIP a eventos exclusivos',
        support: 'Suporte 24/7 da comunidade portuguesa'
      },
      pricing: {
        title: 'Escolha a Sua Membership',
        monthly: 'Mensal',
        yearly: 'Anual',
        save: 'Poupe 20%',
        bronze: {
          name: 'Bronze',
          price: '£9.99',
          period: '/mês',
          yearlyPrice: '£95.99',
          description: 'Perfeito para conexões casuais da comunidade'
        },
        silver: {
          name: 'Silver',
          price: '£19.99',
          period: '/mês',
          yearlyPrice: '£191.99',
          description: 'Ótimo para membros ativos da comunidade'
        },
        gold: {
          name: 'Gold',
          price: '£39.99',
          period: '/mês',
          yearlyPrice: '£383.99',
          description: 'Ideal para networking empresarial'
        },
        platinum: {
          name: 'Platinum',
          price: '£79.99',
          period: '/mês',
          yearlyPrice: '£767.99',
          description: 'Experiência definitiva da comunidade portuguesa'
        }
      },
      buttons: {
        upgrade: 'Upgrade para Premium',
        choosePlan: 'Escolher Plano',
        startFree: 'Iniciar Teste Gratuito',
        backToMatches: 'Voltar aos Matches Gratuitos'
      },
      testimonials: {
        title: 'O Que Dizem os Membros da Comunidade Portuguesa',
        maria: {
          text: 'Encontrei conexões empresariais incríveis através do LusoTown Premium. Os filtros avançados ajudaram-me a conectar com empreendedores portugueses na minha área.',
          author: 'Maria Santos, Profissional de Finanças'
        },
        carlos: {
          text: 'O algoritmo de compatibilidade cultural é incrível. Conheci famílias portuguesas e agora temos encontros regulares em Londres.',
          author: 'Carlos Oliveira, Pai de Família'
        },
        ana: {
          text: 'Como estudante, as funcionalidades Premium ajudaram-me a encontrar mentores portugueses e grupos de estudo. Vale cada penny pelas conexões.',
          author: 'Ana Costa, Estudante de Medicina'
        }
      }
    }
  }

  const t = translations[language]

  const tiers = [
    {
      name: t.pricing.bronze.name,
      price: t.pricing.bronze.price,
      yearlyPrice: t.pricing.bronze.yearlyPrice,
      period: t.pricing.bronze.period,
      description: t.pricing.bronze.description,
      color: 'coral',
      icon: Heart,
      popular: false,
      features: [t.features.unlimited, t.features.messaging, t.features.verification]
    },
    {
      name: t.pricing.silver.name,
      price: t.pricing.silver.price,
      yearlyPrice: t.pricing.silver.yearlyPrice,
      period: t.pricing.silver.period,
      description: t.pricing.silver.description,
      color: 'neutral',
      icon: Star,
      popular: true,
      features: [t.features.unlimited, t.features.advanced, t.features.messaging, t.features.verification, t.features.insights]
    },
    {
      name: t.pricing.gold.name,
      price: t.pricing.gold.price,
      yearlyPrice: t.pricing.gold.yearlyPrice,
      period: t.pricing.gold.period,
      description: t.pricing.gold.description,
      color: 'accent',
      icon: Crown,
      popular: false,
      features: [t.features.unlimited, t.features.advanced, t.features.priority, t.features.messaging, t.features.verification, t.features.insights, t.features.events]
    },
    {
      name: t.pricing.platinum.name,
      price: t.pricing.platinum.price,
      yearlyPrice: t.pricing.platinum.yearlyPrice,
      period: t.pricing.platinum.period,
      description: t.pricing.platinum.description,
      color: 'premium',
      icon: Sparkles,
      popular: false,
      features: [t.features.unlimited, t.features.advanced, t.features.priority, t.features.messaging, t.features.verification, t.features.insights, t.features.events, t.features.support]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="h-8 w-8 text-coral-500" />
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900">
              {t.title}
            </h1>
            <Crown className="h-8 w-8 text-premium-500" />
          </div>
          
          <p className="text-xl text-neutral-600 mb-6">
            {t.subtitle}
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-900">
                {language === 'pt' ? 'Serviço Premium Temporariamente Esgotado' : 'Premium Service Temporarily Fully Booked'}
              </span>
            </div>
            <p className="text-red-800">
              {language === 'pt' 
                ? 'O nosso serviço de matches premium está atualmente em alta demanda. Junte-se à nossa lista de espera para ser notificado quando a capacidade for restaurada.'
                : 'Our premium matching service is currently in high demand. Join our waiting list to be notified when capacity is restored.'
              }
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-8">
            Premium Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Heart, text: t.features.unlimited },
              { icon: Filter, text: t.features.advanced },
              { icon: Star, text: t.features.priority },
              { icon: MessageCircle, text: t.features.messaging },
              { icon: Shield, text: t.features.verification },
              { icon: Sparkles, text: t.features.insights },
              { icon: Calendar, text: t.features.events },
              { icon: Users, text: t.features.support }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center p-4 bg-white rounded-xl shadow-sm border border-neutral-100"
              >
                <feature.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-900">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-8">
            {t.pricing.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => {
              const TierIcon = tier.icon
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative bg-white rounded-xl p-6 shadow-lg border-2 ${
                    tier.popular ? 'border-primary-300 ring-2 ring-primary-100' : 'border-neutral-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <TierIcon className={`h-10 w-10 mx-auto mb-3 text-${tier.color}-600`} />
                    <h3 className="text-xl font-bold text-neutral-900">{tier.name}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{tier.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-neutral-900">{tier.price}</span>
                      <span className="text-neutral-600">{tier.period}</span>
                    </div>
                    
                    <div className="text-sm text-neutral-500">
                      {t.pricing.yearly}: {tier.yearlyPrice} ({t.pricing.save})
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${tier.color}-500`}></div>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    className="w-full py-3 rounded-lg font-medium bg-gray-400 text-white cursor-not-allowed opacity-60"
                    disabled
                  >
                    {language === 'pt' ? 'Temporariamente Indisponível' : 'Temporarily Unavailable'}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-8">
            {t.testimonials.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[t.testimonials.maria, t.testimonials.carlos, t.testimonials.ana].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
              >
                <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-neutral-900">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="space-y-4">
            <button
              className="bg-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg cursor-not-allowed opacity-60"
              disabled
            >
              {language === 'pt' ? 'Serviço Temporariamente Indisponível' : 'Service Temporarily Unavailable'}
            </button>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  console.log('Join premium matching waiting list');
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg"
              >
                {language === 'pt' ? 'Entrar na Lista de Espera' : 'Join Waiting List'}
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {language === 'pt' 
                ? 'Estimativa de disponibilidade: Abril 2025'
                : 'Estimated availability: April 2025'
              }
            </p>
          </div>
          
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-neutral-600 hover:text-neutral-900 font-medium"
            >
              {t.buttons.backToMatches}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}