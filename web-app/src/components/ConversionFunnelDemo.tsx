'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Heart, 
  MessageCircle, 
  Calendar,
  Play,
  TrendingUp,
  Users,
  Zap,
  Eye,
  Clock,
  Mail,
  BarChart3
} from 'lucide-react'

// Import our conversion components
import UpgradePrompts, { useUpgradePrompt } from './UpgradePrompts'
import TrialCountdown, { TrialProgress } from './TrialCountdown'
import { 
  UsageLimitIndicator, 
  UsageDashboard, 
  InlineUsageCheck 
} from './UsageLimitIndicators'

export default function ConversionFunnelDemo() {
  const { language } = useLanguage()
  const { membershipTier, isInTrial, usage } = useSubscription()
  const { showPrompt, hidePrompt, isVisible, activePrompt } = useUpgradePrompt()
  
  const [activeDemo, setActiveDemo] = useState<string>('overview')

  const translations = {
    en: {
      title: 'Conversion Funnel System Demo',
      subtitle: 'LusoTown\'s 3-Tier Subscription Model Components',
      overview: 'Overview',
      upgrade_prompts: 'Upgrade Prompts',
      trial_system: 'Trial System',
      usage_limits: 'Usage Limits',
      email_sequences: 'Email Sequences',
      analytics: 'Analytics',
      current_tier: 'Current Tier',
      demo_actions: 'Demo Actions',
      trigger_prompt: 'Trigger Prompt',
      view_dashboard: 'View Dashboard',
      start_trial: 'Start Trial',
      features: {
        contextual: 'Contextual upgrade prompts based on user behavior',
        trial: '7-day free trial system with countdown timers',
        limits: 'Visual usage limit indicators with progress bars', 
        email: 'Automated email sequences for conversion',
        analytics: 'Comprehensive conversion tracking and metrics'
      },
      prompts: {
        matches_limit: 'Matches Limit Reached',
        messages_limit: 'Messages Limit Reached',
        after_match: 'Post-Match Celebration',
        premium_event: 'Premium Event Access',
        general: 'General Upgrade'
      }
    },
    pt: {
      title: 'Demonstração do Sistema de Funil de Conversão',
      subtitle: 'Componentes do Modelo de Subscrição de 3 Níveis do LusoTown',
      overview: 'Visão Geral',
      upgrade_prompts: 'Prompts de Upgrade',
      trial_system: 'Sistema de Teste',
      usage_limits: 'Limites de Utilização',
      email_sequences: 'Sequências de Email',
      analytics: 'Análises',
      current_tier: 'Nível Atual',
      demo_actions: 'Ações de Demo',
      trigger_prompt: 'Acionar Prompt',
      view_dashboard: 'Ver Dashboard',
      start_trial: 'Iniciar Teste',
      features: {
        contextual: 'Prompts de upgrade contextuais baseados no comportamento do utilizador',
        trial: 'Sistema de teste gratuito de 7 dias com contadores',
        limits: 'Indicadores visuais de limites de uso com barras de progresso',
        email: 'Sequências de email automatizadas para conversão',
        analytics: 'Rastreamento e métricas de conversão abrangentes'
      },
      prompts: {
        matches_limit: 'Limite de Matches Atingido',
        messages_limit: 'Limite de Mensagens Atingido',
        after_match: 'Celebração Pós-Match',
        premium_event: 'Acesso a Evento Premium',
        general: 'Upgrade Geral'
      }
    }
  }

  const t = translations[language]

  const demoSections = [
    {
      id: 'overview',
      title: t.overview,
      icon: TrendingUp,
      description: t.features.contextual
    },
    {
      id: 'upgrade_prompts',
      title: t.upgrade_prompts,
      icon: Crown,
      description: t.features.contextual
    },
    {
      id: 'trial_system', 
      title: t.trial_system,
      icon: Clock,
      description: t.features.trial
    },
    {
      id: 'usage_limits',
      title: t.usage_limits,
      icon: BarChart3,
      description: t.features.limits
    },
    {
      id: 'email_sequences',
      title: t.email_sequences,
      icon: Mail,
      description: t.features.email
    },
    {
      id: 'analytics',
      title: t.analytics,
      icon: Eye,
      description: t.features.analytics
    }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          {language === 'pt' ? 'Sistema de Conversão Completo' : 'Complete Conversion System'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'pt' ? 'Gratuito' : 'Free'}
            </h4>
            <p className="text-sm text-neutral-600">
              {language === 'pt' ? '3 matches/dia, 10 msgs/mês' : '3 matches/day, 10 msgs/month'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'pt' ? 'Comunidade £19.99' : 'Community £19.99'}
            </h4>
            <p className="text-sm text-neutral-600">
              {language === 'pt' ? 'Ilimitado + eventos' : 'Unlimited + events'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold mb-2">
              {language === 'pt' ? 'Embaixador £39.99' : 'Ambassador £39.99'}
            </h4>
            <p className="text-sm text-neutral-600">
              {language === 'pt' ? 'Tudo + hosting' : 'Everything + hosting'}
            </p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t.current_tier}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${
            membershipTier === 'free' ? 'bg-neutral-100' :
            membershipTier === 'community' ? 'bg-primary-100' :
            'bg-secondary-100'
          }`}>
            {membershipTier === 'ambassador' ? (
              <Crown className={`h-5 w-5 text-secondary-600`} />
            ) : (
              <Users className={`h-5 w-5 ${
                membershipTier === 'community' ? 'text-primary-600' : 'text-neutral-600'
              }`} />
            )}
          </div>
          <div>
            <span className="font-medium capitalize">{membershipTier}</span>
            {isInTrial && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {language === 'pt' ? 'Em Teste' : 'On Trial'}
              </span>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-coral-50 rounded-lg">
            <Heart className="h-6 w-6 text-coral-500 mx-auto mb-1" />
            <div className="text-sm font-medium">
              {language === 'pt' ? 'Matches Hoje' : 'Matches Today'}
            </div>
            <div className="text-lg font-bold text-coral-600">
              {usage?.dailyMatchesUsed || 0}
            </div>
          </div>
          
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <MessageCircle className="h-6 w-6 text-primary-500 mx-auto mb-1" />
            <div className="text-sm font-medium">
              {language === 'pt' ? 'Msgs Mês' : 'Msgs Month'}
            </div>
            <div className="text-lg font-bold text-primary-600">
              {usage?.monthlyMessagesUsed || 0}
            </div>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <Calendar className="h-6 w-6 text-secondary-500 mx-auto mb-1" />
            <div className="text-sm font-medium">
              {language === 'pt' ? 'Eventos' : 'Events'}
            </div>
            <div className="text-lg font-bold text-secondary-600">
              {usage?.premiumEventsUsed || 0}
            </div>
          </div>
          
          <div className="text-center p-3 bg-premium-50 rounded-lg">
            <Play className="h-6 w-6 text-premium-500 mx-auto mb-1" />
            <div className="text-sm font-medium">
              {language === 'pt' ? 'Horas Stream' : 'Stream Hours'}
            </div>
            <div className="text-lg font-bold text-premium-600">
              {usage?.livestreamHoursUsed || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUpgradePrompts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold mb-4">{t.demo_actions}</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'matches_limit', icon: Heart, color: 'coral' },
            { key: 'messages_limit', icon: MessageCircle, color: 'primary' },
            { key: 'after_match', icon: Zap, color: 'secondary' },
            { key: 'premium_event', icon: Calendar, color: 'premium' },
            { key: 'general', icon: Crown, color: 'primary' }
          ].map(({ key, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => showPrompt(key as any, Math.floor(Math.random() * 3), { demo: true })}
              className={`p-3 rounded-lg border border-${color}-200 bg-${color}-50 hover:bg-${color}-100 transition-colors text-center`}
            >
              <Icon className={`h-6 w-6 text-${color}-600 mx-auto mb-2`} />
              <div className="text-sm font-medium">
                {t.prompts[key]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Show current prompt if active */}
      {activePrompt && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">
            {language === 'pt' ? 'Prompt Ativo:' : 'Active Prompt:'}
          </h4>
          <p className="text-yellow-700">
            {t.prompts[activePrompt.trigger]} - {language === 'pt' ? 'Demonstração' : 'Demo Mode'}
          </p>
        </div>
      )}
    </div>
  )

  const renderTrialSystem = () => (
    <div className="space-y-6">
      {isInTrial ? (
        <>
          <TrialCountdown position="banner" dismissible={false} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrialCountdown position="sidebar" showDetails={true} />
            <TrialProgress />
          </div>
        </>
      ) : (
        <div className="text-center bg-neutral-50 rounded-xl p-8">
          <Clock className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">
            {language === 'pt' ? 'Nenhum teste ativo' : 'No active trial'}
          </h3>
          <p className="text-neutral-600 mb-4">
            {language === 'pt' 
              ? 'Inicie um teste gratuito de 7 dias para ver os componentes do sistema de teste'
              : 'Start a 7-day free trial to see the trial system components'
            }
          </p>
          <button 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            onClick={() => alert(language === 'pt' ? 'Funcionalidade de demo - integraria com o sistema de teste' : 'Demo functionality - would integrate with trial system')}
          >
            {t.start_trial}
          </button>
        </div>
      )}
    </div>
  )

  const renderUsageLimits = () => (
    <div className="space-y-6">
      <UsageDashboard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-neutral-900">
            {language === 'pt' ? 'Indicadores Compactos' : 'Compact Indicators'}
          </h4>
          <div className="space-y-3">
            <UsageLimitIndicator feature="matches" size="compact" />
            <UsageLimitIndicator feature="messages" size="compact" />
            <UsageLimitIndicator feature="events" size="compact" />
            <UsageLimitIndicator feature="livestream" size="compact" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-neutral-900">
            {language === 'pt' ? 'Verificações Inline' : 'Inline Checks'}
          </h4>
          <div className="space-y-3 p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">{language === 'pt' ? 'Enviar Mensagem:' : 'Send Message:'}</span>
              <InlineUsageCheck feature="messages" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{language === 'pt' ? 'Criar Match:' : 'Create Match:'}</span>
              <InlineUsageCheck feature="matches" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">{language === 'pt' ? 'Evento Premium:' : 'Premium Event:'}</span>
              <InlineUsageCheck feature="events" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailSequences = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'pt' ? 'Sequências de Email Automatizadas' : 'Automated Email Sequences'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: 'welcome',
              title: language === 'pt' ? 'Email de Boas-vindas' : 'Welcome Email',
              description: language === 'pt' ? 'Enviado imediatamente após registo' : 'Sent immediately after signup',
              delay: language === 'pt' ? 'Imediato' : 'Immediate',
              icon: Users
            },
            {
              type: 'trial_reminder_day3',
              title: language === 'pt' ? 'Lembrete Dia 3' : 'Day 3 Reminder',
              description: language === 'pt' ? 'Lembrete de meio do teste' : 'Mid-trial reminder',
              delay: language === 'pt' ? '3 dias' : '3 days',
              icon: Clock
            },
            {
              type: 'trial_reminder_day6',
              title: language === 'pt' ? 'Último Dia' : 'Last Day',
              description: language === 'pt' ? 'Urgência de conversão' : 'Conversion urgency',
              delay: language === 'pt' ? '6 dias' : '6 days',
              icon: Zap
            },
            {
              type: 'trial_expired',
              title: language === 'pt' ? 'Teste Expirado' : 'Trial Expired',
              description: language === 'pt' ? 'Oferta de desconto especial' : 'Special discount offer',
              delay: language === 'pt' ? '2 horas após expirar' : '2 hours after expiry',
              icon: Crown
            }
          ].map((email) => (
            <div key={email.type} className="p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <email.icon className="h-6 w-6 text-primary-600" />
                <div>
                  <h4 className="font-semibold">{email.title}</h4>
                  <p className="text-sm text-neutral-600">{email.delay}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-700">{email.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: language === 'pt' ? 'Taxa de Conversão' : 'Conversion Rate',
            value: '23.5%',
            change: '+5.2%',
            color: 'green'
          },
          {
            title: language === 'pt' ? 'Testes Iniciados' : 'Trials Started',
            value: '1,247',
            change: '+12.3%',
            color: 'blue'
          },
          {
            title: language === 'pt' ? 'Upgrades Este Mês' : 'Upgrades This Month',
            value: '89',
            change: '+28.4%',
            color: 'green'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6">
            <h4 className="font-medium text-neutral-600 mb-2">{metric.title}</h4>
            <div className="text-2xl font-bold text-neutral-900 mb-1">{metric.value}</div>
            <div className={`text-sm font-medium text-${metric.color}-600`}>{metric.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'pt' ? 'Eventos de Conversão' : 'Conversion Events'}
        </h3>
        
        <div className="space-y-3">
          {[
            { event: 'upgrade_prompt_shown', count: 2150, rate: '100%' },
            { event: 'upgrade_clicked', count: 505, rate: '23.5%' },
            { event: 'trial_started', count: 1247, rate: '58.0%' },
            { event: 'trial_converted', count: 293, rate: '23.5%' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="font-medium">{event.event.replace('_', ' ').toUpperCase()}</span>
              <div className="flex items-center gap-4">
                <span className="text-neutral-600">{event.count}</span>
                <span className="text-green-600 font-medium">{event.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeDemo) {
      case 'overview': return renderOverview()
      case 'upgrade_prompts': return renderUpgradePrompts()
      case 'trial_system': return renderTrialSystem()
      case 'usage_limits': return renderUsageLimits()
      case 'email_sequences': return renderEmailSequences()
      case 'analytics': return renderAnalytics()
      default: return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">{t.title}</h1>
          <p className="text-xl text-neutral-600">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 space-y-2"
          >
            {demoSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveDemo(section.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeDemo === section.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-neutral-700 hover:bg-primary-50 border border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-6 w-6 ${
                      activeDemo === section.id ? 'text-white' : 'text-primary-600'
                    }`} />
                    <span className="font-semibold">{section.title}</span>
                  </div>
                  <p className={`text-sm ${
                    activeDemo === section.id ? 'text-primary-100' : 'text-neutral-600'
                  }`}>
                    {section.description}
                  </p>
                </button>
              )
            })}
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Upgrade Prompts Modal */}
      {activePrompt && (
        <UpgradePrompts
          trigger={activePrompt.trigger}
          isVisible={isVisible}
          onClose={hidePrompt}
          remainingCount={activePrompt.remainingCount}
          contextData={activePrompt.contextData}
        />
      )}
    </div>
  )
}