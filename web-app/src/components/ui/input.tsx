import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mobile?: boolean
  error?: string
  label?: string
  help?: string
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'small' | 'medium' | 'large'
}

export function Input({ 
  className = '', 
  type = 'text',
  mobile = false,
  error,
  label,
  help,
  variant = 'default',
  size = 'medium',
  required,
  id,
  ...props 
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const baseClass = 'lusotown-focus w-full rounded-lg border transition-colors duration-150 lusotown-portuguese-text'
  
  const variants = {
    default: 'border-gray-300 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    filled: 'border-transparent bg-gray-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    outlined: 'border-2 border-gray-300 bg-transparent focus:border-primary-500'
  }
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 lusotown-text-body',
    large: 'px-4 py-4 text-lg'
  }
  
  const errorClass = error ? 'border-action-500 focus:border-action-500 focus:ring-action-500' : ''
  const touchClass = mobile ? 'lusotown-touch-target' : ''
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="lusotown-form-label block mb-2">
          <span className="lusotown-portuguese-text lusotown-text-wrap">
            {label}
          </span>
          {required && <span className="text-action-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${errorClass} ${touchClass} ${className}`}
        required={required}
        {...props}
      />
      
      {error && (
        <div className="lusotown-error-text mt-1 lusotown-portuguese-text">
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="lusotown-text-small text-gray-500 mt-1 lusotown-portuguese-text">
          {help}
        </div>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mobile?: boolean
  error?: string
  label?: string
  help?: string
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'small' | 'medium' | 'large'
}

export function Textarea({ 
  className = '', 
  mobile = false,
  error,
  label,
  help,
  variant = 'default',
  size = 'medium',
  required,
  id,
  ...props 
}: TextareaProps) {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const baseClass = 'lusotown-focus w-full rounded-lg border transition-colors duration-150 resize-vertical min-h-[100px] lusotown-portuguese-text'
  
  const variants = {
    default: 'border-gray-300 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    filled: 'border-transparent bg-gray-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
    outlined: 'border-2 border-gray-300 bg-transparent focus:border-primary-500'
  }
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 lusotown-text-body',
    large: 'px-4 py-4 text-lg'
  }
  
  const errorClass = error ? 'border-action-500 focus:border-action-500 focus:ring-action-500' : ''
  const touchClass = mobile ? 'lusotown-touch-target' : ''
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="lusotown-form-label block mb-2">
          <span className="lusotown-portuguese-text lusotown-text-wrap">
            {label}
          </span>
          {required && <span className="text-action-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={inputId}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${errorClass} ${touchClass} ${className}`}
        required={required}
        {...props}
      />
      
      {error && (
        <div className="lusotown-error-text mt-1 lusotown-portuguese-text">
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="lusotown-text-small text-gray-500 mt-1 lusotown-portuguese-text">
          {help}
        </div>
      )}
    </div>
  )
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mobile?: boolean
  error?: string
  label?: string
  onClear?: () => void
}

export function SearchInput({ 
  className = '', 
  mobile = false,
  error,
  label,
  onClear,
  value,
  id,
  ...props 
}: SearchInputProps) {
  const inputId = id || `search-${Math.random().toString(36).substr(2, 9)}`;
  const baseClass = 'lusotown-focus w-full rounded-lg border border-gray-300 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 pl-12 pr-4 py-3 lusotown-text-body transition-colors duration-150 lusotown-portuguese-text'
  const errorClass = error ? 'border-action-500 focus:border-action-500 focus:ring-action-500' : ''
  const touchClass = mobile ? 'lusotown-touch-target' : ''
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="lusotown-form-label block mb-2">
          <span className="lusotown-portuguese-text lusotown-text-wrap">
            {label}
          </span>
        </label>
      )}
      
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          id={inputId}
          type="search"
          className={`${baseClass} ${errorClass} ${touchClass} ${className}`}
          value={value}
          {...props}
        />
        
        {/* Clear button */}
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 lusotown-touch-target"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {error && (
        <div className="lusotown-error-text mt-1 lusotown-portuguese-text">
          {error}
        </div>
      )}
    </div>
  )
}