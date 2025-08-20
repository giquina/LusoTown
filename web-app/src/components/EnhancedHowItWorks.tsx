'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  PlayIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { GraduationCap } from 'lucide-react'
import { 
  HeartIcon as HeartSolidIcon,
  PlayIcon as PlaySolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'

export default function EnhancedHowItWorks() {
  const [mounted, setMounted] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      id: 1,
      title: isPortuguese ? 'Encontre o Seu Match Português' : 'Find Your Portuguese Match',
      description: isPortuguese 
        ? 'Conecte-se com portugueses que partilham a sua saudade, lealdades futebolísticas e património cultural'
        : 'Connect with Portuguese speakers who share your saudade, football loyalties, and cultural heritage',
      cta: isPortuguese ? 'Começar a Procurar' : 'Start Matching',
      link: '/matches',
      icon: HeartIcon,
      solidIcon: HeartSolidIcon,
      gradient: 'from-action-500 via-secondary-500 to-action-500',
      bgGradient: 'from-action-50/80 via-secondary-50/60 to-action-50/80',
      hoverGradient: 'from-action-100 via-secondary-100 to-action-100',
      stat: `${communityStats.members} portugueses em Londres`,
      statEn: `${communityStats.members} Portuguese speakers in London`,
      preview: {
        type: 'match',
        data: {
          name: 'Ana Sofia',
          age: 28,
          location: 'Stockwell',
          compatibility: 94,
          interests: ['Fado', 'Futebol', 'Culinária']
        }
      }
    },
    {
      id: 2,
      title: isPortuguese ? 'LusoTown TV - Streaming Português' : 'LusoTown TV - Portuguese Streaming',
      description: isPortuguese
        ? 'Assista conteúdo cultural português ao vivo, crie programas e conecte-se com a comunidade da diáspora'
        : 'Watch live Portuguese cultural content, create shows, and connect with the diaspora community',
  cta: isPortuguese ? 'Começar a Ver' : 'Start Watching',
  link: '/tv',
      icon: PlayIcon,
      solidIcon: PlaySolidIcon,
      gradient: 'from-primary-500 via-accent-500 to-coral-500',
      bgGradient: 'from-primary-50/80 via-accent-50/60 to-coral-50/80',
      hoverGradient: 'from-primary-100 via-accent-100 to-coral-100',
      stat: `${communityStats.creators} criadores, ${communityStats.streamingHours} horas`,
      statEn: `${communityStats.creators} creators, ${communityStats.streamingHours} streaming hours`,
      preview: {
        type: 'streaming',
        data: {
          title: 'Fado Night Live',
          viewers: 234,
          category: 'Cultura Portuguesa',
          live: true
        }
      }
    },
    {
      id: 3,
      title: isPortuguese ? 'Eventos Culturais Autênticos' : 'Authentic Portuguese Events',
      description: isPortuguese
        ? 'Desde noites íntimas de Fado em Stockwell até networking empresarial português na City'
        : 'From intimate Fado nights in Stockwell to Portuguese business networking in the City',
      cta: isPortuguese ? 'Descobrir Eventos' : 'Discover Events',
      link: '/events',
      icon: CalendarDaysIcon,
      solidIcon: CalendarDaysIcon,
      gradient: 'from-secondary-500 via-accent-500 to-secondary-500',
      bgGradient: 'from-secondary-50/80 via-accent-50/60 to-secondary-50/80',
      hoverGradient: 'from-secondary-100 via-accent-100 to-secondary-100',
      stat: `${communityStats.events} eventos mensais em Londres`,
      statEn: `${communityStats.events} monthly events across London`,
      preview: {
        type: 'event',
        data: {
          title: 'Noite de Fado em Stockwell',
          date: '15 Set',
          price: '£25',
          spots: 8
        }
      }
    },
    {
      id: 4,
      title: isPortuguese ? 'Comunidades Portuguesas' : 'Portuguese Communities',
      description: isPortuguese
        ? 'Conecte-se através de interesses partilhados - da culinária portuguesa ao futebol, negócios à cultura'
        : 'Connect through shared interests - from Portuguese cuisine to football, business to culture',
      cta: isPortuguese ? 'Explorar Grupos' : 'Explore Groups',
      link: '/groups',
      icon: UserGroupIcon,
      solidIcon: UserGroupIcon,
      gradient: 'from-accent-500 via-coral-500 to-accent-500',
      bgGradient: 'from-accent-50/80 via-coral-50/60 to-accent-50/80',
      hoverGradient: 'from-accent-100 via-coral-100 to-accent-100',
      stat: 'Comunidades ativas por Londres',
      statEn: 'Active communities across London boroughs',
      preview: {
        type: 'group',
        data: {
          name: 'Fado & Cultura',
          members: 89,
          category: 'Música',
          recent: '2h'
        }
      }
    },
    {
      id: 5,
      title: isPortuguese ? 'Descubra a Londres Portuguesa' : 'Discover Portuguese London',
      description: isPortuguese
        ? 'Tours guiados que mostram a história, cultura e tesouros escondidos portugueses por Londres'
        : 'Guided tours showcasing Portuguese history, culture, and hidden gems throughout London',
      cta: isPortuguese ? 'Reservar Tours' : 'Book Tours',
      link: '/london-tours',
      icon: MapPinIcon,
      solidIcon: MapPinIcon,
      gradient: 'from-primary-500 via-secondary-500 to-primary-500',
      bgGradient: 'from-primary-50/80 via-secondary-50/60 to-primary-50/80',
      hoverGradient: 'from-primary-100 via-secondary-100 to-primary-100',
      stat: 'Tours culturais com contexto português',
      statEn: 'Cultural tours with Portuguese context',
      preview: {
        type: 'tour',
        data: {
          title: 'Portuguese London Heritage',
          duration: '3h',
          rating: 4.9,
          price: '£45'
        }
      }
    },
    {
      id: 6,
      title: isPortuguese ? 'Transporte com Motoristas Portugueses' : 'Transport with Portuguese Drivers',
      description: isPortuguese
        ? 'Serviços de transporte profissional com motoristas que falam português para conforto cultural'
        : 'Professional transport services with Portuguese-speaking drivers for cultural comfort',
      cta: isPortuguese ? 'Reservar Transporte' : 'Book Transport',
      link: '/transport',
      icon: TruckIcon,
      solidIcon: TruckIcon,
      gradient: 'from-coral-500 via-action-500 to-coral-500',
      bgGradient: 'from-coral-50/80 via-action-50/60 to-coral-50/80',
      hoverGradient: 'from-coral-100 via-action-100 to-coral-100',
      stat: 'Motoristas profissionais certificados SIA',
      statEn: 'SIA-compliant professional drivers',
      preview: {
        type: 'transport',
        data: {
          type: 'Professional Service',
          rating: 4.8,
          availability: 'Available Now',
          language: 'Português'
        }
      }
    }
  ]

  if (!mounted) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
      {/* Portuguese Cultural Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-secondary-200/30 to-accent-200/20 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-action-200/30 to-coral-200/20 rounded-full animate-bounce opacity-50" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-full opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-accent-100 border border-secondary-200 rounded-full px-6 py-3 mb-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-sm font-bold text-primary-800">
              {isPortuguese ? 'Como Funciona • How It Works' : 'How It Works • Como Funciona'}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            {isPortuguese ? 'A Sua Plataforma Portuguesa' : 'Your Portuguese Platform'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            {isPortuguese 
              ? 'Descubra tudo o que pode fazer na maior comunidade portuguesa de Londres'
              : 'Discover everything you can do in London\'s largest Portuguese community'}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative cursor-pointer"
            >
              <div className={`bg-white/90 backdrop-blur-sm border border-white/60 rounded-3xl p-8 min-h-[440px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden flex flex-col ${
                hoveredFeature === feature.id ? 'border-primary-300/50' : ''
              }`}>
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {hoveredFeature === feature.id && feature.solidIcon ? (
                      <feature.solidIcon className="w-8 h-8 text-white" />
                    ) : (
                      <feature.icon className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-base">
                    {feature.description}
                  </p>

                  {/* Preview Section */}
                  {hoveredFeature === feature.id && feature.preview && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gradient-to-br ${feature.bgGradient} border border-white/60 rounded-xl p-4 mb-4 shadow-inner`}
                    >
                      {/* Match Preview */}
                      {feature.preview.type === 'match' && (
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{feature.preview.data.name}, {feature.preview.data.age}</div>
                            <div className="text-xs text-gray-600">{feature.preview.data.location}</div>
                            <div className="text-xs text-green-600 font-medium">{feature.preview.data.compatibility}% Match</div>
                          </div>
                        </div>
                      )}

                      {/* Streaming Preview */}
                      {feature.preview.type === 'streaming' && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-red-600">LIVE</span>
                          </div>
                          <div className="font-semibold text-sm">{feature.preview.data.title}</div>
                          <div className="text-xs text-gray-600">{feature.preview.data.viewers} viewers • {feature.preview.data.category}</div>
                        </div>
                      )}

                      {/* Event Preview */}
                      {feature.preview.type === 'event' && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">{feature.preview.data.title}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{feature.preview.data.date}</span>
                            <span className="font-medium text-green-600">{feature.preview.data.price}</span>
                          </div>
                          <div className="text-xs text-orange-600">{feature.preview.data.spots} spots left</div>
                        </div>
                      )}

                      {/* Group Preview */}
                      {feature.preview.type === 'group' && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">{feature.preview.data.name}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{feature.preview.data.members} members</span>
                            <span className="text-gray-500">Active {feature.preview.data.recent}</span>
                          </div>
                          <div className="text-xs text-blue-600">{feature.preview.data.category}</div>
                        </div>
                      )}

                      {/* Tour Preview */}
                      {feature.preview.type === 'tour' && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">{feature.preview.data.title}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{feature.preview.data.duration}</span>
                            <span className="flex items-center gap-1">
                              <StarSolidIcon className="w-3 h-3 text-yellow-400" />
                              <span>{feature.preview.data.rating}</span>
                            </span>
                          </div>
                          <div className="text-xs text-green-600 font-medium">{feature.preview.data.price}</div>
                        </div>
                      )}

                      {/* Transport Preview */}
                      {feature.preview.type === 'transport' && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm">{feature.preview.data.type}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-green-600">{feature.preview.data.availability}</span>
                            <span className="flex items-center gap-1">
                              <StarSolidIcon className="w-3 h-3 text-yellow-400" />
                              <span>{feature.preview.data.rating}</span>
                            </span>
                          </div>
                          <div className="text-xs text-blue-600">{feature.preview.data.language}</div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Stats */}
                  <div className="text-xs text-gray-500 mb-4 font-medium">
                    {isPortuguese ? feature.stat : feature.statEn}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={feature.link}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.gradient} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center justify-center`}
                  >
                    {feature.cta}
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-3xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Pronto para Começar?' : 'Ready to Get Started?'}
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Junte-se a centenas de portugueses que já descobriram a sua comunidade em Londres'
                : 'Join hundreds of Portuguese speakers who have already discovered their community in London'}
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Começar Grátis' : 'Start Free'}
              <SparklesIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}