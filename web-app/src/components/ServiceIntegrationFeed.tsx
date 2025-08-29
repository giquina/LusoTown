'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Truck, Calendar, Home, Briefcase, MapPin, Clock, Users } from 'lucide-react'

interface ServicePost {
  id: string
  type: 'transport' | 'event' | 'housing' | 'business'
  title: string
  description: string
  location: string
  price?: string
  availability: string
  contact: string
  verified: boolean
  createdAt: string
}

const mockServices: ServicePost[] = [
  {
    id: '1',
    type: 'transport',
    title: 'London Portuguese Area Tours',
    description: 'Bilingual cultural tours of Portuguese areas in London.',
    location: 'Multiple London locations',
    price: '£25/person',
    availability: 'Weekends',
    contact: 'tours@lusotown.com',
    verified: true,
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    type: 'housing',
    title: 'Room in Portuguese Family Home',
    description: 'Comfortable room available in Portuguese-speaking household.',
    location: 'Stockwell, London',
    price: '£600/month',
    availability: 'Available now',
    contact: 'housing@lusotown.com',
    verified: false,
    createdAt: '1 day ago'
  }
]

export default function ServiceIntegrationFeed() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<'all' | 'transport' | 'housing' | 'business' | 'event'>('all')

  const t = {
    en: {
      title: 'Community Services',
      subtitle: 'Services from verified Portuguese-speaking community members',
      transport: 'Transport',
      housing: 'Housing',
      business: 'Business',
      event: 'Events',
      all: 'All Services',
      verified: 'Verified',
      contact: 'Contact',
      location: 'Location',
      availability: 'Availability',
      price: 'Price'
    },
    pt: {
      title: 'Serviços da Comunidade',
      subtitle: 'Serviços de membros verificados da comunidade de falantes de português',
      transport: 'Transporte',
      housing: 'Habitação',
      business: 'Negócios',
      event: 'Eventos',
      all: 'Todos os Serviços',
      verified: 'Verificado',
      contact: 'Contacto',
      location: 'Localização',
      availability: 'Disponibilidade',
      price: 'Preço'
    }
  }

  const text = t[language]

  const getServiceIcon = (type: ServicePost['type']) => {
    switch (type) {
      case 'transport':
        return <Truck className="w-5 h-5" />
      case 'housing':
        return <Home className="w-5 h-5" />
      case 'business':
        return <Briefcase className="w-5 h-5" />
      case 'event':
        return <Calendar className="w-5 h-5" />
      default:
        return <Users className="w-5 h-5" />
    }
  }

  const filteredServices = filter === 'all' 
    ? mockServices 
    : mockServices.filter(service => service.type === filter)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{text.title}</h2>
        <p className="text-gray-600">{text.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary-100 text-primary-700">
                {getServiceIcon(service.type)}
              </div>
              {service.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {text.verified}
                </span>
              )}
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{service.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{service.availability}</span>
              </div>
              
              {service.price && (
                <div className="flex items-center gap-2 text-gray-900 font-medium">
                  <span>{text.price}: {service.price}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                {text.contact}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {language === 'pt' ? 'Nenhum serviço encontrado.' : 'No services found.'}
          </p>
        </div>
      )}
    </div>
  )
}
