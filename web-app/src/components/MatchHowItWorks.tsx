'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserIcon,
  HeartIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  MapPinIcon,
  GlobeAltIcon,
  LanguageIcon,
  UsersIcon,
  StarIcon,
  ShieldCheckIcon,
  MusicalNoteIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

export default function MatchHowItWorks() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const { t, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
    
    // Automatic step animation cycle
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      number: 1,
      title: 'Create Your Portuguese Profile',
      titlePt: 'Crie o Seu Perfil Português',
      description: 'Join our community of Portuguese speakers in the U.K.. Share your heritage, interests, and what you\'re looking for in authentic connections.',
      descriptionPt: 'Junte-se à nossa comunidade de falantes de português em Londres. Partilhe a sua herança, interesses e o que procura em conexões autênticas.',
      icon: UserIcon,
      color: 'from-red-500 via-yellow-500 to-green-500',
      bgColor: 'from-red-50 via-yellow-50 to-green-50',
      accentColor: 'red-600',
      features: [
        'Portuguese heritage verification',
        'Cultural interests & preferences',
        'London area & location',
        'Professional background'
      ],
      featuresPt: [
        'Verificação da herança portuguesa',
        'Interesses culturais e preferências', 
        'Área e localização em Londres',
        'Background profissional'
      ],
      emoji: '🇵🇹',
      culturalElements: ['🏠', '📍', '💼', '❤️']
    },
    {
      number: 2,
      title: 'Discover Cultural Matches',
      titlePt: 'Descubra Matches Culturais',
      description: 'Our AI-powered algorithm connects you with Portuguese speakers based on cultural compatibility, shared traditions, and common interests.',
      descriptionPt: 'O nosso algoritmo alimentado por IA conecta-o com falantes de português baseado em compatibilidade cultural, tradições partilhadas e interesses comuns.',
      icon: HeartIcon,
      color: 'from-green-500 via-red-500 to-yellow-500',
      bgColor: 'from-green-50 via-red-50 to-yellow-50',
      accentColor: 'green-600',
      features: [
        'Cultural compatibility scoring',
        'Portuguese traditions matching',
        'Language preference alignment',
        'Regional heritage connections'
      ],
      featuresPt: [
        'Pontuação de compatibilidade cultural',
        'Correspondência de tradições portuguesas',
        'Alinhamento de preferências linguísticas',
        'Conexões de herança regional'
      ],
      emoji: '💕',
      culturalElements: ['🎭', '🍷', '⚽', '🎵']
    },
    {
      number: 3,
      title: 'Meet at Portuguese Events',
      titlePt: 'Encontrem-se em Eventos Portugueses',
      description: 'Connect through authentic Portuguese cultural events, from intimate fado nights to professional networking gatherings across London.',
      descriptionPt: 'Conectem-se através de eventos culturais portugueses autênticos, desde noites íntimas de fado até encontros de networking profissional por Londres.',
      icon: CalendarDaysIcon,
      color: 'from-yellow-500 via-green-500 to-red-500',
      bgColor: 'from-yellow-50 via-green-50 to-red-50',
      accentColor: 'yellow-600',
      features: [
        'Fado nights in Stockwell',
        'Portuguese business networking',
        'Cultural workshops & classes',
        'Community celebrations'
      ],
      featuresPt: [
        'Noites de fado em Stockwell',
        'Networking de negócios português',
        'Workshops e aulas culturais',
        'Celebrações comunitárias'
      ],
      emoji: '🎉',
      culturalElements: ['🎭', '☕', '🍽️', '🎪']
    },
    {
      number: 4,
      title: 'Build Lasting Connections',
      titlePt: 'Construa Conexões Duradouras',
      description: 'Develop meaningful relationships through shared cultural understanding, from friendships to romance to professional partnerships.',
      descriptionPt: 'Desenvolva relacionamentos significativos através de compreensão cultural partilhada, desde amizades a romance a parcerias profissionais.',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-red-500 via-green-500 to-yellow-500',
      bgColor: 'from-red-50 via-green-50 to-yellow-50',
      accentColor: 'red-500',
      features: [
        'Bilingual conversations',
        'Cultural mentorship',
        'Long-term relationships',
        'Community integration'
      ],
      featuresPt: [
        'Conversas bilingues',
        'Mentoria cultural',
        'Relacionamentos de longo prazo',
        'Integração comunitária'
      ],
      emoji: '🤝',
      culturalElements: ['💬', '🌟', '🏆', '🎯']
    }
  ]

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Verified Portuguese Speakers',
      titlePt: 'Falantes de Português Verificados',
      description: 'All members are verified Portuguese speakers from Portugal, Brazil, and other Lusophone countries',
      descriptionPt: 'Todos os membros são falantes de português verificados de Portugal, Brasil e outros países lusófonos'
    },
    {
      icon: MapPinIcon,
      title: 'London-Focused Matching',
      titlePt: 'Correspondência Focada em Londres',
      description: 'Connect with Portuguese speakers living in your London borough or nearby areas',
      descriptionPt: 'Conecte-se com falantes de português que vivem no seu borough de Londres ou áreas próximas'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Cultural Compatibility',
      titlePt: 'Compatibilidade Cultural',
      description: 'Match based on shared Portuguese traditions, from fado music to Santos Populares celebrations',
      descriptionPt: 'Combine baseado em tradições portuguesas partilhadas, desde música fado até celebrações dos Santos Populares'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Professional Networking',
      titlePt: 'Networking Profissional',
      description: 'Connect with Portuguese professionals across industries for career opportunities',
      descriptionPt: 'Conecte-se com profissionais portugueses em várias indústrias para oportunidades de carreira'
    },
    {
      icon: UsersIcon,
      title: 'Community Events',
      titlePt: 'Eventos Comunitários',
      description: 'Meet your matches at real Portuguese cultural events and gatherings',
      descriptionPt: 'Conheça os seus matches em eventos e encontros culturais portugueses reais'
    },
    {
      icon: AcademicCapIcon,
      title: 'Educational Support',
      titlePt: 'Apoio Educacional',
      description: 'Connect with students and mentors through our university partnerships',
      descriptionPt: 'Conecte-se com estudantes e mentores através das nossas parcerias universitárias'
    }
  ]

  const stats = [
    {
      number: '2,750+',
      label: 'Portuguese Speakers',
      labelPt: 'Falantes de Português',
      sublabel: 'Active in the U.K.',
      sublabelPt: 'Ativos em Londres'
    },
    {
      number: '94%',
      label: 'Match Success Rate',
      labelPt: 'Taxa de Sucesso de Matches',
      sublabel: 'Meet within 2 weeks',
      sublabelPt: 'Encontram-se em 2 semanas'
    },
    {
      number: '85+',
      label: 'Monthly Events',
      labelPt: 'Eventos Mensais',
      sublabel: 'Across London',
      sublabelPt: 'Por Londres'
    },
    {
      number: '4.8/5',
      label: 'Community Rating',
      labelPt: 'Avaliação da Comunidade',
      sublabel: 'Member satisfaction',
      sublabelPt: 'Satisfação dos membros'
    }
  ]

  const testimonials = [
    {
      text: 'Finally found someone who understands why I get emotional during fado music and celebrates Christmas on December 24th!',
      textPt: 'Finalmente encontrei alguém que entende porque fico emocional durante a música de fado e celebra o Natal no dia 24 de dezembro!',
      author: 'Sofia, 29, Stockwell',
      match: 'Met through a Portuguese wine tasting event',
      matchPt: 'Conheceram-se através de um evento de degustação de vinhos portugueses'
    },
    {
      text: 'Connected with my business partner through LusoTown. We now run a Portuguese catering company together!',
      textPt: 'Conectei-me com o meu parceiro de negócios através do LusoTown. Agora gerimos uma empresa de catering português juntos!',
      author: 'Miguel, 34, Vauxhall',
      match: 'Met at a Portuguese business networking event',
      matchPt: 'Conheceram-se num evento de networking de negócios português'
    }
  ]

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-accent-100 to-primary-100 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-secondary-100 to-accent-100 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-30" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full opacity-40" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 border border-secondary-200/50 rounded-2xl px-8 py-4 shadow-xl transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'} mb-8`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse"></div>
              <HeartIconSolid className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                {t('match_how_it_works.badge')}
              </span>
            </div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-8">
            {language === 'pt' ? (
              <>
                Encontre Seu
                <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
                  {' '}Match Português
                </span>
              </>
            ) : (
              <>
                Meet Your
                <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
                  {' '}Portuguese Match
                </span>
              </>
            )}
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium mb-6">
            {t('match_how_it_works.subtitle')}
          </p>
          
          <p className="text-lg text-gray-600 italic max-w-3xl mx-auto leading-relaxed">
            "{t('match_how_it_works.quote')}"
          </p>
        </div>

        {/* Interactive Steps Flow */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isActive = activeStep === index || animationStep === index
              
              return (
                <motion.div 
                  key={step.number} 
                  className="group relative transition-all duration-500 hover:scale-105"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.bgColor} border-2 ${isActive ? 'border-secondary-300 shadow-2xl' : 'border-secondary-200 shadow-xl'} transition-all duration-500 h-[480px]`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <div className="absolute top-4 right-4 text-4xl opacity-30">{step.emoji}</div>
                      <div className="absolute bottom-4 left-4 text-3xl opacity-40">🇵🇹</div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-10">{step.emoji}</div>
                    </div>
                    
                    {/* Cultural Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {step.culturalElements.map((element, idx) => (
                        <div 
                          key={idx}
                          className={`absolute text-2xl opacity-20 transition-all duration-1000 ${isActive ? 'opacity-40 scale-110' : ''}`}
                          style={{
                            top: `${20 + idx * 15}%`,
                            left: `${15 + idx * 20}%`,
                            animationDelay: `${idx * 200}ms`
                          }}
                        >
                          {element}
                        </div>
                      ))}
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`text-4xl font-black transition-colors duration-300 ${isActive ? 'text-secondary-600/40' : 'text-secondary-600/20'}`}>
                          {step.number.toString().padStart(2, '0')}
                        </div>
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transition-all duration-500 ${isActive ? 'rotate-12 shadow-2xl' : 'group-hover:rotate-6'}`}
                          whileHover={{ rotate: 12 }}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </motion.div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {language === 'pt' ? step.titlePt : step.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {language === 'pt' ? step.descriptionPt : step.description}
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-2">
                          {(language === 'pt' ? step.featuresPt : step.features).slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                              <CheckBadgeIcon className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <motion.button 
                          className={`group/btn inline-flex items-center gap-2 bg-gradient-to-r ${step.color} text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{language === 'pt' ? 'Saber Mais' : 'Learn More'}</span>
                          <ArrowRightIcon className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Step connector arrows */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <motion.div
                        className="w-8 h-8 bg-white border-2 border-secondary-300 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          borderColor: isActive ? '#059669' : '#d1d5db',
                          backgroundColor: isActive ? '#f0fdf4' : '#ffffff'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRightIcon className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-4 mb-12">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  animationStep === index 
                    ? 'bg-secondary-600 scale-125' 
                    : 'bg-secondary-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Por Que Escolher o LusoTown?' : 'Why Choose LusoTown?'}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Mais que um app de encontros - uma comunidade portuguesa autêntica em Londres'
                : 'More than a dating app - an authentic Portuguese community in the U.K.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 text-center">
                    {language === 'pt' ? benefit.titlePt : benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {language === 'pt' ? benefit.descriptionPt : benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Statistics Section */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl mx-4 sm:mx-0">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Our Community in Numbers
              </h3>
              <p className="text-white/90 text-base sm:text-lg">
                Real results from Portuguese connections in the U.K.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center px-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-semibold text-xs sm:text-sm md:text-base mb-1 break-words">
                    {stat.label}
                  </div>
                  <div className="text-white/70 text-xs break-words">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories'}
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'pt' 
                ? 'Conexões reais que se tornaram relacionamentos duradouros'
                : 'Real connections that became lasting relationships'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white/90 backdrop-blur-lg border border-white/50 rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-800 italic text-lg leading-relaxed mb-4">
                  "{language === 'pt' ? testimonial.textPt : testimonial.text}"
                </blockquote>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900 mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? testimonial.matchPt : testimonial.match}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-gradient-to-r from-white/70 via-secondary-50/50 to-accent-50/50 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-5xl mb-4">💕</div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {language === 'pt' ? (
                  <>
                    Pronto para Encontrar o
                    <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                      {' '}Seu Match?
                    </span>
                  </>
                ) : (
                  <>
                    Ready to Find
                    <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                      {' '}Your Match?
                    </span>
                  </>
                )}
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                {language === 'pt' 
                  ? 'Junte-se a milhares de falantes de português em Londres. Encontre alguém que entende a sua cultura, tradições e sonhos.'
                  : 'Join thousands of Portuguese speakers in the U.K.. Find someone who understands your culture, traditions, and dreams.'
                }
              </p>
            </div>
            
            {/* Portuguese cultural quote */}
            <div className="bg-white/60 rounded-2xl p-6 mb-10 max-w-2xl mx-auto border border-secondary-100">
              <p className="text-gray-700 italic text-lg mb-2">
                {language === 'pt' 
                  ? '"Quem tem amigos tem tudo" - Who has friends has everything'
                  : '"Quem tem amigos tem tudo" - Who has friends has everything'
                }
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'pt' 
                  ? 'Provérbio português sobre o valor das conexões humanas'
                  : 'Portuguese proverb about the value of human connections'
                }
              </p>
            </div>
            
            <div className="flex flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="/matches"
                className="group relative text-base sm:text-lg font-bold px-6 sm:px-8 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex-1 max-w-[180px] sm:max-w-none"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Find Matches
                  <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                </span>
              </motion.a>
              <motion.a
                href="/signup"
                className="text-base sm:text-lg font-bold px-6 sm:px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-secondary-300 whitespace-nowrap flex-1 max-w-[180px] sm:max-w-none text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free
              </motion.a>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'pt' ? 'Perfis Verificados' : 'Verified Profiles'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <GlobeAltIcon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'pt' ? 'Comunidade Global' : 'Global Community'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <LanguageIcon className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'pt' ? 'Bilingue PT/EN' : 'Bilingual PT/EN'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}