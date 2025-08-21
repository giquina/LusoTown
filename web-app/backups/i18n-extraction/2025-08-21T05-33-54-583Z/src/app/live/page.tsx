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
    name: "Creator Starter",
    namePortuguese: "Criador Iniciante", 
    price: 19,
    originalPrice: 29,
    image: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/creator-starter-setup_dlqxkx.jpg",
    imageAlt: "Portuguese content creator setup with professional streaming equipment",
    imageAltPortuguese: "Configuração de criador de conteúdo português com equipamento de streaming profissional",
    membershipDiscounts: {
      free: 0,
      community: 10,
      ambassador: 20,
    },
    description: "Perfect for Portuguese speakers starting their streaming journey in London & UK",
    descriptionPortuguese: "Perfeito para falantes de português começando sua jornada de streaming em Londres e Reino Unido",
    popular: true,
    features: [
      "RTMP streaming to Portuguese community",
      "Portuguese cultural emotes pack (:saudade:, :festa:, :futebol:)",
      "Community chat moderation",
      "Basic analytics dashboard",
      "Mobile streaming support via Streamlabs",
      "London events integration",
      "Portuguese language support",
      "Community networking opportunities",
    ],
    featuresPortuguese: [
      "Streaming RTMP para comunidade portuguesa",
      "Pack de emotes culturais portugueses (:saudade:, :festa:, :futebol:)",
      "Moderação de chat da comunidade",
      "Dashboard de analytics básico",
      "Suporte para streaming mobile via Streamlabs",
      "Integração com eventos de Londres",
      "Suporte em língua portuguesa",
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
    imageAlt: "Professional Portuguese streaming studio with advanced equipment and London backdrop",
    imageAltPortuguese: "Estúdio de streaming português profissional com equipamento avançado e cenário de Londres",
    membershipDiscounts: {
      free: 0,
      community: 15,
      ambassador: 25,
    },
    description: "Advanced streaming tools for established Portuguese content creators and businesses",
    descriptionPortuguese: "Ferramentas avançadas de streaming para criadores de conteúdo portugueses estabelecidos e empresas",
    features: [
      "All Creator Starter features",
      "Multi-stream to YouTube, Twitch, TikTok simultaneously",
      "Advanced Portuguese cultural content categories",
      "Revenue sharing program (85/15 split)",
      "Priority Portuguese community promotion",
      "Custom streaming overlays and graphics",
      "Advanced analytics and audience insights",
      "Direct integration with Portuguese events",
      "Business workshop streaming capabilities",
      "Portuguese/English bilingual chat support",
    ],
    featuresPortuguese: [
      "Todas as funcionalidades do Criador Iniciante",
      "Multi-stream para YouTube, Twitch, TikTok simultaneamente",
      "Categorias avançadas de conteúdo cultural português",
      "Programa de partilha de receitas (85/15 divisão)",
      "Promoção prioritária na comunidade portuguesa",
      "Overlays e gráficos personalizados para streaming",
      "Analytics avançados e insights de audiência",
      "Integração direta com eventos portugueses",
      "Capacidades de streaming de workshops de negócios",
      "Suporte de chat bilingue português/inglês",
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
    imageAlt: "Enterprise Portuguese streaming setup for business events and community broadcasts",
    imageAltPortuguese: "Configuração de streaming empresarial português para eventos de negócios e transmissões comunitárias",
    membershipDiscounts: {
      free: 0,
      community: 20,
      ambassador: 30,
    },
    description: "Complete streaming solution for Portuguese businesses, organizations, and major community events",
    descriptionPortuguese: "Solução completa de streaming para empresas portuguesas, organizações e grandes eventos comunitários",
    features: [
      "All Professional Creator features",
      "Dedicated Portuguese community channel",
      "White-label streaming platform",
      "Multi-location London streaming support",
      "Professional production team support",
      "Custom Portuguese cultural programming",
      "Enterprise-grade security and moderation",
      "API access for custom integrations",
      "Dedicated account manager (Portuguese-speaking)",
      "Premium Portuguese community partnerships",
      "Event venue streaming partnerships in London",
      "Corporate training and workshop capabilities",
    ],
    featuresPortuguese: [
      "Todas as funcionalidades do Criador Profissional",
      "Canal dedicado da comunidade portuguesa",
      "Plataforma de streaming white-label",
      "Suporte para streaming multi-localização em Londres",
      "Suporte de equipa de produção profissional",
      "Programação cultural portuguesa personalizada",
      "Segurança e moderação de nível empresarial",
      "Acesso API para integrações personalizadas",
      "Gestor de conta dedicado (falante de português)",
      "Parcerias premium da comunidade portuguesa",
      "Parcerias de streaming com locais de eventos em Londres",
      "Capacidades de formação corporativa e workshops",
    ],
    color: "accent",
    targetAudience: "enterprise_organizations",
  },
];

// Content categories for Portuguese streamers
const contentCategories = [
  {
    id: "portuguese-culture",
    name: "Portuguese Culture",
    namePortuguese: "Cultura Portuguesa",
    icon: Music,
    description: "Fado nights, traditional cooking, cultural celebrations",
    descriptionPortuguese: "Noites de fado, culinária tradicional, celebrações culturais",
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
    description: "Portuguese gaming community, FIFA tournaments",
    descriptionPortuguese: "Comunidade de gaming portuguesa, torneios FIFA",
    streamers: 67,
    color: "from-green-500 to-blue-500",
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Travel",
    namePortuguese: "Estilo de Vida e Viagens", 
    icon: Heart,
    description: "London life, Portuguese community events, travel vlogs",
    descriptionPortuguese: "Vida em Londres, eventos da comunidade portuguesa, vlogs de viagem",
    streamers: 34,
    color: "from-pink-500 to-orange-500",
  },
];

// Success metrics for streamers
const streamingStats = [
  { label: "Active Streamers", labelPt: "Streamers Ativos", value: "180+", icon: Video },
  { label: "Monthly Viewers", labelPt: "Visualizadores Mensais", value: "12.5K", icon: Users },
  { label: "Revenue Generated", labelPt: "Receita Gerada", value: "£45K+", icon: DollarSign },
  { label: "Avg. Monthly Earnings", labelPt: "Ganhos Médios Mensais", value: "£340", icon: TrendingUp },
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
      {/* Hero Section - Similar to London Transport style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/portuguese-streaming-london_dlqxkx.jpg')] bg-cover bg-center opacity-5"></div>
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
                  {isPortuguese ? "Plataforma de Streaming Portuguesa" : "Portuguese Streaming Platform"}
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
                {isPortuguese ? "Torne-se um Criador de Conteúdo Português" : "Become a Portuguese Content Creator"}
              </span>
              <span className="sm:hidden">
                {isPortuguese ? "Streaming Português" : "Portuguese Streaming"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? "em Londres" : "in London"}
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
                  ? "Conecte-se com a comunidade portuguesa através de streaming. Partilhe sua cultura, negócios e paixões com milhares de portugueses em Londres."
                  : "Connect with the Portuguese community through streaming. Share your culture, business, and passions with thousands of Portuguese speakers in London."
                }
              </span>
              <span className="sm:hidden">
                {isPortuguese 
                  ? "Streaming para a comunidade portuguesa em Londres"
                  : "Streaming for Portuguese community in London"
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
                {isPortuguese ? "Começar Streaming" : "Start Streaming"}
              </button>
              <a 
                href="#packages" 
                className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 max-w-[180px] sm:max-w-none text-center whitespace-nowrap"
              >
                {isPortuguese ? "Ver Pacotes" : "View Packages"}
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
                ? "Escolha o pacote perfeito para a sua jornada de criação de conteúdo português"
                : "Choose the perfect package for your Portuguese content creation journey"
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
                ? "Comece a fazer streaming para a comunidade portuguesa em apenas 3 passos simples"
                : "Start streaming to the Portuguese community in just 3 simple steps"
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
                description: isPortuguese ? "Configuramos seu RTMP, emotes culturais e integração com eventos portugueses" : "We configure your RTMP, cultural emotes, and Portuguese events integration",
                icon: Settings,
              },
              {
                step: 3,
                title: isPortuguese ? "Comece a Transmitir" : "Start Broadcasting",
                description: isPortuguese ? "Conecte-se com milhares de portugueses e comece a construir sua audiência" : "Connect with thousands of Portuguese speakers and start building your audience",
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
                ? "Criadores portugueses estão a prosperar na nossa plataforma"
                : "Portuguese creators are thriving on our platform"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Santos",
                category: isPortuguese ? "Culinária Portuguesa" : "Portuguese Cooking",
                achievement: isPortuguese ? "2.3K seguidores em 3 meses" : "2.3K followers in 3 months",
                quote: isPortuguese ? "A plataforma conectou-me com portugueses de todo Londres que adoram a nossa gastronomia!" : "The platform connected me with Portuguese people all over London who love our cuisine!",
              },
              {
                name: "João Ferreira", 
                category: isPortuguese ? "Workshops de Negócios" : "Business Workshops",
                achievement: isPortuguese ? "£1.2K receita mensal" : "£1.2K monthly revenue",
                quote: isPortuguese ? "Transformei meu conhecimento em tecnologia em streams educativos para a comunidade portuguesa." : "I turned my technology knowledge into educational streams for the Portuguese community.",
              },
              {
                name: "Ana Costa",
                category: isPortuguese ? "Noites de Fado" : "Fado Nights", 
                achievement: isPortuguese ? "Eventos em 5 locais de Londres" : "Events in 5 London venues",
                quote: isPortuguese ? "O streaming ajudou-me a levar o fado a mais portugueses em Londres." : "Streaming helped me bring fado to more Portuguese people in London.",
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
              ? "Junte-se a centenas de criadores portugueses que estão a construir suas audiências em Londres"
              : "Join hundreds of Portuguese creators who are building their audiences in London"
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
              {isPortuguese ? "Começar Streaming" : "Start Streaming"}
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