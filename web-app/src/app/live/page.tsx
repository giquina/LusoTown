"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  StarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Crown, Calendar, Users, Tv, Video, Zap, Play, Mic, TrendingUp, Globe, Music, Briefcase, GraduationCap, Heart } from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import SubscriptionGate from "@/components/SubscriptionGate";
import StreamPlayer from "@/components/StreamPlayer";
import StreamSchedule from "@/components/StreamSchedule";
import StreamReplayLibrary from "@/components/StreamReplayLibrary";
import StreamViewerStats from "@/components/StreamViewerStats";
import StreamCategories from "@/components/StreamCategories";
import LiveChatWidget from "@/components/LiveChatWidget";

export default function LiveStreamingPage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, isInTrial, subscriptionRequired } =
    useSubscription();
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewerCount, setViewerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts (fixes navigation issue)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle start streaming action
  const handleStartStreaming = () => {
    // Check if user has subscription for streaming
    if (!hasActiveSubscription && !isInTrial) {
      // Show subscription gate
      setSubscriptionRequired && setSubscriptionRequired(true);
      return;
    }
    
    // In production, this would navigate to creator dashboard or streaming setup
    window.location.href = '/creator-signup';
  };

  // Mock data for demonstration - in production, this would come from YouTube API
  const streamCategories = [
    {
      id: "portuguese-culture",
      name:
        language === "pt"
          ? "Conteúdo Cultural Português"
          : "Portuguese Cultural Content",
      description:
        language === "pt"
          ? "Música tradicional portuguesa, noites de fado, celebrações culturais"
          : "Traditional Portuguese music, fado nights, cultural celebrations",
      icon: "🎵",
      color: "primary",
      isPremium: false,
      streamCount: 12,
    },
    {
      id: "business-workshops",
      name: language === "pt" ? "Workshops de Negócios" : "Business Workshops",
      description:
        language === "pt"
          ? "Desenvolvimento profissional, workshops de IA, marketing digital"
          : "Professional development, AI workshops, digital marketing",
      icon: "💼",
      color: "action",
      isPremium: true,
      streamCount: 8,
    },
    {
      id: "community-events",
      name: language === "pt" ? "Eventos Comunitários" : "Community Events",
      description:
        language === "pt"
          ? "Reuniões comunitárias, anúncios, sessões interativas"
          : "Community meetings, announcements, interactive sessions",
      icon: "👥",
      color: "secondary",
      isPremium: false,
      streamCount: 15,
    },
    {
      id: "student-sessions",
      name: language === "pt" ? "Sessões de Estudantes" : "Student Sessions",
      description:
        language === "pt"
          ? "Grupos de estudo, conselhos de carreira, apoio académico"
          : "Study groups, career advice, academic support",
      icon: "🎓",
      color: "accent",
      isPremium: false,
      streamCount: 6,
    },
    {
      id: "vip-business",
      name:
        language === "pt" ? "Mesas Redondas VIP" : "VIP Business Roundtables",
      description:
        language === "pt"
          ? "Conteúdo premium exclusivo com líderes da indústria"
          : "Exclusive premium content with industry leaders",
      icon: "👑",
      color: "premium",
      isPremium: true,
      streamCount: 4,
    },
  ];

  // Mock current live stream
  const mockLiveStream = {
    id: "live-fado-night-2025",
    title:
      language === "pt"
        ? "Noite de Fado ao Vivo com Maria Santos"
        : "Live Fado Night with Maria Santos",
    description:
      language === "pt"
        ? "Junte-se a nós para uma noite especial de fado tradicional português ao vivo de Londres"
        : "Join us for a special night of traditional Portuguese fado live from London",
    category: "portuguese-culture",
    isLive: true,
    scheduledStart: new Date().toISOString(),
    viewerCount: 127,
    isPremium: false,
    thumbnail: "/events/networking.jpg",
    youtubeVideoId: "dQw4w9WgXcQ", // Mock YouTube video ID
    host: "Maria Santos",
    duration: 90,
    tags: ["fado", "music", "portuguese", "culture", "live"],
  };

  useEffect(() => {
    // Simulate loading current stream data
    const timer = setTimeout(() => {
      setCurrentStream(mockLiveStream);
      setViewerCount(mockLiveStream.viewerCount);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [language, mockLiveStream]);

  // Simulate real-time viewer count updates
  useEffect(() => {
    if (!currentStream?.isLive) return;

    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 6) - 2; // -2 to +3 viewers
        return Math.max(0, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStream]);

  const handleStreamInteraction = (type: string) => {
    console.log(`Stream interaction: ${type}`);
    // In production, this would update the database and trigger networking connections
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 lg:pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-64 md:h-96 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-full rounded"></div>
                    <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-300 h-48 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-500 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent-500 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-primary-100 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-primary-700 mb-8 border border-primary-200"
              >
                <Tv className="w-5 h-5 mr-2" />
                {t('streaming.hero.subtitle')}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                {t('streaming.hero.title')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
              >
                {t('streaming.hero.description')}
              </motion.p>

              {/* Live Status Badge */}
              {currentStream?.isLive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center bg-action-600 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg mb-8"
                >
                  <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></span>
                  {t('streaming.live-now').toUpperCase()}
                  <span className="ml-3 text-sm opacity-90">• {viewerCount} {t('streaming.viewers')}</span>
                </motion.div>
              )}

              {/* Primary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl active:scale-95 touch-manipulation min-w-[200px]">
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-6 h-6" />
                    {t('streaming.hero.cta.watch')}
                  </div>
                </button>
                
                <button 
                  onClick={handleStartStreaming}
                  className="group bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl active:scale-95 touch-manipulation min-w-[200px]">
                  <div className="flex items-center justify-center gap-3">
                    <Mic className="w-6 h-6" />
                    {t('streaming.hero.cta.create')}
                  </div>
                </button>
              </motion.div>

              {/* Social Proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-sm"
              >
                {t('streaming.hero.social_proof')}
              </motion.p>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">45+</div>
                <div className="text-sm text-gray-600">{t('streaming.hero.stats.creators')}</div>
              </div>
              
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-xl mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">1,200+</div>
                <div className="text-sm text-gray-600">{t('streaming.hero.stats.hours')}</div>
              </div>
              
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-xl mx-auto mb-4">
                  <Globe className="w-6 h-6 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2,150+</div>
                <div className="text-sm text-gray-600">{t('streaming.hero.stats.viewers')}</div>
              </div>
            </motion.div>

            {/* Feature Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* For Viewers */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
                    <Play className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t('streaming.hero.benefits.viewer.title')}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.viewer.fado')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.viewer.business')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.viewer.cultural')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.viewer.support')}</span>
                  </div>
                </div>
              </motion.div>

              {/* For Creators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-secondary-50 to-accent-50 backdrop-blur-sm rounded-2xl p-8 border border-secondary-200 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-xl">
                    <Mic className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t('streaming.hero.benefits.creator.title')}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.creator.monetize')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.creator.community')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{t('streaming.hero.benefits.creator.tools')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <StarIcon className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{t('streaming.hero.benefits.creator.revenue')}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleStartStreaming}
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 touch-manipulation">
                    {t('streaming.hero.cta.create')}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Popular Categories Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('streaming.hero.categories.title')}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="text-2xl mb-3">🎵</div>
                  <div className="font-semibold text-gray-900 text-sm">{t('streaming.hero.categories.music')}</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="text-2xl mb-3">💼</div>
                  <div className="font-semibold text-gray-900 text-sm">{t('streaming.hero.categories.business')}</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="text-2xl mb-3">🎉</div>
                  <div className="font-semibold text-gray-900 text-sm">{t('streaming.hero.categories.culture')}</div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="text-2xl mb-3">🎓</div>
                  <div className="font-semibold text-gray-900 text-sm">{t('streaming.hero.categories.student')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('streaming.how_it_works.title')}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('streaming.how_it_works.subtitle')}
              </p>
            </motion.div>

            {/* 3 Main Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('streaming.how_it_works.step1.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('streaming.how_it_works.step1.description')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 to-accent-500"></div>
                <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-2xl mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary-600">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('streaming.how_it_works.step2.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('streaming.how_it_works.step2.description')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-primary-500"></div>
                <div className="flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mx-auto mb-6">
                  <span className="text-2xl font-bold text-accent-600">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('streaming.how_it_works.step3.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('streaming.how_it_works.step3.description')}
                </p>
              </motion.div>
            </div>

            {/* Equipment Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {t('streaming.how_it_works.requirements.title')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mx-auto mb-6">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {t('streaming.how_it_works.requirements.basic')}
                  </h4>
                  <p className="text-gray-700 text-center">
                    {t('streaming.how_it_works.requirements.basic_desc')}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-6">
                    <span className="text-2xl">🎥</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {t('streaming.how_it_works.requirements.professional')}
                  </h4>
                  <p className="text-gray-700 text-center">
                    {t('streaming.how_it_works.requirements.professional_desc')}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 border border-purple-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-6">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {t('streaming.how_it_works.requirements.business')}
                  </h4>
                  <p className="text-gray-700 text-center">
                    {t('streaming.how_it_works.requirements.business_desc')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Creator Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {t('streaming.how_it_works.creator_types.title')}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Individual Creators */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Music className="w-8 h-8 text-primary-600" />
                    <h4 className="text-2xl font-bold text-gray-900">
                      {t('streaming.how_it_works.creator_types.individual.title')}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎵</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.individual.fado')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">👩‍🍳</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.individual.cooking')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🇵🇹</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.individual.language')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎶</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.individual.music')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Business Owners */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8 text-secondary-600" />
                    <h4 className="text-2xl font-bold text-gray-900">
                      {t('streaming.how_it_works.creator_types.business.title')}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🍽️</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.business.restaurant')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💼</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.business.services')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎉</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.business.events')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">✈️</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.business.tourism')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Educational Creators */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-8 h-8 text-accent-600" />
                    <h4 className="text-2xl font-bold text-gray-900">
                      {t('streaming.how_it_works.creator_types.educational.title')}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📚</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.educational.language')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💼</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.educational.professional')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎓</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.educational.academic')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🏢</span>
                      <span className="text-gray-700 text-sm">
                        {t('streaming.how_it_works.creator_types.educational.career')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Revenue Model */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-3xl p-12 border border-primary-200">
                <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  {t('streaming.how_it_works.revenue.title')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-200 text-center">
                    <div className="text-3xl mb-3">💰</div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {t('streaming.how_it_works.revenue.share')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('streaming.how_it_works.revenue.share_desc')}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200 text-center">
                    <div className="text-3xl mb-3">🔄</div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {t('streaming.how_it_works.revenue.subscriptions')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('streaming.how_it_works.revenue.subscriptions_desc')}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-accent-200 text-center">
                    <div className="text-3xl mb-3">💡</div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {t('streaming.how_it_works.revenue.tips')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('streaming.how_it_works.revenue.tips_desc')}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-action-200 text-center">
                    <div className="text-3xl mb-3">⭐</div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {t('streaming.how_it_works.revenue.premium')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('streaming.how_it_works.revenue.premium_desc')}
                    </p>
                  </div>
                </div>

                {/* Earnings Examples */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    {t('streaming.how_it_works.earnings.title')}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">🎵</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('streaming.how_it_works.earnings.fado_artist')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">💼</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('streaming.how_it_works.earnings.business_coach')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">👨‍🍳</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('streaming.how_it_works.earnings.chef')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">👨‍🏫</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('streaming.how_it_works.earnings.language_teacher')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Creator Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {t('streaming.how_it_works.dashboard.title')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-primary-600" />
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.dashboard.analytics')}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('streaming.how_it_works.dashboard.analytics_desc')}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Portuguese Viewers</span>
                      <span className="text-sm font-bold text-primary-600">892</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Engagement Rate</span>
                      <span className="text-sm font-bold text-secondary-600">34.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cultural Content Views</span>
                      <span className="text-sm font-bold text-accent-600">15.8k</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-secondary-600" />
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.dashboard.monetization')}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('streaming.how_it_works.dashboard.monetization_desc')}
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="text-sm font-bold text-green-600">£1,847</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Subscribers</span>
                      <span className="text-sm font-bold text-blue-600">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tips Received</span>
                      <span className="text-sm font-bold text-purple-600">£423</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-accent-600" />
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.dashboard.scheduling')}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('streaming.how_it_works.dashboard.scheduling_desc')}
                  </p>
                  <div className="space-y-2">
                    <div className="bg-primary-50 rounded-lg p-3 border-l-4 border-primary-500">
                      <div className="text-sm font-medium text-gray-900">Fado Night</div>
                      <div className="text-xs text-gray-600">Tomorrow 8:00 PM</div>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-3 border-l-4 border-secondary-500">
                      <div className="text-sm font-medium text-gray-900">Cooking Workshop</div>
                      <div className="text-xs text-gray-600">Friday 7:00 PM</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-action-600" />
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.dashboard.community')}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t('streaming.how_it_works.dashboard.community_desc')}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">Maria from Lisbon</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-secondary-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">João from Porto</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-accent-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">Ana from São Paulo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Guidelines & Growth Strategies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                  {t('streaming.how_it_works.guidelines.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🇵🇹</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.guidelines.cultural')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤝</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.guidelines.respectful')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🌍</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.guidelines.inclusive')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💼</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.guidelines.professional')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">👨‍👩‍👧‍👦</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.guidelines.family')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Growth Strategies */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  {t('streaming.how_it_works.growth.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💎</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.growth.authentic')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.growth.consistent')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💬</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.growth.interactive')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤝</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.growth.collaborate')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎉</span>
                    <p className="text-gray-700 text-sm">
                      {t('streaming.how_it_works.growth.events')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Success Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mb-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {t('streaming.how_it_works.success.title')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                      🎵
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.success.maria.name')}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm italic text-center">
                    "{t('streaming.how_it_works.success.maria.story')}"
                  </p>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border border-secondary-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                      💼
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.success.jorge.name')}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm italic text-center">
                    "{t('streaming.how_it_works.success.jorge.story')}"
                  </p>
                </div>

                <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 border border-accent-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                      👩‍🍳
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {t('streaming.how_it_works.success.ana.name')}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm italic text-center">
                    "{t('streaming.how_it_works.success.ana.story')}"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* What Makes LusoTown Different */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 text-white">
                <h3 className="text-3xl font-bold text-center mb-12">
                  {t('streaming.how_it_works.difference.title')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Globe className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t('streaming.how_it_works.difference.community')}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t('streaming.how_it_works.difference.cultural')}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Crown className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t('streaming.how_it_works.difference.revenue')}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-action-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Zap className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t('streaming.how_it_works.difference.local')}
                    </p>
                  </div>

                  <div className="text-center md:col-span-2 lg:col-span-1">
                    <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t('streaming.how_it_works.difference.support')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  {t('streaming.how_it_works.cta.title')}
                </h3>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  {t('streaming.how_it_works.cta.description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleStartStreaming}
                    className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all active:scale-95 touch-manipulation"
                  >
                    {t('streaming.how_it_works.cta.primary')}
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all active:scale-95 touch-manipulation">
                    {t('streaming.how_it_works.cta.secondary')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Stream Player - Mobile-first responsive */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Live Stream Player */}
                {currentStream && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <StreamPlayer
                      stream={currentStream}
                      hasAccess={
                        !currentStream.isPremium ||
                        hasActiveSubscription ||
                        isInTrial
                      }
                      onInteraction={handleStreamInteraction}
                    />

                    {/* Stream Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {currentStream.title}
                          </h2>
                          <p className="text-gray-600 mb-3">
                            {currentStream.description}
                          </p>

                          {/* Stream Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>
                                {viewerCount.toLocaleString()}{" "}
                                {language === "pt" ? "espectadores" : "viewers"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>
                                {currentStream.duration}{" "}
                                {language === "pt" ? "min" : "min"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>
                                {language === "pt"
                                  ? "Apresentado por"
                                  : "Hosted by"}{" "}
                                {currentStream.host}
                              </span>
                            </div>
                            {currentStream.isPremium && (
                              <div className="flex items-center gap-1 text-premium-600">
                                <Crown className="w-4 h-4" />
                                <span>
                                  {language === "pt" ? "Premium" : "Premium"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stream Actions - Mobile Optimized */}
                      <div className="pt-4 border-t border-gray-200">
                        {/* Mobile: Stack actions for better touch targets */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* Primary Actions Row */}
                          <div className="flex gap-3 flex-1">
                            <button
                              onClick={() => handleStreamInteraction("like")}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition-all touch-manipulation"
                            >
                              <HeartIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                              <span className="text-sm font-medium">
                                {language === "pt" ? "Gostar" : "Like"}
                              </span>
                            </button>
                            <button
                              onClick={() => handleStreamInteraction("share")}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-all touch-manipulation"
                            >
                              <ShareIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                              <span className="text-sm font-medium">
                                {language === "pt" ? "Partilhar" : "Share"}
                              </span>
                            </button>
                          </div>
                          
                          {/* Secondary Actions */}
                          <button
                            onClick={() => handleStreamInteraction("save")}
                            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg transition-all touch-manipulation"
                          >
                            <BookmarkIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                            <span className="text-sm font-medium">
                              {language === "pt" ? "Guardar" : "Save"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stream Categories */}
                <StreamCategories
                  categories={streamCategories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  hasActiveSubscription={hasActiveSubscription || isInTrial}
                />

                {/* Upcoming Schedule */}
                <StreamSchedule
                  category={selectedCategory}
                  language={language}
                />
              </div>

              {/* Sidebar - Takes up 1/3 of desktop width */}
              <div className="space-y-6">
                {/* Viewer Stats */}
                <StreamViewerStats
                  currentViewers={viewerCount}
                  peakViewers={156}
                  totalViews={2847}
                  language={language}
                />

                {/* Live Chat Widget */}
                {currentStream?.isLive && (
                  <LiveChatWidget
                    streamId={currentStream.id}
                    isLive={true}
                    hasAccess={
                      !currentStream.isPremium ||
                      hasActiveSubscription ||
                      isInTrial
                    }
                  />
                )}

                {/* Premium Subscription Prompt */}
                {subscriptionRequired && (
                  <SubscriptionGate
                    feature={
                      language === "pt"
                        ? "streaming premium"
                        : "premium streaming"
                    }
                    description={
                      language === "pt"
                        ? "Aceda a conteúdo exclusivo, workshops de negócios e replays de streams."
                        : "Access exclusive content, business workshops, and stream replays."
                    }
                    compact={true}
                  />
                )}

                {/* Quick Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === "pt"
                      ? "Navegação Rápida"
                      : "Quick Navigation"}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#schedule"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium">
                        {language === "pt" ? "Programação" : "Schedule"}
                      </span>
                    </a>
                    <a
                      href="#replays"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Video className="w-5 h-5 text-secondary-600" />
                      <span className="text-sm font-medium">
                        {language === "pt" ? "Replays" : "Replays"}
                      </span>
                    </a>
                    <a
                      href="#community"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-5 h-5 text-action-600" />
                      <span className="text-sm font-medium">
                        {language === "pt" ? "Comunidade" : "Community"}
                      </span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Stream Replay Library */}
            <div id="replays" className="mt-12">
              <StreamReplayLibrary
                hasAccess={hasActiveSubscription || isInTrial}
                selectedCategory={selectedCategory}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
