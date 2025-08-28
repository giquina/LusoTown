'use client'

import React from 'react'
import { AcademicCapIcon, UserGroupIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import Carousel from '@/components/ui/Carousel'

export interface UniversityPartnership {
  id: string
  name: string
  shortName: string
  location: string
  city: string
  region: string
  logo: string
  image: string
  description: string
  portugalStudents: number
  totalLusophoneStudents: number
  partnershipSince: string
  services: string[]
  contactPerson: string
  contactEmail: string
  contactPhone: string
  website: string
  specialPrograms: string[]
  supportServices: string[]
  culturalEvents: number
  ranking: {
    uk: number
    global: number
  }
  featuredSupport: string
  partnershipLevel: 'platinum' | 'gold' | 'silver' | 'bronze'
  verified: boolean
}

interface UniversityPartnershipsCarouselProps {
  universities?: UniversityPartnership[]
  title?: string
  subtitle?: string
  onUniversityClick?: (university: UniversityPartnership) => void
  className?: string
  autoPlay?: boolean
}

// Default UK university partnerships data
const DEFAULT_UNIVERSITIES: UniversityPartnership[] = [
  {
    id: 'ucl',
    name: 'University College London',
    shortName: 'UCL',
    location: 'Bloomsbury, Londres',
    city: 'London',
    region: 'Londres',
    logo: '/images/universities/ucl-logo.png',
    image: '/images/universities/ucl-campus.jpg',
    description: 'UCL acolhe uma das maiores comunidades portuguesas de Londres, oferecendo suporte especializado em português e eventos culturais regulares.',
    portugalStudents: 320,
    totalLusophoneStudents: 450,
    partnershipSince: '2019',
    services: ['Orientação em Português', 'Suporte Académico', 'Eventos Culturais', 'Network Profissional'],
    contactPerson: 'Dr. Maria Santos',
    contactEmail: 'portuguese.support@ucl.ac.uk',
    contactPhone: '+44 20 7679 2000',
    website: 'https://ucl.ac.uk/portuguese-community',
    specialPrograms: ['Programa de Mentoria Lusófona', 'Intercâmbio Portugal-UCL', 'Investigação Colaborativa'],
    supportServices: ['Apoio Psicológico em Português', 'Orientação de Carreira', 'Suporte Financeiro'],
    culturalEvents: 24,
    ranking: { uk: 3, global: 8 },
    featuredSupport: 'Centro de Apoio Lusófono dedicado',
    partnershipLevel: 'platinum',
    verified: true
  },
  {
    id: 'kings-college',
    name: 'King\'s College London',
    shortName: 'KCL',
    location: 'Strand, Londres',
    city: 'London',
    region: 'Londres',
    logo: '/images/universities/kcl-logo.png',
    image: '/images/universities/kcl-campus.jpg',
    description: 'King\'s College oferece programas especializados para estudantes portugueses, incluindo suporte linguístico e integração cultural.',
    portugalStudents: 280,
    totalLusophoneStudents: 390,
    partnershipSince: '2020',
    services: ['Tutoria em Português', 'Workshops Culturais', 'Networking Empresarial', 'Suporte Académico'],
    contactPerson: 'Prof. João Rodrigues',
    contactEmail: 'lusophone.support@kcl.ac.uk',
    contactPhone: '+44 20 7836 5454',
    website: 'https://kcl.ac.uk/portuguese-students',
    specialPrograms: ['Programa Erasmus+ Portugal', 'Estágios em Empresas Portuguesas', 'Investigação Luso-Britânica'],
    supportServices: ['Consultoria Académica', 'Apoio à Integração', 'Serviços de Tradução'],
    culturalEvents: 18,
    ranking: { uk: 7, global: 35 },
    featuredSupport: 'Sociedade Académica Portuguesa ativa',
    partnershipLevel: 'gold',
    verified: true
  },
  {
    id: 'imperial-college',
    name: 'Imperial College London',
    shortName: 'Imperial',
    location: 'South Kensington, Londres',
    city: 'London',
    region: 'Londres',
    logo: '/images/universities/imperial-logo.png',
    image: '/images/universities/imperial-campus.jpg',
    description: 'Imperial College destaca-se no apoio a estudantes portugueses em STEM, com programas específicos e parcerias industriais.',
    portugalStudents: 180,
    totalLusophoneStudents: 220,
    partnershipSince: '2018',
    services: ['Mentoria STEM em Português', 'Parcerias Industriais', 'Investigação Colaborativa', 'Career Services'],
    contactPerson: 'Dr. Ana Silva',
    contactEmail: 'portuguese.stem@imperial.ac.uk',
    contactPhone: '+44 20 7589 5111',
    website: 'https://imperial.ac.uk/portuguese-community',
    specialPrograms: ['Portugal Innovation Hub', 'Programa de Estágios Tech', 'Investigação Portugal-UK'],
    supportServices: ['Suporte Técnico em Português', 'Orientação de Carreira STEM', 'Network Alumni'],
    culturalEvents: 12,
    ranking: { uk: 2, global: 6 },
    featuredSupport: 'Incubadora de startups luso-britânicas',
    partnershipLevel: 'gold',
    verified: true
  },
  {
    id: 'lse',
    name: 'London School of Economics',
    shortName: 'LSE',
    location: 'Holborn, Londres',
    city: 'London',
    region: 'Londres',
    logo: '/images/universities/lse-logo.png',
    image: '/images/universities/lse-campus.jpg',
    description: 'LSE oferece suporte especializado para estudantes portugueses em economia, ciências sociais e políticas públicas.',
    portugalStudents: 95,
    totalLusophoneStudents: 140,
    partnershipSince: '2021',
    services: ['Workshops em Português', 'Networking Político', 'Suporte Académico', 'Events Partnership'],
    contactPerson: 'Prof. Carlos Mendes',
    contactEmail: 'lusophone.affairs@lse.ac.uk',
    contactPhone: '+44 20 7405 7686',
    website: 'https://lse.ac.uk/portuguese-students',
    specialPrograms: ['Portugal Policy Forum', 'Programa Erasmus+', 'Investigação Socioeconómica'],
    supportServices: ['Consultoria em Políticas Públicas', 'Apoio à Investigação', 'Network Profissional'],
    culturalEvents: 8,
    ranking: { uk: 4, global: 2 },
    featuredSupport: 'Centro de Estudos Luso-Britânicos',
    partnershipLevel: 'silver',
    verified: true
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    location: 'Oxford',
    city: 'Oxford',
    region: 'Oxfordshire',
    logo: '/images/universities/oxford-logo.png',
    image: '/images/universities/oxford-campus.jpg',
    description: 'Oxford mantém tradições centenárias de intercâmbio com Portugal, oferecendo bolsas e programas especializados.',
    portugalStudents: 65,
    totalLusophoneStudents: 85,
    partnershipSince: '2017',
    services: ['Programa de Bolsas', 'Mentoria Senior', 'Investigação Avançada', 'Cultural Exchange'],
    contactPerson: 'Prof. Isabel Tavares',
    contactEmail: 'portuguese.relations@ox.ac.uk',
    contactPhone: '+44 1865 270000',
    website: 'https://ox.ac.uk/lusophone-community',
    specialPrograms: ['Rhodes Scholarship Portugal', 'Oxford-Portugal Research Initiative', 'Summer Schools'],
    supportServices: ['Tutoria Personalizada', 'Suporte de Investigação', 'Network Alumni Global'],
    culturalEvents: 6,
    ranking: { uk: 1, global: 1 },
    featuredSupport: 'Colégio Português histórico',
    partnershipLevel: 'platinum',
    verified: true
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    location: 'Cambridge',
    city: 'Cambridge',
    region: 'Cambridgeshire',
    logo: '/images/universities/cambridge-logo.png',
    image: '/images/universities/cambridge-campus.jpg',
    description: 'Cambridge oferece programas de excelência para estudantes portugueses, com foco em investigação e inovação.',
    portugalStudents: 55,
    totalLusophoneStudents: 70,
    partnershipSince: '2016',
    services: ['Research Support', 'Academic Mentoring', 'Cultural Programs', 'Innovation Hub'],
    contactPerson: 'Dr. Pedro Costa',
    contactEmail: 'portuguese.office@cam.ac.uk',
    contactPhone: '+44 1223 337733',
    website: 'https://cam.ac.uk/portuguese-community',
    specialPrograms: ['Cambridge-Portugal Partnership', 'Programa de Doutoramento', 'Technology Transfer'],
    supportServices: ['Apoio à Investigação', 'Mentoria Doutoral', 'Networking Científico'],
    culturalEvents: 5,
    ranking: { uk: 2, global: 3 },
    featuredSupport: 'Centro de Inovação Portugal-Cambridge',
    partnershipLevel: 'platinum',
    verified: true
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    shortName: 'Manchester',
    location: 'Manchester',
    city: 'Manchester',
    region: 'Greater Manchester',
    logo: '/images/universities/manchester-logo.png',
    image: '/images/universities/manchester-campus.jpg',
    description: 'Manchester acolhe uma vibrante comunidade portuguesa no Norte de Inglaterra, com suporte abrangente aos estudantes.',
    portugalStudents: 145,
    totalLusophoneStudents: 210,
    partnershipSince: '2019',
    services: ['Suporte Comunitário', 'Eventos Culturais', 'Career Guidance', 'Academic Support'],
    contactPerson: 'Dr. Rita Ferreira',
    contactEmail: 'portuguese.community@manchester.ac.uk',
    contactPhone: '+44 161 306 6000',
    website: 'https://manchester.ac.uk/portuguese-students',
    specialPrograms: ['Programa Norte de Inglaterra', 'Intercâmbio Industrial', 'Cultural Bridge Program'],
    supportServices: ['Apoio à Integração Norte', 'Networking Regional', 'Suporte Académico'],
    culturalEvents: 15,
    ranking: { uk: 6, global: 27 },
    featuredSupport: 'Hub Português do Norte de Inglaterra',
    partnershipLevel: 'gold',
    verified: true
  },
  {
    id: 'edinburgh',
    name: 'University of Edinburgh',
    shortName: 'Edinburgh',
    location: 'Edinburgh',
    city: 'Edinburgh',
    region: 'Scotland',
    logo: '/images/universities/edinburgh-logo.png',
    image: '/images/universities/edinburgh-campus.jpg',
    description: 'Edinburgh oferece uma experiência única para estudantes portugueses na Escócia, com programas culturais distintivos.',
    portugalStudents: 85,
    totalLusophoneStudents: 115,
    partnershipSince: '2020',
    services: ['Scottish-Portuguese Programs', 'Cultural Integration', 'Academic Support', 'Highland Experience'],
    contactPerson: 'Prof. Miguel Santos',
    contactEmail: 'portuguese.scotland@ed.ac.uk',
    contactPhone: '+44 131 650 1000',
    website: 'https://ed.ac.uk/portuguese-community',
    specialPrograms: ['Scotland-Portugal Exchange', 'Highland Cultural Program', 'Research Partnerships'],
    supportServices: ['Integração Cultural Escocesa', 'Suporte Académico', 'Network Alumni Scotland'],
    culturalEvents: 10,
    ranking: { uk: 5, global: 16 },
    featuredSupport: 'Centro Cultural Luso-Escocês',
    partnershipLevel: 'silver',
    verified: true
  }
]

export default function UniversityPartnershipsCarousel({
  universities = DEFAULT_UNIVERSITIES,
  title,
  subtitle,
  onUniversityClick,
  className = '',
  autoPlay = true
}: UniversityPartnershipsCarouselProps) {
  const { language } = useLanguage()

  const getPartnershipBadgeColor = (level: string) => {
    const colors = {
      platinum: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white',
      gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      silver: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      bronze: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    }
    return colors[level as keyof typeof colors] || colors.bronze
  }

  const getPartnershipLabel = (level: string) => {
    const labels = {
      platinum: { pt: 'Platina', en: 'Platinum' },
      gold: { pt: 'Ouro', en: 'Gold' },
      silver: { pt: 'Prata', en: 'Silver' },
      bronze: { pt: 'Bronze', en: 'Bronze' }
    }
    return labels[level as keyof typeof labels]?.[language as keyof typeof labels.platinum] || level
  }

  const renderUniversityCard = (university: UniversityPartnership, index: number) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full
                 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -6 }}
      style={{ touchAction: 'manipulation', userSelect: 'none' }}
    >
      {/* University Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={university.image}
          alt={university.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* University Logo */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg shadow-md p-2">
          <Image
            src={university.logo}
            alt={`${university.shortName} logo`}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Partnership Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold
                        ${getPartnershipBadgeColor(university.partnershipLevel)}`}>
          {getPartnershipLabel(university.partnershipLevel)}
        </div>
        
        {/* Verified Badge */}
        {university.verified && (
          <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            ✓ {language === 'pt' ? 'Verificado' : 'Verified'}
          </div>
        )}
        
        {/* Rankings */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm 
                       px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
          #{university.ranking.uk} UK • #{university.ranking.global} {language === 'pt' ? 'Mundial' : 'Global'}
        </div>
      </div>

      {/* University Content */}
      <div className="p-5 space-y-4">
        {/* University Name & Location */}
        <div>
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {university.shortName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 text-primary-500" />
            <span>{university.location}</span>
          </div>
        </div>

        {/* Student Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-primary-50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary-700">{university.portugalStudents}</div>
            <div className="text-xs text-primary-600">
              {language === 'pt' ? 'Estudantes Portugueses' : 'Portuguese Students'}
            </div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-3">
            <div className="text-lg font-bold text-green-700">{university.totalLusophoneStudents}</div>
            <div className="text-xs text-green-600">
              {language === 'pt' ? 'Total Lusófonos' : 'Total Lusophone'}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
          {university.description}
        </p>

        {/* Featured Support */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AcademicCapIcon className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">
              {language === 'pt' ? 'Destaque:' : 'Featured:'}
            </span>
          </div>
          <p className="text-xs text-yellow-700">{university.featuredSupport}</p>
        </div>

        {/* Services Preview */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4 text-primary-500" />
            {language === 'pt' ? 'Serviços Principais' : 'Main Services'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {university.services.slice(0, 3).map((service, serviceIndex) => (
              <span
                key={serviceIndex}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border border-blue-200"
              >
                {service}
              </span>
            ))}
            {university.services.length > 3 && (
              <span className="text-xs text-gray-400 self-center">
                +{university.services.length - 3} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        </div>

        {/* Contact & Stats */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          {/* Contact Person */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PhoneIcon className="w-4 h-4 text-primary-500" />
            <span className="font-medium">{university.contactPerson}</span>
          </div>

          {/* Partnership Since & Events */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              {language === 'pt' ? 'Parceria desde' : 'Partnership since'} {university.partnershipSince}
            </span>
            <span>
              {university.culturalEvents} {language === 'pt' ? 'eventos/ano' : 'events/year'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 
                          text-white py-3 px-4 rounded-lg font-medium text-sm
                          hover:from-primary-700 hover:to-secondary-700 transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                style={{ touchAction: 'manipulation', userSelect: 'none' }}>
          {language === 'pt' ? 'Ver Detalhes & Contacto' : 'View Details & Contact'}
        </button>
      </div>
    </motion.div>
  )

  const defaultTitle = language === 'pt' 
    ? 'Parcerias Universitárias no Reino Unido'
    : 'UK University Partnerships'
    
  const defaultSubtitle = language === 'pt'
    ? 'Suporte especializado para estudantes portugueses e lusófonos em 8 universidades prestigiadas do Reino Unido'
    : 'Specialized support for Portuguese and Lusophone students across 8 prestigious UK universities'

  return (
    <div className={className}>
      <Carousel
        items={universities}
        renderItem={renderUniversityCard}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        title={title || defaultTitle}
        subtitle={subtitle || defaultSubtitle}
        showArrows={true}
        showDots={true}
        autoPlay={autoPlay}
        autoPlayDelay={9000}
        gap="1.5rem"
        onItemClick={onUniversityClick}
        ariaLabel={language === 'pt' ? 'Carrossel de parcerias universitárias' : 'University partnerships carousel'}
        className="px-4 md:px-0"
      />
    </div>
  )
}