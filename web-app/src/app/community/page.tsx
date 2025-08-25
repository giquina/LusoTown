'use client'
import Image from 'next/image'

import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { StarIcon, CalendarDaysIcon, MapPinIcon, UsersIcon, HeartIcon, ChatBubbleLeftIcon, ArrowRightIcon, HomeIcon, AcademicCapIcon, BuildingStorefrontIcon, MusicalNoteIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { getImageWithFallback } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats as stats } from '@/config/community'
import { ROUTES } from '@/config/routes'

const communityStatsConfig = [
  { number: `${stats.members}`, label: 'Portuguese-speaking community Members', labelPt: 'Membros da Comunidade de Falantes de Português', icon: UsersIcon },
  { number: `${stats.events}`, label: 'Monthly Experiences', labelPt: 'Experiências Mensais', icon: CalendarDaysIcon },
  { number: '8', label: 'London Boroughs', labelPt: 'Bairros de Londres', icon: MapPinIcon },
  { number: '15+', label: 'Countries Represented', labelPt: 'Países Representados', icon: HeartIcon }
]

const recentActivities = [
  {
    type: 'event',
    title: 'Noite de Fado at Vauxhall Cultural Centre',
    titlePt: 'Noite de Fado no Centro Cultural Vauxhall',
    group: 'Lusophone Culture',
    groupPt: 'Cultura Portuguesa',
    attendees: 35,
    date: 'This Friday, 7:30 PM',
    datePt: 'Esta Sexta, 19:30',
    location: 'Vauxhall Cultural Centre',
    locationPt: 'Centro Cultural Vauxhall',
    spots: 8,
    flag: '🇵🇹'
  },
  {
    type: 'event', 
    title: 'Brazilian BBQ & Football Watch',
    titlePt: 'Churrasco Brasileiro e Futebol',
    group: 'Brazilian Community',
    groupPt: 'Comunidade Brasileira',
    attendees: 28,
    date: 'Sunday, 2:00 PM',
    datePt: 'Domingo, 14:00',
    location: 'Stockwell Community Garden',
    locationPt: 'Jardim Comunitário Stockwell',
    spots: 12,
    flag: '🇧🇷'
  },
  {
    type: 'event',
    title: 'Lusophone Language Exchange',
    titlePt: 'Intercâmbio de Língua Portuguesa',
    group: 'Language Learning',
    groupPt: 'Aprendizagem de Línguas',
    attendees: 22,
    date: 'Wednesday, 6:30 PM',
    datePt: 'Quarta, 18:30',
    location: 'South Kensington Library',
    locationPt: 'Biblioteca South Kensington',
    spots: 0,
    flag: '🗣️'
  }
]

const memberSpotlight = [
  {
    name: 'Maria Santos',
    age: 29,
    location: 'Stockwell',
    origin: 'Porto, Portugal',
    originPt: 'Porto, Portugal',
    image: getImageWithFallback('sarah-chen'),
    quote: 'Found my Lusophone network here! From Sunday lunches to Fado nights, I feel at home again.',
    quotePt: 'Encontrei a minha rede portuguesa aqui! Dos almoços de domingo às noites de Fado, sinto-me em casa novamente.',
    activity: 'Organized 5 cultural events',
    activityPt: 'Organizou 5 eventos culturais',
    flag: '🇵🇹'
  },
  {
    name: 'Carlos Silva',
    age: 35,
    location: 'Elephant & Castle',
    origin: 'São Paulo, Brazil',
    originPt: 'São Paulo, Brasil',
    image: getImageWithFallback('priya-sharma'),
    quote: 'The Brazilian football group made London feel like home. Saudade no more!',
    quotePt: 'O grupo de futebol brasileiro fez Londres parecer casa. Acabou a saudade!',
    activity: 'Active in 6 groups',
    activityPt: 'Ativo em 6 grupos',
    flag: '🇧🇷'
  },
  {
    name: 'Ana Fernandes',
    age: 42,
    location: 'Vauxhall',
    origin: 'Luanda, Angola',
    originPt: 'Luanda, Angola',
    image: getImageWithFallback('maya-patel'),
    quote: 'Preserving Portuguese heritage while building professional networks here.',
    quotePt: 'Preservando a herança portuguesa enquanto construo redes profissionais aqui.',
    activity: 'Cultural coordinator',
    activityPt: 'Coordenadora cultural',
    flag: '🇦🇴'
  }
]

// Portuguese-speaking community areas in London
const communityAreas = [
  {
    name: 'Stockwell',
    description: 'Heart of Lusophone London with traditional bakeries and Portuguese businesses',
    descriptionPt: 'Coração de Londres Portuguesa com padarias tradicionais e negócios portugueses',
    highlights: ['Lusophone bakeries', 'Portuguese restaurants', 'Cultural center'],
    highlightsPt: ['Padarias portuguesas', 'Restaurantes portugueses', 'Centro cultural'],
    members: '150+',
    icon: '🥖'
  },
  {
    name: 'Vauxhall',
    description: 'Cultural hub with Lusophone churches and community events',
    descriptionPt: 'Centro cultural com igrejas portuguesas e eventos comunitários',
    highlights: ['Lusophone church', 'Cultural events', 'Community center'],
    highlightsPt: ['Igreja portuguesa', 'Eventos culturais', 'Centro comunitário'],
    members: '120+',
    icon: '⛪'
  },
  {
    name: 'South Kensington',
    description: 'Professional Portuguese-speaking community with business networking',
    descriptionPt: 'Comunidade de falantes de português profissional com networking empresarial',
    highlights: ['Business networking', 'Language exchange', 'Professional meetups'],
    highlightsPt: ['Networking empresarial', 'Intercâmbio linguístico', 'Encontros profissionais'],
    members: '80+',
    icon: '💼'
  },
  {
    name: 'Elephant & Castle',
    description: 'Diverse Portuguese-speaking community from Africa and Brazil',
    descriptionPt: 'Comunidade lusófona diversa de África e Brasil',
    highlights: ['Brazilian community', 'African heritage', 'Cultural diversity'],
    highlightsPt: ['Comunidade brasileira', 'Herança africana', 'Diversidade cultural'],
    members: '90+',
    icon: '🌍'
  }
]

// Lusophone origin communities
const originCommunities = [
  {
    country: 'Portugal',
    countryPt: 'Portugal',
    flag: '🇵🇹',
    members: '200+',
    description: 'From Porto to Algarve, maintaining mainland traditions',
    descriptionPt: 'Do Porto ao Algarve, mantendo tradições continentais',
    activities: ['Fado nights', 'Traditional festivals', 'Language preservation']
  },
  {
    country: 'Brazil',
    countryPt: 'Brasil',
    flag: '🇧🇷',
    members: '180+',
    description: 'Vibrant Brazilian culture with samba, football, and warmth',
    descriptionPt: 'Cultura brasileira vibrante com samba, futebol e calor humano',
    activities: ['Capoeira classes', 'Football groups', 'Carnival celebrations']
  },
  {
    country: 'Angola',
    countryPt: 'Angola',
    flag: '🇦🇴',
    members: '85+',
    description: 'Rich Angolan heritage with music, dance, and cultural traditions',
    descriptionPt: 'Rica herança angolana com música, dança e tradições culturais',
    activities: ['Semba dance', 'Cultural workshops', 'Heritage education']
  },
  {
    country: 'Cape Verde',
    countryPt: 'Cabo Verde',
    flag: '🇨🇻',
    members: '45+',
    description: 'Island culture with Morna music and maritime traditions',
    descriptionPt: 'Cultura insular com música Morna e tradições marítimas',
    activities: ['Morna music nights', 'Cultural storytelling', 'Island cuisine']
  }
]

export default function Community() {
  const { language, t } = useLanguage()
  const isPortuguese = language !== 'en'
  
  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section - CONVERSION OPTIMIZED */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-green-50/20">
          {/* Lusophone tile pattern background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c53026' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          {/* Portuguese flag inspired gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-red-500/5" />

          <div className="container-width relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Live Activity Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" />
                    <span className="text-sm font-bold text-gray-800">
                      🇵🇹 127 Portuguese speakers active this week
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Conversion Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                      Finally!
                    </span>{" "}
                    <span className="text-gray-900">Your Lusophone Community in London</span>
                  </h1>
                  
                  {/* Social Proof Stats */}
                  <div className="space-y-4">
                    <p className="text-xl xs:text-2xl sm:text-3xl text-gray-700 leading-relaxed font-medium">
                      <span className="font-bold text-green-600">Portuguese speakers</span> and growing • 
                      <span className="font-bold text-blue-600">127 active this week</span>
                    </p>
                    
                    <div className="flex items-center gap-4 text-lg text-gray-600">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid key={i} className="w-5 h-5 text-yellow-500" />
                        ))}
                        <span className="font-bold text-yellow-600">4.8★ from 890+ reviews</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      <span className="font-semibold text-red-600">Next meetup:</span> Sunday Brunch in Stockwell (34 attending)
                    </p>
                  </div>

                  {/* Clear CTA Section */}
                  <div className="space-y-4">
                    {/* Primary CTA */}
                    <button
                      onClick={() => window.location.href = '/signup'}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer group py-6 px-8"
                    >
                      <div className="flex items-center justify-center gap-4 text-xl font-black">
                        <span className="text-xl">🇵🇹</span>
                        <span>Join Your Lusophone Community - FREE</span>
                        <motion.div
                          whileHover={{ x: 6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-2xl">→</span>
                        </motion.div>
                      </div>
                    </button>

                    {/* Secondary CTA */}
                    <button
                      onClick={() => window.location.href = '/events'}
                      className="w-full bg-white/90 backdrop-blur-lg border-2 border-gray-200 text-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group py-4 px-6"
                    >
                      <div className="flex items-center justify-center gap-3 text-lg font-bold">
                        <span className="text-lg">📅</span>
                        <span>Browse Lusophone Events First</span>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>→</span>
                        </motion.div>
                      </div>
                    </button>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 pt-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        <span>Free to join</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        <span>750+ verified members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        <span>8+ London areas</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Social Proof & Live Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-6"
                >
                  {/* Live Activity Card */}
                  <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                    <div className="space-y-6">
                      {/* Live Activity Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <h3 className="text-xl font-bold text-gray-800">Live Community Activity</h3>
                      </div>

                      {/* Live Updates */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            🇵🇹
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-green-800">Sunday Brunch Stockwell</p>
                            <p className="text-sm text-green-600">34 attending • Lusophone bakery</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            🇧🇷
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-blue-800">Capoeira Class</p>
                            <p className="text-sm text-blue-600">Tomorrow • Elephant & Castle</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-red-50 rounded-2xl p-4 animate-pulse">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <p className="text-sm text-red-600 font-medium">
                            <span className="font-bold">Maria from Porto</span> just joined the community!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Proof Card */}
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Real Lusophone Members</h3>
                        <div className="flex items-center justify-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid key={i} className="w-5 h-5 text-yellow-500" />
                          ))}
                          <span className="text-lg font-bold text-yellow-600 ml-2">4.8/5</span>
                        </div>
                      </div>

                      {/* Featured Member */}
                      <div className="bg-gradient-to-r from-green-50 via-white to-red-50 rounded-2xl p-5 border border-green-100">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            M
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-gray-800">Maria, 29 • Stockwell</span>
                              <CheckIcon className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-gray-700 italic leading-relaxed">
                              "Found my Lusophone community here! From Sunday brunches to Fado nights, I feel at home."
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              {[...Array(5)].map((_, i) => (
                                <StarIconSolid key={i} className="w-3 h-3 text-yellow-500" />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">Verified Lusophone 🇵🇹</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Member Count */}
                      <div className="text-center">
                        <div className="flex justify-center -space-x-3 mb-3">
                          {["M", "J", "A", "C", "L"].map((initial, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-full border-3 border-white shadow-lg bg-gradient-to-br from-green-400 via-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm"
                            >
                              {initial}
                            </div>
                          ))}
                          <div className="w-10 h-10 rounded-full border-3 border-white shadow-lg bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                            +750
                          </div>
                        </div>
                        <p className="text-gray-600 font-medium">
                          <span className="font-bold text-green-600">Portuguese speakers</span> already connected
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Activity Feed */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? (
                    <>Eventos <span className="gradient-text">Acontecendo Agora</span></>
                  ) : (
                    <>What's <span className="gradient-text">Happening Now</span></>
                  )}
                </h2>
                <p className="text-lg text-gray-600">
                  {isPortuguese ? (
                    'Junta-te a estes eventos culturais portugueses acontecendo esta semana por Londres'
                  ) : (
                    'Join these Lusophone cultural events happening this week across London'
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            <span className="text-2xl">{activity.flag}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">
                              {isPortuguese ? activity.titlePt : activity.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="inline-flex items-center gap-1">
                                <CalendarDaysIcon className="h-4 w-4" />
                                {isPortuguese ? activity.datePt : activity.date}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                {isPortuguese ? activity.locationPt : activity.location}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <UsersIcon className="h-4 w-4" />
                                {activity.attendees} {isPortuguese ? 'participantes' : 'attendees'}
                              </span>
                            </div>
                            <span className="inline-block bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold">
                              {isPortuguese ? activity.groupPt : activity.group}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {activity.spots > 0 ? (
                          <>
                            <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                              {activity.spots} {isPortuguese ? 'vagas restantes' : 'spots left'}
                            </span>
                            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl">
                              {isPortuguese ? 'Participar' : 'Join Event'}
                            </button>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-4 py-2 rounded-lg">
                            {isPortuguese ? 'Completo (Lista de Espera)' : 'Full (Join Waitlist)'}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <a 
                  href={ROUTES.events}
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary-200 text-primary-600 px-8 py-4 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  {isPortuguese ? 'Ver Todos os Eventos' : 'View All Events'}
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portuguese-speaking community Areas */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? (
                  <>Bairros da <span className="gradient-text">Comunidade de Falantes de Português</span></>
                ) : (
                  <>Portuguese-speaking community <span className="gradient-text">Areas</span></>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
                {isPortuguese ? (
                  'Descobre onde a comunidade de falantes de português se reúne em Londres. Cada bairro tem a sua própria personalidade, desde padarias autênticas a centros culturais vibrantes.'
                ) : (
                  'Discover where the Portuguese-speaking community gathers in London. Each area has its own personality, from authentic bakeries to vibrant cultural centers.'
                )}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {communityAreas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="group"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{area.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{area.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {isPortuguese ? area.descriptionPt : area.description}
                      </p>
                      <div className="text-sm text-primary-600 font-bold mb-4 bg-primary-50 py-2 px-3 rounded-lg">
                        {area.members} {isPortuguese ? 'membros' : 'members'}
                      </div>
                      <div className="space-y-2 text-xs text-gray-500 mb-6">
                        {(isPortuguese ? area.highlightsPt : area.highlights).map((highlight, idx) => (
                          <p key={idx} className="flex items-center justify-center gap-1">
                            <CheckCircleIcon className="h-3 w-3 text-secondary-400" />
                            {highlight}
                          </p>
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600 py-3 rounded-xl hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 font-semibold border border-primary-200">
                        {isPortuguese ? 'Explorar Área' : 'Explore Area'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lusophone Origins Communities */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? (
                  <>Comunidades por <span className="gradient-text">Origem</span></>
                ) : (
                  <>Communities by <span className="gradient-text">Origin</span></>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
                {isPortuguese ? (
                  'Cada país lusófono traz a sua própria cultura, tradições e calor humano. Encontra a tua comunidade de origem ou descobre outras culturas portuguesas.'
                ) : (
                  'Each Portuguese-speaking country brings its own culture, traditions, and warmth. Find your community of origin or discover other Portuguese cultures.'
                )}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {originCommunities.map((community, index) => (
                  <motion.div
                    key={community.country}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300 border border-gray-200 h-full">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">{community.flag}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {isPortuguese ? community.countryPt : community.country}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {isPortuguese ? community.descriptionPt : community.description}
                      </p>
                      <div className="text-sm text-primary-600 font-bold mb-4 bg-primary-50 py-2 px-3 rounded-lg">
                        {community.members} {isPortuguese ? 'membros' : 'members'}
                      </div>
                      <div className="space-y-2 text-xs text-gray-500 mb-6">
                        {community.activities.map((activity, idx) => (
                          <p key={idx} className="flex items-center justify-center gap-1">
                            <MusicalNoteIcon className="h-3 w-3 text-accent-400" />
                            {activity}
                          </p>
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-secondary-500 to-primary-500 text-white py-3 rounded-xl hover:from-secondary-600 hover:to-primary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                        {isPortuguese ? 'Juntar-se' : 'Join Community'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Member Spotlight */}
        <section className="py-16 bg-gradient-to-br from-accent-50 to-coral-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? (
                  <>Conhece os <span className="gradient-text">Membros da Comunidade</span></>
                ) : (
                  <>Meet Our <span className="gradient-text">Community Members</span></>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                {isPortuguese ? (
                  'Pessoas reais fazendo conexões reais através de Londres - histórias da comunidade de falantes de português'
                ) : (
                  'Real people making real connections across London - stories from the Portuguese-speaking community'
                )}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {memberSpotlight.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white shadow-lg">
                        <Image 
                          src={member.image} 
                          alt={`${member.name} - LusoTown member`}
                          fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 text-2xl">
                        {member.flag}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">
                      {member.name}, {member.age}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 font-medium">{member.location}</p>
                    <p className="text-xs text-primary-600 mb-4 font-medium bg-primary-50 px-2 py-1 rounded-full inline-block">
                      {isPortuguese ? member.originPt : member.origin}
                    </p>
                    <blockquote className="text-gray-700 italic mb-4 min-h-[3rem] flex items-center justify-center text-sm leading-relaxed">
                      "{isPortuguese ? member.quotePt : member.quote}"
                    </blockquote>
                    <span className="inline-block bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-700 px-4 py-2 rounded-full text-xs font-semibold">
                      {isPortuguese ? member.activityPt : member.activity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lusophone Cultural Heritage & Values */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? (
                      <>Nossos <span className="gradient-text">Valores Comunitários</span></>
                    ) : (
                      <>Our <span className="gradient-text">Community Values</span></>
                    )}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    {isPortuguese ? (
                      'O que torna a nossa comunidade especial? Estes valores partilhados que cada membro abraça, refletindo o melhor da cultura portuguesa.'
                    ) : (
                      'What makes our community special? These shared values that every member embraces, reflecting the best of Portuguese culture.'
                    )}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Saudade e Conexões Autênticas' : 'Saudade & Authentic Connections'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Compreendemos a saudade. Construímos conexões genuínas que curam a nostalgia e criam novos lares.'
                          ) : (
                            'We understand saudade. We build genuine connections that heal homesickness and create new homes.'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Rede e Apoio Mútuo' : 'Network & Mutual Support'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Tratamo-nos como uma rede profissional. Celebramos sucessos juntos e apoiamo-nos nos desafios.'
                          ) : (
                            'We treat each other as a professional network. We celebrate successes together and support each other through challenges.'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Preservação Cultural' : 'Cultural Preservation'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Mantemos vivas as nossas tradições, língua e costumes para as próximas gerações.'
                          ) : (
                            'We keep our traditions, language, and customs alive for the next generations.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-coral-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Hospitalidade Portuguesa' : 'Lusophone Hospitality'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Abrimos os braços a todos. "Onde há portugueses, há sempre uma mesa para mais um."'
                          ) : (
                            'We welcome everyone with open arms. "Where there are Lusophone people, there\'s always room for one more."'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Diversidade Lusófona' : 'Lusophone-Speaking Diversity'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Celebramos toda a diversidade do mundo lusófono - de Portugal ao Brasil, de Angola a Cabo Verde.'
                          ) : (
                            'We celebrate all the diversity of the Portuguese-speaking world - from Portugal to Brazil, from Angola to Cape Verde.'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {isPortuguese ? 'Amor por Londres' : 'Love for London'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isPortuguese ? (
                            'Partilhamos a paixão por esta cidade incrível que agora chamamos de casa.'
                          ) : (
                            'We share our passion for this incredible city we now call home.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lusophone Business Directory Integration */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? (
                  <>Negócios <span className="gradient-text">Portugueses</span> em Londres</>
                ) : (
                  <>Lusophone <span className="gradient-text">Businesses</span> in London</>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
                {isPortuguese ? (
                  'Apoia a nossa comunidade empresarial. Desde padarias autênticas que fazem pastéis tradicionais, a restaurantes que servem francesinha autêntica, a serviços prestados por pessoas que compreendem a nossa cultura.'
                ) : (
                  'Support our business community. From authentic bakeries making traditional pastéis, to restaurants serving authentic francesinha, to services provided by people who understand our culture.'
                )}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 border border-primary-200 hover:shadow-lg transition-all duration-300"
                >
                  <BuildingStorefrontIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? 'Restaurantes & Cafés' : 'Restaurants & Cafés'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {isPortuguese ? (
                      'Sabores de casa em Londres. Francesinha, pastéis de nata, bacalhau e muito mais.'
                    ) : (
                      'Flavors of home in London. Francesinha, pastéis de nata, bacalhau and much more.'
                    )}
                  </p>
                  <span className="text-primary-600 font-semibold text-sm">25+ {isPortuguese ? 'estabelecimentos' : 'establishments'}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 border border-secondary-200 hover:shadow-lg transition-all duration-300"
                >
                  <HomeIcon className="h-12 w-12 text-secondary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? 'Serviços Comunitários' : 'Community Services'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {isPortuguese ? (
                      'Cabeleireiros, tradutores, contabilistas que falam português e compreendem as nossas necessidades.'
                    ) : (
                      'Hairdressers, translators, accountants who speak Lusophone and understand our needs.'
                    )}
                  </p>
                  <span className="text-secondary-600 font-semibold text-sm">40+ {isPortuguese ? 'serviços' : 'services'}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-gradient-to-br from-accent-50 to-white rounded-2xl p-6 border border-accent-200 hover:shadow-lg transition-all duration-300"
                >
                  <AcademicCapIcon className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? 'Educação & Cultura' : 'Education & Culture'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {isPortuguese ? (
                      'Escolas de português, aulas de guitarra, grupos de dança tradicional portuguesa.'
                    ) : (
                      'Lusophone schools, guitar lessons, traditional Lusophone dance groups.'
                    )}
                  </p>
                  <span className="text-accent-600 font-semibold text-sm">15+ {isPortuguese ? 'programas' : 'programs'}</span>
                </motion.div>
              </div>
              <div className="mt-8">
                <a 
                  href={ROUTES.directory}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  {isPortuguese ? 'Ver Diretório Completo' : 'View Full Directory'}
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-coral-50 via-accent-50 to-primary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {isPortuguese ? (
                    <>Pronto para se Juntar à <span className="gradient-text">Rede Portuguesa?</span></>
                  ) : (
                    <>Ready to Join the <span className="gradient-text">Lusophone Network?</span></>
                  )}
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {isPortuguese ? (
                    `A tua rede portuguesa está à espera. Junta-te a ${stats.members} falantes de português que fizeram de Londres a sua casa, uma conexão profissional de cada vez. Unidos pela língua, unidos pela ambição.`
                  ) : (
                    `Your Lusophone network is waiting. Join ${stats.members} Portuguese speakers who have made London their home, one professional connection at a time. United by language, united by ambition.`
                  )}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                  <a 
                    href={ROUTES.signup} 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 hover:from-secondary-700 hover:via-primary-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    {isPortuguese ? 'JUNTAR À REDE' : 'JOIN THE NETWORK'}
                    <ArrowRightIcon className="h-6 w-6 ml-3" />
                  </a>
                  <a 
                    href={ROUTES.groups} 
                    className="border-2 border-primary-300 text-primary-700 px-10 py-5 rounded-2xl font-bold hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    {isPortuguese ? 'Ver Grupos' : 'View Groups'}
                  </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-gray-600 font-medium">
                      {isPortuguese ? 'Grátis para participar' : 'Free to join'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-gray-600 font-medium">
                      {isPortuguese ? 'Membros verificados' : 'Verified members'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-gray-600 font-medium">
                      {isPortuguese ? 'Eventos autênticos' : 'Authentic events'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-gray-600 font-medium">
                      {isPortuguese ? 'Rede portuguesa' : 'Lusophone network'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
                  <p className="text-primary-700 font-semibold italic">
                    {isPortuguese ? (
                      '"Unidos pela Língua" - Onde quer que venhas no mundo lusófono, aqui tens casa em Londres.'
                    ) : (
                      '"Unidos pela Língua" - Wherever you come from in the Portuguese-speaking world, you have a home here in London.'
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Section - Removed CaseStudiesPromo component */}
      </div>
      <Footer />
    </main>
  )
}