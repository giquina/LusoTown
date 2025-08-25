import React from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  level?: 1 | 2 | 3
  mobile?: boolean
  portuguese?: boolean
}

export function Heading({ 
  children, 
  className = '', 
  level = 1, 
  mobile = false,
  portuguese = false,
  ...props 
}: HeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  const levelClasses = {
    1: 'lusotown-text-h1',
    2: 'lusotown-text-h2', 
    3: 'lusotown-text-h3'
  }
  
  const baseClass = levelClasses[level]
  const portugueseClass = portuguese ? 'lusotown-portuguese-text lusotown-text-wrap' : ''
  
  return React.createElement(
    HeadingTag,
    {
      className: `${baseClass} ${portugueseClass} ${className}`,
      ...props
    },
    children
  )
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  variant?: 'body' | 'small' | 'caption'
  mobile?: boolean
  portuguese?: boolean
}

export function Text({ 
  children, 
  className = '', 
  variant = 'body',
  mobile = false,
  portuguese = false,
  ...props 
}: TextProps) {
  const variants = {
    body: 'lusotown-text-body',
    small: 'lusotown-text-small',
    caption: 'lusotown-text-caption'
  }
  
  const baseClass = variants[variant]
  const portugueseClass = portuguese ? 'lusotown-portuguese-text lusotown-text-wrap' : ''
  
  return (
    <p 
      className={`${baseClass} ${portugueseClass} ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  mobile?: boolean
  portuguese?: boolean
  required?: boolean
}

export function Label({ 
  children, 
  className = '', 
  mobile = false,
  portuguese = false,
  required = false,
  ...props 
}: LabelProps) {
  const baseClass = 'lusotown-form-label'
  const portugueseClass = portuguese ? 'lusotown-portuguese-text lusotown-text-wrap' : ''
  
  return (
    <label 
      className={`${baseClass} ${portugueseClass} ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-action-500 ml-1">*</span>}
    </label>
  )
}

interface ErrorTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  mobile?: boolean
  portuguese?: boolean
}

export function ErrorText({ 
  children, 
  className = '', 
  mobile = false,
  portuguese = false,
  ...props 
}: ErrorTextProps) {
  const baseClass = 'lusotown-error-text'
  const portugueseClass = portuguese ? 'lusotown-portuguese-text lusotown-text-wrap' : ''
  
  return (
    <span 
      className={`${baseClass} ${portugueseClass} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </span>
  )
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  mobile?: boolean
  size?: 'default' | 'wide' | 'full'
}

export function Container({ 
  children, 
  className = '', 
  mobile = false,
  size = 'default',
  ...props 
}: ContainerProps) {
  const baseClass = 'lusotown-container'
  const sizeClasses = {
    default: '',
    wide: 'max-w-6xl',
    full: 'max-w-full'
  }
  
  return (
    <div 
      className={`${baseClass} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  mobile?: boolean
  spacing?: 'default' | 'compact' | 'loose'
}

export function Section({ 
  children, 
  className = '', 
  mobile = false,
  spacing = 'default',
  ...props 
}: SectionProps) {
  const spacingClasses = {
    default: 'lusotown-spacing-section',
    compact: 'mb-4',
    loose: 'mb-8'
  }
  
  return (
    <section 
      className={`${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: 'none' | 'small' | 'medium' | 'large'
  mobile?: boolean
}

export function Flex({ 
  children, 
  className = '', 
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'medium',
  mobile = false,
  ...props 
}: FlexProps) {
  const directionClass = direction === 'column' ? 'lusotown-flex-column' : 'lusotown-flex'
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center', 
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  }
  
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6'
  }
  
  return (
    <div 
      className={`${directionClass} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 'auto'
  gap?: 'small' | 'medium' | 'large'
  mobile?: boolean
}

export function Grid({ 
  children, 
  className = '', 
  columns = 'auto',
  gap = 'medium',
  mobile = false,
  ...props 
}: GridProps) {
  const baseClass = 'lusotown-grid'
  
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'lusotown-grid-2',
    3: 'lusotown-grid-3',
    4: 'lusotown-grid-auto',
    auto: 'lusotown-grid-auto'
  }
  
  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4', 
    large: 'gap-6'
  }
  
  return (
    <div 
      className={`${baseClass} ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}