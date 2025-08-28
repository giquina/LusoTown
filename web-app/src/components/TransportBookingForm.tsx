'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarDaysIcon, 
  MapPinIcon, 
  ShieldCheckIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  dateTime: string
  pickupLocation: string
  destinations: string
  eventType: string
  securityPreference: string
  additionalNotes: string
  serviceType: string
  packageType?: string
  estimatedHours?: number
}

const eventTypes = [
  { value: 'tea-at-ritz', labelEn: 'Tea at The Ritz VIP Ride', labelPt: 'Chá no Ritz VIP' },
  { value: 'mayfair-night', labelEn: 'Mayfair by Night', labelPt: 'Mayfair à Noite' },
  { value: 'london-landmarks', labelEn: 'VIP London Landmarks', labelPt: 'Marcos de Londres VIP' },
  { value: 'harry-potter', labelEn: 'Harry Potter Studio Tour', labelPt: 'Tour Estúdios Harry Potter' },
  { value: 'james-bond', labelEn: 'James Bond London Drive', labelPt: 'Tour James Bond Londres' },
  { value: 'royal-london', labelEn: 'Royal London Experience', labelPt: 'Experiência Londres Real' },
  { value: 'shopping', labelEn: 'Shopping Experience at Harrods & Bond Street', labelPt: 'Experiência Compras Harrods & Bond Street' },
  { value: 'airport-transfer', labelEn: 'Airport VIP Transfer', labelPt: 'Transferência VIP Aeroporto' },
  { value: 'bespoke', labelEn: 'Bespoke Private Transport', labelPt: 'Transporte Privado Personalizado' }
]

const securityPreferences = [
  { value: 'driver-only', labelEn: 'Driver only', labelPt: 'Apenas motorista' },
  { value: 'close-protection', labelEn: 'Close Protection Officer', labelPt: 'Oficial de Proteção Próxima' },
  { value: 'both', labelEn: 'Both', labelPt: 'Ambos' }
]

interface TransportBookingFormProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: any
  selectedPackage?: any
  serviceTiers?: any[]
  experiencePackages?: any[]
}

export default function TransportBookingForm({ 
  isOpen, 
  onClose, 
  selectedService, 
  selectedPackage 
}: TransportBookingFormProps) {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    dateTime: '',
    pickupLocation: '',
    destinations: '',
    eventType: selectedPackage?.value || '',
    securityPreference: 'driver-only',
    additionalNotes: '',
    serviceType: selectedService?.id || 'essential',
    packageType: selectedPackage?.value,
    estimatedHours: selectedPackage?.hours || 3
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = isPortuguese ? 'Nome completo é obrigatório' : 'Full name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = isPortuguese ? 'Email é obrigatório' : 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = isPortuguese ? 'Email inválido' : 'Invalid email format'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = isPortuguese ? 'Telefone é obrigatório' : 'Phone number is required'
      }
    }

    if (step === 2) {
      if (!formData.dateTime) {
        newErrors.dateTime = isPortuguese ? 'Data e hora são obrigatórias' : 'Date and time are required'
      }
      if (!formData.pickupLocation.trim()) {
        newErrors.pickupLocation = isPortuguese ? 'Local de recolha é obrigatório' : 'Pickup location is required'
      }
      if (!formData.destinations.trim()) {
        newErrors.destinations = isPortuguese ? 'Destinos são obrigatórios' : 'Destinations are required'
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

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsSubmitting(true)

    try {
      // Calculate pricing
      const basePrice = selectedService?.price || 55
      const hours = formData.estimatedHours || 3
      const totalPrice = basePrice * hours

      // Add to cart
      const cartItem = {
        id: `transport-${Date.now()}`,
        type: 'transport_service' as const,
        title: isPortuguese 
          ? `${selectedService?.namePortuguese || 'Serviço de Transporte Privado'} - ${formData.eventType}`
          : `${selectedService?.name || 'Private Transport Service'} - ${formData.eventType}`,
        description: isPortuguese 
          ? `Serviço de transporte privado para ${hours} horas`
          : `Private transport service for ${hours} hours`,
        price: totalPrice,
        currency: 'GBP',
        imageUrl: '/transport-service.jpg',
        quantity: 1,
        transportServiceId: selectedService?.id,
        pickupDateTime: formData.dateTime,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.destinations,
        hours: hours,
        bookingType: 'hourly' as const,
        passengerCount: 1,
        addedAt: new Date().toISOString(),
        metadata: {
          bookingDetails: formData,
          eventType: formData.eventType,
          securityPreference: formData.securityPreference
        }
      }

      // Redirect to contact for transport booking
      window.location.href = '/contact?transport=true'
      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setCurrentStep(1)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          dateTime: '',
          pickupLocation: '',
          destinations: '',
          eventType: selectedPackage?.value || '',
          securityPreference: 'driver-only',
          additionalNotes: '',
          serviceType: selectedService?.id || 'essential',
          packageType: selectedPackage?.value,
          estimatedHours: selectedPackage?.hours || 3
        })
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isPortuguese ? 'Reservar Serviço de Transporte Privado' : 'Book Private Transport Service'}
                </h2>
                <div className="flex items-center mt-2 space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isPortuguese ? 'Reserva Adicionada!' : 'Booking Added!'}
                  </h3>
                  <p className="text-gray-600">
                    {isPortuguese 
                      ? 'O seu serviço foi adicionado ao carrinho. Pode finalizar a compra quando estiver pronto.'
                      : 'Your service has been added to the cart. You can complete checkout when ready.'
                    }
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {isPortuguese ? 'Informação Pessoal' : 'Personal Information'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <UserIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Nome Completo *' : 'Full Name *'}
                            </label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.fullName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={isPortuguese ? 'Seu nome completo' : 'Your full name'}
                            />
                            {errors.fullName && (
                              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Email *' : 'Email *'}
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={isPortuguese ? 'seu.email@exemplo.com' : 'your.email@example.com'}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <PhoneIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Telefone *' : 'Phone Number *'}
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={isPortuguese ? '+44 7XXX XXX XXX' : '+44 7XXX XXX XXX'}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Trip Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {isPortuguese ? 'Detalhes da Viagem' : 'Trip Details'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Data e Hora *' : 'Date & Time *'}
                            </label>
                            <input
                              type="datetime-local"
                              value={formData.dateTime}
                              onChange={(e) => handleInputChange('dateTime', e.target.value)}
                              min={new Date().toISOString().slice(0, 16)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.dateTime ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.dateTime && (
                              <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <MapPinIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Local de Recolha *' : 'Pickup Location *'}
                            </label>
                            <input
                              type="text"
                              value={formData.pickupLocation}
                              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={isPortuguese ? 'Hotel, aeroporto, endereço...' : 'Hotel, airport, address...'}
                            />
                            {errors.pickupLocation && (
                              <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <MapPinIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Destinos *' : 'Destinations *'}
                            </label>
                            <textarea
                              value={formData.destinations}
                              onChange={(e) => handleInputChange('destinations', e.target.value)}
                              rows={3}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                errors.destinations ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={isPortuguese 
                                ? 'Liste os destinos que gostaria de visitar...'
                                : 'List the destinations you would like to visit...'
                              }
                            />
                            {errors.destinations && (
                              <p className="text-red-500 text-sm mt-1">{errors.destinations}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Preferences */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {isPortuguese ? 'Preferências' : 'Preferences'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {isPortuguese ? 'Tipo de Evento' : 'Event Type'}
                            </label>
                            <select
                              value={formData.eventType}
                              onChange={(e) => handleInputChange('eventType', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="">
                                {isPortuguese ? 'Selecione o tipo de evento' : 'Select event type'}
                              </option>
                              {eventTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {isPortuguese ? type.labelPt : type.labelEn}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <ShieldCheckIcon className="w-4 h-4 inline mr-2" />
                              {isPortuguese ? 'Preferência de Segurança' : 'Security Preference'}
                            </label>
                            <select
                              value={formData.securityPreference}
                              onChange={(e) => handleInputChange('securityPreference', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              {securityPreferences.map((pref) => (
                                <option key={pref.value} value={pref.value}>
                                  {isPortuguese ? pref.labelPt : pref.labelEn}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {isPortuguese ? 'Notas Adicionais' : 'Additional Notes'}
                            </label>
                            <textarea
                              value={formData.additionalNotes}
                              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder={isPortuguese 
                                ? 'Quaisquer pedidos especiais ou informações adicionais...'
                                : 'Any special requests or additional information...'
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {isPortuguese ? `Passo ${currentStep} de 3` : `Step ${currentStep} of 3`}
                    </div>
                    
                    <div className="flex space-x-3">
                      {currentStep > 1 && (
                        <button
                          onClick={handlePrevious}
                          className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ArrowLeftIcon className="w-4 h-4 mr-2" />
                          {isPortuguese ? 'Anterior' : 'Previous'}
                        </button>
                      )}
                      
                      {currentStep < 3 ? (
                        <button
                          onClick={handleNext}
                          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          {isPortuguese ? 'Próximo' : 'Next'}
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              {isPortuguese ? 'Processando...' : 'Processing...'}
                            </>
                          ) : (
                            <>
                              {isPortuguese ? 'Confirmar Reserva' : 'Confirm Booking'}
                              <CheckCircleIcon className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}