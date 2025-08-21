"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Calendar,
  MessageCircle,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  Globe2,
  Coffee,
  Music,
  UtensilsCrossed,
  Camera,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { communityStats } from "@/config/community";
import { ROUTES } from "@/config/routes";

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Create Your Portuguese Profile",
      subtitle: "Crie o Seu Perfil Português",
      description: `Join ${communityStats.members} Portuguese speakers in London. Share your heritage: Portugal, Brazil, or Lusophone countries. Add your interests from fado to football, pastéis de nata to professional networking.`,
      icon: UserPlus,
      color: "from-red-500 via-yellow-500 to-green-500",
      bgColor: "from-red-50 via-yellow-50 to-green-50",
      accentColor: "red-600",
      examples:
        "🇵🇹 Heritage verification • 💼 Professional interests • ⚽ Cultural passions • 📍 London area",
      emoji: "🏠",
    },
    {
      number: 2,
      title: "Discover Your Matches",
      subtitle: "Descubra os Seus Matches",
      description:
        "AI-powered cultural compatibility matching. Find Portuguese speakers who share your saudade, love the same football team, or understand your professional journey in London.",
      icon: Heart,
      color: "from-red-600 via-green-500 to-red-500",
      bgColor: "from-red-50 via-green-50 to-red-50",
      accentColor: "green-600",
      examples:
        "💕 Cultural compatibility • ⚽ Team loyalties • 🎭 Music tastes • 💼 Career paths",
      emoji: "❤️",
    },
    {
      number: 3,
      title: "Book Authentic Portuguese Events",
      subtitle: "Reserve Eventos Portugueses Autênticos",
      description:
        "From intimate fado nights in Stockwell to Portuguese business networking in the City. Real venues, real culture, real connections.",
      icon: Calendar,
      color: "from-green-500 via-red-500 to-yellow-500",
      bgColor: "from-green-50 via-red-50 to-yellow-50",
      accentColor: "green-500",
      examples:
        "🎭 Fado nights • ☕ Portuguese café meetups • 🍷 Wine & networking • 🥐 Cooking classes",
      emoji: "🎉",
    },
    {
      number: 4,
      title: "Stream & Create Content",
      subtitle: "Transmita e Crie Conteúdo",
      description:
        "Join LusoTown TV - our Portuguese streaming platform. Watch live cultural content, host your own shows, or share your London-Portuguese journey with the community.",
      icon: Camera,
      color: "from-yellow-500 via-red-500 to-green-500",
      bgColor: "from-yellow-50 via-red-50 to-green-50",
      accentColor: "yellow-600",
      examples:
        "📺 Live streaming • 🎙️ Portuguese podcasts • 💰 Creator monetization • 🌟 Cultural shows",
      emoji: "📺",
    },
    {
      number: 5,
      title: "Access Premium Services",
      subtitle: "Aceda a Serviços Premium",
      description:
        "Luxury transport with Portuguese-speaking drivers, priority event booking, exclusive networking events, and premium matches.",
      icon: Sparkles,
      color: "from-red-500 via-green-500 to-yellow-500",
      bgColor: "from-red-50 via-green-50 to-yellow-50",
      accentColor: "red-500",
      examples:
        "🚗 Portuguese chauffeurs • 🎫 VIP event access • ⭐ Premium matching • 🍾 Exclusive gatherings",
      emoji: "⭐",
    },
    {
      number: 6,
      title: "Build Your Portuguese Legacy",
      subtitle: "Construa o Seu Legado Português",
      description:
        "Share family recipes, connect with university partnerships, mentor other Portuguese speakers, and help preserve our culture for future generations in London.",
      icon: BookOpen,
      color: "from-green-500 via-yellow-500 to-red-500",
      bgColor: "from-green-50 via-yellow-50 to-red-50",
      accentColor: "green-500",
      examples:
        "👨‍🍳 Family recipes • 🎓 Student mentoring • 📚 Cultural stories • 🏛️ Heritage preservation",
      emoji: "🇵🇹",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-accent-100 to-primary-100 rounded-full opacity-30 animate-pulse" />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-secondary-100 to-accent-100 rounded-full opacity-25 animate-bounce"
          style={{ animationDuration: "4s" }}
        />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Enhanced Header Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            mounted ? "opacity-100 transecondary-y-0" : "opacity-0 transecondary-y-5"
          }`}
        >
          {/* Enhanced Badge with Portuguese flag colors */}
          <div
            className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 border border-secondary-200/50 rounded-2xl px-8 py-4 shadow-xl transition-all duration-700 delay-100 ${
              mounted
                ? "opacity-100 scale-100 transecondary-y-0"
                : "opacity-0 scale-95 -transecondary-y-5"
            } mb-8`}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse"></div>
              <Sparkles className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Como Funciona • How It Works
              </span>
            </div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-8">
            Fill Your Social
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
              Calendar
            </span>
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-secondary-700 leading-relaxed max-w-4xl mx-auto font-medium mb-6">
            Connect, experience, and preserve Portuguese culture in London
            through six meaningful steps
          </p>

          <p className="text-lg text-secondary-600 italic max-w-3xl mx-auto leading-relaxed">
            "A vida é melhor quando vivida em comunidade" - Life is better when
            lived together
          </p>

          {/* Cultural Icons Preview */}
          <div className="flex justify-center items-center gap-6 mt-12 flex-wrap">
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Coffee className="h-5 w-5 text-accent-600" />
              <span className="text-sm font-medium text-secondary-700">
                Café Culture
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Music className="h-5 w-5 text-action-600" />
              <span className="text-sm font-medium text-secondary-700">
                Fado Nights
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <UtensilsCrossed className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-medium text-secondary-700">
                Portuguese Cuisine
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Camera className="h-5 w-5 text-coral-600" />
              <span className="text-sm font-medium text-secondary-700">
                Cultural Tours
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Cards for All 6 Steps with Portuguese Cultural Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const pattern = {
              emoji1: step.emoji,
              emoji2: "🇵🇹",
              emoji3: step.emoji,
            };

            const borderColor =
              step.accentColor === "red-600"
                ? "border-red-200"
                : step.accentColor === "green-600"
                ? "border-green-200"
                : step.accentColor === "green-500"
                ? "border-green-200"
                : step.accentColor === "yellow-600"
                ? "border-yellow-200"
                : step.accentColor === "red-500"
                ? "border-red-200"
                : "border-green-200";

            const textColor =
              step.accentColor === "red-600"
                ? "text-coral-600/20 group-hover:text-coral-600/30"
                : step.accentColor === "green-600"
                ? "text-action-600/20 group-hover:text-action-600/30"
                : step.accentColor === "green-500"
                ? "text-action-500/20 group-hover:text-action-500/30"
                : step.accentColor === "yellow-600"
                ? "text-yellow-600/20 group-hover:text-yellow-600/30"
                : step.accentColor === "red-500"
                ? "text-coral-500/20 group-hover:text-coral-500/30"
                : "text-action-500/20 group-hover:text-action-500/30";

            const buttonColor =
              step.accentColor === "red-600"
                ? "bg-coral-600 hover:bg-red-700"
                : step.accentColor === "green-600"
                ? "bg-action-600 hover:bg-green-700"
                : step.accentColor === "green-500"
                ? "bg-action-500 hover:bg-green-700"
                : step.accentColor === "yellow-600"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : step.accentColor === "red-500"
                ? "bg-coral-500 hover:bg-red-700"
                : "bg-action-500 hover:bg-green-700";

            return (
              <div
                key={step.number}
                className="group relative transition-all duration-500 hover:scale-105"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.bgColor} border-2 ${borderColor} shadow-xl group-hover:shadow-2xl transition-all duration-500 h-[420px]`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 text-6xl opacity-30">
                      {pattern.emoji1}
                    </div>
                    <div className="absolute bottom-4 left-4 text-4xl opacity-40">
                      {pattern.emoji2}
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -transecondary-x-1/2 -transecondary-y-1/2 text-8xl opacity-10">
                      {pattern.emoji3}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`text-3xl sm:text-4xl font-black ${textColor} transition-colors duration-300`}
                      >
                        {step.number.toString().padStart(2, "0")}
                      </div>
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500`}
                      >
                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-500 italic mb-2">
                        {step.subtitle}
                      </p>

                      <p className="text-sm text-secondary-600 leading-relaxed break-words">
                        {step.description}
                      </p>

                      <div className="text-xs text-gray-500 italic">
                        {step.examples}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <button
                        className={`group/btn inline-flex items-center gap-2 ${buttonColor} text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:transecondary-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Section with Portuguese Cultural Context */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 transecondary-y-0" : "opacity-0 transecondary-y-5"
          }`}
        >
          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-secondary-800 mb-2">
              {communityStats.members}
            </div>
            <div className="text-sm font-bold text-secondary-600 tracking-wide mb-2">
              PORTUGUESE SPEAKERS
            </div>
            <div className="text-xs text-gray-500 italic">
              From Portugal, Brazil, Angola & more in London
            </div>
          </div>

          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-coral-500 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-secondary-800 mb-2">40+</div>
            <div className="text-sm font-bold text-secondary-600 tracking-wide mb-2">
              MONTHLY MEETUPS
            </div>
            <div className="text-xs text-gray-500 italic">
              At real Portuguese venues in London
            </div>
          </div>

          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-secondary-800 mb-2">75+</div>
            <div className="text-sm font-bold text-secondary-600 tracking-wide mb-2">
              PORTUGUESE VENUES
            </div>
            <div className="text-xs text-gray-500 italic">
              Stockwell, Vauxhall, Elephant & Castle
            </div>
          </div>

          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-premium-500 to-premium-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Globe2 className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-secondary-800 mb-2">15+</div>
            <div className="text-sm font-bold text-secondary-600 tracking-wide mb-2">
              UK CITIES
            </div>
            <div className="text-xs text-gray-500 italic">
              London boroughs with Portuguese communities
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section with Portuguese Cultural Messaging */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 transecondary-y-0" : "opacity-0 transecondary-y-5"
          }`}
        >
          <div className="bg-gradient-to-r from-white/70 via-secondary-50/50 to-accent-50/50 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Ready to
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Join Our Community?
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-secondary-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Book experiences with{" "}
              <strong className="text-secondary-600">
                {communityStats.members} Portuguese speakers
              </strong>{" "}
              in London.
              <strong className="text-secondary-800">
                Real experiences, real venues, active social life.
              </strong>
            </p>

            {/* Portuguese cultural quote */}
            <div className="bg-white/50 rounded-2xl p-6 mb-10 max-w-2xl mx-auto border border-secondary-100">
              <p className="text-secondary-700 italic text-lg mb-2">
                "Viver é conviver - há sempre algo para fazer juntos"
              </p>
              <p className="text-secondary-600 text-sm">
                "To live is to live together - there's always something to do
                together"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ROUTES.events}
                className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-transecondary-y-1 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Browse Events
                  <ArrowRight className="h-5 w-5 group-hover:transecondary-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a
                href={ROUTES.signup}
                className="text-lg font-bold px-8 py-4 bg-white/80 backdrop-blur-lg text-secondary-800 border-2 border-secondary-200 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-transecondary-y-1 whitespace-nowrap"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
