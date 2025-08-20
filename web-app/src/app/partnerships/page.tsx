'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { partnershipsService, PartnershipOrganization, PartnershipBenefit, OrganizationType, PartnershipLevel } from '@/lib/partnerships'
import { 
  BuildingOffice2Icon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  HeartIcon,
  CheckBadgeIcon,
  FlagIcon,
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  CurrencyPoundIcon,
  LinkIcon
} from '@heroicons/react/24/outline'

interface PartnershipCardProps {
  partnership: PartnershipOrganization
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ partnership }) => {
  const { language } = useLanguage()

  const getTypeIcon = (type: OrganizationType) => {
    const icons = {
      embassy: <FlagIcon className="w-5 h-5" />,
      consulate: <FlagIcon className="w-5 h-5" />,
      cultural_center: <AcademicCapIcon className="w-5 h-5" />,
      chamber_commerce: <BuildingOffice2Icon className="w-5 h-5" />,
      educational_institution: <AcademicCapIcon className="w-5 h-5" />,
      religious_organization: <HeartIcon className="w-5 h-5" />,
      community_association: <UsersIcon className="w-5 h-5" />,
      charity: <HeartIcon className="w-5 h-5" />,
      media_organization: <GlobeAltIcon className="w-5 h-5" />,
      sports_club: <TrophyIcon className="w-5 h-5" />,
      business_association: <BuildingOffice2Icon className="w-5 h-5" />
    }
    return icons[type] || <BuildingOffice2Icon className="w-5 h-5" />
  }

  const getTypeLabel = (type: OrganizationType) => {
    const labels = {
      embassy: { en: 'Embassy', pt: 'Embaixada' },
      consulate: { en: 'Consulate', pt: 'Consulado' },
      cultural_center: { en: 'Cultural Center', pt: 'Centro Cultural' },
      chamber_commerce: { en: 'Chamber of Commerce', pt: 'Câmara de Comércio' },
      educational_institution: { en: 'Educational Institution', pt: 'Instituição Educacional' },
      religious_organization: { en: 'Religious Organization', pt: 'Organização Religiosa' },
      community_association: { en: 'Community Association', pt: 'Associação Comunitária' },
      charity: { en: 'Charity', pt: 'Caridade' },
      media_organization: { en: 'Media Organization', pt: 'Organização de Mídia' },
      sports_club: { en: 'Sports Club', pt: 'Clube Desportivo' },
      business_association: { en: 'Business Association', pt: 'Associação Empresarial' }
    }
    return labels[type]?.[language] || type
  }

  const getLevelBadge = (level: PartnershipLevel) => {
    const badges = {
      founding_partner: { label: language === 'pt' ? 'Parceiro Fundador' : 'Founding Partner', color: 'bg-accent-500' },
      strategic_partner: { label: language === 'pt' ? 'Parceiro Estratégico' : 'Strategic Partner', color: 'bg-primary-500' },
      official_partner: { label: language === 'pt' ? 'Parceiro Oficial' : 'Official Partner', color: 'bg-secondary-500' },
      community_partner: { label: language === 'pt' ? 'Parceiro Comunitário' : 'Community Partner', color: 'bg-premium-500' },
      supporting_partner: { label: language === 'pt' ? 'Parceiro Apoiante' : 'Supporting Partner', color: 'bg-gray-500' }
    }
    return badges[level] || badges.supporting_partner
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header with Partnership Level */}
      <div className={`${getLevelBadge(partnership.partnershipLevel).color} text-white px-6 py-3`}>
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{getLevelBadge(partnership.partnershipLevel).label}</span>
          {partnership.officialStatus && (
            <CheckBadgeIcon className="w-5 h-5" />
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Organization Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
              {language === 'pt' ? partnership.namePortuguese : partnership.name}
            </h3>
            <div className="flex items-center gap-2 text-primary-500">
              {getTypeIcon(partnership.type)}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {getTypeLabel(partnership.type)}
            </span>
            <span>•</span>
            <span>{partnership.yearsActive} {language === 'pt' ? 'anos ativo' : 'years active'}</span>
            {partnership.governmentRecognized && (
              <>
                <span>•</span>
                <span className="text-green-600 font-medium">
                  {language === 'pt' ? 'Reconhecido pelo Governo' : 'Government Recognized'}
                </span>
              </>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {language === 'pt' ? partnership.descriptionPortuguese : partnership.description}
        </p>
        
        {/* Community Impact */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary-600">{partnership.communitySize.toLocaleString()}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Membros' : 'Members'}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-secondary-600">{partnership.programs.length}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Programas' : 'Programs'}</div>
          </div>
        </div>
        
        {/* Services Offered */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4" />
            {language === 'pt' ? 'Serviços' : 'Services'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {partnership.servicesOffered.slice(0, 3).map(service => (
              <span
                key={service}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {partnership.servicesOffered.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                +{partnership.servicesOffered.length - 3} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        {partnership.upcomingEvents.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              {language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
            </h4>
            <div className="space-y-2">
              {partnership.upcomingEvents.slice(0, 2).map(event => (
                <div key={event.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h5 className="font-medium text-green-800 text-sm">
                    {language === 'pt' && event.titlePortuguese ? event.titlePortuguese : event.title}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
                    <CalendarDaysIcon className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                    {event.price > 0 && (
                      <>
                        <span>•</span>
                        <span>£{event.price}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contact Information */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{partnership.address}, {partnership.postcode}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <PhoneIcon className="w-4 h-4 flex-shrink-0" />
            <span>{partnership.phone}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{partnership.email}</span>
          </div>
          
          {partnership.website && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <GlobeAltIcon className="w-4 h-4 flex-shrink-0" />
              <a 
                href={partnership.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline truncate"
              >
                {language === 'pt' ? 'Visitar Website' : 'Visit Website'}
              </a>
            </div>
          )}
        </div>
        
        {/* Contact Person */}
        <div className="mb-4 bg-gray-50 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">
            {language === 'pt' ? 'Contacto Principal' : 'Main Contact'}
          </h4>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{partnership.contactPerson.name}</p>
            <p className="text-gray-600">{partnership.contactPerson.title}</p>
            <p className="text-gray-600">{partnership.contactPerson.email}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
            {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
          </button>
          {partnership.website && (
            <a
              href={partnership.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LinkIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Partnerships() {
  const { language } = useLanguage()
  const [partnerships, setPartnerships] = useState<PartnershipOrganization[]>([])
  const [benefits, setBenefits] = useState<PartnershipBenefit[]>([])
  const [statistics, setStatistics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<OrganizationType | 'all'>('all')

  useEffect(() => {
    loadPartnerships()
    loadBenefits()
    loadStatistics()
  }, [])

  const loadPartnerships = async () => {
    try {
      setLoading(true)
      const allPartnerships = await partnershipsService.getAllPartnerships()
      setPartnerships(allPartnerships)
    } catch (error) {
      console.error('Error loading partnerships:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadBenefits = async () => {
    try {
      const partnershipBenefits = await partnershipsService.getPartnershipBenefits()
      setBenefits(partnershipBenefits)
    } catch (error) {
      console.error('Error loading benefits:', error)
    }
  }

  const loadStatistics = async () => {
    try {
      const stats = await partnershipsService.getPartnershipStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const filteredPartnerships = selectedType === 'all' 
    ? partnerships 
    : partnerships.filter(p => p.type === selectedType)

  const organizationTypes: { value: OrganizationType | 'all'; label: { en: string; pt: string } }[] = [
    { value: 'all', label: { en: 'All Organizations', pt: 'Todas as Organizações' } },
    { value: 'embassy', label: { en: 'Embassies', pt: 'Embaixadas' } },
    { value: 'cultural_center', label: { en: 'Cultural Centers', pt: 'Centros Culturais' } },
    { value: 'chamber_commerce', label: { en: 'Chambers of Commerce', pt: 'Câmaras de Comércio' } },
    { value: 'educational_institution', label: { en: 'Educational', pt: 'Educacional' } },
    { value: 'religious_organization', label: { en: 'Religious', pt: 'Religiosas' } },
    { value: 'community_association', label: { en: 'Community', pt: 'Comunitárias' } }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Nossas Parcerias Oficiais' : 'Our Official Partnerships'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Trabalhamos com organizações oficiais portuguesas para oferecer serviços autênticos e apoio à comunidade lusófona em Londres.'
              : 'We work with official Portuguese organizations to provide authentic services and support for the Portuguese-speaking community in the U.K..'}
          </p>
          
          {/* Partnership Statistics */}
          {statistics && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary-600">{statistics.totalPartnerships}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Parcerias' : 'Partnerships'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-secondary-600">{statistics.officialPartnerships}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Oficiais' : 'Official'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-accent-600">{statistics.totalCommunitySize.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Membros' : 'Members'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-premium-600">{statistics.totalPrograms}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Programas' : 'Programs'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {organizationTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Partnerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPartnerships.map(partnership => (
            <PartnershipCard key={partnership.id} partnership={partnership} />
          ))}
        </div>

        {/* Member Benefits Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'pt' ? 'Benefícios para Membros' : 'Member Benefits'}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {language === 'pt' 
              ? 'Como membro da LusoTown, desfrute de benefícios exclusivos com nossos parceiros oficiais.'
              : 'As a LusoTown member, enjoy exclusive benefits with our official partners.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map(benefit => (
              <div key={benefit.id} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? benefit.titlePortuguese : benefit.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'pt' ? benefit.descriptionPortuguese : benefit.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    benefit.category === 'cultural' ? 'bg-purple-100 text-purple-700' :
                    benefit.category === 'business' ? 'bg-primary-100 text-primary-700' :
                    benefit.category === 'education' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {benefit.category}
                  </span>
                  {benefit.discountAmount && (
                    <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                      {benefit.discountAmount} {language === 'pt' ? 'desconto' : 'off'}
                    </span>
                  )}
                  {benefit.membershipRequired && (
                    <span className="px-2 py-1 bg-premium-100 text-premium-700 rounded-full text-xs font-medium">
                      {language === 'pt' ? 'Membros' : 'Members'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
          <TrophyIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' ? 'Torne-se Nosso Parceiro' : 'Become Our Partner'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {language === 'pt' 
              ? 'É uma organização portuguesa? Junte-se a nós para servir melhor a comunidade lusófona em Londres.'
              : 'Are you a Portuguese organization? Join us in better serving the Portuguese-speaking community in the U.K..'}
          </p>
          <button className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {language === 'pt' ? 'Contactar-nos' : 'Contact Us'}
          </button>
        </div>
      </div>
    </div>
  )
}