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
  CurrencyPoundIcon,
  CheckCircleIcon
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

// Single Annual Membership Model
const annualMembership = {
  name: 'Membro Anual LusoTown',
  nameEn: 'LusoTown Annual Membership',
  price: 25,
  description: 'O seu bilhete para a comunidade portuguesa de Londres',
  descriptionEn: 'Your ticket to London\'s Portuguese community',
  culturalContext: 'Investimento na preservação da nossa cultura e língua em Londres',
  culturalContextEn: 'Investment in preserving our culture and language in London',
  icon: <HeartIcon className="w-6 h-6" />,
  solidIcon: <HeartIconSolid className="w-6 h-6" />,
  features: [
    'Acesso ilimitado à plataforma durante todo o ano',
    'Participação em eventos a preço de custo',
    'Acesso a todos os grupos privados',
    'Eventos VIP exclusivos da comunidade',
    'Networking profissional português',
    'Preços transparentes - apenas pague o custo real',
    'Voz nas decisões da comunidade',
    'Benefícios cooperativos ao longo do tempo'
  ],
  featuresEn: [
    'Unlimited platform access throughout the year',
    'Event participation at cost price',
    'Access to all private groups',
    'Exclusive VIP community events',
    'Portuguese professional networking',
    'Transparent pricing - only pay true cost',
    'Voice in community decisions',
    'Cooperative benefits over time'
  ],
  limitations: [],
  limitationsEn: [],
  highlighted: true,
  buttonText: 'Juntar-se à Comunidade',
  buttonTextEn: 'Join the Community',
  buttonStyle: 'btn-primary'
}

const features = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    title: 'Authentic Portuguese Venues',
    titlePt: 'Locais Portugueses Autênticos',
    description: 'Connect at real Portuguese venues - from Stockwell\'s beloved bakeries to Vauxhall\'s cultural centers, where the Portuguese community truly gathers',
    descriptionPt: 'Conecta-te em locais portugueses reais - desde as padarias queridas de Stockwell aos centros culturais de Vauxhall, onde a comunidade portuguesa se reúne verdadeiramente'
  },
  {
    icon: <HeartIcon className="w-5 h-5" />,
    title: 'Cultural Preservation',
    titlePt: 'Preservação Cultural',
    description: 'Experience and preserve Portuguese traditions through fado nights, Santo António festivals, and community dinners that bring everyone together',
    descriptionPt: 'Vive e preserva tradições portuguesas através de noites de fado, festivais de Santo António, e jantares comunitários que unem todos'
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
    description: 'Maintain and improve your Portuguese through language exchange programs, cultural workshops, and community storytelling',
    descriptionPt: 'Mantém e melhora o teu português através de programas de intercâmbio linguístico, workshops culturais, e narrativas comunitárias'
  },
  {
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    title: 'Verified Portuguese Community',
    titlePt: 'Comunidade Portuguesa Verificada',
    description: 'Safe, authenticated space for Portuguese speakers - verified profiles ensure genuine connections for individuals and professionals',
    descriptionPt: 'Espaço seguro e autenticado para falantes de português - perfis verificados garantem conexões genuínas para indivíduos e profissionais'
  }
]

const testimonials = [
  {
    name: 'Maria Santos',
    age: 34,
    location: 'Stockwell, Londres',
    membership: 'Comunidade',
    quote: 'O LusoTown mudou a minha vida em Londres. Agora tenho amigos portugueses e participo em eventos culturais regularmente. Encontrei a minha comunidade aqui.',
    quoteEn: 'LusoTown changed my life in London. Now I have Portuguese friends and participate in cultural events regularly. I found my community here.',
    rating: 5,
    cultural: 'Profissional de marketing, originária do Porto'
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
    membership: 'Comunidade',
    quote: 'Estava com saudades de casa até encontrar o LusoTown. Agora tenho uma rede de amigos que entende a minha jornada profissional e cultural. Sinto-me em casa em Londres.',
    quoteEn: 'I was homesick until I found LusoTown. Now I have a network of friends who understand my professional and cultural journey. I feel at home in London.',
    rating: 5,
    cultural: 'Jovem profissional, do Algarve'
  },
  {
    name: 'Carlos Silva',
    age: 55,
    location: 'South Kensington, Londres',
    membership: 'Embaixador',
    quote: 'Há 20 anos em Londres, nunca me senti tão conectado com a comunidade portuguesa. O LusoTown conectou-me com outros profissionais e amantes da cultura.',
    quoteEn: 'After 20 years in London, I\'ve never felt so connected to the Portuguese community. LusoTown connected me with other professionals and culture enthusiasts.',
    rating: 5,
    cultural: 'Consultor sénior, de Coimbra'
  }
]

const stats = [
  { 
    number: '750+', 
    label: 'Membros Grátis',
    labelEn: 'Free Members', 
    icon: <UsersIcon className="w-6 h-6" /> 
  },
  { 
    number: '35+', 
    label: 'Eventos Mensais',
    labelEn: 'Monthly Events', 
    icon: <CalendarIcon className="w-6 h-6" /> 
  },
  { 
    number: '1', 
    label: 'Evento Grátis',
    labelEn: 'Free Event', 
    icon: <GiftIcon className="w-6 h-6" /> 
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
    title: 'Desconto para Grupos',
    titleEn: 'Group Discount',
    description: 'Descontos especiais para grupos e amigos',
    descriptionEn: 'Special discounts for groups and friends',
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
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'


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
                {isPortuguese ? 'Unidos pela Língua • 750+ membros da comunidade' : 'United by Language • 750+ community members'}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? (
                  <>
                    Escolha o Seu <span className="gradient-text">Plano Perfeito</span>
                  </>
                ) : (
                  <>
                    Choose Your <span className="gradient-text">Perfect Plan</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {isPortuguese ? 
                  'Simplificámos os preços para facilitar o seu início na nossa comunidade portuguesa.' :
                  'We\'ve simplified pricing to make it easier for you to get started in our Portuguese community.'
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
            </div>

            {/* Single Annual Membership Card */}
            <div className="max-w-2xl mx-auto">
              <div className="relative rounded-3xl p-8 bg-white border-2 border-primary-400 shadow-2xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-lg font-bold">
                    {isPortuguese ? 'Adesão Anual' : 'Annual Membership'}
                  </span>
                </div>
                
                <div className="text-center mb-8 mt-4">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600">
                    {annualMembership.solidIcon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? annualMembership.name : annualMembership.nameEn}
                  </h3>
                  
                  {/* Cultural Context */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
                    <p className="text-lg text-gray-700 italic">
                      {isPortuguese ? annualMembership.culturalContext : annualMembership.culturalContextEn}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="text-5xl font-bold text-gray-900">£{annualMembership.price}</div>
                      <div className="text-xl text-gray-600">/{isPortuguese ? 'ano' : 'year'}</div>
                    </div>
                    <p className="text-gray-600 text-lg">
                      {isPortuguese ? annualMembership.description : annualMembership.descriptionEn}
                    </p>
                  </div>

                  <button className="w-full py-4 px-8 rounded-2xl font-bold text-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-xl hover:shadow-2xl transition-all duration-200 group mb-8">
                    <span className="flex items-center justify-center">
                      {isPortuguese ? annualMembership.buttonText : annualMembership.buttonTextEn}
                      <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Features - Fixed mobile text truncation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isPortuguese ? annualMembership.features : annualMembership.featuresEn).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3 min-h-[48px]">
                      <CheckIconSolid className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 leading-relaxed break-words">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Annual Membership Explanation Section */}
        <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {isPortuguese ? 'O que é a Adesão Anual?' : 'What is the Annual Membership?'}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {isPortuguese ?
                    'É o seu bilhete para a comunidade portuguesa de Londres. Por uma taxa anual de £25, torna-se membro da LusoTown.' :
                    'It\'s your ticket to London\'s Portuguese community. For a flat fee of £25 per year, you become a member of LusoTown.'
                  }
                </p>
                
                <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-2xl p-6 mb-8 border border-accent-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    🛒 {isPortuguese ? 'Como o Costco para a Cultura Portuguesa' : 'Like Costco for Portuguese Culture'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {isPortuguese ?
                      'Pague a adesão anual para entrar. Depois, participe em eventos, workshops e atividades culturais apenas pelo custo real - sem markups ou taxas escondidas. A sua adesão cobre os nossos custos operacionais.' :
                      'Pay the annual membership to get in the door. Then participate in events, workshops, and cultural activities at true cost only - no markups or hidden fees. Your membership covers our operational costs.'
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-lg mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {isPortuguese ? 'Porquê £25/ano em vez de mensalidades?' : 'Why £25/year instead of monthly plans?'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {isPortuguese ? '🚫 Não somos como outras empresas SaaS' : '🚫 We\'re not like other SaaS companies'}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {isPortuguese ?
                        'Subscrições mensais criam relações predatórias onde as empresas lucram com o facto de se esquecer de cancelar. Odiamos esse modelo.' :
                        'Monthly subscriptions create predatory relationships where companies profit from you forgetting to cancel. We hate that model.'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {isPortuguese ? '🤝 O nosso sucesso alinha-se com o seu' : '🤝 Our success aligns with yours'}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {isPortuguese ?
                        'A adesão anual alinha o nosso sucesso com o seu. Investimos genuinamente na preservação da cultura portuguesa em Londres.' :
                        'Annual membership aligns our success with yours. We genuinely invest in preserving Portuguese culture in London.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">750+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? 'Membros Anuais' : 'Annual Members'}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">£25</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? 'Por Ano Completo' : 'For Full Year'}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-accent-600 mb-2">0%</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? 'Markups Escondidos' : 'Hidden Markups'}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? 'Transparente' : 'Transparent'}
                  </div>
                </div>
              </div>
              
              {/* Cooperative Benefits Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {isPortuguese ? 'O que recebe com a sua adesão?' : 'What do you get with your membership?'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? 'Acesso Ilimitado à Plataforma' : 'Unlimited Platform Access'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese ? 'Participe em todos os eventos e grupos da comunidade' : 'Join all community events and groups'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? 'Preços de Custo Real' : 'True Cost Pricing'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese ? 'Pague apenas o custo real dos eventos, sem markups' : 'Pay only true cost for events, no markups'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? 'Voz na Comunidade' : 'Voice in Community'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese ? 'Influência nas decisões da comunidade' : 'Influence in community decisions'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-premium-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-premium-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? 'Benefícios Cooperativos' : 'Cooperative Benefits'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese ? 'Propriedade futura da plataforma como membro fundador' : 'Future platform ownership as founding member'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Histórias da Nossa Comunidade' : 'Stories from Our Community'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Ouça como outros portugueses, profissionais e indivíduos encontraram o seu lugar em Londres através da nossa comunidade' :
                  'Hear how other Portuguese individuals and professionals found their place in London through our community'
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
                    '"Comecei grátis só para experimentar. Agora não consigo imaginar Londres sem o LusoTown - encontrei a minha família portuguesa aqui."' :
                    '"I started free just to try it out. Now I can\'t imagine London without LusoTown - I found my Portuguese family here."'
                  }
                </blockquote>
                <footer className="text-gray-600">
                  {isPortuguese ? 'Membro Grátis que se tornou VIP' : 'Free Member who became VIP'}
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
                  'Criamos opções de pagamento que funcionam para todos os membros da comunidade portuguesa, com descontos especiais e flexibilidade total' :
                  'We\'ve created payment options that work for all Portuguese community members, with special discounts and full flexibility'
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

            {/* Group Pricing Special */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
                <div className="text-center">
                  <HeartIconSolid className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Planos Especiais para Grupos' : 'Special Group Plans'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6">
                      <div className="text-3xl font-bold text-primary-600 mb-2">£20</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {isPortuguese ? 'Grupo de Amigos (até 4 membros)' : 'Friend Group (up to 4 members)'}
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
                      {isPortuguese ? 'Comunidade' : 'Community'}
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

        {/* Why Choose LusoTown Section */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Porque Escolher a LusoTown?' : 'Why Choose LusoTown?'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese ?
                  'Estamos a construir uma forma mais justa de preservar e celebrar a cultura portuguesa em Londres' :
                  'We\'re building a fairer way to preserve and celebrate Portuguese culture in London'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Preços Honestos' : 'Honest Pricing'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese ?
                    'Sem subscrições predatórias ou taxas surpresa. Adesão anual simples com custos transparentes para preservar a nossa cultura.' :
                    'No predatory subscriptions or surprise charges. Simple annual membership with transparent costs to preserve our culture.'
                  }
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UsersIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Propriedade da Comunidade' : 'Community Owned'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese ?
                    'Os membros têm voz nas decisões da comunidade. Juntos, moldamos o futuro da cultura portuguesa em Londres.' :
                    'Members have a voice in community decisions. Together, we shape the future of Portuguese culture in London.'
                  }
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Sem Markups Escondidos' : 'No Hidden Markups'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isPortuguese ?
                    'A sua adesão cobre os nossos custos operacionais. Eventos e serviços são oferecidos ao custo real, sem margens inflacionadas.' :
                    'Your membership covers our operational costs. Events and services are offered at true cost, without inflated margins.'
                  }
                </p>
              </div>
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
                  'Estamos tão confiantes de que vai adorar fazer parte da nossa comunidade portuguesa que oferecemos uma garantia completa de 30 dias. Se não se sentir completamente em casa, devolvemos todo o dinheiro - sem perguntas.' :
                  'We\'re so confident you\'ll love being part of our Portuguese community that we offer a complete 30-day guarantee. If you don\'t feel completely at home, we\'ll refund everything - no questions asked.'
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
                  'Tudo o que precisa de saber sobre se juntar à comunidade portuguesa de Londres' :
                  'Everything you need to know about joining London\'s Portuguese community'
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
                  answerPt: "Absolutamente! Entendemos que os membros da comunidade portuguesa têm necessidades que mudam. Pode fazer upgrade, downgrade, ou cancelar a qualquer momento. Upgrades têm efeito imediato, cancelamentos mantêm-se ativos até ao fim do ciclo atual. Oferecemos também pausas temporárias para dificuldades financeiras.",
                  answerEn: "Absolutely! We understand that Portuguese community members have changing needs. You can upgrade, downgrade, or cancel anytime. Upgrades take effect immediately, cancellations remain active until the current cycle ends. We also offer temporary pauses for financial difficulties."
                },
                {
                  questionPt: "Que tipos de eventos culturais organizam?",
                  questionEn: "What types of cultural events do you organize?",
                  answerPt: "Os nossos eventos celebram a verdadeira cultura portuguesa: noites de fado íntimas em restaurantes autênticos, festivais de Santo António, jantares comunitários portugueses, workshops de culinária tradicional, eventos de networking empresarial português, e celebrações culturais para todos conectarem com as suas raízes.",
                  answerEn: "Our events celebrate true Portuguese culture: intimate fado nights at authentic restaurants, Santo António festivals, Portuguese community dinners, traditional cooking workshops, Portuguese business networking events, and cultural celebrations for everyone to connect with their roots."
                },
                {
                  questionPt: "A minha informação pessoal está segura?",
                  questionEn: "Is my personal information safe?",
                  answerPt: "Sim. Somos compatíveis com GDPR e levamos a segurança da comunidade portuguesa a sério. Os seus dados são encriptados, nunca vendidos, e você controla totalmente a sua privacidade. O nosso processo de verificação garante membros autênticos enquanto protege a sua privacidade pessoal.",
                  answerEn: "Yes. We're GDPR compliant and take Portuguese community security seriously. Your data is encrypted, never sold, and you have complete control over your privacy. Our verification process ensures authentic members while protecting your personal privacy."
                },
                {
                  questionPt: "E se não encontrar imediatamente a minha 'tribo' portuguesa?",
                  questionEn: "What if I don't immediately find my Portuguese 'tribe'?",
                  answerPt: "Construir conexões significativas leva tempo, especialmente quando se trata de encontrar pessoas que entendem as tuas saudades de casa! Oferecemos uma garantia de 30 dias - se não te sentires parte da comunidade, devolvemos tudo. A nossa equipa pode ajudar-te a encontrar o teu grupo ideal.",
                  answerEn: "Building meaningful connections takes time, especially when finding people who understand your homesickness! We offer a 30-day guarantee - if you don't feel part of the community, we refund everything. Our team can help you find your ideal group."
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
                  answerPt: "Comece grátis como Visitante para sentir a nossa cultura. Se tens raízes portuguesas, sentes saudades da cultura, queres melhorar o teu português, procuras oportunidades profissionais ou simplesmente procuras pessoas que entendem a tua jornada em Londres - provavelmente encontraste a tua comunidade.",
                  answerEn: "Start free as a Visitor to feel our culture. If you have Portuguese roots, miss the culture, want to improve your Portuguese, seek professional opportunities or simply seek people who understand your London journey - you've probably found your community."
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
                  'Unidos pela Língua • Junta-te a 750+ membros da comunidade portuguesa' :
                  'United by Language • Join 750+ Portuguese community members'
                }
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {isPortuguese ? 
                  'Junte-se à Sua Comunidade Portuguesa' :
                  'Join Your Portuguese Community'
                }
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {isPortuguese ?
                  'Uma adesão anual simples. Uma comunidade para toda a vida. Invista na preservação da cultura portuguesa em Londres.' :
                  'One simple annual membership. A community for life. Invest in preserving Portuguese culture in London.'
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
                  {isPortuguese ? 'Começar Grátis' : 'Start Free'}
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/login" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg font-semibold px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-200">
                  {isPortuguese ? 'Já é Membro? Entrar' : 'Already a Member? Sign In'}
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