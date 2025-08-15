// Enhanced booking form state management and validation utilities

import { pricingEngine, BookingDetails, PricingBreakdown } from './chauffeurPricing'

export interface BookingFormData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  
  // Trip Details
  date: string
  time: string
  pickupLocation: string
  destinations: string
  
  // Service Preferences
  serviceId: string
  serviceType: 'tier' | 'package'
  eventType: string
  securityPreference: string
  duration: number
  
  // Additional Options
  additionalNotes: string
  specialRequirements: string[]
  isMultiDay: boolean
  numberOfDays: number
  membershipLevel?: 'free' | 'business' | 'ambassador'
  
  // Pricing
  pricingBreakdown?: PricingBreakdown
  acceptedTerms: boolean
}

export interface FormValidationError {
  field: string
  message: string
  messagePortuguese: string
}

export interface FormStep {
  id: number
  name: string
  namePortuguese: string
  fields: (keyof BookingFormData)[]
  isValid: boolean
  isComplete: boolean
}

class BookingFormManager {
  private formData: BookingFormData
  private errors: Map<string, FormValidationError> = new Map()
  private validationRules: ValidationRules
  private listeners: ((data: BookingFormData) => void)[] = []

  constructor(initialData?: Partial<BookingFormData>) {
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      pickupLocation: '',
      destinations: '',
      serviceId: '',
      serviceType: 'tier',
      eventType: '',
      securityPreference: '',
      duration: 2,
      additionalNotes: '',
      specialRequirements: [],
      isMultiDay: false,
      numberOfDays: 1,
      acceptedTerms: false,
      ...initialData
    }
    
    this.validationRules = new ValidationRules()
  }

  // Update form field with automatic validation and pricing recalculation
  updateField<K extends keyof BookingFormData>(
    field: K, 
    value: BookingFormData[K],
    options: { skipValidation?: boolean; skipPricing?: boolean } = {}
  ): void {
    this.formData[field] = value
    
    // Clear previous error for this field
    this.errors.delete(field)
    
    // Validate if not skipped
    if (!options.skipValidation) {
      this.validateField(field)
    }
    
    // Recalculate pricing for relevant fields
    if (!options.skipPricing && this.isPricingRelevantField(field)) {
      this.updatePricing()
    }
    
    // Notify listeners
    this.notifyListeners()
  }

  // Update multiple fields at once
  updateFields(
    updates: Partial<BookingFormData>,
    options: { skipValidation?: boolean; skipPricing?: boolean } = {}
  ): void {
    Object.entries(updates).forEach(([field, value]) => {
      this.formData[field as keyof BookingFormData] = value as any
    })
    
    if (!options.skipValidation) {
      this.validateAll()
    }
    
    if (!options.skipPricing) {
      this.updatePricing()
    }
    
    this.notifyListeners()
  }

  // Get current form data
  getData(): BookingFormData {
    return { ...this.formData }
  }

  // Get specific field value
  getField<K extends keyof BookingFormData>(field: K): BookingFormData[K] {
    return this.formData[field]
  }

  // Validate specific field
  validateField(field: keyof BookingFormData): boolean {
    const error = this.validationRules.validateField(field, this.formData[field], this.formData)
    
    if (error) {
      this.errors.set(field, error)
      return false
    }
    
    this.errors.delete(field)
    return true
  }

  // Validate all fields
  validateAll(): boolean {
    this.errors.clear()
    
    Object.keys(this.formData).forEach(field => {
      this.validateField(field as keyof BookingFormData)
    })
    
    return this.errors.size === 0
  }

  // Validate specific step
  validateStep(step: FormStep): boolean {
    let isValid = true
    
    step.fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })
    
    return isValid
  }

  // Get validation errors
  getErrors(): FormValidationError[] {
    return Array.from(this.errors.values())
  }

  // Get error for specific field
  getFieldError(field: keyof BookingFormData): FormValidationError | undefined {
    return this.errors.get(field)
  }

  // Check if form is valid
  isValid(): boolean {
    return this.errors.size === 0 && this.validateAll()
  }

  // Update pricing calculation
  private updatePricing(): void {
    if (!this.canCalculatePricing()) {
      this.formData.pricingBreakdown = undefined
      return
    }

    const bookingDetails: BookingDetails = {
      serviceId: this.formData.serviceId,
      serviceType: this.formData.serviceType,
      date: this.formData.date,
      duration: this.formData.duration,
      membershipLevel: this.formData.membershipLevel,
      eventType: this.formData.eventType,
      isMultiDay: this.formData.isMultiDay,
      numberOfDays: this.formData.numberOfDays
    }

    try {
      this.formData.pricingBreakdown = pricingEngine.calculatePricing(bookingDetails)
    } catch (error) {
      console.error('Pricing calculation error:', error)
      this.formData.pricingBreakdown = undefined
    }
  }

  // Check if we have enough data to calculate pricing
  private canCalculatePricing(): boolean {
    return !!
      this.formData.serviceId &&
      this.formData.serviceType &&
      this.formData.date &&
      this.formData.duration > 0
  }

  // Check if field affects pricing
  private isPricingRelevantField(field: keyof BookingFormData): boolean {
    const pricingFields: (keyof BookingFormData)[] = [
      'serviceId',
      'serviceType', 
      'date',
      'duration',
      'membershipLevel',
      'eventType',
      'isMultiDay',
      'numberOfDays'
    ]
    
    return pricingFields.includes(field)
  }

  // Subscribe to form changes
  subscribe(listener: (data: BookingFormData) => void): () => void {
    this.listeners.push(listener)
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getData())
      } catch (error) {
        console.error('Error in form listener:', error)
      }
    })
  }

  // Reset form to initial state
  reset(newData?: Partial<BookingFormData>): void {
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      pickupLocation: '',
      destinations: '',
      serviceId: '',
      serviceType: 'tier',
      eventType: '',
      securityPreference: '',
      duration: 2,
      additionalNotes: '',
      specialRequirements: [],
      isMultiDay: false,
      numberOfDays: 1,
      acceptedTerms: false,
      ...newData
    }
    
    this.errors.clear()
    this.notifyListeners()
  }

  // Get form steps with validation status
  getSteps(): FormStep[] {
    const steps: FormStep[] = [
      {
        id: 1,
        name: 'Personal Information',
        namePortuguese: 'Informação Pessoal',
        fields: ['fullName', 'email', 'phone'],
        isValid: false,
        isComplete: false
      },
      {
        id: 2,
        name: 'Trip Details',
        namePortuguese: 'Detalhes da Viagem',
        fields: ['date', 'time', 'pickupLocation', 'destinations', 'duration'],
        isValid: false,
        isComplete: false
      },
      {
        id: 3,
        name: 'Service Preferences',
        namePortuguese: 'Preferências de Serviço',
        fields: ['serviceId', 'eventType', 'securityPreference'],
        isValid: false,
        isComplete: false
      },
      {
        id: 4,
        name: 'Review & Confirm',
        namePortuguese: 'Rever e Confirmar',
        fields: ['acceptedTerms'],
        isValid: false,
        isComplete: false
      }
    ]

    // Update validation status for each step
    steps.forEach(step => {
      step.isValid = this.validateStep(step)
      step.isComplete = step.fields.every(field => {
        const value = this.formData[field]
        return value !== '' && value !== undefined && value !== null
      })
    })

    return steps
  }

  // Auto-save to localStorage
  enableAutoSave(key: string = 'lusotown-chauffeur-booking'): () => void {
    const saveToStorage = () => {
      try {
        localStorage.setItem(key, JSON.stringify(this.getData()))
      } catch (error) {
        console.error('Failed to save form data:', error)
      }
    }

    // Save on changes
    const unsubscribe = this.subscribe(saveToStorage)
    
    // Load from storage on enable
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const data = JSON.parse(saved)
        this.updateFields(data, { skipValidation: true })
      }
    } catch (error) {
      console.error('Failed to load saved form data:', error)
    }

    return () => {
      unsubscribe()
      localStorage.removeItem(key)
    }
  }
}

// Validation rules class
class ValidationRules {
  validateField(
    field: keyof BookingFormData, 
    value: any, 
    formData: BookingFormData
  ): FormValidationError | null {
    switch (field) {
      case 'fullName':
        return this.validateFullName(value)
      case 'email':
        return this.validateEmail(value)
      case 'phone':
        return this.validatePhone(value)
      case 'date':
        return this.validateDate(value)
      case 'time':
        return this.validateTime(value)
      case 'pickupLocation':
        return this.validatePickupLocation(value)
      case 'destinations':
        return this.validateDestinations(value)
      case 'serviceId':
        return this.validateServiceId(value, formData.serviceType)
      case 'eventType':
        return this.validateEventType(value)
      case 'securityPreference':
        return this.validateSecurityPreference(value)
      case 'duration':
        return this.validateDuration(value, formData.serviceId, formData.serviceType)
      case 'acceptedTerms':
        return this.validateAcceptedTerms(value)
      default:
        return null
    }
  }

  private validateFullName(value: string): FormValidationError | null {
    if (!value || value.trim().length < 2) {
      return {
        field: 'fullName',
        message: 'Full name must be at least 2 characters',
        messagePortuguese: 'Nome completo deve ter pelo menos 2 caracteres'
      }
    }
    return null
  }

  private validateEmail(value: string): FormValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value || !emailRegex.test(value.trim())) {
      return {
        field: 'email',
        message: 'Please enter a valid email address',
        messagePortuguese: 'Por favor, insira um endereço de email válido'
      }
    }
    return null
  }

  private validatePhone(value: string): FormValidationError | null {
    const phoneRegex = /^(\+44|0)[0-9\s-()]{10,}$/
    if (!value || !phoneRegex.test(value.trim())) {
      return {
        field: 'phone',
        message: 'Please enter a valid UK phone number',
        messagePortuguese: 'Por favor, insira um número de telefone do Reino Unido válido'
      }
    }
    return null
  }

  private validateDate(value: string): FormValidationError | null {
    if (!value) {
      return {
        field: 'date',
        message: 'Date is required',
        messagePortuguese: 'Data é obrigatória'
      }
    }
    
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (date < today) {
      return {
        field: 'date',
        message: 'Date cannot be in the past',
        messagePortuguese: 'Data não pode ser no passado'
      }
    }
    
    return null
  }

  private validateTime(value: string): FormValidationError | null {
    if (!value) {
      return {
        field: 'time',
        message: 'Time is required',
        messagePortuguese: 'Hora é obrigatória'
      }
    }
    return null
  }

  private validatePickupLocation(value: string): FormValidationError | null {
    if (!value || value.trim().length < 5) {
      return {
        field: 'pickupLocation',
        message: 'Please provide a detailed pickup location',
        messagePortuguese: 'Por favor, forneça um local de recolha detalhado'
      }
    }
    return null
  }

  private validateDestinations(value: string): FormValidationError | null {
    if (!value || value.trim().length < 5) {
      return {
        field: 'destinations',
        message: 'Please specify your destination(s)',
        messagePortuguese: 'Por favor, especifique o(s) seu(s) destino(s)'
      }
    }
    return null
  }

  private validateServiceId(value: string, serviceType: 'tier' | 'package'): FormValidationError | null {
    if (!value) {
      return {
        field: 'serviceId',
        message: 'Please select a service',
        messagePortuguese: 'Por favor, selecione um serviço'
      }
    }
    
    // Validate service exists
    if (serviceType === 'tier') {
      const tiers = pricingEngine.getServiceTiers()
      if (!tiers.find(tier => tier.id === value)) {
        return {
          field: 'serviceId',
          message: 'Invalid service selected',
          messagePortuguese: 'Serviço inválido selecionado'
        }
      }
    } else {
      const packages = pricingEngine.getExperiencePackages()
      if (!packages.find(pkg => pkg.id === value)) {
        return {
          field: 'serviceId',
          message: 'Invalid experience package selected',
          messagePortuguese: 'Pacote de experiência inválido selecionado'
        }
      }
    }
    
    return null
  }

  private validateEventType(value: string): FormValidationError | null {
    if (!value) {
      return {
        field: 'eventType',
        message: 'Please select an event type',
        messagePortuguese: 'Por favor, selecione um tipo de evento'
      }
    }
    return null
  }

  private validateSecurityPreference(value: string): FormValidationError | null {
    if (!value) {
      return {
        field: 'securityPreference',
        message: 'Please select a security preference',
        messagePortuguese: 'Por favor, selecione uma preferência de segurança'
      }
    }
    return null
  }

  private validateDuration(value: number, serviceId: string, serviceType: 'tier' | 'package'): FormValidationError | null {
    if (!value || value <= 0) {
      return {
        field: 'duration',
        message: 'Duration must be greater than 0',
        messagePortuguese: 'Duração deve ser maior que 0'
      }
    }

    // Validate against service constraints
    if (serviceType === 'tier' && serviceId) {
      const tier = pricingEngine.getServiceTiers().find(t => t.id === serviceId)
      if (tier) {
        if (tier.minimumHours && value < tier.minimumHours) {
          return {
            field: 'duration',
            message: `Minimum duration for ${serviceId} is ${tier.minimumHours} hours`,
            messagePortuguese: `Duração mínima para ${serviceId} é ${tier.minimumHours} horas`
          }
        }
        if (tier.maximumHours && value > tier.maximumHours) {
          return {
            field: 'duration',
            message: `Maximum duration for ${serviceId} is ${tier.maximumHours} hours`,
            messagePortuguese: `Duração máxima para ${serviceId} é ${tier.maximumHours} horas`
          }
        }
      }
    }

    return null
  }

  private validateAcceptedTerms(value: boolean): FormValidationError | null {
    if (!value) {
      return {
        field: 'acceptedTerms',
        message: 'You must accept the terms and conditions',
        messagePortuguese: 'Deve aceitar os termos e condições'
      }
    }
    return null
  }
}

export { BookingFormManager }
export type { FormStep, FormValidationError }