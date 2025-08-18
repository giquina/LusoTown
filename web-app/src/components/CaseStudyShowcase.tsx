"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  CheckBadgeIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Shield, Crown, Award, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function CaseStudyShowcase() {
  const { language, t } = useLanguage();
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  const caseStudies = [
    {
      id: "executive-protection",
      title: {
        en: "Portuguese CEO London Business Summit",
        pt: "CEO Português no Summit Empresarial de Londres"
      },
      category: {
        en: "Executive Protection",
        pt: "Proteção Executiva"
      },
      duration: "3 Days",
      location: "Central London",
      client: "Fortune 500 Portuguese Executive",
      icon: BuildingOffice2Icon,
      scenario: {
        en: "High-profile Portuguese CEO attending major business summit with 500+ international delegates, requiring discrete protection throughout multiple venues and networking events.",
        pt: "CEO português de alto perfil participando de grande summit empresarial com 500+ delegados internacionais, necessitando proteção discreta em múltiplos locais e eventos de networking."
      },
      challenges: {
        en: [
          "Multiple venue changes across Central London",
          "High-density networking events with international delegates",
          "Media presence and photography requirements",
          "Cultural protocol requirements for Portuguese business etiquette",
          "Coordination with summit security and venue teams"
        ],
        pt: [
          "Múltiplas mudanças de local pelo centro de Londres",
          "Eventos de networking de alta densidade com delegados internacionais",
          "Presença da mídia e requisitos de fotografia",
          "Requisitos de protocolo cultural para etiqueta empresarial portuguesa",
          "Coordenação com segurança do summit e equipes do local"
        ]
      },
      framework_application: {
        en: [
          "Planning: Detailed reconnaissance of all 5 venues and route optimization",
          "Preparation: 48-hour advance team deployment and stakeholder briefings",
          "Protection: Close personal protection with 3-person security detail",
          "Prevention: Threat monitoring and crowd management protocols",
          "Presence: Business-appropriate attire blending with corporate environment",
          "Professionalism: Bilingual communication and cultural sensitivity",
          "Proactivity: Real-time adaptations to schedule changes and emerging situations"
        ],
        pt: [
          "Planejamento: Reconhecimento detalhado de todos os 5 locais e otimização de rotas",
          "Preparação: Implementação de equipe avançada 48h antes e briefings das partes interessadas",
          "Proteção: Proteção pessoal próxima com detalhe de segurança de 3 pessoas",
          "Prevenção: Monitoramento de ameaças e protocolos de gestão de multidões",
          "Presença: Vestimenta apropriada para negócios integrando-se ao ambiente corporativo",
          "Profissionalismo: Comunicação bilíngue e sensibilidade cultural",
          "Proatividade: Adaptações em tempo real a mudanças de cronograma e situações emergentes"
        ]
      },
      outcome: {
        en: "Successful completion with zero security incidents. Client feedback rated service 10/10, specifically highlighting cultural competency and discrete professionalism.",
        pt: "Conclusão bem-sucedida com zero incidentes de segurança. Feedback do cliente avaliou serviço 10/10, destacando especificamente competência cultural e profissionalismo discreto."
      },
      metrics: {
        hours: "72",
        venues: "5",
        events: "12",
        satisfaction: "10/10"
      }
    },
    {
      id: "family-protection",
      title: {
        en: "Portuguese Business Family UK Tour",
        pt: "Família Empresarial Portuguesa em Tour pelo Reino Unido"
      },
      category: {
        en: "Family Protection",
        pt: "Proteção Familiar"
      },
      duration: "1 Week",
      location: "London, Oxford, Bath",
      client: "Portuguese Entrepreneur Family",
      icon: UserGroupIcon,
      scenario: {
        en: "Prominent Portuguese business family (2 adults, 2 children) requiring protection during cultural and educational tour across UK, including private schools visits and cultural sites.",
        pt: "Família empresarial portuguesa proeminente (2 adultos, 2 crianças) necessitando proteção durante tour cultural e educacional pelo Reino Unido, incluindo visitas a escolas particulares e sítios culturais."
      },
      challenges: {
        en: [
          "Multi-generational family with different security requirements",
          "Educational institution protocols and child protection policies",
          "Tourist attraction crowd management",
          "Interstate travel coordination",
          "Balancing security with family experience enjoyment"
        ],
        pt: [
          "Família multigeracional com diferentes requisitos de segurança",
          "Protocolos de instituições educacionais e políticas de proteção infantil",
          "Gestão de multidões em atrações turísticas",
          "Coordenação de viagem interestadual",
          "Equilibrio entre segurança e aproveitamento da experiência familiar"
        ]
      },
      framework_application: {
        en: [
          "Planning: Family-focused itinerary with child-friendly security protocols",
          "Preparation: Child protection specialist training and educational venue coordination",
          "Protection: Age-appropriate security measures for all family members",
          "Prevention: Tourist area threat assessment and crowd avoidance strategies",
          "Presence: Family-friendly, approachable security presence",
          "Professionalism: Educational institution liaison and cultural guidance",
          "Proactivity: Weather and schedule adaptations for optimal family experience"
        ],
        pt: [
          "Planejamento: Itinerário focado na família com protocolos de segurança adequados para crianças",
          "Preparação: Treinamento especialista em proteção infantil e coordenação de locais educacionais",
          "Proteção: Medidas de segurança apropriadas para idade de todos os membros da família",
          "Prevenção: Avaliação de ameaças em áreas turísticas e estratégias de prevenção de multidões",
          "Presença: Presença de segurança amigável à família e acessível",
          "Profissionalismo: Ligação com instituições educacionais e orientação cultural",
          "Proatividade: Adaptações climáticas e de cronograma para experiência familiar ideal"
        ]
      },
      outcome: {
        en: "Seamless 7-day experience with complete family satisfaction. Successfully visited 8 institutions and 15 cultural sites with zero security concerns.",
        pt: "Experiência perfeita de 7 dias com completa satisfação familiar. Visitaram com sucesso 8 instituições e 15 sítios culturais com zero preocupações de segurança."
      },
      metrics: {
        hours: "168",
        venues: "23",
        events: "8",
        satisfaction: "10/10"
      }
    },
    {
      id: "international-delegation",
      title: {
        en: "Portuguese Trade Delegation Royal Event",
        pt: "Delegação Comercial Portuguesa em Evento Real"
      },
      category: {
        en: "Diplomatic Protection",
        pt: "Proteção Diplomática"
      },
      duration: "2 Days",
      location: "Windsor, London",
      client: "Portuguese Trade Ministry",
      icon: GlobeEuropeAfricaIcon,
      scenario: {
        en: "Portuguese government trade delegation attending Royal Windsor Castle event, requiring coordination with Royal Protection officers and diplomatic security protocols.",
        pt: "Delegação comercial do governo português participando de evento no Castelo Real de Windsor, necessitando coordenação com oficiais de Proteção Real e protocolos de segurança diplomática."
      },
      challenges: {
        en: [
          "Royal protocol compliance and security integration",
          "Diplomatic immunity considerations",
          "Multi-agency coordination (Royal Protection, Met Police, Embassy)",
          "High-profile media coverage management",
          "Cultural protocol for Portuguese delegation representation"
        ],
        pt: [
          "Conformidade com protocolo real e integração de segurança",
          "Considerações de imunidade diplomática",
          "Coordenação multi-agência (Proteção Real, Polícia Metropolitan, Embaixada)",
          "Gestão de cobertura midiática de alto perfil",
          "Protocolo cultural para representação da delegação portuguesa"
        ]
      },
      framework_application: {
        en: [
          "Planning: Royal protocol study and multi-agency coordination meetings",
          "Preparation: Security clearance verification and ceremonial rehearsals",
          "Protection: Seamless integration with Royal Protection Service protocols",
          "Prevention: Diplomatic threat assessment and protocol breach prevention",
          "Presence: Formal diplomatic attire and ceremonial behavior",
          "Professionalism: Cultural liaison between Portuguese delegation and Royal hosts",
          "Proactivity: Real-time coordination with multiple security agencies"
        ],
        pt: [
          "Planejamento: Estudo de protocolo real e reuniões de coordenação multi-agência",
          "Preparação: Verificação de autorização de segurança e ensaios cerimoniais",
          "Proteção: Integração perfeita com protocolos do Serviço de Proteção Real",
          "Prevenção: Avaliação de ameaças diplomáticas e prevenção de violação de protocolo",
          "Presença: Vestimenta diplomática formal e comportamento cerimonial",
          "Profissionalismo: Ligação cultural entre delegação portuguesa e anfitriões reais",
          "Proatividade: Coordenação em tempo real com múltiplas agências de segurança"
        ]
      },
      outcome: {
        en: "Flawless execution with Royal Household commendation. Established template for future Portuguese diplomatic protection services.",
        pt: "Execução impecável com elogio da Casa Real. Estabeleceu modelo para futuros serviços de proteção diplomática portuguesa."
      },
      metrics: {
        hours: "48",
        venues: "3",
        events: "5",
        satisfaction: "Exceptional"
      }
    }
  ];

  const activeCase = caseStudies[activeCaseStudy];

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
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
            {t('framework.cases.title', 'Real-World Framework Applications')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Estudos de caso demonstrando como o nosso Framework de Excelência 7 Ps é aplicado em operações reais de proteção para a comunidade empresarial portuguesa.'
              : 'Case studies demonstrating how our 7 Ps Excellence Framework is applied in real protection operations for the Portuguese business community.'
            }
          </motion.p>
        </motion.div>

        {/* Case Study Navigation */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {caseStudies.map((study, index) => (
            <motion.button
              key={study.id}
              variants={fadeInUp}
              onClick={() => setActiveCaseStudy(index)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                activeCaseStudy === index
                  ? "bg-premium-600 text-white border-premium-600"
                  : "bg-white text-neutral-900 border-neutral-200 hover:border-premium-300 hover:bg-premium-50"
              }`}
            >
              <div className="flex items-center mb-4">
                <study.icon className={`w-8 h-8 mr-3 ${
                  activeCaseStudy === index ? "text-white" : "text-premium-600"
                }`} />
                <div className="text-sm font-medium">
                  {language === 'pt' ? study.category.pt : study.category.en}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {language === 'pt' ? study.title.pt : study.title.en}
              </h3>
              <div className={`flex items-center text-sm ${
                activeCaseStudy === index ? "text-white/80" : "text-neutral-500"
              }`}>
                <ClockIcon className="w-4 h-4 mr-1" />
                {study.duration}
                <MapPinIcon className="w-4 h-4 ml-3 mr-1" />
                {study.location}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Case Study Details */}
        <motion.div
          key={activeCaseStudy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Case Study Header */}
          <div className="bg-gradient-to-r from-premium-600 to-primary-600 text-white p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center mb-4">
                  <activeCase.icon className="w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">
                      {language === 'pt' ? activeCase.title.pt : activeCase.title.en}
                    </h3>
                    <p className="text-white/80">
                      {language === 'pt' ? activeCase.category.pt : activeCase.category.en}
                    </p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {language === 'pt' ? activeCase.scenario.pt : activeCase.scenario.en}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">
                  {t('framework.cases.metrics', 'Operation Metrics')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeCase.metrics.hours}</div>
                    <div className="text-sm text-white/80">
                      {t('framework.cases.hours', 'Hours')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeCase.metrics.venues}</div>
                    <div className="text-sm text-white/80">
                      {t('framework.cases.venues', 'Venues')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeCase.metrics.events}</div>
                    <div className="text-sm text-white/80">
                      {t('framework.cases.events', 'Events')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeCase.metrics.satisfaction}</div>
                    <div className="text-sm text-white/80">
                      {t('framework.cases.satisfaction', 'Rating')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Challenges */}
              <div>
                <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-accent-600 mr-2" />
                  {t('framework.cases.challenges', 'Key Challenges')}
                </h4>
                <ul className="space-y-3">
                  {(language === 'pt' ? activeCase.challenges.pt : activeCase.challenges.en).map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Framework Application */}
              <div>
                <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-premium-600 mr-2" />
                  {t('framework.cases.application', '7 Ps Framework Application')}
                </h4>
                <ul className="space-y-3">
                  {(language === 'pt' ? activeCase.framework_application.pt : activeCase.framework_application.en).map((application, index) => (
                    <li key={index} className="flex items-start">
                      <CheckBadgeIcon className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcome */}
            <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
              <h4 className="text-xl font-bold text-neutral-900 mb-3 flex items-center">
                <StarIcon className="w-6 h-6 text-secondary-600 mr-2" />
                {t('framework.cases.outcome', 'Operation Outcome')}
              </h4>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'pt' ? activeCase.outcome.pt : activeCase.outcome.en}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}