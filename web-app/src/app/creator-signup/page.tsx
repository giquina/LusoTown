'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Globe, 
  Star,
  ArrowRight,
  PlayCircle,
  Calendar,
  Target,
  Shield,
  Zap,
  Award,
  Gift,
  Heart,
  ChevronDown,
  ChevronUp,
  Crown,
  Video,
  Mic,
  Coffee,
  BookOpen,
  Music,
  MapPin,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'
import CreatorEarningsCalculator from '@/components/CreatorEarningsCalculator'
import CreatorApplicationForm from '@/components/CreatorApplicationForm'
import CreatorTestimonials from '@/components/CreatorTestimonials'
// TODO: Create missing components
// import CreatorOnboardingSteps from '@/components/CreatorOnboardingSteps'

export default function CreatorSignupPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showApplication, setShowApplication] = useState(false)
  const [streamKey, setStreamKey] = useState<string | null>(null)

  const isPt = language === 'pt'

  // Portuguese cultural regions and content categories
  const culturalRegions = [
    {
      id: 'portugal',
      name: isPt ? 'Portugal Continental' : 'Mainland Portugal',
      flag: '🇵🇹',
      color: 'from-primary-500 to-primary-600',
      creators: 45,
      avgEarnings: 1200
    },
    {
      id: 'brazil',
      name: isPt ? 'Brasil' : 'Brazil',
      flag: '🇧🇷',
      color: 'from-action-500 to-action-600',
      creators: 78,
      avgEarnings: 950
    },
    {
      id: 'africa',
      name: isPt ? 'África Lusófona' : 'Lusophone Africa',
      flag: '🌍',
      color: 'from-secondary-500 to-secondary-600',
      creators: 23,
      avgEarnings: 800
    },
    {
      id: 'diaspora',
      name: isPt ? 'Diáspora Global' : 'Global Diaspora',
      flag: '🌐',
      color: 'from-accent-500 to-accent-600',
      creators: 67,
      avgEarnings: 1100
    }
  ]

  const contentCategories = [
    {
      icon: Music,
      name: isPt ? 'Música & Fado' : 'Music & Fado',
      description: isPt ? 'Performances musicais, noites de fado, instrumentos tradicionais' : 'Musical performances, fado nights, traditional instruments',
      avgEarnings: 1500,
      topCreator: 'Maria Santos',
      color: 'text-primary-600'
    },
    {
      icon: Coffee,
      name: isPt ? 'Culinária' : 'Cooking',
      description: isPt ? 'Receitas tradicionais, pastéis, workshops gastronómicos' : 'Traditional recipes, pastries, culinary workshops',
      avgEarnings: 1200,
      topCreator: 'João Silva',
      color: 'text-action-600'
    },
    {
      icon: BookOpen,
      name: isPt ? 'Língua & Cultura' : 'Language & Culture',
      description: isPt ? 'Aulas de português, história, tradições culturais' : 'Portuguese lessons, history, cultural traditions',
      avgEarnings: 900,
      topCreator: 'Ana Costa',
      color: 'text-secondary-600'
    },
    {
      icon: Users,
      name: isPt ? 'Comunidade & Eventos' : 'Community & Events',
      description: isPt ? 'Encontros comunitários, festivais, celebrações' : 'Community meetups, festivals, celebrations',
      avgEarnings: 1100,
      topCreator: 'Pedro Rocha',
      color: 'text-accent-600'
    }
  ]

  const testimonials = [
    {
      name: 'Maria Santos',
      region: 'Lisboa, Portugal',
      category: isPt ? 'Música Tradicional' : 'Traditional Music',
      avatar: '/images/creators/maria.jpg',
      monthlyEarnings: 1850,
      quote: isPt 
        ? 'Em apenas 6 meses, consegui transformar a minha paixão pelo fado numa fonte de rendimento estável. A plataforma LusoTown conectou-me com portugueses em Londres que ansiavam por autêntica cultura portuguesa.'
        : 'In just 6 months, I turned my passion for fado into a stable income source. LusoTown connected me with Portuguese people in London who were craving authentic Portuguese culture.',
      followers: 2400,
      streams: 48
    },
    {
      name: 'João Silva',
      region: 'São Paulo, Brasil',
      category: isPt ? 'Workshops Culinários' : 'Culinary Workshops',
      avatar: '/images/creators/joao.jpg',
      monthlyEarnings: 1340,
      quote: isPt
        ? 'Ensinar receitas brasileiras para a comunidade portuguesa em Londres tem sido incrivelmente gratificante. A partilha de receitas e a monetização acontecem naturalmente na plataforma.'
        : 'Teaching Brazilian recipes to the Portuguese community in London has been incredibly rewarding. Recipe sharing and monetization happen naturally on the platform.',
      followers: 1890,
      streams: 52
    },
    {
      name: 'Ana Costa',
      region: 'Luanda, Angola',
      category: isPt ? 'Educação Cultural' : 'Cultural Education',
      avatar: '/images/creators/ana.jpg',
      monthlyEarnings: 920,
      quote: isPt
        ? 'Partilhar a história e tradições de Angola com a diáspora portuguesa tem criado ligações profundas. Os workshops ao vivo geram tanto impacto cultural quanto financeiro.'
        : 'Sharing Angola\'s history and traditions with the Portuguese diaspora has created deep connections. Live workshops generate both cultural and financial impact.',
      followers: 1520,
      streams: 38
    }
  ]

  const revenueStreams = [
    {
      icon: Gift,
      name: isPt ? 'Doações & Gorjetas' : 'Donations & Tips',
      description: isPt ? 'Receba apoio direto dos espectadores durante streams ao vivo' : 'Receive direct support from viewers during live streams',
      split: '85%',
      color: 'bg-primary-100 text-primary-700'
    },
    {
      icon: Crown,
      name: isPt ? 'Subscrições Premium' : 'Premium Subscriptions',
      description: isPt ? 'Conteúdo exclusivo para subscritores mensais' : 'Exclusive content for monthly subscribers',
      split: '85%',
      color: 'bg-premium-100 text-premium-700'
    },
    {
      icon: Video,
      name: isPt ? 'Workshops Pagos' : 'Paid Workshops',
      description: isPt ? 'Sessões especializadas com preços personalizados' : 'Specialized sessions with custom pricing',
      split: '85%',
      color: 'bg-action-100 text-action-700'
    },
    {
      icon: Award,
      name: isPt ? 'Patrocínios' : 'Sponsorships',
      description: isPt ? 'Parcerias com marcas portuguesas (futuro)' : 'Partnerships with Portuguese brands (coming)',
      split: '70%',
      color: 'bg-secondary-100 text-secondary-700'
    }
  ]

  const faqData = [
    {
      question: isPt ? 'Como funciona a divisão de receitas de 85/15?' : 'How does the 85/15 revenue split work?',
      answer: isPt
        ? 'Recebe 85% de todas as receitas geradas (doações, subscrições, workshops). A LusoTown fica com 15% para manter a plataforma, processamento de pagamentos e apoio técnico. Esta é uma das divisões mais generosas do mercado.'
        : 'You receive 85% of all revenue generated (donations, subscriptions, workshops). LusoTown keeps 15% for platform maintenance, payment processing, and technical support. This is one of the most generous splits in the market.'
    },
    {
      question: isPt ? 'Preciso de equipamento profissional para começar?' : 'Do I need professional equipment to start?',
      answer: isPt
        ? 'Não necessariamente. Pode começar com um smartphone moderno e boa ligação à internet. Oferecemos guias detalhados sobre configuração de streaming e dicas para melhorar a qualidade gradualmente.'
        : 'Not necessarily. You can start with a modern smartphone and good internet connection. We provide detailed streaming setup guides and tips to gradually improve quality.'
    },
    {
      question: isPt ? 'Que tipos de conteúdo funcionam melhor?' : 'What types of content work best?',
      answer: isPt
        ? 'Conteúdo autêntico que celebra a cultura portuguesa: música tradicional, culinária, aulas de língua, histórias familiares, tradições regionais. O público procura autenticidade e ligação cultural.'
        : 'Authentic content celebrating Portuguese culture: traditional music, cooking, language lessons, family stories, regional traditions. Audiences seek authenticity and cultural connection.'
    },
    {
      question: isPt ? 'Como recebo os pagamentos?' : 'How do I receive payments?',
      answer: isPt
        ? 'Pagamentos mensais via transferência bancária ou PayPal. Suportamos múltiplas moedas (EUR, GBP, BRL) e processamos pagamentos até ao 5º dia útil de cada mês.'
        : 'Monthly payments via bank transfer or PayPal. We support multiple currencies (EUR, GBP, BRL) and process payments by the 5th working day of each month.'
    },
    {
      question: isPt ? 'Posso transmitir do meu país de origem?' : 'Can I stream from my home country?',
      answer: isPt
        ? 'Sim! Criadores de Portugal, Brasil, África Lusófona e diáspora global são bem-vindos. A plataforma conecta criadores globais com a comunidade portuguesa em Londres.'
        : 'Yes! Creators from Portugal, Brazil, Lusophone Africa, and global diaspora are welcome. The platform connects global creators with the Portuguese community in London.'
    },
    {
      question: isPt ? 'Há apoio para criadores iniciantes?' : 'Is there support for beginner creators?',
      answer: isPt
        ? 'Oferecemos mentoria dedicada, workshops sobre criação de conteúdo, apoio técnico 24/7, e ligação com criadores experientes. O nosso objetivo é o seu sucesso desde o primeiro dia.'
        : 'We provide dedicated mentorship, content creation workshops, 24/7 technical support, and connections with experienced creators. Our goal is your success from day one.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-primary-100 rounded-full px-4 py-2 text-sm font-medium text-primary-700 mb-6"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isPt ? 'Programa de Criadores LusoTown' : 'LusoTown Creator Program'}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              {isPt ? 'Transforme a sua' : 'Transform Your'}{' '}
              <span className="text-primary-600">
                {isPt ? 'Cultura Portuguesa' : 'Portuguese Culture'}
              </span>{' '}
              {isPt ? 'numa Fonte de Rendimento' : 'into Income'}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            >
              {isPt
                ? 'Junte-se a mais de 200 criadores portugueses que já ganham uma média de £1,200/mês partilhando a sua paixão cultural com a comunidade portuguesa em Londres.'
                : 'Join 200+ Portuguese creators already earning an average of £1,200/month sharing their cultural passion with the Portuguese community in London.'}
            </motion.p>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">85%</div>
                <div className="text-sm text-secondary-600">
                  {isPt ? 'Das Receitas' : 'Revenue Share'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-action-600">£1,200</div>
                <div className="text-sm text-secondary-600">
                  {isPt ? 'Média Mensal' : 'Avg Monthly'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">24/7</div>
                <div className="text-sm text-secondary-600">
                  {isPt ? 'Apoio' : 'Support'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">5k+</div>
                <div className="text-sm text-secondary-600">
                  {isPt ? 'Audiência' : 'Audience'}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setShowApplication(true)}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                {isPt ? 'Candidatar-me Agora' : 'Apply Now'}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all"
              >
                <DollarSign className="w-5 h-5" />
                {isPt ? 'Calcular Ganhos' : 'Calculate Earnings'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <nav className="flex space-x-1 p-2 bg-secondary-100 rounded-xl">
              {[
                { id: 'overview', label: isPt ? 'Visão Geral' : 'Overview', icon: Globe },
                { id: 'calculator', label: isPt ? 'Calculadora' : 'Calculator', icon: DollarSign },
                { id: 'testimonials', label: isPt ? 'Testemunhos' : 'Success Stories', icon: Star },
                { id: 'process', label: isPt ? 'Processo' : 'How It Works', icon: PlayCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-secondary-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                {/* Cultural Regions */}
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPt ? 'Criadores de Toda a Lusofonia' : 'Creators from Across the Lusosphere'}
                    </h2>
                    <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                      {isPt
                        ? 'A nossa plataforma une criadores de Portugal, Brasil, África Lusófona e diáspora global, partilhando cultura portuguesa com Londres.'
                        : 'Our platform unites creators from Portugal, Brazil, Lusophone Africa, and global diaspora, sharing Portuguese culture with London.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {culturalRegions.map((region, index) => (
                      <motion.div
                        key={region.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${region.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
                          {region.flag}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{region.name}</h3>
                        <div className="space-y-2 text-sm text-secondary-600">
                          <div className="flex justify-between">
                            <span>{isPt ? 'Criadores' : 'Creators'}:</span>
                            <span className="font-medium">{region.creators}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{isPt ? 'Média Mensal' : 'Avg Monthly'}:</span>
                            <span className="font-medium text-primary-600">£{region.avgEarnings}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content Categories */}
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPt ? 'Categorias de Conteúdo Populares' : 'Popular Content Categories'}
                    </h2>
                    <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                      {isPt
                        ? 'Descubra que tipo de conteúdo português ressoa mais com a audiência em Londres.'
                        : 'Discover what type of Portuguese content resonates most with London audiences.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contentCategories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-gray-50 p-3 rounded-xl">
                            <category.icon className={`w-6 h-6 ${category.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                            <p className="text-sm text-secondary-600 mb-4">{category.description}</p>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-lg font-bold text-primary-600">£{category.avgEarnings}</div>
                                <div className="text-xs text-gray-500">{isPt ? 'média mensal' : 'avg monthly'}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{category.topCreator}</div>
                                <div className="text-xs text-gray-500">{isPt ? 'criador destaque' : 'top creator'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Revenue Streams */}
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPt ? 'Múltiplas Fontes de Rendimento' : 'Multiple Revenue Streams'}
                    </h2>
                    <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                      {isPt
                        ? 'Maximize os seus ganhos com diversas formas de monetização, todas com a divisão mais generosa do mercado.'
                        : 'Maximize your earnings with various monetization methods, all with the most generous split in the market.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {revenueStreams.map((stream, index) => (
                      <motion.div
                        key={stream.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${stream.color}`}>
                            <stream.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{stream.name}</h3>
                              <span className="text-lg font-bold text-primary-600">{stream.split}</span>
                            </div>
                            <p className="text-sm text-secondary-600">{stream.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Calculator Tab */}
            {activeTab === 'calculator' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CreatorEarningsCalculator />
              </motion.div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CreatorTestimonials />
              </motion.div>
            )}

            {/* Process Tab */}
            {activeTab === 'process' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* TODO: Create CreatorOnboardingSteps component */}
                <div className="text-center p-8 text-gray-500">Onboarding steps component coming soon</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPt ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-lg text-secondary-600">
                {isPt ? 'Tudo o que precisa de saber sobre o programa de criadores' : 'Everything you need to know about the creator program'}
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-secondary-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isPt ? 'Pronto para Começar a sua Jornada de Criador?' : 'Ready to Start Your Creator Journey?'}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {isPt
                ? 'Junte-se a centenas de criadores portugueses que já transformaram a sua paixão cultural numa fonte de rendimento sustentável.'
                : 'Join hundreds of Portuguese creators who have already transformed their cultural passion into sustainable income.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowApplication(true)}
                className="px-8 py-4 bg-white hover:bg-secondary-100 text-primary-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                {isPt ? 'Candidatar-me Hoje' : 'Apply Today'}
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={ROUTES.contact}
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all"
              >
                {isPt ? 'Falar Connosco' : 'Talk to Us'}
                <Users className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-primary-500/30">
              <div className="flex flex-wrap justify-center items-center gap-8 text-primary-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">{isPt ? 'Pagamentos Seguros' : 'Secure Payments'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">{isPt ? 'Pagamentos Mensais' : 'Monthly Payouts'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">{isPt ? '200+ Criadores Activos' : '200+ Active Creators'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">{isPt ? 'Apoio 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Application Modal */}
      {showApplication && (
        <CreatorApplicationForm
          onClose={() => setShowApplication(false)}
          onComplete={(generatedStreamKey) => {
            setStreamKey(generatedStreamKey)
            setShowApplication(false)
          }}
        />
      )}

      <Footer />
    </div>
  )
}