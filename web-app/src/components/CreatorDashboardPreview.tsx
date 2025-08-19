'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign,
  Video,
  Calendar,
  Star,
  Globe,
  Clock,
  Award,
  Gift,
  Crown,
  PlayCircle,
  Camera,
  Mic,
  Settings,
  BarChart3,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface CreatorDashboardPreviewProps {
  streamKey: string
  creatorName?: string
}

export default function CreatorDashboardPreview({ streamKey, creatorName = 'Novo Criador' }: CreatorDashboardPreviewProps) {
  const { language } = useLanguage()
  const isPt = language === 'pt'

  const dashboardStats = [
    {
      icon: Users,
      label: isPt ? 'Seguidores' : 'Followers',
      value: '0',
      change: '+0%',
      color: 'text-blue-600'
    },
    {
      icon: Eye,
      label: isPt ? 'Visualizações Totais' : 'Total Views',
      value: '0',
      change: '+0%',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      label: isPt ? 'Ganhos Este Mês' : 'Earnings This Month',
      value: '£0',
      change: '+0%',
      color: 'text-primary-600'
    },
    {
      icon: Video,
      label: isPt ? 'Streams Realizadas' : 'Streams Completed',
      value: '0',
      change: '+0%',
      color: 'text-purple-600'
    }
  ]

  const quickActions = [
    {
      icon: Camera,
      title: isPt ? 'Começar Stream' : 'Start Stream',
      description: isPt ? 'Iniciar transmissão ao vivo' : 'Start live broadcast',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: Calendar,
      title: isPt ? 'Agendar Stream' : 'Schedule Stream',
      description: isPt ? 'Planear transmissão futura' : 'Plan future broadcast',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Video,
      title: isPt ? 'Gerir Conteúdo' : 'Manage Content',
      description: isPt ? 'Ver gravações e highlights' : 'View recordings and highlights',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Settings,
      title: isPt ? 'Configurações' : 'Settings',
      description: isPt ? 'Configurar perfil e stream' : 'Configure profile and stream',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  const upcomingFeatures = [
    {
      icon: Gift,
      title: isPt ? 'Sistema de Doações' : 'Donation System',
      description: isPt ? 'Receba apoio direto dos espectadores' : 'Receive direct support from viewers',
      status: isPt ? 'Em Breve' : 'Coming Soon'
    },
    {
      icon: Crown,
      title: isPt ? 'Subscrições Premium' : 'Premium Subscriptions',
      description: isPt ? 'Conteúdo exclusivo para subscritores' : 'Exclusive content for subscribers',
      status: isPt ? 'Em Breve' : 'Coming Soon'
    },
    {
      icon: Award,
      title: isPt ? 'Programa de Embaixadores' : 'Ambassador Program',
      description: isPt ? 'Benefícios especiais para criadores destacados' : 'Special benefits for featured creators',
      status: isPt ? 'Em Breve' : 'Coming Soon'
    }
  ]

  const recentActivity = [
    {
      type: 'application',
      message: isPt 
        ? 'Candidatura submetida para revisão'
        : 'Application submitted for review',
      time: isPt ? 'Agora mesmo' : 'Just now',
      icon: Calendar
    },
    {
      type: 'setup',
      message: isPt 
        ? 'Chave de streaming gerada'
        : 'Streaming key generated',
      time: isPt ? 'Agora mesmo' : 'Just now',
      icon: Settings
    },
    {
      type: 'welcome',
      message: isPt 
        ? 'Bem-vindo ao programa de criadores LusoTown!'
        : 'Welcome to the LusoTown creator program!',
      time: isPt ? 'Agora mesmo' : 'Just now',
      icon: Heart
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isPt ? 'Painel do Criador' : 'Creator Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isPt ? `Bem-vindo, ${creatorName}` : `Welcome, ${creatorName}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {isPt ? 'Pendente Aprovação' : 'Pending Approval'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isPt ? 'Ações Rápidas' : 'Quick Actions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg text-white transition-all transform hover:scale-105 text-left ${action.color}`}
                    disabled
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    {isPt 
                      ? 'Aguardando aprovação para ativar funcionalidades'
                      : 'Waiting for approval to activate features'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isPt ? 'Funcionalidades Futuras' : 'Upcoming Features'}
              </h2>
              <div className="space-y-4">
                {upcomingFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-white rounded-lg">
                      <feature.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {feature.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stream Key */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                {isPt ? 'Chave de Streaming' : 'Stream Key'}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-gray-800 bg-white px-2 py-1 rounded border flex-1 truncate">
                    {streamKey}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(streamKey)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-600">
                  {isPt 
                    ? '🔒 Mantenha esta chave segura'
                    : '🔒 Keep this key secure'
                  }
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                {isPt ? 'Atividade Recente' : 'Recent Activity'}
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg mt-0.5">
                      <activity.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                {isPt ? 'Precisa de Ajuda?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isPt 
                  ? 'A nossa equipa está aqui para o ajudar a começar'
                  : 'Our team is here to help you get started'
                }
              </p>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {isPt ? 'Chat ao Vivo' : 'Live Chat'}
                    </span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {isPt ? 'Guias para Criadores' : 'Creator Guides'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}