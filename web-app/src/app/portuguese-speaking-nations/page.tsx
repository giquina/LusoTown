"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  GlobeAltIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  InformationCircleIcon,
  SparklesIcon,
  CheckCircleIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useFollowing, FollowableEntity } from '@/context/EnhancedFollowingContext'
import EnhancedFollowButton from '@/components/EnhancedFollowButton'
import Footer from '@/components/Footer'

interface PortugueseNation extends FollowableEntity {
  flag: string
  continent: string
  population: string
  gdp: string
  languages: string[]
  timeZone: string
  independence: string
  culturalHighlights: string[]
  businessSectors: string[]
  touristAttractions: string[]
  diplomaticPresence: {
    embassy: string
    consulate: string
    culturalCenter?: string
  }
  tradeVolume: string
  londonCommunity: {
    size: string
    mainAreas: string[]
    organizations: string[]
  }
}

export default function PortugueseSpeakingNationsPage() {
  const { language } = useLanguage()
  const { isAuthenticated, following } = useFollowing()
  const [selectedNation, setSelectedNation] = useState<string | null>(null)
  const [filterContinent, setFilterContinent] = useState<string>('all')

  const isPortuguese = language === 'pt'

  const nations: PortugueseNation[] = [
    {
      id: 'nation-portugal',
      type: 'portuguese_nation',
      name: 'Portugal',
      title: 'Republic of Portugal',
      description: isPortuguese 
        ? 'Siga Portugal para eventos culturais, oportunidades de negócio e atualizações da comunidade portuguesa em Londres'
        : 'Follow Portugal for cultural events, business opportunities, and Portuguese community updates in London',
      imageUrl: '/images/nations/portugal-landscape.jpg',
      flag: '🇵🇹',
      location: 'Europe',
      continent: 'Europe',
      population: '10.3 million',
      gdp: '$249.9 billion',
      languages: ['Portuguese'],
      timeZone: 'WET (UTC+0)',
      independence: '1143',
      followers: 2840,
      isVerified: true,
      countryCode: 'PT',
      capital: 'Lisbon',
      language: 'Portuguese',
      currency: 'EUR',
      culturalFocus: ['Fado', 'Port Wine', 'Azulejos', 'Maritime Heritage', 'Literature'],
      culturalHighlights: ['Fado Music', 'Pastéis de Nata', 'Azulejo Tiles', 'Port Wine', 'Jerónimos Monastery'],
      businessSectors: ['Tourism', 'Wine', 'Textiles', 'Technology', 'Renewable Energy'],
      touristAttractions: ['Lisbon', 'Porto', 'Algarve', 'Óbidos', 'Sintra'],
      tradeVolume: '£2.1 billion (2023)',
      upcomingEvents: 12,
      businessOpportunities: 28,
      diplomaticPresence: {
        embassy: 'Embassy of Portugal, London',
        consulate: 'Portuguese Consulate General',
        culturalCenter: 'Instituto Camões London'
      },
      londonCommunity: {
        size: '95,000+',
        mainAreas: ['Stockwell', 'Vauxhall', 'Lambeth', 'Tufnell Park'],
        organizations: ['Portuguese Cultural Centre', 'Casa do Bacalhau', 'Portuguese Community Association']
      },
      benefits: [
        'Portuguese Embassy event invitations',
        'Cultural festival notifications', 
        'Business networking opportunities',
        'Tourism and travel updates',
        'Language workshops'
      ]
    },
    {
      id: 'nation-brazil',
      type: 'portuguese_nation',
      name: 'Brazil',
      title: 'Federative Republic of Brazil',
      description: isPortuguese
        ? 'Conecte-se com a cultura brasileira, eventos de Carnaval e oportunidades de negócio em Londres'
        : 'Connect with Brazilian culture, Carnival events, and business opportunities in London',
      imageUrl: '/images/nations/brazil-landscape.jpg',
      flag: '🇧🇷',
      location: 'South America',
      continent: 'South America',
      population: '215.3 million',
      gdp: '$2.13 trillion',
      languages: ['Portuguese'],
      timeZone: 'BRT (UTC-3)',
      independence: '1822',
      followers: 1950,
      isVerified: true,
      countryCode: 'BR',
      capital: 'Brasília',
      language: 'Portuguese (Brazilian)',
      currency: 'BRL',
      culturalFocus: ['Carnival', 'Samba', 'Capoeira', 'Football', 'Bossa Nova'],
      culturalHighlights: ['Carnival', 'Samba', 'Capoeira', 'Christ the Redeemer', 'Amazon Rainforest'],
      businessSectors: ['Agriculture', 'Mining', 'Manufacturing', 'Oil & Gas', 'Technology'],
      touristAttractions: ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Amazon', 'Iguazu Falls'],
      tradeVolume: '£4.8 billion (2023)',
      upcomingEvents: 8,
      businessOpportunities: 15,
      diplomaticPresence: {
        embassy: 'Embassy of Brazil, London',
        consulate: 'Brazilian Consulate General',
        culturalCenter: 'Casa do Brasil'
      },
      londonCommunity: {
        size: '45,000+',
        mainAreas: ['Brent', 'Hounslow', 'Ealing', 'Camden'],
        organizations: ['Casa do Brasil', 'Brazilian Community Centre', 'Capoeira London']
      },
      benefits: [
        'Carnival celebration invites',
        'Brazilian business networking',
        'Capoeira and dance workshops',
        'Football viewing parties',
        'Brazilian cuisine events'
      ]
    },
    {
      id: 'nation-angola',
      type: 'portuguese_nation',
      name: 'Angola',
      title: 'Republic of Angola',
      description: isPortuguese
        ? 'Descubra a cultura angolana, música e oportunidades de negócio em Londres'
        : 'Discover Angolan culture, music, and business opportunities in London',
      imageUrl: '/images/nations/angola-landscape.jpg',
      flag: '🇦🇴',
      location: 'Africa',
      continent: 'Africa',
      population: '34.5 million',
      gdp: '$106.4 billion',
      languages: ['Portuguese'],
      timeZone: 'WAT (UTC+1)',
      independence: '1975',
      followers: 680,
      isVerified: true,
      countryCode: 'AO',
      capital: 'Luanda',
      language: 'Portuguese',
      currency: 'AOA',
      culturalFocus: ['Semba', 'Kizomba', 'Traditional Crafts', 'Oil Industry'],
      culturalHighlights: ['Kizomba', 'Semba', 'Traditional Masks', 'Luanda Architecture'],
      businessSectors: ['Oil & Gas', 'Mining', 'Agriculture', 'Construction', 'Telecommunications'],
      touristAttractions: ['Luanda', 'Kalandula Falls', 'Kissama National Park', 'Benguela'],
      tradeVolume: '£1.2 billion (2023)',
      upcomingEvents: 4,
      businessOpportunities: 8,
      diplomaticPresence: {
        embassy: 'Embassy of Angola, London',
        consulate: 'Angolan Consulate General'
      },
      londonCommunity: {
        size: '18,000+',
        mainAreas: ['Peckham', 'Tottenham', 'Hackney', 'Croydon'],
        organizations: ['Angolan Community UK', 'Kizomba London', 'Angola Cultural Centre']
      },
      benefits: [
        'Angolan cultural events',
        'Kizomba dance workshops', 
        'Business networking opportunities',
        'Music and art celebrations'
      ]
    },
    {
      id: 'nation-mozambique',
      type: 'portuguese_nation',
      name: 'Mozambique',
      title: 'Republic of Mozambique',
      description: isPortuguese
        ? 'Conecte-se com a cultura moçambicana e oportunidades em Londres'
        : 'Connect with Mozambican culture and opportunities in London',
      imageUrl: '/images/nations/mozambique-landscape.jpg',
      flag: '🇲🇿',
      location: 'Africa',
      continent: 'Africa',
      population: '32.4 million',
      gdp: '$16.9 billion',
      languages: ['Portuguese'],
      timeZone: 'CAT (UTC+2)',
      independence: '1975',
      followers: 420,
      isVerified: true,
      countryCode: 'MZ',
      capital: 'Maputo',
      language: 'Portuguese',
      currency: 'MZN',
      culturalFocus: ['Marrabenta', 'Traditional Textiles', 'Coastal Culture'],
      culturalHighlights: ['Marrabenta Music', 'Traditional Textiles', 'Island Culture', 'Seafood Cuisine'],
      businessSectors: ['Agriculture', 'Natural Gas', 'Mining', 'Tourism', 'Fishing'],
      touristAttractions: ['Maputo', 'Bazaruto Archipelago', 'Gorongosa National Park', 'Ilha de Moçambique'],
      tradeVolume: '£450 million (2023)',
      upcomingEvents: 3,
      businessOpportunities: 5,
      diplomaticPresence: {
        embassy: 'High Commission of Mozambique, London',
        consulate: 'Mozambican Consulate General'
      },
      londonCommunity: {
        size: '12,000+',
        mainAreas: ['Newham', 'Tower Hamlets', 'Southwark', 'Lewisham'],
        organizations: ['Mozambican Community UK', 'Marrabenta Cultural Group']
      },
      benefits: [
        'Cultural celebrations',
        'Business opportunities',
        'Community gatherings',
        'Traditional music events'
      ]
    },
    {
      id: 'nation-cape-verde',
      type: 'portuguese_nation',
      name: 'Cape Verde',
      title: 'Republic of Cape Verde',
      description: isPortuguese
        ? 'Explore a cultura cabo-verdiana, morna e oportunidades em Londres'
        : 'Explore Cape Verdean culture, morna music, and opportunities in London',
      imageUrl: '/images/nations/cape-verde-landscape.jpg',
      flag: '🇨🇻',
      location: 'Africa',
      continent: 'Africa',
      population: '563,000',
      gdp: '$2.1 billion',
      languages: ['Portuguese', 'Cape Verdean Creole'],
      timeZone: 'CVT (UTC-1)',
      independence: '1975',
      followers: 320,
      isVerified: true,
      countryCode: 'CV',
      capital: 'Praia',
      language: 'Portuguese',
      currency: 'CVE',
      culturalFocus: ['Morna', 'Funaná', 'Island Culture', 'Maritime Heritage'],
      culturalHighlights: ['Morna Music', 'Funaná Dance', 'Cesária Évora Legacy', 'Island Festivals'],
      businessSectors: ['Tourism', 'Fishing', 'Renewable Energy', 'Services', 'Remittances'],
      touristAttractions: ['Sal Island', 'Santiago', 'Mindelo', 'Fogo Island'],
      tradeVolume: '£85 million (2023)',
      upcomingEvents: 2,
      businessOpportunities: 3,
      diplomaticPresence: {
        embassy: 'Embassy of Cape Verde, London',
        consulate: 'Cape Verdean Consulate'
      },
      londonCommunity: {
        size: '8,500+',
        mainAreas: ['Brixton', 'Elephant and Castle', 'Greenwich', 'Woolwich'],
        organizations: ['Cape Verdean Community UK', 'Morna Cultural Centre']
      },
      benefits: [
        'Morna music events',
        'Island cultural celebrations',
        'Community networking',
        'Cultural workshops'
      ]
    },
    {
      id: 'nation-guinea-bissau',
      type: 'portuguese_nation',
      name: 'Guinea-Bissau',
      title: 'Republic of Guinea-Bissau',
      description: isPortuguese
        ? 'Descubra a cultura da Guiné-Bissau e a comunidade em Londres'
        : 'Discover Guinea-Bissau culture and community in London',
      imageUrl: '/images/nations/guinea-bissau-landscape.jpg',
      flag: '🇬🇼',
      location: 'Africa',
      continent: 'Africa',
      population: '2.0 million',
      gdp: '$1.6 billion',
      languages: ['Portuguese'],
      timeZone: 'GMT (UTC+0)',
      independence: '1973',
      followers: 180,
      isVerified: true,
      countryCode: 'GW',
      capital: 'Bissau',
      language: 'Portuguese',
      currency: 'XOF',
      culturalFocus: ['Traditional Music', 'Mask Ceremonies', 'Oral Traditions'],
      culturalHighlights: ['Gumbe Music', 'Traditional Masks', 'Rice Culture', 'Bijagós Islands'],
      businessSectors: ['Agriculture', 'Fishing', 'Cashew Nuts', 'Forestry'],
      touristAttractions: ['Bijagós Archipelago', 'Bissau', 'Cacheu', 'Orango Islands'],
      tradeVolume: '£25 million (2023)',
      upcomingEvents: 1,
      businessOpportunities: 2,
      diplomaticPresence: {
        embassy: 'Embassy of Guinea-Bissau, London',
        consulate: 'Guinea-Bissau Consulate'
      },
      londonCommunity: {
        size: '3,200+',
        mainAreas: ['Tottenham', 'Haringey', 'Barking', 'Dagenham'],
        organizations: ['Guinea-Bissau Community UK']
      },
      benefits: [
        'Cultural preservation events',
        'Community support',
        'Traditional celebrations',
        'Music and arts'
      ]
    }
  ]

  const continents = ['all', 'Europe', 'South America', 'Africa']
  const filteredNations = filterContinent === 'all' 
    ? nations 
    : nations.filter(nation => nation.continent === filterContinent)

  const getContinentStats = () => {
    const stats = {
      Europe: nations.filter(n => n.continent === 'Europe').length,
      'South America': nations.filter(n => n.continent === 'South America').length,
      Africa: nations.filter(n => n.continent === 'Africa').length
    }
    return stats
  }

  const getTotalFollowers = () => {
    return nations.reduce((total, nation) => total + nation.followers, 0)
  }

  const getFollowingCount = () => {
    return following.filter(f => f.entity.type === 'portuguese_nation').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                  <GlobeAltIcon className="w-12 h-12" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                    {isPortuguese ? 'Países Lusófonos' : 'Portuguese-Speaking Nations'}
                  </h1>
                  <p className="text-xl opacity-90">
                    {isPortuguese 
                      ? 'Conecte-se com comunidades portuguesas globais'
                      : 'Connect with global Portuguese communities'
                    }
                  </p>
                </div>
              </div>

              <p className="text-xl leading-relaxed mb-8 opacity-90">
                {isPortuguese
                  ? 'Siga países lusófonos para receber atualizações sobre eventos culturais, oportunidades de negócio, atividades de embaixadas e conectar-se com comunidades em Londres.'
                  : 'Follow Portuguese-speaking nations to receive updates on cultural events, business opportunities, embassy activities, and connect with communities in London.'
                }
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{nations.length}</div>
                  <div className="text-sm opacity-80">{isPortuguese ? 'Países' : 'Countries'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{getTotalFollowers().toLocaleString()}</div>
                  <div className="text-sm opacity-80">{isPortuguese ? 'Seguidores' : 'Followers'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{getFollowingCount()}</div>
                  <div className="text-sm opacity-80">{isPortuguese ? 'A Seguir' : 'Following'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">280M+</div>
                  <div className="text-sm opacity-80">{isPortuguese ? 'Falantes' : 'Speakers'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Follow Section */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">
                {isPortuguese ? 'Por que Seguir Países Lusófonos?' : 'Why Follow Portuguese-Speaking Nations?'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: BellIcon,
                    title: isPortuguese ? 'Notificações Culturais' : 'Cultural Notifications',
                    description: isPortuguese 
                      ? 'Receba alertas sobre festivais, celebrações nacionais e eventos culturais'
                      : 'Get alerts about festivals, national celebrations, and cultural events'
                  },
                  {
                    icon: CalendarDaysIcon,
                    title: isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events',
                    description: isPortuguese
                      ? 'Acesso prioritário a eventos de embaixadas e centros culturais'
                      : 'Priority access to embassy events and cultural center activities'
                  },
                  {
                    icon: BriefcaseIcon,
                    title: isPortuguese ? 'Oportunidades de Negócio' : 'Business Opportunities',
                    description: isPortuguese
                      ? 'Networking empresarial e oportunidades de investimento'
                      : 'Business networking and investment opportunities'
                  },
                  {
                    icon: UserGroupIcon,
                    title: isPortuguese ? 'Conexões Comunitárias' : 'Community Connections',
                    description: isPortuguese
                      ? 'Conecte-se com nacionais e organizações em Londres'
                      : 'Connect with nationals and organizations in London'
                  }
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 rounded-2xl bg-primary-50 border border-primary-100"
                    >
                      <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-primary-900 mb-2">{benefit.title}</h3>
                      <p className="text-primary-700 text-sm">{benefit.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-primary-50 border-b border-primary-200">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    {isPortuguese ? 'Filtrar por Continente' : 'Filter by Continent'}
                  </h3>
                  <p className="text-primary-600 text-sm">
                    {isPortuguese 
                      ? `Mostrando ${filteredNations.length} de ${nations.length} países`
                      : `Showing ${filteredNations.length} of ${nations.length} countries`
                    }
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {continents.map((continent) => (
                    <button
                      key={continent}
                      onClick={() => setFilterContinent(continent)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filterContinent === continent
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {continent === 'all' 
                        ? (isPortuguese ? 'Todos' : 'All')
                        : continent
                      }
                      {continent !== 'all' && (
                        <span className="ml-2 text-xs opacity-75">
                          ({getContinentStats()[continent as keyof ReturnType<typeof getContinentStats>]})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nations Grid */}
        <section className="py-16">
          <div className="container-width">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNations.map((nation, index) => (
                  <motion.div
                    key={nation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Nation Header */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">{nation.flag}</span>
                            <div>
                              <h3 className="font-bold text-xl">{nation.name}</h3>
                              <p className="text-sm opacity-90">{nation.continent}</p>
                            </div>
                          </div>
                          {nation.isVerified && (
                            <CheckCircleIcon className="w-6 h-6 text-white" />
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPinIcon className="w-4 h-4" />
                              {nation.capital}
                            </div>
                            <div className="flex items-center gap-2">
                              <CurrencyDollarIcon className="w-4 h-4" />
                              {nation.currency}
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-semibold">{nation.followers.toLocaleString()}</div>
                            <div className="opacity-80">{isPortuguese ? 'seguidores' : 'followers'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nation Content */}
                    <div className="p-6">
                      <p className="text-primary-700 text-sm mb-4 line-clamp-2">
                        {nation.description}
                      </p>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-primary-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <UserGroupIcon className="w-4 h-4 text-primary-600" />
                            <span className="text-xs font-medium text-primary-800">
                              {isPortuguese ? 'População' : 'Population'}
                            </span>
                          </div>
                          <div className="font-semibold text-primary-900">{nation.population}</div>
                        </div>
                        <div className="bg-secondary-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <BuildingOfficeIcon className="w-4 h-4 text-secondary-600" />
                            <span className="text-xs font-medium text-secondary-800">
                              {isPortuguese ? 'Comunidade Londres' : 'London Community'}
                            </span>
                          </div>
                          <div className="font-semibold text-secondary-900">{nation.londonCommunity.size}</div>
                        </div>
                      </div>

                      {/* Quick Benefits */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary-800 mb-2">
                          {isPortuguese ? 'Ao seguir receberá:' : 'By following you get:'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {nation.benefits?.slice(0, 3).map((benefit, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Follow Actions */}
                      <div className="space-y-3">
                        <EnhancedFollowButton 
                          entity={nation}
                          variant="default"
                          className="w-full justify-center"
                          showBenefits={false}
                        />
                        
                        <div className="flex items-center justify-between text-xs text-primary-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <CalendarDaysIcon className="w-3 h-3" />
                              {nation.upcomingEvents} {isPortuguese ? 'eventos' : 'events'}
                            </span>
                            <span className="flex items-center gap-1">
                              <BriefcaseIcon className="w-3 h-3" />
                              {nation.businessOpportunities} {isPortuguese ? 'oportunidades' : 'opportunities'}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedNation(selectedNation === nation.id ? null : nation.id)}
                            className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                          >
                            <InformationCircleIcon className="w-4 h-4" />
                            {isPortuguese ? 'Detalhes' : 'Details'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedNation === nation.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-primary-100 bg-primary-25"
                        >
                          <div className="p-6 space-y-4">
                            {/* Cultural Highlights */}
                            <div>
                              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                                <SparklesIcon className="w-4 h-4" />
                                {isPortuguese ? 'Destaques Culturais' : 'Cultural Highlights'}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {nation.culturalHighlights.map((highlight, index) => (
                                  <span 
                                    key={index}
                                    className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* London Community */}
                            <div>
                              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" />
                                {isPortuguese ? 'Comunidade em Londres' : 'London Community'}
                              </h4>
                              <div className="text-sm text-primary-700 space-y-1">
                                <div>
                                  <strong>{isPortuguese ? 'Principais áreas:' : 'Main areas:'}</strong>{' '}
                                  {nation.londonCommunity.mainAreas.join(', ')}
                                </div>
                                <div>
                                  <strong>{isPortuguese ? 'Organizações:' : 'Organizations:'}</strong>{' '}
                                  {nation.londonCommunity.organizations.join(', ')}
                                </div>
                              </div>
                            </div>

                            {/* Diplomatic Presence */}
                            <div>
                              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                                <BuildingOfficeIcon className="w-4 h-4" />
                                {isPortuguese ? 'Presença Diplomática' : 'Diplomatic Presence'}
                              </h4>
                              <div className="text-sm text-primary-700 space-y-1">
                                <div>{nation.diplomaticPresence.embassy}</div>
                                <div>{nation.diplomaticPresence.consulate}</div>
                                {nation.diplomaticPresence.culturalCenter && (
                                  <div>{nation.diplomaticPresence.culturalCenter}</div>
                                )}
                              </div>
                            </div>

                            {/* Business Info */}
                            <div>
                              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                                <ChartBarIcon className="w-4 h-4" />
                                {isPortuguese ? 'Comércio UK' : 'UK Trade'}
                              </h4>
                              <div className="text-sm text-primary-700">
                                <div><strong>GDP:</strong> {nation.gdp}</div>
                                <div><strong>{isPortuguese ? 'Volume comercial:' : 'Trade volume:'}</strong> {nation.tradeVolume}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Authentication CTA */}
        {!isAuthenticated && (
          <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <div className="container-width text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  {isPortuguese ? 'Junte-se à Comunidade Lusófona' : 'Join the Portuguese-Speaking Community'}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  {isPortuguese
                    ? 'Crie conta gratuita para seguir países, receber notificações e conectar-se com a comunidade portuguesa em Londres.'
                    : 'Create a free account to follow countries, receive notifications, and connect with the Portuguese community in London.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/signup"
                    className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg"
                  >
                    {isPortuguese ? 'Criar Conta Gratuita' : 'Create Free Account'}
                  </a>
                  <a
                    href="/login"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-primary-600 transition-colors"
                  >
                    {isPortuguese ? 'Fazer Login' : 'Sign In'}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      
      <Footer />
    </div>
  )
}