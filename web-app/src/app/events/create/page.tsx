'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  PhotoIcon,
  InformationCircleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'
import { Event, EVENT_CATEGORIES, LONDON_AREAS, ACCESSIBILITY_OPTIONS, eventService } from '@/lib/events'
import { authService } from '@/lib/auth'

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    subcategory: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    address: '',
    maxAttendees: 10,
    price: 0,
    membershipRequired: 'free' as 'free' | 'core' | 'premium',
    tags: [] as string[],
    whatToExpected: [] as string[],
    whatToBring: [] as string[],
    dresscode: '',
    ageRestriction: 'All ages welcome',
    skillLevel: 'all' as 'all' | 'beginner' | 'intermediate' | 'advanced',
    accessibility: [] as string[],
    isRecurring: false,
    recurringPattern: 'weekly' as 'weekly' | 'monthly' | 'biweekly',
    allowWaitlist: true,
    requiresApproval: false,
    refundPolicy: ''
  })

  // Form helpers
  const [currentTag, setCurrentTag] = useState('')
  const [currentExpectation, setCurrentExpectation] = useState('')
  const [currentBring, setCurrentBring] = useState('')

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] })
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const addExpectation = () => {
    if (currentExpectation.trim()) {
      setFormData({ ...formData, whatToExpected: [...formData.whatToExpected, currentExpectation.trim()] })
      setCurrentExpectation('')
    }
  }

  const removeExpectation = (index: number) => {
    const newExpectations = formData.whatToExpected.filter((_, i) => i !== index)
    setFormData({ ...formData, whatToExpected: newExpectations })
  }

  const addBring = () => {
    if (currentBring.trim()) {
      setFormData({ ...formData, whatToBring: [...formData.whatToBring, currentBring.trim()] })
      setCurrentBring('')
    }
  }

  const removeBring = (index: number) => {
    const newBring = formData.whatToBring.filter((_, i) => i !== index)
    setFormData({ ...formData, whatToBring: newBring })
  }

  const handleAccessibilityChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, accessibility: [...formData.accessibility, option] })
    } else {
      setFormData({ ...formData, accessibility: formData.accessibility.filter(a => a !== option) })
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.description && formData.category)
      case 2:
        return !!(formData.date && formData.time && formData.location)
      case 3:
        return formData.maxAttendees >= 2
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Transform recurringPattern from string to proper object format
      const { recurringPattern: patternString, ...otherFormData } = formData
      const recurringPattern = formData.isRecurring ? {
        frequency: patternString === 'biweekly' ? 'weekly' : patternString as 'weekly' | 'monthly',
        interval: patternString === 'biweekly' ? 2 : 1,
      } : undefined

      const eventData: Partial<Event> = {
        ...otherFormData,
        recurringPattern,
        hostName: currentUser.name,
        hostImage: currentUser.profileImage,
        hostBio: `Event organized by ${currentUser.name}`,
        currency: 'GBP',
        status: 'published',
        images: [],
        createdBy: currentUser.id
      }

      const newEvent = await eventService.createEvent(eventData, currentUser.id)
      
      if (newEvent) {
        // Redirect to the new event page
  router.push(`${ROUTES.events}/${newEvent.id}`)
      } else {
        throw new Error('Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Event details and description' },
    { number: 2, title: 'Date & Location', description: 'When and where it happens' },
    { number: 3, title: 'Settings', description: 'Capacity, pricing, and policies' },
    { number: 4, title: 'Additional Details', description: 'Extra information for attendees' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
          </div>
          
          <div className="container-width relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                Create Your{' '}
                <span className="gradient-text">Event</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-600 mb-8"
              >
                Bring women together for meaningful experiences and lasting friendships. After your event, attendees can leave reviews to help you improve future events - just like Google My Business!
              </motion.p>
              
              {/* Event Creation Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Events Created</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-secondary-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-width py-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`font-medium ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">{step.description}</div>
                  </div>
                  {step.number < steps.length && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-12">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Wine Tasting & Book Discussion"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description that will appear in event listings..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-500 mt-1">Keep it under 150 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={formData.longDescription}
                        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                        placeholder="Detailed description including what attendees can expect, agenda, etc..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        >
                          <option value="">Select a category</option>
                          {Object.keys(EVENT_CATEGORIES).map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      {formData.category && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subcategory
                          </label>
                          <select
                            value={formData.subcategory}
                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                          >
                            <option value="">Select a subcategory</option>
                            {EVENT_CATEGORIES[formData.category as keyof typeof EVENT_CATEGORIES]?.subcategories.map((sub) => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          placeholder="Add tags like 'beginner-friendly', 'outdoor'..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-primary-600 hover:text-primary-800"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Date & Location</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time *
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., The Ivy Chelsea Garden"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Full address including postcode"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="recurring"
                        checked={formData.isRecurring}
                        onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                        This is a recurring event
                      </label>
                    </div>

                    {formData.isRecurring && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recurring Pattern
                        </label>
                        <select
                          value={formData.recurringPattern}
                          onChange={(e) => setFormData({ ...formData, recurringPattern: e.target.value as any })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Settings */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Attendees *
                        </label>
                        <input
                          type="number"
                          min="2"
                          max="100"
                          value={formData.maxAttendees}
                          onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) || 2 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-500 mt-1">Minimum 2 people</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (£)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-500 mt-1">Set to 0 for free events</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Membership Requirement
                      </label>
                      <select
                        value={formData.membershipRequired}
                        onChange={(e) => setFormData({ ...formData, membershipRequired: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      >
                        <option value="free">Open to all members (Free+)</option>
                        <option value="core">Core members and above</option>
                        <option value="premium">Premium members only</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="waitlist"
                          checked={formData.allowWaitlist}
                          onChange={(e) => setFormData({ ...formData, allowWaitlist: e.target.checked })}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="waitlist" className="text-sm font-medium text-gray-700">
                          Allow waitlist when event is full
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="approval"
                          checked={formData.requiresApproval}
                          onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="approval" className="text-sm font-medium text-gray-700">
                          Require approval for attendees
                        </label>
                      </div>
                    </div>

                    {formData.price > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Refund Policy
                        </label>
                        <textarea
                          value={formData.refundPolicy}
                          onChange={(e) => setFormData({ ...formData, refundPolicy: e.target.value })}
                          placeholder="e.g., Full refund 48+ hours in advance, 50% refund 24-48 hours before..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Additional Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What to Expect
                      </label>
                      <div className="space-y-2 mb-4">
                        {formData.whatToExpected.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                            <InformationCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="flex-1 text-sm">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeExpectation(index)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentExpectation}
                          onChange={(e) => setCurrentExpectation(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpectation())}
                          placeholder="e.g., Learn basic pottery techniques"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <button
                          type="button"
                          onClick={addExpectation}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What to Bring
                      </label>
                      <div className="space-y-2 mb-4">
                        {formData.whatToBring.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-lg">
                            <InformationCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            <span className="flex-1 text-sm">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeBring(index)}
                              className="text-primary-600 hover:text-primary-800"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentBring}
                          onChange={(e) => setCurrentBring(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBring())}
                          placeholder="e.g., Comfortable clothes that can get dirty"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <button
                          type="button"
                          onClick={addBring}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dress Code
                        </label>
                        <input
                          type="text"
                          value={formData.dresscode}
                          onChange={(e) => setFormData({ ...formData, dresscode: e.target.value })}
                          placeholder="e.g., Smart casual, Comfortable activewear"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age Restriction
                        </label>
                        <input
                          type="text"
                          value={formData.ageRestriction}
                          onChange={(e) => setFormData({ ...formData, ageRestriction: e.target.value })}
                          placeholder="e.g., All ages welcome, Family-friendly"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skill Level
                      </label>
                      <select
                        value={formData.skillLevel}
                        onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      >
                        <option value="all">All levels welcome</option>
                        <option value="beginner">Beginner friendly</option>
                        <option value="intermediate">Intermediate level</option>
                        <option value="advanced">Advanced level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Accessibility Features
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ACCESSIBILITY_OPTIONS.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.accessibility.includes(option)}
                              onChange={(e) => handleAccessibilityChange(option, e.target.checked)}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!validateStep(currentStep)}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !validateStep(currentStep)}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold"
                    >
                      {isSubmitting ? 'Creating Event...' : 'Create Event'}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}