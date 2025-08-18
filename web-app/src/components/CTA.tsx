'use client'

// LusoTown Design System:
// - Background: Portuguese gradient (from-secondary-600 via-action-600 to-accent-600)
// - Button text: secondary-700 (green) for contrast against white background
// - Never use primary (blue) colors for CTA sections

import { motion } from 'framer-motion'
import { ArrowRightIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { plans, formatPrice } from '@/config/pricing'

const getBenefits = (t: any) => [
  "Connect with Portuguese speakers across London",
  "Join authentic Portuguese cultural events", 
  "Professional networking opportunities",
  "Cultural compatibility matching",
  "Premium support in Portuguese",
  "Community-driven platform for Portuguese speakers"
]

export default function CTA() {
  const { t } = useLanguage()
  const benefits = getBenefits(t)
  return (
    <section className="py-20 bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium mb-6 border border-white/30">
              <SparklesIcon className="h-4 w-4" />
              Join the Portuguese Community
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Portuguese Community Awaits
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Connect with Portuguese speakers in London. Choose your plan and start building meaningful cultural connections today.
            </p>
          </motion.div>

          {/* Benefits List - Fixed mobile text truncation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-h-[64px]"
              >
                <CheckIcon className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium leading-relaxed break-words">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <a href="/signup" className="bg-white text-secondary-700 hover:bg-gray-50 font-bold text-base sm:text-lg md:text-xl px-6 sm:px-10 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 group inline-flex items-center justify-center w-full sm:w-auto max-w-sm mx-auto">
              {t('cta.button', 'JOIN NOW')}
              <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            
            <p className="text-white/80 text-sm">
              {t('cta.guarantee', 'No commitment • Start connecting immediately • Cancel anytime')}
            </p>
          </motion.div>

          {/* Urgency/Scarcity */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: `hsl(${(i * 60) % 360}, 70%, 60%)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-white font-semibold text-lg mb-2">
              23 {t('cta.social-proof', 'Portuguese speakers joined in the last 24 hours')}
            </p>
            <p className="text-white/80">
              {t('cta.connect-time', 'Join now and connect with the Luso-London community within 48 hours')}
            </p>
          </motion.div>

          {/* Trust Signals - Enhanced Multi-Column Layout - Fixed mobile spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-white/80"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm">{t('cta.trust.verified-profiles', 'Verified Profiles')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm">{t('cta.trust.community-support', 'Community Support')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">30-Days</div>
              <div className="text-sm">{t('cta.trust.satisfaction-guarantee', 'Satisfaction Guarantee')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}