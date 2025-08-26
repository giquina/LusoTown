'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Z_INDEX_LAYERS, getMobileWidgetClasses, getWidgetBottomOffset } from '@/config/z-index-layers';

/**
 * Widget Management System Context
 * Centralized positioning and z-index management for all floating widgets
 */
interface WidgetManagerContextType {
  isAppBarVisible: boolean;
  setAppBarVisible: (visible: boolean) => void;
  registerWidget: (id: string, type: WidgetType) => void;
  unregisterWidget: (id: string) => void;
  getWidgetClasses: (type: WidgetType) => string;
  getWidgetZIndex: (type: WidgetType) => number;
  getBottomOffset: (type: WidgetType) => string;
  activeWidgets: Set<string>;
}

type WidgetType = 'chat' | 'activity' | 'fab' | 'notification' | 'appBar';

const WidgetManagerContext = createContext<WidgetManagerContextType | null>(null);

interface WidgetManagerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Priority 1 Widget Management System
 * 
 * Features:
 * - Centralized z-index hierarchy management
 * - Dynamic widget positioning based on app bar visibility
 * - Mobile-first responsive positioning
 * - Portuguese cultural theming integration
 * - Widget registration system for conflict prevention
 */
export function WidgetManager({ children, className = '' }: WidgetManagerProps) {
  const [isAppBarVisible, setAppBarVisible] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<Set<string>>(new Set());

  // Listen for app bar visibility changes
  useEffect(() => {
    const handleAppBarShow = () => setAppBarVisible(true);
    const handleAppBarDismiss = () => setAppBarVisible(false);

    // Listen for custom events from AppDownloadBar
    window.addEventListener('appDownloadBarShown', handleAppBarShow);
    window.addEventListener('appDownloadBarDismissed', handleAppBarDismiss);

    // Check initial state
    const isDismissed = localStorage.getItem('lusotown_app_download_bar_dismissed');
    const hasShownInSession = sessionStorage.getItem('lusotown_app_download_shown');
    const shouldShowAppBar = !isDismissed && hasShownInSession === 'true';
    setAppBarVisible(shouldShowAppBar);

    return () => {
      window.removeEventListener('appDownloadBarShown', handleAppBarShow);
      window.removeEventListener('appDownloadBarDismissed', handleAppBarDismiss);
    };
  }, []);

  const registerWidget = (id: string, type: WidgetType) => {
    setActiveWidgets(prev => new Set(prev).add(id));
  };

  const unregisterWidget = (id: string) => {
    setActiveWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const getWidgetClasses = (type: WidgetType): string => {
    return getMobileWidgetClasses(type, isAppBarVisible);
  };

  const getWidgetZIndex = (type: WidgetType): number => {
    const zIndexMap: Record<WidgetType, number> = {
      appBar: Z_INDEX_LAYERS.appDownloadBar,
      notification: Z_INDEX_LAYERS.notification,
      fab: Z_INDEX_LAYERS.fabButton,
      chat: Z_INDEX_LAYERS.lusoBotWidget,
      activity: Z_INDEX_LAYERS.liveActivityWidget,
    };

    return zIndexMap[type] || Z_INDEX_LAYERS.floatingBase;
  };

  const getBottomOffset = (type: WidgetType): string => {
    if (type === 'appBar') return '0rem';
    return getWidgetBottomOffset(type as Exclude<WidgetType, 'appBar'>, isAppBarVisible);
  };

  const contextValue: WidgetManagerContextType = {
    isAppBarVisible,
    setAppBarVisible,
    registerWidget,
    unregisterWidget,
    getWidgetClasses,
    getWidgetZIndex,
    getBottomOffset,
    activeWidgets,
  };

  return (
    <WidgetManagerContext.Provider value={contextValue}>
      <div className={`widget-manager ${className}`}>
        {children}
        
        {/* Widget Debug Information (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 bg-black/80 text-white text-xs p-2 rounded-lg z-[9999] font-mono">
            <div>App Bar: {isAppBarVisible ? 'Visible' : 'Hidden'}</div>
            <div>Active: {activeWidgets.size} widgets</div>
            <div className="text-primary-300">Z-Index Hierarchy:</div>
            <div className="ml-2 space-y-1">
              <div>App Bar: {Z_INDEX_LAYERS.appDownloadBar}</div>
              <div>Notification: {Z_INDEX_LAYERS.notification}</div>
              <div>FAB: {Z_INDEX_LAYERS.fabButton}</div>
              <div>Chat: {Z_INDEX_LAYERS.lusoBotWidget}</div>
              <div>Activity: {Z_INDEX_LAYERS.liveActivityWidget}</div>
            </div>
          </div>
        )}
      </div>
    </WidgetManagerContext.Provider>
  );
}

/**
 * Hook to access widget manager context
 */
export function useWidgetManager(): WidgetManagerContextType {
  const context = useContext(WidgetManagerContext);
  if (!context) {
    throw new Error('useWidgetManager must be used within a WidgetManager');
  }
  return context;
}

/**
 * Hook for widget registration and positioning
 */
export function useWidget(id: string, type: WidgetType) {
  const manager = useWidgetManager();

  useEffect(() => {
    manager.registerWidget(id, type);
    return () => manager.unregisterWidget(id);
  }, [id, type, manager]);

  return {
    isAppBarVisible: manager.isAppBarVisible,
    classes: manager.getWidgetClasses(type),
    zIndex: manager.getWidgetZIndex(type),
    bottomOffset: manager.getBottomOffset(type),
  };
}

/**
 * Widget positioning utilities component for direct usage
 */
interface WidgetPositionerProps {
  type: WidgetType;
  id: string;
  children: ReactNode;
  className?: string;
}

export function WidgetPositioner({ type, id, children, className = '' }: WidgetPositionerProps) {
  const { classes } = useWidget(id, type);

  return (
    <div className={`${classes} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Portuguese-themed widget container with cultural styling
 */
interface PortugueseWidgetContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'heritage';
}

export function PortugueseWidgetContainer({ 
  children, 
  className = '', 
  variant = 'primary' 
}: PortugueseWidgetContainerProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    secondary: 'bg-white border-2 border-primary-200 text-primary-900',
    heritage: 'bg-gradient-to-br from-green-600 via-red-500 to-yellow-500'
  };

  return (
    <div className={`
      ${variantClasses[variant]} 
      rounded-2xl shadow-lg transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
}

export default WidgetManager;