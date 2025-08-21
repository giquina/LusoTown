'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { 
  XCircleIcon, 
  ArrowLeftIcon,
  CreditCardIcon,
  HeartIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { ROUTES } from '@/config/routes'

export default function SubscriptionCancelledPage() {
  const { language, t } = useLanguage()
  const router = useRouter()
  const { createSubscription } = useSubscription()
  
  const isPortuguese = language === 'pt'

  const handleTryAgain = async () => {
    await createSubscription()
  }

  const reasons = [
    {
      title: isPortuguese ? 'Problema técnico?' : 'Technical issue?',
      description: isPortuguese ? 'Às vezes ocorrem problemas temporários' : 'Sometimes temporary issues occur',
      action: isPortuguese ? 'Tentar novamente' : 'Try again'
    },
    {
      title: isPortuguese ? 'Mudou de ideias?' : 'Changed your mind?',
      description: isPortuguese ? 'Pode sempre voltar mais tarde' : 'You can always come back later',
      action: isPortuguese ? 'Explorar gratuitamente' : 'Explore for free'
    },
    {
      title: isPortuguese ? 'Precisa de ajuda?' : 'Need help?',
      description: isPortuguese ? 'A nossa equipa está aqui para ajudar' : 'Our team is here to help',
      action: isPortuguese ? 'Contactar suporte' : 'Contact support'
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-12 bg-gradient-to-br from-red-50 via-white to-gray-50 min-h-screen">
          <div className="container-width w-full">
            <div className="max-w-2xl mx-auto text-center">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircleIcon className="w-10 h-10 text-coral-500" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Subscrição Cancelada' : 'Subscription Cancelled'}
                </h1>
                <p className="text-lg text-secondary-600 mb-6">
                  {isPortuguese 
                    ? 'O processo de subscrição foi cancelado. Não foi efetuado qualquer pagamento.'
                    : 'The subscription process was cancelled. No payment has been made.'
                  }
                </p>
              </motion.div>

              {/* What happened */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'O que aconteceu?' : 'What happened?'}
                </h2>
                <p className="text-secondary-600 mb-4">
                  {isPortuguese 
                    ? 'O seu pagamento foi cancelado ou interrompido antes de ser concluído. Isto pode acontecer por vários motivos:'
                    : 'Your payment was cancelled or interrupted before completion. This can happen for several reasons:'
                  }
                </p>
                <div className="text-left space-y-2 text-sm text-secondary-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>
                      {isPortuguese 
                        ? 'Cancelou o processo de pagamento'
                        : 'You cancelled the payment process'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>
                      {isPortuguese 
                        ? 'Problema temporário com o pagamento'
                        : 'Temporary payment issue'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>
                      {isPortuguese 
                        ? 'Fechou a janela do navegador'
                        : 'Browser window was closed'
                      }
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-3 gap-6 mb-8"
              >
                {reasons.map((reason, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <QuestionMarkCircleIcon className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-sm text-secondary-600 mb-4">{reason.description}</p>
                    <button
                      onClick={() => {
                        if (index === 0) handleTryAgain()
                        else if (index === 1) router.push('/')
                        else router.push('/contact')
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {reason.action}
                    </button>
                  </div>
                ))}
              </motion.div>

              {/* Main Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CreditCardIcon className="w-5 h-5" />
                  {isPortuguese ? 'Tentar Subscrever Novamente' : 'Try Subscribe Again'}
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="border-2 border-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  {isPortuguese ? 'Voltar ao Início' : 'Back to Home'}
                </button>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <HeartIcon className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">
                  {isPortuguese ? 'Ainda interessado em juntar-se?' : 'Still interested in joining?'}
                </h3>
                <p className="text-sm text-secondary-600 mb-4">
                  {isPortuguese 
                    ? 'A comunidade portuguesa de Londres está sempre aqui para si. Pode explorar o que oferecemos sem compromisso.'
                    : 'London\'s Portuguese community is always here for you. You can explore what we offer without commitment.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={ROUTES.events}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
                  >
                    {isPortuguese ? 'Ver Eventos Próximos' : 'View Upcoming Events'}
                  </a>
                    <a
                      href={ROUTES.contact}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
                  >
                    {isPortuguese ? 'Falar com a Equipa' : 'Talk to Our Team'}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}