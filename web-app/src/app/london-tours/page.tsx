'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { EventsToursService, EventTour } from '@/lib/events-tours'
import EventToursCard from '@/components/EventToursCard'
import { motion } from 'framer-motion'

export default function LondonToursPage() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [tours, setTours] = useState<EventTour[]>([])

  useEffect(() => {
    const data = EventsToursService.getEventsTours({ category: 'Cultural Tours' })
    setTours(data)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-3"
          >
            {isPortuguese ? 'London Tours' : 'London Tours'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {isPortuguese
              ? 'Descubra os destinos turísticos mais populares de Londres com a comunidade portuguesa — tours culturais, marcos icónicos e experiências autênticas.'
              : 'Discover London’s most popular tourist destinations with the Portuguese community — cultural tours, iconic landmarks, and authentic experiences.'}
          </motion.p>
        </div>
      </section>

      {/* Tours list */}
      <section className="py-12">
        <div className="container-width">
          {tours.length === 0 ? (
            <div className="text-center text-gray-600">{isPortuguese ? 'Sem tours disponíveis no momento.' : 'No tours available at the moment.'}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <EventToursCard key={tour.id} event={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
