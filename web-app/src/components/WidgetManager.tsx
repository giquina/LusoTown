'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface WidgetState {
  isVisible: boolean
  isMinimized: boolean
  position: { x: number; y: number }
}

interface WidgetContextType {
  widgets: Record<string, WidgetState>
  showWidget: (id: string) => void
  hideWidget: (id: string) => void
  toggleWidget: (id: string) => void
  minimizeWidget: (id: string) => void
  maximizeWidget: (id: string) => void
  updateWidgetPosition: (id: string, position: { x: number; y: number }) => void
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined)

interface WidgetManagerProps {
  children: ReactNode
}

export default function WidgetManager({ children }: WidgetManagerProps) {
  const [widgets, setWidgets] = useState<Record<string, WidgetState>>({})

  const showWidget = (id: string) => {
    setWidgets(prev => ({
      ...prev,
      [id]: { ...prev[id], isVisible: true }
    }))
  }

  const hideWidget = (id: string) => {
    setWidgets(prev => ({
      ...prev,
      [id]: { ...prev[id], isVisible: false }
    }))
  }

  const toggleWidget = (id: string) => {
    setWidgets(prev => {
      const current = prev[id] || { isVisible: false, isMinimized: false, position: { x: 0, y: 0 } }
      return {
        ...prev,
        [id]: { ...current, isVisible: !current.isVisible }
      }
    })
  }

  const minimizeWidget = (id: string) => {
    setWidgets(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }))
  }

  const maximizeWidget = (id: string) => {
    setWidgets(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false }
    }))
  }

  const updateWidgetPosition = (id: string, position: { x: number; y: number }) => {
    setWidgets(prev => ({
      ...prev,
      [id]: { ...prev[id], position }
    }))
  }

  const value: WidgetContextType = {
    widgets,
    showWidget,
    hideWidget,
    toggleWidget,
    minimizeWidget,
    maximizeWidget,
    updateWidgetPosition
  }

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  )
}

export function useWidget() {
  const context = useContext(WidgetContext)
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetManager')
  }
  return context
}