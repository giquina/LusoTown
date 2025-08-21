'use client';

import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { Shield, Clock, Phone, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function BookingConfirmationPage() {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const nextSteps = [
    {
      title: isPortuguese ? 'Confirmação Recebida' : 'Confirmation Received',
      titlePortuguese: 'Confirmação Recebida',
      description: isPortuguese 
        ? 'Sua solicitação foi recebida e está sendo processada pela nossa equipe'
        : 'Your request has been received and is being processed by our team',
      descriptionPortuguese: 'Sua solicitação foi recebida e está sendo processada pela nossa equipe',
      icon: CheckCircleIcon,
      completed: true,
      timeframe: isPortuguese ? 'Agora' : 'Now'
    },
    {
      title: isPortuguese ? 'Avaliação de Segurança' : 'Security Assessment',
      titlePortuguese: 'Avaliação de Segurança',
      description: isPortuguese
        ? 'Nossa equipe realizará uma avaliação inicial de segurança baseada nas suas necessidades'
        : 'Our team will conduct an initial security assessment based on your requirements',
      descriptionPortuguese: 'Nossa equipe realizará uma avaliação inicial de segurança baseada nas suas necessidades',
      icon: DocumentCheckIcon,
      completed: false,
      timeframe: isPortuguese ? '2-4 horas' : '2-4 hours'
    },
    {
      title: isPortuguese ? 'Consulta de Segurança' : 'Security Consultation',
      titlePortuguese: 'Consulta de Segurança',
      description: isPortuguese
        ? 'Consulta detalhada via telefone ou presencial para discutir requisitos específicos'
        : 'Detailed consultation via phone or in-person to discuss specific requirements',
      descriptionPortuguese: 'Consulta detalhada via telefone ou presencial para discutir requisitos específicos',
      icon: PhoneIcon,
      completed: false,
      timeframe: isPortuguese ? '24 horas' : '24 hours'
    },
    {
      title: isPortuguese ? 'Proposta Personalizada' : 'Customized Proposal',
      titlePortuguese: 'Proposta Personalizada',
      description: isPortuguese
        ? 'Receba uma proposta detalhada com cronograma, equipe e investimento'
        : 'Receive a detailed proposal with timeline, team assignment, and investment',
      descriptionPortuguese: 'Receba uma proposta detalhada com cronograma, equipe e investimento',
      icon: EnvelopeIcon,
      completed: false,
      timeframe: isPortuguese ? '48 horas' : '48 hours'
    }
  ];

  const emergencyContact = {
    phone: '+44 20 7946 0958',
    email: 'security@lusotown.com'
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 to-premium-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircleIcon className="w-8 h-8 text-action-600" />
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Solicitação Confirmada!' : 'Request Confirmed!'}
              </h1>
              
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
                {isPortuguese
                  ? 'Obrigado por escolher nossos serviços de proteção pessoal premium. Nossa equipe entrará em contato em breve.'
                  : 'Thank you for choosing our premium close protection services. Our team will be in touch shortly.'
                }
              </p>

              <div className="inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md">
                <span className="text-sm text-secondary-600 mr-2">
                  {isPortuguese ? 'Referência:' : 'Reference:'}
                </span>
                <span className="font-mono font-semibold text-premium-600">
                  CP-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 10000)).padStart(4, '0')}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Próximos Passos' : 'Next Steps'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isPortuguese
                ? 'Aqui está o que acontece a seguir no processo de consulta de segurança'
                : 'Here\'s what happens next in the security consultation process'
              }
            </p>
          </div>

          <div className="space-y-8">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-6 ${
                  step.completed ? 'bg-green-100' : 'bg-secondary-100'
                }`}>
                  <step.icon className={`w-6 h-6 ${
                    step.completed ? 'text-action-600' : 'text-secondary-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      step.completed ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {isPortuguese ? step.titlePortuguese : step.title}
                    </h3>
                    <span className="text-sm text-gray-500 font-medium">
                      {step.timeframe}
                    </span>
                  </div>
                  <p className="text-secondary-600">
                    {isPortuguese ? step.descriptionPortuguese : step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Contato de Emergência' : 'Emergency Contact'}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Precisa de Assistência Imediata?' : 'Need Immediate Assistance?'}
              </h2>
              
              <p className="text-secondary-600 mb-6">
                {isPortuguese
                  ? 'Para situações urgentes de segurança, contacte-nos diretamente'
                  : 'For urgent security situations, contact us directly'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href={`tel:${emergencyContact.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-6 border-2 border-premium-200 rounded-xl hover:border-premium-500 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 bg-premium-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-premium-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {isPortuguese ? 'Chamada de Emergência' : 'Emergency Call'}
                  </div>
                  <div className="font-semibold text-gray-900">{emergencyContact.phone}</div>
                  <div className="text-sm text-secondary-600">
                    {isPortuguese ? 'Disponível 24/7' : 'Available 24/7'}
                  </div>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${emergencyContact.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-6 border-2 border-premium-200 rounded-xl hover:border-premium-500 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 bg-premium-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-premium-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {isPortuguese ? 'Email de Segurança' : 'Security Email'}
                  </div>
                  <div className="font-semibold text-gray-900">{emergencyContact.email}</div>
                  <div className="text-sm text-secondary-600">
                    {isPortuguese ? 'Resposta rápida' : 'Fast response'}
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-premium-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Informações Importantes' : 'Important Information'}
            </h3>
            
            <div className="space-y-4 text-secondary-700">
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-premium-600 mt-0.5 mr-3 flex-shrink-0" />
                <span>
                  {isPortuguese
                    ? 'Todas as consultas são confidenciais e protegidas por acordos de não divulgação'
                    : 'All consultations are confidential and protected by non-disclosure agreements'
                  }
                </span>
              </div>
              
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-premium-600 mt-0.5 mr-3 flex-shrink-0" />
                <span>
                  {isPortuguese
                    ? 'Nossos operativos são licenciados SIA e especializados em protocolo empresarial português'
                    : 'Our operatives are SIA-licensed and specialized in Portuguese business protocol'
                  }
                </span>
              </div>
              
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-premium-600 mt-0.5 mr-3 flex-shrink-0" />
                <span>
                  {isPortuguese
                    ? 'Cobertura de seguro de £10M+ incluída em todos os serviços'
                    : '£10M+ insurance coverage included with all services'
                  }
                </span>
              </div>
              
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-premium-600 mt-0.5 mr-3 flex-shrink-0" />
                <span>
                  {isPortuguese
                    ? 'Serviços disponíveis em Londres e em todo o Reino Unido'
                    : 'Services available in London and throughout the UK'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}