'use client'

import { motion } from 'framer-motion'
import { 
  UserGroupIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UserPlusIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function HowConnectionsWork() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const steps = [
    {
      icon: CalendarDaysIcon,
      title: isPortuguese ? 'Participe em Eventos' : 'Attend Events',
      description: isPortuguese 
        ? 'Reserve e participe em eventos, tours ou experiências com outros falantes de português.'
        : 'Book and attend events, tours or experiences with other Portuguese speakers.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: UserGroupIcon,
      title: isPortuguese ? 'Conecte-se Automaticamente' : 'Connect Automatically',
      description: isPortuguese 
        ? 'Quando participa no mesmo evento que outro utilizador, vocês conectam-se automaticamente.'
        : 'When you attend the same event as another user, you automatically connect.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: BellAlertIcon,
      title: isPortuguese ? 'Receba Notificações' : 'Get Notifications',
      description: isPortuguese 
        ? 'Seja notificado quando fizer novas conexões e quando as suas conexões se inscreverem em eventos.'
        : 'Get notified when you make new connections and when your connections sign up for events.',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: isPortuguese ? 'Cresça a Sua Rede' : 'Grow Your Network',
      description: isPortuguese 
        ? 'Visite "A Minha Rede" para ver as suas conexões, eventos em comum e planear encontros futuros.'
        : 'Visit "My Network" to see your connections, shared events, and plan future meetups.',
      color: 'from-coral-500 to-coral-600'
    }
  ]

  const benefits = [
    {
      icon: '🎯',
      title: isPortuguese ? 'Baseado em Eventos' : 'Event-Based',
      description: isPortuguese 
        ? 'Apenas se conecta com pessoas que participaram nos mesmos eventos que você'
        : 'Only connect with people who attended the same events as you'
    },
    {
      icon: '🔒',
      title: isPortuguese ? 'Privado & Seguro' : 'Private & Safe',
      description: isPortuguese 
        ? 'As suas conexões são privadas e apenas visíveis para si'
        : 'Your connections are private and only visible to you'
    },
    {
      icon: '🇵🇹',
      title: isPortuguese ? 'Comunidade Lusófona' : 'Portuguese Community',
      description: isPortuguese 
        ? 'Conecte-se especificamente com falantes de português na sua área'
        : 'Connect specifically with Portuguese speakers in your area'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-secondary-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-accent-300 rounded-full"></div>
        <div className="absolute bottom-1/4 left-20 w-12 h-12 bg-coral-300 rounded-full"></div>
      </div>

      <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <UserGroupIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'LusoTown Connections' : 'LusoTown Connections'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {isPortuguese 
              ? 'Como Funcionam as Conexões'
              : 'How Connections Work'
            }
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {isPortuguese 
              ? 'Construa naturalmente a sua rede de falantes de português através de experiências partilhadas. Quanto mais eventos participar, maior será a sua rede.'
              : 'Naturally build your network of Portuguese speakers through shared experiences. The more events you attend, the larger your network grows.'
            }
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent -translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10 group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-bold text-gray-400 mb-2">
                      {isPortuguese ? 'PASSO' : 'STEP'} {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Porquê o LusoTown Connections?' : 'Why LusoTown Connections?'}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Criámos um sistema de networking que prioriza conexões autênticas baseadas em experiências reais partilhadas.'
                : 'We created a networking system that prioritizes authentic connections based on real shared experiences.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/events"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              {isPortuguese ? 'Descobrir Eventos' : 'Discover Events'}
            </a>
            
            <a
              href="/my-network"
              className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              <UserGroupIcon className="w-5 h-5" />
              {isPortuguese ? 'Ver A Minha Rede' : 'View My Network'}
            </a>
          </div>
          
          <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto">
            {isPortuguese 
              ? 'Comece a participar em eventos hoje e construa a sua rede de falantes de português!'
              : 'Start attending events today and build your network of Portuguese speakers!'
            }
          </p>
        </motion.div>
      </div>
    </section>
  )
}