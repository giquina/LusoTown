'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  AcademicCapIcon, 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function MentorshipHero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50 overflow-hidden">
      {/* Portuguese Cultural Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-secondary-300/50 rounded-full opacity-40" />
        <div className="absolute top-2/3 right-1/5 w-6 h-6 bg-accent-300/50 rounded-full opacity-30" />
        <div className="absolute bottom-1/4 left-3/4 w-4 h-4 bg-coral-300/50 rounded-full opacity-35" />
        
        {/* Decorative Portuguese tile pattern */}
        <div className="absolute top-40 left-10 w-16 h-16 border-2 border-secondary-200/30 rotate-45 opacity-20" />
        <div className="absolute bottom-40 right-10 w-12 h-12 border-2 border-accent-200/30 rotate-12 opacity-25" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Portuguese Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/90 via-accent-50/70 to-coral-50/70 border border-secondary-200/50 rounded-3xl px-8 py-4 shadow-xl mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                  {t('mentorship.hero.badge', 'Mentoria Comunitária • Community Mentorship')}
                </span>
              </div>
              <HeartIcon className="w-4 h-4 text-action-500 animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight"
            >
              {t('mentorship.hero.title', 'Portuguese Community')}
              <br />
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                {t('mentorship.hero.title.highlight', 'Mentorship Network')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-4xl mx-auto leading-relaxed"
            >
              {t('mentorship.hero.subtitle', 'Connect with established Portuguese professionals, practice language skills, and preserve cultural traditions through our three-tier mentorship system')}
            </motion.p>

            {/* Three Pillars Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            >
              {/* Professional Integration */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar1.title', 'Professional Integration')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar1.description', 'Career guidance from established Portuguese professionals in finance, healthcare, hospitality, and more')}
                </p>
              </div>

              {/* Language Exchange */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-coral-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar2.title', 'Language Exchange')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar2.description', 'Portuguese-English practice sessions with cross-generational cultural knowledge sharing')}
                </p>
              </div>

              {/* Skill Sharing */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-action-500 to-premium-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar3.title', 'Cultural Skills')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar3.description', 'Learn traditional Portuguese crafts, cooking, fado music, and preserve cultural heritage')}
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#mentorship-registration"
                className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3 whitespace-nowrap">
                  {t('mentorship.hero.cta.primary', 'Join Mentorship')}
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a
                href="#mentorship-programs"
                className="text-lg font-bold px-10 py-4 bg-white/90 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/95 whitespace-nowrap"
              >
                {t('mentorship.hero.cta.secondary', 'Learn More')}
              </a>
            </motion.div>

            {/* Community Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 bg-white/70 backdrop-blur-lg border border-white/60 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-secondary-600 mb-2">150+</div>
                  <div className="text-gray-700 font-medium">{t('mentorship.hero.stats.mentors', 'Active Mentors')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent-600 mb-2">500+</div>
                  <div className="text-gray-700 font-medium">{t('mentorship.hero.stats.connections', 'Successful Matches')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-action-600 mb-2">25</div>
                  <div className="text-gray-700 font-medium">{t('mentorship.hero.stats.industries', 'Industries Covered')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}