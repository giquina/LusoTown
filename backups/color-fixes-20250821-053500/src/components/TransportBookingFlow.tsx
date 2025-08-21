'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import EasySIAQuestionnaire, { EasySIAData } from './EasySIAQuestionnaire'
import TransportBookingForm from './TransportBookingForm'

interface TransportBookingFlowProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: any
  serviceTiers?: any[]
  experiencePackages?: any[]
}

type BookingStep = 'compliance' | 'details' | 'payment' | 'confirmation'

interface UserBookingData {
  fullName: string
  email: string
  phone: string
  additionalNotes: string
}

export default function TransportBookingFlow({
  isOpen,
  onClose,
  selectedService,
  serviceTiers = [],
  experiencePackages = []
}: TransportBookingFlowProps) {
  const { language, t } = useLanguage()
  const { addToCart } = useCart()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState<BookingStep>('compliance')
  const [complianceData, setComplianceData] = useState<EasySIAData | null>(null)
  const [userBookingData, setUserBookingData] = useState<UserBookingData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleComplianceComplete = (data: EasySIAData) => {
    setComplianceData(data)
    
    // Check if this requires admin review
    if (data.riskScore >= 10 || data.specialRequirements.includes('armed-protection') || data.hasKnownRisks) {
      setCurrentStep('details')
    } else {
      setCurrentStep('details')
    }
  }

  const handleBookingComplete = (userData: UserBookingData) => {
    setUserBookingData(userData)
    setCurrentStep('payment')
  }

  const handlePaymentComplete = async () => {
    if (!complianceData || !userBookingData) return

    setIsProcessing(true)

    try {
      // Calculate pricing based on service and risk assessment
      const basePrice = selectedService?.price || 75
      const riskMultiplier = complianceData.riskScore >= 15 ? 1.5 : complianceData.riskScore >= 10 ? 1.3 : 1.0
      const totalPrice = Math.round(basePrice * riskMultiplier)

      // Create booking item
      const bookingItem = {
        id: `sia-transport-${Date.now()}`,
        type: 'transport_service' as const,
        title: isPortuguese 
          ? `${selectedService?.namePortuguese || 'Serviço de Transporte & Segurança'}`
          : `${selectedService?.name || 'Transport & Security Service'}`,
        description: isPortuguese 
          ? `Serviço de proteção próxima SIA para ${complianceData.serviceType}`
          : `SIA close protection service for ${complianceData.serviceType}`,
        price: totalPrice,
        currency: 'GBP',
        imageUrl: selectedService?.image || '/transport-service.jpg',
        quantity: 1,
        transportServiceId: selectedService?.id,
        pickupDateTime: `${complianceData.serviceDate}T${complianceData.serviceTime}`,
        pickupLocation: complianceData.pickupLocation,
        dropoffLocation: complianceData.dropoffLocation || 'TBD',
        passengerCount: complianceData.passengerCount,
        bookingType: 'sia_compliance' as const,
        addedAt: new Date().toISOString(),
        metadata: {
          siaCompliance: complianceData,
          userBooking: userBookingData,
          riskAssessment: {
            level: complianceData.riskScore >= 15 ? 'high' : complianceData.riskScore >= 10 ? 'medium' : 'low',
            score: complianceData.riskScore,
            requiresReview: complianceData.riskScore >= 10 || complianceData.specialRequirements.includes('armed-protection') || complianceData.hasKnownRisks
          },
          pricing: {
            basePrice,
            riskMultiplier,
            totalPrice
          }
        }
      }

      addToCart(bookingItem)
      setBookingConfirmed(true)
      setCurrentStep('confirmation')
      
      // Auto-close after showing confirmation
      setTimeout(() => {
        onClose()
        resetFlow()
      }, 3000)
    } catch (error) {
      console.error('Booking submission error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetFlow = () => {
    setCurrentStep('compliance')
    setComplianceData(null)
    setUserBookingData(null)
    setIsProcessing(false)
    setBookingConfirmed(false)
  }

  const getRiskLevelColor = (score: number) => {
    if (score >= 15) return 'text-red-600 bg-red-50 border-red-200'
    if (score >= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getRiskLevelText = (score: number) => {
    if (score >= 15) return isPortuguese ? 'Alto Risco' : 'High Risk'
    if (score >= 10) return isPortuguese ? 'Risco Médio' : 'Medium Risk'
    return isPortuguese ? 'Baixo Risco' : 'Low Risk'
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {currentStep === 'compliance' && (
        <EasySIAQuestionnaire
          isOpen={true}
          onComplete={handleComplianceComplete}
          onCancel={onClose}
        />
      )}

      {currentStep === 'details' && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

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
                    {isPortuguese ? 'Detalhes da Reserva' : 'Booking Details'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {isPortuguese ? 'Conformidade SIA completada' : 'SIA compliance completed'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Risk Assessment Summary */}
              {complianceData && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isPortuguese ? 'Avaliação de Risco' : 'Risk Assessment'}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(complianceData.riskScore)}`}>
                      {getRiskLevelText(complianceData.riskScore)} ({complianceData.riskScore}/20)
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">
                        {isPortuguese ? 'Serviço:' : 'Service:'}
                      </span>
                      <span className="ml-2 font-medium">
                        {complianceData.serviceType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        {isPortuguese ? 'Data:' : 'Date:'}
                      </span>
                      <span className="ml-2 font-medium">
                        {new Date(complianceData.serviceDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        {isPortuguese ? 'Passageiros:' : 'Passengers:'}
                      </span>
                      <span className="ml-2 font-medium">
                        {complianceData.passengerCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        {isPortuguese ? 'Proteção:' : 'Protection:'}
                      </span>
                      <span className="ml-2 font-medium capitalize">
                        {complianceData.protectionLevel}
                      </span>
                    </div>
                  </div>

                  {(complianceData.riskScore >= 10 || complianceData.specialRequirements.includes('armed-protection') || complianceData.hasKnownRisks) && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            {isPortuguese ? 'Revisão SIA Obrigatória' : 'SIA Review Required'}
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            {isPortuguese 
                              ? 'Esta reserva será revista por um oficial SIA licenciado antes da confirmação.'
                              : 'This booking will be reviewed by a licensed SIA officer before confirmation.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Details Form */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Seus Detalhes' : 'Your Details'}
                </h3>
                
                <UserDetailsForm
                  onComplete={handleBookingComplete}
                  isPortuguese={isPortuguese}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {currentStep === 'payment' && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCardIcon className="w-8 h-8 text-secondary-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? 'Confirmar Reserva' : 'Confirm Booking'}
                </h3>
                
                {complianceData && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        {isPortuguese ? 'Serviço de Transporte SIA' : 'SIA Transport Service'}
                      </span>
                      <span className="font-bold text-lg">
                        £{Math.round((selectedService?.price || 75) * (complianceData.riskScore >= 15 ? 1.5 : complianceData.riskScore >= 10 ? 1.3 : 1.0))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        {isPortuguese ? 'Data:' : 'Date:'} {new Date(complianceData.serviceDate).toLocaleDateString()}
                      </div>
                      <div>
                        {isPortuguese ? 'Horário:' : 'Time:'} {complianceData.serviceTime}
                      </div>
                      <div>
                        {isPortuguese ? 'Recolha:' : 'Pickup:'} {complianceData.pickupLocation}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handlePaymentComplete}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-secondary-700 hover:to-accent-700 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isPortuguese ? 'Processando...' : 'Processing...'}
                      </div>
                    ) : (
                      isPortuguese ? 'Adicionar ao Carrinho' : 'Add to Cart'
                    )}
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {isPortuguese ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {currentStep === 'confirmation' && bookingConfirmed && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isPortuguese ? 'Reserva Confirmada!' : 'Booking Confirmed!'}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {isPortuguese 
                  ? 'O seu serviço SIA foi adicionado ao carrinho. Um oficial licenciado entrará em contacto para confirmar os detalhes.'
                  : 'Your SIA service has been added to cart. A licensed officer will contact you to confirm details.'
                }
              </p>

              {complianceData && (complianceData.riskScore >= 10 || complianceData.specialRequirements.includes('armed-protection') || complianceData.hasKnownRisks) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-800">
                        {isPortuguese ? 'Revisão Obrigatória' : 'Review Required'}
                      </p>
                      <p className="text-sm text-blue-700">
                        {isPortuguese 
                          ? 'Tempo estimado de revisão: 2-4 horas'
                          : 'Estimated review time: 2-4 hours'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// User Details Form Component
interface UserDetailsFormProps {
  onComplete: (data: UserBookingData) => void
  isPortuguese: boolean
}

function UserDetailsForm({ onComplete, isPortuguese }: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserBookingData>({
    fullName: '',
    email: '',
    phone: '',
    additionalNotes: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleInputChange = (field: keyof UserBookingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <UserIcon className="w-4 h-4 inline mr-2" />
          {isPortuguese ? 'Nome Completo *' : 'Full Name *'}
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
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
          {isPortuguese ? 'Email *' : 'Email *'}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
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
          {isPortuguese ? 'Telefone *' : 'Phone Number *'}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
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
          {isPortuguese ? 'Notas Adicionais' : 'Additional Notes'}
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          placeholder={isPortuguese 
            ? 'Quaisquer pedidos especiais ou informações adicionais...'
            : 'Any special requests or additional information...'
          }
        />
      </div>

      <button
        type="submit"
        className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary-700 transition-colors"
      >
        {isPortuguese ? 'Continuar para Pagamento' : 'Continue to Payment'}
      </button>
    </form>
  )
}