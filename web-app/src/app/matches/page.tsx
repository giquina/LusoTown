"use client";

import { Suspense, useState, useEffect } from "react";
import {
  HeartIcon,
  UserGroupIcon,
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
import { motion, AnimatePresence } from "framer-motion";
import { plans, formatPrice } from "@/config/pricing";
import PremiumMatchesGate from "@/components/PremiumMatchesGate";

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
    image: "/images/profiles/ana-sofia.jpg",
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
    image: "/images/profiles/miguel-santos.jpg",
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
    image: "/images/profiles/beatriz-oliveira.jpg",
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
    image: "/images/profiles/joao-ferreira.jpg",
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
    image: "/images/profiles/carolina-lima.jpg",
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
    image: "/images/profiles/ricardo-costa.jpg",
    compatibility: 88,
  },
];

type Profile = (typeof mockProfiles)[number];

function MatchesContent() {
  const { t, language } = useLanguage();
  const { hasActiveSubscription, createSubscription } = useSubscription();
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

  const currentProfile = profiles[currentProfileIndex];
  const remainingMatches = dailyMatches - dailyMatchesUsed;
  const isFreeTier = !hasActiveSubscription;

  // Initialize success stories count
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessStories((prev) => (prev + 1) % 234); // Animate success counter
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    if (isLiking || isSkipping) return;

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

      nextProfile();
      setIsLiking(false);
    }, 600);
  };

  const handleSkip = () => {
    if (isLiking || isSkipping) return;
    setIsSkipping(true);

    setTimeout(() => {
      nextProfile();
      setIsSkipping(false);
    }, 400);
  };

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // Reset to beginning or show "no more profiles" message
      setCurrentProfileIndex(0);
    }
  };

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
      icon: UserGroupIcon,
      title: "Complete Your Profile",
      description:
        "Share your interests, location in London, and what you're looking for in the Portuguese community",
      titlePt: "Complete o Seu Perfil",
      descriptionPt:
        "Partilhe os seus interesses, localização em Londres e o que procura na comunidade portuguesa",
    },
    {
      icon: SparklesIcon,
      title: "Smart Matching",
      description:
        "Our algorithm connects you with Portuguese speakers based on compatibility, interests, and proximity",
      titlePt: "Correspondência Inteligente",
      descriptionPt:
        "O nosso algoritmo conecta-o com falantes de português baseado em compatibilidade, interesses e proximidade",
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
    "All matches are Portuguese speakers in London & UK",
    "Cultural compatibility scoring",
    "Event-based meetups for natural connections",
    "Professional and social networking opportunities",
    "Safe and verified community members",
  ];

  const benefitsPt = [
    "Todas as correspondências são falantes de português em Londres e Reino Unido",
    "Pontuação de compatibilidade cultural",
    "Encontros baseados em eventos para conexões naturais",
    "Oportunidades de networking profissional e social",
    "Membros da comunidade seguros e verificados",
  ];

  return (
    <div className="min-h-screen pt-28 md:pt-32">
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
                {language === "pt" ? "Encontre o Seu Match" : "Find Your Match"}
              </h1>
              <p className="text-sm md:text-base text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto">
                {language === "pt"
                  ? "Conecte-se com falantes de português em Londres que partilham os seus interesses, valores e património cultural. Mais que um app de encontros - uma comunidade."
                  : "Connect with Portuguese speakers in London who share your interests, values, and cultural heritage. More than a dating app - a community."}
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/signup" className="bg-white text-primary-600 px-5 py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {language === "pt" ? "Começar Grátis" : "Start Free"}
              </a>
              <button
                onClick={() => createSubscription("community")}
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-5 py-3 rounded-xl font-semibold text-sm md:text-base hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {language === "pt"
                  ? `Premium por ${formatPrice(plans.community.monthly)}/mês`
                  : `Premium from ${formatPrice(
                      plans.community.monthly
                    )}/month`}
              </button>
            </div>

            {/* Enhanced Stats */}
  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="text-center group">
                <motion.div
      className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  750+
                </motion.div>
                <div className="text-white/80 text-sm">
                  {language === "pt"
                    ? "Falantes Português"
                    : "Portuguese Speakers"}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {language === "pt"
                    ? "Em Londres & Reino Unido"
                    : "In London & UK"}
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

      {/* Interactive Matching Section */}
  <section className="py-10 md:py-14 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3 md:mb-5">
              {language === "pt"
                ? "Descubra os Seus Matches"
                : "Discover Your Matches"}
            </h2>
  <p className="text-sm md:text-base text-primary-700 max-w-3xl mx-auto mb-5">
              {language === "pt"
                ? "Navegue por falantes de português em Londres que partilham os seus interesses e património cultural. Cada perfil é cuidadosamente verificado."
                : "Browse through Portuguese speakers in London who share your interests and cultural background. Every profile is carefully verified."}
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

          <div className="max-w-md mx-auto">
            {/* Profile Card Stack */}
            <div className="relative h-[480px] md:h-[520px] mb-6">
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
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100"
                  >
                    {/* Profile Image */}
                    <div className="relative h-56 md:h-60 bg-gradient-to-br from-primary-200 to-secondary-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-primary-400">👤</div>
                      </div>

                      {/* Compatibility Badge */}
                      <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                        {currentProfile.compatibility}% Match
                      </div>

                      {/* Origin Flag */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                        {getOriginFlag(currentProfile.origin)}{" "}
                        {currentProfile.origin}
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-1">
                            {currentProfile.name}, {currentProfile.age}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 mb-1.5">
                            <BriefcaseIcon className="w-4 h-4" />
                            <span className="text-sm">
                              {currentProfile.profession}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary-600">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="text-sm">
                              {currentProfile.location}, London
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-primary-700 text-sm mb-3 leading-relaxed">
                        {currentProfile.bio}
                      </p>

                      {/* Interests */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary-800 mb-1.5">
                          Interests:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.interests
                            .slice(0, 4)
                            .map((interest, index) => (
                              <span
                                key={index}
                                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {interest}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Portuguese Community Connection */}
                      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 p-3.5 rounded-xl border border-secondary-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-secondary-700 text-sm">
                            <SparklesIcon className="w-4 h-4" />
                            <span className="font-medium">
                              {language === "pt"
                                ? "Património Cultural Partilhado"
                                : "Shared Cultural Heritage"}
                            </span>
                          </div>
          <div className="flex items-center gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIconSolid
                                key={i}
            className="w-3 h-3 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs text-secondary-600">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {language === "pt"
                              ? "Língua Nativa"
                              : "Native Language"}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {language === "pt" ? "Tradições" : "Traditions"}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            {language === "pt" ? "Valores" : "Values"}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            {language === "pt" ? "Experiências" : "Experiences"}
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

            {/* Action Buttons */}
            <div className="flex justify-center gap-5">
              <button
                onClick={handleSkip}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <XMarkIcon className="w-8 h-8 text-gray-500" />
              </button>

              <button
                onClick={handleLike}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-16 h-16 bg-gradient-to-r from-action-500 to-action-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <HeartIconSolid className="w-8 h-8 text-white" />
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

      {/* How It Works Section */}
  <section className="py-10 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3 md:mb-5">
              {t("howItWorks") || "How It Works"}
            </h2>
  <p className="text-sm md:text-base text-primary-700 max-w-3xl mx-auto">
              {t("howItWorksDescription") ||
                "Our matching system is designed specifically for Portuguese speakers in London, focusing on cultural compatibility and shared experiences"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                    {t("currentLang") === "pt" ? step.titlePt : step.title}
                  </h3>
      <p className="text-primary-700 leading-relaxed text-sm md:text-base">
                    {t("currentLang") === "pt"
                      ? step.descriptionPt
                      : step.description}
                  </p>
                </div>
              </div>
            ))}
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
          <p className="text-sm md:text-base text-primary-800">{benefit}</p>
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
                      <a href="/signup" className="w-full inline-block text-center bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium">
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
                    "Connect with Portuguese speakers who understand your culture, language, and journey in London"}
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100">
      <div className="text-xl md:text-2xl font-bold text-primary-600">
                    750+
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
                  ? "Usou os seus 3 matches diários gratuitos. Faça upgrade para matches ilimitados e continue a conectar-se com mais membros da comunidade portuguesa."
                  : "You've used your 3 free daily matches. Upgrade to unlimited matches and continue connecting with more Portuguese community members."}
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
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      }
    >
      <MatchesContent />
    </Suspense>
  );
}
