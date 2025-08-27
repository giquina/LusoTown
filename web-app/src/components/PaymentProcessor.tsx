'use client'

import { useState, useEffect } from 'react'
import logger from '@/utils/logger'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCardIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import SubscriptionGate from './SubscriptionGate'
import { dynamicPricingEngine, type PricingResult } from '@/lib/dynamicPricing'

export interface PaymentMethod {
  id: string
  type: 'card' | 'corporate' | 'subscription' | 'installments'
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ElementType
  supportedCurrencies: string[]
  processingFee?: number
  isAvailable: boolean
  requirements?: string[]
  requirementsPortuguese?: string[]
}

export interface CorporateAccount {
  id: string
  companyName: string
  accountNumber: string
  billingEmail: string
  approvalRequired: boolean
  creditLimit: number
  paymentTerms: string
  isActive: boolean
}

interface PaymentProcessorProps {
  isOpen: boolean
  onClose: () => void
  bookingData: any
  pricingResult: PricingResult
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'stripe-card',
    type: 'card',
    name: 'Credit/Debit Card',
    namePortuguese: 'Cartão de Crédito/Débito',
    description: 'Secure payment with Visa, Mastercard, Amex - Lusophone bank cards accepted',
    descriptionPortuguese: 'Pagamento seguro com Visa, Mastercard, Amex - Cartões bancários portugueses aceites',
    icon: CreditCardIcon,
    supportedCurrencies: ['GBP', 'EUR', 'USD', 'BRL'],
    processingFee: 0,
    isAvailable: true
  },
  {
    id: 'corporate-billing',
    type: 'corporate',
    name: 'Corporate Account Billing',
    namePortuguese: 'Faturação de Conta Corporativa',
    description: 'Invoice billing for approved corporate accounts',
    descriptionPortuguese: 'Faturação para contas corporativas aprovadas',
    icon: BuildingOffice2Icon,
    supportedCurrencies: ['GBP', 'EUR'],
    isAvailable: true,
    requirements: [
      'Pre-approved corporate account',
      'Valid purchase order number',
      'Billing authorization'
    ],
    requirementsPortuguese: [
      'Conta corporativa pré-aprovada',
      'Número de ordem de compra válido',
      'Autorização de faturação'
    ]
  },
  {
    id: 'subscription-credit',
    type: 'subscription',
    name: 'Subscription Credit',
    namePortuguese: 'Crédito de Subscrição',
    description: 'Use your LusoTown membership credits',
    descriptionPortuguese: 'Use os seus créditos de membro LusoTown',
    icon: ShieldCheckIcon,
    supportedCurrencies: ['GBP'],
    isAvailable: false, // Would be dynamically determined
    requirements: [
      'Active premium membership',
      'Sufficient credit balance'
    ],
    requirementsPortuguese: [
      'Membros premium ativo',
      'Saldo de crédito suficiente'
    ]
  },
  {
    id: 'portuguese-installments',
    type: 'installments',
    name: 'Portuguese-speaking community Installments',
    namePortuguese: 'Prestações da Comunidade de Falantes de Português',
    description: 'Split payment into 3-6 monthly installments',
    descriptionPortuguese: 'Dividir pagamento em 3-6 prestações mensais',
    icon: GlobeEuropeAfricaIcon,
    supportedCurrencies: ['GBP', 'EUR'],
    processingFee: 2.5,
    isAvailable: true,
    requirements: [
      'Minimum £300 booking value',
      'Portuguese-speaking community member verification',
      'Credit check approval'
    ],
    requirementsPortuguese: [
      'Valor mínimo de reserva £300',
      'Verificação de membro da comunidade de falantes de português',
      'Aprovação de verificação de crédito'
    ]
  }
]

const SUPPORTED_CURRENCIES = [
  { code: 'GBP', symbol: '£', name: 'British Pound', namePortuguese: 'Libra Esterlina' },
  { code: 'EUR', symbol: '€', name: 'Euro', namePortuguese: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar', namePortuguese: 'Dólar Americano' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', namePortuguese: 'Real Brasileiro' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', namePortuguese: 'Peso Mexicano' }
]

export default function PaymentProcessor({
  isOpen,
  onClose,
  bookingData,
  pricingResult,
  onPaymentSuccess,
  onPaymentError
}: PaymentProcessorProps) {
  const { language } = useLanguage()
  const { cartItems } = useCart()
  const isPortuguese = language === 'pt'
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState('GBP')
  const [convertedAmount, setConvertedAmount] = useState(pricingResult.totalPrice)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [requiresSubscription, setRequiresSubscription] = useState(false)
  
  // Corporate billing fields
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('')
  const [billingAuthorization, setBillingAuthorization] = useState('')
  const [corporateAccount, setCorporateAccount] = useState<CorporateAccount | null>(null)
  
  // Installment fields
  const [installmentMonths, setInstallmentMonths] = useState(3)
  const [installmentTermsAccepted, setInstallmentTermsAccepted] = useState(false)

  // Check if subscription is required for transport services
  useEffect(() => {
    const hasTransportService = cartItems.some(item => item.type === 'transport_service')
    setRequiresSubscription(hasTransportService)
  }, [cartItems])

  // Convert currency when selection changes
  useEffect(() => {
    if (selectedCurrency !== 'GBP') {
      convertCurrency()
    } else {
      setConvertedAmount(pricingResult.totalPrice)
    }
  }, [selectedCurrency, pricingResult.totalPrice])

  const convertCurrency = async () => {
    setIsConverting(true)
    try {
      const converted = await dynamicPricingEngine.convertCurrency(
        pricingResult.totalPrice,
        'GBP',
        selectedCurrency
      )
      setConvertedAmount(converted)
    } catch (error) {
      logger.error('Currency conversion error:', error)
      setPaymentError(isPortuguese ? 'Erro na conversão de moeda' : 'Currency conversion error')
    } finally {
      setIsConverting(false)
    }
  }

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
    setPaymentError(null)
    
    // Set default currency based on payment method
    if (method.supportedCurrencies.includes('GBP')) {
      setSelectedCurrency('GBP')
    } else {
      setSelectedCurrency(method.supportedCurrencies[0])
    }
  }

  const validatePayment = (): boolean => {
    if (!selectedPaymentMethod) {
      setPaymentError(isPortuguese ? 'Selecione um método de pagamento' : 'Please select a payment method')
      return false
    }

    if (selectedPaymentMethod.type === 'corporate') {
      if (!purchaseOrderNumber.trim()) {
        setPaymentError(isPortuguese ? 'Número de ordem de compra obrigatório' : 'Purchase order number required')
        return false
      }
      if (!billingAuthorization.trim()) {
        setPaymentError(isPortuguese ? 'Autorização de faturação obrigatória' : 'Billing authorization required')
        return false
      }
    }

    if (selectedPaymentMethod.type === 'installments') {
      if (convertedAmount < 300) {
        setPaymentError(isPortuguese ? 'Valor mínimo £300 para prestações' : 'Minimum £300 for installments')
        return false
      }
      if (!installmentTermsAccepted) {
        setPaymentError(isPortuguese ? 'Aceite os termos das prestações' : 'Accept installment terms')
        return false
      }
    }

    return true
  }

  const processPayment = async () => {
    if (!validatePayment()) return

    setIsProcessing(true)
    setPaymentError(null)

    try {
      let paymentResult

      switch (selectedPaymentMethod!.type) {
        case 'card':
          paymentResult = await processCardPayment()
          break
        case 'corporate':
          paymentResult = await processCorporateBilling()
          break
        case 'installments':
          paymentResult = await processInstallmentPayment()
          break
        default:
          throw new Error('Unsupported payment method')
      }

      setPaymentSuccess(true)
      setTimeout(() => {
        onPaymentSuccess(paymentResult)
        onClose()
      }, 2000)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed'
      setPaymentError(errorMessage)
      onPaymentError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const processCardPayment = async () => {
    // Create payment intent with Stripe
    const paymentIntent = await dynamicPricingEngine.createPaymentIntent(
      convertedAmount,
      selectedCurrency,
      {
        bookingId: bookingData.id,
        serviceType: bookingData.serviceType?.id,
        customerEmail: bookingData.email,
        lusoTownBooking: true
      }
    )

    // In a real implementation, this would redirect to Stripe Checkout
    // or use Stripe Elements for card collection
    
    return {
      type: 'card',
      paymentIntentId: paymentIntent.paymentIntentId,
      amount: convertedAmount,
      currency: selectedCurrency,
      status: 'succeeded'
    }
  }

  const processCorporateBilling = async () => {
    // Generate corporate invoice
    const invoice = await dynamicPricingEngine.generateCorporateInvoice(
      bookingData,
      pricingResult,
      corporateAccount?.id || 'default'
    )

    return {
      type: 'corporate',
      invoiceId: invoice.invoiceId,
      amount: convertedAmount,
      currency: selectedCurrency,
      purchaseOrderNumber,
      billingAuthorization,
      dueDate: invoice.dueDate,
      status: 'pending_approval'
    }
  }

  const processInstallmentPayment = async () => {
    // Set up installment plan
    const monthlyAmount = convertedAmount / installmentMonths
    const processingFee = convertedAmount * (selectedPaymentMethod!.processingFee! / 100)

    return {
      type: 'installments',
      totalAmount: convertedAmount + processingFee,
      monthlyAmount,
      installmentMonths,
      processingFee,
      currency: selectedCurrency,
      status: 'installment_plan_created'
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency)
    return `${currencyInfo?.symbol}${amount.toFixed(2)}`
  }

  if (!isOpen) return null

  // Show subscription gate if required
  if (requiresSubscription) {
    return (
      <SubscriptionGate mode="transport">
        <div />
      </SubscriptionGate>
    )
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isPortuguese ? 'Processamento de Pagamento' : 'Payment Processing'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isPortuguese 
                    ? 'Suporte para 135+ moedas com segurança total'
                    : 'Supporting 135+ currencies with complete security'
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CreditCardIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Pagamento Processado!' : 'Payment Processed!'}
                  </h3>
                  <p className="text-gray-600">
                    {isPortuguese 
                      ? 'A sua reserva foi confirmada. Receberá um email de confirmação em breve.'
                      : 'Your booking has been confirmed. You will receive a confirmation email shortly.'
                    }
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Payment Methods */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {isPortuguese ? 'Métodos de Pagamento' : 'Payment Methods'}
                      </h3>
                      
                      <div className="space-y-3">
                        {PAYMENT_METHODS.filter(method => method.isAvailable).map((method) => {
                          const IconComponent = method.icon
                          return (
                            <label key={method.id} className="cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={selectedPaymentMethod?.id === method.id}
                                onChange={() => handlePaymentMethodSelect(method)}
                                className="sr-only"
                              />
                              <div className={`
                                p-4 border-2 rounded-lg transition-all
                                ${selectedPaymentMethod?.id === method.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                                }
                              `}>
                                <div className="flex items-start space-x-4">
                                  <div className={`
                                    p-3 rounded-lg
                                    ${selectedPaymentMethod?.id === method.id
                                      ? 'bg-primary-100 text-primary-600'
                                      : 'bg-gray-100 text-gray-600'
                                    }
                                  `}>
                                    <IconComponent className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">
                                      {isPortuguese ? method.namePortuguese : method.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {isPortuguese ? method.descriptionPortuguese : method.description}
                                    </p>
                                    
                                    {method.processingFee && (
                                      <div className="text-xs text-amber-600 mt-2">
                                        {isPortuguese ? 'Taxa de processamento: ' : 'Processing fee: '}
                                        {method.processingFee}%
                                      </div>
                                    )}

                                    {method.requirements && (
                                      <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                          {isPortuguese ? 'Requisitos:' : 'Requirements:'}
                                        </p>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                          {(isPortuguese ? method.requirementsPortuguese : method.requirements)?.map((req, index) => (
                                            <li key={index} className="flex items-center">
                                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                                              {req}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Currency Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {isPortuguese ? 'Moeda de Pagamento' : 'Payment Currency'}
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {SUPPORTED_CURRENCIES
                          .filter(currency => 
                            !selectedPaymentMethod || 
                            selectedPaymentMethod.supportedCurrencies.includes(currency.code)
                          )
                          .map((currency) => (
                          <label key={currency.code} className="cursor-pointer">
                            <input
                              type="radio"
                              name="currency"
                              value={currency.code}
                              checked={selectedCurrency === currency.code}
                              onChange={(e) => setSelectedCurrency(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`
                              p-3 border-2 rounded-lg text-center transition-all
                              ${selectedCurrency === currency.code
                                ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                              }
                            `}>
                              <div className="font-semibold">{currency.symbol}</div>
                              <div className="text-xs">{currency.code}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method Specific Fields */}
                    {selectedPaymentMethod?.type === 'corporate' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">
                          {isPortuguese ? 'Detalhes da Conta Corporativa' : 'Corporate Account Details'}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {isPortuguese ? 'Número da Ordem de Compra' : 'Purchase Order Number'}
                            </label>
                            <input
                              type="text"
                              value={purchaseOrderNumber}
                              onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="PO-2024-001"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {isPortuguese ? 'Autorização de Faturação' : 'Billing Authorization'}
                            </label>
                            <input
                              type="text"
                              value={billingAuthorization}
                              onChange={(e) => setBillingAuthorization(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder={isPortuguese ? 'Nome do aprovador' : 'Approver name'}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod?.type === 'installments' && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">
                          {isPortuguese ? 'Plano de Prestações' : 'Installment Plan'}
                        </h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {isPortuguese ? 'Número de Prestações' : 'Number of Installments'}
                          </label>
                          <select
                            value={installmentMonths}
                            onChange={(e) => setInstallmentMonths(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value={3}>3 {isPortuguese ? 'meses' : 'months'}</option>
                            <option value={6}>6 {isPortuguese ? 'meses' : 'months'}</option>
                          </select>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={installmentTermsAccepted}
                              onChange={(e) => setInstallmentTermsAccepted(e.target.checked)}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                            />
                            <div className="flex-1">
                              <label className="text-sm font-medium text-gray-900 cursor-pointer">
                                {isPortuguese 
                                  ? 'Aceito os termos do plano de prestações'
                                  : 'I accept the installment plan terms'
                                }
                              </label>
                              <p className="text-xs text-gray-600 mt-1">
                                {isPortuguese 
                                  ? 'Pagamentos automáticos mensais, taxa de processamento aplicável'
                                  : 'Automatic monthly payments, processing fee applicable'
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {isPortuguese ? 'Resumo do Pagamento' : 'Payment Summary'}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {isPortuguese ? 'Subtotal:' : 'Subtotal:'}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(convertedAmount, selectedCurrency)}
                          </span>
                        </div>
                        
                        {selectedPaymentMethod?.processingFee && (
                          <div className="flex justify-between text-amber-600">
                            <span>
                              {isPortuguese ? 'Taxa de processamento:' : 'Processing fee:'}
                            </span>
                            <span>
                              {formatCurrency(
                                convertedAmount * (selectedPaymentMethod.processingFee / 100),
                                selectedCurrency
                              )}
                            </span>
                          </div>
                        )}
                        
                        <div className="border-t pt-3 flex justify-between text-lg font-bold">
                          <span>
                            {isPortuguese ? 'Total:' : 'Total:'}
                          </span>
                          <span>
                            {isConverting ? (
                              <div className="flex items-center space-x-2">
                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                <span className="text-sm">
                                  {isPortuguese ? 'Convertendo...' : 'Converting...'}
                                </span>
                              </div>
                            ) : (
                              formatCurrency(
                                convertedAmount + (selectedPaymentMethod?.processingFee ? 
                                  convertedAmount * (selectedPaymentMethod.processingFee / 100) : 0),
                                selectedCurrency
                              )
                            )}
                          </span>
                        </div>
                        
                        {selectedPaymentMethod?.type === 'installments' && (
                          <div className="text-sm text-gray-600">
                            {formatCurrency(
                              (convertedAmount + convertedAmount * (selectedPaymentMethod.processingFee! / 100)) / installmentMonths,
                              selectedCurrency
                            )} × {installmentMonths} {isPortuguese ? 'meses' : 'months'}
                          </div>
                        )}
                      </div>

                      {/* Error Display */}
                      {paymentError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm text-red-700">{paymentError}</p>
                          </div>
                        </div>
                      )}

                      {/* Process Payment Button */}
                      <button
                        onClick={processPayment}
                        disabled={!selectedPaymentMethod || isProcessing || isConverting}
                        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                            <span>
                              {isPortuguese ? 'Processando...' : 'Processing...'}
                            </span>
                          </>
                        ) : (
                          <>
                            <CreditCardIcon className="w-5 h-5" />
                            <span>
                              {selectedPaymentMethod?.type === 'corporate' ? 
                                (isPortuguese ? 'Gerar Fatura' : 'Generate Invoice') :
                                selectedPaymentMethod?.type === 'installments' ?
                                (isPortuguese ? 'Configurar Prestações' : 'Setup Installments') :
                                (isPortuguese ? 'Processar Pagamento' : 'Process Payment')
                              }
                            </span>
                          </>
                        )}
                      </button>

                      {/* Security Note */}
                      <div className="mt-4 text-xs text-gray-500 text-center">
                        {isPortuguese 
                          ? '🔒 Pagamentos seguros com encriptação SSL de 256 bits'
                          : '🔒 Secure payments with 256-bit SSL encryption'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}