"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon,
  StarIcon,
  ShareIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  EyeIcon,
  UserPlusIcon,
  FlagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  BookmarkIcon as BookmarkSolid,
  HandThumbUpIcon as ThumbUpSolid
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { usePortugueseTouchFeedback } from './PortugueseCulturalMobileComponents';

// Portuguese Cultural Swipe Actions
interface SwipeAction {
  id: string;
  label: { pt: string; en: string };
  icon: React.ComponentType<{ className?: string }>;
  iconSolid?: React.ComponentType<{ className?: string }>;
  color: string;
  background: string;
  culturalSignificance: string;
  gesture: 'swipe-right' | 'swipe-left' | 'double-tap' | 'long-press';
}

interface PortugueseSwipeActionsProps {
  onLike?: () => void;
  onDislike?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onComment?: () => void;
  onConnect?: () => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isConnected?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PortugueseSwipeActions({
  onLike,
  onDislike,
  onShare,
  onBookmark,
  onComment,
  onConnect,
  isLiked = false,
  isBookmarked = false,
  isConnected = false,
  children,
  className = ''
}: PortugueseSwipeActionsProps) {
  const { language } = useLanguage();
  const { triggerCulturalFeedback } = usePortugueseTouchFeedback();
  const x = useMotionValue(0);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [actionTriggered, setActionTriggered] = useState(false);

  const swipeActions: SwipeAction[] = [
    {
      id: 'like',
      label: { pt: 'Curtir', en: 'Like' },
      icon: HeartIcon,
      iconSolid: HeartSolid,
      color: '#DC143C',
      background: 'bg-gradient-to-r from-red-500 to-red-600',
      culturalSignificance: 'Express appreciation for Portuguese cultural content',
      gesture: 'swipe-right'
    },
    {
      id: 'bookmark',
      label: { pt: 'Guardar', en: 'Save' },
      icon: BookmarkIcon,
      iconSolid: BookmarkSolid,
      color: '#D4A574',
      background: 'bg-gradient-to-r from-amber-500 to-yellow-600',
      culturalSignificance: 'Save Portuguese cultural content for later',
      gesture: 'swipe-right'
    },
    {
      id: 'share',
      label: { pt: 'Partilhar', en: 'Share' },
      icon: ShareIcon,
      color: '#228B22',
      background: 'bg-gradient-to-r from-green-500 to-green-600',
      culturalSignificance: 'Share Portuguese culture with community',
      gesture: 'swipe-left'
    },
    {
      id: 'dislike',
      label: { pt: 'Não interessado', en: 'Not Interested' },
      icon: EyeIcon,
      color: '#6B7280',
      background: 'bg-gradient-to-r from-gray-400 to-gray-500',
      culturalSignificance: 'Hide content not relevant to Portuguese interests',
      gesture: 'swipe-left'
    }
  ];

  // Gesture detection
  const backgroundColor = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    ['rgba(34, 139, 34, 0.2)', 'rgba(34, 139, 34, 0.05)', 'rgba(255, 255, 255, 1)', 'rgba(220, 20, 60, 0.05)', 'rgba(220, 20, 60, 0.2)']
  );

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    const currentX = info.offset.x;

    if (currentX > threshold) {
      setCurrentAction('like');
    } else if (currentX < -threshold) {
      setCurrentAction('share');
    } else {
      setCurrentAction(null);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const offset = info.offset.x;

    if ((Math.abs(offset) > threshold || velocity > 500) && !actionTriggered) {
      setActionTriggered(true);
      
      if (offset > threshold) {
        // Right swipe actions
        if (offset > threshold * 1.5) {
          triggerCulturalFeedback('portugal');
          onBookmark?.();
        } else {
          triggerCulturalFeedback('portugal');
          onLike?.();
        }
      } else if (offset < -threshold) {
        // Left swipe actions
        if (offset < -threshold * 1.5) {
          triggerCulturalFeedback('palop');
          onDislike?.();
        } else {
          triggerCulturalFeedback('brazil');
          onShare?.();
        }
      }

      // Reset after animation
      setTimeout(() => {
        setActionTriggered(false);
        setCurrentAction(null);
        x.set(0);
      }, 300);
    } else {
      setCurrentAction(null);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Action Indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none"
        style={{ backgroundColor }}
      >
        {/* Right Action (Like/Save) */}
        <motion.div
          className="flex items-center gap-2 text-red-600"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: currentAction === 'like' ? 1.2 : 0,
            opacity: currentAction === 'like' ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <HeartSolid className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg">
            {language === 'pt' ? 'Curtir' : 'Like'}
          </span>
        </motion.div>

        {/* Left Action (Share/Hide) */}
        <motion.div
          className="flex items-center gap-2 text-green-600 flex-row-reverse"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: currentAction === 'share' ? 1.2 : 0,
            opacity: currentAction === 'share' ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <ShareIcon className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg">
            {language === 'pt' ? 'Partilhar' : 'Share'}
          </span>
        </motion.div>
      </motion.div>

      {/* Draggable Content */}
      <motion.div
        className="relative z-10"
        drag="x"
        dragConstraints={{ left: -250, right: 250 }}
        dragElastic={0.2}
        style={{ x }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>

      {/* Gesture Hint */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: currentAction ? 0 : 0.6 }}
      >
        {language === 'pt' ? '← Deslizar para ações →' : '← Swipe for actions →'}
      </motion.div>
    </div>
  );
}

// Portuguese Double Tap Gesture (Cultural Appreciation)
interface PortugueseDoubleTapProps {
  onDoubleTap: () => void;
  onSingleTap?: () => void;
  children: React.ReactNode;
  feedbackType?: 'heart' | 'star' | 'sparkles';
  className?: string;
}

export function PortugueseDoubleTap({
  onDoubleTap,
  onSingleTap,
  children,
  feedbackType = 'heart',
  className = ''
}: PortugueseDoubleTapProps) {
  const [tapCount, setTapCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackPosition, setFeedbackPosition] = useState({ x: 0, y: 0 });
  const { triggerCulturalFeedback } = usePortugueseTouchFeedback();
  const tapTimeout = useRef<NodeJS.Timeout>();

  const feedbackIcons = {
    heart: HeartSolid,
    star: StarSolid,
    sparkles: SparklesIcon
  };

  const feedbackColors = {
    heart: 'text-red-500',
    star: 'text-amber-500', 
    sparkles: 'text-purple-500'
  };

  const FeedbackIcon = feedbackIcons[feedbackType];

  const handleTap = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    setFeedbackPosition({
      x: clientX - rect.left,
      y: clientY - rect.top
    });

    setTapCount(prev => prev + 1);

    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
    }

    tapTimeout.current = setTimeout(() => {
      if (tapCount === 1) {
        // Single tap
        onSingleTap?.();
      } else if (tapCount >= 2) {
        // Double tap - trigger Portuguese cultural appreciation
        triggerCulturalFeedback('portugal');
        onDoubleTap();
        setShowFeedback(true);
        
        // Hide feedback after animation
        setTimeout(() => {
          setShowFeedback(false);
        }, 1000);
      }
      setTapCount(0);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      onMouseDown={handleTap}
      onTouchStart={handleTap}
    >
      {children}

      {/* Double Tap Feedback Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{
              left: feedbackPosition.x - 16,
              top: feedbackPosition.y - 16
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0],
              y: [0, -30, -60]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <FeedbackIcon className={`w-8 h-8 ${feedbackColors[feedbackType]} drop-shadow-lg`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiple Hearts Animation for Extra Appreciation */}
      <AnimatePresence>
        {showFeedback && feedbackType === 'heart' && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none z-20"
                style={{
                  left: feedbackPosition.x - 8 + (i * 8),
                  top: feedbackPosition.y - 8
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 0.8],
                  opacity: [0, 1, 0],
                  y: [0, -40 - (i * 10)],
                  x: [0, (i - 2) * 15]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
              >
                <HeartSolid className="w-4 h-4 text-red-500" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Portuguese Long Press Gesture (Context Menu)
interface PortugueseLongPressMenuProps {
  onLongPress: () => void;
  menuItems: Array<{
    id: string;
    label: { pt: string; en: string };
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    color?: string;
  }>;
  children: React.ReactNode;
  className?: string;
}

export function PortugueseLongPressMenu({
  onLongPress,
  menuItems,
  children,
  className = ''
}: PortugueseLongPressMenuProps) {
  const { language } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [pressProgress, setPressProgress] = useState(0);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout>();
  const progressTimer = useRef<NodeJS.Timeout>();
  const { triggerCulturalFeedback } = usePortugueseTouchFeedback();

  const startLongPress = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    setMenuPosition({
      x: clientX - rect.left,
      y: clientY - rect.top
    });

    setIsLongPressing(true);
    setPressProgress(0);

    // Progress animation
    progressTimer.current = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 5;
      });
    }, 25);

    // Trigger long press after 500ms
    pressTimer.current = setTimeout(() => {
      triggerCulturalFeedback('portugal');
      onLongPress();
      setShowMenu(true);
      setIsLongPressing(false);
      setPressProgress(0);
    }, 500);
  };

  const cancelLongPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
    setIsLongPressing(false);
    setPressProgress(0);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <>
      <div 
        className={`relative ${className}`}
        onMouseDown={startLongPress}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchCancel={cancelLongPress}
      >
        {children}

        {/* Long Press Progress Indicator */}
        <AnimatePresence>
          {isLongPressing && (
            <motion.div
              className="absolute pointer-events-none z-30"
              style={{
                left: menuPosition.x - 20,
                top: menuPosition.y - 20
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="w-10 h-10 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="rgba(220, 20, 60, 0.2)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="#DC143C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: pressProgress / 100 }}
                    style={{
                      pathLength: pressProgress / 100,
                      strokeDasharray: "0 1"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            
            <motion.div
              className="fixed z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              style={{
                left: Math.min(menuPosition.x + 100, window.innerWidth - 200),
                top: Math.min(menuPosition.y - 100, window.innerHeight - 300)
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-2 min-w-[160px]">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl text-left
                      hover:bg-gray-50 transition-colors min-h-[48px]
                      ${item.color ? `text-${item.color}` : 'text-gray-700'}
                    `}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMenuItemClick(item.action)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">
                      {item.label[language as keyof typeof item.label]}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Portuguese Cultural Accent */}
              <div className="h-1 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default {
  PortugueseSwipeActions,
  PortugueseDoubleTap,
  PortugueseLongPressMenu
};