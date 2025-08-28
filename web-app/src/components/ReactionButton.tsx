'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Removed luxury imports - using standard components

interface ReactionButtonProps {
  emoji: string
  count: number
  isActive: boolean
  onClick: () => void
  tooltip?: string
}

export default function ReactionButton({ emoji, count, isActive, onClick, tooltip }: ReactionButtonProps) {
  const [justClicked, setJustClicked] = useState(false);

  const handleClick = () => {
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 600);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-all duration-300 min-h-[44px] cursor-pointer ${
        isActive
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200 shadow-sm'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
      }`}
      hapticFeedback="light"
      rippleColor={isActive ? "rgba(59, 130, 246, 0.3)" : "rgba(107, 114, 128, 0.2)"}
    >
      <motion.div
        className="flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="text-lg"
          animate={justClicked ? {
            scale: [1, 1.3, 1],
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {emoji}
        </motion.span>
        
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.span
              key={count}
              className="font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Floating emoji animation on click */}
        <AnimatePresence>
          {justClicked && (
            <motion.span
              className="absolute text-lg pointer-events-none"
              initial={{ 
                opacity: 1, 
                scale: 1, 
                x: 0, 
                y: 0 
              }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                x: Math.random() * 40 - 20, 
                y: -30 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {emoji}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {tooltip}
        </div>
      )}
    </div>
  )
}