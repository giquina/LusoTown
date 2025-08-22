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
    title: 'Angola Diamond Mining Partnership',
    sector: 'Diamonds',
    description: 'Exclusive partnership opportunity in Angola\'s $12 billion diamond industry. Direct access to certified diamond deposits with established mining rights and London-based trade connections.',
    investmentRange: '£5M - £50M',
    expectedReturn: '18-25% annually',
    riskLevel: 'Medium',
    timeframe: '5-10 years',
    location: 'Lunda Sul Province, Angola',
    highlights: [
      'Certified diamond reserves worth £200M+',
      'Established mining infrastructure',
      'Direct London Diamond Bourse connections',
      'Government partnership agreements'
    ],
    contactEmail: 'diamonds@angolaelite.co.uk'
  },
  {
    id: 'oil-001',
    title: 'Cabinda Oil Field Development',
    sector: 'Oil & Gas',
    description: 'Strategic investment in Angola\'s proven oil reserves. Partner with established operators in one of Africa\'s most productive oil regions with direct pipeline to European markets.',
    investmentRange: '£25M - £100M',
    expectedReturn: '22-30% annually', 
    riskLevel: 'Medium',
    timeframe: '7-15 years',
    location: 'Cabinda Province, Angola',
    highlights: [
      'Proven oil reserves of 2.5 billion barrels',
      'Established production infrastructure',
      'European market pipeline access',
      'Experienced international partners'
    ],
    contactEmail: 'oil@angolaelite.co.uk'
  },
  {
    id: 'real-estate-001',
    title: 'Luanda Luxury Waterfront Development',
    sector: 'Luxury Real Estate',
    description: 'Premium residential and commercial development in Luanda\'s exclusive Ilha district. Ultra-luxury apartments and commercial spaces targeting Angola\'s elite and international executives.',
    investmentRange: '£10M - £75M',
    expectedReturn: '15-22% annually',
    riskLevel: 'Low',
    timeframe: '3-7 years',
    location: 'Ilha do Cabo, Luanda',
    highlights: [
      'Waterfront location in Luanda\'s most exclusive area',
      'Luxury amenities and international standards',
      'Growing demand from oil industry executives',
      'Government-backed development permits'
    ],
    contactEmail: 'realestate@angolaelite.co.uk'
  }
]

const luxuryDevelopments: LuxuryDevelopment[] = [
  {
    id: 'dev-001',
    name: 'Diamond Heights Luanda',
    location: 'Talatona, Luanda',
    type: 'Residential',
    description: 'Ultra-luxury residential towers featuring panoramic views of Luanda Bay. Designed for Angola\'s elite with world-class amenities and international security standards.',
    value: '£150M development',
    completionDate: '2026',
    features: ['24/7 Security', 'Infinity Pool', 'Private Marina', 'Helicopter Landing', 'Luxury Spa'],
    image: '/developments/diamond-heights.jpg'
  },
  {
    id: 'dev-002',
    name: 'Cabinda Business Plaza',
    location: 'Cabinda City, Cabinda',
    type: 'Commercial',
    description: 'Premium office and retail complex serving the oil industry. International-standard facilities designed for multinational corporations operating in Angola\'s energy sector.',
    value: '£85M development',
    completionDate: '2025',
    features: ['Grade A Offices', 'Conference Centers', 'Luxury Retail', 'Executive Parking', 'Fiber Connectivity'],
    image: '/developments/cabinda-plaza.jpg'
  },
  {
    id: 'dev-003',
    name: 'Benguela Luxury Resort',
    location: 'Benguela Province',
    type: 'Hospitality',
    description: 'Exclusive beachfront resort targeting international luxury travelers and Angola\'s wealthy elite. Premium accommodations with private beach access and world-class amenities.',
    value: '£120M development',
    completionDate: '2027',
    features: ['Private Beach', '5-Star Spa', 'Championship Golf', 'Marina Club', 'Fine Dining'],
    image: '/developments/benguela-resort.jpg'
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
              Angola: Africa's Diamond Capital
            </h1>
            <p className="text-2xl mb-6 max-w-4xl mx-auto leading-relaxed">
              Unlock the Wealth of a Nation Rich in Natural Resources
            </p>
            <p className="text-lg opacity-90 max-w-5xl mx-auto mb-10">
              Discover exclusive investment opportunities in Angola's $12 billion diamond industry, 
              $45 billion oil sector, and emerging luxury real estate market. Connect with London's 
              most sophisticated Angolan business network and access Africa's most promising wealth-building opportunities.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Diamond className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">$12B+</div>
                <div className="text-sm opacity-90">Diamond Industry Value</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <BarChart3 className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">$45B+</div>
                <div className="text-sm opacity-90">Oil & Gas Sector</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Building2 className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">£8B+</div>
                <div className="text-sm opacity-90">UK Investment Flow</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Users className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-300">50,000+</div>
                <div className="text-sm opacity-90">UK Angolan Diaspora</div>
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
              { key: 'overview', label: 'Market Overview', icon: Globe },
              { key: 'investments', label: 'Investment Opportunities', icon: TrendingUp },
              { key: 'developments', label: 'Luxury Developments', icon: Building2 }
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Diamond Wealth</h3>
                  <p className="text-gray-700 mb-4">
                    Angola is the world's 4th largest diamond producer, with over $12 billion in annual production
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Annual Production:</span>
                      <span className="font-semibold">$12B+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Global Market Share:</span>
                      <span className="font-semibold">7.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proven Reserves:</span>
                      <span className="font-semibold">180M carats</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Oil & Gas</h3>
                  <p className="text-gray-700 mb-4">
                    Africa's 2nd largest oil producer with $45 billion industry value and European pipeline access
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Daily Production:</span>
                      <span className="font-semibold">1.4M barrels</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proven Reserves:</span>
                      <span className="font-semibold">9.5B barrels</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Export Revenue:</span>
                      <span className="font-semibold">$45B annually</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Luxury Real Estate</h3>
                  <p className="text-gray-700 mb-4">
                    Rapidly growing luxury property market in Luanda and coastal regions, targeting elite clientele
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Market Growth:</span>
                      <span className="font-semibold">15-25% annually</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luanda Premium:</span>
                      <span className="font-semibold">$5,000/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>International Demand:</span>
                      <span className="font-semibold">Growing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* London-Angola Connection */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  The London-Angola Advantage
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                  London's financial expertise combined with Angola's natural wealth creates 
                  unprecedented opportunities for sophisticated investors and entrepreneurs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Crown className="h-8 w-8 text-amber-600" />,
                    title: 'Financial Hub',
                    description: 'Access London\'s world-class financial services and investment expertise'
                  },
                  {
                    icon: <Globe className="h-8 w-8 text-blue-600" />,
                    title: 'Trade Networks',
                    description: 'Established trade relationships between UK and Angola worth £8B+ annually'
                  },
                  {
                    icon: <Users className="h-8 w-8 text-emerald-600" />,
                    title: 'Elite Diaspora',
                    description: '50,000+ affluent Angolans in UK providing cultural and business bridges'
                  },
                  {
                    icon: <DollarSign className="h-8 w-8 text-purple-600" />,
                    title: 'Investment Flow',
                    description: 'Growing UK investment in Angola\'s luxury and resource sectors'
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
              Ready to Unlock Angola's Wealth?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join London's most exclusive network of Angolan investors and entrepreneurs. 
              Access premium investment opportunities in Africa's diamond capital and connect 
              with the sophisticated wealth-building community that bridges London and Luanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 px-10 py-5 text-lg font-semibold"
              >
                <Crown className="h-6 w-6 mr-3" />
                Schedule Private Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-800 px-10 py-5 text-lg backdrop-blur-sm"
              >
                <ExternalLink className="h-6 w-6 mr-3" />
                Download Investment Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}