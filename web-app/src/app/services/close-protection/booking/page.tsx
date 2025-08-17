'use client'
export const dynamic = 'force-dynamic'

import React, { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

const protectionPackages = [
  { id: 'discrete-protection', name: 'Discrete Protection', namePortuguese: 'Proteção Discreta', price: 800, description: 'Professional close protection with cultural awareness', descriptionPortuguese: 'Proteção pessoal profissional com consciência cultural' },
  { id: 'executive-protection', name: 'Executive Protection', namePortuguese: 'Proteção Executiva', price: 1200, description: 'Enhanced protection for high-profile individuals', descriptionPortuguese: 'Proteção aprimorada para indivíduos de alto perfil' },
  { id: 'community-protection', name: 'Community Protection', namePortuguese: 'Proteção Comunitária', price: 1000, description: 'Comprehensive community security services', descriptionPortuguese: 'Serviços abrangentes de segurança comunitária' },
]

function BookingContent() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const searchParams = useSearchParams()
  const packageParam = searchParams.get('package') || 'discrete-protection'

  const [selectedPackage, setSelectedPackage] = useState(packageParam)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    serviceDate: '',
    serviceDuration: '1',
    location: '',
    numberOfPersons: '1',
    riskLevel: 'standard',
    specialRequirements: '',
    culturalPreferences: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/services/close-protection/booking/confirmation'
  }

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Nome Completo' : 'Full Name'} *</label>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Telefone' : 'Phone'} *</label>
              <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Empresa/Organização' : 'Company/Organization'}</label>
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" />
            </div>
          </div>
        </div>
      )
    }
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Data do Serviço' : 'Service Date'} *</label>
              <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Duração (dias)' : 'Duration (days)'} *</label>
              <select name="serviceDuration" value={formData.serviceDuration} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required>
                <option value="1">1 {isPortuguese ? 'dia' : 'day'}</option>
                <option value="2">2 {isPortuguese ? 'dias' : 'days'}</option>
                <option value="3">3 {isPortuguese ? 'dias' : 'days'}</option>
                <option value="5">5 {isPortuguese ? 'dias' : 'days'}</option>
                <option value="7">7 {isPortuguese ? 'dias' : 'days'}</option>
                <option value="custom">{isPortuguese ? 'Personalizado' : 'Custom'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Localização Principal' : 'Primary Location'} *</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder={isPortuguese ? 'Londres, Reino Unido' : 'London, UK'} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Número de Pessoas a Proteger' : 'Number of People to Protect'} *</label>
              <select name="numberOfPersons" value={formData.numberOfPersons} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required>
                <option value="1">1 {isPortuguese ? 'pessoa' : 'person'}</option>
                <option value="2">2 {isPortuguese ? 'pessoas' : 'people'}</option>
                <option value="3">3 {isPortuguese ? 'pessoas' : 'people'}</option>
                <option value="4">4 {isPortuguese ? 'pessoas' : 'people'}</option>
                <option value="5+">5+ {isPortuguese ? 'pessoas' : 'people'}</option>
              </select>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Nível de Risco Percebido' : 'Perceived Risk Level'} *</label>
          <select name="riskLevel" value={formData.riskLevel} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" required>
            <option value="low">{isPortuguese ? 'Baixo' : 'Low'}</option>
            <option value="standard">{isPortuguese ? 'Padrão' : 'Standard'}</option>
            <option value="elevated">{isPortuguese ? 'Elevado' : 'Elevated'}</option>
            <option value="high">{isPortuguese ? 'Alto' : 'High'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Requisitos Especiais' : 'Special Requirements'}</label>
          <textarea name="specialRequirements" value={formData.specialRequirements} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{isPortuguese ? 'Preferências Culturais/Linguísticas' : 'Cultural/Language Preferences'}</label>
          <textarea name="culturalPreferences" value={formData.culturalPreferences} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-premium-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-20 pb-12 bg-gradient-to-br from-premium-50 to-premium-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center px-4 py-2 bg-premium-100 text-premium-700 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Reserva de Proteção' : 'Protection Booking'}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Agendar Proteção Pessoal' : 'Book Close Protection'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isPortuguese ? 'Complete o formulário abaixo para solicitar uma consulta de segurança personalizada' : 'Complete the form below to request a personalized security consultation'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{isPortuguese ? 'Selecionar Pacote' : 'Select Package'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {protectionPackages.map((pkg) => (
              <motion.div key={pkg.id} className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedPackage === pkg.id ? 'border-premium-500 bg-premium-50' : 'border-gray-200 bg-white hover:border-premium-300'}`} onClick={() => setSelectedPackage(pkg.id)}>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{isPortuguese ? pkg.namePortuguese : pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{isPortuguese ? pkg.descriptionPortuguese : pkg.description}</p>
                  <div className="text-2xl font-bold text-premium-600">£{pkg.price}<span className="text-sm text-gray-500 font-normal">/{isPortuguese ? 'dia' : 'day'}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= (step as 1 | 2 | 3) ? 'bg-premium-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {currentStep > (step as 1 | 2 | 3) ? <CheckCircleIcon className="w-6 h-6" /> : step}
                  </div>
                  {step < 3 && <div className={`w-24 h-1 mx-4 ${currentStep > (step as 1 | 2 | 3) ? 'bg-premium-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {currentStep === 1 && (isPortuguese ? 'Informações de Contato' : 'Contact Information')}
                {currentStep === 2 && (isPortuguese ? 'Detalhes do Serviço' : 'Service Details')}
                {currentStep === 3 && (isPortuguese ? 'Requisitos de Segurança' : 'Security Requirements')}
              </h3>
              {renderStep()}
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setCurrentStep(Math.max(1, (currentStep - 1) as 1 | 2 | 3) as 1 | 2 | 3)} disabled={currentStep === 1} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                {isPortuguese ? 'Anterior' : 'Previous'}
              </button>
              {currentStep < 3 ? (
                <button type="button" onClick={() => setCurrentStep(Math.min(3, (currentStep + 1) as 1 | 2 | 3) as 1 | 2 | 3)} className="px-6 py-3 bg-premium-600 text-white rounded-xl font-medium hover:bg-premium-700">
                  {isPortuguese ? 'Próximo' : 'Next'}
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-premium-600 text-white rounded-xl font-medium hover:bg-premium-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (isPortuguese ? 'Enviando...' : 'Submitting...') : (isPortuguese ? 'Solicitar Consulta' : 'Request Consultation')}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function CloseProtectionBookingPage() {
  return (
    <Suspense fallback={<div className="pt-20 p-6">Loading…</div>}>
      <BookingContent />
    </Suspense>
  )
}