"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  UsersIcon,
  ScaleIcon,
  AcademicCapIcon,
  SparklesIcon,
  TrophyIcon,
  ChartBarIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import BusinessNetworkingMatch from "@/components/matches/BusinessNetworkingMatch";
import BusinessNetworkingAlgorithm from "@/components/matches/BusinessNetworkingAlgorithm";
import Footer from "@/components/Footer";

export default function BusinessNetworkingPage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'overview' | 'matching' | 'algorithm'>('overview');

  const networkingFeatures = [
    {
      icon: BriefcaseIcon,
      title: language === "pt" ? "Correspondência por Indústria" : "Industry-Specific Matching",
      description: language === "pt" 
        ? "Conecte-se com profissionais da sua área de atuação para oportunidades direcionadas"
        : "Connect with professionals in your industry for targeted opportunities",
      stats: language === "pt" ? "12+ sectores" : "12+ sectors",
    },
    {
      icon: AcademicCapIcon,
      title: language === "pt" ? "Sistema de Mentoria Português" : "Lusophone Mentorship System",
      description: language === "pt"
        ? "Encontre mentores experientes ou torne-se mentor para novos profissionais portugueses"
        : "Find experienced mentors or become a mentor for new Lusophone professionals",
      stats: language === "pt" ? "85% sucesso" : "85% success rate",
    },
    {
      icon: ScaleIcon,
      title: language === "pt" ? "Parcerias de Negócio" : "Business Partnerships",
      description: language === "pt"
        ? "Identifique oportunidades de colaboração e parcerias estratégicas"
        : "Identify collaboration opportunities and strategic partnerships",
      stats: language === "pt" ? "150+ parcerias" : "150+ partnerships",
    },
    {
      icon: UsersIcon,
      title: language === "pt" ? "Eventos de Networking" : "Networking Events",
      description: language === "pt"
        ? "Participe em eventos exclusivos para profissionais portugueses em Londres"
        : "Participate in exclusive events for Lusophone professionals in London",
      stats: language === "pt" ? "20+ eventos/mês" : "20+ events/month",
    },
    {
      icon: GlobeAltIcon,
      title: language === "pt" ? "Mercado Portugal-Reino Unido" : "Portugal-United Kingdom Market",
      description: language === "pt"
        ? "Acesso a oportunidades de negócio entre Portugal e Reino Unido"
        : "Access business opportunities between Portugal and the United Kingdom",
      stats: language === "pt" ? "£2.5B comércio" : "£2.5B trade volume",
    },
    {
      icon: TrophyIcon,
      title: language === "pt" ? "Desenvolvimento Profissional" : "Professional Development",
      description: language === "pt"
        ? "Workshops, masterclasses e recursos para crescimento de carreira"
        : "Workshops, masterclasses and resources for career growth",
      stats: language === "pt" ? "50+ recursos" : "50+ resources",
    },
  ];

  const successStories = [
    {
      name: "Carlos Mendes",
      title: language === "pt" ? "FinTech Entrepreneur" : "FinTech Entrepreneur",
      company: "LusoFinance",
      story: language === "pt"
        ? "Encontrei o meu co-fundador através da plataforma. Agora temos uma empresa de £5M em financiamento."
        : "I found my co-founder through the platform. We now have a £5M funded company.",
      achievement: language === "pt" ? "Series A £5M" : "Series A £5M",
      image: "🇵🇹",
    },
    {
      name: "Ana Rodrigues",
      title: language === "pt" ? "Sustainable Fashion CEO" : "Sustainable Fashion CEO", 
      company: "Herança Portuguesa",
      story: language === "pt"
        ? "Conectei-me com fornecedores portugueses e agora exportamos para 15 países."
        : "Connected with Lusophone suppliers and now we export to 15 countries.",
      achievement: language === "pt" ? "15 países" : "15 countries",
      image: "👗",
    },
    {
      name: "Pedro Silva",
      title: language === "pt" ? "Digital Marketing Specialist" : "Digital Marketing Specialist",
      company: "LusoMedia",
      story: language === "pt"
        ? "Através de mentorship, consegui 3x mais clientes e lancei a minha agência."
        : "Through mentorship, I got 3x more clients and launched my agency.",
      achievement: language === "pt" ? "300% crescimento" : "300% growth",
      image: "📱",
    },
  ];

  const businessStats = [
    {
      number: "2,500+",
      label: language === "pt" ? "Profissionais Portugueses" : "Lusophone Professionals",
      description: language === "pt" ? "Registados na plataforma" : "Registered on platform",
    },
    {
      number: "450+",
      label: language === "pt" ? "Conexões de Negócio" : "Business Connections",
      description: language === "pt" ? "Realizadas este mês" : "Made this month",
    },
    {
      number: "£12M+",
      label: language === "pt" ? "Valor de Negócios" : "Business Value",
      description: language === "pt" ? "Gerado através de parcerias" : "Generated through partnerships",
    },
    {
      number: "92%",
      label: language === "pt" ? "Taxa de Satisfação" : "Satisfaction Rate",
      description: language === "pt" ? "Com qualidade dos matches" : "With match quality",
    },
  ];

  const sections = [
    {
      id: 'overview' as const,
      label: language === "pt" ? "Visão Geral" : "Overview",
      icon: SparklesIcon,
    },
    {
      id: 'matching' as const,
      label: language === "pt" ? "Sistema de Matches" : "Matching System",
      icon: UsersIcon,
    },
    {
      id: 'algorithm' as const,
      label: language === "pt" ? "Algoritmo" : "Algorithm",
      icon: CpuChipIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
              <BriefcaseIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-900">
                {language === "pt" ? "Networking Profissional Português" : "Lusophone Professional Networking"}
              </h1>
              <p className="text-xl text-primary-600 mt-2">
                {language === "pt" 
                  ? "A maior rede de profissionais portugueses no Reino Unido"
                  : "The largest network of Lusophone professionals in the United Kingdom"}
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl p-6 shadow-lg border border-primary-100 mb-8">
            {businessStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-900 mb-1">{stat.number}</div>
                <div className="text-sm font-semibold text-primary-700">{stat.label}</div>
                <div className="text-xs text-primary-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-primary-100">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                      : "text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Features Grid */}
            <div>
              <h2 className="text-2xl font-bold text-primary-900 text-center mb-8">
                {language === "pt" ? "Funcionalidades Principais" : "Key Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {networkingFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {feature.stats}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-primary-900 mb-2">{feature.title}</h3>
                      <p className="text-primary-600 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold text-primary-900 text-center mb-8">
                {language === "pt" ? "Histórias de Sucesso" : "Success Stories"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-2xl">
                        {story.image}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-900">{story.name}</h3>
                        <p className="text-sm text-primary-600">{story.title}</p>
                        <p className="text-xs text-secondary-600 font-medium">{story.company}</p>
                      </div>
                    </div>
                    <p className="text-primary-700 text-sm italic mb-4">"{story.story}"</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {story.achievement}
                      </span>
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {language === "pt" ? "Pronto para Expandir a Sua Rede?" : "Ready to Expand Your Network?"}
              </h2>
              <p className="text-xl mb-6 opacity-90">
                {language === "pt"
                  ? "Junte-se a milhares de profissionais portugueses que já transformaram as suas carreiras"
                  : "Join thousands of Lusophone professionals who have already transformed their careers"}
              </p>
              <button
                onClick={() => setActiveSection('matching')}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-lg flex items-center gap-2 mx-auto"
              >
                {language === "pt" ? "Começar Networking" : "Start Networking"}
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {activeSection === 'matching' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BusinessNetworkingMatch
              currentUserId="demo-user"
              onBusinessMatchAction={(matchId, action) => {
                console.log('Demo: Business match action:', matchId, action);
              }}
              onMentorshipRequest={(menteeId, mentorId) => {
                console.log('Demo: Mentorship request:', menteeId, mentorId);
              }}
              onBusinessEventBooking={(eventId, matchId) => {
                console.log('Demo: Business event booking:', eventId, matchId);
              }}
            />
          </motion.div>
        )}

        {activeSection === 'algorithm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BusinessNetworkingAlgorithm
              onAlgorithmDemo={() => {
                setActiveSection('matching');
              }}
            />
          </motion.div>
        )}
      </div>
      </div>
      
      <Footer />
    </div>
  );
}