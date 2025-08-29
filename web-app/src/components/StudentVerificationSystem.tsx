'use client'

import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface StudentVerificationSystemProps {
  onClose: () => void
  onVerificationComplete: (verificationId: string) => void
}

export default function StudentVerificationSystem({ onClose, onVerificationComplete }: StudentVerificationSystemProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    university: '',
    studentId: '',
    email: '',
    documentType: 'student-id'
  })

  const universities = [
    'University College London (UCL)',
    'Kings College London',
    'Imperial College London',
    'London School of Economics (LSE)',
    'University of Oxford',
    'University of Cambridge',
    'University of Manchester',
    'University of Edinburgh'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate verification process
    setTimeout(() => {
      onVerificationComplete('VERIFY_' + Date.now())
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('student.verification_title', 'Student Verification')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('student.university', 'University')}
              </label>
              <select
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                required
              >
                <option value="">Select your university</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('student.student_id', 'Student ID')}
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                placeholder="Enter your student ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('student.university_email', 'University Email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                placeholder="your.email@university.ac.uk"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg hover:bg-secondary-700 transition-colors font-semibold"
              >
                {t('student.verify_status', 'Verify Student Status')}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('student.verification_help', 'Student verification gives you access to discounted membership and exclusive student events.')}
          </p>
        </div>
      </div>
    </div>
  )
}
