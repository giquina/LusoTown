'use client'

import React, { useState } from 'react'
import StudentSupportSection from '@/components/StudentSupportSection'
import StudentVerificationSystem from '@/components/StudentVerificationSystem'

export default function TestStudentSection() {
  const [showVerification, setShowVerification] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24">
        <StudentSupportSection 
          onStudentVerificationClick={() => setShowVerification(true)}
        />
        
        {showVerification && (
          <StudentVerificationSystem
            onClose={() => setShowVerification(false)}
            onVerificationComplete={(id) => {
              setShowVerification(false)
            }}
          />
        )}
      </div>
    </div>
  )
}