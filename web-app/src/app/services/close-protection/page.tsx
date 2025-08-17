'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  EyeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { Shield, Award, Users, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import FrameworkPillars from '@/components/FrameworkPillars';
import SubscriptionGate from '@/components/SubscriptionGate';
import TrustBadges from '@/components/TrustBadges';

// Close Protection specific trust indicators
const trustIndicators = [
  {
    name: 'SIA Licensed CPOs',
    namePortuguese: 'CPOs Licenciados SIA',
    description: 'Security Industry Authority certified Close Protection Operatives',
    descriptionPortuguese: 'Operativos de Proteção Pessoal certificados pela Autoridade da Indústria de Segurança',
    icon: Shield,
    verified: true
  },
  {
    name: 'Cultural Expertise',
    namePortuguese: 'Especialização Cultural',
    description: 'Portuguese cultural sensitivity and business protocol training',
    descriptionPortuguese: 'Sensibilidade cultural portuguesa e formação em protocolo empresarial',
    icon: Users,
    verified: true
  },
  {
    name: '24/7 Operations',
    namePortuguese: 'Operações 24/7',
    description: 'Round-the-clock protection services and emergency response',
    descriptionPortuguese: 'Serviços de proteção 24 horas e resposta de emergência',
    icon: Clock,
    verified: true
  },
  {
    name: '£10M+ Insurance',
    namePortuguese: '£10M+ Seguro',
    description: 'Comprehensive professional liability and public indemnity coverage',
    descriptionPortuguese: 'Cobertura abrangente de responsabilidade profissional e indenização pública',
    icon: ShieldCheckIcon,
    verified: true
  }
];

// Service packages
const servicePackages = [
  {
    id: 'discrete-protection',
    name: 'Discrete Protection',
    namePortuguese: 'Proteção Discreta',
    price: 800,
    priceUnit: 'day',
    priceUnitPortuguese: 'dia',
    description: 'Professional close protection with cultural awareness',
    descriptionPortuguese: 'Proteção pessoal profissional com consciência cultural',
    features: [
      'Single SIA-licensed CPO',
      'Portuguese cultural expertise',
      'Business environment integration',
      'Risk assessment included',
      'Discrete professional presence',
      'Emergency response protocols'
    ],
    featuresPortuguese: [
      'CPO único licenciado SIA',
      'Especialização cultural portuguesa',
      'Integração em ambiente empresarial',
      'Avaliação de risco incluída',
      'Presença profissional discreta',
      'Protocolos de resposta de emergência'
    ],
    popular: true
  },
  {
    id: 'executive-protection',
    name: 'Executive Protection',
    namePortuguese: 'Proteção Executiva',
    price: 1200,
    priceUnit: 'day',
    priceUnitPortuguese: 'dia',
    description: 'Enhanced protection for high-profile individuals',
    descriptionPortuguese: 'Proteção aprimorada para indivíduos de alto perfil',
    features: [
      'Lead CPO + support operative',
      'Advance reconnaissance team',
      'Secure transportation coordination',
      'Digital security assessment',
      'Event security planning',
      'VIP protocol management'
    ],
    featuresPortuguese: [
      'CPO principal + operativo de apoio',
      'Equipe de reconhecimento avançado',
      'Coordenação de transporte seguro',
      'Avaliação de segurança digital',
      'Planejamento de segurança de eventos',
      'Gestão de protocolo VIP'
    ],
    premium: true
  },
  {
    id: 'family-protection',
    name: 'Family Protection',
    namePortuguese: 'Proteção Familiar',
    price: 1000,
    priceUnit: 'day',
    priceUnitPortuguese: 'dia',
    description: 'Comprehensive family security services',
    descriptionPortuguese: 'Serviços abrangentes de segurança familiar',
    features: [
      'Family-focused security protocols',
      'School and activity coordination',
      'Portuguese cultural integration',
      'Child protection specialists',
      'Emergency evacuation planning',
      'Residential security assessment'
    ],
    featuresPortuguese: [
      'Protocolos de segurança focados na família',
      'Coordenação escolar e de atividades',
      'Integração cultural portuguesa',
      'Especialistas em proteção infantil',
      'Planeamento de evacuação de emergência',
      'Avaliação de segurança residencial'
    ]
  }
];

// Case studies specific to close protection
const caseStudies = [
  {
    id: 'diplomatic-protection',
    title: 'Portuguese Diplomatic Mission',
    titlePortuguese: 'Missão Diplomática Portuguesa',
    client: 'Consulado-Geral de Portugal',
    clientPortuguese: 'Consulado-Geral de Portugal',
    challenge: 'Secure diplomatic event with 200+ attendees and high-profile speakers',
    challengePortuguese: 'Evento diplomático seguro com 200+ participantes e oradores de alto perfil',
    solution: 'Integrated close protection with venue security and cultural protocol management',
    solutionPortuguese: 'Proteção pessoal integrada com segurança do local e gestão de protocolo cultural',
    result: 'Zero security incidents, seamless protocol execution, commendation letter received',
    resultPortuguese: 'Zero incidentes de segurança, execução de protocolo perfeita, carta de elogio recebida',
    investment: '£25,000',
    duration: '3 days'
  },
  {
    id: 'corporate-executive',
    title: 'Tech CEO London Tour',
    titlePortuguese: 'Tour de CEO de Tecnologia em Londres',
    client: 'Portuguese Unicorn Startup',
    clientPortuguese: 'Startup Unicórnio Portuguesa',
    challenge: 'High-visibility CEO with security concerns during London expansion meetings',
    challengePortuguese: 'CEO de alta visibilidade com preocupações de segurança durante reuniões de expansão em Londres',
    solution: 'Discrete executive protection with business intelligence and cultural briefings',
    solutionPortuguese: 'Proteção executiva discreta com inteligência empresarial e briefings culturais',
    result: 'Successful expansion launch, £50M funding secured, ongoing protection contract',
    resultPortuguese: 'Lançamento de expansão bem-sucedido, £50M de financiamento garantido, contrato de proteção contínuo',
    investment: '£18,000',
    duration: '5 days'
  }
];

export default function CloseProtectionPage() {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';
  const [activeFramework, setActiveFramework] = useState('planning');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false);

  const handleBookService = (packageId: string) => {
    const hasSubscription = localStorage.getItem('lusotown-subscription') === 'active';
    
    if (!hasSubscription) {
      setShowSubscriptionGate(true);
      return;
    }

    setSelectedPackage(packageId);
    window.location.href = `/services/close-protection/booking?package=${packageId}`;
  };

  const handleCloseSubscriptionGate = () => {
    setShowSubscriptionGate(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-premium-50 via-white to-premium-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-premium-100 text-premium-700 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Proteção Premium' : 'Premium Protection'}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? (
                  <>
                    Proteção Pessoal <br />
                    <span className="text-premium-600">de Elite</span> em Londres
                  </>
                ) : (
                  <>
                    Elite Close Protection <br />
                    <span className="text-premium-600">Services</span> in London
                  </>
                )}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {isPortuguese
                  ? 'Operativos de proteção pessoal licenciados SIA com especialização cultural portuguesa, fornecendo segurança discreta e profissional para indivíduos e famílias de alto perfil.'
                  : 'SIA-licensed Close Protection Operatives with Portuguese cultural expertise, providing discrete and professional security for high-profile individuals and families.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-premium-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-premium-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isPortuguese ? 'Ver Serviços' : 'View Services'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-premium-600 text-premium-600 px-8 py-4 rounded-xl font-semibold hover:bg-premium-600 hover:text-white transition-all duration-200"
                >
                  {isPortuguese ? 'Nossa Metodologia' : 'Our Methodology'}
                </motion.button>
              </div>
            </motion.div>

            {/* Key Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-600 mb-2">100+</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Operações Seguras' : 'Secure Operations'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">0</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Incidentes de Segurança' : 'Security Incidents'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Disponibilidade' : 'Availability'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-action-600 mb-2">£10M+</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Cobertura de Seguro' : 'Insurance Coverage'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges trustIndicators={trustIndicators} isPortuguese={isPortuguese} />

      {/* Seven Piece Framework Section */}
      <section id="framework" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese ? 'Nossa Metodologia de Excelência' : 'Our Excellence Methodology'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {isPortuguese
                  ? 'O Framework dos 7 Ps define o padrão de ouro para serviços de proteção pessoal premium, garantindo excelência operacional em cada aspecto do nosso trabalho.'
                  : 'The 7 Ps Framework defines the gold standard for premium close protection services, ensuring operational excellence in every aspect of our work.'
                }
              </p>
            </motion.div>
          </div>

          <FrameworkPillars 
            activeFramework={activeFramework} 
            setActiveFramework={setActiveFramework} 
          />
        </div>
      </section>

      {/* Service Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Pacotes de Proteção' : 'Protection Packages'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Soluções de proteção personalizadas projetadas para diferentes necessidades e perfis de risco'
                : 'Tailored protection solutions designed for different needs and risk profiles'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'border-premium-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-premium-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {isPortuguese ? 'Mais Popular' : 'Most Popular'}
                    </span>
                  </div>
                )}

                {pkg.premium && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {isPortuguese ? 'Premium' : 'Premium'}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isPortuguese ? pkg.namePortuguese : pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isPortuguese ? pkg.descriptionPortuguese : pkg.description}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-premium-600">£{pkg.price}</span>
                    <span className="text-gray-500 ml-2">
                      /{isPortuguese ? pkg.priceUnitPortuguese : pkg.priceUnit}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {(isPortuguese ? pkg.featuresPortuguese : pkg.features).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-premium-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookService(pkg.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-premium-600 text-white hover:bg-premium-700'
                      : 'border-2 border-premium-600 text-premium-600 hover:bg-premium-600 hover:text-white'
                  }`}
                >
                  {isPortuguese ? 'Reservar Agora' : 'Book Now'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Casos de Sucesso' : 'Success Stories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Operações de proteção bem-sucedidas demonstrando nossa excelência e expertise'
                : 'Successful protection operations demonstrating our excellence and expertise'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPortuguese ? study.titlePortuguese : study.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{study.duration}</span>
                    <span className="text-lg font-bold text-premium-600">{study.investment}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Cliente' : 'Client'}
                    </span>
                    <p className="text-gray-900 font-medium">
                      {isPortuguese ? study.clientPortuguese : study.client}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Desafio' : 'Challenge'}
                    </span>
                    <p className="text-gray-700">
                      {isPortuguese ? study.challengePortuguese : study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Solução' : 'Solution'}
                    </span>
                    <p className="text-gray-700">
                      {isPortuguese ? study.solutionPortuguese : study.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Resultado' : 'Result'}
                    </span>
                    <p className="text-gray-700 font-medium">
                      {isPortuguese ? study.resultPortuguese : study.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-premium-600 to-premium-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isPortuguese 
                ? 'Precisa de Proteção Profissional?'
                : 'Need Professional Protection?'
              }
            </h2>
            <p className="text-xl text-premium-100 mb-8">
              {isPortuguese
                ? 'Contacte os nossos especialistas para uma consulta de segurança personalizada'
                : 'Contact our specialists for a personalized security consultation'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookService('consultation')}
                className="bg-white text-premium-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                {isPortuguese ? 'Consulta Gratuita' : 'Free Consultation'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-premium-600 transition-all duration-200"
              >
                {isPortuguese ? 'Contactar' : 'Contact Us'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Gate Modal */}
      {showSubscriptionGate && (
        <SubscriptionGate
          onClose={handleCloseSubscriptionGate}
          onSubscribe={() => {
            localStorage.setItem('lusotown-subscription', 'active');
            setShowSubscriptionGate(false);
            if (selectedPackage) {
              window.location.href = `/services/close-protection/booking?package=${selectedPackage}`;
            }
          }}
          isPortuguese={isPortuguese}
        />
      )}

      <Footer />
    </div>
  );
}