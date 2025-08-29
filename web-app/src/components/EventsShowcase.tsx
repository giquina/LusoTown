'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'

const EventsShowcase: React.FC = () => {
  const { t, language } = useLanguage()

  const events = [
    {
      title: language === 'pt' ? 'Noite de Fado em Londres' : 'Fado Night in London',
      date: '2025-01-15',
      location: 'London',
      flag: '🇵🇹',
      category: language === 'pt' ? 'Cultura' : 'Culture'
    },
    {
      title: language === 'pt' ? 'Festival Brasileiro' : 'Brazilian Festival', 
      date: '2025-01-20',
      location: 'Manchester',
      flag: '🇧🇷',
      category: language === 'pt' ? 'Música' : 'Music'
    },
    {
      title: language === 'pt' ? 'Encontro Comunitário Angolano' : 'Angolan Community Meetup',
      date: '2025-01-25',
      location: 'Birmingham',
      flag: '🇦🇴', 
      category: language === 'pt' ? 'Comunidade' : 'Community'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'pt' 
              ? 'Conecte-se com a comunidade lusófona no Reino Unido'
              : 'Connect with the Portuguese-speaking community in the UK'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{event.flag}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-3">{event.title}</h3>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300">
                {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsShowcase
