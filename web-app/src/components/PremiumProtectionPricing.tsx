"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  UserIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Crown, Shield, Users, Award } from "lucide-react";
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

export default function PremiumProtectionPricing() {
  const { language, t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState("executive");

  const protectionPackages = [
    {
      id: "personal",
      name: {
        en: "Personal Protection",
        pt: "Proteção Pessoal"
      },
      icon: UserIcon,
      price: {
        daily: 800,
        weekly: 5200,
        monthly: 20000
      },
      duration: {
        en: "Individual Executive",
        pt: "Executivo Individual"
      },
      description: {
        en: "Single-person close protection for Portuguese business leaders",
        pt: "Proteção pessoal individual para líderes empresariais portugueses"
      },
      features: {
        en: [
          "Dedicated SIA-licensed protection officer",
          "24/7 personal security coverage",
          "Advance reconnaissance and planning",
          "Cultural competency and Portuguese language support",
          "Emergency response and medical assistance",
          "Discrete business environment integration",
          "Real-time threat monitoring and assessment",
          "Secure transportation coordination"
        ],
        pt: [
          "Oficial de proteção dedicado licenciado SIA",
          "Cobertura de segurança pessoal 24/7",
          "Reconhecimento e planejamento antecipado",
          "Competência cultural e suporte em português",
          "Resposta de emergência e assistência médica",
          "Integração discreta ao ambiente empresarial",
          "Monitoramento e avaliação de ameaças em tempo real",
          "Coordenação de transporte seguro"
        ]
      },
      ideal_for: {
        en: "CEOs, entrepreneurs, and high-profile Portuguese business leaders",
        pt: "CEOs, empresários e líderes empresariais portugueses de alto perfil"
      },
      popular: false
    },
    {
      id: "executive",
      name: {
        en: "Executive Protection",
        pt: "Proteção Executiva"
      },
      icon: BuildingOffice2Icon,
      price: {
        daily: 1200,
        weekly: 7800,
        monthly: 30000
      },
      duration: {
        en: "Executive + Close Associates",
        pt: "Executivo + Associados Próximos"
      },
      description: {
        en: "Comprehensive protection for executives and immediate business circle",
        pt: "Proteção abrangente para executivos e círculo empresarial imediato"
      },
      features: {
        en: [
          "2-person professional security detail",
          "Executive and key associate protection",
          "Advanced venue security assessments",
          "Business meeting and event security",
          "VIP transportation with security drivers",
          "Portuguese business protocol expertise",
          "Multi-location coordination capabilities",
          "Emergency evacuation procedures",
          "Digital security and privacy protection",
          "Cultural liaison and interpretation services"
        ],
        pt: [
          "Detalhe de segurança profissional de 2 pessoas",
          "Proteção de executivo e associados principais",
          "Avaliações avançadas de segurança de locais",
          "Segurança de reuniões de negócios e eventos",
          "Transporte VIP com motoristas de segurança",
          "Experiência em protocolo empresarial português",
          "Capacidades de coordenação multi-local",
          "Procedimentos de evacuação de emergência",
          "Proteção de segurança digital e privacidade",
          "Serviços de ligação cultural e interpretação"
        ]
      },
      ideal_for: {
        en: "Senior executives, board members, and Portuguese delegation leaders",
        pt: "Executivos seniores, membros do conselho e líderes de delegação portuguesa"
      },
      popular: true
    },
    {
      id: "family",
      name: {
        en: "Family Protection",
        pt: "Proteção Familiar"
      },
      icon: UserGroupIcon,
      price: {
        daily: 1600,
        weekly: 10400,
        monthly: 40000
      },
      duration: {
        en: "Family Unit Coverage",
        pt: "Cobertura de Unidade Familiar"
      },
      description: {
        en: "Comprehensive family protection including children and extended family",
        pt: "Proteção familiar abrangente incluindo crianças e família extensa"
      },
      features: {
        en: [
          "3-4 person security team with family specialists",
          "Child protection certified operatives",
          "Family-friendly security protocols",
          "Educational institution coordination",
          "Cultural tour and activity security",
          "Multi-generational Portuguese cultural guidance",
          "Residential security assessments",
          "Family travel and vacation protection",
          "Emergency medical response for all ages",
          "Portuguese family tradition and protocol respect"
        ],
        pt: [
          "Equipe de segurança de 3-4 pessoas com especialistas familiares",
          "Operativos certificados em proteção infantil",
          "Protocolos de segurança adequados à família",
          "Coordenação com instituições educacionais",
          "Segurança de tours culturais e atividades",
          "Orientação cultural portuguesa multigeracional",
          "Avaliações de segurança residencial",
          "Proteção de viagens e férias familiares",
          "Resposta médica de emergência para todas as idades",
          "Respeito à tradição e protocolo familiar português"
        ]
      },
      ideal_for: {
        en: "Portuguese business families, multi-generational family units",
        pt: "Famílias empresariais portuguesas, unidades familiares multigeracionais"
      },
      popular: false
    },
    {
      id: "diplomatic",
      name: {
        en: "Diplomatic Protection",
        pt: "Proteção Diplomática"
      },
      icon: ShieldCheckIcon,
      price: {
        daily: 2000,
        weekly: 13000,
        monthly: 50000
      },
      duration: {
        en: "Full Delegation Support",
        pt: "Suporte Completo à Delegação"
      },
      description: {
        en: "Elite protection for Portuguese government officials and diplomatic missions",
        pt: "Proteção de elite para funcionários do governo português e missões diplomáticas"
      },
      features: {
        en: [
          "Elite security team with diplomatic experience",
          "Royal and state protocol expertise",
          "Multi-agency coordination (Met Police, Embassy, Royal Protection)",
          "Ceremonial and state function security",
          "International diplomatic immunity protocols",
          "Portuguese state representation support",
          "High-security venue access management",
          "Media and public appearance security",
          "Counter-surveillance and threat intelligence",
          "Cultural diplomacy and protocol guidance"
        ],
        pt: [
          "Equipe de segurança de elite com experiência diplomática",
          "Experiência em protocolo real e estatal",
          "Coordenação multi-agência (Polícia Met, Embaixada, Proteção Real)",
          "Segurança de funções cerimoniais e estatais",
          "Protocolos de imunidade diplomática internacional",
          "Suporte à representação estatal portuguesa",
          "Gestão de acesso a locais de alta segurança",
          "Segurança de aparições midiáticas e públicas",
          "Contra-vigilância e inteligência de ameaças",
          "Orientação de diplomacia cultural e protocolo"
        ]
      },
      ideal_for: {
        en: "Portuguese government ministers, ambassadors, and official delegations",
        pt: "Ministros do governo português, embaixadores e delegações oficiais"
      },
      popular: false
    }
  ];

  const selectedPkg = protectionPackages.find(pkg => pkg.id === selectedPackage);

  const corporateAddOns = [
    {
      name: {
        en: "Cultural Integration Specialist",
        pt: "Especialista em Integração Cultural"
      },
      price: 200,
      description: {
        en: "Portuguese cultural liaison for business protocol and etiquette",
        pt: "Ligação cultural portuguesa para protocolo e etiqueta empresarial"
      }
    },
    {
      name: {
        en: "Technical Security Sweep",
        pt: "Varredura de Segurança Técnica"
      },
      price: 500,
      description: {
        en: "Electronic surveillance detection and counter-measures",
        pt: "Detecção de vigilância eletrônica e contramedidas"
      }
    },
    {
      name: {
        en: "Advance Security Team",
        pt: "Equipe de Segurança Avançada"
      },
      price: 800,
      description: {
        en: "48-hour advance deployment for venue preparation",
        pt: "Implementação antecipada de 48 horas para preparação do local"
      }
    },
    {
      name: {
        en: "Emergency Medical Support",
        pt: "Suporte Médico de Emergência"
      },
      price: 400,
      description: {
        en: "On-site medical professional with emergency equipment",
        pt: "Profissional médico no local com equipamento de emergência"
      }
    }
  ];

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
            {t('framework.pricing.title', 'Premium Protection Investment')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Pacotes de proteção profissional adaptados às necessidades específicas da comunidade empresarial portuguesa em Londres e Reino Unido.'
              : 'Professional protection packages tailored to the specific needs of the Portuguese business community in London and the UK.'
            }
          </motion.p>
        </motion.div>

        {/* Package Selection */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {protectionPackages.map((pkg) => (
            <motion.button
              key={pkg.id}
              variants={fadeInUp}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left relative ${
                selectedPackage === pkg.id
                  ? "bg-premium-600 text-white border-premium-600 transform scale-105"
                  : "bg-white text-neutral-900 border-neutral-200 hover:border-premium-300 hover:bg-premium-50"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {t('framework.pricing.popular', 'Most Popular')}
                  </span>
                </div>
              )}

              <div className="flex items-center mb-4">
                <pkg.icon className={`w-8 h-8 mr-3 ${
                  selectedPackage === pkg.id ? "text-white" : "text-premium-600"
                }`} />
                <div className="text-sm font-medium">
                  {language === 'pt' ? pkg.duration.pt : pkg.duration.en}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">
                {language === 'pt' ? pkg.name.pt : pkg.name.en}
              </h3>

              <div className={`text-2xl font-bold mb-2 ${
                selectedPackage === pkg.id ? "text-white" : "text-premium-600"
              }`}>
                £{pkg.price.daily.toLocaleString()}
                <span className="text-sm font-normal opacity-80">/day</span>
              </div>

              <p className={`text-sm ${
                selectedPackage === pkg.id ? "text-white/80" : "text-neutral-600"
              }`}>
                {language === 'pt' ? pkg.description.pt : pkg.description.en}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Package Details */}
        {selectedPkg && (
          <motion.div
            key={selectedPackage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-neutral-50 to-premium-50 rounded-2xl p-8 lg:p-12 mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Package Details */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-premium-100 rounded-xl flex items-center justify-center mr-4">
                    <selectedPkg.icon className="w-8 h-8 text-premium-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {language === 'pt' ? selectedPkg.name.pt : selectedPkg.name.en}
                    </h3>
                    <p className="text-neutral-600">
                      {language === 'pt' ? selectedPkg.ideal_for.pt : selectedPkg.ideal_for.en}
                    </p>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-neutral-900 mb-4">
                  {t('framework.pricing.includes', 'What\'s Included')}:
                </h4>
                <ul className="space-y-3">
                  {(language === 'pt' ? selectedPkg.features.pt : selectedPkg.features.en).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Breakdown */}
              <div>
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h4 className="text-xl font-bold text-neutral-900 mb-6">
                    {t('framework.pricing.investment', 'Investment Breakdown')}
                  </h4>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                      <span className="font-medium text-neutral-900">
                        {t('framework.pricing.daily', 'Daily Rate')}
                      </span>
                      <span className="text-xl font-bold text-premium-600">
                        £{selectedPkg.price.daily.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                      <span className="font-medium text-neutral-900">
                        {t('framework.pricing.weekly', 'Weekly Package')}
                        <span className="text-sm text-secondary-600 ml-2">(8% savings)</span>
                      </span>
                      <span className="text-xl font-bold text-premium-600">
                        £{selectedPkg.price.weekly.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                      <span className="font-medium text-neutral-900">
                        {t('framework.pricing.monthly', 'Monthly Retainer')}
                        <span className="text-sm text-secondary-600 ml-2">(16% savings)</span>
                      </span>
                      <span className="text-xl font-bold text-premium-600">
                        £{selectedPkg.price.monthly.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact CTA */}
                  <div className="border-t border-neutral-200 pt-6">
                    <button className="w-full bg-premium-600 text-white py-4 rounded-lg hover:bg-premium-700 transition-colors flex items-center justify-center font-semibold mb-3">
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      {t('framework.pricing.consultation', 'Book Consultation')}
                    </button>
                    <p className="text-center text-sm text-neutral-600">
                      {t('framework.pricing.quote', 'Custom quotes available for extended operations')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add-On Services */}
        <motion.div
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl font-bold text-neutral-900 mb-8 text-center"
          >
            {t('framework.pricing.addons', 'Enhanced Service Add-Ons')}
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {corporateAddOns.map((addon, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-premium-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-neutral-900">
                    {language === 'pt' ? addon.name.pt : addon.name.en}
                  </h4>
                  <span className="text-lg font-bold text-premium-600">
                    +£{addon.price}/day
                  </span>
                </div>
                <p className="text-neutral-600 text-sm">
                  {language === 'pt' ? addon.description.pt : addon.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-premium-600 to-primary-600 text-white rounded-2xl p-8 lg:p-12 text-center"
        >
          <Crown className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('framework.pricing.value_title', 'Investment in Excellence & Portuguese Heritage')}
          </h3>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            {language === 'pt'
              ? 'Nossos preços refletem o mais alto padrão de proteção profissional, competência cultural portuguesa e integração perfeita com a comunidade empresarial de Londres.'
              : 'Our pricing reflects the highest standard of professional protection, Portuguese cultural competency, and seamless integration with London\'s business community.'
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-white/80" />
              <div className="font-semibold">
                {t('framework.pricing.value_1', 'Cultural Expertise')}
              </div>
              <div className="text-sm text-white/80">
                {t('framework.pricing.value_1_desc', 'Portuguese business protocol mastery')}
              </div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-white/80" />
              <div className="font-semibold">
                {t('framework.pricing.value_2', 'Elite Training')}
              </div>
              <div className="text-sm text-white/80">
                {t('framework.pricing.value_2_desc', 'SIA-licensed and continuously certified')}
              </div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-white/80" />
              <div className="font-semibold">
                {t('framework.pricing.value_3', 'Community Integration')}
              </div>
              <div className="text-sm text-white/80">
                {t('framework.pricing.value_3_desc', 'Seamless business environment blend')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}