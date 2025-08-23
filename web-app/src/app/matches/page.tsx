"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import type React from "react";
import { communityStats } from "@/config/community";
import { mockProfileImages } from "@/config/mockData";
import {
  HeartIcon,
  UsersIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  XMarkIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  FireIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import Image from "next/image";
import { ROUTES } from "@/config/routes";
import { motion, AnimatePresence } from "framer-motion";
import { plans, formatPrice } from "@/config/pricing";
import PremiumMatchesGate from "@/components/PremiumMatchesGate";
import EnhancedMatchDashboard from "@/components/matches/EnhancedMatchDashboard";
import MatchTestimonials from "@/components/MatchTestimonials";
import HowItWorksSection from "@/components/matches/HowItWorksSection";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

// Mock Portuguese profiles for demonstration
const mockProfiles = [
  {
    id: 1,
    name: "Ana Sofia",
    age: 28,
    location: "Stockwell",
    profession: "Marketing Manager",
    origin: "Porto, Portugal",
    interests: [
      "Fado",
      "Portuguese Cuisine",
      "Professional Networking",
      "Arts & Crafts",
    ],
    bio: "Portuguese marketing professional looking to connect with fellow lusófonos in London. Love fado nights and traditional cooking!",
    image: mockProfileImages["ana-sofia"],
    compatibility: 94,
  },
  {
    id: 2,
    name: "Miguel Santos",
    age: 32,
    location: "Vauxhall",
    profession: "Software Engineer",
    origin: "Lisboa, Portugal",
    interests: [
      "Professional Networking",
      "Football",
      "Language Exchange",
      "Tech Meetups",
    ],
    bio: "Tech enthusiast from Lisbon. Always up for watching Benfica games and meeting other Portuguese professionals in tech.",
    image: mockProfileImages["miguel-santos"],
    compatibility: 89,
  },
  {
    id: 3,
    name: "Beatriz Oliveira",
    age: 26,
    location: "Camden",
    profession: "Medical Student",
    origin: "Braga, Portugal",
    interests: [
      "Dancing",
      "Cultural Events",
      "Young Professionals",
      "Education",
    ],
    bio: "Medical student from Braga. Love traditional Portuguese dancing and meeting other young professionals.",
    image: mockProfileImages["beatriz-oliveira"],
    compatibility: 91,
  },
  {
    id: 4,
    name: "João Ferreira",
    age: 35,
    location: "Bermondsey",
    profession: "Chef",
    origin: "Aveiro, Portugal",
    interests: [
      "Portuguese Cuisine",
      "Cultural Events",
      "Business Networking",
      "Sports",
    ],
    bio: "Chef specializing in traditional Portuguese cuisine. Looking to connect with food lovers and fellow entrepreneurs.",
    image: mockProfileImages["joao-ferreira"],
    compatibility: 87,
  },
  {
    id: 5,
    name: "Carolina Lima",
    age: 29,
    location: "Kensington",
    profession: "Financial Analyst",
    origin: "São Paulo, Brasil",
    interests: [
      "Professional Networking",
      "Language Exchange",
      "Arts & Crafts",
      "Dance",
    ],
    bio: "Brazilian financial analyst living in London. Love connecting with Portuguese speakers and exploring the city.",
    image: mockProfileImages["carolina-lima"],
    compatibility: 92,
  },
  {
    id: 6,
    name: "Ricardo Costa",
    age: 31,
    location: "Elephant & Castle",
    profession: "Architect",
    origin: "Coimbra, Portugal",
    interests: [
      "Cultural Events",
      "Professional Networking",
      "Football",
      "Architecture",
    ],
    bio: "Architect from Coimbra passionate about Portuguese culture and design. Always ready for a good conversation over coffee.",
    image: mockProfileImages["ricardo-costa"],
    compatibility: 88,
  },
];

type Profile = (typeof mockProfiles)[number];

function MatchesContent() {
  const { t, language } = useLanguage();
  const { hasActiveSubscription, createSubscription } = useSubscription();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [isLiking, setIsLiking] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [dailyMatches, setDailyMatches] = useState(3); // Free tier daily matches
  const [dailyMatchesUsed, setDailyMatchesUsed] = useState(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [successStories, setSuccessStories] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [lastActions, setLastActions] = useState<
    { id: number; action: "like" | "skip" }[]
  >([]);
  const swipeThreshold = 50; // px

  const interestOptions = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach((p) => p.interests.forEach((i) => set.add(i)));
    return Array.from(set).sort();
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    if (!selectedInterests.length) return profiles;
    return profiles.filter((p) =>
      selectedInterests.every((i) => p.interests.includes(i))
    );
  }, [profiles, selectedInterests]);

  const currentProfile = filteredProfiles[currentProfileIndex];
  const remainingMatches = dailyMatches - dailyMatchesUsed;
  const isFreeTier = !hasActiveSubscription;
  const isLoggedIn = !!currentUser;

  // Check authentication state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // Initialize success stories count
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessStories((prev) => (prev + 1) % 234); // Animate success counter
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset index when filters change
  useEffect(() => {
    setCurrentProfileIndex(0);
  }, [selectedInterests]);

  // Keyboard shortcuts: Left = skip, Right = like

  const nextProfile = useCallback(() => {
    setCurrentProfileIndex((idx) =>
      idx < filteredProfiles.length - 1 ? idx + 1 : 0
    );
  }, [filteredProfiles.length]);

  const handleLike = useCallback(() => {
    if (isLiking || isSkipping) return;

    // If user is not logged in, redirect to signup
    if (!isLoggedIn) {
      window.location.href = `${ROUTES.signup  }?redirect=${  encodeURIComponent(window.location.pathname)}`;
      return;
    }

    // Check if user has reached daily limit (free tier only)
    if (isFreeTier && dailyMatchesUsed >= dailyMatches) {
      setShowUpgradePrompt(true);
      return;
    }

    setIsLiking(true);

    // Simulate match probability (35% chance for demo, higher for premium)
    const matchProbability = hasActiveSubscription ? 0.6 : 0.65;
    const isMatch = Math.random() > matchProbability;

    setTimeout(() => {
      if (isMatch && currentProfile) {
        setMatchedProfile(currentProfile);
        setShowMatchModal(true);
      }

      // Increment daily matches used for free tier
      if (isFreeTier) {
        setDailyMatchesUsed((prev) => prev + 1);
      }

      if (currentProfile) {
        setLastActions((prev) =>
          [...prev, { id: currentProfile.id, action: "like" as const }].slice(
            -10
          )
        );
      }

      nextProfile();
      setIsLiking(false);
    }, 600);
  }, [
    isLiking,
    isSkipping,
    isFreeTier,
    dailyMatchesUsed,
    dailyMatches,
    hasActiveSubscription,
    currentProfile,
    nextProfile,
  ]);

  const handleSkip = useCallback(() => {
    if (isLiking || isSkipping) return;

    // If user is not logged in, redirect to signup (but allow a few previews first)
    if (!isLoggedIn && currentProfileIndex >= 2) {
      window.location.href = `${ROUTES.signup  }?redirect=${  encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setIsSkipping(true);

    setTimeout(() => {
      if (currentProfile) {
        setLastActions((prev) =>
          [...prev, { id: currentProfile.id, action: "skip" as const }].slice(
            -10
          )
        );
      }
      nextProfile();
      setIsSkipping(false);
    }, 400);
  }, [isLiking, isSkipping, currentProfile, nextProfile]);

  const handleUndo = () => {
    if (!lastActions.length || isLiking || isSkipping) return;
    const last = lastActions[lastActions.length - 1];
    setLastActions((prev) => prev.slice(0, -1));
    // Only move back if there is at least one shown
    if (currentProfileIndex > 0 || filteredProfiles.length) {
      setCurrentProfileIndex((i) => (i > 0 ? i - 1 : 0));
      if (isFreeTier && last.action === "like") {
        setDailyMatchesUsed((u) => Math.max(0, u - 1));
      }
    }
  };

  // Simple touch swipe handlers
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setTouchStart({ x: t.clientX, y: t.clientY });
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    // Horizontal swipe with minimal vertical movement
    if (Math.abs(dx) > swipeThreshold && Math.abs(dy) < 40) {
      if (dx > 0) {
        handleLike();
      } else {
        handleSkip();
      }
    }
    setTouchStart(null);
  };

  // Keyboard shortcuts: Left = skip, Right = like
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showMatchModal) return; // avoid conflicts while modal open
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSkip();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleLike();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMatchModal, handleLike, handleSkip]);

  const getOriginFlag = (origin: string) => {
    if (
      origin.includes("Portugal") ||
      origin.includes("Porto") ||
      origin.includes("Lisboa") ||
      origin.includes("Braga") ||
      origin.includes("Aveiro") ||
      origin.includes("Coimbra")
    )
      return "🇵🇹";
    if (
      origin.includes("Brasil") ||
      origin.includes("São Paulo") ||
      origin.includes("Rio")
    )
      return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    if (origin.includes("Cabo Verde")) return "🇨🇻";
    return "🌍";
  };

  const steps = [
    {
      icon: UsersIcon,
      title: "Complete Your Profile",
      description:
        "Share your interests, your United Kingdom location, and what you're looking for in the Portuguese-speaking community",
      titlePt: "Complete o Seu Perfil",
      descriptionPt:
        "Partilhe os seus interesses, localização no Reino Unido e o que procura na comunidade de falantes de português",
    },
    {
      icon: SparklesIcon,
      title: "Advanced Matching",
      description:
        "Our system connects you with Portuguese speakers based on compatibility, interests, and proximity",
      titlePt: "Correspondência Avançada",
      descriptionPt:
        "O nosso sistema conecta-o com falantes de português baseado em compatibilidade, interesses e proximidade",
    },
    {
      icon: CalendarIcon,
      title: "Attend Events Together",
      description:
        "Meet your matches at Portuguese cultural events, networking meetups, and social gatherings",
      titlePt: "Participem em Eventos Juntos",
      descriptionPt:
        "Conheça as suas correspondências em eventos culturais portugueses, encontros de networking e reuniões sociais",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Build Connections",
      description:
        "Start conversations in Portuguese or English and build lasting friendships or professional relationships",
      titlePt: "Construa Conexões",
      descriptionPt:
        "Inicie conversas em português ou inglês e construa amizades duradouras ou relacionamentos profissionais",
    },
  ];

  const benefits = [
    "All matches are Portuguese speakers from diverse backgrounds across the United Kingdom",
    "Cultural compatibility scoring",
    "Event-based meetups for natural connections",
    "Professional and social networking opportunities",
    "Safe and verified community members",
  ];

  const benefitsPt = [
    "Todas as correspondências são falantes de português em todo o Reino Unido",
    "Pontuação de compatibilidade cultural",
    "Encontros baseados em eventos para conexões naturais",
    "Oportunidades de networking profissional e social",
    "Membros da comunidade seguros e verificados",
  ];

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">
            {language === "pt" ? "Carregando..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8">
      {/* Enhanced Hero Section */}
      <div className="relative min-h-[42vh] md:min-h-[52vh] bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        {/* Portuguese flag inspired decorative elements */}
        <div className="absolute top-12 left-12 w-32 h-32 bg-gradient-to-br from-secondary-400/20 to-secondary-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-gradient-to-br from-action-400/20 to-action-500/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-accent-500/30 rounded-full animate-pulse delay-500" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-primary-900/10" />

        <div className="relative z-10 flex items-start justify-center px-4 pt-8 md:pt-14 pb-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <HeartIcon className="w-10 h-10 md:w-12 md:h-12 text-white/90 animate-pulse" />
                <div className="text-2xl md:text-3xl">❤️</div>
                <HeartIcon className="w-10 h-10 md:w-12 md:h-12 text-white/90 animate-pulse" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {language === "pt" ? "Encontre Falantes de Português no Reino Unido" : "Connect with Portuguese Speakers in the United Kingdom"}
              </h1>
              <p className="text-sm md:text-base text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto">
                {language === "pt"
                  ? "Conecte-se com uma comunidade vibrante de falantes de português - brasileiros, portugueses, angolanos, cabo-verdianos e mais. Partilhe a sua língua, cultura e experiências no Reino Unido."
                  : "Connect with a vibrant community of Portuguese speakers - Brazilians, Portuguese, Angolans, Cape Verdeans and more. Share your language, culture, and experiences in the United Kingdom."}
              </p>

              {/* Live Success Counter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <FireIcon className="w-6 h-6 text-orange-300" />
                  <span className="text-white font-semibold text-lg">
                    {language === "pt"
                      ? "Histórias de Sucesso em Tempo Real"
                      : "Live Success Stories"}
                  </span>
                  <FireIcon className="w-6 h-6 text-orange-300" />
                </div>
                <div className="text-center">
                  <motion.div
                    key={successStories}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xl md:text-2xl font-bold text-white mb-1"
                  >
                    {200 + successStories}+
                  </motion.div>
                  <p className="text-white/80 text-sm">
                    {language === "pt"
                      ? "Português(as) conectaram-se através do LusoTown este mês"
                      : "Portuguese speakers connected through LusoTown this month"}
                  </p>
                </div>
              </div>

              {/* Cultural Quote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
                <blockquote className="text-base md:text-lg text-white/95 italic">
                  "
                  {language === "pt"
                    ? "Finalmente alguém que percebe a saudade e ama pastéis de nata tanto quanto eu!"
                    : "Finally someone who understands saudade and loves pastéis de nata as much as I do!"}
                  "
                </blockquote>
                <cite className="text-white/80 text-xs block mt-1">
                  —{" "}
                  {language === "pt"
                    ? "Sofia, 29, Stockwell"
                    : "Sofia, 29, Stockwell"}
                </cite>
              </div>
            </div>

            {/* Usage Meter for Free Users */}
            {isFreeTier && (
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/90 text-sm font-medium">
                    {language === "pt" ? "Matches Diários" : "Daily Matches"}
                  </span>
                  <span className="text-white/90 text-sm font-bold">
                    {remainingMatches}/{dailyMatches}{" "}
                    {language === "pt" ? "restantes" : "remaining"}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(remainingMatches / dailyMatches) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-white/70 text-xs mt-2">
                  {language === "pt"
                    ? "Reinicia à meia-noite"
                    : "Resets at midnight"}
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={ROUTES.signup}
                className="bg-white text-primary-600 px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex-1 max-w-[160px] sm:max-w-none text-center"
              >
                {language === "pt" ? "Start Free" : "Start Free"}
              </a>
              <button
                onClick={() => createSubscription("community")}
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm md:text-base hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex-1 max-w-[160px] sm:max-w-none text-center"
              >
                {language === "pt"
                  ? `${formatPrice(plans.community.monthly)}/month`
                  : `${formatPrice(plans.community.monthly)}/month`}
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="text-center group">
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  {communityStats.members}
                </motion.div>
                <div className="text-white/80 text-sm">
                  {language === "pt"
                    ? "Falantes Português"
                    : "Portuguese Speakers"}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {language === "pt"
                    ? "Em todo o Reino Unido"
                    : "Across the United Kingdom"}
                </div>
              </div>
              <div className="text-center group">
                <motion.div
                  className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  234+
                </motion.div>
                <div className="text-white/80 text-xs md:text-sm">
                  {language === "pt" ? "Matches de Sucesso" : "Success Stories"}
                </div>
                <div className="text-white/60 text-[11px] md:text-xs mt-1">
                  {language === "pt" ? "Este mês" : "This month"}
                </div>
              </div>
              <div className="text-center group">
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  60+
                </motion.div>
                <div className="text-white/80 text-sm">
                  {language === "pt" ? "Eventos Mensais" : "Monthly Events"}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {language === "pt"
                    ? "Para conhecer pessoalmente"
                    : "To meet in person"}
                </div>
              </div>
              <div className="text-center group">
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  97%
                </motion.div>
                <div className="text-white/80 text-sm">
                  {language === "pt"
                    ? "Taxa de Satisfação"
                    : "Satisfaction Rate"}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {language === "pt" ? "Membros Premium" : "Premium Members"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What This Page Is About Banner */}
      <section className="py-8 md:py-12 bg-white border-b-2 border-primary-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-6 md:p-8 border border-primary-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary-600 rounded-full p-3 flex-shrink-0">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-3">
                  {language === "pt" 
                    ? "Como Funciona o Sistema de Correspondências" 
                    : "How Our Community Matching System Works"}
                </h2>
                <p className="text-sm md:text-base text-primary-700 leading-relaxed mb-4">
                  {language === "pt"
                    ? "Esta página conecta falantes de português em todo o Reino Unido com base em interesses partilhados, localização e compatibilidade cultural. Cada correspondência é cuidadosamente selecionada para ajudá-lo a encontrar amigos, parceiros profissionais ou românticos dentro da nossa comunidade lusófona."
                    : "This page connects Portuguese speakers across the United Kingdom based on shared interests, location, and cultural compatibility. Each match is carefully curated to help you find friends, professional partners, or romantic connections within our Portuguese-speaking community."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/80 rounded-lg p-3 border border-primary-200">
                    <div className="font-semibold text-primary-800 text-sm mb-1">
                      {language === "pt" ? "Para Novos Membros" : "For New Members"}
                    </div>
                    <div className="text-xs text-primary-600">
                      {language === "pt" 
                        ? "Visualize perfis, veja como funciona, registe-se para começar"
                        : "Browse profiles, see how it works, sign up to start"}
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-secondary-200">
                    <div className="font-semibold text-secondary-800 text-sm mb-1">
                      {language === "pt" ? "Para Membros Registados" : "For Registered Members"}
                    </div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" 
                        ? "3 matches diários grátis, mensagens limitadas"
                        : "3 free daily matches, limited messaging"}
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-accent-200">
                    <div className="font-semibold text-accent-800 text-sm mb-1">
                      {language === "pt" ? "Para Membros Premium" : "For Premium Members"}
                    </div>
                    <div className="text-xs text-accent-600">
                      {language === "pt" 
                        ? "Matches ilimitados, filtros avançados, eventos exclusivos"
                        : "Unlimited matches, advanced filters, exclusive events"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portuguese-Speaking Nations Section */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-3">
              {language === "pt" ? "Unidos pela Língua Portuguesa" : "United by the Portuguese Language"}
            </h2>
            <p className="text-sm md:text-base text-primary-700 max-w-2xl mx-auto">
              {language === "pt" 
                ? "Conectamos falantes de português de todas as nações lusófonas no Reino Unido"
                : "Connecting Portuguese speakers from all Lusophone nations across the United Kingdom"}
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-6">
            {[
              { flag: "🇵🇹", country: "Portugal", name: language === "pt" ? "Portugal" : "Portugal" },
              { flag: "🇧🇷", country: "Brazil", name: language === "pt" ? "Brasil" : "Brazil" },
              { flag: "🇦🇴", country: "Angola", name: "Angola" },
              { flag: "🇲🇿", country: "Mozambique", name: language === "pt" ? "Moçambique" : "Mozambique" },
              { flag: "🇨🇻", country: "Cape Verde", name: language === "pt" ? "Cabo Verde" : "Cape Verde" },
              { flag: "🇬🇼", country: "Guinea-Bissau", name: "Guiné-Bissau" },
              { flag: "🇸🇹", country: "São Tomé and Príncipe", name: language === "pt" ? "São Tomé e Príncipe" : "São Tomé and Príncipe" },
              { flag: "🇹🇱", country: "East Timor", name: language === "pt" ? "Timor-Leste" : "East Timor" },
              { flag: "🇲🇴", country: "Macau", name: "Macau" }
            ].map((nation, index) => (
              <div key={nation.country} className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-200">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:shadow-xl transition-shadow duration-200 border border-primary-100">
                  {nation.flag}
                </div>
                <span className="text-xs md:text-sm font-medium text-primary-800 mt-2 text-center leading-tight">
                  {nation.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-full border border-primary-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary-800">
                {language === "pt" ? "260+ milhões de falantes unidos" : "260+ million speakers united"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Matching Section */}
      <section className="py-10 md:py-14 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3 md:mb-5">
              {language === "pt"
                ? "Descubra Falantes de Português Próximos de Si"
                : "Discover Portuguese Speakers Near You"}
            </h2>
            <p className="text-sm md:text-base text-primary-700 max-w-3xl mx-auto mb-5">
              {language === "pt"
                ? "Navegue por falantes de português em todo o Reino Unido que partilham os seus interesses, valores e património cultural. Cada perfil é cuidadosamente verificado para garantir ligações autênticas."
                : "Browse Portuguese speakers across the United Kingdom who share your interests, values, and cultural heritage. Every profile is carefully verified to ensure authentic connections."}
            </p>

            {/* Cultural Compatibility Highlight */}
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-primary-800 text-sm font-medium">
                  {language === "pt"
                    ? "Compatibilidade Cultural"
                    : "Cultural Compatibility"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-secondary-100 px-4 py-2 rounded-full">
                <ShieldCheckIcon className="w-4 h-4 text-secondary-600" />
                <span className="text-secondary-800 text-sm font-medium">
                  {language === "pt"
                    ? "Perfis Verificados"
                    : "Verified Profiles"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent-100 px-4 py-2 rounded-full">
                <MapPinIcon className="w-4 h-4 text-accent-600" />
                <span className="text-accent-800 text-sm font-medium">
                  {language === "pt" ? "Próximo de Si" : "Near You"}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Required Notice for Non-Logged-In Users */}
          {!isLoggedIn && !isCheckingAuth && (
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <div className="text-primary-800 font-bold text-base mb-2">
                  {language === "pt" ? "Registe-se para Ver Correspondências Personalizadas" : "Sign Up to See Personalized Matches"}
                </div>
                <p className="text-primary-700 text-sm mb-4 leading-relaxed">
                  {language === "pt"
                    ? "Para mostrar correspondências relevantes, precisamos conhecer os seus interesses, localização no Reino Unido e preferências culturais. O nosso algoritmo usa esta informação para conectá-lo com falantes de português compatíveis."
                    : "To show you relevant matches, we need to know your interests, United Kingdom location, and cultural preferences. Our algorithm uses this information to connect you with compatible Portuguese speakers."}
                </p>
                
                <div className="bg-white/80 rounded-lg p-3 mb-4 text-left">
                  <div className="text-primary-800 font-semibold text-xs mb-2">
                    {language === "pt" ? "O que precisamos saber:" : "What we need to know:"}
                  </div>
                  <ul className="text-primary-700 text-xs space-y-1">
                    <li>📍 {language === "pt" ? "A sua localização no Reino Unido" : "Your location in the United Kingdom"}</li>
                    <li>🎯 {language === "pt" ? "Os seus interesses e hobbies" : "Your interests and hobbies"}</li>
                    <li>🇵🇹 {language === "pt" ? "Preferências culturais portuguesas" : "Portuguese cultural preferences"}</li>
                    <li>👥 {language === "pt" ? "Tipo de conexões que procura" : "Type of connections you're seeking"}</li>
                  </ul>
                </div>

                <a
                  href={ROUTES.signup}
                  className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {language === "pt" ? "Criar Conta Gratuita" : "Create Free Account"}
                </a>
                
                <p className="text-primary-600 text-xs mt-3">
                  {language === "pt" ? "Grátis para sempre • 3 matches diários" : "Free forever • 3 daily matches"}
                </p>
              </div>
            </div>
          )}

          <div className="max-w-md mx-auto">
            {/* Filters: Quick interest chips */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-primary-800">
                  {language === "pt"
                    ? "Filtrar por interesses"
                    : "Filter by interests"}
                </h4>
                {selectedInterests.length > 0 && (
                  <button
                    onClick={() => setSelectedInterests([])}
                    className="text-xs text-primary-600 hover:text-primary-800"
                  >
                    {language === "pt" ? "Limpar" : "Clear"}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {interestOptions.slice(0, 12).map((interest) => {
                  const active = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() =>
                        setSelectedInterests((prev) =>
                          prev.includes(interest)
                            ? prev.filter((i) => i !== interest)
                            : [...prev, interest]
                        )
                      }
                      className={
                        `px-3 py-1 rounded-full text-xs font-medium border transition-colors ${ 
                        active
                          ? "bg-primary-600 text-white border-primary-600"
                          : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"}`
                      }
                      aria-pressed={active}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Enhanced Profile Card Stack - Only for logged-in users */}
            {isLoggedIn && (
              <div className="relative min-h-[600px] md:min-h-[640px] mb-6">
                <AnimatePresence mode="wait">
                  {currentProfile && (
                  <motion.div
                    key={currentProfile.id}
                    initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                      x: isLiking ? 100 : isSkipping ? -100 : 0,
                      rotate: isLiking ? 10 : isSkipping ? -10 : 0,
                    }}
                    exit={{
                      scale: 0.8,
                      opacity: 0,
                      x: isLiking ? 200 : isSkipping ? -200 : 0,
                      rotate: isLiking ? 20 : isSkipping ? -20 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 hover:shadow-3xl transition-shadow duration-300 flex flex-col"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    {/* Enhanced Profile Image Section */}
                    <div className="relative h-48 md:h-52 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl md:text-6xl text-primary-400 drop-shadow-lg">
                          👤
                        </div>
                      </div>

                      {/* Enhanced Compatibility Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-2xl text-xs md:text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                        <div className="flex items-center gap-1">
                          <StarIconSolid className="w-3 h-3 text-yellow-300" />
                          {currentProfile.compatibility}% Match
                        </div>
                      </div>

                      {/* Enhanced Origin Badge - Flag Only */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl text-xs md:text-sm font-semibold shadow-xl border border-primary-100">
                        <span className="text-lg">{getOriginFlag(currentProfile.origin)}</span>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
                    </div>

                    {/* Enhanced Profile Info with Better Layout */}
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      {/* Header Section */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-2 leading-tight">
                              {currentProfile.name}, {currentProfile.age}
                            </h3>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-primary-600">
                                <BriefcaseIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium truncate">
                                  {currentProfile.profession}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-primary-600">
                                <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium">
                                  {currentProfile.location}, London
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bio Section with Better Typography */}
                        <div className="bg-primary-25 p-3 rounded-xl border border-primary-100">
                          <p className="text-primary-800 text-sm leading-relaxed">
                            {currentProfile.bio}
                          </p>
                        </div>
                      </div>

                      {/* Interests Section - Enhanced */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-primary-900 mb-2.5 flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-secondary-500" />
                          Common Interests
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.interests
                            .slice(0, 4)
                            .map((interest, index) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary-200 whitespace-nowrap"
                              >
                                {interest}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Enhanced Portuguese Cultural Connection */}
                      <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 p-3 rounded-2xl border border-secondary-200 shadow-inner">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                              <HeartIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-bold text-secondary-800 text-xs">
                              {language === "pt"
                                ? "Conexão Cultural"
                                : "Cultural Connection"}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIconSolid
                                key={i}
                                className="w-3 h-3 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 mb-3">
                          <div className="flex items-center gap-1.5 bg-white/60 p-1.5 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-secondary-700">
                              Language
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/60 p-1.5 rounded-lg">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-xs font-medium text-secondary-700">
                              Traditions
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/60 p-1.5 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs font-medium text-secondary-700">
                              Values
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/60 p-1.5 rounded-lg">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs font-medium text-secondary-700">
                              Location
                            </span>
                          </div>
                        </div>

                        {/* Connection Reasons */}
                        <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border border-white/60">
                          <h5 className="font-bold text-secondary-800 mb-2 text-xs">
                            Why you'll connect:
                          </h5>
                          <div className="space-y-1">
                            {currentProfile.interests
                              .slice(0, 2)
                              .map((interest, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircleIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span className="text-xs text-secondary-700 truncate">
                                    {interest}
                                  </span>
                                </div>
                              ))}
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="w-3 h-3 text-primary-500 flex-shrink-0" />
                              <span className="text-xs text-secondary-700 truncate">
                                Near: {currentProfile.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  )}
              </AnimatePresence>

              {/* Background Cards for Stack Effect */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform translate-y-2 translate-x-1 border border-primary-50 -z-10"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-md transform translate-y-4 translate-x-2 border border-primary-50 -z-20"></div>
            </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="flex justify-center gap-6 px-4">
              <button
                onClick={handleSkip}
                disabled={isLiking || isSkipping || !currentProfile}
                className="group relative w-18 h-18 bg-white border-3 border-gray-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label={language === "pt" ? "Passar" : "Skip"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <XMarkIcon className="relative w-8 h-8 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {!isLoggedIn && currentProfileIndex >= 2 
                      ? (language === "pt" ? "Registe-se para continuar" : "Sign up to continue")
                      : (language === "pt" ? "Passar" : "Skip")
                    }
                  </span>
                </div>
              </button>

              <button
                onClick={handleLike}
                disabled={isLiking || isSkipping || !currentProfile}
                className="group relative w-20 h-20 bg-gradient-to-r from-action-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label={language === "pt" ? "Gostar" : "Like"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-action-600 via-secondary-600 to-accent-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <HeartIconSolid className="relative w-9 h-9 text-white animate-pulse" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {!isLoggedIn 
                      ? (language === "pt" ? "Registe-se para gostar" : "Sign up to like")
                      : (language === "pt" ? "Gostar" : "Like")
                    }
                  </span>
                </div>
              </button>

              {/* Super Like Button - Premium Feature */}
              {hasActiveSubscription && (
                <button
                  onClick={() => {
                    /* Add super like logic */
                  }}
                  disabled={isLiking || isSkipping || !currentProfile}
                  className="group relative w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-yellow-300 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label={language === "pt" ? "Super Like" : "Super Like"}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <StarIcon className="relative w-8 h-8 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Super Like
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* Undo */}
            <div className="mt-3 text-center">
              <button
                onClick={handleUndo}
                disabled={!lastActions.length || isLiking || isSkipping}
                className="text-xs text-primary-600 hover:text-primary-800 disabled:opacity-40"
              >
                {language === "pt" ? "Desfazer" : "Undo"}
              </button>
            </div>

            {/* Instructions & Encouragement */}
            <div className="text-center mt-5 space-y-2.5">
              <p className="text-primary-600 text-sm font-medium">
                {language === "pt"
                  ? "Toque em ❌ para passar • Toque em ❤️ para gostar • Conheçam-se em eventos portugueses!"
                  : "Tap ❌ to skip • Tap ❤️ to like • Meet at Portuguese events!"}
              </p>

              {remainingMatches <= 1 && isFreeTier && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <p className="text-orange-800 text-sm font-medium mb-2">
                    {language === "pt"
                      ? `⏰ Apenas ${remainingMatches} match${
                          remainingMatches !== 1 ? "es" : ""
                        } restante${remainingMatches !== 1 ? "s" : ""}!`
                      : `⏰ Only ${remainingMatches} match${
                          remainingMatches !== 1 ? "es" : ""
                        } remaining!`}
                  </p>
                  <button
                    onClick={() => setShowUpgradePrompt(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {language === "pt"
                      ? `Matches ilimitados por ${formatPrice(
                          plans.community.monthly
                        )}/mês`
                      : `Unlimited matches for ${formatPrice(
                          plans.community.monthly
                        )}/month`}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-primary-500 text-xs">
                <ClockIcon className="w-4 h-4" />
                <span>
                  {language === "pt"
                    ? "Tempo médio para encontrar um match: 2.3 dias"
                    : "Average time to find a match: 2.3 days"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMatchModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-3xl font-bold text-primary-900 mb-2">
                {language === "pt" ? "É um Match!" : "It's a Match!"}
              </h3>
              <p className="text-primary-700 mb-4">
                {language === "pt"
                  ? `Você e ${matchedProfile?.name} gostaram um do outro! Iniciem uma conversa e planeiem encontrar-se num evento português.`
                  : `You and ${matchedProfile?.name} both liked each other! Start chatting and plan to meet at a Portuguese event.`}
              </p>

              {/* Match Quality Indicator */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl mb-6 border border-green-200">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <StarIconSolid className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-semibold text-sm">
                    {matchedProfile?.compatibility}%{" "}
                    {language === "pt" ? "Compatibilidade" : "Compatibility"}
                  </span>
                </div>
                <p className="text-green-700 text-xs">
                  {language === "pt"
                    ? "Baseado em interesses culturais e localização"
                    : "Based on cultural interests and location"}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-primary-100 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-200 transition-colors"
                >
                  {language === "pt" ? "Continuar" : "Keep Swiping"}
                </button>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  {language === "pt" ? "Enviar Mensagem" : "Send Message"}
                </button>
              </div>

              {/* Conversion prompt for free users */}
              {isFreeTier && (
                <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-orange-800 text-sm mb-2">
                    {language === "pt"
                      ? "Parabéns! Membros Premium têm 3x mais matches como este."
                      : "Congratulations! Premium members get 3x more matches like this."}
                  </p>
                  <button
                    onClick={() => {
                      setShowMatchModal(false);
                      createSubscription("community");
                    }}
                    className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {language === "pt"
                      ? `Upgrade ${formatPrice(plans.community.monthly)}/mês`
                      : `Upgrade ${formatPrice(plans.community.monthly)}/month`}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works Section - Enhanced */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              {language === "pt" ? "Como Funciona o Nosso Sistema" : "How Our Matching System Works"}
            </h2>
            <p className="text-sm md:text-base text-primary-700 max-w-3xl mx-auto mb-8">
              {language === "pt"
                ? "O nosso algoritmo de correspondência foi especificamente desenvolvido para falantes de português no Reino Unido, focando na compatibilidade cultural e experiências partilhadas."
                : "Our matching algorithm is specifically designed for Portuguese speakers in the United Kingdom, focusing on cultural compatibility and shared experiences."}
            </p>
            
            {/* Algorithm Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200">
                <div className="text-primary-600 font-bold text-lg mb-1">94%</div>
                <div className="text-sm text-primary-800">
                  {language === "pt" ? "Taxa de Compatibilidade" : "Compatibility Rate"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 rounded-xl border border-secondary-200">
                <div className="text-secondary-600 font-bold text-lg mb-1">2.3</div>
                <div className="text-sm text-secondary-800">
                  {language === "pt" ? "Dias Médios para Match" : "Days to Match"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-xl border border-accent-200">
                <div className="text-accent-600 font-bold text-lg mb-1">85%</div>
                <div className="text-sm text-accent-800">
                  {language === "pt" ? "Encontram-se Pessoalmente" : "Meet in Person"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-primary-600 mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-primary-900 mb-2 md:mb-3">
                    {language === "pt" ? step.titlePt : step.title}
                  </h3>
                  <p className="text-primary-700 leading-relaxed text-sm md:text-base">
                    {language === "pt" ? step.descriptionPt : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Account Types & Features */}
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-3xl p-8 md:p-10 border border-primary-200">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-3">
                {language === "pt" ? "Planos e Funcionalidades" : "Plans & Features"}
              </h3>
              <p className="text-primary-700 max-w-2xl mx-auto">
                {language === "pt" 
                  ? "Escolha o plano que melhor se adapta às suas necessidades de networking na comunidade de falantes de português."
                  : "Choose the plan that best fits your Portuguese-speaking community networking needs."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-600 mb-2">FREE</div>
                  <div className="text-sm text-gray-500 mb-4">
                    {language === "pt" ? "Comece a conectar-se" : "Start connecting"}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "3 matches por dia" : "3 matches per day"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "10 mensagens por mês" : "10 messages per month"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Filtros básicos" : "Basic filters"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Eventos públicos" : "Public events"}
                    </span>
                  </li>
                </ul>
                <a
                  href={ROUTES.signup}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-center block hover:bg-gray-200 transition-colors"
                >
                  {language === "pt" ? "Começar Grátis" : "Start Free"}
                </a>
              </div>

              {/* Community Plan */}
              <div className="bg-white rounded-2xl p-6 border-2 border-primary-300 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    {language === "pt" ? "MAIS POPULAR" : "MOST POPULAR"}
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {formatPrice(plans.community.monthly)}
                  </div>
                  <div className="text-sm text-primary-600 mb-4">
                    {language === "pt" ? "Membro da Comunidade" : "Community Member"}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Matches ilimitados" : "Unlimited matches"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Mensagens ilimitadas" : "Unlimited messaging"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Filtros culturais avançados" : "Advanced cultural filters"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Eventos exclusivos" : "Exclusive events"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Perfil em destaque" : "Featured profile"}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => createSubscription("community")}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  {language === "pt" ? "Começar Premium" : "Start Premium"}
                </button>
              </div>

              {/* Ambassador Plan */}
              <div className="bg-white rounded-2xl p-6 border border-premium-200 shadow-md">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-premium-600 mb-2">
                    {formatPrice(plans.ambassador.monthly)}
                  </div>
                  <div className="text-sm text-premium-600 mb-4">
                    {language === "pt" ? "Embaixador Cultural" : "Cultural Ambassador"}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Tudo do Comunidade +" : "Everything in Community +"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Super Likes ilimitados" : "Unlimited Super Likes"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Hospedar eventos" : "Host events"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Badges VIP" : "VIP badges"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {language === "pt" ? "Suporte prioritário" : "Priority support"}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => createSubscription("ambassador")}
                  className="w-full bg-gradient-to-r from-premium-600 to-premium-700 text-white py-3 rounded-xl font-semibold hover:from-premium-700 hover:to-premium-800 transition-all"
                >
                  {language === "pt" ? "Ser Embaixador" : "Become Ambassador"}
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-primary-600">
                {language === "pt" 
                  ? "Todos os planos incluem acesso à comunidade de falantes de português no Reino Unido • Cancele a qualquer momento"
                  : "All plans include access to the Portuguese-speaking community in the United Kingdom • Cancel anytime"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 md:mb-7">
                {t("whyChooseOurMatching") || "Why Choose Our Matching System?"}
              </h2>
              <div className="space-y-4">
                {(t("currentLang") === "pt" ? benefitsPt : benefits).map(
                  (benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-secondary-500 mt-1 flex-shrink-0" />
                      <p className="text-sm md:text-base text-primary-800">
                        {benefit}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="mt-8 space-y-4">
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-primary-200 shadow-lg">
                  <h4 className="text-lg font-bold text-primary-900 mb-3">
                    {language === "pt"
                      ? "Planos de Subscrição"
                      : "Membership Plans"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-xl">
                      <div className="text-2xl font-bold text-gray-600 mb-1">
                        FREE
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {language === "pt" ? "3 matches/dia" : "3 matches/day"}
                      </div>
                      <a
                        href={ROUTES.signup}
                        className="w-full inline-block text-center bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium"
                      >
                        {language === "pt" ? "Começar Grátis" : "Start Free"}
                      </a>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-300 rounded-xl">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {formatPrice(plans.community.monthly)}
                      </div>
                      <div className="text-sm text-primary-600 mb-2">
                        {language === "pt"
                          ? "Matches ilimitados"
                          : "Unlimited matches"}
                      </div>
                      <button
                        onClick={() => createSubscription("community")}
                        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                      >
                        {language === "pt"
                          ? "Começar Premium"
                          : "Start Premium"}
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-xs text-primary-600">
                      {language === "pt"
                        ? `Embaixador Cultural disponível por ${formatPrice(
                            plans.ambassador.monthly
                          )}/mês`
                        : `Cultural Ambassador available for ${formatPrice(
                            plans.ambassador.monthly
                          )}/month`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary-200 shadow-lg">
              <div className="text-center">
                <HeartIcon className="w-16 h-16 text-action-500 mx-auto mb-6" />
                <h3 className="text-lg md:text-xl font-bold text-primary-900 mb-2">
                  {t("joinCommunity") || "Join Our Community"}
                </h3>
                <p className="text-primary-700 mb-5 text-sm md:text-base">
                  {t("joinCommunityDescription") ||
                    "Connect with Portuguese speakers from all backgrounds who understand your language, culture, and journey in the United Kingdom"}
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100">
                  <div className="text-xl md:text-2xl font-bold text-primary-600">
                    {communityStats.members}
                  </div>
                  <div className="text-sm text-primary-600">
                    {t("activeMember") || "Active Portuguese Speakers"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How This Works - Simple Guide */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              {language === "pt" ? "Como Funciona Esta Página" : "How This Page Actually Works"}
            </h2>
            <p className="text-primary-700 max-w-3xl mx-auto">
              {language === "pt"
                ? "Um guia simples para navegar e usar o nosso sistema de correspondências na comunidade de falantes de português do Reino Unido"
                : "A simple guide to navigate and use our Portuguese-speaking community matching system in the United Kingdom"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Navegue os Perfis" : "Browse Profiles"}
              </h3>
              <p className="text-sm text-primary-700">
                {language === "pt"
                  ? "Veja falantes de português próximos de si com interesses similares"
                  : "View Portuguese speakers near you with similar interests"}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {language === "pt" ? "Gratuito • Sem registo necessário" : "Free • No signup required"}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Registe-se para Corresponder" : "Sign Up to Match"}
              </h3>
              <p className="text-sm text-primary-700">
                {language === "pt"
                  ? "Crie a sua conta para gostar de perfis e fazer correspondências"
                  : "Create your account to like profiles and make matches"}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {language === "pt" ? "3 matches diários grátis" : "3 daily free matches"}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-accent-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Conecte & Converse" : "Connect & Chat"}
              </h3>
              <p className="text-sm text-primary-700">
                {language === "pt"
                  ? "Quando há correspondência mútua, iniciem uma conversa"
                  : "When there's a mutual match, start a conversation"}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {language === "pt" ? "Mensagens limitadas (grátis)" : "Limited messages (free)"}
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-premium-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h3 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Encontrem-se" : "Meet in Person"}
              </h3>
              <p className="text-sm text-primary-700">
                {language === "pt"
                  ? "Planeiem encontrar-se em eventos portugueses ou cafés locais"
                  : "Plan to meet at Portuguese events or local cafés"}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {language === "pt" ? "Eventos sugeridos automaticamente" : "Events suggested automatically"}
              </div>
            </div>
          </div>

          {/* User Type Guide */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-200">
            <h3 className="text-xl font-bold text-primary-900 mb-6 text-center">
              {language === "pt" ? "O Que Cada Tipo de Utilizador Pode Fazer" : "What Each User Type Can Do"}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Visitors */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h4 className="font-bold text-gray-700 mb-3">
                  {language === "pt" ? "Visitantes" : "Visitors"}
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✅ {language === "pt" ? "Ver perfis (primeiros 3)" : "View profiles (first 3)"}</li>
                  <li>✅ {language === "pt" ? "Navegar interesses" : "Browse interests"}</li>
                  <li>❌ {language === "pt" ? "Gostar/corresponder" : "Like/match"}</li>
                  <li>❌ {language === "pt" ? "Enviar mensagens" : "Send messages"}</li>
                </ul>
                <div className="mt-4">
                  <a 
                    href={ROUTES.signup}
                    className="text-primary-600 text-sm font-medium hover:text-primary-800"
                  >
                    {language === "pt" ? "Registe-se gratuitamente →" : "Sign up free →"}
                  </a>
                </div>
              </div>

              {/* Free Members */}
              <div className="text-center border-2 border-primary-200 rounded-xl p-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💚</span>
                </div>
                <h4 className="font-bold text-primary-700 mb-3">
                  {language === "pt" ? "Membros Grátis" : "Free Members"}
                </h4>
                <ul className="text-sm text-primary-600 space-y-2">
                  <li>✅ {language === "pt" ? "3 matches por dia" : "3 matches per day"}</li>
                  <li>✅ {language === "pt" ? "10 mensagens/mês" : "10 messages/month"}</li>
                  <li>✅ {language === "pt" ? "Filtros básicos" : "Basic filters"}</li>
                  <li>✅ {language === "pt" ? "Eventos públicos" : "Public events"}</li>
                </ul>
                <div className="mt-4 text-xs text-primary-600">
                  {language === "pt" ? "Sempre gratuito" : "Always free"}
                </div>
              </div>

              {/* Premium Members */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h4 className="font-bold text-primary-700 mb-3">
                  {language === "pt" ? "Membros Premium" : "Premium Members"}
                </h4>
                <ul className="text-sm text-primary-600 space-y-2">
                  <li>✅ {language === "pt" ? "Matches ilimitados" : "Unlimited matches"}</li>
                  <li>✅ {language === "pt" ? "Mensagens ilimitadas" : "Unlimited messages"}</li>
                  <li>✅ {language === "pt" ? "Filtros avançados" : "Advanced filters"}</li>
                  <li>✅ {language === "pt" ? "Eventos exclusivos" : "Exclusive events"}</li>
                </ul>
                <div className="mt-4">
                  <button 
                    onClick={() => createSubscription("community")}
                    className="text-primary-600 text-sm font-medium hover:text-primary-800"
                  >
                    {language === "pt" ? `Upgrade ${formatPrice(plans.community.monthly)}/mês →` : `Upgrade ${formatPrice(plans.community.monthly)}/month →`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <MatchTestimonials />

      {/* Upgrade Prompt Modal */}
      <AnimatePresence>
        {showUpgradePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradePrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                {language === "pt"
                  ? "Limite de Matches Atingido"
                  : "Match Limit Reached"}
              </h3>
              <p className="text-primary-700 mb-6">
                {language === "pt"
                  ? "Usou os seus 3 matches diários gratuitos. Faça upgrade para matches ilimitados e continue a conectar-se com mais membros da comunidade de falantes de português."
                  : "You've used your 3 free daily matches. Upgrade to unlimited matches and continue connecting with more Portuguese-speaking community members."}
              </p>

              {/* Quick Benefits */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl mb-6 text-left">
                <h4 className="font-semibold text-primary-900 mb-3">
                  {language === "pt"
                    ? "Com Premium obtém:"
                    : "With Premium you get:"}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {language === "pt"
                        ? "Matches ilimitados diários"
                        : "Unlimited daily matches"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {language === "pt"
                        ? "Mensagens ilimitadas"
                        : "Unlimited messaging"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {language === "pt"
                        ? "Filtros de compatibilidade cultural"
                        : "Cultural compatibility filters"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {language === "pt"
                        ? "Acesso a todos os eventos"
                        : "Access to all events"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowUpgradePrompt(false);
                    createSubscription("community");
                  }}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  {language === "pt"
                    ? `Upgrade por ${formatPrice(plans.community.monthly)}/mês`
                    : `Upgrade for ${formatPrice(
                        plans.community.monthly
                      )}/month`}
                </button>
                <button
                  onClick={() => setShowUpgradePrompt(false)}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                >
                  {language === "pt" ? "Talvez mais tarde" : "Maybe later"}
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                {language === "pt"
                  ? "Pode cancelar a qualquer momento • Sem compromissos de longo prazo"
                  : "Cancel anytime • No long-term commitments"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MatchesPage() {
  const { hasActiveSubscription } = useSubscription();

  // If user doesn't have subscription and hits daily limits, show premium gate
  // For now, we'll integrate this with the enhanced dashboard

  return (
    <>
      <main className="min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
          }
        >
          <EnhancedMatchDashboard
            currentUserId="demo-user"
            showEventSuggestions={true}
            showAchievements={true}
            showGroupMatching={true}
            onMatchAction={(matchId, action) => {
              // Handle match actions (like, skip, super_like)
              console.log(`Match action: ${action} on match ${matchId}`);
            }}
            onEventBooking={(eventId, matchId) => {
              // Handle event booking
              console.log(
                `Event ${eventId} booked${matchId ? ` with match ${matchId}` : ""}`
              );
            }}
          />
        </Suspense>
        
        {/* How It Works Section */}
        <HowItWorksSection />
      </main>
      
      {/* Proper Footer Component */}
      <Footer />
    </>
  );
}
