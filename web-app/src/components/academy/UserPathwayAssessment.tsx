"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  HeartIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  GraduationCap,
  Briefcase,
  Heart,
  Video,
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Users,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UserType {
  id: string;
  name: string;
  namePortuguese: string;
  description: string;
  descriptionPortuguese: string;
  detailedDescription: string;
  detailedDescriptionPortuguese: string;
  icon: React.ComponentType<any>;
  color: string;
  services: string[];
  estimatedTime: string;
  estimatedTimePortuguese: string;
  benefits: string[];
  benefitsPortuguese: string[];
  recommendedFor: string[];
  recommendedForPortuguese: string[];
}

interface PathwayAssessmentProps {
  onPathwaySelected: (userType: UserType) => void;
  selectedPathway?: string | null;
  showReset?: boolean;
}

export default function UserPathwayAssessment({
  onPathwaySelected,
  selectedPathway,
  showReset = false,
}: PathwayAssessmentProps) {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string | null>(
    selectedPathway || null
  );
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"assessment" | "confirmation">(
    "assessment"
  );

  const isPortuguese = language === "pt";

  // Enhanced user type definitions
  const userTypes: UserType[] = [
    {
      id: "student",
      name: "Student",
      namePortuguese: "Estudante",
      description: "Perfect for Portuguese students in London universities",
      descriptionPortuguese:
        "Perfeito para estudantes portugueses nas universidades de Londres",
      detailedDescription:
        "Get comprehensive support for academic life, housing, and social connections with other Portuguese students across London's universities.",
      detailedDescriptionPortuguese:
        "Obtenha apoio abrangente para a vida académica, alojamento e conexões sociais com outros estudantes portugueses nas universidades de Londres.",
      icon: GraduationCap,
      color: "from-blue-500 to-purple-500",
      services: [
        "housing-assistance",
        "student-support",
        "dating-matching",
        "cultural-events",
      ],
      estimatedTime: "45 minutes",
      estimatedTimePortuguese: "45 minutos",
      benefits: [
        "University-specific housing guidance",
        "Academic support network",
        "Student discount connections",
        "Portuguese study groups",
      ],
      benefitsPortuguese: [
        "Orientação de alojamento específica da universidade",
        "Rede de apoio académico",
        "Conexões de desconto estudantil",
        "Grupos de estudo portugueses",
      ],
      recommendedFor: [
        "Undergraduate students",
        "Postgraduate students",
        "International exchange students",
        "PhD researchers",
      ],
      recommendedForPortuguese: [
        "Estudantes de licenciatura",
        "Estudantes de pós-graduação",
        "Estudantes de intercâmbio internacional",
        "Investigadores de doutoramento",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      namePortuguese: "Profissional",
      description: "Ideal for Portuguese professionals working in London",
      descriptionPortuguese:
        "Ideal para profissionais portugueses que trabalham em Londres",
      detailedDescription:
        "Master business networking, access premium transport services, and connect with other Portuguese professionals across various industries.",
      detailedDescriptionPortuguese:
        "Domine o networking empresarial, aceda a serviços de transporte premium e conecte-se com outros profissionais portugueses em várias indústrias.",
      icon: Briefcase,
      color: "from-green-500 to-blue-500",
      services: [
        "business-networking",
        "transport-chauffeur",
        "dating-matching",
        "cultural-events",
      ],
      estimatedTime: "60 minutes",
      estimatedTimePortuguese: "60 minutos",
      benefits: [
        "Executive networking events",
        "Premium transport access",
        "Industry-specific connections",
        "Professional development opportunities",
      ],
      benefitsPortuguese: [
        "Eventos de networking executivo",
        "Acesso a transporte premium",
        "Conexões específicas da indústria",
        "Oportunidades de desenvolvimento profissional",
      ],
      recommendedFor: [
        "Business executives",
        "Tech professionals",
        "Financial services workers",
        "Healthcare professionals",
      ],
      recommendedForPortuguese: [
        "Executivos de negócios",
        "Profissionais de tecnologia",
        "Trabalhadores de serviços financeiros",
        "Profissionais de saúde",
      ],
    },
    {
      id: "creator",
      name: "Streamer & Earner",
      namePortuguese: "Streamer e Ganhador",
      description: "For Portuguese streamers and income earners",
      descriptionPortuguese:
        "Para streamers portugueses e pessoas que ganham dinheiro",
      detailedDescription:
        "Learn streaming, community building, monetization strategies, and how to grow your Portuguese audience in London.",
      detailedDescriptionPortuguese:
        "Aprenda streaming, construção de comunidade, estratégias de monetização e como aumentar a sua audiência portuguesa em Londres.",
      icon: Video,
      color: "from-purple-500 to-pink-500",
      services: [
        "live-streaming",
        "community-forums",
        "cultural-events",
        "business-networking",
      ],
      estimatedTime: "75 minutes",
      estimatedTimePortuguese: "75 minutos",
      benefits: [
        "Streaming platform setup",
        "Content monetization strategies",
        "Community engagement tools",
        "Cultural content opportunities",
      ],
      benefitsPortuguese: [
        "Configuração da plataforma de streaming",
        "Estratégias de monetização de conteúdo",
        "Ferramentas de envolvimento da comunidade",
        "Oportunidades de conteúdo cultural",
      ],
      recommendedFor: [
        "YouTube creators",
        "Social media influencers",
        "Podcast hosts",
        "Cultural content producers",
      ],
      recommendedForPortuguese: [
        "Criadores do YouTube",
        "Influenciadores de redes sociais",
        "Apresentadores de podcast",
        "Produtores de conteúdo cultural",
      ],
    },
    {
      id: "social",
      name: "Social Explorer",
      namePortuguese: "Explorador Social",
      description: "Perfect for connecting with Portuguese community socially",
      descriptionPortuguese:
        "Perfeito para se conectar socialmente com a comunidade portuguesa",
      detailedDescription:
        "Discover dating opportunities, cultural events, community connections, and build meaningful relationships within London's Portuguese community.",
      detailedDescriptionPortuguese:
        "Descubra oportunidades de encontros, eventos culturais, conexões comunitárias e construa relacionamentos significativos na comunidade portuguesa de Londres.",
      icon: Heart,
      color: "from-pink-500 to-red-500",
      services: [
        "dating-matching",
        "cultural-events",
        "community-forums",
        "housing-assistance",
      ],
      estimatedTime: "30 minutes",
      estimatedTimePortuguese: "30 minutos",
      benefits: [
        "Portuguese dating connections",
        "Cultural event access",
        "Community social groups",
        "Friendship networks",
      ],
      benefitsPortuguese: [
        "Conexões de encontros portugueses",
        "Acesso a eventos culturais",
        "Grupos sociais comunitários",
        "Redes de amizade",
      ],
      recommendedFor: [
        "Singles looking for relationships",
        "New arrivals to London",
        "Cultural enthusiasts",
        "Community builders",
      ],
      recommendedForPortuguese: [
        "Solteiros procurando relacionamentos",
        "Recém-chegados a Londres",
        "Entusiastas culturais",
        "Construtores de comunidade",
      ],
    },
    {
      id: "business",
      name: "Business Owner",
      namePortuguese: "Empresário",
      description: "For Portuguese entrepreneurs and business owners",
      descriptionPortuguese:
        "Para empreendedores portugueses e proprietários de negócios",
      detailedDescription:
        "Optimize your business networking, access premium services, build community partnerships, and grow your Portuguese customer base.",
      detailedDescriptionPortuguese:
        "Otimize o seu networking empresarial, aceda a serviços premium, construa parcerias comunitárias e cresça a sua base de clientes portugueses.",
      icon: Target,
      color: "from-orange-500 to-yellow-500",
      services: [
        "business-networking",
        "transport-chauffeur",
        "live-streaming",
        "community-forums",
      ],
      estimatedTime: "90 minutes",
      estimatedTimePortuguese: "90 minutos",
      benefits: [
        "B2B networking opportunities",
        "Portuguese customer insights",
        "Community partnership access",
        "Business promotion channels",
      ],
      benefitsPortuguese: [
        "Oportunidades de networking B2B",
        "Insights de clientes portugueses",
        "Acesso a parcerias comunitárias",
        "Canais de promoção empresarial",
      ],
      recommendedFor: [
        "Restaurant owners",
        "Service providers",
        "Tech entrepreneurs",
        "Retail business owners",
      ],
      recommendedForPortuguese: [
        "Proprietários de restaurantes",
        "Prestadores de serviços",
        "Empreendedores de tecnologia",
        "Proprietários de negócios de retalho",
      ],
    },
  ];

  const handleTypeSelection = (userType: UserType) => {
    setSelectedType(userType.id);
    setCurrentStep("confirmation");
  };

  const handleConfirmSelection = () => {
    const selectedUserType = userTypes.find((type) => type.id === selectedType);
    if (selectedUserType) {
      onPathwaySelected(selectedUserType);
    }
  };

  const handleReset = () => {
    setSelectedType(null);
    setCurrentStep("assessment");
    setShowDetails(null);
  };

  const selectedUserType = userTypes.find((type) => type.id === selectedType);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {isPortuguese ? "Qual é o Seu Perfil?" : "What's Your Profile?"}
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {isPortuguese
            ? "Escolha o seu perfil para receber um plano de aprendizado personalizado com os serviços mais relevantes para si"
            : "Choose your profile to get a personalized learning plan with the most relevant services for you"}
        </p>
        {showReset && selectedPathway && (
          <button
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {isPortuguese ? "Alterar Perfil" : "Change Profile"}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Assessment */}
        {currentStep === "assessment" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {userTypes.map((userType, index) => (
              <motion.div
                key={userType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer relative overflow-hidden"
                onClick={() => handleTypeSelection(userType)}
                onMouseEnter={() => setShowDetails(userType.id)}
                onMouseLeave={() => setShowDetails(null)}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${userType.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${userType.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <userType.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isPortuguese ? userType.namePortuguese : userType.name}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {isPortuguese ? userType.description : userType.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-primary-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {isPortuguese
                          ? userType.estimatedTimePortuguese
                          : userType.estimatedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary-600">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {userType.services.length}{" "}
                        {isPortuguese ? "serviços" : "services"}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {isPortuguese
                        ? "Clique para selecionar"
                        : "Click to select"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>

                {/* Hover details */}
                <AnimatePresence>
                  {showDetails === userType.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-center"
                    >
                      <h4 className="font-bold text-gray-900 mb-2">
                        {isPortuguese
                          ? "Recomendado para:"
                          : "Recommended for:"}
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {(isPortuguese
                          ? userType.recommendedForPortuguese
                          : userType.recommendedFor
                        )
                          .slice(0, 3)
                          .map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: Confirmation */}
        {currentStep === "confirmation" && selectedUserType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {/* Selected type header */}
              <div className="text-center mb-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${selectedUserType.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}
                >
                  <selectedUserType.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isPortuguese
                    ? selectedUserType.namePortuguese
                    : selectedUserType.name}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {isPortuguese
                    ? selectedUserType.detailedDescriptionPortuguese
                    : selectedUserType.detailedDescription}
                </p>
              </div>

              {/* Benefits and services */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {isPortuguese ? "Principais Benefícios" : "Key Benefits"}
                  </h4>
                  <ul className="space-y-3">
                    {(isPortuguese
                      ? selectedUserType.benefitsPortuguese
                      : selectedUserType.benefits
                    ).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-500" />
                    {isPortuguese ? "Ideal Para" : "Perfect For"}
                  </h4>
                  <ul className="space-y-3">
                    {(isPortuguese
                      ? selectedUserType.recommendedForPortuguese
                      : selectedUserType.recommendedFor
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Learning time estimate */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8 border border-primary-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {isPortuguese
                        ? "Tempo Estimado de Aprendizado"
                        : "Estimated Learning Time"}
                    </h4>
                    <p className="text-gray-600">
                      {isPortuguese
                        ? selectedUserType.estimatedTimePortuguese
                        : selectedUserType.estimatedTime}{" "}
                      {isPortuguese
                        ? "para completar todos os módulos relevantes"
                        : "to complete all relevant modules"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleConfirmSelection}
                  className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {isPortuguese ? "Começar Aprendizado" : "Start Learning"}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentStep("assessment")}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  {isPortuguese ? "Voltar" : "Go Back"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
