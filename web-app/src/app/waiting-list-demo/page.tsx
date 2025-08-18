'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  UsersIcon, 
  BeakerIcon, 
  TicketIcon, 
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import EventCard from '@/components/EventCard'
import { useLanguage } from '@/context/LanguageContext'

// Demo events with different statuses
const demoEvents = [
  {
    id: 1,
    title: "Portuguese Business Networking Summit",
    description: "Connect with Portuguese entrepreneurs and business leaders. Panel discussions on UK market expansion and cultural bridge-building in international business.",
    location: "Canary Wharf, London",
    date: "Fri, 15 Mar",
    time: "6:00 PM",
    attendees: 50,
    maxAttendees: 50,
    price: 45,
    category: "Business & Professional",
    image: "/events/portuguese/portuguese-networking.jpg",
    color: "from-primary-500 to-secondary-500",
    icon: <UsersIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Professional networking for all ages",
    tags: ["business", "networking", "entrepreneurship", "professional"],
    status: "fully-booked"
  },
  {
    id: 2,
    title: "Traditional Portuguese Cooking Workshop",
    description: "Learn to make authentic pastéis de nata, bacalhau à brás, and francesinha from a Portuguese chef. All skill levels welcome, recipes included.",
    location: "Central London Culinary School",
    date: "Sat, 23 Mar",
    time: "2:00 PM",
    attendees: 24,
    maxAttendees: 24,
    price: 55,
    category: "Cooking & Culture",
    image: "/events/wine-paint.jpg",
    color: "from-coral-500 to-accent-500",
    icon: <BeakerIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Welcome to all ages and skill levels",
    tags: ["cooking", "traditional", "pastéis de nata", "bacalhau", "all-ages"],
    status: "fully-booked"
  },
  {
    id: 3,
    title: "Premium Transport & Security Services Showcase",
    description: "Experience our professional Portuguese-speaking transport and close protection services. Meet certified SIA officers and view our premium vehicle fleet.",
    location: "South London Event Center",
    date: "Sun, 31 Mar",
    time: "11:00 AM",
    attendees: 12,
    maxAttendees: 30,
    price: 25,
    category: "Transport & Security",
    image: "/events/portuguese/transport-showcase.jpg",
    color: "from-action-500 to-premium-500",
    icon: <TicketIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Open to business professionals and individuals",
    tags: ["transport", "security", "SIA", "Portuguese-speaking", "professional"],
    status: "available"
  },
  {
    id: 4,
    title: "Fado Night & Portuguese Wine Tasting",
    description: "An intimate evening of traditional Fado music paired with Portuguese wines from Douro and Alentejo regions. Authentic Portuguese cultural experience.",
    location: "Portuguese Cultural Center, Stockwell",
    date: "Fri, 8 Apr",
    time: "7:30 PM",
    attendees: 35,
    maxAttendees: 35,
    price: 38,
    category: "Music & Culture",
    image: "/events/portuguese/fado-night.jpg",
    color: "from-purple-500 to-pink-500",
    icon: <SparklesIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Adults 18+ for wine tasting",
    tags: ["fado", "music", "wine", "culture", "traditional"],
    status: "fully-booked"
  }
]

export default function WaitingListDemoPage() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-secondary-50">
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-3 mb-6">
              <ClockIcon className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-primary-700 font-medium">
                {language === 'pt' ? 'Sistema de Lista de Espera' : 'Waiting List System'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'pt' 
                ? 'Demonstração do Sistema de Lista de Espera'
                : 'Waiting List System Demo'
              }
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Veja como o nosso sistema de lista de espera funciona para eventos esgotados. Clique em "Juntar à Lista de Espera" em qualquer evento completo.'
                : 'See how our waiting list system works for fully booked events. Click "Join Waiting List" on any fully booked event.'
              }
            </p>
          </motion.div>

          {/* Status Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-12 max-w-4xl mx-auto"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              {language === 'pt' ? 'Estado dos Eventos' : 'Event Status Legend'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-green-800">
                    {language === 'pt' ? 'Disponível' : 'Available'}
                  </div>
                  <div className="text-sm text-green-600">
                    {language === 'pt' ? 'Vagas disponíveis para reserva' : 'Spots available for booking'}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-orange-800">
                    {language === 'pt' ? 'Lista de Espera' : 'Waiting List'}
                  </div>
                  <div className="text-sm text-orange-600">
                    {language === 'pt' ? 'Evento completo - junte-se à lista de espera' : 'Fully booked - join waiting list'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Events Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {demoEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                showWaitingListModal={true}
              />
            ))}
          </div>

          {/* Features Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'pt' ? 'Funcionalidades da Lista de Espera' : 'Waiting List Features'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? 'Gestão de Prioridades' : 'Priority Management'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Sistema de primeira chegada, primeiro a ser servido'
                    : 'First-come, first-served priority system'
                  }
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? 'Notificações Automáticas' : 'Automatic Notifications'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Contacto automático quando surgirem vagas'
                    : 'Automatic contact when spots become available'
                  }
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ClockIcon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? 'Contador em Tempo Real' : 'Real-time Counter'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Veja quantas pessoas estão na lista de espera'
                    : 'See how many people are on the waiting list'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}