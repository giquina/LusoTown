'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { angolaLuxuryEvents, getAngolaNetworkingEvents, getAngolaCulturalEvents, ANGOLA_LUXURY_PRICING } from '@/lib/angola-luxury-events'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Crown, 
  Diamond, 
  Building2, 
  Wine, 
  Briefcase, 
  MapPin, 
  Users, 
  Star,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react'

interface AngolaEliteNetworkProps {
  className?: string
}

export default function AngolaEliteNetwork({ className = '' }: AngolaEliteNetworkProps) {
  const { t } = useLanguage()
  const { tier } = useSubscription()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'cultural' | 'investment'>('all')
  
  const networkingEvents = getAngolaNetworkingEvents()
  const culturalEvents = getAngolaCulturalEvents()
  
  const getFilteredEvents = () => {
    switch (selectedCategory) {
      case 'business':
        return networkingEvents
      case 'cultural': 
        return culturalEvents
      case 'investment':
        return angolaLuxuryEvents.filter(event => 
          event.businessSectors?.includes('Oil & Gas') || 
          event.businessSectors?.includes('Diamonds') ||
          event.businessSectors?.includes('Finance')
        )
      default:
        return angolaLuxuryEvents
    }
  }

  const getExclusivityBadgeColor = (level: string) => {
    switch (level) {
      case 'Ultra-VIP':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
      case 'VIP':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'Private Club':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
      case 'Elite Circle':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price)
  }

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-amber-50 ${className}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Diamond className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Angola Elite Network
            </h1>
            <p className="text-xl mb-4 max-w-3xl mx-auto leading-relaxed">
              London's Premier Angolan Professional Network
            </p>
            <p className="text-lg opacity-90 max-w-4xl mx-auto">
              Connect with successful Angolan professionals thriving in London's business districts. 
              Join exclusive networking events in prestigious London venues, connecting the Angolan 
              diaspora with the broader Portuguese-speaking community in sophisticated settings.
            </p>
            
            {/* London Angolan Community Stats */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2,500+</div>
                <div className="text-sm opacity-90">Angolan Professionals in London</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">150+</div>
                <div className="text-sm opacity-90">Angolan-Owned Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">25+</div>
                <div className="text-sm opacity-90">Monthly London Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Elite Events', icon: Crown },
            { key: 'business', label: 'London Business Networking', icon: Briefcase },
            { key: 'cultural', label: 'Cultural Exchange', icon: Wine },
            { key: 'investment', label: 'Professional Development', icon: Diamond }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key as any)}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                selectedCategory === key 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg' 
                  : 'border-amber-200 text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Premium Access Notice for Non-Premium Members */}
        {tier !== 'premium' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Premium Membership Required</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Angola Elite Network events are exclusively available to Premium members. 
                  Upgrade to connect with London's most successful Angolan diaspora professionals.
                </p>
                <Button className="mt-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-700 hover:to-amber-700">
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredEvents().slice(0, 6).map((event) => (
            <Card key={event.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative">
                {/* Event Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getExclusivityBadgeColor(event.exclusivityLevel)} shadow-sm`}>
                      {event.exclusivityLevel}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white bg-opacity-90 text-gray-800">
                      {formatPrice(event.price)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-GB', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.time} - {event.endTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.currentAttendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Business Sectors */}
                {event.businessSectors && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.businessSectors.slice(0, 3).map((sector) => (
                        <Badge key={sector} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating */}
                {event.averageRating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(event.averageRating!) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {event.averageRating} ({event.totalReviews} reviews)
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transition-all"
                  disabled={tier !== 'premium'}
                >
                  {event.status === 'fully-booked' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Join Waitlist
                    </>
                  ) : (
                    <>
                      Reserve Your Place
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join Angola's Elite Network?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with London's most successful Angolan entrepreneurs and professionals 
            through sophisticated networking events held in prestigious London venues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 px-8 py-4 text-lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              Become Premium Member
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-200 text-amber-800 hover:bg-amber-50 px-8 py-4 text-lg"
            >
              <Building2 className="h-5 w-5 mr-2" />
              View All Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}