'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  CulturalCalendarLoader,
  PALOPHeritageLoader,
  BusinessDirectoryLoader,
  MatchingLoader,
  EventsLoader
} from '@/components/ProgressiveLoadingStates';

export default function ProgressiveLoadingDemo() {
  const { t } = useLanguage();
  const [loadingStates, setLoadingStates] = useState({
    culturalCalendar: false,
    palopHeritage: false,
    businessDirectory: false,
    matching: false,
    events: false,
  });

  const [errorStates, setErrorStates] = useState({
    culturalCalendar: false,
    palopHeritage: false,
    businessDirectory: false,
    matching: false,
    events: false,
  });

  const simulateLoading = (component: keyof typeof loadingStates, duration: number = 3000) => {
    // Reset error state
    setErrorStates(prev => ({ ...prev, [component]: false }));
    
    // Start loading
    setLoadingStates(prev => ({ ...prev, [component]: true }));
    
    // Stop loading after duration
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [component]: false }));
    }, duration);
  };

  const simulateError = (component: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [component]: false }));
    setErrorStates(prev => ({ ...prev, [component]: true }));
  };

  const resetAll = () => {
    setLoadingStates({
      culturalCalendar: false,
      palopHeritage: false,
      businessDirectory: false,
      matching: false,
      events: false,
    });
    setErrorStates({
      culturalCalendar: false,
      palopHeritage: false,
      businessDirectory: false,
      matching: false,
      events: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Progressive Loading States Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience culturally-aware loading states designed specifically for the Portuguese-speaking community platform.
            Each component features authentic Portuguese cultural context and appropriate visual feedback.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Demo Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <button
              onClick={() => simulateLoading('culturalCalendar', 4000)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              disabled={loadingStates.culturalCalendar}
            >
              Load Calendar
            </button>
            <button
              onClick={() => simulateLoading('palopHeritage', 5000)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              disabled={loadingStates.palopHeritage}
            >
              Load PALOP
            </button>
            <button
              onClick={() => simulateLoading('businessDirectory', 3500)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loadingStates.businessDirectory}
            >
              Load Business
            </button>
            <button
              onClick={() => simulateLoading('matching', 6000)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={loadingStates.matching}
            >
              Load Matches
            </button>
            <button
              onClick={() => simulateLoading('events', 3000)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={loadingStates.events}
            >
              Load Events
            </button>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset All
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => simulateError('culturalCalendar')}
              className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Simulate Calendar Error
            </button>
            <button
              onClick={() => simulateError('palopHeritage')}
              className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Simulate PALOP Error
            </button>
          </div>
        </div>

        {/* Demo Components */}
        <div className="space-y-8">
          
          {/* Cultural Calendar Demo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">Portuguese Cultural Calendar</h3>
              <p className="text-red-100 text-sm">Loading Portuguese cultural events with authentic theming</p>
            </div>
            <CulturalCalendarLoader
              isLoading={loadingStates.culturalCalendar}
              hasError={errorStates.culturalCalendar}
              className="min-h-[400px]"
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-red-800">Upcoming Portuguese Events</h4>
                <div className="space-y-4">
                  {[
                    { title: "Fado Night at Instituto Camões", date: "August 28, 2025", location: "London" },
                    { title: "Portuguese Wine Tasting", date: "August 30, 2025", location: "South Kensington" },
                    { title: "Santo António Festival", date: "September 2, 2025", location: "Portuguese Centre" }
                  ].map((event, index) => (
                    <div key={index} className="flex space-x-4 p-4 border border-red-100 rounded-lg">
                      <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold">{event.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{event.title}</h5>
                        <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CulturalCalendarLoader>
          </div>

          {/* PALOP Heritage Demo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-purple-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">PALOP Heritage Showcase</h3>
              <p className="text-purple-100 text-sm">Exploring African Portuguese-speaking countries heritage</p>
            </div>
            <PALOPHeritageLoader
              isLoading={loadingStates.palopHeritage}
              hasError={errorStates.palopHeritage}
              className="min-h-[400px]"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { country: "Angola", culture: "Traditional Kizomba music and dance heritage" },
                    { country: "Cape Verde", culture: "Morna musical traditions and island culture" },
                    { country: "Mozambique", culture: "Marrabenta music and coastal traditions" }
                  ].map((item, index) => (
                    <div key={index} className="border border-purple-100 rounded-lg overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                      <div className="p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">{item.country}</h5>
                        <p className="text-sm text-gray-600">{item.culture}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PALOPHeritageLoader>
          </div>

          {/* Business Directory Demo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">Portuguese Business Directory</h3>
              <p className="text-blue-100 text-sm">Loading Portuguese-owned businesses in London</p>
            </div>
            <BusinessDirectoryLoader
              isLoading={loadingStates.businessDirectory}
              hasError={errorStates.businessDirectory}
              className="min-h-[300px]"
            >
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Café Lusitano", type: "Restaurant", area: "South Kensington" },
                    { name: "Portugal Imports", type: "Grocery Store", area: "Vauxhall" },
                    { name: "Fado Records", type: "Music Shop", area: "Portobello Road" },
                    { name: "Azulejo Tiles", type: "Home Decor", area: "Notting Hill" }
                  ].map((business, index) => (
                    <div key={index} className="flex space-x-4 p-4 border border-blue-100 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{business.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{business.name}</h5>
                        <p className="text-sm text-gray-600">{business.type} • {business.area}</p>
                      </div>
                      <button className="px-4 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors">
                        Contact
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </BusinessDirectoryLoader>
          </div>

          {/* Matching System Demo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">Portuguese Community Matching</h3>
              <p className="text-indigo-100 text-sm">AI-powered cultural compatibility matching</p>
            </div>
            <MatchingLoader
              isLoading={loadingStates.matching}
              hasError={errorStates.matching}
              className="min-h-[400px]"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Maria Santos", region: "Porto", interests: "Fado, Cooking, Football" },
                    { name: "João Silva", region: "Lisbon", interests: "Business, Technology, Culture" }
                  ].map((match, index) => (
                    <div key={index} className="border border-indigo-100 rounded-lg p-4">
                      <div className="flex space-x-4 mb-4">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold">{match.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{match.name}</h5>
                          <p className="text-sm text-gray-600">From {match.region}</p>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded">
                        <p className="text-sm text-indigo-800">
                          <strong>Shared Interests:</strong> {match.interests}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MatchingLoader>
          </div>

          {/* Events Demo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white px-6 py-3">
              <h3 className="text-lg font-semibold">Community Events</h3>
              <p className="text-green-100 text-sm">Loading upcoming Portuguese community events</p>
            </div>
            <EventsLoader
              isLoading={loadingStates.events}
              hasError={errorStates.events}
              className="min-h-[300px]"
            >
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { title: "Portuguese Language Exchange", participants: 24, date: "Tonight" },
                    { title: "Brazilian BBQ Meetup", participants: 18, date: "This Weekend" },
                    { title: "Cape Verdean Music Night", participants: 32, date: "Next Week" }
                  ].map((event, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-green-100 rounded-lg">
                      <div>
                        <h5 className="font-semibold text-gray-900">{event.title}</h5>
                        <p className="text-sm text-gray-600">{event.participants} participants • {event.date}</p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Join Event
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </EventsLoader>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Progressive Loading States System</h3>
          <p className="text-gray-600 mb-4">
            Each loading state is culturally designed for Portuguese-speaking community components, featuring:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Cultural Theming:</strong>
              <br />Portuguese, Brazilian, and PALOP color schemes
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Bilingual Support:</strong>
              <br />Automatic EN/PT loading messages
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Progressive Feedback:</strong>
              <br />Step-by-step loading progress with cultural context
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}