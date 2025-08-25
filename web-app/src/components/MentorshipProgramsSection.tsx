'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  BriefcaseIcon,
  LanguageIcon,
  PaintBrushIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function MentorshipProgramsSection() {
  const { t } = useLanguage()

  const programs = [
    {
      id: 'professional',
      icon: BriefcaseIcon,
      title: t('mentorship.programs.professional.title', 'Professional Integration Mentorship'),
      subtitle: t('mentorship.programs.professional.subtitle', 'Career advancement with Lusophone professionals'),
      description: t('mentorship.programs.professional.description', 'Connect with established Lusophone professionals across finance, healthcare, hospitality, construction, and technology sectors. Get industry-specific guidance, CV reviews, interview practice, and business networking within the Portuguese-speaking community.'),
      features: [
        t('mentorship.programs.professional.feature1', 'Industry-specific career guidance'),
        t('mentorship.programs.professional.feature2', 'CV review and interview preparation'),
        t('mentorship.programs.professional.feature3', 'Portuguese business networking'),
        t('mentorship.programs.professional.feature4', 'NHS and United Kingdom job market insights'),
        t('mentorship.programs.professional.feature5', 'Legal and immigration advice'),
        t('mentorship.programs.professional.feature6', 'Professional certification guidance')
      ],
      industries: [
        t('mentorship.programs.professional.industry1', 'Finance & Banking'),
        t('mentorship.programs.professional.industry2', 'Healthcare (NHS)'),
        t('mentorship.programs.professional.industry3', 'Hospitality & Tourism'),
        t('mentorship.programs.professional.industry4', 'Construction & Trades'),
        t('mentorship.programs.professional.industry5', 'Technology & Digital'),
        t('mentorship.programs.professional.industry6', 'Education & Training')
      ],
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50/60 via-transparent to-accent-50/40',
      cta: t('mentorship.programs.professional.cta', 'Find Professional Mentor')
    },
    {
      id: 'language',
      icon: LanguageIcon,
      title: t('mentorship.programs.language.title', 'Language Exchange Partnerships'),
      subtitle: t('mentorship.programs.language.subtitle', 'Bilingual practice with cultural connection'),
      description: t('mentorship.programs.language.description', 'Practice Lusophone and English through meaningful conversations with native speakers. Connect across generations with Lusophone elders sharing wisdom and British-Lusophone youth exploring their heritage. Cultural knowledge preservation through language.'),
      features: [
        t('mentorship.programs.language.feature1', 'Lusophone-English conversation practice'),
        t('mentorship.programs.language.feature2', 'Cross-generational cultural exchange'),
        t('mentorship.programs.language.feature3', 'Heritage exploration sessions'),
        t('mentorship.programs.language.feature4', 'Cultural storytelling traditions'),
        t('mentorship.programs.language.feature5', 'Regional dialects and expressions'),
        t('mentorship.programs.language.feature6', 'Family history documentation')
      ],
      pairings: [
        t('mentorship.programs.language.pairing1', 'Lusophone Elders ↔ British-Lusophone Youth'),
        t('mentorship.programs.language.pairing2', 'Native Lusophone ↔ English Learners'),
        t('mentorship.programs.language.pairing3', 'Recent Immigrants ↔ Established Community'),
        t('mentorship.programs.language.pairing4', 'Students ↔ Professional Lusophone Speakers')
      ],
      gradient: 'from-accent-500 to-coral-500',
      bgGradient: 'from-accent-50/60 via-transparent to-coral-50/40',
      cta: t('mentorship.programs.language.cta', 'Find Language Partner')
    },
    {
      id: 'cultural',
      icon: PaintBrushIcon,
      title: t('mentorship.programs.cultural.title', 'Skill Sharing Marketplace'),
      subtitle: t('mentorship.programs.cultural.subtitle', 'Preserve and learn Portuguese traditions'),
      description: t('mentorship.programs.cultural.description', 'Learn traditional Lusophone crafts, authentic cooking techniques, fado music, and cultural arts from skilled community members. Share your own expertise while preserving Portuguese heritage for future generations.'),
      features: [
        t('mentorship.programs.cultural.feature1', 'Traditional Lusophone crafts instruction'),
        t('mentorship.programs.cultural.feature2', 'Authentic cooking and baking classes'),
        t('mentorship.programs.cultural.feature3', 'Fado music and cultural arts'),
        t('mentorship.programs.cultural.feature4', 'Lusophone tile painting (azulejos)'),
        t('mentorship.programs.cultural.feature5', 'Embroidery and textile arts'),
        t('mentorship.programs.cultural.feature6', 'Business skills from Lusophone entrepreneurs')
      ],
      skills: [
        t('mentorship.programs.cultural.skill1', 'Azulejo Tile Painting'),
        t('mentorship.programs.cultural.skill2', 'Traditional Lusophone Cooking'),
        t('mentorship.programs.cultural.skill3', 'Fado Music & Guitar'),
        t('mentorship.programs.cultural.skill4', 'Lusophone Embroidery'),
        t('mentorship.programs.cultural.skill5', 'Business & Entrepreneurship'),
        t('mentorship.programs.cultural.skill6', 'Lusophone Literature & Poetry')
      ],
      gradient: 'from-action-500 to-premium-500',
      bgGradient: 'from-action-50/60 via-transparent to-premium-50/40',
      cta: t('mentorship.programs.cultural.cta', 'Share Your Skills')
    }
  ]

  return (
    <section id="mentorship-programs" className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 relative overflow-hidden">
      {/* Lusophone-inspired background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-10 py-5 shadow-2xl mb-10 backdrop-blur-sm"
            >
              <UserGroupIcon className="w-5 h-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                {t('mentorship.programs.badge', 'Three-Tier Mentorship System')}
              </span>
              <SparklesIcon className="w-4 h-4 text-accent-500" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight"
            >
              {t('mentorship.programs.title', 'Portuguese-speaking community')}
              <br />
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                {t('mentorship.programs.title.highlight', 'Mentorship Programs')}
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-700 mb-6 font-medium max-w-5xl mx-auto leading-relaxed"
            >
              {t('mentorship.programs.subtitle', 'Three specialized pathways connecting Lusophone professionals, language learners, and cultural knowledge sharers across London')}
            </motion.p>
          </div>

          {/* Programs Grid */}
          <div className="space-y-20">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Program Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                      {program.title}
                    </h3>
                    
                    <p className="text-lg text-secondary-600 font-semibold mb-6">
                      {program.subtitle}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                      {program.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href="#mentorship-registration"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-600 to-action-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      {program.cta}
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>

                  {/* Program Details Card */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className={`bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${program.bgGradient} opacity-50 rounded-3xl`} />
                      
                      <div className="relative z-10">
                        {/* Industry/Skills/Pairings List */}
                        <h4 className="text-xl font-bold text-gray-900 mb-6">
                          {program.id === 'professional' && t('mentorship.programs.professional.industries.title', 'Industries Covered')}
                          {program.id === 'language' && t('mentorship.programs.language.pairings.title', 'Pairing Types')}
                          {program.id === 'cultural' && t('mentorship.programs.cultural.skills.title', 'Skills Available')}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(program.industries || program.pairings || program.skills)?.map((item, itemIndex) => (
                            <div key={itemIndex} className="bg-white/70 rounded-2xl p-4 shadow-lg">
                              <div className="flex items-center gap-3">
                                {program.id === 'professional' && <BuildingOffice2Icon className="w-5 h-5 text-secondary-600 flex-shrink-0" />}
                                {program.id === 'language' && <HeartIcon className="w-5 h-5 text-accent-600 flex-shrink-0" />}
                                {program.id === 'cultural' && <SparklesIcon className="w-5 h-5 text-action-600 flex-shrink-0" />}
                                <span className="text-gray-800 font-medium text-sm">{item}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Program Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-black text-gray-900 mb-1">
                              {program.id === 'professional' && '50+'}
                              {program.id === 'language' && '200+'}
                              {program.id === 'cultural' && '75+'}
                            </div>
                            <div className="text-gray-600 text-sm font-medium">
                              {program.id === 'professional' && t('mentorship.programs.professional.stat1', 'Mentors')}
                              {program.id === 'language' && t('mentorship.programs.language.stat1', 'Partnerships')}
                              {program.id === 'cultural' && t('mentorship.programs.cultural.stat1', 'Instructors')}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black text-gray-900 mb-1">
                              {program.id === 'professional' && '95%'}
                              {program.id === 'language' && '4.9★'}
                              {program.id === 'cultural' && '150+'}
                            </div>
                            <div className="text-gray-600 text-sm font-medium">
                              {program.id === 'professional' && t('mentorship.programs.professional.stat2', 'Success Rate')}
                              {program.id === 'language' && t('mentorship.programs.language.stat2', 'Rating')}
                              {program.id === 'cultural' && t('mentorship.programs.cultural.stat2', 'Skills Taught')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}