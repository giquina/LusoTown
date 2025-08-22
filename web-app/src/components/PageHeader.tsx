"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { SparklesIcon } from '@heroicons/react/24/outline';

export interface PageHeaderProps {
  /**
   * Main title of the page
   */
  title: string;
  /**
   * Portuguese translation of the title
   */
  titlePt?: string;
  /**
   * Subtitle/description
   */
  subtitle?: string;
  /**
   * Portuguese translation of the subtitle
   */
  subtitlePt?: string;
  /**
   * Badge text (appears above title)
   */
  badge?: string;
  /**
   * Portuguese translation of the badge
   */
  badgePt?: string;
  /**
   * Color theme for the header
   */
  theme?: 'primary' | 'secondary' | 'accent' | 'premium' | 'coral';
  /**
   * Background style
   */
  background?: 'gradient' | 'solid' | 'minimal';
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Optional icon component
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Custom CSS classes
   */
  className?: string;
  /**
   * Show decorative elements
   */
  showDecorations?: boolean;
  /**
   * Children elements to render below the header content
   */
  children?: React.ReactNode;
}

const themeClasses = {
  primary: {
    gradient: 'from-primary-600 via-secondary-600 to-accent-600',
    background: 'from-primary-50 via-white to-secondary-50',
    badge: 'from-primary-100 to-secondary-100 text-primary-700',
    title: 'from-primary-600 to-secondary-600',
    decorations: 'from-primary-200 to-secondary-200',
  },
  secondary: {
    gradient: 'from-secondary-600 via-accent-600 to-coral-600',
    background: 'from-secondary-50 via-white to-accent-50',
    badge: 'from-secondary-100 to-accent-100 text-secondary-700',
    title: 'from-secondary-600 to-accent-600',
    decorations: 'from-secondary-200 to-accent-200',
  },
  accent: {
    gradient: 'from-accent-600 via-coral-600 to-primary-600',
    background: 'from-accent-50 via-white to-coral-50',
    badge: 'from-accent-100 to-coral-100 text-accent-700',
    title: 'from-accent-600 to-coral-600',
    decorations: 'from-accent-200 to-coral-200',
  },
  premium: {
    gradient: 'from-premium-600 via-primary-600 to-secondary-600',
    background: 'from-premium-50 via-white to-primary-50',
    badge: 'from-premium-100 to-primary-100 text-premium-700',
    title: 'from-premium-600 to-primary-600',
    decorations: 'from-premium-200 to-primary-200',
  },
  coral: {
    gradient: 'from-coral-600 via-accent-600 to-secondary-600',
    background: 'from-coral-50 via-white to-accent-50',
    badge: 'from-coral-100 to-accent-100 text-coral-700',
    title: 'from-coral-600 to-accent-600',
    decorations: 'from-coral-200 to-accent-200',
  },
};

const sizeClasses = {
  sm: {
    container: 'py-12',
    title: 'text-2xl md:text-3xl',
    subtitle: 'text-base',
    badge: 'text-sm px-3 py-2',
    icon: 'w-5 h-5',
  },
  md: {
    container: 'py-16',
    title: 'text-3xl md:text-4xl',
    subtitle: 'text-lg',
    badge: 'text-sm px-4 py-2',
    icon: 'w-6 h-6',
  },
  lg: {
    container: 'py-20',
    title: 'text-4xl md:text-5xl',
    subtitle: 'text-xl',
    badge: 'text-sm px-4 py-2',
    icon: 'w-6 h-6',
  },
  xl: {
    container: 'py-24',
    title: 'text-5xl md:text-6xl',
    subtitle: 'text-xl md:text-2xl',
    badge: 'text-base px-5 py-3',
    icon: 'w-7 h-7',
  },
};

function PageHeader({
  title,
  titlePt,
  subtitle,
  subtitlePt,
  badge,
  badgePt,
  theme = 'primary',
  background = 'gradient',
  size = 'lg',
  icon: IconComponent,
  className = '',
  showDecorations = true,
  children,
}: PageHeaderProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  
  const themeStyles = themeClasses[theme];
  const sizeStyles = sizeClasses[size];
  
  const finalTitle = isPortuguese && titlePt ? titlePt : title;
  const finalSubtitle = isPortuguese && subtitlePt ? subtitlePt : subtitle;
  const finalBadge = isPortuguese && badgePt ? badgePt : badge;

  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return `bg-gradient-to-br ${themeStyles.background}`;
      case 'solid':
        return `bg-gradient-to-r ${themeStyles.gradient}`;
      case 'minimal':
        return 'bg-white';
      default:
        return `bg-gradient-to-br ${themeStyles.background}`;
    }
  };

  return (
    <section className={`relative ${sizeStyles.container} overflow-hidden ${getBackgroundClass()} ${className}`}>
      {/* Decorative Elements */}
      {showDecorations && background !== 'minimal' && (
        <>
          {/* Subtle Pattern Background */}
          <div className="absolute inset-0 opacity-40">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23058B49' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r ${themeStyles.decorations} rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30`} />
            <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r ${themeStyles.decorations} rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30`} />
          </div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          {finalBadge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${themeStyles.badge} ${sizeStyles.badge} font-bold rounded-full shadow-lg`}>
                {IconComponent && <IconComponent className={sizeStyles.icon} />}
                {!IconComponent && <SparklesIcon className={sizeStyles.icon} />}
                {finalBadge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className={`${sizeStyles.title} font-bold bg-gradient-to-r ${themeStyles.title} bg-clip-text text-transparent leading-tight`}>
              {finalTitle}
            </h1>
          </motion.div>

          {/* Subtitle */}
          {finalSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <p className={`${sizeStyles.subtitle} text-gray-700 leading-relaxed max-w-3xl mx-auto`}>
                {finalSubtitle}
              </p>
            </motion.div>
          )}

          {/* Children */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Export both default and named export
export default PageHeader
export { PageHeader }