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
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { 
  CheckIcon as CheckIconSolid,
  StarIcon as StarIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import { Crown } from 'lucide-react'

interface PricingTier {
  name: string
  price: number
  originalPrice?: number
  description: string
  icon: React.ReactNode
  solidIcon: React.ReactNode
  features: string[]
  limitations: string[]
  highlighted: boolean
  buttonText: string
  buttonStyle: string
  badge?: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Comunidade Grátis',
    price: 0,
    description: 'Perfect for discovering the UK Portuguese community',
    icon: <UserIcon className="w-6 h-6" />,
    solidIcon: <UserIcon className="w-6 h-6" />,
    features: [
      'Browse Portuguese events across the UK',
      'Join community groups and discussions',
      'Basic business directory access',
      'View cultural content and resources',
      'Safety verification and member profiles',
      'Cultural news and updates',
      'Access to Portuguese language resources'
    ],
    limitations: [
      'Cannot RSVP to events',
      'Cannot create or publish events',
      'Limited business directory features',
      'Basic support only',
      'No event management tools'
    ],
    highlighted: false,
    buttonText: 'Comece Grátis',
    buttonStyle: 'btn-secondary'
  },
  {
    name: 'Membro Comunidade',
    price: 12,
    originalPrice: 15,
    description: 'Full community access for Portuguese speakers across the UK',
    icon: <StarIcon className="w-6 h-6" />,
    solidIcon: <StarIconSolid className="w-6 h-6" />,
    features: [
      'Everything in Grátis, plus:',
      'RSVP to unlimited events',
      'Join exclusive member events',
      'Full business directory access',
      'Portuguese cultural resource library',
      'Language exchange programs',
      'Community job board access',
      'Priority customer support',
      'Member-only discussions and groups',
      'Event calendar sync and notifications',
      'Professional networking opportunities'
    ],
    limitations: [
      'Cannot create or publish events',
      'No event analytics or management tools',
      'Standard customer support response time'
    ],
    highlighted: true,
    buttonText: 'Junte-se à Comunidade',
    buttonStyle: 'btn-primary',
    badge: 'Mais Popular'
  },
  {
    name: 'Organizador Básico',
    price: 25,
    originalPrice: 30,
    description: 'Essential tools for Portuguese cultural event organizers',
    icon: <CalendarIcon className="w-6 h-6" />,
    solidIcon: <CalendarIcon className="w-6 h-6" />,
    features: [
      'Everything in Membro Comunidade, plus:',
      'Create unlimited FREE events',
      'Publish paid events with low fees',
      'Only £0.50 + 1.5% per paid ticket',
      '60% cheaper than Eventbrite fees',
      'Basic event analytics and attendee management',
      'Portuguese marketing templates',
      'Community promotion in event feed',
      'Standard customer support',
      'Event registration and check-in tools'
    ],
    limitations: [
      'Limited advanced analytics',
      'Standard event placement in feed',
      'Basic branding options only'
    ],
    highlighted: false,
    buttonText: 'Começar a Organizar',
    buttonStyle: 'btn-primary bg-gradient-to-r from-green-500 to-blue-500 border-transparent hover:from-green-600 hover:to-blue-600'
  },
  {
    name: 'Organizador Pro',
    price: 45,
    originalPrice: 55,
    description: 'Advanced tools for professional Portuguese event organizers',
    icon: <Crown className="w-6 h-6" />,
    solidIcon: <Crown className="w-6 h-6" />,
    features: [
      'Everything in Organizador Básico, plus:',
      'Even lower fees: £0.35 + 1.2% per ticket',
      '70% cheaper than Eventbrite fees',
      'Advanced event analytics and insights',
      'Custom event branding and pages',
      'Priority placement in event feed',
      'Revenue tracking and detailed reports',
      'Multiple event locations support',
      'Recurring event management',
      'Priority customer support',
      'Bulk attendee management tools'
    ],
    limitations: [],
    highlighted: false,
    buttonText: 'Upgrade para Pro',
    buttonStyle: 'btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-transparent hover:from-purple-600 hover:to-pink-600'
  }
]

const features = [
  {
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    title: 'Safe Community Space',
    description: 'Verified member profiles and moderated discussions ensure a safe environment for Portuguese speakers'
  },
  {
    icon: <HeartIcon className="w-5 h-5" />,
    title: 'Cultural Heritage',
    description: 'Connect with fellow Portuguese across the UK who share your cultural values and traditions'
  },
  {
    icon: <CalendarIcon className="w-5 h-5" />,
    title: 'Portuguese Events',
    description: 'Fado nights, festival celebrations, business networking, and cultural activities celebrating Portuguese culture nationwide'
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    title: 'Language Support',
    description: 'Portuguese language groups, exchange programs, and resources to help maintain your mother tongue across the UK'
  },
  {
    icon: <LockClosedIcon className="w-5 h-5" />,
    title: 'Portuguese Community',
    description: 'Exclusive space for the Portuguese diaspora in the UK to connect and support each other'
  },
  {
    icon: <TrophyIcon className="w-5 h-5" />,
    title: 'Business Network',
    description: 'Connect with Portuguese entrepreneurs and professionals across the UK, share opportunities, and grow together'
  }
]

const testimonials = [
  {
    name: 'Maria S.',
    age: 35,
    location: 'Camden, London',
    membership: 'Membro Comunidade',
    quote: 'LusoTown ajudou-me a encontrar a minha comunidade portuguesa em Londres. Os meus filhos agora falam português fluentemente!',
    rating: 5
  },
  {
    name: 'João R.',
    age: 42,
    location: 'Stockwell, London',
    membership: 'Membro Família',
    quote: 'Through LusoTown, I found Portuguese clients for my business and lifelong friends. Somos uma comunidade!',
    rating: 5
  },
  {
    name: 'Ana L.',
    age: 28,
    location: 'East London',
    membership: 'Membro Comunidade',
    quote: 'As a young Portuguese professional in London, LusoTown connected me with mentors and cultural events. Sinto-me em casa.',
    rating: 5
  }
]

const stats = [
  { number: '500+', label: 'Portuguese Members', icon: <UsersIcon className="w-6 h-6" /> },
  { number: '25+', label: 'Monthly Events', icon: <CalendarIcon className="w-6 h-6" /> },
  { number: '150+', label: 'Local Businesses', icon: <ShieldCheckIconSolid className="w-6 h-6" /> },
  { number: '4.8/5', label: 'Community Rating', icon: <StarIconSolid className="w-6 h-6" /> }
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getDiscountedPrice = (price: number) => {
    return isAnnual ? Math.round(price * 10) : price // 10 months for price of 12
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <ShieldCheckIconSolid className="w-4 h-4 mr-2" />
                Confiado por 500+ membros da comunidade portuguesa
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Comunidade Portuguesa no Reino Unido:
                <span className="gradient-text"> Mais Barato que Eventbrite</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Organize eventos portugueses com taxas até 70% mais baixas que Eventbrite. 
                Conecte-se com milhares de lusófonos por todo o Reino Unido através da nossa plataforma especializada.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600">
                <div className="flex items-center">
                  <CameraIcon className="w-4 h-4 mr-2 text-primary-500" />
                  Comunidade Verificada
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 mr-2 text-primary-500" />
                  Espaço Seguro
                </div>
                <div className="flex items-center">
                  <LockClosedIcon className="w-4 h-4 mr-2 text-primary-500" />
                  GDPR Compliant
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                  Garantia 30 Dias
                </div>
              </div>
              
              {/* Annual/Monthly Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Mensal
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
                  Anual
                  <span className="ml-1 text-green-600 font-semibold">(Poupe 20%)</span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-8 ${
                    tier.highlighted
                      ? 'bg-white border-2 border-primary-400 shadow-xl scale-105'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      tier.name === 'Free' ? 'bg-gray-100 text-gray-600' :
                      tier.name === 'Core' ? 'bg-primary-100 text-primary-600' :
                      'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600'
                    }`}>
                      {tier.highlighted ? tier.solidIcon : tier.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-6">{tier.description}</p>
                    {(tier.name === 'Organizador Básico' || tier.name === 'Organizador Pro') && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-1">vs Eventbrite:</div>
                        <div className="text-xs text-green-700">
                          {tier.name === 'Organizador Básico' ? 
                            'Pague £0.50 + 1.5% vs £0.59 + 6.95%' : 
                            'Pague £0.35 + 1.2% vs £0.59 + 6.95%'
                          }
                        </div>
                        <div className="text-xs text-green-700 font-semibold">
                          {tier.name === 'Organizador Básico' ? 'Poupe 60% nas taxas!' : 'Poupe 70% nas taxas!'}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      {tier.price === 0 ? (
                        <div className="text-4xl font-bold text-gray-900">Gratuito</div>
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
                              /{isAnnual ? 'year' : 'month'}
                            </div>
                          </div>
                          {(tier.name === 'Organizador Básico' || tier.name === 'Organizador Pro') && (
                            <div className="text-sm text-orange-600 font-medium mt-2">
                              {tier.name === 'Organizador Básico' ? 
                                '+ £0.50 + 1.5% por bilhete pago' : 
                                '+ £0.35 + 1.2% por bilhete pago'
                              }
                            </div>
                          )}
                        </div>
                      )}
                      {isAnnual && tier.price > 0 && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Poupe £{tier.price * 2} por ano
                        </div>
                      )}
                    </div>

                    <button className={`w-full ${tier.buttonStyle} group`}>
                      {tier.buttonText}
                      <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckIconSolid className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.limitations.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        {tier.limitations.map((limitation, limitationIndex) => (
                          <div key={limitationIndex} className="flex items-start space-x-3 mb-2">
                            <XMarkIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-t border-b border-gray-100">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
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
                O Que Dizem os Nossos Membros
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Junte-se a centenas de portugueses que encontraram a sua comunidade em Londres.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location} • Age {testimonial.age}</div>
                    </div>
                    <div className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                      {testimonial.membership}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare os Planos de Adesão
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Veja exactamente o que está incluído em cada nível de adesão.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Funcionalidades</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Grátis</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600 bg-primary-50">Membro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Organizador</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Acesso ao Diretório', free: 'Básico', core: 'Completo', premium: 'Premium + Analytics' },
                    { feature: 'Participação em Eventos', free: 'Apenas visualizar', core: 'RSVP ilimitado', premium: 'RSVP + Criar eventos' },
                    { feature: 'Grupos de Chat', free: 'Públicos apenas', core: 'Todos os grupos', premium: 'Grupos + Promoção' },
                    { feature: 'Recursos Portugueses', free: 'Básico', core: 'Biblioteca completa', premium: 'Templates marketing' },
                    { feature: 'Criação de Eventos', free: false, core: false, premium: true },
                    { feature: 'Analytics de Eventos', free: false, core: false, premium: true },
                    { feature: 'Taxas por Bilhete', free: 'N/A', core: 'N/A', premium: '£0.35-0.50 + 1.2-1.5%' },
                    { feature: 'Branding Personalizado', free: false, core: false, premium: true },
                    { feature: 'Apoio ao Cliente', free: 'Padrão', core: 'Prioritário', premium: 'Prioritário + Dedicado' }
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

        {/* Visual Feature Demonstrations Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Veja LusoTown em Ação
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore as funcionalidades da nossa plataforma que mostram como os membros se conectam, participam em eventos e preservam a cultura portuguesa.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Profile Card Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Perfis de Membros Verificados</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                      MS
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">Maria S., 35</h4>
                    <p className="text-sm text-gray-600 mb-4">Empresária • Camden, London</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Fado</span>
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">Culinária</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Família</span>
                    </div>
                    <div className="flex items-center justify-center text-green-600 text-sm">
                      <ShieldCheckIcon className="w-4 h-4 mr-1" />
                      Membro Verificado
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Perfis autênticos da comunidade portuguesa com verificação e interesses culturais</p>
              </div>

              {/* Chat Room Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comunidades de Chat</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        🇵🇹
                      </div>
                      <div className="ml-3">
                        <h5 className="font-semibold text-gray-900">Portugueses em Londres</h5>
                        <p className="text-sm text-gray-600">127 membros • Ativo agora</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary-400 rounded-full flex-shrink-0"></div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                          <p className="text-sm">Alguém conhece boa pastelaria portuguesa?</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 justify-end">
                        <div className="bg-primary-500 text-white rounded-lg px-3 py-2 max-w-xs">
                          <p className="text-sm">Pastéis de Belém no Borough Market!</p>
                        </div>
                        <div className="w-6 h-6 bg-secondary-400 rounded-full flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Discussões em português num ambiente seguro e acolhedor</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Event Card Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Eventos Portugueses</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="h-32 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                      <CalendarDaysIcon className="w-12 h-12 text-white" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        Stockwell, London
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Noite de Fado</h5>
                      <p className="text-sm text-gray-600 mb-3">Música tradicional com petiscos portugueses</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          23 confirmados
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">£20</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Desde festivais culturais a workshops de negócios - eventos para toda a comunidade</p>
              </div>

              {/* Safety Verification Demo */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comunidade Segura</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <ShieldCheckIcon className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Verificação de Membros</h5>
                        <p className="text-sm text-gray-600">Confirmação de identidade segura</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Perfis verificados autênticos
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Comunidade moderada
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Ambiente acolhedor e seguro
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Verificação cuidadosa para garantir a comunidade mais segura possível</p>
              </div>
            </div>
          </div>
        </section>

        {/* Member Activity Dashboard Mockup */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Acompanhe a Sua Jornada na Comunidade
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Veja o seu progresso, conexões, e envolvimento com um painel personalizado desenhado para interações significativas.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-semibold text-gray-900 mb-6 text-xl text-center">A Sua Atividade no LusoTown</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-1">73</div>
                    <div className="text-sm text-gray-600">Conexões Feitas</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary-600 mb-1">12</div>
                    <div className="text-sm text-gray-600">Eventos Participados</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">234</div>
                    <div className="text-sm text-gray-600">Mensagens Enviadas</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">4.8</div>
                    <div className="text-sm text-gray-600">Avaliação do Membro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Porquê Escolher LusoTown?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Mais do que apenas uma comunidade - somos o seu sistema de apoio para criar conexões significativas e preservar a cultura portuguesa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
                Garantia 100% de Satisfação
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Estamos tão confiantes de que vai adorar o LusoTown que oferecemos uma garantia completa de 30 dias. 
                Se não estiver completamente satisfeito com a sua experiência, devolvemos todo o dinheiro - sem perguntas.
              </p>
              <div className="bg-white rounded-lg p-6 inline-block">
                <p className="text-sm text-gray-600 mb-2">Protegido pela nossa garantia:</p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    Reembolso total em 30 dias
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    Sem perguntas
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    Cancele a qualquer momento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perguntas? Temos Respostas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tudo o que precisa de saber sobre se juntar à comunidade LusoTown.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "Como funciona o processo de verificação?",
                  answer: "A nossa verificação multi-etapas garante conexões autênticas: (1) Verificação de identidade confirma quem você é, (2) Revisão de perfil garante qualidade e autenticidade, (3) Moderação da comunidade mantém o ambiente seguro. Este processo demora 24-48 horas e mantém a nossa comunidade segura e genuína."
                },
                {
                  question: "O que torna LusoTown diferente de outras plataformas?",
                  answer: "LusoTown é exclusivamente para a comunidade portuguesa em Londres. Focamos em conexões culturais significativas, preservação do património, e networking profissional. A nossa comunidade celebra a cultura portuguesa com eventos especiais, workshops, e conexões autênticas com pessoas que partilham a sua herança."
                },
                {
                  question: "Posso alterar ou cancelar a minha adesão?",
                  answer: "Absolutamente! Pode fazer upgrade, downgrade, ou cancelar a sua adesão a qualquer momento nas configurações da conta. Upgrades têm efeito imediato com faturação proporcional. Cancelamentos mantêm-se ativos até ao fim do ciclo de faturação atual."
                },
                {
                  question: "Que tipos de eventos organizam?",
                  answer: "Os nossos eventos vão desde noites de fado e celebrações culturais a networking profissional e atividades comunitárias. Membros Comunidade acedem a todos os eventos regulares, enquanto membros Premium desfrutam de eventos VIP exclusivos e oportunidades especiais."
                },
                {
                  question: "A minha informação pessoal está segura?",
                  answer: "Sim. Somos compatíveis com GDPR com segurança empresarial. Os seus dados são encriptados, nunca vendidos a terceiros, e você controla as suas configurações de privacidade. O nosso processo de verificação garante membros autênticos enquanto protege o seu anonimato."
                },
                {
                  question: "E se não encontrar a minha comunidade imediatamente?",
                  answer: "Construir conexões significativas leva tempo! Oferecemos uma garantia de satisfação de 30 dias - se não estiver feliz, contacte-nos para um reembolso completo. A nossa equipa de apoio pode ajudá-lo a encontrar os grupos e eventos certos para os seus interesses."
                },
                {
                  question: "Têm membros na minha área?",
                  answer: "Temos comunidades ativas por todo Londres, com as maiores concentrações em Stockwell, Camden, East London, e zonas circundantes. A nossa plataforma mostra eventos locais e membros na sua área, expandindo continuamente baseado na procura dos membros."
                },
                {
                  question: "Como sei se esta comunidade é certa para mim?",
                  answer: "Comece com a nossa adesão gratuita para explorar a comunidade, participar num evento público, e sentir a nossa cultura. Se é português ou de ascendência portuguesa em Londres à procura de conexões autênticas, provavelmente encontrará a sua comunidade aqui."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Ainda tem perguntas?</p>
              <a href="/contact" className="btn-outline inline-flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Contacte a Nossa Equipa
              </a>
            </div>
          </div>
        </section>

        {/* App Preview & Social Proof Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Junte-se à Conversa
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Veja como os membros do LusoTown estão a construir conexões significativas todos os dias através da nossa plataforma.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Live Activity Feed Mockup */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Atividade da Comunidade</h3>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">J</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">João</span>
                          <span className="text-gray-600"> juntou-se ao </span>
                          <span className="font-medium text-primary-600">Empresários Portugueses</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">há 2 minutos</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Maria</span>
                          <span className="text-gray-600"> criou evento </span>
                          <span className="font-medium text-secondary-600">Festival de Santo António</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">há 15 minutos</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Ana</span>
                          <span className="text-gray-600"> verificou o seu perfil</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">há 1 hora</div>
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <div className="text-sm text-gray-500">18 novas atividades na última hora</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-4">
                    <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Impacto desta Semana</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Novas Conexões</span>
                      <span className="font-bold text-primary-600">143</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Eventos Realizados</span>
                      <span className="font-bold text-secondary-600">6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mensagens Enviadas</span>
                      <span className="font-bold text-green-600">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Membros Verificados</span>
                      <span className="font-bold text-purple-600">34</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <SparklesIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">97.8%</div>
                  <div className="text-sm opacity-90">Satisfação dos Membros</div>
                  <div className="text-xs opacity-75 mt-2">Baseado em 500+ avaliações</div>
                </div>
              </div>
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
                <BoltIcon className="w-4 h-4 mr-2" />
                Junte-se a 500+ portugueses hoje
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                A Sua Comunidade Está À Espera
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Não passe mais um fim de semana a perguntar onde está a sua gente. 
                Junte-se ao LusoTown e descubra a comunidade portuguesa que tem procurado.
              </p>

              {/* Urgency Elements */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">24-48hrs</div>
                    <div className="text-sm opacity-80">Processo de Verificação</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">30 Dias</div>
                    <div className="text-sm opacity-80">Garantia de Reembolso</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">25+</div>
                    <div className="text-sm opacity-80">Eventos Este Mês</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="/signup" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 group transform hover:scale-105 transition-all duration-200">
                  Comece Grátis a Sua Jornada
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200">
                  Já é Membro? Entrar
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ShieldCheckIconSolid className="w-4 h-4 mr-2" />
                  Comunidade Verificada
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <LockClosedIcon className="w-4 h-4 mr-2" />
                  Proteção GDPR
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <HeartIconSolid className="w-4 h-4 mr-2" />
                  Espaço Sem Julgamentos
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Cancele a Qualquer Momento
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}