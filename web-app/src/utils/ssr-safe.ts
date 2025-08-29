/**
 * SSR-safe utilities for browser API access
 */

export const isClient = typeof window !== 'undefined'

export const safeWindow = {
  innerWidth: isClient ? window.innerWidth : 768,
  addEventListener: isClient ? window.addEventListener.bind(window) : () => {},
  removeEventListener: isClient ? window.removeEventListener.bind(window) : () => {},
  matchMedia: isClient ? window.matchMedia.bind(window) : () => ({ matches: false })
}

export const safeNavigator = {
  onLine: isClient ? navigator.onLine : true,
  connection: isClient ? (navigator as any).connection : null,
  vibrate: isClient ? navigator.vibrate?.bind(navigator) : undefined
}

export const safePerformance = {
  now: isClient ? performance.now.bind(performance) : () => 0,
  memory: isClient ? (performance as any).memory : { usedJSHeapSize: 0 }
}

export const safeSpeechSynthesis = {
  speak: isClient && 'speechSynthesis' in window 
    ? speechSynthesis.speak.bind(speechSynthesis) 
    : () => {}
}
