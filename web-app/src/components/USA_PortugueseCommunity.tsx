'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalPortuguese } from '@/context/GlobalPortugueseContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  GlobalPortugueseEvent,
  PortugueseProfessional,
  PortugueseBusinessDirectory,
  Organization,
  Festival
} from '@/types/GlobalPortugueseExpansion'

interface USA_PortugueseCommunityProps {
  focusCity?: 'all' | 'new-york' | 'boston' | 'san-francisco' | 'miami' | 'newark'
  showBusinessDirectory?: boolean
  showEvents?: boolean
  showProfessionals?: boolean
}

export default function USA_PortugueseCommunity({ 
  focusCity = 'all',
  showBusinessDirectory = true,
  showEvents = true,
  showProfessionals = true
}: USA_PortugueseCommunityProps) {
  const { formatCurrency, formatDate } = useGlobalPortuguese()
  const { t } = useLanguage()

  const [selectedCity, setSelectedCity] = useState(focusCity)
  const [selectedCategory, setSelectedCategory] = useState<'overview' | 'events' | 'business' | 'professionals' | 'organizations'>('overview')
  const [showRegistrationModal, setShowRegistrationModal] = useState<string | null>(null)

  // USA Portuguese-speaking community Data
  const usaCommunityData = {
    totalPopulation: 1500000,
    majorCities: {
      'new-york': {
        name: 'New York Metro',
        population: 350000,
        neighborhoods: ['Newark NJ', 'Elizabeth NJ', 'Astoria Queens', 'Yonkers NY'],
        culturalCenters: ['Lusophone Sports Club', 'Casa do Benfica NY', 'Lusophone American Federation'],
        primaryOrigins: ['Azores', 'Mainland Portugal', 'Madeira'],
        establishedSince: 1870
      },
      'boston': {
        name: 'Greater Boston',
        population: 280000,
        neighborhoods: ['Fall River MA', 'New Bedford MA', 'Cambridge MA', 'Somerville MA'],
        culturalCenters: ['Lusophone American Civic League', 'Club Sport Maritimo', 'Lusophone Cultural Center'],
        primaryOrigins: ['Azores', 'Cape Verde', 'Mainland Portugal'],
        establishedSince: 1850
      },
      'san-francisco': {
        name: 'San Francisco Bay Area',
        population: 140000,
        neighborhoods: ['San Jose CA', 'Oakland CA', 'Fremont CA', 'Santa Clara CA'],
        culturalCenters: ['Lusophone Cultural Center San Jose', 'Club Lusitano', 'Lusophone American Cultural Society'],
        primaryOrigins: ['Azores', 'Mainland Portugal'],
        establishedSince: 1860
      },
      'miami': {
        name: 'South Florida',
        population: 95000,
        neighborhoods: ['Miami FL', 'Fort Lauderdale FL', 'West Palm Beach FL'],
        culturalCenters: ['Lusophone American Club Miami', 'Casa de Portugal Florida'],
        primaryOrigins: ['Brazil (Portuguese heritage)', 'Mainland Portugal', 'Azores'],
        establishedSince: 1960
      }
    }
  }

  // Mock USA Lusophone Events
  const usaPortugueseEvents: GlobalPortugueseEvent[] = [
    {
      id: 'fall-river-portuguese-festival',
      title: 'Fall River Lusophone Festival',
      description: 'The largest Portuguese festival in New England, celebrating Azorean culture with traditional music, food, and religious processions',
      date: new Date('2025-08-08'),
      location: {
        country: 'usa',
        city: 'Fall River',
        venue: 'Kennedy Park',
        address: '1 John F Kennedy Park, Fall River, MA'
      },
      type: 'cultural',
      organizer: {
        id: 'fall-river-committee',
        name: 'Fall River Lusophone Festival Committee',
        type: 'cultural',
        contact: 'info@fallriverportuguesefest.com',
        services: ['Cultural events', 'Community organizing'],
        memberCount: 200,
        foundedYear: 1965
      },
      expectedAttendance: 25000,
      cost: { amount: 0, currency: 'USD' },
      registrationRequired: false,
      language: 'bilingual',
      culturalSignificance: 'Celebrates Azorean Portuguese heritage and Holy Spirit traditions',
      internationalParticipation: true,
      streamingAvailable: false
    },
    {
      id: 'portuguese-heritage-month-ny',
      title: 'Lusophone Heritage Month Celebration NYC',
      description: 'Month-long celebration featuring Portuguese culture, history, and contributions to American society',
      date: new Date('2025-06-15'),
      location: {
        country: 'usa',
        city: 'New York',
        venue: 'Lusophone Sports Club',
        address: '9 Miller St, Newark, NJ'
      },
      type: 'cultural',
      organizer: {
        id: 'portuguese-american-federation',
        name: 'Lusophone American Federation',
        type: 'cultural',
        contact: 'info@paf-ny.org',
        services: ['Cultural preservation', 'Community advocacy'],
        memberCount: 500,
        foundedYear: 1975
      },
      expectedAttendance: 1500,
      cost: { amount: 15, currency: 'USD' },
      registrationRequired: true,
      language: 'bilingual',
      culturalSignificance: 'Promotes Lusophone-American cultural identity and historical awareness',
      internationalParticipation: false,
      streamingAvailable: true
    },
    {
      id: 'festa-do-senhor-santo-cristo',
      title: 'Festa do Senhor Santo Cristo dos Milagres',
      description: 'Traditional Azorean religious festival celebrated by Lusophone-Americans across the East Coast',
      date: new Date('2025-05-18'),
      location: {
        country: 'usa',
        city: 'Boston',
        venue: 'St. Anthony of Padua Church',
        address: '112 Sayles St, New Bedford, MA'
      },
      type: 'religious',
      organizer: {
        id: 'st-anthony-parish',
        name: 'St. Anthony of Padua Parish',
        type: 'religious',
        contact: 'parish@stanthonynb.org',
        services: ['Religious services', 'Cultural celebrations'],
        memberCount: 1200,
        foundedYear: 1903
      },
      expectedAttendance: 5000,
      cost: { amount: 0, currency: 'USD' },
      registrationRequired: false,
      language: 'portuguese',
      culturalSignificance: 'Most important religious celebration in Azorean culture',
      internationalParticipation: true,
      streamingAvailable: true
    }
  ]

  // Mock USA Lusophone Businesses
  const usaPortugueseBusinesses: PortugueseBusinessDirectory[] = [
    {
      id: 'marios-pastry-shop',
      businessName: 'Mario\'s Pastry Shop',
      owner: 'Mario Santos',
      industry: 'Food & Beverage',
      location: {
        country: 'usa',
        city: 'Boston',
        address: '105 Prince St, North End, Boston, MA'
      },
      services: ['Lusophone pastries', 'Custom cakes', 'Catering'],
      targetMarket: 'both',
      establishedYear: 1968,
      employeeCount: 8,
      portugueseSpecialties: ['Pastéis de nata', 'Bolo rei', 'Malasadas', 'Queijadas'],
      communityInvolvement: ['Portuguese festival sponsor', 'Community event catering'],
      internationalShipping: true,
      supportedCurrencies: ['USD'],
      socialImpact: ['Preserving Lusophone culinary traditions', 'Supporting local Lusophone families']
    },
    {
      id: 'azorean-construction',
      businessName: 'Azorean Construction Corp',
      owner: 'José Medeiros',
      industry: 'Construction',
      location: {
        country: 'usa',
        city: 'New York',
        address: '45 Ferry St, Newark, NJ'
      },
      services: ['Residential construction', 'Commercial renovation', 'Masonry work'],
      targetMarket: 'general-public',
      establishedYear: 1985,
      employeeCount: 25,
      portugueseSpecialties: ['Traditional stone work', 'Lusophone-style architecture'],
      communityInvolvement: ['Lusophone church renovations', 'Community center construction'],
      internationalShipping: false,
      supportedCurrencies: ['USD'],
      socialImpact: ['Employing Lusophone immigrants', 'Preserving architectural heritage']
    },
    {
      id: 'lusitano-insurance',
      businessName: 'Lusitano Insurance Agency',
      owner: 'Ana Pereira',
      industry: 'Financial Services',
      location: {
        country: 'usa',
        city: 'San Francisco',
        address: '1025 The Alameda, San Jose, CA'
      },
      services: ['Auto insurance', 'Home insurance', 'Business insurance', 'Life insurance'],
      targetMarket: 'portuguese-community',
      establishedYear: 1995,
      employeeCount: 12,
      portugueseSpecialties: ['Portuguese language services', 'Understanding of Portuguese-speaking community needs'],
      communityInvolvement: ['Portuguese festival sponsor', 'Community financial literacy programs'],
      internationalShipping: false,
      supportedCurrencies: ['USD'],
      socialImpact: ['Financial security for Lusophone families', 'Bilingual customer service']
    }
  ]

  // Mock USA Lusophone Professionals
  const usaPortugueseProfessionals: PortugueseProfessional[] = [
    {
      id: 'dr-carlos-silva-cardiologist',
      name: 'Dr. Carlos Silva',
      profession: 'Cardiologist',
      industry: 'Healthcare',
      location: { country: 'usa', city: 'Boston' },
      expertise: ['Cardiology', 'Lusophone patient care', 'Medical interpretation'],
      services: ['Cardiac consultations', 'Medical screenings', 'Community health education'],
      availableForMentoring: true,
      languagePreference: 'bilingual',
      networkingInterests: ['Lusophone healthcare initiatives', 'Community health programs'],
      businessType: 'corporate',
      yearsExperience: 22,
      culturalSpecialization: ['Lusophone healthcare traditions', 'Immigrant health advocacy']
    },
    {
      id: 'maria-fernandes-lawyer',
      name: 'Maria Fernandes, Esq.',
      profession: 'Immigration Attorney',
      industry: 'Legal Services',
      location: { country: 'usa', city: 'New York' },
      expertise: ['Immigration law', 'Family reunification', 'Lusophone citizenship'],
      services: ['Legal consultations', 'Document preparation', 'Court representation'],
      availableForMentoring: true,
      languagePreference: 'bilingual',
      networkingInterests: ['Lusophone legal advocacy', 'Immigration reform'],
      businessType: 'company',
      yearsExperience: 18,
      culturalSpecialization: ['Lusophone immigration history', 'Lusophone legal documents']
    },
    {
      id: 'antonio-costa-chef',
      name: 'António Costa',
      profession: 'Executive Chef',
      industry: 'Hospitality',
      location: { country: 'usa', city: 'Miami' },
      expertise: ['Portuguese cuisine', 'Restaurant management', 'Culinary education'],
      services: ['Restaurant consulting', 'Cooking classes', 'Menu development'],
      availableForMentoring: true,
      languagePreference: 'bilingual',
      networkingInterests: ['Lusophone culinary preservation', 'Food entrepreneurship'],
      businessType: 'company',
      yearsExperience: 25,
      culturalSpecialization: ['Traditional Lusophone recipes', 'Azorean cuisine', 'Portuguese wine pairing']
    }
  ]

  // Mock Lusophone Organizations in USA
  const usaPortugueseOrganizations: Organization[] = [
    {
      id: 'portuguese-american-federation',
      name: 'Lusophone American Federation',
      type: 'cultural',
      website: 'https://paf-usa.org',
      contact: 'info@paf-usa.org',
      services: ['Cultural events', 'Community advocacy', 'Heritage preservation'],
      memberCount: 2500,
      foundedYear: 1975
    },
    {
      id: 'luso-american-foundation',
      name: 'Luso-American Development Foundation',
      type: 'educational',
      website: 'https://flad.pt',
      contact: 'usa@flad.pt',
      services: ['Educational programs', 'Cultural exchanges', 'Research funding'],
      memberCount: 500,
      foundedYear: 1985
    },
    {
      id: 'portuguese-chamber-commerce',
      name: 'Lusophone-American Chamber of Commerce',
      type: 'professional',
      website: 'https://pacc-usa.com',
      contact: 'info@pacc-usa.com',
      services: ['Business networking', 'Trade promotion', 'Professional development'],
      memberCount: 800,
      foundedYear: 1990
    }
  ]

  const handleEventRegistration = async (eventId: string) => {
    // Mock registration process
    setShowRegistrationModal(null)
    // Show success message
  }

  const CitySelector = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Select Focus City</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => setSelectedCity('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCity === 'all' 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Cities
        </button>
        {Object.entries(usaCommunityData.majorCities).map(([key, city]) => (
          <button
            key={key}
            onClick={() => setSelectedCity(key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCity === key 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  )

  const CommunityOverview = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-white to-red-600 rounded-xl p-8 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <span className="text-4xl mr-3">🇺🇸</span>
            Lusophone Americans
            <span className="text-4xl ml-3">🇵🇹</span>
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Over 1.5 million Lusophone Americans preserve their rich heritage across the United States
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{usaCommunityData.totalPopulation.toLocaleString()}</div>
              <div className="text-sm text-blue-800">Lusophone Americans</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">155</div>
              <div className="text-sm text-green-800">Years of Heritage</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">45</div>
              <div className="text-sm text-purple-800">States with Communities</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">250+</div>
              <div className="text-sm text-red-800">Cultural Organizations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Major Cities */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Lusophone American Cities</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(usaCommunityData.majorCities).map(([key, city]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">{city.name}</h4>
                <span className="text-2xl font-bold text-blue-600">{city.population.toLocaleString()}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Key Neighborhoods:</p>
                  <p className="text-gray-800">{city.neighborhoods.join(', ')}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cultural Centers:</p>
                  <div className="flex flex-wrap gap-2">
                    {city.culturalCenters.map((center, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {center}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Primary Origins:</p>
                  <div className="flex flex-wrap gap-2">
                    {city.primaryOrigins.map((origin, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {origin}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Established:</strong> {city.establishedSince}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const EventsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Lusophone American Events</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        {usaPortugueseEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  event.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                  event.type === 'religious' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{formatDate(event.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{event.location.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Attendance</p>
                  <p className="font-semibold">{event.expectedAttendance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="font-semibold">
                    {event.cost.amount === 0 ? 'Free' : formatCurrency(event.cost.amount)}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Cultural Significance:</p>
                <p className="text-sm text-gray-700">{event.culturalSignificance}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRegistrationModal(event.id)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
                >
                  {event.registrationRequired ? 'Register' : 'Get Details'}
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const BusinessDirectory = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Lusophone American Businesses</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        {usaPortugueseBusinesses.map(business => (
          <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{business.businessName}</h4>
                <p className="text-gray-600">Owner: {business.owner}</p>
                <p className="text-sm text-gray-500">{business.location.city} • {business.industry}</p>
              </div>
              <span className="text-sm text-gray-500">Est. {business.establishedYear}</span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Services:</p>
              <div className="flex flex-wrap gap-2">
                {business.services.map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Lusophone Specialties:</p>
              <div className="flex flex-wrap gap-2">
                {business.portugueseSpecialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Community Involvement:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {business.communityInvolvement.map((involvement, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    {involvement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                Contact Business
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const ProfessionalsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Lusophone American Professionals</h3>
      <div className="grid lg:grid-cols-3 gap-6">
        {usaPortugueseProfessionals.map(professional => (
          <div key={professional.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-gray-900">{professional.name}</h4>
              <p className="text-gray-600">{professional.profession}</p>
              <p className="text-sm text-gray-500">{professional.location.city}</p>
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
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4 text-center">
              <span className="text-2xl font-bold text-blue-600">{professional.yearsExperience}</span>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>

            {professional.availableForMentoring && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Available for Mentoring
                </span>
              </div>
            )}

            <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const OrganizationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Lusophone American Organizations</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usaPortugueseOrganizations.map(org => (
          <div key={org.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-900">{org.name}</h4>
              <p className="text-sm text-gray-600">Est. {org.foundedYear}</p>
            </div>

            <div className="mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                org.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                org.type === 'educational' ? 'bg-green-100 text-green-800' :
                org.type === 'professional' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {org.type}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Services:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {org.services.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 text-center">
              <span className="text-xl font-bold text-blue-600">{org.memberCount?.toLocaleString()}</span>
              <p className="text-sm text-gray-600">Members</p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                Join
              </button>
              {org.website && (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Website
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <span className="text-5xl mr-4">🇺🇸</span>
          Lusophone American Community
          <span className="text-5xl ml-4">🇵🇹</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Discover the vibrant Lusophone American community across the United States - 
          from the Azorean traditions of New England to the growing communities of California and Florida
        </p>
      </div>

      {/* City Selector */}
      <CitySelector />

      {/* Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap justify-center gap-1">
          {[
            { id: 'overview', label: 'Community Overview', icon: '🏘️' },
            { id: 'events', label: 'Events & Festivals', icon: '🎭' },
            { id: 'business', label: 'Business Directory', icon: '🏪' },
            { id: 'professionals', label: 'Professionals', icon: '💼' },
            { id: 'organizations', label: 'Organizations', icon: '🤝' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4 py-3 rounded-md font-medium transition-all ${
                selectedCategory === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedCategory === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CommunityOverview />
          </motion.div>
        )}

        {selectedCategory === 'events' && showEvents && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EventsSection />
          </motion.div>
        )}

        {selectedCategory === 'business' && showBusinessDirectory && (
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BusinessDirectory />
          </motion.div>
        )}

        {selectedCategory === 'professionals' && showProfessionals && (
          <motion.div
            key="professionals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProfessionalsSection />
          </motion.div>
        )}

        {selectedCategory === 'organizations' && (
          <motion.div
            key="organizations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <OrganizationsSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}