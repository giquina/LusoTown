'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalPortuguese } from '@/context/GlobalPortugueseContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CulturalExchangeProgram, 
  PortugueseCountry,
  DiasporaFamily,
  PortugueseProfessional,
  GlobalPortugueseEvent
} from '@/types/GlobalPortugueseExpansion'

interface CrossCulturalExchangeProps {
  focusType?: 'all' | 'family' | 'professional' | 'educational' | 'cultural'
  maxDisplayed?: number
  showFilters?: boolean
}

export default function CrossCulturalExchange({ 
  focusType = 'all',
  maxDisplayed = 12,
  showFilters = true 
}: CrossCulturalExchangeProps) {
  const { 
    currentCountry, 
    exchangePrograms,
    diasporaFamilies,
    professionalNetwork,
    formatCurrency,
    formatDate,
    joinExchangeProgram,
    connectWithFamily
  } = useGlobalPortuguese()
  const { t } = useLanguage()

  const [selectedType, setSelectedType] = useState<'programs' | 'families' | 'professionals' | 'events'>('programs')
  const [filteredPrograms, setFilteredPrograms] = useState<CulturalExchangeProgram[]>([])
  const [filteredFamilies, setFilteredFamilies] = useState<DiasporaFamily[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState<PortugueseProfessional[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<PortugueseCountry | 'all'>('all')
  const [ageRange, setAgeRange] = useState<string>('all')
  const [showApplicationModal, setShowApplicationModal] = useState<string | null>(null)

  // Mock data for demonstration
  const mockExchangePrograms: CulturalExchangeProgram[] = [
    {
      id: 'portuguese-heritage-program',
      name: 'Lusophone Heritage Discovery Program',
      description: 'Immersive cultural experience connecting diaspora youth with Portuguese traditions',
      originCountry: 'portugal',
      destinationCountry: currentCountry,
      duration: '3 months',
      type: 'cultural',
      ageRange: '18-35',
      cost: { amount: 2500, currency: 'EUR' },
      requirements: ['Portuguese language basic level', 'Valid passport', 'Cultural interest'],
      benefits: ['Cultural immersion', 'Language improvement', 'Heritage connection', 'Professional network'],
      applicationDeadline: new Date('2025-11-30'),
      startDate: new Date('2026-03-01'),
      organizer: {
        id: 'heritage-foundation',
        name: 'Lusophone Heritage Foundation',
        type: 'cultural',
        website: 'https://heritage.pt',
        contact: 'programs@heritage.pt',
        services: ['Cultural programs', 'Heritage preservation'],
        memberCount: 5000,
        foundedYear: 1985
      },
      partnershipsRequired: ['Local Lusophone communities', 'Cultural centers'],
      culturalObjectives: ['Heritage preservation', 'Cultural transmission', 'Community strengthening']
    },
    {
      id: 'lusophone-business-exchange',
      name: 'Lusophone Business Innovation Exchange',
      description: 'Professional exchange program for Portuguese-speaking entrepreneurs and business leaders',
      originCountry: 'brazil',
      destinationCountry: currentCountry,
      duration: '6 months',
      type: 'professional',
      ageRange: '25-50',
      cost: { amount: 3500, currency: 'EUR' },
      requirements: ['Business experience 5+ years', 'Lusophone fluency', 'Business plan'],
      benefits: ['International business network', 'Market expansion opportunities', 'Mentorship', 'Investment connections'],
      applicationDeadline: new Date('2025-10-15'),
      startDate: new Date('2026-01-15'),
      organizer: {
        id: 'lusophone-business-council',
        name: 'Lusophone Business Council',
        type: 'professional',
        website: 'https://lusophone-business.org',
        contact: 'exchange@lusophone-business.org',
        services: ['Business networking', 'Professional development'],
        memberCount: 2500,
        foundedYear: 2010
      },
      partnershipsRequired: ['Chambers of Commerce', 'Business incubators'],
      culturalObjectives: ['Economic development', 'Cross-border business relationships', 'Innovation sharing']
    },
    {
      id: 'portuguese-student-semester',
      name: 'Lusophone Studies Academic Semester',
      description: 'Academic exchange program for students studying Portuguese language, literature, and culture',
      originCountry: currentCountry,
      destinationCountry: 'portugal',
      duration: '1 semester',
      type: 'student',
      ageRange: '18-25',
      cost: { amount: 4000, currency: 'EUR' },
      requirements: ['University enrollment', 'Lusophone intermediate level', 'Academic transcript'],
      benefits: ['University credits', 'Cultural immersion', 'Academic research opportunities', 'Language certification'],
      applicationDeadline: new Date('2025-12-15'),
      startDate: new Date('2026-02-01'),
      organizer: {
        id: 'university-consortium',
        name: 'Lusophone Universities Consortium',
        type: 'educational',
        website: 'https://portuguese-unis.edu',
        contact: 'international@portuguese-unis.edu',
        services: ['Academic programs', 'Student exchange'],
        memberCount: 15000,
        foundedYear: 1995
      },
      partnershipsRequired: ['Partner universities', 'Student accommodation'],
      culturalObjectives: ['Academic excellence', 'Cultural education', 'International cooperation']
    }
  ]

  const mockDiasporaFamilies: DiasporaFamily[] = [
    {
      id: 'silva-family-london',
      familyName: 'Silva Family',
      originRegion: 'Minho, Portugal',
      currentCountry: 'uk',
      generationsSinceMigration: 3,
      familyTraditions: [
        {
          id: 'family-festa',
          name: 'Annual Family Festa',
          description: 'Traditional Portuguese celebration with music, food, and dance',
          origin: 'Minho, Portugal',
          significance: 'Maintains family bonds and cultural identity',
          preservationStatus: 'thriving'
        }
      ],
      languageStatus: 'conversational',
      culturalActivities: ['Lusophone cooking classes', 'Fado music nights', 'Lusophone folk dancing'],
      connectionToPortugal: 'moderate',
      interestInReconnection: true,
      preservationEfforts: ['Teaching Lusophone to children', 'Maintaining traditional recipes'],
      youngerGenerationEngagement: 'medium'
    },
    {
      id: 'santos-family-toronto',
      familyName: 'Santos Family',
      originRegion: 'Azores, Portugal',
      currentCountry: 'canada',
      generationsSinceMigration: 2,
      familyTraditions: [
        {
          id: 'holy-spirit-celebration',
          name: 'Holy Spirit Festival',
          description: 'Religious and cultural celebration from Azorean tradition',
          origin: 'Azores, Portugal',
          significance: 'Religious devotion and community gathering',
          preservationStatus: 'thriving'
        }
      ],
      languageStatus: 'fluent',
      culturalActivities: ['Lusophone church services', 'Traditional bread making', 'Azorean cultural events'],
      connectionToPortugal: 'strong',
      interestInReconnection: true,
      preservationEfforts: ['Lusophone school for children', 'Cultural organization leadership'],
      youngerGenerationEngagement: 'high'
    }
  ]

  const mockProfessionals: PortugueseProfessional[] = [
    {
      id: 'maria-architect-london',
      name: 'Maria Fernandes',
      profession: 'Architect',
      industry: 'Construction & Design',
      location: { country: 'uk', city: 'London' },
      expertise: ['Sustainable architecture', 'Portuguese traditional building techniques', 'Urban planning'],
      services: ['Architectural design', 'Cultural building restoration', 'Mentorship'],
      availableForMentoring: true,
      languagePreference: 'bilingual',
      networkingInterests: ['Lusophone cultural preservation', 'Sustainable design', 'International projects'],
      businessType: 'company',
      yearsExperience: 15,
      culturalSpecialization: ['Lusophone architectural heritage', 'Azulejo tile integration']
    },
    {
      id: 'joao-chef-boston',
      name: 'João Pereira',
      profession: 'Executive Chef',
      industry: 'Hospitality & Food',
      location: { country: 'usa', city: 'Boston' },
      expertise: ['Portuguese cuisine', 'Modern gastronomy', 'Restaurant management'],
      services: ['Culinary consulting', 'Lusophone cooking workshops', 'Restaurant development'],
      availableForMentoring: true,
      languagePreference: 'bilingual',
      networkingInterests: ['Lusophone culinary traditions', 'Food innovation', 'Cultural events'],
      businessType: 'company',
      yearsExperience: 20,
      culturalSpecialization: ['Traditional Lusophone recipes', 'Regional specialties', 'Wine pairing']
    }
  ]

  useEffect(() => {
    let filtered = mockExchangePrograms

    if (focusType !== 'all') {
      filtered = filtered.filter(program => program.type === focusType)
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(program => 
        program.originCountry === selectedCountry || program.destinationCountry === selectedCountry
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (ageRange !== 'all') {
      filtered = filtered.filter(program => program.ageRange.includes(ageRange))
    }

    setFilteredPrograms(filtered.slice(0, maxDisplayed))
  }, [focusType, selectedCountry, searchTerm, ageRange, maxDisplayed])

  useEffect(() => {
    setFilteredFamilies(mockDiasporaFamilies.slice(0, maxDisplayed))
    setFilteredProfessionals(mockProfessionals.slice(0, maxDisplayed))
  }, [maxDisplayed])

  const handleApplyToProgram = async (programId: string) => {
    try {
      await joinExchangeProgram(programId)
      setShowApplicationModal(null)
      // Show success message
    } catch (error) {
      console.error('Failed to apply to program:', error)
    }
  }

  const handleConnectWithFamily = async (familyId: string) => {
    try {
      await connectWithFamily(familyId)
      // Show success message
    } catch (error) {
      console.error('Failed to connect with family:', error)
    }
  }

  const ApplicationModal = ({ program }: { program: CulturalExchangeProgram }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setShowApplicationModal(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply to {program.name}</h2>
            <button
              onClick={() => setShowApplicationModal(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Program Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Type:</strong> {program.type}</p>
                <p><strong>Age Range:</strong> {program.ageRange}</p>
                <p><strong>Cost:</strong> {formatCurrency(program.cost.amount)}</p>
                <p><strong>Application Deadline:</strong> {formatDate(program.applicationDeadline)}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
              <ul className="space-y-1">
                {program.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="space-y-1">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleApplyToProgram(program.id)}
                className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all"
              >
                Apply Now
              </button>
              <button
                onClick={() => setShowApplicationModal(null)}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Global Lusophone Cultural Exchange
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with Lusophone communities worldwide through cultural exchange programs, 
          family connections, and professional networks
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {[
            { id: 'programs', label: 'Exchange Programs', icon: '🎓' },
            { id: 'families', label: 'Diaspora Families', icon: '👨‍👩‍👧‍👦' },
            { id: 'professionals', label: 'Professionals', icon: '💼' },
            { id: 'events', label: 'Cultural Events', icon: '🎭' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                selectedType === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs, families, or professionals..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as PortugueseCountry | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Countries</option>
                <option value="portugal">Portugal</option>
                <option value="brazil">Brazil</option>
                <option value="uk">United Kingdom</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
            </div>
            
            {selectedType === 'programs' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Ages</option>
                  <option value="18">18-25</option>
                  <option value="25">25-35</option>
                  <option value="35">35-50</option>
                  <option value="50">50+</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Based on Selected Tab */}
      <AnimatePresence mode="wait">
        {selectedType === 'programs' && (
          <motion.div
            key="programs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {filteredPrograms.map(program => (
              <div key={program.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      program.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                      program.type === 'professional' ? 'bg-blue-100 text-blue-800' :
                      program.type === 'student' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {program.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age Range</p>
                      <p className="font-semibold">{program.ageRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost</p>
                      <p className="font-semibold">{formatCurrency(program.cost.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Apply by</p>
                      <p className="font-semibold">{formatDate(program.applicationDeadline)}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Key Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.benefits.slice(0, 3).map((benefit, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowApplicationModal(program.id)}
                      className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
                    >
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {selectedType === 'families' && (
          <motion.div
            key="families"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {filteredFamilies.map(family => (
              <div key={family.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{family.familyName}</h3>
                    <p className="text-gray-600">From {family.originRegion}</p>
                    <p className="text-sm text-gray-500">{family.generationsSinceMigration} generations in {family.currentCountry.toUpperCase()}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    family.connectionToPortugal === 'strong' ? 'bg-green-100 text-green-800' :
                    family.connectionToPortugal === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {family.connectionToPortugal} connection
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Language Status:</p>
                  <span className={`px-2 py-1 text-xs rounded ${
                    family.languageStatus === 'fluent' ? 'bg-green-100 text-green-800' :
                    family.languageStatus === 'conversational' ? 'bg-blue-100 text-blue-800' :
                    family.languageStatus === 'learning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {family.languageStatus}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Cultural Activities:</p>
                  <div className="flex flex-wrap gap-2">
                    {family.culturalActivities.slice(0, 3).map((activity, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Family Traditions:</p>
                  {family.familyTraditions.slice(0, 1).map(tradition => (
                    <div key={tradition.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-900">{tradition.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{tradition.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleConnectWithFamily(family.id)}
                    className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
                  >
                    Connect
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {selectedType === 'professionals' && (
          <motion.div
            key="professionals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {filteredProfessionals.map(professional => (
              <div key={professional.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{professional.name}</h3>
                    <p className="text-gray-600">{professional.profession}</p>
                    <p className="text-sm text-gray-500">{professional.location.city}, {professional.location.country.toUpperCase()}</p>
                  </div>
                  {professional.availableForMentoring && (
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Mentoring
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Industry:</p>
                  <p className="font-medium">{professional.industry}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {professional.expertise.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Cultural Specialization:</p>
                  <div className="flex flex-wrap gap-2">
                    {professional.culturalSpecialization?.slice(0, 2).map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Experience</span>
                    <span className="font-semibold">{professional.yearsExperience} years</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                    Connect
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {selectedType === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">Cultural events integration coming soon...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && (
          <ApplicationModal 
            program={filteredPrograms.find(p => p.id === showApplicationModal)!} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}