'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { MajesticButton } from './EliteMicroInteractions'
import { 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  CheckCircleIcon, 
  InformationCircleIcon,
  ShieldExclamationIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface EliteErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  culturalSensitivity?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class EliteErrorBoundary extends React.Component<EliteErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: EliteErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    this.props.onError?.(error, errorInfo)
    
    // Log to analytics with Lusophone cultural context
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
        custom_map: {
          cultural_context: this.props.culturalSensitivity ? 'portuguese_community' : 'general'
        }
      })
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <EliteErrorDisplay
          error={this.state.error}
          culturalSensitivity={this.props.culturalSensitivity}
          onRetry={this.handleRetry}
        />
      )
    }

    return this.props.children
  }
}

interface EliteErrorDisplayProps {
  error: Error | null
  culturalSensitivity?: boolean
  onRetry?: () => void
  className?: string
}

function EliteErrorDisplay({
  error,
  culturalSensitivity = false,
  onRetry,
  className = ''
}: EliteErrorDisplayProps) {
  const { t, language } = useLanguage()

  const culturalMessages = {
    title: language === 'pt' 
      ? 'Pedimos desculpa pelo inconveniente' 
      : 'We sincerely apologize for the inconvenience',
    
    description: language === 'pt'
      ? 'Algo inesperado aconteceu na nossa plataforma da comunidade de falantes de português. A nossa equipa está a trabalhar para resolver esta situação.'
      : 'Something unexpected occurred on our Portuguese-speaking community platform. Our team is working to resolve this situation.',
    
    technical: language === 'pt'
      ? 'Detalhes técnicos (para desenvolvimento)'
      : 'Technical details (for development)',
    
    retry: language === 'pt' 
      ? 'Tentar novamente' 
      : 'Try again',
    
    home: language === 'pt' 
      ? 'Voltar ao início' 
      : 'Return to home',
    
    support: language === 'pt'
      ? 'Contactar suporte técnico'
      : 'Contact technical support'
  }

  const standardMessages = {
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Our team has been notified and is working to resolve this issue.',
    technical: 'Technical details (development mode)',
    retry: 'Try again',
    home: 'Go back home',
    support: 'Contact technical support'
  }

  const messages = culturalSensitivity ? culturalMessages : standardMessages

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        culturalSensitivity ? 'bg-gradient-to-br from-red-50 via-amber-50 to-green-50' : 'bg-gray-50',
        className
      )}
    >
      <div className={cn(
        'max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden',
        culturalSensitivity && 'border-2 border-amber-200/50'
      )}>
        {/* Sophisticated header with cultural elements */}
        <div className={cn(
          'px-8 py-6 text-center',
          culturalSensitivity 
            ? 'bg-gradient-to-r from-red-500/10 via-amber-500/15 to-green-500/10' 
            : 'bg-gray-100'
        )}>
          {/* Cultural pattern overlay */}
          {culturalSensitivity && (
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpattern id='error-azulejo' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath d='M20,4 L36,20 L20,36 L4,20 Z' fill='rgba(212,165,116,0.1)' stroke='rgba(212,165,116,0.05)' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='3' fill='rgba(220,38,38,0.05)'/%3E%3C/pattern%3E%3Crect width='80' height='80' fill='url(%23error-azulejo)'/%3E%3C/svg%3E")`,
                  backgroundSize: '80px 80px'
                }}
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center space-y-4">
            {/* Sophisticated error icon with cultural elements */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className={cn(
                'p-4 rounded-full',
                culturalSensitivity 
                  ? 'bg-gradient-to-br from-red-100 to-amber-100' 
                  : 'bg-red-100'
              )}>
                {culturalSensitivity ? (
                  <HeartIcon className="w-12 h-12 text-red-500" />
                ) : (
                  <ExclamationTriangleIcon className="w-12 h-12 text-red-500" />
                )}
              </div>
              
              {/* Portuguese heritage accent */}
              {culturalSensitivity && (
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <StarIcon className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>

            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  'text-2xl font-bold',
                  culturalSensitivity ? 'text-red-800' : 'text-gray-900'
                )}
              >
                {messages.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={cn(
                  'text-lg leading-relaxed',
                  culturalSensitivity ? 'text-amber-700' : 'text-gray-600'
                )}
              >
                {messages.description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Action buttons with sophisticated styling */}
        <div className="px-8 py-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onRetry && (
              <MajesticButton
                variant={culturalSensitivity ? "aristocratic" : "royal"}
                size="lg"
                luxury={true}
                culturalHeritage={culturalSensitivity}
                hapticFeedback={true}
                onClick={onRetry}
                className="flex-1 sm:flex-none min-w-[160px]"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mr-2"
                >
                  ↻
                </motion.div>
                {messages.retry}
              </MajesticButton>
            )}

            <MajesticButton
              variant={culturalSensitivity ? "imperial" : "diamond"}
              size="lg"
              luxury={true}
              culturalHeritage={culturalSensitivity}
              onClick={() => window.location.href = '/'}
              className="flex-1 sm:flex-none min-w-[160px]"
            >
              <HeartIcon className="w-5 h-5 mr-2" />
              {messages.home}
            </MajesticButton>
          </div>

          {/* Cultural support message */}
          {culturalSensitivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-200/50"
            >
              <p className="text-sm text-amber-700">
                {language === 'pt' 
                  ? '🇵🇹 A nossa comunidade de falantes de português está sempre aqui para si. Entre em contacto connosco em'
                  : '🇵🇹 Our Portuguese-speaking community is always here for you. Contact us at'
                } <a href="mailto:support@lusotown.com" className="font-semibold underline hover:text-amber-800">support@lusotown.com</a>
              </p>
            </motion.div>
          )}
        </div>

        {/* Development error details */}
        {process.env.NODE_ENV === 'development' && error && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="px-8 pb-6"
          >
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 mb-2">
              {messages.technical}
            </summary>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-xs text-gray-700 overflow-auto max-h-40">
              <div className="mb-2">
                <strong>Error:</strong> {error.message}
              </div>
              <div>
                <strong>Stack:</strong>
                <pre className="whitespace-pre-wrap mt-1">{error.stack}</pre>
              </div>
            </div>
          </motion.details>
        )}
      </div>
    </motion.div>
  )
}

type NotificationVariant = 'success' | 'warning' | 'error' | 'info' | 'cultural'

interface EliteNotificationProps {
  variant: NotificationVariant
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  culturalTheme?: boolean
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  className?: string
}

export function EliteNotification({
  variant,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
  culturalTheme = false,
  position = 'top-right',
  className = ''
}: EliteNotificationProps) {
  const timerRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (isVisible && autoClose) {
      timerRef.current = setTimeout(() => {
        onClose()
      }, autoCloseDelay)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose])

  const variantConfig = {
    success: {
      icon: CheckCircleIcon,
      colors: culturalTheme 
        ? 'bg-gradient-to-r from-green-50 to-amber-50 border-green-200 text-green-800'
        : 'bg-green-50 border-green-200 text-green-800',
      iconColor: 'text-green-500'
    },
    warning: {
      icon: ExclamationTriangleIcon,
      colors: culturalTheme
        ? 'bg-gradient-to-r from-amber-50 to-red-50 border-amber-200 text-amber-800'
        : 'bg-amber-50 border-amber-200 text-amber-800',
      iconColor: 'text-amber-500'
    },
    error: {
      icon: XCircleIcon,
      colors: culturalTheme
        ? 'bg-gradient-to-r from-red-50 to-amber-50 border-red-200 text-red-800'
        : 'bg-red-50 border-red-200 text-red-800',
      iconColor: 'text-red-500'
    },
    info: {
      icon: InformationCircleIcon,
      colors: culturalTheme
        ? 'bg-gradient-to-r from-blue-50 to-amber-50 border-blue-200 text-blue-800'
        : 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-500'
    },
    cultural: {
      icon: HeartIcon,
      colors: 'bg-gradient-to-r from-red-50 via-amber-50 to-green-50 border-amber-200 text-amber-800',
      iconColor: 'text-amber-500'
    }
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4'
  }

  const config = variantConfig[variant]
  const IconComponent = config.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            'fixed z-50 max-w-md w-full',
            positionClasses[position],
            className
          )}
        >
          <div className={cn(
            'rounded-2xl border-2 p-4 shadow-xl backdrop-blur-sm',
            'transform-gpu transition-all duration-300 hover:shadow-2xl',
            config.colors
          )}>
            {/* Cultural pattern overlay for cultural variant */}
            {(variant === 'cultural' || culturalTheme) && (
              <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cpattern id='notification-pattern' x='0' y='0' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Crect width='30' height='30' fill='none'/%3E%3Cpath d='M15,3 L27,15 L15,27 L3,15 Z' fill='rgba(212,165,116,0.1)'/%3E%3C/pattern%3E%3Crect width='60' height='60' fill='url(%23notification-pattern)'/%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}
                />
              </div>
            )}

            <div className="relative flex items-start space-x-3">
              {/* Sophisticated icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex-shrink-0"
              >
                <div className={cn(
                  'p-1 rounded-full',
                  variant === 'cultural' && 'bg-gradient-to-br from-red-100 to-green-100'
                )}>
                  <IconComponent className={cn('w-6 h-6', config.iconColor)} />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.h4
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-sm font-semibold leading-5"
                >
                  {title}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="mt-1 text-sm leading-5 opacity-90"
                >
                  {message}
                </motion.p>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <XCircleIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
              </motion.button>
            </div>

            {/* Progress bar for auto-close */}
            {autoClose && isVisible && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-2xl"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: autoCloseDelay / 1000, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing elite notifications
export function useEliteNotifications() {
  const [notifications, setNotifications] = React.useState<Array<{
    id: string
    variant: NotificationVariant
    title: string
    message: string
    culturalTheme?: boolean
    position?: EliteNotificationProps['position']
  }>>([])

  const addNotification = React.useCallback((notification: Omit<typeof notifications[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const showSuccess = React.useCallback((title: string, message: string, culturalTheme = false) => {
    addNotification({ variant: 'success', title, message, culturalTheme })
  }, [addNotification])

  const showError = React.useCallback((title: string, message: string, culturalTheme = false) => {
    addNotification({ variant: 'error', title, message, culturalTheme })
  }, [addNotification])

  const showWarning = React.useCallback((title: string, message: string, culturalTheme = false) => {
    addNotification({ variant: 'warning', title, message, culturalTheme })
  }, [addNotification])

  const showInfo = React.useCallback((title: string, message: string, culturalTheme = false) => {
    addNotification({ variant: 'info', title, message, culturalTheme })
  }, [addNotification])

  const showCultural = React.useCallback((title: string, message: string) => {
    addNotification({ variant: 'cultural', title, message, culturalTheme: true })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCultural
  }
}

// Global notification container component
export function EliteNotificationContainer() {
  const { notifications, removeNotification } = useEliteNotifications()

  return (
    <>
      {notifications.map((notification) => (
        <EliteNotification
          key={notification.id}
          variant={notification.variant}
          title={notification.title}
          message={notification.message}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
          culturalTheme={notification.culturalTheme}
          position={notification.position}
        />
      ))}
    </>
  )
}