"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BuildingOffice2Icon, 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';
import CulturalFlagCarousel from './CulturalFlagCarousel';

interface DualAudienceHeaderProps {
  selectedAudience: 'business' | 'romantic' | 'both' | '';
  onAudienceSelect: (audience: 'business' | 'romantic' | 'both') => void;
}

export function DualAudienceHeader({ selectedAudience, onAudienceSelect }: DualAudienceHeaderProps) {
  const { language, t } = useLanguage();

  const audienceOptions = [
    {
      id: 'business' as const,
      title: language === 'pt' ? 'Networking Profissional' : 'Professional Networking',
      subtitle: language === 'pt' ? 'Conecte-se com a elite empresarial portuguesa' : 'Connect with Portuguese business elite',
      icon: BuildingOffice2Icon,
      gradient: 'from-blue-600 to-indigo-700',
      hoverGradient: 'hover:from-blue-700 hover:to-indigo-800',
      benefits: [
        language === 'pt' ? '2.150+ estudantes universitários' : '2,150+ university students',
        language === 'pt' ? '8 universidades parceiras' : '8 partner universities',
        language === 'pt' ? 'Eventos VIP de networking' : 'VIP networking events'
      ]
    },
    {
      id: 'romantic' as const,
      title: language === 'pt' ? 'Conexões Românticas' : 'Romantic Connections',
      subtitle: language === 'pt' ? 'Encontre alguém que entenda sua alma portuguesa' : 'Find someone who understands your Portuguese soul',
      icon: HeartIcon,
      gradient: 'from-red-500 to-pink-600',
      hoverGradient: 'hover:from-red-600 hover:to-pink-700',
      benefits: [
        language === 'pt' ? 'Compatibilidade cultural' : 'Cultural compatibility matching',
        language === 'pt' ? 'Eventos sociais íntimos' : 'Intimate social events',
        language === 'pt' ? 'Conexões autênticas' : 'Authentic connections'
      ]
    },
    {
      id: 'both' as const,
      title: language === 'pt' ? 'Tudo Incluído' : 'Everything Included',
      subtitle: language === 'pt' ? 'Negócios e romance em uma plataforma completa' : 'Business and romance in one complete platform',
      icon: SparklesIcon,
      gradient: 'from-purple-600 to-pink-600',
      hoverGradient: 'hover:from-purple-700 hover:to-pink-700',
      benefits: [
        language === 'pt' ? 'Acesso total à comunidade' : 'Full community access',
        language === 'pt' ? 'Todos os eventos e recursos' : 'All events and features',
        language === 'pt' ? 'Flexibilidade máxima' : 'Maximum flexibility'
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
      <div className="container-width">
        {/* Cultural Flag Animation Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <CulturalFlagCarousel className="mb-6" size="xl" />
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">
              {language === 'pt' ? 'Finalmente!' : 'Finally!'}
            </span>
            <br />
            {language === 'pt' ? 'Sua Comunidade Portuguesa Completa' : 'Your Complete Portuguese Community'}
          </h1>
          
          <p className="text-xl text-gray-700 mb-4 max-w-4xl mx-auto">
            {language === 'pt' 
              ? 'De negócios de alto nível a conexões românticas autênticas - tudo em uma plataforma cultural portuguesa'
              : 'From high-level business to authentic romantic connections - all in one Portuguese cultural platform'
            }
          </p>
          
          <div className="flex items-center justify-center gap-6 text-lg text-gray-600 flex-wrap">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-green-600" />
              <span className="font-semibold">750+ {language === 'pt' ? 'Membros' : 'Members'}</span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full hidden sm:block" />
            <div className="flex items-center gap-2">
              <BuildingOffice2Icon className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">8 {language === 'pt' ? 'Universidades' : 'Universities'}</span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full hidden sm:block" />
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-red-600" />
              <span className="font-semibold">{language === 'pt' ? 'Conexões Culturais' : 'Cultural Connections'}</span>
            </div>
          </div>
        </motion.div>

        {/* Audience Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === 'pt' ? 'Escolha Sua Jornada' : 'Choose Your Journey'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audienceOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedAudience === option.id;
              
              return (
                <motion.button
                  key={option.id}
                  onClick={() => onAudienceSelect(option.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
                    ${
                      isSelected
                        ? 'border-primary-500 bg-white shadow-2xl scale-105'
                        : 'border-gray-200 bg-white/80 hover:border-gray-300 hover:shadow-lg hover:scale-102'
                    }
                  `}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white font-bold text-sm">✓</span>
                    </motion.div>
                  )}
                  
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${option.gradient} ${option.hoverGradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.subtitle}</p>
                  
                  {/* Benefits list */}
                  <div className="space-y-2">
                    {option.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Call to action */}
                  <div className={`mt-4 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors ${
                    isSelected 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                  }`}>
                    {isSelected 
                      ? (language === 'pt' ? 'Selecionado' : 'Selected')
                      : (language === 'pt' ? 'Selecionar' : 'Select')
                    }
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Selected audience confirmation */}
        {selectedAudience && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-800">
                {language === 'pt' 
                  ? `Perfeito! Vamos personalizar sua experiência para ${audienceOptions.find(opt => opt.id === selectedAudience)?.title.toLowerCase()}`
                  : `Perfect! Let's customize your experience for ${audienceOptions.find(opt => opt.id === selectedAudience)?.title.toLowerCase()}`
                }
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DualAudienceHeader;
