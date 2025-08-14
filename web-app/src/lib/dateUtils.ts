// Consistent date formatting utilities for server/client hydration compatibility

export interface DateFormatOptions {
  weekday?: 'short' | 'long'
  month?: 'short' | 'long' | 'numeric'
  day?: 'numeric'
  year?: 'numeric'
  hour?: 'numeric'
  minute?: 'numeric'
}

// Custom date formatter that ensures consistent output between server and client
export function formatDateConsistent(
  date: Date | string, 
  locale: string = 'en-GB', 
  options: DateFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }

  const defaults: DateFormatOptions = {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  }
  
  const finalOptions = { ...defaults, ...options }
  
  try {
    // Use a consistent approach that works the same on server and client
    const formatter = new Intl.DateTimeFormat(locale, finalOptions)
    return formatter.format(dateObj)
  } catch (error) {
    // Fallback for any formatting issues
    return dateObj.toISOString().split('T')[0]
  }
}

// Portuguese-aware date formatting
export function formatPortugueseDate(
  date: Date | string,
  isPortuguese: boolean = false,
  options: DateFormatOptions = {}
): string {
  const locale = isPortuguese ? 'pt-PT' : 'en-GB'
  return formatDateConsistent(date, locale, options)
}

// Specific formatters for common use cases
export function formatEventDate(date: Date | string, isPortuguese: boolean = false): string {
  return formatPortugueseDate(date, isPortuguese, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export function formatEventDateTime(date: Date | string, isPortuguese: boolean = false): string {
  return formatPortugueseDate(date, isPortuguese, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

export function formatProfileDate(date: Date | string, isPortuguese: boolean = false): string {
  return formatPortugueseDate(date, isPortuguese, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Helper for consistent timezone handling
export function normalizeDate(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  // Ensure we're working with the date in a consistent timezone
  return new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000)
}