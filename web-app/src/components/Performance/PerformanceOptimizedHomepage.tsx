/**
 * Performance Optimized Homepage Component for Portuguese-speaking Community Platform
 * Implements advanced code splitting, lazy loading, and SEO optimizations
 */

'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { HomePageSchema } from '@/components/SEO/SchemaMarkup';
import OptimizedSEOHead from '@/components/SEO/OptimizedSEOHead';
import { LazyPortugueseComponents, preloadPortugueseComponents } from '@/components/Performance/BundleOptimizer';
import { useLanguage } from '@/context/LanguageContext';

// Lazy-loaded sections with performance optimization
const HeroSection = lazy(() => 
  import('@/components/home/HeroSection').catch(() => 
    ({ default: () => <div className="h-96 bg-primary-50 animate-pulse" /> })
  )
);

const EventsPreview = lazy(() => 
  import('@/components/home/EventsPreview').catch(() => 
    ({ default: () => <div className="h-64 bg-primary-50 animate-pulse" /> })
  )
);

const BusinessPreview = lazy(() => 
  import('@/components/home/BusinessPreview').catch(() => 
    ({ default: () => <div className="h-64 bg-primary-50 animate-pulse" /> })
  )
);

const CommunityStats = lazy(() => 
  import('@/components/home/CommunityStats').catch(() => 
    ({ default: () => <div className="h-48 bg-primary-50 animate-pulse" /> })
  )
);

const TestimonialsSection = lazy(() => 
  import('@/components/home/TestimonialsSection').catch(() => 
    ({ default: () => <div className="h-64 bg-primary-50 animate-pulse" /> })
  )
);

// Loading components optimized for Portuguese community
const SectionSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-r from-primary-50 to-primary-100 animate-pulse rounded-lg mb-8`}>
    <div className="flex items-center justify-center h-full">
      <div className="text-primary-600 font-medium">
        Loading Portuguese community content...
      </div>
    </div>
  </div>
);

interface PerformanceOptimizedHomepageProps {
  initialData?: {
    events?: any[];
    businesses?: any[];
    communityStats?: any;
  };
}

export default function PerformanceOptimizedHomepage({ 
  initialData 
}: PerformanceOptimizedHomepageProps) {
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [sectionsLoaded, setSectionsLoaded] = useState({
    hero: false,
    events: false,
    business: false,
    community: false,
    testimonials: false
  });

  // Intersection observer for progressive loading
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [eventsRef, isEventsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [businessRef, isBusinessVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [communityRef, isCommunityVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [testimonialsRef, isTestimonialsVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Performance monitoring
  useEffect(() => {
    // Preload critical components
    preloadPortugueseComponents('home');
    
    // Track performance metrics
    const startTime = performance.now();
    
    // Mark when page becomes interactive
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const loadTime = performance.now() - startTime;
          
          // Report to analytics
          if (window.gtag) {
            window.gtag('event', 'homepage_section_loaded', {
              event_category: 'Performance',
              event_label: entry.target.getAttribute('data-section'),
              load_time: Math.round(loadTime)
            });
          }
        }
      });
    });

    // Observe all main sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Progressive enhancement for Portuguese community features
  useEffect(() => {
    if (isHeroVisible && !sectionsLoaded.hero) {
      setSectionsLoaded(prev => ({ ...prev, hero: true }));
    }
  }, [isHeroVisible, sectionsLoaded.hero]);

  useEffect(() => {
    if (isEventsVisible && !sectionsLoaded.events) {
      setSectionsLoaded(prev => ({ ...prev, events: true }));
    }
  }, [isEventsVisible, sectionsLoaded.events]);

  useEffect(() => {
    if (isBusinessVisible && !sectionsLoaded.business) {
      setSectionsLoaded(prev => ({ ...prev, business: true }));
    }
  }, [isBusinessVisible, sectionsLoaded.business]);

  useEffect(() => {
    if (isCommunityVisible && !sectionsLoaded.community) {
      setSectionsLoaded(prev => ({ ...prev, community: true }));
    }
  }, [isCommunityVisible, sectionsLoaded.community]);

  useEffect(() => {
    if (isTestimonialsVisible && !sectionsLoaded.testimonials) {
      setSectionsLoaded(prev => ({ ...prev, testimonials: true }));
    }
  }, [isTestimonialsVisible, sectionsLoaded.testimonials]);

  // Portuguese community page metadata
  const pageTitle = language === 'pt' 
    ? "LusoTown - Plataforma da Comunidade Lusófona no Reino Unido"
    : "LusoTown - Portuguese-speaking Community Platform in the UK";
    
  const pageDescription = language === 'pt'
    ? "Conecte-se com a comunidade lusófona no Reino Unido. Descubra eventos, negócios e experiências culturais portuguesas, brasileiras e dos países PALOP."
    : "Connect with the Portuguese-speaking community in the UK. Discover events, businesses, and cultural experiences from Portuguese, Brazilian, and PALOP communities.";

  return (
    <>
      {/* SEO Optimization */}
      <OptimizedSEOHead
        pageType="home"
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://web-99kxh0sku-giquinas-projects.vercel.app/"
        customSchema={[]}
      />
      
      {/* Structured Data */}
      <HomePageSchema />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section - Above the fold, highest priority */}
        <section ref={heroRef} data-section="hero" className="relative">
          <Suspense fallback={<SectionSkeleton height="h-96" />}>
            {sectionsLoaded.hero && (
              <HeroSection 
                language={language}
                initialData={initialData}
              />
            )}
          </Suspense>
        </section>

        {/* Events Preview - High priority for Portuguese community engagement */}
        <section ref={eventsRef} data-section="events" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-8 text-center">
              {t('homepage.events.title')}
            </h2>
            <Suspense fallback={<SectionSkeleton />}>
              {sectionsLoaded.events ? (
                <EventsPreview 
                  language={language}
                  events={initialData?.events}
                />
              ) : isEventsVisible && (
                <SectionSkeleton />
              )}
            </Suspense>
          </div>
        </section>

        {/* Business Directory Preview - Important for Portuguese services */}
        <section ref={businessRef} data-section="business" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-8 text-center">
              {t('homepage.business.title')}
            </h2>
            <Suspense fallback={<SectionSkeleton />}>
              {sectionsLoaded.business ? (
                <BusinessPreview 
                  language={language}
                  businesses={initialData?.businesses}
                />
              ) : isBusinessVisible && (
                <SectionSkeleton />
              )}
            </Suspense>
          </div>
        </section>

        {/* Community Stats - Social proof for Portuguese diaspora */}
        <section ref={communityRef} data-section="community" className="py-16 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<SectionSkeleton height="h-48" />}>
              {sectionsLoaded.community ? (
                <CommunityStats 
                  language={language}
                  stats={initialData?.communityStats}
                />
              ) : isCommunityVisible && (
                <SectionSkeleton height="h-48" />
              )}
            </Suspense>
          </div>
        </section>

        {/* Testimonials - Community voices */}
        <section ref={testimonialsRef} data-section="testimonials" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-8 text-center">
              {t('homepage.testimonials.title')}
            </h2>
            <Suspense fallback={<SectionSkeleton />}>
              {sectionsLoaded.testimonials ? (
                <TestimonialsSection language={language} />
              ) : isTestimonialsVisible && (
                <SectionSkeleton />
              )}
            </Suspense>
          </div>
        </section>

        {/* Portuguese Cultural Features - Advanced lazy loading */}
        {isCommunityVisible && (
          <section className="py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <LazyPortugueseComponents.LusophoneCarousel 
                  items={[
                    {
                      title: t('homepage.carousel.cultural_preservation'),
                      description: t('homepage.carousel.cultural_preservation_desc')
                    },
                    {
                      title: t('homepage.carousel.business_networking'), 
                      description: t('homepage.carousel.business_networking_desc')
                    },
                    {
                      title: t('homepage.carousel.university_partnerships'),
                      description: t('homepage.carousel.university_partnerships_desc')
                    }
                  ]}
                  autoPlay={true}
                  showDots={true}
                  culturalTheme="portuguese"
                />
              </Suspense>
            </div>
          </section>
        )}
      </div>
      
      {/* Performance monitoring in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 left-4 bg-black/80 text-white text-xs p-2 rounded-lg font-mono z-40">
          <div>Sections Loaded:</div>
          {Object.entries(sectionsLoaded).map(([section, loaded]) => (
            <div key={section} className={loaded ? 'text-green-400' : 'text-red-400'}>
              {section}: {loaded ? '✓' : '✗'}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// Export additional performance utilities
export const PerformanceUtils = {
  // Preload critical assets for Portuguese community
  preloadCriticalAssets: () => {
    if (typeof window === 'undefined') return;
    
    const criticalImages = [
      '/images/hero-portuguese-community.jpg',
      '/images/lusotown-logo.png',
      '/images/portuguese-flag.svg',
      '/images/brazilian-flag.svg'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  },
  
  // Optimize images for Portuguese cultural content
  optimizePortugueseImages: () => {
    if (typeof window === 'undefined') return;
    
    const images = document.querySelectorAll('img[data-portuguese-content]');
    images.forEach((img: any) => {
      if (img.loading !== 'lazy') {
        img.loading = 'lazy';
      }
      
      // Add Portuguese community context to alt text
      if (!img.alt.includes('Portuguese')) {
        img.alt = `${img.alt} | Portuguese community content`.trim();
      }
    });
  }
};