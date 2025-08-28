'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  UsersIcon,
  MapPinIcon,
  CheckBadgeIcon,
  StarIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartBarIcon,
  TrendingUpIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  FlagIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import {
  CheckBadgeIcon as CheckBadgeIconSolid,
  StarIcon as StarIconSolid,
  AcademicCapIcon as AcademicCapIconSolid
} from '@heroicons/react/24/solid'
import { UNIVERSITY_PARTNERSHIPS, UNIVERSITY_STATS, getUniversityById, getUniversitiesByPartnershipLevel } from '@/config/universities'
import Link from 'next/link'

interface PartnershipStats {
  totalStudents: number
  totalPortugueseStudents: number
  totalBrazilianStudents: number
  totalLusoTownMembers: number
  averageStudentsPerUniversity: number
  londonUniversities: number
  activeSocieties: number
}

interface UniversityCardProps {
  university: typeof UNIVERSITY_PARTNERSHIPS[0]
  isSelected: boolean
  onClick: () => void
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, isSelected, onClick }) => {
  const { language } = useLanguage()
  
  const getPartnershipColor = (level: string) => {
    switch (level) {
      case 'strategic':
        return 'from-green-500 to-emerald-500'
      case 'official':
        return 'from-blue-500 to-indigo-500'
      case 'community':
        return 'from-primary-500 to-secondary-500'
      case 'pending':
        return 'from-gray-400 to-gray-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getPartnershipBadge = (level: string) => {
    switch (level) {
      case 'strategic':
        return 'bg-green-100 text-green-800'
      case 'official':
        return 'bg-blue-100 text-blue-800'
      case 'community':
        return 'bg-primary-100 text-primary-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow-lg border-2 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-primary-500 shadow-xl bg-primary-50'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getPartnershipColor(university.partnershipLevel)}`}>
              <AcademicCapIconSolid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{university.shortName}</h3>
              <p className="text-sm text-gray-600">{university.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getPartnershipBadge(university.partnershipLevel)}`}>
              {university.partnershipLevel === 'strategic' && <StarIconSolid className="w-3 h-3 mr-1" />}
              {university.partnershipLevel}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1" />
          {university.address.city}
          <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
            {university.region}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary-600">{university.portugueseStudents}</div>
            <div className="text-xs text-gray-500">
              {language === 'pt' ? 'Portugueses' : 'Portuguese'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-secondary-600">{university.brazilianStudents}</div>
            <div className="text-xs text-gray-500">
              {language === 'pt' ? 'Brasileiros' : 'Brazilian'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent-600">{university.lusoTownMembers}</div>
            <div className="text-xs text-gray-500">LusoTown</div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {university.hasPortugueseProgram && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              <BookIcon className="w-3 h-3 mr-1" />
              {language === 'pt' ? 'Programa PT' : 'PT Program'}
            </span>
          )}
          {university.portugalStudyAbroad && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <GlobeEuropeAfricaIcon className="w-3 h-3 mr-1" />
              {language === 'pt' ? 'Erasmus PT' : 'Study Abroad'}
            </span>
          )}
          {university.portugueseSociety?.active && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              <UserGroupIcon className="w-3 h-3 mr-1" />
              {language === 'pt' ? 'Sociedade' : 'Society'}
            </span>
          )}
        </div>

        {/* Portuguese Society Info */}
        {university.portugueseSociety?.active && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">{university.portugueseSociety.name}</h4>
              <span className="text-xs text-gray-500">
                {university.portugueseSociety.memberCount} {language === 'pt' ? 'membros' : 'members'}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              {university.portugueseSociety.meetingFrequency}
            </div>
          </div>
        )}

        {/* Services Available */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {language === 'pt' ? 'Serviços Disponíveis:' : 'Available Services:'}
            </span>
            <div className="flex items-center space-x-1">
              {Object.entries(university.studentServices)
                .filter(([_, available]) => available)
                .map(([service], index) => (
                  <div key={service} className="w-2 h-2 bg-green-500 rounded-full"></div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2"
        >
          <CheckBadgeIconSolid className="w-6 h-6 text-primary-600" />
        </motion.div>
      )}
    </motion.div>
  )
}

const BookIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
  </svg>
)

export default function UniversityPartnershipDashboard() {
  const { t, language } = useLanguage()
  const [selectedUniversity, setSelectedUniversity] = useState<string>('')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterRegion, setFilterRegion] = useState<string>('all')
  const [showStats, setShowStats] = useState(false)

  const stats: PartnershipStats = {
    totalStudents: UNIVERSITY_PARTNERSHIPS.reduce((sum, uni) => sum + uni.totalStudents, 0),
    totalPortugueseStudents: UNIVERSITY_STATS.totalPortugueseStudents,
    totalBrazilianStudents: UNIVERSITY_STATS.totalBrazilianStudents,
    totalLusoTownMembers: UNIVERSITY_STATS.totalLusoTownMembers,
    averageStudentsPerUniversity: Math.round(UNIVERSITY_STATS.totalPortugueseStudents / UNIVERSITY_STATS.totalPartnerships),
    londonUniversities: UNIVERSITY_STATS.londonUniversities,
    activeSocieties: UNIVERSITY_PARTNERSHIPS.filter(uni => uni.portugueseSociety?.active).length
  }

  const filteredUniversities = UNIVERSITY_PARTNERSHIPS.filter(uni => {
    const levelMatch = filterLevel === 'all' || uni.partnershipLevel === filterLevel
    const regionMatch = filterRegion === 'all' || uni.region === filterRegion
    return levelMatch && regionMatch
  })

  const regions = [...new Set(UNIVERSITY_PARTNERSHIPS.map(uni => uni.region))]

  const selectedUni = selectedUniversity ? getUniversityById(selectedUniversity) : null

  useEffect(() => {
    setShowStats(true)
  }, [])

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 p-1 rounded-full mb-6"
          >
            <div className="bg-white rounded-full p-3">
              <BuildingOffice2Icon className="w-8 h-8 text-primary-600" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Painel de Parcerias Universitárias' : 'University Partnership Dashboard'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Explore as nossas parcerias com universidades do Reino Unido e descubra oportunidades para estudantes lusófonos'
              : 'Explore our partnerships with UK universities and discover opportunities for Portuguese-speaking students'}
          </p>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 20 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
              <BuildingOffice2Icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{UNIVERSITY_STATS.totalPartnerships}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Parcerias' : 'Partnerships'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
              <UsersIcon className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalPortugueseStudents.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Portugueses' : 'Portuguese'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
              <FlagIcon className="w-6 h-6 text-accent-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalBrazilianStudents.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Brasileiros' : 'Brazilian'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-premium-100 rounded-lg mb-4">
              <CheckBadgeIcon className="w-6 h-6 text-premium-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalLusoTownMembers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">LusoTown</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <MapPinIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.londonUniversities}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Em Londres' : 'London'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSocieties}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Sociedades' : 'Societies'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
              <TrendingUpIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.averageStudentsPerUniversity}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Média/Uni' : 'Avg/Uni'}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Nível de Parceria' : 'Partnership Level'}
                </label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">{language === 'pt' ? 'Todos os níveis' : 'All levels'}</option>
                  <option value="strategic">{language === 'pt' ? 'Estratégico' : 'Strategic'}</option>
                  <option value="official">{language === 'pt' ? 'Oficial' : 'Official'}</option>
                  <option value="community">{language === 'pt' ? 'Comunitário' : 'Community'}</option>
                  <option value="pending">{language === 'pt' ? 'Pendente' : 'Pending'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Região' : 'Region'}
                </label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">{language === 'pt' ? 'Todas as regiões' : 'All regions'}</option>
                  {regions.map((region) => (
                    <option key={region} value={region} className="capitalize">
                      {region.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Exibindo' : 'Showing'} {filteredUniversities.length} {language === 'pt' ? 'de' : 'of'} {UNIVERSITY_PARTNERSHIPS.length} {language === 'pt' ? 'universidades' : 'universities'}
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredUniversities.map((university) => (
            <UniversityCard
              key={university.id}
              university={university}
              isSelected={selectedUniversity === university.id}
              onClick={() => setSelectedUniversity(selectedUniversity === university.id ? '' : university.id)}
            />
          ))}
        </div>

        {/* Selected University Detail */}
        <AnimatePresence>
          {selectedUni && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-8"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{selectedUni.name}</h3>
                    <p className="text-white/80 mb-4">{language === 'pt' ? selectedUni.namePortuguese : selectedUni.name}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {selectedUni.address.city}
                      </div>
                      <div className="flex items-center">
                        <CheckBadgeIcon className="w-4 h-4 mr-1" />
                        {selectedUni.partnershipLevel} partner
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        Since {new Date(selectedUni.partnershipStartDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0">
                    <Link
                      href={`/students/university-partnerships?university=${selectedUni.id}`}
                      className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                    >
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                      <LinkIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Informações de Contacto' : 'Contact Information'}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="bg-primary-100 p-3 rounded-full">
                          <AcademicCapIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{selectedUni.contact.name}</h5>
                          <p className="text-gray-600 mb-2">{selectedUni.contact.title}</p>
                          <p className="text-sm text-gray-500 mb-3">{selectedUni.contact.department}</p>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <EnvelopeIcon className="w-4 h-4 mr-2" />
                              <a href={`mailto:${selectedUni.contact.email}`} className="hover:text-primary-600">
                                {selectedUni.contact.email}
                              </a>
                            </div>
                            {selectedUni.contact.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <PhoneIcon className="w-4 h-4 mr-2" />
                                <a href={`tel:${selectedUni.contact.phone}`} className="hover:text-primary-600">
                                  {selectedUni.contact.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Programs & Services */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Programas e Serviços' : 'Programs & Services'}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckBadgeIconSolid className={`w-5 h-5 ${selectedUni.hasPortugueseProgram ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={selectedUni.hasPortugueseProgram ? 'text-gray-700' : 'text-gray-400'}>
                          {language === 'pt' ? 'Programa de Estudos Portugueses' : 'Portuguese Studies Program'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <CheckBadgeIconSolid className={`w-5 h-5 ${selectedUni.portugalStudyAbroad ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={selectedUni.portugalStudyAbroad ? 'text-gray-700' : 'text-gray-400'}>
                          {language === 'pt' ? 'Programa Erasmus em Portugal' : 'Portugal Study Abroad'}
                        </span>
                      </div>

                      {Object.entries(selectedUni.studentServices).map(([service, available]) => (
                        <div key={service} className="flex items-center space-x-3">
                          <CheckBadgeIconSolid className={`w-5 h-5 ${available ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={available ? 'text-gray-700' : 'text-gray-400'}>
                            {service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cultural Programs */}
                {selectedUni.culturalPrograms.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Programas Culturais' : 'Cultural Programs'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedUni.culturalPrograms.map((program, index) => (
                        <div key={index} className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <GlobeEuropeAfricaIcon className="w-5 h-5 text-primary-600 mr-2" />
                            <span className="font-medium text-gray-900">{program}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' 
              ? 'Pronto para se juntar à rede?' 
              : 'Ready to join the network?'}
          </h3>
          
          <p className="text-lg mb-8 opacity-90">
            {language === 'pt' 
              ? 'Registe-se como estudante e comece a aproveitar todos os benefícios das nossas parcerias universitárias'
              : 'Register as a student and start enjoying all the benefits of our university partnerships'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/students/onboarding"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              {language === 'pt' ? 'Registar como Estudante' : 'Register as Student'}
            </Link>
            
            <Link
              href="/students/university-partnerships"
              className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              {language === 'pt' ? 'Explorar Benefícios' : 'Explore Benefits'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}