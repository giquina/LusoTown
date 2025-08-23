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
  EyeIcon,
  HeartIcon,
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
  Music,
  Briefcase,
  Heart,
  MessageCircle,
  Camera,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { ROUTES } from '@/config/routes';

// Mock live streams data
const mockLiveStreams = [
  {
    id: "stream-1",
    title: "Fado Night from London",
    titlePt: "Noite de Fado em Londres",
    streamer: "Ana Ribeiro",
    category: "Music",
    categoryPt: "Música",
    viewers: 147,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    duration: "2h 15m",
    language: "Portuguese",
  },
  {
    id: "stream-2", 
    title: "Portuguese Business Workshop",
    titlePt: "Workshop de Negócios Português",
    streamer: "Miguel Santos",
    category: "Business",
    categoryPt: "Negócios",
    viewers: 89,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
    duration: "1h 45m",
    language: "Portuguese",
  },
  {
    id: "stream-3",
    title: "London Portuguese-speaking community Chat",
    titlePt: "Chat da Comunidade de Falantes de Português de Londres",
    streamer: "Beatriz Costa",
    category: "Community",
    categoryPt: "Comunidade", 
    viewers: 203,
    isLive: true,
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
    duration: "3h 02m",
    language: "Portuguese",
  }
];

// Content categories
const contentCategories = [
  {
    id: "music",
    name: "Portuguese Music",
    namePortuguese: "Música Portuguesa",
    description: "Fado, folk music, and modern Portuguese artists",
    descriptionPortuguese: "Fado, música folclórica e artistas portugueses modernos",
    icon: Music,
    color: "from-primary-500 to-secondary-500",
    streamCount: 12,
  },
  {
    id: "business",
    name: "Business & Career",
    namePortuguese: "Negócios & Carreira",
    description: "Professional development and entrepreneurship",
    descriptionPortuguese: "Desenvolvimento profissional e empreendedorismo",
    icon: Briefcase,
    color: "from-secondary-500 to-accent-500",
    streamCount: 8,
  },
  {
    id: "community",
    name: "Community Events",
    namePortuguese: "Eventos Comunitários",
    description: "Local meetups and cultural celebrations",
    descriptionPortuguese: "Encontros locais e celebrações culturais",
    icon: Users,
    color: "from-accent-500 to-coral-500",
    streamCount: 15,
  },
  {
    id: "culture",
    name: "Cultural Heritage",
    namePortuguese: "Património Cultural",
    description: "Portuguese traditions and history",
    descriptionPortuguese: "Tradições e história portuguesas",
    icon: Heart,
    color: "from-coral-500 to-primary-500",
    streamCount: 6,
  },
];

export default function LivePage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const isPortuguese = language === "pt";

  // Stats for live streaming platform
  const platformStats = [
    {
      icon: Video,
      value: "23",
      label: "Active Streamers",
      labelPt: "Streamers Ativos",
      isLive: true,
    },
    {
      icon: Users,
      value: "1.2K",
      label: "Viewers Online",
      labelPt: "Visualizadores Online",
    },
    {
      icon: TrendingUp,
      value: "47%",
      label: "Growth This Month",
      labelPt: "Crescimento Este Mês",
    },
    {
      icon: DollarSign,
      value: "£2.4K",
      label: "Creator Revenue",
      labelPt: "Receita dos Criadores",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">
                  {isPortuguese ? "AO VIVO" : "LIVE"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                {isPortuguese ? "LusoTown TV" : "LusoTown TV"}
                <br />
                <span className="text-2xl md:text-3xl text-white/90">
                  {isPortuguese 
                    ? "Streaming da Comunidade de Falantes de Português"
                    : "Portuguese-speaking community Streaming"
                  }
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                {isPortuguese
                  ? "Assista transmissões ao vivo da comunidade de falantes de português no Reino Unido. Música, negócios, cultura e muito mais."
                  : "Watch live streams from the Portuguese-speaking community in the United Kingdom. Music, business, culture, and more."
                }
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href={ROUTES.signup}
                  className="inline-flex items-center justify-center bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  {isPortuguese ? "Começar a Assistir" : "Start Watching"}
                </a>
                <a
                  href="#creator"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
                >
                  <VideoCameraIcon className="w-5 h-5 mr-2" />
                  {isPortuguese ? "Tornar-se Streamer" : "Become a Streamer"}
                </a>
              </motion.div>
            </div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {platformStats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-white mr-2" />
                    {stat.isLive && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{isPortuguese ? stat.labelPt : stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Streams Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? "Transmissões Ao Vivo" : "Live Streams"}
            </h2>
            <p className="text-xl text-gray-600">
              {isPortuguese 
                ? "Conecte-se com a comunidade de falantes de português através de conteúdo ao vivo"
                : "Connect with the Portuguese-speaking community through live content"
              }
            </p>
          </div>

          {/* Stream Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockLiveStreams.map((stream) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {stream.duration}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    {stream.viewers}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {isPortuguese ? stream.titlePt : stream.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{stream.streamer}</span>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {isPortuguese ? stream.categoryPt : stream.category}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedStream(stream)}
                    className="w-full bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <PlayIcon className="w-4 h-4" />
                    {isPortuguese ? "Assistir Agora" : "Watch Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? "Categorias de Conteúdo" : "Content Categories"}
            </h2>
            <p className="text-xl text-gray-600">
              {isPortuguese 
                ? "Explore diferentes tipos de conteúdo da nossa comunidade"
                : "Explore different types of content from our community"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? category.namePortuguese : category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isPortuguese ? category.descriptionPortuguese : category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600 font-semibold">
                    {category.streamCount} streams
                  </span>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA Section */}
      <section id="creator" className="py-16 bg-gradient-to-r from-secondary-600 to-accent-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Camera className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isPortuguese ? "Torne-se um Criador" : "Become a Creator"}
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                {isPortuguese
                  ? "Partilhe o seu talento, construa uma audiência e ganhe dinheiro fazendo streaming para a comunidade de falantes de português."
                  : "Share your talent, build an audience, and earn money streaming to the Portuguese-speaking community."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={ROUTES.signup}
                  className="inline-flex items-center justify-center bg-white text-secondary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <VideoCameraIcon className="w-5 h-5 mr-2" />
                  {isPortuguese ? "Começar Streaming" : "Start Streaming"}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-secondary-600 transition-all duration-300 transform hover:scale-105"
                >
                  {isPortuguese ? "Saber Mais" : "Learn More"}
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm opacity-90">
                    {isPortuguese ? "Receita do Criador" : "Creator Revenue"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">
                    {isPortuguese ? "Suporte" : "Support"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm opacity-90">
                    {isPortuguese ? "Configuração" : "Setup"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">HD</div>
                  <div className="text-sm opacity-90">
                    {isPortuguese ? "Qualidade" : "Quality"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stream Player Modal */}
      {selectedStream && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="relative">
              <img 
                src={selectedStream.thumbnail} 
                alt={selectedStream.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedStream(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isPortuguese ? selectedStream.titlePt : selectedStream.title}
              </h3>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span>{selectedStream.streamer}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  {selectedStream.viewers} {isPortuguese ? "visualizadores" : "viewers"}
                </span>
              </div>
              <div className="text-center p-8 bg-gray-100 rounded-lg">
                <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {isPortuguese 
                    ? "Player de vídeo seria integrado aqui"
                    : "Video player would be integrated here"
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}