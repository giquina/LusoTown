'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BriefcaseIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  UsersIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'

interface ProfessionalNetworkingProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  isPortuguese: boolean
}

export default function ProfessionalNetworking({ 
  formData, 
  updateFormData, 
  isPortuguese 
}: ProfessionalNetworkingProps) {
  const [activeSection, setActiveSection] = useState('career')

  const careerStages = [
    { 
      value: 'student', 
      label: 'Student', 
      labelPt: 'Estudante',
      description: 'Currently studying',
      descriptionPt: 'Atualmente a estudar',
      icon: AcademicCapIcon 
    },
    { 
      value: 'early-career', 
      label: 'Early Career', 
      labelPt: 'Início de Carreira',
      description: '0-5 years experience',
      descriptionPt: '0-5 anos de experiência',
      icon: ArrowTrendingUpIcon 
    },
    { 
      value: 'mid-career', 
      label: 'Mid Career', 
      labelPt: 'Meio de Carreira',
      description: '5-15 years experience',
      descriptionPt: '5-15 anos de experiência',
      icon: BriefcaseIcon 
    },
    { 
      value: 'senior', 
      label: 'Senior Professional', 
      labelPt: 'Profissional Sénior',
      description: '15+ years experience',
      descriptionPt: '15+ anos de experiência',
      icon: BuildingOfficeIcon 
    },
    { 
      value: 'entrepreneur', 
      label: 'Entrepreneur', 
      labelPt: 'Empreendedor',
      description: 'Business owner/founder',
      descriptionPt: 'Proprietário/fundador de negócio',
      icon: LightBulbIcon 
    },
    { 
      value: 'freelancer', 
      label: 'Freelancer/Consultant', 
      labelPt: 'Freelancer/Consultor',
      description: 'Independent professional',
      descriptionPt: 'Profissional independente',
      icon: UsersIcon 
    }
  ]

  const industries = [
    { value: 'technology', label: 'Technology', labelPt: 'Tecnologia' },
    { value: 'finance', label: 'Finance & Banking', labelPt: 'Finanças e Banca' },
    { value: 'healthcare', label: 'Healthcare', labelPt: 'Saúde' },
    { value: 'education', label: 'Education', labelPt: 'Educação' },
    { value: 'marketing', label: 'Marketing & Advertising', labelPt: 'Marketing e Publicidade' },
    { value: 'legal', label: 'Legal Services', labelPt: 'Serviços Jurídicos' },
    { value: 'consulting', label: 'Consulting', labelPt: 'Consultoria' },
    { value: 'retail', label: 'Retail & E-commerce', labelPt: 'Retalho e E-commerce' },
    { value: 'hospitality', label: 'Hospitality & Tourism', labelPt: 'Hospitalidade e Turismo' },
    { value: 'construction', label: 'Construction & Real Estate', labelPt: 'Construção e Imobiliário' },
    { value: 'media', label: 'Media & Communications', labelPt: 'Media e Comunicações' },
    { value: 'food-service', label: 'Food & Restaurant', labelPt: 'Alimentação e Restauração' },
    { value: 'transport', label: 'Transport & Logistics', labelPt: 'Transporte e Logística' },
    { value: 'arts', label: 'Arts & Culture', labelPt: 'Artes e Cultura' },
    { value: 'non-profit', label: 'Non-Profit', labelPt: 'Sem Fins Lucrativos' },
    { value: 'government', label: 'Government', labelPt: 'Governo' },
    { value: 'other', label: 'Other', labelPt: 'Outro' }
  ]

  const professionalGoals = [
    { 
      id: 'networking', 
      label: 'Professional Networking', 
      labelPt: 'Networking Profissional',
      description: 'Build business connections',
      descriptionPt: 'Construir conexões de negócios',
  icon: HandRaisedIcon 
    },
    { 
      id: 'mentorship', 
      label: 'Find Mentorship', 
      labelPt: 'Encontrar Mentoria',
      description: 'Learn from experienced professionals',
      descriptionPt: 'Aprender com profissionais experientes',
      icon: AcademicCapIcon 
    },
    { 
      id: 'mentoring', 
      label: 'Offer Mentorship', 
      labelPt: 'Oferecer Mentoria',
      description: 'Guide other Portuguese professionals',
      descriptionPt: 'Orientar outros profissionais portugueses',
      icon: UsersIcon 
    },
    { 
      id: 'job-opportunities', 
      label: 'Job Opportunities', 
      labelPt: 'Oportunidades de Emprego',
      description: 'Discover career opportunities',
      descriptionPt: 'Descobrir oportunidades de carreira',
      icon: BriefcaseIcon 
    },
    { 
      id: 'business-partnerships', 
      label: 'Business Partnerships', 
      labelPt: 'Parcerias de Negócio',
      description: 'Form strategic partnerships',
      descriptionPt: 'Formar parcerias estratégicas',
  icon: HandRaisedIcon 
    },
    { 
      id: 'skill-development', 
      label: 'Skill Development', 
      labelPt: 'Desenvolvimento de Competências',
      description: 'Learn new professional skills',
      descriptionPt: 'Aprender novas competências profissionais',
      icon: LightBulbIcon 
    },
    { 
      id: 'portuguese-market', 
      label: 'Portuguese Market Access', 
      labelPt: 'Acesso ao Mercado Português',
      description: 'Expand to Portuguese-speaking markets',
      descriptionPt: 'Expandir para mercados lusófonos',
      icon: GlobeAltIcon 
    },
    { 
      id: 'uk-market', 
      label: 'UK Market Integration', 
      labelPt: 'Integração no Mercado Britânico',
      description: 'Better integrate into UK business culture',
      descriptionPt: 'Integrar melhor na cultura empresarial britânica',
      icon: BuildingOfficeIcon 
    }
  ]

  const skills = [
    'Leadership', 'Project Management', 'Digital Marketing', 'Data Analysis', 
    'Sales', 'Customer Service', 'Financial Analysis', 'Legal Expertise',
    'Software Development', 'Design', 'Translation', 'International Trade',
    'Portuguese Language', 'Cross-Cultural Communication', 'Business Development',
    'Operations Management', 'Human Resources', 'Accounting', 'Consulting'
  ]

  const updateCareerStage = (stage: string) => {
    updateFormData('career_stage', stage)
  }

  const toggleIndustry = (industry: string) => {
    const current = formData.industries || []
    const updated = current.includes(industry)
      ? current.filter((i: string) => i !== industry)
      : [...current, industry]
    updateFormData('industries', updated)
  }

  const toggleProfessionalGoal = (goal: string) => {
    const current = formData.professional_goals || []
    const updated = current.includes(goal)
      ? current.filter((g: string) => g !== goal)
      : [...current, goal]
    updateFormData('professional_goals', updated)
  }

  const toggleSkill = (skill: string) => {
    const current = formData.professional_skills || []
    const updated = current.includes(skill)
      ? current.filter((s: string) => s !== skill)
      : [...current, skill]
    updateFormData('professional_skills', updated)
  }

  return (
    <div className="space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'career', label: isPortuguese ? 'Carreira' : 'Career' },
          { id: 'goals', label: isPortuguese ? 'Objetivos' : 'Goals' },
          { id: 'skills', label: isPortuguese ? 'Competências' : 'Skills' },
          { id: 'availability', label: isPortuguese ? 'Disponibilidade' : 'Availability' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeSection === section.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Career Stage & Industry */}
      {activeSection === 'career' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Estágio da Carreira' : 'Career Stage'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? 'Onde está na sua jornada profissional?'
                : 'Where are you in your professional journey?'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerStages.map((stage) => {
                const Icon = stage.icon
                return (
                  <motion.button
                    key={stage.value}
                    type="button"
                    onClick={() => updateCareerStage(stage.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.career_stage === stage.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        formData.career_stage === stage.value
                          ? 'bg-primary-100'
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          formData.career_stage === stage.value
                            ? 'text-primary-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? stage.labelPt : stage.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {isPortuguese ? stage.descriptionPt : stage.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Setores de Interesse' : 'Industries of Interest'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? 'Selecione até 3 setores onde tem experiência ou interesse'
                : 'Select up to 3 industries where you have experience or interest'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {industries.map((industry) => (
                <motion.button
                  key={industry.value}
                  type="button"
                  onClick={() => toggleIndustry(industry.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={(formData.industries || []).length >= 3 && !(formData.industries || []).includes(industry.value)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    (formData.industries || []).includes(industry.value)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isPortuguese ? industry.labelPt : industry.label}
                </motion.button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {isPortuguese 
                ? `Selecionados: ${(formData.industries || []).length}/3`
                : `Selected: ${(formData.industries || []).length}/3`
              }
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Cargo Atual' : 'Current Job Title'}
              </label>
              <input
                type="text"
                value={formData.job_title || ''}
                onChange={(e) => updateFormData('job_title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder={isPortuguese ? 'Seu cargo atual' : 'Your current job title'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Empresa/Organização' : 'Company/Organization'}
              </label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder={isPortuguese ? 'Nome da sua empresa' : 'Your company name'}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Professional Goals */}
      {activeSection === 'goals' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Objetivos Profissionais' : 'Professional Goals'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? 'O que espera alcançar através do networking na comunidade portuguesa?'
                : 'What do you hope to achieve through networking in the Portuguese community?'
              }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professionalGoals.map((goal) => {
                const Icon = goal.icon
                return (
                  <motion.button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleProfessionalGoal(goal.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      (formData.professional_goals || []).includes(goal.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        (formData.professional_goals || []).includes(goal.id)
                          ? 'bg-primary-100'
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          (formData.professional_goals || []).includes(goal.id)
                            ? 'text-primary-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? goal.labelPt : goal.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {isPortuguese ? goal.descriptionPt : goal.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Objetivos Específicos' : 'Specific Goals'}
            </label>
            <textarea
              value={formData.specific_goals || ''}
              onChange={(e) => updateFormData('specific_goals', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder={isPortuguese ? 
                'Descreva objetivos específicos que gostaria de alcançar...' : 
                'Describe specific goals you would like to achieve...'
              }
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(formData.specific_goals || '').length}/300 {isPortuguese ? 'caracteres' : 'characters'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Skills & Expertise */}
      {activeSection === 'skills' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Competências e Especialidades' : 'Skills & Expertise'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? 'Selecione as competências onde tem experiência ou pode ajudar outros'
                : 'Select skills where you have experience or can help others'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <motion.button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    (formData.professional_skills || []).includes(skill)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {isPortuguese 
                ? `Selecionadas: ${(formData.professional_skills || []).length} competências`
                : `Selected: ${(formData.professional_skills || []).length} skills`
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Competências Adicionais' : 'Additional Skills'}
            </label>
            <input
              type="text"
              value={formData.additional_skills || ''}
              onChange={(e) => updateFormData('additional_skills', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder={isPortuguese ? 
                'Outras competências não listadas acima...' : 
                'Other skills not listed above...'
              }
            />
          </div>
        </motion.div>
      )}

      {/* Availability & Preferences */}
      {activeSection === 'availability' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Disponibilidade e Preferências' : 'Availability & Preferences'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  {isPortuguese ? 'Disponibilidade para Networking' : 'Networking Availability'}
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'weekdays', label: 'Weekdays Only', labelPt: 'Apenas Dias Úteis' },
                    { value: 'weekends', label: 'Weekends Only', labelPt: 'Apenas Fins de Semana' },
                    { value: 'flexible', label: 'Flexible', labelPt: 'Flexível' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateFormData('networking_availability', option.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.networking_availability === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">
                        {isPortuguese ? option.labelPt : option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  {isPortuguese ? 'Formato Preferido' : 'Preferred Format'}
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'in-person', label: 'In-Person Only', labelPt: 'Apenas Presencial' },
                    { value: 'virtual', label: 'Virtual Only', labelPt: 'Apenas Virtual' },
                    { value: 'both', label: 'Both', labelPt: 'Ambos' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateFormData('networking_format', option.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.networking_format === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">
                        {isPortuguese ? option.labelPt : option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'LinkedIn Profile' : 'LinkedIn Profile'}
                </label>
                <input
                  type="url"
                  value={formData.linkedin_profile || ''}
                  onChange={(e) => updateFormData('linkedin_profile', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isPortuguese ? 'Website/Portfolio' : 'Website/Portfolio'}
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-4">
          {isPortuguese ? 'Resumo Profissional' : 'Professional Summary'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">
              {isPortuguese ? 'Estágio:' : 'Stage:'}
            </p>
            <p className="text-gray-600">
              {formData.career_stage ? 
                careerStages.find(s => s.value === formData.career_stage)?.[isPortuguese ? 'labelPt' : 'label'] || formData.career_stage :
                (isPortuguese ? 'Não definido' : 'Not set')
              }
            </p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700 mb-1">
              {isPortuguese ? 'Setores:' : 'Industries:'}
            </p>
            <p className="text-gray-600">
              {(formData.industries || []).length || 0} {isPortuguese ? 'selecionados' : 'selected'}
            </p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700 mb-1">
              {isPortuguese ? 'Objetivos:' : 'Goals:'}
            </p>
            <p className="text-gray-600">
              {(formData.professional_goals || []).length || 0} {isPortuguese ? 'selecionados' : 'selected'}
            </p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700 mb-1">
              {isPortuguese ? 'Competências:' : 'Skills:'}
            </p>
            <p className="text-gray-600">
              {(formData.professional_skills || []).length || 0} {isPortuguese ? 'selecionadas' : 'selected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}