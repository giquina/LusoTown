'use client'

import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    origin: '',
    preferredLanguage: 'en'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    if (formData.name && formData.email && formData.message) {
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        origin: '',
        preferredLanguage: 'en'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 text-primary-600 font-medium mb-6 shadow-lg border border-primary-100"
                >
                  <HeartIcon className="h-5 w-5" />
                  {t('contact.portuguese-community', 'Portuguese Community Support')}
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                >
                  {t('contact.title', 'Estamos Aqui Para Ti')}{' '}
                  <span className="gradient-text">{t('contact.title-accent', 'We\'re Here For You')}</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
                >
                  {t('contact.subtitle', 'Your Portuguese community across the UK is here to support you. Whether you need help finding events, connecting with other Portuguese speakers, or have questions about our community - we\'re here with a warm welcome.')}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    {t('contact.portuguese-support', 'Portuguese-speaking support')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    {t('contact.family-friendly', 'Family-friendly assistance')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    {t('contact.fast-response', 'Fast response times')}
                  </div>
                </motion.div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/50">
                    <div className="flex items-center gap-3 mb-6">
                      <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-gray-900">{t('contact.send-message', 'Send us a message')}</h2>
                    </div>
                    
                    {submitStatus === 'success' && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <p className="text-green-700">{t('contact.message-sent', 'Message sent successfully! We\'ll respond within 24 hours.')}</p>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.your-name', 'Your Name')} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                            placeholder={t('contact.name-placeholder', 'Enter your name')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.email-address', 'Email Address')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.portuguese-origin', 'Portuguese Origin')}
                          </label>
                          <select
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                          >
                            <option value="">{t('contact.select-origin', 'Select your origin (optional)')}</option>
                            <option value="portugal">🇵🇹 Portugal</option>
                            <option value="brazil">🇧🇷 Brazil</option>
                            <option value="angola">🇦🇴 Angola</option>
                            <option value="mozambique">🇲🇿 Mozambique</option>
                            <option value="cape-verde">🇨🇻 Cape Verde</option>
                            <option value="other">🌍 Other Portuguese-speaking</option>
                            <option value="uk-born">🇬🇧 UK-born with Portuguese heritage</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.preferred-language', 'Preferred Language')}
                          </label>
                          <select
                            id="preferredLanguage"
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                          >
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.subject', 'Subject')} *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                        >
                          <option value="">{t('contact.select-topic', 'Select a topic')}</option>
                          <option value="events">{t('contact.events-help', 'Help with Events & Activities')}</option>
                          <option value="community">{t('contact.community-support', 'Community Support')}</option>
                          <option value="technical">{t('contact.technical-support', 'Technical Support')}</option>
                          <option value="partnership">{t('contact.business-partnership', 'Business Partnership')}</option>
                          <option value="safety">{t('contact.safety-concern', 'Safety Concern')}</option>
                          <option value="feedback">{t('contact.feedback', 'General Feedback')}</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.message', 'Message')} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
                          placeholder={t('contact.message-placeholder', 'Tell us how we can help you connect with the Portuguese community across the UK...')}
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t('contact.sending', 'Sending...')}
                          </span>
                        ) : (
                          t('contact.send-message-button', 'Send Message')
                        )}
                      </button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        {t('contact.response-time', 'We typically respond within 4 hours during business days')}
                      </p>
                    </form>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-8"
                >
                  {/* Contact Methods */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
                    <div className="flex items-center gap-3 mb-6">
                      <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                      <h2 className="text-2xl font-semibold text-gray-900">{t('contact.other-ways', 'Other ways to reach us')}</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {/* WhatsApp Contact */}
                      <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-lg">📱</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {t('contact.whatsapp-support', 'WhatsApp Community Support')}
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              {t('contact.most-popular', 'Most Popular')}
                            </span>
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {t('contact.whatsapp-description', 'Quick help in Portuguese or English via WhatsApp')}
                          </p>
                          <button className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                            {t('contact.start-whatsapp-chat', 'Start WhatsApp Chat →')}
                          </button>
                          <p className="text-xs text-gray-500 mt-1">{t('contact.whatsapp-hours', 'Available 9am-9pm daily')}</p>
                        </div>
                      </div>
                      
                      {/* Email Support */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <EnvelopeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{t('contact.email-support', 'Email Support')}</h3>
                          <p className="text-gray-600">hello@lusotown.com</p>
                          <p className="text-sm text-gray-500">{t('contact.email-response', 'We typically respond within 4 hours')}</p>
                          <p className="text-xs text-primary-600 mt-1">🇵🇹 {t('contact.portuguese-team', 'Portuguese-speaking team available')}</p>
                        </div>
                      </div>
                      
                      {/* Community Location */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <MapPinIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{t('contact.community-hub', 'Community Hub')}</h3>
                          <p className="text-gray-600">{t('contact.london-based', 'London-based Portuguese Community')}</p>
                          <p className="text-sm text-gray-500">{t('contact.serving-uk', 'Proudly serving Portuguese speakers across the UK')}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Stockwell</span>
                            <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Vauxhall</span>
                            <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Camden</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Support Hours */}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <ClockIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{t('contact.support-hours', 'Support Hours')}</h3>
                          <p className="text-gray-600">{t('contact.weekday-hours', 'Monday - Friday: 9am - 9pm GMT')}</p>
                          <p className="text-gray-600">{t('contact.weekend-hours', 'Saturday - Sunday: 10am - 6pm GMT')}</p>
                          <p className="text-sm text-gray-500">{t('contact.emergency-support', 'Emergency safety support available 24/7')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portuguese Cultural Centers */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      🏛️ {t('contact.cultural-centers', 'Portuguese Cultural Centers in the U.K.')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('contact.cultural-centers-description', 'Visit these community spaces for in-person support and cultural connections:')}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{t('contact.stockwell-center', 'Stockwell Portuguese Community')}</h4>
                        <p className="text-sm text-gray-600">{t('contact.cultural-events', 'Cultural events & support')}</p>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{t('contact.vauxhall-center', 'Vauxhall Cultural Centre')}</h4>
                        <p className="text-sm text-gray-600">{t('contact.community-gatherings', 'Weekly community gatherings')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Emergency Contact */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <ExclamationTriangleIcon className="h-6 w-6" />
                      <h3 className="text-xl font-semibold">{t('contact.need-immediate-help', 'Need immediate help?')}</h3>
                    </div>
                    <p className="mb-6 opacity-90">
                      {t('contact.emergency-description', 'For urgent safety concerns, harassment reports, or technical issues preventing community access, please reach out immediately. We\'re here to protect and support our Portuguese community.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="mailto:urgent@lusotown.com"
                        className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2 justify-center"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                        urgent@lusotown.com
                      </a>
                      <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200 inline-flex items-center gap-2 justify-center">
                        <PhoneIcon className="h-4 w-4" />
                        {t('contact.emergency-line', 'Emergency Line')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}