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
        title="About LusoTown London"
        titlePt="Sobre LusoTown London"
        subtitle="LusoTown connects Portuguese speakers and friends through real-life meetups in London. Whether you're new to the city, have roots in a Portuguese-speaking country, or simply love our culture and language, this is your space to meet people in person, share, and celebrate."
        subtitlePt="LusoTown conecta falantes de português e amigos através de encontros presenciais em Londres. Seja novo na cidade, tenha raízes num país de língua portuguesa, ou simplesmente ame a nossa cultura e língua, este é o seu espaço para conhecer pessoas pessoalmente, partilhar e celebrar."
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

              {/* Luxury Portuguese-Speaking Nations - Premium Heritage Section */}
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
                      <span className="text-premium-700 font-bold text-lg">Luxury Heritage • Património de Prestígio</span>
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-premium-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
                      Prestigious Portuguese-Speaking Nations
                    </h3>
                    <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                      Nine distinguished nations where Portuguese culture represents sophistication, wealth, and elite heritage. 
                      From royal palaces to diamond fortunes, oil wealth to gaming capitals—discover the luxury and prestige of the Lusophone world.
                    </p>
                    <div className="bg-gradient-to-r from-premium-50 via-primary-50 to-secondary-50 rounded-2xl p-6 border border-premium-200/30">
                      <p className="text-gray-800 font-bold text-lg">💎 9 Elite Nations • 4 Continents • €4+ Trillion GDP • 280M+ Affluent Speakers</p>
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
                          <p className="text-gray-700"><strong className="text-premium-700">👑 Royal Heritage:</strong> Eight centuries of monarchy, magnificent palaces from Sintra to Queluz, aristocratic quintas, and Europe's oldest noble lineages maintaining exclusive traditions in London's elite circles.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">🍷 Luxury Wine Culture:</strong> Port wine estates worth millions, Douro Valley's UNESCO terraces owned by aristocratic families, wine aristocracy connections spanning London's most exclusive private clubs.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">🏰 Elite Architecture:</strong> Royal palaces, luxury quintas, exclusive golf resorts, and Portuguese nobility maintaining prestigious properties across London's premium neighborhoods like Belgravia and Mayfair.</p>
                          <p className="text-gray-700"><strong className="text-premium-700">💎 UK Elite Networks:</strong> Portuguese aristocrats, luxury real estate magnates, and wine dynasty heirs forming exclusive networks in London's high society and private members' clubs.</p>
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
                          <p className="text-gray-700"><strong className="text-secondary-700">🏙️ Elite Culture:</strong> São Paulo's billionaire society, Rio's luxury penthouse lifestyle, Michelin-starred restaurants, and Brazil's ultra-wealthy maintaining exclusive residences in London's most prestigious areas.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">💰 Luxury Industries:</strong> Fashion empires, jewelry dynasties, luxury real estate development, premium mining operations, and Brazilian business magnates with significant London investments and elite networks.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">🍽️ Premium Cuisine:</strong> World-renowned Brazilian chefs, gourmet traditions, exclusive churrascarias, and sophisticated culinary culture elevated to Michelin standards in London's finest establishments.</p>
                          <p className="text-gray-700"><strong className="text-secondary-700">🎭 Cultural Sophistication:</strong> Opera houses, world-class art collections, classical music heritage, and Brazilian cultural elites patronizing London's premium arts scene and exclusive cultural institutions.</p>
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
                          <p className="text-gray-700"><strong className="text-purple-700">💎 Oil & Diamond Wealth:</strong> Multi-billion dollar natural resource fortunes, luxury lifestyle funded by oil revenues, diamond mining dynasties, and Angolan business elites investing heavily in London's premium real estate market.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🏛️ Elite Society:</strong> Luanda's exclusive high society, private member clubs, luxury shopping districts, and wealthy Angolan families maintaining prestigious addresses in London's most affluent neighborhoods.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🏗️ Premium Architecture:</strong> Modern luxury developments, Portuguese colonial mansions restored to five-star standards, and sophisticated urban planning reflecting Angola's growing prosperity and elite aesthetic preferences.</p>
                          <p className="text-gray-700"><strong className="text-purple-700">🌟 UK Elite Networks:</strong> Angolan business magnates, oil executives, and diamond trade professionals forming exclusive networks within London's financial district and luxury residential areas like Kensington and Chelsea.</p>
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
                          <p className="text-gray-700"><strong className="text-green-700">🏝️ Coastal Luxury:</strong> Exclusive beach resorts, private island developments, premium safari lodges, and luxury eco-tourism establishing Mozambique as Africa's sophisticated coastal destination for the global elite.</p>
                          <p className="text-gray-700"><strong className="text-green-700">🏰 Elite Heritage:</strong> Portuguese colonial architecture preserved as luxury hotels, sophisticated cultural fusion, and heritage properties converted into exclusive retreats for international high society.</p>
                          <p className="text-gray-700"><strong className="text-green-700">⭐ High-End Tourism:</strong> Five-star resorts, private yacht charter destinations, exclusive diving experiences, and luxury wildlife viewing attracting wealthy Portuguese speakers from London's elite circles.</p>
                          <p className="text-gray-700"><strong className="text-green-700">🎯 UK Professional Networks:</strong> Elite Mozambican professionals in London's financial services, legal sectors, and international development organizations, maintaining sophisticated cultural and business connections.</p>
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
                          <p className="text-gray-700"><strong className="text-blue-700">🏖️ Luxury Resort Destination:</strong> Five-star oceanfront properties, exclusive island retreats, premium golf courses, and elite tourism infrastructure attracting Europe's wealthy Portuguese-speaking elite seeking sophisticated Atlantic experiences.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">🎵 Elite Music Scene:</strong> World-renowned musicians, sophisticated cultural events, premium concert venues, and Cape Verdean musical royalty maintaining prestigious cultural connections in London's elite entertainment circles.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">⛵ High-End Tourism:</strong> Private yacht charters, luxury island-hopping experiences, exclusive diving expeditions, and premium hospitality services catering to London's affluent Portuguese-speaking community.</p>
                          <p className="text-gray-700"><strong className="text-blue-700">🏡 Premium Real Estate:</strong> Exclusive coastal developments, luxury villa projects, high-end investment opportunities, and successful Cape Verdean entrepreneurs in London's property development and investment sectors.</p>
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
                          <p className="text-gray-700"><strong className="text-orange-700">🌿 Natural Wealth:</strong> Pristine archipelagos with exclusive eco-luxury potential, untapped natural resources, and emerging opportunities for sophisticated sustainable tourism attracting elite environmental investors.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">🎨 Cultural Sophistication:</strong> Traditional arts elevated to international luxury markets, refined craftsmanship, unique cultural heritage, and sophisticated artistic traditions valued by London's cultural elite and collectors.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">👥 Elite Diaspora:</strong> Successful professionals in London's elite circles, distinguished academics, high-level diplomatic personnel, and business leaders contributing to UK-Guinea-Bissau sophisticated cultural and economic exchanges.</p>
                          <p className="text-gray-700"><strong className="text-orange-700">🏆 High-Class Heritage:</strong> Portuguese colonial elegance, sophisticated traditional governance systems, cultural sophistication, and elite diaspora maintaining prestigious cultural institutions and heritage preservation initiatives in London.</p>
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
                          <p className="text-gray-700"><strong className="text-yellow-700">🍫 Luxury Cocoa Heritage:</strong> Premium chocolate production, gourmet cocoa estates, artisanal chocolate crafting, and São Toméan chocolatiers supplying London's most exclusive patisseries and luxury food establishments.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🏝️ Exclusive Island Life:</strong> Private eco-luxury resorts, elite tourism experiences, pristine biodiversity, and exclusive retreat destinations attracting wealthy eco-conscious travelers from London's elite environmental circles.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🎭 Sophisticated Culture:</strong> Refined Portuguese-African cultural fusion, high arts, sophisticated musical traditions, and cultural sophistication preserved and celebrated within London's elite cultural and academic institutions.</p>
                          <p className="text-gray-700"><strong className="text-yellow-700">🌟 UK Professional Networks:</strong> Distinguished diaspora in London's academic, diplomatic, and cultural sectors, maintaining sophisticated cultural exchanges and elite professional networks within Portuguese-speaking communities.</p>
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
                          <p className="text-gray-700"><strong className="text-red-700">💰 Natural Resource Wealth:</strong> Substantial oil revenues, economic development potential, emerging investment opportunities, and Timorese business leaders establishing sophisticated economic connections with London's financial elite.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🎭 Cultural Sophistication:</strong> Unique Portuguese-Asian heritage, refined arts, sophisticated cultural fusion, and distinguished cultural traditions preserved and promoted within London's exclusive multicultural elite circles.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🎓 Elite Education:</strong> International university connections, prestigious scholarship programs, high-level diplomatic training, and Timorese intellectual elite contributing to London's academic and policy-making institutions.</p>
                          <p className="text-gray-700"><strong className="text-red-700">🏛️ UK Diplomatic Circles:</strong> Elite Timorese professionals in London's diplomatic corps, international organizations, and high-level policy circles, maintaining sophisticated cultural and political networks across the Portuguese-speaking world.</p>
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