'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { authService } from '@/lib/auth'
import { 
  LockClosedIcon, 
  EnvelopeIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const result = await authService.resetPassword(email)
      
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Password reset error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-16">
          <section className="py-20 bg-gradient-to-br from-green-50 to-secondary-50">
            <div className="container-width">
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Check Your Email
                  </h1>
                  
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to <strong>{email}</strong>
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>1. Check your email inbox (and spam folder)</li>
                      <li>2. Click the reset link in the email</li>
                      <li>3. Create a new secure password</li>
                      <li>4. Log in with your new password</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setEmail('')
                      }}
                      className="text-primary-600 hover:underline font-medium text-sm"
                    >
                      Try a different email address
                    </button>
                    
                    <div className="text-xs text-gray-500 pt-2">
                      Didn't receive the email? Check your spam folder or try again in a few minutes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LockClosedIcon className="w-8 h-8" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Reset Your Password
                  </h1>
                  
                  <p className="text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Reset Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>
                
                {/* Footer Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col space-y-3">
                    <a
                      href="/login"
                      className="text-center text-primary-600 hover:underline font-medium flex items-center justify-center"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Back to Login
                    </a>
                    
                    <div className="text-center text-sm text-gray-500">
                      Don't have an account?{' '}
                      <a href="/signup" className="text-primary-600 hover:underline font-medium">
                        Sign up here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-primary-800 mb-4">Need Help?</h2>
                
                <div className="space-y-4 text-primary-700">
                  <div>
                    <h3 className="font-semibold mb-2">Common Issues:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Make sure you're using the email address associated with your account</li>
                      <li>• Check your spam/junk folder for the reset email</li>
                      <li>• Reset links expire after 1 hour for security</li>
                      <li>• If you recently changed your email, use your old email address</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Still Having Trouble?</h3>
                    <p className="text-sm">
                      Contact our support team at{' '}
                      <a href="mailto:hello@lusotown.com" className="text-primary-600 hover:underline font-medium">
                        hello@lusotown.com
                      </a>{' '}
                      and we'll help you regain access to your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Notice */}
        <section className="py-12 bg-gray-50">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <LockClosedIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Your Security Matters</h3>
                <p className="text-gray-600 text-sm">
                  We take your account security seriously. Password reset links are encrypted, 
                  expire quickly, and can only be used once. Never share reset links with others.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}