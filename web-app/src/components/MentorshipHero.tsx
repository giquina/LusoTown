'use client'

import { motion } from 'framer-motion'
import { buildUnsplashUrl } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { buildUnsplashUrl } from '@/config'
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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
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

      <div className="absolute inset-0 bg-[url(buildUnsplashUrl('photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format'))] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-secondary-900/10"></div>
      <div className="relative container-width py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <HeartIcon className="w-4 h-4 mr-2 text-secondary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {t('mentorship.hero.badge', 'Mentoria Comunitária Portuguesa')}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-secondary-900 mb-6 leading-tight"
            >
              <span className="hidden sm:block">
                Conecte-se com mentores
                <br />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  portugueses experientes
                </span>
              </span>
              <span className="sm:hidden">
                Mentoria
                <br />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  Portuguesa
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            >
              <span className="hidden sm:block">
                LusoTown conecta-o com mentores portugueses estabelecidos em Londres. Desenvolva competências profissionais, pratique idiomas e preserve tradições culturais através do nosso sistema de mentoria em três níveis.
              </span>
              <span className="sm:hidden">
                Conecte-se com mentores portugueses experientes em Londres. Desenvolva competências e preserve tradições culturais.
              </span>
            </motion.p>

            {/* Three Pillars Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            >
              {/* Professional Integration */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-transecondary-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar1.title', 'Professional Integration')}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar1.description', 'Career guidance from established Portuguese professionals in finance, healthcare, hospitality, and more')}
                </p>
              </div>

              {/* Language Exchange */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-transecondary-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-coral-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar2.title', 'Language Exchange')}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar2.description', 'Portuguese-English practice sessions with cross-generational cultural knowledge sharing')}
                </p>
              </div>

              {/* Skill Sharing */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-transecondary-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-action-500 to-premium-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('mentorship.hero.pillar3.title', 'Cultural Skills')}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {t('mentorship.hero.pillar3.description', 'Learn traditional Portuguese crafts, cooking, fado music, and preserve cultural heritage')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Mentores Certificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>Intercâmbio Cultural</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>Desenvolvimento Profissional</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-transecondary-y-1"
              >
                Juntar-se à Mentoria
              </button>
              <a
                href="#mentorship-programs"
                className="border border-secondary-300 text-secondary-700 px-8 py-4 rounded-2xl font-semibold hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Saber Mais
              </a>
            </motion.div>

        </div>
      </div>

      {/* Community Stats */}
      <section className="py-20 bg-secondary-50">
        <div className="container-width">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/70 backdrop-blur-lg border border-white/60 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-secondary-600 mb-2">150+</div>
                <div className="text-secondary-700 font-medium">Mentores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent-600 mb-2">750+</div>
                <div className="text-secondary-700 font-medium">Conexões Bem-sucedidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-action-600 mb-2">25</div>
                <div className="text-secondary-700 font-medium">Indústrias Cobertas</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  )
}