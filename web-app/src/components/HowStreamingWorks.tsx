'use client';

import { PlayIcon, RssIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

export default function HowStreamingWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: RssIcon,
      title: t('how_streaming_works.step1_title', 'Discover Live Streams'),
      description: t('how_streaming_works.step1_desc', 'Browse our schedule for live content, from cultural events and Fado nights to business workshops and community talks.'),
    },
    {
      icon: PlayIcon,
      title: t('how_streaming_works.step2_title', 'Watch & Interact'),
      description: t('how_streaming_works.step2_desc', 'Join the stream, participate in the live chat, and connect with other Portuguese speakers in real-time.'),
    },
    {
      icon: UserGroupIcon,
      title: t('how_streaming_works.step3_title', 'Start Earning'),
      description: t('how_streaming_works.step3_desc', 'Share your passion with the community. Join as an organizer and host your own community events on LusoTown.'),
    },
    {
      icon: StarIcon,
      title: t('how_streaming_works.step4_title', 'Access Premium Content'),
      description: t('how_streaming_works.step4_desc', 'Upgrade to a premium membership to access exclusive streams, workshops, and an on-demand library of past events.'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('how_streaming_works.title', 'How LusoTown Streaming Works')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('how_streaming_works.subtitle', 'Your gateway to live Portuguese culture and community.')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mx-auto mb-6">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
