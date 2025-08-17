'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon,
  TruckIcon,
  GlobeEuropeAfricaIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  CreditCardIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import SubscriptionGate from './SubscriptionGate'
import EasySIAQuestionnaire, { type EasySIAData } from './EasySIAQuestionnaire'
import { calculatePricing, type PricingCalculationRequest } from '@/lib/transportServices'

export interface ServiceType {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'standard' | 'enhanced' | 'hybrid'
  requiresSIA: boolean
  basePrice: number
  icon: React.ElementType
  features: string[]
  featuresPortuguese: string[]
}

export interface BookingStep {
  id: string
  title: string
  titlePortuguese: string
  component: React.ComponentType<any>
  validation?: (data: any) => boolean
  required: boolean
}

export interface BookingData {
  // Service selection
  serviceType: ServiceType | null
  packageType?: string
  
  // Standard booking data
  dateTime: string
  pickupLocation: string
  dropoffLocation: string
  groupSize: number
  duration: number
  
  // Vehicle preferences
  vehiclePreference?: string
  vehicleId?: string
  
  // Personal details
  fullName: string
  email: string
  phone: string
  
  // SIA compliance data (if required)
  siaData?: EasySIAData
  
  // Payment data
  paymentMethod?: string
  specialRequests?: string
  
  // Pricing
  pricingBreakdown?: any
  totalPrice: number
  
  // Membership
  membershipTier: 'free' | 'core' | 'premium'
}

interface IntelligentBookingFlowProps {
  isOpen: boolean
  onClose: () => void
  preSelectedService?: ServiceType
  onComplete: (bookingData: BookingData) => void
}

const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'portuguese-tours',
    name: 'Portuguese Heritage Tours',
    namePortuguese: 'Tours do Património Português',
    description: 'Guided cultural tours of Portuguese areas in London & UK',
    descriptionPortuguese: 'Tours culturais guiados das áreas portuguesas em Londres e Reino Unido',
    category: 'standard',
    requiresSIA: false,
    basePrice: 65,
    icon: GlobeEuropeAfricaIcon,
    features: [
      'Portuguese-speaking guide',
      'Cultural landmarks',
      'Community venues',
      'Heritage storytelling'
    ],
    featuresPortuguese: [
      'Guia que fala português',
      'Marcos culturais',
      'Locais comunitários',
      'Narrativa do património'
    ]
  },
  {
    id: 'airport-transfers',
    name: 'Premium Airport Transfers',
    namePortuguese: 'Transferências Premium de Aeroporto',
    description: 'Luxury transport to/from all London airports',
    descriptionPortuguese: 'Transporte de luxo de/para todos os aeroportos de Londres',
    category: 'standard',
    requiresSIA: false,
    basePrice: 85,
    icon: TruckIcon,
    features: [
      'Flight monitoring',
      'Meet & greet service',
      'Luggage assistance',
      'Portuguese assistance'
    ],
    featuresPortuguese: [
      'Monitorização de voos',
      'Serviço de receção',
      'Assistência com bagagem',
      'Assistência portuguesa'
    ]
  },
  {
    id: 'vip-protection',
    name: 'VIP Close Protection',
    namePortuguese: 'Proteção Próxima VIP',
    description: 'Professional security services with SIA-licensed officers',
    descriptionPortuguese: 'Serviços de segurança profissional com oficiais licenciados SIA',
    category: 'enhanced',
    requiresSIA: true,
    basePrice: 150,
    icon: ShieldCheckIcon,
    features: [
      'SIA-licensed officers',
      'Risk assessment',
      'Portuguese cultural understanding',
      'Professional discretion'
    ],
    featuresPortuguese: [
      'Oficiais licenciados SIA',
      'Avaliação de risco',
      'Compreensão cultural portuguesa',
      'Discrição profissional'
    ]
  },
  {
    id: 'luxury-experiences',
    name: 'Luxury Experience Packages',
    namePortuguese: 'Pacotes de Experiências de Luxo',
    description: 'Combined transport and cultural experiences with optional security',
    descriptionPortuguese: 'Transporte combinado e experiências culturais com segurança opcional',
    category: 'hybrid',
    requiresSIA: false,
    basePrice: 120,
    icon: SparklesIcon,
    features: [
      'Luxury vehicles',
      'Cultural experiences',
      'Optional security',
      'Bespoke itineraries'
    ],
    featuresPortuguese: [
      'Veículos de luxo',
      'Experiências culturais',
      'Segurança opcional',
      'Itinerários personalizados'
    ]
  }
]

const MEMBERSHIP_DISCOUNTS = {
  free: 0,
  core: 10,
  premium: 20
}

export default function IntelligentBookingFlow({
  isOpen,
  onClose,
  preSelectedService,
  onComplete
}: IntelligentBookingFlowProps) {
  const { language } = useLanguage()
  const { addToCart } = useCart()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType: preSelectedService || null,
    dateTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    groupSize: 1,
    duration: 3,
    fullName: '',
    email: '',
    phone: '',
    totalPrice: 0,
    membershipTier: 'free'
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)
  const [showSIAQuestionnaire, setShowSIAQuestionnaire] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Determine booking flow based on service type
  const bookingFlow = useMemo(() => {
    if (!bookingData.serviceType) return []
    
    const steps = [
      { id: 'service', title: 'Service Selection', titlePortuguese: 'Seleção de Serviço' },
      { id: 'datetime', title: 'Date & Time', titlePortuguese: 'Data e Hora' },
      { id: 'details', title: 'Trip Details', titlePortuguese: 'Detalhes da Viagem' },
      { id: 'vehicle', title: 'Vehicle Preference', titlePortuguese: 'Preferência de Veículo' },
      { id: 'personal', title: 'Personal Information', titlePortuguese: 'Informação Pessoal' }
    ]
    
    // Add SIA compliance step if required
    if (bookingData.serviceType.requiresSIA) {
      steps.splice(4, 0, { 
        id: 'compliance', 
        title: 'Security Compliance', 
        titlePortuguese: 'Conformidade de Segurança' 
      })
    }
    
    steps.push({ id: 'payment', title: 'Payment & Confirmation', titlePortuguese: 'Pagamento e Confirmação' })
    
    return steps
  }, [bookingData.serviceType])

  const maxSteps = bookingFlow.length

  // Calculate pricing when key data changes
  useEffect(() => {
    if (
      bookingData.serviceType &&
      bookingData.dateTime &&
      bookingData.duration &&
      bookingData.groupSize
    ) {
      calculateDynamicPricing()
    }
  }, [
    bookingData.serviceType,
    bookingData.dateTime,
    bookingData.duration,
    bookingData.groupSize,
    bookingData.membershipTier
  ])

  const calculateDynamicPricing = async () => {
    if (!bookingData.serviceType) return
    
    setIsCalculatingPrice(true)
    try {
      const request: PricingCalculationRequest = {
        service_id: bookingData.serviceType.id,
        pickup_datetime: bookingData.dateTime,
        hours: bookingData.duration,
        booking_type: bookingData.duration >= 8 ? 'day_rate' : 'hourly',
        membership_tier: bookingData.membershipTier,
        passenger_count: bookingData.groupSize,
        extras: []
      }

      const pricing = await calculatePricing(request)
      
      setBookingData(prev => ({
        ...prev,
        pricingBreakdown: pricing,
        totalPrice: pricing.total_amount
      }))
    } catch (error) {
      console.error('Pricing calculation error:', error)
      // Fallback to simple calculation
      const basePrice = bookingData.serviceType.basePrice * bookingData.duration
      const discount = MEMBERSHIP_DISCOUNTS[bookingData.membershipTier] / 100
      const totalPrice = basePrice * (1 - discount)
      
      setBookingData(prev => ({
        ...prev,
        totalPrice
      }))
    } finally {
      setIsCalculatingPrice(false)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1: // Service selection
        if (!bookingData.serviceType) {
          newErrors.serviceType = isPortuguese ? 'Selecione um tipo de serviço' : 'Please select a service type'
        }
        break
        
      case 2: // Date & time
        if (!bookingData.dateTime) {
          newErrors.dateTime = isPortuguese ? 'Data e hora são obrigatórias' : 'Date and time are required'
        }
        if (new Date(bookingData.dateTime) <= new Date()) {
          newErrors.dateTime = isPortuguese ? 'Data deve ser no futuro' : 'Date must be in the future'
        }
        break
        
      case 3: // Trip details
        if (!bookingData.pickupLocation.trim()) {
          newErrors.pickupLocation = isPortuguese ? 'Local de recolha é obrigatório' : 'Pickup location is required'
        }
        if (bookingData.groupSize < 1 || bookingData.groupSize > 8) {
          newErrors.groupSize = isPortuguese ? 'Tamanho do grupo inválido' : 'Invalid group size'
        }
        if (bookingData.duration < 1 || bookingData.duration > 24) {
          newErrors.duration = isPortuguese ? 'Duração inválida' : 'Invalid duration'
        }
        break
        
      case 5: // Personal information (or step after compliance)
        if (!bookingData.fullName.trim()) {
          newErrors.fullName = isPortuguese ? 'Nome completo é obrigatório' : 'Full name is required'
        }
        if (!bookingData.email.trim()) {
          newErrors.email = isPortuguese ? 'Email é obrigatório' : 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
          newErrors.email = isPortuguese ? 'Email inválido' : 'Invalid email format'
        }
        if (!bookingData.phone.trim()) {
          newErrors.phone = isPortuguese ? 'Telefone é obrigatório' : 'Phone number is required'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Check if we need SIA questionnaire
      if (
        currentStep === 4 && 
        bookingData.serviceType?.requiresSIA && 
        !bookingData.siaData
      ) {
        setShowSIAQuestionnaire(true)
        return
      }
      
      if (currentStep < maxSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleSIAComplete = (siaData: EasySIAData) => {
    setBookingData(prev => ({ ...prev, siaData }))
    setShowSIAQuestionnaire(false)
    setCurrentStep(currentStep + 1)
  }

  const handleComplete = async () => {
    if (!validateStep(maxSteps)) return
    
    setIsSubmitting(true)
    try {
      // Add to cart
      const cartItem = {
        type: 'transport_service' as const,
        title: isPortuguese 
          ? bookingData.serviceType!.namePortuguese
          : bookingData.serviceType!.name,
        description: isPortuguese
          ? `${bookingData.serviceType!.descriptionPortuguese} - ${bookingData.duration} horas`
          : `${bookingData.serviceType!.description} - ${bookingData.duration} hours`,
        price: bookingData.totalPrice,
        currency: 'GBP',
        imageUrl: '/transport-service-premium.jpg',
        quantity: 1,
        transportServiceId: bookingData.serviceType!.id,
        pickupDateTime: bookingData.dateTime,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        hours: bookingData.duration,
        bookingType: bookingData.duration >= 8 ? 'day_rate' : 'hourly' as const,
        passengerCount: bookingData.groupSize,
        pricingBreakdown: bookingData.pricingBreakdown,
        addedAt: new Date().toISOString(),
        metadata: {
          bookingDetails: bookingData,
          serviceCategory: bookingData.serviceType!.category,
          requiresSIA: bookingData.serviceType!.requiresSIA,
          siaCompliance: bookingData.siaData
        }
      }
      
      addToCart(cartItem)
      onComplete(bookingData)
      onClose()
    } catch (error) {
      console.error('Booking completion error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* SIA Questionnaire Modal */}
      <EasySIAQuestionnaire
        isOpen={showSIAQuestionnaire}
        onComplete={handleSIAComplete}
        onCancel={() => setShowSIAQuestionnaire(false)}
      />

      {/* Main Booking Flow */}
      <AnimatePresence>
        <div className="fixed inset-0 z-40 overflow-y-auto">
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
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isPortuguese ? 'Reserva Inteligente de Serviços' : 'Intelligent Service Booking'}
                  </h2>
                  <div className="flex items-center mt-2 space-x-2">
                    {bookingFlow.map((step, index) => (
                      <div
                        key={step.id}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index + 1 <= currentStep 
                            ? 'bg-primary-500' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {isPortuguese 
                      ? `Passo ${currentStep} de ${maxSteps}: ${bookingFlow[currentStep - 1]?.titlePortuguese}`
                      : `Step ${currentStep} of ${maxSteps}: ${bookingFlow[currentStep - 1]?.title}`
                    }
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Escolha o Seu Serviço Premium' : 'Choose Your Premium Service'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Selecionamos automaticamente o melhor fluxo de reserva para si'
                            : 'We automatically select the best booking flow for you'
                          }
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICE_TYPES.map((service) => {
                          const IconComponent = service.icon
                          return (
                            <label key={service.id} className="cursor-pointer">
                              <input
                                type="radio"
                                name="serviceType"
                                checked={bookingData.serviceType?.id === service.id}
                                onChange={() => updateBookingData('serviceType', service)}
                                className="sr-only"
                              />
                              <div className={`
                                p-6 border-2 rounded-xl transition-all hover:shadow-lg
                                ${bookingData.serviceType?.id === service.id
                                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                                }
                              `}>
                                <div className="flex items-start space-x-4">
                                  <div className={`
                                    p-3 rounded-lg
                                    ${bookingData.serviceType?.id === service.id
                                      ? 'bg-primary-100 text-primary-600'
                                      : 'bg-gray-100 text-gray-600'
                                    }
                                  `}>
                                    <IconComponent className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                      {isPortuguese ? service.namePortuguese : service.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                      {isPortuguese ? service.descriptionPortuguese : service.description}
                                    </p>
                                    
                                    {/* Service category badge */}
                                    <div className="flex items-center space-x-2 mb-3">
                                      <span className={`
                                        px-2 py-1 text-xs font-medium rounded-full
                                        ${service.category === 'standard' ? 'bg-blue-100 text-blue-800' :
                                          service.category === 'enhanced' ? 'bg-red-100 text-red-800' :
                                          'bg-purple-100 text-purple-800'
                                        }
                                      `}>
                                        {service.category === 'standard' ? 
                                          (isPortuguese ? 'Padrão' : 'Standard') :
                                          service.category === 'enhanced' ?
                                          (isPortuguese ? 'Segurança' : 'Security') :
                                          (isPortuguese ? 'Híbrido' : 'Hybrid')
                                        }
                                      </span>
                                      {service.requiresSIA && (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                                          {isPortuguese ? 'SIA Obrigatório' : 'SIA Required'}
                                        </span>
                                      )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-1">
                                      {(isPortuguese ? service.featuresPortuguese : service.features)
                                        .slice(0, 3).map((feature, index) => (
                                        <li key={index} className="flex items-center text-xs text-gray-600">
                                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>

                                    {/* Pricing */}
                                    <div className="mt-3 text-right">
                                      <span className="text-lg font-bold text-gray-900">
                                        From £{service.basePrice}
                                      </span>
                                      <span className="text-sm text-gray-500">/hour</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>

                      {errors.serviceType && (
                        <p className="text-red-500 text-sm text-center">{errors.serviceType}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Quando Precisa do Serviço?' : 'When Do You Need the Service?'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Selecione a data, hora e duração do seu serviço'
                            : 'Select the date, time and duration for your service'
                          }
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                            {isPortuguese ? 'Data e Hora do Serviço' : 'Service Date & Time'}
                          </label>
                          <input
                            type="datetime-local"
                            value={bookingData.dateTime}
                            onChange={(e) => updateBookingData('dateTime', e.target.value)}
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
                            <ClockIcon className="w-4 h-4 inline mr-2" />
                            {isPortuguese ? 'Duração (horas)' : 'Duration (hours)'}
                          </label>
                          <select
                            value={bookingData.duration}
                            onChange={(e) => updateBookingData('duration', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(hours => (
                              <option key={hours} value={hours}>
                                {hours} {hours === 1 ? 
                                  (isPortuguese ? 'hora' : 'hour') : 
                                  (isPortuguese ? 'horas' : 'hours')
                                }
                                {hours >= 8 && (
                                  ` (${isPortuguese ? 'Taxa diária disponível' : 'Day rate available'})`
                                )}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Pricing preview */}
                      {bookingData.serviceType && bookingData.dateTime && (
                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {isPortuguese ? 'Estimativa de Preço' : 'Price Estimate'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {isPortuguese ? 'Preço atualizado automaticamente' : 'Price updates automatically'}
                              </p>
                            </div>
                            <div className="text-right">
                              {isCalculatingPrice ? (
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                                  <span className="text-sm text-gray-600">
                                    {isPortuguese ? 'Calculando...' : 'Calculating...'}
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="text-2xl font-bold text-gray-900">
                                    £{bookingData.totalPrice.toFixed(0)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    £{bookingData.serviceType.basePrice}/hr × {bookingData.duration}h
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Trip Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Detalhes da Viagem' : 'Trip Details'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Onde e para quantas pessoas é o serviço?'
                            : 'Where and for how many people is the service?'
                          }
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPinIcon className="w-4 h-4 inline mr-2" />
                            {isPortuguese ? 'Local de Recolha' : 'Pickup Location'}
                          </label>
                          <input
                            type="text"
                            value={bookingData.pickupLocation}
                            onChange={(e) => updateBookingData('pickupLocation', e.target.value)}
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
                            {isPortuguese ? 'Destino (Opcional)' : 'Destination (Optional)'}
                          </label>
                          <input
                            type="text"
                            value={bookingData.dropoffLocation}
                            onChange={(e) => updateBookingData('dropoffLocation', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={isPortuguese ? 'Destino final...' : 'Final destination...'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <UserGroupIcon className="w-4 h-4 inline mr-2" />
                            {isPortuguese ? 'Tamanho do Grupo' : 'Group Size'}
                          </label>
                          <select
                            value={bookingData.groupSize}
                            onChange={(e) => updateBookingData('groupSize', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.groupSize ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {Array.from({ length: 8 }, (_, i) => i + 1).map(size => (
                              <option key={size} value={size}>
                                {size} {size === 1 ? 
                                  (isPortuguese ? 'pessoa' : 'person') : 
                                  (isPortuguese ? 'pessoas' : 'people')
                                }
                              </option>
                            ))}
                          </select>
                          {errors.groupSize && (
                            <p className="text-red-500 text-sm mt-1">{errors.groupSize}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isPortuguese ? 'Pedidos Especiais' : 'Special Requests'}
                          </label>
                          <textarea
                            value={bookingData.specialRequests || ''}
                            onChange={(e) => updateBookingData('specialRequests', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={isPortuguese 
                              ? 'Quaisquer pedidos especiais ou necessidades específicas...'
                              : 'Any special requests or specific requirements...'
                            }
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Vehicle Preference */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Preferência de Veículo' : 'Vehicle Preference'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Escolha o tipo de veículo que prefere'
                            : 'Choose your preferred vehicle type'
                          }
                        </p>
                      </div>

                      {/* Vehicle options would go here */}
                      <div className="text-center py-8">
                        <TruckIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Selecionaremos automaticamente o melhor veículo para o seu grupo'
                            : 'We will automatically select the best vehicle for your group'
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Personal Information */}
                  {currentStep === (bookingData.serviceType?.requiresSIA ? 6 : 5) && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Informação Pessoal' : 'Personal Information'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Precisamos dos seus dados para confirmar a reserva'
                            : 'We need your details to confirm the booking'
                          }
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isPortuguese ? 'Nome Completo' : 'Full Name'}
                          </label>
                          <input
                            type="text"
                            value={bookingData.fullName}
                            onChange={(e) => updateBookingData('fullName', e.target.value)}
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
                            {isPortuguese ? 'Email' : 'Email'}
                          </label>
                          <input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => updateBookingData('email', e.target.value)}
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
                            {isPortuguese ? 'Telefone' : 'Phone Number'}
                          </label>
                          <input
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => updateBookingData('phone', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="+44 7XXX XXX XXX"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isPortuguese ? 'Nível de Subscrição' : 'Membership Level'}
                          </label>
                          <select
                            value={bookingData.membershipTier}
                            onChange={(e) => updateBookingData('membershipTier', e.target.value as any)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="free">
                              {isPortuguese ? 'Gratuito (0% desconto)' : 'Free (0% discount)'}
                            </option>
                            <option value="core">
                              {isPortuguese ? 'Core (10% desconto)' : 'Core (10% discount)'}
                            </option>
                            <option value="premium">
                              {isPortuguese ? 'Premium (20% desconto)' : 'Premium (20% discount)'}
                            </option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 6: Payment & Confirmation */}
                  {currentStep === maxSteps && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Confirmação e Pagamento' : 'Confirmation & Payment'}
                        </h3>
                        <p className="text-gray-600">
                          {isPortuguese 
                            ? 'Revise os detalhes da sua reserva antes de finalizar'
                            : 'Review your booking details before finalizing'
                          }
                        </p>
                      </div>

                      {/* Booking Summary */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          {isPortuguese ? 'Resumo da Reserva' : 'Booking Summary'}
                        </h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              {isPortuguese ? 'Serviço:' : 'Service:'}
                            </span>
                            <span className="font-medium">
                              {isPortuguese 
                                ? bookingData.serviceType?.namePortuguese 
                                : bookingData.serviceType?.name
                              }
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              {isPortuguese ? 'Data:' : 'Date:'}
                            </span>
                            <span className="font-medium">
                              {new Date(bookingData.dateTime).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              {isPortuguese ? 'Duração:' : 'Duration:'}
                            </span>
                            <span className="font-medium">
                              {bookingData.duration} {bookingData.duration === 1 ? 
                                (isPortuguese ? 'hora' : 'hour') : 
                                (isPortuguese ? 'horas' : 'hours')
                              }
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              {isPortuguese ? 'Grupo:' : 'Group:'}
                            </span>
                            <span className="font-medium">
                              {bookingData.groupSize} {bookingData.groupSize === 1 ? 
                                (isPortuguese ? 'pessoa' : 'person') : 
                                (isPortuguese ? 'pessoas' : 'people')
                              }
                            </span>
                          </div>
                          
                          {bookingData.membershipTier !== 'free' && (
                            <div className="flex justify-between text-green-600">
                              <span>
                                {isPortuguese ? 'Desconto de Membro:' : 'Member Discount:'}
                              </span>
                              <span className="font-medium">
                                -{MEMBERSHIP_DISCOUNTS[bookingData.membershipTier]}%
                              </span>
                            </div>
                          )}
                          
                          <div className="border-t pt-3 flex justify-between text-lg font-bold">
                            <span>
                              {isPortuguese ? 'Total:' : 'Total:'}
                            </span>
                            <span>£{bookingData.totalPrice.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>

                      {/* SIA Compliance Note */}
                      {bookingData.serviceType?.requiresSIA && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <ShieldCheckIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <h5 className="font-medium text-amber-900">
                                {isPortuguese ? 'Conformidade SIA Concluída' : 'SIA Compliance Completed'}
                              </h5>
                              <p className="text-sm text-amber-700 mt-1">
                                {isPortuguese 
                                  ? 'O questionário de segurança foi preenchido e a sua reserva será revista pela nossa equipa de segurança.'
                                  : 'Security questionnaire completed and your booking will be reviewed by our security team.'
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Anterior' : 'Previous'}
                </button>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">
                    {isPortuguese ? `Passo ${currentStep} de ${maxSteps}` : `Step ${currentStep} of ${maxSteps}`}
                  </div>
                  {bookingData.totalPrice > 0 && (
                    <div className="text-xs text-gray-500">
                      {isPortuguese ? 'Total: ' : 'Total: '}£{bookingData.totalPrice.toFixed(0)}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isPortuguese ? 'Processando...' : 'Processing...'}
                    </>
                  ) : currentStep === maxSteps ? (
                    <>
                      <CreditCardIcon className="w-4 h-4 mr-2" />
                      {isPortuguese ? 'Adicionar ao Carrinho' : 'Add to Cart'}
                    </>
                  ) : (
                    <>
                      {isPortuguese ? 'Continuar' : 'Continue'}
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}