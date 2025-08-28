import StudentOnboardingFlow from '@/components/students/StudentOnboardingFlow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Onboarding - LusoTown University Partnerships',
  description: 'Complete your Portuguese-speaking student profile and connect with your university community. Access exclusive benefits, study groups, and cultural events.',
  keywords: 'Portuguese student onboarding, university verification, student benefits, Lusophone community, UK universities, student registration'
}

export default function StudentOnboardingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <StudentOnboardingFlow />
    </main>
  )
}