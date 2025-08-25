"use client";

import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';

interface TouchPoint {
  x: number;
  y: number;
  time: number;
  id?: number;
}

interface SwipeGesture {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
  velocity: number;
  duration: number;
}

interface PinchGesture {
  scale: number;
  center: { x: number; y: number };
  velocity: number;
}

interface EnhancedMobileGesturesProps {
  children: ReactNode;
  onSwipe?: (gesture: SwipeGesture) => void;
  onPinch?: (gesture: PinchGesture) => void;
  onLongPress?: (point: TouchPoint) => void;
  onDoubleTap?: (point: TouchPoint) => void;
  onTap?: (point: TouchPoint) => void;
  
  // Configuration
  swipeThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  pinchThreshold?: number;
  
  // Lusophone-specific settings
  enablePortugueseGestures?: boolean;
  enableHapticFeedback?: boolean;
  enableVoiceAnnouncements?: boolean;
  
  // Visual feedback
  showSwipeIndicators?: boolean;
  showTouchRipples?: boolean;
  
  className?: string;
  disabled?: boolean;
}

export function EnhancedMobileGestures({
  children,
  onSwipe,
  onPinch,
  onLongPress,
  onDoubleTap,
  onTap,
  swipeThreshold = 50,
  longPressDelay = 500,
  doubleTapDelay = 300,
  pinchThreshold = 0.1,
  enablePortugueseGestures = true,
  enableHapticFeedback = true,
  enableVoiceAnnouncements = false,
  showSwipeIndicators = true,
  showTouchRipples = true,
  className = '',
  disabled = false
}: EnhancedMobileGesturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touches, setTouches] = useState<Map<number, TouchPoint>>(new Map());
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [lastTap, setLastTap] = useState<TouchPoint | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [touchRipples, setTouchRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const longPressTimer = useRef<NodeJS.Timeout>();
  const swipeStartRef = useRef<TouchPoint | null>(null);
  const initialDistance = useRef<number>(0);
  const initialScale = useRef<number>(1);

  // Motion values for visual feedback
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useMotionValue(1);

  // Create touch ripple effect
  const createRipple = useCallback((x: number, y: number) => {
    if (!showTouchRipples) return;
    
    const rippleId = Date.now();
    setTouchRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    setTimeout(() => {
      setTouchRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
    }, 600);
  }, [showTouchRipples]);

  // Haptic feedback helper
  const triggerHapticFeedback = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!enableHapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, [enableHapticFeedback]);

  // Voice announcement helper
  const announceGesture = useCallback((gesture: string) => {
    if (!enableVoiceAnnouncements) return;
    
    const messages = {
      'swipe-left': 'Deslizar para a esquerda',
      'swipe-right': 'Deslizar para a direita', 
      'swipe-up': 'Deslizar para cima',
      'swipe-down': 'Deslizar para baixo',
      'long-press': 'Pressão longa',
      'double-tap': 'Toque duplo',
      'pinch-in': 'Beliscar para dentro',
      'pinch-out': 'Beliscar para fora'
    };
    
    const message = messages[gesture as keyof typeof messages];
    if (message && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-PT';
      speechSynthesis.speak(utterance);
    }
  }, [enableVoiceAnnouncements]);

  // Get distance between two points
  const getDistance = (point1: TouchPoint, point2: TouchPoint): number => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  // Get gesture direction
  const getSwipeDirection = (start: TouchPoint, end: TouchPoint): 'left' | 'right' | 'up' | 'down' => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  };

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    
    const newTouches = new Map(touches);
    
    Array.from(e.touches).forEach((touch) => {
      const touchPoint: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
        id: touch.identifier
      };
      
      newTouches.set(touch.identifier, touchPoint);
      createRipple(touch.clientX, touch.clientY);
      
      // Set swipe start for single touch
      if (e.touches.length === 1) {
        swipeStartRef.current = touchPoint;
        
        // Start long press timer
        longPressTimer.current = setTimeout(() => {
          setIsLongPressing(true);
          onLongPress?.(touchPoint);
          triggerHapticFeedback('heavy');
          announceGesture('long-press');
        }, longPressDelay);
      }
      
      // Handle pinch start for two touches
      if (e.touches.length === 2 && newTouches.size >= 2) {
        const touchArray = Array.from(newTouches.values());
        const distance = getDistance(touchArray[0], touchArray[1]);
        initialDistance.current = distance;
        initialScale.current = 1;
      }
    });
    
    setTouches(newTouches);
  }, [disabled, touches, createRipple, onLongPress, triggerHapticFeedback, announceGesture, longPressDelay]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    
    // Clear long press if finger moves too much
    if (longPressTimer.current && swipeStartRef.current) {
      const currentTouch = e.touches[0];
      const distance = getDistance(swipeStartRef.current, {
        x: currentTouch.clientX,
        y: currentTouch.clientY,
        time: Date.now()
      });
      
      if (distance > 10) {
        clearTimeout(longPressTimer.current);
        setIsLongPressing(false);
      }
    }
    
    // Handle pinch gesture
    if (e.touches.length === 2 && touches.size >= 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDistance = getDistance(
        { x: touch1.clientX, y: touch1.clientY, time: Date.now() },
        { x: touch2.clientX, y: touch2.clientY, time: Date.now() }
      );
      
      if (initialDistance.current > 0) {
        const scaleChange = currentDistance / initialDistance.current;
        const scaleDelta = Math.abs(scaleChange - initialScale.current);
        
        if (scaleDelta > pinchThreshold) {
          const center = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          };
          
          onPinch?.({
            scale: scaleChange,
            center,
            velocity: scaleDelta
          });
          
          // Visual feedback
          scale.set(scaleChange);
          
          // Haptic feedback for significant pinch
          if (scaleDelta > 0.3) {
            triggerHapticFeedback('light');
            announceGesture(scaleChange > 1 ? 'pinch-out' : 'pinch-in');
          }
          
          initialScale.current = scaleChange;
        }
      }
    }
    
    // Handle swipe visual feedback
    if (e.touches.length === 1 && swipeStartRef.current) {
      const currentTouch = e.touches[0];
      const deltaX = currentTouch.clientX - swipeStartRef.current.x;
      const deltaY = currentTouch.clientY - swipeStartRef.current.y;
      
      x.set(deltaX * 0.3); // Damped movement
      y.set(deltaY * 0.3);
      
      // Show swipe direction indicator
      if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
        const direction = getSwipeDirection(swipeStartRef.current, {
          x: currentTouch.clientX,
          y: currentTouch.clientY,
          time: Date.now()
        });
        setSwipeDirection(direction);
      }
    }
  }, [disabled, touches, onPinch, swipeThreshold, pinchThreshold, scale, x, y, triggerHapticFeedback, announceGesture]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      setIsLongPressing(false);
    }
    
    // Handle swipe gesture
    if (swipeStartRef.current && e.changedTouches.length === 1) {
      const endTouch = e.changedTouches[0];
      const endPoint: TouchPoint = {
        x: endTouch.clientX,
        y: endTouch.clientY,
        time: Date.now()
      };
      
      const distance = getDistance(swipeStartRef.current, endPoint);
      const duration = endPoint.time - swipeStartRef.current.time;
      const velocity = distance / duration;
      
      if (distance > swipeThreshold) {
        const direction = getSwipeDirection(swipeStartRef.current, endPoint);
        
        onSwipe?.({
          direction,
          distance,
          velocity,
          duration
        });
        
        triggerHapticFeedback('medium');
        announceGesture(`swipe-${direction}`);
        setSwipeDirection(direction);
        
        // Visual feedback
        const targetX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
        const targetY = direction === 'up' ? -100 : direction === 'down' ? 100 : 0;
        
        animate(x, targetX, { duration: 0.2, ease: 'easeOut' }).then(() => {
          animate(x, 0, { duration: 0.3, ease: 'easeInOut' });
        });
        
        animate(y, targetY, { duration: 0.2, ease: 'easeOut' }).then(() => {
          animate(y, 0, { duration: 0.3, ease: 'easeInOut' });
        });
      } else {
        // Handle tap and double tap
        const currentTime = Date.now();
        
        if (lastTap && currentTime - lastTap.time < doubleTapDelay) {
          // Double tap
          onDoubleTap?.(endPoint);
          triggerHapticFeedback('heavy');
          announceGesture('double-tap');
          setLastTap(null);
        } else {
          // Single tap
          onTap?.(endPoint);
          setLastTap(endPoint);
          
          // Clear single tap if no double tap follows
          setTimeout(() => {
            setLastTap(null);
          }, doubleTapDelay);
        }
      }
      
      swipeStartRef.current = null;
    }
    
    // Reset visual state
    setTimeout(() => {
      setSwipeDirection(null);
      animate(scale, 1, { duration: 0.3, ease: 'easeInOut' });
    }, 200);
    
    // Update touches map
    const newTouches = new Map(touches);
    Array.from(e.changedTouches).forEach((touch) => {
      newTouches.delete(touch.identifier);
    });
    setTouches(newTouches);
  }, [disabled, touches, onSwipe, onDoubleTap, onTap, swipeThreshold, doubleTapDelay, lastTap, triggerHapticFeedback, announceGesture, x, y, scale]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        touchAction: 'manipulation',
        x,
        y,
        opacity,
        scale
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Swipe Direction Indicator */}
      {showSwipeIndicators && swipeDirection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-full p-4">
            <div className="text-white text-2xl">
              {swipeDirection === 'left' && '←'}
              {swipeDirection === 'right' && '→'}
              {swipeDirection === 'up' && '↑'}
              {swipeDirection === 'down' && '↓'}
            </div>
          </div>
        </motion.div>
      )}

      {/* Touch Ripples */}
      {touchRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ 
            scale: 0, 
            opacity: 0.8,
            x: ripple.x - 25,
            y: ripple.y - 25
          }}
          animate={{ 
            scale: 2, 
            opacity: 0 
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-12 h-12 bg-blue-400 rounded-full pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)'
          }}
        />
      ))}

      {/* Long Press Indicator */}
      {isLongPressing && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-6">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </motion.div>
      )}

      {children}
    </motion.div>
  );
}

// Lusophone Cultural Gesture Patterns Hook
export function usePortugueseGestures() {
  const [gestureHistory, setGestureHistory] = useState<SwipeGesture[]>([]);
  
  const detectCulturalPattern = useCallback((gesture: SwipeGesture) => {
    setGestureHistory(prev => [...prev.slice(-4), gesture]);
    
    // Portuguese flag pattern: right-down-left-up
    const flagPattern = ['right', 'down', 'left', 'up'];
    const recentGestures = gestureHistory.slice(-3).map(g => g.direction);
    recentGestures.push(gesture.direction);
    
    if (JSON.stringify(recentGestures) === JSON.stringify(flagPattern)) {
      // Easter egg: Portuguese flag gesture detected
      if ('navigator' in window && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
      
      return 'portuguese-flag';
    }
    
    // Fado pattern: slow swipes in circle
    if (gestureHistory.length >= 4) {
      const speeds = gestureHistory.slice(-4).map(g => g.velocity);
      const avgSpeed = speeds.reduce((a, b) => a + b) / speeds.length;
      
      if (avgSpeed < 0.5) { // Slow, contemplative gestures
        return 'fado-rhythm';
      }
    }
    
    return null;
  }, [gestureHistory]);
  
  return { detectCulturalPattern, gestureHistory };
}

export default EnhancedMobileGestures;