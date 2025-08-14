'use client'

import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  MusicalNoteIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function AuthenticEvents() {
  const { t } = useLanguage()

  const culturalEvents = [
    {
      id: 'fado-night',
      title: t('events.fado-night'),
      country: 'Portugal',
      flag: '🇵🇹',
      description: 'Traditional Portuguese Fado evening with live musicians',
      location: 'Vauxhall Portuguese Centre',
      date: '2024-08-20',
      time: '19:30',
      category: 'Cultural',
      color: 'bg-gradient-to-r from-primary-500 to-secondary-500',
      attendees: 45,
      maxAttendees: 60
    },
    {
      id: 'festa-junina',
      title: t('events.festa-junina'),
      country: 'Brazil',
      flag: '🇧🇷',
      description: 'Celebrate Brazilian winter festival with traditional food and quadrilha dancing',
      location: 'Elephant & Castle Community Centre',
      date: '2024-06-24',
      time: '18:00',
      category: 'Festival',
      color: 'bg-gradient-to-r from-yellow-500 to-green-500',
      attendees: 78,
      maxAttendees: 100
    },
    {
      id: 'independence-day-angola',
      title: t('events.independence-day'),
      country: 'Angola',
      flag: '🇦🇴',
      description: 'Celebrate Angolan Independence Day with traditional music and cuisine',
      location: 'South London Cultural Centre',
      date: '2024-11-11',
      time: '15:00',
      category: 'National',
      color: 'bg-gradient-to-r from-red-500 to-yellow-500',
      attendees: 32,
      maxAttendees: 50
    },
    {
      id: 'morna-music-night',
      title: 'Cape Verdean Morna Music Night',
      country: 'Cape Verde',
      flag: '🇨🇻',
      description: 'Experience the soulful sounds of Cape Verdean morna and coladeira music',
      location: 'Brixton Community Hall',
      date: '2024-09-15',
      time: '20:00',
      category: 'Music',
      color: 'bg-gradient-to-r from-primary-500 to-accent-500',
      attendees: 28,
      maxAttendees: 40
    },
    {
      id: 'mozambican-heritage',
      title: 'Mozambican Cultural Heritage Workshop',
      country: 'Mozambique',
      flag: '🇲🇿',
      description: 'Learn about Mozambican traditions, crafts, and storytelling',
      location: 'Camden Cultural Centre',
      date: '2024-10-25',
      time: '14:00',
      category: 'Workshop',
      color: 'bg-gradient-to-r from-green-500 to-red-500',
      attendees: 15,
      maxAttendees: 25
    },
    {
      id: 'santos-populares',
      title: t('events.santos-populares'),
      country: 'Portugal',
      flag: '🇵🇹',
      description: 'Traditional Portuguese Popular Saints celebration with sardines and manjerico',
      location: 'Stockwell Portuguese Club',
      date: '2024-06-13',
      time: '19:00',
      category: 'Religious/Cultural',
      color: 'bg-gradient-to-r from-primary-500 to-secondary-500',
      attendees: 67,
      maxAttendees: 80
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Music':
      case 'Cultural':
        return MusicalNoteIcon
      case 'Festival':
      case 'National':
        return SparklesIcon
      case 'Workshop':
        return UserGroupIcon
      default:
        return CalendarDaysIcon
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 border border-secondary-200 rounded-full px-4 py-2 text-primary-600 font-medium mb-6">
            <SparklesIcon className="h-4 w-4 text-secondary-600" />
            Authentic Portuguese Cultural Events
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Celebrate Your Heritage</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            From Portuguese Fado nights to Brazilian Festa Junina, Angolan independence celebrations to Cape Verdean morna concerts - 
            experience authentic cultural events that honor the rich diversity of the Portuguese-speaking world.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {culturalEvents.map((event, index) => {
            const IconComponent = getCategoryIcon(event.category)
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Event Header */}
                  <div className={`${event.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-6xl opacity-20">
                      {event.flag}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-2xl">{event.flag}</span>
                        <span>{event.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-GB', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    {/* Attendance Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Attendance</span>
                        <span>{Math.round((event.attendees / event.maxAttendees) * 100)}% full</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-secondary-500 to-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform group-hover:scale-105">
                      {new Date(event.date) > new Date() ? 'Join Event' : 'View Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Cultural Heritage Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 rounded-2xl p-8 border border-secondary-200 shadow-lg">
            <div className="max-w-3xl mx-auto">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Celebrating Portuguese Heritage Worldwide
              </h3>
              <p className="text-lg text-gray-600 italic mb-6">
                "A diversidade é a nossa força, a língua portuguesa é a nossa união" 
                <br />
                <span className="text-base font-normal">
                  - Diversity is our strength, Portuguese language is our unity
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇵🇹</span>
                  <span>Portugal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇧🇷</span>
                  <span>Brazil</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇦🇴</span>
                  <span>Angola</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇲🇿</span>
                  <span>Mozambique</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇨🇻</span>
                  <span>Cape Verde</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇬🇼</span>
                  <span>Guinea-Bissau</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇸🇹</span>
                  <span>São Tomé</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇹🇱</span>
                  <span>East Timor</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}