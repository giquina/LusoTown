'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  BuildingOffice2Icon,
  CurrencyPoundIcon,
  UserGroupIcon,
  TrophyIcon,
  HandRaisedIcon,
  ChartBarIcon,
  GlobeAltIcon,
  SparklesIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface CorporatePackage {
  id: string
  name: string
  namePortuguese: string
  price: string
  features: string[]
  featuresPortuguese: string[]
  recommended?: boolean
  targetRevenue: string
  clientBase: string
}

interface PartnershipROI {
  category: string
  categoryPortuguese: string
  annualValue: string
  description: string
  descriptionPortuguese: string
}

const CorporatePartnershipProgram: React.FC = () => {
  const { language } = useLanguage()
  const [selectedPackage, setSelectedPackage] = useState<string>('strategic')
  const [showROICalculator, setShowROICalculator] = useState(false)

  const corporatePackages: CorporatePackage[] = [
    {
      id: 'founding',
      name: 'Founding Partner Program',
      namePortuguese: 'Programa Parceiro Fundador',
      price: '£25,000/year',
      targetRevenue: '£2M+ annual revenue',
      clientBase: '500+ Portuguese customers',
      features: [
        'Exclusive founding partner status and branding',
        'Co-branded marketing campaigns and events',
        'Direct access to LusoTown leadership team',
        'Premium placement across all LusoTown platforms',
        'Dedicated Portuguese-speaking community liaison',
        'Quarterly business development meetings',
        'Access to Portuguese business intelligence reports',
        'Priority partnership announcements',
        'Custom integration and API access',
        'Exclusive networking events hosting rights'
      ],
      featuresPortuguese: [
        'Status exclusivo de parceiro fundador e marca',
        'Campanhas de marketing e eventos co-marcados',
        'Acesso direto à equipa de liderança da LusoTown',
        'Colocação premium em todas as plataformas LusoTown',
        'Liaison dedicado da comunidade de falantes de português',
        'Reuniões de desenvolvimento de negócios trimestrais',
        'Acesso a relatórios de inteligência empresarial portuguesa',
        'Anúncios de parceria prioritários',
        'Integração personalizada e acesso API',
        'Direitos exclusivos de hospedagem de eventos de networking'
      ],
      recommended: true
    },
    {
      id: 'strategic',
      name: 'Strategic Business Partner',
      namePortuguese: 'Parceiro Estratégico de Negócios',
      price: '£12,500/year',
      targetRevenue: '£750K+ annual revenue',
      clientBase: '200+ Portuguese customers',
      features: [
        'Strategic partner recognition and branding',
        'Featured placement in business directory',
        'Monthly Portuguese-speaking community insights',
        'Preferred vendor status for LusoTown events',
        'Co-marketing opportunities and content',
        'Access to premium networking events',
        'Portuguese customer referral program',
        'Quarterly partnership review meetings',
        'Business development support and guidance'
      ],
      featuresPortuguese: [
        'Reconhecimento e marca de parceiro estratégico',
        'Colocação em destaque no diretório de negócios',
        'Insights mensais da comunidade de falantes de português',
        'Status de fornecedor preferido para eventos LusoTown',
        'Oportunidades de co-marketing e conteúdo',
        'Acesso a eventos de networking premium',
        'Programa de referência de clientes portugueses',
        'Reuniões de revisão de parceria trimestrais',
        'Apoio e orientação no desenvolvimento de negócios'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Services Partner',
      namePortuguese: 'Parceiro de Serviços Profissionais',
      price: '£6,500/year',
      targetRevenue: '£250K+ annual revenue',
      clientBase: '50+ Portuguese clients',
      features: [
        'Professional partner directory listing',
        'Portuguese-speaking client matching service',
        'Industry-specific networking events access',
        'Professional development workshop hosting',
        'Client testimonial and case study features',
        'Bi-annual partnership strategy sessions',
        'Access to Portuguese business community data',
        'Marketing support for Portuguese outreach'
      ],
      featuresPortuguese: [
        'Listagem no diretório de parceiros profissionais',
        'Serviço de correspondência de clientes de língua portuguesa',
        'Acesso a eventos de networking específicos da indústria',
        'Hospedagem de workshops de desenvolvimento profissional',
        'Destaques de testemunhos e estudos de caso de clientes',
        'Sessões de estratégia de parceria semestrais',
        'Acesso a dados da comunidade empresarial portuguesa',
        'Apoio de marketing para alcance português'
      ]
    },
    {
      id: 'community',
      name: 'Community Business Partner',
      namePortuguese: 'Parceiro Empresarial Comunitário',
      price: '£2,500/year',
      targetRevenue: 'Emerging businesses',
      clientBase: 'Portuguese-speaking community focus',
      features: [
        'Community business directory listing',
        'Access to community networking events',
        'Portuguese customer acquisition support',
        'Local Portuguese market insights',
        'Community event participation opportunities',
        'Basic partnership recognition',
        'Portuguese-speaking community newsletter features'
      ],
      featuresPortuguese: [
        'Listagem no diretório de negócios comunitários',
        'Acesso a eventos de networking comunitários',
        'Apoio à aquisição de clientes portugueses',
        'Insights do mercado português local',
        'Oportunidades de participação em eventos comunitários',
        'Reconhecimento básico de parceria',
        'Destaques no boletim informativo da comunidade de falantes de português'
      ]
    }
  ]

  const partnershipROI: PartnershipROI[] = [
    {
      category: 'Direct Customer Acquisition',
      categoryPortuguese: 'Aquisição Direta de Clientes',
      annualValue: '£15,000 - £85,000',
      description: 'New Portuguese customers through LusoTown referrals and directory visibility',
      descriptionPortuguese: 'Novos clientes portugueses através de referências da LusoTown e visibilidade no diretório'
    },
    {
      category: 'Market Intelligence & Insights',
      categoryPortuguese: 'Inteligência e Insights de Mercado',
      annualValue: '£8,000 - £25,000',
      description: 'Portuguese market data, customer behavior insights, and competitive intelligence',
      descriptionPortuguese: 'Dados do mercado português, insights de comportamento do cliente e inteligência competitiva'
    },
    {
      category: 'Brand Recognition & Trust',
      categoryPortuguese: 'Reconhecimento e Confiança da Marca',
      annualValue: '£12,000 - £45,000',
      description: 'Enhanced credibility and trust within the Portuguese-speaking community',
      descriptionPortuguese: 'Credibilidade e confiança aprimoradas dentro da comunidade de falantes de português'
    },
    {
      category: 'Networking & Business Development',
      categoryPortuguese: 'Networking e Desenvolvimento de Negócios',
      annualValue: '£5,000 - £35,000',
      description: 'High-value business connections and partnership opportunities',
      descriptionPortuguese: 'Conexões empresariais de alto valor e oportunidades de parceria'
    },
    {
      category: 'Marketing & Co-promotion',
      categoryPortuguese: 'Marketing e Co-promoção',
      annualValue: '£10,000 - £40,000',
      description: 'Shared marketing costs and amplified reach within Portuguese markets',
      descriptionPortuguese: 'Custos de marketing compartilhados e alcance amplificado nos mercados portugueses'
    }
  ]

  const calculateTotalROI = (packageId: string): string => {
    const roiRanges = {
      founding: '£50,000 - £230,000',
      strategic: '£35,000 - £165,000',
      professional: '£20,000 - £95,000',
      community: '£12,000 - £55,000'
    }
    return roiRanges[packageId as keyof typeof roiRanges] || '£12,000 - £55,000'
  }

  const selectedPkg = corporatePackages.find(pkg => pkg.id === selectedPackage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <HandRaisedIcon className="w-12 h-12 text-primary-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            {language === 'pt' 
              ? 'Programa de Parcerias Corporativas'
              : 'Corporate Partnership Program'
            }
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
          {language === 'pt'
            ? 'Junte-se ao mercado português de £450M no Reino Unido. Parcerias estratégicas para empresas que servem a comunidade lusófona.'
            : 'Join the £450M Portuguese market in the UK. Strategic partnerships for businesses serving the Portuguese-speaking community.'
          }
        </p>
        
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary-600">450,000+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Portugueses no Reino Unido' : 'Portuguese in UK'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-secondary-600">£450M</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Poder de Compra Anual' : 'Annual Spending Power'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-accent-600">25,000+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Membros Ativos' : 'Active Members'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-premium-600">380%</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'ROI Médio' : 'Average ROI'}
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Packages */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {language === 'pt' 
            ? 'Pacotes de Parceria'
            : 'Partnership Packages'
          }
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corporatePackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 cursor-pointer transition-all duration-300 ${
                selectedPackage === pkg.id 
                  ? 'border-primary-500 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-primary-300'
              } ${pkg.recommended ? 'ring-2 ring-accent-200' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {language === 'pt' ? 'Recomendado' : 'Recommended'}
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? pkg.namePortuguese : pkg.name}
                </h3>
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  {pkg.price}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <div className="mb-1">{pkg.targetRevenue}</div>
                  <div>{pkg.clientBase}</div>
                </div>
                
                <div className="space-y-2">
                  {(language === 'pt' ? pkg.featuresPortuguese : pkg.features).slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <div className="text-sm text-gray-500 font-medium">
                      +{pkg.features.length - 3} {language === 'pt' ? 'mais benefícios' : 'more benefits'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Package Information */}
      {selectedPkg && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? selectedPkg.namePortuguese : selectedPkg.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'pt'
                  ? 'Benefícios completos incluídos neste pacote de parceria:'
                  : 'Complete benefits included in this partnership package:'
                }
              </p>
              
              <div className="space-y-3">
                {(language === 'pt' ? selectedPkg.featuresPortuguese : selectedPkg.features).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckBadgeIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'ROI Estimado Anual' : 'Estimated Annual ROI'}
              </h4>
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {calculateTotalROI(selectedPackage)}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Retorno total estimado baseado em métricas de parceiros atuais'
                    : 'Total estimated return based on current partner metrics'
                  }
                </div>
              </div>
              
              <button
                onClick={() => setShowROICalculator(!showROICalculator)}
                className="w-full bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Ver Calculadora ROI' : 'View ROI Calculator'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROI Calculator */}
      {showROICalculator && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'pt' ? 'Calculadora de ROI Detalhada' : 'Detailed ROI Calculator'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipROI.map((roi, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <ChartBarIcon className="w-5 h-5 text-primary-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">
                    {language === 'pt' ? roi.categoryPortuguese : roi.category}
                  </h4>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {roi.annualValue}
                </div>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? roi.descriptionPortuguese : roi.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Stories */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {language === 'pt' ? 'Histórias de Sucesso de Parceiros' : 'Partner Success Stories'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <BanknotesIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Millennium Bank UK</h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? 'Parceiro Bancário' : 'Banking Partner'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {language === 'pt'
                ? '45% de aumento em novos clientes portugueses através da parceria LusoTown.'
                : '45% increase in new Portuguese customers through LusoTown partnership.'
              }
            </p>
            <div className="text-2xl font-bold text-green-600">+£125K</div>
            <div className="text-sm text-gray-500">
              {language === 'pt' ? 'Receita adicional anual' : 'Additional annual revenue'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Instituto Camões</h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? 'Parceiro Cultural' : 'Cultural Partner'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {language === 'pt'
                ? '60% de aumento nas inscrições em cursos de português através da plataforma.'
                : '60% increase in Portuguese course enrollments through the platform.'
              }
            </p>
            <div className="text-2xl font-bold text-green-600">+£85K</div>
            <div className="text-sm text-gray-500">
              {language === 'pt' ? 'Valor de inscrições adicionais' : 'Additional enrollment value'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <GlobeAltIcon className="w-6 h-6 text-accent-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">TAP Air Portugal</h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? 'Parceiro de Viagens' : 'Travel Partner'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {language === 'pt'
                ? '35% de aumento em reservas para Portugal através de referências da comunidade.'
                : '35% increase in Portugal bookings through community referrals.'
              }
            </p>
            <div className="text-2xl font-bold text-green-600">+£95K</div>
            <div className="text-sm text-gray-500">
              {language === 'pt' ? 'Receita de viagens adicional' : 'Additional travel revenue'}
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {language === 'pt' ? 'Processo de Candidatura' : 'Application Process'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? '1. Candidatura' : '1. Application'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Submeta a candidatura online com informações da empresa'
                : 'Submit online application with company information'
              }
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDaysIcon className="w-8 h-8 text-secondary-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? '2. Consulta' : '2. Consultation'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Reunião de estratégia para discutir objetivos'
                : 'Strategy meeting to discuss objectives'
              }
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandRaisedIcon className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? '3. Acordo' : '3. Agreement'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Finalização do acordo de parceria'
                : 'Partnership agreement finalization'
              }
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-premium-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8 text-premium-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? '4. Lançamento' : '4. Launch'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Implementação e lançamento oficial'
                : 'Implementation and official launch'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
        <TrophyIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-4">
          {language === 'pt' ? 'Pronto para Expandir no Mercado Português?' : 'Ready to Expand in the Portuguese Market?'}
        </h3>
        <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Junte-se a empresas líderes que já estão a capitalizar no mercado português de £450M no Reino Unido.'
            : 'Join leading companies already capitalizing on the £450M Portuguese market in the UK.'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:partnerships@lusotown.com"
            className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <EnvelopeIcon className="w-5 h-5 mr-2" />
            {language === 'pt' ? 'Contactar por Email' : 'Email Us'}
          </a>
          <a
            href="tel:+442078454032"
            className="inline-flex items-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
          >
            <PhoneIcon className="w-5 h-5 mr-2" />
            {language === 'pt' ? 'Ligar Agora' : 'Call Now'}
          </a>
        </div>
        
        <div className="mt-6 text-sm opacity-75">
          <p>partnerships@lusotown.com • +44 (0) 20 7845 4032</p>
          <p>
            {language === 'pt' 
              ? 'Resposta garantida em 24 horas para todas as consultas de parceria'
              : 'Guaranteed 24-hour response for all partnership inquiries'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CorporatePartnershipProgram