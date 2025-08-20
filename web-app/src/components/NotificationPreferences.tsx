'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  BellIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  ClockIcon,
  GlobeAltIcon,
  HeartIcon,
  BriefcaseIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { 
  NotificationCategory, 
  DeliveryChannel, 
  NotificationChannelSettings,
  NotificationPreferences as NotificationPreferencesType,
  PersonalizationProfile 
} from '@/context/NotificationContext'

interface NotificationPreferencesProps {
  className?: string
}

export default function NotificationPreferences({ className = '' }: NotificationPreferencesProps) {
  const { 
    preferences, 
    personalization,
    updatePreferences, 
    updatePersonalization,
    getChannelSettings,
    updateChannelSettings,
    analytics
  } = useNotifications()
  const { language, t } = useLanguage()

  const [activeTab, setActiveTab] = useState<'channels' | 'categories' | 'personalization' | 'schedule'>('channels')
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferencesType | null>(null)
  const [localPersonalization, setLocalPersonalization] = useState<PersonalizationProfile | null>(null)

  useEffect(() => {
    setLocalPreferences(preferences)
    setLocalPersonalization(personalization)
  }, [preferences, personalization])

  const channels: { 
    key: DeliveryChannel
    label: string
    labelPT: string
    description: string
    descriptionPT: string
    icon: any
    available: boolean
  }[] = [
    {
      key: 'in_app',
      label: 'In-App Notifications',
      labelPT: 'Notificações na App',
      description: 'Notifications within the LusoTown platform',
      descriptionPT: 'Notificações dentro da plataforma LusoTown',
      icon: BellIcon,
      available: true
    },
    {
      key: 'email',
      label: 'Email Notifications',
      labelPT: 'Notificações por Email',
      description: 'Daily digest and important updates via email',
      descriptionPT: 'Resumo diário e atualizações importantes por email',
      icon: EnvelopeIcon,
      available: true
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp Messages',
      labelPT: 'Mensagens WhatsApp',
      description: 'Portuguese community updates via WhatsApp',
      descriptionPT: 'Atualizações da comunidade portuguesa via WhatsApp',
      icon: ChatBubbleLeftRightIcon,
      available: true
    },
    {
      key: 'sms',
      label: 'SMS Notifications',
      labelPT: 'Notificações SMS',
      description: 'Urgent transport and service updates via SMS',
      descriptionPT: 'Atualizações urgentes de transporte e serviços via SMS',
      icon: DevicePhoneMobileIcon,
      available: true
    },
    {
      key: 'push',
      label: 'Push Notifications',
      labelPT: 'Notificações Push',
      description: 'Mobile app push notifications (coming soon)',
      descriptionPT: 'Notificações push da app móvel (em breve)',
      icon: DevicePhoneMobileIcon,
      available: false
    }
  ]

  const categories: {
    key: NotificationCategory
    label: string
    labelPT: string
    description: string
    descriptionPT: string
    icon: string
    examples: { en: string; pt: string }[]
  }[] = [
    {
      key: 'networking',
      label: 'Networking',
      labelPT: 'Networking',
      description: 'Connection requests, matches, and networking events',
      descriptionPT: 'Pedidos de ligação, compatibilidades e eventos de networking',
      icon: '🤝',
      examples: [
        { en: 'New connection requests', pt: 'Novos pedidos de ligação' },
        { en: 'Event-based matches', pt: 'Compatibilidades baseadas em eventos' },
        { en: 'Networking event invitations', pt: 'Convites para eventos de networking' }
      ]
    },
    {
      key: 'services',
      label: 'Services',
      labelPT: 'Serviços',
      description: 'Transport bookings, SIA compliance, and service updates',
      descriptionPT: 'Reservas de transporte, conformidade SIA e atualizações de serviços',
      icon: '🚗',
      examples: [
        { en: 'Booking confirmations', pt: 'Confirmações de reserva' },
        { en: 'SIA compliance updates', pt: 'Atualizações de conformidade SIA' },
        { en: 'Service schedule changes', pt: 'Alterações no horário dos serviços' }
      ]
    },
    {
      key: 'community',
      label: 'Community',
      labelPT: 'Comunidade',
      description: 'Chat messages, group activities, and cultural events',
      descriptionPT: 'Mensagens de chat, atividades de grupo e eventos culturais',
      icon: '🏛️',
      examples: [
        { en: 'Community chat messages', pt: 'Mensagens de chat da comunidade' },
        { en: 'Group activities', pt: 'Atividades de grupo' },
        { en: 'Cultural celebrations', pt: 'Celebrações culturais' }
      ]
    },
    {
      key: 'business',
      label: 'Business',
      labelPT: 'Negócios',
      description: 'Partnership opportunities and professional networking',
      descriptionPT: 'Oportunidades de parceria e networking profissional',
      icon: '💼',
      examples: [
        { en: 'Partnership invitations', pt: 'Convites de parceria' },
        { en: 'Business opportunities', pt: 'Oportunidades de negócio' },
        { en: 'Professional events', pt: 'Eventos profissionais' }
      ]
    },
    {
      key: 'students',
      label: 'Students',
      labelPT: 'Estudantes',
      description: 'University events and career opportunities',
      descriptionPT: 'Eventos universitários e oportunidades de carreira',
      icon: '🎓',
      examples: [
        { en: 'University Portuguese society events', pt: 'Eventos da associação portuguesa universitária' },
        { en: 'Career opportunities', pt: 'Oportunidades de carreira' },
        { en: 'Academic networking', pt: 'Networking académico' }
      ]
    },
    {
      key: 'events',
      label: 'Events',
      labelPT: 'Eventos',
      description: 'Cultural events, tours, and entertainment',
      descriptionPT: 'Eventos culturais, tours e entretenimento',
      icon: '🎭',
      examples: [
        { en: 'Event reminders', pt: 'Lembretes de eventos' },
        { en: 'New event announcements', pt: 'Anúncios de novos eventos' },
        { en: 'Event cancellations', pt: 'Cancelamentos de eventos' }
      ]
    },
    {
      key: 'transport',
      label: 'Transport',
      labelPT: 'Transporte',
      description: 'Transport services and tour bookings',
      descriptionPT: 'Serviços de transporte e reservas de tours',
      icon: '🚙',
      examples: [
        { en: 'Transport confirmations', pt: 'Confirmações de transporte' },
        { en: 'Driver updates', pt: 'Atualizações do condutor' },
        { en: 'Tour schedule changes', pt: 'Alterações no horário dos tours' }
      ]
    }
  ]

  const culturalInterests = [
    { value: 'fado', label: 'Fado Music', labelPT: 'Música Fado' },
    { value: 'portuguese_cuisine', label: 'Portuguese Cuisine', labelPT: 'Gastronomia Portuguesa' },
    { value: 'festivals', label: 'Portuguese Festivals', labelPT: 'Festivais Portugueses' },
    { value: 'literature', label: 'Portuguese Literature', labelPT: 'Literatura Portuguesa' },
    { value: 'history', label: 'Portuguese History', labelPT: 'História Portuguesa' },
    { value: 'language', label: 'Portuguese Language', labelPT: 'Língua Portuguesa' },
    { value: 'traditions', label: 'Cultural Traditions', labelPT: 'Tradições Culturais' },
    { value: 'arts', label: 'Portuguese Arts', labelPT: 'Artes Portuguesas' }
  ]

  const professionalInterests = [
    { value: 'networking', label: 'Professional Networking', labelPT: 'Networking Profissional' },
    { value: 'entrepreneurship', label: 'Entrepreneurship', labelPT: 'Empreendedorismo' },
    { value: 'technology', label: 'Technology', labelPT: 'Tecnologia' },
    { value: 'finance', label: 'Finance', labelPT: 'Finanças' },
    { value: 'healthcare', label: 'Healthcare', labelPT: 'Saúde' },
    { value: 'education', label: 'Education', labelPT: 'Educação' },
    { value: 'consulting', label: 'Consulting', labelPT: 'Consultoria' },
    { value: 'creative', label: 'Creative Industries', labelPT: 'Indústrias Criativas' }
  ]

  const locationPreferences = [
    { value: 'south_london', label: 'South London', labelPT: 'Sul de Londres' },
    { value: 'central_london', label: 'Central London', labelPT: 'Centro de Londres' },
    { value: 'east_london', label: 'East London', labelPT: 'Este de Londres' },
    { value: 'west_london', label: 'West London', labelPT: 'Oeste de Londres' },
    { value: 'north_london', label: 'North London', labelPT: 'Norte de Londres' },
    { value: 'portuguese_areas', label: 'Portuguese Areas', labelPT: 'Áreas Portuguesas' },
    { value: 'greater_london', label: 'Greater London', labelPT: 'Grande Londres' },
    { value: 'uk_wide', label: 'UK Wide', labelPT: 'Todo o Reino Unido' }
  ]

  const handleChannelToggle = async (channel: DeliveryChannel, enabled: boolean) => {
    if (!localPreferences) return

    const channelSettings = getChannelSettings(channel)
    await updateChannelSettings(channel, { ...channelSettings, enabled })
    
    setLocalPreferences({
      ...localPreferences,
      [channel]: { ...channelSettings, enabled }
    })
  }

  const handleCategoryToggle = async (channel: DeliveryChannel, category: NotificationCategory, enabled: boolean) => {
    if (!localPreferences) return

    const channelSettings = getChannelSettings(channel)
    const updatedCategories = { ...channelSettings.categories, [category]: enabled }
    
    await updateChannelSettings(channel, { ...channelSettings, categories: updatedCategories })
    
    setLocalPreferences({
      ...localPreferences,
      [channel]: { ...channelSettings, categories: updatedCategories }
    })
  }

  const handlePersonalizationUpdate = async (updates: Partial<PersonalizationProfile>) => {
    if (!localPersonalization) return

    const updated = { ...localPersonalization, ...updates }
    await updatePersonalization(updates)
    setLocalPersonalization(updated)
  }

  const tabs = [
    { 
      key: 'channels' as const, 
      label: language === 'pt' ? 'Canais' : 'Channels',
      icon: BellIcon 
    },
    { 
      key: 'categories' as const, 
      label: language === 'pt' ? 'Categorias' : 'Categories',
      icon: Cog6ToothIcon 
    },
    { 
      key: 'personalization' as const, 
      label: language === 'pt' ? 'Personalização' : 'Personalization',
      icon: HeartIcon 
    },
    { 
      key: 'schedule' as const, 
      label: language === 'pt' ? 'Horários' : 'Schedule',
      icon: ClockIcon 
    }
  ]

  if (!localPreferences) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-neutral-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 ${className}`}>
      {/* Header */}
      <div className="border-b border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          {language === 'pt' ? 'Preferências de Notificação' : 'Notification Preferences'}
        </h2>
        <p className="text-sm text-neutral-600">
          {language === 'pt' 
            ? 'Personalize como e quando recebe notificações da comunidade portuguesa em Londres'
            : 'Customize how and when you receive notifications from the Portuguese community in the U.K.'
          }
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'channels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                {language === 'pt' ? 'Canais de Entrega' : 'Delivery Channels'}
              </h3>
              <div className="space-y-4">
                {channels.map((channel) => {
                  const channelSettings = getChannelSettings(channel.key)
                  const Icon = channel.icon
                  
                  return (
                    <div key={channel.key} className="flex items-start space-x-4 p-4 rounded-lg border border-neutral-200">
                      <div className="flex-shrink-0">
                        <Icon className={`h-6 w-6 ${channel.available ? 'text-primary-600' : 'text-neutral-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-neutral-900">
                              {language === 'pt' ? channel.labelPT : channel.label}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1">
                              {language === 'pt' ? channel.descriptionPT : channel.description}
                            </p>
                          </div>
                          <Switch
                            checked={channelSettings.enabled && channel.available}
                            onChange={(enabled) => handleChannelToggle(channel.key, enabled)}
                            disabled={!channel.available}
                            className={`${
                              channelSettings.enabled && channel.available ? 'bg-primary-600' : 'bg-neutral-200'
                            } relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              !channel.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            <span
                              className={`${
                                channelSettings.enabled && channel.available ? 'translate-x-5' : 'translate-x-1'
                              } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                            />
                          </Switch>
                        </div>
                        
                        {channelSettings.enabled && channel.available && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center space-x-4 text-xs">
                              <label className="flex items-center space-x-1">
                                <input
                                  type="radio"
                                  name={`${channel.key}-frequency`}
                                  value="immediate"
                                  checked={channelSettings.frequency === 'immediate'}
                                  onChange={() => updateChannelSettings(channel.key, { ...channelSettings, frequency: 'immediate' })}
                                  className="w-3 h-3 text-primary-600"
                                />
                                <span>{language === 'pt' ? 'Imediato' : 'Immediate'}</span>
                              </label>
                              <label className="flex items-center space-x-1">
                                <input
                                  type="radio"
                                  name={`${channel.key}-frequency`}
                                  value="daily"
                                  checked={channelSettings.frequency === 'daily'}
                                  onChange={() => updateChannelSettings(channel.key, { ...channelSettings, frequency: 'daily' })}
                                  className="w-3 h-3 text-primary-600"
                                />
                                <span>{language === 'pt' ? 'Diário' : 'Daily'}</span>
                              </label>
                              <label className="flex items-center space-x-1">
                                <input
                                  type="radio"
                                  name={`${channel.key}-frequency`}
                                  value="weekly"
                                  checked={channelSettings.frequency === 'weekly'}
                                  onChange={() => updateChannelSettings(channel.key, { ...channelSettings, frequency: 'weekly' })}
                                  className="w-3 h-3 text-primary-600"
                                />
                                <span>{language === 'pt' ? 'Semanal' : 'Weekly'}</span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                {language === 'pt' ? 'Categorias de Notificação' : 'Notification Categories'}
              </h3>
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.key} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="text-lg">{category.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900">
                          {language === 'pt' ? category.labelPT : category.label}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          {language === 'pt' ? category.descriptionPT : category.description}
                        </p>
                        <div className="mt-2">
                          <details className="group">
                            <summary className="text-xs text-primary-600 cursor-pointer">
                              {language === 'pt' ? 'Ver exemplos' : 'View examples'}
                            </summary>
                            <ul className="mt-2 text-xs text-neutral-500 space-y-1 pl-4">
                              {category.examples.map((example, index) => (
                                <li key={index}>• {language === 'pt' ? example.pt : example.en}</li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {channels.filter(ch => ch.available).map((channel) => {
                        const channelSettings = getChannelSettings(channel.key)
                        const isEnabled = channelSettings.enabled && channelSettings.categories[category.key]
                        
                        return (
                          <div key={channel.key} className="flex items-center justify-between">
                            <span className="text-xs text-neutral-600">
                              {language === 'pt' ? channel.labelPT : channel.label}
                            </span>
                            <Switch
                              checked={isEnabled}
                              onChange={(enabled) => handleCategoryToggle(channel.key, category.key, enabled)}
                              disabled={!channelSettings.enabled}
                              className={`${
                                isEnabled ? 'bg-primary-600' : 'bg-neutral-200'
                              } relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                                !channelSettings.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                              }`}
                            >
                              <span
                                className={`${
                                  isEnabled ? 'translate-x-4' : 'translate-x-1'
                                } inline-block h-2 w-2 transform rounded-full bg-white transition-transform`}
                              />
                            </Switch>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'personalization' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Cultural Interests */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GlobeAltIcon className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-medium text-neutral-900">
                  {language === 'pt' ? 'Interesses Culturais' : 'Cultural Interests'}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {language === 'pt' 
                  ? 'Selecione os seus interesses culturais portugueses para receber notificações relevantes'
                  : 'Select your Portuguese cultural interests to receive relevant notifications'
                }
              </p>
              <div className="grid grid-cols-2 gap-3">
                {culturalInterests.map((interest) => (
                  <label key={interest.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localPersonalization?.interests.includes(interest.value) || false}
                      onChange={(e) => {
                        if (!localPersonalization) return
                        const interests = e.target.checked
                          ? [...localPersonalization.interests, interest.value]
                          : localPersonalization.interests.filter(i => i !== interest.value)
                        handlePersonalizationUpdate({ interests })
                      }}
                      className="w-4 h-4 text-primary-600 rounded border-neutral-300"
                    />
                    <span className="text-sm text-neutral-700">
                      {language === 'pt' ? interest.labelPT : interest.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Professional Interests */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BriefcaseIcon className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-medium text-neutral-900">
                  {language === 'pt' ? 'Interesses Profissionais' : 'Professional Interests'}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {language === 'pt' 
                  ? 'Selecione as suas áreas profissionais para networking e oportunidades'
                  : 'Select your professional areas for networking and opportunities'
                }
              </p>
              <div className="grid grid-cols-2 gap-3">
                {professionalInterests.map((interest) => (
                  <label key={interest.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localPersonalization?.professionalSector.includes(interest.value) || false}
                      onChange={(e) => {
                        if (!localPersonalization) return
                        const professionalSector = e.target.checked
                          ? [...localPersonalization.professionalSector, interest.value]
                          : localPersonalization.professionalSector.filter(i => i !== interest.value)
                        handlePersonalizationUpdate({ professionalSector })
                      }}
                      className="w-4 h-4 text-primary-600 rounded border-neutral-300"
                    />
                    <span className="text-sm text-neutral-700">
                      {language === 'pt' ? interest.labelPT : interest.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Preferences */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPinIcon className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-medium text-neutral-900">
                  {language === 'pt' ? 'Preferências de Localização' : 'Location Preferences'}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {language === 'pt' 
                  ? 'Selecione as áreas de interesse para eventos e atividades'
                  : 'Select areas of interest for events and activities'
                }
              </p>
              <div className="grid grid-cols-2 gap-3">
                {locationPreferences.map((location) => (
                  <label key={location.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localPersonalization?.locationPreferences.includes(location.value) || false}
                      onChange={(e) => {
                        if (!localPersonalization) return
                        const locationPreferences = e.target.checked
                          ? [...localPersonalization.locationPreferences, location.value]
                          : localPersonalization.locationPreferences.filter(l => l !== location.value)
                        handlePersonalizationUpdate({ locationPreferences })
                      }}
                      className="w-4 h-4 text-primary-600 rounded border-neutral-300"
                    />
                    <span className="text-sm text-neutral-700">
                      {language === 'pt' ? location.labelPT : location.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quiet Hours */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ClockIcon className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-medium text-neutral-900">
                  {language === 'pt' ? 'Horas de Silêncio' : 'Quiet Hours'}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {language === 'pt' 
                  ? 'Configure quando não quer receber notificações'
                  : 'Configure when you don\'t want to receive notifications'
                }
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">
                    {language === 'pt' ? 'Ativar horas de silêncio' : 'Enable quiet hours'}
                  </span>
                  <Switch
                    checked={localPreferences.quietHours.enabled}
                    onChange={(enabled) => 
                      updatePreferences({ 
                        quietHours: { ...localPreferences.quietHours, enabled } 
                      })
                    }
                    className={`${
                      localPreferences.quietHours.enabled ? 'bg-primary-600' : 'bg-neutral-200'
                    } relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer`}
                  >
                    <span
                      className={`${
                        localPreferences.quietHours.enabled ? 'translate-x-5' : 'translate-x-1'
                      } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                {localPreferences.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        {language === 'pt' ? 'Início' : 'Start Time'}
                      </label>
                      <input
                        type="time"
                        value={localPreferences.quietHours.startTime}
                        onChange={(e) => 
                          updatePreferences({ 
                            quietHours: { ...localPreferences.quietHours, startTime: e.target.value } 
                          })
                        }
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        {language === 'pt' ? 'Fim' : 'End Time'}
                      </label>
                      <input
                        type="time"
                        value={localPreferences.quietHours.endTime}
                        onChange={(e) => 
                          updatePreferences({ 
                            quietHours: { ...localPreferences.quietHours, endTime: e.target.value } 
                          })
                        }
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Insights */}
            {analytics && (
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-neutral-900 mb-3">
                  {language === 'pt' ? 'Insights de Notificação' : 'Notification Insights'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-600">
                      {language === 'pt' ? 'Taxa de Leitura:' : 'Read Rate:'}
                    </span>
                    <span className="font-medium text-primary-600 ml-1">
                      {Math.round(analytics.readRate)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-600">
                      {language === 'pt' ? 'Pontuação de Engajamento:' : 'Engagement Score:'}
                    </span>
                    <span className="font-medium text-primary-600 ml-1">
                      {analytics.engagementScore}%
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-600">
                      {language === 'pt' ? 'Melhores horários:' : 'Optimal times:'}
                    </span>
                    <span className="font-medium text-primary-600 ml-1">
                      {analytics.optimalSendTimes.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}