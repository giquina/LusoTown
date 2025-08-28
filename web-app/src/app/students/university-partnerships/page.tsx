import UniversityIntegration from '@/components/students/UniversityIntegration'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'University Partnerships - LusoTown Student Support',
  description: 'Connect with Portuguese-speaking communities across 8 partner universities in the UK. Access student verification, events, study groups, and exclusive benefits.',
  keywords: 'Portuguese students UK, university partnerships, student verification, study groups, Portuguese society, UCL, Kings College, Imperial, LSE, Oxford, Cambridge, Manchester, Edinburgh'
}

export default function UniversityPartnershipsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <UniversityIntegration />
    </main>
  )
}