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

// Creator tier packages - similar to transport service structure
const creatorTiers = [
  {
    id: "starter",
    name: "Streaming Starter",
    namePortuguese: "Iniciante de Streaming", 
    price: 19,
    originalPrice: 29,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/creator-starter-setup_dlqxkx.jpg",
    imageAlt: "UK streaming income setup with professional streaming equipment",
    imageAltPortuguese: "Configuração de renda de streaming do Reino Unido com equipamento de streaming profissional",
    membershipDiscounts: {
      free: 0,
      community: 10,
      ambassador: 20,
    },
    description: "Perfect for UK creators starting their streaming journey across diverse communities",
    descriptionPortuguese: "Perfeito para criadores do Reino Unido começando sua jornada de streaming em comunidades diversas",
    popular: true,
    features: [
      "RTMP streaming to UK communities",
      "Cultural emotes pack (:celebration:, :heritage:, :community:)",
      "Community chat moderation",
      "Basic analytics dashboard",
      "Mobile streaming support via Streamlabs",
      "UK events integration",
      "Multilingual support",
      "Community networking opportunities",
    ],
    featuresPortuguese: [
      "Streaming RTMP para comunidades do Reino Unido",
      "Pack de emotes culturais (:celebration:, :heritage:, :community:)",
      "Moderação de chat da comunidade",
      "Dashboard de analytics básico",
      "Suporte para streaming mobile via Streamlabs",
      "Integração com eventos do Reino Unido",
      "Suporte multilíngue",
      "Oportunidades de networking comunitário",
    ],
    color: "secondary",
    targetAudience: "streamers",
  },
  {
    id: "professional",
    name: "Professional Streamer",
    namePortuguese: "Streamer Profissional",
    price: 49,
    originalPrice: 69,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535201/professional-creator-studio_hml2nr.jpg",
    imageAlt: "Professional UK streaming studio with advanced equipment and modern backdrop",
    imageAltPortuguese: "Estúdio de streaming profissional do Reino Unido com equipamento avançado e cenário moderno",
    membershipDiscounts: {
      free: 0,
      community: 15,
      ambassador: 25,
    },
    description: "Advanced streaming income tools for established UK streamers and businesses",
    descriptionPortuguese: "Ferramentas avançadas de renda de streaming para streamers estabelecidos e empresas do Reino Unido",
    features: [
      "All Streaming Starter features",
      "Multi-stream to YouTube, Twitch, TikTok simultaneously",
      "Advanced cultural content categories",
      "Revenue sharing program (85/15 split)",
      "Priority community promotion",
      "Custom streaming overlays and graphics",
      "Advanced analytics and audience insights",
      "Direct integration with UK events",
      "Business workshop streaming capabilities",
      "Multilingual chat support",
    ],
    featuresPortuguese: [
      "Todas as funcionalidades do Criador Iniciante",
      "Multi-stream para YouTube, Twitch, TikTok simultaneamente",
      "Categorias avançadas de conteúdo cultural",
      "Programa de partilha de receitas (85/15 divisão)",
      "Promoção prioritária na comunidade",
      "Overlays e gráficos personalizados para streaming",
      "Analytics avançados e insights de audiência",
      "Integração direta com eventos do Reino Unido",
      "Capacidades de streaming de workshops de negócios",
      "Suporte de chat multilíngue",
    ],
    color: "primary",
    targetAudience: "professional_creators",
  },
  {
    id: "enterprise",
    name: "Enterprise Creator",
    namePortuguese: "Criador Empresarial",
    price: 199,
    originalPrice: 299,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535202/enterprise-streaming-setup_abc123.jpg",
    imageAlt: "Enterprise UK streaming setup for business events and community broadcasts",
    imageAltPortuguese: "Configuração de streaming empresarial do Reino Unido para eventos de negócios e transmissões comunitárias",
    membershipDiscounts: {
      free: 0,
      community: 20,
      ambassador: 30,
    },
    description: "Complete streaming solution for UK businesses, organizations, and major community events",
    descriptionPortuguese: "Solução completa de streaming para empresas, organizações e grandes eventos comunitários do Reino Unido",
    features: [
      "All Professional Creator features",
      "Dedicated community channels",
      "White-label streaming platform",
      "Multi-location UK streaming support",
      "Professional production team support",
      "Custom cultural programming",
      "Enterprise-grade security and moderation",
      "API access for custom integrations",
      "Dedicated account manager (multilingual)",
      "Premium community partnerships",
      "Event venue streaming partnerships across UK",
      "Corporate training and workshop capabilities",
    ],
    featuresPortuguese: [
      "Todas as funcionalidades do Criador Profissional",
      "Canais dedicados da comunidade",
      "Plataforma de streaming white-label",
      "Suporte para streaming multi-localização no Reino Unido",
      "Suporte de equipa de produção profissional",
      "Programação cultural personalizada",
      "Segurança e moderação de nível empresarial",
      "Acesso API para integrações personalizadas",
      "Gestor de conta dedicado (multilíngue)",
      "Parcerias premium da comunidade",
      "Parcerias de streaming com locais de eventos no Reino Unido",
      "Capacidades de formação corporativa e workshops",
    ],
    color: "accent",
    targetAudience: "enterprise_organizations",
  },
];

// Content categories for UK streamers
const contentCategories = [
  {
    id: "culture-heritage",
    name: "Culture & Heritage",
    namePortuguese: "Cultura e Patrimônio",
    icon: Music,
    description: "Cultural celebrations, traditional arts, heritage showcases",
    descriptionPortuguese: "Celebrações culturais, artes tradicionais, mostras de patrimônio",
    streamers: 45,
    color: "from-red-500 to-green-500",
  },
  {
    id: "business-networking",
    name: "Business & Networking", 
    namePortuguese: "Negócios e Networking",
    icon: Briefcase,
    description: "Professional development, technology workshops, startup talks",
    descriptionPortuguese: "Desenvolvimento profissional, workshops de tecnologia, conversas sobre startups",
    streamers: 28,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "gaming",
    name: "Gaming",
    namePortuguese: "Gaming",
    icon: Gamepad2,
    description: "UK gaming community, esports tournaments, game reviews",
    descriptionPortuguese: "Comunidade de gaming do Reino Unido, torneios de esports, resenhas de jogos",
    streamers: 67,
    color: "from-green-500 to-blue-500",
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Travel",
    namePortuguese: "Estilo de Vida e Viagens", 
    icon: Heart,
    description: "UK life, community events, travel vlogs, local experiences",
    descriptionPortuguese: "Vida no Reino Unido, eventos comunitários, vlogs de viagem, experiências locais",
    streamers: 34,
    color: "from-pink-500 to-orange-500",
  },
];

// Success metrics for streamers - updated dynamically
const getStreamingStats = (visibleStreamers: number, visibleViewers: number, activeNow: number, revenueGenerated: number) => [
  { 
    label: "Active Streamers", 
    labelPt: "Streamers Ativos", 
    value: `${visibleStreamers}+`, 
    icon: Video,
    isAnimated: true
  },
  { 
    label: "Monthly Viewers", 
    labelPt: "Visualizadores Mensais", 
    value: `${(visibleViewers / 1000).toFixed(1)}K`, 
    icon: Users,
    isAnimated: true
  },
  { 
    label: "Active Now", 
    labelPt: "Ativos Agora", 
    value: `${activeNow}`, 
    icon: Activity,
    isAnimated: true,
    isLive: true
  },
  { 
    label: "Revenue Generated", 
    labelPt: "Receita Gerada", 
    value: `£${(revenueGenerated / 1000).toFixed(0)}K+`, 
    icon: DollarSign,
    isAnimated: true
  },
];

export default function StreamingPage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, createSubscription } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Enhanced live stats animation
  const [visibleStreamers, setVisibleStreamers] = useState(180);
  const [visibleViewers, setVisibleViewers] = useState(12500);
  const [activeNow, setActiveNow] = useState(24);
  const [revenueGenerated, setRevenueGenerated] = useState(45000);

  useEffect(() => {
    // Animate streamers count (every 4 seconds)
    const streamersInterval = setInterval(() => {
      setVisibleStreamers(prev => {
        const variations = [180, 182, 185, 183, 184, 181, 186];
        const currentIndex = variations.indexOf(prev);
        const nextIndex = (currentIndex + 1) % variations.length;
        return variations[nextIndex];
      });
    }, 4000);

    // Animate active now count more frequently (every 2 seconds)
    const activeInterval = setInterval(() => {
      setActiveNow(prev => {
        const variations = [24, 28, 31, 26, 29, 25, 32, 27];
        return variations[Math.floor(Math.random() * variations.length)];
      });
    }, 2000);

    // Animate viewers count (every 5 seconds)
    const viewersInterval = setInterval(() => {
      setVisibleViewers(prev => {
        const baseViewers = 12500;
        const variation = Math.floor(Math.random() * 200) - 100; // ±100 variation
        return baseViewers + variation;
      });
    }, 5000);

    // Animate revenue slowly (every 8 seconds)
    const revenueInterval = setInterval(() => {
      setRevenueGenerated(prev => {
        const baseRevenue = 45000;
        const variation = Math.floor(Math.random() * 1000) - 500; // ±500 variation
        return baseRevenue + variation;
      });
    }, 8000);

    return () => {
      clearInterval(streamersInterval);
      clearInterval(activeInterval);
      clearInterval(viewersInterval);
      clearInterval(revenueInterval);
    };
  }, []);

  const isPortuguese = language === "pt";

  return (
    <div className="min-h-screen">
      {/* Hero Section - Similar to London Transport style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/uk-streaming-background_dlqxkx.jpg')] bg-cover bg-center opacity-5"></div>
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
                  {isPortuguese ? "Plataforma de Streaming do Reino Unido" : "UK Streaming Platform"}
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
                {isPortuguese ? "Ganhe Dinheiro Fazendo Streaming" : "Get Paid to Stream"}
              </span>
              <span className="sm:hidden">
                {isPortuguese ? "Monetize Seu Stream" : "Monetize Your Stream"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? "85% dos Ganhos São Seus" : "Keep 85% of Your Earnings"}
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
                  ? "Transforme sua paixão em renda. Monetize imediatamente com nossa divisão de receita 85/15 líder da indústria."
                  : "Turn your passion into profit. Start earning immediately with our industry-leading 85/15 revenue split."
                }
              </span>
              <span className="sm:hidden">
                {isPortuguese 
                  ? "Monetize imediatamente - 85/15 split"
                  : "Monetize immediately - 85/15 split"
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
                <span>{isPortuguese ? "85/15 Revenue Split" : "85/15 Revenue Split"}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-row gap-3 sm:gap-4 justify-center mb-8"
            >
              <button 
                onClick={() => setShowBookingForm(true)}
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-6 sm:px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 flex-1 max-w-[180px] sm:max-w-none text-center whitespace-nowrap"
              >
{isPortuguese ? "Começar a Ganhar" : "Start Earning"}
              </button>
              <a 
                href="#packages" 
                className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 max-w-[180px] sm:max-w-none text-center whitespace-nowrap"
              >
{isPortuguese ? "Ver Preços" : "View Pricing"}
              </a>
            </motion.div>

            {/* Enhanced Live stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            >
              {getStreamingStats(visibleStreamers, visibleViewers, activeNow, revenueGenerated).map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
                  whileHover={{ y: -2 }}
                >
                  {/* Live indicator for "Active Now" */}
                  {stat.isLive && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-600 font-medium">LIVE</span>
                    </div>
                  )}
                  
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.isLive ? 'text-red-600' : 'text-primary-600'} ${stat.isAnimated ? 'transition-transform duration-300' : ''}`} />
                  
                  <motion.div 
                    className="text-2xl font-bold text-gray-900 mb-1"
                    key={stat.value}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-xs text-gray-600 font-medium">
                    {isPortuguese ? stat.labelPt : stat.label}
                  </div>

                  {/* Subtle background animation for active stats */}
                  {stat.isAnimated && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50/20 via-secondary-50/20 to-accent-50/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              {isPortuguese ? "Categorias de Conteúdo" : "Content Categories"}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? "Escolha a sua categoria e conecte-se com audiências que partilham os seus interesses"
                : "Choose your category and connect with audiences who share your interests"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contentCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isPortuguese ? category.namePortuguese : category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {isPortuguese ? category.descriptionPortuguese : category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.streamers} streamers</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Packages Section - Similar to Transport Services */}
      <section id="packages" className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              {isPortuguese ? "Pacotes para Criadores" : "Creator Packages"}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? "Escolha o pacote perfeito para a sua jornada de criação de conteúdo"
                : "Choose the perfect package for your content creation journey"
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {creatorTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                  tier.popular ? 'ring-2 ring-primary-200' : ''
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-action-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {isPortuguese ? "Mais Popular" : "Most Popular"}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 flex items-center justify-center">
                    <div className="text-6xl text-primary-400">🎥</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      {tier.originalPrice > tier.price && (
                        <span className="text-sm text-gray-500 line-through">£{tier.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-gray-900">£{tier.price}</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? tier.namePortuguese : tier.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isPortuguese ? tier.descriptionPortuguese : tier.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {(isPortuguese ? tier.featuresPortuguese : tier.features).slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {(isPortuguese ? tier.featuresPortuguese : tier.features).length > 6 && (
                      <div className="text-sm text-primary-600 font-medium">
                        +{(isPortuguese ? tier.featuresPortuguese : tier.features).length - 6} {isPortuguese ? "mais funcionalidades" : "more features"}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isPortuguese ? "Começar Agora" : "Start Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              {isPortuguese ? "Como Funciona" : "How It Works"}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? "Comece a fazer streaming para comunidades no Reino Unido em apenas 3 passos simples"
                : "Start streaming to UK communities in just 3 simple steps"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: isPortuguese ? "Escolha Seu Pacote" : "Choose Your Package",
                description: isPortuguese ? "Selecione o pacote que melhor se adequa às suas necessidades de criação de conteúdo" : "Select the package that best fits your content creation needs",
                icon: Crown,
              },
              {
                step: 2,
                title: isPortuguese ? "Configure Seu Setup" : "Set Up Your Stream",
                description: isPortuguese ? "Configuramos seu RTMP, emotes culturais e integração com eventos do Reino Unido" : "We configure your RTMP, cultural emotes, and UK events integration",
                icon: Settings,
              },
              {
                step: 3,
                title: isPortuguese ? "Comece a Transmitir" : "Start Broadcasting",
                description: isPortuguese ? "Conecte-se com milhares de pessoas no Reino Unido e comece a construir sua audiência" : "Connect with thousands of people across the UK and start building your audience",
                icon: Video,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Community */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              {isPortuguese ? "Histórias de Sucesso" : "Success Stories"}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? "Criadores de diversas comunidades estão a prosperar na nossa plataforma"
                : "Creators from diverse communities are thriving on our platform"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                category: isPortuguese ? "Culinária Cultural" : "Cultural Cooking",
                achievement: isPortuguese ? "2.3K seguidores em 3 meses" : "2.3K followers in 3 months",
                quote: isPortuguese ? "A plataforma conectou-me com pessoas de todo Reino Unido que adoram culinária diversa!" : "The platform connected me with people all over the UK who love diverse cuisine!",
              },
              {
                name: "James Mitchell", 
                category: isPortuguese ? "Workshops de Negócios" : "Business Workshops",
                achievement: isPortuguese ? "£1.2K receita mensal" : "£1.2K monthly revenue",
                quote: isPortuguese ? "Transformei meu conhecimento em tecnologia em streams educativos para comunidades diversas." : "I turned my technology knowledge into educational streams for diverse communities.",
              },
              {
                name: "Priya Patel",
                category: isPortuguese ? "Arte e Cultura" : "Arts & Culture", 
                achievement: isPortuguese ? "Eventos em 5 locais de Londres" : "Events in 5 London venues",
                quote: isPortuguese ? "O streaming ajudou-me a partilhar tradições culturais com audiências no Reino Unido." : "Streaming helped me share cultural traditions with audiences across the UK.",
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{story.name}</h4>
                  <p className="text-sm text-primary-600">{story.category}</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 mb-4 text-center">
                  <p className="text-green-800 font-semibold text-sm">{story.achievement}</p>
                </div>
                <blockquote className="text-gray-600 italic text-sm leading-relaxed">
                  "{story.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="container-width text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {isPortuguese ? "Pronto para Começar?" : "Ready to Get Started?"}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isPortuguese 
              ? "Junte-se a centenas de criadores diversos que estão a construir suas audiências no Reino Unido"
              : "Join hundreds of diverse creators who are building their audiences across the UK"
            }
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex-1 max-w-[200px]"
            >
              {isPortuguese ? "Começar Agora" : "Start Now"}
            </button>
            <a 
              href="#packages" 
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex-1 max-w-[200px]"
            >
              {isPortuguese ? "Saber Mais" : "Learn More"}
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? "Começar a Ganhar" : "Start Earning"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? "Entre em contato connosco para configurar sua conta de streaming"
                : "Get in touch with us to set up your streaming account"
              }
            </p>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold">
                {isPortuguese ? "Contactar Equipa" : "Contact Team"}
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
                {isPortuguese ? "Agendar Demonstração" : "Schedule Demo"}
              </button>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="w-full text-gray-500 py-2"
              >
                {isPortuguese ? "Fechar" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}