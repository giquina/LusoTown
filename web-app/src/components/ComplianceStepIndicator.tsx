'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface ComplianceStep {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  status: 'pending' | 'current' | 'completed' | 'blocked'
  estimatedTime: string
  estimatedTimePortuguese: string
}

interface ComplianceStepIndicatorProps {
  currentStep: number
  totalSteps: number
  customSteps?: ComplianceStep[]
  className?: string
}

export default function ComplianceStepIndicator({ 
  currentStep, 
  totalSteps, 
  customSteps,
  className = ''
}: ComplianceStepIndicatorProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const defaultSteps: ComplianceStep[] = [
    {
      id: 'compliance',
      title: 'SIA Compliance Questionnaire',
      titlePortuguese: 'Questionário de Conformidade SIA',
      description: 'Complete mandatory UK close protection compliance assessment',
      descriptionPortuguese: 'Complete a avaliação obrigatória de conformidade de proteção próxima do Reino Unido',
      icon: ShieldCheckIcon,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
      estimatedTime: '5-8 minutes',
      estimatedTimePortuguese: '5-8 minutos'
    },
    {
      id: 'details',
      title: 'Personal Details',
      titlePortuguese: 'Detalhes Pessoais',
      description: 'Provide your contact information and special requirements',
      descriptionPortuguese: 'Forneça as suas informações de contacto e requisitos especiais',
      icon: UserIcon,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : currentStep < 2 ? 'blocked' : 'pending',
      estimatedTime: '2-3 minutes',
      estimatedTimePortuguese: '2-3 minutos'
    },
    {
      id: 'payment',
      title: 'Secure Payment',
      titlePortuguese: 'Pagamento Seguro',
      description: 'Complete your booking with secure payment processing',
      descriptionPortuguese: 'Complete a sua reserva com processamento de pagamento seguro',
      icon: CreditCardIcon,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : currentStep < 3 ? 'blocked' : 'pending',
      estimatedTime: '1-2 minutes',
      estimatedTimePortuguese: '1-2 minutos'
    },
    {
      id: 'confirmation',
      title: 'SIA Officer Review',
      titlePortuguese: 'Revisão do Oficial SIA',
      description: 'Licensed SIA officer will review and confirm your booking',
      descriptionPortuguese: 'Oficial SIA licenciado irá rever e confirmar a sua reserva',
      icon: CheckCircleIcon,
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : currentStep < 4 ? 'blocked' : 'pending',
      estimatedTime: '2-4 hours',
      estimatedTimePortuguese: '2-4 horas'
    }
  ]

  const steps = customSteps || defaultSteps.slice(0, totalSteps)

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 border-green-300'
      case 'current':
        return 'text-secondary-600 bg-secondary-100 border-secondary-300'
      case 'blocked':
        return 'text-gray-400 bg-gray-100 border-gray-200'
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  const getConnectorColor = (stepIndex: number) => {
    if (stepIndex < currentStep - 1) return 'bg-green-400'
    if (stepIndex === currentStep - 1) return 'bg-gradient-to-r from-green-400 to-secondary-400'
    return 'bg-gray-200'
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile View - Compact */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            {isPortuguese ? `Passo ${currentStep} de ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div 
            className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900">
            {isPortuguese ? steps[currentStep - 1]?.titlePortuguese : steps[currentStep - 1]?.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {isPortuguese ? steps[currentStep - 1]?.descriptionPortuguese : steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Desktop View - Full */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepColor(step.status)}`}>
                  {step.status === 'completed' ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : step.status === 'current' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                
                {/* Step Number Badge */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-500 text-white' :
                  step.status === 'current' ? 'bg-secondary-500 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
              </motion.div>

              {/* Step Content */}
              <div className="ml-4 flex-1">
                <h3 className={`font-semibold ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'current' ? 'text-secondary-700' :
                  step.status === 'blocked' ? 'text-gray-400' :
                  'text-gray-600'
                }`}>
                  {isPortuguese ? step.titlePortuguese : step.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  step.status === 'blocked' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isPortuguese ? step.descriptionPortuguese : step.description}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>{isPortuguese ? step.estimatedTimePortuguese : step.estimatedTime}</span>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div className="h-0.5 bg-gray-200 w-full"></div>
                    <motion.div
                      className={`absolute top-0 h-0.5 ${getConnectorColor(index)}`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: index < currentStep - 1 ? '100%' : 
                               index === currentStep - 1 ? '50%' : '0%'
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Step Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-4 border border-secondary-200"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
              {steps[currentStep - 1] && steps[currentStep - 1].icon && (
                React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-secondary-600" })
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {isPortuguese ? 'Passo Atual:' : 'Current Step:'} {' '}
                {isPortuguese ? steps[currentStep - 1]?.titlePortuguese : steps[currentStep - 1]?.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {isPortuguese ? steps[currentStep - 1]?.descriptionPortuguese : steps[currentStep - 1]?.description}
              </p>
              <div className="flex items-center mt-2 text-sm text-secondary-600">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>
                  {isPortuguese ? 'Tempo estimado:' : 'Estimated time:'} {' '}
                  {isPortuguese ? steps[currentStep - 1]?.estimatedTimePortuguese : steps[currentStep - 1]?.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{isPortuguese ? 'Progresso Geral' : 'Overall Progress'}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div 
              className="bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3"
      >
        <div className="flex items-start space-x-2">
          <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              {isPortuguese ? 'Processo Seguro e Regulamentado' : 'Secure & Regulated Process'}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              {isPortuguese 
                ? 'Todos os dados são protegidos de acordo com GDPR e regulamentações SIA do Reino Unido. Licenças verificadas e conformidade total garantida.'
                : 'All data is protected under GDPR and UK SIA regulations. Verified licenses and full compliance guaranteed.'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}