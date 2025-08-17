'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StrategicPartnershipDashboard from '@/components/StrategicPartnershipDashboard'

export default function StrategicPartnershipDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <StrategicPartnershipDashboard />
      </main>
      <Footer />
    </div>
  )
}