"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  VideoCameraIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MicrophoneIcon,
  TvIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { 
  Crown, 
  Video, 
  Zap, 
  TrendingUp, 
  DollarSign,
  Users,
  Settings,
  BarChart3,
  Gamepad2,
  Music,
  Briefcase,
  Heart,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { communityStats } from '@/config/community';
import { CONTENT } from '@/config/content';
import { ROUTES } from '@/config/routes';

// Creator tier packages - generalized for any audience
const creatorTiers = [
  {
    id: "starter",
    name: "Creator Starter",
    namePortuguese: "Criador Iniciante", 
    price: 19,
    originalPrice: 29,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/creator-starter-setup_dlqxkx.jpg",
    imageAlt: "Content creator setup with professional streaming equipment",
    imageAltPortuguese: "Configuração de criador de conteúdo com equipamento de streaming profissional",
    membershipDiscounts: {
      free: 0,
      community: 10,
      ambassador: 20,
    },
    description: `Perfect for content creators starting their streaming journey in ${CONTENT.region.prepositioned}`,
    descriptionPortuguese: `Perfeito para criadores de conteúdo começando sua jornada de streaming em ${CONTENT.region.prepositioned}`,
    popular: true,
    features: [
      "RTMP streaming to community",
      "Cultural emotes pack",
      "Community chat moderation",
      "Basic analytics dashboard",
      "Mobile streaming support via Streamlabs",
      `${CONTENT.region.short} events integration`,
      "Multi-language support",
      "Community networking opportunities",
    ],
    featuresPortuguese: [
      "Streaming RTMP para comunidade",
      "Pack de emotes culturais",
      "Moderação de chat da comunidade",
      "Dashboard de analytics básico",
      "Suporte para streaming mobile via Streamlabs",
      `Integração com eventos de ${CONTENT.region.prepositioned}`,
      "Suporte multi-idioma",
      "Oportunidades de networking comunitário",
    ],
    color: "secondary",
    targetAudience: "content_creators",
  },
  {
    id: "professional",
    name: "Professional Creator",
    namePortuguese: "Criador Profissional",
    price: 49,
    originalPrice: 69,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535201/professional-creator-studio_hml2nr.jpg",
    imageAlt: `Professional streaming studio with advanced equipment and ${CONTENT.region.short} backdrop`,
    imageAltPortuguese: `Estúdio de streaming profissional com equipamento avançado e cenário de ${CONTENT.region.prepositioned}`,
    membershipDiscounts: {
      free: 0,
      community: 15,
      ambassador: 25,
    },
    description: `Advanced streaming tools for established content creators and businesses in ${CONTENT.region.prepositioned}`,
    descriptionPortuguese: `Ferramentas avançadas de streaming para criadores de conteúdo estabelecidos e empresas em ${CONTENT.region.prepositioned}`,
    features: [
      "All Creator Starter features",
      "Multi-stream to YouTube, Twitch, TikTok simultaneously",
      "Advanced cultural content categories",
      "Priority customer support",
      "Custom branding and overlays",
      "Advanced analytics and insights",
      "Monetization tools and revenue sharing",
      "Community management features",
    ],
    featuresPortuguese: [
      "Todas as funcionalidades Creator Starter",
      "Multi-stream para YouTube, Twitch, TikTok simultaneamente",
      "Categorias avançadas de conteúdo cultural",
      "Suporte prioritário ao cliente",
      "Branding personalizado e overlays",
      "Analytics avançado e insights",
      "Ferramentas de monetização e partilha de receita",
      "Funcionalidades de gestão de comunidade",
    ],
    color: "primary",
    targetAudience: "professional_creators",
  },
];

// Streaming statistics - generalized
const streamingStats = [
  {
    icon: Users,
    value: "180+",
    label: "Active Streamers",
    labelPt: "Streamers Ativos"
  },
  {
    icon: Video,
    value: "50+",
    label: "Hours Daily",
    labelPt: "Horas Diárias"
  },
  {
    icon: TrendingUp,
    value: "25k+",
    label: "Monthly Views",
    labelPt: "Visualizações Mensais"
  },
  {
    icon: DollarSign,
    value: "85%",
    label: "Revenue Share",
    labelPt: "Partilha Receita"
  }
];

// Streaming success steps - generalized
const streamingSteps = [
  {
    step: "01",
    icon: VideoCameraIcon,
    title: "Setup Your Stream",
    titlePortuguese: "Configure Seu Stream",
    description: "Get your streaming equipment ready and configure your broadcast settings for the best quality.",
    descriptionPortuguese: "Prepare seu equipamento de streaming e configure as definições de transmissão para a melhor qualidade."
  },
  {
    step: "02", 
    icon: UserGroupIcon,
    title: "Build Your Audience",
    titlePortuguese: "Construa Sua Audiência",
    description: `Connect with viewers across ${CONTENT.region.prepositioned} and build a loyal community around your content.`,
    descriptionPortuguese: `Conecte-se com espectadores em ${CONTENT.region.prepositioned} e construa uma comunidade leal em torno do seu conteúdo.`
  },
  {
    step: "03",
    icon: DollarSign,
    title: "Monetize Content",
    titlePortuguese: "Monetize Conteúdo", 
    description: "Start earning through subscriptions, donations, and revenue sharing with our creator program.",
    descriptionPortuguese: "Comece a ganhar através de subscrições, doações e partilha de receitas com nosso programa de criadores."
  }
];

export default function StreamingPage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, createSubscription } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Success counter animation
  const [visibleStreamers, setVisibleStreamers] = useState(180);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStreamers(prev => prev === 180 ? 184 : 180);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isPortuguese = language === "pt";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/creator-streaming-setup_dlqxkx.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-secondary-900/5"></div>
        
        <div className="relative container-width py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <VideoCameraIcon className="w-4 h-4 mr-2 text-primary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? "Plataforma de Streaming" : "Streaming Platform"}
                </span>
              </span>
            </motion.div>

            {/* Title with Desktop/Mobile Responsive */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              <span className="hidden sm:block">
                {isPortuguese ? "Quer tornar-se um streamer?" : CONTENT.streaming.heroTitle}
              </span>
              <span className="sm:hidden">
                {isPortuguese ? "Streaming" : "Streaming"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? `em ${CONTENT.region.prepositioned}` : `in ${CONTENT.region.prepositioned}`}
              </span>
            </motion.h1>

            {/* Subtitle with Desktop/Mobile Responsive */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              <span className="hidden sm:block">
                {isPortuguese 
                  ? `Torne-se um criador de conteúdo e faça crescer sua audiência em ${CONTENT.region.prepositioned}.`
                  : CONTENT.streaming.heroSubtitle
                }
              </span>
              <span className="sm:hidden">
                {isPortuguese 
                  ? `Streaming em ${CONTENT.region.prepositioned}`
                  : `Streaming in ${CONTENT.region.prepositioned}`
                }
              </span>
            </motion.p>

            {/* Feature dots */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>{isPortuguese ? "RTMP Professional" : "Professional RTMP"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>{isPortuguese ? "Emotes Culturais" : "Cultural Emotes"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>{isPortuguese ? "Monetização" : "Monetization"}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-row gap-3 sm:gap-4 justify-center mb-8"
            >
              <a 
                href={ROUTES.streamingGetStarted}
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-6 sm:px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 flex-1 max-w-[180px] sm:max-w-none text-center"
              >
                {isPortuguese ? "Começar a Criar" : CONTENT.streaming.ctaPrimary}
              </a>
              <a 
                href={ROUTES.streamingLearn}
                className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 max-w-[180px] sm:max-w-none text-center"
              >
                {isPortuguese ? "Saber Mais" : CONTENT.streaming.ctaSecondary}
              </a>
            </motion.div>

            {/* Live stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            >
              {streamingStats.map((stat, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                  <stat.icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.label === "Active Streamers" ? visibleStreamers + "+" : stat.value}
                  </div>
                  <div className="text-xs text-gray-600">
                    {isPortuguese ? stat.labelPt : stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {isPortuguese ? "Como Funciona" : "How It Works"}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isPortuguese 
                ? `Comece sua jornada de streaming em ${CONTENT.region.prepositioned} em 3 passos simples`
                : `Start your streaming journey in ${CONTENT.region.prepositioned} in 3 simple steps`
              }
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {streamingSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? step.titlePortuguese : step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {isPortuguese ? step.descriptionPortuguese : step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Packages Section */}
      <section className="py-20 bg-white" id="packages">
        <div className="container-width">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {isPortuguese ? "Pacotes de Criador" : "Creator Packages"}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isPortuguese 
                ? "Escolha o plano perfeito para suas necessidades de streaming"
                : "Choose the perfect plan for your streaming needs"
              }
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {creatorTiers.map((tier, index) => (
              <motion.div 
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  tier.popular ? 'border-primary-300 ring-4 ring-primary-100' : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      {isPortuguese ? "Mais Popular" : "Most Popular"}
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {isPortuguese ? tier.namePortuguese : tier.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {isPortuguese ? tier.descriptionPortuguese : tier.description}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <span className="text-4xl font-black text-gray-900">£{tier.price}</span>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 line-through">£{tier.originalPrice}</div>
                        <div className="text-sm text-gray-600">/month</div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {(isPortuguese ? tier.featuresPortuguese : tier.features).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-xl hover:shadow-2xl'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-primary-50'
                    }`}
                  >
                    {isPortuguese ? "Começar Agora" : "Get Started"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}