/**
 * Branded Features Showcase Component
 * 
 * Displays all LusoTown branded features with consistent styling and messaging.
 * Used across various pages to promote feature awareness.
 */

"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  VideoCameraIcon, 
  TruckIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  AcademicCapIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { BRANDED_FEATURES, getFeatureName, getFeatureTagline, getFeatureCTA, FEATURE_COLORS } from '@/config/branding';
import { ROUTES } from '@/config/routes';

interface BrandedFeaturesProps {
  variant?: 'grid' | 'carousel' | 'list';
  showAll?: boolean;
  featuredFeatures?: string[];
  className?: string;
}

export default function BrandedFeatures({ 
  variant = 'grid',
  showAll = true,
  featuredFeatures,
  className = ''
}: BrandedFeaturesProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const featureCards = [
    {
      id: 'LUSOMATCH',
      name: getFeatureName('LUSOMATCH', language),
      tagline: getFeatureTagline('LUSOMATCH', language),
      cta: getFeatureCTA('LUSOMATCH', 'primary', language),
      href: ROUTES.matches,
      icon: HeartIcon,
      colors: FEATURE_COLORS.LUSOMATCH,
      stats: {
        en: '750+ Active Members',
        pt: '750+ Membros Ativos'
      }
    },
    {
      id: 'LUSOSTREAM',
      name: getFeatureName('LUSOSTREAM', language),
      tagline: getFeatureTagline('LUSOSTREAM', language),
      cta: getFeatureCTA('LUSOSTREAM', 'primary', language),
      href: ROUTES.streaming,
      icon: VideoCameraIcon,
      colors: FEATURE_COLORS.LUSOSTREAM,
      stats: {
        en: '50+ Live Channels',
        pt: '50+ Canais Ao Vivo'
      }
    },
    {
      id: 'LUSORIDE',
      name: getFeatureName('LUSORIDE', language),
      tagline: getFeatureTagline('LUSORIDE', language),
      cta: getFeatureCTA('LUSORIDE', 'primary', language),
      href: ROUTES.transport,
      icon: TruckIcon,
      colors: FEATURE_COLORS.LUSORIDE,
      stats: {
        en: '25+ Professional Drivers',
        pt: '25+ Motoristas Profissionais'
      }
    },
    {
      id: 'LUSOCHAT',
      name: getFeatureName('LUSOCHAT', language),
      tagline: getFeatureTagline('LUSOCHAT', language),
      cta: getFeatureCTA('LUSOCHAT', 'primary', language),
      href: ROUTES.myNetwork,
      icon: ChatBubbleLeftRightIcon,
      colors: FEATURE_COLORS.LUSOCHAT,
      stats: {
        en: '24/7 Community Chat',
        pt: 'Chat Comunitário 24/7'
      }
    },
    {
      id: 'LUSOCONNECT',
      name: getFeatureName('LUSOCONNECT', language),
      tagline: getFeatureTagline('LUSOCONNECT', language),
      cta: getFeatureCTA('LUSOCONNECT', 'primary', language),
      href: ROUTES.businessNetworking,
      icon: BuildingOffice2Icon,
      colors: FEATURE_COLORS.LUSOCONNECT,
      stats: {
        en: '200+ Business Professionals',
        pt: '200+ Profissionais de Negócios'
      }
    },
    {
      id: 'LUSOEVENTS',
      name: getFeatureName('LUSOEVENTS', language),
      tagline: getFeatureTagline('LUSOEVENTS', language),
      cta: getFeatureCTA('LUSOEVENTS', 'primary', language),
      href: ROUTES.events,
      icon: CalendarDaysIcon,
      colors: FEATURE_COLORS.LUSOEVENTS,
      stats: {
        en: '50+ Monthly Events',
        pt: '50+ Eventos Mensais'
      }
    },
    {
      id: 'LUSOLEARN',
      name: getFeatureName('LUSOLEARN', language),
      tagline: getFeatureTagline('LUSOLEARN', language),
      cta: getFeatureCTA('LUSOLEARN', 'primary', language),
      href: '/academy',
      icon: AcademicCapIcon,
      colors: FEATURE_COLORS.LUSOLEARN,
      stats: {
        en: '8 Service Guides',
        pt: '8 Guias de Serviços'
      }
    }
  ];

  const displayedFeatures = showAll 
    ? featureCards 
    : featureCards.filter(feature => 
        featuredFeatures?.includes(feature.id) || 
        ['LUSOMATCH', 'LUSOSTREAM', 'LUSORIDE', 'LUSOCHAT'].includes(feature.id)
      );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  if (variant === 'grid') {
    return (
      <motion.div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedFeatures.map((feature) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group"
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Feature Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: `${feature.colors.primary}15`,
                      color: feature.colors.primary 
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Feature Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.name}
                  </h3>

                  {/* Feature Tagline */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {feature.tagline}
                  </p>

                  {/* Stats */}
                  <p className="text-xs font-medium text-primary-600 mb-4">
                    {feature.stats[language]}
                  </p>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: feature.colors.primary }}
                    >
                      {feature.cta}
                    </span>
                    <ArrowRightIcon 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      style={{ color: feature.colors.primary }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div 
        className={`space-y-4 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedFeatures.map((feature) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover="hover"
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
                  {/* Feature Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: `${feature.colors.primary}15`,
                      color: feature.colors.primary 
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Feature Name & Stats */}
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {feature.name}
                      </h4>
                      <span className="text-xs font-medium text-primary-600 ml-2">
                        {feature.stats[language]}
                      </span>
                    </div>

                    {/* Feature Tagline */}
                    <p className="text-gray-600 text-sm truncate">
                      {feature.tagline}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRightIcon 
                    className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Default carousel variant
  return (
    <motion.div 
      className={`flex gap-6 overflow-x-auto pb-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {displayedFeatures.map((feature) => {
        const IconComponent = feature.icon;
        
        return (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            whileHover="hover"
            className="flex-shrink-0 w-64"
          >
            <Link href={feature.href}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Feature Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: `${feature.colors.primary}15`,
                    color: feature.colors.primary 
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Feature Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.name}
                </h3>

                {/* Feature Tagline */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {feature.tagline}
                </p>

                {/* Stats */}
                <p className="text-xs font-medium text-primary-600">
                  {feature.stats[language]}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}