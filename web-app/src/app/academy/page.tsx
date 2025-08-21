"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BookOpenIcon,
  UserGroupIcon,
  TrophyIcon,
  BriefcaseIcon,
  HeartIcon,
  VideoCameraIcon,
  MapPinIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
  GraduationCap,
  BrainCircuit,
  Target,
  Users,
  Briefcase,
  Heart,
  Video,
  Calendar,
  MapPin,
  Home,
  MessageCircle,
  Trophy,
  BookOpen,
  BarChart3,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// Types for learning system
interface UserType {
  id: string;
  name: string;
  namePortuguese: string;
  description: string;
  descriptionPortuguese: string;
  icon: React.ComponentType<any>;
  color: string;
  services: string[];
  estimatedTime: string;
}

interface Service {
  id: string;
  name: string;
  namePortuguese: string;
  description: string;
  descriptionPortuguese: string;
  icon: React.ComponentType<any>;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  category: string;
  modules: number;
  featured: boolean;
}

export default function AcademyHomePage() {
  const { language, t } = useLanguage();
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [completedServices, setCompletedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isPortuguese = language === "pt";

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lusotown-academy-progress");
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedServices(progress.completed || []);
      setSelectedUserType(progress.userType || null);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (userType: string, completed: string[]) => {
    localStorage.setItem(
      "lusotown-academy-progress",
      JSON.stringify({
        userType,
        completed,
        lastAccess: Date.now(),
      })
    );
  };

  // User type definitions
  const userTypes: UserType[] = [
    {
      id: "student",
      name: "Student",
      namePortuguese: "Estudante",
      description:
        "Learn about housing, academic support, and connecting with other Portuguese students",
      descriptionPortuguese:
        "Aprenda sobre alojamento, apoio académico e conectar-se com outros estudantes portugueses",
      icon: GraduationCap,
      color: "from-blue-500 to-accent-500",
      services: [
        "housing-assistance",
        "student-support",
        "dating-matching",
        "cultural-events",
      ],
      estimatedTime: "45 min",
    },
    {
      id: "professional",
      name: "Professional",
      namePortuguese: "Profissional",
      description:
        "Master business networking, premium transport, and professional services",
      descriptionPortuguese:
        "Domine networking empresarial, transporte premium e serviços profissionais",
      icon: Briefcase,
      color: "from-green-500 to-blue-500",
      services: [
        "business-networking",
        "transport-chauffeur",
        "dating-matching",
        "cultural-events",
      ],
      estimatedTime: "60 min",
    },
    {
      id: "creator",
      name: "Content Creator",
      namePortuguese: "Criador de Conteúdo",
      description:
        "Learn streaming, community building, and monetization strategies",
      descriptionPortuguese:
        "Aprenda streaming, construção de comunidade e estratégias de monetização",
      icon: Video,
      color: "from-accent-500 to-pink-500",
      services: [
        "live-streaming",
        "community-forums",
        "cultural-events",
        "business-networking",
      ],
      estimatedTime: "75 min",
    },
    {
      id: "social",
      name: "Social Explorer",
      namePortuguese: "Explorador Social",
      description:
        "Discover dating, events, community connections, and cultural activities",
      descriptionPortuguese:
        "Descubra encontros, eventos, conexões comunitárias e atividades culturais",
      icon: Heart,
      color: "from-pink-500 to-red-500",
      services: [
        "dating-matching",
        "cultural-events",
        "community-forums",
        "housing-assistance",
      ],
      estimatedTime: "30 min",
    },
    {
      id: "business",
      name: "Business Owner",
      namePortuguese: "Empresário",
      description:
        "Optimize networking, premium services, and community partnerships",
      descriptionPortuguese:
        "Otimize networking, serviços premium e parcerias comunitárias",
      icon: Target,
      color: "from-orange-500 to-yellow-500",
      services: [
        "business-networking",
        "transport-chauffeur",
        "live-streaming",
        "community-forums",
      ],
      estimatedTime: "90 min",
    },
  ];

  // Service definitions
  const services: Service[] = [
    {
      id: "dating-matching",
      name: "Dating & Matching",
      namePortuguese: "Encontros e Compatibilidade",
      description:
        "Connect with Portuguese speakers for meaningful relationships",
      descriptionPortuguese:
        "Conecte-se com falantes de português para relacionamentos significativos",
      icon: Heart,
      difficulty: "Beginner",
      estimatedTime: "20 min",
      category: "Social",
      modules: 4,
      featured: true,
    },
    {
      id: "live-streaming",
      name: "Live Streaming",
      namePortuguese: "Transmissão Ao Vivo",
      description: "Create and watch Portuguese cultural content",
      descriptionPortuguese: "Crie e assista conteúdo cultural português",
      icon: Video,
      difficulty: "Intermediate",
      estimatedTime: "35 min",
      category: "Content",
      modules: 6,
      featured: true,
    },
    {
      id: "transport-chauffeur",
      name: "Transport & Chauffeur",
      namePortuguese: "Transporte e Motorista",
      description: "Premium transportation with Portuguese-speaking drivers",
      descriptionPortuguese:
        "Transporte premium com motoristas que falam português",
      icon: MapPin,
      difficulty: "Beginner",
      estimatedTime: "15 min",
      category: "Services",
      modules: 3,
      featured: true,
    },
    {
      id: "business-networking",
      name: "Business Networking",
      namePortuguese: "Networking Empresarial",
      description: "Professional connections and business opportunities",
      descriptionPortuguese:
        "Conexões profissionais e oportunidades de negócio",
      icon: Users,
      difficulty: "Intermediate",
      estimatedTime: "25 min",
      category: "Business",
      modules: 5,
      featured: false,
    },
    {
      id: "cultural-events",
      name: "Cultural Events",
      namePortuguese: "Eventos Culturais",
      description: "Portuguese community events and celebrations",
      descriptionPortuguese: "Eventos e celebrações da comunidade portuguesa",
      icon: Calendar,
      difficulty: "Beginner",
      estimatedTime: "10 min",
      category: "Community",
      modules: 2,
      featured: false,
    },
    {
      id: "housing-assistance",
      name: "Housing Assistance",
      namePortuguese: "Assistência Habitacional",
      description: "Find accommodation and housing support",
      descriptionPortuguese: "Encontre alojamento e apoio habitacional",
      icon: Home,
      difficulty: "Beginner",
      estimatedTime: "18 min",
      category: "Support",
      modules: 4,
      featured: false,
    },
    {
      id: "student-support",
      name: "Student Support",
      namePortuguese: "Apoio Estudantil",
      description: "Academic guidance and career support",
      descriptionPortuguese: "Orientação académica e apoio profissional",
      icon: GraduationCap,
      difficulty: "Beginner",
      estimatedTime: "22 min",
      category: "Education",
      modules: 4,
      featured: false,
    },
    {
      id: "community-forums",
      name: "Community Forums",
      namePortuguese: "Fóruns Comunitários",
      description: "Discussion and chat features",
      descriptionPortuguese: "Funcionalidades de discussão e chat",
      icon: MessageCircle,
      difficulty: "Beginner",
      estimatedTime: "12 min",
      category: "Community",
      modules: 3,
      featured: false,
    },
  ];

  const filteredServices = services.filter((service) =>
    (isPortuguese ? service.namePortuguese : service.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const getUserTypeServices = (userTypeId: string) => {
    const userType = userTypes.find((ut) => ut.id === userTypeId);
    if (!userType) return [];
    return services.filter((service) => userType.services.includes(service.id));
  };

  const getCompletionPercentage = () => {
    return Math.round((completedServices.length / services.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-secondary-900/5"></div>

        <div className="relative container-width">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <GraduationCap className="w-4 h-4 mr-2 text-primary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? "Academia LusoTown" : "LusoTown Academy"}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {isPortuguese
                ? "Aprenda a Usar Todos os Nossos Serviços"
                : "Learn to Use All Our Services"}
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {isPortuguese ? "Passo a Passo" : "Step by Step"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese
                ? "Guias interativos para dominar cada serviço da plataforma. Crie confiança antes de usar nossos serviços."
                : "Interactive guides to master every platform service. Build confidence before using our services."}
            </motion.p>

            {/* Progress Overview */}
            {completedServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8 border border-white/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-secondary-700">
                    {isPortuguese ? "Seu Progresso" : "Your Progress"}
                  </span>
                  <span className="text-sm font-bold text-primary-600">
                    {getCompletionPercentage()}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
                <p className="text-xs text-secondary-600 mt-2">
                  {completedServices.length} {isPortuguese ? "de" : "of"}{" "}
                  {services.length}{" "}
                  {isPortuguese ? "serviços concluídos" : "services completed"}
                </p>
              </motion.div>
            )}

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    isPortuguese ? "Procurar serviços..." : "Search services..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-2xl border border-secondary-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <BookOpenIcon className="absolute left-4 top-1/2 transform -transecondary-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Pathway Assessment */}
      {!selectedUserType && (
        <section className="py-16">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                {isPortuguese ? "Qual é o Seu Perfil?" : "What's Your Profile?"}
              </h2>
              <p className="text-secondary-600 max-w-3xl mx-auto">
                {isPortuguese
                  ? "Escolha o seu perfil para receber um plano de aprendizado personalizado"
                  : "Choose your profile to get a personalized learning plan"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userTypes.map((userType, index) => (
                <motion.div
                  key={userType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedUserType(userType.id);
                    saveProgress(userType.id, completedServices);
                  }}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-transecondary-y-2 border border-secondary-100 cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${userType.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <userType.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? userType.namePortuguese : userType.name}
                  </h3>

                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {isPortuguese
                      ? userType.descriptionPortuguese
                      : userType.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-600 font-medium">
                      {userType.estimatedTime}{" "}
                      {isPortuguese ? "de aprendizado" : "learning time"}
                    </span>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:transecondary-x-1 transition-all duration-200" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Categories */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              {selectedUserType
                ? isPortuguese
                  ? "Seu Plano de Aprendizado"
                  : "Your Learning Plan"
                : isPortuguese
                ? "Todos os Serviços"
                : "All Services"}
            </h2>
            <p className="text-secondary-600 max-w-3xl mx-auto">
              {selectedUserType
                ? isPortuguese
                  ? "Serviços recomendados para o seu perfil"
                  : "Recommended services for your profile"
                : isPortuguese
                ? "Explore todos os serviços disponíveis na plataforma"
                : "Explore all available platform services"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedUserType
              ? getUserTypeServices(selectedUserType)
              : filteredServices
            ).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary-100"
              >
                {service.featured && (
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2">
                    <span className="text-sm font-bold">
                      {isPortuguese ? "Popular" : "Featured"}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-secondary-600" />
                    </div>
                    {completedServices.includes(service.id) && (
                      <CheckCircleIcon className="w-6 h-6 text-action-500" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isPortuguese ? service.namePortuguese : service.name}
                  </h3>

                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                    {isPortuguese
                      ? service.descriptionPortuguese
                      : service.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        service.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : service.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.difficulty}
                    </span>
                    <span className="text-gray-500">
                      <ClockIcon className="w-3 h-3 inline mr-1" />
                      {service.estimatedTime}
                    </span>
                    <span className="text-gray-500">
                      {service.modules} {isPortuguese ? "módulos" : "modules"}
                    </span>
                  </div>

                  <a
                    href={`/academy/${service.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {isPortuguese ? "Começar Aprendizado" : "Start Learning"}
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white/50">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {services.length}
              </div>
              <div className="text-sm text-secondary-600">
                {isPortuguese ? "Guias de Serviços" : "Service Guides"}
              </div>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {services.reduce((acc, service) => acc + service.modules, 0)}
              </div>
              <div className="text-sm text-secondary-600">
                {isPortuguese ? "Módulos Interativos" : "Interactive Modules"}
              </div>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {getCompletionPercentage()}%
              </div>
              <div className="text-sm text-secondary-600">
                {isPortuguese ? "Concluído" : "Completed"}
              </div>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                2,150+
              </div>
              <div className="text-sm text-secondary-600">
                {isPortuguese ? "Estudantes Ativos" : "Active Learners"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
