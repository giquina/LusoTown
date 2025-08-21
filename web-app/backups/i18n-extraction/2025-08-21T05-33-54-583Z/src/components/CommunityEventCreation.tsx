'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PlusIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyPoundIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  StarIcon,
  BuildingOfficeIcon,
  MusicalNoteIcon,
  HeartIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { getCurrentUser } from '@/lib/auth'

interface EventCreationForm {
  title: string
  description: string
  cultural_category: string
  portuguese_neighborhood: string
  date: string
  time: string
  end_time: string
  venue: string
  address: string
  price: number
  max_attendees: number
  fado_music_featured: boolean
  santos_populares_themed: boolean
  football_viewing_party: boolean
  cultural_preservation_focus: boolean
  requires_portuguese_verification: boolean
  images: File[]
  tags: string[]
}

interface VerificationStatus {
  is_verified: boolean
  verification_level: 'community_member' | 'business_owner' | 'cultural_leader' | 'heritage_expert'
  business_profile?: {
    name: string
    type: string
    verification_status: string
  }
  can_create_events: boolean
  max_events_per_month: number
  current_month_events: number
}

interface CommunityEventCreationProps {
  className?: string
  onEventCreated?: (eventId: string) => void
  preselectedCategory?: string
  preselectedNeighborhood?: string
}

const CULTURAL_CATEGORIES = [
  {
    id: 'santos_populares',
    name: { en: 'Santos Populares', pt: 'Santos Populares' },
    icon: '🎉',
    description: 'Traditional Portuguese summer festivals and celebrations',
    verification_required: false
  },
  {
    id: 'fado_music',
    name: { en: 'Fado Music', pt: 'Música de Fado' },
    icon: '🎵',
    description: 'Portuguese soul music performances and appreciation',
    verification_required: true
  },
  {
    id: 'football_culture',
    name: { en: 'Football Culture', pt: 'Cultura do Futebol' },
    icon: '⚽',
    description: 'Portuguese football viewing parties and discussions',
    verification_required: false
  },
  {
    id: 'business_networking',
    name: { en: 'Business Networking', pt: 'Networking de Negócios' },
    icon: '💼',
    description: 'Professional development and business connections',
    verification_required: true
  },
  {
    id: 'cultural_preservation',
    name: { en: 'Cultural Preservation', pt: 'Preservação Cultural' },
    icon: '🏛️',
    description: 'Heritage protection and tradition preservation',
    verification_required: true
  },
  {
    id: 'gastronomy',
    name: { en: 'Portuguese Gastronomy', pt: 'Gastronomia Portuguesa' },
    icon: '🍽️',
    description: 'Traditional Portuguese cooking and food experiences',
    verification_required: false
  },
  {
    id: 'language_culture',
    name: { en: 'Language & Culture', pt: 'Língua e Cultura' },
    icon: '📚',
    description: 'Portuguese language education and cultural learning',
    verification_required: true
  },
  {
    id: 'family_social',
    name: { en: 'Family & Social', pt: 'Família e Social' },
    icon: '👨‍👩‍👧‍👦',
    description: 'Family-friendly gatherings and social events',
    verification_required: false
  }
]

const PORTUGUESE_NEIGHBORHOODS = [
  'Stockwell',
  'Vauxhall',
  'North Kensington',
  'Brixton',
  'Camden',
  'Elephant and Castle',
  'Bermondsey',
  'Tower Hamlets',
  'Islington',
  'Westminster'
]

const SUGGESTED_TAGS = [
  'traditional', 'authentic', 'family-friendly', 'professional', 'cultural', 'heritage',
  'music', 'food', 'language', 'networking', 'social', 'educational', 'community',
  'beginner-friendly', 'advanced', 'interactive', 'workshop', 'celebration', 'seasonal'
]

export default function CommunityEventCreation({
  className = '',
  onEventCreated,
  preselectedCategory,
  preselectedNeighborhood
}: CommunityEventCreationProps) {
  const { language } = useLanguage()
  const [user] = useState(getCurrentUser())
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isPortuguese = language === 'pt'

  const [formData, setFormData] = useState<EventCreationForm>({
    title: '',
    description: '',
    cultural_category: preselectedCategory || '',
    portuguese_neighborhood: preselectedNeighborhood || '',
    date: '',
    time: '',
    end_time: '',
    venue: '',
    address: '',
    price: 0,
    max_attendees: 50,
    fado_music_featured: false,
    santos_populares_themed: false,
    football_viewing_party: false,
    cultural_preservation_focus: false,
    requires_portuguese_verification: false,
    images: [],
    tags: []
  })

  useEffect(() => {
    // Load user verification status
    const timer = setTimeout(() => {
      // Mock verification status - in production this would come from Supabase
      setVerificationStatus({
        is_verified: true,
        verification_level: 'business_owner',
        business_profile: {
          name: 'Portuguese Cultural Services Ltd',
          type: 'Cultural Organization',
          verification_status: 'verified'
        },
        can_create_events: true,
        max_events_per_month: 8,
        current_month_events: 3
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = isPortuguese ? 'Título é obrigatório' : 'Title is required'
      }
      if (!formData.description.trim()) {
        newErrors.description = isPortuguese ? 'Descrição é obrigatória' : 'Description is required'
      }
      if (!formData.cultural_category) {
        newErrors.cultural_category = isPortuguese ? 'Categoria é obrigatória' : 'Category is required'
      }
    }

    if (step === 2) {
      if (!formData.date) {
        newErrors.date = isPortuguese ? 'Data é obrigatória' : 'Date is required'
      }
      if (!formData.time) {
        newErrors.time = isPortuguese ? 'Hora é obrigatória' : 'Time is required'
      }
      if (!formData.venue.trim()) {
        newErrors.venue = isPortuguese ? 'Local é obrigatório' : 'Venue is required'
      }
      if (!formData.portuguese_neighborhood) {
        newErrors.portuguese_neighborhood = isPortuguese ? 'Bairro é obrigatório' : 'Neighborhood is required'
      }
    }

    if (step === 3) {
      if (formData.max_attendees < 1) {
        newErrors.max_attendees = isPortuguese ? 'Mínimo 1 participante' : 'Minimum 1 attendee'
      }
      if (formData.price < 0) {
        newErrors.price = isPortuguese ? 'Preço não pode ser negativo' : 'Price cannot be negative'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setSubmitting(true)
    try {
      // Mock event creation - in production this would call Supabase
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const eventId = `event-${Date.now()}`
      onEventCreated?.(eventId)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        cultural_category: '',
        portuguese_neighborhood: '',
        date: '',
        time: '',
        end_time: '',
        venue: '',
        address: '',
        price: 0,
        max_attendees: 50,
        fado_music_featured: false,
        santos_populares_themed: false,
        football_viewing_party: false,
        cultural_preservation_focus: false,
        requires_portuguese_verification: false,
        images: [],
        tags: []
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Error creating event:', error)
    }
    setSubmitting(false)
  }

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = CULTURAL_CATEGORIES.find(cat => cat.id === categoryId)
    return category ? category.icon : '🎭'
  }

  const getCategoryName = (categoryId: string) => {
    const category = CULTURAL_CATEGORIES.find(cat => cat.id === categoryId)
    return category ? category.name[isPortuguese ? 'pt' : 'en'] : categoryId
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!verificationStatus?.can_create_events) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {isPortuguese ? 'Verificação Necessária' : 'Verification Required'}
          </h3>
          <p className="text-gray-600 mb-6">
            {isPortuguese
              ? 'Para criar eventos da comunidade portuguesa, necessita de verificação como membro verificado, proprietário de negócio ou líder cultural.'
              : 'To create Portuguese community events, you need verification as a verified member, business owner, or cultural leader.'}
          </p>
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {isPortuguese ? 'Solicitar Verificação' : 'Request Verification'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-coral-500 rounded-xl flex items-center justify-center">
              <PlusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isPortuguese ? 'Criar Evento Comunitário' : 'Create Community Event'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isPortuguese
                  ? 'Partilhe experiências portuguesas autênticas em Londres'
                  : 'Share authentic Portuguese experiences in London'}
              </p>
            </div>
          </div>
          {verificationStatus?.business_profile && (
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <CheckCircleIcon className="w-4 h-4" />
              <span>{isPortuguese ? 'Verificado' : 'Verified'}</span>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          {currentStep === 1 && (isPortuguese ? 'Informações Básicas' : 'Basic Information')}
          {currentStep === 2 && (isPortuguese ? 'Data e Local' : 'Date & Location')}
          {currentStep === 3 && (isPortuguese ? 'Participantes e Preço' : 'Attendees & Pricing')}
          {currentStep === 4 && (isPortuguese ? 'Características Culturais' : 'Cultural Features')}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Título do Evento' : 'Event Title'} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={isPortuguese ? 'ex: Noite de Fado Autêntico' : 'e.g. Authentic Fado Night'}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Descrição' : 'Description'} *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={isPortuguese 
                    ? 'Descreva o seu evento, o que os participantes podem esperar...'
                    : 'Describe your event, what attendees can expect...'
                  }
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Categoria Cultural' : 'Cultural Category'} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CULTURAL_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, cultural_category: category.id }))}
                      className={`text-left p-3 border rounded-lg transition-all ${
                        formData.cultural_category === category.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {category.name[isPortuguese ? 'pt' : 'en']}
                          </div>
                          <div className="text-xs text-gray-600">
                            {category.description}
                          </div>
                          {category.verification_required && (
                            <div className="flex items-center space-x-1 mt-1">
                              <CheckCircleIcon className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-green-600">
                                {isPortuguese ? 'Verificação necessária' : 'Verification required'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.cultural_category && <p className="text-red-500 text-xs mt-1">{errors.cultural_category}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Location */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Data' : 'Date'} *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Hora de Início' : 'Start Time'} *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Hora de Fim' : 'End Time'}
                </label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Bairro Português' : 'Portuguese Neighborhood'} *
                </label>
                <select
                  value={formData.portuguese_neighborhood}
                  onChange={(e) => setFormData(prev => ({ ...prev, portuguese_neighborhood: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.portuguese_neighborhood ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{isPortuguese ? 'Selecione um bairro' : 'Select a neighborhood'}</option>
                  {PORTUGUESE_NEIGHBORHOODS.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
                {errors.portuguese_neighborhood && <p className="text-red-500 text-xs mt-1">{errors.portuguese_neighborhood}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Local' : 'Venue'} *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.venue ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={isPortuguese ? 'ex: Centro Comunitário Português' : 'e.g. Portuguese Community Centre'}
                />
                {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Endereço Completo' : 'Full Address'}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={isPortuguese ? 'Endereço completo com código postal' : 'Full address with postcode'}
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Attendees & Pricing */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Máximo de Participantes' : 'Maximum Attendees'} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.max_attendees}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_attendees: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.max_attendees ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.max_attendees && <p className="text-red-500 text-xs mt-1">{errors.max_attendees}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Preço (£)' : 'Price (£)'} *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  <p className="text-xs text-gray-600 mt-1">
                    {isPortuguese ? 'Defina 0 para eventos gratuitos' : 'Set to 0 for free events'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Etiquetas do Evento' : 'Event Tags'}
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_TAGS.filter(tag => !formData.tags.includes(tag)).map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.requires_portuguese_verification}
                    onChange={(e) => setFormData(prev => ({ ...prev, requires_portuguese_verification: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    {isPortuguese 
                      ? 'Requer verificação de comunidade portuguesa' 
                      : 'Require Portuguese community verification'}
                  </span>
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  {isPortuguese
                    ? 'Apenas membros verificados da comunidade portuguesa podem participar'
                    : 'Only verified Portuguese community members can attend'}
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Cultural Features */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  {isPortuguese ? 'Características Culturais' : 'Cultural Features'}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {isPortuguese
                    ? 'Selecione as características que melhor descrevem o seu evento'
                    : 'Select the features that best describe your event'}
                </p>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.fado_music_featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, fado_music_featured: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <MusicalNoteIcon className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-700">
                        {isPortuguese ? 'Música de Fado em destaque' : 'Fado music featured'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.santos_populares_themed}
                      onChange={(e) => setFormData(prev => ({ ...prev, santos_populares_themed: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🎉</span>
                      <span className="text-sm text-gray-700">
                        {isPortuguese ? 'Tema Santos Populares' : 'Santos Populares themed'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.football_viewing_party}
                      onChange={(e) => setFormData(prev => ({ ...prev, football_viewing_party: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">⚽</span>
                      <span className="text-sm text-gray-700">
                        {isPortuguese ? 'Festa de visualização de futebol' : 'Football viewing party'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.cultural_preservation_focus}
                      onChange={(e) => setFormData(prev => ({ ...prev, cultural_preservation_focus: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <AcademicCapIcon className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-gray-700">
                        {isPortuguese ? 'Foco na preservação cultural' : 'Cultural preservation focus'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Event Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-3">
                  {isPortuguese ? 'Pré-visualização do Evento' : 'Event Preview'}
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(formData.cultural_category)}</span>
                    <span className="font-medium">{formData.title || (isPortuguese ? 'Título do evento' : 'Event title')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{formData.date || (isPortuguese ? 'Data' : 'Date')} • {formData.time || (isPortuguese ? 'Hora' : 'Time')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{formData.venue || (isPortuguese ? 'Local' : 'Venue')} • {formData.portuguese_neighborhood}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CurrencyPoundIcon className="w-4 h-4" />
                    <span>£{formData.price}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <UsersIcon className="w-4 h-4" />
                    <span>{isPortuguese ? 'Máx' : 'Max'} {formData.max_attendees} {isPortuguese ? 'participantes' : 'attendees'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isPortuguese ? 'Anterior' : 'Back'}
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              {isPortuguese ? 'Próximo' : 'Next'}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-accent-500 text-white px-6 py-2 rounded-lg hover:bg-accent-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isPortuguese ? 'Criando...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{isPortuguese ? 'Criar Evento' : 'Create Event'}</span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Usage Limit Info */}
      {verificationStatus && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <InformationCircleIcon className="w-4 h-4" />
            <span>
              {isPortuguese
                ? `${verificationStatus.current_month_events} de ${verificationStatus.max_events_per_month} eventos criados este mês`
                : `${verificationStatus.current_month_events} of ${verificationStatus.max_events_per_month} events created this month`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}