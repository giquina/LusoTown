"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  PlayIcon,
  VideoCameraIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
  TrendingUpIcon,
  LightBulbIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Video, Users, DollarSign, BarChart3, Lightbulb, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { CONTENT } from '@/config/content';
import { ROUTES } from '@/config/routes';

const learningModules = [
  {
    icon: VideoCameraIcon,
    title: "Streaming Basics",
    titlePortuguese: "Básicos de Streaming",
    description: "Learn the fundamentals of live streaming, equipment setup, and software configuration",
    descriptionPortuguese: "Aprenda os fundamentos do streaming ao vivo, configuração de equipamento e software",
    lessons: 8,
    duration: "2 hours"
  },
  {
    icon: UserGroupIcon,
    title: "Audience Building",
    titlePortuguese: "Construção de Audiência",
    description: `Master the art of growing and engaging your audience in ${CONTENT.region.prepositioned}`,
    descriptionPortuguese: `Domine a arte de fazer crescer e envolver sua audiência em ${CONTENT.region.prepositioned}`,
    lessons: 12,
    duration: "3 hours"
  },
  {
    icon: CurrencyPoundIcon,
    title: "Monetization Strategies",
    titlePortuguese: "Estratégias de Monetização",
    description: "Discover various revenue streams and monetization techniques for content creators",
    descriptionPortuguese: "Descubra várias fontes de receita e técnicas de monetização para criadores de conteúdo",
    lessons: 6,
    duration: "1.5 hours"
  },
  {
    icon: TrendingUpIcon,
    title: "Growth Analytics",
    titlePortuguese: "Analytics de Crescimento",
    description: "Understanding metrics, analytics, and data-driven growth strategies",
    descriptionPortuguese: "Entendendo métricas, analytics e estratégias de crescimento baseadas em dados",
    lessons: 10,
    duration: "2.5 hours"
  }
];

const tips = [
  {
    category: "Content",
    categoryPortuguese: "Conteúdo",
    tips: [
      "Be consistent with your streaming schedule",
      "Engage with your audience in real-time",
      "Create unique and authentic content",
      "Plan your content in advance"
    ],
    tipsPortuguese: [
      "Seja consistente com seu horário de streaming",
      "Envolva-se com sua audiência em tempo real",
      "Crie conteúdo único e autêntico",
      "Planeie seu conteúdo com antecedência"
    ]
  },
  {
    category: "Technical",
    categoryPortuguese: "Técnico",
    tips: [
      "Test your setup before going live",
      "Have backup equipment ready",
      "Monitor your stream quality",
      "Use good lighting and audio"
    ],
    tipsPortuguese: [
      "Teste sua configuração antes de ir ao vivo",
      "Tenha equipamento de backup pronto",
      "Monitore a qualidade do seu stream",
      "Use boa iluminação e áudio"
    ]
  },
  {
    category: "Community",
    categoryPortuguese: "Comunidade",
    tips: [
      "Build genuine relationships with viewers",
      "Moderate chat effectively",
      "Collaborate with other creators",
      `Connect with local communities in ${CONTENT.region.prepositioned}`
    ],
    tipsPortuguese: [
      "Construa relacionamentos genuínos com espectadores",
      "Modere o chat efetivamente",
      "Colabore com outros criadores",
      `Conecte-se com comunidades locais em ${CONTENT.region.prepositioned}`
    ]
  }
];

const resources = [
  {
    title: "OBS Studio Guide",
    titlePortuguese: "Guia OBS Studio",
    description: "Complete setup guide for OBS Studio streaming software",
    descriptionPortuguese: "Guia completo de configuração para software de streaming OBS Studio",
    type: "tutorial",
    duration: "45 min"
  },
  {
    title: "Content Planning Templates",
    titlePortuguese: "Modelos de Planejamento de Conteúdo",
    description: "Ready-to-use templates for planning your streaming content",
    descriptionPortuguese: "Modelos prontos para usar no planejamento do seu conteúdo de streaming",
    type: "resource",
    duration: "Download"
  },
  {
    title: "Community Guidelines",
    titlePortuguese: "Diretrizes da Comunidade",
    description: "Best practices for building and managing streaming communities",
    descriptionPortuguese: "Melhores práticas para construir e gerir comunidades de streaming",
    type: "guide",
    duration: "30 min"
  }
];

export default function LearnPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("modules");
  
  const isPortuguese = language === "pt";

  const tabs = [
    { id: "modules", label: isPortuguese ? "Módulos" : "Modules" },
    { id: "tips", label: isPortuguese ? "Dicas" : "Tips" },
    { id: "resources", label: isPortuguese ? "Recursos" : "Resources" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="relative container-width py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {isPortuguese ? "Aprenda a Fazer Streaming" : "Learn to Stream"}
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? `em ${CONTENT.region.prepositioned}` : `in ${CONTENT.region.prepositioned}`}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese 
                ? `Recursos abrangentes, tutoriais e dicas para se tornar um streamer de sucesso em ${CONTENT.region.prepositioned}.`
                : `Comprehensive resources, tutorials, and tips to become a successful streamer in ${CONTENT.region.prepositioned}.`
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4 mb-8"
            >
              <a 
                href={ROUTES.streaming}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                ← {isPortuguese ? "Voltar" : "Back"}
              </a>
              <a 
                href={ROUTES.streamingGetStarted}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all"
              >
                {isPortuguese ? "Começar" : "Get Started"}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container-width">
          <div className="flex justify-center">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          {/* Learning Modules */}
          {activeTab === "modules" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
                {isPortuguese ? "Módulos de Aprendizagem" : "Learning Modules"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {learningModules.map((module, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                      <module.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? module.titlePortuguese : module.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {isPortuguese ? module.descriptionPortuguese : module.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mb-6">
                      <span>{module.lessons} {isPortuguese ? "lições" : "lessons"}</span>
                      <span>{module.duration}</span>
                    </div>
                    <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all">
                      {isPortuguese ? "Começar Módulo" : "Start Module"}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {activeTab === "tips" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
                {isPortuguese ? "Dicas de Especialistas" : "Expert Tips"}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {tips.map((tipCategory, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? tipCategory.categoryPortuguese : tipCategory.category}
                    </h3>
                    <ul className="space-y-4">
                      {(isPortuguese ? tipCategory.tipsPortuguese : tipCategory.tips).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <LightBulbIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {activeTab === "resources" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
                {isPortuguese ? "Recursos Úteis" : "Useful Resources"}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                      <BookOpenIcon className="w-6 h-6 text-secondary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? resource.titlePortuguese : resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {isPortuguese ? resource.descriptionPortuguese : resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {resource.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}