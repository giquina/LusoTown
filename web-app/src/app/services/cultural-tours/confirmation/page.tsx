'use client'

import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { MessageSquare, Star } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function CulturalToursConfirmationPage() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const confirmationId = `CULT-${Date.now().toString().slice(-6)}`

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
              {isPortuguese ? 'Tour Cultural Reservado!' : 'Cultural Tour Booked!'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {isPortuguese
                ? 'O seu tour cultural português foi confirmado com sucesso'
                : 'Your Portuguese cultural tour has been successfully confirmed'
              }
            </p>

            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-lg font-semibold">
              <Star className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Confirmação' : 'Confirmation'}: {confirmationId}
            </div>
          </motion.div>

          {/* Tour Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Detalhes do Tour' : 'Tour Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Tour Selecionado' : 'Selected Tour'}
                  </h3>
                  <p className="text-gray-700">Portuguese Heritage Trail</p>
                  <p className="text-sm text-gray-500">
                    {isPortuguese 
                      ? 'Descubra locais portugueses escondidos em Central London'
                      : 'Discover hidden Portuguese sites across Central London'
                    }
                  </p>
                </div>

                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Data do Tour' : 'Tour Date'}
                    </span>
                    <span className="font-medium text-gray-900">
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
                      {isPortuguese ? 'Duração' : 'Duration'}
                    </span>
                    <span className="font-medium text-gray-900">3 {isPortuguese ? 'horas' : 'hours'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Ponto de Encontro' : 'Meeting Point'}
                    </span>
                    <span className="font-medium text-gray-900">Trafalgar Square</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {isPortuguese ? 'Participantes' : 'Participants'}
                    </span>
                    <span className="font-medium text-gray-900">2 {isPortuguese ? 'pessoas' : 'people'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {isPortuguese ? 'Total Pago' : 'Total Paid'}
                    </span>
                    <span className="text-2xl font-bold text-primary-600">£90</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'O que Esperar' : 'What to Expect'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isPortuguese ? 'Locais Exclusivos' : 'Exclusive Locations'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? 'Acesso a locais portugueses históricos normalmente fechados ao público'
                    : 'Access to historic Portuguese sites normally closed to the public'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isPortuguese ? 'Guia Bilíngue' : 'Bilingual Guide'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? 'Especialista em cultura portuguesa fluente em português e inglês'
                    : 'Portuguese culture expert fluent in Portuguese and English'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isPortuguese ? 'Experiência Autêntica' : 'Authentic Experience'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? 'Histórias e tradições portuguesas partilhadas por especialistas locais'
                    : 'Portuguese stories and traditions shared by local experts'
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Informações Importantes' : 'Important Information'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Contacto do Tour' : 'Tour Contact'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">+44 20 7123 4567</span>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">tours@lusotown.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">
                      {isPortuguese ? 'WhatsApp: +44 7700 900123' : 'WhatsApp: +44 7700 900123'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Informações do Tour' : 'Tour Information'}
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {isPortuguese ? 'Chegue 15 minutos antes' : 'Arrive 15 minutes early'}</li>
                  <li>• {isPortuguese ? 'Calçado confortável recomendado' : 'Comfortable shoes recommended'}</li>
                  <li>• {isPortuguese ? 'Tour realiza-se com chuva ligeira' : 'Tour runs in light rain'}</li>
                  <li>• {isPortuguese ? 'Cancelamento gratuito até 24h antes' : 'Free cancellation up to 24h before'}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/services'}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 mr-4"
              >
                {isPortuguese ? 'Explorar Outros Serviços' : 'Explore Other Services'}
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
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