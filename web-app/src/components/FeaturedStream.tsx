'use client';

import { CalendarIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function FeaturedStream() {
  const { t } = useLanguage();

  return (
    <section className="my-8">
      <div className="bg-gradient-to-br from-secondary-50 via-accent-50 to-coral-50 rounded-2xl p-8 shadow-lg border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-sm font-bold uppercase text-secondary-600 mb-2">{t('featured_stream.badge', 'Don\'t Miss')}</h3>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('featured_stream.title', 'Live Fado Night with Mariza')}</h2>
            <p className="text-gray-600 mb-6">{t('featured_stream.description', 'Join us for an exclusive live performance by the queen of Fado, Mariza. A night of soulful music and Portuguese culture, streamed directly to you.')}</p>
            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-700">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>{t('featured_stream.date', 'Tonight at 9:00 PM')}</span>
              </div>
            </div>
            <a href="#player" className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 transition-colors">
              <PlayCircleIcon className="w-6 h-6 mr-2" />
              {t('featured_stream.cta', 'Go to Stream')}
            </a>
          </div>
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-2xl">
            <Image src="/events/fado.jpg" alt="Fado Night" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
