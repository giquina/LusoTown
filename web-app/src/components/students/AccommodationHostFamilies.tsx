'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { MapPinIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline'

interface AccommodationHostFamiliesProps {
  limit?: number
  showPricing?: boolean
}

export default function AccommodationHostFamilies({ limit = 6, showPricing = false }: AccommodationHostFamiliesProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()
  const [selectedCity, setSelectedCity] = useState('all')

  const hostFamilies = [
    {
      id: 1,
      name: 'Família Santos',
      location: 'London',
      heritage: 'Portuguese',
      rating: 4.9,
      reviews: 23,
      price: '£150/week',
      features: ['Portuguese-speaking', 'Near UCL', 'Meals included', 'Cultural activities'],
      image: '/images/host-family-1.jpg'
    },
    {
      id: 2,
      name: 'Casa Oliveira',
      location: 'Manchester',
      heritage: 'Brazilian',
      rating: 4.8,
      reviews: 18,
      price: '£130/week',
      features: ['Portuguese/English', 'University of Manchester', 'Private room', 'Garden access'],
      image: '/images/host-family-2.jpg'
    },
    {
      id: 3,
      name: 'Família Rodrigues',
      location: 'Edinburgh',
      heritage: 'Cape Verdean',
      rating: 4.9,
      reviews: 31,
      price: '£140/week',
      features: ['Multilingual', 'Near University', 'Cultural exchange', 'Weekend activities'],
      image: '/images/host-family-3.jpg'
    },
    {
      id: 4,
      name: 'Casa Pereira',
      location: 'Cambridge',
      heritage: 'Portuguese',
      rating: 5.0,
      reviews: 15,
      price: '£160/week',
      features: ['Academic family', 'Cambridge University', 'Study support', 'Library access'],
      image: '/images/host-family-4.jpg'
    },
    {
      id: 5,
      name: 'Família Costa',
      location: 'Oxford',
      heritage: 'Angolan',
      rating: 4.7,
      reviews: 22,
      price: '£155/week',
      features: ['Near Oxford Uni', 'Cultural diversity', 'Mentorship', 'Social events'],
      image: '/images/host-family-5.jpg'
    },
    {
      id: 6,
      name: 'Casa Ferreira',
      location: 'Birmingham',
      heritage: 'Brazilian',
      rating: 4.8,
      reviews: 27,
      price: '£125/week',
      features: ['Portuguese cuisine', 'University area', 'Music & arts', 'Community events'],
      image: '/images/host-family-6.jpg'
    }
  ]

  const cities = ['all', 'London', 'Manchester', 'Edinburgh', 'Cambridge', 'Oxford', 'Birmingham']

  const filteredFamilies = hostFamilies
    .filter(family => selectedCity === 'all' || family.location === selectedCity)
    .slice(0, limit)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('students.hostFamilies.title') || 'Portuguese-Speaking Host Families'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('students.hostFamilies.subtitle') || 'Live with carefully selected Portuguese-speaking families while studying in the UK'}
          </p>

          {/* City Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCity === city
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedCity === city ? { backgroundColor: colors.primary } : {}}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFamilies.map((family) => (
            <div key={family.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Family Image */}
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {family.heritage}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {family.name}
                  </h3>
                  {showPricing && (
                    <span className="text-lg font-bold" style={{ color: colors.primary }}>
                      {family.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{family.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {family.rating}
                    </span>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({family.reviews} reviews)
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {family.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {family.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{family.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="w-full py-2 px-4 rounded-md text-white font-medium text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  {t('students.hostFamilies.contactFamily') || 'Contact Family'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center justify-center mb-4">
              <UsersIcon className="w-6 h-6 mr-2" style={{ color: colors.primary }} />
              <span className="text-lg font-semibold text-gray-900">
                {t('students.hostFamilies.safetyTitle') || 'Verified & Safe'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              {t('students.hostFamilies.safetyDescription') || 'All host families are carefully vetted and verified by our Portuguese community team'}
            </p>
            <button
              className="px-6 py-3 rounded-md text-white font-medium"
              style={{ backgroundColor: colors.primary }}
            >
              {t('students.hostFamilies.becomeHost') || 'Become a Host Family'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}