'use client'

import { motion } from 'framer-motion'
import { BuildingOfficeIcon, MapPinIcon, PhoneIcon, GlobeAltIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Users, Crown, Heart, Coffee, Utensils, ShoppingBag, Wrench, Home, Briefcase } from 'lucide-react'
import { useState } from 'react'

interface PortugueseBusiness {
  id: string
  name: string
  namePortuguese?: string
  category: 'restaurant' | 'bakery' | 'grocery' | 'services' | 'professional' | 'cultural' | 'healthcare' | 'retail'
  description: string
  descriptionPortuguese: string
  address: string
  phone?: string
  website?: string
  email?: string
  establishedYear: number
  communityOwned: boolean
  authenticityScore: number
  specialties: string[]
  specialtiesPortuguese: string[]
  portugueseRegion: string
  portugueseRegionEnglish: string
  communityRole: string
  communityRolePortuguese: string
  awards: string[]
  awardsPortuguese: string[]
  openingHours: string
  priceRange: '£' | '££' | '£££'
  lusoTownPartnered: boolean
  certifications: string[]
  certificationsPortuguese: string[]
}

const portugueseBusinesses: PortugueseBusiness[] = [
  {
    id: 'lisboa-patisserie',
    name: 'Lisboa Patisserie',
    category: 'bakery',
    description: 'London\'s most authentic Portuguese bakery, community-owned for 50+ years, serving traditional pastéis de nata exactly as made in Belém, Portugal.',
    descriptionPortuguese: 'A pastelaria portuguesa mais autêntica de Londres, familiar há mais de 50 anos, servindo pastéis de nata tradicionais exatamente como feitos em Belém, Portugal.',
    address: '57 Golborne Rd, London W10 5NR',
    phone: '+44 20 8968 5242',
    establishedYear: 1973,
    communityOwned: true,
    authenticityScore: 10,
    specialties: [
      'Traditional pastéis de nata (Portuguese custard tarts)',
      'Bola de Berlim (Portuguese donuts)',
      'Traditional Portuguese bread varieties',
      'Regional pastries from all Portuguese provinces',
      'Portuguese coffee blends and preparation'
    ],
    specialtiesPortuguese: [
      'Pastéis de nata tradicionais',
      'Bola de Berlim',
      'Variedades tradicionais de pão português',
      'Pastelaria regional de todas as províncias portuguesas',
      'Misturas e preparação de café português'
    ],
    portugueseRegion: 'Lisboa',
    portugueseRegionEnglish: 'Lisbon',
    communityRole: 'Cultural gathering place for Portuguese families, weekend meeting spot for Portuguese community elders, supplier for Portuguese community events.',
    communityRolePortuguese: 'Local de encontro cultural para comunidade portuguesa, ponto de encontro de fim de semana para anciãos da comunidade portuguesa, fornecedor para eventos da comunidade portuguesa.',
    awards: [
      'Best Portuguese Bakery London 2020-2024',
      'Time Out London Best Pastéis de Nata',
      'Portuguese Embassy Cultural Recognition'
    ],
    awardsPortuguese: [
      'Melhor Pastelaria Portuguesa Londres 2020-2024',
      'Time Out London Melhores Pastéis de Nata',
      'Reconhecimento Cultural da Embaixada Portuguesa'
    ],
    openingHours: 'Mon-Sun 8:00-19:00',
    priceRange: '£',
    lusoTownPartnered: true,
    certifications: ['Traditional Portuguese Recipes Certified', 'Community Heritage Business'],
    certificationsPortuguese: ['Receitas Portuguesas Tradicionais Certificadas', 'Negócio de Património Familiar']
  },
  {
    id: 'a-toca-restaurant',
    name: 'A Toca Restaurant',
    category: 'restaurant',
    description: 'Intimate Portuguese restaurant serving authentic regional cuisine from Northern Portugal, community-run for over 40 years with recipes passed down through generations.',
    descriptionPortuguese: 'Restaurante português íntimo servindo cozinha regional autêntica do Norte de Portugal, familiar há mais de 40 anos com receitas passadas através de gerações.',
    address: '62 Golborne Rd, London W10 5PS',
    phone: '+44 20 8968 8500',
    website: 'www.atoca-restaurant.co.uk',
    establishedYear: 1980,
    communityOwned: true,
    authenticityScore: 10,
    specialties: [
      'Traditional bacalhau preparations (7 different styles)',
      'Cozido à portuguesa (Portuguese stew)',
      'Fresh grilled sardines and Portuguese seafood',
      'Traditional Portuguese wine selection',
      'Homemade Portuguese desserts and liqueurs'
    ],
    specialtiesPortuguese: [
      'Preparações tradicionais de bacalhau (7 estilos diferentes)',
      'Cozido à portuguesa',
      'Sardinhas grelhadas frescas e marisco português',
      'Seleção de vinhos portugueses tradicionais',
      'Sobremesas portuguesas caseiras e licores'
    ],
    portugueseRegion: 'Minho',
    portugueseRegionEnglish: 'Minho (Northern Portugal)',
    communityRole: 'Special occasion restaurant for Portuguese families, venue for Portuguese community celebrations, authentic Portuguese dining experience for cultural events.',
    communityRolePortuguese: 'Restaurante de ocasiões especiais para comunidade portuguesa, local para celebrações da comunidade portuguesa, experiência gastronómica portuguesa autêntica para eventos culturais.',
    awards: [
      'Michelin Guide Recommended',
      'Portuguese Chamber of Commerce Excellence Award',
      'London\'s Best Portuguese Restaurant 2019-2023'
    ],
    awardsPortuguese: [
      'Recomendado pelo Guia Michelin',
      'Prémio de Excelência da Câmara de Comércio Portuguesa',
      'Melhor Restaurante Português de Londres 2019-2023'
    ],
    openingHours: 'Tue-Sun 18:00-23:00',
    priceRange: '££',
    lusoTownPartnered: true,
    certifications: ['Authentic Portuguese Cuisine Certified', 'Community Heritage Recipe Collection'],
    certificationsPortuguese: ['Cozinha Portuguesa Autêntica Certificada', 'Coleção de Receitas de Património Familiar']
  },
  {
    id: 'o-cantinho-de-portugal',
    name: 'O Cantinho de Portugal',
    category: 'restaurant',
    description: 'London\'s most established Portuguese restaurant, serving authentic Portuguese regional cuisine for over 45 years, famous for traditional atmosphere and community hospitality.',
    descriptionPortuguese: 'O restaurante português mais estabelecido de Londres, servindo cozinha regional portuguesa autêntica há mais de 45 anos, famoso pela atmosfera tradicional e hospitalidade familiar.',
    address: '96 Golborne Rd, London W10 5PS',
    phone: '+44 20 8968 6522',
    establishedYear: 1977,
    communityOwned: true,
    authenticityScore: 10,
    specialties: [
      'Traditional Portuguese grilled meats and seafood',
      'Authentic Portuguese regional dishes',
      'Extensive Portuguese wine collection',
      'Traditional Portuguese hospitality and service',
      'Portuguese cultural event hosting'
    ],
    specialtiesPortuguese: [
      'Carnes grelhadas e marisco português tradicional',
      'Pratos regionais portugueses autênticos',
      'Extensa coleção de vinhos portugueses',
      'Hospitalidade e serviço português tradicional',
      'Acolhimento de eventos culturais portugueses'
    ],
    portugueseRegion: 'Centro',
    portugueseRegionEnglish: 'Central Portugal',
    communityRole: 'Central hub for Portuguese community gatherings, venue for Portuguese cultural events, meeting place for Portuguese business networking.',
    communityRolePortuguese: 'Centro principal para encontros da comunidade portuguesa, local para eventos culturais portugueses, local de encontro para networking de negócios portugueses.',
    awards: [
      'Portuguese Embassy Cultural Ambassador Status',
      'London Portuguese Community Excellence Award',
      'Traditional Portuguese Restaurant Certificate'
    ],
    awardsPortuguese: [
      'Estatuto de Embaixador Cultural da Embaixada Portuguesa',
      'Prémio de Excelência da Comunidade Portuguesa de Londres',
      'Certificado de Restaurante Português Tradicional'
    ],
    openingHours: 'Mon-Sun 12:00-15:00, 18:00-23:00',
    priceRange: '££',
    lusoTownPartnered: true,
    certifications: ['Portuguese Cultural Heritage Venue', 'Community Business Excellence'],
    certificationsPortuguese: ['Local de Património Cultural Português', 'Excelência de Negócio Familiar']
  },
  {
    id: 'mercearia-portuguesa',
    name: 'Mercearia Portuguesa',
    category: 'grocery',
    description: 'Authentic Portuguese grocery store providing imported Portuguese specialties, wines, and hard-to-find ingredients for the Portuguese community.',
    descriptionPortuguese: 'Mercearia portuguesa autêntica fornecendo especialidades portuguesas importadas, vinhos e ingredientes difíceis de encontrar para a comunidade portuguesa.',
    address: 'Wandsworth Road, London SW8',
    phone: '+44 20 7622 4088',
    establishedYear: 1985,
    communityOwned: true,
    authenticityScore: 9,
    specialties: [
      'Imported Portuguese wines and spirits',
      'Traditional Portuguese chouriço and charcuterie',
      'Portuguese cheeses and dairy products',
      'Authentic Portuguese pantry staples',
      'Portuguese household and cultural items'
    ],
    specialtiesPortuguese: [
      'Vinhos e destilados portugueses importados',
      'Chouriço tradicional português e charcutaria',
      'Queijos portugueses e produtos lácteos',
      'Produtos básicos portugueses autênticos para despensa',
      'Itens domésticos e culturais portugueses'
    ],
    portugueseRegion: 'Nacional',
    portugueseRegionEnglish: 'All Portuguese Regions',
    communityRole: 'Essential supplier for Portuguese families, source for authentic ingredients for Portuguese restaurants, cultural connection point for Portuguese food traditions.',
    communityRolePortuguese: 'Fornecedor essencial para comunidade portuguesa, fonte de ingredientes autênticos para restaurantes portugueses, ponto de conexão cultural para tradições alimentares portuguesas.',
    awards: [
      'Best Portuguese Grocery London',
      'Portuguese Import Quality Excellence',
      'Community Service Recognition'
    ],
    awardsPortuguese: [
      'Melhor Mercearia Portuguesa de Londres',
      'Excelência de Qualidade de Importação Portuguesa',
      'Reconhecimento de Serviço Comunitário'
    ],
    openingHours: 'Mon-Sat 9:00-19:00, Sun 10:00-17:00',
    priceRange: '££',
    lusoTownPartnered: true,
    certifications: ['Authentic Portuguese Import Certified', 'Community Essential Business'],
    certificationsPortuguese: ['Importação Portuguesa Autêntica Certificada', 'Negócio Essencial da Comunidade']
  },
  {
    id: 'advogados-portugueses-uk',
    name: 'Portuguese Legal Services UK',
    namePortuguese: 'Serviços Jurídicos Portugueses Reino Unido',
    category: 'professional',
    description: 'Specialized legal services for Portuguese community, offering bilingual legal support for immigration, business, property, and civil law matters.',
    descriptionPortuguese: 'Serviços jurídicos especializados para a comunidade portuguesa, oferecendo apoio jurídico bilingue para imigração, negócios, propriedade e questões de direito familiar.',
    address: 'Central London Legal District',
    phone: '+44 20 7123 4567',
    email: 'info@portugueselegal.uk',
    website: 'www.portugueselegalservices.uk',
    establishedYear: 1995,
    communityOwned: false,
    authenticityScore: 8,
    specialties: [
      'Portuguese immigration and citizenship law',
      'Portuguese business incorporation and compliance',
      'Property transactions Portugal-UK',
      'Civil law and Portuguese inheritance',
      'Portuguese community legal education'
    ],
    specialtiesPortuguese: [
      'Lei de imigração e cidadania portuguesa',
      'Incorporação e conformidade de negócios portugueses',
      'Transações imobiliárias Portugal-Reino Unido',
      'Direito familiar e heranças portuguesas',
      'Educação jurídica da comunidade portuguesa'
    ],
    portugueseRegion: 'Especialistas Nacionais',
    portugueseRegionEnglish: 'National Specialists',
    communityRole: 'Essential legal support for Portuguese community, facilitator for Portuguese business establishment, educator for Portuguese legal rights in UK.',
    communityRolePortuguese: 'Apoio jurídico essencial para a comunidade portuguesa, facilitador para estabelecimento de negócios portugueses, educador para direitos jurídicos portugueses no Reino Unido.',
    awards: [
      'Portuguese Chamber of Commerce Legal Excellence',
      'Immigration Law Specialist Recognition',
      'Community Service Legal Award'
    ],
    awardsPortuguese: [
      'Excelência Jurídica da Câmara de Comércio Portuguesa',
      'Reconhecimento de Especialista em Lei de Imigração',
      'Prémio Jurídico de Serviço Comunitário'
    ],
    openingHours: 'Mon-Fri 9:00-18:00',
    priceRange: '£££',
    lusoTownPartnered: true,
    certifications: ['Portuguese Legal Specialist', 'Bilingual Legal Services Certified'],
    certificationsPortuguese: ['Especialista Jurídico Português', 'Serviços Jurídicos Bilingues Certificados']
  },
  {
    id: 'centro-cultural-portugues',
    name: 'Portuguese Cultural Centre London',
    namePortuguese: 'Centro Cultural Português Londres',
    category: 'cultural',
    description: 'Official Portuguese cultural institution offering language classes, cultural events, community services, and preserving Portuguese culture in London.',
    descriptionPortuguese: 'Instituição cultural portuguesa oficial oferecendo aulas de língua, eventos culturais, serviços comunitários e preservando a cultura portuguesa em Londres.',
    address: 'South Lambeth Road, London SW8',
    phone: '+44 20 7735 1777',
    website: 'www.portuguesecentre.org.uk',
    email: 'info@portuguesecentre.org.uk',
    establishedYear: 1968,
    communityOwned: false,
    authenticityScore: 10,
    specialties: [
      'Portuguese language education all levels',
      'Portuguese cultural events and festivals',
      'Community support and integration services',
      'Portuguese heritage preservation programs',
      'Youth and elderly Portuguese community programs'
    ],
    specialtiesPortuguese: [
      'Educação da língua portuguesa todos os níveis',
      'Eventos culturais portugueses e festivais',
      'Serviços de apoio e integração comunitária',
      'Programas de preservação do património português',
      'Programas comunitários portugueses para jovens e idosos'
    ],
    portugueseRegion: 'Centro Nacional',
    portugueseRegionEnglish: 'National Centre',
    communityRole: 'Heart of Portuguese cultural life in London, primary educational resource for Portuguese community, coordinator for major Portuguese cultural events.',
    communityRolePortuguese: 'Coração da vida cultural portuguesa em Londres, recurso educacional primário para a comunidade portuguesa, coordenador para eventos culturais portugueses principais.',
    awards: [
      'Portuguese Government Cultural Excellence',
      'London Cultural Diversity Award',
      'Community Integration Excellence'
    ],
    awardsPortuguese: [
      'Excelência Cultural do Governo Português',
      'Prémio de Diversidade Cultural de Londres',
      'Excelência de Integração Comunitária'
    ],
    openingHours: 'Mon-Fri 9:00-21:00, Sat 9:00-17:00',
    priceRange: '£',
    lusoTownPartnered: true,
    certifications: ['Official Portuguese Cultural Institution', 'Government Recognized Centre'],
    certificationsPortuguese: ['Instituição Cultural Portuguesa Oficial', 'Centro Reconhecido pelo Governo']
  }
]

const BUSINESS_CATEGORIES = [
  { id: 'all', icon: BuildingOfficeIcon, label: { en: 'All Businesses', pt: 'Todos os Negócios' } },
  { id: 'restaurant', icon: Utensils, label: { en: 'Restaurants', pt: 'Restaurantes' } },
  { id: 'bakery', icon: Coffee, label: { en: 'Bakeries', pt: 'Pastelarias' } },
  { id: 'grocery', icon: ShoppingBag, label: { en: 'Groceries', pt: 'Mercearias' } },
  { id: 'services', icon: Wrench, label: { en: 'Services', pt: 'Serviços' } },
  { id: 'professional', icon: Briefcase, label: { en: 'Professional', pt: 'Profissionais' } },
  { id: 'cultural', icon: Crown, label: { en: 'Cultural', pt: 'Culturais' } },
  { id: 'healthcare', icon: Heart, label: { en: 'Healthcare', pt: 'Saúde' } },
  { id: 'retail', icon: Home, label: { en: 'Retail', pt: 'Retalho' } }
]

interface PortugueseBusinessDirectoryProps {
  isPortuguese: boolean
  onContactBusiness: (businessId: string) => void
}

export default function PortugueseBusinessDirectory({ isPortuguese, onContactBusiness }: PortugueseBusinessDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const filteredBusinesses = portugueseBusinesses.filter(business => {
    if (selectedCategory !== 'all' && business.category !== selectedCategory) return false
    return true
  })

  const getCategoryIcon = (category: string) => {
    const categoryData = BUSINESS_CATEGORIES.find(cat => cat.id === category)
    return categoryData ? categoryData.icon : BuildingOfficeIcon
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      restaurant: 'accent',
      bakery: 'coral',
      grocery: 'secondary',
      services: 'primary',
      professional: 'premium',
      cultural: 'action',
      healthcare: 'heart',
      retail: 'neutral'
    }
    return colors[category] || 'gray'
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-accent-50 to-premium-100 border border-secondary-200">
              <BuildingOfficeIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Negócios Portugueses Autênticos' : 'Authentic Portuguese Businesses'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Diretório de Negócios Portugueses' : 'Portuguese Business Directory'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Descubra negócios autênticos portugueses em Londres - desde restaurantes familiares tradicionais a serviços profissionais especializados, todos dedicados a servir e preservar a comunidade portuguesa'
              : 'Discover authentic Portuguese businesses in London - from traditional community restaurants to specialized professional services, all dedicated to serving and preserving the Portuguese community'
            }
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {BUSINESS_CATEGORIES.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white shadow-lg'
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

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBusinesses.map((business, index) => {
            const IconComponent = getCategoryIcon(business.category)
            const colorClass = getCategoryColor(business.category)
            
            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Business Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'coral' ? 'from-coral-50 to-coral-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'primary' ? 'from-primary-50 to-primary-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : 'from-action-50 to-action-100/50'} p-6`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'coral' ? 'bg-coral-500' : colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'primary' ? 'bg-primary-500' : colorClass === 'premium' ? 'bg-premium-500' : 'bg-action-500'} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className={`text-xs font-medium ${colorClass === 'accent' ? 'text-accent-600' : colorClass === 'coral' ? 'text-coral-600' : colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'primary' ? 'text-primary-600' : colorClass === 'premium' ? 'text-premium-600' : 'text-action-600'} uppercase tracking-wide`}>
                            {business.category} • Est. {business.establishedYear}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900">
                            {isPortuguese && business.namePortuguese ? business.namePortuguese : business.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">
                        {isPortuguese ? business.descriptionPortuguese : business.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-gray-500">Authenticity:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`w-3 h-3 ${i < business.authenticityScore / 2 ? 'text-premium-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      {business.communityOwned && (
                        <span className="text-xs bg-heart-100 text-heart-600 px-2 py-1 rounded-full">
                          {isPortuguese ? 'Comunitário' : 'Community'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Content */}
                <div className="p-6">
                  {/* Contact Information */}
                  <div className="mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <PhoneIcon className="w-4 h-4" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GlobeAltIcon className="w-4 h-4" />
                          <span className="text-secondary-600">{business.website}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>{business.openingHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {isPortuguese ? 'Especialidades:' : 'Specialties:'}
                    </h4>
                    <div className="space-y-1">
                      {(isPortuguese ? business.specialtiesPortuguese : business.specialties).slice(0, 3).map((specialty, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Heart className={`w-3 h-3 ${colorClass === 'accent' ? 'text-accent-500' : colorClass === 'coral' ? 'text-coral-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'primary' ? 'text-primary-500' : colorClass === 'premium' ? 'text-premium-500' : 'text-action-500'} mt-1 flex-shrink-0`} />
                          <span className="text-gray-700 text-xs">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Role */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isPortuguese ? 'Papel na Comunidade:' : 'Community Role:'}
                    </h4>
                    <p className="text-gray-700 text-xs">
                      {isPortuguese ? business.communityRolePortuguese : business.communityRole}
                    </p>
                  </div>

                  {/* Awards */}
                  {business.awards.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {isPortuguese ? 'Reconhecimentos:' : 'Recognition:'}
                      </h4>
                      <div className="space-y-1">
                        {(isPortuguese ? business.awardsPortuguese : business.awards).slice(0, 2).map((award, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Crown className="w-3 h-3 text-premium-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-xs">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Button */}
                  <div className="text-center">
                    <button
                      onClick={() => onContactBusiness(business.id)}
                      className={`${colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : colorClass === 'coral' ? 'bg-coral-600 hover:bg-coral-700' : colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : colorClass === 'primary' ? 'bg-primary-600 hover:bg-primary-700' : colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : 'bg-action-600 hover:bg-action-700'} text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm w-full`}
                    >
                      {isPortuguese ? 'Contactar Negócio' : 'Contact Business'}
                    </button>
                  </div>

                  {/* LusoTown Partnership Badge */}
                  {business.lusoTownPartnered && (
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center text-xs bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full">
                        <Users className="w-3 h-3 mr-1" />
                        {isPortuguese ? 'Parceiro LusoTown' : 'LusoTown Partner'}
                      </span>
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
          <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-premium-50 rounded-2xl p-8 border border-secondary-200">
            <BuildingOfficeIcon className="w-16 h-16 mx-auto mb-4 text-secondary-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Adicione o Seu Negócio' : 'Add Your Business'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'É proprietário de um negócio português em Londres? Junte-se ao nosso diretório para conectar-se com a comunidade portuguesa e expandir a sua clientela.'
                : 'Own a Portuguese business in London? Join our directory to connect with the Portuguese community and expand your customer base.'
              }
            </p>
            <button
              onClick={() => onContactBusiness('add-business')}
              className="bg-gradient-to-r from-secondary-600 via-accent-600 to-premium-600 hover:from-secondary-700 hover:via-accent-700 hover:to-premium-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Adicionar Negócio' : 'Add Business'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}