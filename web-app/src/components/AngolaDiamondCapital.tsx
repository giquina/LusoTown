'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Diamond,
  TrendingUp,
  Globe,
  Building2,
  Crown,
  Banknote,
  BarChart3,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Star,
  ChevronRight,
  Gem,
  DollarSign
} from 'lucide-react'

interface InvestmentOpportunity {
  id: string
  title: string
  sector: 'Diamonds' | 'Oil & Gas' | 'Luxury Real Estate' | 'Mining' | 'Infrastructure'
  description: string
  investmentRange: string
  expectedReturn: string
  riskLevel: 'Low' | 'Medium' | 'High'
  timeframe: string
  location: string
  highlights: string[]
  contactEmail: string
}

interface LuxuryDevelopment {
  id: string
  name: string
  location: string
  type: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Hospitality'
  description: string
  value: string
  completionDate: string
  features: string[]
  image: string
}

const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: 'diamond-001',
    title: 'London Diamond Trading Partnership',
    sector: 'Diamonds',
    description: 'Exclusive partnership with London-based Angolan diamond traders. Access established networks connecting United Kingdom luxury markets with premium suppliers, managed by experienced London-based professionals.',
    investmentRange: '£500K - £5M',
    expectedReturn: '12-18% annually',
    riskLevel: 'Medium',
    timeframe: '3-7 years',
    location: 'Hatton Garden, London',
    highlights: [
      'Established London diamond trading network',
      'Direct access to United Kingdom luxury markets',
      'Experienced Angolan-British management team',
      'Connections to major London jewelers'
    ],
    contactEmail: 'diamonds@angolaelite.co.uk'
  },
  {
    id: 'oil-001',
    title: 'London Energy Consulting Firm',
    sector: 'Oil & Gas',
    description: 'Strategic partnership with London-based energy consultancy founded by former Angola oil executives. Specializes in connecting United Kingdom investors with international energy opportunities.',
    investmentRange: '£1M - £10M',
    expectedReturn: '15-22% annually', 
    riskLevel: 'Medium',
    timeframe: '3-8 years',
    location: 'City of London',
    highlights: [
      'Led by former Angola oil industry executives',
      'Strong United Kingdom regulatory compliance track record',
      'Established client base in London\'s financial district',
      'Growing portfolio of international projects'
    ],
    contactEmail: 'oil@angolaelite.co.uk'
  },
  {
    id: 'real-estate-001',
    title: 'London Luxury Property Investment Fund',
    sector: 'Luxury Real Estate',
    description: 'Exclusive London property investment fund managed by successful Angolan real estate professionals. Focuses on prime London locations popular with international professionals.',
    investmentRange: '£250K - £5M',
    expectedReturn: '8-15% annually',
    riskLevel: 'Low',
    timeframe: '2-5 years',
    location: 'Mayfair & Canary Wharf, London',
    highlights: [
      'Prime London locations in Zones 1-2',
      'Managed by experienced London-based team',
      'Strong rental yields from international tenants',
      'Established relationships with London property developers'
    ],
    contactEmail: 'realestate@angolaelite.co.uk'
  }
]

const luxuryDevelopments: LuxuryDevelopment[] = [
  {
    id: 'dev-001',
    name: 'Angolan Heritage Centre London',
    location: 'Canary Wharf, London',
    type: 'Mixed-Use',
    description: 'Premium cultural and business center celebrating Angolan heritage in London. Features exhibition spaces, business facilities, and luxury event venues for the Angolan diaspora community.',
    value: '£25M development',
    completionDate: '2026',
    features: ['Cultural Exhibition Space', 'Business Center', 'Conference Facilities', 'Fine Dining Restaurant', 'Art Gallery'],
    image: '/developments/heritage-centre.jpg'
  },
  {
    id: 'dev-002',
    name: 'Lusophone Quarter Business Hub',
    location: 'Aldgate, London',
    type: 'Commercial',
    description: 'Modern business complex designed for Lusophone and Angolan entrepreneurs in London. Premium office spaces with co-working areas, meeting rooms, and cultural facilities.',
    value: '£12M development',
    completionDate: '2025',
    features: ['Flexible Office Spaces', 'Co-working Areas', 'Meeting Rooms', 'Lusophone Café', 'Business Incubator'],
    image: '/developments/portuguese-quarter.jpg'
  },
  {
    id: 'dev-003',
    name: 'Luanda London Restaurant',
    location: 'Fitzrovia, London',
    type: 'Hospitality',
    description: 'Premium Angolan restaurant bringing authentic high-end cuisine to London. Designed as a cultural hub for the Angolan community and fine dining destination for London food enthusiasts.',
    value: '£3M development',
    completionDate: '2025',
    features: ['Authentic Angolan Cuisine', 'Wine Cellar', 'Private Dining', 'Cultural Events Space', 'Chef\'s Table'],
    image: '/developments/luanda-restaurant.jpg'
  }
]

interface AngolaDiamondCapitalProps {
  className?: string
}

export default function AngolaDiamondCapital({ className = '' }: AngolaDiamondCapitalProps) {
  const { t } = useLanguage()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'investments' | 'developments'>('overview')

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'  
      case 'High': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'Diamonds': return <Diamond className="h-5 w-5" />
      case 'Oil & Gas': return <BarChart3 className="h-5 w-5" />
      case 'Luxury Real Estate': return <Building2 className="h-5 w-5" />
      case 'Mining': return <Gem className="h-5 w-5" />
      case 'Infrastructure': return <Globe className="h-5 w-5" />
      default: return <TrendingUp className="h-5 w-5" />
    }
  }

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-amber-50 ${className}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 opacity-10">
            <Diamond className="h-32 w-32" />
          </div>
          <div className="absolute bottom-20 right-20 opacity-10">
            <Gem className="h-24 w-24" />
          </div>
          <div className="absolute top-40 right-40 opacity-5">
            <Sparkles className="h-40 w-40" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Diamond className="h-20 w-20 text-yellow-300" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-200" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              London-Angola Business Excellence
            </h1>
            <p className="text-2xl mb-6 max-w-4xl mx-auto leading-relaxed">
              Connecting London's Financial Expertise with Angolan Heritage
            </p>
            <p className="text-lg opacity-90 max-w-5xl mx-auto mb-10">
              Connect with London's most sophisticated Angolan business professionals who bridge 
              United Kingdom financial expertise with Angola's rich heritage. Network with successful diaspora 
              entrepreneurs, access London-based business opportunities, and join the elite community 
              that celebrates Angola's legacy while thriving in London's business districts.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Diamond className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">2,500+</div>
                <div className="text-sm opacity-90">Angolan Professionals in London</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <BarChart3 className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">150+</div>
                <div className="text-sm opacity-90">London-Based Businesses</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Building2 className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">£500M+</div>
                <div className="text-sm opacity-90">London Business Network Value</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">35+</div>
                <div className="text-sm opacity-90">Monthly London Networking Events</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500 px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                <Crown className="h-5 w-5 mr-2" />
                Explore Investment Opportunities
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-800 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Download Investment Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            {[
              { key: 'overview', label: 'Community Overview', icon: Globe },
              { key: 'investments', label: 'Business Opportunities', icon: TrendingUp },
              { key: 'developments', label: 'London Projects', icon: Building2 }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={selectedTab === key ? 'default' : 'ghost'}
                onClick={() => setSelectedTab(key as any)}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  selectedTab === key 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Market Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-12">
            {/* Natural Resource Wealth */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                <CardContent className="p-8 text-center">
                  <Diamond className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">London Business Excellence</h3>
                  <p className="text-gray-700 mb-4">
                    London's Angolan community includes successful professionals across finance, consulting, and luxury sectors
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Business Professionals:</span>
                      <span className="font-semibold">2,500+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>London Businesses:</span>
                      <span className="font-semibold">150+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Events:</span>
                      <span className="font-semibold">25+ monthly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Success</h3>
                  <p className="text-gray-700 mb-4">
                    Angolan professionals excelling in London's competitive business environment across multiple sectors
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>City Finance:</span>
                      <span className="font-semibold">800+ professionals</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consulting:</span>
                      <span className="font-semibold">450+ consultants</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entrepreneurs:</span>
                      <span className="font-semibold">300+ business owners</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Cultural Heritage</h3>
                  <p className="text-gray-700 mb-4">
                    London's Angolan community maintains strong cultural connections while building successful careers in the United Kingdom
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cultural Events:</span>
                      <span className="font-semibold">15+ monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Art Galleries:</span>
                      <span className="font-semibold">8 active spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Restaurants:</span>
                      <span className="font-semibold">12 establishments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* London-Angola Connection */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  London's Angolan Business Excellence
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                  London's world-class business environment attracts Angola's most talented entrepreneurs 
                  and professionals, creating a thriving diaspora community that bridges cultures while 
                  achieving remarkable success in the United Kingdom market.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Crown className="h-8 w-8 text-amber-600" />,
                    title: 'Business Excellence',
                    description: 'London-based Angolan professionals excelling in finance, consulting, and luxury sectors'
                  },
                  {
                    icon: <Globe className="h-8 w-8 text-blue-600" />,
                    title: 'Cultural Bridge',
                    description: 'Connecting London\'s business opportunities with Angola\'s rich cultural heritage'
                  },
                  {
                    icon: <Users className="h-8 w-8 text-emerald-600" />,
                    title: 'Professional Network',
                    description: 'Thriving community of successful Angolan entrepreneurs and executives in London'
                  },
                  {
                    icon: <DollarSign className="h-8 w-8 text-purple-600" />,
                    title: 'Business Success',
                    description: 'London-based Angolan businesses creating value and employment in the United Kingdom market'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Investment Opportunities Tab */}
        {selectedTab === 'investments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {investmentOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    {getSectorIcon(opportunity.sector)}
                    <Badge className={`${getRiskColor(opportunity.riskLevel)} border-0`}>
                      {opportunity.riskLevel} Risk
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                  <p className="text-amber-100">{opportunity.sector}</p>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {opportunity.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Investment Range:</span>
                      <span className="font-semibold text-green-600">{opportunity.investmentRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Expected Return:</span>
                      <span className="font-semibold text-blue-600">{opportunity.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Timeframe:</span>
                      <span className="font-semibold">{opportunity.timeframe}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="font-semibold">{opportunity.location}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Highlights:</h4>
                    <ul className="space-y-2">
                      {opportunity.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700">
                    Request Investment Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Luxury Developments Tab */}
        {selectedTab === 'developments' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {luxuryDevelopments.map((development) => (
              <Card key={development.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Development Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white bg-opacity-90 text-gray-800">
                      {development.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                      {development.value}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-2xl leading-tight mb-1">
                      {development.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white text-sm opacity-90">
                      <MapPin className="h-4 w-4" />
                      <span>{development.location}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {development.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Development Value:</span>
                      <span className="font-semibold text-green-600">{development.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion:</span>
                      <span className="font-semibold">{development.completionDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="font-semibold">{development.type}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Premium Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {development.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700">
                      Learn More
                    </Button>
                    <Button variant="outline" className="flex-1 border-amber-200 text-amber-800 hover:bg-amber-50">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Final Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 text-white rounded-3xl p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Diamond className="h-16 w-16 text-yellow-300" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join London's Angolan Business Elite?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Connect with London's most successful Angolan professionals and entrepreneurs. 
              Access exclusive networking opportunities, business partnerships, and cultural events 
              that celebrate Angola's heritage while building success in London's dynamic business environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 px-10 py-5 text-lg font-semibold"
              >
                <Crown className="h-6 w-6 mr-3" />
                Join Network
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-800 px-10 py-5 text-lg backdrop-blur-sm"
              >
                <ExternalLink className="h-6 w-6 mr-3" />
                View Business Directory
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}