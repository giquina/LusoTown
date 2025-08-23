'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Diamond,
  Crown,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Building2,
  Utensils,
  Car,
  Briefcase,
  Palette,
  Search,
  Filter,
  ArrowRight,
  ChefHat,
  Gem,
  TrendingUp
} from 'lucide-react'

interface LuxuryBusiness {
  id: string
  name: string
  namePortuguese: string
  category: 'Fine Dining' | 'Luxury Services' | 'Investment' | 'Art & Culture' | 'Professional Services' | 'Oil & Gas'
  description: string
  descriptionPortuguese: string
  address: string
  postcode: string
  phone: string
  email: string
  website: string
  priceRange: '£££' | '££££' | '£££££'
  exclusivityLevel: 'Premium' | 'Ultra Premium' | 'Exclusive' | 'Elite'
  specialties: string[]
  angolanConnection: 'Owner' | 'Chef' | 'Partner' | 'Clientele'
  establishedYear: number
  rating: number
  reviews: number
  image: string
  features: string[]
  acceptsCrypto?: boolean
  privateBooking?: boolean
  membershipRequired?: boolean
}

const angolaLuxuryBusinesses: LuxuryBusiness[] = [
  {
    id: 'angola-001',
    name: 'Luanda Prime',
    namePortuguese: 'Luanda Prime',
    category: 'Fine Dining',
    description: 'Michelin-worthy Angolan cuisine elevated to international fine dining standards. Our Executive Chef, who moved from Luanda to London and trained in London\'s top kitchens, creates sophisticated interpretations of traditional Angolan dishes for London\'s discerning diners.',
    descriptionPortuguese: 'Culinária angolana digna de Michelin elevada aos padrões internacionais de alta gastronomia. Nosso Chef Executivo, treinado nos melhores estabelecimentos de Luanda e nas melhores cozinhas de Londres, cria interpretações sofisticadas dos pratos tradicionais angolanos.',
    address: '15 Berkeley Street, Mayfair',
    postcode: 'W1J 8DY',
    phone: '+44 20 7493 8888',
    email: 'reservations@luandaprime.co.uk',
    website: 'https://luandaprime.co.uk',
    priceRange: '££££',
    exclusivityLevel: 'Ultra Premium',
    specialties: ['Modern Angolan Cuisine', 'Private Dining', 'Wine Pairing', 'Cultural Events'],
    angolanConnection: 'Chef',
    establishedYear: 2019,
    rating: 4.8,
    reviews: 127,
    image: '/businesses/angola/luanda-prime.jpg',
    features: ['Private Dining Room', 'Sommelier Service', 'Vegan Options', 'Cultural Art Gallery'],
    privateBooking: true,
    membershipRequired: false
  },
  {
    id: 'angola-002', 
    name: 'Diamond Capital Investments',
    namePortuguese: 'Investimentos Capital dos Diamantes',
    category: 'Investment',
    description: 'Exclusive London-based investment advisory serving Angolan diaspora professionals. Our team of former oil industry executives, now based in London\'s financial district, provide strategic investment guidance and wealth management for successful Angolans living in the United Kingdom.',
    descriptionPortuguese: 'Consultoria de investimento exclusiva especializada no setor de recursos naturais de Angola e imóveis de luxo. Nossa equipe de ex-executivos da indústria petrolífera e especialistas em comércio de diamantes oferece orientação estratégica de investimento para indivíduos UHNW.',
    address: '1 Poultry, City of London',
    postcode: 'EC2R 8EJ',
    phone: '+44 20 7826 4500',
    email: 'advisory@diamondcapital.co.uk',
    website: 'https://diamondcapital.co.uk',
    priceRange: '£££££',
    exclusivityLevel: 'Elite',
    specialties: ['Natural Resource Investments', 'Luxury Real Estate', 'Portfolio Management', 'Cross-Border Transactions'],
    angolanConnection: 'Owner',
    establishedYear: 2015,
    rating: 4.9,
    reviews: 45,
    image: '/businesses/angola/diamond-capital.jpg',
    features: ['Private Client Service', 'Multilingual Team', 'Global Network', 'Regulatory Compliance'],
    acceptsCrypto: true,
    privateBooking: true,
    membershipRequired: true
  },
  {
    id: 'angola-003',
    name: 'Esperança Luxury Chauffeur',
    namePortuguese: 'Esperança Motorista de Luxo',
    category: 'Luxury Services',
    description: 'Premium chauffeur service exclusively for London\'s Angolan diaspora professionals. Portuguese-speaking drivers provide discreet, luxury transportation throughout London for business meetings, cultural events, and airport transfers to Angola.',
    descriptionPortuguese: 'Serviço de motorista premium exclusivamente para a elite angolana de Londres. Motoristas que falam português com treinamento diplomático fornecem transporte de luxo discreto em veículos executivos para eventos empresariais e culturais.',
    address: '25 Curzon Street, Mayfair',
    postcode: 'W1J 7TX',
    phone: '+44 20 7355 2000',
    email: 'bookings@esperancaluxury.co.uk',
    website: 'https://esperancaluxury.co.uk',
    priceRange: '££££',
    exclusivityLevel: 'Premium',
    specialties: ['Executive Transport', 'Airport Transfers', 'Event Chauffeur', 'Security Cleared Drivers'],
    angolanConnection: 'Owner',
    establishedYear: 2017,
    rating: 4.9,
    reviews: 89,
    image: '/businesses/angola/esperanca-luxury.jpg',
    features: ['Mercedes S-Class Fleet', 'Portuguese-Speaking Drivers', 'Security Cleared', '24/7 Service'],
    privateBooking: true,
    membershipRequired: false
  },
  {
    id: 'angola-004',
    name: 'Benguela Art Gallery',
    namePortuguese: 'Galeria de Arte Benguela',
    category: 'Art & Culture',
    description: 'London\'s premier gallery for contemporary Angolan art, owned by London-based Angolan art collectors. Showcasing works by Angolan artists with regular exhibitions in Mayfair and private viewing events for London\'s Portuguese-speaking art enthusiasts.',
    descriptionPortuguese: 'A principal galeria de Londres para arte angolana contemporânea. Mostrando obras de artistas estabelecidos e emergentes da vibrante cena cultural de Luanda, com exposições regulares e eventos de visualização privada para colecionadores.',
    address: '12 Dover Street, Mayfair',
    postcode: 'W1S 4LJ',
    phone: '+44 20 7408 1100',
    email: 'info@benguelart.com',
    website: 'https://benguelart.com',
    priceRange: '£££',
    exclusivityLevel: 'Exclusive',
    specialties: ['Contemporary Angolan Art', 'Private Collections', 'Art Investment', 'Cultural Events'],
    angolanConnection: 'Owner',
    establishedYear: 2018,
    rating: 4.7,
    reviews: 62,
    image: '/businesses/angola/benguela-gallery.jpg',
    features: ['Private Viewing Rooms', 'Art Authentication', 'Investment Advisory', 'Cultural Programs'],
    privateBooking: true,
    membershipRequired: false
  },
  {
    id: 'angola-005',
    name: 'Cabinda Oil & Gas Consultancy',
    namePortuguese: 'Consultoria de Petróleo e Gás Cabinda',
    category: 'Oil & Gas',
    description: 'Strategic consulting for energy sector investments, operated by Angolan executives based in London\'s financial district. Our senior partners provide expert guidance on international energy investments and Angola-United Kingdom business partnerships.',
    descriptionPortuguese: 'Consultoria estratégica para investimentos no setor energético em Angola. Nossos sócios seniores, ex-executivos das principais companhias petrolíferas de Angola, fornecem orientação especializada sobre oportunidades upstream, midstream e downstream.',
    address: '20 Fenchurch Street, City of London',
    postcode: 'EC3M 3BY',
    phone: '+44 20 7929 3000',
    email: 'info@cabindaoilgas.co.uk',
    website: 'https://cabindaoilgas.co.uk',
    priceRange: '£££££',
    exclusivityLevel: 'Elite',
    specialties: ['Energy Investment', 'Regulatory Compliance', 'Joint Ventures', 'Risk Assessment'],
    angolanConnection: 'Partner',
    establishedYear: 2014,
    rating: 4.8,
    reviews: 38,
    image: '/businesses/angola/cabinda-oil.jpg',
    features: ['Senior Industry Experts', 'Government Relations', 'Technical Analysis', 'Strategic Planning'],
    privateBooking: true,
    membershipRequired: true
  },
  {
    id: 'angola-006',
    name: 'Quilombo Private Members Club',
    namePortuguese: 'Clube de Membros Privados Quilombo',
    category: 'Professional Services',
    description: 'Exclusive private members club for successful Angolan professionals working in London. Located in Westminster, features fine dining, business facilities, and cultural programming connecting London\'s Angolan community with the broader Portuguese-speaking network.',
    descriptionPortuguese: 'Clube de membros privados exclusivo para profissionais e empresários angolanos bem-sucedidos em Londres. Apresenta jantar fino, instalações de negócios e programação cultural em um elegante ambiente de Mayfair.',
    address: '8 St. James\'s Square, Westminster',
    postcode: 'SW1Y 4JU',
    phone: '+44 20 7747 2500',
    email: 'membership@quilomboclub.co.uk',
    website: 'https://quilomboclub.co.uk',
    priceRange: '£££££',
    exclusivityLevel: 'Elite',
    specialties: ['Executive Networking', 'Fine Dining', 'Business Facilities', 'Cultural Events'],
    angolanConnection: 'Clientele',
    establishedYear: 2016,
    rating: 4.9,
    reviews: 156,
    image: '/businesses/angola/quilombo-club.jpg',
    features: ['Private Dining Rooms', 'Business Center', 'Library', 'Cigar Lounge', 'Cultural Gallery'],
    privateBooking: true,
    membershipRequired: true
  }
]

interface AngolaLuxuryDirectoryProps {
  className?: string
}

export default function AngolaLuxuryDirectory({ className = '' }: AngolaLuxuryDirectoryProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedExclusivity, setSelectedExclusivity] = useState<string>('all')

  const categories = [
    { key: 'all', label: 'All Businesses', icon: Building2 },
    { key: 'Fine Dining', label: 'Fine Dining', icon: ChefHat },
    { key: 'Investment', label: 'Investment Services', icon: TrendingUp },
    { key: 'Luxury Services', label: 'Luxury Services', icon: Crown },
    { key: 'Art & Culture', label: 'Art & Culture', icon: Palette },
    { key: 'Oil & Gas', label: 'Oil & Gas', icon: Briefcase }
  ]

  const exclusivityLevels = [
    { key: 'all', label: 'All Levels' },
    { key: 'Premium', label: 'Premium' },
    { key: 'Ultra Premium', label: 'Ultra Premium' },
    { key: 'Exclusive', label: 'Exclusive' },
    { key: 'Elite', label: 'Elite' }
  ]

  const getFilteredBusinesses = () => {
    return angolaLuxuryBusinesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          business.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory
      const matchesExclusivity = selectedExclusivity === 'all' || business.exclusivityLevel === selectedExclusivity
      
      return matchesSearch && matchesCategory && matchesExclusivity
    })
  }

  const getExclusivityColor = (level: string) => {
    switch (level) {
      case 'Elite':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white'
      case 'Exclusive':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'Ultra Premium':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
      case 'Premium':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriceRangeDisplay = (range: string) => {
    const prices = { '£££': '£150-500', '££££': '£500-1500', '£££££': '£1500+' }
    return prices[range as keyof typeof prices] || range
  }

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-amber-50 ${className}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Gem className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Angola Luxury Directory
            </h1>
            <p className="text-xl mb-4 max-w-3xl mx-auto leading-relaxed">
              London's Premier Angolan Business Directory
            </p>
            <p className="text-lg opacity-90 max-w-4xl mx-auto">
              Discover London's most sophisticated Angolan-owned businesses and services. 
              From exclusive restaurants in Mayfair to premium professional services in the City, 
              connect with establishments owned and operated by London's thriving Angolan community.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search luxury businesses, services, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white"
              >
                {categories.map(category => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Exclusivity Filter */}
            <div className="lg:w-48">
              <select
                value={selectedExclusivity}
                onChange={(e) => setSelectedExclusivity(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white"
              >
                {exclusivityLevels.map(level => (
                  <option key={level.key} value={level.key}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {getFilteredBusinesses().length} luxury businesses
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {getFilteredBusinesses().map((business) => (
            <Card key={business.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative">
                {/* Business Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${getExclusivityColor(business.exclusivityLevel)} shadow-sm`}>
                      {business.exclusivityLevel}
                    </Badge>
                    <Badge className="bg-white bg-opacity-90 text-gray-800">
                      {business.priceRange}
                    </Badge>
                  </div>

                  {/* Premium Features */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {business.membershipRequired && (
                      <Badge className="bg-purple-600 text-white shadow-sm">
                        <Crown className="h-3 w-3 mr-1" />
                        Members Only
                      </Badge>
                    )}
                    {business.privateBooking && (
                      <Badge className="bg-emerald-600 text-white shadow-sm">
                        Private Booking
                      </Badge>
                    )}
                  </div>

                  {/* Business Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl leading-tight mb-1">
                      {business.name}
                    </h3>
                    <p className="text-white text-sm opacity-90">
                      {business.category}
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Business Details */}
                <div className="space-y-4">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {business.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {business.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Location and Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}, {business.postcode}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="truncate">Website</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(business.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {business.rating} ({business.reviews} reviews)
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Est. {business.establishedYear}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {business.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" className="flex-1 border-amber-200 text-amber-800 hover:bg-amber-50">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            List Your Premium Business
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join London's most exclusive Angolan business directory. Showcase your London-based 
            business to the affluent Angolan diaspora and sophisticated Portuguese-speaking community living in the United Kingdom.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 px-8 py-4 text-lg"
          >
            <Diamond className="h-5 w-5 mr-2" />
            List Your Business
          </Button>
        </div>
      </div>
    </div>
  )
}