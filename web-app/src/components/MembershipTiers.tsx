'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { SUBSCRIPTION_PLANS } from '@/config/pricing'

export default function MembershipTiers() {
  const { t } = useLanguage()
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('pricing.membership_tiers', 'Membership Tiers')}
        </h2>
        <p className="text-lg text-gray-600">
          {t('pricing.choose_plan_description', 'Choose the perfect plan for your Portuguese community journey')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Free</h3>
          <p className="text-3xl font-bold text-gray-900 mb-6">£0/mo</p>
          <ul className="space-y-3">
            <li>Basic community access</li>
            <li>Limited events</li>
            <li>Basic support</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-secondary-400 p-6 ring-4 ring-secondary-100">
          <div className="text-center mb-4">
            <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
          <p className="text-3xl font-bold text-gray-900 mb-6">£15.99/mo</p>
          <ul className="space-y-3">
            <li>Full community access</li>
            <li>Unlimited events</li>
            <li>Business directory</li>
            <li>10% business discounts</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ambassador</h3>
          <p className="text-3xl font-bold text-gray-900 mb-6">£29.99/mo</p>
          <ul className="space-y-3">
            <li>Premium access</li>
            <li>Event hosting</li>
            <li>Personal concierge</li>
            <li>20% business discounts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
