"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FunnelIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  AcademicCapIcon,
  SparklesIcon,
  MapPinIcon,
  ChevronDownIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface BusinessNetworkingFilters {
  industry: string[];
  companySize: string[];
  experience: string[];
  networkingGoals: string[];
  businessInterests: string[];
  mentorshipType: string[];
  location: string[];
}

interface BusinessMatchFiltersProps {
  filters: BusinessNetworkingFilters;
  onFiltersChange: (filters: BusinessNetworkingFilters) => void;
  totalMatches: number;
  filteredMatches: number;
}

export default function BusinessMatchFilters({
  filters,
  onFiltersChange,
  totalMatches,
  filteredMatches,
}: BusinessMatchFiltersProps) {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<string[]>(['industry']);

  const industryOptions = [
    { value: "Financial Technology", label: language === "pt" ? "Tecnologia Financeira" : "Financial Technology" },
    { value: "Fashion & Retail", label: language === "pt" ? "Moda e Retalho" : "Fashion & Retail" },
    { value: "Marketing & Communications", label: language === "pt" ? "Marketing e Comunicações" : "Marketing & Communications" },
    { value: "Technology", label: language === "pt" ? "Tecnologia" : "Technology" },
    { value: "Healthcare", label: language === "pt" ? "Saúde" : "Healthcare" },
    { value: "Construction", label: language === "pt" ? "Construção" : "Construction" },
    { value: "Tourism & Hospitality", label: language === "pt" ? "Turismo e Hospitalidade" : "Tourism & Hospitality" },
    { value: "Education", label: language === "pt" ? "Educação" : "Education" },
    { value: "Real Estate", label: language === "pt" ? "Imobiliário" : "Real Estate" },
    { value: "Food & Beverage", label: language === "pt" ? "Alimentação e Bebidas" : "Food & Beverage" },
    { value: "Legal Services", label: language === "pt" ? "Serviços Jurídicos" : "Legal Services" },
    { value: "Consulting", label: language === "pt" ? "Consultoria" : "Consulting" },
  ];

  const companySizeOptions = [
    { value: "Freelance", label: language === "pt" ? "Freelancer" : "Freelance" },
    { value: "1-10 employees", label: language === "pt" ? "1-10 funcionários" : "1-10 employees" },
    { value: "10-25 employees", label: language === "pt" ? "10-25 funcionários" : "10-25 employees" },
    { value: "25-50 employees", label: language === "pt" ? "25-50 funcionários" : "25-50 employees" },
    { value: "50-100 employees", label: language === "pt" ? "50-100 funcionários" : "50-100 employees" },
    { value: "100-500 employees", label: language === "pt" ? "100-500 funcionários" : "100-500 employees" },
    { value: "500+ employees", label: language === "pt" ? "500+ funcionários" : "500+ employees" },
  ];

  const experienceOptions = [
    { value: "0-2 years", label: language === "pt" ? "0-2 anos" : "0-2 years" },
    { value: "2-5 years", label: language === "pt" ? "2-5 anos" : "2-5 years" },
    { value: "5+ years", label: language === "pt" ? "5+ anos" : "5+ years" },
    { value: "8+ years", label: language === "pt" ? "8+ anos" : "8+ years" },
    { value: "10+ years", label: language === "pt" ? "10+ anos" : "10+ years" },
    { value: "12+ years", label: language === "pt" ? "12+ anos" : "12+ years" },
    { value: "15+ years", label: language === "pt" ? "15+ anos" : "15+ years" },
  ];

  const networkingGoalsOptions = [
    { value: "Mentorship", label: language === "pt" ? "Mentoria" : "Mentorship" },
    { value: "Partnership", label: language === "pt" ? "Parcerias" : "Partnership" },
    { value: "Investment", label: language === "pt" ? "Investimento" : "Investment" },
    { value: "Knowledge Sharing", label: language === "pt" ? "Partilha de Conhecimento" : "Knowledge Sharing" },
    { value: "Collaboration", label: language === "pt" ? "Colaboração" : "Collaboration" },
    { value: "Supplier Network", label: language === "pt" ? "Rede de Fornecedores" : "Supplier Network" },
    { value: "Client Referrals", label: language === "pt" ? "Referências de Clientes" : "Client Referrals" },
    { value: "Skill Sharing", label: language === "pt" ? "Partilha de Competências" : "Skill Sharing" },
    { value: "Job Opportunities", label: language === "pt" ? "Oportunidades de Emprego" : "Job Opportunities" },
    { value: "Business Expansion", label: language === "pt" ? "Expansão de Negócio" : "Business Expansion" },
  ];

  const businessInterestsOptions = [
    { value: "FinTech", label: "FinTech" },
    { value: "Portuguese Market", label: language === "pt" ? "Mercado Português" : "Portuguese Market" },
    { value: "United Kingdom-Portugal Trade", label: language === "pt" ? "Comércio Reino Unido-Portugal" : "United Kingdom-Portugal Trade" },
    { value: "Startup Ecosystem", label: language === "pt" ? "Ecossistema Startup" : "Startup Ecosystem" },
    { value: "Sustainable Business", label: language === "pt" ? "Negócio Sustentável" : "Sustainable Business" },
    { value: "Portuguese Crafts", label: language === "pt" ? "Artesanato Português" : "Portuguese Crafts" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "Digital Marketing", label: language === "pt" ? "Marketing Digital" : "Digital Marketing" },
    { value: "Portuguese Tourism", label: language === "pt" ? "Turismo Português" : "Portuguese Tourism" },
    { value: "Content Creation", label: language === "pt" ? "Criação de Conteúdo" : "Content Creation" },
    { value: "Cultural Heritage", label: language === "pt" ? "Património Cultural" : "Cultural Heritage" },
    { value: "Import/Export", label: language === "pt" ? "Importação/Exportação" : "Import/Export" },
    { value: "Real Estate", label: language === "pt" ? "Imobiliário" : "Real Estate" },
    { value: "Food & Beverage", label: language === "pt" ? "Alimentação e Bebidas" : "Food & Beverage" },
  ];

  const mentorshipTypeOptions = [
    { value: "mentor", label: language === "pt" ? "Disponível como Mentor" : "Available as Mentor" },
    { value: "mentee", label: language === "pt" ? "Procura Mentor" : "Seeking Mentor" },
    { value: "peer", label: language === "pt" ? "Networking Entre Pares" : "Peer Networking" },
    { value: "both", label: language === "pt" ? "Mentor e Mentorando" : "Mentor & Mentee" },
  ];

  const locationOptions = [
    { value: "City of London", label: "City of London" },
    { value: "Shoreditch", label: "Shoreditch" },
    { value: "Portobello Road", label: "Portobello Road" },
    { value: "Vauxhall", label: "Vauxhall" },
    { value: "Stockwell", label: "Stockwell" },
    { value: "Elephant & Castle", label: "Elephant & Castle" },
    { value: "Borough", label: "Borough" },
    { value: "Kentish Town", label: "Kentish Town" },
    { value: "Canary Wharf", label: "Canary Wharf" },
    { value: "Islington", label: "Islington" },
    { value: "Camden", label: "Camden" },
    { value: "Hammersmith", label: "Hammersmith" },
  ];

  const filterSections = [
    {
      id: "industry",
      title: language === "pt" ? "Setor" : "Industry",
      icon: BuildingOfficeIcon,
      options: industryOptions,
      values: filters.industry,
      key: "industry" as keyof BusinessNetworkingFilters,
    },
    {
      id: "companySize",
      title: language === "pt" ? "Tamanho da Empresa" : "Company Size",
      icon: BriefcaseIcon,
      options: companySizeOptions,
      values: filters.companySize,
      key: "companySize" as keyof BusinessNetworkingFilters,
    },
    {
      id: "experience",
      title: language === "pt" ? "Experiência" : "Experience",
      icon: AcademicCapIcon,
      options: experienceOptions,
      values: filters.experience,
      key: "experience" as keyof BusinessNetworkingFilters,
    },
    {
      id: "networkingGoals",
      title: language === "pt" ? "Objetivos de Networking" : "Networking Goals",
      icon: UserGroupIcon,
      options: networkingGoalsOptions,
      values: filters.networkingGoals,
      key: "networkingGoals" as keyof BusinessNetworkingFilters,
    },
    {
      id: "businessInterests",
      title: language === "pt" ? "Interesses Comerciais" : "Business Interests",
      icon: SparklesIcon,
      options: businessInterestsOptions,
      values: filters.businessInterests,
      key: "businessInterests" as keyof BusinessNetworkingFilters,
    },
    {
      id: "mentorshipType",
      title: language === "pt" ? "Tipo de Mentoria" : "Mentorship Type",
      icon: AcademicCapIcon,
      options: mentorshipTypeOptions,
      values: filters.mentorshipType,
      key: "mentorshipType" as keyof BusinessNetworkingFilters,
    },
    {
      id: "location",
      title: language === "pt" ? "Localização" : "Location",
      icon: MapPinIcon,
      options: locationOptions,
      values: filters.location,
      key: "location" as keyof BusinessNetworkingFilters,
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFilter = (sectionKey: keyof BusinessNetworkingFilters, value: string) => {
    const currentValues = filters[sectionKey] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFiltersChange({
      ...filters,
      [sectionKey]: newValues,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      industry: [],
      companySize: [],
      experience: [],
      networkingGoals: [],
      businessInterests: [],
      mentorshipType: [],
      location: [],
    });
  };

  const clearSectionFilters = (sectionKey: keyof BusinessNetworkingFilters) => {
    onFiltersChange({
      ...filters,
      [sectionKey]: [],
    });
  };

  const getTotalActiveFilters = () => {
    return Object.values(filters).reduce((total, filterArray) => total + filterArray.length, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-bold text-primary-900">
            {language === "pt" ? "Filtros" : "Filters"}
          </h3>
          {getTotalActiveFilters() > 0 && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
              {getTotalActiveFilters()}
            </span>
          )}
        </div>
        {getTotalActiveFilters() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {language === "pt" ? "Limpar Todos" : "Clear All"}
          </button>
        )}
      </div>

      {/* Results Counter */}
      <div className="bg-primary-25 p-3 rounded-xl border border-primary-100 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-900">{filteredMatches}</div>
          <div className="text-sm text-primary-600">
            {language === "pt" ? `de ${totalMatches} profissionais` : `of ${totalMatches} professionals`}
          </div>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filterSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          const sectionActiveCount = section.values.length;

          return (
            <div key={section.id} className="border border-primary-100 rounded-xl">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-primary-25 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-600" />
                  <span className="font-medium text-primary-900 text-sm">{section.title}</span>
                  {sectionActiveCount > 0 && (
                    <span className="bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {sectionActiveCount}
                    </span>
                  )}
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-primary-600 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 pt-0 space-y-2">
                      {sectionActiveCount > 0 && (
                        <button
                          onClick={() => clearSectionFilters(section.key)}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium mb-2"
                        >
                          {language === "pt" ? "Limpar Secção" : "Clear Section"}
                        </button>
                      )}
                      
                      {section.options.map((option) => {
                        const isSelected = section.values.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer hover:bg-primary-25 p-2 rounded-lg transition-colors"
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "bg-primary-600 border-primary-600"
                                  : "border-primary-300 hover:border-primary-400"
                              }`}
                            >
                              {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-primary-800">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-primary-100">
        <h4 className="text-sm font-bold text-primary-900 mb-3">
          {language === "pt" ? "Filtros Rápidos" : "Quick Filters"}
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => onFiltersChange({
              ...filters,
              mentorshipType: ["mentor"],
              networkingGoals: ["Mentorship"],
            })}
            className="w-full text-left p-2 bg-accent-50 hover:bg-accent-100 text-accent-800 rounded-lg text-sm font-medium transition-colors"
          >
            {language === "pt" ? "🎓 Mentores Disponíveis" : "🎓 Available Mentors"}
          </button>
          <button
            onClick={() => onFiltersChange({
              ...filters,
              businessInterests: ["Startup Ecosystem"],
              networkingGoals: ["Investment", "Partnership"],
            })}
            className="w-full text-left p-2 bg-secondary-50 hover:bg-secondary-100 text-secondary-800 rounded-lg text-sm font-medium transition-colors"
          >
            {language === "pt" ? "🚀 Ecossistema Startup" : "🚀 Startup Ecosystem"}
          </button>
          <button
            onClick={() => onFiltersChange({
              ...filters,
              businessInterests: ["Portuguese Market", "United Kingdom-Portugal Trade"],
              networkingGoals: ["Business Expansion"],
            })}
            className="w-full text-left p-2 bg-coral-50 hover:bg-coral-100 text-coral-800 rounded-lg text-sm font-medium transition-colors"
          >
            {language === "pt" ? "🇵🇹 Mercado Português" : "🇵🇹 Portuguese Market"}
          </button>
        </div>
      </div>
    </div>
  );
}