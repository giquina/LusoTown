import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'event' | 'business' | 'match' | 'premium'
  mobile?: boolean
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  mobile = false,
  ...props 
}: CardProps) {
  // Use LusoTown Mobile Design System classes
  const baseClass = 'lusotown-card lusotown-fade-in'
  
  const variants = {
    default: '',
    event: 'lusotown-event-card',
    business: 'lusotown-business-card',
    match: 'lusotown-match-card',
    premium: 'border-2 border-premium-500 bg-gradient-to-br from-premium-50 to-primary-50'
  }
  
  const mobileClasses = mobile ? 'lusotown-spacing-card-gap' : ''
  
  return (
    <div 
      className={`${baseClass} ${variants[variant]} ${mobileClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  mobile?: boolean
}

export function CardContent({ children, className = '', mobile = false, ...props }: CardContentProps) {
  const mobileClass = mobile ? 'lusotown-card-content' : 'lusotown-card-content'
  
  return (
    <div 
      className={`${mobileClass} ${className}`}
      {...props}
    >
      <div className="lusotown-portuguese-text">
        {children}
      </div>
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  mobile?: boolean
}

export function CardHeader({ children, className = '', mobile = false, ...props }: CardHeaderProps) {
  const mobileClass = mobile ? 'lusotown-card-header' : 'lusotown-card-header'
  
  return (
    <div 
      className={`${mobileClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  mobile?: boolean
}

export function CardTitle({ children, className = '', mobile = false, ...props }: CardTitleProps) {
  const mobileClass = mobile ? 'lusotown-text-h3' : 'lusotown-text-h3'
  
  return (
    <h3 
      className={`${mobileClass} lusotown-text-wrap ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  mobile?: boolean
}

export function CardDescription({ children, className = '', mobile = false, ...props }: CardDescriptionProps) {
  const mobileClass = mobile ? 'lusotown-text-body' : 'lusotown-text-body'
  
  return (
    <p 
      className={`${mobileClass} text-gray-600 mt-2 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  mobile?: boolean
}

export function CardFooter({ children, className = '', mobile = false, ...props }: CardFooterProps) {
  const mobileClass = mobile ? 'lusotown-card-footer' : 'lusotown-card-footer'
  
  return (
    <div 
      className={`${mobileClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}