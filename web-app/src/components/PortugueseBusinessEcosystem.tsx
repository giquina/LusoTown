"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  TrophyIcon,
  HandRaisedIcon,
  CurrencyPoundIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface BusinessCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  businessCount: number;
  featured: boolean;
  revenueModel: string;
  commission: number;
}

interface PortugueseBusiness {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionEn: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviews: number;
  verified: boolean;
  culturalAuthenticity: number;
  premium: boolean;
  subscriptionTier: 'basic' | 'professional' | 'enterprise';
  monthlyFee: number;
  features: string[];
  featuresEn: string[];
}

const businessCategories: BusinessCategory[] = [
  {
    id: 'restaurants',
    name: 'Restaurantes Portugueses',
    nameEn: 'Portuguese Restaurants',
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    businessCount: 145,
    featured: true,
    revenueModel: 'Commission + Subscription',
    commission: 8.5
  },
  {
    id: 'legal',
    name: 'Servi�os Jur�dicos',
    nameEn: 'Legal Services',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    businessCount: 32,
    featured: true,
    revenueModel: 'Subscription + Referral',
    commission: 12.0
  },
  {
    id: 'financial',
    name: 'Servi�os Financeiros',
    nameEn: 'Financial Services',
    icon: <BanknotesIcon className="w-6 h-6" />,
    businessCount: 28,
    featured: true,
    revenueModel: 'Referral + Commission',
    commission: 15.0
  },
  {
    id: 'healthcare',
    name: 'Sa�de e Bem-estar',
    nameEn: 'Health & Wellness',
  icon: <HandRaisedIcon className="w-6 h-6" />,
    businessCount: 67,
    featured: false,
    revenueModel: 'Subscription',
    commission: 0
  },
  {
    id: 'education',
    name: 'Educa��o e L�nguas',
    nameEn: 'Education & Languages',
    icon: <TrophyIcon className="w-6 h-6" />,
    businessCount: 54,
    featured: true,
    revenueModel: 'Commission + Partnership',
    commission: 18.0
  },
  {
    id: 'real_estate',
    name: 'Imobili�rio',
    nameEn: 'Real Estate',
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    businessCount: 23,
    featured: true,
    revenueModel: 'High Commission',
    commission: 25.0
  }
];

const featuredBusinesses: PortugueseBusiness[] = [
  {
    id: 'tasca-do-bairro',
    name: 'Tasca do Bairro',
    category: 'restaurants',
    description: 'Restaurante tradicional portugu�s com pratos caseiros e ambiente familiar',
    descriptionEn: 'Traditional Portuguese restaurant with homemade dishes and family atmosphere',
    address: '45 Charlotte Street, Fitzrovia, London W1T 1RS',
    phone: '+44 20 7636 2431',
    email: 'info@tascadobairro.co.uk',
    website: 'www.tascadobairro.co.uk',
    rating: 4.8,
    reviews: 234,
    verified: true,
    culturalAuthenticity: 95,
    premium: true,
    subscriptionTier: 'professional',
    monthlyFee: 85,
    features: [
      'Listagem priorit�ria nos resultados',
      'Reservas online integradas',
      'Marketing cultural direcionado',
      'An�lise de clientes portugueses',
      'Suporte t�cnico em portugu�s'
    ],
    featuresEn: [
      'Priority listing in results',
      'Integrated online reservations',
      'Targeted cultural marketing',
      'Portuguese customer analytics',
      'Portuguese technical support'
    ]
  },
  {
    id: 'luso-legal',
    name: 'Luso Legal Services',
    category: 'legal',
    description: 'Escrit�rio de advocacia especializado em direito portugu�s e imigra��o',
    descriptionEn: 'Law firm specialized in Portuguese law and immigration',
    address: '123 Holborn, London WC1V 6NA',
    phone: '+44 20 7242 5678',
    email: 'contacto@lusolegal.co.uk',
    website: 'www.lusolegal.co.uk',
    rating: 4.9,
    reviews: 156,
    verified: true,
    culturalAuthenticity: 98,
    premium: true,
    subscriptionTier: 'enterprise',
    monthlyFee: 250,
    features: [
      'Consultas jur�dicas especializadas',
      'Assist�ncia com vistos e cidadania',
      'Contratos em portugu�s e ingl�s',
      'Rede de contactos em Portugal',
      'Atendimento em portugu�s'
    ],
    featuresEn: [
      'Specialized legal consultations',
      'Visa and citizenship assistance',
      'Contracts in Portuguese and English',
      'Network of contacts in Portugal',
      'Service in Portuguese'
    ]
  }
];

export default function PortugueseBusinessEcosystem() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<PortugueseBusiness | null>(null);
  const [showRevenue, setShowRevenue] = useState(false);

  const isPortuguese = language === 'pt';

  const totalMonthlyRevenue = featuredBusinesses.reduce((total, business) => {
    return total + business.monthlyFee;
  }, 0) * businessCategories.reduce((total, cat) => total + cat.businessCount, 0) / 10; // Average estimate

  const revenueBreakdown = {
    subscriptions: totalMonthlyRevenue * 0.65, // 65% from subscriptions
    commissions: totalMonthlyRevenue * 0.25,  // 25% from commissions
    partnerships: totalMonthlyRevenue * 0.10   // 10% from partnerships
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium mb-8">
              <BuildingOfficeIcon className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Ecossistema Empresarial Portugu�s' : 'Portuguese Business Ecosystem'}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {isPortuguese 
                ? 'Conecte-se com Neg�cios Portugueses em Londres'
                : 'Connect with Portuguese Businesses in London'
              }
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'A maior plataforma de neg�cios portugueses no Reino Unido. Descubra servi�os aut�nticos, conecte-se com profissionais e fa�a crescer a sua empresa dentro da comunidade portuguesa.'
                : 'The largest Portuguese business platform in the UK. Discover authentic services, connect with professionals, and grow your business within the Portuguese community.'
              }
            </p>

            {/* Revenue Dashboard Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Explorar Neg�cios' : 'Explore Businesses'}
              </button>
              
              <button 
                onClick={() => setShowRevenue(!showRevenue)}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                {isPortuguese ? 'Dashboard de Receitas' : 'Revenue Dashboard'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Dashboard */}
      {showRevenue && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-12 bg-gray-900 text-white"
        >
          <div className="container-width">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isPortuguese ? 'An�lise de Receitas - Ecossistema Empresarial' : 'Revenue Analysis - Business Ecosystem'}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyPoundIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Receita Mensal Total' : 'Total Monthly Revenue'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{totalMonthlyRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm">
                  {isPortuguese ? '+15% m�s anterior' : '+15% from previous month'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ChartBarIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Subscri��es' : 'Subscriptions'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{Math.round(revenueBreakdown.subscriptions).toLocaleString()}</p>
                <p className="text-blue-100 text-sm">65% {isPortuguese ? 'da receita total' : 'of total revenue'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HandRaisedIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Comiss�es' : 'Commissions'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{Math.round(revenueBreakdown.commissions).toLocaleString()}</p>
                <p className="text-purple-100 text-sm">25% {isPortuguese ? 'da receita total' : 'of total revenue'}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrophyIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Parcerias' : 'Partnerships'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{Math.round(revenueBreakdown.partnerships).toLocaleString()}</p>
                <p className="text-orange-100 text-sm">10% {isPortuguese ? 'da receita total' : 'of total revenue'}</p>
              </div>
            </div>

            {/* Annual Revenue Projection */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese ? 'Proje��o Anual' : 'Annual Projection'}
              </h3>
              <p className="text-4xl font-bold mb-2">
                �{(totalMonthlyRevenue * 12 * 1.15).toLocaleString()}
              </p>
              <p className="text-white/80">
                {isPortuguese 
                  ? 'Incluindo crescimento de 15% previsto para neg�cios portugueses em Londres'
                  : 'Including 15% projected growth for Portuguese businesses in London'
                }
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Business Categories */}
      <section className="py-16">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Categorias de Neg�cios' : 'Business Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Explore categorias de neg�cios portugueses verificados e certificados para qualidade cultural'
                : 'Explore Portuguese business categories verified and certified for cultural quality'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  category.featured 
                    ? 'border-primary-200 ring-4 ring-primary-50' 
                    : 'border-gray-100 hover:border-primary-200'
                }`}
              >
                {category.featured && (
                  <div className="inline-flex items-center bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <StarIcon className="w-3 h-3 mr-1" />
                    {isPortuguese ? 'Em Destaque' : 'Featured'}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {isPortuguese ? category.name : category.nameEn}
                    </h3>
                    <p className="text-gray-600">
                      {category.businessCount} {isPortuguese ? 'neg�cios' : 'businesses'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {isPortuguese ? 'Modelo de Receita:' : 'Revenue Model:'}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {category.revenueModel}
                    </span>
                  </div>
                  
                  {category.commission > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {isPortuguese ? 'Comiss�o:' : 'Commission:'}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {category.commission}%
                      </span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-6 bg-primary-50 text-primary-600 py-3 rounded-xl font-semibold group-hover:bg-primary-100 transition-colors">
                  {isPortuguese ? 'Explorar Categoria' : 'Explore Category'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-gray-50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Neg�cios em Destaque' : 'Featured Businesses'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Neg�cios portugueses premium com autenticidade cultural verificada'
                : 'Premium Portuguese businesses with verified cultural authenticity'
              }
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{business.name}</h3>
                        {business.verified && (
                          <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                        )}
                        {business.premium && (
                          <div className="bg-premium-500 text-white text-xs font-bold px-2 py-1 rounded">
                            PREMIUM
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {isPortuguese ? business.description : business.descriptionEn}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold">{business.rating}</span>
                          <span className="text-gray-600">({business.reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <TrophyIcon className="w-5 h-5 text-primary-500" />
                          <span className="text-sm text-primary-600 font-medium">
                            {business.culturalAuthenticity}% {isPortuguese ? 'Autenticidade' : 'Authenticity'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <EnvelopeIcon className="w-4 h-4" />
                        <span>{business.email}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {isPortuguese ? 'Plano:' : 'Plan:'} 
                        </span>
                        <span className="ml-2 capitalize text-primary-600">
                          {business.subscriptionTier}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {isPortuguese ? 'Taxa Mensal:' : 'Monthly Fee:'}
                        </span>
                        <span className="ml-2 font-bold text-green-600">
                          �{business.monthlyFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {isPortuguese ? 'Caracter�sticas Premium:' : 'Premium Features:'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {(isPortuguese ? business.features : business.featuresEn).slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                      {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                    </button>
                    <button className="px-6 py-3 border border-primary-200 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
                      {isPortuguese ? 'Contactar' : 'Contact'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Integration CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-width text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {isPortuguese 
                ? 'Integre o Seu Neg�cio no Ecossistema Portugu�s'
                : 'Integrate Your Business into the Portuguese Ecosystem'
              }
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Junte-se a centenas de neg�cios portugueses que crescem atrav�s da nossa plataforma. Acesso exclusivo � maior comunidade portuguesa do Reino Unido.'
                : 'Join hundreds of Portuguese businesses growing through our platform. Exclusive access to the largest Portuguese community in the UK.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Registar Neg�cio' : 'Register Business'}
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                {isPortuguese ? 'Agendar Demonstra��o' : 'Schedule Demo'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}