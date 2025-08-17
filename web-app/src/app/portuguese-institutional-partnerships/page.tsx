'use client'

import React from 'react'
import Footer from '@/components/Footer'
import PortugueseInstitutionalPartnerships from '@/components/PortugueseInstitutionalPartnerships'

export default function PortugueseInstitutionalPartnershipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <PortugueseInstitutionalPartnerships />
      </main>
      <Footer />
    </div>
  )
}