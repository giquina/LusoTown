'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  CalculatorIcon,
  CurrencyPoundIcon,
  ChartBarIcon,
  TrendingUpIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface CalculatorInputs {
  businessType: string
  annualRevenue: number
  currentPortugueseCustomers: number
  targetPortugueseCustomers: number
  averageCustomerValue: number
  marketingBudget: number
  growthGoals: number
  timeframe: number
}

interface ROICalculation {
  totalInvestment: number
  directCustomerAcquisition: number
  marketPenetrationValue: number
  brandCredibilityValue: number
  networkingValue: number
  marketingEfficiencyGains: number
  totalROI: number
  roiPercentage: number
  paybackPeriod: number
  netPresentValue: number
}

interface BusinessTypeOption {
  id: string
  name: string
  namePortuguese: string
  multiplier: number
  description: string
  descriptionPortuguese: string
}

const PartnershipValueCalculator: React.FC = () => {
  const { language } = useLanguage()
  const [inputs, setInputs] = useState<CalculatorInputs>({
    businessType: 'professional_services',
    annualRevenue: 250000,
    currentPortugueseCustomers: 15,
    targetPortugueseCustomers: 75,
    averageCustomerValue: 2500,
    marketingBudget: 25000,
    growthGoals: 50,
    timeframe: 12
  })
  
  const [calculation, setCalculation] = useState<ROICalculation | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const businessTypes: BusinessTypeOption[] = [
    {
      id: 'professional_services',
      name: 'Professional Services',
      namePortuguese: 'Serviços Profissionais',
      multiplier: 1.4,
      description: 'Legal, accounting, consulting, financial advisory',
      descriptionPortuguese: 'Legal, contabilidade, consultoria, consultoria financeira'
    },
    {
      id: 'banking_finance',
      name: 'Banking & Finance',
      namePortuguese: 'Bancário e Financeiro',
      multiplier: 1.8,
      description: 'Banks, investment services, insurance, real estate',
      descriptionPortuguese: 'Bancos, serviços de investimento, seguros, imobiliário'
    },
    {
      id: 'healthcare_wellness',
      name: 'Healthcare & Wellness',
      namePortuguese: 'Saúde e Bem-estar',
      multiplier: 1.3,
      description: 'Medical services, dental, wellness, beauty',
      descriptionPortuguese: 'Serviços médicos, dentários, bem-estar, beleza'
    },
    {
      id: 'education_training',
      name: 'Education & Training',
      namePortuguese: 'Educação e Formação',
      multiplier: 1.2,
      description: 'Language schools, professional training, tutoring',
      descriptionPortuguese: 'Escolas de idiomas, formação profissional, explicações'
    },
    {
      id: 'travel_hospitality',
      name: 'Travel & Hospitality',
      namePortuguese: 'Viagens e Hospitalidade',
      multiplier: 1.6,
      description: 'Travel agencies, hotels, restaurants, tourism',
      descriptionPortuguese: 'Agências de viagens, hotéis, restaurantes, turismo'
    },
    {
      id: 'retail_commerce',
      name: 'Retail & E-commerce',
      namePortuguese: 'Retalho e Comércio Eletrónico',
      multiplier: 1.1,
      description: 'Specialty stores, online retail, Portuguese goods',
      descriptionPortuguese: 'Lojas especializadas, retalho online, produtos portugueses'
    },
    {
      id: 'technology_digital',
      name: 'Technology & Digital Services',
      namePortuguese: 'Tecnologia e Serviços Digitais',
      multiplier: 1.5,
      description: 'IT services, software, digital marketing, web development',
      descriptionPortuguese: 'Serviços de TI, software, marketing digital, desenvolvimento web'
    }
  ]

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const businessType = businessTypes.find(bt => bt.id === inputs.businessType)
      const multiplier = businessType?.multiplier || 1.0
      
      // Base partnership cost (Strategic Partner level)
      const partnershipCost = 12500
      const implementationCost = 2500
      const totalInvestment = partnershipCost + implementationCost
      
      // Calculate customer acquisition value
      const newCustomers = inputs.targetPortugueseCustomers - inputs.currentPortugueseCustomers
      const directCustomerAcquisition = newCustomers * inputs.averageCustomerValue * multiplier
      
      // Market penetration value (access to broader Portuguese market)
      const marketPenetrationValue = (inputs.annualRevenue * 0.15) * multiplier
      
      // Brand credibility and trust value within Portuguese community
      const brandCredibilityValue = inputs.averageCustomerValue * 8 * multiplier
      
      // Networking and partnership opportunities value
      const networkingValue = inputs.marketingBudget * 0.25 * multiplier
      
      // Marketing efficiency gains (reduced cost per acquisition)
      const marketingEfficiencyGains = inputs.marketingBudget * 0.18 * multiplier
      
      // Total ROI calculation
      const totalBenefits = directCustomerAcquisition + marketPenetrationValue + 
                           brandCredibilityValue + networkingValue + marketingEfficiencyGains
      
      const totalROI = totalBenefits - totalInvestment
      const roiPercentage = (totalROI / totalInvestment) * 100
      const paybackPeriod = totalInvestment / (totalBenefits / 12)
      const netPresentValue = totalBenefits * 0.85 - totalInvestment // Discounted at 15%
      
      setCalculation({
        totalInvestment,
        directCustomerAcquisition,
        marketPenetrationValue,
        brandCredibilityValue,
        networkingValue,
        marketingEfficiencyGains,
        totalROI,
        roiPercentage,
        paybackPeriod,
        netPresentValue
      })
      
      setIsCalculating(false)
    }, 500)
  }

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const selectedBusinessType = businessTypes.find(bt => bt.id === inputs.businessType)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <CalculatorIcon className="w-12 h-12 text-primary-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            {language === 'pt' 
              ? 'Calculadora de Valor de Parceria'
              : 'Partnership Value Calculator'
            }
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Calcule o retorno sobre investimento (ROI) de uma parceria estratégica com a LusoTown no mercado português.'
            : 'Calculate the return on investment (ROI) of a strategic partnership with LusoTown in the Portuguese market.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'pt' ? 'Informações do Negócio' : 'Business Information'}
            </h2>

            {/* Business Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Tipo de Negócio' : 'Business Type'}
              </label>
              <select
                value={inputs.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {businessTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {language === 'pt' ? type.namePortuguese : type.name}
                  </option>
                ))}
              </select>
              {selectedBusinessType && (
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'pt' ? selectedBusinessType.descriptionPortuguese : selectedBusinessType.description}
                </p>
              )}
            </div>

            {/* Annual Revenue */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Receita Anual (£)' : 'Annual Revenue (£)'}
              </label>
              <input
                type="number"
                value={inputs.annualRevenue}
                onChange={(e) => handleInputChange('annualRevenue', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="250000"
              />
            </div>

            {/* Current Portuguese Customers */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Clientes Portugueses Atuais' : 'Current Portuguese Customers'}
              </label>
              <input
                type="number"
                value={inputs.currentPortugueseCustomers}
                onChange={(e) => handleInputChange('currentPortugueseCustomers', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="15"
              />
            </div>

            {/* Target Portuguese Customers */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Meta de Clientes Portugueses' : 'Target Portuguese Customers'}
              </label>
              <input
                type="number"
                value={inputs.targetPortugueseCustomers}
                onChange={(e) => handleInputChange('targetPortugueseCustomers', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="75"
              />
            </div>

            {/* Average Customer Value */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Valor Médio por Cliente (£)' : 'Average Customer Value (£)'}
              </label>
              <input
                type="number"
                value={inputs.averageCustomerValue}
                onChange={(e) => handleInputChange('averageCustomerValue', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="2500"
              />
            </div>

            {/* Marketing Budget */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Orçamento de Marketing Anual (£)' : 'Annual Marketing Budget (£)'}
              </label>
              <input
                type="number"
                value={inputs.marketingBudget}
                onChange={(e) => handleInputChange('marketingBudget', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="25000"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'pt' ? 'Análise de ROI' : 'ROI Analysis'}
            </h2>

            {isCalculating ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : calculation ? (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {calculation.roiPercentage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'ROI Anual' : 'Annual ROI'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {calculation.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Meses para Retorno' : 'Months to Payback'}
                    </div>
                  </div>
                </div>

                {/* Total Investment */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'pt' ? 'Investimento Total' : 'Total Investment'}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(calculation.totalInvestment)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {language === 'pt' ? 'Parceria + Implementação' : 'Partnership + Implementation'}
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'pt' ? 'Fontes de Valor' : 'Value Sources'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {language === 'pt' ? 'Novos Clientes' : 'New Customers'}
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculation.directCustomerAcquisition)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {language === 'pt' ? 'Penetração de Mercado' : 'Market Penetration'}
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculation.marketPenetrationValue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {language === 'pt' ? 'Credibilidade da Marca' : 'Brand Credibility'}
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculation.brandCredibilityValue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {language === 'pt' ? 'Networking' : 'Networking'}
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculation.networkingValue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {language === 'pt' ? 'Eficiência de Marketing' : 'Marketing Efficiency'}
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculation.marketingEfficiencyGains)}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-gray-900">
                        {language === 'pt' ? 'Retorno Total' : 'Total Return'}
                      </span>
                      <span className="text-green-600 text-lg">
                        {formatCurrency(calculation.totalROI)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NPV */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {language === 'pt' ? 'Valor Presente Líquido' : 'Net Present Value'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'pt' ? 'Descontado a 15%' : 'Discounted at 15%'}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(calculation.netPresentValue)}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Additional Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {language === 'pt' ? 'Benefícios Adicionais' : 'Additional Benefits'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'pt' ? 'Acesso Exclusivo à Comunidade' : 'Exclusive Community Access'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' 
                      ? 'Ligação direta com 450,000+ portugueses no Reino Unido'
                      : 'Direct connection to 450,000+ Portuguese in the UK'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'pt' ? 'Inteligência de Mercado' : 'Market Intelligence'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' 
                      ? 'Dados exclusivos sobre comportamento e preferências dos consumidores portugueses'
                      : 'Exclusive data on Portuguese consumer behavior and preferences'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'pt' ? 'Apoio Cultural' : 'Cultural Support'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' 
                      ? 'Orientação especializada em nuances culturais e práticas empresariais portuguesas'
                      : 'Expert guidance on Portuguese cultural nuances and business practices'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          {language === 'pt' ? 'Pronto para Começar?' : 'Ready to Get Started?'}
        </h3>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Contacte a nossa equipa para discutir como uma parceria estratégica pode acelerar o seu crescimento no mercado português.'
            : 'Contact our team to discuss how a strategic partnership can accelerate your growth in the Portuguese market.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            <CurrencyPoundIcon className="w-5 h-5 mr-2" />
            {language === 'pt' ? 'Solicitar Proposta' : 'Request Proposal'}
          </button>
          <button className="inline-flex items-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            {language === 'pt' ? 'Agendar Demonstração' : 'Schedule Demo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartnershipValueCalculator