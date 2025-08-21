'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalPortuguese } from '@/context/GlobalPortugueseContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PortugueseCountry, 
  DiasporaFamily,
  PortugueseProfessional,
  GlobalPortugueseNetwork,
  SuccessStory,
  CommunityGrowthMetrics
} from '@/types/GlobalPortugueseExpansion'

interface DiasporaNetworkProps {
  showStats?: boolean
  showMap?: boolean
  enableConnections?: boolean
  maxConnections?: number
}

export default function DiasporaNetwork({ 
  showStats = true,
  showMap = true,
  enableConnections = true,
  maxConnections = 20
}: DiasporaNetworkProps) {
  const { 
    currentCountry, 
    diasporaFamilies,
    professionalNetwork,
    communityMetrics,
    formatCurrency,
    formatDate,
    connectWithFamily
  } = useGlobalPortuguese()
  const { t } = useLanguage()

  const [selectedView, setSelectedView] = useState<'network' | 'families' | 'professionals' | 'stories'>('network')
  const [selectedRegion, setSelectedRegion] = useState<PortugueseCountry | 'all'>('all')
  const [connectionRequests, setConnectionRequests] = useState<string[]>([])
  const [showConnectionModal, setShowConnectionModal] = useState<string | null>(null)
  
  // Mock global network data
  const globalNetwork: GlobalPortugueseNetwork = {
    totalMembers: 425000,
    activeCountries: ['portugal', 'brazil', 'usa', 'canada', 'uk', 'france', 'germany', 'australia', 'south-africa'],
    monthlyActiveUsers: 89500,
    eventsHostedMonthly: 245,
    businessPartnerships: 1200,
    educationalPartnerships: 180,
    culturalPreservationProjects: 65,
    crossBorderConnections: 15600,
    languageLearners: 28000,
    mentorshipConnections: 3400,
    familyReunifications: 127,
    successStories: []
  }

  // Mock success stories
  const mockSuccessStories: SuccessStory[] = [
    {
      id: 'family-reunion-azores',
      type: 'personal',
      title: 'Three Generations Reunite in the Azores',
      description: 'The Santos family from Toronto connected with their Portuguese cousins through LusoTown and organized their first family reunion in 40 years in São Miguel, Azores.',
      participants: ['Santos Family - Toronto', 'Medeiros Family - São Miguel'],
      countries: ['canada', 'portugal'],
      outcome: 'Successful family reunion with 45 family members from 4 countries',
      impact: 'Strengthened family bonds and cultural identity for younger generations',
      dateAchieved: new Date('2025-07-15'),
      testimonials: [
        'LusoTown helped us find family we never knew existed. The reunion was magical!',
        'Our children finally understood their Portuguese heritage.'
      ],
      mediaAttention: ['CBC Portuguese Community Feature', 'Açoriano Oriental Newspaper']
    },
    {
      id: 'business-partnership-uk-brazil',
      type: 'business',
      title: 'UK-Brazil Portuguese Business Partnership',
      description: 'A Portuguese restaurant owner in London partnered with a Brazilian food distributor through LusoTown professional network.',
      participants: ['Maria\'s Portuguese Kitchen - London', 'Sabores do Brasil - São Paulo'],
      countries: ['uk', 'brazil'],
      outcome: 'Successful business partnership with 300% increase in authentic ingredient imports',
      impact: '£150,000 annual revenue increase and job creation for 8 Portuguese speakers',
      dateAchieved: new Date('2025-06-20'),
      testimonials: [
        'The partnership transformed our menu and brought authentic flavors to London',
        'We found the perfect partner who understands our quality standards'
      ]
    },
    {
      id: 'cultural-preservation-goa',
      type: 'cultural',
      title: 'Digital Archive of Goan-Portuguese Heritage',
      description: 'Collaboration between Portuguese communities in Goa, Lisbon, and London to digitize and preserve Goan-Portuguese cultural artifacts.',
      participants: ['Goa Heritage Foundation', 'Instituto Oriental Lisboa', 'Portuguese Cultural Centre London'],
      countries: ['india-goa', 'portugal', 'uk'],
      outcome: 'Digitized 2,500 historical documents and 800 cultural artifacts',
      impact: 'Preserved rare Goan-Portuguese cultural heritage for future generations',
      dateAchieved: new Date('2025-05-10'),
      testimonials: [
        'This project saved irreplaceable pieces of our shared history',
        'Young people can now access their heritage digitally from anywhere'
      ]
    }
  ]

  // Mock regional metrics
  const regionalMetrics: Record<PortugueseCountry, CommunityGrowthMetrics> = {
    'uk': {
      countryCode: 'uk',
      totalPortugueseSpeakers: 400000,
      platformUsers: 25000,
      growthRate: 15.2,
      engagementRate: 68,
      eventAttendance: 1200,
      businessConnections: 340,
      culturalParticipation: 78,
      languageRetention: 65,
      intergenerationalTransmission: 45,
      communityCohesin: 72,
      averageSessionTime: 18.5,
      monthlyActiveUsers: 15800,
      userRetentionRate: 83,
      referralRate: 28
    },
    'usa': {
      countryCode: 'usa',
      totalPortugueseSpeakers: 1500000,
      platformUsers: 95000,
      growthRate: 22.8,
      engagementRate: 71,
      eventAttendance: 4500,
      businessConnections: 850,
      culturalParticipation: 65,
      languageRetention: 58,
      intergenerationalTransmission: 52,
      communityCohesin: 69,
      averageSessionTime: 16.3,
      monthlyActiveUsers: 42000,
      userRetentionRate: 79,
      referralRate: 31
    },
    // Add more countries as needed...
    'portugal': {} as CommunityGrowthMetrics,
    'brazil': {} as CommunityGrowthMetrics,
    'canada': {} as CommunityGrowthMetrics,
    'france': {} as CommunityGrowthMetrics,
    'germany': {} as CommunityGrowthMetrics,
    'switzerland': {} as CommunityGrowthMetrics,
    'luxembourg': {} as CommunityGrowthMetrics,
    'australia': {} as CommunityGrowthMetrics,
    'south-africa': {} as CommunityGrowthMetrics,
    'angola': {} as CommunityGrowthMetrics,
    'mozambique': {} as CommunityGrowthMetrics,
    'cape-verde': {} as CommunityGrowthMetrics,
    'macau': {} as CommunityGrowthMetrics,
    'east-timor': {} as CommunityGrowthMetrics,
    'india-goa': {} as CommunityGrowthMetrics,
    'venezuela': {} as CommunityGrowthMetrics,
    'argentina': {} as CommunityGrowthMetrics
  }

  const handleConnectionRequest = async (targetId: string, type: 'family' | 'professional') => {
    setConnectionRequests(prev => [...prev, targetId])
    // Mock API call
    setTimeout(() => {
      setConnectionRequests(prev => prev.filter(id => id !== targetId))
      // Show success notification
    }, 2000)
  }

  const WorldMap = () => (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-6 text-center">Global Portuguese Network</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {globalNetwork.activeCountries.map(country => {
          const metrics = regionalMetrics[country]
          const flag = country === 'portugal' ? '🇵🇹' : 
                     country === 'brazil' ? '🇧🇷' :
                     country === 'usa' ? '🇺🇸' :
                     country === 'canada' ? '🇨🇦' :
                     country === 'uk' ? '🇬🇧' :
                     country === 'france' ? '🇫🇷' :
                     country === 'germany' ? '🇩🇪' :
                     country === 'australia' ? '🇦🇺' :
                     country === 'south-africa' ? '🇿🇦' : '🌍'
          
          return (
            <motion.div
              key={country}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedRegion(country)}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{flag}</div>
                <h4 className="font-semibold text-sm mb-1">
                  {country.charAt(0).toUpperCase() + country.slice(1).replace('-', ' ')}
                </h4>
                {metrics.platformUsers && (
                  <p className="text-xs text-blue-100">
                    {metrics.platformUsers.toLocaleString()} users
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-300">{globalNetwork.totalMembers.toLocaleString()}</div>
          <div className="text-sm text-blue-200">Total Members</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-300">{globalNetwork.monthlyActiveUsers.toLocaleString()}</div>
          <div className="text-sm text-blue-200">Monthly Active</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-300">{globalNetwork.crossBorderConnections.toLocaleString()}</div>
          <div className="text-sm text-blue-200">Cross-Border Connections</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-300">{globalNetwork.eventsHostedMonthly}</div>
          <div className="text-sm text-blue-200">Monthly Events</div>
        </div>
      </div>
    </div>
  )

  const NetworkStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { label: 'Business Partnerships', value: globalNetwork.businessPartnerships, color: 'blue' },
        { label: 'Educational Partnerships', value: globalNetwork.educationalPartnerships, color: 'green' },
        { label: 'Cultural Projects', value: globalNetwork.culturalPreservationProjects, color: 'purple' },
        { label: 'Family Reunifications', value: globalNetwork.familyReunifications, color: 'red' }
      ].map(stat => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className={`text-3xl font-bold mb-2 text-${stat.color}-600`}>
            {stat.value.toLocaleString()}
          </div>
          <div className="text-sm text-secondary-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )

  const SuccessStories = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Success Stories</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        {mockSuccessStories.map(story => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  story.type === 'business' ? 'bg-blue-100 text-blue-800' :
                  story.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                  story.type === 'personal' ? 'bg-green-100 text-green-800' :
                  'bg-secondary-100 text-secondary-800'
                }`}>
                  {story.type}
                </span>
                <span className="text-sm text-gray-500">{formatDate(story.dateAchieved)}</span>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h4>
              <p className="text-secondary-700 mb-4">{story.description}</p>

              <div className="mb-4">
                <p className="text-sm text-secondary-600 mb-2">Countries Involved:</p>
                <div className="flex space-x-2">
                  {story.countries.map(country => (
                    <span key={country} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                      {country.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Impact:</p>
                <p className="text-sm text-secondary-700">{story.impact}</p>
              </div>

              {story.testimonials.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Testimonial:</p>
                  <p className="text-sm text-secondary-700 italic">"{story.testimonials[0]}"</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const ConnectedFamilies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Diaspora Families</h3>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value as PortugueseCountry | 'all')}
          className="px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Regions</option>
          {globalNetwork.activeCountries.map(country => (
            <option key={country} value={country}>
              {country.charAt(0).toUpperCase() + country.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diasporaFamilies.slice(0, maxConnections).map(family => (
          <div key={family.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{family.familyName}</h4>
                <p className="text-sm text-secondary-600">From {family.originRegion}</p>
                <p className="text-xs text-gray-500">{family.generationsSinceMigration} generations</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${
                family.connectionToPortugal === 'strong' ? 'bg-green-100 text-green-800' :
                family.connectionToPortugal === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {family.connectionToPortugal}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-secondary-600 mb-1">Language Status:</p>
              <span className={`px-2 py-1 text-xs rounded ${
                family.languageStatus === 'fluent' ? 'bg-green-100 text-green-800' :
                family.languageStatus === 'conversational' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {family.languageStatus}
              </span>
            </div>

            {enableConnections && (
              <button
                onClick={() => handleConnectionRequest(family.id, 'family')}
                disabled={connectionRequests.includes(family.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                  connectionRequests.includes(family.id)
                    ? 'bg-secondary-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white hover:shadow-lg'
                }`}
              >
                {connectionRequests.includes(family.id) ? 'Connecting...' : 'Connect'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const NetworkProfessionals = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Professional Network</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalNetwork.slice(0, maxConnections).map(professional => (
          <div key={professional.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{professional.name}</h4>
                <p className="text-sm text-secondary-600">{professional.profession}</p>
                <p className="text-xs text-gray-500">{professional.location.city}, {professional.location.country.toUpperCase()}</p>
              </div>
              {professional.availableForMentoring && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  Mentoring
                </span>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-secondary-600 mb-2">Expertise:</p>
              <div className="flex flex-wrap gap-1">
                {professional.expertise.slice(0, 2).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {enableConnections && (
              <button
                onClick={() => handleConnectionRequest(professional.id, 'professional')}
                disabled={connectionRequests.includes(professional.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                  connectionRequests.includes(professional.id)
                    ? 'bg-secondary-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white hover:shadow-lg'
                }`}
              >
                {connectionRequests.includes(professional.id) ? 'Connecting...' : 'Connect'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Global Portuguese Diaspora Network
        </h1>
        <p className="text-xl text-secondary-600 max-w-4xl mx-auto">
          Connect with Portuguese speakers worldwide - families preserving heritage, 
          professionals sharing expertise, and communities celebrating culture
        </p>
      </div>

      {/* World Map */}
      {showMap && <WorldMap />}

      {/* Navigation */}
      <div className="flex justify-center">
        <div className="bg-secondary-100 rounded-lg p-1 flex space-x-1">
          {[
            { id: 'network', label: 'Network Overview', icon: '🌐' },
            { id: 'families', label: 'Families', icon: '👨‍👩‍👧‍👦' },
            { id: 'professionals', label: 'Professionals', icon: '💼' },
            { id: 'stories', label: 'Success Stories', icon: '🌟' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                selectedView === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-secondary-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedView === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {showStats && <NetworkStats />}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Language Preservation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">Active Language Learners</span>
                    <span className="font-semibold text-action-600">{globalNetwork.languageLearners.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className="bg-action-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-sm text-secondary-600">68% growth in Portuguese language learning across diaspora communities</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cultural Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">Cultural Preservation Projects</span>
                    <span className="font-semibold text-purple-600">{globalNetwork.culturalPreservationProjects}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-secondary-600">Active projects documenting and preserving Portuguese cultural heritage globally</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedView === 'families' && (
          <motion.div
            key="families"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ConnectedFamilies />
          </motion.div>
        )}

        {selectedView === 'professionals' && (
          <motion.div
            key="professionals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <NetworkProfessionals />
          </motion.div>
        )}

        {selectedView === 'stories' && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SuccessStories />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}