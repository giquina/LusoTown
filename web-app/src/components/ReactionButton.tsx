'use client'

import { useState } from 'react'

interface ReactionButtonProps {
  emoji: string
  count: number
  isActive: boolean
  onClick: () => void
  tooltip?: string
}

export default function ReactionButton({ emoji, count, isActive, onClick, tooltip }: ReactionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200 ${
        isActive
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          : 'text-gray-500 hover:bg-secondary-100 hover:text-secondary-700'
      }`}
      title={tooltip}
    >
      <span>{emoji}</span>
      {count > 0 && <span className="font-medium">{count}</span>}
    </button>
  )
}