"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  SparklesIcon, 
  StarIcon,
  CrownIcon,
  DiamondIcon,
  TrophyIcon,
  FireIcon,
  BoltIcon,
  HeartIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

// Elite Mobile Card Component with Premium Interactions
interface EliteMobileCardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'premium' | 'platinum' | 'elite';
  size?: 'compact' | 'standard' | 'expanded';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  badge?: string;
  corner?: 'standard' | 'portuguese' | 'elite';
}

export function EliteMobileCard({
  children,
  variant = 'premium',
  size = 'standard',
  hover = true,
  onClick,
  className = '',
  badge,
  corner = 'portuguese'
}: EliteMobileCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useHeritage();

  const variants = {
    standard: 'bg-white border-gray-200',
    premium: 'bg-gradient-to-br from-white via-red-50/20 to-green-50/20 border-red-200/30',
    platinum: 'bg-gradient-to-br from-slate-50 via-amber-50/30 to-white border-amber-200/40',
    elite: 'bg-gradient-to-br from-gray-900 via-red-900/20 to-green-900/20 border-amber-400/30 text-white'
  };

  const sizes = {
    compact: 'p-4 rounded-xl',
    standard: 'p-6 rounded-2xl',
    expanded: 'p-8 rounded-3xl'
  };

  const cornerAccents = {
    standard: '',
    portuguese: 'after:bg-gradient-to-r after:from-red-600 after:via-amber-400 after:to-green-600',
    elite: 'after:bg-gradient-to-r after:from-amber-400 after:via-yellow-300 after:to-amber-500'
  };

  return (
    <motion.div
      className={`
        luxury-card relative overflow-hidden border-2 transition-all duration-500
        ${variants[variant]} ${sizes[size]} ${className}
        ${corner !== 'standard' ? `after:absolute after:top-0 after:right-0 after:w-16 after:h-1 after:rounded-bl-lg ${  cornerAccents[corner]}` : ''}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      style={{
        '--heritage-primary': colors.primary,
        '--heritage-secondary': colors.secondary,
      } as React.CSSProperties}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: variant === 'elite' 
          ? '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.2)'
          : '0 25px 50px rgba(197,40,47,0.15), 0 0 0 1px rgba(197,40,47,0.1)'
      } : undefined}
      whileTap={{ scale: 0.98, y: -4 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {badge && (
        <motion.div
          className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-bold rounded-full z-10 ${
            variant === 'elite' 
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black'
              : 'bg-gradient-to-r from-red-600 to-green-600 text-white'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        >
          {badge}
        </motion.div>
      )}
      
      <motion.div
        animate={isPressed ? { scale: 0.98 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>

      {/* Premium shimmer effect */}
      {(variant === 'premium' || variant === 'elite') && (
        <div className="absolute inset-0 -rotate-45 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 hover:animate-none hover:opacity-100 hover:translate-x-[100%] transition-all duration-1000" />
      )}
    </motion.div>
  );
}

// Premium Mobile Action Button with Portuguese Theming
interface LuxuryMobileButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'heritage' | 'elite' | 'platinum';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  haptic?: 'light' | 'medium' | 'heavy';
}

export function LuxuryMobileButton({
  children,
  variant = 'heritage',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
  haptic = 'medium'
}: LuxuryMobileButtonProps) {
  const { language } = useLanguage();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: 'bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white shadow-lg',
    secondary: 'bg-white/90 backdrop-blur-md text-slate-700 border-2 border-slate-200 shadow-md',
    heritage: 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-xl',
    elite: 'bg-gradient-to-r from-gray-900 via-amber-900/50 to-black text-amber-100 shadow-2xl border border-amber-400/30',
    platinum: 'bg-gradient-to-r from-slate-200 via-white to-slate-100 text-slate-800 shadow-xl border-2 border-slate-300'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px] rounded-lg',
    md: 'px-6 py-3 text-base min-h-[48px] rounded-xl',
    lg: 'px-8 py-4 text-lg min-h-[56px] rounded-2xl',
    xl: 'px-10 py-5 text-xl min-h-[64px] rounded-3xl'
  };

  const triggerHaptic = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.classList.add(`luxury-haptic-${haptic}`);
      setTimeout(() => {
        buttonRef.current?.classList.remove(`luxury-haptic-${haptic}`);
      }, 200);
    }
  }, [haptic]);

  const handleClick = () => {
    if (!disabled && !loading) {
      triggerHaptic();
      onClick?.();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden font-bold transition-all duration-300 transform-gpu
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : 'min-w-[120px]'}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        focus:outline-none focus:ring-4 focus:ring-red-500/20
      `}
      whileHover={!disabled && !loading ? { 
        scale: 1.05, 
        y: -2,
        boxShadow: variant === 'elite' 
          ? '0 20px 40px rgba(0,0,0,0.3)'
          : '0 20px 40px rgba(197,40,47,0.25)'
      } : undefined}
      whileTap={{ scale: 0.95, y: 0 }}
      onClick={handleClick}
      disabled={disabled || loading}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="flex items-center justify-center gap-3"
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {loading ? (
          <motion.div
            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : icon ? (
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>
        ) : null}
        <span>{children}</span>
      </motion.div>

      {/* Premium button glow effect */}
      {(variant === 'heritage' || variant === 'elite') && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: "200%" }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.button>
  );
}

// Elite Mobile Input with Portuguese Styling
interface LuxuryMobileInputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'premium' | 'elite';
}

export function LuxuryMobileInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
  variant = 'premium'
}: LuxuryMobileInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { language } = useLanguage();

  const variants = {
    standard: 'bg-white border-gray-300 focus:border-red-500 focus:ring-red-500/20',
    premium: 'bg-gradient-to-br from-white via-red-50/10 to-white border-red-200 focus:border-red-600 focus:ring-red-600/20',
    elite: 'bg-gradient-to-br from-gray-900 to-black text-white border-amber-400/30 focus:border-amber-400 focus:ring-amber-400/20'
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      layout
    >
      {label && (
        <motion.label
          className={`block text-sm font-semibold mb-2 ${
            variant === 'elite' ? 'text-amber-100' : 'text-gray-700'
          }`}
          animate={isFocused || value ? { 
            scale: 1.05, 
            color: variant === 'elite' ? '#fbbf24' : '#dc2626' 
          } : { scale: 1 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <motion.div 
        className="relative"
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon && (
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            variant === 'elite' ? 'text-amber-400' : 'text-red-500'
          }`}>
            {icon}
          </div>
        )}
        
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`
            luxury-input w-full transition-all duration-300
            ${variants[variant]}
            ${icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-2xl
            min-h-[56px] text-base font-medium
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:ring-4 focus:outline-none
            placeholder:text-gray-400
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ y: -2 }}
        />

        {/* Premium focus indicator */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className={`absolute inset-0 rounded-2xl pointer-events-none ${
                variant === 'elite' 
                  ? 'bg-gradient-to-r from-amber-400/10 to-yellow-400/10'
                  : 'bg-gradient-to-r from-red-500/10 to-green-500/10'
              }`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <motion.div
          className="flex items-center mt-2 text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// Premium Mobile Quick Actions Menu
interface QuickActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'heritage';
    badge?: number;
  }>;
  className?: string;
}

export function QuickActionsMenu({
  isOpen,
  onClose,
  actions,
  className = ''
}: QuickActionsMenuProps) {
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-gray-200 p-6">
              {/* Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}
                </h3>
                <p className="text-gray-600">
                  {language === 'pt' 
                    ? 'Escolha uma ação para a comunidade portuguesa' 
                    : 'Choose an action for the Portuguese community'}
                </p>
              </div>
              
              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {actions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EliteMobileCard
                      variant={action.variant === 'heritage' ? 'premium' : 'standard'}
                      size="compact"
                      onClick={() => {
                        action.onClick();
                        onClose();
                      }}
                      badge={action.badge ? `${action.badge}` : undefined}
                      className="h-full"
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          action.variant === 'heritage' 
                            ? 'bg-gradient-to-br from-red-500 to-green-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {action.icon}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {action.label}
                        </span>
                      </div>
                    </EliteMobileCard>
                  </motion.div>
                ))}
              </div>
              
              {/* Safe area spacing */}
              <div className="h-6" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Premium Status Indicator for Portuguese Community Features
interface LuxuryStatusIndicatorProps {
  status: 'online' | 'busy' | 'away' | 'offline' | 'premium' | 'elite';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  pulse?: boolean;
  className?: string;
}

export function LuxuryStatusIndicator({
  status,
  size = 'md',
  showLabel = false,
  pulse = false,
  className = ''
}: LuxuryStatusIndicatorProps) {
  const { language } = useLanguage();

  const statusConfig = {
    online: { color: 'bg-green-500', label: language === 'pt' ? 'Online' : 'Online' },
    busy: { color: 'bg-red-500', label: language === 'pt' ? 'Ocupado' : 'Busy' },
    away: { color: 'bg-yellow-500', label: language === 'pt' ? 'Ausente' : 'Away' },
    offline: { color: 'bg-gray-400', label: language === 'pt' ? 'Offline' : 'Offline' },
    premium: { color: 'bg-gradient-to-r from-amber-400 to-yellow-500', label: language === 'pt' ? 'Premium' : 'Premium' },
    elite: { color: 'bg-gradient-to-r from-purple-600 to-pink-600', label: language === 'pt' ? 'Elite' : 'Elite' }
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`${sizes[size]} ${config.color} rounded-full relative ${
          pulse ? 'animate-pulse' : ''
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {(status === 'premium' || status === 'elite') && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
      
      {showLabel && (
        <span className="text-xs font-medium text-gray-600">
          {config.label}
        </span>
      )}
    </div>
  );
}

export default {
  EliteMobileCard,
  LuxuryMobileButton,
  LuxuryMobileInput,
  QuickActionsMenu,
  LuxuryStatusIndicator
};