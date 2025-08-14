'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  CheckIcon, 
  XMarkIcon, 
  HeartIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LockClosedIcon,
  ArrowRightIcon,
  UsersIcon,
  EyeSlashIcon,
  BoltIcon,
  GiftIcon,
  TrophyIcon,
  CameraIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  MusicalNoteIcon,
  CurrencyPoundIcon
} from '@heroicons/react/24/outline'
import { 
  CheckIcon as CheckIconSolid,
  StarIcon as StarIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import { Crown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface PricingTier {
  name: string
  nameEn: string
  price: number
  originalPrice?: number
  description: string
  descriptionEn: string
  icon: React.ReactNode
  solidIcon: React.ReactNode
  features: string[]
  featuresEn: string[]
  limitations: string[]
  limitationsEn: string[]
  highlighted: boolean
  buttonText: string
  buttonTextEn: string
  buttonStyle: string
  badge?: string
  badgeEn?: string
  culturalContext: string
  culturalContextEn: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Visitante',
    nameEn: 'Visitor',
    price: 0,
    description: 'Descobre a comunidade portuguesa de Londres gratuitamente',
    descriptionEn: 'Discover London\'s Portuguese community for free',
    culturalContext: 'Como um visitante numa casa portuguesa - bem-vindo para conhecer a família',
    culturalContextEn: 'Like a visitor in a Portuguese home - welcome to meet the family',
    icon: <UserIcon className="w-6 h-6" />,
    solidIcon: <UserIcon className="w-6 h-6" />,
    features: [
      'Navegar eventos portugueses em Londres',
      'Ver diretório básico de negócios portugueses',
      'Acesso a recursos culturais portugueses',
      'Perfis de membros verificados',
      'Conteúdo cultural e notícias da comunidade',
      'Grupos públicos da comunidade portuguesa',
      'Calendário de festivais portugueses'
    ],
    featuresEn: [
      'Browse Portuguese events in London',
      'View basic Portuguese business directory',
      'Access to Portuguese cultural resources',
      'Verified member profiles',
      'Cultural content and community news',
      'Public Portuguese community groups',
      'Portuguese festival calendar'
    ],
    limitations: [
      'Máximo 2 RSVPs por mês',
      'Sem acesso a eventos exclusivos',
      'Funcionalidades básicas do diretório',
      'Apoio padrão apenas',
      'Sem criação de eventos'
    ],
    limitationsEn: [
      'Maximum 2 RSVPs per month',
      'No access to exclusive events', 
      'Basic directory features only',
      'Standard support only',
      'Cannot create events'
    ],
    highlighted: false,
    buttonText: 'Começar Grátis',
    buttonTextEn: 'Start Free',
    buttonStyle: 'btn-secondary'
  },
  {
    name: 'Família',
    nameEn: 'Family',
    price: 12,
    originalPrice: 15,
    description: 'Para quem quer fazer parte da família portuguesa de Londres',
    descriptionEn: 'For those who want to be part of London\'s Portuguese family',
    culturalContext: 'Como ser aceite na família - tens lugar à mesa e voz nas decisões',
    culturalContextEn: 'Like being accepted into the family - you have a seat at the table and voice in decisions',
    icon: <HeartIcon className="w-6 h-6" />,
    solidIcon: <HeartIconSolid className="w-6 h-6" />,
    features: [
      'Tudo do Visitante, mais:',
      'RSVPs ilimitados para todos os eventos',
      'Acesso a eventos exclusivos familiares',
      'Diretório completo de negócios portugueses',
      'Grupos privados da comunidade portuguesa',
      'Programas de intercâmbio linguístico',
      'Quadro de empregos da comunidade',
      'Apoio prioritário em português',
      'Eventos só para membros (noites de fado, jantares)',
      'Sincronização de calendário e notificações',
      'Networking profissional português'
    ],
    featuresEn: [
      'Everything in Visitor, plus:',
      'Unlimited RSVPs to all events',
      'Access to exclusive family events',
      'Full Portuguese business directory',
      'Private Portuguese community groups',
      'Language exchange programs',
      'Community job board access',
      'Priority support in Portuguese',
      'Member-only events (fado nights, dinners)',
      'Calendar sync and notifications',
      'Portuguese professional networking'
    ],
    limitations: [
      'Sem criação de eventos públicos',
      'Sem ferramentas de gestão avançadas'
    ],
    limitationsEn: [
      'Cannot create public events',
      'No advanced management tools'
    ],
    highlighted: true,
    buttonText: 'Juntar à Família',
    buttonTextEn: 'Join the Family',
    buttonStyle: 'btn-primary',
    badge: 'Mais Popular',
    badgeEn: 'Most Popular'
  },
  {
    name: 'Embaixador',
    nameEn: 'Ambassador', 
    price: 25,
    originalPrice: 30,
    description: 'Para líderes que querem moldar a comunidade portuguesa',
    descriptionEn: 'For leaders who want to shape the Portuguese community',
    culturalContext: 'Como ser um pilar da comunidade - o teu contributo faz a diferença para todos',
    culturalContextEn: 'Like being a pillar of the community - your contribution makes a difference for everyone',
    icon: <Crown className="w-6 h-6" />,
    solidIcon: <Crown className="w-6 h-6" />,
    features: [
      'Tudo da Família, mais:',
      'Criar e hospedar eventos comunitários',
      'Acesso VIP a noites de fado exclusivas',
      'Eventos culturais com custos cobertos',
      'Oportunidades de networking empresarial português',
      'Serviço de concierge comunitário pessoal',
      'Acesso antecipado a bilhetes de festivais',
      'Kit mensal de produtos culturais portugueses',
      'Destaque especial no diretório de negócios',
      'Mentoria para novos membros da comunidade',
      'Influência nas decisões da comunidade'
    ],
    featuresEn: [
      'Everything in Family, plus:',
      'Create and host community events',
      'VIP access to exclusive fado nights',
      'Cultural events with venue costs covered',
      'Portuguese business networking opportunities',
      'Personal community concierge service',
      'Early access to Portuguese festival tickets',
      'Monthly Portuguese cultural care package',
      'Special highlight in business directory',
      'Mentorship for new community members',
      'Influence in community decisions'
    ],
    limitations: [
      'Eventos limitados a 100 participantes',
      'Apoio durante horário comercial'
    ],
    limitationsEn: [
      'Events limited to 100 participants',
      'Support during business hours only'
    ],
    highlighted: false,
    buttonText: 'Tornar-se Embaixador',
    buttonTextEn: 'Become Ambassador',
    buttonStyle: 'btn-primary bg-gradient-to-r from-premium-500 to-premium-600 border-transparent hover:from-premium-600 hover:to-premium-700'
  }
]

const features = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    title: 'Authentic Portuguese Venues',
    titlePt: 'Locais Portugueses Autênticos',
    description: 'Connect at real Portuguese venues - from Stockwell\'s beloved bakeries to Vauxhall\'s cultural centers, where Portuguese families truly gather',
    descriptionPt: 'Conecta-te em locais portugueses reais - desde as padarias queridas de Stockwell aos centros culturais de Vauxhall, onde as famílias portuguesas se reúnem verdadeiramente'
  },
  {
    icon: <HeartIcon className="w-5 h-5" />,
    title: 'Cultural Preservation',
    titlePt: 'Preservação Cultural',
    description: 'Pass Portuguese traditions to your children through fado nights, Santo António festivals, and family-style community dinners',
    descriptionPt: 'Transmite tradições portuguesas aos teus filhos através de noites de fado, festivais de Santo António, e jantares comunitários em família'
  },
  {
    icon: <MusicalNoteIcon className="w-5 h-5" />,
    title: 'Fado & Cultural Events',
    titlePt: 'Fado e Eventos Culturais',
    description: 'Exclusive access to intimate fado performances, Portuguese film screenings, and traditional celebrations at authentic London venues',
    descriptionPt: 'Acesso exclusivo a performances íntimas de fado, sessões de cinema português, e celebrações tradicionais em locais autênticos de Londres'
  },
  {
    icon: <BuildingStorefrontIcon className="w-5 h-5" />,
    title: 'Portuguese Business Network',
    titlePt: 'Rede de Negócios Portugueses',
    description: 'Discover Portuguese-owned restaurants, services, and professionals. Support our community while getting authentic Portuguese quality',
    descriptionPt: 'Descobre restaurantes, serviços e profissionais portugueses. Apoia a nossa comunidade enquanto recebes qualidade portuguesa autêntica'
  },
  {
    icon: <AcademicCapIcon className="w-5 h-5" />,
    title: 'Heritage Language Learning',
    titlePt: 'Aprendizagem da Língua Materna',
    description: 'Help your children maintain Portuguese through language exchange programs, cultural workshops, and community storytelling',
    descriptionPt: 'Ajuda os teus filhos a manter o português através de programas de intercâmbio linguístico, workshops culturais, e narrativas comunitárias'
  },
  {
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    title: 'Verified Portuguese Community',
    titlePt: 'Comunidade Portuguesa Verificada',
    description: 'Safe, authenticated space for Portuguese speakers and their families - verified profiles ensure genuine connections',
    descriptionPt: 'Espaço seguro e autenticado para falantes de português e suas famílias - perfis verificados garantem conexões genuínas'
  }
]

const testimonials = [
  {
    name: 'Maria Santos',
    age: 34,
    location: 'Stockwell, Londres',
    membership: 'Família',
    quote: 'O LusoTown mudou a nossa vida em Londres. Os meus filhos agora têm amigos portugueses e falam português fluentemente. Encontrámos a nossa segunda família aqui.',
    quoteEn: 'LusoTown changed our life in London. My children now have Portuguese friends and speak Portuguese fluently. We found our second family here.',
    rating: 5,
    cultural: 'Mãe de dois filhos, originária do Porto'
  },
  {
    name: 'João Rodrigues',
    age: 42,
    location: 'Vauxhall, Londres',
    membership: 'Embaixador',
    quote: 'Como empresário português, o LusoTown conectou-me com clientes e fornecedores da nossa comunidade. Crescemos juntos, apoiando-nos mutuamente.',
    quoteEn: 'As a Portuguese entrepreneur, LusoTown connected me with clients and suppliers from our community. We grow together, supporting each other.',
    rating: 5,
    cultural: 'Proprietário de restaurante, de Lisboa'
  },
  {
    name: 'Ana Ferreira',
    age: 29,
    location: 'Camden, Londres',
    membership: 'Família',
    quote: 'Estava com saudades de casa até encontrar o LusoTown. Agora tenho um grupo de amigas que entende a minha jornada. Sinto-me em casa em Londres.',
    quoteEn: 'I was homesick until I found LusoTown. Now I have a group of friends who understand my journey. I feel at home in London.',
    rating: 5,
    cultural: 'Jovem profissional, do Algarve'
  },
  {
    name: 'Carlos Silva',
    age: 55,
    location: 'South Kensington, Londres',
    membership: 'Embaixador',
    quote: 'Há 20 anos em Londres, nunca me senti tão conectado com a comunidade portuguesa. O LusoTown trouxe-nos todos juntos.',
    quoteEn: 'After 20 years in London, I\'ve never felt so connected to the Portuguese community. LusoTown brought us all together.',
    rating: 5,
    cultural: 'Consultor sénior, de Coimbra'
  }
]

const stats = [
  { 
    number: '750+', 
    label: 'Membros Portugueses',
    labelEn: 'Portuguese Members', 
    icon: <UsersIcon className="w-6 h-6" /> 
  },
  { 
    number: '35+', 
    label: 'Eventos Mensais',
    labelEn: 'Monthly Events', 
    icon: <CalendarIcon className="w-6 h-6" /> 
  },
  { 
    number: '180+', 
    label: 'Negócios Locais',
    labelEn: 'Local Businesses', 
    icon: <BuildingStorefrontIcon className="w-6 h-6" /> 
  },
  { 
    number: '4.9/5', 
    label: 'Avaliação Comunidade',
    labelEn: 'Community Rating', 
    icon: <StarIconSolid className="w-6 h-6" /> 
  }
]

const paymentOptions = [
  {
    title: 'Pagamento Mensal',
    titleEn: 'Monthly Payment',
    description: 'Flexibilidade total - cancela a qualquer momento',
    descriptionEn: 'Full flexibility - cancel anytime',
    icon: <CurrencyPoundIcon className="w-5 h-5" />
  },
  {
    title: 'Desconto Familiar',
    titleEn: 'Family Discount',
    description: 'Planos familiares para casais e famílias com crianças',
    descriptionEn: 'Family plans for couples and families with children',
    icon: <HeartIcon className="w-5 h-5" />
  },
  {
    title: 'Desconto Estudante',
    titleEn: 'Student Discount',
    description: '50% desconto para estudantes portugueses',
    descriptionEn: '50% discount for Portuguese students',
    icon: <AcademicCapIcon className="w-5 h-5" />
  },
  {
    title: 'Desconto Sénior',
    titleEn: 'Senior Discount',
    description: '30% desconto para membros 60+',
    descriptionEn: '30% discount for members 60+',
    icon: <UserIcon className="w-5 h-5" />
  }
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'

  const getDiscountedPrice = (price: number) => {
    return isAnnual ? Math.round(price * 10) : price // 10 months for price of 12
  }

  const getCurrentTier = (tier: PricingTier) => ({
    name: isPortuguese ? tier.name : tier.nameEn,
    description: isPortuguese ? tier.description : tier.descriptionEn,
    culturalContext: isPortuguese ? tier.culturalContext : tier.culturalContextEn,
    features: isPortuguese ? tier.features : tier.featuresEn,
    limitations: isPortuguese ? tier.limitations : tier.limitationsEn,
    buttonText: isPortuguese ? tier.buttonText : tier.buttonTextEn,
    badge: tier.badge ? (isPortuguese ? tier.badge : tier.badgeEn) : undefined
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <HeartIconSolid className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Unidos pela Língua • 750+ membros da família' : 'United by Language • 750+ family members'}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? (
                  <>
                    Junta-te à Tua<br />
                    <span className="gradient-text">Família Portuguesa</span><br />
                    em Londres
                  </>
                ) : (
                  <>
                    Join Your Portuguese<br />
                    <span className="gradient-text">Family</span> in London
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {isPortuguese ? 
                  'Mais do que uma plataforma - somos o teu lar longe de casa. Conecta-te com a autêntica comunidade portuguesa de Londres através de experiências reais, eventos culturais e negócios familiares que te fazem sentir em casa.' :
                  'More than a platform - we\'re your home away from home. Connect with London\'s authentic Portuguese community through real experiences, cultural events, and family businesses that make you feel at home.'
                }
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600">
                <div className="flex items-center">
                  <HomeIcon className="w-4 h-4 mr-2 text-primary-500" />
                  {isPortuguese ? 'Locais Autênticos' : 'Authentic Venues'}
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 mr-2 text-primary-500" />
                  {isPortuguese ? 'Comunidade Verificada' : 'Verified Community'}
                </div>
                <div className="flex items-center">
                  <MusicalNoteIcon className="w-4 h-4 mr-2 text-primary-500" />
                  {isPortuguese ? 'Noites de Fado' : 'Fado Nights'}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                  {isPortuguese ? 'Garantia 30 Dias' : '30-Day Guarantee'}
                </div>
              </div>
              
              {/* Cultural Quote */}
              <div className="max-w-2xl mx-auto mb-12">
                <blockquote className="text-center">
                  <p className="text-lg italic text-gray-700 mb-3">
                    {isPortuguese ? 
                      '"Onde há portugueses, há sempre uma mesa para mais um"' : 
                      '"Where there are Portuguese people, there\'s always room for one more at the table"'
                    }
                  </p>
                  <footer className="text-sm text-gray-500">
                    {isPortuguese ? 'Provérbio Português' : 'Portuguese Proverb'}
                  </footer>
                </blockquote>
              </div>
              
              {/* Annual/Monthly Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  {isPortuguese ? 'Mensal' : 'Monthly'}
                </span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-primary-600 transition-transform ${
                      isAnnual ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  {isPortuguese ? 'Anual' : 'Annual'}
                  <span className="ml-1 text-green-600 font-semibold">
                    ({isPortuguese ? 'Poupa 20%' : 'Save 20%'})
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier, index) => {
                const currentTier = getCurrentTier(tier)
                return (
                  <div
                    key={tier.name}
                    className={`relative rounded-2xl p-8 ${
                      tier.highlighted
                        ? 'bg-white border-2 border-primary-400 shadow-2xl transform hover:scale-105 transition-all duration-300'
                        : 'bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300'
                    }`}
                  >
                    {currentTier.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {currentTier.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        index === 0 ? 'bg-gray-100 text-gray-600' :
                        index === 1 ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600' :
                        'bg-gradient-to-r from-premium-100 to-premium-200 text-premium-600'
                      }`}>
                        {tier.highlighted ? tier.solidIcon : tier.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentTier.name}</h3>
                      <p className="text-gray-600 mb-4">{currentTier.description}</p>
                      
                      {/* Cultural Context */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 italic">{currentTier.culturalContext}</p>
                      </div>
                      
                      <div className="mb-6">
                        {tier.price === 0 ? (
                          <div className="text-4xl font-bold text-gray-900">
                            {isPortuguese ? 'Gratuito' : 'Free'}
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-center space-x-2">
                              {isAnnual && tier.originalPrice && (
                                <div className="text-lg text-gray-500 line-through">
                                  £{tier.originalPrice * 12}
                                </div>
                              )}
                              <div className="text-4xl font-bold text-gray-900">
                                £{getDiscountedPrice(tier.price)}
                              </div>
                              <div className="text-gray-600">
                                /{isAnnual ? (isPortuguese ? 'ano' : 'year') : (isPortuguese ? 'mês' : 'month')}
                              </div>
                            </div>
                          </div>
                        )}
                        {isAnnual && tier.price > 0 && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            {isPortuguese ? `Poupa £${tier.price * 2} por ano` : `Save £${tier.price * 2} per year`}
                          </div>
                        )}
                      </div>

                      <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 group mb-6 ${
                        index === 0 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : index === 1
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-premium-500 to-premium-600 text-white hover:from-premium-600 hover:to-premium-700 shadow-lg hover:shadow-xl'
                      }`}>
                        <span className="flex items-center justify-center">
                          {currentTier.buttonText}
                          <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {currentTier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckIconSolid className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      
                      {currentTier.limitations.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                            {isPortuguese ? 'Limitações' : 'Limitations'}
                          </div>
                          {currentTier.limitations.map((limitation, limitationIndex) => (
                            <div key={limitationIndex} className="flex items-start space-x-3 mb-2">
                              <XMarkIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-t border-b border-gray-100">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'A Nossa Comunidade em Números' : 'Our Community in Numbers'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isPortuguese ? 
                  'Mais do que estatísticas - somos uma família portuguesa crescente em Londres' :
                  'More than statistics - we\'re a growing Portuguese family in London'
                }
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{isPortuguese ? stat.label : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Histórias da Nossa Família' : 'Stories from Our Family'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Ouça como outros portugueses encontraram o seu lugar em Londres através da nossa comunidade' :
                  'Hear how other Portuguese found their place in London through our community'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{isPortuguese ? testimonial.quote : testimonial.quoteEn}"
                  </blockquote>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 mb-1">{testimonial.location} • {isPortuguese ? `${testimonial.age} anos` : `Age ${testimonial.age}`}</div>
                      <div className="text-sm text-primary-600 italic">{testimonial.cultural}</div>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                      {testimonial.membership}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Impact Quote */}
            <div className="text-center mt-16">
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
                <blockquote className="text-2xl italic text-gray-800 mb-4">
                  {isPortuguese ?
                    '"Não é apenas sobre encontrar eventos - é sobre encontrar a tua tribo, as pessoas que entendem as tuas saudades de casa e te ajudam a criar novas memórias em Londres."' :
                    '"It\'s not just about finding events - it\'s about finding your tribe, people who understand your homesickness and help you create new memories in London."'
                  }
                </blockquote>
                <footer className="text-gray-600">
                  {isPortuguese ? 'Membro da Comunidade LusoTown' : 'LusoTown Community Member'}
                </footer>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options Section */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Opções de Pagamento Flexíveis' : 'Flexible Payment Options'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ? 
                  'Criamos opções de pagamento que funcionam para famílias portuguesas, com descontos especiais e flexibilidade total' :
                  'We\'ve created payment options that work for Portuguese families, with special discounts and full flexibility'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {paymentOptions.map((option, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {isPortuguese ? option.title : option.titleEn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isPortuguese ? option.description : option.descriptionEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Family Pricing Special */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
                <div className="text-center">
                  <HeartIconSolid className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Planos Familiares Especiais' : 'Special Family Plans'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6">
                      <div className="text-3xl font-bold text-primary-600 mb-2">£20</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {isPortuguese ? 'Família (até 4 membros)' : 'Family (up to 4 members)'}
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        {isPortuguese ? 'Poupa £28/mês' : 'Save £28/month'}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <div className="text-3xl font-bold text-secondary-600 mb-2">£6</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {isPortuguese ? 'Estudantes Portugueses' : 'Portuguese Students'}
                      </div>
                      <div className="text-xs text-green-600 font-medium">50% {isPortuguese ? 'desconto' : 'discount'}</div>
                    </div>
                    <div className="bg-white rounded-xl p-6">
                      <div className="text-3xl font-bold text-purple-600 mb-2">£8</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {isPortuguese ? 'Sénior (60+)' : 'Senior (60+)'}
                      </div>
                      <div className="text-xs text-green-600 font-medium">30% {isPortuguese ? 'desconto' : 'discount'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Compare os Benefícios da Comunidade' : 'Compare Community Benefits'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Vê exactamente como cada nível de adesão te ajuda a conectar com a comunidade portuguesa' :
                  'See exactly how each membership level helps you connect with the Portuguese community'
                }
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      {isPortuguese ? 'Benefícios da Comunidade' : 'Community Benefits'}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      {isPortuguese ? 'Visitante' : 'Visitor'}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600 bg-primary-50">
                      {isPortuguese ? 'Família' : 'Family'}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                      {isPortuguese ? 'Embaixador' : 'Ambassador'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { 
                      feature: isPortuguese ? 'Eventos Portugueses por Mês' : 'Portuguese Events per Month', 
                      free: '2 RSVPs', 
                      core: isPortuguese ? 'Ilimitado' : 'Unlimited', 
                      premium: isPortuguese ? 'Ilimitado + VIP' : 'Unlimited + VIP' 
                    },
                    { 
                      feature: isPortuguese ? 'Noites de Fado Exclusivas' : 'Exclusive Fado Nights', 
                      free: false, 
                      core: true, 
                      premium: isPortuguese ? 'VIP + Frente' : 'VIP + Front Row' 
                    },
                    { 
                      feature: isPortuguese ? 'Diretório de Negócios Portugueses' : 'Portuguese Business Directory', 
                      free: isPortuguese ? 'Básico' : 'Basic', 
                      core: isPortuguese ? 'Completo' : 'Full Access', 
                      premium: isPortuguese ? 'Destaque Premium' : 'Premium Listing' 
                    },
                    { 
                      feature: isPortuguese ? 'Grupos Privados da Comunidade' : 'Private Community Groups', 
                      free: isPortuguese ? 'Apenas públicos' : 'Public only', 
                      core: isPortuguese ? 'Todos os grupos' : 'All groups', 
                      premium: isPortuguese ? 'Criar grupos' : 'Create groups' 
                    },
                    { 
                      feature: isPortuguese ? 'Intercâmbio Linguístico' : 'Language Exchange', 
                      free: false, 
                      core: true, 
                      premium: isPortuguese ? 'Tutor pessoal' : 'Personal tutor' 
                    },
                    { 
                      feature: isPortuguese ? 'Kit Cultural Mensal' : 'Monthly Cultural Package', 
                      free: false, 
                      core: false, 
                      premium: true 
                    },
                    { 
                      feature: isPortuguese ? 'Apoio em Português' : 'Portuguese Support', 
                      free: isPortuguese ? 'Email apenas' : 'Email only', 
                      core: isPortuguese ? 'Prioritário' : 'Priority', 
                      premium: isPortuguese ? 'Concierge pessoal' : 'Personal concierge' 
                    },
                    { 
                      feature: isPortuguese ? 'Criação de Eventos' : 'Event Creation', 
                      free: false, 
                      core: false, 
                      premium: true 
                    },
                    { 
                      feature: isPortuguese ? 'Mentoria para Novatos' : 'Newcomer Mentorship', 
                      free: false, 
                      core: isPortuguese ? 'Receber apoio' : 'Receive support', 
                      premium: isPortuguese ? 'Dar e receber' : 'Give & receive' 
                    }
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{row.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50">
                        {typeof row.core === 'boolean' ? (
                          row.core ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-primary-700 font-medium">{row.core}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-green-700 font-medium">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Portuguese Community Features Section */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Porque Escolher a LusoTown?' : 'Why Choose LusoTown?'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Mais do que apenas uma comunidade - somos o teu sistema de apoio para criar conexões significativas e preservar a cultura portuguesa em Londres' :
                  'More than just a community - we\'re your support system for creating meaningful connections and preserving Portuguese culture in London'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {isPortuguese ? feature.titlePt : feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {isPortuguese ? feature.descriptionPt : feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee Section */}
        <section className="py-16 bg-green-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIconSolid className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Garantia 100% de Satisfação' : '100% Satisfaction Guarantee'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {isPortuguese ?
                  'Estamos tão confiantes de que vai adorar fazer parte da nossa família portuguesa que oferecemos uma garantia completa de 30 dias. Se não se sentir completamente em casa, devolvemos todo o dinheiro - sem perguntas.' :
                  'We\'re so confident you\'ll love being part of our Portuguese family that we offer a complete 30-day guarantee. If you don\'t feel completely at home, we\'ll refund everything - no questions asked.'
                }
              </p>
              <div className="bg-white rounded-lg p-6 inline-block">
                <p className="text-sm text-gray-600 mb-2">
                  {isPortuguese ? 'Protegido pela nossa garantia:' : 'Protected by our guarantee:'}
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    {isPortuguese ? 'Reembolso total em 30 dias' : '30-day full refund'}
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    {isPortuguese ? 'Sem perguntas' : 'No questions asked'}
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    {isPortuguese ? 'Cancele a qualquer momento' : 'Cancel anytime'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portuguese Community FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Perguntas? Temos Respostas' : 'Questions? We Have Answers'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Tudo o que precisa de saber sobre se juntar à família portuguesa de Londres' :
                  'Everything you need to know about joining London\'s Portuguese family'
                }
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  questionPt: "Como funciona a verificação da comunidade portuguesa?",
                  questionEn: "How does the Portuguese community verification work?",
                  answerPt: "A nossa verificação multi-etapas garante conexões autênticas com a comunidade portuguesa: (1) Verificação de identidade portuguesa/lusófona, (2) Revisão do perfil cultural para garantir autenticidade, (3) Moderação da comunidade para manter um ambiente acolhedor. Este processo demora 24-48 horas e assegura que encontra pessoas genuinamente conectadas à cultura portuguesa.",
                  answerEn: "Our multi-step verification ensures authentic connections with the Portuguese community: (1) Portuguese/Portuguese-speaking identity verification, (2) Cultural profile review to ensure authenticity, (3) Community moderation to maintain a welcoming environment. This process takes 24-48 hours and ensures you meet people genuinely connected to Portuguese culture."
                },
                {
                  questionPt: "O que torna LusoTown diferente de outras plataformas?",
                  questionEn: "What makes LusoTown different from other platforms?",
                  answerPt: "LusoTown é exclusivamente para a comunidade portuguesa de Londres. Focamos em locais autênticos - desde as padarias de Stockwell às noites de fado em South Kensington. Não somos apenas uma app - somos o teu sistema de apoio para preservar a cultura portuguesa, criar amizades verdadeiras e sentires-te em casa em Londres.",
                  answerEn: "LusoTown is exclusively for London's Portuguese community. We focus on authentic venues - from Stockwell's bakeries to fado nights in South Kensington. We're not just an app - we're your support system for preserving Portuguese culture, creating real friendships, and feeling at home in London."
                },
                {
                  questionPt: "Posso alterar ou cancelar a minha adesão?",
                  questionEn: "Can I change or cancel my membership?",
                  answerPt: "Absolutamente! Entendemos que as famílias portuguesas têm necessidades que mudam. Pode fazer upgrade, downgrade, ou cancelar a qualquer momento. Upgrades têm efeito imediato, cancelamentos mantêm-se ativos até ao fim do ciclo atual. Oferecemos também pausas temporárias para dificuldades financeiras.",
                  answerEn: "Absolutely! We understand that Portuguese families have changing needs. You can upgrade, downgrade, or cancel anytime. Upgrades take effect immediately, cancellations remain active until the current cycle ends. We also offer temporary pauses for financial difficulties."
                },
                {
                  questionPt: "Que tipos de eventos culturais organizam?",
                  questionEn: "What types of cultural events do you organize?",
                  answerPt: "Os nossos eventos celebram a verdadeira cultura portuguesa: noites de fado íntimas em restaurantes autênticos, festivais de Santo António, jantares familiares portugueses, workshops de culinária tradicional, eventos de networking empresarial português, e celebrações culturais para crianças aprenderem as suas raízes.",
                  answerEn: "Our events celebrate true Portuguese culture: intimate fado nights at authentic restaurants, Santo António festivals, Portuguese family dinners, traditional cooking workshops, Portuguese business networking events, and cultural celebrations for children to learn their roots."
                },
                {
                  questionPt: "A minha informação e a da minha família estão seguras?",
                  questionEn: "Is my family's information safe?",
                  answerPt: "Sim. Somos compatíveis com GDPR e levamos a segurança da família portuguesa a sério. Os seus dados são encriptados, nunca vendidos, e você controla totalmente a sua privacidade. O nosso processo de verificação garante membros autênticos enquanto protege o anonimato da sua família.",
                  answerEn: "Yes. We're GDPR compliant and take Portuguese family security seriously. Your data is encrypted, never sold, and you have complete control over your privacy. Our verification process ensures authentic members while protecting your family's anonymity."
                },
                {
                  questionPt: "E se não encontrar imediatamente a minha 'tribo' portuguesa?",
                  questionEn: "What if I don't immediately find my Portuguese 'tribe'?",
                  answerPt: "Construir conexões significativas leva tempo, especialmente quando se trata de encontrar pessoas que entendem as tuas saudades de casa! Oferecemos uma garantia de 30 dias - se não te sentires em família, devolvemos tudo. A nossa equipa pode ajudar-te a encontrar o teu grupo ideal.",
                  answerEn: "Building meaningful connections takes time, especially when finding people who understand your homesickness! We offer a 30-day guarantee - if you don't feel like family, we refund everything. Our team can help you find your ideal group."
                },
                {
                  questionPt: "Têm membros portugueses na minha área de Londres?",
                  questionEn: "Do you have Portuguese members in my London area?",
                  answerPt: "Temos comunidades ativas por todo Londres, com concentrações especiais em Stockwell (o coração da comunidade portuguesa), Vauxhall, Camden, East London, e South Kensington. A nossa plataforma mostra eventos e membros na tua área, crescendo baseado na procura da comunidade.",
                  answerEn: "We have active communities throughout London, with special concentrations in Stockwell (the heart of the Portuguese community), Vauxhall, Camden, East London, and South Kensington. Our platform shows events and members in your area, growing based on community demand."
                },
                {
                  questionPt: "Como sei se esta é a minha comunidade portuguesa?",
                  questionEn: "How do I know if this is my Portuguese community?",
                  answerPt: "Comece grátis como Visitante para sentir a nossa cultura. Se tens raízes portuguesas, sentes saudades da família, queres que os teus filhos aprendam português, ou simplesmente procuras pessoas que entendem a tua jornada em Londres - provavelmente encontraste a tua casa.",
                  answerEn: "Start free as a Visitor to feel our culture. If you have Portuguese roots, miss family, want your children to learn Portuguese, or simply seek people who understand your London journey - you've probably found your home."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {isPortuguese ? faq.questionPt : faq.questionEn}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {isPortuguese ? faq.answerPt : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                {isPortuguese ? 'Ainda tem perguntas?' : 'Still have questions?'}
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 border-2 border-primary-400 text-primary-600 hover:bg-primary-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                <PhoneIcon className="w-4 h-4" />
                {isPortuguese ? 'Contacte a Nossa Equipa' : 'Contact Our Team'}
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          <div className="container-width px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <HeartIconSolid className="w-4 h-4 mr-2" />
                {isPortuguese ? 
                  'Unidos pela Língua • Junta-te a 750+ famílias portuguesas' :
                  'United by Language • Join 750+ Portuguese families'
                }
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {isPortuguese ? 
                  'A Tua Família Portuguesa Está À Espera' :
                  'Your Portuguese Family is Waiting'
                }
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {isPortuguese ?
                  'Não passes mais um fim de semana a perguntar onde está a tua gente. Junta-te ao LusoTown e descobre a família portuguesa que tens procurado em Londres.' :
                  'Don\'t spend another weekend wondering where your people are. Join LusoTown and discover the Portuguese family you\'ve been looking for in London.'
                }
              </p>

              {/* Cultural Quote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
                <blockquote className="text-lg italic mb-4">
                  {isPortuguese ?
                    '"Onde há portugueses, há sempre uma mesa para mais um"' :
                    '"Where there are Portuguese people, there\'s always room for one more at the table"'
                  }
                </blockquote>
                <div className="text-sm opacity-80">
                  {isPortuguese ? 'Provérbio Português' : 'Portuguese Proverb'}
                </div>
              </div>

              {/* Urgency Elements */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">24-48hrs</div>
                    <div className="text-sm opacity-80">
                      {isPortuguese ? 'Verificação da Comunidade' : 'Community Verification'}
                    </div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">30 {isPortuguese ? 'Dias' : 'Days'}</div>
                    <div className="text-sm opacity-80">
                      {isPortuguese ? 'Garantia de Pertença' : 'Belonging Guarantee'}
                    </div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">35+</div>
                    <div className="text-sm opacity-80">
                      {isPortuguese ? 'Eventos Este Mês' : 'Events This Month'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="/signup" className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-xl group transform hover:scale-105 transition-all duration-200 shadow-lg">
                  {isPortuguese ? 'Começar Grátis como Visitante' : 'Start Free as Visitor'}
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/login" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg font-semibold px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-200">
                  {isPortuguese ? 'Já é da Família? Entrar' : 'Already Family? Sign In'}
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <HomeIcon className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Locais Autênticos' : 'Authentic Venues'}
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ShieldCheckIconSolid className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Comunidade Verificada' : 'Verified Community'}
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <MusicalNoteIcon className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Noites de Fado' : 'Fado Nights'}
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {isPortuguese ? 'Cancele a Qualquer Momento' : 'Cancel Anytime'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}