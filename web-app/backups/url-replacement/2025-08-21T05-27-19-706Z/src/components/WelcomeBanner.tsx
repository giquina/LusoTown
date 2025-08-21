'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface WelcomeBannerProps {
  userName?: string;
}

export default function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const { t } = useLanguage();

  if (!userName) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg p-6 my-8 shadow-lg">
      <div className="flex items-center">
        <UserCircleIcon className="w-12 h-12 mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{t('welcome_banner.title', { name: userName })}</h2>
          <p className="text-lg">{t('welcome_banner.subtitle', 'Here are the latest live streams for you.')}</p>
        </div>
      </div>
    </div>
  );
}
