'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Bell, Mail, MessageSquare, Calendar, Users, Building } from 'lucide-react'

interface NotificationSetting {
  id: string
  title: string
  description: string
  icon: any
  enabled: boolean
}

export default function NotificationPreferences() {
  const { t } = useLanguage()

  const [preferences, setPreferences] = useState<NotificationSetting[]>([
    {
      id: 'events',
      title: t('notifications.events.title') || 'Portuguese Events',
      description: t('notifications.events.description') || 'Cultural events, festivals, and community gatherings',
      icon: Calendar,
      enabled: true
    },
    {
      id: 'community',
      title: t('notifications.community.title') || 'Community Updates',
      description: t('notifications.community.description') || 'General community news and announcements',
      icon: Users,
      enabled: true
    },
    {
      id: 'messages',
      title: t('notifications.messages.title') || 'Direct Messages',
      description: t('notifications.messages.description') || 'Personal messages from other community members',
      icon: MessageSquare,
      enabled: true
    },
    {
      id: 'business',
      title: t('notifications.business.title') || 'Business Directory',
      description: t('notifications.business.description') || 'New Portuguese businesses and services',
      icon: Building,
      enabled: false
    },
    {
      id: 'newsletter',
      title: t('notifications.newsletter.title') || 'Weekly Newsletter',
      description: t('notifications.newsletter.description') || 'Weekly digest of Portuguese community highlights',
      icon: Mail,
      enabled: true
    }
  ])

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-6">
        <Bell className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t('notifications.title') || 'Notification Preferences'}
        </h2>
      </div>

      <p className="text-gray-600 mb-8">
        {t('notifications.subtitle') || 'Choose what notifications you receive from the Portuguese-speaking community'}
      </p>

      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <pref.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{pref.title}</h3>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
            </div>
            <button
              onClick={() => togglePreference(pref.id)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-600"
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          {t('notifications.save') || 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}
