'use client'

import React from 'react'
import PortugueseEventsCalendar from '@/components/events/PortugueseEventsCalendar'
import { CulturalCalendarProvider } from '@/components/events/CulturalCalendarProvider'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'

export default function EventsCalendarPage() {
  const { t } = useLanguage()

  return (
    <CulturalCalendarProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t('calendar.title', 'Portuguese Events Calendar')}
                </h1>
                <p className="text-gray-600 mt-1">
                  {t('calendar.subtitle', 'Cultural events and Portuguese-speaking community celebrations')}
                </p>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href={ROUTES.home} className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <Link href={ROUTES.events} className="text-gray-500 hover:text-gray-700">
                    Events
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-primary-600">Calendar</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortugueseEventsCalendar 
            className="mb-8"
            showFilters={true}
          />
          
          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About Portuguese Community Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cultural Celebrations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover authentic Portuguese cultural celebrations including Santos Populares, 
                  Brazilian Independence Day, and Cape Verdean heritage events throughout the year.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">Regular Events</h3>
                <p className="text-gray-600 text-sm">
                  Join weekly Kizomba nights, monthly Fado evenings, and business networking 
                  breakfasts that bring the Portuguese-speaking community together.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">University Partnerships</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Connect with Portuguese-speaking students through university mixers, career fairs, 
                  and cultural festivals across London's top universities.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm">
                  All events are designed to strengthen Portuguese cultural identity while 
                  building meaningful connections in the London community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CulturalCalendarProvider>
  )
}