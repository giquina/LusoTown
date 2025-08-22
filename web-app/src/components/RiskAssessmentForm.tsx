'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  EyeIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { SIAComplianceData } from './SIAComplianceQuestionnaire'

interface RiskAssessmentFormProps {
  complianceData: SIAComplianceData
  onComplete: (assessment: RiskAssessment) => void
  onCancel: () => void
}

export interface RiskAssessment {
  id: string
  complianceDataId: string
  assessmentDate: string
  assessorName: string
  assessorLicense: string
  
  // Risk Factors Analysis
  locationRisk: 'low' | 'medium' | 'high'
  temporalRisk: 'low' | 'medium' | 'high'
  clientRisk: 'low' | 'medium' | 'high'
  operationalRisk: 'low' | 'medium' | 'high'
  
  // Threat Assessment
  threatTypes: string[]
  mitigationMeasures: string[]
  escalationProtocols: string[]
  
  // Resource Requirements
  personnelCount: number
  vehicleType: string
  specialEquipment: string[]
  communicationRequirements: string[]
  
  // Legal Compliance
  permitsRequired: string[]
  insuranceLevel: string
  liabilityConsiderations: string[]
  
  // Final Assessment
  overallRisk: 'low' | 'medium' | 'high' | 'extreme'
  approved: boolean
  conditions: string[]
  notes: string
  
  // Review Schedule
  reviewRequired: boolean
  reviewDate?: string
  monitoringLevel: 'standard' | 'enhanced' | 'continuous'
}

const riskFactors = [
  {
    category: 'location',
    labelEn: 'Location Risk',
    labelPt: 'Risco de Localização',
    factors: [
      { labelEn: 'High crime area', labelPt: 'Área de alta criminalidade', weight: 3 },
      { labelEn: 'Public demonstration area', labelPt: 'Área de manifestação pública', weight: 2 },
      { labelEn: 'Tourist hotspot', labelPt: 'Ponto turístico popular', weight: 1 },
      { labelEn: 'Diplomatic area', labelPt: 'Área diplomática', weight: 2 },
      { labelEn: 'Financial district', labelPt: 'Distrito financeiro', weight: 1 }
    ]
  },
  {
    category: 'temporal',
    labelEn: 'Temporal Risk',
    labelPt: 'Risco Temporal',
    factors: [
      { labelEn: 'Night hours (22:00-06:00)', labelPt: 'Horário noturno (22:00-06:00)', weight: 2 },
      { labelEn: 'Weekend evening', labelPt: 'Fim de semana à noite', weight: 2 },
      { labelEn: 'Public holiday', labelPt: 'Feriado público', weight: 1 },
      { labelEn: 'Rush hour', labelPt: 'Hora de ponta', weight: 1 },
      { labelEn: 'Special event period', labelPt: 'Período de evento especial', weight: 3 }
    ]
  }
]

const threatTypes = [
  { value: 'theft', labelEn: 'Theft/Robbery', labelPt: 'Roubo/Furto' },
  { value: 'assault', labelEn: 'Physical Assault', labelPt: 'Agressão Física' },
  { value: 'kidnapping', labelEn: 'Kidnapping', labelPt: 'Sequestro' },
  { value: 'terrorism', labelEn: 'Terrorism', labelPt: 'Terrorismo' },
  { value: 'stalking', labelEn: 'Stalking/Harassment', labelPt: 'Perseguição/Assédio' },
  { value: 'cyber', labelEn: 'Cyber Threats', labelPt: 'Ameaças Cibernéticas' },
  { value: 'paparazzi', labelEn: 'Media/Paparazzi', labelPt: 'Media/Paparazzi' },
  { value: 'protest', labelEn: 'Protest/Demonstration', labelPt: 'Protesto/Manifestação' }
]

const mitigationMeasures = [
  { value: 'route-planning', labelEn: 'Advanced Route Planning', labelPt: 'Planeamento Avançado de Rota' },
  { value: 'surveillance', labelEn: 'Counter-Surveillance', labelPt: 'Contra-Vigilância' },
  { value: 'coordination', labelEn: 'Police Coordination', labelPt: 'Coordenação Policial' },
  { value: 'backup', labelEn: 'Backup Team', labelPt: 'Equipa de Apoio' },
  { value: 'medical', labelEn: 'Medical Support', labelPt: 'Apoio Médico' },
  { value: 'communication', labelEn: 'Enhanced Communication', labelPt: 'Comunicação Melhorada' }
]

export default function RiskAssessmentForm({ 
  complianceData, 
  onComplete, 
  onCancel 
}: RiskAssessmentFormProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [assessment, setAssessment] = useState<Partial<RiskAssessment>>({
    id: `risk-${Date.now()}`,
    complianceDataId: `compliance-${  Date.now()}`,
    assessmentDate: new Date().toISOString(),
    assessorName: '',
    assessorLicense: '',
    locationRisk: 'low',
    temporalRisk: 'low',
    clientRisk: 'low',
    operationalRisk: 'low',
    threatTypes: [],
    mitigationMeasures: [],
    escalationProtocols: [],
    personnelCount: 1,
    vehicleType: 'standard',
    specialEquipment: [],
    communicationRequirements: [],
    permitsRequired: [],
    insuranceLevel: 'standard',
    liabilityConsiderations: [],
    overallRisk: 'low',
    approved: false,
    conditions: [],
    notes: '',
    reviewRequired: false,
    monitoringLevel: 'standard'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const calculateOverallRisk = () => {
    const risks = [assessment.locationRisk, assessment.temporalRisk, assessment.clientRisk, assessment.operationalRisk]
    const riskValues = { low: 1, medium: 2, high: 3 }
    const avgRisk = risks.reduce((sum, risk) => sum + (riskValues[risk as keyof typeof riskValues] || 1), 0) / 4
    
    if (avgRisk >= 2.5) return 'high'
    if (avgRisk >= 1.5) return 'medium'
    return 'low'
  }

  const handleInputChange = (field: keyof RiskAssessment, value: any) => {
    setAssessment(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate overall risk
    if (['locationRisk', 'temporalRisk', 'clientRisk', 'operationalRisk'].includes(field)) {
      const newAssessment = { ...assessment, [field]: value }
      const overallRisk = calculateOverallRisk()
      setAssessment(prev => ({ ...prev, [field]: value, overallRisk }))
    }
  }

  const handleArrayChange = (field: keyof RiskAssessment, value: string, checked: boolean) => {
    setAssessment(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[] || []), value]
        : (prev[field] as string[] || []).filter(item => item !== value)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!assessment.assessorName?.trim()) {
      newErrors.assessorName = isPortuguese ? 'Nome do avaliador é obrigatório' : 'Assessor name is required'
    }
    if (!assessment.assessorLicense?.trim()) {
      newErrors.assessorLicense = isPortuguese ? 'Licença SIA é obrigatória' : 'SIA license is required'
    }
    if (!assessment.threatTypes?.length) {
      newErrors.threatTypes = isPortuguese ? 'Selecione pelo menos um tipo de ameaça' : 'Select at least one threat type'
    }
    if (!assessment.mitigationMeasures?.length) {
      newErrors.mitigationMeasures = isPortuguese ? 'Selecione pelo menos uma medida de mitigação' : 'Select at least one mitigation measure'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (approved: boolean) => {
    if (!validateForm()) return

    const finalAssessment: RiskAssessment = {
      ...assessment,
      approved,
      overallRisk: calculateOverallRisk(),
      reviewRequired: assessment.overallRisk === 'high' || complianceData.armedProtection,
      reviewDate: assessment.overallRisk === 'high' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined
    } as RiskAssessment

    onComplete(finalAssessment)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isPortuguese ? 'Avaliação de Risco SIA' : 'SIA Risk Assessment'}
            </h2>
            <p className="text-secondary-100">
              {isPortuguese ? 'Avaliação profissional para serviços de proteção próxima' : 'Professional assessment for close protection services'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Service Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {isPortuguese ? 'Resumo do Serviço' : 'Service Overview'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{isPortuguese ? 'Propósito:' : 'Purpose:'}</span>
              <p className="font-medium">{complianceData.servicePurpose}</p>
            </div>
            <div>
              <span className="text-gray-600">{isPortuguese ? 'Data:' : 'Date:'}</span>
              <p className="font-medium">{new Date(complianceData.serviceDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-600">{isPortuguese ? 'Passageiros:' : 'Passengers:'}</span>
              <p className="font-medium">{complianceData.passengerCount}</p>
            </div>
            <div>
              <span className="text-gray-600">{isPortuguese ? 'Pontuação Inicial:' : 'Initial Score:'}</span>
              <p className="font-medium">{complianceData.riskScore}/20</p>
            </div>
          </div>
        </div>

        {/* Assessor Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Informações do Avaliador' : 'Assessor Information'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Nome do Avaliador *' : 'Assessor Name *'}
              </label>
              <input
                type="text"
                value={assessment.assessorName || ''}
                onChange={(e) => handleInputChange('assessorName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                  errors.assessorName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={isPortuguese ? 'Nome completo do oficial SIA' : 'Full name of SIA officer'}
              />
              {errors.assessorName && (
                <p className="text-red-500 text-sm mt-1">{errors.assessorName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Número da Licença SIA *' : 'SIA License Number *'}
              </label>
              <input
                type="text"
                value={assessment.assessorLicense || ''}
                onChange={(e) => handleInputChange('assessorLicense', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent ${
                  errors.assessorLicense ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="SIA-XXXXXXXX"
              />
              {errors.assessorLicense && (
                <p className="text-red-500 text-sm mt-1">{errors.assessorLicense}</p>
              )}
            </div>
          </div>
        </div>

        {/* Risk Factor Assessment */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Avaliação de Fatores de Risco' : 'Risk Factor Assessment'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'locationRisk', labelEn: 'Location Risk', labelPt: 'Risco de Localização', icon: MapPinIcon },
              { key: 'temporalRisk', labelEn: 'Temporal Risk', labelPt: 'Risco Temporal', icon: ClockIcon },
              { key: 'clientRisk', labelEn: 'Client Risk', labelPt: 'Risco do Cliente', icon: UserGroupIcon },
              { key: 'operationalRisk', labelEn: 'Operational Risk', labelPt: 'Risco Operacional', icon: ShieldCheckIcon }
            ].map(({ key, labelEn, labelPt, icon: Icon }) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon className="w-5 h-5 text-secondary-600" />
                  <h4 className="font-medium text-gray-900">
                    {isPortuguese ? labelPt : labelEn}
                  </h4>
                </div>
                <div className="space-y-2">
                  {['low', 'medium', 'high'].map((level) => (
                    <label key={level} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={key}
                        value={level}
                        checked={assessment[key as keyof RiskAssessment] === level}
                        onChange={(e) => handleInputChange(key as keyof RiskAssessment, e.target.value)}
                        className="w-4 h-4 text-secondary-600 border-gray-300 focus:ring-secondary-500"
                      />
                      <span className={`text-sm font-medium ${
                        level === 'high' ? 'text-red-600' : 
                        level === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {level === 'low' ? (isPortuguese ? 'Baixo' : 'Low') :
                         level === 'medium' ? (isPortuguese ? 'Médio' : 'Medium') :
                         (isPortuguese ? 'Alto' : 'High')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Analysis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Análise de Ameaças' : 'Threat Analysis'}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <ExclamationTriangleIcon className="w-4 h-4 inline mr-2" />
              {isPortuguese ? 'Tipos de Ameaça Identificados *' : 'Identified Threat Types *'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {threatTypes.map((threat) => (
                <label key={threat.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assessment.threatTypes?.includes(threat.value) || false}
                    onChange={(e) => handleArrayChange('threatTypes', threat.value, e.target.checked)}
                    className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500"
                  />
                  <span className="text-sm text-gray-700">
                    {isPortuguese ? threat.labelPt : threat.labelEn}
                  </span>
                </label>
              ))}
            </div>
            {errors.threatTypes && (
              <p className="text-red-500 text-sm mt-1">{errors.threatTypes}</p>
            )}
          </div>
        </div>

        {/* Mitigation Measures */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Medidas de Mitigação' : 'Mitigation Measures'}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <ShieldCheckIcon className="w-4 h-4 inline mr-2" />
              {isPortuguese ? 'Medidas de Mitigação Recomendadas *' : 'Recommended Mitigation Measures *'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mitigationMeasures.map((measure) => (
                <label key={measure.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assessment.mitigationMeasures?.includes(measure.value) || false}
                    onChange={(e) => handleArrayChange('mitigationMeasures', measure.value, e.target.checked)}
                    className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500"
                  />
                  <span className="text-sm text-gray-700">
                    {isPortuguese ? measure.labelPt : measure.labelEn}
                  </span>
                </label>
              ))}
            </div>
            {errors.mitigationMeasures && (
              <p className="text-red-500 text-sm mt-1">{errors.mitigationMeasures}</p>
            )}
          </div>
        </div>

        {/* Resource Requirements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Requisitos de Recursos' : 'Resource Requirements'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Número de Pessoal' : 'Personnel Count'}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={assessment.personnelCount || 1}
                onChange={(e) => handleInputChange('personnelCount', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Tipo de Veículo' : 'Vehicle Type'}
              </label>
              <select
                value={assessment.vehicleType || 'standard'}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              >
                <option value="standard">{isPortuguese ? 'Padrão' : 'Standard'}</option>
                <option value="luxury">{isPortuguese ? 'Luxo' : 'Luxury'}</option>
                <option value="armored">{isPortuguese ? 'Blindado' : 'Armored'}</option>
                <option value="multiple">{isPortuguese ? 'Múltiplos' : 'Multiple'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Nível de Monitoramento' : 'Monitoring Level'}
              </label>
              <select
                value={assessment.monitoringLevel || 'standard'}
                onChange={(e) => handleInputChange('monitoringLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              >
                <option value="standard">{isPortuguese ? 'Padrão' : 'Standard'}</option>
                <option value="enhanced">{isPortuguese ? 'Melhorado' : 'Enhanced'}</option>
                <option value="continuous">{isPortuguese ? 'Contínuo' : 'Continuous'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assessment Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DocumentTextIcon className="w-4 h-4 inline mr-2" />
            {isPortuguese ? 'Notas da Avaliação' : 'Assessment Notes'}
          </label>
          <textarea
            value={assessment.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            placeholder={isPortuguese 
              ? 'Observações adicionais, preocupações ou recomendações específicas...'
              : 'Additional observations, concerns, or specific recommendations...'
            }
          />
        </div>

        {/* Overall Risk Display */}
        <div className="bg-gradient-to-r from-gray-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {isPortuguese ? 'Avaliação Geral de Risco' : 'Overall Risk Assessment'}
              </h4>
              <p className="text-sm text-gray-600">
                {isPortuguese ? 'Baseado em todos os fatores analisados' : 'Based on all analyzed factors'}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-lg font-bold ${
              calculateOverallRisk() === 'high' ? 'bg-red-100 text-red-800' :
              calculateOverallRisk() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {calculateOverallRisk() === 'high' ? (isPortuguese ? 'ALTO' : 'HIGH') :
               calculateOverallRisk() === 'medium' ? (isPortuguese ? 'MÉDIO' : 'MEDIUM') :
               (isPortuguese ? 'BAIXO' : 'LOW')}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isPortuguese ? 'Cancelar' : 'Cancel'}
          </button>
          
          <button
            onClick={() => handleSubmit(false)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <XCircleIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Rejeitar' : 'Reject'}</span>
          </button>
          
          <button
            onClick={() => handleSubmit(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircleIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Aprovar' : 'Approve'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}