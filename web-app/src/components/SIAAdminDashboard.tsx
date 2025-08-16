'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  DocumentTextIcon,
  UserIcon,
  PhoneIcon,
  CalendarDaysIcon,
  MapPinIcon,
  TagIcon,
  ChartBarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { SIAComplianceData } from './SIAComplianceQuestionnaire'
import { RiskAssessment } from './RiskAssessmentForm'
import SIABookingConfirmation from './SIABookingConfirmation'
import RiskAssessmentForm from './RiskAssessmentForm'

interface SIABooking {
  id: string
  bookingId: string
  confirmationCode: string
  status: 'pending_review' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  scheduledDate: string
  estimatedDuration: string
  totalPrice: number
  currency: string
  
  // Client Information
  clientName: string
  clientEmail: string
  clientPhone: string
  
  // Service Details
  serviceType: string
  complianceData: SIAComplianceData
  riskAssessment?: RiskAssessment
  
  // Officer Assignment
  assignedOfficer?: {
    name: string
    licenseNumber: string
    rating: number
    specializations: string[]
  }
  
  // Admin Notes
  adminNotes?: string
  lastUpdated: string
  reviewedBy?: string
}

interface SIAAdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data for demonstration
const mockBookings: SIABooking[] = [
  {
    id: 'sia-001',
    bookingId: 'SIA-2025-001',
    confirmationCode: 'LT-SIA-001',
    status: 'pending_review',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    estimatedDuration: '4 hours',
    totalPrice: 300,
    currency: 'GBP',
    clientName: 'João Silva',
    clientEmail: 'joao.silva@email.com',
    clientPhone: '+44 7123 456789',
    serviceType: 'VIP London Experience',
    complianceData: {
      servicePurpose: 'vip-london',
      serviceDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serviceTime: '14:00',
      pickupLocation: 'The Ritz London',
      dropoffLocation: 'Harrods',
      passengerCount: 2,
      knownRisks: true,
      riskDetails: 'High-profile client with media attention',
      threatLevel: 'medium' as const,
      publicEvent: true,
      mediaAttention: true,
      previousIncidents: false,
      medicalRequirements: false,
      accessibilityNeeds: false,
      vipProtocols: true,
      protocolDetails: 'Discrete photography restrictions',
      armedProtection: false,
      thirdPartyAwareness: ['press', 'venue-security'],
      previousSecurityExperience: true,
      experienceDetails: 'Previous experience with close protection in Portugal',
      confidentialityAgreement: true,
      dataProcessingConsent: true,
      emergencyContact: 'Maria Silva',
      emergencyPhone: '+44 7987 654321',
      riskScore: 12
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sia-002',
    bookingId: 'SIA-2025-002',
    confirmationCode: 'LT-SIA-002',
    status: 'approved',
    priority: 'medium',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDuration: '6 hours',
    totalPrice: 450,
    currency: 'GBP',
    clientName: 'Ana Costa',
    clientEmail: 'ana.costa@email.com',
    clientPhone: '+44 7234 567890',
    serviceType: 'Premium Security',
    assignedOfficer: {
      name: 'James Thompson',
      licenseNumber: 'SIA-12345678',
      rating: 4.8,
      specializations: ['VIP Protection', 'Event Security', 'Portuguese Language']
    },
    complianceData: {
      servicePurpose: 'business-meeting',
      serviceDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serviceTime: '09:00',
      pickupLocation: 'London Business Centre',
      dropoffLocation: 'Canary Wharf',
      passengerCount: 1,
      knownRisks: false,
      threatLevel: 'low' as const,
      publicEvent: false,
      mediaAttention: false,
      previousIncidents: false,
      medicalRequirements: false,
      accessibilityNeeds: false,
      vipProtocols: false,
      armedProtection: false,
      thirdPartyAwareness: ['business-partners'],
      previousSecurityExperience: false,
      confidentialityAgreement: true,
      dataProcessingConsent: true,
      emergencyContact: 'Pedro Costa',
      emergencyPhone: '+44 7876 543210',
      riskScore: 6
    },
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    reviewedBy: 'Admin Officer Smith'
  }
]

export default function SIAAdminDashboard({ isOpen, onClose }: SIAAdminDashboardProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [bookings, setBookings] = useState<SIABooking[]>(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<SIABooking | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showRiskAssessment, setShowRiskAssessment] = useState(false)
  const [showBookingDetails, setShowBookingDetails] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'approved':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'rejected':
        return 'text-red-700 bg-red-100 border-red-300'
      case 'in_progress':
        return 'text-blue-700 bg-blue-100 border-blue-300'
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'cancelled':
        return 'text-gray-700 bg-gray-100 border-gray-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskLevelColor = (score: number) => {
    if (score >= 15) return 'text-red-600 bg-red-50 border-red-200'
    if (score >= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getRiskLevelText = (score: number) => {
    if (score >= 15) return isPortuguese ? 'Alto Risco' : 'High Risk'
    if (score >= 10) return isPortuguese ? 'Risco Médio' : 'Medium Risk'
    return isPortuguese ? 'Baixo Risco' : 'Low Risk'
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      pending_review: { en: 'Pending Review', pt: 'Aguardando Revisão' },
      approved: { en: 'Approved', pt: 'Aprovado' },
      rejected: { en: 'Rejected', pt: 'Rejeitado' },
      in_progress: { en: 'In Progress', pt: 'Em Progresso' },
      completed: { en: 'Completed', pt: 'Completo' },
      cancelled: { en: 'Cancelled', pt: 'Cancelado' }
    }
    
    return isPortuguese 
      ? statusMap[status as keyof typeof statusMap]?.pt || status
      : statusMap[status as keyof typeof statusMap]?.en || status
  }

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filterStatus)

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending_review').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    highRisk: bookings.filter(b => b.complianceData.riskScore >= 10).length
  }

  const handleApproveBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'approved' as const, lastUpdated: new Date().toISOString() }
        : booking
    ))
  }

  const handleRejectBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'rejected' as const, lastUpdated: new Date().toISOString() }
        : booking
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ShieldCheckIcon className="w-8 h-8 text-secondary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isPortuguese ? 'Painel Admin SIA' : 'SIA Admin Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? 'Gestão de Reservas de Proteção Próxima' : 'Close Protection Booking Management'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              {isPortuguese ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-secondary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {isPortuguese ? 'Total de Reservas' : 'Total Bookings'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {isPortuguese ? 'Aguardando Revisão' : 'Pending Review'}
                </p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {isPortuguese ? 'Aprovadas' : 'Approved'}
                </p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {isPortuguese ? 'Alto Risco' : 'High Risk'}
                </p>
                <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              {isPortuguese ? 'Filtrar por estado:' : 'Filter by status:'}
            </span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">{isPortuguese ? 'Todos' : 'All'}</option>
              <option value="pending_review">{isPortuguese ? 'Aguardando Revisão' : 'Pending Review'}</option>
              <option value="approved">{isPortuguese ? 'Aprovado' : 'Approved'}</option>
              <option value="rejected">{isPortuguese ? 'Rejeitado' : 'Rejected'}</option>
              <option value="in_progress">{isPortuguese ? 'Em Progresso' : 'In Progress'}</option>
              <option value="completed">{isPortuguese ? 'Completo' : 'Completed'}</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {isPortuguese ? 'Reservas SIA' : 'SIA Bookings'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Reserva' : 'Booking'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Cliente' : 'Client'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Serviço' : 'Service'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Estado' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Risco' : 'Risk'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Prioridade' : 'Priority'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {isPortuguese ? 'Ações' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.bookingId}</div>
                        <div className="text-sm text-gray-500">{booking.confirmationCode}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.clientEmail}</div>
                        <div className="text-sm text-gray-500">{booking.clientPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.serviceType}</div>
                        <div className="text-sm text-gray-500">£{booking.totalPrice}</div>
                        <div className="text-sm text-gray-500">{booking.estimatedDuration}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRiskLevelColor(booking.complianceData.riskScore)}`}>
                        {getRiskLevelText(booking.complianceData.riskScore)} ({booking.complianceData.riskScore})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(booking.priority)}`}>
                        {booking.priority.charAt(0).toUpperCase() + booking.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking)
                          setShowBookingDetails(true)
                        }}
                        className="text-secondary-600 hover:text-secondary-900"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {booking.status === 'pending_review' && (
                        <>
                          <button
                            onClick={() => handleApproveBooking(booking.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectBooking(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <SIABookingConfirmation
          bookingData={{
            bookingId: selectedBooking.bookingId,
            confirmationCode: selectedBooking.confirmationCode,
            status: selectedBooking.status,
            createdAt: selectedBooking.createdAt,
            scheduledDate: selectedBooking.scheduledDate,
            estimatedDuration: selectedBooking.estimatedDuration,
            totalPrice: selectedBooking.totalPrice,
            currency: selectedBooking.currency,
            serviceType: selectedBooking.serviceType,
            complianceData: selectedBooking.complianceData,
            riskAssessment: selectedBooking.riskAssessment,
            assignedOfficer: selectedBooking.assignedOfficer,
            emergencyContact: selectedBooking.complianceData.emergencyContact,
            supportPhone: '+44 20 7123 4567',
            specialInstructions: selectedBooking.adminNotes,
            reviewNotes: selectedBooking.adminNotes,
            conditions: selectedBooking.complianceData.armedProtection ? 
              ['Armed protection requires additional permits', 'Enhanced security protocols apply'] : 
              undefined
          }}
          isOpen={showBookingDetails}
          onClose={() => {
            setShowBookingDetails(false)
            setSelectedBooking(null)
          }}
        />
      )}

      {/* Risk Assessment Modal */}
      {showRiskAssessment && selectedBooking && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-6xl">
              <RiskAssessmentForm
                complianceData={selectedBooking.complianceData}
                onComplete={(assessment) => {
                  // Handle risk assessment completion
                  setBookings(prev => prev.map(booking => 
                    booking.id === selectedBooking.id 
                      ? { ...booking, riskAssessment: assessment, lastUpdated: new Date().toISOString() }
                      : booking
                  ))
                  setShowRiskAssessment(false)
                  setSelectedBooking(null)
                }}
                onCancel={() => {
                  setShowRiskAssessment(false)
                  setSelectedBooking(null)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}