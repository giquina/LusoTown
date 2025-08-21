'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  DocumentTextIcon,
  HeartIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  GlobeEuropeAfricaIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import {
  AcademicCapIcon as AcademicCapIconSolid,
  StarIcon as StarIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid
} from '@heroicons/react/24/solid'
import Link from 'next/link'

interface StudentSupportSectionProps {
  onStudentVerificationClick?: () => void
}

// Mock data for statistics
const studentStats = {
  totalStudents: 2150,
  universities: 8,
  cities: 12,
  successRate: 94
}

// Mock testimonials
const testimonials = [
  {
    id: 1,
    nameKey: 'students.testimonials.student1.name',
    universityKey: 'students.testimonials.student1.university',
    quoteKey: 'students.testimonials.student1.quote',
    avatar: '/images/students/ana-silva.jpg',
    rating: 5
  },
  {
    id: 2,
    nameKey: 'students.testimonials.student2.name',
    universityKey: 'students.testimonials.student2.university',
    quoteKey: 'students.testimonials.student2.quote',
    avatar: '/images/students/miguel-santos.jpg',
    rating: 5
  },
  {
    id: 3,
    nameKey: 'students.testimonials.student3.name',
    universityKey: 'students.testimonials.student3.university',
    quoteKey: 'students.testimonials.student3.quote',
    avatar: '/images/students/catarina-oliveira.jpg',
    rating: 5
  }
]

// University partnerships mock data
const universityPartnerships = [
  { name: 'London School of Economics', logo: '/images/universities/lse.png', students: 380 },
  { name: 'University College London', logo: '/images/universities/ucl.png', students: 320 },
  { name: 'Imperial College London', logo: '/images/universities/imperial.png', students: 280 },
  { name: 'King\'s College London', logo: '/images/universities/kcl.png', students: 250 },
  { name: 'University of Manchester', logo: '/images/universities/manchester.png', students: 550 },
  { name: 'University of Birmingham', logo: '/images/universities/birmingham.png', students: 420 },
  { name: 'University of Edinburgh', logo: '/images/universities/edinburgh.png', students: 330 },
  { name: 'Heriot-Watt University', logo: '/images/universities/heriot-watt.png', students: 120 }
]

export default function StudentSupportSection({ onStudentVerificationClick }: StudentSupportSectionProps) {
  const { t } = useLanguage()
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const features = [
    {
      icon: <HomeIcon className="w-8 h-8" />,
      titleKey: 'students.features.housing.title',
      descriptionKey: 'students.features.housing.description',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: <BriefcaseIcon className="w-8 h-8" />,
      titleKey: 'students.features.jobs.title',
      descriptionKey: 'students.features.jobs.description',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      titleKey: 'students.features.study_groups.title',
      descriptionKey: 'students.features.study_groups.description',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      titleKey: 'students.features.career.title',
      descriptionKey: 'students.features.career.description',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      icon: <GlobeEuropeAfricaIcon className="w-8 h-8" />,
      titleKey: 'students.features.language.title',
      descriptionKey: 'students.features.language.description',
      color: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      titleKey: 'students.features.support.title',
      descriptionKey: 'students.features.support.description',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    }
  ]

  const cities = [
    {
      nameKey: 'students.cities.london',
      descriptionKey: 'students.cities.london_desc',
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
      students: 850,
      image: '/images/cities/london.jpg'
    },
    {
      nameKey: 'students.cities.manchester',
      descriptionKey: 'students.cities.manchester_desc',
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
      students: 550,
      image: '/images/cities/manchester.jpg'
    },
    {
      nameKey: 'students.cities.birmingham',
      descriptionKey: 'students.cities.birmingham_desc',
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
      students: 420,
      image: '/images/cities/birmingham.jpg'
    },
    {
      nameKey: 'students.cities.edinburgh',
      descriptionKey: 'students.cities.edinburgh_desc',
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
      students: 330,
      image: '/images/cities/edinburgh.jpg'
    }
  ]

  const resources = [
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      titleKey: 'students.resources.visa.title',
      descriptionKey: 'students.resources.visa.description',
      color: 'bg-gradient-to-br from-primary-500 to-primary-600'
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      titleKey: 'students.resources.nhs.title',
      descriptionKey: 'students.resources.nhs.description',
      color: 'bg-gradient-to-br from-secondary-500 to-secondary-600'
    },
    {
      icon: <BanknotesIcon className="w-8 h-8" />,
      titleKey: 'students.resources.banking.title',
      descriptionKey: 'students.resources.banking.description',
      color: 'bg-gradient-to-br from-accent-500 to-accent-600'
    },
    {
      icon: <ClipboardDocumentCheckIcon className="w-8 h-8" />,
      titleKey: 'students.resources.discount.title',
      descriptionKey: 'students.resources.discount.description',
      color: 'bg-gradient-to-br from-premium-500 to-premium-600'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-4 rounded-2xl">
              <AcademicCapIconSolid className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('students.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('students.subtitle')}
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {t('students.stats.title')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {studentStats.totalStudents.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600">
                  {t('students.stats.total_students')}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BuildingOffice2Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {studentStats.universities}
                </div>
                <div className="text-sm text-gray-600">
                  {t('students.stats.universities')}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {studentStats.cities}
                </div>
                <div className="text-sm text-gray-600">
                  {t('students.stats.cities')}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-premium-500 to-premium-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {studentStats.successRate}%
                </div>
                <div className="text-sm text-gray-600">
                  {t('students.stats.success_rate')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('students.features.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('students.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {t(feature.titleKey)}
                </h4>
                <p className="text-gray-600">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('students.cities.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('students.cities.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCity(selectedCity === t(city.nameKey) ? null : t(city.nameKey))}
              >
                <div className="h-32 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-2 mx-auto w-fit">
                      {city.icon}
                    </div>
                    <div className="font-semibold">{t(city.nameKey)}</div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-gray-900">
                      {city.students}+ students
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(city.descriptionKey)}
                  </p>
                  {selectedCity === t(city.nameKey) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <Link
                        href="/students"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Explore Community
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('students.resources.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('students.resources.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${resource.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <div className="text-white">
                    {resource.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {t(resource.titleKey)}
                </h4>
                <p className="text-sm text-gray-600">
                  {t(resource.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('students.testimonials.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('students.testimonials.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIconSolid key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "{t(testimonial.quoteKey)}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold mr-4">
                    {t(testimonial.nameKey).charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t(testimonial.nameKey)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t(testimonial.universityKey)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* University Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('students.partnerships.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('students.partnerships.subtitle')}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {universityPartnerships.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center group"
                >
                  <div className="bg-gray-50 rounded-xl p-6 mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AcademicCapIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      {university.students} students
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 leading-tight">
                    {university.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-fit mx-auto mb-6">
                <CheckBadgeIconSolid className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                {t('students.cta.title')}
              </h3>
              <p className="text-xl text-white/90 mb-8">
                {t('students.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onStudentVerificationClick}
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <IdentificationIcon className="w-5 h-5 mr-2" />
                  {t('students.cta.verify')}
                </button>
                <Link
                  href="/students"
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-300 flex items-center justify-center"
                >
                  <UsersIcon className="w-5 h-5 mr-2" />
                  {t('students.cta.join')}
                </Link>
              </div>
              <div className="mt-6">
                <Link
                  href="/students"
                  className="text-white/80 hover:text-white text-sm inline-flex items-center"
                >
                  {t('students.cta.learn_more')}
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}