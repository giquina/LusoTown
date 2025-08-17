'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { Crown, MessageSquare, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function ConsultationBookingPage() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    duration: '60',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    company: '',
    requirements: '',
    preferredLanguage: language === 'pt' ? 'portuguese' : 'english',
    budget: '',
    urgency: ''
  })

  const consultationTypes = [
    {
      id: 'cultural-tours',
      name: 'Cultural Tours Planning',
      namePortuguese: 'Planeamento de Tours Culturais',
      description: 'Plan custom Portuguese heritage tours for individuals or groups',
      descriptionPortuguese: 'Planear tours de património português personalizados para indivíduos ou grupos',
      duration: '45-60 minutes',
      price: 'Free consultation'
    },
    {
      id: 'executive-transport',
      name: 'Executive Transport Solutions',
      namePortuguese: 'Soluções de Transporte Executivo',
      description: 'Design comprehensive transport solutions for business or personal needs',
      descriptionPortuguese: 'Desenhar soluções de transporte abrangentes para necessidades empresariais ou pessoais',
      duration: '30-45 minutes',
      price: 'Free consultation'
    },
    {
      id: 'close-protection',
      name: 'Security Assessment',
      namePortuguese: 'Avaliação de Segurança',
      description: 'Professional security consultation and risk assessment',
      descriptionPortuguese: 'Consulta de segurança profissional e avaliação de risco',
      duration: '60-90 minutes',
      price: 'Free consultation'
    },
    {
      id: 'integrated-services',
      name: 'Integrated Service Package',
      namePortuguese: 'Pacote de Serviços Integrados',
      description: 'Comprehensive consultation for multi-service requirements',
      descriptionPortuguese: 'Consulta abrangente para requisitos de múltiplos serviços',
      duration: '60-90 minutes',
      price: 'Free consultation'
    }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Consultation booking:', formData)
    // Redirect to confirmation page
    window.location.href = '/services/consultation/confirmation'
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Tipo de Consulta' : 'Consultation Type'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {consultationTypes.map((type) => (
            <label
              key={type.id}
              className={`relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.consultationType === type.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <input
                type="radio"
                name="consultationType"
                value={type.id}
                checked={formData.consultationType === type.id}
                onChange={(e) => handleInputChange('consultationType', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">
                    {isPortuguese ? type.namePortuguese : type.name}
                  </h4>
                  <span className="text-sm text-primary-600 font-medium">{type.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {isPortuguese ? type.descriptionPortuguese : type.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>{type.duration}</span>
                </div>
              </div>
              {formData.consultationType === type.id && (
                <CheckCircleIcon className="w-6 h-6 text-primary-500 ml-4" />
              )}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Preferências de Consulta' : 'Consultation Preferences'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Idioma Preferido' : 'Preferred Language'}
            </label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="english">English</option>
              <option value="portuguese">Português</option>
              <option value="both">{isPortuguese ? 'Ambos' : 'Both'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Duração' : 'Duration'}
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="30">{isPortuguese ? '30 minutos' : '30 minutes'}</option>
              <option value="45">{isPortuguese ? '45 minutos' : '45 minutes'}</option>
              <option value="60">{isPortuguese ? '1 hora' : '1 hour'}</option>
              <option value="90">{isPortuguese ? '1.5 horas' : '1.5 hours'}</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Agendamento' : 'Scheduling'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Data Preferida' : 'Preferred Date'}
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Hora Preferida' : 'Preferred Time'}
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">{isPortuguese ? 'Selecionar hora' : 'Select time'}</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isPortuguese ? 'Local da Consulta' : 'Consultation Location'}
        </label>
        <select
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">{isPortuguese ? 'Selecionar local' : 'Select location'}</option>
          <option value="video-call">{isPortuguese ? 'Videochamada (Zoom/Teams)' : 'Video Call (Zoom/Teams)'}</option>
          <option value="phone-call">{isPortuguese ? 'Chamada telefónica' : 'Phone Call'}</option>
          <option value="central-london">{isPortuguese ? 'Central London (presencial)' : 'Central London (in-person)'}</option>
          <option value="client-location">{isPortuguese ? 'Na sua localização' : 'At your location'}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isPortuguese ? 'Requisitos Específicos' : 'Specific Requirements'}
        </label>
        <textarea
          value={formData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          rows={4}
          placeholder={isPortuguese 
            ? 'Descreva os seus requisitos, objetivos ou questões específicas...'
            : 'Describe your requirements, objectives, or specific questions...'
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Informações de Contacto' : 'Contact Information'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Nome Completo' : 'Full Name'}
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Empresa (opcional)' : 'Company (optional)'}
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Telefone' : 'Phone'}
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Orçamento Estimado' : 'Estimated Budget'}
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">{isPortuguese ? 'Selecionar orçamento' : 'Select budget'}</option>
            <option value="under-500">£0 - £500</option>
            <option value="500-2000">£500 - £2,000</option>
            <option value="2000-5000">£2,000 - £5,000</option>
            <option value="5000-10000">£5,000 - £10,000</option>
            <option value="over-10000">{isPortuguese ? '£10,000+' : '£10,000+'}</option>
            <option value="discuss">{isPortuguese ? 'Discutir na consulta' : 'Discuss in consultation'}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Urgência' : 'Urgency'}
          </label>
          <select
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">{isPortuguese ? 'Selecionar urgência' : 'Select urgency'}</option>
            <option value="flexible">{isPortuguese ? 'Flexível' : 'Flexible'}</option>
            <option value="within-week">{isPortuguese ? 'Dentro de 1 semana' : 'Within 1 week'}</option>
            <option value="urgent">{isPortuguese ? 'Urgente (2-3 dias)' : 'Urgent (2-3 days)'}</option>
            <option value="immediate">{isPortuguese ? 'Imediato' : 'Immediate'}</option>
          </select>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Voltar aos Serviços' : 'Back to Services'}
            </button>
            
            <div className="flex items-center mb-4">
              <Crown className="w-6 h-6 text-primary-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {isPortuguese ? 'Agendar Consulta Gratuita' : 'Book Free Consultation'}
              </h1>
            </div>
            
            <p className="text-lg text-gray-600">
              {isPortuguese
                ? 'Agende uma consulta gratuita com nossos especialistas para discutir suas necessidades específicas'
                : 'Schedule a free consultation with our specialists to discuss your specific needs'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 ${
                        currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{isPortuguese ? 'Tipo de Serviço' : 'Service Type'}</span>
              <span>{isPortuguese ? 'Agendamento' : 'Scheduling'}</span>
              <span>{isPortuguese ? 'Contacto' : 'Contact'}</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPortuguese ? 'Anterior' : 'Previous'}
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && !formData.consultationType) ||
                    (currentStep === 2 && (!formData.preferredDate || !formData.preferredTime))
                  }
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPortuguese ? 'Próximo' : 'Next'}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.contactName || !formData.contactEmail}
                  className="px-8 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <span>{isPortuguese ? 'Agendar Consulta' : 'Book Consultation'}</span>
                  <CheckCircleIcon className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}