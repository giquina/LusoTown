// Consistent date formatting utilities for server/client hydration compatibility

export interface DateFormatOptions {
  weekday?: 'short' | 'long'
  month?: 'short' | 'long' | 'numeric'
  day?: 'numeric'
  year?: 'numeric'
  hour?: 'numeric'
  minute?: 'numeric'
}

// Predefined mappings to ensure consistent output between server and client
const WEEKDAYS_EN_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_EN_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const WEEKDAYS_PT_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const WEEKDAYS_PT_LONG = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

const MONTHS_EN_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_EN_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_PT_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const MONTHS_PT_LONG = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// Manual date formatter that ensures identical output between server and client
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
  
  const isPortuguese = locale.startsWith('pt')
  const parts: string[] = []
  
  // Add weekday if requested
  if (finalOptions.weekday) {
    const dayOfWeek = dateObj.getDay()
    if (finalOptions.weekday === 'short') {
      parts.push(isPortuguese ? WEEKDAYS_PT_SHORT[dayOfWeek] : WEEKDAYS_EN_SHORT[dayOfWeek])
    } else {
      parts.push(isPortuguese ? WEEKDAYS_PT_LONG[dayOfWeek] : WEEKDAYS_EN_LONG[dayOfWeek])
    }
  }
  
  // Add day if requested
  if (finalOptions.day === 'numeric') {
    parts.push(dateObj.getDate().toString())
  }
  
  // Add month if requested
  if (finalOptions.month) {
    const monthIndex = dateObj.getMonth()
    if (finalOptions.month === 'short') {
      parts.push(isPortuguese ? MONTHS_PT_SHORT[monthIndex] : MONTHS_EN_SHORT[monthIndex])
    } else if (finalOptions.month === 'long') {
      parts.push(isPortuguese ? MONTHS_PT_LONG[monthIndex] : MONTHS_EN_LONG[monthIndex])
    } else {
      parts.push((monthIndex + 1).toString())
    }
  }
  
  // Add year if requested
  if (finalOptions.year === 'numeric') {
    parts.push(dateObj.getFullYear().toString())
  }
  
  // Add time if requested
  if (finalOptions.hour === 'numeric' && finalOptions.minute === 'numeric') {
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    parts.push(`${hours}:${minutes}`)
  }
  
  // Join parts with spaces for consistent formatting
  return parts.join(' ')
}

// Lusophone-aware date formatting
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
