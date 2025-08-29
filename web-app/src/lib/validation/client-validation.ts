/**
 * Client-side Validation Utilities for Portuguese Community Platform
 * Real-time validation with bilingual error messages (EN/PT)
 */

'use client';

import { z } from 'zod';
import { ValidationSchemas, PORTUGUESE_PATTERNS } from '@/lib/security/input-validation';

// Bilingual error messages for client-side validation
export const VALIDATION_MESSAGES = {
  en: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: 'Must be at least {min} characters long',
    maxLength: 'Must not exceed {max} characters',
    invalidCharacters: 'Contains invalid characters',
    phoneNumber: 'Please enter a valid phone number',
    postcode: 'Please enter a valid UK postcode',
    url: 'Please enter a valid website URL',
    dateInFuture: 'Date must be in the future',
    dateInPast: 'Date must be in the past',
    passwordWeak: 'Password is too weak',
    termsRequired: 'You must accept the terms and conditions',
    gdprRequired: 'GDPR consent is required',
    culturalTitle: 'Portuguese title required for cultural celebrations',
    businessCategory: 'Please select a valid business category',
    culturalSpecialty: 'Invalid cultural specialty selection',
    ageRange: 'Invalid age range',
    fileSize: 'File size exceeds 5MB limit',
    fileType: 'Invalid file type',
    rateLimitExceeded: 'Too many requests. Please try again later.',
    portugueseCharacters: 'Text must contain valid Portuguese characters',
  },
  pt: {
    required: 'Este campo é obrigatório',
    email: 'Por favor, insira um endereço de email válido',
    minLength: 'Deve ter pelo menos {min} caracteres',
    maxLength: 'Não deve exceder {max} caracteres',
    invalidCharacters: 'Contém caracteres inválidos',
    phoneNumber: 'Por favor, insira um número de telefone válido',
    postcode: 'Por favor, insira um código postal válido do Reino Unido',
    url: 'Por favor, insira um URL de website válido',
    dateInFuture: 'A data deve estar no futuro',
    dateInPast: 'A data deve estar no passado',
    passwordWeak: 'A palavra-passe é muito fraca',
    termsRequired: 'Deve aceitar os termos e condições',
    gdprRequired: 'O consentimento GDPR é obrigatório',
    culturalTitle: 'Título em português obrigatório para celebrações culturais',
    businessCategory: 'Por favor, selecione uma categoria de negócio válida',
    culturalSpecialty: 'Seleção de especialidade cultural inválida',
    ageRange: 'Faixa etária inválida',
    fileSize: 'O tamanho do ficheiro excede o limite de 5MB',
    fileType: 'Tipo de ficheiro inválido',
    rateLimitExceeded: 'Demasiadas solicitações. Tente novamente mais tarde.',
    portugueseCharacters: 'O texto deve conter caracteres portugueses válidos',
  }
};

// Client-side validation state interface
export interface ValidationState {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings: Record<string, string[]>;
  fieldStates: Record<string, {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    validating: boolean;
  }>;
}

// Real-time field validation
export class PortugueseFieldValidator {
  private language: 'en' | 'pt';
  private validationState: ValidationState;
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(language: 'en' | 'pt' = 'en') {
    this.language = language;
    this.validationState = {
      isValid: true,
      errors: {},
      warnings: {},
      fieldStates: {}
    };
  }

  // Real-time field validation with debouncing
  validateField(fieldName: string, value: any, schema: z.ZodSchema, debounceMs: number = 300): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    return new Promise((resolve) => {
      // Clear existing timer
      const existingTimer = this.debounceTimers.get(fieldName);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // Set field as validating
      this.updateFieldState(fieldName, { validating: true });

      // Create new debounced validation
      const timer = setTimeout(async () => {
        try {
          const result = await this.performFieldValidation(fieldName, value, schema);
          this.updateFieldState(fieldName, { 
            validating: false,
            valid: result.isValid,
            dirty: true
          });
          
          // Update validation state
          if (result.isValid) {
            delete this.validationState.errors[fieldName];
          } else {
            this.validationState.errors[fieldName] = result.errors;
          }
          
          if (result.warnings.length > 0) {
            this.validationState.warnings[fieldName] = result.warnings;
          } else {
            delete this.validationState.warnings[fieldName];
          }

          resolve(result);
        } catch (error) {
          this.updateFieldState(fieldName, { validating: false, valid: false });
          resolve({
            isValid: false,
            errors: [this.getMessage('required')],
            warnings: []
          });
        }

        this.debounceTimers.delete(fieldName);
      }, debounceMs);

      this.debounceTimers.set(fieldName, timer);
    });
  }

  // Perform actual field validation
  private async performFieldValidation(fieldName: string, value: any, schema: z.ZodSchema): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Schema validation
      await schema.parseAsync(value);

      // Additional Portuguese-specific validations
      await this.performPortugueseValidations(fieldName, value, warnings);

    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          errors.push(this.translateZodError(issue));
        }
      } else {
        errors.push(this.getMessage('required'));
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Portuguese-specific validation checks
  private async performPortugueseValidations(fieldName: string, value: string, warnings: string[]): Promise<void> {
    if (typeof value !== 'string' || !value.trim()) return;

    // Check for Portuguese characters if field contains text
    if (fieldName.includes('name') || fieldName.includes('title') || fieldName.includes('description')) {
      if (!PORTUGUESE_PATTERNS.culturalText.test(value)) {
        warnings.push(this.getMessage('portugueseCharacters'));
      }

      // Check for common Portuguese words to suggest Portuguese translation
      const portugueseWords = ['portugal', 'português', 'comunidade', 'festa', 'cultura'];
      const hasPortugueseWords = portugueseWords.some(word => 
        value.toLowerCase().includes(word)
      );

      if (hasPortugueseWords && !fieldName.includes('portuguese') && !fieldName.endsWith('Pt')) {
        warnings.push(this.language === 'en' 
          ? 'Consider adding a Portuguese translation for this field'
          : 'Considere adicionar uma tradução em português para este campo'
        );
      }
    }

    // Phone number format suggestions
    if (fieldName.includes('phone')) {
      const phoneFormats = [
        { pattern: PORTUGUESE_PATTERNS.ukPhone, suggestion: 'UK: +44 20 1234 5678' },
        { pattern: PORTUGUESE_PATTERNS.portugalPhone, suggestion: 'Portugal: +351 123 456 789' },
        { pattern: PORTUGUESE_PATTERNS.brazilPhone, suggestion: 'Brazil: +55 (11) 12345-6789' }
      ];

      const matchingFormat = phoneFormats.find(format => format.pattern.test(value));
      if (!matchingFormat && value.length > 5) {
        warnings.push(this.language === 'en'
          ? 'Suggested formats: UK (+44), Portugal (+351), Brazil (+55)'
          : 'Formatos sugeridos: Reino Unido (+44), Portugal (+351), Brasil (+55)'
        );
      }
    }

    // Email domain suggestions for Portuguese users
    if (fieldName.includes('email') && value.includes('@')) {
      const popularPortugueseDomains = ['gmail.com', 'hotmail.com', 'sapo.pt', 'iol.pt', 'clix.pt'];
      const domain = value.split('@')[1]?.toLowerCase();
      
      if (domain && !popularPortugueseDomains.includes(domain)) {
        const suggestion = this.language === 'en'
          ? 'Popular domains: gmail.com, hotmail.com, sapo.pt'
          : 'Domínios populares: gmail.com, hotmail.com, sapo.pt';
        warnings.push(suggestion);
      }
    }
  }

  // Translate Zod error to localized message
  private translateZodError(issue: z.ZodIssue): string {
    const { code, message, path } = issue;
    
    switch (code) {
      case 'too_small':
        return this.getMessage('minLength').replace('{min}', issue.minimum?.toString() || '1');
      case 'too_big':
        return this.getMessage('maxLength').replace('{max}', issue.maximum?.toString() || '100');
      case 'invalid_string':
        if (issue.validation === 'email') {
          return this.getMessage('email');
        }
        if (issue.validation === 'url') {
          return this.getMessage('url');
        }
        return this.getMessage('invalidCharacters');
      case 'custom':
        return this.translateCustomError(message);
      default:
        return message;
    }
  }

  // Translate custom error messages
  private translateCustomError(message: string): string {
    const translations: Record<string, string> = {
      'Invalid phone number format for Portuguese business': 
        this.language === 'pt' ? 'Formato de telefone inválido para negócio português' : message,
      'GDPR consent required for Portuguese business directory':
        this.language === 'pt' ? 'Consentimento GDPR obrigatório para diretório português' : message,
      'Portuguese title required for cultural celebrations':
        this.language === 'pt' ? 'Título português obrigatório para celebrações culturais' : message,
      'Invalid characters in business name':
        this.language === 'pt' ? 'Caracteres inválidos no nome do negócio' : message,
      'Event must be in the future':
        this.language === 'pt' ? 'O evento deve estar no futuro' : message,
      'End time must be after start time':
        this.language === 'pt' ? 'A hora de fim deve ser depois da hora de início' : message,
    };

    return translations[message] || message;
  }

  // Get localized message
  private getMessage(key: keyof typeof VALIDATION_MESSAGES.en): string {
    return VALIDATION_MESSAGES[this.language][key];
  }

  // Update field state
  private updateFieldState(fieldName: string, state: Partial<ValidationState['fieldStates'][string]>): void {
    this.validationState.fieldStates[fieldName] = {
      ...this.validationState.fieldStates[fieldName],
      touched: false,
      dirty: false,
      valid: false,
      validating: false,
      ...state
    };
  }

  // Mark field as touched
  markFieldTouched(fieldName: string): void {
    this.updateFieldState(fieldName, { touched: true });
  }

  // Get validation state
  getValidationState(): ValidationState {
    return { ...this.validationState };
  }

  // Get field state
  getFieldState(fieldName: string) {
    return this.validationState.fieldStates[fieldName] || {
      touched: false,
      dirty: false,
      valid: true,
      validating: false
    };
  }

  // Check if form is valid
  isFormValid(): boolean {
    return Object.keys(this.validationState.errors).length === 0;
  }

  // Reset validation state
  reset(): void {
    this.validationState = {
      isValid: true,
      errors: {},
      warnings: {},
      fieldStates: {}
    };
    this.debounceTimers.clear();
  }

  // Set language
  setLanguage(language: 'en' | 'pt'): void {
    this.language = language;
  }
}

// Validation hooks for common forms
export function createBusinessValidationHook(language: 'en' | 'pt' = 'en') {
  const validator = new PortugueseFieldValidator(language);
  
  return {
    validateField: (fieldName: string, value: any) => {
      const fieldSchema = getBusinessFieldSchema(fieldName);
      return validator.validateField(fieldName, value, fieldSchema);
    },
    getFieldState: validator.getFieldState.bind(validator),
    markTouched: validator.markFieldTouched.bind(validator),
    isValid: validator.isFormValid.bind(validator),
    reset: validator.reset.bind(validator),
    getState: validator.getValidationState.bind(validator),
  };
}

export function createEventValidationHook(language: 'en' | 'pt' = 'en') {
  const validator = new PortugueseFieldValidator(language);
  
  return {
    validateField: (fieldName: string, value: any) => {
      const fieldSchema = getEventFieldSchema(fieldName);
      return validator.validateField(fieldName, value, fieldSchema);
    },
    getFieldState: validator.getFieldState.bind(validator),
    markTouched: validator.markFieldTouched.bind(validator),
    isValid: validator.isFormValid.bind(validator),
    reset: validator.reset.bind(validator),
    getState: validator.getValidationState.bind(validator),
  };
}

// Get field schema for business forms
function getBusinessFieldSchema(fieldName: string): z.ZodSchema {
  const businessSchema = ValidationSchemas.businessSubmission;
  
  switch (fieldName) {
    case 'name':
      return z.string().min(2).max(100).regex(PORTUGUESE_PATTERNS.businessName);
    case 'email':
      return z.string().email().regex(PORTUGUESE_PATTERNS.email);
    case 'phone':
      return z.string().refine((phone) => {
        return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
               PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
               PORTUGUESE_PATTERNS.brazilPhone.test(phone);
      });
    case 'postcode':
      return z.string().regex(PORTUGUESE_PATTERNS.ukPostalCode);
    case 'website':
      return z.string().regex(PORTUGUESE_PATTERNS.url);
    case 'description':
      return z.string().min(10).max(1000).regex(PORTUGUESE_PATTERNS.culturalText);
    default:
      return z.string().optional();
  }
}

// Get field schema for event forms
function getEventFieldSchema(fieldName: string): z.ZodSchema {
  switch (fieldName) {
    case 'title':
      return z.string().min(5).max(100).regex(PORTUGUESE_PATTERNS.culturalText);
    case 'description':
      return z.string().min(10).max(2000).regex(PORTUGUESE_PATTERNS.culturalText);
    case 'location':
      return z.string().max(200).regex(PORTUGUESE_PATTERNS.address);
    case 'virtualLink':
      return z.string().regex(PORTUGUESE_PATTERNS.url);
    case 'startDatetime':
    case 'endDatetime':
      return z.string().datetime().refine((date) => new Date(date) > new Date());
    case 'price':
      return z.number().min(0).max(1000);
    case 'maxAttendees':
      return z.number().min(1).max(1000);
    default:
      return z.string().optional();
  }
}

// Portuguese character input handler
export function handlePortugueseInput(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  allowSpecialCharacters: boolean = true
): string {
  let value = event.target.value;
  
  // Allow Portuguese special characters
  if (allowSpecialCharacters) {
    // Normalize Portuguese characters for consistent handling
    value = value
      .replace(/[\u00C0-\u00C6]/g, 'A')
      .replace(/[\u00E0-\u00E6]/g, 'a')
      .replace(/\u00C7/g, 'C')
      .replace(/\u00E7/g, 'ç')
      .replace(/[\u00C8-\u00CB]/g, 'E')
      .replace(/[\u00E8-\u00EB]/g, 'e')
      .replace(/[\u00CC-\u00CF]/g, 'I')
      .replace(/[\u00EC-\u00EF]/g, 'i')
      .replace(/\u00D1/g, 'N')
      .replace(/\u00F1/g, 'ñ')
      .replace(/[\u00D2-\u00D6\u00D8]/g, 'O')
      .replace(/[\u00F2-\u00F6\u00F8]/g, 'o')
      .replace(/[\u00D9-\u00DC]/g, 'U')
      .replace(/[\u00F9-\u00FC]/g, 'u');
  }
  
  return value;
}

// Export validation utilities
export { PORTUGUESE_PATTERNS } from '@/lib/security/input-validation';
export { ValidationSchemas } from '@/lib/security/input-validation';