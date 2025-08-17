'use client'

import { motion } from 'framer-motion'
import { HeartIcon, GlobeAltIcon, UsersIcon, BuildingOffice2Icon, MusicalNoteIcon, CalendarDaysIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Coffee, Music, Calendar, MapPin, Building, Compass, Heart } from 'lucide-react'
import { useState } from 'react'

interface CulturalExperience {
  id: string
  name: string
  namePortuguese: string
  category: 'tours' | 'fado' | 'calendar' | 'business' | 'discovery' | 'corporate' | 'heritage'
  description: string
  descriptionPortuguese: string
  icon: any
  color: string
  featured: boolean
  popularity: number
  experienceCount: number
  culturalAuthenticity: number
  communityImpact: string
  communityImpactPortuguese: string
  memberBenefits: string[]
  memberBenefitsPortuguese: string[]
}

const culturalExperiences: CulturalExperience[] = [
  {
    id: 'little-portugal-tours',
    name: 'Little Portugal Walking Tours',
    namePortuguese: 'Tours a Pé da Pequena Portugal',
    category: 'tours',
    description: 'Authentic guided tours through London\'s Portuguese neighborhoods, visiting family-run businesses, traditional bakeries, and cultural landmarks.',
    descriptionPortuguese: 'Tours guiados autênticos pelos bairros portugueses de Londres, visitando negócios familiares, padarias tradicionais e marcos culturais.',
    icon: MapPin,
    color: 'coral',
    featured: true,
    popularity: 98,
    experienceCount: 12,
    culturalAuthenticity: 10,
    communityImpact: 'Supports local Portuguese businesses and preserves cultural heritage through authentic storytelling and community connections.',
    communityImpactPortuguese: 'Apoia negócios portugueses locais e preserva o património cultural através de narrativas autênticas e conexões comunitárias.',
    memberBenefits: [
      'Access to 12+ authentic Portuguese cultural tours',
      'Meet Portuguese families and business owners',
      'Traditional Portuguese food tastings included',
      'Cultural storytelling by community elders'
    ],
    memberBenefitsPortuguese: [
      'Acesso a 12+ tours culturais portugueses autênticos',
      'Conhecer famílias portuguesas e proprietários de negócios',
      'Provas de comida portuguesa tradicional incluídas',
      'Narrativas culturais por anciãos da comunidade'
    ]
  },
  {
    id: 'fado-experiences',
    name: 'Authentic Fado Experiences',
    namePortuguese: 'Experiências Autênticas de Fado',
    category: 'fado',
    description: 'UNESCO Heritage Fado performances in intimate settings with traditional Portuguese dining and cultural education.',
    descriptionPortuguese: 'Performances de Fado Património UNESCO em ambientes íntimos com jantar português tradicional e educação cultural.',
    icon: Music,
    color: 'premium',
    featured: true,
    popularity: 95,
    experienceCount: 8,
    culturalAuthenticity: 10,
    communityImpact: 'Preserves Portuguese musical heritage while creating intimate cultural connections and supporting Portuguese artists.',
    communityImpactPortuguese: 'Preserva o património musical português enquanto cria conexões culturais íntimas e apoia artistas portugueses.',
    memberBenefits: [
      'Intimate Fado evenings with Portuguese families',
      'Traditional Portuguese dinner experiences',
      'Portuguese guitar music education',
      'Cultural context and saudade understanding'
    ],
    memberBenefitsPortuguese: [
      'Serões íntimos de Fado com famílias portuguesas',
      'Experiências de jantar português tradicional',
      'Educação musical de guitarra portuguesa',
      'Contexto cultural e compreensão da saudade'
    ]
  },
  {
    id: 'cultural-calendar',
    name: 'Portuguese Cultural Calendar',
    namePortuguese: 'Calendário Cultural Português',
    category: 'calendar',
    description: 'Year-round Portuguese celebrations and festivals adapted for London\'s Portuguese community.',
    descriptionPortuguese: 'Celebrações e festivais portugueses durante todo o ano adaptados para a comunidade portuguesa de Londres.',
    icon: Calendar,
    color: 'secondary',
    featured: true,
    popularity: 92,
    experienceCount: 15,
    culturalAuthenticity: 9,
    communityImpact: 'Strengthens Portuguese cultural identity while creating community bonds and preserving traditional celebrations.',
    communityImpactPortuguese: 'Fortalece a identidade cultural portuguesa enquanto cria laços comunitários e preserva celebrações tradicionais.',
    memberBenefits: [
      'Santos Populares and traditional Portuguese festivals',
      'Portuguese holiday celebrations with community',
      'Cultural workshops and educational events',
      'Family-friendly Portuguese activities'
    ],
    memberBenefitsPortuguese: [
      'Santos Populares e festivais portugueses tradicionais',
      'Celebrações de feriados portugueses com a comunidade',
      'Workshops culturais e eventos educativos',
      'Atividades portuguesas para toda a família'
    ]
  },
  {
    id: 'business-directory',
    name: 'Portuguese Business Network',
    namePortuguese: 'Rede de Negócios Portugueses',
    category: 'business',
    description: 'Authentic Portuguese businesses in London, from family restaurants to professional services.',
    descriptionPortuguese: 'Negócios portugueses autênticos em Londres, desde restaurantes familiares a serviços profissionais.',
    icon: Building,
    color: 'accent',
    featured: false,
    popularity: 88,
    experienceCount: 25,
    culturalAuthenticity: 9,
    communityImpact: 'Supports Portuguese entrepreneurs and connects community members with authentic services and cultural experiences.',
    communityImpactPortuguese: 'Apoia empreendedores portugueses e conecta membros da comunidade com serviços autênticos e experiências culturais.',
    memberBenefits: [
      'Directory of 50+ authentic Portuguese businesses',
      'Portuguese professional networking opportunities',
      'Cultural business connection events',
      'Support for Portuguese entrepreneurs'
    ],
    memberBenefitsPortuguese: [
      'Diretório de 50+ negócios portugueses autênticos',
      'Oportunidades de networking profissional português',
      'Eventos de conexão empresarial cultural',
      'Apoio para empreendedores portugueses'
    ]
  },
  {
    id: 'age-of-discovery',
    name: 'Age of Discovery Tours',
    namePortuguese: 'Tours da Era dos Descobrimentos',
    category: 'discovery',
    description: 'Educational tours exploring Portuguese maritime heritage and global discoveries in London.',
    descriptionPortuguese: 'Tours educativos explorando o património marítimo português e descobertas globais em Londres.',
    icon: Compass,
    color: 'primary',
    featured: false,
    popularity: 85,
    experienceCount: 6,
    culturalAuthenticity: 10,
    communityImpact: 'Educates about Portuguese contributions to world history while connecting heritage to modern Portuguese identity.',
    communityImpactPortuguese: 'Educa sobre contribuições portuguesas para a história mundial enquanto conecta o património à identidade portuguesa moderna.',
    memberBenefits: [
      'Maritime museum exclusive Portuguese collections',
      'Portuguese navigation and exploration education',
      'Cultural exchange history workshops',
      'Professional historical guides'
    ],
    memberBenefitsPortuguese: [
      'Coleções portuguesas exclusivas do museu marítimo',
      'Educação de navegação e exploração portuguesa',
      'Workshops de história de intercâmbio cultural',
      'Guias históricos profissionais'
    ]
  },
  {
    id: 'corporate-programs',
    name: 'Corporate Cultural Programs',
    namePortuguese: 'Programas Culturais Corporativos',
    category: 'corporate',
    description: 'Portuguese language immersion and cultural training for businesses entering Portuguese markets.',
    descriptionPortuguese: 'Imersão em língua portuguesa e treino cultural para empresas entrando em mercados portugueses.',
    icon: Users,
    color: 'action',
    featured: false,
    popularity: 82,
    experienceCount: 10,
    culturalAuthenticity: 9,
    communityImpact: 'Bridges Portuguese culture with international business, creating economic opportunities for the Portuguese community.',
    communityImpactPortuguese: 'Liga a cultura portuguesa com negócios internacionais, criando oportunidades económicas para a comunidade portuguesa.',
    memberBenefits: [
      'Portuguese language immersion programs',
      'Chamber of Commerce business partnerships',
      'Cultural competency training for teams',
      'Portuguese market entry strategic guidance'
    ],
    memberBenefitsPortuguese: [
      'Programas de imersão em língua portuguesa',
      'Parcerias empresariais da Câmara de Comércio',
      'Treino de competência cultural para equipas',
      'Orientação estratégica para entrada no mercado português'
    ]
  }
]

const CATEGORY_FILTERS = [
  { id: 'all', icon: GlobeAltIcon, label: { en: 'All Experiences', pt: 'Todas as Experiências' } },
  { id: 'tours', icon: MapPin, label: { en: 'Cultural Tours', pt: 'Tours Culturais' } },
  { id: 'fado', icon: Music, label: { en: 'Fado Music', pt: 'Música Fado' } },
  { id: 'calendar', icon: Calendar, label: { en: 'Celebrations', pt: 'Celebrações' } },
  { id: 'business', icon: Building, label: { en: 'Business', pt: 'Negócios' } },
  { id: 'discovery', icon: Compass, label: { en: 'Heritage', pt: 'Património' } },
  { id: 'corporate', icon: Users, label: { en: 'Corporate', pt: 'Corporativo' } }
]

interface PortugueseCulturalHubProps {
  isPortuguese: boolean
  onExploreExperience: (experienceId: string) => void
  onJoinCommunity: () => void
}

export default function PortugueseCulturalHub({ isPortuguese, onExploreExperience, onJoinCommunity }: PortugueseCulturalHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showMembershipBenefits, setShowMembershipBenefits] = useState(false)

  const filteredExperiences = selectedCategory === 'all' 
    ? culturalExperiences
    : culturalExperiences.filter(experience => experience.category === selectedCategory)

  const featuredExperiences = culturalExperiences.filter(exp => exp.featured)

  const getExperienceColor = (color: string) => {
    const colors = {
      coral: 'coral',
      premium: 'premium',
      secondary: 'secondary',
      accent: 'accent',
      primary: 'primary',
      action: 'action'
    }
    return colors[color] || 'gray'
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-coral-50/20 to-premium-50/20">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-coral-100 via-premium-50 to-secondary-100 border border-coral-200">
              <HeartIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Centro Cultural Português de Londres' : 'London Portuguese Cultural Hub'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {isPortuguese ? 'Centro Cultural Português' : 'Portuguese Cultural Hub'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {isPortuguese 
              ? 'Descubra, preserve e celebre a rica cultura portuguesa através de experiências autênticas, conexões comunitárias significativas e tradições preservadas por gerações'
              : 'Discover, preserve, and celebrate rich Portuguese culture through authentic experiences, meaningful community connections, and traditions preserved for generations'
            }
          </p>

          {/* Community Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-coral-600 mb-1">76+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Experiências Culturais' : 'Cultural Experiences'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-600 mb-1">268K+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Portugueses no Reino Unido' : 'Portuguese in UK'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Negócios Autênticos' : 'Authentic Businesses'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-1">600+</div>
              <div className="text-sm text-gray-600">{isPortuguese ? 'Anos de História' : 'Years of History'}</div>
            </div>
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isPortuguese ? 'Experiências Culturais em Destaque' : 'Featured Cultural Experiences'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperiences.map((experience, index) => {
              const IconComponent = experience.icon
              const colorClass = getExperienceColor(experience.color)
              
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${colorClass === 'coral' ? 'from-coral-50 to-coral-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : 'from-secondary-50 to-secondary-100/50'} p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${colorClass === 'coral' ? 'bg-coral-500' : colorClass === 'premium' ? 'bg-premium-500' : 'bg-secondary-500'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className={`text-xs font-medium ${colorClass === 'coral' ? 'text-coral-600' : colorClass === 'premium' ? 'text-premium-600' : 'text-secondary-600'} uppercase tracking-wide`}>
                          {experience.experienceCount} {isPortuguese ? 'experiências' : 'experiences'}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">
                          {isPortuguese ? experience.namePortuguese : experience.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {isPortuguese ? experience.descriptionPortuguese : experience.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{isPortuguese ? 'Popularidade:' : 'Popularity:'}</span>
                        <span className={`text-sm font-medium ${colorClass === 'coral' ? 'text-coral-600' : colorClass === 'premium' ? 'text-premium-600' : 'text-secondary-600'}`}>
                          {experience.popularity}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{isPortuguese ? 'Autenticidade:' : 'Authenticity:'}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`w-3 h-3 ${i < experience.culturalAuthenticity / 2 ? 'text-premium-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h5 className="font-medium text-gray-900 mb-3">
                      {isPortuguese ? 'Impacto na Comunidade:' : 'Community Impact:'}
                    </h5>
                    <p className="text-gray-700 text-sm mb-4">
                      {isPortuguese ? experience.communityImpactPortuguese : experience.communityImpact}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {(isPortuguese ? experience.memberBenefitsPortuguese : experience.memberBenefits).slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Heart className={`w-4 h-4 ${colorClass === 'coral' ? 'text-coral-500' : colorClass === 'premium' ? 'text-premium-500' : 'text-secondary-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-xs">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onExploreExperience(experience.id)}
                      className={`w-full ${colorClass === 'coral' ? 'bg-coral-600 hover:bg-coral-700' : colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : 'bg-secondary-600 hover:bg-secondary-700'} text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm`}
                    >
                      {isPortuguese ? 'Explorar Experiência' : 'Explore Experience'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORY_FILTERS.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-coral-500 to-premium-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-coral-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label[isPortuguese ? 'pt' : 'en']}
                </button>
              )
            })}
          </div>
        </div>

        {/* All Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredExperiences.map((experience, index) => {
            const IconComponent = experience.icon
            const colorClass = getExperienceColor(experience.color)
            
            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`bg-gradient-to-r ${colorClass === 'coral' ? 'from-coral-50 to-coral-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'primary' ? 'from-primary-50 to-primary-100/50' : 'from-action-50 to-action-100/50'} p-4`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 ${colorClass === 'coral' ? 'bg-coral-500' : colorClass === 'premium' ? 'bg-premium-500' : colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'primary' ? 'bg-primary-500' : 'bg-action-500'} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-gray-900">
                        {isPortuguese ? experience.namePortuguese : experience.name}
                      </h4>
                      <span className="text-xs text-gray-600">
                        {experience.experienceCount} {isPortuguese ? 'opções' : 'options'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {isPortuguese ? experience.descriptionPortuguese : experience.description}
                  </p>
                </div>

                <div className="p-4">
                  <button
                    onClick={() => onExploreExperience(experience.id)}
                    className={`w-full ${colorClass === 'coral' ? 'bg-coral-500 hover:bg-coral-600' : colorClass === 'premium' ? 'bg-premium-500 hover:bg-premium-600' : colorClass === 'secondary' ? 'bg-secondary-500 hover:bg-secondary-600' : colorClass === 'accent' ? 'bg-accent-500 hover:bg-accent-600' : colorClass === 'primary' ? 'bg-primary-500 hover:bg-primary-600' : 'bg-action-500 hover:bg-action-600'} text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm`}
                  >
                    {isPortuguese ? 'Explorar' : 'Explore'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Membership Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-coral-500 via-premium-500 to-secondary-500 rounded-3xl p-8 text-center text-white shadow-2xl">
            <HeartIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              {isPortuguese ? 'Junte-se à Comunidade Cultural Portuguesa' : 'Join the Portuguese Cultural Community'}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              {isPortuguese 
                ? 'Torne-se membro da LusoTown e aceda a todas as experiências culturais portuguesas, eventos comunitários exclusivos e uma rede de conectividade que preserva e celebra o seu património português.'
                : 'Become a LusoTown member and access all Portuguese cultural experiences, exclusive community events, and a network of connectivity that preserves and celebrates your Portuguese heritage.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={onJoinCommunity}
                className="bg-white text-coral-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {isPortuguese ? 'Juntar-se Agora' : 'Join Now'}
              </button>
              <button
                onClick={() => setShowMembershipBenefits(!showMembershipBenefits)}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-coral-600 transition-colors"
              >
                {isPortuguese ? 'Ver Benefícios' : 'View Benefits'}
              </button>
            </div>

            {/* Membership Benefits */}
            {showMembershipBenefits && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-white/30"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  <div>
                    <h4 className="font-bold mb-3">{isPortuguese ? 'Acesso Cultural' : 'Cultural Access'}</h4>
                    <ul className="text-sm opacity-90 space-y-1">
                      <li>• {isPortuguese ? '76+ experiências culturais' : '76+ cultural experiences'}</li>
                      <li>• {isPortuguese ? 'Tours autênticos da Pequena Portugal' : 'Authentic Little Portugal tours'}</li>
                      <li>• {isPortuguese ? 'Experiências de Fado íntimas' : 'Intimate Fado experiences'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">{isPortuguese ? 'Rede Empresarial' : 'Business Network'}</h4>
                    <ul className="text-sm opacity-90 space-y-1">
                      <li>• {isPortuguese ? 'Diretório de negócios portugueses' : 'Portuguese business directory'}</li>
                      <li>• {isPortuguese ? 'Networking profissional' : 'Professional networking'}</li>
                      <li>• {isPortuguese ? 'Parcerias da Câmara de Comércio' : 'Chamber of Commerce partnerships'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">{isPortuguese ? 'Comunidade' : 'Community'}</h4>
                    <ul className="text-sm opacity-90 space-y-1">
                      <li>• {isPortuguese ? 'Eventos comunitários exclusivos' : 'Exclusive community events'}</li>
                      <li>• {isPortuguese ? 'Calendário cultural português' : 'Portuguese cultural calendar'}</li>
                      <li>• {isPortuguese ? 'Conexões familiares autênticas' : 'Authentic family connections'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">{isPortuguese ? 'Património' : 'Heritage'}</h4>
                    <ul className="text-sm opacity-90 space-y-1">
                      <li>• {isPortuguese ? 'Preservação cultural' : 'Cultural preservation'}</li>
                      <li>• {isPortuguese ? 'Educação do património' : 'Heritage education'}</li>
                      <li>• {isPortuguese ? 'Tours da Era dos Descobrimentos' : 'Age of Discovery tours'}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}