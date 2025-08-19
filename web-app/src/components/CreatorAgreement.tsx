'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  DollarSign, 
  Shield, 
  Clock, 
  Globe,
  Check,
  AlertTriangle,
  Crown,
  Heart,
  Star
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface CreatorAgreementProps {
  onAccept: () => void
  onDecline: () => void
  isVisible: boolean
}

export default function CreatorAgreement({ onAccept, onDecline, isVisible }: CreatorAgreementProps) {
  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState('revenue')
  
  const isPt = language === 'pt'

  const agreementSections = [
    {
      id: 'revenue',
      title: isPt ? 'Divisão de Receitas' : 'Revenue Split',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 'content',
      title: isPt ? 'Política de Conteúdo' : 'Content Policy',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      id: 'payments',
      title: isPt ? 'Pagamentos' : 'Payments',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      id: 'community',
      title: isPt ? 'Diretrizes da Comunidade' : 'Community Guidelines',
      icon: Heart,
      color: 'text-red-600'
    }
  ]

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">
                {isPt ? 'Acordo do Criador LusoTown' : 'LusoTown Creator Agreement'}
              </h2>
              <p className="text-primary-100">
                {isPt 
                  ? 'Termos e condições do programa de criadores'
                  : 'Creator program terms and conditions'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {agreementSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className={`w-5 h-5 ${
                    activeSection === section.id ? 'text-primary-600' : section.color
                  }`} />
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>

            {/* Key Highlights */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">
                {isPt ? 'Destaques' : 'Key Highlights'}
              </h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  <span>{isPt ? '85% das receitas' : '85% revenue share'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  <span>{isPt ? 'Pagamentos mensais' : 'Monthly payments'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  <span>{isPt ? 'Apoio 24/7' : '24/7 support'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  <span>{isPt ? 'Sem taxas ocultas' : 'No hidden fees'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Revenue Split Section */}
            {activeSection === 'revenue' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Divisão de Receitas 85/15' : '85/15 Revenue Split'}
                  </h3>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {isPt ? 'O que isto significa para si:' : 'What this means for you:'}
                  </h4>
                  <ul className="space-y-2 text-green-700">
                    <li>
                      {isPt 
                        ? '• Receberá 85% de todas as doações, gorjetas e subscrições'
                        : '• You receive 85% of all donations, tips, and subscriptions'
                      }
                    </li>
                    <li>
                      {isPt 
                        ? '• LusoTown fica com apenas 15% para manter a plataforma'
                        : '• LusoTown keeps only 15% to maintain the platform'
                      }
                    </li>
                    <li>
                      {isPt 
                        ? '• Workshops e eventos personalizados: 85% para o criador'
                        : '• Custom workshops and events: 85% to creator'
                      }
                    </li>
                    <li>
                      {isPt 
                        ? '• Patrocínios futuros: 70% para o criador, 30% para a plataforma'
                        : '• Future sponsorships: 70% to creator, 30% to platform'
                      }
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {isPt ? 'Exemplo de Ganhos' : 'Earnings Example'}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>{isPt ? 'Total recebido:' : 'Total received:'}</span>
                        <span className="font-medium">£100</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>{isPt ? 'Seus ganhos (85%):' : 'Your earnings (85%):'}</span>
                        <span className="font-bold">£85</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>{isPt ? 'Taxa da plataforma (15%):' : 'Platform fee (15%):'}</span>
                        <span>£15</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {isPt ? 'O que inclui a nossa taxa:' : 'What our fee includes:'}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {isPt ? 'Processamento de pagamentos' : 'Payment processing'}</li>
                      <li>• {isPt ? 'Hosting e streaming' : 'Hosting and streaming'}</li>
                      <li>• {isPt ? 'Apoio técnico 24/7' : '24/7 technical support'}</li>
                      <li>• {isPt ? 'Ferramentas de criador' : 'Creator tools'}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Content Policy Section */}
            {activeSection === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Política de Conteúdo' : 'Content Policy'}
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {isPt ? 'Conteúdo Encorajado:' : 'Encouraged Content:'}
                  </h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• {isPt ? 'Cultura portuguesa autêntica' : 'Authentic Portuguese culture'}</li>
                    <li>• {isPt ? 'Aulas e workshops educativos' : 'Educational classes and workshops'}</li>
                    <li>• {isPt ? 'Música, culinária e tradições' : 'Music, cooking, and traditions'}</li>
                    <li>• {isPt ? 'Conversas em português/inglês' : 'Portuguese/English conversations'}</li>
                    <li>• {isPt ? 'Eventos comunitários' : 'Community events'}</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {isPt ? 'Conteúdo Proibido:' : 'Prohibited Content:'}
                  </h4>
                  <ul className="space-y-1 text-red-700">
                    <li>• {isPt ? 'Conteúdo sexualmente explícito' : 'Sexually explicit content'}</li>
                    <li>• {isPt ? 'Discurso de ódio ou discriminação' : 'Hate speech or discrimination'}</li>
                    <li>• {isPt ? 'Violência ou ameaças' : 'Violence or threats'}</li>
                    <li>• {isPt ? 'Conteúdo ilegal' : 'Illegal content'}</li>
                    <li>• {isPt ? 'Spam ou fraude' : 'Spam or fraud'}</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">
                        {isPt ? 'Sistema de Moderação' : 'Moderation System'}
                      </h4>
                      <p className="text-yellow-700 text-sm">
                        {isPt 
                          ? 'Todos os streams são monitorizados para garantir a segurança da comunidade. Violações podem resultar em suspensão.'
                          : 'All streams are monitored to ensure community safety. Violations may result in suspension.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payments Section */}
            {activeSection === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Pagamentos e Processamento' : 'Payments and Processing'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3">
                      {isPt ? 'Cronograma de Pagamentos' : 'Payment Schedule'}
                    </h4>
                    <div className="space-y-2 text-purple-700 text-sm">
                      <div className="flex justify-between">
                        <span>{isPt ? 'Período de pagamento:' : 'Payment period:'}</span>
                        <span className="font-medium">{isPt ? 'Mensal' : 'Monthly'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{isPt ? 'Data de processamento:' : 'Processing date:'}</span>
                        <span className="font-medium">{isPt ? '5º dia útil' : '5th business day'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{isPt ? 'Valor mínimo:' : 'Minimum amount:'}</span>
                        <span className="font-medium">£10</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">
                      {isPt ? 'Métodos de Pagamento' : 'Payment Methods'}
                    </h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• {isPt ? 'Transferência bancária (Reino Unido/EU)' : 'Bank transfer (UK/EU)'}</li>
                      <li>• PayPal</li>
                      <li>• {isPt ? 'Transferência internacional' : 'International wire'}</li>
                      <li>• {isPt ? 'Pagamentos em múltiplas moedas' : 'Multi-currency payments'}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {isPt ? 'Impostos e Conformidade' : 'Taxes and Compliance'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {isPt 
                      ? 'É responsável pelos seus próprios impostos e obrigações fiscais. Forneceremos relatórios anuais para facilitar a declaração fiscal.'
                      : 'You are responsible for your own taxes and fiscal obligations. We will provide annual reports to facilitate tax filing.'
                    }
                  </p>
                </div>
              </motion.div>
            )}

            {/* Community Guidelines Section */}
            {activeSection === 'community' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Diretrizes da Comunidade' : 'Community Guidelines'}
                  </h3>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {isPt ? 'Nossos Valores:' : 'Our Values:'}
                  </h4>
                  <ul className="space-y-1 text-red-700">
                    <li>• {isPt ? 'Respeito pela diversidade cultural portuguesa' : 'Respect for Portuguese cultural diversity'}</li>
                    <li>• {isPt ? 'Inclusão de todas as idades e backgrounds' : 'Inclusion of all ages and backgrounds'}</li>
                    <li>• {isPt ? 'Autenticidade cultural' : 'Cultural authenticity'}</li>
                    <li>• {isPt ? 'Apoio mútuo entre criadores' : 'Mutual support among creators'}</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {isPt ? 'Expectativas para Criadores:' : 'Expectations for Creators:'}
                  </h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• {isPt ? 'Trate todos os espectadores com respeito' : 'Treat all viewers with respect'}</li>
                    <li>• {isPt ? 'Crie conteúdo familiar-friendly' : 'Create family-friendly content'}</li>
                    <li>• {isPt ? 'Responda a comentários e mensagens' : 'Respond to comments and messages'}</li>
                    <li>• {isPt ? 'Mantenha horários regulares quando possível' : 'Maintain regular schedules when possible'}</li>
                    <li>• {isPt ? 'Participe em eventos da comunidade' : 'Participate in community events'}</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    {isPt ? 'Programa de Embaixadores' : 'Ambassador Program'}
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    {isPt 
                      ? 'Criadores destacados podem ser convidados para o programa de embaixadores, com benefícios adicionais incluindo maior divisão de receitas e acesso prioritário a novas funcionalidades.'
                      : 'Outstanding creators may be invited to the ambassador program, with additional benefits including higher revenue split and priority access to new features.'
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>
                {isPt 
                  ? 'Acordo válido em toda a União Europeia e Reino Unido'
                  : 'Agreement valid throughout European Union and United Kingdom'
                }
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onDecline}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {isPt ? 'Recusar' : 'Decline'}
              </button>
              <button
                onClick={onAccept}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                {isPt ? 'Aceitar e Continuar' : 'Accept and Continue'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}