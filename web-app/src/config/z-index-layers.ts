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
  lusoBotWidget: 40,        // Chat widget - above navigation
  liveActivityWidget: 45,   // Live feed - above chat widget
  fabButton: 50,           // Floating action buttons
  
  // System modals and overlays
  modalBackdrop: 80,
  modal: 90,
  toast: 100,
  
  // Critical system UI
  pwaInstall: 110,         // App download prompts - highest priority
  accessibility: 999,
  errorDebug: 9999
} as const;

export type ZIndexLayer = typeof Z_INDEX_LAYERS[keyof typeof Z_INDEX_LAYERS];

/**
 * Mobile safe area calculations for floating elements
 */
export const MOBILE_SAFE_AREAS = {
  // Bottom spacing above mobile navigation
  chatWidget: '6rem',      // 96px - above mobile nav
  liveActivity: '7rem',    // 112px - above chat widget
  fabButton: '8rem',       // 128px - above live activity
  
  // Mobile navigation height
  navigationHeight: '4rem', // 64px standard mobile nav
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
 * Get mobile widget CSS classes for safe positioning
 */
export function getMobileWidgetClasses(widgetType: 'chat' | 'activity' | 'fab'): string {
  const baseClasses = 'fixed transition-all duration-300';
  
  switch (widgetType) {
    case 'chat':
      return `${baseClasses} bottom-24 md:bottom-6 right-6 z-[${Z_INDEX_LAYERS.lusoBotWidget}]`;
    case 'activity':
      return `${baseClasses} bottom-28 md:bottom-20 left-6 z-[${Z_INDEX_LAYERS.liveActivityWidget}]`;
    case 'fab':
      return `${baseClasses} bottom-32 md:bottom-24 right-6 z-[${Z_INDEX_LAYERS.fabButton}]`;
    default:
      return `${baseClasses} bottom-6 right-6 z-[${Z_INDEX_LAYERS.floatingBase}]`;
  }
}