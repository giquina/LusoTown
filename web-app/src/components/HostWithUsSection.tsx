'use client'

import { useLanguage } from '@/context/LanguageContext'
import { 
  AcademicCapIcon,
  SparklesIcon,
  GlobeAltIcon,
  CurrencyPoundIcon,
  HeartIcon,
  ArrowRightIcon,
  UserGroupIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

export default function HostWithUsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-gradient-to-br from-premium-50/30 via-white to-coral-50/30 relative overflow-hidden border-t border-gray-100">
      {/* Portuguese-inspired background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-premium-200/40 via-coral-100/30 to-accent-100/30 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-secondary-200/40 via-premium-100/30 to-coral-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-premium-300/50 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-coral-300/50 rounded-full opacity-30" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-secondary-300/50 rounded-full opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-50/80 via-coral-50/60 to-secondary-50/60 border border-premium-200/40 rounded-3xl px-10 py-5 shadow-2xl mb-10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                <span className="text-sm font-bold bg-gradient-to-r from-premium-600 via-coral-600 to-secondary-600 bg-clip-text text-transparent">
                  {t('host-with-us.badge')}
                </span>
              </div>
              <div className="w-2 h-2 bg-premium-400 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              {t('host-with-us.title')}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 mb-6 font-medium max-w-5xl mx-auto leading-relaxed">
              {t('host-with-us.subtitle')}
            </p>
            <blockquote className="text-lg text-gray-600 italic max-w-4xl mx-auto font-medium">
              {t('host-with-us.testimonial')}
            </blockquote>
          </div>
          
          {/* 3-Column Grid Layout for Professional Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Professional Services & Workshops */}
            <div className="group relative h-full">
              <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-premium-50/60 via-transparent to-coral-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-premium-500 to-premium-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                    <AcademicCapIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-premium-600 transition-colors duration-300">
                    {t('host-with-us.professionals.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                    {t('host-with-us.professionals.description')}
                  </p>
                  <div className="text-xs text-gray-500 mb-4 font-medium">
                    {t('host-with-us.professionals.examples')}
                  </div>
                  <a 
                    href="/host?category=professional" 
                    className="inline-flex items-center gap-2 text-premium-600 font-semibold hover:text-premium-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                  >
                    {t('host-with-us.professionals.cta')}
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Cultural Events & Experiences */}
            <div className="group relative h-full">
              <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/60 via-transparent to-accent-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                    {t('host-with-us.cultural.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                    {t('host-with-us.cultural.description')}
                  </p>
                  <div className="text-xs text-gray-500 mb-4 font-medium">
                    {t('host-with-us.cultural.examples')}
                  </div>
                  <a 
                    href="/host?category=cultural" 
                    className="inline-flex items-center gap-2 text-secondary-600 font-semibold hover:text-secondary-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                  >
                    {t('host-with-us.cultural.cta')}
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Portuguese Business Promotion */}
            <div className="group relative h-full">
              <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-50/60 via-transparent to-action-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-action-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                    <BriefcaseIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-coral-600 transition-colors duration-300">
                    {t('host-with-us.business.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                    {t('host-with-us.business.description')}
                  </p>
                  <div className="text-xs text-gray-500 mb-4 font-medium">
                    {t('host-with-us.business.examples')}
                  </div>
                  <a 
                    href="/host?category=business" 
                    className="inline-flex items-center gap-2 text-coral-600 font-semibold hover:text-coral-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                  >
                    {t('host-with-us.business.cta')}
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-coral-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('host-with-us.success.title')}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('host-with-us.success.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <blockquote className="text-gray-700 italic mb-4 text-sm leading-relaxed">
                  {t('host-with-us.success.story1.quote')}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    JS
                  </div>
                  <cite className="text-sm font-medium text-gray-900 not-italic">
                    {t('host-with-us.success.story1.author')}
                  </cite>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <blockquote className="text-gray-700 italic mb-4 text-sm leading-relaxed">
                  {t('host-with-us.success.story2.quote')}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-premium-400 to-coral-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AC
                  </div>
                  <cite className="text-sm font-medium text-gray-900 not-italic">
                    {t('host-with-us.success.story2.author')}
                  </cite>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">
                {t('host-with-us.benefits.reach.title')}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('host-with-us.benefits.reach.description')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CurrencyPoundIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">
                {t('host-with-us.benefits.revenue.title')}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('host-with-us.benefits.revenue.description')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-coral-500 to-action-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">
                {t('host-with-us.benefits.community.title')}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('host-with-us.benefits.community.description')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-premium-500 to-coral-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">
                {t('host-with-us.benefits.heritage.title')}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('host-with-us.benefits.heritage.description')}
              </p>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 via-premium-50/60 to-coral-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {t('host-with-us.cta.title')}
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('host-with-us.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/host"
                  className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-premium-600 via-coral-600 to-secondary-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-premium-700 via-coral-700 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t('host-with-us.cta.primary')}
                    <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href="/host/learn-more"
                  className="text-lg font-bold px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-premium-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  {t('host-with-us.cta.secondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}