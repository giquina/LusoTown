'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface GroupReportModalProps {
  groupId: string
  groupName: string
  isOpen: boolean
  onClose: () => void
}

const REPORT_TYPES = [
  { value: 'inappropriate_content', label: 'Inappropriate content' },
  { value: 'spam', label: 'Spam or fake group' },
  { value: 'harassment', label: 'Harassment or bullying' },
  { value: 'fake_group', label: 'Fake or misleading group' },
  { value: 'safety_concern', label: 'Safety concern' },
  { value: 'age_inappropriate', label: 'Age-inappropriate content' },
  { value: 'other', label: 'Other' },
]

export default function GroupReportModal({ groupId, groupName, isOpen, onClose }: GroupReportModalProps) {
  const [reportType, setReportType] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reportType || !description.trim()) {
      toast.error('Please select a reason and provide a description')
      return
    }

    try {
      setLoading(true)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        toast.error('Please log in to report a group')
        return
      }

      const { error } = await supabase
        .from('group_reports')
        .insert([{
          group_id: groupId,
          reported_by: user.id,
          report_type: reportType,
          description: description.trim()
        }])

      if (error) throw error

      toast.success('Report submitted successfully. Our team will review it.')
      onClose()
      setReportType('')
      setDescription('')
    } catch (error: any) {
      console.error('Error submitting report:', error)
      toast.error(error.message || 'Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Report Group</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            You're reporting: <span className="font-medium">{groupName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for reporting *
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select a reason</option>
              {REPORT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Please provide details about your concern..."
              maxLength={500}
              required
            />
            <div className="text-sm text-gray-500 mt-1">
              {description.length}/500 characters
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Please note:</strong> Reports are reviewed by our safety team. 
              False reports may result in restrictions on your account.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !reportType || !description.trim()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}