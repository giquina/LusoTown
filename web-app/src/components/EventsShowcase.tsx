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
    title: "Wine & Paint Night",
    description: "Creative evening with fellow art lovers in a cozy Covent Garden studio",
    location: "Covent Garden, London",
    date: "Fri, 15 Dec",
    time: "7:00 PM",
    attendees: 12,
    maxAttendees: 16,
    price: 25,
    category: "Art & Culture",
    image: "/events/wine-paint.jpg",
    color: "from-purple-400 to-pink-400",
    icon: <BeakerIcon className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Book Club Brunch",
    description: "Discuss 'Fourth Wing' over bottomless brunch in trendy Shoreditch",
    location: "Shoreditch, London", 
    date: "Sun, 17 Dec",
    time: "11:00 AM",
    attendees: 8,
    maxAttendees: 12,
    price: 35,
    category: "Books & Learning",
    image: "/events/book-brunch.jpg",
    color: "from-emerald-400 to-teal-400",
    icon: <BookOpenIcon className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Jazz Night & Networking",
    description: "Professional networking with live jazz at an exclusive London venue",
    location: "Mayfair, London",
    date: "Thu, 21 Dec", 
    time: "6:30 PM",
    attendees: 24,
    maxAttendees: 30,
    price: 45,
    category: "Networking",
    image: "/events/jazz-networking.jpg",
    color: "from-amber-400 to-orange-400",
    icon: <MusicalNoteIcon className="w-5 h-5" />
  }
]

const eventStats = [
  { number: "30+", label: "Events This Month", icon: <CalendarDaysIcon className="w-5 h-5" /> },
  { number: "300+", label: "Active Members", icon: <UsersIcon className="w-5 h-5" /> },
  { number: "98%", label: "Satisfaction Rate", icon: <HeartIcon className="w-5 h-5" /> },
  { number: "45+", label: "UK Locations", icon: <MapPinIcon className="w-5 h-5" /> }
]

export default function EventsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
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
            From Wine Tastings to Career Workshops
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join curated experiences designed for accomplished women 30+. From intimate dinner parties 
            to professional networking events, find activities that match your interests and lifestyle.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
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

        {/* Featured Events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              {/* Event Image */}
              <EventImage event={event} />

              {/* Event Content */}
              <div className="p-6">
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
                <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 group-hover:scale-105">
                  Reserve My Spot
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Event Categories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Events by Your Interests
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Wine & Dining", icon: "🍷", count: "45+ events" },
              { name: "Art & Culture", icon: "🎨", count: "32+ events" },
              { name: "Book Clubs", icon: "📚", count: "28+ events" },
              { name: "Fitness & Wellness", icon: "🧘‍♀️", count: "38+ events" },
              { name: "Career Network", icon: "💼", count: "22+ events" },
              { name: "Travel & Adventures", icon: "✈️", count: "15+ events" }
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
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join the Fun?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Browse our full calendar of events, from intimate dinner parties to exciting weekend getaways. 
              Your next best friend might be waiting at our next event!
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
                Join Community Free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}