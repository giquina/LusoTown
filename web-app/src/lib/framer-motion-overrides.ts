/**
 * Framer Motion Override System
 * 
 * This module provides overrides and fixes for Framer Motion animation issues
 * with Tailwind CSS dynamic color classes in the Portuguese community platform.
 */

import React from 'react'
import { getTailwindColorHex } from '@/utils/framer-colors'

// Problematic color classes that cause animation errors
const PROBLEMATIC_CLASSES = [
  'text-red-600', 'text-red-500', 'text-red-700',
  'bg-red-50', 'bg-red-100', 'bg-red-600',
  'text-primary-600', 'text-primary-500', 'text-primary-700',
  'bg-primary-50', 'bg-primary-100', 'bg-primary-600',
  'text-secondary-600', 'text-secondary-500', 'text-secondary-700',
  'bg-secondary-50', 'bg-secondary-100', 'bg-secondary-600',
  'text-blue-600', 'text-blue-500', 'text-blue-700',
  'bg-blue-50', 'bg-blue-100', 'bg-blue-600'
]

/**
 * Initialize Framer Motion fixes on page load
 */
export function initializeFramerMotionFixes() {
  if (typeof window === 'undefined') return

  // Add CSS classes to prevent animation conflicts
  const style = document.createElement('style')
  style.textContent = `
    /* Prevent Framer Motion from animating Tailwind color classes */
    .motion-prevent-animate .text-red-600 { color: ${getTailwindColorHex('text-red-600')} !important; }
    .motion-prevent-animate .text-red-500 { color: ${getTailwindColorHex('text-red-500')} !important; }
    .motion-prevent-animate .text-primary-600 { color: ${getTailwindColorHex('text-primary-600')} !important; }
    .motion-prevent-animate .text-secondary-600 { color: ${getTailwindColorHex('text-secondary-600')} !important; }
    .motion-prevent-animate .text-blue-600 { color: ${getTailwindColorHex('text-blue-600')} !important; }
    
    /* Prevent background color animation conflicts */
    .motion-prevent-animate .bg-red-50 { background-color: ${getTailwindColorHex('text-red-50')} !important; }
    .motion-prevent-animate .bg-red-100 { background-color: ${getTailwindColorHex('text-red-100')} !important; }
    .motion-prevent-animate .bg-primary-50 { background-color: #FDF8F3 !important; }
    .motion-prevent-animate .bg-primary-100 { background-color: #F9F0E5 !important; }
    .motion-prevent-animate .bg-secondary-50 { background-color: #FAF5F0 !important; }
    .motion-prevent-animate .bg-secondary-100 { background-color: #F3E8D6 !important; }
    .motion-prevent-animate .bg-blue-50 { background-color: ${getTailwindColorHex('text-blue-50')} !important; }
    .motion-prevent-animate .bg-blue-100 { background-color: ${getTailwindColorHex('text-blue-100')} !important; }
  `
  document.head.appendChild(style)

  // Add the prevention class to motion components
  const addPreventClass = () => {
    const motionElements = document.querySelectorAll('[data-framer-component], .motion-div, .motion-component')
    motionElements.forEach(element => {
      element.classList.add('motion-prevent-animate')
    })
  }

  // Run immediately and on DOM changes
  addPreventClass()
  
  // Set up observer for dynamic content
  const observer = new MutationObserver(addPreventClass)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  })
}

/**
 * Safe animation props generator
 * Converts potentially problematic color animations to safe values
 */
export function createSafeAnimationProps(props: any) {
  if (!props) return props

  const safeProps = { ...props }

  // Convert color animations to hex values
  Object.keys(safeProps).forEach(key => {
    if (typeof safeProps[key] === 'string' && PROBLEMATIC_CLASSES.includes(safeProps[key])) {
      safeProps[key] = getTailwindColorHex(safeProps[key])
    }
    
    if (typeof safeProps[key] === 'object' && safeProps[key] !== null) {
      safeProps[key] = createSafeAnimationProps(safeProps[key])
    }
  })

  return safeProps
}

/**
 * Safe motion component wrapper
 * Use this for components that might have color animation conflicts
 */
export function withSafeMotion<T extends Record<string, any>>(
  MotionComponent: React.ComponentType<T>
) {
  return function SafeMotionComponent(props: T) {
    const safeProps = createSafeAnimationProps(props)
    return React.createElement(MotionComponent, { ...safeProps, className: `${(props as any).className || ''} motion-prevent-animate` })
  }
}

/**
 * Convert dynamic color classes to safe static classes
 */
export function getSafeColorClass(colorName: string, shade: string = '600', prefix: string = 'text'): string {
  const dynamicClass = `${prefix}-${colorName}-${shade}`
  
  // If it's a problematic class, return a safe alternative
  if (PROBLEMATIC_CLASSES.includes(dynamicClass)) {
    switch (colorName) {
      case 'red':
        return shade === '50' ? 'bg-red-50' : shade === '100' ? 'bg-red-100' : 'text-red-600'
      case 'primary':
        return shade === '50' ? 'bg-primary-50' : shade === '100' ? 'bg-primary-100' : 'text-primary-600'
      case 'secondary':
        return shade === '50' ? 'bg-secondary-50' : shade === '100' ? 'bg-secondary-100' : 'text-secondary-600'
      case 'blue':
        return shade === '50' ? 'bg-blue-50' : shade === '100' ? 'bg-blue-100' : 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }
  
  return dynamicClass
}

/**
 * Component-level fix for color animation issues
 */
export function useFramerMotionColorFix() {
  React.useEffect(() => {
    initializeFramerMotionFixes()
  }, [])
}

export default {
  initializeFramerMotionFixes,
  createSafeAnimationProps,
  withSafeMotion,
  getSafeColorClass,
  useFramerMotionColorFix
}