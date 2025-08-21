'use client'

import { useLanguage } from '@/context/LanguageContext'
import GroupEventsSection from '@/components/GroupEventsSection'
import { ROUTES } from '@/config/routes'

export default function GroupEventsPageClient() {
  const { t } = useLanguage()

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-secondary-600">
            <a href={ROUTES.home} className="hover:text-primary-600 transition-colors">
              {t('nav.home')}
            </a>
            <span className="text-gray-400">/</span>
            <a href={ROUTES.events} className="hover:text-primary-600 transition-colors">
              {t('nav.events')}
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {t('nav.group-events')}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <GroupEventsSection 
        variant="full-page" 
        showFilters={true}
        className="min-h-screen"
      />

      {/* Additional Information Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Group Events Work
              </h2>
              <p className="text-lg text-secondary-700">
                Our Portuguese group events are carefully organized to create meaningful connections and unforgettable experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-coral-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📅</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse & Reserve</h3>
                <p className="text-secondary-600 text-sm">
                  Browse upcoming group events, check availability, and reserve your spot instantly with our easy booking system.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Meet & Connect</h3>
                <p className="text-secondary-600 text-sm">
                  Join fellow Portuguese speakers at the event location. Our experienced organizers ensure everyone feels welcome.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-premium-500 to-premium-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience & Share</h3>
                <p className="text-secondary-600 text-sm">
                  Enjoy the experience together, share photos, and build lasting friendships within the Portuguese community.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to Organize Your Own Group Event?
                </h3>
                <p className="text-secondary-700 mb-6 max-w-2xl mx-auto">
                  Have an idea for a Portuguese group experience? We support community members who want to organize events for specific interests, age groups, or activities.
                </p>
                <a
                  href={ROUTES.groupsCreate}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Create Group Event</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}