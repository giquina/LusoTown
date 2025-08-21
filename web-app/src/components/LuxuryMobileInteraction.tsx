"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

// Luxury Touch Ripple Effect Component
interface LuxuryRippleProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  rippleColor?: string;
  onClick?: () => void;
  hapticFeedback?: 'light' | 'medium' | 'heavy';
}

export function LuxuryRipple({ 
  children, 
  className = '', 
  disabled = false, 
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  onClick,
  hapticFeedback = 'light'
}: LuxuryRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const rippleRef = useRef<HTMLDivElement>(null);

  const triggerHaptic = useCallback((type: string) => {
    // Simulate haptic feedback with CSS animation classes
    if (rippleRef.current) {
      rippleRef.current.classList.add(`luxury-haptic-${type}`);
      setTimeout(() => {
        rippleRef.current?.classList.remove(`luxury-haptic-${type}`);
      }, 200);
    }
  }, []);

  const createRipple = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (disabled || !rippleRef.current) return;

    const rect = rippleRef.current.getBoundingClientRect();
    
    // Handle both mouse and touch events
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x: x - size / 2,
      y: y - size / 2,
      size
    };

    setRipples(prev => [...prev, newRipple]);
    triggerHaptic(hapticFeedback);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  }, [disabled, onClick, hapticFeedback, triggerHaptic]);

  return (
    <div
      ref={rippleRef}
      className={`luxury-touch-target relative overflow-hidden ${className}`}
      onMouseDown={createRipple}
      onTouchStart={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        />
      ))}
    </div>
  );
}

// Premium Swipe Gesture Component
interface LuxurySwipeProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
  className?: string;
}

export function LuxurySwipe({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 100,
  className = ''
}: LuxurySwipeProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragX = useSpring(0, { stiffness: 300, damping: 30 });
  const dragY = useSpring(0, { stiffness: 300, damping: 30 });

  const opacity = useTransform(dragX, [-200, 0, 200], [0.6, 1, 0.6]);
  const scale = useTransform(dragX, [-100, 0, 100], [0.95, 1, 0.95]);

  const handleDragStart = (event: any) => {
    setIsPressed(true);
    const clientX = event.clientX || event.touches?.[0]?.clientX || 0;
    const clientY = event.clientY || event.touches?.[0]?.clientY || 0;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragEnd = (event: any) => {
    if (!isPressed) return;
    
    setIsPressed(false);
    const clientX = event.clientX || event.changedTouches?.[0]?.clientX || 0;
    const clientY = event.clientY || event.changedTouches?.[0]?.clientY || 0;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    // Reset position
    dragX.set(0);
    dragY.set(0);

    // Trigger swipe actions
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > swipeThreshold && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < -swipeThreshold && onSwipeLeft) {
        onSwipeLeft();
      }
    } else {
      if (deltaY > swipeThreshold && onSwipeDown) {
        onSwipeDown();
      } else if (deltaY < -swipeThreshold && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  const handleDrag = (event: any) => {
    if (!isPressed) return;
    
    const clientX = event.clientX || event.touches?.[0]?.clientX || 0;
    const clientY = event.clientY || event.touches?.[0]?.clientY || 0;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    dragX.set(deltaX * 0.5); // Dampen the movement
    dragY.set(deltaY * 0.5);
  };

  return (
    <motion.div
      className={`luxury-swipe-container ${className}`}
      style={{ 
        x: dragX, 
        y: dragY, 
        opacity, 
        scale,
        cursor: isPressed ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Premium Pull-to-Refresh Component
interface LuxuryPullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  disabled?: boolean;
  className?: string;
}

export function LuxuryPullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  disabled = false,
  className = ''
}: LuxuryPullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [canPull, setCanPull] = useState(false);

  const refreshY = useSpring(0, { stiffness: 300, damping: 30 });
  const refreshOpacity = useTransform(refreshY, [0, threshold], [0, 1]);
  const refreshRotation = useTransform(refreshY, [0, threshold], [0, 180]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      setCanPull(true);
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canPull || disabled || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0) {
      e.preventDefault();
      const dampedDistance = Math.min(distance * 0.6, threshold * 1.5);
      setPullDistance(dampedDistance);
      refreshY.set(dampedDistance);
    }
  };

  const handleTouchEnd = async () => {
    if (!canPull || disabled || isRefreshing) return;

    setCanPull(false);
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    refreshY.set(0);
  };

  useEffect(() => {
    if (isRefreshing) {
      refreshY.set(threshold);
    } else {
      refreshY.set(0);
    }
  }, [isRefreshing, refreshY, threshold]);

  return (
    <div 
      className={`luxury-pull-refresh-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="luxury-pull-refresh"
        style={{ y: refreshY, opacity: refreshOpacity }}
      >
        <motion.div
          className="luxury-pull-icon"
          style={{ rotate: refreshRotation }}
        >
          {isRefreshing ? (
            <div className="luxury-loading-spinner" />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 4v6h6" />
              <path d="M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          )}
        </motion.div>
        <span className="text-sm font-medium text-gray-600 ml-2">
          {isRefreshing ? 'Refreshing...' : pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </motion.div>
      {children}
    </div>
  );
}

// Premium Long Press Component
interface LuxuryLongPressProps {
  children: React.ReactNode;
  onLongPress: () => void;
  delay?: number;
  className?: string;
  hapticFeedback?: boolean;
}

export function LuxuryLongPress({
  children,
  onLongPress,
  delay = 500,
  className = '',
  hapticFeedback = true
}: LuxuryLongPressProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();

  const startPress = useCallback(() => {
    if (timerRef.current) return;
    
    setIsPressed(true);
    setProgress(0);

    // Start progress animation
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / delay) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressRef.current!);
      }
    }, 16);

    // Set main timer
    timerRef.current = setTimeout(() => {
      if (hapticFeedback) {
        // Trigger haptic feedback class
        const element = document.querySelector(`.${className}`) as HTMLElement;
        element?.classList.add('luxury-haptic-heavy');
        setTimeout(() => element?.classList.remove('luxury-haptic-heavy'), 200);
      }
      onLongPress();
      endPress();
    }, delay);
  }, [onLongPress, delay, hapticFeedback, className]);

  const endPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = undefined;
    }
    setIsPressed(false);
    setProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
    >
      {children}
      {isPressed && (
        <motion.div
          className="absolute inset-0 border-2 border-red-500 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </div>
  );
}

// Premium Floating Action Button with Portuguese theming
interface LuxuryFABProps {
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  tooltip?: string;
  badge?: number;
}

export function LuxuryFAB({
  icon,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  tooltip,
  badge
}: LuxuryFABProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-red-600 shadow-lg hover:shadow-xl border-2 border-red-100'
  };

  return (
    <LuxuryRipple
      onClick={onClick}
      className={`luxury-fab ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      hapticFeedback="medium"
    >
      <motion.div
        className="relative flex items-center justify-center w-full h-full"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ rotate: isHovered ? 15 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        
        {badge && badge > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {badge > 99 ? '99+' : badge}
          </motion.div>
        )}
        
        {tooltip && isHovered && (
          <motion.div
            className="absolute bottom-full mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
          </motion.div>
        )}
      </motion.div>
    </LuxuryRipple>
  );
}

// Premium Modal with luxury animations
interface LuxuryModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  className?: string;
}

export function LuxuryModal({
  isOpen,
  onClose,
  children,
  title,
  size = 'medium',
  showCloseButton = true,
  className = ''
}: LuxuryModalProps) {
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    fullscreen: 'max-w-[95vw] max-h-[95vh]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="luxury-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`luxury-modal-content ${sizeClasses[size]} ${className}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {showCloseButton && (
                  <LuxuryRipple onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </LuxuryRipple>
                )}
              </div>
            )}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default {
  LuxuryRipple,
  LuxurySwipe,
  LuxuryPullToRefresh,
  LuxuryLongPress,
  LuxuryFAB,
  LuxuryModal
};