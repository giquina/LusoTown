'use client'

import React, { useState, useEffect } from 'react'
import { ROUTES } from '@/config'
import { motion, AnimatePresence } from 'framer-motion'
import { ROUTES } from '@/config'
import { 
  XMarkIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  UsersIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useWaitingList } from '@/context/WaitingListContext'
import { ROUTES } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config'

interface WaitingListModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
    date: string
    time: string
    maxAttendees: number
    attendees: number
  }
}

interface FormData {
  name: string
  email: string
  phone: string
  portuguesePreference: 'portuguese' | 'english' | 'both'
  eventSpecificQuestions: string
  notificationPreference: 'email' | 'phone' | 'both'
  agreedToPrivacy: boolean
}

export default function WaitingListModal({ isOpen, onClose, event }: WaitingListModalProps) {
  const { addToWaitingList, getWaitingListCount, isOnWaitingList } = useWaitingList()
  const { language, t } = useLanguage()
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    portuguesePreference: 'both',
    eventSpecificQuestions: '',
    notificationPreference: 'email',
    agreedToPrivacy: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        portuguesePreference: 'both',
        eventSpecificQuestions: '',
        notificationPreference: 'email',
        agreedToPrivacy: false
      })
      setIsSubmitting(false)
      setIsSuccess(false)
      setError(null)
      setFieldErrors({})
    }
  }, [isOpen])

  const waitingListCount = getWaitingListCount(event.id)

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      errors.name = language === 'pt' ? 'Nome é obrigatório' : 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = language === 'pt' ? 'Email é obrigatório' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = language === 'pt' ? 'Email inválido' : 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      errors.phone = language === 'pt' ? 'Telefone é obrigatório' : 'Phone number is required'
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = language === 'pt' ? 'Número de telefone inválido' : 'Invalid phone number'
    }

    if (!formData.agreedToPrivacy) {
      errors.agreedToPrivacy = language === 'pt' ? 'Deve aceitar a política de privacidade' : 'You must agree to the privacy policy'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    // Check if already on waiting list
    if (isOnWaitingList(event.id, formData.email)) {
      setError(language === 'pt' ? 'Já está na lista de espera para este evento' : 'You are already on the waiting list for this event')
      return
    }

    setIsSubmitting(true)

    try {
      await addToWaitingList({
        eventId: event.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portuguesePreference: formData.portuguesePreference,
        eventSpecificQuestions: formData.eventSpecificQuestions || undefined,
        notificationPreference: formData.notificationPreference,
        agreedToPrivacy: formData.agreedToPrivacy
      })

      setIsSuccess(true)
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {language === 'pt' ? 'Juntar à Lista de Espera' : 'Join Waiting List'}
                  </h3>
                  <p className="text-sm text-secondary-600 mt-1">
                    {event.title}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary-100 rounded-xl transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Event Info */}
              <div className="mt-4 p-4 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-secondary-700">
                    <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-orange-600 font-medium">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {waitingListCount} {language === 'pt' ? 'na lista de espera' : 'on waiting list'}
                  </div>
                </div>
              </div>
            </div>

            {/* Success State */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircleIcon className="w-8 h-8 text-action-600" />
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Adicionado à Lista de Espera!' : 'Added to Waiting List!'}
                </h4>
                <p className="text-secondary-600 mb-4">
                  {language === 'pt' 
                    ? 'Contactaremos você se surgirem vagas disponíveis.'
                    : "We'll contact you if spots become available."
                  }
                </p>
                <div className="bg-primary-50 rounded-xl p-3">
                  <p className="text-sm text-primary-700">
                    {language === 'pt' 
                      ? `Sua posição: #${waitingListCount + 1}`
                      : `Your position: #${waitingListCount + 1}`
                    }
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            {!isSuccess && (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center"
                  >
                    <ExclamationTriangleIcon className="w-5 h-5 text-coral-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Nome Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                      fieldErrors.name 
                        ? 'border-red-300 focus:border-coral-500 focus:ring-red-500'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder={language === 'pt' ? 'Digite seu nome completo' : 'Enter your full name'}
                  />
                  {fieldErrors.name && (
                    <p className="text-sm text-coral-600 mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Email *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-colors ${
                        fieldErrors.email 
                          ? 'border-red-300 focus:border-coral-500 focus:ring-red-500'
                          : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                    />
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-sm text-coral-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Número de Telefone *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-colors ${
                        fieldErrors.phone 
                          ? 'border-red-300 focus:border-coral-500 focus:ring-red-500'
                          : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder={language === 'pt' ? '+44 20 1234 5678' : '+44 20 1234 5678'}
                    />
                    <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-sm text-coral-600 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Preferência de Idioma' : 'Language Preference'}
                  </label>
                  <select
                    value={formData.portuguesePreference}
                    onChange={(e) => handleInputChange('portuguesePreference', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="both">{language === 'pt' ? 'Português e Inglês' : 'Portuguese and English'}</option>
                    <option value="portuguese">{language === 'pt' ? 'Apenas Português' : 'Portuguese only'}</option>
                    <option value="english">{language === 'pt' ? 'Apenas Inglês' : 'English only'}</option>
                  </select>
                </div>

                {/* Notification Preference */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Como gostaria de ser contactado?' : 'How would you like to be contacted?'}
                  </label>
                  <select
                    value={formData.notificationPreference}
                    onChange={(e) => handleInputChange('notificationPreference', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="email">{language === 'pt' ? 'Por Email' : 'By Email'}</option>
                    <option value="phone">{language === 'pt' ? 'Por Telefone' : 'By Phone'}</option>
                    <option value="both">{language === 'pt' ? 'Email e Telefone' : 'Email and Phone'}</option>
                  </select>
                </div>

                {/* Event Questions */}
                <div>
                  <label htmlFor="questions" className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Perguntas sobre o Evento (Opcional)' : 'Event Questions (Optional)'}
                  </label>
                  <textarea
                    id="questions"
                    value={formData.eventSpecificQuestions}
                    onChange={(e) => handleInputChange('eventSpecificQuestions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500"
                    placeholder={language === 'pt' 
                      ? 'Alguma pergunta específica sobre este evento?'
                      : 'Any specific questions about this event?'
                    }
                  />
                </div>

                {/* Privacy Consent */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreedToPrivacy}
                      onChange={(e) => handleInputChange('agreedToPrivacy', e.target.checked)}
                      className={`mt-1 w-4 h-4 rounded border-2 transition-colors ${
                        fieldErrors.agreedToPrivacy
                          ? 'border-red-300 text-coral-600 focus:ring-red-500'
                          : 'border-secondary-300 text-primary-600 focus:ring-primary-500'
                      }`}
                    />
                    <span className="text-sm text-secondary-600">
                      {language === 'pt' 
                        ? 'Aceito que os meus dados sejam utilizados para contacto sobre vagas neste evento, de acordo com a '
                        : 'I agree to my data being used to contact me about available spots for this event, in accordance with the '
                      }
                      <a href={ROUTES.legal.privacy} className="text-primary-600 hover:text-primary-700 underline">
                        {language === 'pt' ? 'política de privacidade' : 'privacy policy'}
                      </a>
                      . *
                    </span>
                  </label>
                  {fieldErrors.agreedToPrivacy && (
                    <p className="text-sm text-coral-600 mt-1">{fieldErrors.agreedToPrivacy}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 text-white font-semibold py-4 rounded-2xl hover:from-secondary-600 hover:via-primary-600 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {language === 'pt' ? 'A adicionar...' : 'Adding...'}
                      </div>
                    ) : (
                      language === 'pt' ? 'Juntar à Lista de Espera' : 'Join Waiting List'
                    )}
                  </button>
                </div>

                {/* Info Text */}
                <p className="text-xs text-gray-500 text-center">
                  {language === 'pt' 
                    ? 'Contactaremos você por ordem de chegada se surgirem vagas.'
                    : "We'll contact you on a first-come, first-served basis if spots become available."
                  }
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}