'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserGroupIcon, PresentationChartBarIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function UserTypeSelection() {
  const [showModal, setShowModal] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    // Check if user has already selected their type
    const userType = localStorage.getItem('lusotown-user-type')
    if (!userType) {
      setShowModal(true)
    } else {
      setIsSelected(true)
    }
  }, [])

  const handleUserTypeSelection = (userType: string) => {
    localStorage.setItem('lusotown-user-type', userType)
    setIsSelected(true)
    setShowModal(false)
    
    // If organizer, could redirect to organizer dashboard or show welcome
    if (userType === 'organizer') {
      // Optional: Show organizer welcome or redirect
      console.log('Welcome, event organizer!')
    }
  }

  const content = {
    en: {
      title: 'Welcome to LusoTown!',
      subtitle: 'Choose how you\'d like to participate in our community',
      description: 'Connect with Portuguese speakers across the UK. Discover cultural events, join discussions, and celebrate our shared heritage together.',
      disclaimer: 'Our platform welcomes all Portuguese speakers and their families - from children to seniors, everyone is welcome to join our community.',
      organizer: {
        title: 'Event Organizer/Promoter',
        description: 'Share Portuguese culture by creating and promoting events throughout the UK',
        features: ['Create and manage events', 'Reach Portuguese communities across the UK', 'Promote cultural activities and businesses', 'Build engaged audiences'],
        button: 'I create or promote events'
      },
      user: {
        title: 'Free Community Member',
        description: 'Explore and participate in the vibrant Portuguese community across the UK',
        features: ['Browse events nationwide', 'Join community discussions', 'Discover Portuguese businesses', 'Connect with fellow Portuguese speakers'],
        button: 'I want to explore events'
      },
      skip: 'Skip for now'
    },
    pt: {
      title: 'Bem-vindos à LusoTown!',
      subtitle: 'Escolhe como gostarias de participar na nossa comunidade',
      description: 'Conecta-te com falantes de português por todo o Reino Unido. Descobre eventos culturais, junta-te a discussões e celebra a nossa herança partilhada.',
      disclaimer: 'Nota: Eventos individuais podem ter as suas próprias restrições de idade, mas a nossa plataforma acolhe todos os falantes de português e as suas famílias.',
      organizer: {
        title: 'Organizador/Promotor de Eventos',
        description: 'Partilha a cultura portuguesa criando e promovendo eventos por todo o Reino Unido',
        features: ['Criar e gerir eventos', 'Alcançar comunidades portuguesas por todo o Reino Unido', 'Promover atividades culturais e negócios', 'Construir audiências envolvidas'],
        button: 'Crio ou promovo eventos'
      },
      user: {
        title: 'Membro Gratuito da Comunidade',
        description: 'Explora e participa na vibrante comunidade portuguesa por todo o Reino Unido',
        features: ['Explorar eventos por todo o país', 'Juntar-se a discussões comunitárias', 'Descobrir negócios portugueses', 'Conectar com outros falantes de português'],
        button: 'Quero explorar eventos'
      },
      skip: 'Pular por agora'
    }
  }

  const strings = content[language as keyof typeof content] || content.en

  if (isSelected) return null

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {strings.title}
              </h2>
              
              <p className="text-lg text-gray-700 mb-2 font-medium">
                {strings.subtitle}
              </p>
              
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-3">
                {strings.description}
              </p>
              
              <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 max-w-2xl mx-auto">
                {strings.disclaimer}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Event Organizer Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-200 rounded-xl p-6 cursor-pointer hover:border-red-400 transition-all duration-200"
                onClick={() => handleUserTypeSelection('organizer')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 rounded-xl flex items-center justify-center">
                    <PresentationChartBarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{strings.organizer.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {strings.organizer.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {strings.organizer.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-yellow-700 transition-all duration-200 shadow-lg">
                  {strings.organizer.button}
                </button>
              </motion.div>

              {/* Community Member Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-secondary-50 to-primary-50 border-2 border-green-200 rounded-xl p-6 cursor-pointer hover:border-green-400 transition-all duration-200"
                onClick={() => handleUserTypeSelection('user')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-xl flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{strings.user.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {strings.user.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {strings.user.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-secondary-600 to-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:from-secondary-700 hover:to-primary-700 transition-all duration-200 shadow-lg">
                  {strings.user.button}
                </button>
              </motion.div>
            </div>

            <div className="text-center">
              <button
                onClick={() => handleUserTypeSelection('user')}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
              >
                {strings.skip}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}