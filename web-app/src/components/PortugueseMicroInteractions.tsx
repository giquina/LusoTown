"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  ShareIcon, 
  BookmarkIcon, 
  StarIcon,
  SparklesIcon,
  FireIcon,
  EyeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Portuguese Flag Animation Component
export const PortugueseFlagWave = ({ 
  size = 'w-6 h-4',
  className = '',
  animate = true 
}: { 
  size?: string;
  className?: string;
  animate?: boolean;
}) => (
  <motion.div
    className={`${size} rounded-sm overflow-hidden ${className}`}
    animate={animate ? {
      scale: [1, 1.05, 1],
      rotateY: [0, 10, 0, -10, 0],
    } : {}}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="relative w-full h-full bg-gradient-to-r from-green-500 via-green-500 to-red-500">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={animate ? {
          x: ['-100%', '100%'],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  </motion.div>
);

// Heart Animation with Portuguese Colors
export const PortugueseHeartButton = ({
  isLiked = false,
  onToggle,
  size = 'w-6 h-6',
  className = '',
  showCount = false,
  count = 0,
}: {
  isLiked?: boolean;
  onToggle?: () => void;
  size?: string;
  className?: string;
  showCount?: boolean;
  count?: number;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = () => {
    if (onToggle) onToggle();
    
    if (!isLiked) {
      setIsAnimating(true);
      
      // Create heart particles
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
      }));
      setParticles(newParticles);

      setTimeout(() => {
        setIsAnimating(false);
        setParticles([]);
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={`relative ${className} touch-manipulation`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={isLiked ? {
            scale: [1, 1.3, 1],
          } : {}}
          transition={{ duration: 0.3 }}
        >
          {isLiked ? (
            <HeartSolidIcon className={`${size} text-red-500`} />
          ) : (
            <HeartIcon className={`${size} text-gray-400 hover:text-red-400 transition-colors`} />
          )}
        </motion.div>

        {/* Animated Ring */}
        {isAnimating && (
          <motion.div
            className="absolute inset-0 border-2 border-red-400 rounded-full"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Heart Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 1,
              }}
              animate={{ 
                x: particle.x,
                y: particle.y,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <HeartSolidIcon className="w-3 h-3 text-red-500" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.button>

      {/* Count */}
      {showCount && count > 0 && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {count > 99 ? '99+' : count}
        </motion.div>
      )}
    </div>
  );
};

// Save Button with Portuguese Theme
export const PortugueseSaveButton = ({
  isSaved = false,
  onToggle,
  size = 'w-6 h-6',
  className = '',
}: {
  isSaved?: boolean;
  onToggle?: () => void;
  size?: string;
  className?: string;
}) => (
  <motion.button
    onClick={onToggle}
    className={`${className} touch-manipulation`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      animate={isSaved ? {
        y: [0, -4, 0],
      } : {}}
      transition={{ duration: 0.4, type: "spring" }}
    >
      {isSaved ? (
        <BookmarkSolidIcon className={`${size} text-green-600`} />
      ) : (
        <BookmarkIcon className={`${size} text-gray-400 hover:text-green-500 transition-colors`} />
      )}
    </motion.div>
  </motion.button>
);

// Rating Stars with Portuguese Colors
export const PortugueseStarRating = ({
  rating = 0,
  maxRating = 5,
  onRate,
  readonly = false,
  size = 'w-5 h-5',
  className = '',
}: {
  rating?: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: string;
  className?: string;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoverRating || rating);

        return (
          <motion.button
            key={index}
            onClick={() => !readonly && onRate && onRate(starValue)}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer'} touch-manipulation`}
            whileHover={!readonly ? { scale: 1.2 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            disabled={readonly}
          >
            <motion.div
              animate={isActive ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 0.2 }}
            >
              {isActive ? (
                <StarSolidIcon className={`${size} text-yellow-500`} />
              ) : (
                <StarIcon className={`${size} text-gray-300`} />
              )}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
};

// Floating Action Button with Portuguese Theme
export const PortugueseFAB = ({
  icon,
  onClick,
  position = 'bottom-right',
  className = '',
  label,
  Portuguese = true,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  label?: string;
  Portuguese?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-20 right-6',
    'top-left': 'fixed top-20 left-6',
  };

  return (
    <div className={`${positionClasses[position]} z-50 ${className}`}>
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white font-bold ${
          Portuguese 
            ? 'bg-gradient-to-r from-green-500 to-red-500' 
            : 'bg-blue-500'
        } hover:shadow-3xl transition-all duration-200 touch-manipulation`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </motion.button>

      {/* Label */}
      <AnimatePresence>
        {label && isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
          >
            {label}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Ripple Effect for Portuguese Theme
export const PortugueseRippleButton = ({
  children,
  onClick,
  className = '',
  Portuguese = true,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  Portuguese?: boolean;
  disabled?: boolean;
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'touch-manipulation'
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
    >
      {children}

      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className={`absolute rounded-full pointer-events-none ${
              Portuguese 
                ? 'bg-gradient-to-r from-green-400/30 to-red-400/30' 
                : 'bg-white/30'
            }`}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{
              width: 0,
              height: 0,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              width: 300,
              height: 300,
              opacity: [0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

// Activity Indicator with Portuguese Theme
export const PortugueseActivityIndicator = ({
  count = 0,
  label,
  icon,
  className = '',
  animate = true,
}: {
  count?: number;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  return (
    <motion.div
      className={`flex items-center gap-2 bg-gradient-to-r from-green-50 to-red-50 border border-green-200 rounded-full px-3 py-2 ${className}`}
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div
          animate={animate ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.div
        className="w-2 h-2 bg-green-500 rounded-full"
        animate={animate ? {
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
      
      <span className="text-sm font-medium text-gray-700">
        <motion.span
          key={count}
          initial={animate ? { y: -10, opacity: 0 } : {}}
          animate={animate ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.2 }}
          className="font-bold text-green-600"
        >
          {count}
        </motion.span>
        {label && ` ${label}`}
      </span>
    </motion.div>
  );
};

// Completion Celebration Animation
export const PortugueseCompletionCelebration = ({
  show = false,
  message,
  onComplete,
}: {
  show?: boolean;
  message?: string;
  onComplete?: () => void;
}) => {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const defaultMessage = isPortuguese 
    ? '🎉 Parabéns! Evento guardado com sucesso!'
    : '🎉 Congratulations! Event saved successfully!';

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-x-4 top-20 z-50 flex justify-center"
        >
          <div className="bg-gradient-to-r from-green-500 to-red-500 text-white rounded-2xl p-6 shadow-2xl max-w-sm">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: 2,
                }}
              >
                <SparklesIcon className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <div>
                <div className="font-bold mb-1">
                  {message || defaultMessage}
                </div>
                <PortugueseFlagWave size="w-8 h-5" animate={true} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export {
  PortugueseFlagWave,
  PortugueseHeartButton,
  PortugueseSaveButton,
  PortugueseStarRating,
  PortugueseFAB,
  PortugueseRippleButton,
  PortugueseActivityIndicator,
  PortugueseCompletionCelebration,
};