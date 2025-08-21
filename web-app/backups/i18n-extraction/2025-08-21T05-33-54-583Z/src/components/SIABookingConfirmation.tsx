'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
  ShareIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { SIAComplianceData } from './SIAComplianceQuestionnaire'
import { RiskAssessment } from './RiskAssessmentForm'

interface BookingConfirmationData {
  bookingId: string
  confirmationCode: string
  status: 'pending_review' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  scheduledDate: string
  estimatedDuration: string
  totalPrice: number
  currency: string
  
  // Service Details
  serviceType: string
  complianceData: SIAComplianceData
  riskAssessment?: RiskAssessment
  
  // Officer Assignment
  assignedOfficer?: {
    name: string
    licenseNumber: string
    rating: number
    specializations: string[]
    photo?: string
  }
  
  // Contact Information
  emergencyContact: string
  supportPhone: string
  
  // Additional Information
  specialInstructions?: string
  reviewNotes?: string
  conditions?: string[]
}

interface SIABookingConfirmationProps {
  bookingData: BookingConfirmationData
  isOpen: boolean
  onClose: () => void
  onPrint?: () => void
  onShare?: () => void
}

export default function SIABookingConfirmation({
  bookingData,
  isOpen,
  onClose,
  onPrint,
  onShare
}: SIABookingConfirmationProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'pending_review':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'in_progress':
        return 'text-blue-700 bg-blue-100 border-blue-300'
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'cancelled':
        return 'text-red-700 bg-red-100 border-red-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      pending_review: { en: 'Pending SIA Review', pt: 'Aguardando Revisão SIA' },
      approved: { en: 'Approved & Confirmed', pt: 'Aprovado e Confirmado' },
      in_progress: { en: 'Service in Progress', pt: 'Serviço em Progresso' },
      completed: { en: 'Service Completed', pt: 'Serviço Completo' },
      cancelled: { en: 'Cancelled', pt: 'Cancelado' }
    }
    
    return isPortuguese 
      ? statusMap[status as keyof typeof statusMap]?.pt || status
      : statusMap[status as keyof typeof statusMap]?.en || status
  }

  const getRiskLevelText = (score: number) => {
    if (score >= 15) return isPortuguese ? 'Alto Risco' : 'High Risk'
    if (score >= 10) return isPortuguese ? 'Risco Médio' : 'Medium Risk'
    return isPortuguese ? 'Baixo Risco' : 'Low Risk'
  }

  const getRiskLevelColor = (score: number) => {
    if (score >= 15) return 'text-red-600 bg-red-50 border-red-200'
    if (score >= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
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
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-600 via-accent-600 to-primary-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isPortuguese ? 'Confirmação de Reserva SIA' : 'SIA Booking Confirmation'}
                    </h2>
                    <p className="text-secondary-100">
                      {isPortuguese ? 'Serviço de Proteção Próxima Profissional' : 'Professional Close Protection Service'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span>{isPortuguese ? 'ID da Reserva:' : 'Booking ID:'} <strong>{bookingData.bookingId}</strong></span>
                      <span>{isPortuguese ? 'Código:' : 'Code:'} <strong>{bookingData.confirmationCode}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {onPrint && (
                    <button
                      onClick={onPrint}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <PrinterIcon className="w-5 h-5" />
                    </button>
                  )}
                  {onShare && (
                    <button
                      onClick={onShare}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            <div className={`px-6 py-4 border-b border-gray-200 ${getStatusColor(bookingData.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {getStatusText(bookingData.status)}
                    </h3>
                    {bookingData.status === 'pending_review' && (
                      <p className="text-sm mt-1">
                        {isPortuguese 
                          ? 'Um oficial SIA licenciado irá rever a sua reserva dentro de 2-4 horas'
                          : 'A licensed SIA officer will review your booking within 2-4 hours'
                        }
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">
                    {isPortuguese ? 'Criado:' : 'Created:'}
                  </div>
                  <div>{new Date(bookingData.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Service Details */}
                <div className="space-y-6">
                  {/* Service Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DocumentTextIcon className="w-5 h-5 mr-2 text-secondary-600" />
                      {isPortuguese ? 'Detalhes do Serviço' : 'Service Details'}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Tipo de Serviço:' : 'Service Type:'}</span>
                        <span className="font-medium">{bookingData.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Data Agendada:' : 'Scheduled Date:'}</span>
                        <span className="font-medium">{new Date(bookingData.scheduledDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Duração Estimada:' : 'Estimated Duration:'}</span>
                        <span className="font-medium">{bookingData.estimatedDuration}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-gray-600 font-medium">{isPortuguese ? 'Preço Total:' : 'Total Price:'}</span>
                        <span className="font-bold text-lg text-secondary-600">
                          {bookingData.currency} £{bookingData.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-secondary-600" />
                      {isPortuguese ? 'Localizações' : 'Locations'}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 text-sm">{isPortuguese ? 'Recolha:' : 'Pickup:'}</span>
                        <p className="font-medium">{bookingData.complianceData.pickupLocation}</p>
                      </div>
                      {bookingData.complianceData.dropoffLocation && (
                        <div>
                          <span className="text-gray-600 text-sm">{isPortuguese ? 'Destino:' : 'Destination:'}</span>
                          <p className="font-medium">{bookingData.complianceData.dropoffLocation}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600 text-sm">{isPortuguese ? 'Passageiros:' : 'Passengers:'}</span>
                        <p className="font-medium">{bookingData.complianceData.passengerCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-secondary-600" />
                      {isPortuguese ? 'Avaliação de Risco' : 'Risk Assessment'}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Nível de Risco:' : 'Risk Level:'}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(bookingData.complianceData.riskScore)}`}>
                          {getRiskLevelText(bookingData.complianceData.riskScore)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Pontuação:' : 'Score:'}</span>
                        <span className="font-medium">{bookingData.complianceData.riskScore}/20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isPortuguese ? 'Nível de Ameaça:' : 'Threat Level:'}</span>
                        <span className="font-medium capitalize">{bookingData.complianceData.threatLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Officer & Contact */}
                <div className="space-y-6">
                  {/* Assigned Officer */}
                  {bookingData.assignedOfficer ? (
                    <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <ShieldCheckIcon className="w-5 h-5 mr-2 text-secondary-600" />
                        {isPortuguese ? 'Oficial Designado' : 'Assigned Officer'}
                      </h4>
                      <div className="flex items-start space-x-4">
                        {bookingData.assignedOfficer.photo ? (
                          <img 
                            src={bookingData.assignedOfficer.photo} 
                            alt={bookingData.assignedOfficer.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-secondary-300"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center">
                            <ShieldCheckIcon className="w-8 h-8 text-secondary-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{bookingData.assignedOfficer.name}</h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {isPortuguese ? 'Licença SIA:' : 'SIA License:'} {bookingData.assignedOfficer.licenseNumber}
                          </p>
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon 
                                key={star} 
                                className={`w-4 h-4 ${
                                  star <= bookingData.assignedOfficer!.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              ({bookingData.assignedOfficer.rating}/5)
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {bookingData.assignedOfficer.specializations.map((spec, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">
                            {isPortuguese ? 'Oficial em Designação' : 'Officer Assignment Pending'}
                          </h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            {isPortuguese 
                              ? 'Um oficial SIA qualificado será designado após a revisão da reserva'
                              : 'A qualified SIA officer will be assigned after booking review'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <PhoneIcon className="w-5 h-5 mr-2 text-secondary-600" />
                      {isPortuguese ? 'Informações de Contacto' : 'Contact Information'}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <PhoneIcon className="w-4 h-4" />
                          <span>{isPortuguese ? 'Linha de Apoio 24/7:' : '24/7 Support Line:'}</span>
                        </div>
                        <a href={`tel:${bookingData.supportPhone}`} className="font-medium text-secondary-600 hover:text-secondary-700">
                          {bookingData.supportPhone}
                        </a>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <PhoneIcon className="w-4 h-4" />
                          <span>{isPortuguese ? 'Contacto de Emergência:' : 'Emergency Contact:'}</span>
                        </div>
                        <p className="font-medium">{bookingData.emergencyContact}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <EnvelopeIcon className="w-4 h-4" />
                          <span>{isPortuguese ? 'Email de Apoio:' : 'Support Email:'}</span>
                        </div>
                        <a href="mailto:sia@lusotown.com" className="font-medium text-secondary-600 hover:text-secondary-700">
                          sia@lusotown.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Special Conditions */}
                  {bookingData.conditions && bookingData.conditions.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                        {isPortuguese ? 'Condições Especiais' : 'Special Conditions'}
                      </h4>
                      <ul className="space-y-2">
                        {bookingData.conditions.map((condition, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-blue-800">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-4 border border-secondary-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CalendarDaysIcon className="w-5 h-5 mr-2 text-secondary-600" />
                      {isPortuguese ? 'Próximos Passos' : 'Next Steps'}
                    </h4>
                    <div className="space-y-3 text-sm">
                      {bookingData.status === 'pending_review' ? (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-secondary-600 rounded-full mt-1.5" />
                            <span>
                              {isPortuguese 
                                ? 'Aguardar revisão SIA (2-4 horas)'
                                : 'Await SIA review (2-4 hours)'
                              }
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5" />
                            <span>
                              {isPortuguese 
                                ? 'Designação e contacto do oficial'
                                : 'Officer assignment and contact'
                              }
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5" />
                            <span>
                              {isPortuguese 
                                ? 'Briefing pré-serviço (24 horas antes)'
                                : 'Pre-service briefing (24 hours before)'
                              }
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5" />
                            <span>
                              {isPortuguese 
                                ? 'Reserva aprovada e confirmada'
                                : 'Booking approved and confirmed'
                              }
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-secondary-600 rounded-full mt-1.5" />
                            <span>
                              {isPortuguese 
                                ? 'Briefing pré-serviço agendado'
                                : 'Pre-service briefing scheduled'
                              }
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  {isPortuguese ? 'Documento gerado em:' : 'Document generated at:'} {currentTime.toLocaleString()}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs">
                    {isPortuguese ? 'Todos os direitos reservados' : 'All rights reserved'} • LusoTown SIA Services
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}