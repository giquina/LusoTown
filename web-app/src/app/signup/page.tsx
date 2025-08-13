'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import SocialLogin from '@/components/SocialLogin'
import { 
  HeartIcon, 
  CheckIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  SparklesIcon,
  LockClosedIcon,
  CameraIcon,
  StarIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { getImageWithFallback } from '@/lib/profileImages'
import { authService } from '@/lib/auth'

const benefits = [
  {
    icon: ShieldCheckIcon,
    text: "Join 500+ Portuguese speakers in London",
    subtext: "Verified community from Portugal, Brazil, Angola & beyond"
  },
  {
    icon: UserGroupIcon,
    text: "Cultural connection and heritage",
    subtext: "Preserve language and traditions together"
  },
  {
    icon: SparklesIcon,
    text: "Authentic Portuguese experiences",
    subtext: "Events, festivals, and community gatherings"
  },
  {
    icon: LockClosedIcon,
    text: "Safe, inclusive Portuguese community",
    subtext: "Welcoming space for all ages and backgrounds"
  }
]

const trustSignals = [
  { icon: CameraIcon, text: "Selfie verification required" },
  { icon: ShieldCheckIcon, text: "Background checks available" },
  { icon: LockClosedIcon, text: "Your data stays private" },
  { icon: StarIcon, text: "4.9/5 member satisfaction" }
]

const testimonials = [
  {
    name: "Sarah C.",
    age: "34",
    location: "Clapham",
    quote: "Found my Portuguese community through LusoTown. Feels like family away from home.",
    avatar: getImageWithFallback('sarah-chen')
  },
  {
    name: "Maya P.",
    age: "38",
    location: "Shoreditch", 
    quote: "Finally found other Portuguese speakers in London. The events are amazing!",
    avatar: getImageWithFallback('maya-patel')
  }
]

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    password: '',
    confirmPassword: '',
    ageConfirmation: false,
    agreeTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    
    if (!formData.firstName.trim()) {
      setError('First name is required')
      return false
    }
    
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    if (!formData.ageConfirmation) {
      setError('You must confirm you are 21 years old or older')
      return false
    }
    
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')
    
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }
    
    try {
      const result = await authService.signup(
        formData.email,
        formData.password,
        {
          firstName: formData.firstName
        }
      )
      
      if (result.success) {
        setSuccess('Account created successfully! Please check your email to verify your account.')
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push('/signup/success')
        }, 2000)
      } else {
        setError(result.error || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="py-12 sm:py-20 bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen flex items-center">
          <div className="container-width px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Benefits */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center shadow-lg">
                    <HeartIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">LusoTown</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Your Home for <span className="gradient-text">Portuguese Culture</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  A vibrant community of Portuguese speakers across London celebrating culture, language, and heritage together.
                </p>
                
                <div className="space-y-4 sm:space-y-6 mb-8">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70"
                      >
                        <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">{benefit.text}</span>
                          <span className="text-sm text-gray-600">{benefit.subtext}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {trustSignals.map((signal, index) => {
                    const IconComponent = signal.icon
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <IconComponent className="h-4 w-4 text-secondary-400" />
                        <span>{signal.text}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Quick Testimonials */}
                <div className="space-y-4 hidden lg:block">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80"
                    >
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 italic mb-1">"{testimonial.quote}"</p>
                        <p className="text-xs text-gray-500">
                          {testimonial.name}, {testimonial.age} • {testimonial.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Right side - Signup Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/50">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 text-primary-600 font-medium mb-4 text-sm">
                      <ShieldCheckIcon className="h-4 w-4" />
                      Invitation-Only Community
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Request Your Invitation</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Join our exclusive waitlist • Spots limited to 50 new members monthly</p>
                  </div>

                  {/* Social Login Options */}
                  <div className="mb-6 sm:mb-8">
                    <p className="text-center text-sm text-gray-500 mb-4">Quick signup with social media</p>
                    <SocialLogin mode="signup" />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Success Display */}
                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                        placeholder="sarah@company.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                        placeholder="Sarah"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                        placeholder="Enter a secure password"
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                        placeholder="Confirm your password"
                        minLength={6}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ageConfirmation" className="block text-sm font-medium text-gray-700 mb-2">
                        Community Guidelines
                      </label>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm">
                        <input
                          id="ageConfirmation"
                          name="ageConfirmation"
                          type="checkbox"
                          checked={formData.ageConfirmation}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          required
                          className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded disabled:opacity-50"
                        />
                        <label htmlFor="ageConfirmation" className="ml-3 text-sm text-gray-700">
                          I agree to follow community guidelines and respect all members regardless of age
                        </label>
                      </div>
                    </div>
                    
                    {/* What to expect section */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-white/80">
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm">What happens next?</h3>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span>Download our mobile app for verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <span>Complete selfie verification for safety</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <span>Connect with Portuguese community in London</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded mt-1 flex-shrink-0 disabled:opacity-50"
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                        I agree to LusoTown's{' '}
                        <a href="/terms" className="text-primary-400 hover:text-primary-500 underline">Terms of Service</a>,{' '}
                        <a href="/privacy" className="text-primary-400 hover:text-primary-500 underline">Privacy Policy</a>, and{' '}
                        <a href="/community-guidelines" className="text-primary-400 hover:text-primary-500 underline">Community Guidelines</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || !!success}
                      className="btn-primary w-full text-lg py-4 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Account...
                        </span>
                      ) : success ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckIcon className="h-5 w-5" />
                          Account Created!
                        </span>
                      ) : (
                        'Create My Account →'
                      )}
                    </button>
                    
                    {/* Security footer */}
                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-3">
                        🔒 Your information is encrypted and never shared with third parties
                      </p>
                      <p className="text-gray-600 text-sm">
                        Already a member?{' '}
                        <a href="/login" className="text-primary-400 hover:text-primary-500 font-medium">
                          Sign into your account
                        </a>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Mobile testimonials */}
                <div className="mt-6 space-y-3 lg:hidden">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80"
                    >
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 italic mb-1">"{testimonial.quote}"</p>
                        <p className="text-xs text-gray-500">
                          {testimonial.name}, {testimonial.age} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

