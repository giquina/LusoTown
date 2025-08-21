'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export interface SIAComplianceData {
  // Step 1: Service Purpose & Basic Details
  servicePurpose: string
  customServicePurpose?: string
  serviceDate: string
  serviceTime: string
  pickupLocation: string
  dropoffLocation: string
  passengerCount: number
  
  // Step 2: Risk Assessment & Threat Analysis
  knownRisks: boolean
  riskDetails?: string
  threatLevel: 'low' | 'medium' | 'high' | 'unknown'
  publicEvent: boolean
  mediaAttention: boolean
  previousIncidents: boolean
  incidentDetails?: string
  
  // Step 3: Special Requirements & Protocols
  medicalRequirements: boolean
  medicalDetails?: string
  accessibilityNeeds: boolean
  accessibilityDetails?: string
  vipProtocols: boolean
  protocolDetails?: string
  armedProtection: boolean
  armedJustification?: string
  
  // Step 4: Confidentiality & Legal Compliance
  thirdPartyAwareness: string[]
  customThirdParty?: string
  previousSecurityExperience: boolean
  experienceDetails?: string
  confidentialityAgreement: boolean
  dataProcessingConsent: boolean
  emergencyContact: string
  emergencyPhone: string
  
  // Risk Assessment
  riskScore: number
  adminNotes?: string
}

interface SIAComplianceQuestionnaireProps {
  onComplete: (data: SIAComplianceData) => void
  onCancel: () => void
  isOpen: boolean
}

const servicePurposeOptions = [
  { value: 'tour', labelEn: 'London Tourism Tour', labelPt: 'Tour Turístico de Londres' },
  { value: 'event-escort', labelEn: 'Event Escort Service', labelPt: 'Serviço de Escolta para Evento' },
  { value: 'nightlife', labelEn: 'Nightlife Protection', labelPt: 'Proteção Vida Noturna' },
  { value: 'airport-transfer', labelEn: 'Airport VIP Transfer', labelPt: 'Transferência VIP Aeroporto' },
  { value: 'personal-protection', labelEn: 'Personal Protection Detail', labelPt: 'Proteção Pessoal' },
  { value: 'business-meeting', labelEn: 'Business Meeting Security', labelPt: 'Segurança Reunião de Negócios' },
  { value: 'shopping', labelEn: 'Shopping Protection', labelPt: 'Proteção para Compras' },
  { value: 'diplomatic', labelEn: 'Diplomatic Protection', labelPt: 'Proteção Diplomática' },
  { value: 'family', labelEn: 'Family Protection', labelPt: 'Proteção Familiar' },
  { value: 'other', labelEn: 'Other (Please specify)', labelPt: 'Outro (Por favor especifique)' }
]

const thirdPartyOptions = [
  { value: 'press', labelEn: 'Press/Media', labelPt: 'Imprensa/Media' },
  { value: 'police', labelEn: 'Police/Security Forces', labelPt: 'Polícia/Forças de Segurança' },
  { value: 'venue-security', labelEn: 'Venue Security', labelPt: 'Segurança do Local' },
  { value: 'diplomatic', labelEn: 'Diplomatic Personnel', labelPt: 'Pessoal Diplomático' },
  { value: 'business-partners', labelEn: 'Business Partners', labelPt: 'Parceiros de Negócios' },
  { value: 'family', labelEn: 'Family Members', labelPt: 'Membros da Família' },
  { value: 'none', labelEn: 'None', labelPt: 'Nenhum' },
  { value: 'other', labelEn: 'Other (Please specify)', labelPt: 'Outro (Por favor especifique)' }
]

export default function SIAComplianceQuestionnaire({ 
  onComplete, 
  onCancel, 
  isOpen 
}: SIAComplianceQuestionnaireProps) {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SIAComplianceData>({
    servicePurpose: '',
    serviceDate: '',
    serviceTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengerCount: 1,
    knownRisks: false,
    threatLevel: 'unknown',
    publicEvent: false,
    mediaAttention: false,
    previousIncidents: false,
    medicalRequirements: false,
    accessibilityNeeds: false,
    vipProtocols: false,
    armedProtection: false,
    thirdPartyAwareness: [],
    previousSecurityExperience: false,
    confidentialityAgreement: false,
    dataProcessingConsent: false,
    emergencyContact: '',
    emergencyPhone: '',
    riskScore: 0
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const calculateRiskScore = (data: SIAComplianceData): number => {
    let score = 0
    
    // Base score by service purpose
    const riskByPurpose: Record<string, number> = {
      'tour': 1,
      'shopping': 1,
      'airport-transfer': 2,
      'event-escort': 3,
      'business-meeting': 3,
      'family': 2,
      'nightlife': 4,
      'personal-protection': 5,
      'diplomatic': 6,
      'other': 3
    }
    
    score += riskByPurpose[data.servicePurpose] || 3
    
    // Risk factors
    if (data.knownRisks) score += 3
    if (data.publicEvent) score += 2
    if (data.mediaAttention) score += 3
    if (data.previousIncidents) score += 4
    if (data.armedProtection) score += 5
    
    // Threat level
    const threatMultiplier = {
      'low': 1,
      'medium': 2,
      'high': 4,
      'unknown': 2
    }
    
    score *= threatMultiplier[data.threatLevel]
    
    return Math.min(score, 20) // Cap at 20
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.servicePurpose) {
        newErrors.servicePurpose = isPortuguese ? 'Propósito do serviço é obrigatório' : 'Service purpose is required'
      }
      if (formData.servicePurpose === 'other' && !formData.customServicePurpose?.trim()) {
        newErrors.customServicePurpose = isPortuguese ? 'Por favor especifique o propósito' : 'Please specify the purpose'
      }
      if (!formData.serviceDate) {
        newErrors.serviceDate = isPortuguese ? 'Data do serviço é obrigatória' : 'Service date is required'
      }
      if (!formData.serviceTime) {
        newErrors.serviceTime = isPortuguese ? 'Hora do serviço é obrigatória' : 'Service time is required'
      }
      if (!formData.pickupLocation.trim()) {
        newErrors.pickupLocation = isPortuguese ? 'Local de recolha é obrigatório' : 'Pickup location is required'
      }
      if (formData.passengerCount < 1) {
        newErrors.passengerCount = isPortuguese ? 'Número de passageiros inválido' : 'Invalid passenger count'
      }
    }

    if (step === 2) {
      if (formData.knownRisks && !formData.riskDetails?.trim()) {
        newErrors.riskDetails = isPortuguese ? 'Por favor descreva os riscos conhecidos' : 'Please describe known risks'
      }
      if (formData.previousIncidents && !formData.incidentDetails?.trim()) {
        newErrors.incidentDetails = isPortuguese ? 'Por favor descreva incidentes anteriores' : 'Please describe previous incidents'
      }
    }

    if (step === 3) {
      if (formData.medicalRequirements && !formData.medicalDetails?.trim()) {
        newErrors.medicalDetails = isPortuguese ? 'Por favor descreva requisitos médicos' : 'Please describe medical requirements'
      }
      if (formData.accessibilityNeeds && !formData.accessibilityDetails?.trim()) {
        newErrors.accessibilityDetails = isPortuguese ? 'Por favor descreva necessidades de acessibilidade' : 'Please describe accessibility needs'
      }
      if (formData.vipProtocols && !formData.protocolDetails?.trim()) {
        newErrors.protocolDetails = isPortuguese ? 'Por favor descreva protocolos VIP' : 'Please describe VIP protocols'
      }
      if (formData.armedProtection && !formData.armedJustification?.trim()) {
        newErrors.armedJustification = isPortuguese ? 'Justificação para proteção armada é obrigatória' : 'Armed protection justification is required'
      }
    }

    if (step === 4) {
      if (formData.thirdPartyAwareness.length === 0) {
        newErrors.thirdPartyAwareness = isPortuguese ? 'Por favor selecione terceiros relevantes' : 'Please select relevant third parties'
      }
      if (formData.thirdPartyAwareness.includes('other') && !formData.customThirdParty?.trim()) {
        newErrors.customThirdParty = isPortuguese ? 'Por favor especifique outros terceiros' : 'Please specify other third parties'
      }
      if (formData.previousSecurityExperience && !formData.experienceDetails?.trim()) {
        newErrors.experienceDetails = isPortuguese ? 'Por favor descreva experiência anterior' : 'Please describe previous experience'
      }
      if (!formData.confidentialityAgreement) {
        newErrors.confidentialityAgreement = isPortuguese ? 'Acordo de confidencialidade é obrigatório' : 'Confidentiality agreement is required'
      }
      if (!formData.dataProcessingConsent) {
        newErrors.dataProcessingConsent = isPortuguese ? 'Consentimento de processamento de dados é obrigatório' : 'Data processing consent is required'
      }
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = isPortuguese ? 'Contacto de emergência é obrigatório' : 'Emergency contact is required'
      }
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = isPortuguese ? 'Telefone de emergência é obrigatório' : 'Emergency phone is required'
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

  const handleInputChange = (field: keyof SIAComplianceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleThirdPartyChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      thirdPartyAwareness: checked 
        ? [...prev.thirdPartyAwareness, value]
        : prev.thirdPartyAwareness.filter(item => item !== value)
    }))
  }

  const handleComplete = () => {
    if (validateStep(4)) {
      const riskScore = calculateRiskScore(formData)
      const completeData = { ...formData, riskScore }
      onComplete(completeData)
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onCancel}
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-t-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isPortuguese ? 'Questionário de Conformidade SIA' : 'SIA Compliance Questionnaire'}
                  </h2>
                  <p className="text-sm text-secondary-600">
                    {isPortuguese 
                      ? 'Obrigatório para todos os serviços de proteção próxima no Reino Unido'
                      : 'Required for all close protection services in the UK'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-700">
                  {isPortuguese ? `Passo ${currentStep} de 4` : `Step ${currentStep} of 4`}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / 4) * 100)}% {isPortuguese ? 'Completo' : 'Complete'}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{isPortuguese ? 'Detalhes Básicos' : 'Basic Details'}</span>
                <span>{isPortuguese ? 'Avaliação de Risco' : 'Risk Assessment'}</span>
                <span>{isPortuguese ? 'Requisitos Especiais' : 'Special Requirements'}</span>
                <span>{isPortuguese ? 'Conformidade Legal' : 'Legal Compliance'}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Step 1: Service Purpose & Basic Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? 'Propósito do Serviço & Detalhes Básicos' : 'Service Purpose & Basic Details'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese 
                        ? 'Forneça informações básicas sobre o serviço de proteção solicitado'
                        : 'Provide basic information about the requested protection service'
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Propósito do Serviço *' : 'Service Purpose *'}
                      </label>
                      <select
                        value={formData.servicePurpose}
                        onChange={(e) => handleInputChange('servicePurpose', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                          errors.servicePurpose ? 'border-coral-500' : 'border-secondary-300'
                        }`}
                      >
                        <option value="">
                          {isPortuguese ? 'Selecione o propósito do serviço' : 'Select service purpose'}
                        </option>
                        {servicePurposeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {isPortuguese ? option.labelPt : option.labelEn}
                          </option>
                        ))}
                      </select>
                      {errors.servicePurpose && (
                        <p className="text-coral-500 text-sm mt-1">{errors.servicePurpose}</p>
                      )}
                    </div>

                    {formData.servicePurpose === 'other' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          {isPortuguese ? 'Especifique o Propósito *' : 'Specify Purpose *'}
                        </label>
                        <input
                          type="text"
                          value={formData.customServicePurpose || ''}
                          onChange={(e) => handleInputChange('customServicePurpose', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.customServicePurpose ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese ? 'Descreva o propósito específico...' : 'Describe specific purpose...'}
                        />
                        {errors.customServicePurpose && (
                          <p className="text-coral-500 text-sm mt-1">{errors.customServicePurpose}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <ClockIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Data do Serviço *' : 'Service Date *'}
                      </label>
                      <input
                        type="date"
                        value={formData.serviceDate}
                        onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                          errors.serviceDate ? 'border-coral-500' : 'border-secondary-300'
                        }`}
                      />
                      {errors.serviceDate && (
                        <p className="text-coral-500 text-sm mt-1">{errors.serviceDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <ClockIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Hora do Serviço *' : 'Service Time *'}
                      </label>
                      <input
                        type="time"
                        value={formData.serviceTime}
                        onChange={(e) => handleInputChange('serviceTime', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                          errors.serviceTime ? 'border-coral-500' : 'border-secondary-300'
                        }`}
                      />
                      {errors.serviceTime && (
                        <p className="text-coral-500 text-sm mt-1">{errors.serviceTime}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <MapPinIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Local de Recolha *' : 'Pickup Location *'}
                      </label>
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                          errors.pickupLocation ? 'border-coral-500' : 'border-secondary-300'
                        }`}
                        placeholder={isPortuguese ? 'Hotel, aeroporto, endereço...' : 'Hotel, airport, address...'}
                      />
                      {errors.pickupLocation && (
                        <p className="text-coral-500 text-sm mt-1">{errors.pickupLocation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <MapPinIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Local de Destino' : 'Drop-off Location'}
                      </label>
                      <input
                        type="text"
                        value={formData.dropoffLocation}
                        onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        placeholder={isPortuguese ? 'Destino final ou múltiplos destinos...' : 'Final destination or multiple stops...'}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <UserGroupIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese ? 'Número de Passageiros/Clientes *' : 'Number of Passengers/Clients *'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.passengerCount}
                        onChange={(e) => handleInputChange('passengerCount', parseInt(e.target.value))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                          errors.passengerCount ? 'border-coral-500' : 'border-secondary-300'
                        }`}
                      />
                      {errors.passengerCount && (
                        <p className="text-coral-500 text-sm mt-1">{errors.passengerCount}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Risk Assessment & Threat Analysis */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? 'Avaliação de Risco & Análise de Ameaças' : 'Risk Assessment & Threat Analysis'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese 
                        ? 'Ajude-nos a avaliar os riscos potenciais para o seu serviço'
                        : 'Help us assess potential risks for your service'
                      }
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Known Risks */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.knownRisks}
                              onChange={(e) => handleInputChange('knownRisks', e.target.checked)}
                              className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                            />
                            <span className="font-medium text-gray-900">
                              {isPortuguese ? 'Existem riscos ou ameaças conhecidos?' : 'Are there any known risks or threats?'}
                            </span>
                          </label>
                          {formData.knownRisks && (
                            <div className="mt-3">
                              <textarea
                                value={formData.riskDetails || ''}
                                onChange={(e) => handleInputChange('riskDetails', e.target.value)}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                                  errors.riskDetails ? 'border-coral-500' : 'border-secondary-300'
                                }`}
                                placeholder={isPortuguese 
                                  ? 'Descreva quaisquer riscos conhecidos, ameaças ou preocupações...'
                                  : 'Describe any known risks, threats, or concerns...'
                                }
                              />
                              {errors.riskDetails && (
                                <p className="text-coral-500 text-sm mt-1">{errors.riskDetails}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Threat Level */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-3">
                        {isPortuguese ? 'Nível de Ameaça Percebido' : 'Perceived Threat Level'}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'low', labelEn: 'Low', labelPt: 'Baixo', color: 'green' },
                          { value: 'medium', labelEn: 'Medium', labelPt: 'Médio', color: 'yellow' },
                          { value: 'high', labelEn: 'High', labelPt: 'Alto', color: 'red' },
                          { value: 'unknown', labelEn: 'Unknown', labelPt: 'Desconhecido', color: 'gray' }
                        ].map((level) => (
                          <label key={level.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="threatLevel"
                              value={level.value}
                              checked={formData.threatLevel === level.value}
                              onChange={(e) => handleInputChange('threatLevel', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`p-3 border-2 rounded-lg text-center transition-all ${
                              formData.threatLevel === level.value
                                ? `border-${level.color}-500 bg-${level.color}-50 text-${level.color}-700`
                                : 'border-gray-200 bg-white text-secondary-600 hover:border-secondary-300'
                            }`}>
                              <div className="font-medium">
                                {isPortuguese ? level.labelPt : level.labelEn}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Public Event */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.publicEvent}
                        onChange={(e) => handleInputChange('publicEvent', e.target.checked)}
                        className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                      />
                      <label className="text-sm font-medium text-secondary-700">
                        {isPortuguese 
                          ? 'Este serviço envolve um evento público ou local com grande movimento?'
                          : 'Does this service involve a public event or high-traffic location?'
                        }
                      </label>
                    </div>

                    {/* Media Attention */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.mediaAttention}
                        onChange={(e) => handleInputChange('mediaAttention', e.target.checked)}
                        className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                      />
                      <label className="text-sm font-medium text-secondary-700">
                        {isPortuguese 
                          ? 'Espera-se atenção da imprensa ou media?'
                          : 'Is press or media attention expected?'
                        }
                      </label>
                    </div>

                    {/* Previous Incidents */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={formData.previousIncidents}
                          onChange={(e) => handleInputChange('previousIncidents', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                        />
                        <label className="text-sm font-medium text-secondary-700">
                          {isPortuguese 
                            ? 'Houve incidentes de segurança anteriores?'
                            : 'Have there been any previous security incidents?'
                          }
                        </label>
                      </div>
                      {formData.previousIncidents && (
                        <textarea
                          value={formData.incidentDetails || ''}
                          onChange={(e) => handleInputChange('incidentDetails', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.incidentDetails ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese 
                            ? 'Descreva quaisquer incidentes de segurança anteriores...'
                            : 'Describe any previous security incidents...'
                          }
                        />
                      )}
                      {errors.incidentDetails && (
                        <p className="text-coral-500 text-sm mt-1">{errors.incidentDetails}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Special Requirements & Protocols */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? 'Requisitos Especiais & Protocolos' : 'Special Requirements & Protocols'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese 
                        ? 'Especifique quaisquer requisitos especiais para o seu serviço'
                        : 'Specify any special requirements for your service'
                      }
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Medical Requirements */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={formData.medicalRequirements}
                          onChange={(e) => handleInputChange('medicalRequirements', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                        />
                        <label className="text-sm font-medium text-secondary-700">
                          {isPortuguese 
                            ? 'Existem requisitos médicos ou condições de saúde especiais?'
                            : 'Are there any medical requirements or special health conditions?'
                          }
                        </label>
                      </div>
                      {formData.medicalRequirements && (
                        <textarea
                          value={formData.medicalDetails || ''}
                          onChange={(e) => handleInputChange('medicalDetails', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.medicalDetails ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese 
                            ? 'Descreva requisitos médicos, medicamentos, alergias...'
                            : 'Describe medical requirements, medications, allergies...'
                          }
                        />
                      )}
                      {errors.medicalDetails && (
                        <p className="text-coral-500 text-sm mt-1">{errors.medicalDetails}</p>
                      )}
                    </div>

                    {/* Accessibility Needs */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={formData.accessibilityNeeds}
                          onChange={(e) => handleInputChange('accessibilityNeeds', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                        />
                        <label className="text-sm font-medium text-secondary-700">
                          {isPortuguese 
                            ? 'Existem necessidades de acessibilidade?'
                            : 'Are there any accessibility needs?'
                          }
                        </label>
                      </div>
                      {formData.accessibilityNeeds && (
                        <textarea
                          value={formData.accessibilityDetails || ''}
                          onChange={(e) => handleInputChange('accessibilityDetails', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.accessibilityDetails ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese 
                            ? 'Descreva necessidades de acessibilidade, mobilidade...'
                            : 'Describe accessibility needs, mobility requirements...'
                          }
                        />
                      )}
                      {errors.accessibilityDetails && (
                        <p className="text-coral-500 text-sm mt-1">{errors.accessibilityDetails}</p>
                      )}
                    </div>

                    {/* VIP Protocols */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={formData.vipProtocols}
                          onChange={(e) => handleInputChange('vipProtocols', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                        />
                        <label className="text-sm font-medium text-secondary-700">
                          {isPortuguese 
                            ? 'São necessários protocolos VIP específicos?'
                            : 'Are specific VIP protocols required?'
                          }
                        </label>
                      </div>
                      {formData.vipProtocols && (
                        <textarea
                          value={formData.protocolDetails || ''}
                          onChange={(e) => handleInputChange('protocolDetails', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.protocolDetails ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese 
                            ? 'Descreva protocolos VIP específicos necessários...'
                            : 'Describe specific VIP protocols required...'
                          }
                        />
                      )}
                      {errors.protocolDetails && (
                        <p className="text-coral-500 text-sm mt-1">{errors.protocolDetails}</p>
                      )}
                    </div>

                    {/* Armed Protection */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-coral-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <input
                              type="checkbox"
                              checked={formData.armedProtection}
                              onChange={(e) => handleInputChange('armedProtection', e.target.checked)}
                              className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                            />
                            <label className="font-medium text-gray-900">
                              {isPortuguese 
                                ? 'É necessária proteção armada? (Requer licenças especiais)'
                                : 'Is armed protection required? (Requires special licensing)'
                              }
                            </label>
                          </div>
                          <p className="text-sm text-coral-600 mb-3">
                            {isPortuguese 
                              ? 'Nota: Proteção próxima no Reino Unido é normalmente desarmada exceto em circunstâncias especiais. Justificação detalhada é obrigatória.'
                              : 'Note: Close protection in the UK is typically unarmed except under special circumstances. Detailed justification is required.'
                            }
                          </p>
                          {formData.armedProtection && (
                            <textarea
                              value={formData.armedJustification || ''}
                              onChange={(e) => handleInputChange('armedJustification', e.target.value)}
                              rows={4}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                                errors.armedJustification ? 'border-coral-500' : 'border-secondary-300'
                              }`}
                              placeholder={isPortuguese 
                                ? 'Forneça justificação detalhada para proteção armada...'
                                : 'Provide detailed justification for armed protection...'
                              }
                            />
                          )}
                          {errors.armedJustification && (
                            <p className="text-coral-500 text-sm mt-1">{errors.armedJustification}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confidentiality & Legal Compliance */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? 'Confidencialidade & Conformidade Legal' : 'Confidentiality & Legal Compliance'}
                    </h3>
                    <p className="text-secondary-600">
                      {isPortuguese 
                        ? 'Informações finais para conformidade legal e protocolar'
                        : 'Final information for legal and protocol compliance'
                      }
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Third Party Awareness */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-3">
                        <EyeIcon className="w-4 h-4 inline mr-2" />
                        {isPortuguese 
                          ? 'Que terceiros devem estar cientes do serviço de segurança? *'
                          : 'Which third parties should be aware of the security service? *'
                        }
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {thirdPartyOptions.map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.thirdPartyAwareness.includes(option.value)}
                              onChange={(e) => handleThirdPartyChange(option.value, e.target.checked)}
                              className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                            />
                            <span className="text-sm text-secondary-700">
                              {isPortuguese ? option.labelPt : option.labelEn}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.thirdPartyAwareness && (
                        <p className="text-coral-500 text-sm mt-1">{errors.thirdPartyAwareness}</p>
                      )}
                      
                      {formData.thirdPartyAwareness.includes('other') && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={formData.customThirdParty || ''}
                            onChange={(e) => handleInputChange('customThirdParty', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                              errors.customThirdParty ? 'border-coral-500' : 'border-secondary-300'
                            }`}
                            placeholder={isPortuguese ? 'Especifique outros terceiros...' : 'Specify other third parties...'}
                          />
                          {errors.customThirdParty && (
                            <p className="text-coral-500 text-sm mt-1">{errors.customThirdParty}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Previous Security Experience */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={formData.previousSecurityExperience}
                          onChange={(e) => handleInputChange('previousSecurityExperience', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500"
                        />
                        <label className="text-sm font-medium text-secondary-700">
                          {isPortuguese 
                            ? 'Tem experiência anterior com serviços de segurança?'
                            : 'Do you have previous experience with security services?'
                          }
                        </label>
                      </div>
                      {formData.previousSecurityExperience && (
                        <textarea
                          value={formData.experienceDetails || ''}
                          onChange={(e) => handleInputChange('experienceDetails', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.experienceDetails ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese 
                            ? 'Descreva a sua experiência anterior com serviços de segurança...'
                            : 'Describe your previous experience with security services...'
                          }
                        />
                      )}
                      {errors.experienceDetails && (
                        <p className="text-coral-500 text-sm mt-1">{errors.experienceDetails}</p>
                      )}
                    </div>

                    {/* Emergency Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          <PhoneIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Contacto de Emergência *' : 'Emergency Contact *'}
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.emergencyContact ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese ? 'Nome do contacto de emergência' : 'Emergency contact name'}
                        />
                        {errors.emergencyContact && (
                          <p className="text-coral-500 text-sm mt-1">{errors.emergencyContact}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          <PhoneIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Telefone de Emergência *' : 'Emergency Phone *'}
                        </label>
                        <input
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.emergencyPhone ? 'border-coral-500' : 'border-secondary-300'
                          }`}
                          placeholder={isPortuguese ? '+44 7XXX XXX XXX' : '+44 7XXX XXX XXX'}
                        />
                        {errors.emergencyPhone && (
                          <p className="text-coral-500 text-sm mt-1">{errors.emergencyPhone}</p>
                        )}
                      </div>
                    </div>

                    {/* Legal Agreements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.confidentialityAgreement}
                          onChange={(e) => handleInputChange('confidentialityAgreement', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500 mt-0.5"
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            {isPortuguese 
                              ? 'Aceito o acordo de confidencialidade *'
                              : 'I accept the confidentiality agreement *'
                            }
                          </label>
                          <p className="text-xs text-secondary-600 mt-1">
                            {isPortuguese 
                              ? 'Compreendo que todas as informações partilhadas serão mantidas estritamente confidenciais'
                              : 'I understand that all information shared will be kept strictly confidential'
                            }
                          </p>
                        </div>
                      </div>
                      {errors.confidentialityAgreement && (
                        <p className="text-coral-500 text-sm">{errors.confidentialityAgreement}</p>
                      )}

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.dataProcessingConsent}
                          onChange={(e) => handleInputChange('dataProcessingConsent', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-secondary-300 rounded focus:ring-secondary-500 mt-0.5"
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            {isPortuguese 
                              ? 'Consinto o processamento de dados pessoais *'
                              : 'I consent to personal data processing *'
                            }
                          </label>
                          <p className="text-xs text-secondary-600 mt-1">
                            {isPortuguese 
                              ? 'Consinto o processamento dos meus dados pessoais para fins de segurança e conformidade legal'
                              : 'I consent to processing of my personal data for security and legal compliance purposes'
                            }
                          </p>
                        </div>
                      </div>
                      {errors.dataProcessingConsent && (
                        <p className="text-coral-500 text-sm">{errors.dataProcessingConsent}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="text-sm text-gray-500">
                {isPortuguese ? `Passo ${currentStep} de 4` : `Step ${currentStep} of 4`}
              </div>
              
              <div className="flex space-x-3">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center px-4 py-2 text-secondary-600 border border-secondary-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    {isPortuguese ? 'Anterior' : 'Previous'}
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                  >
                    {isPortuguese ? 'Próximo' : 'Next'}
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-lg hover:from-secondary-700 hover:to-accent-700 transition-colors shadow-lg"
                  >
                    {isPortuguese ? 'Concluir Questionário' : 'Complete Questionnaire'}
                    <CheckCircleIcon className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}