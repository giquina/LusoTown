'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShareIcon,
  CpuChipIcon,
  GiftIcon,
  DocumentTextIcon,
  BellIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'
import Link from 'next/link'

const BookingConfirmationPage = () => {
  const params = useParams()
  const router = useRouter()
  const eventId = params?.id as string
  
  // Only show for the AI Workshop event (ID 4)
  useEffect(() => {
    if (eventId !== '4') {
  router.push(ROUTES.events)
    }
  }, [eventId, router])

  const event = {
    id: 4,
    title: "AI Business App Creation Workshop",
    date: "Monday, 2nd December 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Tech Hub Central London",
    address: "123 Innovation Street, London EC2A 3LT",
    price: 30,
    bookingReference: "AI2025-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    specialOffer: "Free app creation for business ideas"
  }

  const handleAddToCalendar = () => {
    const startDate = new Date('2025-12-02T14:00:00')
    const endDate = new Date('2025-12-02T18:00:00')
    
    const calendarData = {
      text: event.title,
      dates: `${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      details: `Join us for this exciting AI workshop! Learn to create business applications using AI tools like ChatGPT and Claude. Free app creation for your business idea included!`,
      location: `${event.location}, ${event.address}`,
      ctz: 'Europe/London'
    }
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarData.text)}&dates=${calendarData.dates}&details=${encodeURIComponent(calendarData.details)}&location=${encodeURIComponent(calendarData.location)}&ctz=${calendarData.ctz}`
    
    window.open(calendarUrl, '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I\'m attending the AI Business App Creation Workshop!',
        text: `Just booked my spot at the ${event.title} on ${event.date}. Excited to learn AI tools and get a free app created for my business idea!`,
        url: window.location.origin + `/events/${eventId}`
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`I'm attending the ${event.title} on ${event.date}! Check it out: ${window.location.origin}/events/${eventId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        {/* Success Header */}
        <section className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                Booking Confirmed!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 mb-6"
              >
                You're all set for the AI Business App Creation Workshop
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block"
              >
                <div className="text-sm text-white/80 mb-1">Booking Reference</div>
                <div className="text-2xl font-bold text-white">{event.bookingReference}</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Event Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <CpuChipIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                        <div className="flex gap-2 mt-1">
                          <span className="bg-accent-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                            🎁 FREE GIVEAWAY
                          </span>
                          <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW EVENT
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{event.date}</div>
                          <div className="text-sm text-secondary-600">Date</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <ClockIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{event.time}</div>
                          <div className="text-sm text-secondary-600">Time</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:col-span-2">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-action-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{event.location}</div>
                          <div className="text-sm text-secondary-600">{event.address}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-amber-800 mb-2">
                        <GiftIcon className="w-5 h-5" />
                        <span className="font-semibold">Special Offer Included</span>
                      </div>
                      <p className="text-sm text-amber-700">{event.specialOffer}</p>
                    </div>
                  </motion.div>

                  {/* What to Expect */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">What to Expect</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Welcome & AI Tools Overview</h4>
                          <p className="text-secondary-600 text-sm">Introduction to ChatGPT, Claude, and other business AI tools</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-purple-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Hands-on Workshop</h4>
                          <p className="text-secondary-600 text-sm">Learn to create business applications step-by-step</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-action-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Live App Creation</h4>
                          <p className="text-secondary-600 text-sm">Watch us build a real app for a participant's business idea</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-amber-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Your Business Idea Workshop</h4>
                          <p className="text-secondary-600 text-sm">Get personalized feedback and potential app creation for your idea</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* What to Bring */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">What to Bring</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-action-500" />
                        <span className="text-secondary-700">Laptop or tablet</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-action-500" />
                        <span className="text-secondary-700">Notebook for ideas</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-action-500" />
                        <span className="text-secondary-700">Business idea (optional)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-action-500" />
                        <span className="text-secondary-700">Enthusiasm to learn!</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> All refreshments and materials are provided. WiFi and power outlets available throughout the venue.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                      
                      <div className="space-y-3">
                        <button
                          onClick={handleAddToCalendar}
                          className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <CalendarIcon className="w-5 h-5 text-primary-600" />
                          <span className="text-primary-700 font-medium">Add to Calendar</span>
                        </button>

                        <button
                          onClick={handleShare}
                          className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <ShareIcon className="w-5 h-5 text-action-600" />
                          <span className="text-green-700 font-medium">Share with Friends</span>
                        </button>

                        <Link
                          href={ROUTES.myEvents}
                          className="w-full flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <UserGroupIcon className="w-5 h-5 text-purple-600" />
                          <span className="text-purple-700 font-medium">View My Events</span>
                        </Link>
                      </div>
                    </motion.div>

                    {/* Important Information */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
                      
                      <div className="space-y-4 text-sm text-secondary-700">
                        <div className="flex items-start gap-3">
                          <BellIcon className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Event Reminders</div>
                            <div>You'll receive email reminders 24 hours and 2 hours before the event.</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <DocumentTextIcon className="w-5 h-5 text-primary-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Cancellation Policy</div>
                            <div>Full refund available up to 48 hours before the event.</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPinIcon className="w-5 h-5 text-action-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Venue Access</div>
                            <div>Doors open 15 minutes before the event. Please arrive on time.</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Contact Support */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <EnvelopeIcon className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="font-medium text-gray-900">Email Support</div>
                            <div className="text-sm text-secondary-600">events@lusotown.com</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <PhoneIcon className="w-5 h-5 text-action-500" />
                          <div>
                            <div className="font-medium text-gray-900">WhatsApp</div>
                            <div className="text-sm text-secondary-600">Quick response support</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                        Save this booking reference: <strong>{event.bookingReference}</strong>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BookingConfirmationPage