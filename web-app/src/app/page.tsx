import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EventsShowcase from '@/components/EventsShowcase'
import SuccessStories from '@/components/SuccessStories'
import AppDownloadSection from '@/components/AppDownloadSection'
import TestimonialsNew from '@/components/TestimonialsNew'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

// Page-specific structured data for Portuguese community
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LusoTown London',
  description: 'A digital home for Portuguese-speaking communities in London',
  url: 'https://lusotown.london',
  logo: 'https://lusotown.london/logo.png',
  sameAs: [
    'https://facebook.com/lusotownlondon',
    'https://instagram.com/lusotownlondon',
    'https://twitter.com/lusotownlondon'
  ],
  areaServed: {
    '@type': 'City',
    name: 'London',
    addressCountry: 'GB'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking community',
    geographicArea: {
      '@type': 'City',
      name: 'London'
    }
  }
}

export default function Home() {
  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden">
        <Header />
        <div className="pt-16 w-full">
          <Hero />
          <Features />
          <EventsShowcase />
          <SuccessStories />
          <AppDownloadSection />
          <TestimonialsNew />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  )
}