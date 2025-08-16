'use client'

import React from 'react'
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
  MusicalNoteIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import EventImageWithFallback from '@/components/EventImageWithFallback'

// Event Image Component with fallback
const EventImage = ({ event }: { event: typeof upcomingEvents[0] }) => {
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
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            {event.icon}
          </div>
          <div className="text-sm font-medium opacity-90">{event.category}</div>
        </div>
      </div>
      
      {/* Date badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-xs font-bold text-gray-900">{event.date}</div>
      </div>

      {/* Price badge */}
      <div className="absolute top-4 right-4 bg-green-500 text-white rounded-lg px-3 py-2">
        <div className="text-xs font-bold">£{event.price}</div>
      </div>
    </div>
  )
}

const upcomingEvents = [
  {
    id: 1,
    title: "Brazilian Feijoada & Samba - Women 30+ Only",
    description: "Authentic Brazilian feast with live samba music for mature Portuguese-speaking women",
    location: "Brixton, London",
    date: "Sat, 16 Dec",
    time: "2:00 PM",
    attendees: 18,
    maxAttendees: 25,
    price: 35,
    category: "Cultural & Food",
    image: "/events/portuguese/feijoada-samba.jpg",
    color: "from-yellow-400 to-green-400",
    icon: <MusicalNoteIcon className="w-5 h-5" />,
    ageRestriction: "Women of all ages welcome",
    tags: ["women-only", "all-ages", "Brazilian", "food", "samba"]
  },
  {
    id: 2,
    title: "Portuguese Football: Benfica vs Porto Screening",
    description: "Watch the classic rivalry with bifanas, Super Bock and passionate Portuguese fans",
    location: "Little Portugal, Stockwell",
    date: "Sun, 17 Dec",
    time: "4:00 PM",
    attendees: 32,
    maxAttendees: 45,
    price: 15,
    category: "Sports & Entertainment",
    image: "/events/portuguese/football-screening.jpg",
    color: "from-red-400 to-green-400",
    icon: <TicketIcon className="w-5 h-5" />,
    ageRestriction: "All Ages Welcome",
    tags: ["football", "Portuguese", "community", "bifanas"]
  },
  {
    id: 3,
    title: "Portuguese-Speaking Professional Women Networking - All Ages",
    description: "Career networking for Portuguese-speaking women with no children - child-free evening",
    location: "Canary Wharf, London",
    date: "Thu, 21 Dec", 
    time: "6:30 PM",
    attendees: 14,
    maxAttendees: 20,
    price: 42,
    category: "Professional Networking",
    image: "/events/portuguese/portuguese-networking.jpg",
    color: "from-primary-400 to-premium-400",
    icon: <UsersIcon className="w-5 h-5" />,
    ageRestriction: "Women of all ages welcome",
    tags: ["women-only", "all-ages", "professional", "networking", "career"]
  },
  {
    id: 4,
    title: "Cape Verdean Morna Music & Cachupa Night",
    description: "Experience Cape Verde's soul music with traditional cachupa stew",
    location: "East London Cultural Centre",
    date: "Fri, 22 Dec",
    time: "7:30 PM",
    attendees: 22,
    maxAttendees: 35,
    price: 28,
    category: "Cultural & Food",
    image: "/events/portuguese/cape-verde-night.jpg",
    color: "from-secondary-400 to-primary-400",
    icon: <MusicalNoteIcon className="w-5 h-5" />,
    ageRestriction: "All Ages Welcome",
    tags: ["Cape Verde", "morna", "cachupa", "music", "culture"]
  },
  {
    id: 5,
    title: "Mozambican Seafood BBQ - Women Only Gathering",
    description: "Beachside-style seafood BBQ for Portuguese-speaking women, childless welcome",
    location: "South London Park",
    date: "Sat, 23 Dec",
    time: "1:00 PM",
    attendees: 16,
    maxAttendees: 22,
    price: 38,
    category: "Cultural & Food",
    image: "/events/portuguese/mozambican-bbq.jpg",
    color: "from-orange-400 to-red-400",
    icon: <HeartIcon className="w-5 h-5" />,
    ageRestriction: "Family-friendly, all ages welcome",
    tags: ["women-only", "childless", "Mozambican", "seafood", "BBQ"]
  },
  {
    id: 6,
    title: "Portuguese Cinema Night: 'Capitães de Abril'",
    description: "Classic Portuguese film screening with English subtitles and wine",
    location: "Central London Cinema",
    date: "Wed, 27 Dec",
    time: "7:00 PM",
    attendees: 28,
    maxAttendees: 40,
    price: 18,
    category: "Film & Culture",
    image: "/events/portuguese/portuguese-cinema.jpg",
    color: "from-purple-400 to-pink-400",
    icon: <SparklesIcon className="w-5 h-5" />,
    ageRestriction: "Family-friendly, educational content",
    tags: ["Portuguese", "cinema", "history", "culture", "wine"]
  }
]

const eventStats = [
  { number: "150+", label: "Monthly Experiences", icon: <CalendarDaysIcon className="w-5 h-5" /> },
  { number: "750+", label: "Portuguese Speakers", icon: <UsersIcon className="w-5 h-5" /> },
  { number: "96%", label: "Cultural Satisfaction", icon: <HeartIcon className="w-5 h-5" /> },
  { number: "15+", label: "UK Cities", icon: <MapPinIcon className="w-5 h-5" /> }
]

export default function EventsShowcase() {
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
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
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
          {upcomingEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col"
            >
              {/* Event Image */}
              <EventImage event={event} />

              {/* Event Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h3>
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
                  <div className="flex items-center text-sm text-orange-600 font-medium">
                    <SparklesIcon className="w-4 h-4 mr-2 text-orange-500" />
                    {event.ageRestriction}
                  </div>
                </div>

                {/* Attendance bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Spaces filling fast</span>
                    <span className="text-xs font-medium text-primary-600">
                      {event.maxAttendees - event.attendees} left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* RSVP Button */}
                <div className="mt-auto">
                  <a 
                    href={`/events/${event.id}`}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 group-hover:scale-105 block text-center"
                  >
                    Reserve My Spot
                  </a>
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
              { name: "Food Festivals", icon: "🍲", count: "25+ events" },
              { name: "Fado & Music", icon: "🎶", count: "25+ events" },
              { name: "Football Viewing", icon: "⚽", count: "22+ events" },
              { name: "Women's Gatherings", icon: "👩‍🤝‍👩", count: "30+ events" },
              { name: "Professional Network", icon: "💼", count: "15+ events" },
              { name: "Cultural Cinema", icon: "🎬", count: "12+ events" }
            ].map((category, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors cursor-pointer group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500">
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
          <div className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Connect with Portuguese Culture?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Browse our full calendar of authentic Portuguese events, from traditional food festivals to professional networking. 
              Your Portuguese-speaking community awaits - discover your heritage and make lifelong connections!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/events" 
                className="inline-flex items-center bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                Browse All Events
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/signup" 
                className="inline-flex items-center border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
              >
                JOIN NOW
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}