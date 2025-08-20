"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { Video, Settings, Users, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { CONTENT } from '@/config/content';
import { ROUTES } from '@/config/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Get Started Streaming - ${CONTENT.streaming.seoTitle}`,
  description: `Learn how to start streaming and grow your audience in ${CONTENT.region.prepositioned}`,
};

const streamingSteps = [
  {
    icon: CogIcon,
    title: "Setup Equipment",
    titlePortuguese: "Configure Equipamento",
    description: `Get your streaming setup ready with professional equipment recommendations for creators in ${CONTENT.region.prepositioned}`,
    descriptionPortuguese: `Prepare sua configuração de streaming com recomendações de equipamento profissional para criadores em ${CONTENT.region.prepositioned}`,
    duration: "15 min"
  },
  {
    icon: VideoCameraIcon,
    title: "Configure Software",
    titlePortuguese: "Configure Software",
    description: "Set up OBS Studio or Streamlabs OBS with optimal settings for your content",
    descriptionPortuguese: "Configure OBS Studio ou Streamlabs OBS com configurações ideais para seu conteúdo",
    duration: "20 min"
  },
  {
    icon: UserGroupIcon,
    title: "Build Community",
    titlePortuguese: "Construa Comunidade",
    description: `Connect with viewers across ${CONTENT.region.prepositioned} and grow your audience`,
    descriptionPortuguese: `Conecte-se com espectadores em ${CONTENT.region.prepositioned} e faça crescer sua audiência`,
    duration: "Ongoing"
  },
  {
    icon: TrendingUp,
    title: "Monetize Content",
    titlePortuguese: "Monetize Conteúdo",
    description: "Learn about revenue streams, sponsorships, and creator programs",
    descriptionPortuguese: "Aprenda sobre fluxos de receita, patrocínios e programas de criadores",
    duration: "Ongoing"
  }
];

const equipment = [
  {
    category: "Camera",
    categoryPortuguese: "Câmera",
    items: ["Webcam HD 1080p", "DSLR Camera (advanced)", "Action Camera"],
    itemsPortuguese: ["Webcam HD 1080p", "Câmera DSLR (avançado)", "Câmera de Ação"]
  },
  {
    category: "Audio",
    categoryPortuguese: "Áudio",
    items: ["USB Microphone", "Audio Interface", "Headphones"],
    itemsPortuguese: ["Microfone USB", "Interface de Áudio", "Fones de Ouvido"]
  },
  {
    category: "Lighting",
    categoryPortuguese: "Iluminação",
    items: ["Ring Light", "LED Panel", "Natural Window Light"],
    itemsPortuguese: ["Ring Light", "Painel LED", "Luz Natural da Janela"]
  }
];

export default function GetStartedPage() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  
  const isPortuguese = language === "pt";

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
              {isPortuguese ? "Comece a Fazer Streaming" : "Get Started Streaming"}
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
                ? `Guia completo para começar sua jornada de streaming em ${CONTENT.region.prepositioned}. De configuração básica a monetização.`
                : `Complete guide to start your streaming journey in ${CONTENT.region.prepositioned}. From basic setup to monetization.`
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
                href={ROUTES.streamingLearn}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all"
              >
                {isPortuguese ? "Saiba Mais" : "Learn More"}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            {isPortuguese ? "Seu Caminho para o Sucesso" : "Your Path to Success"}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {streamingSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? step.titlePortuguese : step.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {isPortuguese ? step.descriptionPortuguese : step.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-600 font-medium">
                  <ClockIcon className="w-4 h-4" />
                  {step.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            {isPortuguese ? "Equipamento Recomendado" : "Recommended Equipment"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? category.categoryPortuguese : category.category}
                </h3>
                <ul className="space-y-3">
                  {(isPortuguese ? category.itemsPortuguese : category.items).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}