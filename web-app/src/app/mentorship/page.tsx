'use client'

import type { Metadata } from 'next'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'
import MentorshipHero from '@/components/MentorshipHero'
// import MentorshipProgramsSection from '@/components/MentorshipProgramsSection'
// import MentorshipMatchingSection from '@/components/MentorshipMatchingSection'
// import MentorshipSuccessStories from '@/components/MentorshipSuccessStories'
// import MentorshipResourceCenter from '@/components/MentorshipResourceCenter'
// import MentorshipRegistrationSection from '@/components/MentorshipRegistrationSection'
// import MentorshipCommunityImpact from '@/components/MentorshipCommunityImpact'

// Mentorship page structured data for Portuguese-speaking community integration
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'LusoTown Portuguese-speaking community Mentorship',
  description: 'Three-tier mentorship system connecting Lusophone professionals, language learners, and cultural knowledge sharers in London',
  url: 'https://lusotown.london/mentorship',
  serviceType: [
    'Professional Integration Mentorship',
    'Language Exchange Partnerships', 
    'Skill Sharing Marketplace'
  ],
  areaServed: {
    '@type': 'City',
    name: 'London',
    addressCountry: 'GB'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking professionals and learners',
    geographicArea: {
      '@type': 'City',
      name: 'London'
    }
  },
  educationalCredentialAwarded: 'Lusophone Cultural Preservation Certificate',
  offers: {
    '@type': 'Offer',
    name: 'Portuguese-speaking community Mentorship Programs',
    description: 'Professional integration, language exchange, and cultural skill sharing'
  }
}

export default function MentorshipPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden">
        <div className="pt-16 w-full">
          <MentorshipHero />
          {/* <MentorshipProgramsSection /> */}
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('mentorship.coming_soon')}</h2>
            <p className="text-gray-600">Portuguese mentorship programs launching soon</p>
          </div>
          {/* <MentorshipMatchingSection />
          <MentorshipSuccessStories />
          <MentorshipResourceCenter />
          <MentorshipRegistrationSection />
          <MentorshipCommunityImpact /> */}
          <Footer />
        </div>
      </main>
    </>
  )
}