'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ClockIcon, UserGroupIcon, ArrowRightIcon, BellIcon, PlayIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Briefcase, GraduationCap, Music, Camera, Star } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface ScheduledStream {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  scheduledStart: string
  duration: number
  host: string
  isPremium: boolean
  isRecurring: boolean
  seriesName?: string
  thumbnail: string
  tags: string[]
  viewerCapacity?: number
  registeredCount: number
}

interface StreamScheduleProps {
  category: string
  language: string
}

export default function StreamSchedule({ category, language }: StreamScheduleProps) {
  const { t } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [selectedDay, setSelectedDay] = useState('today')
  const [reminders, setReminders] = useState<string[]>([])

  const hasAccess = hasActiveSubscription || isInTrial

  // Mock scheduled streams data
  const scheduledStreams: ScheduledStream[] = [
    {
      id: 'fado-masterclass-tonight',
      title: language === 'pt' ? 'Masterclass de Fado com Amália Costa' : 'Fado Masterclass with Amália Costa',
      description: language === 'pt' ? 'Aprenda técnicas tradicionais de fado com uma das melhores fadistas de Londres' : 'Learn traditional fado techniques from one of London\'s finest fadistas',
      category: 'portuguese-culture',
      categoryName: language === 'pt' ? 'Cultura Portuguesa' : 'Portuguese Culture',
      scheduledStart: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      duration: 60,
      host: 'Amália Costa',
      isPremium: false,
      isRecurring: true,
      seriesName: language === 'pt' ? 'Masterclasses Culturais' : 'Cultural Masterclasses',
  thumbnail: '/events/art-tour.jpg',
      tags: ['fado', 'music', 'masterclass', 'tradition'],
      registeredCount: 34
    },
    {
      id: 'ai-workshop-tomorrow',
      title: language === 'pt' ? 'Workshop de IA para Negócios Portugueses' : 'AI Workshop for Portuguese Businesses',
      description: language === 'pt' ? 'Como implementar IA no seu negócio - sessão exclusiva para empreendedores' : 'How to implement AI in your business - exclusive session for entrepreneurs',
      category: 'business-workshops',
      categoryName: language === 'pt' ? 'Workshops de Negócios' : 'Business Workshops',
      scheduledStart: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), // Tomorrow
      duration: 90,
      host: 'Carlos Mendes',
      isPremium: true,
      isRecurring: false,
  thumbnail: '/events/book-club.jpg',
      tags: ['ai', 'business', 'workshop', 'technology'],
      viewerCapacity: 50,
      registeredCount: 42
    },
    {
      id: 'community-coffee-friday',
      title: language === 'pt' ? 'Café Comunitário - Conhece a Tua Comunidade' : 'Community Coffee - Meet Your Community',
      description: language === 'pt' ? 'Sessão informal para conhecer outros portugueses em Londres' : 'Informal session to meet other Portuguese speakers in London',
      category: 'community-events',
      categoryName: language === 'pt' ? 'Eventos Comunitários' : 'Community Events',
      scheduledStart: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      duration: 45,
      host: 'LusoTown Community Team',
      isPremium: false,
      isRecurring: true,
      seriesName: language === 'pt' ? 'Café Comunitário Semanal' : 'Weekly Community Coffee',
  thumbnail: '/events/networking.jpg',
      tags: ['community', 'networking', 'coffee', 'social'],
      registeredCount: 28
    },
    {
      id: 'student-career-session',
      title: language === 'pt' ? 'Sessão de Carreiras para Estudantes Portugueses' : 'Career Session for Portuguese Students',
      description: language === 'pt' ? 'Conselhos de carreira e oportunidades de estágio no Reino Unido' : 'Career advice and internship opportunities in the UK',
      category: 'student-sessions',
      categoryName: language === 'pt' ? 'Sessões de Estudantes' : 'Student Sessions',
      scheduledStart: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      duration: 75,
      host: 'Ana Ribeiro',
      isPremium: false,
      isRecurring: true,
      seriesName: language === 'pt' ? 'Apoio ao Estudante' : 'Student Support',
  thumbnail: '/events/yoga.jpg',
      tags: ['students', 'career', 'advice', 'internships'],
      registeredCount: 19
    },
    {
      id: 'vip-business-roundtable',
      title: language === 'pt' ? 'Mesa Redonda VIP: Futuro dos Negócios Portugueses' : 'VIP Roundtable: Future of Portuguese Business',
      description: language === 'pt' ? 'Discussão exclusiva com CEOs e empresários de sucesso' : 'Exclusive discussion with successful CEOs and entrepreneurs',
      category: 'vip-business',
      categoryName: language === 'pt' ? 'VIP Business' : 'VIP Business',
      scheduledStart: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
      duration: 120,
      host: 'Miguel Santos & Guests',
      isPremium: true,
      isRecurring: false,
  thumbnail: '/events/jazz-networking.jpg',
      tags: ['vip', 'business', 'roundtable', 'ceo'],
      viewerCapacity: 25,
      registeredCount: 23
    }
  ]

  const filteredStreams = category === 'all' 
    ? scheduledStreams 
    : scheduledStreams.filter(stream => stream.category === category)

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      'portuguese-culture': Music,
      'business-workshops': Briefcase,
      'community-events': Users,
      'student-sessions': GraduationCap,
      'vip-business': Crown,
      'behind-scenes': Camera
    }
    
    return iconMap[categoryId as keyof typeof iconMap] || Users
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      if (diffHours <= 1) {
        return language === 'pt' ? 'Em breve' : 'Starting soon'
      }
      return language === 'pt' ? `Em ${diffHours}h` : `In ${diffHours}h`
    } else if (diffDays === 1) {
      return language === 'pt' ? 'Amanhã' : 'Tomorrow'
    } else {
      return language === 'pt' ? `Em ${diffDays} dias` : `In ${diffDays} days`
    }
  }

  const toggleReminder = (streamId: string) => {
    setReminders(prev => 
      prev.includes(streamId) 
        ? prev.filter(id => id !== streamId)
        : [...prev, streamId]
    )
  }

  const canAccessStream = (stream: ScheduledStream) => {
    return !stream.isPremium || hasAccess
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6"
      id="schedule"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Programação Próxima' : 'Upcoming Schedule'}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4" />
          <span>{filteredStreams.length} {language === 'pt' ? 'streams agendados' : 'scheduled streams'}</span>
        </div>
      </div>

      {filteredStreams.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhum stream agendado' : 'No scheduled streams'}
          </h3>
          <p className="text-gray-500">
            {language === 'pt' 
              ? 'Não há streams agendados para esta categoria no momento.'
              : 'There are no scheduled streams for this category at the moment.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStreams.map((stream, index) => {
            const IconComponent = getCategoryIcon(stream.category)
            const hasStreamAccess = canAccessStream(stream)
            const hasReminder = reminders.includes(stream.id)
            const isAlmostFull = stream.viewerCapacity && stream.registeredCount >= stream.viewerCapacity * 0.8

            return (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  hasStreamAccess 
                    ? 'border-gray-200 hover:border-gray-300 hover:shadow-md' 
                    : 'border-gray-200 bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex gap-4">
                  {/* Stream Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={stream.thumbnail || '/events/networking.jpg'}
                        alt={stream.title}
                        fill
                        sizes="(max-width: 768px) 128px, 192px"
                        className="object-cover"
                        onError={(e) => {
                          // Next/Image doesn't swap src on error; we rely on safe default via || above
                        }}
                        priority={index < 2}
                      />
                      {stream.isPremium && (
                        <div className="absolute top-1 right-1 bg-premium-500 rounded-full p-1">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {!hasStreamAccess && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stream Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                          {stream.title}
                        </h3>
                        {stream.seriesName && (
                          <div className="text-sm text-gray-500 mb-1">
                            {stream.seriesName}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {hasStreamAccess && (
                          <button
                            onClick={() => toggleReminder(stream.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              hasReminder 
                                ? 'bg-accent-100 text-accent-600' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={language === 'pt' ? 'Definir lembrete' : 'Set reminder'}
                          >
                            <BellIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {stream.description}
                    </p>

                    {/* Stream Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <IconComponent className="w-3 h-3" />
                        <span>{stream.categoryName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{formatDateTime(stream.scheduledStart)} • {stream.duration}min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-3 h-3" />
                        <span>{language === 'pt' ? 'Com' : 'With'} {stream.host}</span>
                      </div>
                      {stream.viewerCapacity && (
                        <div className={`flex items-center gap-1 ${isAlmostFull ? 'text-action-600' : ''}`}>
                          <Users className="w-3 h-3" />
                          <span>{stream.registeredCount}/{stream.viewerCapacity}</span>
                          {isAlmostFull && <Star className="w-3 h-3 text-action-500" />}
                        </div>
                      )}
                    </div>

                    {/* Stream Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {stream.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {hasStreamAccess ? (
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
                          <PlayIcon className="w-4 h-4" />
                          <span>{language === 'pt' ? 'Assistir' : 'Watch'}</span>
                          <ArrowRightIcon className="w-3 h-3" />
                        </button>
                      ) : (
                        <a
                          href="/subscription"
                          className="flex items-center gap-2 px-3 py-1.5 bg-premium-600 text-white text-sm rounded-lg hover:bg-premium-700 transition-colors"
                        >
                          <Crown className="w-4 h-4" />
                          <span>{language === 'pt' ? 'Upgrade' : 'Upgrade'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* View All Schedule Link */}
      {filteredStreams.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <a
            href="/live?view=schedule"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <span>{language === 'pt' ? 'Ver programação completa' : 'View full schedule'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}