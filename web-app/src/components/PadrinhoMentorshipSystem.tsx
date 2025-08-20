'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

interface MentorProfile {
  id: string
  name: string
  age: number
  yearsInLondon: number
  profession: string
  company: string
  specializations: string[]
  mentorshipAreas: string[]
  portugueseRegion: string
  languages: string[]
  availability: string
  successfulMentorships: number
  rating: number
  profileImage: string
  bio: string
  mentorshipPhilosophy: string
  achievements: string[]
  isVerified: boolean
  responseTime: string
}

interface MentorshipRequest {
  id: string
  menteeId: string
  mentorId: string
  requestType: 'cultural_integration' | 'professional_development' | 'business_networking' | 'life_guidance'
  status: 'pending' | 'accepted' | 'active' | 'completed'
  description: string
  goals: string[]
  timeline: string
  createdAt: string
}

interface MentorshipProgram {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  duration: string
  structure: string
  commitment: string
  benefits: string[]
  requirements: string[]
  successRate: number
  participantsCount: number
}

export default function PadrinhoMentorshipSystem() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'find-mentor' | 'become-mentor' | 'programs'>('find-mentor')
  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [programs, setPrograms] = useState<MentorshipProgram[]>([])
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null)
  const [filters, setFilters] = useState({
    mentorshipArea: '',
    profession: '',
    region: '',
    experience: ''
  })

  // Mock data - in real app, this would come from Supabase
  useEffect(() => {
    setMentors([
      {
        id: '1',
        name: 'Ana Ferreira',
        age: 45,
        yearsInLondon: 12,
        profession: 'Senior Marketing Director',
        company: 'BBC',
        specializations: ['Digital Marketing', 'Team Leadership', 'Cultural Adaptation'],
        mentorshipAreas: ['professional_development', 'cultural_integration', 'career_advancement'],
        portugueseRegion: 'Lisboa',
        languages: ['Portuguese', 'English', 'Spanish'],
        availability: 'Weekends and evenings',
        successfulMentorships: 8,
        rating: 4.9,
        profileImage: '/images/mentors/ana.jpg',
        bio: 'Experienced marketing professional who has helped numerous Portuguese professionals establish themselves in the U.K.\'s competitive market.',
        mentorshipPhilosophy: 'I believe in empowering others through shared experiences and cultural pride while embracing new opportunities.',
        achievements: ['Promoted 3 Portuguese colleagues to senior positions', 'Founded Portuguese Professional Network London'],
        isVerified: true,
        responseTime: 'Within 24 hours'
      },
      {
        id: '2',
        name: 'Carlos Santos',
        age: 38,
        yearsInLondon: 8,
        profession: 'Restaurant Owner & Chef',
        company: 'Casa do Bacalhau',
        specializations: ['Business Development', 'Portuguese Cuisine', 'Restaurant Management'],
        mentorshipAreas: ['entrepreneurship', 'cultural_business', 'portuguese_gastronomy'],
        portugueseRegion: 'Porto',
        languages: ['Portuguese', 'English', 'French'],
        availability: 'Flexible schedule',
        successfulMentorships: 12,
        rating: 4.8,
        profileImage: '/images/mentors/carlos.jpg',
        bio: 'Successful Portuguese restaurant owner who has built a thriving business celebrating authentic Portuguese culture in the U.K..',
        mentorshipPhilosophy: 'Success comes from combining Portuguese authenticity with London\'s multicultural business environment.',
        achievements: ['2x Portuguese Restaurant of the Year', 'Mentored 5 successful Portuguese food businesses'],
        isVerified: true,
        responseTime: 'Within 48 hours'
      },
      {
        id: '3',
        name: 'Maria José Silva',
        age: 52,
        yearsInLondon: 20,
        profession: 'NHS Senior Nurse',
        company: 'St. Thomas\' Hospital',
        specializations: ['Healthcare Navigation', 'Family Settlement', 'Educational Pathways'],
        mentorshipAreas: ['family_integration', 'healthcare_system', 'children_education'],
        portugueseRegion: 'Açores',
        languages: ['Portuguese', 'English'],
        availability: 'Weekends',
        successfulMentorships: 15,
        rating: 5.0,
        profileImage: '/images/mentors/maria.jpg',
        bio: 'Dedicated healthcare professional who has helped countless Portuguese families navigate London\'s systems with compassion and expertise.',
        mentorshipPhilosophy: 'Every Portuguese family deserves to feel at home in the U.K. while maintaining their cultural identity.',
        achievements: ['Established Portuguese Healthcare Support Network', 'Helped 20+ families with NHS navigation'],
        isVerified: true,
        responseTime: 'Within 24 hours'
      }
    ])

    setPrograms([
      {
        id: '1',
        nameEn: 'New Arrival Integration Program',
        namePt: 'Programa de Integração para Recém-Chegados',
        descriptionEn: 'Comprehensive 6-month program pairing new Portuguese arrivals with experienced community members',
        descriptionPt: 'Programa abrangente de 6 meses emparelhando novos portugueses com membros experientes da comunidade',
        duration: '6 months',
        structure: 'Weekly 1-hour sessions + monthly group activities',
        commitment: '4-6 hours per month',
        benefits: [
          'Personal mentor assignment',
          'Cultural integration workshops',
          'Professional networking events',
          'Family support resources',
          'Emergency assistance network'
        ],
        requirements: [
          'Recent arrival (within 2 years)',
          'Commitment to program duration',
          'Participation in group activities',
          'Feedback and progress tracking'
        ],
        successRate: 94,
        participantsCount: 156
      },
      {
        id: '2',
        nameEn: 'Professional Advancement Track',
        namePt: 'Trilha de Avanço Profissional',
        descriptionEn: 'Career-focused mentorship connecting Portuguese professionals with industry leaders',
        descriptionPt: 'Mentoria focada na carreira conectando profissionais portugueses com líderes da indústria',
        duration: '12 months',
        structure: 'Bi-weekly sessions + quarterly industry events',
        commitment: '8-10 hours per month',
        benefits: [
          'Senior professional mentor',
          'Career development planning',
          'Industry-specific networking',
          'Skills development workshops',
          'Leadership training access'
        ],
        requirements: [
          '2+ years professional experience',
          'Clear career advancement goals',
          'Active participation in networking',
          'Willingness to mentor others after completion'
        ],
        successRate: 87,
        participantsCount: 89
      },
      {
        id: '3',
        nameEn: 'Portuguese Business Incubator',
        namePt: 'Incubadora de Negócios Portugueses',
        descriptionEn: 'Entrepreneurship program supporting Portuguese business ventures in the U.K.',
        descriptionPt: 'Programa de empreendedorismo apoiando ventures portugueses de negócios em Londres',
        duration: '18 months',
        structure: 'Weekly consultations + monthly investor pitches',
        commitment: '15-20 hours per month',
        benefits: [
          'Experienced entrepreneur mentor',
          'Business development support',
          'Investment network access',
          'Legal and financial guidance',
          'Portuguese market connections'
        ],
        requirements: [
          'Viable business idea or early-stage business',
          'Commitment to program timeline',
          'Financial planning readiness',
          'Community contribution component'
        ],
        successRate: 78,
        participantsCount: 34
      }
    ])
  }, [])

  const mentorshipAreas = [
    { key: 'cultural_integration', nameEn: 'Cultural Integration', namePt: 'Integração Cultural', icon: GlobeAltIcon },
    { key: 'professional_development', nameEn: 'Professional Development', namePt: 'Desenvolvimento Profissional', icon: BriefcaseIcon },
    { key: 'entrepreneurship', nameEn: 'Entrepreneurship', namePt: 'Empreendedorismo', icon: BuildingOfficeIcon },
    { key: 'family_integration', nameEn: 'Family Integration', namePt: 'Integração Familiar', icon: HeartIcon },
    { key: 'education_guidance', nameEn: 'Education Guidance', namePt: 'Orientação Educacional', icon: AcademicCapIcon },
    { key: 'life_guidance', nameEn: 'Life Guidance', namePt: 'Orientação de Vida', icon: HandRaisedIcon }
  ]

  const renderFindMentor = () => (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('mentorship.filters.title', 'Find Your Perfect Padrinho/Madrinha')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={filters.mentorshipArea}
            onChange={(e) => setFilters(prev => ({ ...prev, mentorshipArea: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('mentorship.filters.all_areas', 'All Mentorship Areas')}</option>
            {mentorshipAreas.map(area => (
              <option key={area.key} value={area.key}>
                {language === 'pt' ? area.namePt : area.nameEn}
              </option>
            ))}
          </select>

          <select
            value={filters.profession}
            onChange={(e) => setFilters(prev => ({ ...prev, profession: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('mentorship.filters.all_professions', 'All Professions')}</option>
            <option value="marketing">Marketing</option>
            <option value="healthcare">Healthcare</option>
            <option value="business">Business Owner</option>
            <option value="technology">Technology</option>
          </select>

          <select
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('mentorship.filters.all_regions', 'All Portuguese Regions')}</option>
            <option value="lisboa">Lisboa</option>
            <option value="porto">Porto</option>
            <option value="açores">Açores</option>
            <option value="madeira">Madeira</option>
            <option value="centro">Centro</option>
            <option value="alentejo">Alentejo</option>
            <option value="algarve">Algarve</option>
          </select>

          <select
            value={filters.experience}
            onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('mentorship.filters.all_experience', 'All Experience Levels')}</option>
            <option value="5-10">5-10 years in the U.K.</option>
            <option value="10-15">10-15 years in the U.K.</option>
            <option value="15+">15+ years in the U.K.</option>
          </select>
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => setSelectedMentor(mentor)}
          >
            {/* Mentor Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-accent-500 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-10 h-10 text-white" />
                </div>
                {mentor.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{mentor.profession}</p>
                <p className="text-gray-500 text-xs">{mentor.company}</p>
                
                {/* Rating and Experience */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{mentor.yearsInLondon} anos em Londres</span>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                {t('mentorship.specializations', 'Specializations')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {mentor.specializations.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                  >
                    {spec}
                  </span>
                ))}
                {mentor.specializations.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{mentor.specializations.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-secondary-600">{mentor.successfulMentorships}</div>
                <div className="text-xs text-gray-600">{t('mentorship.successful', 'Successful Mentorships')}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-accent-600">{mentor.portugueseRegion}</div>
                <div className="text-xs text-gray-600">{t('mentorship.origin', 'Origin')}</div>
              </div>
            </div>

            {/* Bio Preview */}
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">{mentor.bio}</p>

            {/* Response Time */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-gray-500">
                {t('mentorship.responds', 'Responds')} {mentor.responseTime}
              </span>
              <span className="text-xs text-green-600 font-medium">
                {t('mentorship.available', 'Available')}
              </span>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              {t('mentorship.connect', 'Connect with Mentor')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderBecomeMentor = () => (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl px-6 py-3 mb-6"
        >
          <SparklesIcon className="w-5 h-5 text-yellow-600" />
          <span className="font-semibold text-yellow-700">
            {t('mentorship.become.badge', 'Become a Cultural Guardian')}
          </span>
        </motion.div>

        <h2 className="text-4xl font-black text-gray-900 mb-6">
          {t('mentorship.become.title', 'Share Your Journey, Guide Others Home')}
        </h2>
        
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          {t('mentorship.become.subtitle', 'Use your experience in the U.K. to help fellow Portuguese speakers thrive while preserving our cultural identity')}
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('mentorship.benefits.community.title', 'Strengthen Our Community')}
          </h3>
          <p className="text-gray-600">
            {t('mentorship.benefits.community.desc', 'Help build a stronger Portuguese diaspora network where everyone feels supported and connected to their roots')}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('mentorship.benefits.growth.title', 'Personal Growth')}
          </h3>
          <p className="text-gray-600">
            {t('mentorship.benefits.growth.desc', 'Develop leadership skills, gain fresh perspectives, and find renewed purpose in your professional journey')}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <BriefcaseIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('mentorship.benefits.network.title', 'Expand Your Network')}
          </h3>
          <p className="text-gray-600">
            {t('mentorship.benefits.network.desc', 'Connect with diverse Portuguese professionals and discover new business and collaboration opportunities')}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
            <GlobeAltIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('mentorship.benefits.legacy.title', 'Cultural Legacy')}
          </h3>
          <p className="text-gray-600">
            {t('mentorship.benefits.legacy.desc', 'Preserve Portuguese traditions and values while helping others navigate the balance between heritage and integration')}
          </p>
        </div>
      </div>

      {/* Requirements and Process */}
      <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('mentorship.process.title', 'Mentor Application Process')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-secondary-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('mentorship.process.step1.title', 'Application')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('mentorship.process.step1.desc', 'Complete detailed application showcasing your experience and mentorship philosophy')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-secondary-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('mentorship.process.step2.title', 'Interview')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('mentorship.process.step2.desc', 'Personal interview to assess cultural understanding and mentorship readiness')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-secondary-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {t('mentorship.process.step3.title', 'Training')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('mentorship.process.step3.desc', 'Complete mentorship training program and cultural sensitivity workshop')}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all">
            {t('mentorship.apply', 'Apply to Become a Mentor')}
          </button>
        </div>
      </div>
    </div>
  )

  const renderPrograms = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900 mb-6">
          {t('mentorship.programs.title', 'Structured Mentorship Programs')}
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          {t('mentorship.programs.subtitle', 'Choose from specialized programs designed to address specific aspects of Portuguese life in the U.K.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? program.namePt : program.nameEn}
              </h3>
              <p className="text-gray-600">
                {language === 'pt' ? program.descriptionPt : program.descriptionEn}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('mentorship.duration', 'Duration')}:</span>
                <span className="font-semibold text-gray-900">{program.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('mentorship.commitment', 'Commitment')}:</span>
                <span className="font-semibold text-gray-900">{program.commitment}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('mentorship.success_rate', 'Success Rate')}:</span>
                <span className="font-semibold text-green-600">{program.successRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('mentorship.participants', 'Participants')}:</span>
                <span className="font-semibold text-gray-900">{program.participantsCount}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {t('mentorship.benefits', 'Benefits')}
              </h4>
              <ul className="space-y-2">
                {program.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {benefit}
                  </li>
                ))}
                {program.benefits.length > 3 && (
                  <li className="text-sm text-gray-500">
                    +{program.benefits.length - 3} more benefits
                  </li>
                )}
              </ul>
            </div>

            <button className="w-full bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              {t('mentorship.join_program', 'Join Program')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl px-6 py-3 mb-6"
          >
            <HandRaisedIcon className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-700">
              {t('mentorship.badge', 'Padrinho/Madrinha System')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            {t('mentorship.title', 'Portuguese Cultural')}
            <br />
            <span className="bg-gradient-to-r from-secondary-600 via-accent-600 to-coral-600 bg-clip-text text-transparent">
              {t('mentorship.mentorship', 'Mentorship Network')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto"
          >
            {t('mentorship.subtitle', 'Connect with experienced Portuguese mentors who understand your journey and can guide you to success while honoring your heritage')}
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              {[
                { key: 'find-mentor', label: t('mentorship.tabs.find', 'Find Mentor'), icon: UserCircleIcon },
                { key: 'become-mentor', label: t('mentorship.tabs.become', 'Become Mentor'), icon: HandRaisedIcon },
                { key: 'programs', label: t('mentorship.tabs.programs', 'Programs'), icon: AcademicCapIcon }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-secondary-600 to-accent-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeTab === 'find-mentor' && renderFindMentor()}
            {activeTab === 'become-mentor' && renderBecomeMentor()}
            {activeTab === 'programs' && renderPrograms()}
          </motion.div>
        </AnimatePresence>

        {/* Selected Mentor Modal */}
        <AnimatePresence>
          {selectedMentor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMentor(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-accent-500 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedMentor.name}</h3>
                    <p className="text-gray-600 mb-2">{selectedMentor.profession}</p>
                    <p className="text-gray-500">{selectedMentor.company}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold">{selectedMentor.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-600">{selectedMentor.yearsInLondon} anos em Londres</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('mentorship.modal.bio', 'About')}
                    </h4>
                    <p className="text-gray-600">{selectedMentor.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t('mentorship.modal.philosophy', 'Mentorship Philosophy')}
                    </h4>
                    <p className="text-gray-600">{selectedMentor.mentorshipPhilosophy}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t('mentorship.modal.specializations', 'Specializations')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t('mentorship.modal.achievements', 'Key Achievements')}
                    </h4>
                    <ul className="space-y-2">
                      {selectedMentor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                      {t('mentorship.modal.request', 'Request Mentorship')}
                    </button>
                    <button
                      onClick={() => setSelectedMentor(null)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                    >
                      {t('common.close', 'Close')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}