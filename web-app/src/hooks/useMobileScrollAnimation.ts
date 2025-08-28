'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  animationClass?: string
  delay?: number
}

const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
  triggerOnce: true,
  animationClass: 'in-view',
  delay: 0
}

export function useMobileScrollAnimation(options: ScrollAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { threshold, rootMargin, triggerOnce, animationClass, delay } = { ...defaultOptions, ...options }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.classList.add(animationClass!)
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Apply delay if specified
          const applyAnimation = () => {
            element.classList.add(animationClass!)
            setIsVisible(true)
            
            if (triggerOnce) {
              observer.unobserve(element)
            }
          }

          if (delay && delay > 0) {
            setTimeout(applyAnimation, delay)
          } else {
            applyAnimation()
          }
        } else if (!entry.isIntersecting && !triggerOnce) {
          element.classList.remove(animationClass!)
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, animationClass, delay, isVisible])

  return elementRef
}

// Specialized hook for Portuguese community content
export function usePortugueseScrollAnimation(delay: number = 0) {
  return useMobileScrollAnimation({
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    animationClass: 'lusophone-reveal',
    delay
  })
}

// Hook for card grids with staggered animation
export function useCardGridAnimation(index: number = 0) {
  return useMobileScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
    triggerOnce: true,
    animationClass: 'scroll-fade-in',
    delay: index * 100 // Stagger by 100ms per card
  })
}

// Hook for mobile-optimized fade-in
export function useMobileFadeIn(delay: number = 0) {
  return useMobileScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    animationClass: 'scroll-fade-in',
    delay
  })
}

// Hook for slide animations
export function useSlideAnimation(direction: 'left' | 'right' = 'left', delay: number = 0) {
  const animationClass = direction === 'left' ? 'scroll-slide-left' : 'scroll-slide-right'
  
  return useMobileScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
    triggerOnce: true,
    animationClass,
    delay
  })
}