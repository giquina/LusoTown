'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  GlobeEuropeAfricaIcon,
  BuildingOffice2Icon,
  TruckIcon,
  SparklesIcon,
  EyeIcon,
  PhoneIcon,
  MusicalNoteIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import ProgressTracker from './ProgressTracker'
import QuestionExplainer from './QuestionExplainer'
import SIABadge from './SIABadge'
import StepIndicator from './StepIndicator'

export interface EasySIAData {
  // Step 1: Service Type (Radio buttons)
  serviceType: string
  customService?: string
  
  // Step 2: Date & Time (Calendar widget)
  serviceDate: string
  serviceTime: string
  pickupLocation: string
  dropoffLocation: string
  passengerCount: number
  
  // Step 3: Risk Assessment (Simple Yes/No + Checkboxes)
  hasKnownRisks: boolean
  riskFactors: string[]
  
  // Step 4: Protection Level (Radio buttons)
  protectionLevel: string
  
  // Step 5: Special Requirements (Checkboxes)
  specialRequirements: string[]
  medicalNotes?: string
  
  // Step 6: Emergency Contact (Minimal text)
  emergencyContact: string
  emergencyPhone: string
  
  // Legal compliance (Checkboxes)
  confidentialityAccepted: boolean
  dataProcessingAccepted: boolean
  
  // Auto-calculated
  riskScore: number
}

interface EasySIAQuestionnaireProps {
  onComplete: (data: EasySIAData) => void
  onCancel: () => void
  isOpen: boolean
}

const serviceTypeOptions = [
  { 
    value: 'portuguese-business-meeting', 
    iconEn: BuildingOffice2Icon,
    labelEn: 'Portuguese Business Meeting', 
    labelPt: 'Reunião de Negócios Portuguesa',
    exampleEn: 'Portuguese networking event, business lunch in Stockwell',
    examplePt: 'Evento de networking português, almoço de negócios em Stockwell',
    riskBase: 2
  },
  { 
    value: 'airport-transfer', 
    iconEn: TruckIcon,
    labelEn: 'Airport Transfer (Family/Business)', 
    labelPt: 'Transferência de Aeroporto (Família/Negócios)',
    exampleEn: 'Heathrow pickup, family arrival from Portugal',
    examplePt: 'Recolha em Heathrow, chegada da família de Portugal',
    riskBase: 2
  },
  { 
    value: 'fado-cultural-event', 
    iconEn: MusicalNoteIcon,
    labelEn: 'Fado/Cultural Event Escort', 
    labelPt: 'Escolta para Evento Fado/Cultural',
    exampleEn: 'Fado performance, Portuguese cultural celebration',
    examplePt: 'Performance de Fado, celebração cultural portuguesa',
    riskBase: 3
  },
  { 
    value: 'nightlife-security', 
    iconEn: HeartIcon,
    labelEn: 'Portuguese Nightlife Security', 
    labelPt: 'Segurança para Vida Noturna Portuguesa',
    exampleEn: 'Portuguese club nights, late-night venues in London',
    examplePt: 'Noites de clube portuguesas, locais noturnos em Londres',
    riskBase: 4
  },
  { 
    value: 'personal-protection', 
    iconEn: ShieldCheckIcon,
    labelEn: 'Personal Protection Detail', 
    labelPt: 'Proteção Pessoal',
    exampleEn: 'VIP protection, high-profile Portuguese community member',
    examplePt: 'Proteção VIP, membro proeminente da comunidade portuguesa',
    riskBase: 5
  },
  { 
    value: 'portuguese-heritage-tour', 
    iconEn: GlobeEuropeAfricaIcon,
    labelEn: 'Portuguese Heritage Tour', 
    labelPt: 'Tour do Património Português',
    exampleEn: 'Guided tour of Portuguese areas in London (Stockwell, Lambeth)',
    examplePt: 'Tour guiado das áreas portuguesas em Londres (Stockwell, Lambeth)',
    riskBase: 3
  },
  { 
    value: 'portuguese-workshop', 
    iconEn: AcademicCapIcon,
    labelEn: 'Portuguese Business Workshop', 
    labelPt: 'Workshop de Negócios Português',
    exampleEn: 'Portuguese entrepreneur training, digital marketing workshop',
    examplePt: 'Treino de empreendedor português, workshop de marketing digital',
    riskBase: 2
  },
  { 
    value: 'other', 
    iconEn: ExclamationTriangleIcon,
    labelEn: 'Other Portuguese Community Service', 
    labelPt: 'Outro Serviço da Comunidade Portuguesa',
    exampleEn: 'Please specify your Portuguese community needs',
    examplePt: 'Por favor especifique as suas necessidades da comunidade portuguesa',
    riskBase: 3
  }
]

const riskFactorOptions = [
  { value: 'media-attention', labelEn: 'Portuguese media/press attention expected', labelPt: 'Atenção da imprensa/mídia portuguesa esperada', risk: 3 },
  { value: 'public-event', labelEn: 'Large Portuguese community gathering', labelPt: 'Grande reunião da comunidade portuguesa', risk: 2 },
  { value: 'previous-incidents', labelEn: 'Previous security incidents', labelPt: 'Incidentes de segurança anteriores', risk: 4 },
  { value: 'stalking-harassment', labelEn: 'Stalking/harassment concerns', labelPt: 'Preocupações com perseguição/assédio', risk: 4 },
  { value: 'business-disputes', labelEn: 'Portuguese business disputes/conflicts', labelPt: 'Disputas/conflitos de negócios portugueses', risk: 3 },
  { value: 'high-value-items', labelEn: 'High-value items/Portuguese documents', labelPt: 'Itens/documentos portugueses de alto valor', risk: 2 },
  { value: 'language-barriers', labelEn: 'Language barrier concerns in emergency', labelPt: 'Preocupações com barreira linguística em emergência', risk: 2 },
  { value: 'unfamiliar-area', labelEn: 'Unfamiliar with London Portuguese areas', labelPt: 'Não familiarizado com áreas portuguesas de Londres', risk: 1 }
]

const protectionLevelOptions = [
  { 
    value: 'standard-driver', 
    labelEn: 'Standard Driver (No security training)', 
    labelPt: 'Motorista Padrão (Sem treino de segurança)',
    riskMultiplier: 1.0
  },
  { 
    value: 'sia-officer', 
    labelEn: 'SIA Licensed Close Protection Officer', 
    labelPt: 'Oficial de Proteção Licenciado SIA',
    riskMultiplier: 1.2
  },
  { 
    value: 'high-profile-vip', 
    labelEn: 'High-Profile VIP Protection', 
    labelPt: 'Proteção VIP de Alto Perfil',
    riskMultiplier: 1.8
  },
  { 
    value: 'discrete-business', 
    labelEn: 'Discrete Business Security', 
    labelPt: 'Segurança Empresarial Discreta',
    riskMultiplier: 1.3
  }
]

const specialRequirementsOptions = [
  { value: 'portuguese-speaking-officer', labelEn: 'Portuguese-speaking officer required', labelPt: 'Oficial que fala português obrigatório', priority: true },
  { value: 'portuguese-cultural-knowledge', labelEn: 'Knowledge of Portuguese culture/customs', labelPt: 'Conhecimento da cultura/costumes portugueses', priority: true },
  { value: 'familiar-portuguese-areas', labelEn: 'Familiar with Portuguese areas of London', labelPt: 'Familiarizado com áreas portuguesas de Londres', priority: false },
  { value: 'medical-conditions', labelEn: 'Medical conditions to be aware of', labelPt: 'Condições médicas a considerar', priority: false },
  { value: 'wheelchair-access', labelEn: 'Wheelchair accessibility required', labelPt: 'Acessibilidade para cadeira de rodas necessária', priority: false },
  { value: 'multiple-stops', labelEn: 'Multiple stops in Portuguese community areas', labelPt: 'Múltiplas paragens em áreas da comunidade portuguesa', priority: false },
  { value: 'photography-restrictions', labelEn: 'Photography restrictions (cultural/religious)', labelPt: 'Restrições de fotografia (cultural/religiosa)', priority: false },
  { value: 'family-friendly', labelEn: 'Family-friendly service (children present)', labelPt: 'Serviço adequado para famílias (crianças presentes)', priority: false },
  { value: 'female-officer', labelEn: 'Female officer preferred', labelPt: 'Oficial feminina preferida', priority: false },
  { value: 'elder-assistance', labelEn: 'Elderly Portuguese community member assistance', labelPt: 'Assistência a membro idoso da comunidade portuguesa', priority: false },
  { value: 'armed-protection', labelEn: 'Armed protection (special licensing required)', labelPt: 'Proteção armada (licenciamento especial obrigatório)', priority: false }
]

export default function EasySIAQuestionnaire({ 
  onComplete, 
  onCancel, 
  isOpen 
}: EasySIAQuestionnaireProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  const stepTitles = [
    isPortuguese ? 'Tipo de Serviço' : 'Service Type',
    isPortuguese ? 'Data & Local' : 'Date & Location', 
    isPortuguese ? 'Avaliação de Risco' : 'Risk Assessment',
    isPortuguese ? 'Nível de Proteção' : 'Protection Level',
    isPortuguese ? 'Requisitos Especiais' : 'Special Requirements',
    isPortuguese ? 'Contacto de Emergência' : 'Emergency Contact'
  ]
  
  const [formData, setFormData] = useState<EasySIAData>({
    serviceType: '',
    serviceDate: '',
    serviceTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengerCount: 1,
    hasKnownRisks: false,
    riskFactors: [],
    protectionLevel: 'standard-driver', // Default selection
    specialRequirements: [],
    emergencyContact: '',
    emergencyPhone: '',
    confidentialityAccepted: false,
    dataProcessingAccepted: false,
    riskScore: 0
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Auto-save progress to localStorage
  useEffect(() => {
    const autoSave = () => {
      if (formData.serviceType || formData.pickupLocation || formData.serviceDate) {
        localStorage.setItem('lusotown-sia-progress', JSON.stringify({
          formData,
          currentStep,
          completedSteps,
          timestamp: Date.now()
        }))
      }
    }
    
    const timer = setTimeout(autoSave, 1000)
    return () => clearTimeout(timer)
  }, [formData, currentStep, completedSteps])
  
  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('lusotown-sia-progress')
    if (savedProgress) {
      try {
        const { formData: savedData, currentStep: savedStep, completedSteps: savedCompleted, timestamp } = JSON.parse(savedProgress)
        // Only load if saved within last 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setFormData(savedData)
          setCurrentStep(savedStep)
          setCompletedSteps(savedCompleted || [])
        }
      } catch (e) {
        console.error('Failed to load saved progress:', e)
      }
    }
  }, [])

  const calculateRiskScore = (data: EasySIAData): number => {
    let score = 0
    
    // Base score from service type
    const serviceOption = serviceTypeOptions.find(opt => opt.value === data.serviceType)
    score += serviceOption?.riskBase || 3
    
    // Risk factors
    data.riskFactors.forEach(factor => {
      const riskOption = riskFactorOptions.find(opt => opt.value === factor)
      score += riskOption?.risk || 0
    })
    
    // Known risks
    if (data.hasKnownRisks) score += 3
    
    // Protection level multiplier
    const protectionOption = protectionLevelOptions.find(opt => opt.value === data.protectionLevel)
    score *= protectionOption?.riskMultiplier || 1.0
    
    // Special requirements
    if (data.specialRequirements.includes('armed-protection')) score += 5
    if (data.specialRequirements.includes('medical-conditions')) score += 1
    
    return Math.min(Math.round(score), 20) // Cap at 20
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = isPortuguese ? 'Selecione o tipo de serviço' : 'Please select service type'
      }
      if (formData.serviceType === 'other' && !formData.customService?.trim()) {
        newErrors.customService = isPortuguese ? 'Especifique o serviço' : 'Please specify service'
      }
    }

    if (step === 2) {
      if (!formData.serviceDate) {
        newErrors.serviceDate = isPortuguese ? 'Data é obrigatória' : 'Date is required'
      }
      if (!formData.serviceTime) {
        newErrors.serviceTime = isPortuguese ? 'Hora é obrigatória' : 'Time is required'
      }
      if (!formData.pickupLocation.trim()) {
        newErrors.pickupLocation = isPortuguese ? 'Local de recolha é obrigatório' : 'Pickup location required'
      }
      if (formData.passengerCount < 1) {
        newErrors.passengerCount = isPortuguese ? 'Número de passageiros inválido' : 'Invalid passenger count'
      }
    }

    if (step === 6) {
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = isPortuguese ? 'Contacto de emergência obrigatório' : 'Emergency contact required'
      }
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = isPortuguese ? 'Telefone de emergência obrigatório' : 'Emergency phone required'
      }
      if (!formData.confidentialityAccepted) {
        newErrors.confidentialityAccepted = isPortuguese ? 'Deve aceitar os termos' : 'Must accept terms'
      }
      if (!formData.dataProcessingAccepted) {
        newErrors.dataProcessingAccepted = isPortuguese ? 'Deve aceitar processamento de dados' : 'Must accept data processing'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep])
      }
      
      if (currentStep < totalSteps) {
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

  const handleComplete = () => {
    if (validateStep(totalSteps)) {
      const riskScore = calculateRiskScore(formData)
      const completeData = { ...formData, riskScore }
      
      // Clear saved progress
      localStorage.removeItem('lusotown-sia-progress')
      
      onComplete(completeData)
    }
  }

  const updateFormData = (field: keyof EasySIAData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleArrayField = (field: 'riskFactors' | 'specialRequirements', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {isPortuguese ? 'SIA Proteção Rápida' : 'Easy SIA Protection'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {isPortuguese 
                      ? 'Questionário simplificado - 2-3 minutos'
                      : 'Simplified questionnaire - 2-3 minutes'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 sm:px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isPortuguese ? `Passo ${currentStep} de ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Type */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Que tipo de serviço precisa?' : 'What type of service do you need?'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Selecione a opção que melhor descreve o seu serviço'
                          : 'Select the option that best describes your service'
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {serviceTypeOptions.map((option) => {
                        const IconComponent = option.iconEn
                        return (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="serviceType"
                              value={option.value}
                              checked={formData.serviceType === option.value}
                              onChange={(e) => updateFormData('serviceType', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`
                              p-4 border-2 rounded-xl transition-all text-center
                              ${formData.serviceType === option.value
                                ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                              }
                            `}>
                              <IconComponent className="w-8 h-8 mx-auto mb-2" />
                              <div className="font-medium text-sm">
                                {isPortuguese ? option.labelPt : option.labelEn}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>

                    {formData.serviceType === 'other' && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={formData.customService || ''}
                          onChange={(e) => updateFormData('customService', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.customService ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={isPortuguese ? 'Especifique o tipo de serviço...' : 'Specify service type...'}
                        />
                        {errors.customService && (
                          <p className="text-red-500 text-sm mt-1">{errors.customService}</p>
                        )}
                      </div>
                    )}

                    {errors.serviceType && (
                      <p className="text-red-500 text-sm mt-2">{errors.serviceType}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Date, Time & Location */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Quando e onde?' : 'When and where?'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Datas, horários e locais do seu serviço'
                          : 'Dates, times and locations for your service'
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Data do Serviço' : 'Service Date'}
                        </label>
                        <input
                          type="date"
                          value={formData.serviceDate}
                          onChange={(e) => updateFormData('serviceDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.serviceDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.serviceDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.serviceDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <ClockIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Hora do Serviço' : 'Service Time'}
                        </label>
                        <input
                          type="time"
                          value={formData.serviceTime}
                          onChange={(e) => updateFormData('serviceTime', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.serviceTime ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.serviceTime && (
                          <p className="text-red-500 text-sm mt-1">{errors.serviceTime}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPinIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Local de Recolha' : 'Pickup Location'}
                        </label>
                        <input
                          type="text"
                          value={formData.pickupLocation}
                          onChange={(e) => updateFormData('pickupLocation', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
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
                          value={formData.dropoffLocation}
                          onChange={(e) => updateFormData('dropoffLocation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                          placeholder={isPortuguese ? 'Destino final...' : 'Final destination...'}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <UserGroupIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Número de Passageiros' : 'Number of Passengers'}
                        </label>
                        <select
                          value={formData.passengerCount}
                          onChange={(e) => updateFormData('passengerCount', parseInt(e.target.value))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.passengerCount ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 
                                (isPortuguese ? 'passageiro' : 'passenger') : 
                                (isPortuguese ? 'passageiros' : 'passengers')
                              }
                            </option>
                          ))}
                        </select>
                        {errors.passengerCount && (
                          <p className="text-red-500 text-sm mt-1">{errors.passengerCount}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Risk Assessment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Avaliação de Segurança da Comunidade' : 'Community Security Assessment'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Ajude-nos a entender o ambiente para garantir a sua segurança'
                          : 'Help us understand the environment to ensure your safety'
                        }
                      </p>
                    </div>

                    {/* Simple Yes/No for known risks */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="text-center mb-4">
                        <p className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Existem preocupações de segurança específicas para esta ocasião?' : 'Are there any specific security concerns for this occasion?'}
                        </p>
                        <p className="text-xs text-gray-600 mb-3">
                          {isPortuguese 
                            ? 'Considere: local desconhecido, evento público, disputas pessoais, etc.'
                            : 'Consider: unfamiliar location, public event, personal disputes, etc.'
                          }
                        </p>
                        <div className="flex justify-center space-x-4">
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              name="hasKnownRisks"
                              value="false"
                              checked={!formData.hasKnownRisks}
                              onChange={() => updateFormData('hasKnownRisks', false)}
                              className="sr-only"
                            />
                            <div className={`
                              px-6 py-3 border-2 rounded-lg transition-all
                              ${!formData.hasKnownRisks
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                              }
                            `}>
                              <div className="font-medium">
                                {isPortuguese ? 'NÃO' : 'NO'}
                              </div>
                              <div className="text-xs">
                                {isPortuguese ? 'Sem riscos conhecidos' : 'No known risks'}
                              </div>
                            </div>
                          </label>
                          
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              name="hasKnownRisks"
                              value="true"
                              checked={formData.hasKnownRisks}
                              onChange={() => updateFormData('hasKnownRisks', true)}
                              className="sr-only"
                            />
                            <div className={`
                              px-6 py-3 border-2 rounded-lg transition-all
                              ${formData.hasKnownRisks
                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                              }
                            `}>
                              <div className="font-medium">
                                {isPortuguese ? 'SIM' : 'YES'}
                              </div>
                              <div className="text-xs">
                                {isPortuguese ? 'Existem riscos' : 'Risks exist'}
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Risk factor checkboxes - only show if they said YES */}
                    {formData.hasKnownRisks && (
                      <div>
                        <p className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Que tipos de riscos? (Selecione todos os aplicáveis)' : 'What types of risks? (Select all that apply)'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {riskFactorOptions.map((option) => (
                            <label key={option.value} className="cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.riskFactors.includes(option.value)}
                                onChange={() => toggleArrayField('riskFactors', option.value)}
                                className="sr-only"
                              />
                              <div className={`
                                p-3 border-2 rounded-lg transition-all text-sm
                                ${formData.riskFactors.includes(option.value)
                                  ? 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }
                              `}>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-4 h-4 border-2 rounded ${
                                    formData.riskFactors.includes(option.value) 
                                      ? 'bg-red-500 border-red-500' 
                                      : 'border-gray-300'
                                  }`}>
                                    {formData.riskFactors.includes(option.value) && (
                                      <CheckCircleIcon className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="font-medium">
                                    {isPortuguese ? option.labelPt : option.labelEn}
                                  </span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Protection Level */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Nível de Serviço de Segurança' : 'Security Service Level'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Escolha o nível apropriado para a sua situação na comunidade'
                          : 'Choose the appropriate level for your community situation'
                        }
                      </p>
                      <div className="mt-2 text-xs text-blue-600">
                        {isPortuguese 
                          ? 'Todos os oficiais são verificados e licenciados SIA'
                          : 'All officers are verified and SIA licensed'
                        }
                      </div>
                    </div>

                    <div className="space-y-3">
                      {protectionLevelOptions.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="protectionLevel"
                            value={option.value}
                            checked={formData.protectionLevel === option.value}
                            onChange={(e) => updateFormData('protectionLevel', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`
                            p-4 border-2 rounded-lg transition-all
                            ${formData.protectionLevel === option.value
                              ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                            }
                          `}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-5 h-5 border-2 rounded-full ${
                                formData.protectionLevel === option.value 
                                  ? 'bg-secondary-500 border-secondary-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.protectionLevel === option.value && (
                                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {isPortuguese ? option.labelPt : option.labelEn}
                                </div>
                                {option.value === 'standard-driver' && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {isPortuguese ? 'Mais barato - sem treino de segurança' : 'Cheapest option - no security training'}
                                  </div>
                                )}
                                {option.value === 'sia-officer' && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {isPortuguese ? 'Recomendado - oficial licenciado SIA' : 'Recommended - SIA licensed officer'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Special Requirements */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Requisitos para a Comunidade Portuguesa' : 'Portuguese Community Requirements'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Personalize o serviço para as suas necessidades específicas'
                          : 'Customize the service for your specific needs'
                        }
                      </p>
                    </div>

                    {/* Priority Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <StarIcon className="w-4 h-4 text-accent-500 mr-2" />
                        {isPortuguese ? 'Requisitos Prioritários da Comunidade' : 'Priority Community Requirements'}
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {specialRequirementsOptions.filter(opt => opt.priority).map((option) => (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.specialRequirements.includes(option.value)}
                              onChange={() => toggleArrayField('specialRequirements', option.value)}
                              className="sr-only"
                            />
                            <div className={`
                              p-4 border-2 rounded-lg transition-all text-sm
                              ${formData.specialRequirements.includes(option.value)
                                ? 'border-accent-500 bg-accent-50 text-accent-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                              }
                            `}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 border-2 rounded ${
                                  formData.specialRequirements.includes(option.value) 
                                    ? 'bg-accent-500 border-accent-500' 
                                    : 'border-gray-300'
                                }`}>
                                  {formData.specialRequirements.includes(option.value) && (
                                    <CheckCircleIcon className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <span className="font-medium flex-1">
                                  {isPortuguese ? option.labelPt : option.labelEn}
                                </span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Other Requirements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? 'Outros Requisitos (Opcional)' : 'Other Requirements (Optional)'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {specialRequirementsOptions.filter(opt => !opt.priority).map((option) => (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.specialRequirements.includes(option.value)}
                              onChange={() => toggleArrayField('specialRequirements', option.value)}
                              className="sr-only"
                            />
                            <div className={`
                              p-3 border-2 rounded-lg transition-all text-sm
                              ${formData.specialRequirements.includes(option.value)
                                ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                              }
                            `}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 border-2 rounded ${
                                  formData.specialRequirements.includes(option.value) 
                                    ? 'bg-secondary-500 border-secondary-500' 
                                    : 'border-gray-300'
                                }`}>
                                  {formData.specialRequirements.includes(option.value) && (
                                    <CheckCircleIcon className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span className="font-medium">
                                  {isPortuguese ? option.labelPt : option.labelEn}
                                </span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Medical notes if medical conditions selected */}
                    {formData.specialRequirements.includes('medical-conditions') && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isPortuguese ? 'Detalhes médicos (opcional)' : 'Medical details (optional)'}
                        </label>
                        <textarea
                          value={formData.medicalNotes || ''}
                          onChange={(e) => updateFormData('medicalNotes', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                          placeholder={isPortuguese 
                            ? 'Condições médicas, medicamentos, alergias...'
                            : 'Medical conditions, medications, allergies...'
                          }
                        />
                      </div>
                    )}

                    {/* Armed protection warning */}
                    {formData.specialRequirements.includes('armed-protection') && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">
                              {isPortuguese ? 'Proteção Armada' : 'Armed Protection'}
                            </p>
                            <p className="text-sm text-red-700 mt-1">
                              {isPortuguese 
                                ? 'Requer licenciamento especial e justificação detalhada. Revisão obrigatória.'
                                : 'Requires special licensing and detailed justification. Review required.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 6: Emergency Contact & Legal */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Finalizando o Seu Pedido!' : 'Finalizing Your Request!'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Contacto de emergência e confirmação legal obrigatória'
                          : 'Emergency contact and required legal confirmation'
                        }
                      </p>
                      <div className="mt-2 text-xs text-green-600">
                        {isPortuguese 
                          ? 'Está quase a garantir o seu serviço de segurança profissional'
                          : 'You are almost ready to secure your professional security service'
                        }
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <PhoneIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Contacto de Emergência' : 'Emergency Contact'}
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={isPortuguese ? 'Nome do contacto' : 'Contact name'}
                        />
                        {errors.emergencyContact && (
                          <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <PhoneIcon className="w-4 h-4 inline mr-2" />
                          {isPortuguese ? 'Telefone de Emergência' : 'Emergency Phone'}
                        </label>
                        <input
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                            errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+44 7XXX XXX XXX"
                        />
                        {errors.emergencyPhone && (
                          <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>
                        )}
                      </div>
                    </div>

                    {/* Legal checkboxes */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.confidentialityAccepted}
                          onChange={(e) => updateFormData('confidentialityAccepted', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500 mt-0.5"
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            {isPortuguese 
                              ? 'Aceito o acordo de confidencialidade'
                              : 'I accept the confidentiality agreement'
                            }
                          </label>
                          <p className="text-xs text-gray-600 mt-1">
                            {isPortuguese 
                              ? 'Todas as informações serão mantidas confidenciais'
                              : 'All information will be kept strictly confidential'
                            }
                          </p>
                        </div>
                      </div>
                      {errors.confidentialityAccepted && (
                        <p className="text-red-500 text-sm">{errors.confidentialityAccepted}</p>
                      )}

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.dataProcessingAccepted}
                          onChange={(e) => updateFormData('dataProcessingAccepted', e.target.checked)}
                          className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500 mt-0.5"
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            {isPortuguese 
                              ? 'Consinto o processamento de dados (GDPR)'
                              : 'I consent to data processing (GDPR)'
                            }
                          </label>
                          <p className="text-xs text-gray-600 mt-1">
                            {isPortuguese 
                              ? 'Para fins de segurança e conformidade legal'
                              : 'For security and legal compliance purposes'
                            }
                          </p>
                        </div>
                      </div>
                      {errors.dataProcessingAccepted && (
                        <p className="text-red-500 text-sm">{errors.dataProcessingAccepted}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-secondary-50 rounded-b-2xl">
              {/* Progress summary */}
              <div className="px-4 sm:px-6 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SIABadge variant="mini" showAnimation={false} />
                    <span className="text-xs text-gray-600">
                      {isPortuguese 
                        ? 'Serviço profissional licenciado'
                        : 'Professional licensed service'
                      }
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {completedSteps.length} {isPortuguese ? 'de' : 'of'} {totalSteps} {isPortuguese ? 'passos concluídos' : 'steps completed'}
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between items-center p-4 sm:p-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Anterior' : 'Previous'}
                </button>
                
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium text-gray-700">
                    {stepTitles[currentStep - 1]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentStep} / {totalSteps}
                  </div>
                </div>
                
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-lg hover:from-secondary-700 hover:to-accent-700 transition-all font-medium shadow-lg"
                >
                  {currentStep === totalSteps ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      {isPortuguese ? 'Solicitar Orçamento' : 'Request Quote'}
                    </>
                  ) : (
                    <>
                      {isPortuguese ? 'Continuar' : 'Continue'}
                      <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}