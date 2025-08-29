'use client'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function DesignSystemShowcase() {
  const { t } = useLanguage()

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        LusoTown Design System
      </h2>
      <p className="text-gray-600 mb-6">
        Showcasing Portuguese community design elements
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800">Portuguese Blue</h3>
          <p className="text-sm text-blue-600">Primary brand color</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">Heritage Green</h3>
          <p className="text-sm text-green-600">Cultural accent</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800">Golden Sun</h3>
          <p className="text-sm text-yellow-600">Celebration color</p>
        </div>
      </div>
    </div>
  )
}
