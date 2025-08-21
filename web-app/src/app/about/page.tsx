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

              {/* Portuguese-Speaking Countries Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">A Língua Portuguesa Pelo Mundo</h3>
                  <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                    Portuguese is spoken by over 280 million people across four continents! Each country has evolved the language uniquely, 
                    creating a beautiful tapestry of accents, expressions, and cultural flavors that make our community so vibrant.
                  </p>
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 text-center">
                    <p className="text-gray-700 font-medium">🌍 10 Countries • 4 Continents • 280+ Million Speakers • 1 Beautiful Language Community</p>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* Portugal */}
                  <div className="border-2 border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-200 bg-gradient-to-br from-white to-primary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇵🇹</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Portugal</h4>
                        <p className="text-sm text-gray-600 font-medium">O berço da língua • The birthplace</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Language Heritage:</strong> Home to the original Portuguese with its distinctive European pronunciation, the beautiful 'ão' endings, and formal conjugations that preserve centuries of linguistic tradition.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Gems:</strong> Fado music that captures saudade, Pastéis de Nata invented by monks, and the world's oldest bookstore (Livraria Bertrand, 1732)!</p>
                      <p className="text-gray-700"><strong>⚡ Fun Fact:</strong> Portuguese is the oldest nation-state in Europe (1143) and gave the world the word "saudade"—untranslatable longing that every Portuguese speaker understands.</p>
                    </div>
                  </div>
                  
                  {/* Brazil */}
                  <div className="border-2 border-secondary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-secondary-200 bg-gradient-to-br from-white to-secondary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇧🇷</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Brazil</h4>
                        <p className="text-sm text-gray-600 font-medium">O maior país lusófono • The largest Portuguese-speaking nation</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Language Evolution:</strong> Brazilian Portuguese has softer sounds, unique expressions like "tô" for "estou," and indigenous/African influences creating words like "abacaxi" (pineapple) and "cafuné" (gentle head caress).</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Powerhouse:</strong> Carnival, bossa nova, capoeira, and the world's largest Portuguese-speaking population (over 215 million people!).</p>
                      <p className="text-gray-700"><strong>⚡ Amazing Fact:</strong> Brazil is the only Portuguese-speaking country in the Americas and has more Portuguese speakers than Portugal itself—by a factor of 20!</p>
                    </div>
                  </div>
                  
                  {/* Angola */}
                  <div className="border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇦🇴</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Angola</h4>
                        <p className="text-sm text-gray-600 font-medium">Terra de kizomba • Land of kizomba</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Linguistic Blend:</strong> Angolan Portuguese mixes with Kimbundu, Umbundu, and Kikongo languages, creating unique expressions like "bué" (a lot) and "fixe" (cool)—now used across the Portuguese-speaking world!</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Gift to the World:</strong> Birthplace of kizomba dance and semba music, which influenced global Latin dance culture and Brazilian samba.</p>
                      <p className="text-gray-700"><strong>⚡ Incredible Fact:</strong> Home to the Welwitschia plant that can live over 1,500 years—some are older than Portuguese as a language!</p>
                    </div>
                  </div>
                  
                  {/* Mozambique */}
                  <div className="border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-green-200 bg-gradient-to-br from-white to-green-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇲🇿</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Mozambique</h4>
                        <p className="text-sm text-gray-600 font-medium">Pérola do Índico • Pearl of the Indian Ocean</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Multilingual Magic:</strong> Portuguese blends with Makhuwa, Tsonga, and Sena languages, creating coastal dialects influenced by Arabic and Swahili trade languages.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Fusion:</strong> Marrabenta music, Dhow boat traditions, and architecture blending African, Arab, and Portuguese influences in stunning ways.</p>
                      <p className="text-gray-700"><strong>⚡ Ocean Wonder:</strong> Home to pristine coral reefs and the world's largest cashew tree, plus dugongs (sea cows) that inspired mermaid legends!</p>
                    </div>
                  </div>
                  
                  {/* Cape Verde */}
                  <div className="border-2 border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-200 bg-gradient-to-br from-white to-primary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇨🇻</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Cape Verde</h4>
                        <p className="text-sm text-gray-600 font-medium">Ilhas da música • Islands of music</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Heritage:</strong> Portuguese coexists with Kriolu (Cape Verdean Creole), creating a unique bilingual culture where both languages flow naturally in daily life.</p>
                      <p className="text-gray-700"><strong>🎭 Musical Soul:</strong> Birthplace of Morna music and legendary Cesária Évora, the "Barefoot Diva" who brought Cape Verdean music to the world.</p>
                      <p className="text-gray-700"><strong>⚡ Island Magic:</strong> 10 volcanic islands where it almost never rains, but the music and culture are so rich they water the soul!</p>
                    </div>
                  </div>
                  
                  {/* Guinea-Bissau */}
                  <div className="border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-200 bg-gradient-to-br from-white to-orange-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇬🇼</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Guinea-Bissau</h4>
                        <p className="text-sm text-gray-600 font-medium">Terra dos cajus • Land of cashews</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Diversity:</strong> Portuguese mixes with Kriol and over 20 local languages including Fula, Mandinka, and Balanta, creating Africa's most multilingual Portuguese-speaking society.</p>
                      <p className="text-gray-700"><strong>🎭 Matriarchal Islands:</strong> The Bijagó archipelago features rare matriarchal societies where women choose their husbands—unique in the Portuguese-speaking world!</p>
                      <p className="text-gray-700"><strong>⚡ Cashew Capital:</strong> Produces some of the world's finest cashews and has more languages per square kilometer than almost anywhere else on Earth!</p>
                    </div>
                  </div>
                  
                  {/* São Tomé and Príncipe */}
                  <div className="border-2 border-yellow-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-yellow-200 bg-gradient-to-br from-white to-yellow-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇸🇹</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">São Tomé and Príncipe</h4>
                        <p className="text-sm text-gray-600 font-medium">Ilhas do cacau • Chocolate islands</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Paradise:</strong> Portuguese coexists with Forro, Angolar, and Principense—unique creole languages that evolved on these isolated islands, preserving 500-year-old Portuguese linguistic features.</p>
                      <p className="text-gray-700"><strong>🎭 Chocolate Heritage:</strong> First place in Africa where cocoa was cultivated, creating the world's finest chocolate with Portuguese colonial plantation architecture as a backdrop.</p>
                      <p className="text-gray-700"><strong>⚡ Tiny Giant:</strong> Africa's second-smallest country but with such biodiversity that 95% of its plants exist nowhere else on Earth!</p>
                    </div>
                  </div>
                  
                  {/* East Timor */}
                  <div className="border-2 border-red-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-red-200 bg-gradient-to-br from-white to-red-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇹🇱</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">East Timor (Timor-Leste)</h4>
                        <p className="text-sm text-gray-600 font-medium">Nação mais nova • Youngest nation</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Linguistic Survivor:</strong> Portuguese survived 24 years of Indonesian occupation and became a symbol of independence, now mixing beautifully with Tetum and local languages.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Bridge:</strong> Unique blend of Southeast Asian, Melanesian, and Portuguese influences creating distinct architecture, textiles, and spiritual practices.</p>
                      <p className="text-gray-700"><strong>⚡ Phoenix Nation:</strong> The world's newest country (independent since 2002) and the only place where Portuguese and Asian cultures create such a unique fusion!</p>
                    </div>
                  </div>
                  
                  {/* Macau */}
                  <div className="border-2 border-pink-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-pink-200 bg-gradient-to-br from-white to-pink-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇲🇴</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Macau</h4>
                        <p className="text-sm text-gray-600 font-medium">Oriente português • Portuguese Orient</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ East-West Fusion:</strong> Portuguese coexists with Cantonese and Mandarin, creating Patuá—a unique Portuguese-Chinese creole with only 50 fluent speakers left, making it critically endangered.</p>
                      <p className="text-gray-700"><strong>🎭 Culinary Magic:</strong> Birthplace of Portuguese egg tarts (pastéis de nata), Minchi (Macanese comfort food), and fusion cuisine that influenced food culture across Asia.</p>
                      <p className="text-gray-700"><strong>⚡ Historic Marvel:</strong> 460+ years of Portuguese heritage in China, creating the world's most unique East-West cultural blend and UNESCO World Heritage architecture!</p>
                    </div>
                  </div>
                  
                  {/* Equatorial Guinea */}
                  <div className="border-2 border-teal-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-teal-200 bg-gradient-to-br from-white to-teal-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇬🇶</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Equatorial Guinea</h4>
                        <p className="text-sm text-gray-600 font-medium">África portuguesa • Portuguese Africa (by adoption)</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Newest Addition:</strong> Portuguese became co-official with Spanish and French in 2010, making Equatorial Guinea the newest member of our Portuguese-speaking family!</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Crossroads:</strong> The only Portuguese-speaking country in Africa that was never colonized by Portugal, creating a unique perspective on Portuguese as a bridge language.</p>
                      <p className="text-gray-700"><strong>⚡ Unique Position:</strong> The only Portuguese-speaking country on the equator and the only African nation where Portuguese joins Spanish and French as official languages!</p>
                    </div>
                  </div>
                </div>
                
                {/* Language Statistics */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">🌍 A Língua Portuguesa em Números</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-primary-600">280M+</div>
                      <div className="text-xs text-gray-600">Native Speakers</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-secondary-600">5th</div>
                      <div className="text-xs text-gray-600">Most Spoken Language</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">4</div>
                      <div className="text-xs text-gray-600">Continents</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">12+</div>
                      <div className="text-xs text-gray-600">Unique Accents</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-2">
                    "Do Minho ao Timor, de Cabo Verde ao Brasil—somos uma só família lusófona!"
                  </p>
                  <p className="text-gray-600 italic text-sm">
                    From Portugal's northern Minho to distant Timor, from Cape Verde's islands to Brazil's vastness—we are one Portuguese-speaking family, united by language, enriched by diversity.
                  </p>
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