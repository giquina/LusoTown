'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Flag, 
  Ban, 
  Eye, 
  Lock, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Info,
  Heart,
  Users,
  Camera,
  MapPin
} from 'lucide-react'

export default function SafetyCenter() {
  const { language } = useLanguage()
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    evidence: ''
  })
  const [showReportForm, setShowReportForm] = useState(false)

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock report submission
    setShowReportForm(false)
    setReportForm({ type: '', description: '', evidence: '' })
    // Show success message
  }

  const translations = {
    en: {
      title: 'Safety & Security Center',
      subtitle: 'Your safety is our priority in the Portuguese community',
      
      sections: {
        guidelines: {
          title: 'Community Safety Guidelines',
          items: [
            'Always meet in public places for first meetings',
            'Never share personal financial information',
            'Trust your instincts - if something feels wrong, it probably is',
            'Keep conversations on the platform initially',
            'Verify identity through video calls before meeting',
            'Let friends or family know about your plans',
            'Report suspicious behavior immediately',
            'Respect cultural boundaries and Portuguese traditions'
          ]
        },
        
        features: {
          title: 'Safety Features',
          verification: {
            title: 'Profile Verification',
            description: 'All premium members undergo identity verification using government ID and Portuguese community references.'
          },
          reporting: {
            title: 'Easy Reporting',
            description: 'Report inappropriate behavior, fake profiles, or safety concerns with one click.'
          },
          blocking: {
            title: 'Block & Hide',
            description: 'Block users and hide your profile from specific people instantly.'
          },
          privacy: {
            title: 'Privacy Controls',
            description: 'Control who can see your profile, photos, and contact information.'
          },
          support: {
            title: '24/7 Portuguese Support',
            description: 'Our Portuguese-speaking safety team is available around the clock.'
          },
          meetings: {
            title: 'Safe Meeting Places',
            description: 'Recommended public venues in London for safe first meetings.'
          }
        },
        
        report: {
          title: 'Report a Safety Concern',
          description: 'Help us keep the Portuguese community safe by reporting any concerns.',
          types: {
            inappropriate: 'Inappropriate behavior or messages',
            fake: 'Fake or suspicious profile',
            harassment: 'Harassment or bullying',
            scam: 'Financial scam or fraud',
            offline: 'Concerning offline behavior',
            other: 'Other safety concern'
          },
          form: {
            type: 'Type of concern',
            description: 'Describe what happened',
            evidence: 'Additional evidence (optional)',
            submit: 'Submit Report',
            cancel: 'Cancel'
          }
        },
        
        resources: {
          title: 'Safety Resources',
          emergency: {
            title: 'Emergency Contacts',
            police: 'UK Police: 999',
            support: 'Portuguese Community Support: +44 20 7946 0958',
            helpline: 'National Domestic Violence Helpline: 0808 2000 247',
            mental: 'Mental Health Crisis: 116 123 (Samaritans)'
          },
          tips: {
            title: 'Meeting Safety Tips',
            items: [
              'Choose busy, public locations like cafés or restaurants',
              'Drive yourself or use public transport',
              'Tell a friend where you\'re going and when to expect you back',
              'Keep your phone charged and accessible',
              'Meet during daylight hours when possible',
              'Trust Portuguese community members\' recommendations for venues',
              'Consider group activities for first meetings',
              'Avoid isolated locations like parks or private homes'
            ]
          }
        }
      },
      
      buttons: {
        reportConcern: 'Report a Concern',
        viewGuidelines: 'View Safety Guidelines',
        contactSupport: 'Contact Support',
        emergencyHelp: 'Emergency Help'
      }
    },
    
    pt: {
      title: 'Centro de Segurança e Proteção',
      subtitle: 'A sua segurança é a nossa prioridade na comunidade portuguesa',
      
      sections: {
        guidelines: {
          title: 'Diretrizes de Segurança da Comunidade',
          items: [
            'Encontre-se sempre em locais públicos nos primeiros encontros',
            'Nunca partilhe informações financeiras pessoais',
            'Confie no seu instinto - se algo parece errado, provavelmente está',
            'Mantenha as conversas na plataforma inicialmente',
            'Verifique a identidade através de videochamadas antes de se encontrar',
            'Informe amigos ou família sobre os seus planos',
            'Reporte comportamento suspeito imediatamente',
            'Respeite as fronteiras culturais e tradições portuguesas'
          ]
        },
        
        features: {
          title: 'Funcionalidades de Segurança',
          verification: {
            title: 'Verificação de Perfil',
            description: 'Todos os membros premium passam por verificação de identidade usando documento oficial e referências da comunidade portuguesa.'
          },
          reporting: {
            title: 'Denúncia Fácil',
            description: 'Denuncie comportamento inadequado, perfis falsos ou preocupações de segurança com um clique.'
          },
          blocking: {
            title: 'Bloquear e Ocultar',
            description: 'Bloqueie utilizadores e oculte o seu perfil de pessoas específicas instantaneamente.'
          },
          privacy: {
            title: 'Controlos de Privacidade',
            description: 'Controle quem pode ver o seu perfil, fotos e informações de contacto.'
          },
          support: {
            title: 'Suporte Português 24/7',
            description: 'A nossa equipa de segurança falante de português está disponível 24 horas.'
          },
          meetings: {
            title: 'Locais Seguros de Encontro',
            description: 'Locais públicos recomendados em Londres para primeiros encontros seguros.'
          }
        },
        
        report: {
          title: 'Reportar uma Preocupação de Segurança',
          description: 'Ajude-nos a manter a comunidade portuguesa segura reportando qualquer preocupação.',
          types: {
            inappropriate: 'Comportamento ou mensagens inadequadas',
            fake: 'Perfil falso ou suspeito',
            harassment: 'Assédio ou bullying',
            scam: 'Burla financeira ou fraude',
            offline: 'Comportamento preocupante offline',
            other: 'Outra preocupação de segurança'
          },
          form: {
            type: 'Tipo de preocupação',
            description: 'Descreva o que aconteceu',
            evidence: 'Evidência adicional (opcional)',
            submit: 'Enviar Denúncia',
            cancel: 'Cancelar'
          }
        },
        
        resources: {
          title: 'Recursos de Segurança',
          emergency: {
            title: 'Contactos de Emergência',
            police: 'Polícia do Reino Unido: 999',
            support: 'Suporte Comunidade Portuguesa: +44 20 7946 0958',
            helpline: 'Linha de Apoio Violência Doméstica: 0808 2000 247',
            mental: 'Crise de Saúde Mental: 116 123 (Samaritans)'
          },
          tips: {
            title: 'Dicas de Segurança para Encontros',
            items: [
              'Escolha locais públicos movimentados como cafés ou restaurantes',
              'Conduza você mesmo ou use transporte público',
              'Informe um amigo onde vai e quando esperar o seu regresso',
              'Mantenha o telefone carregado e acessível',
              'Encontre-se durante o dia quando possível',
              'Confie nas recomendações de locais da comunidade portuguesa',
              'Considere atividades em grupo para primeiros encontros',
              'Evite locais isolados como parques ou casas privadas'
            ]
          }
        }
      },
      
      buttons: {
        reportConcern: 'Reportar Preocupação',
        viewGuidelines: 'Ver Diretrizes de Segurança',
        contactSupport: 'Contactar Suporte',
        emergencyHelp: 'Ajuda de Emergência'
      }
    }
  }

  const t = translations[language]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-secondary-600" />
          <h2 className="text-2xl font-bold text-secondary-900">{t.title}</h2>
        </div>
        <p className="text-secondary-600">{t.subtitle}</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <button
          onClick={() => setShowReportForm(true)}
          className="bg-action-50 text-action-700 p-4 rounded-xl text-center hover:bg-action-100 transition-colors"
        >
          <Flag className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{t.buttons.reportConcern}</span>
        </button>
        
        <button className="bg-secondary-50 text-secondary-700 p-4 rounded-xl text-center hover:bg-secondary-100 transition-colors">
          <Info className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{t.buttons.viewGuidelines}</span>
        </button>
        
        <button className="bg-primary-50 text-primary-700 p-4 rounded-xl text-center hover:bg-primary-100 transition-colors">
          <MessageCircle className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{t.buttons.contactSupport}</span>
        </button>
        
        <button className="bg-coral-50 text-coral-700 p-4 rounded-xl text-center hover:bg-coral-100 transition-colors">
          <Phone className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{t.buttons.emergencyHelp}</span>
        </button>
      </motion.div>

      {/* Safety Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-secondary-900">{t.sections.features.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: CheckCircle,
              title: t.sections.features.verification.title,
              description: t.sections.features.verification.description,
              color: 'secondary'
            },
            {
              icon: Flag,
              title: t.sections.features.reporting.title,
              description: t.sections.features.reporting.description,
              color: 'action'
            },
            {
              icon: Ban,
              title: t.sections.features.blocking.title,
              description: t.sections.features.blocking.description,
              color: 'neutral'
            },
            {
              icon: Eye,
              title: t.sections.features.privacy.title,
              description: t.sections.features.privacy.description,
              color: 'primary'
            },
            {
              icon: MessageCircle,
              title: t.sections.features.support.title,
              description: t.sections.features.support.description,
              color: 'coral'
            },
            {
              icon: MapPin,
              title: t.sections.features.meetings.title,
              description: t.sections.features.meetings.description,
              color: 'accent'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100"
            >
              <feature.icon className={`h-8 w-8 text-${feature.color}-600 mb-4`} />
              <h4 className="font-semibold text-secondary-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-secondary-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100"
      >
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">{t.sections.guidelines.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.sections.guidelines.items.map((guideline, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-secondary-700">{guideline}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Emergency Contacts */}
        <div className="bg-coral-50 p-6 rounded-xl border border-coral-200">
          <h3 className="text-lg font-semibold text-coral-900 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            {t.sections.resources.emergency.title}
          </h3>
          <div className="space-y-3">
            <div>
              <div className="font-medium text-coral-800">{t.sections.resources.emergency.police}</div>
            </div>
            <div>
              <div className="font-medium text-coral-800">{t.sections.resources.emergency.support}</div>
            </div>
            <div>
              <div className="font-medium text-coral-800">{t.sections.resources.emergency.helpline}</div>
            </div>
            <div>
              <div className="font-medium text-coral-800">{t.sections.resources.emergency.mental}</div>
            </div>
          </div>
        </div>

        {/* Meeting Safety Tips */}
        <div className="bg-secondary-50 p-6 rounded-xl border border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t.sections.resources.tips.title}
          </h3>
          <div className="space-y-2">
            {t.sections.resources.tips.items.slice(0, 4).map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-600 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-secondary-800">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Report Form Modal */}
      {showReportForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              {t.sections.report.title}
            </h3>
            <p className="text-sm text-secondary-600 mb-6">
              {t.sections.report.description}
            </p>
            
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t.sections.report.form.type}
                </label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a type</option>
                  {Object.entries(t.sections.report.types).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t.sections.report.form.description}
                </label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t.sections.report.form.evidence}
                </label>
                <textarea
                  value={reportForm.evidence}
                  onChange={(e) => setReportForm(prev => ({ ...prev, evidence: e.target.value }))}
                  className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={2}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 bg-secondary-100 text-secondary-700 py-2 px-4 rounded-lg font-medium hover:bg-secondary-200 transition-colors"
                >
                  {t.sections.report.form.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-action-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-action-700 transition-colors"
                >
                  {t.sections.report.form.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}