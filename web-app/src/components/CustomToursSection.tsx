'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface CustomTourOption {
  id: string
  name: string
  namePt: string
  icon: string
  description: string
  descriptionPt: string
}

const tourOptions: CustomTourOption[] = [
  {
    id: 'cultural',
    name: 'Cultural Heritage',
    namePt: 'Patrimônio Cultural',
    icon: '🏛️',
    description: 'Portuguese historical sites and cultural landmarks',
    descriptionPt: 'Locais históricos portugueses e marcos culturais'
  },
  {
    id: 'culinary',
    name: 'Culinary Journey',
    namePt: 'Jornada Gastronômica',
    icon: '🍽️',
    description: 'Traditional Portuguese restaurants and markets',
    descriptionPt: 'Restaurantes tradicionais portugueses e mercados'
  }
]

export default function CustomToursSection() {
  const { language } = useLanguage()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  return (
    <section className="py-16 px-4" style={{ backgroundColor: PORTUGUESE_COLORS.gold[50] }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Tours Personalizados' : 'Custom Tours'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'pt'
              ? 'Crie sua experiência única adaptada aos seus interesses'
              : 'Create your unique experience tailored to your interests'
            }
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                {language === 'pt' ? 'Selecione seus interesses:' : 'Select your interests:'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionToggle(option.id)}
                    className="p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <h4 className="font-medium" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                          {language === 'pt' ? option.namePt : option.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'pt' ? option.descriptionPt : option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: PORTUGUESE_COLORS.brown[600] }}
              >
                {language === 'pt' ? 'Solicitar Tour Personalizado' : 'Request Custom Tour'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
