'use client'

import { motion } from 'framer-motion'
import { 
  DevicePhoneMobileIcon, 
  BellIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon,
  PlayIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolidIcon,
  PlayIcon as PlaySolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'

const getMobileFeatures = (t: any, isPortuguese: boolean) => [
  {
    icon: HeartIcon,
    solidIcon: HeartSolidIcon,
    gradient: 'from-action-500 to-secondary-500',
    title: isPortuguese ? 'Encontre os Seus Matches' : 'Meet Your Matches',
    description: isPortuguese 
      ? 'Algoritmo inteligente liga portugueses baseado em interesses, localização e compatibilidade cultural'
      : 'Smart algorithm connects Portuguese speakers based on interests, location, and cultural compatibility'
  },
  {
    icon: CalendarIcon,
    solidIcon: CalendarIcon,
    gradient: 'from-secondary-500 to-accent-500',
    title: isPortuguese ? 'Encontros & Eventos' : 'Meetups & Events',
    description: isPortuguese
      ? 'Desde noites íntimas de Fado em Stockwell até networking na City'
      : 'From intimate Fado nights in Stockwell to networking in the City'
  },
  {
    icon: PlayIcon,
    solidIcon: PlaySolidIcon,
    gradient: 'from-primary-500 to-coral-500',
    title: isPortuguese ? 'LusoTown TV' : 'LusoTown TV',
    description: isPortuguese
      ? 'Assista conteúdo cultural português ao vivo e conecte-se com criadores'
      : 'Watch live Lusophone cultural content and connect with community organizers'
  },
  {
    icon: UserGroupIcon,
    solidIcon: UserGroupIcon,
    gradient: 'from-accent-500 to-coral-500',
    title: isPortuguese ? 'Comunidades Ativas' : 'Active Communities',
    description: isPortuguese
      ? 'Conecte-se através de interesses partilhados - da culinária ao futebol'
      : 'Connect through shared interests - from Portuguese cuisine to football'
  },
  {
    icon: BellIcon,
    solidIcon: BellIcon,
    gradient: 'from-primary-500 to-secondary-500',
    title: isPortuguese ? 'Notificações Inteligentes' : 'Smart Notifications',
    description: isPortuguese 
      ? 'Nunca perca convites para eventos ou mensagens da comunidade'
      : 'Never miss event invites or community messages'
  },
  {
    icon: MapPinIcon,
    solidIcon: MapPinIcon,
    gradient: 'from-coral-500 to-action-500',
    title: isPortuguese ? 'Londres Portuguesa' : 'Lusophone London',
    description: isPortuguese
      ? 'Descubra a história e cultura portuguesa espalhada por Londres'
      : 'Discover Portuguese history and culture throughout London'
  }
]

export default function AppDownloadSection() {
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'
  const mobileFeatures = getMobileFeatures(t, isPortuguese)
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
      {/* Lusophone Cultural Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-secondary-200/40 to-accent-200/30 rounded-full animate-pulse opacity-60" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-br from-action-200/40 to-coral-200/30 rounded-full animate-bounce opacity-50" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-primary-200/50 to-secondary-200/40 rounded-full opacity-40"></div>
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-secondary-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-accent-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-2/3 w-4 h-4 bg-action-400/50 rounded-full"></div>
        {/* Portuguese flag colors floating elements */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-green-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-accent-100 border border-secondary-200 rounded-full px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <SparklesIcon className="h-4 w-4 text-primary-700" />
              <span className="text-sm font-bold text-primary-800">
                {isPortuguese ? 'Disponível no Telemóvel • Mobile App Available' : 'Mobile App Available • Disponível no Telemóvel'}
              </span>
            </motion.div>

            {/* Enhanced Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {isPortuguese ? (
                  <>
                    Encontre os Seus{' '}
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Matches Portugueses
                    </span>
                    {' '}No Telemóvel
                  </>
                ) : (
                  <>
                    Meet Your{' '}
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Lusophone Matches
                    </span>
                    {' '}On Mobile
                  </>
                )}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                {isPortuguese 
                  ? 'Descubra portugueses compatíveis em Londres baseado nos seus interesses, localização e valores culturais. O nosso algoritmo inteligente conecta-o com a sua comunidade perfeita.'
                  : 'Discover compatible Portuguese speakers in London based on your interests, location, and cultural values. Our smart algorithm connects you with your perfect community.'}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-primary-50 via-secondary-50/80 to-accent-50 rounded-3xl p-8 border border-primary-200/60 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <SparklesIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-xl mb-2">
                      {isPortuguese 
                        ? `Conecte-se com ${communityStats.members} portugueses verificados em Londres`
                        : `Connect with ${communityStats.members} verified Portuguese speakers in London`}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {isPortuguese 
                        ? 'O nosso algoritmo inteligente já criou milhares de conexões autênticas entre portugueses. Descarregue e encontre os seus matches hoje.'
                        : 'Our smart algorithm has already created thousands of authentic connections between Portuguese speakers. Download and find your matches today.'}
                    </p>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-700">{communityStats.events} {isPortuguese ? 'eventos mensais' : 'monthly events'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <span className="text-primary-700">{communityStats.events} {isPortuguese ? 'eventos mensais' : 'monthly events'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Lusophone Mobile Features - 3x2 Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {isPortuguese ? 'Encontre os Seus Matches Portugueses Perfeitos' : 'Find Your Perfect Lusophone Matches'}
                </h3>
                <p className="text-lg text-gray-600">
                  {isPortuguese ? 'Algoritmo inteligente conecta-o com portugueses compatíveis em Londres' : 'Smart algorithm connects you with compatible Portuguese speakers in London'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {mobileFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/60 hover:border-primary-200/50 hover:bg-white/95 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl shadow-lg relative overflow-hidden"
                  >
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        {feature.solidIcon ? (
                          <feature.solidIcon className="w-7 h-7 text-white" />
                        ) : (
                          <feature.icon className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 text-base mb-2 group-hover:text-primary-700 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? 'Comece a Fazer Matches Hoje' : 'Start Matching Today'}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese ? 'Grátis para iOS e Android • Encontre a sua comunidade de falantes de português' : 'Free for iOS and Android • Find your Portuguese-speaking community'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                {/* Premium App Store Button */}
                <a 
                  href="https://apps.apple.com/app/lusotown-london" 
                  className="group inline-flex items-center bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-10 py-6 rounded-3xl transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl shadow-xl border border-gray-700/30 hover:border-gray-600/50 min-w-[200px] justify-center"
                  aria-label={isPortuguese ? 'Descarregar LusoTown na App Store' : 'Download LusoTown on the App Store'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mr-6">
                    <svg className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm opacity-90 font-medium">
                      {isPortuguese ? 'Descarregar na' : 'Download on the'}
                    </div>
                    <div className="text-2xl font-bold -mt-1 tracking-tight group-hover:text-primary-200 transition-colors duration-300">
                      App Store
                    </div>
                  </div>
                </a>

                {/* Premium Google Play Button */}
                <a 
                  href="https://play.google.com/store/apps/details?id=com.lusotown.london" 
                  className="group inline-flex items-center bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-10 py-6 rounded-3xl transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl shadow-xl border border-gray-700/30 hover:border-gray-600/50 min-w-[200px] justify-center"
                  aria-label={isPortuguese ? 'Obter LusoTown no Google Play' : 'Get LusoTown on Google Play'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mr-6">
                    <svg className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm opacity-90 font-medium">
                      {isPortuguese ? 'Obter no' : 'Get it on'}
                    </div>
                    <div className="text-2xl font-bold -mt-1 tracking-tight group-hover:text-primary-200 transition-colors duration-300">
                      Google Play
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Enhanced Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-center space-y-4"
            >
              <p className="text-gray-600 text-base font-medium">
                {isPortuguese 
                  ? 'Grátis para descarregar • Disponível no iOS 14+ e Android 8+'
                  : 'Free to download • Available on iOS 14+ and Android 8+'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-semibold">
                    {isPortuguese ? '100% Seguro e Verificado' : '100% Safe and Verified'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-action-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-action-700 font-semibold">
                    {isPortuguese ? 'Matches Inteligentes' : 'Smart Matching'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  <span className="text-secondary-700 font-semibold">
                    {communityStats.members} {isPortuguese ? 'portugueses conectados' : 'Lusophone connected'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Enhanced Lusophone-themed Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-secondary-400/25 to-accent-500/20 blur-3xl transform scale-125 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-coral-400/20 to-action-400/15 blur-2xl transform scale-110 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
              
              {/* Premium Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-800 to-black rounded-[3rem] p-3 shadow-2xl border border-gray-700/50" style={{ width: '340px', height: '680px' }}>
                <div className="bg-white rounded-[2.5rem] overflow-hidden w-full h-full shadow-inner">
                  
                  {/* Enhanced Status Bar */}
                  <div className="bg-white px-6 py-3 flex justify-between items-center text-xs font-medium text-gray-900 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium text-xs">LusoTown</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-gray-300 rounded-sm relative">
                        <div className="w-5 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                        <div className="w-1 h-1 bg-green-500 rounded-sm absolute -right-0.5 top-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Lusophone App Interface Mockup */}
                  <div className="bg-gradient-to-br from-primary-50/80 via-secondary-50/60 to-accent-50/40 flex-1 flex flex-col relative overflow-hidden">
                    {/* Floating Lusophone elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-secondary-200/40 to-accent-200/30 rounded-full animate-bounce opacity-60" style={{ animationDuration: '3s' }}></div>
                    
                    {/* Enhanced Lusophone-themed Header - Matches Focus */}
                    <div className="bg-gradient-to-r from-white via-primary-50/30 to-secondary-50/30 px-6 py-5 shadow-lg border-b border-primary-100/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-action-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                            <HeartSolidIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-gray-900">
                              {isPortuguese ? 'Os Seus Matches' : 'Your Matches'}
                            </h1>
                            <p className="text-xs text-action-600 font-medium">
                              {isPortuguese ? '8 novos matches hoje' : '8 new matches today'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-action-100 to-coral-100 rounded-xl flex items-center justify-center border border-action-200/50">
                              <BellIcon className="h-5 w-5 text-action-700" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Lusophone Matches Interface */}
                    <div className="p-6 space-y-4 flex-1 relative">
                      
                      {/* Top Lusophone Match Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-action-200/40 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-action-100/50 to-transparent rounded-bl-2xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                              <div className="w-full h-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">M</span>
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {isPortuguese ? 'Maria Santos' : 'Maria Santos'}
                              </h3>
                              <div className="flex items-center gap-1">
                                <HeartSolidIcon className="h-4 w-4 text-action-500" />
                                <span className="text-sm font-bold text-action-600">96%</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {isPortuguese 
                                ? 'Lisboa • Kensington • Adora fado e literatura portuguesa'
                                : 'Lisbon • Kensington • Loves fado and Lusophone literature'}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="px-2 py-1 bg-secondary-100 rounded-lg text-xs font-medium text-secondary-700">
                                {isPortuguese ? 'Fado' : 'Fado'}
                              </div>
                              <div className="px-2 py-1 bg-accent-100 rounded-lg text-xs font-medium text-accent-700">
                                {isPortuguese ? 'Literatura' : 'Literature'}
                              </div>
                              <div className="px-2 py-1 bg-primary-100 rounded-lg text-xs font-medium text-primary-700">
                                {isPortuguese ? 'Culinária' : 'Cooking'}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="flex-1 bg-gradient-to-r from-action-500 to-coral-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-md transition-all">
                                {isPortuguese ? 'Conectar' : 'Connect'}
                              </button>
                              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Second Lusophone Match Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.3, duration: 0.8 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-secondary-200/60 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-secondary-100/50 to-transparent rounded-br-2xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                              <div className="w-full h-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">J</span>
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {isPortuguese ? 'João Pereira' : 'João Pereira'}
                              </h3>
                              <div className="flex items-center gap-1">
                                <HeartSolidIcon className="h-4 w-4 text-secondary-500" />
                                <span className="text-sm font-bold text-secondary-600">92%</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {isPortuguese 
                                ? 'Porto • Camden • Futebol do Benfica e música portuguesa'
                                : 'Porto • Camden • Benfica football and Portuguese music'}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="px-2 py-1 bg-red-100 rounded-lg text-xs font-medium text-red-700">
                                {isPortuguese ? 'Benfica' : 'Benfica'}
                              </div>
                              <div className="px-2 py-1 bg-green-100 rounded-lg text-xs font-medium text-green-700">
                                {isPortuguese ? 'Música' : 'Music'}
                              </div>
                              <div className="px-2 py-1 bg-yellow-100 rounded-lg text-xs font-medium text-yellow-700">
                                {isPortuguese ? 'Viagens' : 'Travel'}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="flex-1 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-md transition-all">
                                {isPortuguese ? 'Conectar' : 'Connect'}
                              </button>
                              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Lusophone Matches Summary */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6, duration: 0.8 }}
                        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 border border-primary-200/50 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                              <SparklesIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-base">
                                {isPortuguese ? '+6 Novos Matches' : '+6 New Matches'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {isPortuguese ? 'Baseado nos seus interesses' : 'Based on your interests'}
                              </p>
                            </div>
                          </div>
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 2.8 + i * 0.1, duration: 0.3 }}
                                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                style={{
                                  backgroundColor: `hsl(${(i * 80) % 360}, 65%, 65%)`,
                                }}
                              />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm">
                              +2
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}