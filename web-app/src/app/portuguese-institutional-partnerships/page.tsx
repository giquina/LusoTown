'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortugueseInstitutionalPartnerships from '@/components/PortugueseInstitutionalPartnerships'

export default function PortugueseInstitutionalPartnershipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <PortugueseInstitutionalPartnerships />
      </main>
      <Footer />
    </div>
  )
}