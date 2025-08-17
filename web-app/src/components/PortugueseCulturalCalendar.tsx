'use client'

import { motion } from 'framer-motion'
import { CalendarDaysIcon, MapPinIcon, ClockIcon, StarIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Crown, Heart, Music, Utensils, Sparkles, Flag } from 'lucide-react'
import { useState } from 'react'

interface PortugueseCelebration {
  id: string
  name: string
  namePortuguese: string
  date: string
  duration: string
  description: string
  descriptionPortuguese: string
  category: 'religious' | 'cultural' | 'regional' | 'historical' | 'culinary' | 'musical'
  significance: string
  significancePortuguese: string
  londonCelebrations: string[]
  londonCelebrationsPortuguese: string[]
  traditions: string[]
  traditionsPortuguese: string[]
  modernAdaptations: string[]
  modernAdaptationsPortuguese: string[]
  lusoTownEvents: string[]
  lusoTownEventsPortuguese: string[]
  communityInvolvement: string
  communityInvolvementPortuguese: string
}

const portugueseCelebrations: PortugueseCelebration[] = [
  {
    id: 'santos-populares',
    name: 'Santos Populares (Popular Saints Festivals)',
    namePortuguese: 'Santos Populares',
    date: 'June 12-29',
    duration: '18 days of celebration',
    description: 'The most beloved Portuguese cultural celebrations honoring Saint Anthony, Saint John, and Saint Peter with street parties, traditional foods, and community gatherings.',
    descriptionPortuguese: 'As mais queridas celebrações culturais portuguesas honrando Santo António, São João e São Pedro com festas de rua, comidas tradicionais e encontros comunitários.',
    category: 'religious',
    significance: 'These festivals represent the heart of Portuguese community spirit, bringing families and neighborhoods together in celebration of tradition, faith, and Portuguese cultural identity.',
    significancePortuguese: 'Estes festivais representam o coração do espírito comunitário português, reunindo famílias e vizinhanças em celebração da tradição, fé e identidade cultural portuguesa.',
    londonCelebrations: [
      'Portuguese Community Centre Santos Populares Festival',
      'Vauxhall Portuguese Street Festival',
      'Golborne Road Portuguese Food Festival',
      'Portuguese Church celebrations in Stockwell',
      'Little Portugal Community Garden celebrations'
    ],
    londonCelebrationsPortuguese: [
      'Festival dos Santos Populares do Centro Comunitário Português',
      'Festival de Rua Português de Vauxhall',
      'Festival de Comida Portuguesa da Golborne Road',
      'Celebrações da Igreja Portuguesa em Stockwell',
      'Celebrações do Jardim Comunitário da Pequena Portugal'
    ],
    traditions: [
      'Sardine grilling on portable grills (sardinhas assadas)',
      'Traditional Portuguese folk dancing (rancho folclórico)',
      'Manjerico (sweet basil) plants as gifts and symbols',
      'Traditional Portuguese music and Fado performances',
      'Portuguese flags and decorations throughout neighborhoods'
    ],
    traditionsPortuguese: [
      'Grelhar sardinhas em grelhadores portáteis',
      'Danças folclóricas portuguesas tradicionais (rancho folclórico)',
      'Plantas de manjerico como ofertas e símbolos',
      'Música portuguesa tradicional e performances de Fado',
      'Bandeiras portuguesas e decorações pelos bairros'
    ],
    modernAdaptations: [
      'Portuguese food trucks serving traditional festival foods',
      'Portuguese DJs mixing traditional and modern Portuguese music',
      'Portuguese community sports tournaments',
      'Family-friendly Portuguese cultural workshops',
      'Portuguese business networking during festivals'
    ],
    modernAdaptationsPortuguese: [
      'Food trucks portugueses servindo comidas tradicionais do festival',
      'DJs portugueses misturando música portuguesa tradicional e moderna',
      'Torneios desportivos da comunidade portuguesa',
      'Workshops culturais portugueses para toda a família',
      'Networking de negócios portugueses durante os festivais'
    ],
    lusoTownEvents: [
      'Santos Populares Cultural Tour of Little Portugal',
      'Traditional Portuguese Cooking Masterclass',
      'Fado Evening during Santos Populares celebrations',
      'Portuguese Community Networking Event',
      'Portuguese Family Festival Experience'
    ],
    lusoTownEventsPortuguese: [
      'Tour Cultural dos Santos Populares pela Pequena Portugal',
      'Masterclass de Cozinha Portuguesa Tradicional',
      'Serão de Fado durante as celebrações dos Santos Populares',
      'Evento de Networking da Comunidade Portuguesa',
      'Experiência do Festival Familiar Português'
    ],
    communityInvolvement: 'Portuguese families across London open their homes and gardens for informal celebrations, creating authentic community connections that bridge generations and preserve Portuguese traditions.',
    communityInvolvementPortuguese: 'Famílias portuguesas por toda Londres abrem as suas casas e jardins para celebrações informais, criando conexões comunitárias autênticas que ligam gerações e preservam tradições portuguesas.'
  },
  {
    id: 'festa-dos-tabuleiros',
    name: 'Festa dos Tabuleiros (Festival of Trays)',
    namePortuguese: 'Festa dos Tabuleiros',
    date: 'Every 4 years in July (Tomar tradition)',
    duration: '10 days celebration',
    description: 'One of Portugal\'s most spectacular and ancient religious festivals, featuring elaborate bread trays carried in procession, representing generosity and community solidarity.',
    descriptionPortuguese: 'Um dos festivais religiosos mais espetaculares e antigos de Portugal, apresentando tabuleiros elaborados de pão levados em procissão, representando generosidade e solidariedade comunitária.',
    category: 'religious',
    significance: 'This UNESCO-recognized festival embodies Portuguese values of sharing, community support, and religious devotion, connecting modern Portuguese communities to centuries-old traditions.',
    significancePortuguese: 'Este festival reconhecido pela UNESCO incorpora valores portugueses de partilha, apoio comunitário e devoção religiosa, conectando comunidades portuguesas modernas a tradições centenárias.',
    londonCelebrations: [
      'Portuguese Community Centre Tabuleiros Exhibition',
      'Traditional Portuguese bread-making workshops',
      'Portuguese cultural education events',
      'Community solidarity charity events',
      'Portuguese heritage preservation activities'
    ],
    londonCelebrationsPortuguese: [
      'Exposição de Tabuleiros do Centro Comunitário Português',
      'Workshops tradicionais de fabrico de pão português',
      'Eventos de educação cultural portuguesa',
      'Eventos de caridade de solidariedade comunitária',
      'Atividades de preservação do património português'
    ],
    traditions: [
      'Elaborate bread tray construction (30 breads per tray)',
      'Traditional Portuguese costume processions',
      'Community bread distribution to families in need',
      'Portuguese religious ceremonial music',
      'Traditional Portuguese craft demonstrations'
    ],
    traditionsPortuguese: [
      'Construção elaborada de tabuleiros de pão (30 pães por tabuleiro)',
      'Procissões de trajes tradicionais portugueses',
      'Distribuição comunitária de pão a famílias necessitadas',
      'Música cerimonial religiosa portuguesa',
      'Demonstrações de artesanato tradicional português'
    ],
    modernAdaptations: [
      'Portuguese community solidarity projects',
      'Educational workshops about Portuguese heritage',
      'Portuguese cultural preservation initiatives',
      'Community support network strengthening',
      'Portuguese cultural identity celebrations'
    ],
    modernAdaptationsPortuguese: [
      'Projetos de solidariedade da comunidade portuguesa',
      'Workshops educativos sobre património português',
      'Iniciativas de preservação cultural portuguesa',
      'Fortalecimento da rede de apoio comunitário',
      'Celebrações da identidade cultural portuguesa'
    ],
    lusoTownEvents: [
      'Portuguese Heritage Education Workshop',
      'Community Solidarity Networking Event',
      'Traditional Portuguese Crafts Masterclass',
      'Portuguese Cultural Identity Celebration',
      'Heritage Preservation Volunteer Programs'
    ],
    lusoTownEventsPortuguese: [
      'Workshop de Educação do Património Português',
      'Evento de Networking de Solidariedade Comunitária',
      'Masterclass de Artesanato Tradicional Português',
      'Celebração da Identidade Cultural Portuguesa',
      'Programas de Voluntariado de Preservação do Património'
    ],
    communityInvolvement: 'Portuguese community organizations in London coordinate cultural education events that teach younger generations about Portuguese traditions while creating opportunities for community service and solidarity.',
    communityInvolvementPortuguese: 'Organizações da comunidade portuguesa em Londres coordenam eventos de educação cultural que ensinam as gerações mais novas sobre tradições portuguesas enquanto criam oportunidades para serviço comunitário e solidariedade.'
  },
  {
    id: 'festa-da-flor',
    name: 'Festa da Flor (Flower Festival)',
    namePortuguese: 'Festa da Flor',
    date: 'April-May (Madeira tradition)',
    duration: '2 weeks',
    description: 'Spectacular Madeiran festival celebrating spring with elaborate flower carpets, traditional folk dances, and regional music, showcasing Madeira\'s unique island culture.',
    descriptionPortuguese: 'Festival madeirense espetacular celebrando a primavera com tapetes elaborados de flores, danças folclóricas tradicionais e música regional, mostrando a cultura única da ilha da Madeira.',
    category: 'cultural',
    significance: 'Represents the natural beauty and cultural diversity of Portuguese island communities, particularly important for Madeiran Portuguese living in London.',
    significancePortuguese: 'Representa a beleza natural e diversidade cultural das comunidades portuguesas insulares, particularmente importante para portugueses madeirenses vivendo em Londres.',
    londonCelebrations: [
      'Madeiran Portuguese Community Spring Festival',
      'Portuguese Island Culture Celebration',
      'Traditional Madeiran folk dance performances',
      'Portuguese regional music concerts',
      'Portuguese garden and flower exhibitions'
    ],
    londonCelebrationsPortuguese: [
      'Festival de Primavera da Comunidade Portuguesa Madeirense',
      'Celebração da Cultura Portuguesa Insular',
      'Performances de danças folclóricas madeirenses tradicionais',
      'Concertos de música regional portuguesa',
      'Exposições de jardins e flores portuguesas'
    ],
    traditions: [
      'Elaborate flower carpet street decorations',
      'Traditional Madeiran folk costume displays',
      'Regional Portuguese island music performances',
      'Portuguese flower arranging workshops',
      'Traditional Portuguese island cuisine tastings'
    ],
    traditionsPortuguese: [
      'Decorações elaboradas de tapetes de flores nas ruas',
      'Exibições de trajes folclóricos madeirenses tradicionais',
      'Performances de música regional portuguesa insular',
      'Workshops de arranjos florais portugueses',
      'Provas de culinária tradicional portuguesa insular'
    ],
    modernAdaptations: [
      'Portuguese community garden projects',
      'Portuguese cultural diversity celebrations',
      'Portuguese island heritage education',
      'Portuguese environmental awareness events',
      'Portuguese arts and crafts workshops'
    ],
    modernAdaptationsPortuguese: [
      'Projetos de jardins comunitários portugueses',
      'Celebrações da diversidade cultural portuguesa',
      'Educação do património insular português',
      'Eventos de consciencialização ambiental portuguesa',
      'Workshops de artes e artesanato portugueses'
    ],
    lusoTownEvents: [
      'Madeiran Cultural Heritage Tour',
      'Portuguese Island Music Experience',
      'Traditional Portuguese Crafts Workshop',
      'Portuguese Regional Cuisine Masterclass',
      'Portuguese Cultural Diversity Celebration'
    ],
    lusoTownEventsPortuguese: [
      'Tour do Património Cultural Madeirense',
      'Experiência de Música Insular Portuguesa',
      'Workshop de Artesanato Tradicional Português',
      'Masterclass de Culinária Regional Portuguesa',
      'Celebração da Diversidade Cultural Portuguesa'
    ],
    communityInvolvement: 'Madeiran Portuguese families in London organize spring celebrations that maintain connection to their island heritage while creating beautiful community spaces and cultural education opportunities.',
    communityInvolvementPortuguese: 'Famílias portuguesas madeirenses em Londres organizam celebrações de primavera que mantêm conexão ao seu património insular enquanto criam espaços comunitários bonitos e oportunidades de educação cultural.'
  },
  {
    id: 'dia-de-camoes',
    name: 'Dia de Camões e das Comunidades Portuguesas',
    namePortuguese: 'Dia de Camões e das Comunidades Portuguesas',
    date: 'June 10',
    duration: '1 day (with week-long cultural programming)',
    description: 'Portugal\'s National Day celebrating Luís de Camões and Portuguese communities worldwide, emphasizing Portuguese language, literature, and global cultural connections.',
    descriptionPortuguese: 'Dia Nacional de Portugal celebrando Luís de Camões e as comunidades portuguesas mundiais, enfatizando a língua portuguesa, literatura e conexões culturais globais.',
    category: 'historical',
    significance: 'Official celebration of Portuguese cultural identity and the global Portuguese-speaking community, particularly meaningful for Portuguese diaspora communities maintaining cultural connections.',
    significancePortuguese: 'Celebração oficial da identidade cultural portuguesa e da comunidade mundial lusófona, particularmente significativa para comunidades da diáspora portuguesa mantendo conexões culturais.',
    londonCelebrations: [
      'Portuguese Embassy official ceremonies',
      'Portuguese Community Centre cultural programming',
      'Portuguese language and literature events',
      'Portuguese cultural heritage exhibitions',
      'Portuguese business and professional networking'
    ],
    londonCelebrationsPortuguese: [
      'Cerimónias oficiais da Embaixada Portuguesa',
      'Programação cultural do Centro Comunitário Português',
      'Eventos de língua e literatura portuguesa',
      'Exposições do património cultural português',
      'Networking de negócios e profissionais portugueses'
    ],
    traditions: [
      'Portuguese flag ceremonial displays',
      'Portuguese poetry readings and literary events',
      'Traditional Portuguese cultural performances',
      'Portuguese language education celebrations',
      'Portuguese historical commemoration ceremonies'
    ],
    traditionsPortuguese: [
      'Exibições cerimoniais da bandeira portuguesa',
      'Leituras de poesia portuguesa e eventos literários',
      'Performances culturais portuguesas tradicionais',
      'Celebrações de educação da língua portuguesa',
      'Cerimónias de comemoração histórica portuguesa'
    ],
    modernAdaptations: [
      'Portuguese digital cultural events',
      'Portuguese professional development workshops',
      'Portuguese cultural innovation showcases',
      'Portuguese community leadership recognition',
      'Portuguese cultural entrepreneurship celebrations'
    ],
    modernAdaptationsPortuguese: [
      'Eventos culturais digitais portugueses',
      'Workshops de desenvolvimento profissional português',
      'Mostras de inovação cultural portuguesa',
      'Reconhecimento da liderança comunitária portuguesa',
      'Celebrações do empreendedorismo cultural português'
    ],
    lusoTownEvents: [
      'Portuguese Heritage and Identity Celebration',
      'Portuguese Professional Excellence Awards',
      'Portuguese Cultural Innovation Showcase',
      'Portuguese Community Leadership Forum',
      'Portuguese Literary and Cultural Heritage Tour'
    ],
    lusoTownEventsPortuguese: [
      'Celebração do Património e Identidade Portuguesa',
      'Prémios de Excelência Profissional Portuguesa',
      'Mostra de Inovação Cultural Portuguesa',
      'Fórum de Liderança Comunitária Portuguesa',
      'Tour do Património Literário e Cultural Português'
    ],
    communityInvolvement: 'Portuguese professionals and community leaders organize networking events, cultural education programs, and professional development opportunities that strengthen Portuguese cultural identity while supporting career advancement.',
    communityInvolvementPortuguese: 'Profissionais portugueses e líderes comunitários organizam eventos de networking, programas de educação cultural e oportunidades de desenvolvimento profissional que fortalecem a identidade cultural portuguesa enquanto apoiam o avanço da carreira.'
  }
]

const CELEBRATION_CATEGORIES = [
  { id: 'all', icon: GlobeAltIcon, label: { en: 'All Celebrations', pt: 'Todas as Celebrações' } },
  { id: 'religious', icon: Crown, label: { en: 'Religious', pt: 'Religiosas' } },
  { id: 'cultural', icon: Heart, label: { en: 'Cultural', pt: 'Culturais' } },
  { id: 'regional', icon: Flag, label: { en: 'Regional', pt: 'Regionais' } },
  { id: 'historical', icon: StarIcon, label: { en: 'Historical', pt: 'Históricas' } },
  { id: 'culinary', icon: Utensils, label: { en: 'Culinary', pt: 'Culinárias' } },
  { id: 'musical', icon: Music, label: { en: 'Musical', pt: 'Musicais' } }
]

interface PortugueseCulturalCalendarProps {
  isPortuguese: boolean
  onJoinCelebration: (celebrationId: string) => void
}

export default function PortugueseCulturalCalendar({ isPortuguese, onJoinCelebration }: PortugueseCulturalCalendarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedCelebration, setExpandedCelebration] = useState<string | null>(null)

  const filteredCelebrations = selectedCategory === 'all' 
    ? portugueseCelebrations
    : portugueseCelebrations.filter(celebration => celebration.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      religious: 'premium',
      cultural: 'secondary',
      regional: 'accent',
      historical: 'primary',
      culinary: 'coral',
      musical: 'action'
    }
    return colors[category] || 'gray'
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = CELEBRATION_CATEGORIES.find(cat => cat.id === category)
    return categoryData ? categoryData.icon : StarIcon
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary-50/30 to-premium-50/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Celebrações Portuguesas em Londres' : 'Portuguese Celebrations in London'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Calendário Cultural Português' : 'Portuguese Cultural Calendar'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Descubra e participe nas tradicionais celebrações portuguesas adaptadas para a comunidade portuguesa de Londres, preservando tradições autênticas enquanto cria novas memórias comunitárias'
              : 'Discover and participate in traditional Portuguese celebrations adapted for London\'s Portuguese community, preserving authentic traditions while creating new community memories'
            }
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CELEBRATION_CATEGORIES.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-secondary-500 to-premium-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-secondary-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label[isPortuguese ? 'pt' : 'en']}
                </button>
              )
            })}
          </div>
        </div>

        {/* Celebrations Grid */}
        <div className="space-y-8">
          {filteredCelebrations.map((celebration, index) => {
            const IconComponent = getCategoryIcon(celebration.category)
            const colorClass = getCategoryColor(celebration.category)
            const isExpanded = expandedCelebration === celebration.id
            
            return (
              <motion.div
                key={celebration.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Celebration Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'primary' ? 'from-primary-50 to-primary-100/50' : colorClass === 'coral' ? 'from-coral-50 to-coral-100/50' : 'from-action-50 to-action-100/50'} p-6`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${colorClass === 'premium' ? 'bg-premium-500' : colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'primary' ? 'bg-primary-500' : colorClass === 'coral' ? 'bg-coral-500' : 'bg-action-500'} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className={`text-xs font-medium ${colorClass === 'premium' ? 'text-premium-600' : colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'accent' ? 'text-accent-600' : colorClass === 'primary' ? 'text-primary-600' : colorClass === 'coral' ? 'text-coral-600' : 'text-action-600'} uppercase tracking-wide`}>
                            {celebration.category} • {celebration.date}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">
                            {isPortuguese ? celebration.namePortuguese : celebration.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {isPortuguese ? celebration.descriptionPortuguese : celebration.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{celebration.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onJoinCelebration(celebration.id)}
                        className={`${colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : colorClass === 'primary' ? 'bg-primary-600 hover:bg-primary-700' : colorClass === 'coral' ? 'bg-coral-600 hover:bg-coral-700' : 'bg-action-600 hover:bg-action-700'} text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm`}
                      >
                        {isPortuguese ? 'Participar' : 'Join Celebration'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Celebration Content */}
                <div className="p-6">
                  {/* Cultural Significance */}
                  <div className={`bg-${colorClass}-50 rounded-xl p-4 mb-6`}>
                    <h4 className={`font-medium ${colorClass === 'premium' ? 'text-premium-800' : colorClass === 'secondary' ? 'text-secondary-800' : colorClass === 'accent' ? 'text-accent-800' : colorClass === 'primary' ? 'text-primary-800' : colorClass === 'coral' ? 'text-coral-800' : 'text-action-800'} mb-2`}>
                      {isPortuguese ? 'Significado Cultural:' : 'Cultural Significance:'}
                    </h4>
                    <p className={`${colorClass === 'premium' ? 'text-premium-700' : colorClass === 'secondary' ? 'text-secondary-700' : colorClass === 'accent' ? 'text-accent-700' : colorClass === 'primary' ? 'text-primary-700' : colorClass === 'coral' ? 'text-coral-700' : 'text-action-700'} text-sm`}>
                      {isPortuguese ? celebration.significancePortuguese : celebration.significance}
                    </p>
                  </div>

                  {/* London Celebrations Preview */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Celebrações em Londres' : 'London Celebrations'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(isPortuguese ? celebration.londonCelebrationsPortuguese : celebration.londonCelebrations).slice(0, 4).map((event, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <MapPinIcon className={`w-4 h-4 ${colorClass === 'premium' ? 'text-premium-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'primary' ? 'text-primary-500' : colorClass === 'coral' ? 'text-coral-500' : 'text-action-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LusoTown Events */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Eventos LusoTown' : 'LusoTown Events'}
                    </h4>
                    <div className="space-y-2">
                      {(isPortuguese ? celebration.lusoTownEventsPortuguese : celebration.lusoTownEvents).slice(0, 3).map((event, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Sparkles className={`w-4 h-4 ${colorClass === 'premium' ? 'text-premium-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'primary' ? 'text-primary-500' : colorClass === 'coral' ? 'text-coral-500' : 'text-action-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedCelebration(isExpanded ? null : celebration.id)}
                    className={`w-full ${colorClass === 'premium' ? 'bg-premium-500 hover:bg-premium-600' : colorClass === 'secondary' ? 'bg-secondary-500 hover:bg-secondary-600' : colorClass === 'accent' ? 'bg-accent-500 hover:bg-accent-600' : colorClass === 'primary' ? 'bg-primary-500 hover:bg-primary-600' : colorClass === 'coral' ? 'bg-coral-500 hover:bg-coral-600' : 'bg-action-500 hover:bg-action-600'} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200`}
                  >
                    {isExpanded 
                      ? (isPortuguese ? 'Ver Menos' : 'Show Less')
                      : (isPortuguese ? 'Ver Mais Detalhes' : 'Show More Details')
                    }
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
                      {/* Traditions */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Tradições:' : 'Traditions:'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(isPortuguese ? celebration.traditionsPortuguese : celebration.traditions).map((tradition, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Crown className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{tradition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Modern Adaptations */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Adaptações Modernas:' : 'Modern Adaptations:'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(isPortuguese ? celebration.modernAdaptationsPortuguese : celebration.modernAdaptations).map((adaptation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{adaptation}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Community Involvement */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {isPortuguese ? 'Envolvimento Comunitário:' : 'Community Involvement:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {isPortuguese ? celebration.communityInvolvementPortuguese : celebration.communityInvolvement}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-secondary-50 via-premium-50 to-accent-50 rounded-2xl p-8 border border-secondary-200">
            <CalendarDaysIcon className="w-16 h-16 mx-auto mb-4 text-secondary-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Junte-se às Celebrações Portuguesas' : 'Join Portuguese Celebrations'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Mantenha-se conectado às suas raízes culturais e crie novas memórias com a comunidade portuguesa de Londres. Participe em tradições autênticas adaptadas para a vida moderna.'
                : 'Stay connected to your cultural roots and create new memories with London\'s Portuguese community. Participate in authentic traditions adapted for modern life.'
              }
            </p>
            <button
              onClick={() => onJoinCelebration('cultural-membership')}
              className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 hover:from-secondary-700 hover:via-premium-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Junte-se à Comunidade Cultural' : 'Join Cultural Community'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}