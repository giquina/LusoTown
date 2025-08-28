/**
 * LusoTown Z-Index Management System
 * Prevents floating UI element conflicts
 */

export const Z_INDEX_LAYERS = {
  // Foundation layers
  background: -1,
  base: 0,
  
  // Content layers
  content: 1,
  elevated: 10,
  
  // Navigation layers
  mobileNavigation: 15,
  header: 20,
  
  // Interactive floating elements (stacked bottom to top)
  floatingBase: 30,
  
  // Widget Management System - Priority 1 Implementation
  appDownloadBar: 90,      // App download bar - above header when at top
  notification: 60,        // Notification widgets - above app bar
  lusoBotWidget: 70,       // Chat widget - above notifications
  liveActivityWidget: 45,  // Live feed - below app bar
  fabButton: 65,           // Floating action buttons - between notifications and chat
  
  // System modals and overlays
  modalBackdrop: 80,
  modal: 100,              // Modals above all widgets
  toast: 90,
  
  // Critical system UI
  pwaInstall: 110,         // PWA install prompts - highest priority
  accessibility: 999,
  errorDebug: 9999
} as const;

export type ZIndexLayer = typeof Z_INDEX_LAYERS[keyof typeof Z_INDEX_LAYERS];

/**
 * Mobile safe area calculations for floating elements
 */
export const MOBILE_SAFE_AREAS = {
  // Bottom spacing - accounting for AppDownloadBar
  appDownloadBar: '4rem',     // 64px - height of app download bar
  chatWidget: '6rem',         // 96px - above mobile nav (adjusts when app bar visible)
  chatWidgetWithAppBar: '10rem', // 160px - when app download bar is visible
  liveActivity: '7rem',       // 112px - below app bar
  fabButton: '8rem',          // 128px - above notifications
  notification: '9rem',       // 144px - above live activity
  
  // Mobile navigation height
  navigationHeight: '4rem',   // 64px standard mobile nav
} as const;

/**
 * Get z-index value with TypeScript safety
 */
export function getZIndex(layer: keyof typeof Z_INDEX_LAYERS): number {
  return Z_INDEX_LAYERS[layer];
}

/**
 * Get mobile safe bottom positioning
 */
export function getMobileSafeBottom(element: keyof typeof MOBILE_SAFE_AREAS): string {
  return MOBILE_SAFE_AREAS[element];
}

/**
 * Component Z-Index values for easy import
 */
export const COMPONENT_Z_INDEX = Z_INDEX_LAYERS;

/**
 * Widget positioning utilities for the Priority 1 Widget Management System
 */

/**
 * Get mobile widget CSS classes for safe positioning with AppDownloadBar awareness
 */
export function getMobileWidgetClasses(
  widgetType: 'chat' | 'activity' | 'fab' | 'notification' | 'appBar',
  isAppBarVisible: boolean = false
): string {
  const baseClasses = 'fixed transition-all duration-300';
  
  switch (widgetType) {
    case 'chat':
      const chatBottom = isAppBarVisible ? 'bottom-40' : 'bottom-24'; // 160px vs 96px
      return `${baseClasses} ${chatBottom} md:bottom-6 right-4 z-[${Z_INDEX_LAYERS.lusoBotWidget}]`;
    
    case 'activity':
      return `${baseClasses} bottom-28 md:bottom-20 left-4 z-[${Z_INDEX_LAYERS.liveActivityWidget}]`;
    
    case 'fab':
      const fabBottom = isAppBarVisible ? 'bottom-44' : 'bottom-32'; // 176px vs 128px
      return `${baseClasses} ${fabBottom} md:bottom-24 right-4 z-[${Z_INDEX_LAYERS.fabButton}]`;
    
    case 'notification':
      const notificationBottom = isAppBarVisible ? 'bottom-36' : 'bottom-20'; // 144px vs 80px
      return `${baseClasses} ${notificationBottom} md:bottom-12 left-4 z-[${Z_INDEX_LAYERS.notification}]`;
    
    case 'appBar':
      return `${baseClasses} bottom-0 left-0 right-0 z-[${Z_INDEX_LAYERS.appDownloadBar}]`;
    
    default:
      return `${baseClasses} bottom-6 right-6 z-[${Z_INDEX_LAYERS.floatingBase}]`;
  }
}

/**
 * Get positioning adjustment based on app bar visibility
 */
export function getWidgetBottomOffset(
  widgetType: 'chat' | 'activity' | 'fab' | 'notification',
  isAppBarVisible: boolean
): string {
  const offsets = {
    chat: isAppBarVisible ? '10rem' : '6rem',      // 160px vs 96px
    activity: '7rem',                               // Always 112px (below app bar)
    fab: isAppBarVisible ? '11rem' : '8rem',       // 176px vs 128px
    notification: isAppBarVisible ? '9rem' : '5rem' // 144px vs 80px
  };
  
  return offsets[widgetType];
}