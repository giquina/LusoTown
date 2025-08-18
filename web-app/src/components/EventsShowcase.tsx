'use client'

import React, { useState, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UsersIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  TicketIcon,
  HeartIcon,
  BeakerIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  CpuChipIcon,
  GiftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import WaitingListModal from '@/components/WaitingListModal'
import { useWaitingList } from '@/context/WaitingListContext'
import { useLanguage } from '@/context/LanguageContext'
import type { Event } from '@/types/event'
import { formatPrice } from '@/config/pricing'

// Event Image Component with fallback - Memoized for performance
const EventImage = memo(({ event }: { event: Event }) => {
  return (
    <div className="h-48 relative overflow-hidden">
      <EventImageWithFallback
        src={event.image}
        alt={`${event.title} event image`}
        category={event.category}
        className="object-cover"
        fill
        priority
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Category icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-xl">
            {event.icon}
          </div>
          <div className="text-sm font-semibold opacity-95 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">{event.category}</div>
        </div>
      </div>
      
      {/* Date badge */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg">
        <div className="text-xs font-bold text-gray-900">{event.date}</div>
      </div>

      {/* Status/Price badge */}
      <div className={`absolute top-4 right-4 rounded-xl px-3 py-2 shadow-lg ${
        event.status === 'available' 
          ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white'
          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
      }`}>
        <div className="text-xs font-bold">
          {event.status === 'available' ? `${formatPrice(event.price)}` : 'SOLD OUT'}
        </div>
      </div>

      {/* Special badges for featured event */}
      {event.featured && (
        <>
          <div className="absolute top-16 left-4 bg-gradient-to-r from-accent-400 to-coral-500 text-white rounded-lg px-2 py-1 shadow-lg animate-pulse">
            <div className="text-xs font-bold flex items-center">
              <GiftIcon className="w-3 h-3 mr-1" />
              FREE GIVEAWAY
            </div>
          </div>
          <div className="absolute top-28 left-4 bg-gradient-to-r from-primary-500 to-premium-600 text-white rounded-lg px-2 py-1 shadow-lg">
            <div className="text-xs font-bold">NEW EVENT</div>
          </div>
        </>
      )}
    </div>
  )
})
EventImage.displayName = 'EventImage'

const upcomingEvents: Event[] = [
  {
    id: 4,
    title: "AI Business App Creation Workshop",
    description: "Beginners session on using AI apps and generative AI tools to create business applications. Free live app creation for business ideas - we'll build your app during the event!",
    location: "Tech Hub Central London",
    address: "123 Innovation Street, London EC2A 3LT",
    date: "Mon, 2 Dec",
    time: "2:00 PM",
    endTime: "6:00 PM",
    attendees: 50,
    maxAttendees: 50,
    price: 30,
    category: "AI & Technology",
    image: "/events/portuguese/ai-workshop.svg",
    color: "from-action-500 to-premium-500",
    icon: <CpuChipIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Open to all ages - beginners welcome",
    tags: ["AI", "technology", "business", "workshop", "live-demo", "free-giveaway"],
    status: "fully-booked",
    featured: true,
    specialOffer: "Free app creation for business ideas",
    agenda: [
      "2:00-2:30 PM: Welcome & AI Tools Overview",
      "2:30-3:30 PM: ChatGPT, Claude & Business Apps",
      "3:30-4:00 PM: Break & Networking",
      "4:00-5:30 PM: Live App Creation Demo",
      "5:30-6:00 PM: Your Business Idea Workshop"
    ]
  },
  {
    id: 1,
    title: "Portuguese Business Networking Summit",
    description: "Connect with Portuguese entrepreneurs and business leaders. Panel discussions on UK market expansion and cultural bridge-building in international business.",
    location: "Canary Wharf, London",
    date: "Fri, 15 Mar",
    time: "6:00 PM",
    attendees: 50,
    maxAttendees: 50,
    price: 45,
    category: "Business & Professional",
    image: "/events/portuguese/portuguese-networking.jpg",
    color: "from-primary-500 to-secondary-500",
    icon: <UsersIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Professional networking for all ages",
    tags: ["business", "networking", "entrepreneurship", "professional"],
    status: "fully-booked"
  },
  {
    id: 2,
    title: "Traditional Portuguese Cooking Workshop",
    description: "Learn to make authentic pastéis de nata, bacalhau à brás, and francesinha from a Portuguese chef. All skill levels welcome, recipes included.",
    location: "Central London Culinary School",
    date: "Sat, 23 Mar",
    time: "2:00 PM",
    attendees: 24,
    maxAttendees: 24,
    price: 55,
    category: "Cooking & Culture",
    image: "/events/wine-paint.jpg",
    color: "from-coral-500 to-accent-500",
    icon: <BeakerIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Welcome to all ages and skill levels",
    tags: ["cooking", "traditional", "pastéis de nata", "bacalhau", "all-ages"],
    status: "fully-booked"
  },
  {
    id: 3,
    title: "Premium Transport & Security Services Showcase",
    description: "Experience our professional Portuguese-speaking transport and close protection services. Meet certified SIA officers and view our premium vehicle fleet.",
    location: "South London Event Center",
    date: "Sun, 31 Mar",
    time: "11:00 AM",
    attendees: 12,
    maxAttendees: 30,
    price: 25,
    category: "Transport & Security",
    image: "/events/portuguese/transport-showcase.jpg",
    color: "from-action-500 to-premium-500",
    icon: <TicketIcon className="w-6 h-6 text-white" />,
    ageRestriction: "Open to business professionals and individuals",
    tags: ["transport", "security", "SIA", "Portuguese-speaking", "professional"],
    status: "available"
  },
]

const eventStats = [
  { number: "150+", label: "Monthly Experiences", icon: <CalendarDaysIcon className="w-5 h-5" /> },
  { number: "750+", label: "Portuguese Speakers", icon: <UsersIcon className="w-5 h-5" /> },
  { number: "96%", label: "Cultural Satisfaction", icon: <HeartIcon className="w-5 h-5" /> },
  { number: "15+", label: "UK Cities", icon: <MapPinIcon className="w-5 h-5" /> }
]

const EventsShowcase = memo(() => {
  const { getWaitingListCount } = useWaitingList()
  const { language } = useLanguage()
  const [waitingListModalOpen, setWaitingListModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
  // Memoize filtered events for performance
  const filteredEvents = useMemo(() => {
    return upcomingEvents.slice(0, 6) // Show only first 6 events
  }, [])

  const handleJoinWaitingList = (event: Event) => {
    setSelectedEvent(event)
    setWaitingListModalOpen(true)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-3 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">Discover Amazing Events</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            From Feijoada Lunches to Fado Evenings
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover authentic Portuguese-speaking cultural events across the UK. From traditional food festivals 
            to professional networking, connect with your heritage and build lasting friendships.
          </motion.p>
        </div>

        {/* Stats Bar - Enhanced Multi-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {eventStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Events - Enhanced Multi-Column Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {filteredEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Event Image */}
              <EventImage event={event} />

              {/* Event Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                    {event.title}
                  </h3>
                  {event.status === 'fully-booked' && (
                    <div className="bg-action-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {language === 'pt' ? 'LOTADO' : 'FULLY BOOKED'}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.attendees}/{event.maxAttendees} attending
                  </div>
                  <div className="flex items-center text-sm text-coral-600 font-medium">
                    <SparklesIcon className="w-4 h-4 mr-2 text-coral-500" />
                    {event.ageRestriction}
                  </div>
                </div>

                {/* Attendance bar or Special Features */}
                <div className="mb-4">
                  {event.status === 'available' ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-secondary-600 font-medium flex items-center">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Available to book
                        </span>
                        <span className="text-xs font-medium text-primary-600">
                          {event.maxAttendees - event.attendees} spots left
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                      {event.specialOffer && (
                        <div className="mt-2 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                          🎁 {event.specialOffer}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-action-600 font-medium">
                          {language === 'pt' ? 'Completo' : 'Fully booked'}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `100%` }}
                        ></div>
                      </div>
                      {/* Waiting List Info */}
                      <div className="mt-2 text-xs text-coral-600 font-medium bg-coral-50 px-2 py-1 rounded-lg border border-coral-200">
                        <UsersIcon className="w-3 h-3 inline mr-1" />
                        {getWaitingListCount(event.id)} {language === 'pt' ? 'na lista de espera' : 'on waiting list'}
                      </div>
                    </>
                  )}
                </div>

                {/* RSVP Button */}
                <div className="mt-auto space-y-3">
                  {event.status === 'available' ? (
                    <>
                      <a 
                        href={`/events/${event.id}/book`}
                        className="w-full bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700 text-white font-semibold py-4 rounded-2xl hover:from-secondary-600 hover:via-secondary-700 hover:to-secondary-800 transition-all duration-300 group-hover:scale-105 text-center shadow-xl hover:shadow-2xl animate-pulse min-h-[44px] flex items-center justify-center"
                      >
                        Book Now - {formatPrice(event.price)}
                      </a>
                      {/* Book Together Button for Portuguese cultural events */}
                      {event.featured && (
                        <button className="w-full bg-gradient-to-r from-coral-500 to-accent-500 text-white font-medium py-3 rounded-xl hover:from-coral-600 hover:to-accent-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl min-h-[40px] flex items-center justify-center gap-2">
                          <UsersIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Reservar em Grupo' : 'Book Together'}
                        </button>
                      )}
                    </>
                  ) : (
                    <button 
                      onClick={() => handleJoinWaitingList(event)}
                      className="w-full bg-gradient-to-r from-coral-500 via-accent-500 to-accent-600 text-white font-semibold py-4 rounded-2xl hover:from-coral-600 hover:via-accent-600 hover:to-accent-700 transition-all duration-300 group-hover:scale-105 block text-center shadow-xl hover:shadow-2xl min-h-[44px]"
                    >
                      {language === 'pt' ? 'Juntar à Lista de Espera' : 'Join Waiting List'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Event Categories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Events by Your Interests
          </h3>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-5">
            {[
              { name: "AI & Technology", icon: "🤖", count: "1 available" },
              { name: "Business Events", icon: "💼", count: "15+ events" },
              { name: "Cooking Classes", icon: "👨‍🍳", count: "12+ events" },
              { name: "Transport Services", icon: "🚗", count: "8+ services" },
              { name: "Cultural Events", icon: "🎭", count: "25+ events" },
              { name: "Professional Network", icon: "🤝", count: "18+ events" }
            ].map((category, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-secondary-50/30 hover:from-secondary-50 hover:to-primary-50 transition-all duration-300 cursor-pointer group border border-gray-100/50 hover:border-secondary-200/50 shadow-xl hover:shadow-2xl"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {category.count}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 rounded-3xl p-10 text-white shadow-2xl border border-white/10">
            <h3 className="text-3xl font-bold mb-6">
              Join the Portuguese Community in London & UK
            </h3>
            <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
              From business networking to traditional cooking, transport services to cultural events. 
              Connect with fellow Portuguese speakers and build meaningful relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/events" 
                className="inline-flex items-center bg-white text-secondary-600 font-bold px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                View Events
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/signup" 
                className="inline-flex items-center border-2 border-white text-white font-bold px-10 py-4 rounded-2xl hover:bg-white hover:text-secondary-600 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                Join Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waiting List Modal */}
      {selectedEvent && (
        <WaitingListModal
          isOpen={waitingListModalOpen}
          onClose={() => setWaitingListModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </section>
  )
})
EventsShowcase.displayName = 'EventsShowcase'

export default EventsShowcase