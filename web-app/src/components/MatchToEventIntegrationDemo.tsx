'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import EventCompatibilityMatcher from './EventCompatibilityMatcher'
import EventBuddySystem from './EventBuddySystem'
import EventBuddyDashboard from './EventBuddyDashboard'
import BookTogetherModal from './BookTogetherModal'
import {
  Users,
  Heart,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
  Music,
  Utensils,
  Trophy
} from 'lucide-react'
import type { Event, EventBuddy, GroupBooking } from '@/types/event'

// Mock event data with Portuguese cultural focus
const mockEvent: Event = {
  id: 1,
  title: "Noite de Fado Autêntico",
  description: "Uma noite íntima de Fado tradicional com fadistas portugueses consagrados no coração de Londres. Experimente a música que define a alma portuguesa.",
  location: "Portuguese Cultural Centre, South London",
  date: "Sáb, 7 Dez",
  time: "8:00 PM",
  endTime: "11:00 PM",
  attendees: 18,
  maxAttendees: 30,
  price: 35,
  category: "Music & Culture",
  image: "/events/portuguese/fado-night.jpg",
  color: "from-coral-500 to-accent-500",
  status: "available",
  culturalCategory: "Traditional Music",
  portugueseCulturalFocus: true,
  culturalTraditions: ["fado", "portuguese_music", "traditional_performance"],
  languageRequirements: "bilingual",
  heritageCelebration: "Portuguese Musical Heritage",
  buddyPricingEnabled: true,
  groupDiscountEnabled: true,
  maxGroupSize: 6,
  minGroupSize: 2,
  tags: ["fado", "traditional", "music", "portuguese", "cultural"],
  icon: <Music className="w-6 h-6 text-white" />
}

export default function MatchToEventIntegrationDemo() {
  const { language } = useLanguage()
  const [activeDemo, setActiveDemo] = useState<'compatibility' | 'buddy' | 'dashboard' | 'booking'>('compatibility')
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Mock user data for demo
  const currentUserId = 'current-user'
  const matchedUserId = 'matched-user-1'
  const matchedUserName = 'Maria Silva'
  const sharedInterests = ['fado', 'portuguese_cuisine', 'traditional_music', 'cultural_events']
  const culturalCompatibility = 92

  const handleEventSuggestion = (eventId: string) => {
    console.log('Event suggested to match:', eventId)
    // In real implementation, this would send the suggestion to the matched user
  }

  const handleBuddyRequest = (buddyRequest: Partial<EventBuddy>) => {
    console.log('Buddy request created:', buddyRequest)
    // In real implementation, this would create a buddy request in the database
  }

  const handleGroupBookingCreate = (booking: Partial<GroupBooking>) => {
    console.log('Group booking created:', booking)
    // In real implementation, this would create a group booking in the database
  }

  const demoSections = [
    {
      id: 'compatibility',
      title: 'Event Compatibility Matcher',
      description: 'AI-powered event recommendations based on match compatibility',
      icon: Sparkles,
      color: 'from-primary-500 to-secondary-500'
    },
    {
      id: 'buddy',
      title: 'Event Buddy System',
      description: 'Find companions for Portuguese cultural events with group discounts',
      icon: Users,
      color: 'from-coral-500 to-accent-500'
    },
    {
      id: 'dashboard',
      title: 'Buddy Dashboard',
      description: 'Manage all your event buddy requests and connections',
      icon: Calendar,
      color: 'from-secondary-500 to-coral-500'
    },
    {
      id: 'booking',
      title: 'Book Together Modal',
      description: 'Coordinate group bookings with friends and split payments',
      icon: Heart,
      color: 'from-accent-500 to-premium-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-secondary-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-3 mb-6"
          >
            <Heart className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">Match-to-Event Integration System</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Portuguese Community Events
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Discover how our AI-powered system connects Portuguese speakers through cultural events, 
            from Fado nights to cooking workshops, with intelligent matching and group booking features.
          </motion.p>

          {/* Demo Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {demoSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setActiveDemo(section.id as any)}
                  className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                    activeDemo === section.id
                      ? 'border-secondary-300 bg-white shadow-lg'
                      : 'border-gray-200 bg-white/50 hover:border-secondary-200 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {activeDemo === 'compatibility' && (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Event Compatibility Matcher Demo
                </h2>
                <p className="text-gray-600">
                  See how our AI recommends Portuguese cultural events based on your match with {matchedUserName}
                </p>
              </div>
              
              <EventCompatibilityMatcher
                userId={currentUserId}
                matchedUserId={matchedUserId}
                matchedUserName={matchedUserName}
                sharedInterests={sharedInterests}
                culturalCompatibility={culturalCompatibility}
                onEventSuggestion={handleEventSuggestion}
              />
            </div>
          )}

          {activeDemo === 'buddy' && (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Event Buddy System Demo
                </h2>
                <p className="text-gray-600">
                  Find companions for Portuguese events and save with group discounts
                </p>
              </div>
              
              <EventBuddySystem
                eventId={mockEvent.id.toString()}
                currentUserId={currentUserId}
                event={mockEvent}
                onBuddyRequest={handleBuddyRequest}
              />
            </div>
          )}

          {activeDemo === 'dashboard' && (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Event Buddy Dashboard Demo
                </h2>
                <p className="text-gray-600">
                  Manage all your event buddy requests and connections in one place
                </p>
              </div>
              
              <EventBuddyDashboard currentUserId={currentUserId} />
            </div>
          )}

          {activeDemo === 'booking' && (
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Book Together Feature Demo
                </h2>
                <p className="text-gray-600">
                  Coordinate group bookings with friends and take advantage of group discounts
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-100 to-coral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {mockEvent.title}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {mockEvent.description}
                </p>
                
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{mockEvent.date}</span>
                    </div>
                    <div className="text-lg font-semibold">{mockEvent.time}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="text-lg font-semibold">{mockEvent.location}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="text-lg font-semibold">£{mockEvent.price}</div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-semibold hover:from-secondary-600 hover:to-coral-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                >
                  <Users className="w-5 h-5" />
                  <span>Book Together</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Complete Portuguese Community Event Integration
          </h2>
          <p className="text-xl opacity-95 mb-8 max-w-4xl mx-auto">
            From intelligent event matching based on cultural compatibility to seamless group bookings 
            with buddy pricing - experience the future of Portuguese community engagement in London.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Matching',
                description: 'Smart event recommendations based on cultural compatibility and shared Portuguese heritage'
              },
              {
                icon: Users,
                title: 'Community Building',
                description: 'Find event buddies, create groups, and strengthen Portuguese community bonds'
              },
              {
                icon: Heart,
                title: 'Cultural Focus',
                description: 'Authentic Portuguese events from Fado nights to Santos Populares celebrations'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="opacity-90">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Book Together Modal */}
      <BookTogetherModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        event={mockEvent}
        currentUserId={currentUserId}
        onGroupBookingCreate={handleGroupBookingCreate}
      />
    </div>
  )
}