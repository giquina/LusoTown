"use client";

import { motion } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  UserIcon,
  AcademicCapIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface FrameworkPillarsProps {
  activeFramework: string;
  setActiveFramework: (framework: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FrameworkPillars({ activeFramework, setActiveFramework }: FrameworkPillarsProps) {
  const { language, t } = useLanguage();

  const frameworkPillars = [
    {
      id: "planning",
      name: t('framework.pillars.planning.name', 'Planning'),
      namePortuguese: 'Planejamento',
      icon: ClipboardDocumentListIcon,
      color: "primary",
      description: t('framework.pillars.planning.description', 'Comprehensive advance reconnaissance and logistics coordination'),
      descriptionPortuguese: 'Reconhecimento avançado abrangente e coordenação logística',
      details: {
        en: [
          "Detailed route planning and venue reconnaissance",
          "Threat assessment and risk analysis protocols",
          "Coordination with local authorities and venues",
          "Contingency planning for multiple scenarios",
          "Cultural and business context integration"
        ],
        pt: [
          "Planejamento detalhado de rotas e reconhecimento de locais",
          "Protocolos de avaliação de ameaças e análise de riscos",
          "Coordenação com autoridades locais e locais",
          "Planejamento de contingência para múltiplos cenários",
          "Integração do contexto cultural e empresarial"
        ]
      }
    },
    {
      id: "preparation",
      name: t('framework.pillars.preparation.name', 'Preparation'),
      namePortuguese: 'Preparação',
      icon: ShieldCheckIcon,
      color: "secondary",
      description: t('framework.pillars.preparation.description', 'Detailed briefings, equipment checks, and contingency planning'),
      descriptionPortuguese: 'Briefings detalhados, verificações de equipamentos e planejamento de contingência',
      details: {
        en: [
          "Comprehensive team briefings and role assignments",
          "Equipment verification and backup systems",
          "Communication protocols establishment",
          "Client preference and requirement documentation",
          "Emergency evacuation procedure rehearsals"
        ],
        pt: [
          "Briefings abrangentes da equipe e atribuição de funções",
          "Verificação de equipamentos e sistemas de backup",
          "Estabelecimento de protocolos de comunicação",
          "Documentação de preferências e requisitos do cliente",
          "Ensaios de procedimentos de evacuação de emergência"
        ]
      }
    },
    {
      id: "protection",
      name: t('framework.pillars.protection.name', 'Protection'),
      namePortuguese: 'Proteção',
      icon: ShieldCheckIcon,
      color: "premium",
      description: t('framework.pillars.protection.description', 'Physical security and threat mitigation during operations'),
      descriptionPortuguese: 'Segurança física e mitigação de ameaças durante operações',
      details: {
        en: [
          "Close personal protection during all activities",
          "Crowd management and space control",
          "Vehicle security and secure transportation",
          "Digital security and privacy protection",
          "Discrete yet effective security presence"
        ],
        pt: [
          "Proteção pessoal próxima durante todas as atividades",
          "Gestão de multidões e controle de espaço",
          "Segurança de veículos e transporte seguro",
          "Segurança digital e proteção da privacidade",
          "Presença de segurança discreta mas eficaz"
        ]
      }
    },
    {
      id: "prevention",
      name: t('framework.pillars.prevention.name', 'Prevention'),
      namePortuguese: 'Prevenção',
      icon: ExclamationTriangleIcon,
      color: "accent",
      description: t('framework.pillars.prevention.description', 'Proactive risk identification and avoidance strategies'),
      descriptionPortuguese: 'Identificação proativa de riscos e estratégias de prevenção',
      details: {
        en: [
          "Continuous threat monitoring and intelligence gathering",
          "Proactive security measures and barrier creation",
          "Social media and digital footprint management",
          "Advance team deployment for venue security",
          "Risk mitigation through route and timing optimization"
        ],
        pt: [
          "Monitoramento contínuo de ameaças e coleta de inteligência",
          "Medidas de segurança proativas e criação de barreiras",
          "Gestão de mídias sociais e pegada digital",
          "Implementação de equipe avançada para segurança do local",
          "Mitigação de riscos através da otimização de rotas e horários"
        ]
      }
    },
    {
      id: "presence",
      name: t('framework.pillars.presence.name', 'Presence'),
      namePortuguese: 'Presença',
      icon: UserIcon,
      color: "coral",
      description: t('framework.pillars.presence.description', 'Professional, discrete appearance and demeanor'),
      descriptionPortuguese: 'Aparência e comportamento profissional e discreto',
      details: {
        en: [
          "Professional appearance matching business environment",
          "Cultural sensitivity and Portuguese business etiquette",
          "Discrete positioning and unobtrusive movement",
          "Confident yet approachable professional demeanor",
          "Seamless integration with client's business activities"
        ],
        pt: [
          "Aparência profissional compatível com ambiente empresarial",
          "Sensibilidade cultural e etiqueta empresarial portuguesa",
          "Posicionamento discreto e movimento discreto",
          "Comportamento profissional confiante mas acessível",
          "Integração perfeita com as atividades empresariais do cliente"
        ]
      }
    },
    {
      id: "professionalism",
      name: t('framework.pillars.professionalism.name', 'Professionalism'),
      namePortuguese: 'Profissionalismo',
      icon: AcademicCapIcon,
      color: "action",
      description: t('framework.pillars.professionalism.description', 'Highest standards of conduct and client service'),
      descriptionPortuguese: 'Mais altos padrões de conduta e atendimento ao cliente',
      details: {
        en: [
          "Strict adherence to professional codes of conduct",
          "Confidentiality and discretion in all communications",
          "Continuous professional development and training",
          "Clear communication and regular status updates",
          "Respectful interaction with all stakeholders"
        ],
        pt: [
          "Aderência estrita aos códigos profissionais de conduta",
          "Confidencialidade e discrição em todas as comunicações",
          "Desenvolvimento profissional contínuo e treinamento",
          "Comunicação clara e atualizações regulares de status",
          "Interação respeitosa com todas as partes interessadas"
        ]
      }
    },
    {
      id: "proactivity",
      name: t('framework.pillars.proactivity.name', 'Proactivity'),
      namePortuguese: 'Proatividade',
      icon: LightBulbIcon,
      color: "secondary",
      description: t('framework.pillars.proactivity.description', 'Anticipating challenges and maintaining situational awareness'),
      descriptionPortuguese: 'Antecipação de desafios e manutenção da consciência situacional',
      details: {
        en: [
          "Continuous situational awareness and threat assessment",
          "Anticipatory planning for potential security challenges",
          "Rapid response protocols for emerging situations",
          "Proactive communication with stakeholders",
          "Adaptive security measures based on changing conditions"
        ],
        pt: [
          "Consciência situacional contínua e avaliação de ameaças",
          "Planejamento antecipatório para potenciais desafios de segurança",
          "Protocolos de resposta rápida para situações emergentes",
          "Comunicação proativa com partes interessadas",
          "Medidas de segurança adaptativas baseadas em condições em mudança"
        ]
      }
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      primary: isActive 
        ? "bg-primary-600 text-white border-primary-600" 
        : "bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100",
      secondary: isActive 
        ? "bg-secondary-600 text-white border-secondary-600" 
        : "bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100",
      premium: isActive 
        ? "bg-premium-600 text-white border-premium-600" 
        : "bg-premium-50 text-premium-700 border-premium-200 hover:bg-premium-100",
      accent: isActive 
        ? "bg-accent-600 text-white border-accent-600" 
        : "bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100",
      coral: isActive 
        ? "bg-coral-600 text-white border-coral-600" 
        : "bg-coral-50 text-coral-700 border-coral-200 hover:bg-coral-100",
      action: isActive 
        ? "bg-action-600 text-white border-action-600" 
        : "bg-action-50 text-action-700 border-action-200 hover:bg-action-100",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  const activePillar = frameworkPillars.find(p => p.id === activeFramework);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
          >
            {t('framework.pillars.title', 'The 7 Ps Excellence Framework')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Cada pilar representa um aspecto crítico dos nossos serviços de proteção pessoal premium, garantindo excelência em todas as operações.'
              : 'Each pillar represents a critical aspect of our premium close protection services, ensuring excellence across all operations.'
            }
          </motion.p>
        </motion.div>

        {/* Framework Navigation */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12"
        >
          {frameworkPillars.map((pillar) => (
            <motion.button
              key={pillar.id}
              variants={fadeInUp}
              onClick={() => setActiveFramework(pillar.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${getColorClasses(pillar.color, activeFramework === pillar.id)}`}
            >
              <pillar.icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-semibold">
                {language === 'pt' ? pillar.namePortuguese : pillar.name}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Framework Details */}
        {activePillar && (
          <motion.div
            key={activeFramework}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-50 rounded-2xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-4 ${
                    activePillar.color === 'primary' ? 'bg-primary-100' :
                    activePillar.color === 'secondary' ? 'bg-secondary-100' :
                    activePillar.color === 'premium' ? 'bg-premium-100' :
                    activePillar.color === 'accent' ? 'bg-accent-100' :
                    activePillar.color === 'coral' ? 'bg-coral-100' :
                    'bg-action-100'
                  }`}>
                    <activePillar.icon className={`w-8 h-8 ${
                      activePillar.color === 'primary' ? 'text-primary-600' :
                      activePillar.color === 'secondary' ? 'text-secondary-600' :
                      activePillar.color === 'premium' ? 'text-premium-600' :
                      activePillar.color === 'accent' ? 'text-accent-600' :
                      activePillar.color === 'coral' ? 'text-coral-600' :
                      'text-action-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {language === 'pt' ? activePillar.namePortuguese : activePillar.name}
                    </h3>
                    <p className="text-neutral-600">
                      {language === 'pt' ? activePillar.descriptionPortuguese : activePillar.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {(language === 'pt' ? activePillar.details.pt : activePillar.details.en).map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                        activePillar.color === 'primary' ? 'bg-primary-500' :
                        activePillar.color === 'secondary' ? 'bg-secondary-500' :
                        activePillar.color === 'premium' ? 'bg-premium-500' :
                        activePillar.color === 'accent' ? 'bg-accent-500' :
                        activePillar.color === 'coral' ? 'bg-coral-500' :
                        'bg-action-500'
                      }`}></div>
                      <span className="text-neutral-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-2xl flex items-center justify-center">
                  <activePillar.icon className={`w-24 h-24 ${
                    activePillar.color === 'primary' ? 'text-primary-400' :
                    activePillar.color === 'secondary' ? 'text-secondary-400' :
                    activePillar.color === 'premium' ? 'text-premium-400' :
                    activePillar.color === 'accent' ? 'text-accent-400' :
                    activePillar.color === 'coral' ? 'text-coral-400' :
                    'text-action-400'
                  }`} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}