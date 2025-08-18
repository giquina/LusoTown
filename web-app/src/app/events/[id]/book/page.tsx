'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CpuChipIcon,
  GiftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

const AIWorkshopBookingPage = () => {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const eventId = params?.id as string
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessIdea: '',
    aiExperience: 'beginner',
    dietaryRequirements: '',
    specialRequests: '',
    agreeToTerms: false,
    marketingConsent: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Only show for the AI Workshop event (ID 4)
  useEffect(() => {
    if (eventId !== '4') {
      router.push('/events')
    }
  }, [eventId, router])

  const event = {
    id: 4,
    title: "AI Business App Creation Workshop",
    description: "Beginners session on using AI apps and generative AI tools to create business applications",
    location: "Tech Hub Central London",
    address: "123 Innovation Street, London EC2A 3LT",
    date: "Monday, 2nd December 2025",
    time: "2:00 PM - 6:00 PM",
    price: 30,
    spotsLeft: 38,
    maxAttendees: 50,
    specialOffer: "Free app creation for business ideas",
    agenda: [
      "2:00-2:30 PM: Welcome & AI Tools Overview",
      "2:30-3:30 PM: ChatGPT, Claude & Business Apps",
      "3:30-4:00 PM: Break & Networking",
      "4:00-5:30 PM: Live App Creation Demo",
      "5:30-6:00 PM: Your Business Idea Workshop"
    ]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setNotification({ 
        type: 'success', 
        message: 'Booking confirmed! Check your email for details.' 
      })
      
      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push(`/events/${eventId}/confirmation`)
      }, 3000)
      
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: 'Booking failed. Please try again.' 
      })
    }
    
    setIsSubmitting(false)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.email
      case 2:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Back to Event
              </button>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <CpuChipIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        🎁 FREE GIVEAWAY
                      </span>
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW EVENT
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                    Book: AI Business App Creation Workshop
                  </h1>
                  <p className="text-xl text-white/90 mb-6">
                    Learn to create business applications using AI tools. Free live app creation for your business idea!
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-white/80" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-white/80" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-white/80" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="w-5 h-5 text-white/80" />
                      <span className="text-sm">{event.spotsLeft} spots left</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:min-w-[280px]">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">£{event.price}</div>
                    <div className="text-white/80 text-sm mb-4">per person</div>
                    
                    <div className="bg-amber-400/20 border border-amber-300/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-amber-100">
                        <GiftIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{event.specialOffer}</span>
                      </div>
                    </div>
                    
                    <div className="text-green-300 text-sm font-medium">
                      ✓ Available to book
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-600">
                          Step {step} of 3
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round((step / 3) * 100)}% Complete
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                              <p className="text-gray-600">Tell us about yourself</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  First Name *
                                </label>
                                <div className="relative">
                                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Your first name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Last Name *
                                </label>
                                <div className="relative">
                                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Your last name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                              </label>
                              <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="your@email.com"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number (Optional)
                              </label>
                              <div className="relative">
                                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+44 7XXX XXXXXX"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStepComplete(1)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                Continue
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">Workshop Details</h2>
                              <p className="text-gray-600">Help us personalize your experience</p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                AI Experience Level
                              </label>
                              <select
                                name="aiExperience"
                                value={formData.aiExperience}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="beginner">Complete Beginner</option>
                                <option value="some">Some Experience</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Idea (For Free App Creation)
                              </label>
                              <textarea
                                name="businessIdea"
                                value={formData.businessIdea}
                                onChange={handleInputChange}
                                placeholder="Describe your business idea in a few sentences. We'll create a demo app for it during the workshop!"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                              />
                              <div className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                                🎁 This is optional but highly recommended! We'll create your app live during the event.
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dietary Requirements
                              </label>
                              <input
                                type="text"
                                name="dietaryRequirements"
                                value={formData.dietaryRequirements}
                                onChange={handleInputChange}
                                placeholder="e.g., Vegetarian, Gluten-free, Allergies..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Requests
                              </label>
                              <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                placeholder="Any special requests or questions?"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-between">
                              <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Back
                              </button>
                              <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                              >
                                Continue
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment & Confirmation</h2>
                              <p className="text-gray-600">Review your booking and complete payment</p>
                            </div>

                            {/* Booking Summary */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Event:</span>
                                  <span className="font-medium">AI Business App Creation Workshop</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Date & Time:</span>
                                  <span>{event.date}, {event.time}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Location:</span>
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Attendee:</span>
                                  <span>{formData.firstName} {formData.lastName}</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between font-semibold text-lg">
                                  <span>Total:</span>
                                  <span>£{event.price}</span>
                                </div>
                              </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  name="agreeToTerms"
                                  checked={formData.agreeToTerms}
                                  onChange={handleInputChange}
                                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  required
                                />
                                <label className="text-sm text-gray-700">
                                  I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> *
                                </label>
                              </div>

                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  name="marketingConsent"
                                  checked={formData.marketingConsent}
                                  onChange={handleInputChange}
                                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-sm text-gray-700">
                                  I'd like to receive updates about future AI workshops and Portuguese community events
                                </label>
                              </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div className="text-sm text-yellow-800">
                                  <p className="font-medium mb-1">Payment Information</p>
                                  <p>You'll be charged £{event.price} upon confirmation. Full refund available up to 48 hours before the event.</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between">
                              <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                disabled={!isStepComplete(2) || isSubmitting}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <CreditCardIcon className="w-5 h-5" />
                                    Confirm & Pay £{event.price}
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Event Highlights */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <SparklesIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                          <span className="text-sm text-gray-700">AI tools overview (ChatGPT, Claude, etc.)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <SparklesIcon className="w-5 h-5 text-purple-500 mt-0.5" />
                          <span className="text-sm text-gray-700">Hands-on business app creation</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <GiftIcon className="w-5 h-5 text-amber-500 mt-0.5" />
                          <span className="text-sm text-gray-700">Free app for your business idea</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <UserGroupIcon className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-sm text-gray-700">Network with Portuguese entrepreneurs</span>
                        </div>
                      </div>
                    </div>

                    {/* Agenda */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Event Agenda</h3>
                      <div className="space-y-3">
                        {event.agenda.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-700">
                          Questions about the workshop? Contact our team:
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <EnvelopeIcon className="w-4 h-4" />
                          events@lusotown.com
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <PhoneIcon className="w-4 h-4" />
                          WhatsApp Support
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="fixed top-4 right-4 z-50"
            >
              <div className={`rounded-lg p-4 shadow-lg text-white ${
                notification.type === 'success' 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}>
                <div className="flex items-center gap-2">
                  {notification.type === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5" />
                  )}
                  {notification.message}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default AIWorkshopBookingPage