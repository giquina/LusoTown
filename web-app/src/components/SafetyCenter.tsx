'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/i18n'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Flag, 
  Ban, 
  Eye, 
  Lock, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Info,
  Heart,
  Users,
  Camera,
  MapPin
} from 'lucide-react'

export default function SafetyCenter() {
  const { language } = useLanguage()
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    evidence: ''
  })
  const [showReportForm, setShowReportForm] = useState(false)

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock report submission
    console.log('Report submitted:', reportForm)
    setShowReportForm(false)
    setReportForm({ type: '', description: '', evidence: '' })
    // Show success message
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            {t('safety.title', language)}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('safety.subtitle', language)}
        </p>
      </motion.div>

      {/* Safety Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('safety.guidelines.title', language)}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                {t(`safety.guidelines.item${item}`, language)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Safety Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Verification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('safety.verification.title', language)}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {t('safety.verification.description', language)}
          </p>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {t('safety.verification.button', language)}
          </button>
        </motion.div>

        {/* Privacy Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Lock className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('safety.privacy.title', language)}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {t('safety.privacy.description', language)}
          </p>
          <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            {t('safety.privacy.button', language)}
          </button>
        </motion.div>

        {/* Block Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Ban className="h-8 w-8 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('safety.blocks.title', language)}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {t('safety.blocks.description', language)}
          </p>
          <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            {t('safety.blocks.button', language)}
          </button>
        </motion.div>
      </div>

      {/* Report Safety Concerns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8"
      >
        <div className="flex items-center mb-6">
          <Flag className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('safety.reporting.title', language)}
          </h2>
        </div>
        <p className="text-gray-700 mb-6">
          {t('safety.reporting.description', language)}
        </p>
        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          {t('safety.reporting.button', language)}
        </button>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center mb-6">
          <Phone className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('safety.emergency.title', language)}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <span className="font-semibold text-red-900">
              {t('safety.emergency.police', language)}
            </span>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
            <span className="font-semibold text-blue-900">
              {t('safety.emergency.lusotown', language)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Safety Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center mb-6">
          <Info className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('safety.resources.title', language)}
          </h2>
        </div>
        <p className="text-gray-600">
          {t('safety.resources.description', language)}
        </p>
      </motion.div>
    </div>
  )
}