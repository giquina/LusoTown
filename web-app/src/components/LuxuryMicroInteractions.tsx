"use client";

import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Heart, Star, Share2, Bookmark, ThumbsUp, Eye, Crown } from "lucide-react";

// Luxury Button Component with Premium Micro-interactions
interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "premium" | "elite";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LuxuryButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: LuxuryButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl",
    secondary: "bg-white border-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 shadow-md hover:shadow-lg",
    premium: "bg-gradient-to-r from-premium-500 to-premium-600 text-white hover:from-premium-600 hover:to-premium-700 shadow-xl hover:shadow-2xl",
    elite: "bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 shadow-2xl hover:shadow-3xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-xl font-semibold transition-all duration-300
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        focus:outline-none focus:ring-4 focus:ring-primary-200
      `}
    >
      {/* Shimmer effect for premium variants */}
      {(variant === "premium" || variant === "elite") && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
          }}
          initial={{ width: 20, height: 20, opacity: 0.8 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        )}
        {children}
      </span>

      {/* Elite crown indicator */}
      {variant === "elite" && (
        <Crown className="absolute top-1 right-1 w-4 h-4 text-yellow-200" />
      )}
    </motion.button>
  );
}

// Luxury Reaction Button with Sophisticated Animations
interface LuxuryReactionProps {
  icon: React.ReactNode;
  count: number;
  isActive: boolean;
  onToggle: () => void;
  label: string;
  variant?: "heart" | "star" | "bookmark" | "share" | "like" | "view";
}

export function LuxuryReaction({
  icon,
  count,
  isActive,
  onToggle,
  label,
  variant = "heart",
}: LuxuryReactionProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    heart: "text-red-500",
    star: "text-yellow-500",
    bookmark: "text-blue-500",
    share: "text-green-500",
    like: "text-purple-500",
    view: "text-gray-500",
  };

  const handleClick = () => {
    // Create particle burst effect
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
    }, 1000);
    
    onToggle();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
      aria-label={label}
    >
      {/* Particle effects */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full ${colors[variant]} opacity-70`}
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0],
            opacity: [0.7, 1, 0],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Icon container */}
      <motion.div
        animate={{
          scale: isActive ? 1.2 : 1,
          rotate: isActive ? [0, -10, 10, 0] : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative ${isActive ? colors[variant] : "text-gray-400 group-hover:text-gray-600"}`}
      >
        {icon}
        
        {/* Pulse effect when active */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 ${colors[variant]} opacity-20 rounded-full`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.div>

      {/* Count */}
      <motion.span
        animate={{ scale: isHovered ? 1.1 : 1 }}
        className="text-sm font-medium text-gray-600 group-hover:text-gray-800"
      >
        {count.toLocaleString()}
      </motion.span>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Luxury Card with Premium Hover Effects
interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "standard" | "premium" | "elite";
  hoverable?: boolean;
  glowEffect?: boolean;
}

export function LuxuryCard({
  children,
  className = "",
  variant = "standard",
  hoverable = true,
  glowEffect = false,
}: LuxuryCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const variants = {
    standard: "bg-white border border-gray-200 shadow-md hover:shadow-lg",
    premium: "bg-gradient-to-br from-white to-gray-50 border border-premium-200 shadow-lg hover:shadow-xl",
    elite: "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-xl hover:shadow-2xl",
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative rounded-2xl p-6 transition-all duration-300 overflow-hidden
        ${variants[variant]} ${className}
      `}
    >
      {/* Glow effect */}
      {glowEffect && isHovered && (
        <div
          className="absolute inset-0 opacity-20 blur-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #059669, transparent 70%)`,
          }}
        />
      )}

      {/* Shine effect */}
      {variant !== "standard" && isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            transform: `translateX(${mousePosition.x - 50}%)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Elite badge */}
      {variant === "elite" && (
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-2 rounded-full shadow-lg"
          >
            <Crown className="w-4 h-4" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// Luxury Loading Dots
export function LuxuryLoadingDots({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className={`${sizes[size]} bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Luxury Progress Bar
interface LuxuryProgressProps {
  progress: number;
  variant?: "standard" | "premium" | "elite";
  showPercentage?: boolean;
  animated?: boolean;
}

export function LuxuryProgress({
  progress,
  variant = "standard",
  showPercentage = true,
  animated = true,
}: LuxuryProgressProps) {
  const variants = {
    standard: "from-primary-500 to-secondary-500",
    premium: "from-premium-500 to-premium-600",
    elite: "from-amber-400 via-yellow-500 to-orange-500",
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        {showPercentage && (
          <motion.span
            key={progress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold text-gray-900"
          >
            {Math.round(progress)}%
          </motion.span>
        )}
      </div>
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`h-full bg-gradient-to-r ${variants[variant]} relative`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={animated ? { type: "spring", stiffness: 100, damping: 20 } : { duration: 0 }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}