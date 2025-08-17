'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  Users, 
  Car, 
  Home, 
  UserPlus, 
  MessageSquare,
  Plus,
  ArrowRight
} from 'lucide-react'

interface QuickActionsProps {
  onTabChange: (tab: string) => void
}

export default function QuickActions({ onTabChange }: QuickActionsProps) {
  const { language, t } = useLanguage()
  const router = useRouter()

  const actions = [
    {
      id: 'join-event',
      title: language === 'pt' ? 'Participar em Evento' : 'Join Event',
      description: language === 'pt' ? 'Descubra eventos locais' : 'Discover local events',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-primary-500 hover:bg-primary-600',
      action: () => router.push('/events')
    },
    {
      id: 'book-transport',
      title: language === 'pt' ? 'Reservar Transporte' : 'Book Transport',
      description: language === 'pt' ? 'Serviços premium com SIA' : 'Premium SIA services',
      icon: <Car className="w-5 h-5" />,
      color: 'bg-secondary-500 hover:bg-secondary-600',
      action: () => router.push('/transport')
    },
    {
      id: 'connect',
      title: language === 'pt' ? 'Fazer Conexões' : 'Make Connections',
      description: language === 'pt' ? 'Expandir sua rede' : 'Expand your network',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-accent-500 hover:bg-accent-600',
      action: () => onTabChange('networking')
    },
    {
      id: 'housing',
      title: language === 'pt' ? 'Assistência Habitacional' : 'Housing Assistance',
      description: language === 'pt' ? 'Suporte comunitário' : 'Community support',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-premium-500 hover:bg-premium-600',
      action: () => router.push('/housing-assistance')
    },
    {
      id: 'mentorship',
      title: language === 'pt' ? 'Encontrar Mentor' : 'Find Mentor',
      description: language === 'pt' ? 'Crescimento profissional' : 'Professional growth',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'bg-coral-500 hover:bg-coral-600',
      action: () => router.push('/mentorship')
    },
    {
      id: 'forum',
      title: language === 'pt' ? 'Discussões da Comunidade' : 'Community Discussions',
      description: language === 'pt' ? 'Participe nas conversas' : 'Join conversations',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-primary-500 hover:bg-primary-600',
      action: () => router.push('/forums')
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Plus className="w-6 h-6 text-action-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white ${action.color}`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              {language === 'pt' ? 'Precisa de Ajuda?' : 'Need Help?'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt' 
                ? 'Nossa equipe está sempre disponível para apoiar a comunidade portuguesa'
                : 'Our team is always available to support the Portuguese community'
              }
            </p>
          </div>
          <button 
            onClick={() => window.open('https://wa.me/447123456789', '_blank')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            {language === 'pt' ? 'WhatsApp' : 'WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )
}