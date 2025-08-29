"use client";

import React from "react";

interface EnhancedMobileGesturesProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipe?: (gesture: { direction: 'left' | 'right' | 'up' | 'down'; distance: number; velocity: number }) => void;
  onTap?: (point: { x: number; y: number }) => void;
  enablePortugueseGestures?: boolean;
  enableHapticFeedback?: boolean;
  enableVoiceAnnouncements?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function EnhancedMobileGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onSwipe,
  onTap,
  enablePortugueseGestures = false,
  enableHapticFeedback = false,
  enableVoiceAnnouncements = false,
  className = "",
  disabled = false,
  children
}: EnhancedMobileGesturesProps) {
  const [touchStart, setTouchStart] = React.useState({ x: 0, y: 0, time: 0 });
  const [touchEnd, setTouchEnd] = React.useState({ x: 0, y: 0, time: 0 });

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setTouchEnd({ x: 0, y: 0, time: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled) return;
    
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };

  const handleTouchEnd = () => {
    if (disabled || !touchStart.x || !touchEnd.x) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const timeDiff = Math.max(touchEnd.time - touchStart.time, 1);
    const velocity = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / timeDiff;

    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    // Prioritize horizontal swipes over vertical ones
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe) {
        onSwipeLeft?.();
        onSwipe?.({ direction: 'left', distance: Math.abs(distanceX), velocity });
      } else if (isRightSwipe) {
        onSwipeRight?.();
        onSwipe?.({ direction: 'right', distance: Math.abs(distanceX), velocity });
      }
    } else {
      if (isUpSwipe) {
        onSwipeUp?.();
        onSwipe?.({ direction: 'up', distance: Math.abs(distanceY), velocity });
      } else if (isDownSwipe) {
        onSwipeDown?.();
        onSwipe?.({ direction: 'down', distance: Math.abs(distanceY), velocity });
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    onTap?.({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

// Export hook for Portuguese gestures
export const usePortugueseGestures = () => {
  const detectCulturalPattern = React.useCallback((gesture: any) => {
    // Simple cultural pattern detection for Portuguese-speaking community
    // This could be enhanced with more sophisticated pattern recognition
    return null;
  }, []);

  const handleSwipe = React.useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    // Simple gesture handler for Portuguese community
    console.log(`Portuguese gesture: ${direction}`);
  }, []);

  return {
    detectCulturalPattern,
    handleSwipe
  };
};
