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

export default function TVPage() {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, isInTrial, subscriptionRequired } =
    useSubscription();
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("live");

  const [viewerCount, setViewerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

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
        ? "IA, tecnologia e gestão"
        : "AI, technology and management",
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
      label: isPortuguese ? "Programas" : "Programs",
      icon: Tv,
      description: isPortuguese
        ? "Programação portuguesa"
        : "Portuguese programming",
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
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url(buildUnsplashUrl('photo-1522869635100-9f4c5e86aa37?w=1200&h=600&fit=crop&crop=center'))] bg-cover bg-center opacity-5"></div>
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
                    ? "LusoTown TV - Televisão Portuguesa"
                    : "LusoTown TV - Portuguese Television"}
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
                  ? "Televisão Portuguesa em Londres"
                  : "Portuguese Television in London"}
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
              className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese
                ? "Assista programação portuguesa ao vivo, participe em eventos culturais e conecte-se com a comunidade portuguesa em Londres."
                : "Watch Portuguese programming live, join cultural events, and connect with the Portuguese community in London."}
            </motion.p>
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
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 min-w-[120px] ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600 bg-primary-50"
                    : "border-transparent text-secondary-600 hover:text-primary-600 hover:bg-gray-50"
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
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Transmissões Ao Vivo" : "Live Broadcasts"}
                </h2>
                <p className="text-secondary-600">
                  {isPortuguese
                    ? "Assista programação portuguesa ao vivo direto de Londres"
                    : "Watch Portuguese programming live from London"}
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <StreamPlayer
                    stream={{
                      id: "default",
                      title: isPortuguese ? "Transmissão" : "Stream",
                      youtubeVideoId: "dQw4w9WgXcQ",
                      isLive: true,
                      isPremium: false,
                      thumbnail: "/events/networking.jpg",
                      viewerCount: 0,
                      previewDuration: 300,
                    }}
                    hasAccess={true}
                    onInteraction={() => {}}
                  />
                  <div className="mt-4">
                    <StreamViewerStats
                      currentViewers={viewerCount}
                      peakViewers={Math.max(viewerCount, 100)}
                      totalViews={1000 + viewerCount}
                      language={language}
                    />
                  </div>
                </div>
                <div>
                  <StreamCategories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    hasActiveSubscription={hasActiveSubscription}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese
                    ? "Programação Portuguesa"
                    : "Portuguese Programming"}
                </h2>
                <p className="text-secondary-600">
                  {isPortuguese
                    ? "Descubra a programação completa dos nossos canais portugueses"
                    : "Discover the complete schedule of our Portuguese channels"}
                </p>
              </div>

              <StreamSchedule category={selectedCategory} language={language} />
            </div>
          )}

          {/* Replays Tab */}
          {activeTab === "replays" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? "Biblioteca de Gravações" : "Replay Library"}
                </h2>
                <p className="text-secondary-600">
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
                <p className="text-secondary-600">
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
  );
}
