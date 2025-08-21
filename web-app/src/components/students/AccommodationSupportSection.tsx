'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  HomeIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  UsersIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { CheckIcon, StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface AccommodationListing {
  id: string
  title: string
  titlePortuguese: string
  type: 'shared_house' | 'student_halls' | 'private_studio' | 'homestay' | 'flat_share'
  location: string
  area: string
  rent: number
  billsIncluded: boolean
  availableFrom: string
  duration: string
  roomType: 'single' | 'double' | 'ensuite' | 'studio'
  housemates: number
  maxHousemates: number
  portugueseSpeaking: boolean
  portugueseOwner: boolean
  description: string
  descriptionPortuguese: string
  amenities: string[]
  nearbyUniversities: string[]
  transportLinks: string[]
  images: string[]
  contactPerson: string
  contactMethod: 'whatsapp' | 'email' | 'phone'
  contactInfo: string
  verified: boolean
  rating: number
  reviews: number
  isPopular: boolean
  isPremium: boolean
}

interface RoommateRequest {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say'
  university: string
  course: string
  yearOfStudy: string
  budget: {
    min: number
    max: number
  }
  preferredAreas: string[]
  lookingFor: 'portuguese_housemates' | 'mixed_international' | 'quiet_studious' | 'social_active'
  languages: string[]
  hobbies: string[]
  lifestyle: ('non_smoker' | 'social_drinker' | 'vegetarian' | 'early_riser' | 'night_owl' | 'gym_enthusiast')[]
  bio: string
  bioPortuguese: string
  availableFrom: string
  contactPreference: 'app_messaging' | 'whatsapp' | 'email'
  verified: boolean
  responseRate: number
  lastActive: string
  avatar?: string
}

interface AccommodationTip {
  id: string
  category: 'legal' | 'financial' | 'practical' | 'cultural' | 'safety'
  title: string
  titlePortuguese: string
  content: string
  contentPortuguese: string
  importance: 'high' | 'medium' | 'low'
  icon: any
}

const ACCOMMODATION_LISTINGS: AccommodationListing[] = [
  {
    id: 'vauxhall-portuguese-house',
    title: 'Portuguese House Share in Vauxhall',
    titlePortuguese: 'Casa Partilhada Portuguesa em Vauxhall',
    type: 'shared_house',
    location: 'Vauxhall, London',
    area: 'Vauxhall',
    rent: 750,
    billsIncluded: true,
    availableFrom: '2024-09-01',
    duration: 'Academic year (9 months)',
    roomType: 'ensuite',
    housemates: 3,
    maxHousemates: 5,
    portugueseSpeaking: true,
    portugueseOwner: true,
    description: 'Beautiful Victorian house in the heart of the Portuguese community. All housemates are Portuguese students. Walking distance to Vauxhall station and Portuguese shops.',
    descriptionPortuguese: 'Linda casa vitoriana no coração da comunidade portuguesa. Todos os colegas de casa são estudantes portugueses. A pé da estação de Vauxhall e lojas portuguesas.',
    amenities: ['Fast WiFi', 'Washing machine', 'Dishwasher', 'Garden', 'Portuguese TV channels', 'Parking space'],
    nearbyUniversities: ['King\'s College London (15 min)', 'LSE (20 min)', 'Imperial College (25 min)'],
    transportLinks: ['Vauxhall Station (3 min walk)', 'Bus routes to central London', 'Cycle to Westminster'],
    images: ['/images/accommodation/vauxhall-house-1.jpg', '/images/accommodation/vauxhall-house-2.jpg'],
    contactPerson: 'Maria Santos',
    contactMethod: 'whatsapp',
    contactInfo: '+44 7700 900123',
    verified: true,
    rating: 4.8,
    reviews: 12,
    isPopular: true,
    isPremium: false
  },
  {
    id: 'ucl-halls-portuguese-floor',
    title: 'UCL Student Halls - Portuguese Student Floor',
    titlePortuguese: 'Residência UCL - Andar de Estudantes Portugueses',
    type: 'student_halls',
    location: 'Bloomsbury, London',
    area: 'Bloomsbury',
    rent: 950,
    billsIncluded: true,
    availableFrom: '2024-09-15',
    duration: 'Academic year',
    roomType: 'ensuite',
    housemates: 8,
    maxHousemates: 10,
    portugueseSpeaking: true,
    portugueseOwner: false,
    description: 'Official UCL accommodation with a dedicated floor for Portuguese and Lusophone students. Modern facilities, 24/7 security, and organized Portuguese cultural events.',
    descriptionPortuguese: 'Alojamento oficial da UCL com um andar dedicado a estudantes portugueses e lusófonos. Instalações modernas, segurança 24/7 e eventos culturais portugueses organizados.',
    amenities: ['24/7 Security', 'Gym access', 'Study rooms', 'Common kitchen', 'Laundry facilities', 'Portuguese library'],
    nearbyUniversities: ['UCL (2 min walk)', 'King\'s College (10 min)', 'Birkbeck (5 min)'],
    transportLinks: ['Russell Square Station (5 min)', 'Multiple bus routes', 'Cycle hire stations'],
    images: ['/images/accommodation/ucl-halls-1.jpg', '/images/accommodation/ucl-halls-2.jpg'],
    contactPerson: 'UCL Accommodation Office',
    contactMethod: 'email',
    contactInfo: 'accommodation@ucl.ac.uk',
    verified: true,
    rating: 4.6,
    reviews: 28,
    isPopular: true,
    isPremium: true
  },
  {
    id: 'stockwell-studio-portuguese',
    title: 'Modern Studio near Portuguese Community',
    titlePortuguese: 'Estúdio Moderno perto da Comunidade Portuguesa',
    type: 'private_studio',
    location: 'Stockwell, London',
    area: 'Stockwell',
    rent: 1200,
    billsIncluded: false,
    availableFrom: '2024-10-01',
    duration: 'Minimum 6 months',
    roomType: 'studio',
    housemates: 0,
    maxHousemates: 1,
    portugueseSpeaking: false,
    portugueseOwner: true,
    description: 'Self-contained studio apartment in Stockwell, heart of London\'s Portuguese community. Perfect for independent students who want privacy but close to Portuguese culture.',
    descriptionPortuguese: 'Apartamento estúdio independente em Stockwell, coração da comunidade portuguesa de Londres. Perfeito para estudantes independentes que querem privacidade mas perto da cultura portuguesa.',
    amenities: ['Private bathroom', 'Kitchenette', 'High-speed internet', 'Concierge', 'Gym access'],
    nearbyUniversities: ['King\'s College (20 min)', 'Imperial College (25 min)', 'LSE (25 min)'],
    transportLinks: ['Stockwell Station (2 min)', 'Northern Line direct to central London', 'Bus routes'],
    images: ['/images/accommodation/stockwell-studio-1.jpg', '/images/accommodation/stockwell-studio-2.jpg'],
    contactPerson: 'Carlos Oliveira',
    contactMethod: 'phone',
    contactInfo: '+44 20 7946 0958',
    verified: true,
    rating: 4.4,
    reviews: 8,
    isPopular: false,
    isPremium: true
  },
  {
    id: 'golborne-road-flat-share',
    title: 'Flat Share on Golborne Road',
    titlePortuguese: 'Apartamento Partilhado na Golborne Road',
    type: 'flat_share',
    location: 'North Kensington, London',
    area: 'North Kensington',
    rent: 680,
    billsIncluded: false,
    availableFrom: '2024-09-20',
    duration: 'Academic year',
    roomType: 'double',
    housemates: 2,
    maxHousemates: 3,
    portugueseSpeaking: true,
    portugueseOwner: true,
    description: 'Cozy flat share on famous Golborne Road, surrounded by Portuguese restaurants and shops. Great for students who want an authentic Portuguese London experience.',
    descriptionPortuguese: 'Apartamento acolhedor partilhado na famosa Golborne Road, rodeado de restaurantes e lojas portuguesas. Ótimo para estudantes que querem uma experiência autêntica de Londres portuguesa.',
    amenities: ['Shared living room', 'Full kitchen', 'Washing machine', 'Balcony', 'Storage space'],
    nearbyUniversities: ['Imperial College (15 min)', 'Royal College of Art (10 min)', 'UCL (25 min)'],
    transportLinks: ['Ladbroke Grove Station (8 min)', 'Westbourne Park (10 min)', 'Multiple bus routes'],
    images: ['/images/accommodation/golborne-flat-1.jpg', '/images/accommodation/golborne-flat-2.jpg'],
    contactPerson: 'Ana Ferreira',
    contactMethod: 'whatsapp',
    contactInfo: '+44 7890 123456',
    verified: true,
    rating: 4.5,
    reviews: 15,
    isPopular: false,
    isPremium: false
  },
  {
    id: 'portuguese-homestay-family',
    title: 'Homestay with Portuguese Family',
    titlePortuguese: 'Homestay com Família Portuguesa',
    type: 'homestay',
    location: 'Tulse Hill, London',
    area: 'Tulse Hill',
    rent: 650,
    billsIncluded: true,
    availableFrom: '2024-08-25',
    duration: 'Flexible (minimum 3 months)',
    roomType: 'single',
    housemates: 1,
    maxHousemates: 2,
    portugueseSpeaking: true,
    portugueseOwner: true,
    description: 'Live with a welcoming Portuguese family who has been hosting students for 10+ years. Perfect for students wanting cultural immersion and family support away from home.',
    descriptionPortuguese: 'Viva com uma família portuguesa acolhedora que tem recebido estudantes há mais de 10 anos. Perfeito para estudantes que querem imersão cultural e apoio familiar longe de casa.',
    amenities: ['Meals included', 'Family support', 'Portuguese conversation practice', 'Laundry included', 'WiFi'],
    nearbyUniversities: ['King\'s College (30 min)', 'UCL (35 min)', 'Various universities accessible'],
    transportLinks: ['Tulse Hill Station (5 min)', 'Direct trains to central London', 'Bus connections'],
    images: ['/images/accommodation/homestay-family-1.jpg', '/images/accommodation/homestay-family-2.jpg'],
    contactPerson: 'Família Silva',
    contactMethod: 'email',
    contactInfo: 'homestay.silva@gmail.com',
    verified: true,
    rating: 4.9,
    reviews: 34,
    isPopular: true,
    isPremium: false
  }
]

const ROOMMATE_REQUESTS: RoommateRequest[] = [
  {
    id: 'miguel-cs-imperial',
    name: 'Miguel Costa',
    age: 21,
    gender: 'male',
    university: 'Imperial College London',
    course: 'Computer Science',
    yearOfStudy: '3rd Year',
    budget: { min: 600, max: 800 },
    preferredAreas: ['South Kensington', 'Vauxhall', 'Stockwell', 'King\'s Cross'],
    lookingFor: 'portuguese_housemates',
    languages: ['Portuguese', 'English'],
    hobbies: ['Football', 'Gaming', 'Cooking', 'Portuguese music'],
    lifestyle: ['non_smoker', 'social_drinker', 'gym_enthusiast'],
    bio: 'Portuguese CS student looking for Portuguese housemates to share culture and language. Love cooking traditional Portuguese food and watching football together.',
    bioPortuguese: 'Estudante português de Informática procura colegas de casa portugueses para partilhar cultura e língua. Adoro cozinhar comida tradicional portuguesa e ver futebol juntos.',
    availableFrom: '2024-09-01',
    contactPreference: 'app_messaging',
    verified: true,
    responseRate: 95,
    lastActive: '2 hours ago',
    avatar: '/images/roommates/miguel-costa.jpg'
  },
  {
    id: 'sofia-econ-lse',
    name: 'Sofia Rodrigues',
    age: 20,
    gender: 'female',
    university: 'London School of Economics',
    course: 'Economics',
    yearOfStudy: '2nd Year',
    budget: { min: 700, max: 900 },
    preferredAreas: ['Bloomsbury', 'King\'s Cross', 'Holborn', 'Vauxhall'],
    lookingFor: 'mixed_international',
    languages: ['Portuguese', 'English', 'Spanish'],
    hobbies: ['Reading', 'Yoga', 'Portuguese literature', 'Cultural events'],
    lifestyle: ['non_smoker', 'vegetarian', 'early_riser'],
    bio: 'Economics student seeking culturally diverse flatmates. Interested in international perspectives while maintaining connection to Portuguese culture.',
    bioPortuguese: 'Estudante de Economia procura colegas de casa culturalmente diversos. Interessada em perspetivas internacionais enquanto mantém ligação à cultura portuguesa.',
    availableFrom: '2024-09-15',
    contactPreference: 'whatsapp',
    verified: true,
    responseRate: 88,
    lastActive: '1 day ago',
    avatar: '/images/roommates/sofia-rodrigues.jpg'
  },
  {
    id: 'joao-med-kcl',
    name: 'João Silva',
    age: 23,
    gender: 'male',
    university: 'King\'s College London',
    course: 'Medicine',
    yearOfStudy: 'Final Year',
    budget: { min: 800, max: 1000 },
    preferredAreas: ['London Bridge', 'Borough', 'Elephant & Castle', 'Vauxhall'],
    lookingFor: 'quiet_studious',
    languages: ['Portuguese', 'English'],
    hobbies: ['Medicine research', 'Portuguese history', 'Quiet study', 'Medical volunteering'],
    lifestyle: ['non_smoker', 'early_riser', 'gym_enthusiast'],
    bio: 'Final year medical student seeking quiet, studious environment. Prefer Portuguese or Portuguese-speaking housemates who understand academic pressure.',
    bioPortuguese: 'Estudante de medicina do último ano procura ambiente tranquilo e estudioso. Prefere colegas portugueses ou que falem português que compreendam a pressão académica.',
    availableFrom: '2024-08-30',
    contactPreference: 'email',
    verified: true,
    responseRate: 92,
    lastActive: '3 hours ago',
    avatar: '/images/roommates/joao-silva.jpg'
  },
  {
    id: 'catarina-art-rca',
    name: 'Catarina Oliveira',
    age: 19,
    gender: 'female',
    university: 'Royal College of Art',
    course: 'Fine Arts',
    yearOfStudy: '1st Year',
    budget: { min: 650, max: 750 },
    preferredAreas: ['North Kensington', 'Golborne Road', 'Notting Hill', 'Paddington'],
    lookingFor: 'social_active',
    languages: ['Portuguese', 'English', 'Italian'],
    hobbies: ['Art', 'Portuguese culture', 'Gallery visits', 'Creative collaboration'],
    lifestyle: ['non_smoker', 'social_drinker', 'night_owl'],
    bio: 'Art student passionate about Portuguese culture and creativity. Looking for social, artistic housemates who appreciate culture and creativity.',
    bioPortuguese: 'Estudante de arte apaixonada pela cultura portuguesa e criatividade. Procura colegas sociais e artísticos que apreciem cultura e criatividade.',
    availableFrom: '2024-09-10',
    contactPreference: 'app_messaging',
    verified: true,
    responseRate: 90,
    lastActive: '5 hours ago',
    avatar: '/images/roommates/catarina-oliveira.jpg'
  }
]

const ACCOMMODATION_TIPS: AccommodationTip[] = [
  {
    id: 'deposit-protection',
    category: 'legal',
    title: 'Deposit Protection Schemes',
    titlePortuguese: 'Esquemas de Proteção de Depósito',
    content: 'In the UK, landlords must protect your deposit in a government-approved scheme. This protects your money and helps resolve disputes. Always check your deposit is protected within 30 days.',
    contentPortuguese: 'No Reino Unido, os senhorios devem proteger o seu depósito num esquema aprovado pelo governo. Isto protege o seu dinheiro e ajuda a resolver disputas. Verifique sempre se o seu depósito está protegido em 30 dias.',
    importance: 'high',
    icon: ShieldCheckIcon
  },
  {
    id: 'viewing-checklist',
    category: 'practical',
    title: 'Property Viewing Checklist',
    titlePortuguese: 'Lista de Verificação para Visitas',
    content: 'Check heating, water pressure, internet speed, safety certificates, and nearby transport. Take photos of any existing damage. Ask about bills, council tax, and any restrictions.',
    contentPortuguese: 'Verifique aquecimento, pressão da água, velocidade da internet, certificados de segurança e transporte próximo. Tire fotos de qualquer dano existente. Pergunte sobre contas, imposto municipal e restrições.',
    importance: 'high',
    icon: DocumentTextIcon
  },
  {
    id: 'portuguese-areas',
    category: 'cultural',
    title: 'Portuguese Communities in London',
    titlePortuguese: 'Comunidades Portuguesas em Londres',
    content: 'Vauxhall, Stockwell, and Golborne Road have large Portuguese communities with shops, restaurants, and cultural centers. Living nearby provides cultural connection and support.',
    contentPortuguese: 'Vauxhall, Stockwell e Golborne Road têm grandes comunidades portuguesas com lojas, restaurantes e centros culturais. Viver perto proporciona conexão cultural e apoio.',
    importance: 'medium',
    icon: GlobeAltIcon
  },
  {
    id: 'council-tax-students',
    category: 'financial',
    title: 'Council Tax Exemption for Students',
    titlePortuguese: 'Isenção de Imposto Municipal para Estudantes',
    content: 'Full-time students are exempt from council tax. If you live with non-students, you may get a discount. Always inform the council of your student status with proper documentation.',
    contentPortuguese: 'Estudantes a tempo inteiro estão isentos do imposto municipal. Se vive com não-estudantes, pode obter desconto. Informe sempre o conselho do seu status de estudante com documentação adequada.',
    importance: 'high',
    icon: CurrencyPoundIcon
  },
  {
    id: 'safety-standards',
    category: 'safety',
    title: 'Safety Standards and Certificates',
    titlePortuguese: 'Padrões de Segurança e Certificados',
    content: 'Landlords must provide gas safety certificates, electrical certificates, and HMO licenses if applicable. Check smoke and carbon monoxide detectors are working.',
    contentPortuguese: 'Os senhorios devem fornecer certificados de segurança de gás, certificados elétricos e licenças HMO se aplicável. Verifique se os detetores de fumo e monóxido de carbono funcionam.',
    importance: 'high',
    icon: ShieldCheckIcon
  },
  {
    id: 'transport-student-discounts',
    category: 'financial',
    title: 'Student Transport Discounts',
    titlePortuguese: 'Descontos de Transporte para Estudantes',
    content: 'Get a 18+ Student Oyster Card for 30% off travel. Consider location relative to your university to save money. Some areas offer better value despite longer commutes.',
    contentPortuguese: 'Obtenha um cartão 18+ Student Oyster para 30% de desconto em viagens. Considere a localização relativa à sua universidade para poupar dinheiro. Algumas áreas oferecem melhor valor apesar de viagens mais longas.',
    importance: 'medium',
    icon: CurrencyPoundIcon
  }
]

export default function AccommodationSupportSection() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'listings' | 'roommates' | 'tips'>('listings')
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 2000 })

  const tabs = [
    { 
      id: 'listings', 
      label: { en: 'Accommodation Listings', pt: 'Listagens de Alojamento' },
      icon: HomeIcon,
      description: { en: 'Find verified Portuguese-friendly housing', pt: 'Encontre alojamento verificado e amigável aos portugueses' }
    },
    { 
      id: 'roommates', 
      label: { en: 'Roommate Matching', pt: 'Correspondência de Colegas' },
      icon: UsersIcon,
      description: { en: 'Connect with Portuguese students seeking housing', pt: 'Conecte-se com estudantes portugueses que procuram alojamento' }
    },
    { 
      id: 'tips', 
      label: { en: 'Housing Tips', pt: 'Dicas de Alojamento' },
      icon: InformationCircleIcon,
      description: { en: 'Essential advice for renting in the UK', pt: 'Conselhos essenciais para alugar no Reino Unido' }
    }
  ]

  const areas = [
    { value: 'all', label: { en: 'All Areas', pt: 'Todas as Áreas' } },
    { value: 'Vauxhall', label: { en: 'Vauxhall', pt: 'Vauxhall' } },
    { value: 'Stockwell', label: { en: 'Stockwell', pt: 'Stockwell' } },
    { value: 'North Kensington', label: { en: 'North Kensington', pt: 'North Kensington' } },
    { value: 'Bloomsbury', label: { en: 'Bloomsbury', pt: 'Bloomsbury' } },
    { value: 'South Kensington', label: { en: 'South Kensington', pt: 'South Kensington' } }
  ]

  const filteredListings = ACCOMMODATION_LISTINGS.filter(listing => {
    const areaMatch = selectedArea === 'all' || listing.area === selectedArea
    const priceMatch = listing.rent >= priceRange.min && listing.rent <= priceRange.max
    return areaMatch && priceMatch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shared_house': return 'bg-blue-100 text-primary-700'
      case 'student_halls': return 'bg-green-100 text-green-700'
      case 'private_studio': return 'bg-purple-100 text-purple-700'
      case 'homestay': return 'bg-pink-100 text-pink-700'
      case 'flat_share': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-secondary-100 text-secondary-700'
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      'shared_house': { en: 'Shared House', pt: 'Casa Partilhada' },
      'student_halls': { en: 'Student Halls', pt: 'Residência Estudantil' },
      'private_studio': { en: 'Private Studio', pt: 'Estúdio Privado' },
      'homestay': { en: 'Homestay', pt: 'Casa de Família' },
      'flat_share': { en: 'Flat Share', pt: 'Apartamento Partilhado' }
    }
    return labels[type]?.[language] || type
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-green-200 bg-green-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 border border-blue-200 shadow-lg mb-6">
            <HomeIcon className="w-4 h-4 mr-2 text-primary-600" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
              {language === 'pt' 
                ? "Apoio de Alojamento para Estudantes Portugueses"
                : "Portuguese Student Accommodation Support"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Encontre o Seu Lar Longe de Casa'
              : 'Find Your Home Away From Home'}
          </h2>
          
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
            {language === 'pt' 
              ? 'Apoio abrangente para encontrar alojamento em Londres, conectar-se com colegas portugueses e navegar no sistema de arrendamento do Reino Unido com confiança.'
              : 'Comprehensive support to find accommodation in London, connect with Portuguese housemates, and navigate the UK rental system with confidence.'}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-primary-600 mb-1">{ACCOMMODATION_LISTINGS.length}</div>
              <div className="text-sm text-secondary-600">{language === 'pt' ? 'Listagens verificadas' : 'Verified listings'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{ROOMMATE_REQUESTS.length}</div>
              <div className="text-sm text-secondary-600">{language === 'pt' ? 'Estudantes procuram' : 'Students seeking'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
              <div className="text-sm text-secondary-600">{language === 'pt' ? 'Áreas portuguesas' : 'Portuguese areas'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-pink-600 mb-1">24h</div>
              <div className="text-sm text-secondary-600">{language === 'pt' ? 'Tempo de resposta' : 'Response time'}</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {tabs.map(tab => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white border-blue-300 shadow-lg'
                      : 'bg-white/50 border-gray-200 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`p-3 rounded-xl ${
                      activeTab === tab.id ? 'bg-blue-100' : 'bg-secondary-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        activeTab === tab.id ? 'text-primary-600' : 'text-secondary-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className={`font-semibold mb-2 ${
                    activeTab === tab.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {tab.label[language]}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {tab.description[language]}
                  </p>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Accommodation Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            {/* Filters */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Área:' : 'Area:'}
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {areas.map(area => (
                      <option key={area.value} value={area.value}>
                        {area.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Renda mínima:' : 'Min rent:'}
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="£500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Renda máxima:' : 'Max rent:'}
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="£1500"
                  />
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                          {language === 'pt' ? listing.titlePortuguese : listing.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(listing.type)}`}>
                            {getTypeLabel(listing.type)}
                          </span>
                          {listing.portugueseSpeaking && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              🇵🇹 {language === 'pt' ? 'Português' : 'Portuguese'}
                            </span>
                          )}
                          {listing.verified && (
                            <CheckBadgeIcon className="w-4 h-4 text-primary-500" />
                          )}
                        </div>
                      </div>
                      {listing.isPopular && (
                        <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          {language === 'pt' ? 'Popular' : 'Popular'}
                        </div>
                      )}
                    </div>

                    {/* Location & Price */}
                    <div className="space-y-2 text-sm text-secondary-600 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          {listing.location}
                        </div>
                        <div className="flex items-center font-bold text-lg text-gray-900">
                          <CurrencyPoundIcon className="w-4 h-4 mr-1" />
                          {listing.rent}
                          <span className="text-xs text-gray-500 ml-1">
                            {listing.billsIncluded ? 
                              (language === 'pt' ? 'inc. contas' : 'inc. bills') : 
                              (language === 'pt' ? 'ex. contas' : 'ex. bills')
                            }
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-2" />
                        {listing.housemates}/{listing.maxHousemates} {language === 'pt' ? 'colegas' : 'housemates'}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {language === 'pt' ? 'Disponível:' : 'Available:'} {new Date(listing.availableFrom).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-secondary-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {language === 'pt' ? listing.descriptionPortuguese : listing.description}
                    </p>

                    {/* Amenities */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {language === 'pt' ? 'Comodidades:' : 'Amenities:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {listing.amenities.slice(0, 4).map((amenity, i) => (
                          <span key={i} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {listing.amenities.length > 4 && (
                          <span className="text-xs text-primary-600">
                            +{listing.amenities.length - 4} {language === 'pt' ? 'mais' : 'more'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Universities */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {language === 'pt' ? 'Universidades próximas:' : 'Nearby Universities:'}
                      </h4>
                      <div className="space-y-1">
                        {listing.nearbyUniversities.slice(0, 2).map((uni, i) => (
                          <div key={i} className="text-xs text-secondary-600">• {uni}</div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid key={i} className={`w-4 h-4 ${i < Math.floor(listing.rating) ? '' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-secondary-600">
                          {listing.rating} ({listing.reviews} {language === 'pt' ? 'avaliações' : 'reviews'})
                        </span>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {language === 'pt' ? 'Contacto:' : 'Contact:'}
                      </div>
                      <div className="text-sm text-gray-900">{listing.contactPerson}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200">
                        {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                      </button>
                      <button className="px-4 py-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors">
                        <HeartIconSolid className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Roommate Matching Tab */}
        {activeTab === 'roommates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROOMMATE_REQUESTS.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-xl">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{request.name}</h3>
                        {request.verified && (
                          <CheckBadgeIcon className="w-4 h-4 text-primary-500" />
                        )}
                      </div>
                      <p className="text-sm text-secondary-600 mb-1">
                        {request.age} {language === 'pt' ? 'anos' : 'years old'} • {request.course}, {request.yearOfStudy}
                      </p>
                      <p className="text-sm font-medium text-primary-600">{request.university}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Budget */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-700">{language === 'pt' ? 'Orçamento:' : 'Budget:'}</span>
                      <span className="text-lg font-bold text-gray-900">
                        £{request.budget.min} - £{request.budget.max}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                    {language === 'pt' ? request.bioPortuguese : request.bio}
                  </p>

                  {/* Preferred Areas */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Áreas preferidas:' : 'Preferred Areas:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {request.preferredAreas.slice(0, 3).map((area, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-primary-700 px-2 py-1 rounded-full">
                          {area}
                        </span>
                      ))}
                      {request.preferredAreas.length > 3 && (
                        <span className="text-xs text-primary-600">
                          +{request.preferredAreas.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Estilo de vida:' : 'Lifestyle:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {request.lifestyle.slice(0, 3).map((trait, i) => (
                        <span key={i} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                          {trait.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{request.responseRate}%</div>
                      <div className="text-xs text-secondary-600">{language === 'pt' ? 'Taxa resposta' : 'Response rate'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-bold text-gray-900">{request.lastActive}</div>
                      <div className="text-xs text-secondary-600">{language === 'pt' ? 'Última atividade' : 'Last active'}</div>
                    </div>
                  </div>

                  {/* Available From */}
                  <div className="mb-6 text-sm text-secondary-600">
                    <ClockIcon className="w-4 h-4 inline mr-2" />
                    {language === 'pt' ? 'Disponível a partir de:' : 'Available from:'} {new Date(request.availableFrom).toLocaleDateString()}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200">
                    <span className="flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Housing Tips Tab */}
        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACCOMMODATION_TIPS.map((tip, index) => {
              const IconComponent = tip.icon
              
              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`bg-white rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${getImportanceColor(tip.importance)}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <IconComponent className="w-6 h-6 text-secondary-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">
                            {language === 'pt' ? tip.titlePortuguese : tip.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tip.importance === 'high' ? 'bg-red-100 text-red-700' :
                            tip.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {tip.importance === 'high' ? 
                              (language === 'pt' ? 'Alto' : 'High') :
                              tip.importance === 'medium' ?
                              (language === 'pt' ? 'Médio' : 'Medium') :
                              (language === 'pt' ? 'Baixo' : 'Low')
                            }
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                          {tip.category}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-secondary-700 leading-relaxed">
                      {language === 'pt' ? tip.contentPortuguese : tip.content}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-center text-white"
        >
          <HomeIcon className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' 
              ? 'Precisa de Mais Apoio com Alojamento?'
              : 'Need More Accommodation Support?'}
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Nossa equipa de apoio está disponível para ajudar com visitas, negociações e questões legais. Suporte especializado para estudantes portugueses.'
              : 'Our support team is available to help with viewings, negotiations, and legal questions. Specialized support for Portuguese students.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-secondary-100 transition-colors">
              {language === 'pt' ? 'Falar com Especialista' : 'Speak to Specialist'}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold px-8 py-3 rounded-xl transition-all duration-200">
              {language === 'pt' ? 'Criar Alerta de Alojamento' : 'Create Housing Alert'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}