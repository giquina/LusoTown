'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Users, 
  Briefcase, 
  Music, 
  ChefHat, 
  GraduationCap, 
  Calendar,
  MapPin,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Quote,
  Building,
  Coffee,
  Camera,
  Globe,
  Trophy,
  TrendingUp
} from 'lucide-react'

interface SuccessStory {
  id: string
  type: 'romantic' | 'professional' | 'cultural' | 'community' | 'friendship'
  names: string
  ages: string
  locations: string[]
  origins: string[]
  image: string
  story: string
  storyPt: string
  quote: string
  quotePt: string
  timeframe: string
  timeframePt: string
  metrics: {
    label: string
    labelPt: string
    value: string
  }
  interests: string[]
  verified: boolean
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    type: 'romantic',
    names: 'Sofia & Miguel',
    ages: '29 & 32',
    locations: ['Stockwell', 'Vauxhall'],
    origins: ['Porto', 'Lisboa'],
    image: '/images/success/sofia-miguel.jpg',
    story: 'Met at a LusoTown fado night in Soho. Both were homesick for Portuguese music and culture. Now engaged and planning their wedding with Portuguese traditions in London.',
    storyPt: 'Conheceram-se numa noite de fado da LusoTown em Soho. Ambos tinham saudades da música e cultura portuguesa. Agora estão noivos e a planear o casamento com tradições portuguesas em Londres.',
    quote: 'Finally someone who gets emotional during fado music just like me! We connected instantly over our shared saudade.',
    quotePt: 'Finalmente alguém que se emociona com fado como eu! Conectámo-nos instantaneamente pela nossa saudade partilhada.',
    timeframe: 'Connected in 2 days',
    timeframePt: 'Conectaram em 2 dias',
    metrics: {
      label: 'Cultural compatibility',
      labelPt: 'Compatibilidade cultural',
      value: '97%'
    },
    interests: ['fado', 'portuguese_cuisine', 'cultural_events'],
    verified: true
  },
  {
    id: '2',
    type: 'professional',
    names: 'João & Rita',
    ages: '35 & 28',
    locations: ['Bermondsey', 'Camden'],
    origins: ['Aveiro', 'Braga'],
    image: '/images/success/joao-rita.jpg',
    story: 'Portuguese chef João met marketing professional Rita at a LusoTown business networking event. They launched "Sabores de Casa" - a Portuguese catering business serving London\'s Portuguese community.',
    storyPt: 'O chef português João conheceu a profissional de marketing Rita num evento de networking da LusoTown. Lançaram "Sabores de Casa" - um negócio de catering português que serve a comunidade portuguesa de Londres.',
    quote: 'Our partnership turned into a thriving business. We understand each other\'s Portuguese work ethic and passion.',
    quotePt: 'A nossa parceria transformou-se num negócio próspero. Compreendemos a ética de trabalho e paixão portuguesa um do outro.',
    timeframe: 'Business launched in 6 weeks',
    timeframePt: 'Negócio lançado em 6 semanas',
    metrics: {
      label: 'Monthly revenue',
      labelPt: 'Receita mensal',
      value: '£12K+'
    },
    interests: ['portuguese_cuisine', 'business_networking', 'entrepreneurship'],
    verified: true
  },
  {
    id: '3',
    type: 'cultural',
    names: 'Ana & Beatriz',
    ages: '26 & 31',
    locations: ['Camden', 'Kensington'],
    origins: ['Coimbra', 'São Paulo'],
    image: '/images/success/ana-beatriz.jpg',
    story: 'Medical student Ana from Portugal and financial analyst Beatriz from Brazil started a Portuguese cooking club. Now 85+ members meet monthly to share recipes and stories from home.',
    storyPt: 'A estudante de medicina Ana de Portugal e a analista financeira Beatriz do Brasil criaram um clube de culinária portuguesa. Agora 85+ membros encontram-se mensalmente para partilhar receitas e histórias de casa.',
    quote: 'We wanted to preserve our food traditions and share them with other Portuguese speakers in London.',
    quotePt: 'Queríamos preservar as nossas tradições alimentares e partilhá-las com outros falantes de português em Londres.',
    timeframe: 'Club grew to 85 members in 4 months',
    timeframePt: 'Clube cresceu para 85 membros em 4 meses',
    metrics: {
      label: 'Community members',
      labelPt: 'Membros da comunidade',
      value: '85+'
    },
    interests: ['portuguese_cuisine', 'cultural_events', 'community_building'],
    verified: true
  },
  {
    id: '4',
    type: 'community',
    names: 'Carlos & Família',
    ages: '38 & family',
    locations: ['Elephant & Castle'],
    origins: ['Madeira'],
    image: '/images/success/carlos-family.jpg',
    story: 'Carlos found Portuguese-speaking families for weekend activities. Their kids now speak fluent Portuguese and celebrate Portuguese holidays together in London parks.',
    storyPt: 'Carlos encontrou famílias que falam português para atividades de fim de semana. Os filhos agora falam português fluente e celebram feriados portugueses juntos nos parques de Londres.',
    quote: 'Our children are growing up bilingual and proud of their Portuguese heritage, thanks to this amazing community.',
    quotePt: 'Os nossos filhos estão a crescer bilingues e orgulhosos da sua herança portuguesa, graças a esta comunidade incrível.',
    timeframe: 'Found family network in 1 week',
    timeframePt: 'Encontrou rede familiar em 1 semana',
    metrics: {
      label: 'Portuguese-speaking families connected',
      labelPt: 'Famílias lusófonas conectadas',
      value: '12'
    },
    interests: ['family_activities', 'cultural_preservation', 'language_learning'],
    verified: true
  },
  {
    id: '5',
    type: 'friendship',
    names: 'Luísa & Grupo',
    ages: '24 & friends',
    locations: ['King\'s Cross', 'various'],
    origins: ['Cabo Verde', 'Angola', 'Brasil'],
    image: '/images/success/luisa-group.jpg',
    story: 'Student Luísa created a lusophone study group mixing Portuguese, Brazilian, and African Portuguese speakers. They support each other academically and culturally.',
    storyPt: 'A estudante Luísa criou um grupo de estudo lusófono misturando falantes de português de Portugal, Brasil e África. Apoiam-se mutuamente académica e culturalmente.',
    quote: 'We celebrate the diversity of Portuguese-speaking cultures while supporting each other in London.',
    quotePt: 'Celebramos a diversidade das culturas lusófonas enquanto nos apoiamos mutuamente em Londres.',
    timeframe: 'Study group formed in 3 days',
    timeframePt: 'Grupo de estudo formado em 3 dias',
    metrics: {
      label: 'Countries represented',
      labelPt: 'Países representados',
      value: '5'
    },
    interests: ['student_life', 'cultural_exchange', 'language_learning'],
    verified: true
  },
  {
    id: '6',
    type: 'professional',
    names: 'Ricardo & Patrícia',
    ages: '31 & 29',
    locations: ['Canary Wharf', 'Shoreditch'],
    origins: ['Porto', 'Rio de Janeiro'],
    image: '/images/success/ricardo-patricia.jpg',
    story: 'Architect Ricardo and tech entrepreneur Patrícia launched a co-working space for Portuguese-speaking professionals. Now hosts 150+ members across London.',
    storyPt: 'O arquiteto Ricardo e a empreendedora de tecnologia Patrícia lançaram um espaço de co-working para profissionais que falam português. Agora acolhe 150+ membros em Londres.',
    quote: 'We created a professional home for Portuguese speakers in London\'s business district.',
    quotePt: 'Criámos uma casa profissional para falantes de português no distrito de negócios de Londres.',
    timeframe: 'Co-working space launched in 3 months',
    timeframePt: 'Espaço de co-working lançado em 3 meses',
    metrics: {
      label: 'Professional members',
      labelPt: 'Membros profissionais',
      value: '150+'
    },
    interests: ['business_networking', 'entrepreneurship', 'professional_development'],
    verified: true
  }
]

const storyTypeIcons = {
  romantic: Heart,
  professional: Briefcase,
  cultural: Music,
  community: Users,
  friendship: Globe
}

const storyTypeColors = {
  romantic: 'from-pink-500 to-red-500',
  professional: 'from-blue-500 to-indigo-500',
  cultural: 'from-purple-500 to-pink-500',
  community: 'from-green-500 to-teal-500',
  friendship: 'from-yellow-500 to-orange-500'
}

const getOriginFlag = (origin: string) => {
  if (origin.includes('Portugal') || origin.includes('Porto') || origin.includes('Lisboa') || origin.includes('Braga') || origin.includes('Aveiro') || origin.includes('Coimbra') || origin.includes('Madeira')) return '🇵🇹'
  if (origin.includes('Brasil') || origin.includes('São Paulo') || origin.includes('Rio')) return '🇧🇷'
  if (origin.includes('Angola')) return '🇦🇴'
  if (origin.includes('Mozambique')) return '🇲🇿'
  if (origin.includes('Cabo Verde')) return '🇨🇻'
  return '🌍'
}

interface SuccessStoryIntroductionProps {
  onStartQuiz?: () => void
  onSignUp?: () => void
}

export default function SuccessStoryIntroduction({ onStartQuiz, onSignUp }: SuccessStoryIntroductionProps) {
  const { language } = useLanguage()
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [liveStats, setLiveStats] = useState({
    connections: 234,
    events: 60,
    businesses: 18
  })

  // Auto-rotate stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Animate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        connections: prev.connections + Math.floor(Math.random() * 3),
        events: prev.events + (Math.random() > 0.7 ? 1 : 0),
        businesses: prev.businesses + (Math.random() > 0.9 ? 1 : 0)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentStory = successStories[currentStoryIndex]
  const StoryIcon = storyTypeIcons[currentStory.type]
  const storyColor = storyTypeColors[currentStory.type]

  const translations = {
    en: {
      title: 'Real Portuguese Community Success Stories',
      subtitle: 'See how Portuguese speakers in London are finding meaningful connections through LusoTown',
      liveTitle: 'Happening Right Now',
      connectionsLabel: 'New Connections This Month',
      eventsLabel: 'Portuguese Events This Month',
      businessesLabel: 'New Portuguese Businesses',
      verifiedLabel: 'Verified Success Story',
      readMoreStories: 'Read More Stories',
      takeQuiz: 'Take Cultural Quiz',
      joinCommunity: 'Join Community',
      diversityTitle: 'Portuguese Community Diversity',
      diversitySubtitle: 'Connect with Portuguese speakers from all backgrounds',
      portugalMembers: 'Portugal natives',
      brazilMembers: 'Brazilian community',
      africaMembers: 'African lusophone',
      diasporaMembers: 'Portuguese diaspora',
      nextStory: 'Next Story',
      prevStory: 'Previous Story',
      storyTypes: {
        romantic: 'Love Stories',
        professional: 'Business Partnerships',
        cultural: 'Cultural Connections',
        community: 'Family Networks',
        friendship: 'Friendships'
      },
      testimonialQuote: 'Finally, a community that understands our culture',
      testimonialAuthor: '— Maria, 32, Community Member',
      guaranteeTitle: 'Your Success Guarantee',
      guaranteeText: 'Find meaningful connections within 30 days or we\'ll extend your membership free',
      memberSince: 'Member since',
      successRate: '97% success rate for Premium members'
    },
    pt: {
      title: 'Histórias Reais de Sucesso da Comunidade Portuguesa',
      subtitle: 'Veja como os falantes de português em Londres estão a encontrar conexões significativas através da LusoTown',
      liveTitle: 'A Acontecer Agora',
      connectionsLabel: 'Novas Conexões Este Mês',
      eventsLabel: 'Eventos Portugueses Este Mês',
      businessesLabel: 'Novos Negócios Portugueses',
      verifiedLabel: 'História de Sucesso Verificada',
      readMoreStories: 'Ler Mais Histórias',
      takeQuiz: 'Fazer Quiz Cultural',
      joinCommunity: 'Juntar à Comunidade',
      diversityTitle: 'Diversidade da Comunidade Portuguesa',
      diversitySubtitle: 'Conecte-se com falantes de português de todas as origens',
      portugalMembers: 'Nativos de Portugal',
      brazilMembers: 'Comunidade brasileira',
      africaMembers: 'Lusófonos africanos',
      diasporaMembers: 'Diáspora portuguesa',
      nextStory: 'Próxima História',
      prevStory: 'História Anterior',
      storyTypes: {
        romantic: 'Histórias de Amor',
        professional: 'Parcerias de Negócio',
        cultural: 'Conexões Culturais',
        community: 'Redes Familiares',
        friendship: 'Amizades'
      },
      testimonialQuote: 'Finalmente, uma comunidade que compreende a nossa cultura',
      testimonialAuthor: '— Maria, 32, Membro da Comunidade',
      guaranteeTitle: 'A Sua Garantia de Sucesso',
      guaranteeText: 'Encontre conexões significativas em 30 dias ou estendemos a sua subscrição gratuitamente',
      memberSince: 'Membro desde',
      successRate: '97% taxa de sucesso para membros Premium'
    }
  }

  const t = translations[language]

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {t.verifiedLabel}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-4 lg:mb-6">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-primary-700 max-w-4xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 lg:p-8 mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h3 className="text-lg lg:text-xl font-bold text-primary-900">{t.liveTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <motion.div
                key={liveStats.connections}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2"
              >
                {liveStats.connections}+
              </motion.div>
              <p className="text-sm lg:text-base text-primary-700">{t.connectionsLabel}</p>
            </div>
            
            <div className="text-center">
              <motion.div
                key={liveStats.events}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl lg:text-4xl font-bold text-secondary-600 mb-2"
              >
                {liveStats.events}+
              </motion.div>
              <p className="text-sm lg:text-base text-secondary-700">{t.eventsLabel}</p>
            </div>
            
            <div className="text-center">
              <motion.div
                key={liveStats.businesses}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl lg:text-4xl font-bold text-accent-600 mb-2"
              >
                {liveStats.businesses}+
              </motion.div>
              <p className="text-sm lg:text-base text-accent-700">{t.businessesLabel}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Story Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 lg:p-8"
              >
                {/* Story Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${storyColor}`}>
                      <StoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-primary-900">{currentStory.names}</h3>
                      <p className="text-sm text-primary-600">{t.storyTypes[currentStory.type]}</p>
                    </div>
                  </div>
                  {currentStory.verified && (
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Verified</span>
                    </div>
                  )}
                </div>

                {/* Story Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-4 text-sm text-primary-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{currentStory.ages}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{currentStory.locations.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{language === 'pt' ? currentStory.timeframePt : currentStory.timeframe}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentStory.origins.map((origin, index) => (
                      <div key={index} className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-full">
                        <span className="text-sm">{getOriginFlag(origin)}</span>
                        <span className="text-xs font-medium text-primary-700">{origin}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-4 mb-6">
                  <p className="text-primary-800 leading-relaxed">
                    {language === 'pt' ? currentStory.storyPt : currentStory.story}
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border-l-4 border-primary-500">
                    <Quote className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="text-primary-800 italic leading-relaxed mb-2">
                      "{language === 'pt' ? currentStory.quotePt : currentStory.quote}"
                    </p>
                    <cite className="text-sm text-primary-600">— {currentStory.names}</cite>
                  </div>
                </div>

                {/* Success Metric */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      {language === 'pt' ? currentStory.metrics.labelPt : currentStory.metrics.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">{currentStory.metrics.value}</div>
                </div>

                {/* Interests Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentStory.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {interest.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Story Navigation */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStoryIndex((prev) => prev === 0 ? successStories.length - 1 : prev - 1)}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                {t.prevStory}
              </button>
              
              <div className="flex gap-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStoryIndex ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors text-sm font-medium"
              >
                {t.nextStory}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Community Diversity & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Diversity Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-900 mb-4">{t.diversityTitle}</h3>
              <p className="text-primary-700 mb-6">{t.diversitySubtitle}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                  <div className="text-2xl mb-2">🇵🇹</div>
                  <div className="text-lg font-bold text-primary-600 mb-1">340+</div>
                  <div className="text-xs text-primary-700">{t.portugalMembers}</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
                  <div className="text-2xl mb-2">🇧🇷</div>
                  <div className="text-lg font-bold text-secondary-600 mb-1">280+</div>
                  <div className="text-xs text-secondary-700">{t.brazilMembers}</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="text-lg font-bold text-accent-600 mb-1">85+</div>
                  <div className="text-xs text-accent-700">{t.africaMembers}</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-coral-50 to-coral-100 rounded-xl">
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="text-lg font-bold text-coral-600 mb-1">45+</div>
                  <div className="text-xs text-coral-700">{t.diasporaMembers}</div>
                </div>
              </div>
            </div>

            {/* Success Guarantee */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-full">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800">{t.guaranteeTitle}</h3>
              </div>
              <p className="text-green-700 mb-4 leading-relaxed">{t.guaranteeText}</p>
              <div className="text-sm text-green-600 font-medium">{t.successRate}</div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 lg:p-8">
              <Quote className="w-8 h-8 text-primary-400 mb-4" />
              <blockquote className="text-lg text-primary-800 italic mb-4 leading-relaxed">
                "{t.testimonialQuote}"
              </blockquote>
              <cite className="text-sm text-primary-600">{t.testimonialAuthor}</cite>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <button
                onClick={onStartQuiz}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t.takeQuiz}
                </div>
              </button>
              
              <button
                onClick={onSignUp}
                className="w-full bg-white border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  {t.joinCommunity}
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Story Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {Object.entries(t.storyTypes).map(([type, label]) => {
            const Icon = storyTypeIcons[type as keyof typeof storyTypeIcons]
            const count = successStories.filter(story => story.type === type).length
            const isActive = currentStory.type === type
            
            return (
              <button
                key={type}
                onClick={() => {
                  const storyIndex = successStories.findIndex(story => story.type === type)
                  if (storyIndex !== -1) setCurrentStoryIndex(storyIndex)
                }}
                className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-primary-100 border-2 border-primary-500 shadow-lg' 
                    : 'bg-white border border-gray-200 hover:shadow-md'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                <div className={`text-sm font-medium mb-1 ${isActive ? 'text-primary-900' : 'text-gray-700'}`}>
                  {label}
                </div>
                <div className={`text-xs ${isActive ? 'text-primary-600' : 'text-gray-500'}`}>
                  {count} {count === 1 ? 'story' : 'stories'}
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}