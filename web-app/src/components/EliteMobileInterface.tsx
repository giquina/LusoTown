"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  GlobeEuropeAfricaIcon,
  SparklesIcon,
  CrownIcon,
  HeartIcon,
  StarIcon,
  FireIcon,
  TrophyIcon,
  GemIcon
} from '@heroicons/react/24/outline';
import { 
  BellIcon as BellSolidIcon,
  HeartIcon as HeartSolidIcon 
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { LuxuryRipple, LuxuryFAB, LuxuryModal } from './LuxuryMobileInteraction';

// Elite Mobile Header with Premium Portuguese Theming
interface EliteMobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showProfile?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotifications?: () => void;
  onProfile?: () => void;
  transparent?: boolean;
  premium?: boolean;
  className?: string;
}

export function EliteMobileHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  showProfile = true,
  showNotifications = true,
  notificationCount = 0,
  onNotifications,
  onProfile,
  transparent = false,
  premium = true,
  className = ''
}: EliteMobileHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, t } = useLanguage();
  const { colors } = useHeritage();
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [transparent ? 0.95 : 1, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 20]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${premium 
          ? 'bg-gradient-to-r from-white/95 via-red-50/90 to-green-50/90' 
          : 'bg-white/95'
        }
        ${isScrolled ? 'shadow-xl border-b border-red-200/30' : 'shadow-lg'}
        ${className}
      `}
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
        '--heritage-primary': colors.primary,
        '--heritage-secondary': colors.secondary,
      } as React.CSSProperties}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Premium background pattern */}
      {premium && (
        <div className="absolute inset-0 bg-[url('/patterns/portuguese-tile.svg')] opacity-5" />
      )}
      
      <div className="relative px-4 py-3 pt-safe-top">
        <div className="flex items-center justify-between min-h-[56px]">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {showBack && (
              <LuxuryRipple
                onClick={onBack}
                className="p-3 rounded-xl bg-white/80 shadow-md"
                hapticFeedback="light"
              >
                <ChevronDownIcon className="w-6 h-6 text-gray-700 rotate-90" />
              </LuxuryRipple>
            )}
            
            <div className="flex-1">
              {title && (
                <motion.h1 
                  className={`text-xl font-bold ${
                    premium 
                      ? 'bg-gradient-to-r from-red-700 via-red-600 to-green-600 bg-clip-text text-transparent'
                      : 'text-gray-900'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {title}
                </motion.h1>
              )}
              {subtitle && (
                <motion.p 
                  className="text-sm text-gray-600 mt-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {showNotifications && (
              <LuxuryRipple
                onClick={onNotifications}
                className="relative p-3 rounded-xl bg-white/80 shadow-md"
                hapticFeedback="medium"
              >
                {notificationCount > 0 ? (
                  <BellSolidIcon className="w-6 h-6 text-red-600" />
                ) : (
                  <BellIcon className="w-6 h-6 text-gray-700" />
                )}
                
                {notificationCount > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </motion.div>
                )}
              </LuxuryRipple>
            )}
            
            {showProfile && (
              <LuxuryRipple
                onClick={onProfile}
                className="p-3 rounded-xl bg-white/80 shadow-md"
                hapticFeedback="medium"
              >
                <UserCircleIcon className="w-6 h-6 text-gray-700" />
              </LuxuryRipple>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Premium Mobile Search Interface
interface EliteMobileSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  suggestions?: string[];
  showFilters?: boolean;
  onFilters?: () => void;
  premium?: boolean;
  className?: string;
}

export function EliteMobileSearch({
  placeholder,
  value = '',
  onChange,
  onSearch,
  suggestions = [],
  showFilters = true,
  onFilters,
  premium = true,
  className = ''
}: EliteMobileSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { language, t } = useLanguage();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((searchValue: string) => {
    onSearch?.(searchValue);
    setShowSuggestions(false);
    searchRef.current?.blur();
  }, [onSearch]);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 5);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300
          ${premium 
            ? 'bg-gradient-to-r from-white via-red-50/20 to-green-50/20 border-2 border-red-200/30'
            : 'bg-white border border-gray-200'
          }
          ${isFocused ? 'shadow-2xl scale-102' : ''}
        `}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-center p-4">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0" />
          
          <input
            ref={searchRef}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(value);
              }
            }}
            placeholder={placeholder || (language === 'pt' ? 'Procurar na comunidade portuguesa...' : 'Search Portuguese community...')}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base"
          />
          
          {showFilters && (
            <LuxuryRipple
              onClick={onFilters}
              className="p-2 rounded-lg ml-2"
              hapticFeedback="light"
            >
              <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
            </LuxuryRipple>
          )}
        </div>

        {/* Premium search glow effect */}
        {premium && isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-green-500/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-10 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                className="px-4 py-3 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSearch(suggestion)}
                whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center">
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Elite Mobile Content Card with Portuguese Cultural Elements
interface EliteContentCardProps {
  title: string;
  description?: string;
  image?: string;
  category?: string;
  author?: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  tags?: string[];
  premium?: boolean;
  heritage?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  liked?: boolean;
  className?: string;
}

export function EliteContentCard({
  title,
  description,
  image,
  category,
  author,
  stats,
  tags = [],
  premium = false,
  heritage = false,
  onClick,
  onLike,
  onShare,
  liked = false,
  className = ''
}: EliteContentCardProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const { language } = useLanguage();

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <motion.div
      className={`
        relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer
        ${heritage ? 'border-2 border-red-200/50' : 'border border-gray-200'}
        ${className}
      `}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Premium indicator */}
      {premium && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-black text-xs font-bold rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CrownIcon className="w-3 h-3" />
            {language === 'pt' ? 'PREMIUM' : 'PREMIUM'}
          </motion.div>
        </div>
      )}

      {/* Heritage indicator */}
      {heritage && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-600 to-green-600 text-white text-xs font-bold rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlobeEuropeAfricaIcon className="w-3 h-3" />
            🇵🇹
          </motion.div>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {category && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full">
                {category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Author and Stats */}
        <div className="flex items-center justify-between">
          {author && (
            <div className="flex items-center gap-3">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xs font-semibold">
                    {author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900">
                    {author.name}
                  </span>
                  {author.verified && (
                    <StarIcon className="w-4 h-4 text-blue-500 fill-current" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {onLike && (
              <LuxuryRipple
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg"
                hapticFeedback="light"
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-500" />
                )}
                {stats?.likes && (
                  <span className="text-sm text-gray-600">
                    {stats.likes + (isLiked && !liked ? 1 : 0)}
                  </span>
                )}
              </LuxuryRipple>
            )}

            {onShare && (
              <LuxuryRipple
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                className="p-2 rounded-lg"
                hapticFeedback="light"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </LuxuryRipple>
            )}
          </div>
        </div>
      </div>

      {/* Premium shimmer effect */}
      {(premium || heritage) && (
        <div className="absolute inset-0 -rotate-45 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent hover:translate-x-[100%] transition-transform duration-1000" />
      )}
    </motion.div>
  );
}

export default {
  EliteMobileHeader,
  EliteMobileSearch,
  EliteContentCard
};