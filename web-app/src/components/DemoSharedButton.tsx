"use client"

import React from 'react'

interface ButtonProps {
  title: string
  onPress: () => void
}

function Button({ title, onPress }: ButtonProps) {
  return (
    <button 
      onClick={onPress}
      className="bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      {title}
    </button>
  )
}

export default function DemoSharedButton() {
  return (
    <div className="p-4 border rounded">
      <Button title="Shared Button" onPress={() => console.log('clicked')} />
    </div>
  )
}
