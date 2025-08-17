'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UnifiedExperienceHub from '@/components/UnifiedExperienceHub'
import ServiceCommunityBridge from '@/components/ServiceCommunityBridge'
import UnifiedPremiumExperience from '@/components/UnifiedPremiumExperience'
import CrossPlatformNavigationWidget from '@/components/CrossPlatformNavigationWidget'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'

export default function UnifiedExperiencePage() {
  const { language } = useLanguage()
  const { trackActivity } = usePlatformIntegration()
  const [activeDemo, setActiveDemo] = useState<'hub' | 'bridge' | 'premium'>('hub')
  const isPortuguese = language === 'pt'

  const handleDemoChange = (demo: 'hub' | 'bridge' | 'premium') => {
    setActiveDemo(demo)
    trackActivity({
      activityType: 'networking',
      serviceType: 'community',
      points: 10,
      metadata: { 
        demoSection: demo,
        page: 'unified_experience_demo' 
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {isPortuguese 
                  ? 'Experiência Unificada LusoTown' 
                  : 'LusoTown Unified Experience'
                }
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                {isPortuguese
                  ? 'Uma plataforma integrada onde transporte premium, eventos culturais e networking da comunidade portuguesa se conectam perfeitamente'
                  : 'An integrated platform where premium transport, cultural events, and Portuguese community networking connect seamlessly'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleDemoChange('hub')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'hub'
                      ? 'bg-white text-primary-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isPortuguese ? 'Centro de Experiências' : 'Experience Hub'}
                </button>
                <button
                  onClick={() => handleDemoChange('bridge')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'bridge'
                      ? 'bg-white text-primary-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isPortuguese ? 'Ponte Serviço-Comunidade' : 'Service-Community Bridge'}
                </button>
                <button
                  onClick={() => handleDemoChange('premium')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'premium'
                      ? 'bg-white text-primary-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isPortuguese ? 'Experiência Premium' : 'Premium Experience'}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {activeDemo === 'hub' && (
            <UnifiedExperienceHub 
              initialTab="discover"
              onServiceBooked={() => console.log('Service booked')}
              onEventJoined={() => console.log('Event joined')}
            />
          )}
          
          {activeDemo === 'bridge' && (
            <ServiceCommunityBridge 
              triggerContext="homepage"
              onIntegrationSelected={(integration) => console.log('Integration selected:', integration)}
            />
          )}
          
          {activeDemo === 'premium' && (
            <UnifiedPremiumExperience 
              showUpgradePrompt={true}
              currentService="community"
              onUpgradeClick={() => console.log('Upgrade clicked')}
            />
          )}
        </motion.div>

        {/* Integration Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese 
                  ? 'Por Que a Integração Funciona' 
                  : 'Why Integration Works'
                }
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese
                  ? 'LusoTown não é apenas uma coleção de serviços - é um ecossistema que cria valor através de conexões inteligentes'
                  : 'LusoTown isn\'t just a collection of services - it\'s an ecosystem that creates value through intelligent connections'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Experiência Perfeita' : 'Seamless Experience'}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese
                    ? 'Uma única conta, uma única subscrição, acesso a tudo - transporte, eventos, networking e comunidade'
                    : 'One account, one subscription, access to everything - transport, events, networking, and community'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Valor Amplificado' : 'Amplified Value'}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese
                    ? 'Cada serviço torna-se mais valioso quando conectado - transporte compartilhado, networking em eventos, descontos cruzados'
                    : 'Each service becomes more valuable when connected - shared transport, event networking, cross-discounts'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Comunidade Portuguesa Autêntica' : 'Authentic Portuguese Community'}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese
                    ? 'Não apenas um serviço, mas uma comunidade real onde portugueses se conectam, prosperam e preservam cultura'
                    : 'Not just a service, but a real community where Portuguese speakers connect, thrive, and preserve culture'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese 
                  ? 'Pronto para Experimentar?' 
                  : 'Ready to Experience?'
                }
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {isPortuguese
                  ? 'Junte-se à plataforma portuguesa mais integrada de Londres'
                  : 'Join London\'s most integrated Portuguese platform'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
                >
                  {isPortuguese ? 'Começar Agora' : 'Get Started Now'}
                </a>
                <a
                  href="/transport"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  {isPortuguese ? 'Explorar Transportes' : 'Explore Transport'}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Cross-Platform Navigation Widget */}
      <CrossPlatformNavigationWidget 
        currentPage="community"
        position="bottom-right"
        alwaysVisible={true}
      />

      <Footer />
    </div>
  )
}