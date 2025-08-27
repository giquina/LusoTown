import { test, expect, Page } from '@playwright/test'

/**
 * Carousel Performance Testing for Portuguese-Speaking Community
 * 
 * Focus Areas:
 * - First Contentful Paint (FCP) optimization
 * - Largest Contentful Paint (LCP) for Portuguese cultural images
 * - Cumulative Layout Shift (CLS) prevention
 * - JavaScript execution time for carousel interactions
 * - Memory usage optimization for mobile devices
 * - Network efficiency for Portuguese cultural content
 */

test.describe('Carousel Performance Optimization', () => {
  
  test.beforeEach(async ({ page }) => {
    // Enable performance monitoring
    await page.addInitScript(() => {
      window.performanceMetrics = {
        navigationStart: performance.now(),
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        memoryUsage: 0
      }
    })
  })

  test('measures First Contentful Paint for carousel', async ({ page }) => {
    await page.goto('/')
    
    // Wait for carousel to appear
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Measure performance
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            resolve({
              fcp: fcpEntry.startTime,
              navigation: performance.timing.navigationStart
            })
          }
        })
        observer.observe({ entryTypes: ['paint'] })
        
        // Fallback timeout
        setTimeout(() => {
          resolve({
            fcp: performance.now(),
            navigation: performance.timing.navigationStart
          })
        }, 5000)
      })
    })
    
    console.log('Performance Metrics:', performanceMetrics)
    
    // FCP should be under 2.5 seconds for good mobile experience
    expect(performanceMetrics.fcp).toBeLessThan(2500)
  })
  
  test('measures Largest Contentful Paint for Portuguese cultural images', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    const lcpMetric = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lcpEntries = entries.filter((entry) => entry.entryType === 'largest-contentful-paint')
          const latestLcp = lcpEntries[lcpEntries.length - 1]
          
          if (latestLcp) {
            resolve({
              lcp: latestLcp.startTime,
              element: latestLcp.element?.tagName || 'unknown'
            })
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
        
        // Fallback timeout
        setTimeout(() => {
          resolve({ lcp: performance.now(), element: 'timeout' })
        }, 10000)
      })
    })
    
    console.log('LCP Metric:', lcpMetric)
    
    // LCP should be under 4 seconds for acceptable mobile experience
    expect(lcpMetric.lcp).toBeLessThan(4000)
  })
  
  test('measures Cumulative Layout Shift for carousel stability', async ({ page }) => {
    await page.goto('/')
    
    // Monitor layout shifts during carousel loading
    const clsMetric = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cumulativeScore = 0
        
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          
          entries.forEach((entry) => {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              cumulativeScore += entry.value
            }
          })
        })
        
        observer.observe({ entryTypes: ['layout-shift'] })
        
        // Measure CLS for 5 seconds after navigation
        setTimeout(() => {
          resolve(cumulativeScore)
        }, 5000)
      })
    })
    
    console.log('Cumulative Layout Shift:', clsMetric)
    
    // CLS should be under 0.1 for good user experience
    expect(clsMetric).toBeLessThan(0.1)
  })
  
  test('monitors memory usage during carousel interactions', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize / 1024 / 1024,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize / 1024 / 1024
      } : null
    })
    
    if (initialMemory) {
      console.log('Initial Memory Usage:', initialMemory)
      
      // Interact with carousel multiple times
      const nextButton = page.locator('button[aria-label*="Next"]').first()
      for (let i = 0; i < 10; i++) {
        if (await nextButton.count() > 0) {
          await nextButton.click()
          await page.waitForTimeout(300)
        }
      }
      
      // Measure memory after interactions
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize / 1024 / 1024,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize / 1024 / 1024
        } : null
      })
      
      if (finalMemory) {
        console.log('Final Memory Usage:', finalMemory)
        
        const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
        console.log('Memory Increase:', memoryIncrease, 'MB')
        
        // Memory increase should be reasonable (under 10MB for carousel interactions)
        expect(memoryIncrease).toBeLessThan(10)
      }
    }
  })
  
  test('measures carousel navigation response time', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    const nextButton = page.locator('button[aria-label*="Next"]').first()
    
    if (await nextButton.count() > 0) {
      // Measure navigation response times
      const responseTimes: number[] = []
      
      for (let i = 0; i < 5; i++) {
        const startTime = performance.now()
        
        await nextButton.click()
        
        // Wait for animation to complete
        await page.waitForTimeout(400)
        
        const endTime = performance.now()
        const responseTime = endTime - startTime
        responseTimes.push(responseTime)
        
        console.log(`Navigation ${i + 1} response time: ${responseTime}ms`)
      }
      
      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      console.log('Average Response Time:', avgResponseTime, 'ms')
      
      // Average response time should be under 500ms for smooth UX
      expect(avgResponseTime).toBeLessThan(500)
      
      // No single response should exceed 1000ms
      responseTimes.forEach((time, index) => {
        expect(time).toBeLessThan(1000)
      })
    }
  })
  
  test('evaluates image loading performance for Portuguese cultural content', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Track image loading times
    const imageLoadTimes = await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = document.querySelectorAll('.lusophone-carousel img')
        const loadTimes: { src: string; loadTime: number }[] = []
        let loadedCount = 0
        
        if (images.length === 0) {
          resolve([])
          return
        }
        
        images.forEach((img: HTMLImageElement) => {
          const startTime = performance.now()
          
          if (img.complete) {
            loadTimes.push({
              src: img.src.substring(0, 50) + '...',
              loadTime: 0 // Already loaded
            })
            loadedCount++
            
            if (loadedCount === images.length) {
              resolve(loadTimes)
            }
          } else {
            img.addEventListener('load', () => {
              const loadTime = performance.now() - startTime
              loadTimes.push({
                src: img.src.substring(0, 50) + '...',
                loadTime
              })
              loadedCount++
              
              if (loadedCount === images.length) {
                resolve(loadTimes)
              }
            })
            
            img.addEventListener('error', () => {
              loadTimes.push({
                src: img.src.substring(0, 50) + '...',
                loadTime: -1 // Error loading
              })
              loadedCount++
              
              if (loadedCount === images.length) {
                resolve(loadTimes)
              }
            })
          }
        })
        
        // Timeout after 10 seconds
        setTimeout(() => {
          resolve(loadTimes)
        }, 10000)
      })
    })
    
    console.log('Image Load Times:', imageLoadTimes)
    
    // Check image loading performance
    imageLoadTimes.forEach((imageLoad) => {
      if (imageLoad.loadTime > 0) {
        // Individual images should load within 3 seconds
        expect(imageLoad.loadTime).toBeLessThan(3000)
      }
    })
  })
  
  test('measures JavaScript execution time for carousel initialization', async ({ page }) => {
    // Enable JavaScript CPU profiling
    const client = await page.context().newCDPSession(page)
    await client.send('Profiler.enable')
    
    await client.send('Profiler.start')
    
    await page.goto('/')
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    // Stop profiling
    const profile = await client.send('Profiler.stop')
    
    // Analyze the profile for carousel-related execution
    const totalDuration = profile.profile.endTime - profile.profile.startTime
    console.log('Total JavaScript Execution Time:', totalDuration / 1000, 'ms')
    
    // Total JS execution should be reasonable
    expect(totalDuration / 1000).toBeLessThan(2000) // Under 2 seconds
  })
  
  test('tests carousel performance under network throttling', async ({ page, context }) => {
    // Simulate slow 3G network
    const client = await context.newCDPSession(page)
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 400 * 1024 / 8, // 400 Kbps
      uploadThroughput: 400 * 1024 / 8,
      latency: 2000 // 2 second latency
    })
    
    const startTime = Date.now()
    await page.goto('/')
    
    // Carousel should still be usable on slow network
    await page.waitForSelector('.lusophone-carousel', { timeout: 30000 })
    
    const loadTime = Date.now() - startTime
    console.log('Carousel Load Time on Slow Network:', loadTime, 'ms')
    
    // Should load within 30 seconds even on slow network
    expect(loadTime).toBeLessThan(30000)
    
    // Test carousel functionality
    const nextButton = page.locator('button[aria-label*="Next"]').first()
    if (await nextButton.count() > 0) {
      await nextButton.click()
      await page.waitForTimeout(500) // Allow for potential animation
    }
  })
  
  test('evaluates carousel bundle size impact', async ({ page }) => {
    await page.goto('/')
    
    // Get all loaded JavaScript bundles
    const bundles = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'))
      return scripts.map((script: HTMLScriptElement) => ({
        src: script.src,
        async: script.async,
        defer: script.defer
      }))
    })
    
    console.log('Loaded JavaScript bundles:', bundles)
    
    // Check for carousel-related bundles
    const carouselBundles = bundles.filter(bundle => 
      bundle.src.includes('carousel') || 
      bundle.src.includes('framer-motion') ||
      bundle.src.includes('swiper')
    )
    
    console.log('Carousel-related bundles:', carouselBundles)
    
    // Monitor network requests for bundle sizes
    const responses = await page.evaluate(() => {
      return (performance.getEntriesByType('navigation') as PerformanceNavigationTiming[])
        .concat(performance.getEntriesByType('resource') as PerformanceResourceTiming[])
        .map(entry => ({
          name: entry.name.substring(entry.name.lastIndexOf('/') + 1),
          size: entry.transferSize || 0,
          duration: entry.duration
        }))
    })
    
    const jsResponses = responses.filter(r => r.name.includes('.js'))
    console.log('JavaScript bundle sizes:', jsResponses)
    
    // Total JavaScript should be reasonable for mobile
    const totalJSSize = jsResponses.reduce((sum, r) => sum + r.size, 0)
    console.log('Total JavaScript Size:', totalJSSize / 1024, 'KB')
    
    // Should keep total JS under 1MB for good mobile performance
    expect(totalJSSize).toBeLessThan(1024 * 1024) // 1MB
  })
  
  test('measures carousel scroll performance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile viewport
    await page.goto('/')
    
    await page.waitForSelector('.lusophone-carousel', { timeout: 10000 })
    
    const carousel = page.locator('.lusophone-carousel').first()
    
    // Measure scroll performance
    const scrollMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0
        let startTime = performance.now()
        
        const measureFrames = () => {
          frameCount++
          
          if (frameCount < 60) { // Measure for ~1 second
            requestAnimationFrame(measureFrames)
          } else {
            const endTime = performance.now()
            const fps = frameCount / ((endTime - startTime) / 1000)
            resolve({ fps, duration: endTime - startTime })
          }
        }
        
        // Trigger scrolling animation
        const carouselElement = document.querySelector('.lusophone-carousel')
        if (carouselElement) {
          carouselElement.scrollBy({ left: 100, behavior: 'smooth' })
        }
        
        requestAnimationFrame(measureFrames)
      })
    })
    
    console.log('Scroll Performance:', scrollMetrics)
    
    // Should maintain reasonable frame rate (at least 30 FPS)
    expect(scrollMetrics.fps).toBeGreaterThan(30)
  })
})