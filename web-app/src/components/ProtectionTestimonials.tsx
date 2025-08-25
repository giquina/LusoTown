"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  StarIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Crown, Shield, Users, Quote, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/config/cdn";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProtectionTestimonials() {
  const { language, t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: "ceo-lisbon",
      name: "António Silva",
      title: {
        en: "CEO, Lusophone Tech Company",
        pt: "CEO, Empresa Portuguesa de Tecnologia",
      },
      company: "TechLisboa International",
      location: "London Business Summit",
      service: {
        en: "Executive Protection",
        pt: "Proteção Executiva",
      },
      rating: 5,
      duration: "3 Days",
      image:
        IMAGES.testimonials.businessman,
      testimonial: {
        en: "The 7 Ps Framework exceeded every expectation. Their cultural understanding of Portuguese business practices was impeccable, and the discrete professionalism allowed me to focus entirely on the summit. The advance planning was extraordinary - they anticipated challenges I hadn't even considered. This is the gold standard for executive protection.",
        pt: "O Framework 7 Ps superou todas as expectativas. Sua compreensão cultural das práticas empresariais portuguesas foi impecável, e o profissionalismo discreto me permitiu focar inteiramente no summit. O planejamento antecipado foi extraordinário - eles anteciparam desafios que eu nem tinha considerado. Este é o padrão ouro para proteção executiva.",
      },
      highlight: {
        en: "Anticipated challenges I hadn't even considered",
        pt: "Anteciparam desafios que eu nem tinha considerado",
      },
      categories: ["Planning", "Professionalism", "Cultural Competency"],
    },
    {
      id: "family-porto",
      name: "Maria & João Fernandes",
      title: {
        en: "Lusophone Business Family",
        pt: "Família Empresarial Portuguesa",
      },
      company: "Fernandes Holdings",
      location: "United Kingdom Cultural Tour",
      service: {
        en: "Family Protection",
        pt: "Proteção Familiar",
      },
      rating: 5,
      duration: "1 Week",
      image:
        IMAGES.testimonials.family,
      testimonial: {
        en: "Traveling with our children across the United Kingdom required a unique approach to security. The team's preparation was meticulous - they understood our family dynamics and created a protection plan that felt natural, not intrusive. Our children felt safe and comfortable throughout the entire journey. The Lusophone cultural guidance made our experience even more enriching.",
        pt: "Viajar com nossos filhos pelo Reino Unido exigiu uma abordagem única à segurança. A preparação da equipe foi meticulosa - eles entenderam nossa dinâmica familiar e criaram um plano de proteção que pareceu natural, não intrusivo. Nossos filhos se sentiram seguros e confortáveis durante toda a jornada. A orientação cultural portuguesa tornou nossa experiência ainda mais enriquecedora.",
      },
      highlight: {
        en: "Protection plan that felt natural, not intrusive",
        pt: "Plano de proteção que pareceu natural, não intrusivo",
      },
      categories: ["Preparation", "Presence", "Cultural Integration"],
    },
    {
      id: "diplomat-madeira",
      name: "Dr. Isabel Rodrigues",
      title: {
        en: "Lusophone Trade Attaché",
        pt: "Adida Comercial Portuguesa",
      },
      company: "Lusophone Embassy",
      location: "Royal Windsor Event",
      service: {
        en: "Diplomatic Protection",
        pt: "Proteção Diplomática",
      },
      rating: 5,
      duration: "2 Days",
      image:
        IMAGES.testimonials.diplomat,
      testimonial: {
        en: "Working with Royal Protocol requires absolute precision and cultural sensitivity. The team's proactive approach and prevention strategies were flawless. They seamlessly integrated with Royal Protection Service while maintaining our Lusophone delegation's dignity and protocol requirements. Their professionalism reflected excellently on Portugal's representation.",
        pt: "Trabalhar com Protocolo Real requer precisão absoluta e sensibilidade cultural. A abordagem proativa da equipe e estratégias de prevenção foram impecáveis. Eles se integraram perfeitamente ao Serviço de Proteção Real enquanto mantinham a dignidade da nossa delegação portuguesa e requisitos de protocolo. Seu profissionalismo refletiu excelentemente na representação de Portugal.",
      },
      highlight: {
        en: "Seamlessly integrated with Royal Protection Service",
        pt: "Integraram-se perfeitamente ao Serviço de Proteção Real",
      },
      categories: ["Prevention", "Proactivity", "Protocol Excellence"],
    },
    {
      id: "entrepreneur-azores",
      name: "Carlos Mendes",
      title: {
        en: "Lusophone Entrepreneur",
        pt: "Empresário Português",
      },
      company: "Atlantic Ventures",
      location: "London Investment Conference",
      service: {
        en: "Business Event Protection",
        pt: "Proteção de Evento Empresarial",
      },
      rating: 5,
      duration: "5 Days",
      image:
        IMAGES.testimonials.entrepreneur,
      testimonial: {
        en: "As someone who values privacy and discrete service, the team's presence was exactly what I needed. Their protection allowed me to engage naturally with investors and partners while maintaining complete security. The cultural bridge they provided with other Portuguese business leaders was invaluable for networking.",
        pt: "Como alguém que valoriza privacidade e serviço discreto, a presença da equipe foi exatamente o que eu precisava. Sua proteção me permitiu me envolver naturalmente com investidores e parceiros enquanto mantinha segurança completa. A ponte cultural que eles forneceram com outros líderes empresariais portugueses foi inestimável para networking.",
      },
      highlight: {
        en: "Cultural bridge with Portuguese business leaders was invaluable",
        pt: "Ponte cultural com líderes empresariais portugueses foi inestimável",
      },
      categories: ["Presence", "Networking Facilitation", "Discrete Service"],
    },
  ];

  const activeTestimony = testimonials[activeTestimonial];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "Executive Protection":
      case "Proteção Executiva":
        return BuildingOffice2Icon;
      case "Family Protection":
      case "Proteção Familiar":
        return UserGroupIcon;
      case "Diplomatic Protection":
      case "Proteção Diplomática":
        return GlobeEuropeAfricaIcon;
      default:
        return Shield;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-primary-50">
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
            {t(
              "framework.testimonials.title",
              "Portuguese-speaking community Trust & Excellence"
            )}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            {language === "pt"
              ? "Testemunhos reais de líderes empresariais portugueses que experimentaram nosso Framework de Excelência 7 Ps em operações de proteção de alto perfil."
              : "Real testimonials from Portuguese business leaders who have experienced our 7 Ps Excellence Framework in high-profile protection operations."}
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
        >
          <div className="grid lg:grid-cols-2">
            {/* Testimonial Content */}
            <div className="p-8 lg:p-12">
              <div className="flex items-start mb-6">
                <Quote className="w-8 h-8 text-premium-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 text-accent-500 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm text-neutral-500">
                      {activeTestimony.rating}/5
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-lg mb-6">
                    "
                    {language === "pt"
                      ? activeTestimony.testimonial.pt
                      : activeTestimony.testimonial.en}
                    "
                  </p>

                  {/* Highlight Quote */}
                  <div className="bg-premium-50 border-l-4 border-premium-500 p-4 mb-6">
                    <p className="text-premium-800 font-medium italic">
                      "
                      {language === "pt"
                        ? activeTestimony.highlight.pt
                        : activeTestimony.highlight.en}
                      "
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="border-t border-neutral-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900">
                      {activeTestimony.name}
                    </h4>
                    <p className="text-neutral-600">
                      {language === "pt"
                        ? activeTestimony.title.pt
                        : activeTestimony.title.en}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {activeTestimony.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-neutral-500 mb-1">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {activeTestimony.duration}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {activeTestimony.location}
                    </div>
                  </div>
                </div>

                {/* Service Type */}
                <div className="flex items-center">
                  {(() => {
                    const IconComponent = getServiceIcon(
                      activeTestimony.service.en
                    );
                    return (
                      <IconComponent className="w-5 h-5 text-premium-600 mr-2" />
                    );
                  })()}
                  <span className="text-premium-600 font-medium">
                    {language === "pt"
                      ? activeTestimony.service.pt
                      : activeTestimony.service.en}
                  </span>
                </div>

                {/* Framework Categories */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {activeTestimony.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Image */}
            <div className="relative bg-gradient-to-br from-premium-100 to-primary-100 lg:min-h-full flex items-center justify-center p-12">
              <div className="w-48 h-48 bg-neutral-300 rounded-full flex items-center justify-center">
                <Users className="w-20 h-20 text-neutral-500" />
              </div>

              {/* Service Badge */}
              <div className="absolute top-6 right-6 bg-white rounded-lg p-3 shadow-lg">
                {(() => {
                  const IconComponent = getServiceIcon(
                    activeTestimony.service.en
                  );
                  return <IconComponent className="w-6 h-6 text-premium-600" />;
                })()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial
                    ? "bg-premium-600"
                    : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Trust Metrics */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <div className="text-3xl font-bold text-premium-600 mb-2">100%</div>
            <div className="text-neutral-600 text-sm">
              {t("framework.testimonials.satisfaction", "Client Satisfaction")}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <div className="text-3xl font-bold text-premium-600 mb-2">50+</div>
            <div className="text-neutral-600 text-sm">
              {t(
                "framework.testimonials.executives",
                "Lusophone Executives Protected"
              )}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <div className="text-3xl font-bold text-premium-600 mb-2">5.0</div>
            <div className="text-neutral-600 text-sm">
              {t("framework.testimonials.rating", "Average Rating")}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <div className="text-3xl font-bold text-premium-600 mb-2">24/7</div>
            <div className="text-neutral-600 text-sm">
              {t("framework.testimonials.availability", "Service Availability")}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
