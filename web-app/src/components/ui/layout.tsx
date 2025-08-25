import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  mobile?: boolean
  safeArea?: boolean
}

export function PageLayout({ 
  children, 
  className = '', 
  mobile = false,
  safeArea = false,
  ...props 
}: PageLayoutProps) {
  const baseClass = 'lusotown-container'
  const safeAreaClass = safeArea ? 'lusotown-safe-top lusotown-safe-bottom' : ''
  const mobileClass = mobile ? 'lusotown-spacing-page' : ''
  
  return (
    <div 
      className={`${baseClass} ${safeAreaClass} ${mobileClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionLayoutProps {
  children: React.ReactNode
  className?: string
  spacing?: 'compact' | 'default' | 'loose'
  background?: 'white' | 'gray' | 'gradient' | 'none'
  mobile?: boolean
}

export function SectionLayout({ 
  children, 
  className = '', 
  spacing = 'default',
  background = 'none',
  mobile = false,
  ...props 
}: SectionLayoutProps) {
  const spacingClasses = {
    compact: 'py-4 md:py-6',
    default: 'lusotown-spacing-section',
    loose: 'py-12 md:py-16'
  }
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50',
    none: ''
  }
  
  const mobileClass = mobile ? 'lusotown-spacing-page' : 'px-4'
  
  return (
    <section 
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${mobileClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}

interface CardLayoutProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered' | 'flush'
  padding?: 'none' | 'small' | 'medium' | 'large'
  mobile?: boolean
}

export function CardLayout({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'medium',
  mobile = false,
  ...props 
}: CardLayoutProps) {
  const baseClass = 'lusotown-card'
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-lg hover:shadow-xl',
    bordered: 'border-2 border-primary-200',
    flush: 'shadow-none border-none bg-transparent'
  }
  
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'lusotown-spacing-card',
    large: 'p-6'
  }
  
  return (
    <div 
      className={`${baseClass} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface HeaderLayoutProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  mobile?: boolean
  level?: 1 | 2 | 3
}

export function HeaderLayout({ 
  title, 
  subtitle,
  actions,
  className = '', 
  mobile = false,
  level = 1,
  ...props 
}: HeaderLayoutProps) {
  const headerClasses = {
    1: 'lusotown-text-h1',
    2: 'lusotown-text-h2',
    3: 'lusotown-text-h3'
  }
  
  return (
    <div 
      className={`lusotown-spacing-component ${className}`}
      {...props}
    >
      <div className="lusotown-flex-between flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <h1 className={`${headerClasses[level]} lusotown-text-wrap`}>
            {title}
          </h1>
          {subtitle && (
            <div className="lusotown-text-body text-gray-600 lusotown-text-wrap">
              {subtitle}
            </div>
          )}
        </div>
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

interface FormLayoutProps {
  children: React.ReactNode
  className?: string
  spacing?: 'compact' | 'default' | 'loose'
  mobile?: boolean
}

export function FormLayout({ 
  children, 
  className = '', 
  spacing = 'default',
  mobile = false,
  ...props 
}: FormLayoutProps) {
  const spacingClasses = {
    compact: 'space-y-3',
    default: 'space-y-4',
    loose: 'space-y-6'
  }
  
  return (
    <form 
      className={`${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </form>
  )
}

interface FieldLayoutProps {
  label?: React.ReactNode
  children: React.ReactNode
  error?: string
  help?: string
  required?: boolean
  className?: string
  mobile?: boolean
}

export function FieldLayout({ 
  label,
  children, 
  error,
  help,
  required = false,
  className = '', 
  mobile = false,
  ...props 
}: FieldLayoutProps) {
  return (
    <div 
      className={`lusotown-spacing-component ${className}`}
      {...props}
    >
      {label && (
        <label className="lusotown-form-label">
          <span className="lusotown-portuguese-text lusotown-text-wrap">
            {label}
          </span>
          {required && <span className="text-action-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="mt-1">
        {children}
      </div>
      
      {error && (
        <div className="lusotown-error-text lusotown-portuguese-text">
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="lusotown-text-small text-gray-500 lusotown-portuguese-text">
          {help}
        </div>
      )}
    </div>
  )
}

interface ListLayoutProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'divided' | 'bordered' | 'flush'
  spacing?: 'compact' | 'default' | 'loose'
  mobile?: boolean
}

export function ListLayout({ 
  children, 
  className = '', 
  variant = 'default',
  spacing = 'default',
  mobile = false,
  ...props 
}: ListLayoutProps) {
  const variantClasses = {
    default: 'bg-white rounded-xl border border-gray-200',
    divided: 'divide-y divide-gray-200',
    bordered: 'space-y-2',
    flush: ''
  }
  
  const spacingClasses = {
    compact: 'space-y-1',
    default: 'lusotown-spacing-card-gap',
    loose: 'space-y-4'
  }
  
  return (
    <div 
      className={`${variantClasses[variant]} ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface ListItemLayoutProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  mobile?: boolean
  onClick?: () => void
}

export function ListItemLayout({ 
  children, 
  className = '', 
  interactive = false,
  mobile = false,
  onClick,
  ...props 
}: ListItemLayoutProps) {
  const baseClass = interactive 
    ? 'lusotown-touch-target cursor-pointer hover:bg-gray-50 transition-colors duration-150'
    : ''
  
  const Component = interactive ? 'button' : 'div'
  
  return React.createElement(
    Component,
    {
      className: `${baseClass} lusotown-spacing-card flex items-center gap-3 w-full text-left ${className}`,
      onClick: interactive ? onClick : undefined,
      ...props
    },
    children
  )
}

interface EmptyStateLayoutProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  mobile?: boolean
}

export function EmptyStateLayout({ 
  icon,
  title,
  description,
  action,
  className = '', 
  mobile = false,
  ...props 
}: EmptyStateLayoutProps) {
  return (
    <div 
      className={`lusotown-flex-center lusotown-flex-column text-center py-12 ${className}`}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      <h3 className="lusotown-text-h3 text-gray-900 mb-2 lusotown-text-wrap">
        {title}
      </h3>
      
      {description && (
        <p className="lusotown-text-body text-gray-500 mb-6 max-w-md lusotown-text-wrap">
          {description}
        </p>
      )}
      
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}

interface LoadingLayoutProps {
  message?: string
  className?: string
  mobile?: boolean
}

export function LoadingLayout({ 
  message = 'Loading...',
  className = '', 
  mobile = false,
  ...props 
}: LoadingLayoutProps) {
  return (
    <div 
      className={`lusotown-flex-center lusotown-flex-column py-12 ${className}`}
      {...props}
    >
      <div className="lusotown-spinner mb-4"></div>
      <p className="lusotown-text-body text-gray-500 lusotown-portuguese-text">
        {message}
      </p>
    </div>
  )
}

interface SkeletonLayoutProps {
  lines?: number
  className?: string
  mobile?: boolean
}

export function SkeletonLayout({ 
  lines = 3,
  className = '', 
  mobile = false,
  ...props 
}: SkeletonLayoutProps) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className={`lusotown-skeleton h-4 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}