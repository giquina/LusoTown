'use client'

import React from 'react'
import Footer from '@/components/Footer'
import StrategicPartnershipDashboard from '@/components/StrategicPartnershipDashboard'

export default function StrategicPartnershipDashboardPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <main>
        <StrategicPartnershipDashboard />
      </main>
      <Footer />
    </div>
  )
}