"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Award, Shield, Crown, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Certification {
  name: string;
  namePortuguese: string;
  issuer: string;
  level: string;
  validity: string;
  description: string;
  descriptionPortuguese: string;
}

interface SIACertificationDisplayProps {
  certifications: Certification[];
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

export default function SIACertificationDisplay({ certifications }: SIACertificationDisplayProps) {
  const { language, t } = useLanguage();

  const trustIndicators = [
    {
      icon: ShieldCheckIcon,
      title: {
        en: "SIA Licensed",
        pt: "Licenciado SIA"
      },
      description: {
        en: "All operatives hold valid SIA Close Protection licenses",
        pt: "Todos os operativos possuem licenças SIA de Proteção Pessoal válidas"
      },
      color: "premium"
    },
    {
      icon: CheckBadgeIcon,
      title: {
        en: "Background Checked",
        pt: "Verificação de Antecedentes"
      },
      description: {
        en: "Enhanced DBS checks and security clearance verification",
        pt: "Verificações DBS aprimoradas e verificação de autorização de segurança"
      },
      color: "secondary"
    },
    {
      icon: AcademicCapIcon,
      title: {
        en: "Continuously Trained",
        pt: "Treinamento Contínuo"
      },
      description: {
        en: "Regular training updates and professional development",
        pt: "Atualizações regulares de treinamento e desenvolvimento profissional"
      },
      color: "primary"
    },
    {
      icon: DocumentCheckIcon,
      title: {
        en: "Insured & Bonded",
        pt: "Segurado e Garantido"
      },
      description: {
        en: "Comprehensive professional indemnity and liability coverage",
        pt: "Cobertura abrangente de indenização profissional e responsabilidade"
      },
      color: "accent"
    }
  ];

  const siaRequirements = [
    {
      category: {
        en: "Legal Requirements",
        pt: "Requisitos Legais"
      },
      items: {
        en: [
          "Right to work in the UK verification",
          "Enhanced DBS criminal record check",
          "Identity verification and documentation",
          "Medical fitness assessment"
        ],
        pt: [
          "Verificação do direito de trabalhar no Reino Unido",
          "Verificação aprimorada de antecedentes criminais DBS",
          "Verificação de identidade e documentação",
          "Avaliação de aptidão médica"
        ]
      }
    },
    {
      category: {
        en: "Training Modules",
        pt: "Módulos de Treinamento"
      },
      items: {
        en: [
          "Threat assessment and risk management",
          "Physical intervention techniques",
          "Emergency first aid and medical response",
          "Legal powers and responsibilities",
          "Communication and conflict resolution"
        ],
        pt: [
          "Avaliação de ameaças e gestão de riscos",
          "Técnicas de intervenção física",
          "Primeiros socorros de emergência e resposta médica",
          "Poderes legais e responsabilidades",
          "Comunicação e resolução de conflitos"
        ]
      }
    },
    {
      category: {
        en: "Professional Standards",
        pt: "Padrões Profissionais"
      },
      items: {
        en: [
          "Code of conduct and ethical behavior",
          "Confidentiality and data protection",
          "Cultural sensitivity and diversity training",
          "Customer service excellence",
          "Continuous professional development"
        ],
        pt: [
          "Código de conduta e comportamento ético",
          "Confidencialidade e proteção de dados",
          "Sensibilidade cultural e treinamento em diversidade",
          "Excelência no atendimento ao cliente",
          "Desenvolvimento profissional contínuo"
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      premium: "bg-premium-100 text-premium-600",
      secondary: "bg-secondary-100 text-secondary-600",
      primary: "bg-primary-100 text-primary-600",
      accent: "bg-accent-100 text-accent-600"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

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
            {t('framework.certification.title', 'SIA Certification & Professional Credentials')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Nossos operativos possuem as mais altas qualificações e certificações exigidas pela Security Industry Authority do Reino Unido.'
              : 'Our operatives hold the highest qualifications and certifications required by the UK Security Industry Authority.'
            }
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-6 bg-neutral-50 rounded-xl"
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${getColorClasses(indicator.color)} rounded-xl flex items-center justify-center`}>
                <indicator.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {language === 'pt' ? indicator.title.pt : indicator.title.en}
              </h3>
              <p className="text-neutral-600 text-sm">
                {language === 'pt' ? indicator.description.pt : indicator.description.en}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Cards */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-white to-neutral-50 p-8 rounded-xl shadow-sm border border-neutral-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-premium-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-premium-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                      {cert.validity}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {language === 'pt' ? cert.namePortuguese : cert.name}
              </h3>
              
              <p className="text-neutral-600 text-sm mb-4">
                {language === 'pt' ? cert.descriptionPortuguese : cert.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    {t('framework.certification.issuer', 'Issuer')}:
                  </span>
                  <span className="font-medium text-neutral-900">{cert.issuer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    {t('framework.certification.level', 'Level')}:
                  </span>
                  <span className="font-medium text-neutral-900">{cert.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SIA Requirements Breakdown */}
        <motion.div
          variants={staggerContainer}
          className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 lg:p-12"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              {t('framework.certification.sia_title', 'SIA Close Protection License Requirements')}
            </h3>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Uma visão abrangente dos rigorosos requisitos e padrões que nossos operativos devem atender para obter e manter suas licenças SIA.'
                : 'A comprehensive overview of the rigorous requirements and standards our operatives must meet to obtain and maintain their SIA licenses.'
              }
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {siaRequirements.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${
                    index === 0 ? 'bg-premium-100' :
                    index === 1 ? 'bg-secondary-100' :
                    'bg-primary-100'
                  }`}>
                    {index === 0 && <DocumentCheckIcon className="w-5 h-5 text-premium-600" />}
                    {index === 1 && <AcademicCapIcon className="w-5 h-5 text-secondary-600" />}
                    {index === 2 && <StarIcon className="w-5 h-5 text-primary-600" />}
                  </div>
                  {language === 'pt' ? section.category.pt : section.category.en}
                </h4>
                
                <ul className="space-y-3">
                  {(language === 'pt' ? section.items.pt : section.items.en).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* License Verification */}
          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm border-2 border-secondary-200"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-secondary-600" />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 mb-4">
              {t('framework.certification.verification_title', 'License Verification Available')}
            </h4>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              {language === 'pt'
                ? 'Todas as licenças SIA dos nossos operativos podem ser verificadas através do sistema online oficial da SIA. Transparência total é fundamental para a confiança.'
                : 'All our operatives\' SIA licenses can be verified through the official SIA online system. Complete transparency is fundamental to trust.'
              }
            </p>
            <button className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors">
              {t('framework.certification.verify_licenses', 'Verify Our Licenses')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}