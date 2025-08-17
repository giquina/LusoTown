"use client";

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  TruckIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Car, Crown, Users, Globe, Calendar, Shield } from "lucide-react";
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
      staggerChildren: 0.1
    }
  }
};

export default function EcosystemIntegration() {
  const { language, t } = useLanguage();

  const integrationServices = [
    {
      id: "executive-transport",
      name: {
        en: "Executive Transport Integration",
        pt: "Integração de Transporte Executivo"
      },
      icon: Car,
      description: {
        en: "Seamless coordination between close protection and luxury transport services",
        pt: "Coordenação perfeita entre proteção pessoal e serviços de transporte de luxo"
      },
      features: {
        en: [
          "Secure vehicle coordination with protection detail",
          "Luxury fleet access (Bentley, Mercedes S-Class, Rolls-Royce)",
          "Portuguese-speaking security drivers",
          "Route planning with security considerations",
          "Airport VIP terminal access coordination"
        ],
        pt: [
          "Coordenação de veículo seguro com detalhe de proteção",
          "Acesso à frota de luxo (Bentley, Mercedes S-Class, Rolls-Royce)",
          "Motoristas de segurança que falam português",
          "Planejamento de rotas com considerações de segurança",
          "Coordenação de acesso ao terminal VIP do aeroporto"
        ]
      },
      pricing: "Included in Executive+ packages",
      color: "primary"
    },
    {
      id: "business-networking",
      name: {
        en: "Business Networking Protection",
        pt: "Proteção de Networking Empresarial"
      },
      icon: Users,
      description: {
        en: "Discrete protection during Portuguese business community events and networking",
        pt: "Proteção discreta durante eventos e networking da comunidade empresarial portuguesa"
      },
      features: {
        en: [
          "Protection during LusoTown business networking events",
          "Portuguese business protocol expertise",
          "Facilitated introductions with security awareness",
          "Cultural event protection coordination",
          "Business dinner and reception security"
        ],
        pt: [
          "Proteção durante eventos de networking empresarial LusoTown",
          "Experiência em protocolo empresarial português",
          "Apresentações facilitadas com consciência de segurança",
          "Coordenação de proteção de eventos culturais",
          "Segurança de jantares de negócios e recepções"
        ]
      },
      pricing: "£200/event supplement",
      color: "secondary"
    },
    {
      id: "cultural-tours",
      name: {
        en: "Portuguese Cultural Tours",
        pt: "Tours Culturais Portugueses"
      },
      icon: Globe,
      description: {
        en: "VIP cultural experiences with integrated security for Portuguese heritage sites",
        pt: "Experiências culturais VIP com segurança integrada para sítios do patrimônio português"
      },
      features: {
        en: [
          "Secure Portuguese heritage site visits",
          "Cultural guide protection coordination",
          "Private museum and gallery access",
          "Portuguese restaurant and market security",
          "Cultural festival and celebration protection"
        ],
        pt: [
          "Visitas seguras a sítios do patrimônio português",
          "Coordenação de proteção de guia cultural",
          "Acesso privado a museus e galerias",
          "Segurança de restaurantes e mercados portugueses",
          "Proteção de festivais e celebrações culturais"
        ]
      },
      pricing: "From £400/day cultural package",
      color: "accent"
    },
    {
      id: "event-security",
      name: {
        en: "Portuguese Community Events",
        pt: "Eventos da Comunidade Portuguesa"
      },
      icon: Calendar,
      description: {
        en: "Comprehensive security for Portuguese cultural and business events across London",
        pt: "Segurança abrangente para eventos culturais e empresariais portugueses em Londres"
      },
      features: {
        en: [
          "Portuguese cultural event security coordination",
          "Community gathering protection",
          "Business conference and seminar security",
          "Cultural celebration and festival protection",
          "Church and religious ceremony security"
        ],
        pt: [
          "Coordenação de segurança de eventos culturais portugueses",
          "Proteção de reuniões comunitárias",
          "Segurança de conferências e seminários empresariais",
          "Proteção de celebrações e festivais culturais",
          "Segurança de igreja e cerimônias religiosas"
        ]
      },
      pricing: "Custom event pricing",
      color: "coral"
    }
  ];

  const ecosystemBenefits = [
    {
      title: {
        en: "Unified Portuguese Service Experience",
        pt: "Experiência de Serviço Português Unificada"
      },
      description: {
        en: "All services coordinated through single Portuguese-speaking team",
        pt: "Todos os serviços coordenados através de equipe única que fala português"
      },
      icon: CheckCircleIcon
    },
    {
      title: {
        en: "Cultural Continuity",
        pt: "Continuidade Cultural"
      },
      description: {
        en: "Consistent Portuguese cultural competency across all service touchpoints",
        pt: "Competência cultural portuguesa consistente em todos os pontos de contato do serviço"
      },
      icon: StarIcon
    },
    {
      title: {
        en: "Community Integration",
        pt: "Integração Comunitária"
      },
      description: {
        en: "Seamless integration with London Portuguese business and cultural community",
        pt: "Integração perfeita com a comunidade empresarial e cultural portuguesa de Londres"
      },
      icon: UserGroupIcon
    },
    {
      title: {
        en: "Premium Value",
        pt: "Valor Premium"
      },
      description: {
        en: "Package discounts when combining multiple LusoTown premium services",
        pt: "Descontos de pacote ao combinar múltiplos serviços premium LusoTown"
      },
      icon: Crown
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary-100 text-primary-600",
      secondary: "bg-secondary-100 text-secondary-600",
      accent: "bg-accent-100 text-accent-600",
      coral: "bg-coral-100 text-coral-600"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-premium-50">
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
            {t('framework.ecosystem.title', 'Integrated Portuguese Platform Ecosystem')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Close protection que se integra perfeitamente com todos os serviços premium LusoTown, criando uma experiência unificada para a comunidade empresarial portuguesa.'
              : 'Close protection that seamlessly integrates with all LusoTown premium services, creating a unified experience for the Portuguese business community.'
            }
          </motion.p>
        </motion.div>

        {/* Integration Services Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {integrationServices.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${getColorClasses(service.color)}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900">
                    {language === 'pt' ? service.name.pt : service.name.en}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {service.pricing}
                  </p>
                </div>
              </div>

              <p className="text-neutral-700 mb-6">
                {language === 'pt' ? service.description.pt : service.description.en}
              </p>

              <h4 className="font-semibold text-neutral-900 mb-3">
                {t('framework.ecosystem.integration_features', 'Integration Features')}:
              </h4>
              <ul className="space-y-2">
                {(language === 'pt' ? service.features.pt : service.features.en).map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-6 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                service.color === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' :
                service.color === 'secondary' ? 'bg-secondary-600 text-white hover:bg-secondary-700' :
                service.color === 'accent' ? 'bg-accent-600 text-white hover:bg-accent-700' :
                'bg-coral-600 text-white hover:bg-coral-700'
              }`}>
                {t('framework.ecosystem.learn_more', 'Learn More')}
                <ArrowRightIcon className="w-4 h-4 ml-2 inline" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Ecosystem Benefits */}
        <motion.div
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl font-bold text-neutral-900 mb-8 text-center"
          >
            {t('framework.ecosystem.benefits_title', 'Ecosystem Benefits for Portuguese Executives')}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-neutral-200"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-premium-100 rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-premium-600" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">
                  {language === 'pt' ? benefit.title.pt : benefit.title.en}
                </h4>
                <p className="text-sm text-neutral-600">
                  {language === 'pt' ? benefit.description.pt : benefit.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Coordination Flow */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-neutral-200"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              {t('framework.ecosystem.coordination_title', 'Seamless Service Coordination')}
            </h3>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Como nossos serviços de proteção se coordenam com outros serviços premium LusoTown para criar uma experiência empresarial portuguesa unificada.'
                : 'How our protection services coordinate with other LusoTown premium services to create a unified Portuguese business experience.'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center">
                <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                {t('framework.ecosystem.step1', 'Protection Planning')}
              </h4>
              <p className="text-neutral-600 text-sm">
                {language === 'pt'
                  ? 'Planejamento de segurança coordenado com todos os serviços LusoTown'
                  : 'Security planning coordinated with all LusoTown services'
                }
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRightIcon className="w-8 h-8 text-neutral-400" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                {t('framework.ecosystem.step2', 'Service Integration')}
              </h4>
              <p className="text-neutral-600 text-sm">
                {language === 'pt'
                  ? 'Integração perfeita com transporte, eventos e networking'
                  : 'Seamless integration with transport, events, and networking'
                }
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRightIcon className="w-8 h-8 text-neutral-400" />
            </div>

            {/* Step 3 */}
            <div className="text-center lg:col-start-2 lg:col-span-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-premium-100 rounded-xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-premium-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                {t('framework.ecosystem.step3', 'Premium Experience')}
              </h4>
              <p className="text-neutral-600 text-sm">
                {language === 'pt'
                  ? 'Experiência empresarial portuguesa unificada e premium'
                  : 'Unified premium Portuguese business experience'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-premium-600 to-primary-600 text-white rounded-2xl p-8 lg:p-12">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('framework.ecosystem.cta_title', 'Experience Integrated Portuguese Excellence')}
            </h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
              {language === 'pt'
                ? 'Descubra como nossa proteção premium se integra com todos os serviços LusoTown para criar a experiência empresarial portuguesa definitiva em Londres.'
                : 'Discover how our premium protection integrates with all LusoTown services to create the ultimate Portuguese business experience in London.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-premium-600 px-8 py-4 rounded-lg hover:bg-neutral-50 transition-colors font-semibold">
                {t('framework.ecosystem.cta_consultation', 'Book Ecosystem Consultation')}
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-premium-600 transition-colors font-semibold">
                {t('framework.ecosystem.cta_services', 'Explore All Services')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}