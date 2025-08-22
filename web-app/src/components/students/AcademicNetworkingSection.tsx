"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  AcademicCapIcon,
  UsersIcon,
  BookOpenIcon,
  PresentationChartLineIcon,
  ChatBubbleLeftRightIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  TrophyIcon,
  LightBulbIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  StarIcon,
  MapPinIcon,
  CalendarDaysIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

interface AcademicConnection {
  id: string;
  name: string;
  role:
    | "student"
    | "professor"
    | "researcher"
    | "phd_candidate"
    | "postdoc"
    | "mentor";
  university: string;
  subject: string;
  specialization: string[];
  yearOfStudy?: string;
  researchInterests: string[];
  availableFor: (
    | "study_groups"
    | "research_collaboration"
    | "mentorship"
    | "language_exchange"
    | "career_advice"
  )[];
  location: string;
  rating: number;
  connections: number;
  isOnline: boolean;
  languages: string[];
  publications?: number;
  avatar?: string;
}

interface StudyGroup {
  id: string;
  name: string;
  namePortuguese: string;
  subject: string;
  university: string;
  type:
    | "exam_prep"
    | "assignment_help"
    | "research_group"
    | "language_practice"
    | "thesis_support";
  members: number;
  maxMembers: number;
  level: "undergraduate" | "postgraduate" | "mixed";
  meetingFrequency: string;
  nextMeeting: string;
  location: string;
  description: string;
  descriptionPortuguese: string;
  coordinator: string;
  requirements: string[];
  isActive: boolean;
  success_rate: number;
}

interface ResearchProject {
  id: string;
  title: string;
  titlePortuguese: string;
  university: string;
  department: string;
  leadResearcher: string;
  collaborators: number;
  maxCollaborators: number;
  type:
    | "undergraduate_research"
    | "masters_thesis"
    | "phd_research"
    | "group_project";
  status: "recruiting" | "active" | "completed";
  duration: string;
  requirements: string[];
  skills: string[];
  description: string;
  descriptionPortuguese: string;
  funding: boolean;
  publications: boolean;
  deadline: string;
}

const ACADEMIC_CONNECTIONS: AcademicConnection[] = [
  {
    id: "ana-silva-ucl",
    name: "Ana Silva",
    role: "phd_candidate",
    university: "University College London",
    subject: "Portuguese Literature",
    specialization: [
      "Contemporary Portuguese Poetry",
      "Digital Humanities",
      "Cultural Studies",
    ],
    researchInterests: [
      "Fernando Pessoa",
      "Modern Portuguese Poetry",
      "Portuguese Identity in Literature",
    ],
    availableFor: ["mentorship", "research_collaboration", "career_advice"],
    location: "London",
    rating: 4.9,
    connections: 87,
    isOnline: true,
    languages: ["Portuguese", "English", "Spanish"],
    publications: 12,
    avatar: "/images/connections/ana-silva.jpg",
  },
  {
    id: "miguel-costa-imperial",
    name: "Miguel Costa",
    role: "student",
    university: "Imperial College London",
    subject: "Computer Science",
    specialization: ["Machine Learning", "Intelligent Systems", "Software Engineering"],
    yearOfStudy: "3rd Year",
    researchInterests: [
      "Natural Language Processing",
      "Portuguese Language Models",
      "Computational Linguistics",
    ],
    availableFor: [
      "study_groups",
      "research_collaboration",
      "language_exchange",
    ],
    location: "London",
    rating: 4.7,
    connections: 42,
    isOnline: false,
    languages: ["Portuguese", "English"],
    avatar: "/images/connections/miguel-costa.jpg",
  },
  {
    id: "prof-joao-fernandes",
    name: "Prof. João Fernandes",
    role: "professor",
    university: "King's College London",
    subject: "Portuguese Studies",
    specialization: [
      "Portuguese History",
      "Colonial Studies",
      "Atlantic World",
    ],
    researchInterests: [
      "Portuguese Empire",
      "Brazil-Portugal Relations",
      "Portuguese Colonial History",
    ],
    availableFor: ["mentorship", "career_advice", "research_collaboration"],
    location: "London",
    rating: 4.8,
    connections: 156,
    isOnline: true,
    languages: ["Portuguese", "English", "French"],
    publications: 45,
    avatar: "/images/connections/prof-joao.jpg",
  },
  {
    id: "maria-santos-oxford",
    name: "Maria Santos",
    role: "student",
    university: "University of Oxford",
    subject: "Modern Languages",
    specialization: [
      "Portuguese Language",
      "Translation Studies",
      "Comparative Literature",
    ],
    yearOfStudy: "2nd Year",
    researchInterests: [
      "Portuguese Translation",
      "Literary Translation",
      "Cross-Cultural Communication",
    ],
    availableFor: ["study_groups", "language_exchange", "mentorship"],
    location: "Oxford",
    rating: 4.6,
    connections: 34,
    isOnline: true,
    languages: ["Portuguese", "English", "Italian"],
    avatar: "/images/connections/maria-santos.jpg",
  },
  {
    id: "dr-carlos-mendes",
    name: "Dr. Carlos Mendes",
    role: "postdoc",
    university: "University of Cambridge",
    subject: "Economics",
    specialization: [
      "Development Economics",
      "Portuguese Economy",
      "European Integration",
    ],
    researchInterests: [
      "Portugal EU Integration",
      "Economic Development",
      "Portuguese Business",
    ],
    availableFor: ["mentorship", "research_collaboration", "career_advice"],
    location: "Cambridge",
    rating: 4.9,
    connections: 98,
    isOnline: false,
    languages: ["Portuguese", "English"],
    publications: 23,
    avatar: "/images/connections/dr-carlos.jpg",
  },
  {
    id: "sofia-rodrigues-lse",
    name: "Sofia Rodrigues",
    role: "student",
    university: "London School of Economics",
    subject: "International Relations",
    specialization: [
      "EU Politics",
      "Portuguese Foreign Policy",
      "International Law",
    ],
    yearOfStudy: "Masters",
    researchInterests: [
      "EU-Africa Relations",
      "Portuguese Diplomacy",
      "International Development",
    ],
    availableFor: ["study_groups", "research_collaboration", "mentorship"],
    location: "London",
    rating: 4.8,
    connections: 67,
    isOnline: true,
    languages: ["Portuguese", "English", "French"],
    avatar: "/images/connections/sofia-rodrigues.jpg",
  },
];

const STUDY_GROUPS: StudyGroup[] = [
  {
    id: "portuguese-lit-ucl",
    name: "Portuguese Literature Study Circle",
    namePortuguese: "Círculo de Estudos de Literatura Portuguesa",
    subject: "Portuguese Literature",
    university: "University College London",
    type: "research_group",
    members: 8,
    maxMembers: 12,
    level: "mixed",
    meetingFrequency: "Weekly",
    nextMeeting: "2024-09-20T14:00:00",
    location: "UCL Portuguese Studies Department",
    description:
      "Weekly discussions on contemporary Portuguese literature, poetry analysis, and research collaboration on Portuguese cultural studies.",
    descriptionPortuguese:
      "Discussões semanais sobre literatura portuguesa contemporânea, análise de poesia e colaboração em investigação sobre estudos culturais portugueses.",
    coordinator: "Ana Silva (PhD Candidate)",
    requirements: [
      "Intermediate Portuguese reading level",
      "Portuguese Studies student or interest",
    ],
    isActive: true,
    success_rate: 94,
  },
  {
    id: "cs-algorithms-imperial",
    name: "Portuguese CS Students - Algorithms Study Group",
    namePortuguese:
      "Estudantes de Informática Portugueses - Grupo de Estudo de Algoritmos",
    subject: "Computer Science",
    university: "Imperial College London",
    type: "exam_prep",
    members: 15,
    maxMembers: 20,
    level: "undergraduate",
    meetingFrequency: "Twice weekly",
    nextMeeting: "2024-09-18T16:00:00",
    location: "Imperial College - Computing Lab 3",
    description:
      "Collaborative study sessions for algorithm design, data structures, and coding interview preparation. Conducted in Portuguese and English.",
    descriptionPortuguese:
      "Sessões de estudo colaborativas para design de algoritmos, estruturas de dados e preparação para entrevistas de programação. Conduzidas em português e inglês.",
    coordinator: "Miguel Costa (3rd Year)",
    requirements: [
      "Computer Science student",
      "Basic programming knowledge",
      "Portuguese speaker",
    ],
    isActive: true,
    success_rate: 89,
  },
  {
    id: "thesis-writing-kcl",
    name: "Portuguese Thesis Writing Support Group",
    namePortuguese: "Grupo de Apoio à Escrita de Teses Portuguesas",
    subject: "Academic Writing",
    university: "King's College London",
    type: "thesis_support",
    members: 6,
    maxMembers: 10,
    level: "postgraduate",
    meetingFrequency: "Bi-weekly",
    nextMeeting: "2024-09-25T10:00:00",
    location: "KCL Library - Group Study Room",
    description:
      "Support group for Portuguese students writing dissertations and theses. Peer review, writing workshops, and academic guidance.",
    descriptionPortuguese:
      "Grupo de apoio para estudantes portugueses a escrever dissertações e teses. Revisão por pares, workshops de escrita e orientação académica.",
    coordinator: "Prof. João Fernandes",
    requirements: [
      "Masters or PhD student",
      "Currently writing thesis",
      "Portuguese connection to research",
    ],
    isActive: true,
    success_rate: 96,
  },
  {
    id: "language-exchange-oxford",
    name: "Portuguese-English Academic Language Exchange",
    namePortuguese: "Intercâmbio de Língua Académica Português-Inglês",
    subject: "Language Practice",
    university: "University of Oxford",
    type: "language_practice",
    members: 12,
    maxMembers: 16,
    level: "mixed",
    meetingFrequency: "Weekly",
    nextMeeting: "2024-09-22T11:00:00",
    location: "Oxford Modern Languages Faculty",
    description:
      "Academic language exchange focusing on presentation skills, academic writing, and scholarly discussion in Portuguese and English.",
    descriptionPortuguese:
      "Intercâmbio de língua académica focado em competências de apresentação, escrita académica e discussão académica em português e inglês.",
    coordinator: "Maria Santos (2nd Year)",
    requirements: [
      "Fluent in Portuguese or English",
      "Academic focus",
      "Regular attendance",
    ],
    isActive: true,
    success_rate: 92,
  },
];

const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "portuguese-diaspora-digital",
    title: "Digital Portuguese Diaspora: Identity and Community Online",
    titlePortuguese:
      "Diáspora Portuguesa Digital: Identidade e Comunidade Online",
    university: "University College London",
    department: "Portuguese Studies",
    leadResearcher: "Ana Silva (PhD Candidate)",
    collaborators: 3,
    maxCollaborators: 6,
    type: "phd_research",
    status: "recruiting",
    duration: "18 months",
    requirements: [
      "Digital humanities interest",
      "Portuguese language skills",
      "Research experience",
    ],
    skills: [
      "Data analysis",
      "Social media research",
      "Portuguese culture knowledge",
    ],
    description:
      "Research into how Portuguese communities maintain cultural identity through digital platforms and social media.",
    descriptionPortuguese:
      "Investigação sobre como as comunidades portuguesas mantêm a identidade cultural através de plataformas digitais e redes sociais.",
    funding: true,
    publications: true,
    deadline: "2024-10-15",
  },
  {
    id: "ai-portuguese-nlp",
    title: "Intelligent Systems for Portuguese Language Processing",
    titlePortuguese: "IA para Processamento de Língua Portuguesa",
    university: "Imperial College London",
    department: "Computing",
    leadResearcher: "Dr. Sarah Chen & Miguel Costa",
    collaborators: 2,
    maxCollaborators: 4,
    type: "undergraduate_research",
    status: "recruiting",
    duration: "12 months",
    requirements: [
      "Computer Science student",
      "Python programming",
      "Portuguese native speaker",
    ],
    skills: [
      "Machine learning",
      "Natural language processing",
      "Python/TensorFlow",
    ],
    description:
      "Developing intelligent models specifically trained on Portuguese language data for improved text analysis and translation.",
    descriptionPortuguese:
      "Desenvolvimento de modelos de IA especificamente treinados em dados da língua portuguesa para melhor análise de texto e tradução.",
    funding: false,
    publications: true,
    deadline: "2024-09-30",
  },
  {
    id: "portugal-brexit-impact",
    title: "Portugal-UK Relations Post-Brexit: Economic and Social Impact",
    titlePortuguese:
      "Relações Portugal-Reino Unido Pós-Brexit: Impacto Económico e Social",
    university: "London School of Economics",
    department: "International Relations",
    leadResearcher: "Sofia Rodrigues & Dr. James Wilson",
    collaborators: 4,
    maxCollaborators: 8,
    type: "masters_thesis",
    status: "active",
    duration: "9 months",
    requirements: [
      "International Relations or Economics student",
      "EU studies knowledge",
      "Portuguese context understanding",
    ],
    skills: ["Economic analysis", "Policy research", "Statistical analysis"],
    description:
      "Comprehensive analysis of how Brexit has affected Portugal-UK relations across economic, social, and political dimensions.",
    descriptionPortuguese:
      "Análise abrangente de como o Brexit afetou as relações Portugal-Reino Unido nas dimensões económica, social e política.",
    funding: true,
    publications: true,
    deadline: "2025-01-31",
  },
];

export default function AcademicNetworkingSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    "connections" | "study_groups" | "research"
  >("connections");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const tabs = [
    {
      id: "connections",
      label: { en: "Academic Connections", pt: "Conexões Académicas" },
      icon: UsersIcon,
      description: {
        en: "Connect with Portuguese students, researchers, and professors",
        pt: "Conecte-se com estudantes, investigadores e professores portugueses",
      },
    },
    {
      id: "study_groups",
      label: { en: "Study Groups", pt: "Grupos de Estudo" },
      icon: BookOpenIcon,
      description: {
        en: "Join Portuguese study groups and academic circles",
        pt: "Junte-se a grupos de estudo e círculos académicos portugueses",
      },
    },
    {
      id: "research",
      label: { en: "Research Projects", pt: "Projetos de Investigação" },
      icon: PresentationChartLineIcon,
      description: {
        en: "Collaborate on Portuguese-focused research projects",
        pt: "Colabore em projetos de investigação focados no português",
      },
    },
  ];

  const roleFilters = [
    { value: "all", label: { en: "All Roles", pt: "Todas as Funções" } },
    { value: "student", label: { en: "Students", pt: "Estudantes" } },
    { value: "professor", label: { en: "Professors", pt: "Professores" } },
    {
      value: "phd_candidate",
      label: { en: "PhD Candidates", pt: "Candidatos a Doutoramento" },
    },
    { value: "researcher", label: { en: "Researchers", pt: "Investigadores" } },
    { value: "mentor", label: { en: "Mentors", pt: "Mentores" } },
  ];

  const subjectFilters = [
    { value: "all", label: { en: "All Subjects", pt: "Todas as Disciplinas" } },
    {
      value: "Portuguese Studies",
      label: { en: "Portuguese Studies", pt: "Estudos Portugueses" },
    },
    {
      value: "Computer Science",
      label: { en: "Computer Science", pt: "Ciência da Computação" },
    },
    {
      value: "International Relations",
      label: { en: "International Relations", pt: "Relações Internacionais" },
    },
    { value: "Economics", label: { en: "Economics", pt: "Economia" } },
    {
      value: "Modern Languages",
      label: { en: "Modern Languages", pt: "Línguas Modernas" },
    },
  ];

  const filteredConnections = ACADEMIC_CONNECTIONS.filter((connection) => {
    const roleMatch =
      selectedRole === "all" || connection.role === selectedRole;
    const subjectMatch =
      selectedSubject === "all" || connection.subject === selectedSubject;
    return roleMatch && subjectMatch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "professor":
        return "bg-primary-100 text-primary-700";
      case "phd_candidate":
        return "bg-secondary-100 text-secondary-700";
      case "researcher":
        return "bg-accent-100 text-accent-700";
      case "student":
        return "bg-premium-100 text-premium-700";
      case "postdoc":
        return "bg-coral-100 text-coral-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      student: { en: "Student", pt: "Estudante" },
      professor: { en: "Professor", pt: "Professor" },
      researcher: { en: "Researcher", pt: "Investigador" },
      phd_candidate: { en: "PhD Candidate", pt: "Candidato PhD" },
      postdoc: { en: "Postdoc", pt: "Pós-Doutoramento" },
      mentor: { en: "Mentor", pt: "Mentor" },
    };
    return labels[role]?.[language] || role;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exam_prep":
        return "bg-red-100 text-red-700";
      case "research_group":
        return "bg-blue-100 text-blue-700";
      case "thesis_support":
        return "bg-green-100 text-green-700";
      case "language_practice":
        return "bg-purple-100 text-purple-700";
      case "assignment_help":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting":
        return "bg-green-100 text-green-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-lg mb-6">
            <UserGroupIcon className="w-4 h-4 mr-2 text-primary-600" />
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
              {language === "pt"
                ? "Rede Académica Portuguesa"
                : "Portuguese Academic Network"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "pt"
              ? "Conecte-se com a Comunidade Académica Portuguesa"
              : "Connect with the Portuguese Academic Community"}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "pt"
              ? "Encontre estudantes, professores e investigadores portugueses para colaboração académica, grupos de estudo e projetos de investigação"
              : "Find Portuguese students, professors, and researchers for academic collaboration, study groups, and research projects"}
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white border-primary-300 shadow-lg"
                      : "bg-white/50 border-gray-200 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={`p-3 rounded-xl ${
                        activeTab === tab.id ? "bg-primary-100" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          activeTab === tab.id
                            ? "text-primary-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                  <h3
                    className={`font-semibold mb-2 ${
                      activeTab === tab.id
                        ? "text-primary-900"
                        : "text-gray-900"
                    }`}
                  >
                    {tab.label[language]}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tab.description[language]}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Academic Connections Tab */}
        {activeTab === "connections" && (
          <div>
            {/* Filters */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "pt" ? "Função:" : "Role:"}
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {roleFilters.map((filter) => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "pt" ? "Disciplina:" : "Subject:"}
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {subjectFilters.map((filter) => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Connections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-lg">
                          {connection.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {connection.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getRoleColor(
                            connection.role
                          )}`}
                        >
                          {getRoleLabel(connection.role)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          connection.isOnline ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* University & Subject */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <BuildingLibraryIcon className="w-4 h-4 mr-2" />
                      {connection.university}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      {connection.subject}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {connection.location}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === "pt"
                        ? "Especializações:"
                        : "Specializations:"}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {connection.specialization.slice(0, 2).map((spec, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {connection.specialization.length > 2 && (
                        <span className="text-xs text-primary-600">
                          +{connection.specialization.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Available For */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === "pt"
                        ? "Disponível para:"
                        : "Available for:"}
                    </h4>
                    <div className="space-y-1">
                      {connection.availableFor.slice(0, 3).map((service, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                          {service.replace("_", " ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <StarIconSolid className="w-4 h-4 text-yellow-400 mr-1" />
                      {connection.rating}
                    </div>
                    <div className="text-sm text-gray-600">
                      {connection.connections}{" "}
                      {language === "pt" ? "conexões" : "connections"}
                    </div>
                    {connection.publications && (
                      <div className="text-sm text-gray-600">
                        {connection.publications}{" "}
                        {language === "pt" ? "publicações" : "publications"}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                    {language === "pt" ? "Conectar" : "Connect"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === "study_groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDY_GROUPS.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {language === "pt" ? group.namePortuguese : group.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                        group.type
                      )}`}
                    >
                      {group.type.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {group.success_rate}%{" "}
                      {language === "pt" ? "sucesso" : "success"}
                    </div>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* University & Subject */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <BuildingLibraryIcon className="w-4 h-4 mr-2" />
                    {group.university}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    {group.subject}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {language === "pt"
                      ? "Próxima reunião:"
                      : "Next meeting:"}{" "}
                    {new Date(group.nextMeeting).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {language === "pt"
                    ? group.descriptionPortuguese
                    : group.description}
                </p>

                {/* Members */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{language === "pt" ? "Membros:" : "Members:"}</span>
                    <span>
                      {group.members}/{group.maxMembers}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{
                        width: `${(group.members / group.maxMembers) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Coordinator */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {language === "pt" ? "Coordenador:" : "Coordinator:"}
                  </div>
                  <div className="text-sm text-gray-900">
                    {group.coordinator}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                    group.members >= group.maxMembers
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600"
                  }`}
                  disabled={group.members >= group.maxMembers}
                >
                  {group.members >= group.maxMembers
                    ? language === "pt"
                      ? "Grupo Cheio"
                      : "Group Full"
                    : language === "pt"
                    ? "Juntar ao Grupo"
                    : "Join Group"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Research Projects Tab */}
        {activeTab === "research" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {RESEARCH_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {language === "pt"
                        ? project.titlePortuguese
                        : project.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {project.type.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.funding && (
                      <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                        <TrophyIcon className="w-4 h-4" />
                      </div>
                    )}
                    {project.publications && (
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <DocumentTextIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* University & Department */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <BuildingLibraryIcon className="w-4 h-4 mr-2" />
                    {project.university} - {project.department}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    {language === "pt" ? "Líder:" : "Lead:"}{" "}
                    {project.leadResearcher}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {language === "pt" ? "Duração:" : "Duration:"}{" "}
                    {project.duration}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {language === "pt"
                    ? project.descriptionPortuguese
                    : project.description}
                </p>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {language === "pt" ? "Requisitos:" : "Requirements:"}
                  </h4>
                  <div className="space-y-1">
                    {project.requirements.slice(0, 3).map((req, i) => (
                      <div
                        key={i}
                        className="flex items-start text-xs text-gray-600"
                      >
                        <CheckIcon className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {language === "pt" ? "Competências:" : "Skills:"}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collaborators */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      {language === "pt" ? "Colaboradores:" : "Collaborators:"}
                    </span>
                    <span>
                      {project.collaborators}/{project.maxCollaborators}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (project.collaborators / project.maxCollaborators) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="mb-4 text-sm text-gray-600">
                  <strong>
                    {language === "pt"
                      ? "Prazo de candidatura:"
                      : "Application deadline:"}
                  </strong>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                    project.collaborators >= project.maxCollaborators ||
                    project.status === "completed"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600"
                  }`}
                  disabled={
                    project.collaborators >= project.maxCollaborators ||
                    project.status === "completed"
                  }
                >
                  {project.collaborators >= project.maxCollaborators
                    ? language === "pt"
                      ? "Projeto Cheio"
                      : "Project Full"
                    : project.status === "completed"
                    ? language === "pt"
                      ? "Projeto Concluído"
                      : "Project Completed"
                    : language === "pt"
                    ? "Candidatar-se"
                    : "Apply"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white"
        >
          <UserGroupIcon className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            {language === "pt"
              ? "Construa a Sua Rede Académica Portuguesa"
              : "Build Your Portuguese Academic Network"}
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {language === "pt"
              ? "Conecte-se com mais de 2.150 estudantes portugueses em universidades do Reino Unido. Colabore, aprenda e cresça em conjunto."
              : "Connect with over 2,150 Portuguese students at UK universities. Collaborate, learn, and grow together."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              {language === "pt"
                ? "Criar Perfil Académico"
                : "Create Academic Profile"}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold px-8 py-3 rounded-xl transition-all duration-200">
              {language === "pt" ? "Explorar Rede" : "Explore Network"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
