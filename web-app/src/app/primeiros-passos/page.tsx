'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'
import PrimeirosPassos from '@/components/PrimeirosPassos'
import { 
  PlayCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

export default function PrimeirosPassosPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if onboarding was already completed
    const completed = localStorage.getItem('lusotown-onboarding-completed')
    setIsCompleted(completed === 'true')
  }, [])

  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setIsCompleted(true)
    setShowOnboarding(false)
    // Could redirect to dashboard or main page
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  const features = [
    {
      icon: UserGroupIcon,
      titleEn: 'Connect with Community',
      titlePt: 'Conectar com a Comunidade',
      descriptionEn: 'Find Your Match among Portuguese speakers from all over London and the United Kingdom',
      descriptionPt: 'Encontre o seu match entre falantes de português de todo Londres e Reino Unido'
    },
    {
      icon: CalendarDaysIcon,
      titleEn: 'Discover Events',
      titlePt: 'Descobrir Eventos',
      descriptionEn: 'Find cultural activities, festivals, and meetups',
      descriptionPt: 'Encontrar atividades culturais, festivais e encontros'
    },
    {
      icon: HeartIcon,
      titleEn: 'Build Your Social Calendar',
      titlePt: 'Construir o Seu Calendário Social',
      descriptionEn: 'Save favorites and create your personalized experience',
      descriptionPt: 'Guardar favoritos e criar a sua experiência personalizada'
    }
  ]

  const steps = [
    {
      number: 1,
      titleEn: 'Create Your Profile',
      titlePt: 'Criar o Seu Perfil',
      descriptionEn: 'Tell us about yourself and your interests',
      descriptionPt: 'Conte-nos sobre si e os seus interesses'
    },
    {
      number: 2,
      titleEn: 'Set Your Preferences',
      titlePt: 'Definir as Suas Preferências',
      descriptionEn: 'Choose your language and location settings',
      descriptionPt: 'Escolher o idioma e definições de localização'
    },
    {
      number: 3,
      titleEn: 'Explore & Connect',
      titlePt: 'Explorar e Conectar',
      descriptionEn: 'Start discovering events and connecting with community',
      descriptionPt: 'Começar a descobrir eventos e conectar com a comunidade'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {language === 'pt' ? 'Primeiros Passos' : 'First Steps'}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Bem-vindo à sua nova casa portuguesa em Londres. Vamos começar esta jornada juntos!'
                  : 'Welcome to your new Portuguese home in London. Let\'s start this journey together!'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {isCompleted ? (
                  <div className="flex items-center bg-secondary-500 text-white px-8 py-4 rounded-lg font-semibold">
                    <CheckCircleIconSolid className="w-6 h-6 mr-3" />
                    {language === 'pt' ? 'Onboarding Completo!' : 'Onboarding Complete!'}
                  </div>
                ) : (
                  <button
                    onClick={startOnboarding}
                    className="flex items-center bg-accent-500 text-accent-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
                  >
                    <PlayCircleIcon className="w-6 h-6 mr-3" />
                    {language === 'pt' ? 'Começar Agora' : 'Start Now'}
                  </button>
                )}
                
                <div className="flex items-center text-primary-200">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{language === 'pt' ? '5 minutos para completar' : '5 minutes to complete'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'O que o espera' : 'What awaits you'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Descubra tudo o que a LusoTown tem para oferecer à comunidade de falantes de português'
                  : 'Discover everything LusoTown has to offer the Portuguese-speaking community'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? feature.titlePt : feature.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'pt' ? feature.descriptionPt : feature.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Como funciona' : 'How it works'}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'pt' 
                  ? 'Três passos simples para começar'
                  : 'Three simple steps to get started'
                }
              </p>
            </div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? step.titlePt : step.titleEn}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {language === 'pt' ? step.descriptionPt : step.descriptionEn}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block">
                      <ArrowRightIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              {!isCompleted && (
                <button
                  onClick={startOnboarding}
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
                >
                  {language === 'pt' ? 'Começar os Primeiros Passos' : 'Start First Steps'}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Success Message for Completed */}
        {isCompleted && (
          <section className="py-20 bg-secondary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <CheckCircleIconSolid className="w-24 h-24 text-secondary-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Parabéns!' : 'Congratulations!'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {language === 'pt' 
                  ? 'Completou os primeiros passos. Agora pode explorar tudo o que a LusoTown tem para oferecer!'
                  : 'You\'ve completed the first steps. Now you can explore everything LusoTown has to offer!'
                }
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {language === 'pt' ? 'Explorar a Comunidade' : 'Explore Community'}
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Onboarding Modal */}
      <PrimeirosPassos
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  )
}