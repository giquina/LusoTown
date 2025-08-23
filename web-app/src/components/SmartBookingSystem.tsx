'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SparklesIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import IntelligentBookingFlow, { type ServiceType, type BookingData } from './IntelligentBookingFlow'
import PaymentProcessor from './PaymentProcessor'
import EasySIAQuestionnaire, { type EasySIAData } from './EasySIAQuestionnaire'
import { dynamicPricingEngine, type PricingResult, type DynamicPricingOptions } from '@/lib/dynamicPricing'
import SubscriptionGate from './SubscriptionGate'

export interface BookingFlowStep {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ElementType
  isCompleted: boolean
  isActive: boolean
  requiresSubscription?: boolean
}

interface SmartBookingSystemProps {
  isOpen: boolean
  onClose: () => void
  preSelectedService?: ServiceType
  triggerText?: string
  triggerTextPortuguese?: string
}

type BookingStage = 'service-selection' | 'sia-compliance' | 'booking-details' | 'payment' | 'confirmation' | 'subscription-required'

export default function SmartBookingSystem({
  isOpen,
  onClose,
  preSelectedService,
  triggerText,
  triggerTextPortuguese
}: SmartBookingSystemProps) {
  const { language } = useLanguage()
  const { addToCart } = useCart()
  const isPortuguese = language === 'pt'
  
  const [currentStage, setCurrentStage] = useState<BookingStage>('service-selection')
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [siaData, setSiaData] = useState<EasySIAData | null>(null)
  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [completedBookingId, setCompletedBookingId] = useState<string | null>(null)

  // Check subscription requirement for transport services
  const requiresSubscription = bookingData?.serviceType?.id === 'airport-transfers' || 
                              bookingData?.serviceType?.id === 'vip-protection' ||
                              bookingData?.serviceType?.category === 'enhanced'

  // Booking flow steps configuration
  const getBookingSteps = (): BookingFlowStep[] => {
    const steps: BookingFlowStep[] = [
      {
        id: 'service',
        title: 'Service Selection',
        titlePortuguese: 'Seleção de Serviço',
        description: 'Choose your premium Portuguese-speaking community service',
        descriptionPortuguese: 'Escolha o seu serviço premium da comunidade de falantes de português',
        icon: SparklesIcon,
        isCompleted: !!bookingData?.serviceType,
        isActive: currentStage === 'service-selection'
      }
    ]

    if (bookingData?.serviceType?.requiresSIA) {
      steps.push({
        id: 'compliance',
        title: 'Security Compliance',
        titlePortuguese: 'Conformidade de Segurança',
        description: 'SIA compliance questionnaire for enhanced security services',
        descriptionPortuguese: 'Questionário de conformidade SIA para serviços de segurança',
        icon: ShieldCheckIcon,
        isCompleted: !!siaData,
        isActive: currentStage === 'sia-compliance',
        requiresSubscription: true
      })
    }

    steps.push(
      {
        id: 'booking',
        title: 'Booking Details',
        titlePortuguese: 'Detalhes da Reserva',
        description: 'Complete your booking information and preferences',
        descriptionPortuguese: 'Complete as informações e preferências da sua reserva',
        icon: ClockIcon,
        isCompleted: !!bookingData && !!bookingData.dateTime && !!bookingData.fullName,
        isActive: currentStage === 'booking-details'
      },
      {
        id: 'payment',
        title: 'Payment & Confirmation',
        titlePortuguese: 'Pagamento e Confirmação',
        description: 'Secure payment processing with 135+ currency support',
        descriptionPortuguese: 'Processamento seguro com suporte a 135+ moedas',
        icon: CreditCardIcon,
        isCompleted: !!completedBookingId,
        isActive: currentStage === 'payment',
        requiresSubscription: requiresSubscription
      }
    )

    return steps
  }

  const bookingSteps = getBookingSteps()

  // Auto-advance flow logic
  useEffect(() => {
    if (bookingData?.serviceType && currentStage === 'service-selection') {
      if (bookingData.serviceType.requiresSIA) {
        setCurrentStage('sia-compliance')
      } else {
        setCurrentStage('booking-details')
      }
    }
  }, [bookingData?.serviceType, currentStage])

  // Calculate pricing when booking data is complete
  useEffect(() => {
    if (bookingData && bookingData.serviceType && bookingData.dateTime && bookingData.duration) {
      calculatePricing()
    }
  }, [bookingData])

  const calculatePricing = async () => {
    if (!bookingData || !bookingData.serviceType) return

    setIsProcessing(true)
    try {
      const pricingOptions: DynamicPricingOptions = {
        serviceId: bookingData.serviceType.id,
        serviceType: bookingData.serviceType.category,
        datetime: bookingData.dateTime,
        duration: bookingData.duration,
        groupSize: bookingData.groupSize,
        membershipTier: bookingData.membershipTier,
        requiresSIA: bookingData.serviceType.requiresSIA,
        vehiclePreference: bookingData.vehiclePreference as any
      }

      const pricing = await dynamicPricingEngine.calculatePrice(pricingOptions)
      setPricingResult(pricing)
    } catch (error) {
      console.error('Pricing calculation error:', error)
      setError(isPortuguese ? 'Erro no cálculo de preços' : 'Pricing calculation error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleServiceSelection = (selectedBookingData: BookingData) => {
    setBookingData(selectedBookingData)
    setError(null)
    
    // Automatic flow advancement
    if (selectedBookingData.serviceType?.requiresSIA) {
      setCurrentStage('sia-compliance')
    } else {
      setCurrentStage('booking-details')
    }
  }

  const handleSIACompletion = (completedSiaData: EasySIAData) => {
    setSiaData(completedSiaData)
    setCurrentStage('booking-details')
  }

  const handleBookingCompletion = (finalBookingData: BookingData) => {
    setBookingData(finalBookingData)
    
    // Check subscription requirement before payment
    if (requiresSubscription) {
      setCurrentStage('subscription-required')
    } else {
      setCurrentStage('payment')
    }
  }

  const handlePaymentSuccess = (paymentData: any) => {
    const bookingId = `LT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    setCompletedBookingId(bookingId)
    setCurrentStage('confirmation')

    // Add to cart with complete metadata
    if (bookingData && pricingResult) {
      const cartItem = {
        type: 'transport_service' as const,
        title: isPortuguese 
          ? bookingData.serviceType!.namePortuguese
          : bookingData.serviceType!.name,
        description: isPortuguese
          ? `Reserva confirmada - ${bookingId}`
          : `Confirmed booking - ${bookingId}`,
        price: pricingResult.totalPrice,
        currency: pricingResult.currency,
        imageUrl: '/transport-service-premium.jpg',
        quantity: 1,
        transportServiceId: bookingData.serviceType!.id,
        pickupDateTime: bookingData.dateTime,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        hours: bookingData.duration,
        bookingType: bookingData.duration >= 8 ? 'day_rate' : 'hourly' as const,
        passengerCount: bookingData.groupSize,
        pricingBreakdown: pricingResult,
        addedAt: new Date().toISOString(),
        metadata: {
          bookingId,
          bookingDetails: bookingData,
          siaCompliance: siaData,
          paymentDetails: paymentData,
          serviceCategory: bookingData.serviceType!.category,
          requiresSIA: bookingData.serviceType!.requiresSIA,
          pricingBreakdown: pricingResult.breakdown
        }
      }
      
      addToCart(cartItem)
    }
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const resetBookingFlow = () => {
    setCurrentStage('service-selection')
    setBookingData(null)
    setSiaData(null)
    setPricingResult(null)
    setError(null)
    setCompletedBookingId(null)
  }

  const handleClose = () => {
    resetBookingFlow()
    onClose()
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Main Container */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with Progress */}
            <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {isPortuguese ? 'Sistema de Reserva Inteligente' : 'Smart Booking System'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {isPortuguese 
                      ? 'Fluxo automatizado baseado no tipo de serviço selecionado'
                      : 'Automated flow based on your selected service type'
                    }
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CheckCircleIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {bookingSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={step.id} className="flex items-center space-x-4 flex-shrink-0">
                      <div className={`
                        flex items-center space-x-3 px-4 py-2 rounded-lg transition-all
                        ${step.isActive 
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary-300' 
                          : step.isCompleted 
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                        }
                      `}>
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${step.isCompleted ? 'bg-green-500 text-white' : 'bg-white'}
                        `}>
                          {step.isCompleted ? (
                            <CheckCircleIcon className="w-5 h-5" />
                          ) : (
                            <IconComponent className={`w-5 h-5 ${step.isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {isPortuguese ? step.titlePortuguese : step.title}
                          </div>
                          {step.requiresSubscription && (
                            <div className="text-xs text-amber-600">
                              {isPortuguese ? 'Subscrição necessária' : 'Subscription required'}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {index < bookingSteps.length - 1 && (
                        <ArrowRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Dynamic Status */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {bookingData?.serviceType && (
                    <span>
                      {isPortuguese ? 'Serviço: ' : 'Service: '}
                      <span className="font-medium">
                        {isPortuguese ? bookingData.serviceType.namePortuguese : bookingData.serviceType.name}
                      </span>
                    </span>
                  )}
                </div>
                
                {pricingResult && (
                  <div className="text-sm">
                    <span className="text-gray-600">
                      {isPortuguese ? 'Total: ' : 'Total: '}
                    </span>
                    <span className="font-bold text-lg text-primary-600">
                      £{pricingResult.totalPrice.toFixed(0)}
                    </span>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                    <span>{isPortuguese ? 'Processando...' : 'Processing...'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {/* Subscription Gate */}
                {currentStage === 'subscription-required' && (
                  <motion.div
                    key="subscription"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <SubscriptionGate mode="transport">
                      <div className="text-center py-8">
                        <ShieldCheckIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Acesso Concedido!' : 'Access Granted!'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {isPortuguese 
                            ? 'Pode agora prosseguir com o pagamento do seu serviço premium.'
                            : 'You can now proceed with payment for your premium service.'
                          }
                        </p>
                        <button
                          onClick={() => setCurrentStage('payment')}
                          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          {isPortuguese ? 'Continuar para Pagamento' : 'Continue to Payment'}
                        </button>
                      </div>
                    </SubscriptionGate>
                  </motion.div>
                )}

                {/* Service Selection Stage */}
                {currentStage === 'service-selection' && (
                  <IntelligentBookingFlow
                    isOpen={true}
                    onClose={handleClose}
                    preSelectedService={preSelectedService}
                    onComplete={handleServiceSelection}
                  />
                )}

                {/* SIA Compliance Stage */}
                {currentStage === 'sia-compliance' && (
                  <EasySIAQuestionnaire
                    isOpen={true}
                    onComplete={handleSIACompletion}
                    onCancel={() => setCurrentStage('service-selection')}
                  />
                )}

                {/* Payment Stage */}
                {currentStage === 'payment' && bookingData && pricingResult && (
                  <PaymentProcessor
                    isOpen={true}
                    onClose={handleClose}
                    bookingData={bookingData}
                    pricingResult={pricingResult}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                )}

                {/* Confirmation Stage */}
                {currentStage === 'confirmation' && completedBookingId && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-8 text-center"
                  >
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Reserva Confirmada!' : 'Booking Confirmed!'}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {isPortuguese 
                        ? 'A sua reserva foi processada com sucesso.'
                        : 'Your booking has been processed successfully.'
                      }
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {isPortuguese ? 'ID da Reserva:' : 'Booking ID:'}
                          </span>
                          <span className="font-mono font-bold">{completedBookingId}</span>
                        </div>
                        
                        {bookingData && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {isPortuguese ? 'Serviço:' : 'Service:'}
                              </span>
                              <span className="font-medium">
                                {isPortuguese ? bookingData.serviceType?.namePortuguese : bookingData.serviceType?.name}
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
                          </>
                        )}
                        
                        {pricingResult && (
                          <div className="flex justify-between border-t pt-3">
                            <span className="text-gray-600">
                              {isPortuguese ? 'Total Pago:' : 'Total Paid:'}
                            </span>
                            <span className="font-bold text-lg">
                              £{pricingResult.totalPrice.toFixed(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-6">
                      {isPortuguese 
                        ? 'Receberá um email de confirmação em breve com todos os detalhes.'
                        : 'You will receive a confirmation email shortly with all details.'
                      }
                    </div>

                    <div className="space-x-4">
                      <button
                        onClick={handleClose}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        {isPortuguese ? 'Continuar Navegação' : 'Continue Browsing'}
                      </button>
                      
                      <button
                        onClick={resetBookingFlow}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        {isPortuguese ? 'Nova Reserva' : 'New Booking'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}