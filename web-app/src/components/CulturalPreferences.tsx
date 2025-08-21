'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  CalendarDaysIcon,
  MusicalNoteIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface CulturalPreferencesProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  isPortuguese: boolean
}

interface CulturalValue {
  id: string
  label: string
  labelPt: string
  description: string
  descriptionPt: string
  icon: React.ComponentType<any>
}

export default function CulturalPreferences({ 
  formData, 
  updateFormData, 
  isPortuguese 
}: CulturalPreferencesProps) {
  const [activeSection, setActiveSection] = useState('origins')

  const portugueseOrigins = [
    { value: 'portugal', label: 'Portugal', region: 'Europe', flag: '🇵🇹' },
    { value: 'brazil', label: 'Brazil', region: 'South America', flag: '🇧🇷' },
    { value: 'angola', label: 'Angola', region: 'Africa', flag: '🇦🇴' },
    { value: 'mozambique', label: 'Mozambique', region: 'Africa', flag: '🇲🇿' },
    { value: 'cape-verde', label: 'Cape Verde', region: 'Africa', flag: '🇨🇻' },
    { value: 'guinea-bissau', label: 'Guinea-Bissau', region: 'Africa', flag: '🇬🇼' },
    { value: 'sao-tome-principe', label: 'São Tomé & Príncipe', region: 'Africa', flag: '🇸🇹' },
    { value: 'east-timor', label: 'East Timor', region: 'Asia', flag: '🇹🇱' },
    { value: 'macau', label: 'Macau', region: 'Asia', flag: '🇲🇴' },
    { value: 'mixed', label: 'Mixed Heritage', region: 'Multiple', flag: '🌍' }
  ]

  const culturalCelebrations = [
    { 
      id: 'santos-populares', 
      name: 'Santos Populares', 
      namePt: 'Santos Populares',
      description: 'Traditional June festivals',
      descriptionPt: 'Festivais tradicionais de junho',
      season: 'summer'
    },
    { 
      id: 'carnival', 
      name: 'Carnival', 
      namePt: 'Carnaval',
      description: 'Pre-Lenten celebration',
      descriptionPt: 'Celebração pré-quaresmal',
      season: 'winter'
    },
    { 
      id: 'festa-junina', 
      name: 'Festa Junina', 
      namePt: 'Festa Junina',
      description: 'Brazilian June festivals',
      descriptionPt: 'Festivais brasileiros de junho',
      season: 'winter'
    },
    { 
      id: 'natal', 
      name: 'Portuguese Christmas', 
      namePt: 'Natal Português',
      description: 'Christmas traditions',
      descriptionPt: 'Tradições natalícias',
      season: 'winter'
    },
    { 
      id: 'pascoa', 
      name: 'Easter', 
      namePt: 'Páscoa',
      description: 'Easter celebrations',
      descriptionPt: 'Celebrações da Páscoa',
      season: 'spring'
    },
    { 
      id: 'dia-portugal', 
      name: 'Portugal Day', 
      namePt: 'Dia de Portugal',
      description: 'National day celebration',
      descriptionPt: 'Celebração do dia nacional',
      season: 'summer'
    }
  ]

  const culturalValues: CulturalValue[] = [
    {
      id: 'family',
      label: 'Family Unity',
      labelPt: 'Unidade Familiar',
      description: 'Strong family bonds and togetherness',
      descriptionPt: 'Laços familiares fortes e união',
      icon: HomeIcon
    },
    {
      id: 'respect',
      label: 'Respect for Elders',
      labelPt: 'Respeito pelos Mais Velhos',
      description: 'Honor and care for older generations',
      descriptionPt: 'Honra e cuidado pelas gerações mais velhas',
      icon: HeartIcon
    },
    {
      id: 'hospitality',
      label: 'Hospitality',
      labelPt: 'Hospitalidade',
      description: 'Welcoming guests and strangers',
      descriptionPt: 'Acolher convidados e estranhos',
      icon: ChatBubbleLeftIcon
    },
    {
      id: 'tradition',
      label: 'Cultural Traditions',
      labelPt: 'Tradições Culturais',
      description: 'Preserving cultural heritage',
      descriptionPt: 'Preservar o património cultural',
      icon: BookOpenIcon
    },
    {
      id: 'music',
      label: 'Music & Arts',
      labelPt: 'Música e Artes',
      description: 'Appreciation for cultural arts',
      descriptionPt: 'Apreço pelas artes culturais',
      icon: MusicalNoteIcon
    },
    {
      id: 'community',
      label: 'Community Spirit',
      labelPt: 'Espírito Comunitário',
      description: 'Supporting local community',
      descriptionPt: 'Apoiar a comunidade local',
      icon: GlobeAltIcon
    },
    {
      id: 'celebration',
      label: 'Celebration of Life',
      labelPt: 'Celebração da Vida',
      description: 'Joy in life\'s moments',
      descriptionPt: 'Alegria nos momentos da vida',
      icon: CalendarDaysIcon
    },
    {
      id: 'saudade',
      label: 'Saudade',
      labelPt: 'Saudade',
      description: 'Deep emotional connection to homeland',
      descriptionPt: 'Ligação emocional profunda à pátria',
      icon: StarIcon
    }
  ]

  const lifestylePreferences = [
    { 
      id: 'traditional', 
      label: 'Traditional Lifestyle', 
      labelPt: 'Estilo de Vida Tradicional',
      description: 'Following cultural traditions'
    },
    { 
      id: 'modern', 
      label: 'Modern Lifestyle', 
      labelPt: 'Estilo de Vida Moderno',
      description: 'Embracing contemporary ways'
    },
    { 
      id: 'balanced', 
      label: 'Balanced Approach', 
      labelPt: 'Abordagem Equilibrada',
      description: 'Mix of traditional and modern'
    },
    { 
      id: 'cultural-events', 
      label: 'Cultural Events', 
      labelPt: 'Eventos Culturais',
      description: 'Regularly attend cultural activities'
    },
    { 
      id: 'language-preservation', 
      label: 'Language Preservation', 
      labelPt: 'Preservação do Idioma',
      description: 'Actively maintain Portuguese language'
    },
    { 
      id: 'diaspora-connection', 
      label: 'Diaspora Connection', 
      labelPt: 'Conexão da Diáspora',
      description: 'Stay connected with global Portuguese community'
    }
  ]

  const toggleOrigin = (origin: string) => {
    const current = formData.origins || []
    const updated = current.includes(origin)
      ? current.filter((o: string) => o !== origin)
      : [...current, origin]
    updateFormData('origins', updated)
  }

  const toggleCelebration = (celebration: string) => {
    const current = formData.cultural_celebrations || []
    const updated = current.includes(celebration)
      ? current.filter((c: string) => c !== celebration)
      : [...current, celebration]
    updateFormData('cultural_celebrations', updated)
  }

  const updateCulturalValue = (valueId: string, rating: number) => {
    const current = formData.cultural_values || {}
    const updated = { ...current, [valueId]: rating }
    updateFormData('cultural_values', updated)
  }

  const toggleLifestylePreference = (preference: string) => {
    const current = formData.lifestyle_preferences || []
    const updated = current.includes(preference)
      ? current.filter((p: string) => p !== preference)
      : [...current, preference]
    updateFormData('lifestyle_preferences', updated)
  }

  const renderStarRating = (valueId: string) => {
    const rating = formData.cultural_values?.[valueId] || 0
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateCulturalValue(valueId, star)}
            className="focus:outline-none"
          >
            {star <= rating ? (
              <StarSolidIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <StarIcon className="w-6 h-6 text-gray-300 hover:text-yellow-300 transition-colors" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'origins', label: isPortuguese ? 'Origens' : 'Origins' },
          { id: 'celebrations', label: isPortuguese ? 'Celebrações' : 'Celebrations' },
          { id: 'values', label: isPortuguese ? 'Valores' : 'Values' },
          { id: 'lifestyle', label: isPortuguese ? 'Estilo de Vida' : 'Lifestyle' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeSection === section.id
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Portuguese Origins */}
      {activeSection === 'origins' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Suas Origens Portuguesas' : 'Your Portuguese Origins'}
            </h3>
            <p className="text-secondary-600 mb-6">
              {isPortuguese 
                ? 'Selecione todos os países lusófonos com os quais tem conexão'
                : 'Select all Portuguese-speaking countries you have connection with'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portugueseOrigins.map((origin) => (
                <motion.button
                  key={origin.value}
                  type="button"
                  onClick={() => toggleOrigin(origin.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    (formData.origins || []).includes(origin.value)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{origin.flag}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{origin.label}</h4>
                      <p className="text-sm text-secondary-600">{origin.region}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Preferência de Idioma' : 'Language Preference'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'portuguese', label: 'Português', labelPt: 'Apenas Português' },
                { value: 'english', label: 'English Only', labelPt: 'Apenas Inglês' },
                { value: 'both', label: 'Both Languages', labelPt: 'Ambos os Idiomas' }
              ].map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => updateFormData('language_preference', lang.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.language_preference === lang.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <div className="font-semibold">
                    {isPortuguese ? lang.labelPt : lang.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Cultural Celebrations */}
      {activeSection === 'celebrations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Celebrações Culturais' : 'Cultural Celebrations'}
            </h3>
            <p className="text-secondary-600 mb-6">
              {isPortuguese 
                ? 'Quais celebrações culturais são importantes para si?'
                : 'Which cultural celebrations are important to you?'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturalCelebrations.map((celebration) => (
                <motion.button
                  key={celebration.id}
                  type="button"
                  onClick={() => toggleCelebration(celebration.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    (formData.cultural_celebrations || []).includes(celebration.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      {isPortuguese ? celebration.namePt : celebration.name}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {isPortuguese ? celebration.descriptionPt : celebration.description}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      celebration.season === 'summer' ? 'bg-yellow-100 text-yellow-800' :
                      celebration.season === 'winter' ? 'bg-blue-100 text-blue-800' :
                      celebration.season === 'spring' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {celebration.season}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Cultural Values */}
      {activeSection === 'values' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Valores Culturais' : 'Cultural Values'}
            </h3>
            <p className="text-secondary-600 mb-6">
              {isPortuguese 
                ? 'Avalie a importância destes valores na sua vida (1-5 estrelas)'
                : 'Rate the importance of these values in your life (1-5 stars)'
              }
            </p>

            <div className="space-y-6">
              {culturalValues.map((value) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-primary-100 rounded-lg">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {isPortuguese ? value.labelPt : value.label}
                          </h4>
                          <p className="text-sm text-secondary-600">
                            {isPortuguese ? value.descriptionPt : value.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {renderStarRating(value.id)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Lifestyle Preferences */}
      {activeSection === 'lifestyle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Preferências de Estilo de Vida' : 'Lifestyle Preferences'}
            </h3>
            <p className="text-secondary-600 mb-6">
              {isPortuguese 
                ? 'Como vive a sua herança cultural no dia a dia?'
                : 'How do you live your cultural heritage in daily life?'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lifestylePreferences.map((preference) => (
                <motion.button
                  key={preference.id}
                  type="button"
                  onClick={() => toggleLifestylePreference(preference.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    (formData.lifestyle_preferences || []).includes(preference.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      {isPortuguese ? preference.labelPt : preference.label}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {preference.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-50 to-red-50 p-6 rounded-xl border border-green-200">
        <h4 className="font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Resumo das Suas Preferências' : 'Your Preferences Summary'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-secondary-700 mb-1">
              {isPortuguese ? 'Origens:' : 'Origins:'}
            </p>
            <p className="text-secondary-600">
              {(formData.origins || []).length || 0} {isPortuguese ? 'selecionadas' : 'selected'}
            </p>
          </div>
          
          <div>
            <p className="font-medium text-secondary-700 mb-1">
              {isPortuguese ? 'Celebrações:' : 'Celebrations:'}
            </p>
            <p className="text-secondary-600">
              {(formData.cultural_celebrations || []).length || 0} {isPortuguese ? 'selecionadas' : 'selected'}
            </p>
          </div>
          
          <div>
            <p className="font-medium text-secondary-700 mb-1">
              {isPortuguese ? 'Valores:' : 'Values:'}
            </p>
            <p className="text-secondary-600">
              {Object.keys(formData.cultural_values || {}).length || 0} {isPortuguese ? 'avaliados' : 'rated'}
            </p>
          </div>
          
          <div>
            <p className="font-medium text-secondary-700 mb-1">
              {isPortuguese ? 'Estilo de Vida:' : 'Lifestyle:'}
            </p>
            <p className="text-secondary-600">
              {(formData.lifestyle_preferences || []).length || 0} {isPortuguese ? 'selecionadas' : 'selected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}