"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  disabled?: boolean;
  threshold?: number;
  className?: string;
  refreshingText?: string;
  pullText?: string;
  releaseText?: string;
}

export default function PullToRefreshWrapper({
  onRefresh,
  children,
  disabled = false,
  threshold = 80,
  className = '',
  refreshingText,
  pullText,
  releaseText,
}: PullToRefreshProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isScrollable = useRef(true);

  // Default texts
  const texts = {
    pull: pullText || (isPortuguese ? '⬇️ Puxe para atualizar eventos' : '⬇️ Pull to refresh events'),
    release: releaseText || (isPortuguese ? '🔄 Solte para atualizar' : '🔄 Release to refresh'),
    refreshing: refreshingText || (isPortuguese ? '⏳ Atualizando eventos portugueses...' : '⏳ Refreshing Portuguese events...'),
  };

  // Check if container is at the top
  const isAtTop = useCallback(() => {
    if (!containerRef.current) return false;
    return containerRef.current.scrollTop === 0;
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || isRefreshing || !isAtTop()) return;
    
    startY.current = e.touches[0].clientY;
    isScrollable.current = true;
  }, [disabled, isRefreshing, isAtTop]);

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || isRefreshing || !isAtTop()) return;

    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0 && isScrollable.current) {
      // Pulling down
      e.preventDefault();
      setIsPulling(true);
      
      // Exponential resistance for natural feel
      const resistance = Math.min(diff * 0.5, threshold * 1.5);
      setPullDistance(resistance);
      setCanRefresh(resistance >= threshold);
    }
  }, [disabled, isRefreshing, isAtTop, threshold]);

  // Handle touch end
  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing) return;

    if (canRefresh && isPulling) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500); // Minimum refresh time for UX
      }
    }

    // Reset states
    setIsPulling(false);
    setPullDistance(0);
    setCanRefresh(false);
    startY.current = 0;
    currentY.current = 0;
  }, [disabled, isRefreshing, canRefresh, isPulling, onRefresh]);

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Calculate progress
  const progress = Math.min(pullDistance / threshold, 1);
  const showIndicator = isPulling || isRefreshing;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-auto h-full ${className}`}
      style={{
        transform: isPulling ? `translateY(${Math.min(pullDistance * 0.3, 30)}px)` : 'none',
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isRefreshing ? 1 : Math.max(0.8, progress),
            }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-6 py-3 flex items-center gap-3">
              {/* Portuguese Flag Indicator */}
              <motion.div
                className="w-4 h-3 rounded-sm bg-gradient-to-r from-green-500 to-red-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              {/* Loading Icon */}
              <motion.div
                animate={
                  isRefreshing 
                    ? { rotate: 360 }
                    : canRefresh 
                      ? { rotate: 180 }
                      : { rotate: 0 }
                }
                transition={{
                  duration: isRefreshing ? 1 : 0.3,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: isRefreshing ? "linear" : "easeOut",
                }}
              >
                <ArrowPathIcon className={`w-5 h-5 ${
                  canRefresh ? 'text-green-600' : 'text-gray-500'
                }`} />
              </motion.div>
              
              {/* Status Text */}
              <span className="text-sm font-medium text-gray-700">
                {isRefreshing 
                  ? texts.refreshing
                  : canRefresh 
                    ? texts.release
                    : texts.pull
                }
              </span>
              
              {/* Progress Bar */}
              {!isRefreshing && (
                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Light Effect During Pull */}
      {isPulling && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress * 0.1 }}
          style={{
            background: 'radial-gradient(circle at top, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Success Flash Effect */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.2), transparent)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={isRefreshing ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
}

// Hook for easier integration
export function usePullToRefresh(refreshFunction: () => Promise<void> | void) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await refreshFunction();
    } catch (error) {
      console.error('Pull to refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshFunction, isRefreshing]);

  return {
    isRefreshing,
    handleRefresh,
    PullToRefreshWrapper: ({ children, ...props }: Omit<PullToRefreshProps, 'onRefresh'>) => (
      <PullToRefreshWrapper onRefresh={handleRefresh} {...props}>
        {children}
      </PullToRefreshWrapper>
    ),
  };
}

// Specialized version for Events
export function EventsPullToRefresh({
  onRefreshEvents,
  children,
  ...props
}: Omit<PullToRefreshProps, 'onRefresh'> & {
  onRefreshEvents: () => Promise<void> | void;
}) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  return (
    <PullToRefreshWrapper
      onRefresh={onRefreshEvents}
      pullText={isPortuguese ? '⬇️ Puxe para atualizar eventos' : '⬇️ Pull to refresh events'}
      releaseText={isPortuguese ? '🔄 Solte para carregar novos eventos' : '🔄 Release to load new events'}
      refreshingText={isPortuguese ? '⏳ Carregando eventos portugueses...' : '⏳ Loading Portuguese events...'}
      {...props}
    >
      {children}
    </PullToRefreshWrapper>
  );
}