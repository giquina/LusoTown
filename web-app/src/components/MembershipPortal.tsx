'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function MembershipPortal() {
  const { t } = useLanguage()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('membership.portal_title', 'Membership Portal')}
        </h2>
        <p className="text-lg text-gray-600">
          {t('membership.portal_description', 'Manage your Portuguese community membership')}
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h3>
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-900">Community Member</span>
                <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">£15.99/mo</p>
              <p className="text-gray-600 text-sm">Next billing: March 1, 2025</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg hover:bg-secondary-700 transition-colors">
                Update Payment Method
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Download Invoices
              </button>
              <button className="w-full bg-white border border-red-300 text-red-600 py-3 px-4 rounded-lg hover:bg-red-50 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage This Month</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">12</div>
              <div className="text-gray-600">Events Attended</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">8</div>
              <div className="text-gray-600">New Connections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">3</div>
              <div className="text-gray-600">Business Directory Visits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
