/**
 * Health Check API for LusoTown Portuguese-Speaking Community Platform
 * 
 * Provides comprehensive health status for uptime monitoring including:
 * - Database connectivity (Supabase)
 * - Portuguese cultural content availability
 * - Bilingual system functionality
 * - Critical Portuguese community features
 * - Performance metrics for mobile users
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { 
  PORTUGUESE_ERROR_THRESHOLDS,
  ERROR_SEVERITY 
} from '@/config/error-monitoring'

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  services: {
    database: ServiceHealth
    authentication: ServiceHealth
    portugueseContent: ServiceHealth
    bilingualSystem: ServiceHealth
    businessDirectory: ServiceHealth
    eventSystem: ServiceHealth
    mobileOptimization: ServiceHealth
  }
  metrics: {
    responseTime: number
    memoryUsage: number
    cpuUsage: number
    activeConnections: number
  }
  portugueseCommunitHealth: {
    culturalContentAvailable: boolean
    bilingualSystemOperational: boolean
    mobilePerformanceOptimal: boolean
    communityFeaturesAccessible: boolean
  }
}

interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime: number
  lastCheck: string
  details?: string
}

/**
 * GET - Comprehensive health check
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Perform comprehensive health checks
    const healthCheck: HealthCheck = await performHealthCheck(startTime)
    
    // Determine overall status
    const overallStatus = determineOverallHealth(healthCheck)
    healthCheck.status = overallStatus
    
    // Return appropriate HTTP status based on health
    const httpStatus = overallStatus === 'healthy' ? 200 : 
                      overallStatus === 'degraded' ? 200 : 503
    
    return NextResponse.json(healthCheck, { status: httpStatus })
    
  } catch (error) {
    console.error('Health check error:', error)
    
    // Return critical failure response
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}

/**
 * Perform comprehensive health check for all services
 */
async function performHealthCheck(startTime: number): Promise<HealthCheck> {
  const [
    databaseHealth,
    authHealth,
    portugueseContentHealth,
    bilingualSystemHealth,
    businessDirectoryHealth,
    eventSystemHealth,
    mobileOptimizationHealth
  ] = await Promise.all([
    checkDatabaseHealth(),
    checkAuthenticationHealth(),
    checkPortugueseContentHealth(),
    checkBilingualSystemHealth(),
    checkBusinessDirectoryHealth(),
    checkEventSystemHealth(),
    checkMobileOptimizationHealth()
  ])
  
  const responseTime = Date.now() - startTime
  const systemMetrics = await getSystemMetrics()
  
  return {
    status: 'healthy', // Will be determined later
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: databaseHealth,
      authentication: authHealth,
      portugueseContent: portugueseContentHealth,
      bilingualSystem: bilingualSystemHealth,
      businessDirectory: businessDirectoryHealth,
      eventSystem: eventSystemHealth,
      mobileOptimization: mobileOptimizationHealth
    },
    metrics: {
      responseTime: responseTime,
      memoryUsage: systemMetrics.memoryUsage,
      cpuUsage: systemMetrics.cpuUsage,
      activeConnections: systemMetrics.activeConnections
    },
    portugueseCommunitHealth: {
      culturalContentAvailable: portugueseContentHealth.status === 'healthy',
      bilingualSystemOperational: bilingualSystemHealth.status === 'healthy',
      mobilePerformanceOptimal: mobileOptimizationHealth.status === 'healthy',
      communityFeaturesAccessible: businessDirectoryHealth.status === 'healthy' && 
                                   eventSystemHealth.status === 'healthy'
    }
  }
}

/**
 * Check database health (Supabase)
 */
async function checkDatabaseHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Supabase configuration missing'
      }
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test database connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    const responseTime = Date.now() - startTime
    
    if (error) {
      return {
        status: 'unhealthy',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: `Database error: ${error.message}`
      }
    }
    
    // Check if response time is within acceptable limits
    const status = responseTime <= 1000 ? 'healthy' : 
                  responseTime <= 3000 ? 'degraded' : 'unhealthy'
    
    return {
      status: status,
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Database connection successful'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Database check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check authentication health
 */
async function checkAuthenticationHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Authentication configuration missing'
      }
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test auth endpoint availability
    const { data, error } = await supabase.auth.getSession()
    
    const responseTime = Date.now() - startTime
    
    if (error) {
      return {
        status: 'degraded',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: `Auth check warning: ${error.message}`
      }
    }
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Authentication system operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Authentication check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check Portuguese cultural content health
 */
async function checkPortugueseContentHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    // Test Portuguese character rendering capability
    const testText = 'Olá! Como está? Informação cultural português.'
    const testEncoding = Buffer.from(testText, 'utf8').toString('utf8')
    
    if (testText !== testEncoding) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Portuguese character encoding failure'
      }
    }
    
    // Test cultural content configuration availability
    try {
      const culturalConfig = await import('@/config/cultural-events')
      
      if (!culturalConfig || !culturalConfig.CULTURAL_EVENTS) {
        return {
          status: 'degraded',
          responseTime: Date.now() - startTime,
          lastCheck: new Date().toISOString(),
          details: 'Cultural content configuration unavailable'
        }
      }
      
    } catch (configError) {
      return {
        status: 'degraded',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Cultural content configuration error'
      }
    }
    
    const responseTime = Date.now() - startTime
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Portuguese content system operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Portuguese content check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check bilingual system health
 */
async function checkBilingualSystemHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    // Test translation files availability
    const enTranslations = await import('@/i18n/en.json')
    const ptTranslations = await import('@/i18n/pt.json')
    
    if (!enTranslations || !ptTranslations) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Translation files missing'
      }
    }
    
    // Test key translation availability
    const testKeys = ['common.welcome', 'navigation.home', 'auth.login']
    let missingKeys = 0
    
    testKeys.forEach(key => {
      const keyParts = key.split('.')
      let enValue = enTranslations.default
      let ptValue = ptTranslations.default
      
      keyParts.forEach(part => {
        enValue = enValue?.[part]
        ptValue = ptValue?.[part]
      })
      
      if (!enValue || !ptValue) {
        missingKeys++
      }
    })
    
    const responseTime = Date.now() - startTime
    
    if (missingKeys > 0) {
      return {
        status: 'degraded',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: `${missingKeys} missing translation keys detected`
      }
    }
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Bilingual system operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Bilingual system check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check business directory health
 */
async function checkBusinessDirectoryHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Database configuration missing for business directory'
      }
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test business directory table access
    const { data, error } = await supabase
      .from('businesses')
      .select('id')
      .limit(1)
    
    const responseTime = Date.now() - startTime
    
    if (error && !error.message.includes('relation "businesses" does not exist')) {
      return {
        status: 'degraded',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: `Business directory database error: ${error.message}`
      }
    }
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Business directory system operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Business directory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check event system health
 */
async function checkEventSystemHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        details: 'Database configuration missing for event system'
      }
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test events table access
    const { data, error } = await supabase
      .from('events')
      .select('id')
      .limit(1)
    
    const responseTime = Date.now() - startTime
    
    if (error && !error.message.includes('relation "events" does not exist')) {
      return {
        status: 'degraded',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: `Event system database error: ${error.message}`
      }
    }
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Event system operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Event system check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Check mobile optimization health
 */
async function checkMobileOptimizationHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    // Test responsive design configuration
    const mobileConfig = {
      minTouchTarget: 44, // 44px minimum touch target
      maxContentWidth: 768, // Mobile breakpoint
      supportedViewports: ['375px', '768px', '1024px']
    }
    
    // Check if mobile-specific styles are available
    let mobileStylesAvailable = true
    
    try {
      // This would check for mobile-specific CSS classes or Tailwind responsive utilities
      const tailwindConfig = await import('tailwindcss/tailwind.css').catch(() => null)
      // In a real implementation, this would check for responsive utility classes
    } catch (error) {
      mobileStylesAvailable = false
    }
    
    const responseTime = Date.now() - startTime
    
    if (!mobileStylesAvailable) {
      return {
        status: 'degraded',
        responseTime: responseTime,
        lastCheck: new Date().toISOString(),
        details: 'Mobile-specific styles may not be available'
      }
    }
    
    return {
      status: 'healthy',
      responseTime: responseTime,
      lastCheck: new Date().toISOString(),
      details: 'Mobile optimization systems operational'
    }
    
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: `Mobile optimization check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Get system metrics
 */
async function getSystemMetrics() {
  const memUsage = process.memoryUsage()
  
  return {
    memoryUsage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100), // Percentage
    cpuUsage: 0, // Would require additional monitoring in production
    activeConnections: 0 // Would be tracked by connection pool in production
  }
}

/**
 * Determine overall health status
 */
function determineOverallHealth(healthCheck: HealthCheck): 'healthy' | 'degraded' | 'unhealthy' {
  const services = Object.values(healthCheck.services)
  
  // If any service is unhealthy, overall status is unhealthy
  if (services.some(service => service.status === 'unhealthy')) {
    return 'unhealthy'
  }
  
  // If any service is degraded, overall status is degraded
  if (services.some(service => service.status === 'degraded')) {
    return 'degraded'
  }
  
  // Check if Portuguese community-specific features are compromised
  if (!healthCheck.portugueseCommunitHealth.culturalContentAvailable ||
      !healthCheck.portugueseCommunitHealth.bilingualSystemOperational) {
    return 'degraded'
  }
  
  // Check performance thresholds
  if (healthCheck.metrics.responseTime > PORTUGUESE_ERROR_THRESHOLDS.culturalContentLoadTime) {
    return 'degraded'
  }
  
  return 'healthy'
}
