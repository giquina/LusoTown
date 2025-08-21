'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { Calendar, Users, Car, Home, UserPlus, MessageSquare, Plus, ArrowRight } from 'lucide-react'

interface QuickActionsProps {
  onTabChange: (tab: string) => void
}

export default function QuickActions({ onTabChange }: QuickActionsProps) {
  const { language } = useLanguage()
  const router = useRouter()

  const actions = [
    {
      id: 'join-event',
      title: language === 'pt' ? 'Participar em Evento' : 'Join Event',
      description: language === 'pt' ? 'Descubra eventos locais' : 'Discover local events',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-primary-500 hover:bg-primary-600',
  action: () => router.push(ROUTES.events)
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
      <div className="text-center py-8">
        <p className="text-gray-600">Quick actions will be displayed here</p>
      </div>
    </div>
  )
}
