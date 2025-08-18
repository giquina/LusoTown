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

  const handleUpgrade = async (tier: 'community' | 'ambassador') => {
    await createSubscription(tier)
  }

  const translations = {
    en: {
      title: 'Unlock Premium Matches',
      subtitle: 'Connect with More Portuguese Community Members',
      dailyLimitReached: 'Daily free match limit reached',
      upgradeMessage: 'Join our Portuguese community matching to discover meaningful connections with fellow Portuguese speakers in London.',
      freeFeatures: {
        title: 'Free Matching',
        matches: '3 matches per day',
        messages: '10 messages per month',
        viewing: 'Basic profile viewing',
        search: 'Location-based search'
      },
      features: {
        unlimited: 'Unlimited matches & messaging',
        events: 'Unlimited cultural events access',
        filters: 'Cultural compatibility filters',
        verification: 'Profile verification badge',
        ambassador_priority: 'Priority profile visibility',
        ambassador_coordination: 'Event hosting privileges',
        ambassador_support: 'Direct Portuguese community support',
        ambassador_streaming: 'Unlimited livestream hours'
      },
      pricing: {
        title: 'Choose Your Community Level',
        monthly: 'Monthly',
        yearly: 'Yearly',
        save: 'Save 20%',
        community: {
          name: 'Community Member',
          price: '£19.99',
          period: '/month',
          yearlyPrice: '£199',
          yearlyMonthly: '£16.58/month',
          description: 'Perfect for connecting with Portuguese speakers'
        },
        ambassador: {
          name: 'Cultural Ambassador',
          price: '£39.99',
          period: '/month',
          yearlyPrice: '£399',
          yearlyMonthly: '£33.25/month',
          description: 'Ideal for active community builders'
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
      upgradeMessage: 'Junte-se à nossa comunidade portuguesa para descobrir conexões significativas com outros falantes de português em Londres.',
      freeFeatures: {
        title: 'Matches Gratuitos',
        matches: '3 matches por dia',
        messages: '10 mensagens por mês',
        viewing: 'Visualização básica de perfis',
        search: 'Pesquisa por localização'
      },
      features: {
        unlimited: 'Matches e mensagens ilimitados',
        events: 'Acesso ilimitado a eventos culturais',
        filters: 'Filtros de compatibilidade cultural',
        verification: 'Distintivo de perfil verificado',
        ambassador_priority: 'Visibilidade prioritária do perfil',
        ambassador_coordination: 'Privilégios de organização de eventos',
        ambassador_support: 'Suporte direto da comunidade portuguesa',
        ambassador_streaming: 'Horas de transmissão ilimitadas'
      },
      pricing: {
        title: 'Escolha o Seu Nível Comunitário',
        monthly: 'Mensal',
        yearly: 'Anual',
        save: 'Poupe 20%',
        community: {
          name: 'Membro da Comunidade',
          price: '£19.99',
          period: '/mês',
          yearlyPrice: '£199',
          yearlyMonthly: '£16.58/mês',
          description: 'Perfeito para conectar com falantes de português'
        },
        ambassador: {
          name: 'Embaixador Cultural',
          price: '£39.99',
          period: '/mês',
          yearlyPrice: '£399',
          yearlyMonthly: '£33.25/mês',
          description: 'Ideal para construtores ativos da comunidade'
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
      name: 'Free Matching',
      price: '£0',
      yearlyPrice: '£0',
      period: '/month',
      description: language === 'pt' ? 'Comece a conectar com a comunidade' : 'Start connecting with the community',
      color: 'neutral',
      icon: Heart,
      popular: false,
      tier: 'free' as const,
      features: [t.freeFeatures.matches, t.freeFeatures.messages, t.freeFeatures.viewing, t.freeFeatures.search]
    },
    {
      name: t.pricing.community.name,
      price: t.pricing.community.price,
      yearlyPrice: t.pricing.community.yearlyPrice,
      yearlyMonthly: t.pricing.community.yearlyMonthly,
      period: t.pricing.community.period,
      description: t.pricing.community.description,
      color: 'primary',
      icon: Star,
      popular: true,
      tier: 'community' as const,
      features: [t.features.unlimited, t.features.events, t.features.filters, t.features.verification]
    },
    {
      name: t.pricing.ambassador.name,
      price: t.pricing.ambassador.price,
      yearlyPrice: t.pricing.ambassador.yearlyPrice,
      yearlyMonthly: t.pricing.ambassador.yearlyMonthly,
      period: t.pricing.ambassador.period,
      description: t.pricing.ambassador.description,
      color: 'secondary',
      icon: Crown,
      popular: false,
      tier: 'ambassador' as const,
      features: [t.features.unlimited, t.features.events, t.features.ambassador_priority, t.features.ambassador_coordination, t.features.ambassador_support, t.features.ambassador_streaming]
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

          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span className="font-semibold text-primary-900">
                {language === 'pt' ? 'Conecte-se com a Comunidade Portuguesa em Londres' : 'Connect with the Portuguese Community in London'}
              </span>
            </div>
            <p className="text-primary-800">
              {t.upgradeMessage}
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
              { icon: MessageCircle, text: t.features.messaging },
              { icon: Filter, text: t.features.filters },
              { icon: Shield, text: t.features.verification },
              { icon: Calendar, text: t.features.events },
              { icon: Star, text: t.features.ambassador_priority },
              { icon: Users, text: t.features.ambassador_coordination },
              { icon: Sparkles, text: t.features.ambassador_support }
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, index) => {
              const TierIcon = tier.icon
              const isFree = tier.tier === 'free'
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative bg-white rounded-xl p-6 shadow-lg border-2 ${
                    tier.popular ? 'border-primary-300 ring-2 ring-primary-100' : 'border-neutral-200'
                  } ${isFree ? 'opacity-75' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {language === 'pt' ? 'Mais Popular' : 'Most Popular'}
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
                    
                    {!isFree && tier.yearlyMonthly && (
                      <div className="text-sm text-neutral-500">
                        {t.pricing.yearly}: {tier.yearlyPrice} ({tier.yearlyMonthly})
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${tier.color}-500`}></div>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {isFree ? (
                    <button className="w-full py-3 rounded-lg font-medium bg-neutral-200 text-neutral-600 cursor-default">
                      {language === 'pt' ? 'Sempre Gratuito' : 'Always Free'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(tier.tier)}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        tier.popular 
                          ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                          : 'bg-secondary-600 hover:bg-secondary-700 text-white'
                      }`}
                    >
                      {t.buttons.choosePlan}
                    </button>
                  )}
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
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-primary-900 mb-3">
              {language === 'pt' ? 'Pronto para se Conectar?' : 'Ready to Connect?'}
            </h3>
            <p className="text-primary-700 mb-4">
              {language === 'pt' 
                ? 'Junte-se à nossa comunidade de falantes de português em Londres e comece a formar conexões significativas hoje.'
                : 'Join our community of Portuguese speakers in London and start forming meaningful connections today.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleUpgrade('community')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                {language === 'pt' ? 'Começar por £19.99/mês' : 'Start at £19.99/month'}
              </button>
              <button
                onClick={() => handleUpgrade('ambassador')}
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                {language === 'pt' ? 'Embaixador por £39.99/mês' : 'Ambassador at £39.99/month'}
              </button>
            </div>
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