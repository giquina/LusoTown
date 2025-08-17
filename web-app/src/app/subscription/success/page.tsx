'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { 
  CheckCircleIcon, 
  HeartIcon,
  ArrowRightIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

function SuccessPageContent() {
  const { language, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { checkSubscriptionStatus } = useSubscription()
  const [isLoading, setIsLoading] = useState(true)
  
  const isPortuguese = language === 'pt'
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Verify the subscription and update status
    const verifySubscription = async () => {
      if (sessionId) {
        // Wait a moment for webhook to process
        setTimeout(async () => {
          await checkSubscriptionStatus()
          setIsLoading(false)
        }, 2000)
      } else {
        setIsLoading(false)
      }
    }

    verifySubscription()
  }, [sessionId, checkSubscriptionStatus])

  const nextSteps = [
    {
      icon: UserGroupIcon,
      title: isPortuguese ? 'Explore a Comunidade' : 'Explore the Community',
      description: isPortuguese ? 'Conecte-se com outros membros portugueses em Londres' : 'Connect with other Portuguese members in London',
      action: isPortuguese ? 'Ver Membros' : 'View Members',
      link: '/members'
    },
    {
      icon: CalendarDaysIcon,
      title: isPortuguese ? 'Junte-se a Eventos' : 'Join Events',
      description: isPortuguese ? 'Descubra eventos culturais e atividades da comunidade' : 'Discover cultural events and community activities',
      action: isPortuguese ? 'Ver Eventos' : 'View Events',
      link: '/events'
    },
    {
      icon: ShieldCheckIcon,
      title: isPortuguese ? 'Reserve Transporte' : 'Book Transport',
      description: isPortuguese ? 'Acesso aos nossos serviços premium de transporte' : 'Access our premium transport services',
      action: isPortuguese ? 'Ver Serviços' : 'View Services',
      link: '/transport'
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-12 bg-gradient-to-br from-green-50 via-white to-primary-50 min-h-screen">
          <div className="container-width w-full">
            <div className="max-w-3xl mx-auto text-center">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20"
                >
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {isPortuguese ? 'Processando a sua subscrição...' : 'Processing your subscription...'}
                  </h1>
                  <p className="text-gray-600">
                    {isPortuguese ? 'Aguarde um momento' : 'Please wait a moment'}
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Success Header */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircleIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!'}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      {isPortuguese 
                        ? 'A sua subscrição foi ativada com sucesso. Agora faz parte da comunidade portuguesa de Londres!'
                        : 'Your subscription has been successfully activated. You\'re now part of London\'s Portuguese community!'
                      }
                    </p>
                    
                    {/* Welcome Badge */}
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                      <HeartIcon className="w-5 h-5 text-primary-500" />
                      <span className="font-semibold text-gray-900">
                        {isPortuguese ? 'Membro Ativo da LusoTown' : 'Active LusoTown Member'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Next Steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      {isPortuguese ? 'Próximos Passos' : 'Next Steps'}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {nextSteps.map((step, index) => {
                        const IconComponent = step.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                          >
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <IconComponent className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                            <a
                              href={step.link}
                              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                            >
                              {step.action}
                              <ArrowRightIcon className="w-4 h-4" />
                            </a>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      {isPortuguese ? 'Pronto para começar?' : 'Ready to get started?'}
                    </h3>
                    <p className="text-primary-100 mb-6">
                      {isPortuguese 
                        ? 'Explore o seu novo lar digital na comunidade portuguesa de Londres.'
                        : 'Explore your new digital home in London\'s Portuguese community.'
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        {isPortuguese ? 'Ir para o Dashboard' : 'Go to Dashboard'}
                      </button>
                      <button
                        onClick={() => router.push('/events')}
                        className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                      >
                        {isPortuguese ? 'Ver Eventos' : 'Browse Events'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Receipt Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-sm text-gray-500">
                      {isPortuguese 
                        ? 'Receberá um email de confirmação em breve com os detalhes da sua subscrição.'
                        : 'You will receive a confirmation email shortly with your subscription details.'
                      }
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense 
      fallback={
        <main className="min-h-screen">
          <div className="pt-16">
            <section className="py-12 bg-gradient-to-br from-green-50 via-white to-primary-50 min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
                <p className="text-gray-600">Please wait a moment</p>
              </div>
            </section>
          </div>
        </main>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}