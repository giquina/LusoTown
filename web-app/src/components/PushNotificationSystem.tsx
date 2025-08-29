'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Bell, BellRing, Calendar, MessageCircle } from 'lucide-react'

export default function PushNotificationSystem() {
  const { t } = useLanguage()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const notificationTypes = [
    {
      icon: Calendar,
      title: t('pwa.notifications.events.title') || 'Portuguese Events',
      description: t('pwa.notifications.events.description') || 'Get notified about upcoming Portuguese cultural events and celebrations'
    },
    {
      icon: MessageCircle,
      title: t('pwa.notifications.community.title') || 'Community Updates',
      description: t('pwa.notifications.community.description') || 'Stay updated with Portuguese community news and announcements'
    },
    {
      icon: BellRing,
      title: t('pwa.notifications.matches.title') || 'Connection Matches',
      description: t('pwa.notifications.matches.description') || 'Be notified when you match with other Portuguese speakers'
    }
  ]

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('pwa.notifications.title') || 'Push Notification System'}
        </h2>
        <p className="text-gray-600">
          {t('pwa.notifications.subtitle') || 'Stay connected with the Portuguese-speaking community'}
        </p>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={toggleNotifications}
          className="inline-flex items-center px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          <Bell className="h-4 w-4 mr-2" />
          {notificationsEnabled 
            ? (t('pwa.notifications.enabled') || 'Notifications Enabled')
            : (t('pwa.notifications.enable') || 'Enable Notifications')
          }
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notificationTypes.map((notification, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <notification.icon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
