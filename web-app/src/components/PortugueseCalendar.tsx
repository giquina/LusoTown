"use client";

import React, { useState, useEffect } from 'react';
import { CalendarDaysIcon, MapPinIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  titlePt: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: 'cultural' | 'business' | 'social' | 'food';
  cultural: boolean;
}

const PortugueseCalendar: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Mock Portuguese cultural events
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Fado Night at Portuguese Club',
        titlePt: 'Noite de Fado no Clube Português',
        date: '2025-08-24',
        time: '19:00',
        location: 'Vauxhall Portuguese Club',
        attendees: 45,
        category: 'cultural',
        cultural: true
      },
      {
        id: '2', 
        title: 'Portuguese Business Networking',
        titlePt: 'Networking de Negócios Português',
        date: '2025-08-25',
        time: '18:30',
        location: 'Canary Wharf',
        attendees: 28,
        category: 'business',
        cultural: true
      },
      {
        id: '3',
        title: 'Saints Festival (Santos Populares)',
        titlePt: 'Festival dos Santos Populares',
        date: '2025-08-26',
        time: '16:00',
        location: 'Borough Market',
        attendees: 120,
        category: 'cultural',
        cultural: true
      }
    ];
    setEvents(mockEvents);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'from-red-500 to-green-500';
      case 'business': return 'from-blue-500 to-purple-500';
      case 'social': return 'from-yellow-500 to-orange-500';
      case 'food': return 'from-green-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-gray-100">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-6 py-3 mb-4">
          <CalendarDaysIcon className="w-6 h-6 text-green-600" />
          <span className="font-bold text-gray-800">
            {t('calendar.title', 'Portuguese Cultural Calendar')}
          </span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          {t('calendar.subtitle', 'Upcoming Portuguese Events in London')}
        </h2>
        
        <p className="text-gray-600">
          {t('calendar.description', 'Connect with the Portuguese-speaking community through authentic cultural experiences')}
        </p>
      </motion.div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? event.titlePt : event.title}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-green-100 rounded-full px-3 py-1">
                  <UsersIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    {event.attendees}
                  </span>
                </div>
                
                <button className="bg-gradient-to-r from-green-600 to-red-600 text-white font-bold px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
                  {t('calendar.join', 'Join Event')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-red-600 to-green-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          {t('calendar.view_all', 'View All Portuguese Events')}
        </button>
      </div>
    </div>
  );
};

export default PortugueseCalendar;