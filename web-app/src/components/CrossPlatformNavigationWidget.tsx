'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface NavigationApp {
  id: string
  name: string
  icon: string
  description: string
  descriptionPt: string
}

const navigationApps: NavigationApp[] = [
  {
    id: 'googlemaps',
    name: 'Google Maps',
    icon: '🗺️',
    description: 'Comprehensive UK navigation with real-time traffic',
    descriptionPt: 'Navegação completa do Reino Unido com trânsito em tempo real'
  },
  {
    id: 'citymapper',
    name: 'Citymapper',
    icon: '🚇',
    description: 'London public transport specialist',
    descriptionPt: 'Especialista em transporte público de Londres'
  }
]

interface QuickDestination {
  id: string
  name: string
  namePt: string
  address: string
  type: 'embassy' | 'cultural' | 'business' | 'community'
}

const quickDestinations: QuickDestination[] = [
  {
    id: 'embassy',
    name: 'Portuguese Embassy',
    namePt: 'Embaixada Portuguesa',
    address: '11 Belgrave Square, London SW1X 8PP',
    type: 'embassy'
  },
  {
    id: 'vauxhall',
    name: 'Vauxhall Portuguese Quarter',
    namePt: 'Bairro Português de Vauxhall',
    address: 'South Lambeth Road, London SW8',
    type: 'community'
  }
]

export default function CrossPlatformNavigationWidget() {
  const { language } = useLanguage()
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [selectedApp, setSelectedApp] = useState<string>('')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'embassy': return '🏛️'
      case 'cultural': return '🎭'
      case 'business': return '🏢'
      case 'community': return '🤝'
      default: return '📍'
    }
  }

  return (
    <section className="py-16 px-4" style={{ backgroundColor: PORTUGUESE_COLORS.gold[50] }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Navegação Inteligente' : 'Smart Navigation'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'pt'
              ? 'Navegue facilmente para locais importantes da comunidade portuguesa'
              : 'Easily navigate to important Portuguese community locations'
            }
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                {language === 'pt' ? 'Escolha o Destino:' : 'Choose Destination:'}
              </h3>
              <div className="space-y-3">
                {quickDestinations.map((destination) => (
                  <div
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination.id)}
                    className="p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl mt-1">{getTypeIcon(destination.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                          {language === 'pt' ? destination.namePt : destination.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{destination.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                {language === 'pt' ? 'Escolha o App:' : 'Choose App:'}
              </h3>
              <div className="space-y-3 mb-8">
                {navigationApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app.id)}
                    className="p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <h4 className="font-medium" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                          {app.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'pt' ? app.descriptionPt : app.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
              >
                {language === 'pt' ? 'Abrir Navegação' : 'Open Navigation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
