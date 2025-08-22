"use client";

// Force dynamic rendering to avoid prerender/export issues on complex live TV page
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  TvIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  Crown,
  Calendar,
  Users,
  Tv,
  Video,
  Zap,
  Play,
  Mic,
  TrendingUp,
  Globe,
  Music,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  Clock,
  Library,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { communityStats } from "@/config/community";
import SubscriptionGate from "@/components/SubscriptionGate";
import StreamPlayer from "@/components/StreamPlayer";
import StreamSchedule from "@/components/StreamSchedule";
import StreamReplayLibrary from "@/components/StreamReplayLibrary";
import StreamViewerStats from "@/components/StreamViewerStats";
import StreamCategories from "@/components/StreamCategories";
import LiveChatWidget from "@/components/LiveChatWidget";
import HowStreamingWorks from "@/components/HowStreamingWorks";
import LuxuryLoader from "@/components/LuxuryLoader";
import LuxuryErrorBoundary from "@/components/LuxuryErrorBoundary";
import { LuxuryButton, LuxuryCard } from "@/components/LuxuryMicroInteractions";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

export default function TVPage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, isInTrial, subscriptionRequired } =
    useSubscription();
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("live");

  const [viewerCount, setViewerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const scheduleRef = useRef<HTMLDivElement | null>(null);
  const replaysRef = useRef<HTMLDivElement | null>(null);
  
  // Performance optimization
  const { preloadCriticalResources } = usePerformanceOptimization();

  const isPortuguese = language === "pt";

  // Stream categories for filtering and display
  const categories = [
    {
      id: "portuguese-culture",
      name: isPortuguese ? "Cultura Portuguesa" : "Portuguese Culture",
      description: isPortuguese
        ? "Música, tradição e arte"
        : "Music, tradition and art",
      icon: "music",
      color: "primary",
      isPremium: false,
      streamCount: 3,
    },
    {
      id: "business-workshops",
      name: isPortuguese ? "Workshops de Negócios" : "Business Workshops",
      description: isPortuguese
        ? "Tecnologia inteligente, inovação e gestão"
        : "Smart technology, innovation and management",
      icon: "briefcase",
      color: "secondary",
      isPremium: true,
      streamCount: 2,
    },
    {
      id: "community-events",
      name: isPortuguese ? "Eventos Comunitários" : "Community Events",
      description: isPortuguese
        ? "Encontros e histórias"
        : "Meetups and stories",
      icon: "users",
      color: "action",
      isPremium: false,
      streamCount: 4,
    },
    {
      id: "student-sessions",
      name: isPortuguese ? "Sessões de Estudantes" : "Student Sessions",
      description: isPortuguese ? "Carreiras e apoio" : "Careers and support",
      icon: "graduation",
      color: "accent",
      isPremium: false,
      streamCount: 1,
    },
    {
      id: "vip-business",
      name: isPortuguese ? "VIP Business" : "VIP Business",
      description: isPortuguese ? "Eventos exclusivos" : "Exclusive events",
      icon: "crown",
      color: "premium",
      isPremium: true,
      streamCount: 1,
    },
    {
      id: "behind-scenes",
      name: isPortuguese ? "Bastidores" : "Behind the Scenes",
      description: isPortuguese ? "Câmara e produção" : "Camera and production",
      icon: "camera",
      color: "coral",
      isPremium: false,
      streamCount: 1,
    },
  ];

  const navigationTabs = [
    {
      id: "live",
      label: isPortuguese ? "Ao Vivo" : "Live",
      icon: Video,
      description: isPortuguese ? "Transmissões ao vivo" : "Live broadcasts",
    },
    {
      id: "programs",
      label: isPortuguese ? "Horários" : "Schedule",
      icon: Tv,
      description: isPortuguese
        ? "Horários do canal"
        : "Channel schedule",
    },
    {
      id: "replays",
      label: isPortuguese ? "Gravações" : "Replays",
      icon: Library,
      description: isPortuguese ? "Conteúdo gravado" : "Recorded content",
    },
    {
      id: "chat",
      label: isPortuguese ? "Conversa" : "Chat",
      icon: MessageCircle,
      description: isPortuguese ? "Chat comunitário" : "Community chat",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Simulate loading progress for premium experience
    const progressTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    return () => clearInterval(progressTimer);
  }, [preloadCriticalResources]);

  const goToTab = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      const map: Record<string, HTMLDivElement | null> = {
        live: liveRef.current,
        programs: scheduleRef.current,
        replays: replaysRef.current,
      };
      const el = map[tabId];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <LuxuryErrorBoundary variant="premium">
      <LuxuryLoader 
        isLoading={isLoading}
        loadingText={isPortuguese ? "Carregando LusoTown TV" : "Loading LusoTown TV"}
        subText={isPortuguese ? "Preparando experiência cultural premium" : "Preparing premium cultural experience"}
        showProgress={true}
        progress={loadingProgress}
        variant="elite"
      />
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        {/* Clean background pattern instead of image */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18h-2v2.5h-2.5V22H18v2.5h2V22h2.5v-1.5H20zM0 38.59l2.59-2.59 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.59 2.59L1.41 5.59 0 4.18V1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-secondary-900/5"></div>

        <div className="relative container-width py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <TvIcon className="w-4 h-4 mr-2 text-primary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese
                    ? "LusoTown TV - Canal Cultural de Londres"
                    : "LusoTown TV - London Cultural Channel"}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              <span className="hidden sm:block">
                {isPortuguese
                  ? "Canal Cultural Português de Londres"
                  : "Portuguese Cultural Channel from London"}
              </span>
              <span className="sm:hidden">
                {isPortuguese ? "LusoTown TV" : "LusoTown TV"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? "Assista & Conecte" : "Watch & Connect"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese
                ? "Acompanhe transmissões culturais ao vivo ocasionalmente, quando o nosso canal entra no ar diretamente de Londres."
                : "Follow occasional live cultural broadcasts when our channel goes live directly from London."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <LuxuryButton
                variant="premium"
                size="lg"
                onClick={() => goToTab("live")}
              >
                <Play className="w-5 h-5 mr-2" />
                {isPortuguese ? "Assistir Agora" : "Watch Live"}
              </LuxuryButton>
              
              <LuxuryButton
                variant="secondary"
                size="lg"
                onClick={() => goToTab("programs")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {isPortuguese ? "Ver Horários" : "View Schedule"}
              </LuxuryButton>
              
              <LuxuryButton
                variant="elite"
                size="lg"
                onClick={() => goToTab("replays")}
              >
                <Library className="w-5 h-5 mr-2" />
                {isPortuguese ? "Ver Gravações" : "Explore Replays"}
              </LuxuryButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-width">
          <div className="flex overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => goToTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 min-w-[120px] ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600 bg-primary-50"
                    : "border-transparent text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:block">{tab.label}</span>
                <span className="sm:hidden">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8">
        <div className="container-width">
          {/* Live Tab */}
          {activeTab === "live" && (
            <div ref={liveRef} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Canal Cultural Ao Vivo" : "Live Cultural Channel"}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {isPortuguese
                    ? "Acompanhe transmissões culturais exclusivas quando o nosso canal entra no ar diretamente de Londres com qualidade premium."
                    : "Follow exclusive cultural broadcasts when our channel goes live directly from London with premium quality."}
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <LuxuryCard variant="premium" className="p-0 overflow-hidden">
                    <StreamPlayer
                      stream={{
                        id: "default",
                        title: isPortuguese ? "Transmissão Cultural" : "Cultural Stream",
                        youtubeVideoId: "dQw4w9WgXcQ",
                        isLive: true,
                        isPremium: false,
                        thumbnail: "/events/networking.jpg",
                        viewerCount: viewerCount,
                        previewDuration: 300,
                      }}
                      hasAccess={true}
                      onInteraction={() => {}}
                    />
                  </LuxuryCard>
                  
                  <StreamViewerStats
                    currentViewers={viewerCount}
                    peakViewers={Math.max(viewerCount, 100)}
                    totalViews={1000 + viewerCount}
                    language={language}
                  />
                </div>
                <div>
                  <LuxuryCard variant="premium" hoverable={true}>
                    <StreamCategories
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategorySelect={setSelectedCategory}
                      hasActiveSubscription={hasActiveSubscription}
                    />
                  </LuxuryCard>
                </div>
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <div ref={scheduleRef} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese
                    ? "Horários do Canal"
                    : "Channel Schedule"}
                </h2>
                <p className="text-gray-600">
                  {isPortuguese
                    ? "Veja quando o nosso canal cultural está programado para entrar no ar"
                    : "See when our cultural channel is scheduled to go live"}
                </p>
              </div>

              <StreamSchedule category={selectedCategory} language={language} />
            </div>
          )}

          {/* Replays Tab */}
          {activeTab === "replays" && (
            <div ref={replaysRef} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Biblioteca de Gravações" : "Replay Library"}
                </h2>
                <p className="text-gray-600">
                  {isPortuguese
                    ? "Assista conteúdo gravado quando quiser"
                    : "Watch recorded content whenever you want"}
                </p>
              </div>

              <StreamReplayLibrary
                hasAccess={hasActiveSubscription || isInTrial}
                selectedCategory={selectedCategory}
                language={language}
              />
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Chat Comunitário" : "Community Chat"}
                </h2>
                <p className="text-gray-600">
                  {isPortuguese
                    ? "Converse com outros portugueses enquanto assiste"
                    : "Chat with other Portuguese speakers while watching"}
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <LiveChatWidget
                  streamId={(currentStream && currentStream.id) || "default"}
                  isLive={(currentStream && currentStream.isLive) ?? true}
                  hasAccess={hasActiveSubscription || isInTrial}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-width">
          <HowStreamingWorks />
        </div>
      </section>

        <Footer />
      </div>
    </LuxuryErrorBoundary>
  );
}
