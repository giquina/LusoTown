"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CpuChipIcon,
  SparklesIcon,
  BriefcaseIcon,
  UserGroupIcon,
  GlobeAltIcon,
  TrophyIcon,
  ChartBarIcon,
  LightBulbIcon,
  CheckCircleIcon,
  HandshakeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface BusinessNetworkingAlgorithmProps {
  onAlgorithmDemo?: () => void;
}

export default function BusinessNetworkingAlgorithm({
  onAlgorithmDemo,
}: BusinessNetworkingAlgorithmProps) {
  const { language } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const algorithmMetrics = [
    {
      id: "professional_alignment",
      title: language === "pt" ? "Alinhamento Profissional" : "Professional Alignment",
      description: language === "pt" 
        ? "Avalia compatibilidade de indústria, experiência e objetivos de carreira"
        : "Evaluates industry compatibility, experience and career goals",
      weight: 35,
      icon: BriefcaseIcon,
      color: "from-blue-500 to-blue-600",
      factors: [
        language === "pt" ? "Compatibilidade de indústria" : "Industry compatibility",
        language === "pt" ? "Nível de experiência complementar" : "Complementary experience level",
        language === "pt" ? "Objetivos de networking alinhados" : "Aligned networking goals",
        language === "pt" ? "Tamanho de empresa similar" : "Similar company size",
      ],
    },
    {
      id: "cultural_business_fit",
      title: language === "pt" ? "Compatibilidade Cultural Profissional" : "Cultural Business Fit",
      description: language === "pt"
        ? "Mede afinidade cultural portuguesa no contexto profissional"
        : "Measures Portuguese cultural affinity in professional context",
      weight: 25,
      icon: GlobeAltIcon,
      color: "from-green-500 to-green-600",
      factors: [
        language === "pt" ? "Herança portuguesa partilhada" : "Shared Portuguese heritage",
        language === "pt" ? "Compreensão do mercado português" : "Understanding of Portuguese market",
        language === "pt" ? "Experiência de imigração similar" : "Similar immigration experience",
        language === "pt" ? "Valores culturais no trabalho" : "Cultural work values",
      ],
    },
    {
      id: "networking_value",
      title: language === "pt" ? "Valor de Networking" : "Networking Value",
      description: language === "pt"
        ? "Calcula potencial de valor mútuo e oportunidades de colaboração"
        : "Calculates mutual value potential and collaboration opportunities",
      weight: 20,
      icon: UserGroupIcon,
      color: "from-purple-500 to-purple-600",
      factors: [
        language === "pt" ? "Complementaridade de competências" : "Skill complementarity",
        language === "pt" ? "Potencial de referências" : "Referral potential",
        language === "pt" ? "Oportunidades de parceria" : "Partnership opportunities",
        language === "pt" ? "Expansão de rede" : "Network expansion",
      ],
    },
    {
      id: "mentorship_match",
      title: language === "pt" ? "Compatibilidade de Mentoria" : "Mentorship Match",
      description: language === "pt"
        ? "Identifica oportunidades ideais de mentor-mentorando"
        : "Identifies ideal mentor-mentee opportunities",
      weight: 10,
      icon: AcademicCapIcon,
      color: "from-orange-500 to-orange-600",
      factors: [
        language === "pt" ? "Diferencial de experiência" : "Experience differential",
        language === "pt" ? "Interesse em mentoria" : "Mentorship interest",
        language === "pt" ? "Disponibilidade temporal" : "Time availability",
        language === "pt" ? "Estilo de comunicação" : "Communication style",
      ],
    },
    {
      id: "business_innovation",
      title: language === "pt" ? "Potencial de Inovação" : "Innovation Potential",
      description: language === "pt"
        ? "Avalia potencial para projetos inovadores e empreendedorismo"
        : "Evaluates potential for innovative projects and entrepreneurship",
      weight: 10,
      icon: LightBulbIcon,
      color: "from-yellow-500 to-yellow-600",
      factors: [
        language === "pt" ? "Interesse em empreendedorismo" : "Entrepreneurship interest",
        language === "pt" ? "Experiência em inovação" : "Innovation experience",
        language === "pt" ? "Apetite para risco" : "Risk appetite",
        language === "pt" ? "Visão estratégica" : "Strategic vision",
      ],
    },
  ];

  const algorithmFeatures = [
    {
      title: language === "pt" ? "Machine Learning Adaptativo" : "Adaptive Machine Learning",
      description: language === "pt"
        ? "Aprende com interações para melhorar sugestões futuras"
        : "Learns from interactions to improve future suggestions",
      icon: CpuChipIcon,
    },
    {
      title: language === "pt" ? "Análise de Tendências de Mercado" : "Market Trend Analysis",
      description: language === "pt"
        ? "Considera tendências atuais do mercado português e britânico"
        : "Considers current Portuguese and British market trends",
      icon: ChartBarIcon,
    },
    {
      title: language === "pt" ? "Feedback em Tempo Real" : "Real-time Feedback",
      description: language === "pt"
        ? "Ajusta algoritmo baseado no sucesso das conexões"
        : "Adjusts algorithm based on connection success rates",
      icon: SparklesIcon,
    },
    {
      title: language === "pt" ? "Análise de Qualidade de Rede" : "Network Quality Analysis",
      description: language === "pt"
        ? "Avalia a qualidade e diversidade da rede profissional"
        : "Evaluates professional network quality and diversity",
      icon: UserGroupIcon,
    },
  ];

  const getTotalWeight = () => {
    return algorithmMetrics.reduce((total, metric) => total + metric.weight, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border-b border-primary-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl">
            <CpuChipIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-900">
              {language === "pt" ? "Algoritmo de Networking Português" : "Portuguese Networking Algorithm"}
            </h3>
            <p className="text-sm text-primary-600">
              {language === "pt" 
                ? "Sistema inteligente de correspondência profissional para a comunidade portuguesa"
                : "Intelligent professional matching system for the Portuguese community"}
            </p>
          </div>
        </div>
      </div>

      {/* Algorithm Metrics */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-secondary-500" />
          {language === "pt" ? "Métricas do Algoritmo" : "Algorithm Metrics"}
        </h4>

        <div className="space-y-4 mb-6">
          {algorithmMetrics.map((metric) => {
            const Icon = metric.icon;
            const isSelected = selectedMetric === metric.id;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "border-primary-300 bg-primary-25 shadow-lg" 
                    : "border-primary-200 hover:border-primary-300 hover:bg-primary-25"
                }`}
                onClick={() => setSelectedMetric(isSelected ? null : metric.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary-900">{metric.title}</h5>
                      <p className="text-sm text-primary-600">{metric.description}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-900">{metric.weight}%</div>
                    <div className="text-xs text-primary-600">
                      {language === "pt" ? "Peso" : "Weight"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-primary-100 rounded-full h-2 mb-3">
                  <motion.div
                    className={`bg-gradient-to-r ${metric.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.weight / getTotalWeight()) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-primary-200"
                  >
                    <h6 className="font-semibold text-primary-900 mb-3">
                      {language === "pt" ? "Fatores Avaliados:" : "Evaluated Factors:"}
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {metric.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-primary-700">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Algorithm Features */}
        <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-4 border border-secondary-200 mb-6">
          <h4 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-secondary-600" />
            {language === "pt" ? "Características Avançadas" : "Advanced Features"}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {algorithmFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-secondary-200">
                    <Icon className="w-4 h-4 text-secondary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-secondary-900 text-sm">{feature.title}</h5>
                    <p className="text-xs text-secondary-700">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-xl p-4 border border-accent-200">
          <h4 className="text-lg font-bold text-accent-900 mb-4 flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-accent-600" />
            {language === "pt" ? "Métricas de Sucesso" : "Success Metrics"}
          </h4>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent-900">92%</div>
              <div className="text-xs text-accent-700">
                {language === "pt" ? "Taxa de Matches Bem-sucedidos" : "Successful Match Rate"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-900">3.7</div>
              <div className="text-xs text-accent-700">
                {language === "pt" ? "Conexões Médias por Utilizador" : "Avg Connections per User"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-900">85%</div>
              <div className="text-xs text-accent-700">
                {language === "pt" ? "Satisfação com Qualidade" : "Quality Satisfaction"}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Button */}
        {onAlgorithmDemo && (
          <div className="mt-6 text-center">
            <button
              onClick={onAlgorithmDemo}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg"
            >
              {language === "pt" ? "Ver Demonstração" : "View Demo"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}