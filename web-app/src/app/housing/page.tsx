'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  CurrencyPoundIcon,
  UserGroupIcon,
  WifiIcon,
  BanknotesIcon,
  KeyIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'

// Mock housing data for Portuguese community
const mockListings = [
  {
    id: 1,
    title: 'Cozy Room in Portuguese Shared House',
    location: 'Vauxhall, London',
    price: '£650/month',
    type: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    available: 'Available Now',
    description: 'Beautiful room in a friendly Portuguese household. Perfect for newcomers to London!',
    amenities: ['WiFi', 'Kitchen Access', 'Portuguese-speaking housemates', 'Near Vauxhall Station'],
    images: ['/images/housing/room1.jpg'],
    landlord: {
      name: 'Maria Santos',
      rating: 4.8,
      reviews: 12,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Bills Included', 'Portuguese Welcome', 'Help with Setup'],
    featured: true,
    deposit: '£650',
    minStay: '3 months'
  },
  {
    id: 2,
    title: '2-Bed Flat in East London',
    location: 'Whitechapel, London',
    price: '£1,800/month',
    type: 'Flat',
    bedrooms: 2,
    bathrooms: 1,
    available: 'Available from 1st Nov',
    description: 'Modern 2-bedroom flat perfect for Portuguese professionals or students sharing.',
    amenities: ['Fully Furnished', 'Washing Machine', 'Close to Portuguese Community', 'Transport Links'],
    images: ['/images/housing/flat1.jpg'],
    landlord: {
      name: 'João Silva',
      rating: 4.9,
      reviews: 8,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Portuguese-Speaking Landlord', 'Help with Council Registration', 'Portuguese TV'],
    featured: false,
    deposit: '£1,800',
    minStay: '6 months'
  },
  {
    id: 3,
    title: 'Student Room Near Universities',
    location: 'King\'s Cross, London',
    price: '£550/month',
    type: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    available: 'Available Now',
    description: 'Perfect for Portuguese students! Close to UCL, King\'s College, and other universities.',
    amenities: ['Study Area', 'High-Speed WiFi', 'Portuguese Student Community', 'Security Entry'],
    images: ['/images/housing/student1.jpg'],
    landlord: {
      name: 'LusoStudent Housing',
      rating: 4.7,
      reviews: 25,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Student Discount', 'Portuguese Support Network', 'Academic Help'],
    featured: true,
    deposit: '£550',
    minStay: '1 month'
  },
  {
    id: 4,
    title: 'Family House in Quiet Area',
    location: 'Harrow, London',
    price: '£2,200/month',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2,
    available: 'Available from 15th Nov',
    description: 'Perfect family home in quiet residential area with Portuguese-speaking neighbors nearby.',
    amenities: ['Garden', 'Parking', 'Near Portuguese School', 'Family-Friendly Area'],
    images: ['/images/housing/house1.jpg'],
    landlord: {
      name: 'LusoFamily Properties',
      rating: 4.9,
      reviews: 15,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Child-Friendly', 'School Registration Help', 'Portuguese Playgroups Nearby'],
    featured: false,
    deposit: '£2,200',
    minStay: '12 months'
  },
  {
    id: 5,
    title: 'Shared Portuguese Household',
    location: 'Bermondsey, London',
    price: '£580/month',
    type: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    available: 'Available Now',
    description: 'Join our friendly Portuguese-speaking household. Great for making friends and feeling at home!',
    amenities: ['Shared Kitchen', 'Living Room', 'Portuguese Cooking', 'Social Events'],
    images: ['/images/housing/shared1.jpg'],
    landlord: {
      name: 'Ana Rodrigues',
      rating: 4.8,
      reviews: 18,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Cultural Events', 'Portuguese Food Shopping Tips', 'Buddy System'],
    featured: false,
    deposit: '£580',
    minStay: '2 months'
  },
  {
    id: 6,
    title: 'Modern Studio with Portuguese Support',
    location: 'Canary Wharf, London',
    price: '£1,200/month',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    available: 'Available Now',
    description: 'Modern studio perfect for young Portuguese professionals working in the financial district.',
    amenities: ['Gym Access', 'Concierge', '24/7 Security', 'Transport Links'],
    images: ['/images/housing/studio1.jpg'],
    landlord: {
      name: 'Premium Portuguese Properties',
      rating: 4.9,
      reviews: 22,
      speaksPortuguese: true,
      verified: true
    },
    features: ['Professional Network', 'Portuguese Business Contacts', 'Career Support'],
    featured: true,
    deposit: '£1,200',
    minStay: '6 months'
  }
]

const propertyTypes = ['All Types', 'Room', 'Studio', 'Flat', 'House']
const priceRanges = [
  'All Prices',
  'Under £600',
  '£600 - £800',
  '£800 - £1,200',
  '£1,200 - £1,800',
  'Over £1,800'
]

const areas = [
  'All Areas',
  'Central London',
  'East London',
  'South London',
  'North London',
  'West London'
]

export default function HousingPage() {
  const { t } = useLanguage()
  const [listings, setListings] = useState(mockListings)
  const [filteredListings, setFilteredListings] = useState(mockListings)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices')
  const [selectedArea, setSelectedArea] = useState('All Areas')
  const [showPortugueseOnly, setShowPortugueseOnly] = useState(false)
  const [savedListings, setSavedListings] = useState<number[]>([])

  // Filter listings based on criteria
  useEffect(() => {
    let filtered = listings

    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType !== 'All Types') {
      filtered = filtered.filter(listing => listing.type === selectedType)
    }

    if (selectedArea !== 'All Areas') {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(selectedArea.toLowerCase().replace(' london', ''))
      )
    }

    if (showPortugueseOnly) {
      filtered = filtered.filter(listing => listing.landlord.speaksPortuguese)
    }

    // Price range filtering
    if (selectedPriceRange !== 'All Prices') {
      filtered = filtered.filter(listing => {
        const price = parseInt(listing.price.replace(/[£,\/month]/g, ''))
        switch (selectedPriceRange) {
          case 'Under £600':
            return price < 600
          case '£600 - £800':
            return price >= 600 && price <= 800
          case '£800 - £1,200':
            return price >= 800 && price <= 1200
          case '£1,200 - £1,800':
            return price >= 1200 && price <= 1800
          case 'Over £1,800':
            return price > 1800
          default:
            return true
        }
      })
    }

    setFilteredListings(filtered)
  }, [listings, searchQuery, selectedType, selectedPriceRange, selectedArea, showPortugueseOnly])

  const toggleSaveListing = (listingId: number) => {
    setSavedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-600 via-coral-600 to-secondary-600 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <HomeIcon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Portuguese Housing in London</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Find Your Home in London
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover Portuguese-friendly housing with landlords who understand your journey to London
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">250+</div>
                  <div className="text-white/80">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">89%</div>
                  <div className="text-white/80">Portuguese-Friendly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">£750</div>
                  <div className="text-white/80">Avg Rent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-white/80">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg"
                />
              </div>
              <button className="bg-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-700 transition-colors whitespace-nowrap">
                Search Properties
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={showPortugueseOnly}
                  onChange={(e) => setShowPortugueseOnly(e.target.checked)}
                  className="rounded text-accent-600 focus:ring-accent-500"
                />
                <span className="text-sm font-medium">Portuguese-Speaking Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredListings.length}</span> properties found
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
        </div>
      </section>

      {/* Property Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl border ${listing.featured ? 'border-accent-300 ring-2 ring-accent-100' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                {/* Property Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-accent-100 to-coral-100">
                  {listing.featured && (
                    <div className="absolute top-3 left-3 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => toggleSaveListing(listing.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        savedListings.includes(listing.id)
                          ? 'bg-accent-600 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <HeartIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/80 text-gray-600 hover:bg-white transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HomeIcon className="w-16 h-16 text-accent-300" />
                  </div>
                </div>

                <div className="p-6">
                  {/* Property Title and Price */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{listing.title}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent-600">{listing.price}</div>
                    </div>
                  </div>

                  {/* Location and Details */}
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{listing.location}</span>
                  </div>

                  {/* Property Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span>{listing.bedrooms} bed</span>
                    <span>{listing.bathrooms} bath</span>
                    <span className="capitalize">{listing.type}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Key Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Landlord Info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {listing.landlord.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-900">{listing.landlord.name}</span>
                          {listing.landlord.verified && (
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{listing.landlord.rating} ({listing.landlord.reviews})</span>
                        </div>
                      </div>
                    </div>
                    {listing.landlord.speaksPortuguese && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-semibold">
                        Fala Português
                      </span>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="text-xs text-gray-500 mb-4 space-y-1">
                    <div>Deposit: {listing.deposit}</div>
                    <div>Min stay: {listing.minStay}</div>
                    <div className="text-green-600 font-medium">{listing.available}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 text-accent-600 border border-accent-600 px-4 py-2 rounded-lg font-semibold hover:bg-accent-50 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-700 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all areas</p>
            </div>
          )}
        </div>
      </section>

      {/* Housing Guide CTA */}
      <section className="bg-gradient-to-r from-accent-50 to-coral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              New to London? Get Our Housing Guide
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our comprehensive guide for Portuguese speakers moving to London
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors">
                Download Guide
              </button>
              <button className="border border-accent-600 text-accent-600 px-8 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors">
                Get Housing Help
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}