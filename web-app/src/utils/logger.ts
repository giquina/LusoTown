/**
 * LusoTown Centralized Logging System
 * Comprehensive Winston-based logging with Portuguese cultural context awareness
 * 
 * Features:
 * - Portuguese cultural context metadata
 * - Specific methods for different platform areas (auth, business, AI, etc.)
 * - Production/development configurations
 * - Structured logging with timestamps and severity levels
 * - Replaces all console.log statements across 287+ usage points
 */

import winston from 'winston';

// Portuguese Cultural Context Types
export type CulturalContext = 
  | 'portuguese' // Portugal-specific events/users
  | 'brazilian'  // Brazil-specific events/users
  | 'palop'      // PALOP countries (Angola, Mozambique, Cape Verde, etc.)
  | 'lusophone'  // General Portuguese-speaking community
  | 'mixed';     // Multi-cultural Portuguese-speaking events

// Platform Area Types for Specific Logging Methods
export type PlatformArea = 
  | 'auth'           // Authentication and user management
  | 'businessAction' // Business directory operations
  | 'matchingActivity' // AI-powered matching system
  | 'aiSystem'       // AI systems (LusoBot, notifications, analytics)
  | 'mobile'         // Mobile platform and PWA features
  | 'culturalEvent'; // Cultural events and community activities

// Log Levels
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// Structured Log Entry Interface
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  area: PlatformArea;
  message: string;
  culturalContext?: CulturalContext;
  userId?: string;
  metadata?: Record<string, any>;
  sessionId?: string;
  userAgent?: string;
  url?: string;
}

// Portuguese Cultural Context Metadata
interface CulturalMetadata {
  heritage?: string[];
  language?: 'pt' | 'en';
  region?: string;
  eventType?: 'cultural' | 'business' | 'social' | 'educational';
  lusophoneCountries?: string[];
}

class LusoTownLogger {
  private winston: winston.Logger;
  private isDevelopment: boolean;
  private isDebugEnabled: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    this.isDebugEnabled = this.isDevelopment || Boolean(
      typeof window !== 'undefined' && (window as any).LUSOTOWN_DEBUG
    );

    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';

    // Winston Configuration - Browser vs Server
    if (isBrowser) {
      // Simple console-based logging for browser environment
      this.winston = winston.createLogger({
        level: this.isDevelopment ? 'debug' : 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS Z'
          }),
          winston.format.printf(({ timestamp, level, message, area, culturalContext, ...meta }) => {
            const culturalFlag = this.getCulturalFlag(culturalContext as CulturalContext);
            const areaIcon = this.getAreaIcon(area as PlatformArea);
            return `${timestamp} [${level.toUpperCase()}] ${areaIcon}${culturalFlag} ${message}${Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''}`;
          })
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        ]
      });
    } else {
      // Full Winston configuration for server environment
      this.winston = winston.createLogger({
        level: this.isDevelopment ? 'debug' : 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS Z'
          }),
          winston.format.errors({ stack: true }),
          winston.format.json(),
          winston.format.printf(({ timestamp, level, message, area, culturalContext, ...meta }) => {
            const culturalFlag = this.getCulturalFlag(culturalContext as CulturalContext);
            const areaIcon = this.getAreaIcon(area as PlatformArea);
            return `${timestamp} [${level.toUpperCase()}] ${areaIcon}${culturalFlag} ${message}${Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''}`;
          })
        ),
        transports: [
          // Console Transport (Development)
          ...(this.isDevelopment ? [new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })] : []),
          
          // File Transport (Production - Server only)
          ...(!this.isDevelopment ? [new winston.transports.File({
            filename: 'logs/lusotown-error.log',
            level: 'error',
            maxsize: 10485760, // 10MB
            maxFiles: 5
          })] : []),
          
          ...(!this.isDevelopment ? [new winston.transports.File({
            filename: 'logs/lusotown-combined.log',
            maxsize: 10485760, // 10MB
            maxFiles: 10
          })] : [])
        ]
      });
    }
  }

  // Portuguese Cultural Context Icons
  private getCulturalFlag(context?: CulturalContext): string {
    if (!context) return '';
    
    const flags = {
      portuguese: '🇵🇹',
      brazilian: '🇧🇷', 
      palop: '🌍', // Africa representing PALOP countries
      lusophone: '🤝', // Unity of Portuguese-speaking community
      mixed: '🌐'  // International Portuguese community
    };
    
    return flags[context] + ' ';
  }

  // Platform Area Icons
  private getAreaIcon(area?: PlatformArea): string {
    if (!area) return '📝 ';
    
    const icons = {
      auth: '🔐 ',
      businessAction: '🏢 ',
      matchingActivity: '💖 ',
      aiSystem: '🤖 ',
      mobile: '📱 ',
      culturalEvent: '🎭 '
    };
    
    return icons[area];
  }

  // Core logging method
  private log(
    level: LogLevel, 
    area: PlatformArea, 
    message: string, 
    options: {
      culturalContext?: CulturalContext;
      metadata?: Record<string, any>;
      userId?: string;
      error?: Error;
    } = {}
  ) {
    const { culturalContext, metadata, userId, error } = options;
    
    const logData: any = {
      area,
      culturalContext,
      userId,
      ...metadata
    };

    if (error) {
      logData.error = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
    }

    // Add browser context if available
    if (typeof window !== 'undefined') {
      logData.userAgent = navigator.userAgent;
      logData.url = window.location.href;
      logData.sessionId = sessionStorage.getItem('lusotown_session_id');
    }

    this.winston.log(level, message, logData);
  }

  // Authentication Logging
  auth = {
    info: (message: string, options?: { userId?: string; culturalContext?: CulturalContext; metadata?: any }) => {
      this.log('info', 'auth', message, options);
    },
    
    warn: (message: string, options?: { userId?: string; culturalContext?: CulturalContext; metadata?: any }) => {
      this.log('warn', 'auth', message, options);
    },
    
    error: (message: string, options?: { userId?: string; culturalContext?: CulturalContext; error?: Error; metadata?: any }) => {
      this.log('error', 'auth', message, options);
    },
    
    debug: (message: string, options?: { userId?: string; culturalContext?: CulturalContext; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'auth', message, options);
      }
    }
  };

  // Business Directory Logging
  businessAction = {
    info: (message: string, options?: { culturalContext?: CulturalContext; businessId?: string; metadata?: any }) => {
      this.log('info', 'businessAction', message, { ...options, metadata: { ...options?.metadata, businessId: options?.businessId } });
    },
    
    warn: (message: string, options?: { culturalContext?: CulturalContext; businessId?: string; metadata?: any }) => {
      this.log('warn', 'businessAction', message, { ...options, metadata: { ...options?.metadata, businessId: options?.businessId } });
    },
    
    error: (message: string, options?: { culturalContext?: CulturalContext; businessId?: string; error?: Error; metadata?: any }) => {
      this.log('error', 'businessAction', message, { ...options, metadata: { ...options?.metadata, businessId: options?.businessId } });
    },
    
    debug: (message: string, options?: { culturalContext?: CulturalContext; businessId?: string; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'businessAction', message, { ...options, metadata: { ...options?.metadata, businessId: options?.businessId } });
      }
    }
  };

  // Matching Activity Logging
  matchingActivity = {
    info: (message: string, options?: { culturalContext?: CulturalContext; matchId?: string; userId?: string; metadata?: any }) => {
      this.log('info', 'matchingActivity', message, { ...options, metadata: { ...options?.metadata, matchId: options?.matchId } });
    },
    
    warn: (message: string, options?: { culturalContext?: CulturalContext; matchId?: string; userId?: string; metadata?: any }) => {
      this.log('warn', 'matchingActivity', message, { ...options, metadata: { ...options?.metadata, matchId: options?.matchId } });
    },
    
    error: (message: string, options?: { culturalContext?: CulturalContext; matchId?: string; userId?: string; error?: Error; metadata?: any }) => {
      this.log('error', 'matchingActivity', message, { ...options, metadata: { ...options?.metadata, matchId: options?.matchId } });
    },
    
    debug: (message: string, options?: { culturalContext?: CulturalContext; matchId?: string; userId?: string; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'matchingActivity', message, { ...options, metadata: { ...options?.metadata, matchId: options?.matchId } });
      }
    }
  };

  // AI System Logging (LusoBot, Notifications, Analytics)
  aiSystem = {
    info: (message: string, options?: { culturalContext?: CulturalContext; aiService?: string; userId?: string; metadata?: any }) => {
      this.log('info', 'aiSystem', message, { ...options, metadata: { ...options?.metadata, aiService: options?.aiService } });
    },
    
    warn: (message: string, options?: { culturalContext?: CulturalContext; aiService?: string; userId?: string; metadata?: any }) => {
      this.log('warn', 'aiSystem', message, { ...options, metadata: { ...options?.metadata, aiService: options?.aiService } });
    },
    
    error: (message: string, options?: { culturalContext?: CulturalContext; aiService?: string; userId?: string; error?: Error; metadata?: any }) => {
      this.log('error', 'aiSystem', message, { ...options, metadata: { ...options?.metadata, aiService: options?.aiService } });
    },
    
    debug: (message: string, options?: { culturalContext?: CulturalContext; aiService?: string; userId?: string; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'aiSystem', message, { ...options, metadata: { ...options?.metadata, aiService: options?.aiService } });
      }
    }
  };

  // Mobile Platform Logging
  mobile = {
    info: (message: string, options?: { culturalContext?: CulturalContext; deviceType?: string; userId?: string; metadata?: any }) => {
      this.log('info', 'mobile', message, { ...options, metadata: { ...options?.metadata, deviceType: options?.deviceType } });
    },
    
    warn: (message: string, options?: { culturalContext?: CulturalContext; deviceType?: string; userId?: string; metadata?: any }) => {
      this.log('warn', 'mobile', message, { ...options, metadata: { ...options?.metadata, deviceType: options?.deviceType } });
    },
    
    error: (message: string, options?: { culturalContext?: CulturalContext; deviceType?: string; userId?: string; error?: Error; metadata?: any }) => {
      this.log('error', 'mobile', message, { ...options, metadata: { ...options?.metadata, deviceType: options?.deviceType } });
    },
    
    debug: (message: string, options?: { culturalContext?: CulturalContext; deviceType?: string; userId?: string; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'mobile', message, { ...options, metadata: { ...options?.metadata, deviceType: options?.deviceType } });
      }
    }
  };

  // Cultural Event Logging
  culturalEvent = {
    info: (message: string, options?: { culturalContext?: CulturalContext; eventId?: string; userId?: string; metadata?: any }) => {
      this.log('info', 'culturalEvent', message, { ...options, metadata: { ...options?.metadata, eventId: options?.eventId } });
    },
    
    warn: (message: string, options?: { culturalContext?: CulturalContext; eventId?: string; userId?: string; metadata?: any }) => {
      this.log('warn', 'culturalEvent', message, { ...options, metadata: { ...options?.metadata, eventId: options?.eventId } });
    },
    
    error: (message: string, options?: { culturalContext?: CulturalContext; eventId?: string; userId?: string; error?: Error; metadata?: any }) => {
      this.log('error', 'culturalEvent', message, { ...options, metadata: { ...options?.metadata, eventId: options?.eventId } });
    },
    
    debug: (message: string, options?: { culturalContext?: CulturalContext; eventId?: string; userId?: string; metadata?: any }) => {
      if (this.isDebugEnabled) {
        this.log('debug', 'culturalEvent', message, { ...options, metadata: { ...options?.metadata, eventId: options?.eventId } });
      }
    }
  };

  // General purpose logging methods (maintains backward compatibility)
  info = (message: string, metadata?: any) => {
    this.winston.info(message, metadata);
  };

  warn = (message: string, metadata?: any) => {
    this.winston.warn(message, metadata);
  };

  error = (message: string, metadata?: any) => {
    this.winston.error(message, metadata);
  };

  debug = (message: string, metadata?: any) => {
    if (this.isDebugEnabled) {
      this.winston.debug(message, metadata);
    }
  };

  // Portuguese Cultural Context Helpers
  cultural = {
    // Log with Portuguese cultural context
    portuguese: (level: LogLevel, area: PlatformArea, message: string, metadata?: any) => {
      this.log(level, area, message, { culturalContext: 'portuguese', metadata });
    },
    
    // Log with Brazilian cultural context
    brazilian: (level: LogLevel, area: PlatformArea, message: string, metadata?: any) => {
      this.log(level, area, message, { culturalContext: 'brazilian', metadata });
    },
    
    // Log with PALOP cultural context
    palop: (level: LogLevel, area: PlatformArea, message: string, metadata?: any) => {
      this.log(level, area, message, { culturalContext: 'palop', metadata });
    },
    
    // Log with general Lusophone context
    lusophone: (level: LogLevel, area: PlatformArea, message: string, metadata?: any) => {
      this.log(level, area, message, { culturalContext: 'lusophone', metadata });
    },
    
    // Log with mixed cultural context
    mixed: (level: LogLevel, area: PlatformArea, message: string, metadata?: any) => {
      this.log(level, area, message, { culturalContext: 'mixed', metadata });
    }
  };

  // Performance Monitoring
  performance = {
    start: (operation: string, metadata?: any) => {
      const startTime = performance.now();
      this.debug(`Performance: Starting ${operation}`, { ...metadata, startTime });
      return startTime;
    },
    
    end: (operation: string, startTime: number, metadata?: any) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.info(`Performance: Completed ${operation} in ${duration.toFixed(2)}ms`, { ...metadata, duration });
      return duration;
    }
  };

  // Flush logs (useful for testing and cleanup)
  flush = async (): Promise<void> => {
    return new Promise((resolve) => {
      this.winston.on('finish', resolve);
      this.winston.end();
    });
  };
}

// Create singleton instance
const logger = new LusoTownLogger();

// Export both the instance and class for flexibility
export { LusoTownLogger };
export default logger;

// Backward compatibility with existing simple logger usage
export const legacyLogger = {
  info: logger.info,
  warn: logger.warn,
  error: logger.error
};