'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  UsersIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon,
  XMarkIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  GlobeEuropeAfricaIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  EyeIcon,
  HeartIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import {
  AcademicCapIcon as AcademicCapIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { UNIVERSITY_PARTNERSHIPS, UNIVERSITY_STATS, getUniversityById } from '@/config/universities'

interface UniversityIntegrationProps {
  selectedUniversityId?: string
  showVerification?: boolean
  onVerificationComplete?: (universityId: string) => void
}

interface UniversityEvent {
  id: string
  title: string
  type: 'cultural' | 'academic' | 'social' | 'career'
  date: string
  time: string
  location: string
  description: string
  capacity: number
  registered: number
  portugueseRelevance: boolean
  organizer: string
}

interface StudyGroup {
  id: string
  subject: string
  university: string
  level: string
  language: 'pt' | 'en' | 'both'
  members: number
  maxMembers: number
  meetingSchedule: string
  description: string
}

interface PartnershipBenefit {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'academic' | 'cultural' | 'financial' | 'social'
  verified: boolean
  portugueseFocus: boolean
}

export default function UniversityIntegration({ 
  selectedUniversityId, 
  showVerification = false,
  onVerificationComplete 
}: UniversityIntegrationProps) {
  const { t } = useLanguage()
  const [selectedUniversity, setSelectedUniversity] = useState(selectedUniversityId || '')
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'groups' | 'benefits' | 'societies'>('overview')
  const [showVerificationModal, setShowVerificationModal] = useState(showVerification)
  const [verificationStep, setVerificationStep] = useState(1)
  const [studentEmail, setStudentEmail] = useState('')
  const [studentId, setStudentId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'rejected' | null>(null)

  const university = selectedUniversity ? getUniversityById(selectedUniversity) : null

  // Mock data for Portuguese society events
  const portugueseSocietyEvents: UniversityEvent[] = [
    {
      id: '1',
      title: 'Festa de São João Celebration',
      type: 'cultural',
      date: '2024-06-24',
      time: '19:00',
      location: 'Student Union Hall',
      description: 'Traditional Portuguese Midsummer festival with music, dancing, and Portuguese food',
      capacity: 150,
      registered: 89,
      portugueseRelevance: true,
      organizer: 'Portuguese Society'
    },
    {
      id: '2',
      title: 'Portuguese Career Networking Evening',
      type: 'career',
      date: '2024-09-15',
      time: '18:30',
      location: 'Business School',
      description: 'Connect with Portuguese professionals and alumni in London',
      capacity: 80,
      registered: 42,
      portugueseRelevance: true,
      organizer: 'Portuguese Alumni Network'
    },
    {
      id: '3',
      title: 'Lusophone Literature Study Circle',
      type: 'academic',
      date: '2024-09-10',
      time: '16:00',
      location: 'Library Study Room 3',
      description: 'Monthly discussion of contemporary Portuguese and Brazilian literature',
      capacity: 25,
      registered: 18,
      portugueseRelevance: true,
      organizer: 'Portuguese Studies Department'
    }
  ]

  // Mock study groups
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      subject: 'Portuguese Language Advanced',
      university: selectedUniversity || 'ucl',
      level: 'Advanced',
      language: 'both',
      members: 12,
      maxMembers: 15,
      meetingSchedule: 'Tuesdays 2-4 PM',
      description: 'Advanced Portuguese conversation and academic writing practice'
    },
    {
      id: '2',
      subject: 'Business Studies',
      university: selectedUniversity || 'ucl',
      level: 'Undergraduate',
      language: 'pt',
      members: 8,
      maxMembers: 12,
      meetingSchedule: 'Thursdays 6-8 PM',
      description: 'Study group for Portuguese business students, conducted in Portuguese'
    },
    {
      id: '3',
      subject: 'Economics Research Methods',
      university: selectedUniversity || 'ucl',
      level: 'Postgraduate',
      language: 'en',
      members: 6,
      maxMembers: 10,
      meetingSchedule: 'Wednesdays 4-6 PM',
      description: 'Research methodology support for Portuguese-speaking economics students'
    }
  ]

  // Partnership benefits
  const partnershipBenefits: PartnershipBenefit[] = [
    {
      id: '1',
      title: 'Student Discount Verification',
      description: 'Verified student status for Portuguese community events and services',
      icon: <BanknotesIcon className="w-6 h-6" />,
      category: 'financial',
      verified: true,
      portugueseFocus: true
    },
    {
      id: '2',
      title: 'Portuguese Academic Support',
      description: 'Tutoring and mentorship from Portuguese-speaking senior students',
      icon: <BookOpenIcon className="w-6 h-6" />,
      category: 'academic',
      verified: true,
      portugueseFocus: true
    },
    {
      id: '3',
      title: 'Cultural Event Integration',
      description: 'Seamless booking for Portuguese cultural events and festivals',
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      category: 'cultural',
      verified: true,
      portugueseFocus: true
    },
    {
      id: '4',
      title: 'Professional Network Access',
      description: 'Connect with Portuguese professionals and alumni networks',
      icon: <UserGroupIcon className="w-6 h-6" />,
      category: 'social',
      verified: true,
      portugueseFocus: true
    }
  ]

  const handleStudentVerification = async () => {
    if (!university || !studentEmail || !studentId) return
    
    setIsVerifying(true)
    
    try {
      const response = await fetch('/api/universities/verify-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityId: university.id,
          email: studentEmail,
          studentId: studentId
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setVerificationStatus('verified')
        setTimeout(() => {
          setShowVerificationModal(false)
          onVerificationComplete?.(university.id)
        }, 2000)
      } else {
        setVerificationStatus('rejected')
      }
    } catch (error) {
      console.error('Verification failed:', error)
      setVerificationStatus('rejected')
    } finally {
      setIsVerifying(false)
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* University Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {university?.portugueseStudents.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Portuguese Students</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 p-3 rounded-lg">
              <FlagIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {university?.brazilianStudents.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Brazilian Students</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-3 rounded-lg">
              <CheckBadgeIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {university?.lusoTownMembers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">LusoTown Members</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-premium-500 to-premium-600 p-3 rounded-lg">
              <StarIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {university?.partnershipLevel === 'strategic' ? '★★★' : 
             university?.partnershipLevel === 'official' ? '★★' : '★'}
          </div>
          <div className="text-sm text-gray-600 capitalize">{university?.partnershipLevel} Partner</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Portuguese Studies Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-full">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{university?.contact.name}</h4>
                <p className="text-gray-600 mb-1">{university?.contact.title}</p>
                <p className="text-gray-600 text-sm mb-3">{university?.contact.department}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    <a href={`mailto:${university?.contact.email}`} className="hover:text-primary-600">
                      {university?.contact.email}
                    </a>
                  </div>
                  {university?.contact.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      <a href={`tel:${university?.contact.phone}`} className="hover:text-primary-600">
                        {university?.contact.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h5 className="font-medium text-gray-900 mb-3">Academic Programs</h5>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" />
                <span className={university?.hasPortugueseProgram ? 'text-gray-700' : 'text-gray-400'}>
                  Portuguese Studies Program
                </span>
              </div>
              <div className="flex items-center text-sm">
                <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" />
                <span className={university?.portugalStudyAbroad ? 'text-gray-700' : 'text-gray-400'}>
                  Portugal Study Abroad
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Programs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Cultural Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {university?.culturalPrograms.map((program, index) => (
            <div key={index} className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <GlobeEuropeAfricaIcon className="w-5 h-5 text-primary-600 mr-2" />
                <span className="font-medium text-gray-900">{program}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      {portugueseSocietyEvents.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                  event.type === 'cultural' ? 'bg-primary-100 text-primary-800' :
                  event.type === 'academic' ? 'bg-secondary-100 text-secondary-800' :
                  event.type === 'career' ? 'bg-accent-100 text-accent-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type}
                </span>
                {event.portugueseRelevance && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-premium-100 text-premium-800">
                    <FlagIcon className="w-3 h-3 mr-1" />
                    Portuguese Focus
                  </span>
                )}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <div className="text-right mb-3">
                <div className="text-sm text-gray-500">
                  {event.registered}/{event.capacity} registered
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                Join Event
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderStudyGroups = () => (
    <div className="space-y-6">
      {studyGroups.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <BookOpenIcon className="w-6 h-6 text-primary-600 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900">{group.subject}</h4>
                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                  group.language === 'pt' ? 'bg-primary-100 text-primary-800' :
                  group.language === 'en' ? 'bg-secondary-100 text-secondary-800' :
                  'bg-accent-100 text-accent-800'
                }`}>
                  {group.language === 'pt' ? 'Português' : group.language === 'en' ? 'English' : 'Bilingual'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6">
                <div className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-1" />
                  {group.members}/{group.maxMembers} members
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {group.meetingSchedule}
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="w-4 h-4 mr-1" />
                  {group.level}
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                Join Group
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderBenefits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {partnershipBenefits.map((benefit) => (
        <motion.div
          key={benefit.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              benefit.category === 'academic' ? 'bg-primary-100 text-primary-600' :
              benefit.category === 'cultural' ? 'bg-secondary-100 text-secondary-600' :
              benefit.category === 'financial' ? 'bg-accent-100 text-accent-600' :
              'bg-premium-100 text-premium-600'
            }`}>
              {benefit.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{benefit.title}</h4>
                {benefit.verified && (
                  <CheckBadgeIconSolid className="w-5 h-5 text-green-500 ml-2" />
                )}
                {benefit.portugueseFocus && (
                  <FlagIcon className="w-4 h-4 text-primary-600 ml-2" />
                )}
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 p-1 rounded-full mb-6"
        >
          <div className="bg-white rounded-full p-3">
            <AcademicCapIconSolid className="w-8 h-8 text-primary-600" />
          </div>
        </motion.div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          University Partnerships
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with Portuguese-speaking communities across {UNIVERSITY_STATS.totalPartnerships} partner universities in the UK
        </p>
      </div>

      {/* University Selector */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your University</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNIVERSITY_PARTNERSHIPS.map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUniversity(uni.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  selectedUniversity === uni.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <AcademicCapIcon className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-900 text-sm">{uni.shortName}</span>
                </div>
                <div className="text-xs text-gray-600 mb-1">{uni.name}</div>
                <div className="text-xs text-primary-600">{uni.portugueseStudents} Portuguese students</div>
              </button>
            ))}
          </div>
          {!selectedUniversity && (
            <div className="mt-4 text-center text-gray-500">
              Select a university to view partnership details and benefits
            </div>
          )}
        </div>
      </div>

      {/* University Details */}
      {university && (
        <>
          {/* University Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 mb-8 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mr-4">
                    <BuildingOffice2Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold">{university.name}</h2>
                    <p className="text-white/80">{university.namePortuguese}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {university.address.city}
                  </div>
                  <div className="flex items-center">
                    <CheckBadgeIcon className="w-4 h-4 mr-1" />
                    {university.partnershipLevel} partner
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {(university.portugueseStudents + university.brazilianStudents).toLocaleString()} Lusophone students
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <button
                  onClick={() => setShowVerificationModal(true)}
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center"
                >
                  <CheckBadgeIcon className="w-5 h-5 mr-2" />
                  Verify Student Status
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="flex flex-wrap border-b border-gray-200">
              {[
                { key: 'overview', label: 'Overview', icon: <EyeIcon className="w-5 h-5" /> },
                { key: 'events', label: 'Portuguese Events', icon: <CalendarDaysIcon className="w-5 h-5" /> },
                { key: 'groups', label: 'Study Groups', icon: <UserGroupIcon className="w-5 h-5" /> },
                { key: 'benefits', label: 'Benefits', icon: <HeartIcon className="w-5 h-5" /> },
                { key: 'societies', label: 'Portuguese Society', icon: <FlagIcon className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center px-6 py-4 font-medium transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="mr-2">{tab.icon}</div>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-8">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'events' && renderEvents()}
              {activeTab === 'groups' && renderStudyGroups()}
              {activeTab === 'benefits' && renderBenefits()}
              {activeTab === 'societies' && (
                <div className="text-center py-12">
                  <FlagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Portuguese Society Integration</h3>
                  <p className="text-gray-600 mb-6">Connect directly with your university's Portuguese society</p>
                  <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Contact Portuguese Society
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Student Verification Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Verify Student Status</h3>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {verificationStatus === 'verified' ? (
                <div className="text-center">
                  <CheckBadgeIconSolid className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Verification Successful!</h4>
                  <p className="text-gray-600">Your student status has been verified. You now have access to all university partnership benefits.</p>
                </div>
              ) : verificationStatus === 'rejected' ? (
                <div className="text-center">
                  <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Verification Failed</h4>
                  <p className="text-gray-600 mb-6">We couldn't verify your student status. Please check your information and try again.</p>
                  <button
                    onClick={() => {
                      setVerificationStatus(null)
                      setVerificationStep(1)
                    }}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Email Address
                    </label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder={`your.name@${university?.id === 'ucl' ? 'ucl.ac.uk' : university?.id === 'lse' ? 'lse.ac.uk' : 'university.ac.uk'}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID Number
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Enter your student ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleStudentVerification}
                      disabled={!studentEmail || !studentId || isVerifying}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Student Status'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Your information is secure and will only be used for verification purposes.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}