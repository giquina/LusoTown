export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  memoryUsage: number
  networkRequests: number
  cacheHitRate: number
}

export class PerformanceTester {
  private startTime: number = 0
  private metrics: Partial<PerformanceMetrics> = {}
  
  startTiming(): void {
    this.startTime = performance.now()
    this.metrics = {}
  }
  
  endTiming(): number {
    const endTime = performance.now()
    const duration = endTime - this.startTime
    this.metrics.loadTime = duration
    return duration
  }
  
  measureRenderTime(component: () => void): number {
    const start = performance.now()
    component()
    const end = performance.now()
    const renderTime = end - start
    this.metrics.renderTime = renderTime
    return renderTime
  }
  
  getMetrics(): PerformanceMetrics {
    return {
      loadTime: this.metrics.loadTime || 0,
      renderTime: this.metrics.renderTime || 0,
      interactionTime: this.metrics.interactionTime || 0,
      memoryUsage: this.metrics.memoryUsage || 0,
      networkRequests: this.metrics.networkRequests || 0,
      cacheHitRate: this.metrics.cacheHitRate || 0,
    }
  }
}

export const performanceThresholds = {
  loadTime: {
    excellent: 100,
    good: 300,
    acceptable: 1000,
    poor: 3000,
  },
  renderTime: {
    excellent: 16,
    good: 33,
    acceptable: 50,
    poor: 100,
  },
  mobile: {
    touchResponseTime: {
      excellent: 10,
      good: 30,
      acceptable: 50,
      poor: 100,
    },
  },
}
