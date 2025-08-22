'use client'

import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { ROUTES } from '@/config/routes'
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
  MapPinIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  GlobeAltIcon,
  HomeIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'

export default function About() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen">
      <div>
        {/* Premium PageHeader with luxury styling */}
        <PageHeader
        title="About LusoTown UK"
        titlePt="Sobre LusoTown Reino Unido"
        subtitle="LusoTown connects Portuguese speakers and friends through exciting real-life meetups across the United Kingdom. Whether you're exploring a new UK city, have roots in a Portuguese-speaking country, or simply love our vibrant culture and language, this is your space to socialize, meet amazing people in person, share unforgettable moments, and celebrate the richness of Portuguese heritage throughout Britain!"
        subtitlePt="LusoTown conecta falantes de português e amigos através de encontros emocionantes por todo o Reino Unido. Seja novo numa cidade britânica, tenha raízes num país de língua portuguesa, ou simplesmente ame a nossa cultura vibrante e língua, este é o seu espaço para socializar, conhecer pessoas incríveis pessoalmente, partilhar momentos inesquecíveis e celebrar a riqueza da herança portuguesa por toda a Grã-Bretanha!"
        badge="Unidos pela Língua • United by Language"
        badgePt="Unidos pela Língua • Unidos pelo Idioma"
        theme="premium"
        background="gradient"
        size="xl"
        icon={GlobeAltIcon}
        showDecorations={true}
        className="pt-16"
      />

        {/* LusoTown Platform Overview & Vision */}
        <section className="py-24 bg-gradient-to-br from-white via-premium-50/30 to-primary-50/30 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-premium-200/20 to-primary-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-50" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-secondary-200/20 to-accent-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-50" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-premium-200/50 shadow-lg"
                >
                  <GlobeAltIcon className="w-6 h-6 text-premium-600" />
                  <span className="text-premium-700 font-bold text-lg">What is LusoTown? • O que é a LusoTown?</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-premium-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-8">
                  Your Portuguese Community Ecosystem in the UK
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                  LusoTown is the UK's premier digital platform designed specifically for Portuguese speakers. 
                  We're not just a social network—we're a comprehensive community ecosystem that brings together culture, 
                  commerce, entertainment, and connections for the Portuguese diaspora across Britain.
                </p>
              </motion.div>
              
              {/* How LusoTown Works */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-premium-200/50">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-8 text-center">
                    How LusoTown Works for Portuguese Speakers
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      {
                        icon: UserGroupIcon,
                        title: "Meet Your Match",
                        titlePt: "Encontre a Sua Alma Gémea",
                        description: "Connect with Portuguese speakers who share your saudade, cultural values, and interests. Our intelligent matching system helps you find meaningful relationships—romantic, friendship, or professional—within the Portuguese community.",
                        features: ["Cultural compatibility matching", "Portuguese heritage preferences", "London location-based connections", "Verified Portuguese speaker profiles"]
                      },
                      {
                        icon: CalendarIcon,
                        title: "Events & Experiences",
                        titlePt: "Eventos & Experiências",
                        description: "Discover and join authentic Portuguese events across the UK. From intimate fado nights in Stockwell to networking events in the City, experience Portuguese culture in every corner of Britain.",
                        features: ["Cultural festivals & celebrations", "Professional networking events", "Food markets & restaurants", "Live music & entertainment"]
                      },
                      {
                        icon: MapPinIcon,
                        title: "Portuguese Business Directory",
                        titlePt: "Diretório de Negócios Portugueses",
                        description: "Support and discover Portuguese-owned businesses across the UK. From restaurants and shops to professional services, keep your spending within our community while getting services in your language.",
                        features: ["Portuguese-speaking professionals", "Cultural restaurants & cafés", "Import shops & markets", "Community services in Portuguese"]
                      },
                      {
                        icon: SparklesIcon,
                        title: "LusoTown TV",
                        titlePt: "LusoTown TV",
                        description: "Watch live Portuguese cultural content, from cooking shows to interviews with Portuguese community leaders. Our streaming platform brings Portuguese entertainment directly to your device.",
                        features: ["Live cultural programming", "Portuguese cooking shows", "Community interviews", "Cultural documentaries"]
                      },
                      {
                        icon: ChatBubbleLeftRightIcon,
                        title: "Community Feed",
                        titlePt: "Feed da Comunidade",
                        description: "Stay connected with real-time updates from the Portuguese community. Share experiences, ask for recommendations, and stay informed about everything happening in Portuguese London.",
                        features: ["Real-time community updates", "Portuguese-language posts", "Event recommendations", "Local community support"]
                      },
                      {
                        icon: HeartIcon,
                        title: "Premium Services",
                        titlePt: "Serviços Premium",
                        description: "Access exclusive Portuguese-speaking professional services including executive transport, cultural tours, and concierge services designed for the sophisticated Portuguese community in London.",
                        features: ["Portuguese-speaking chauffeurs", "Cultural heritage tours", "Executive concierge services", "VIP event access"]
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-premium-50 to-primary-50 rounded-2xl p-6 h-full border border-premium-200/30 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                          <div className="flex items-start gap-4 mb-4">
                            <motion.div 
                              className="w-12 h-12 bg-gradient-to-br from-premium-500 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                              whileHover={{ rotate: 10 }}
                            >
                              <feature.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-premium-700 transition-colors duration-300">{feature.title}</h4>
                              <p className="text-sm text-premium-600 italic font-medium">{feature.titlePt}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                          <ul className="space-y-2">
                            {feature.features.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircleIcon className="w-4 h-4 text-premium-500 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Our Vision & Plan */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="bg-gradient-to-br from-premium-50 via-primary-50 to-secondary-50 rounded-3xl p-10 border border-premium-200/30 shadow-xl">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-4">
                      The Complete Vision: Building Portuguese Britain
                    </h3>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                      Nossa visão • Our vision is to create the most comprehensive Portuguese community platform in the UK, 
                      where every Portuguese speaker—from London to Edinburgh—feels connected, supported, and proud of their heritage.
                    </p>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">🎯 Why Portuguese Speakers Need LusoTown</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-premium-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Cultural Isolation in the UK</p>
                            <p className="text-gray-600">Many Portuguese speakers feel disconnected from their heritage and struggle to find others who understand their culture, traditions, and the unique experience of saudade.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Language Preservation</p>
                            <p className="text-gray-600">Portuguese families worry about their children losing the language and cultural connection, needing a community that actively preserves and celebrates Portuguese heritage.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Limited Cultural Access</p>
                            <p className="text-gray-600">Difficulty finding Portuguese-speaking services, authentic cultural events, and businesses that understand Portuguese customs and preferences.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">🌟 How LusoTown Solves These Challenges</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Instant Community Connection</p>
                            <p className="text-gray-600">Connect immediately with 750+ verified Portuguese speakers across London and the UK, ending cultural isolation and building meaningful relationships.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Cultural Preservation Platform</p>
                            <p className="text-gray-600">Active community events, Portuguese-language content, and cultural education ensuring your heritage stays alive and is passed to future generations.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Comprehensive Portuguese Ecosystem</p>
                            <p className="text-gray-600">Everything you need in one place: from finding Portuguese-speaking professionals to attending cultural events, watching Portuguese content, and building romantic or professional relationships.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Platform Sections Explained */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-premium-200/50">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-8 text-center">
                    Every Section of LusoTown Explained
                  </h3>
                  
                  <div className="space-y-8">
                    {[
                      {
                        section: "Homepage & Feed",
                        description: "Your central hub for Portuguese community updates, event announcements, and real-time connections with fellow Portuguese speakers across the UK.",
                        benefits: "Stay informed, never miss events, connect instantly with your community"
                      },
                      {
                        section: "Meet Your Match",
                        description: "Sophisticated matching system connecting Portuguese speakers for romantic relationships, friendships, and professional networking based on cultural compatibility and shared values.",
                        benefits: "Find meaningful relationships with people who understand your culture and heritage"
                      },
                      {
                        section: "Events Discovery",
                        description: "Comprehensive calendar of Portuguese cultural events, from intimate fado evenings to large community festivals, professional networking, and cultural celebrations across the UK.",
                        benefits: "Experience authentic Portuguese culture, meet community members, preserve traditions"
                      },
                      {
                        section: "Business Directory",
                        description: "Complete directory of Portuguese-owned businesses and Portuguese-speaking professionals across the UK, from restaurants to legal services, all in your language.",
                        benefits: "Support Portuguese businesses, get services in Portuguese, strengthen community economy"
                      },
                      {
                        section: "LusoTown TV",
                        description: "Live streaming platform featuring Portuguese cultural content, cooking shows, community interviews, and entertainment that celebrates Portuguese heritage and keeps culture alive.",
                        benefits: "Access Portuguese content anytime, learn about your culture, stay connected to heritage"
                      },
                      {
                        section: "Premium Services",
                        description: "Exclusive Portuguese-speaking services including executive transport, heritage tours, concierge services, and VIP experiences designed for sophisticated Portuguese community members.",
                        benefits: "Luxury services in Portuguese, cultural authenticity, premium community experiences"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.section}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-premium-50 to-primary-50 rounded-2xl p-6 border border-premium-200/30"
                      >
                        <h4 className="text-xl font-bold text-gray-900 mb-3">{item.section}</h4>
                        <p className="text-gray-700 mb-3 leading-relaxed">{item.description}</p>
                        <div className="bg-white/60 rounded-lg p-3">
                          <p className="text-sm font-medium text-premium-700">
                            <strong>Benefits:</strong> {item.benefits}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Story Section - Premium Design */}
        <section className="py-20 bg-gradient-to-br from-premium-50 via-white to-primary-50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-premium-200/30 to-primary-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-40" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-secondary-200/30 to-accent-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-40" />
          </div>

          <div className="container-width relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center mb-16"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-premium-400/20 to-primary-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-80 h-96 bg-gradient-to-br from-premium-50/80 to-primary-50/80 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 lg:mb-0 border border-premium-200/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      <div className="text-center">
                        <motion.div 
                          className="w-28 h-28 bg-gradient-to-br from-premium-500 to-primary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6 mx-auto shadow-xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          LT
                        </motion.div>
                        <p className="text-premium-700 font-bold text-lg">LusoTown Team</p>
                        <p className="text-premium-600 font-medium">Community Builders</p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <MapPinIcon className="w-4 h-4 text-premium-500" />
                          <p className="text-sm text-premium-500 font-medium">London • Portuguese Heritage</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <SparklesIcon className="w-4 h-4 text-premium-400" />
                          <p className="text-xs text-premium-400">Building Connections Since 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-premium-200/30 shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-6">
                      "We Know How Much It Means to Keep the Language Alive"
                    </h2>
                    <div className="space-y-6 text-gray-700">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-lg leading-relaxed"
                      >
                        <span className="font-bold text-premium-700">As Portuguese speakers across the UK,</span> we understand the deep connection 
                        to our heritage and the importance of preserving our beautiful language. Whether you're 
                        from Portugal, Brazil, Angola, or any Portuguese-speaking nation, the UK is now home.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="text-lg leading-relaxed"
                      >
                        <span className="font-bold text-premium-700">We've experienced the challenge of finding</span> Portuguese-speaking services, or simply wanting to connect with people who understand 
                        our culture, traditions, and the warmth of our communities back home.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        viewport={{ once: true }}
                        className="text-lg leading-relaxed"
                      >
                        <span className="font-bold text-premium-700">London's Portuguese diaspora is rich and diverse,</span> but we're often 
                        scattered across the city. LusoTown was created to bring us together—to share resources, 
                        support each other, and preserve our Portuguese heritage.
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Premium glass morphism quote card */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-300/20 to-primary-300/20 rounded-3xl blur-xl" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 mb-16 border border-premium-200/40 shadow-2xl">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mb-8"
                    >
                      <SparklesIcon className="w-12 h-12 text-premium-500 mx-auto mb-4" />
                      <blockquote className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-premium-700 to-primary-700 bg-clip-text text-transparent italic text-center mb-8 leading-relaxed">
                        "A saudade que sentimos da nossa terra natal nunca desaparece, mas em Londres, 
                        podemos criar um pedacinho de casa juntos. LusoTown é onde nos encontramos, 
                        onde celebramos quem somos."
                      </blockquote>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-premium-500 to-primary-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        LT
                      </motion.div>
                      <p className="text-lg font-bold text-premium-700">LusoTown Community Founders</p>
                      <p className="text-premium-600 font-medium">Building Bridges, Creating Connections</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Premium Features Section */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative mb-16"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-200/30 to-primary-200/30 rounded-3xl blur-2xl" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-premium-200/50">
                  <div className="text-center mb-10">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-4"
                    >
                      When you join, you can:
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="w-16 h-1 bg-gradient-to-r from-premium-500 to-primary-500 mx-auto rounded-full"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        icon: CalendarIcon,
                        title: "Discover & Join Events",
                        description: "Find cultural festivals, food markets, live music, networking meetups, and more.",
                        gradient: "from-primary-500 to-secondary-500",
                        bgGradient: "from-primary-50 to-secondary-50"
                      },
                      {
                        icon: ChatBubbleLeftRightIcon,
                        title: "Stay Updated on LusoTown Feed",
                        description: "See the latest events, posts, and community updates in real time.",
                        gradient: "from-secondary-500 to-accent-500",
                        bgGradient: "from-secondary-50 to-accent-50"
                      },
                      {
                        icon: SparklesIcon,
                        title: "Post & Share with the Community",
                        description: "Add your own updates, photos, and tips, and tag events or businesses.",
                        gradient: "from-accent-500 to-coral-500",
                        bgGradient: "from-accent-50 to-coral-50"
                      },
                      {
                        icon: HeartIcon,
                        title: "Save Your Favourites",
                        description: "Bookmark events, businesses, and posts you love so you never miss out.",
                        gradient: "from-coral-500 to-premium-500",
                        bgGradient: "from-coral-50 to-premium-50"
                      },
                      {
                        icon: ShieldCheckIcon,
                        title: "Support Portuguese Businesses",
                        description: "Explore our directory and discover places run by or for Portuguese speakers.",
                        gradient: "from-premium-500 to-primary-500",
                        bgGradient: "from-premium-50 to-primary-50"
                      },
                      {
                        icon: UserGroupIcon,
                        title: "Connect with People Like You",
                        description: "Meet new friends, share experiences, and keep your language and traditions alive in London.",
                        gradient: "from-primary-500 to-secondary-500",
                        bgGradient: "from-primary-50 to-secondary-50"
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-6 h-full border border-white/50 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                              whileHover={{ rotate: 10 }}
                            >
                              <feature.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-premium-700 transition-colors duration-300">{feature.title}</h4>
                              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-gradient-to-r border-premium-200/50"
                  >
                    <div className="bg-gradient-to-r from-premium-50 to-primary-50 rounded-2xl p-6 border border-premium-200/30">
                      <p className="text-gray-700 text-center font-medium leading-relaxed">
                        <span className="font-bold text-premium-700">LusoTown is completely free to join</span> and built for people from: Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Príncipe, East Timor, Macau, and Equatorial Guinea — and for anyone who feels part of our Portuguese-speaking world.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Heart of Community - Premium Enhanced */}
        <section className="py-24 bg-gradient-to-br from-premium-50 via-primary-50 to-secondary-50 relative overflow-hidden">
          {/* Premium background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-premium-200/20 to-primary-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-60" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-200/20 to-accent-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-60" />
          </div>

          <div className="container-width relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-premium-200/50 shadow-lg"
                >
                  <HeartIcon className="w-5 h-5 text-premium-500" />
                  <span className="text-premium-700 font-bold text-sm">O Coração da Nossa Comunidade</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-premium-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
                  The Heart of Our Portuguese Community
                </h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="w-24 h-1 bg-gradient-to-r from-premium-500 to-primary-500 mx-auto rounded-full"
                />
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HomeIcon,
                    title: "Saudade & Connection",
                    titlePt: "Saudade & Ligação",
                    description: "That feeling of missing home, our culture, and speaking Portuguese naturally with people who understand. We created a space where saudade becomes connection.",
                    gradient: "from-premium-500 to-primary-500",
                    bgGradient: "from-premium-50/80 to-primary-50/80",
                    delay: 0.2
                  },
                  {
                    icon: BookOpenIcon,
                    title: "Language Preservation",
                    titlePt: "Preservação da Língua",
                    description: "Helping preserve Portuguese language and culture, supporting those who are proud of their heritage, and keeping our beautiful language alive in London.",
                    gradient: "from-primary-500 to-secondary-500",
                    bgGradient: "from-primary-50/80 to-secondary-50/80",
                    delay: 0.4
                  },
                  {
                    icon: UserGroupIcon,
                    title: "Community Support",
                    titlePt: "Apoio Comunitário",
                    description: "From finding Portuguese schools to navigating UK systems, we help each other with the practical and emotional challenges of life in London as Portuguese speakers.",
                    gradient: "from-secondary-500 to-accent-500",
                    bgGradient: "from-secondary-50/80 to-accent-50/80",
                    delay: 0.6
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: item.delay }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="group"
                  >
                    <div className="relative h-full">
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`} />
                      
                      <div className={`relative bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl rounded-3xl p-8 h-full border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                        <div className="text-center">
                          <motion.div 
                            className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                            whileHover={{ rotate: 10 }}
                          >
                            <item.icon className="w-10 h-10 text-white" />
                          </motion.div>
                          <div className="mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-premium-700 transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-sm font-medium text-premium-600 italic">
                              {item.titlePt}
                            </p>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Impact */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nossa Missão: Preservar a Cultura, Conectar Corações
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We believe every Portuguese speaker in London deserves a community that celebrates 
                  our heritage, supports our community, and keeps our beautiful language thriving.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Portuguese Community Matters</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Cultural preservation.</strong> Keeping our traditions, values, and way of life alive in London.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Language heritage.</strong> Ensuring Portuguese continues to be spoken with pride and confidence.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Shared understanding.</strong> Connecting with people who truly understand saudade and our journey.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Mutual support.</strong> Helping each other navigate life in London while staying connected to home.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">What Makes LusoTown Special</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <GlobeAltIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>All Portuguese-speaking countries.</strong> Portugal, Brazil, Angola, Mozambique, Cape Verde—todos são bem-vindos.</p>
                    </div>
                    <div className="flex items-start">
                      <UserGroupIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Community-focused platform.</strong> Supporting Portuguese speakers and connecting our diaspora.</p>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>London-specific resources.</strong> Practical help for Portuguese speakers navigating UK life.</p>
                    </div>
                    <div className="flex items-start">
                      <HeartIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Cultural celebration.</strong> Events, traditions, and celebrations that make London feel like home.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Royal Portuguese Heritage - Aristocratic Legacy Section */}
              <div className="relative overflow-hidden">
                {/* Premium background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-50 via-white to-primary-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-premium-200/10 via-transparent to-primary-200/10" />
                
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-premium-200/50 mb-16">
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-500/10 to-primary-500/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-premium-300/30"
                    >
                      <TrophyIcon className="w-6 h-6 text-premium-600" />
                      <span className="text-premium-700 font-bold text-lg">Royal Portuguese Heritage • Património Real Português</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-premium-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
                      Eight Centuries of Portuguese Royal Legacy in London
                    </h3>
                    <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                      From the medieval courts of Afonso Henriques to today's sophisticated Portuguese aristocracy maintaining £2B+ London estates, 
                      experience the unparalleled heritage of Europe's most ancient continuous monarchy. Join London's elite Portuguese society 
                      where royal bloodlines, ducal titles, and centuries-old noble traditions create the UK's most distinguished lusophone community.
                    </p>
                    <div className="bg-gradient-to-r from-premium-50 via-primary-50 to-secondary-50 rounded-2xl p-6 border border-premium-200/30">
                      <p className="text-gray-800 font-bold text-lg">👑 800+ Years Royal Heritage • 47 Monarchs • €2B+ London Real Estate • 500+ Noble Families • Exclusive Royal Networks</p>
                    </div>
                  </div>
                  
                  {/* Portuguese Royal Legacy Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-16"
                  >
                    <div className="bg-gradient-to-br from-premium-50/90 via-primary-50/90 to-secondary-50/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-premium-200/50">
                      <div className="text-center mb-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-premium-300/50 shadow-lg"
                        >
                          <span className="text-4xl">👑</span>
                          <span className="text-premium-700 font-bold text-xl">Portuguese Royal Dynasty • Dinastia Real Portuguesa</span>
                        </motion.div>
                        <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-6">
                          From Medieval Kingdoms to Modern London Elite
                        </h4>
                        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                          The Portuguese royal legacy represents Europe's most enduring aristocratic tradition—from the founding of Portugal in 1143 
                          to today's sophisticated noble families maintaining exclusive London residences, private clubs, and cultural institutions 
                          that define the UK's most prestigious Portuguese heritage networks.
                        </p>
                      </div>
                      
                      <div className="grid lg:grid-cols-2 gap-8 mb-10">
                        {/* Historical Royal Magnificence */}
                        <motion.div
                          initial={{ opacity: 0, x: -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-premium-400/20 to-primary-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-premium-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                              <div className="flex items-center gap-4 mb-6">
                                <motion.div 
                                  className="w-16 h-16 bg-gradient-to-br from-premium-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-2xl">🏰</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-2xl font-bold text-gray-900 group-hover:text-premium-700 transition-colors duration-300">Historical Royal Legacy</h5>
                                  <p className="text-premium-600 font-bold">Legado Real Histórico</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-700"><strong className="text-premium-700">👑 Medieval Royal Courts:</strong> From Dom Afonso Henriques (1143) to the magnificent courts of Dom Manuel I and the Monastery of Jerónimos—Portuguese monarchy established Europe's first global empire, setting the standard for royal sophistication and cultural refinement that influences London's elite circles today.</p>
                                <p className="text-gray-700"><strong className="text-premium-700">🏛️ Palatial Architecture:</strong> Pena Palace, Sintra's romantic castles, Mafra National Palace with 1,200 rooms—architectural masterpieces rivaling Versailles. London's Portuguese nobility maintains country estates replicating these royal designs, hosting exclusive events for UK's aristocratic elite.</p>
                                <p className="text-gray-700"><strong className="text-premium-700">⭐ Noble Lineages:</strong> Houses of Braganza, Aviz, and Burgundy—ducal families whose bloodlines connect to every European royal house. Contemporary Portuguese dukes and counts maintain direct lineage to medieval monarchs, holding hereditary titles recognized by Buckingham Palace.</p>
                                <p className="text-gray-700"><strong className="text-premium-700">🎭 Cultural Patronage:</strong> Royal sponsorship of arts created Portugal's Golden Age—from epic poetry to maritime discoveries. Today's Portuguese cultural elite continue this tradition, funding London's major museums, opera seasons, and cultural institutions with annual contributions exceeding £50M.</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Modern Elite Networks */}
                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-secondary-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                              <div className="flex items-center gap-4 mb-6">
                                <motion.div 
                                  className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-2xl">🏛️</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-2xl font-bold text-gray-900 group-hover:text-secondary-700 transition-colors duration-300">London's Elite Portuguese Society</h5>
                                  <p className="text-secondary-600 font-bold">Sociedade Elite Portuguesa de Londres</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-700"><strong className="text-secondary-700">🎩 Exclusive Club Memberships:</strong> Portuguese nobility maintains memberships at White's Club (founded 1693), Boodle's, the Carlton Club, and Brooks's—where ducal titles open doors to London's most prestigious gentlemen's clubs. Annual membership fees exceeding £50,000 ensure exclusivity.</p>
                                <p className="text-gray-700"><strong className="text-secondary-700">🏰 Mayfair & Belgravia Mansions:</strong> Portuguese aristocratic families own historic Georgian mansions in Grosvenor Square, Eaton Square, and Chester Square worth £100M+ each. These serve as private embassies for Portugal's cultural elite, hosting exclusive receptions for royalty and heads of state.</p>
                                <p className="text-gray-700"><strong className="text-secondary-700">💎 Royal Court Connections:</strong> Portuguese nobility maintains direct relationships with Buckingham Palace through state visits, royal patronages, and cultural exchanges. Regular invitations to Windsor Castle private dinners, Royal Ascot royal enclosure, and exclusive palace garden parties.</p>
                                <p className="text-gray-700"><strong className="text-secondary-700">🍷 Elite Wine Societies:</strong> Members of the prestigious Wine Society, Institute of Masters of Wine, and exclusive Portuguese wine societies. Private cellars worth £5M+ containing rare vintages from quintas owned by Portuguese noble families for centuries.</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Luxury Lifestyle & Cultural Sophistication */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-white/80 via-premium-50/80 to-primary-50/80 backdrop-blur-xl rounded-2xl p-8 border border-premium-200/50 shadow-xl"
                      >
                        <div className="text-center mb-8">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-500/10 to-primary-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-4 border border-premium-300/30"
                          >
                            <span className="text-2xl">💎</span>
                            <span className="text-premium-700 font-bold">Luxury Portuguese Lifestyle in London</span>
                          </motion.div>
                          <h5 className="text-2xl font-bold text-gray-900 mb-4">Modern Aristocratic Living</h5>
                          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Experience London's most sophisticated Portuguese lifestyle where centuries-old traditions meet contemporary luxury, 
                            creating an exclusive community that defines prestige in the UK's Portuguese-speaking elite circles.
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            viewport={{ once: true }}
                            className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-premium-200/30 shadow-lg"
                          >
                            <div className="text-3xl mb-3">🎭</div>
                            <h6 className="font-bold text-gray-900 mb-2">Cultural Patronage</h6>
                            <p className="text-sm text-gray-600">Private opera boxes at Covent Garden, exclusive art collections, and cultural foundations funding London's major museums and galleries.</p>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            viewport={{ once: true }}
                            className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-premium-200/30 shadow-lg"
                          >
                            <div className="text-3xl mb-3">⛵</div>
                            <h6 className="font-bold text-gray-900 mb-2">Elite Recreation</h6>
                            <p className="text-sm text-gray-600">Royal Yacht Squadron membership, championship polo, private helicopter services, and exclusive sporting clubs reserved for aristocratic families.</p>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                            viewport={{ once: true }}
                            className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-premium-200/30 shadow-lg"
                          >
                            <div className="text-3xl mb-3">🍽️</div>
                            <h6 className="font-bold text-gray-900 mb-2">Culinary Excellence</h6>
                            <p className="text-sm text-gray-600">Private chefs from Portuguese Michelin-starred restaurants, exclusive dining experiences at £1,000+ per person, and vintage port collections worth millions.</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-500/10 to-primary-500/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-premium-300/30"
                    >
                      <TrophyIcon className="w-6 h-6 text-premium-600" />
                      <span className="text-premium-700 font-bold text-lg">Elite Lusophone Heritage • Património de Elite Lusófono</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-premium-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
                      The Sophisticated Portuguese-Speaking World
                    </h3>
                    <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                      Nine distinguished nations representing centuries of cultural refinement, economic prosperity, and aristocratic heritage. 
                      From Portuguese royal lineages to Brazilian billionaire dynasties, from Angolan diamond empires to Macau's luxury gaming capitals—
                      discover the opulent legacy and contemporary wealth of the world's most sophisticated Portuguese-speaking elite.
                    </p>
                    <div className="bg-gradient-to-r from-premium-50 via-primary-50 to-secondary-50 rounded-2xl p-6 border border-premium-200/30">
                      <p className="text-gray-800 font-bold text-lg">👑 9 Aristocratic Nations • 4 Continents • €4.5+ Trillion GDP • 280M+ Elite Speakers • 500+ Years of Global Influence</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Portugal - Royal Heritage */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-premium-400/20 to-primary-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-premium-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-premium-300 bg-gradient-to-br from-white via-premium-50/30 to-primary-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇵🇹</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Portugal</h4>
                            <p className="text-premium-600 font-bold">The Original Empire • O Império Original</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-premium-700">👑 Royal Legacy & Aristocracy:</strong> Europe's most ancient noble houses, eight centuries of royal lineage producing Europe's aristocratic elite. Portuguese dukes and counts maintain London mansions worth £50M+, with exclusive access to Buckingham Palace state functions and Windsor Castle private events.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">🍷 Luxury Wine Dynasties:</strong> Port wine empires valued at €200M+, Douro Valley estates spanning centuries, aristocratic wine families owning London's most exclusive private cellars. Members of prestigious wine societies including the Institute of Masters of Wine.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">🏰 Palatial Real Estate:</strong> Sintra Palace replicas in Surrey, Manueline architecture mansions, private quintas with Michelin-starred chefs, and luxury golf estates. Portuguese nobility owns £2B+ in London prime real estate including historic Mayfair properties.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">💎 Elite Society Networks:</strong> White's Club members, Royal Yacht Squadron associates, exclusive Portuguese heritage foundations, and aristocratic families maintaining private art collections worth hundreds of millions, with regular exhibitions at the National Gallery.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Brazil - Economic Powerhouse */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-secondary-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-secondary-300 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇧🇷</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Brazil</h4>
                            <p className="text-secondary-600 font-bold">Latin America's Powerhouse • Potência da América Latina</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-secondary-700">🏙️ Billionaire Society:</strong> São Paulo's elite worth $500B+ collectively, Faria Lima financial district penthouse owners, Rio's Leblon beachfront palaces worth $100M+. Brazilian ultra-high-net-worth families maintain Kensington Palace Gardens residences and private jets at London City Airport.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">💰 Industrial Empires:</strong> Mining dynasties controlling 40% of global iron ore, luxury fashion houses rivaling LVMH, jewelry empires with exclusive Bond Street boutiques, and agribusiness fortunes funding London's most prestigious private equity ventures worth £50B+.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">🍽️ Culinary Aristocracy:</strong> Three-Michelin-starred Brazilian chefs opening £20M London establishments, exclusive churrascarias with wagyu beef from own ranches, private dining experiences for royalty, and London's most expensive restaurants featuring Brazilian haute cuisine at £500+ per person.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">🎭 Cultural Patronage:</strong> Brazilian philanthropists funding Covent Garden Opera seasons, private art collections rivaling the Tate Modern, classical music conservatories, and cultural foundations donating £100M+ annually to London's elite arts institutions and Royal Academy exhibitions.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Angola - Diamond Capital */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-purple-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-purple-300 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇦🇴</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Angola</h4>
                            <p className="text-purple-600 font-bold">Africa's Diamond Capital • Capital Africana dos Diamantes</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-purple-700">💎 Diamond & Oil Dynasties:</strong> Africa's largest diamond reserves controlling 18% of global production, oil revenues exceeding $50B annually, diamond dynasties owning exclusive De Beers partnerships. Angolan business magnates maintain private diamond collections worth £200M+ and own London's most expensive jewelry boutiques in Hatton Garden.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🏛️ Ultra-High Society:</strong> Luanda Bay penthouse suites worth $25M+, private island ownership, exclusive helicopter services, and Angolan billionaire families maintaining entire Belgravia squares. Members of London's most exclusive private clubs including the Carlton Club and Boodle's.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🏗️ Architectural Magnificence:</strong> Luanda's Marginal promenade rivaling Monaco, colonial palaces restored by European royalty standards, five-star hotel empires, and sophisticated urban developments. London property portfolios exceeding £3B including historic Georgian mansions and modern penthouses.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🌟 Elite Financial Networks:</strong> Private banking relationships with Coutts & Co, exclusive investment partnerships with City of London firms, diamond trade monopolies, and Angolan business leaders serving on boards of FTSE 100 companies with combined assets exceeding £500B.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Mozambique - Indian Ocean Jewel */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-green-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-green-300 bg-gradient-to-br from-white via-green-50/30 to-teal-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇲🇿</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Mozambique</h4>
                            <p className="text-green-600 font-bold">The Indian Ocean Jewel • Jóia do Índico</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-green-700">🏝️ Coastal Paradise Empire:</strong> Bazaruto Archipelago private islands owned by global billionaires, exclusive beach resorts charging $15,000+ per night, private helicopter safari lodges, and luxury eco-resorts serving exclusively ultra-high-net-worth individuals. London elite maintain private yachts worth £100M+ for Mozambique expeditions.</p>
                          <p className="text-gray-700"><strong className="text-green-700">🏰 Colonial Palace Heritage:</strong> Portuguese colonial mansions converted into ultra-luxury retreats hosting European royalty, Ibo Island UNESCO palaces serving as exclusive private residences, and sophisticated Afro-Portuguese cultural fusion in luxury hospitality exceeding St. Moritz standards.</p>
                          <p className="text-gray-700"><strong className="text-green-700">⭐ Elite Tourism Capital:</strong> Forbes Five-Star resorts accessible only by private jet, exclusive big-game hunting concessions worth $50,000 per expedition, luxury diving experiences with personal submarine access, and private conservation estates where London's elite conduct £10M+ wildlife photography expeditions.</p>
                          <p className="text-gray-700"><strong className="text-green-700">🎯 London Professional Elite:</strong> Mozambican executives in City of London top-tier investment banks, senior partners in Magic Circle law firms, elite diplomatic corps with direct access to Whitehall, and international development professionals managing £2B+ African investment portfolios from London headquarters.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Cape Verde - Atlantic Paradise */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-blue-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-blue-300 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇨🇻</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Cape Verde</h4>
                            <p className="text-blue-600 font-bold">Atlantic Paradise • Paraíso Atlântico</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-blue-700">🏖️ Atlantic Monaco:</strong> Sal Island luxury resort developments worth €500M+, exclusive beachfront villas charging €5,000+ per night, championship golf courses designed by Jack Nicklaus, and elite tourism infrastructure rivaling the Maldives. London billionaires maintain private jets for weekend Cape Verde escapes.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">🎵 Musical Aristocracy:</strong> Grammy-winning Cape Verdean artists owning London recording studios, morna and coladeira musical heritage recognized by UNESCO, exclusive concert venues in Mindelo hosting international elite, and Cape Verdean musical royalty performing at Royal Opera House private galas for £100,000+ per performance.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">⛵ Elite Maritime Paradise:</strong> Private mega-yacht charters worth £2M+ per week, exclusive deep-sea fishing expeditions with celebrity clientele, luxury sailing championships attracting European nobility, and premium marina facilities serving London's yachting elite with superyachts exceeding 100 meters.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">🏡 Luxury Real Estate Empire:</strong> Santiago Island coastal developments worth €1B+, luxury villa complexes with private beaches, high-end investment opportunities generating 15%+ annual returns, and successful Cape Verdean entrepreneurs owning £500M+ London property portfolios including Canary Wharf penthouses.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Guinea-Bissau - West Africa's Hidden Gem */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-orange-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-orange-300 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇬🇼</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Guinea-Bissau</h4>
                            <p className="text-orange-600 font-bold">West Africa's Hidden Gem • Jóia Escondida da África Ocidental</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-orange-700">🌿 Pristine Paradise Investment:</strong> Bijagós Archipelago UNESCO Biosphere Reserve with exclusive eco-luxury development rights worth €2B+, untapped cashew nut industry generating premium organic exports, and emerging sustainable tourism attracting £500M+ investment from London's elite environmental funds and impact investors.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">🎨 Artisanal Luxury Heritage:</strong> Traditional Balanta sculptures selling for £50,000+ at Sotheby's, hand-carved masks displayed in private London galleries, refined bijoux jewelry crafted from local materials, and sophisticated artistic traditions patronized by Tate Modern curators and Royal Academy collectors.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">👥 Elite Professional Diaspora:</strong> Guinea-Bissau academics with Oxford and Cambridge professorships, distinguished UN ambassadors based in London's diplomatic quarter, successful entrepreneurs in City financial services, and business leaders managing African investment portfolios exceeding £1B+ from London headquarters.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">🏆 Colonial Heritage Sophistication:</strong> Portuguese colonial architecture preserved as luxury boutique hotels, sophisticated traditional governance systems studied by LSE political scientists, cultural sophistication showcased in private London galleries, and elite diaspora funding £20M+ heritage preservation foundations with Royal Patronage.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* São Tomé and Príncipe - Chocolate Paradise */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-yellow-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-yellow-300 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇸🇹</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">São Tomé and Príncipe</h4>
                            <p className="text-yellow-600 font-bold">Chocolate Paradise • Paraíso do Chocolate</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-yellow-700">🍫 Chocolate Empire Royalty:</strong> Premium cocoa beans selling for €150+ per kilogram to London's most exclusive chocolatiers, artisanal plantations supplying Harrods and Fortnum & Mason, luxury chocolate masterclasses for £5,000+ per person, and São Toméan chocolatiers owning Bond Street boutiques charging £200+ per chocolate box, rivaling Godiva and La Maison du Chocolat.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🏝️ Billionaire Paradise Retreats:</strong> Private volcanic islands owned by tech billionaires, eco-luxury resorts charging €20,000+ per night accessible only by helicopter, pristine biodiversity sanctuaries funded by £100M+ conservation trusts, and exclusive retreat destinations hosting London's ultra-elite for digital detox experiences worth more than Necker Island.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🎭 Cultural Aristocracy:</strong> Sophisticated Tchiloli theatre performances for Royal Family private events, Portuguese-African cultural fusion celebrated at Buckingham Palace receptions, high arts patronage through London's elite cultural institutions, and traditional festivals recreated as exclusive £50,000+ private events for London's cultural elite.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🌟 Elite London Networks:</strong> Distinguished São Toméan ambassadors with direct access to Foreign Office, academics holding prestigious chairs at Imperial College and King's College London, cultural attachés managing £50M+ UK-São Tomé cultural exchange programs, and diplomatic elite maintaining sophisticated networks within London's Portuguese-speaking aristocracy.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* East Timor - Asia-Pacific's Rising Star */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-red-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-red-300 bg-gradient-to-br from-white via-red-50/30 to-pink-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇹🇱</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">East Timor (Timor-Leste)</h4>
                            <p className="text-red-600 font-bold">Asia-Pacific's Rising Star • Estrela Emergente do Ásia-Pacífico</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-red-700">💰 Petroleum Fortune Empire:</strong> Timor Sea oil reserves worth $50B+, liquefied natural gas exports generating $2B+ annually, sovereign wealth fund investments in London's premium real estate, and Timorese petroleum executives owning luxury properties in Kensington worth £100M+ while maintaining private jets for Asia-Pacific business empire management.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🎭 Elite Cultural Fusion:</strong> Unique Portuguese-Tetum-Bahasa heritage creating sophisticated tri-lingual cultural aristocracy, refined tais textile art selling for £10,000+ in London galleries, sophisticated cultural fusion celebrated in exclusive embassy receptions, and distinguished traditions promoted within London's most exclusive multicultural diplomatic elite circles.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🎓 Academic Aristocracy:</strong> Cambridge and Oxford scholarships for Timorese elite families, prestigious diplomatic academy training at Georgetown and LSE, high-level intellectual exchanges with London School of Economics, and Timorese academic elite holding professorships at Imperial College while contributing to Chatham House policy-making for £200M+ Asia-Pacific development programs.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🏛️ Elite Diplomatic Networks:</strong> Timorese ambassadors with direct access to Downing Street and Westminster, high-ranking officials in UN Security Council deliberations, sophisticated political networks spanning ASEAN elite circles, and diplomatic professionals maintaining £500M+ cultural and political exchange programs across the sophisticated Portuguese-speaking world from London headquarters.</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Macau - Asia's Monte Carlo */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative border-2 border-pink-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-pink-300 bg-gradient-to-br from-white via-pink-50/30 to-rose-50/30 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">🇲🇴</span>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">Macau</h4>
                            <p className="text-pink-600 font-bold">Asia's Monte Carlo • Monte Carlo da Ásia</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-700"><strong className="text-pink-700">🎰 Gaming Capital:</strong> World's largest gambling revenue center, luxury casino resorts, high-roller entertainment, and elite gaming culture connecting Macanese professionals with London's financial and entertainment elite.</p>
                          <p className="text-gray-700"><strong className="text-pink-700">🏛️ Portuguese Elegance:</strong> UNESCO World Heritage colonial architecture, sophisticated Portuguese-Chinese cultural fusion, elegant historic preservation, and refined aesthetic traditions maintaining prestige in London's cultural circles.</p>
                          <p className="text-gray-700"><strong className="text-pink-700">🍽️ Culinary Excellence:</strong> Michelin-starred restaurants, fusion haute cuisine, world-renowned culinary traditions, and Macanese chefs operating London's most exclusive Portuguese-Asian fusion establishments and luxury dining experiences.</p>
                          <p className="text-gray-700"><strong className="text-pink-700">💼 Elite Networks:</strong> Wealthy Macanese professionals in London's financial district, luxury hospitality sector, gaming industry connections, and sophisticated business networks linking Asia's wealthiest Portuguese-speaking elite with UK markets.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                
                  {/* Luxury Statistics */}
                  <div className="bg-gradient-to-r from-premium-50 via-primary-50 to-secondary-50 rounded-2xl p-8 border border-premium-200/30 mb-8">
                    <motion.h4 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold text-gray-900 mb-6 text-center"
                    >
                      💎 Elite Portuguese-Speaking World Statistics
                    </motion.h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-premium-200/50"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent">€4.2T+</div>
                        <div className="text-sm text-gray-700 font-medium">Combined GDP</div>
                        <div className="text-xs text-gray-500">Economic powerhouse</div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-secondary-200/50"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">280M+</div>
                        <div className="text-sm text-gray-700 font-medium">Elite Speakers</div>
                        <div className="text-xs text-gray-500">Global influence</div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200/50"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">9</div>
                        <div className="text-sm text-gray-700 font-medium">Elite Nations</div>
                        <div className="text-xs text-gray-500">Prestigious heritage</div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200/50"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">500+</div>
                        <div className="text-sm text-gray-700 font-medium">Years Heritage</div>
                        <div className="text-xs text-gray-500">Cultural legacy</div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Elite Portuguese Networks in London */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12"
                  >
                    <div className="bg-gradient-to-br from-premium-50/90 via-primary-50/90 to-secondary-50/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-premium-200/50">
                      <div className="text-center mb-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-premium-300/50 shadow-lg"
                        >
                          <span className="text-4xl">🏛️</span>
                          <span className="text-premium-700 font-bold text-xl">Exclusive Portuguese London Society • Sociedade Portuguesa Elite de Londres</span>
                        </motion.div>
                        <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-premium-600 to-primary-600 bg-clip-text text-transparent mb-6">
                          London's Most Prestigious Portuguese Networks
                        </h4>
                        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                          Access London's most exclusive Portuguese-speaking elite circles where aristocratic families, business magnates, 
                          and cultural leaders maintain private clubs, luxury venues, and sophisticated networks that define prestige 
                          within the UK's distinguished lusophone community.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Elite Clubs & Venues */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-premium-400/20 to-primary-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-premium-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-premium-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">🎩</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-premium-700 transition-colors duration-300">Elite Private Clubs</h5>
                                  <p className="text-xs text-premium-600 font-medium">Clubes Privados de Elite</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-premium-700">White's Club:</strong> Portuguese dukes with 300+ year memberships, exclusive dining with European royalty, annual fees £50,000+</p>
                                <p><strong className="text-premium-700">Boodle's & Brooks's:</strong> Historic gentlemen's clubs where Portuguese nobility conduct private business and cultural affairs</p>
                                <p><strong className="text-premium-700">Royal Automobile Club:</strong> Luxury Portuguese automotive collections, exclusive driving events, and aristocratic motoring heritage</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Luxury Dining & Culture */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-secondary-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">🍽️</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-secondary-700 transition-colors duration-300">Elite Dining & Arts</h5>
                                  <p className="text-xs text-secondary-600 font-medium">Gastronomia e Artes de Elite</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-secondary-700">Private Portuguese Restaurants:</strong> Michelin-starred chefs, exclusive tasting menus £500+ per person, rare vintage ports worth £10,000+ per bottle</p>
                                <p><strong className="text-secondary-700">Covent Garden Opera Boxes:</strong> Portuguese cultural elite maintain private boxes, host royal receptions, sponsor exclusive performances</p>
                                <p><strong className="text-secondary-700">National Gallery Patronage:</strong> Portuguese art collectors with private viewing privileges, exclusive exhibition openings, cultural foundation boards</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Business & Investment Networks */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">💼</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Elite Business Networks</h5>
                                  <p className="text-xs text-purple-600 font-medium">Redes de Negócios de Elite</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-purple-700">City of London Elite:</strong> Portuguese CEOs in FTSE 100 companies, private banking with Coutts & Co, exclusive investment partnerships worth £5B+</p>
                                <p><strong className="text-purple-700">Mayfair Private Offices:</strong> Portuguese business dynasties maintain headquarters in historic Mayfair buildings, conduct international deals</p>
                                <p><strong className="text-purple-700">Royal Patron Networks:</strong> Portuguese business leaders with royal warrants, direct access to Buckingham Palace commercial partnerships</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Exclusive Residences */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">🏰</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Elite Residences</h5>
                                  <p className="text-xs text-green-600 font-medium">Residências de Elite</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-green-700">Belgravia Palaces:</strong> Portuguese aristocratic families own historic mansions in Eaton Square and Chester Square worth £100M+ each</p>
                                <p><strong className="text-green-700">Kensington Palace Gardens:</strong> "Billionaire's Row" residences, private security, diplomatic immunity, neighbors include royal family members</p>
                                <p><strong className="text-green-700">Surrey Country Estates:</strong> Portuguese nobility maintain countryside palaces with private golf courses, helicopter pads, equestrian facilities</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Cultural Institutions */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">🎭</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Cultural Institutions</h5>
                                  <p className="text-xs text-blue-600 font-medium">Instituições Culturais</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-blue-700">Portuguese Embassy Events:</strong> Exclusive diplomatic receptions, cultural celebrations with royal family attendance, state dinner access</p>
                                <p><strong className="text-blue-700">Camões Institute London:</strong> Portuguese cultural center hosting elite literature circles, academic symposiums, aristocratic cultural preservation</p>
                                <p><strong className="text-blue-700">Royal Society Memberships:</strong> Portuguese academics and nobles with fellowship in prestigious scientific and cultural societies, centuries-old traditions</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Luxury Services */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.4 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full">
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <span className="text-white text-lg">💎</span>
                                </motion.div>
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">Luxury Concierge</h5>
                                  <p className="text-xs text-orange-600 font-medium">Concierge de Luxo</p>
                                </div>
                              </div>
                              <div className="space-y-3 text-sm text-gray-700">
                                <p><strong className="text-orange-700">Private Jets & Yachts:</strong> Portuguese-speaking crews, exclusive access to European royal destinations, luxury travel exceeding £100,000 per trip</p>
                                <p><strong className="text-orange-700">Personal Shoppers Bond Street:</strong> Exclusive access to private Harrods appointments, bespoke Savile Row tailoring, luxury Portuguese jewelry collections</p>
                                <p><strong className="text-orange-700">Private Healthcare:</strong> Exclusive Harley Street consultants, Royal London Hospital VIP suites, Portuguese-speaking medical teams for aristocratic families</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-premium-100 via-primary-100 to-secondary-100 rounded-2xl p-8 border border-premium-200/30">
                      <p className="text-gray-800 font-bold text-xl mb-4">
                        "Do palácio real português às torres de Macau, dos diamantes angolanos ao ouro brasileiro—somos uma família de prestígio global."
                      </p>
                      <p className="text-gray-600 italic text-lg leading-relaxed">
                        From Portugal's royal palaces to Macau's towers, from Angola's diamonds to Brazil's gold—we are a family of global prestige, 
                        united by our sophisticated heritage, enriched by our collective success across four continents.
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-premium-500 to-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xl">
                          LT
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-900">LusoTown London</p>
                          <p className="text-sm text-gray-600">Celebrating Elite Portuguese Heritage</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Growing London's Portuguese Community
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Since launching, LusoTown has brought together Portuguese speakers from across London,
                creating connections that strengthen our community and preserve our heritage.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">750+</div>
                  <div className="text-sm text-gray-600">Portuguese Community Members</div>
                  <div className="text-xs text-gray-500 mt-1">Connected in London</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Countries Represented</div>
                  <div className="text-xs text-gray-500 mt-1">Portuguese-speaking nations</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Heritage Pride</div>
                  <div className="text-xs text-gray-500 mt-1">Feel more connected</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">32</div>
                  <div className="text-sm text-gray-600">London Boroughs</div>
                  <div className="text-xs text-gray-500 mt-1">With active members</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "Finalmente encontrei uma comunidade em Londres onde os meus filhos podem crescer 
                  orgulhosos de serem portugueses. LusoTown não é só uma plataforma—é um pedacinho 
                  de casa que trouxemos connosco."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    MC
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Maria C.</p>
                    <p className="text-sm text-gray-600">Mãe de dois, Hackney • Member since early 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values & Inclusive Community */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Os Nossos Valores • Our Core Values
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">🇵🇹 Heritage Preservation</h3>
                  <p className="text-gray-600">
                    Preserving and celebrating Portuguese culture, traditions, and language for current and 
                    future generations. Our heritage is our strength, and sharing it builds stronger communities.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-secondary-600 mb-4">🏠 Community Connection</h3>
                  <p className="text-gray-600">
                    Creating meaningful relationships that transform London from a foreign city into a place 
                    where Portuguese speakers feel at home, supported, and understood.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">👨‍👩‍👧‍👦 Family Support</h3>
                  <p className="text-gray-600">
                    Supporting Portuguese families in London with resources, connections, and community that 
                    help children grow proud of their heritage while thriving in British society.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-green-600 mb-4">🌍 Cultural Celebration</h3>
                  <p className="text-gray-600">
                    Celebrating the diversity of Portuguese-speaking countries—from Portugal to Brazil, Angola 
                    to Cape Verde—uniting us all through our shared linguistic and cultural bonds.
                  </p>
                </div>
              </div>

              {/* Inclusive Community Statement */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Um Abraço Caloroso • A Warm Embrace
                </h3>
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p className="text-center text-lg font-medium text-gray-800 mb-6">
                    "Somos uma comunidade de mente aberta que acolhe todos os falantes de português com o coração cheio de amor."
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <p className="mb-4">
                      <strong>This platform welcomes open-minded people from every corner of the Portuguese-speaking world.</strong> 
                      Our staff and community come from all countries that speak Portuguese—from the historic streets of Porto 
                      to the vibrant beaches of Rio, from the cultural richness of Luanda to the island beauty of Cabo Verde.
                    </p>
                    <p className="mb-4">
                      <strong>We embrace diversity in all its forms.</strong> Whether you're Muslim, Christian, atheist, agnostic, 
                      or hold any other belief, you are welcome here. Religion is a personal journey, and we respect everyone's 
                      individual path. What unites us is our shared language, our cultural heritage, and our commitment to 
                      supporting one another in this beautiful, challenging journey called life.
                    </p>
                    <p className="mb-4">
                      <strong>We ask only for respect, kindness, and mutual support.</strong> Life in London can be challenging 
                      enough without facing it alone. Together, we create a space where Portuguese speakers can find friendship, 
                      guidance, and the warmth of home, no matter where that home originally was.
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-base text-gray-600 italic">
                      "Aqui, todos têm lugar. Here, everyone belongs. We're not just building a community—we're creating a family."
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Guidelines Notice */}
              <div className="bg-primary-50 border-l-4 border-primary-500 rounded-r-xl p-6">
                <h4 className="text-lg font-semibold text-primary-900 mb-3">Our Event Philosophy</h4>
                <p className="text-primary-800">
                  We maintain thoughtful guidelines for our events to ensure everyone feels comfortable and welcome. 
                  Our events focus on cultural celebration, language preservation, and community building—not religious 
                  themes, as we believe faith is beautifully personal. We're here to enjoy life together, learn from 
                  each other, and celebrate the rich tapestry of Portuguese-speaking cultures.
                </p>
                <div className="mt-4">
                  <a href="/community-guidelines" className="text-primary-600 hover:text-primary-800 font-medium underline">
                    Read our full Community Guidelines →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Nossa Visão • Our Vision for the Future
              </h2>
              <p className="text-xl mb-8 opacity-90">
                By 2027, we envision LusoTown as London's strongest Portuguese community platform, 
                connecting families across all boroughs and ensuring our language and culture thrive for generations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <UserGroupIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">5,000+ Families</h3>
                  <p className="text-sm opacity-80">Connected across Greater London</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <BookOpenIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">100+ Schools</h3>
                  <p className="text-sm opacity-80">Teaching Portuguese heritage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <HeartIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Cultural Legacy</h3>
                  <p className="text-sm opacity-80">Preserving heritage for future generations</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-lg font-medium mb-4">
                  "Juntos, estamos a construir uma ponte entre as nossas origens e o nosso futuro em Londres. 
                  LusoTown é mais que uma comunidade—é a nossa família londrina."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    LT
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">LusoTown Team</p>
                    <p className="text-sm opacity-80">Community Builders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Join Nossa Comunidade?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you're from Portugal, Brazil, Angola, or any Portuguese-speaking nation, 
                your community in London is waiting for you.
              </p>
              <a 
                href={ROUTES.signup}
                className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                JOIN NOW
              </a>
              <p className="text-gray-500 text-sm mt-4">
                Free to join • Immediate access • UK Portuguese community
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}