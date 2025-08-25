import { Metadata } from 'next'
import ComprehensiveLusophoneExperience from '@/components/ComprehensiveLusophoneExperience'

export const metadata: Metadata = {
  title: 'Complete Lusophone Experience | LusoTown',
  description: 'Discover the comprehensive Portuguese-speaking community experience across Portugal, Brazil, PALOP nations, and the United Kingdom. Connect with Portuguese speakers through cultural events, heritage selection, and business opportunities.',
  keywords: [
    'Lusophone community UK',
    'Brazilian community London', 
    'PALOP community',
    'Angola community UK',
    'Cape Verde community',
    'Mozambique community',
    'Lusophone events London',
    'Lusophone community',
    'Portuguese-speaking United Kingdom'
  ].join(', ')
}

export default function LusophoneExperiencePage() {
  return (
    <main className="min-h-screen">
      <ComprehensiveLusophoneExperience />
    </main>
  )
}