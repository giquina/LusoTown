"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury Skeleton Loader for Portuguese community content
interface LuxurySkeletonProps {
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'button';
  width?: string;
  height?: string;
  className?: string;
  lines?: number;
}

export function LuxurySkeleton({ 
  variant = 'text', 
  width = 'w-full', 
  height = 'h-4', 
  className = '', 
  lines = 1 
}: LuxurySkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'w-full h-48 rounded-2xl';
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      case 'image':
        return 'w-full h-32 rounded-xl';
      case 'button':
        return 'w-24 h-10 rounded-lg';
      default:
        return `${width} ${height} rounded-lg`;
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`luxury-skeleton ${getVariantClasses()}`}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: index * 0.1 
            }}
            style={{
              width: index === lines - 1 && lines > 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`luxury-skeleton ${getVariantClasses()} ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}

// Luxury Spinner for Portuguese-themed loading
interface LuxurySpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'portuguese' | 'dots' | 'pulse';
  className?: string;
}

export function LuxurySpinner({ 
  size = 'md', 
  variant = 'default', 
  className = '' 
}: LuxurySpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'portuguese') {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <motion.div
          className="absolute inset-0 border-3 border-transparent rounded-full"
          style={{
            borderTopColor: '#C5282F', // Portuguese red
            borderRightColor: '#00A859', // Portuguese green
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 border-2 border-transparent rounded-full"
          style={{
            borderBottomColor: '#FFD700', // Portuguese gold
            borderLeftColor: '#C5282F',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-r from-red-500 to-green-500 rounded-full ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />
    );
  }

  return (
    <motion.div
      className={`luxury-loading-spinner ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

// Luxury Progress Bar with Portuguese theming
interface LuxuryProgressProps {
  progress: number;
  variant?: 'default' | 'portuguese' | 'gradient';
  showPercentage?: boolean;
  className?: string;
  label?: string;
}

export function LuxuryProgress({ 
  progress, 
  variant = 'default', 
  showPercentage = false, 
  className = '',
  label 
}: LuxuryProgressProps) {
  const getProgressColor = () => {
    switch (variant) {
      case 'portuguese':
        return 'bg-gradient-to-r from-red-600 via-yellow-500 to-green-600';
      case 'gradient':
        return 'bg-gradient-to-r from-secondary-500 to-primary-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="luxury-progress-bar">
        <motion.div
          className={`luxury-progress-fill ${getProgressColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Luxury Content Loading Card
interface LuxuryContentLoadingProps {
  type?: 'event' | 'profile' | 'post' | 'business';
  className?: string;
}

export function LuxuryContentLoading({ 
  type = 'event', 
  className = '' 
}: LuxuryContentLoadingProps) {
  const getLoadingContent = () => {
    switch (type) {
      case 'event':
        return (
          <div className="space-y-4">
            <LuxurySkeleton variant="image" />
            <div className="space-y-2">
              <LuxurySkeleton variant="text" width="w-3/4" height="h-6" />
              <LuxurySkeleton variant="text" lines={2} />
              <div className="flex space-x-2 mt-3">
                <LuxurySkeleton variant="button" />
                <LuxurySkeleton variant="button" />
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <LuxurySkeleton variant="avatar" />
              <div className="flex-1">
                <LuxurySkeleton variant="text" width="w-1/2" height="h-5" />
                <LuxurySkeleton variant="text" width="w-1/3" height="h-4" />
              </div>
            </div>
            <LuxurySkeleton variant="text" lines={3} />
          </div>
        );
      
      case 'post':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <LuxurySkeleton variant="avatar" className="w-8 h-8" />
              <div className="flex-1">
                <LuxurySkeleton variant="text" width="w-1/3" height="h-4" />
              </div>
            </div>
            <LuxurySkeleton variant="text" lines={2} />
            <LuxurySkeleton variant="image" height="h-24" />
          </div>
        );
      
      case 'business':
        return (
          <div className="space-y-4">
            <LuxurySkeleton variant="image" height="h-20" />
            <div className="space-y-2">
              <LuxurySkeleton variant="text" width="w-2/3" height="h-5" />
              <LuxurySkeleton variant="text" width="w-1/2" height="h-4" />
              <LuxurySkeleton variant="text" lines={2} />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            <LuxurySkeleton variant="text" lines={3} />
          </div>
        );
    }
  };

  return (
    <div className={`luxury-glass-card p-6 ${className}`}>
      {getLoadingContent()}
    </div>
  );
}

// Luxury Full Screen Loader
interface LuxuryFullScreenLoaderProps {
  isVisible: boolean;
  message?: string;
  progress?: number;
  variant?: 'default' | 'portuguese';
}

export function LuxuryFullScreenLoader({ 
  isVisible, 
  message = 'Loading...', 
  progress,
  variant = 'default' 
}: LuxuryFullScreenLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center luxury-glass-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm mx-4 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="mb-6">
              <LuxurySpinner 
                size="xl" 
                variant={variant === 'portuguese' ? 'portuguese' : 'default'} 
                className="mx-auto" 
              />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {message}
            </h3>
            
            {progress !== undefined && (
              <div className="mt-4">
                <LuxuryProgress 
                  progress={progress} 
                  variant={variant === 'portuguese' ? 'portuguese' : 'gradient'}
                  showPercentage 
                />
              </div>
            )}
            
            <p className="text-sm text-gray-600 mt-2">
              Please wait while we prepare your Portuguese community experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Luxury Placeholder for Empty States
interface LuxuryPlaceholderProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function LuxuryPlaceholder({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}: LuxuryPlaceholderProps) {
  return (
    <motion.div
      className={`text-center py-12 px-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <motion.div
          className="mx-auto mb-4 w-16 h-16 text-gray-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.h3
        className="text-lg font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-6 max-w-sm mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.button
          className="luxury-btn-primary"
          onClick={action.onClick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}

export default {
  LuxurySkeleton,
  LuxurySpinner,
  LuxuryProgress,
  LuxuryContentLoading,
  LuxuryFullScreenLoader,
  LuxuryPlaceholder
};