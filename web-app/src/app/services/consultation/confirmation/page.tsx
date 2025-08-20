'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { Crown, MessageSquare, Star, Users } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

export default function ConsultationConfirmationPage() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [confirmationId] = useState(`LUSO-${Date.now().toString().slice(-6)}`)

  const nextSteps = [
    {
      step: 1,
      title: 'Confirmation Email',
      titlePortuguese: 'Email de Confirmação',
      description: 'You will receive a detailed confirmation email within 15 minutes',
      descriptionPortuguese: 'Receberá um email de confirmação detalhado em 15 minutos',
      icon: EnvelopeIcon,
      timeframe: '15 minutes',
      timeframePortuguese: '15 minutos'
    },
    {
      step: 2,
      title: 'Calendar Invite',
      titlePortuguese: 'Convite de Calendário',
      description: 'Calendar invitation with meeting details and preparation materials',
      descriptionPortuguese: 'Convite de calendário com detalhes da reunião e materiais de preparação',
      icon: CalendarDaysIcon,
      timeframe: '30 minutes',
      timeframePortuguese: '30 minutos'
    },
    {
      step: 3,
      title: 'Pre-consultation Call',
      titlePortuguese: 'Chamada Pré-consulta',
      description: 'Brief call to confirm details and answer any questions',
      descriptionPortuguese: 'Chamada breve para confirmar detalhes e responder a questões',
      icon: PhoneIcon,
      timeframe: '1 day before',
      timeframePortuguese: '1 dia antes'
    },
    {
      step: 4,
      title: 'Consultation Meeting',
      titlePortuguese: 'Reunião de Consulta',
      description: 'Your scheduled consultation with our specialist',
      descriptionPortuguese: 'A sua consulta agendada com o nosso especialista',
      icon: Users,
      timeframe: 'Scheduled time',
      timeframePortuguese: 'Hora agendada'
    }
  ]

  const benefits = [
    {
      title: 'Expert Guidance',
      titlePortuguese: 'Orientação Especializada',
      description: 'Get professional advice from Portuguese cultural and service experts',
      descriptionPortuguese: 'Obtenha conselhos profissionais de especialistas culturais e de serviços portugueses'
    },
    {
      title: 'Custom Solutions',
      titlePortuguese: 'Soluções Personalizadas',
      description: 'Tailored recommendations based on your specific needs and preferences',
      descriptionPortuguese: 'Recomendações personalizadas baseadas nas suas necessidades e preferências específicas'
    },
    {
      title: 'No Obligation',
      titlePortuguese: 'Sem Compromisso',
      description: 'Free consultation with no pressure to purchase - get the information you need',
      descriptionPortuguese: 'Consulta gratuita sem pressão para comprar - obtenha a informação que precisa'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Consulta Agendada com Sucesso!' : 'Consultation Successfully Booked!'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {isPortuguese
                ? 'A sua consulta gratuita foi confirmada. Estamos ansiosos por ajudá-lo!'
                : 'Your free consultation has been confirmed. We look forward to helping you!'
              }
            </p>

            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-lg font-semibold">
              <Crown className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Confirmação' : 'Confirmation'}: {confirmationId}
            </div>
          </motion.div>

          {/* Consultation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Detalhes da Consulta' : 'Consultation Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Data' : 'Date'}
                    </span>
                    <span className="font-medium text-gray-900">
                      {/* This would come from form data in real implementation */}
                      {new Date().toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Hora' : 'Time'}
                    </span>
                    <span className="font-medium text-gray-900">14:30 - 15:30 GMT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Local' : 'Location'}
                    </span>
                    <span className="font-medium text-gray-900">
                      {isPortuguese ? 'Videochamada (Zoom)' : 'Video Call (Zoom)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Especialista' : 'Specialist'}
                    </span>
                    <span className="font-medium text-gray-900">
                      {isPortuguese ? 'Consultor de Serviços Sénior' : 'Senior Service Consultant'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Próximos Passos' : 'What Happens Next'}
            </h2>
            
            <div className="space-y-6">
              {nextSteps.map((item, index) => (
                <div key={item.step} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mr-4">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {isPortuguese ? item.titlePortuguese : item.title}
                      </h3>
                      <span className="text-sm text-primary-600 font-medium">
                        {isPortuguese ? item.timeframePortuguese : item.timeframe}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {isPortuguese ? item.descriptionPortuguese : item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'O que Pode Esperar' : 'What to Expect'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isPortuguese ? benefit.titlePortuguese : benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isPortuguese ? benefit.descriptionPortuguese : benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Precisa de Ajuda?' : 'Need Help?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Contactar a Nossa Equipa' : 'Contact Our Team'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">+44 20 7123 4567</span>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">consultations@lusotown.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">
                      {isPortuguese ? 'Chat ao vivo disponível' : 'Live chat available'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Precisa de Reagendar?' : 'Need to Reschedule?'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isPortuguese
                    ? 'Se precisar de alterar a sua consulta, contacte-nos até 24 horas antes.'
                    : 'If you need to change your consultation, please contact us at least 24 hours in advance.'
                  }
                </p>
                <button className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  <span>{isPortuguese ? 'Reagendar Consulta' : 'Reschedule Consultation'}</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = ROUTES.services}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 mr-4"
              >
                {isPortuguese ? 'Explorar Outros Serviços' : 'Explore Other Services'}
              </button>
              
              <button
                onClick={() => window.location.href = ROUTES.home}
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-200"
              >
                {isPortuguese ? 'Voltar ao Início' : 'Return to Home'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}