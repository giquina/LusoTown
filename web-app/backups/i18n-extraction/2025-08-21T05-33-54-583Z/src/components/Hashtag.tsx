'use client'

import { useState } from 'react'

interface HashtagProps {
  tag: string
  onClick?: (tag: string) => void
  active?: boolean
}

export default function Hashtag({ tag, onClick, active = false }: HashtagProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(tag)
    }
  }

  return (
    <span
      onClick={handleClick}
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
        active
          ? 'bg-primary-500 text-white hover:bg-primary-600'
          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
      }`}
    >
      #{tag}
    </span>
  )
}