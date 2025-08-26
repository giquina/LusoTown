"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UsersIcon,
  CurrencyPoundIcon,
  SparklesIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { 
  RECURRING_EVENT_TEMPLATES, 
  RecurringEventTemplate, 
  RecurringEventPattern,
  RecurrenceInstance,
  generateRecurrenceOccurrences,
  validateCulturalAuthenticity,
  getUpcomingCulturalCelebrations,
  PORTUGUESE_CULTURAL_CALENDAR
} from '@/config/recurring-events';
import { Event, EventFilters } from '@/lib/events';

interface RecurringEventCreatorProps {
  onEventSeriesCreated?: (templateId: string, instances: RecurrenceInstance[]) => void;
  onClose?: () => void;
  className?: string;
}

interface RecurringEventFormData {
  templateId: string;
  customTitle?: { en: string; pt: string };
  customDescription?: { en: string; pt: string };
  startDate: string;
  venue: string;
  capacity: number;
  price: number;
  membershipRequired: 'free' | 'core' | 'premium';
  customizations: {
    specialGuests?: string[];
    additionalActivities?: string[];
    partnerOrganizations?: string[];
  };
}

const RecurringEventCreator: React.FC<RecurringEventCreatorProps> = ({
  onEventSeriesCreated,
  onClose,
  className = ''
}) => {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<RecurringEventTemplate | null>(null);
  const [formData, setFormData] = useState<RecurringEventFormData>({
    templateId: '',
    startDate: '',
    venue: '',
    capacity: 0,
    price: 0,
    membershipRequired: 'free',
    customizations: {}
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateCulturalAuthenticity> | null>(null);
  const [previewInstances, setPreviewInstances] = useState<Date[]>([]);
  const [showCulturalCalendar, setShowCulturalCalendar] = useState(false);

  // Load cultural celebrations
  const [upcomingCelebrations, setUpcomingCelebrations] = useState(getUpcomingCulturalCelebrations(90));

  // Form validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!selectedTemplate;
      case 2:
        return !!(formData.startDate && formData.venue && formData.capacity > 0);
      case 3:
        return validationResult?.isValid ?? false;
      default:
        return false;
    }
  };

  // Update form data when template changes
  useEffect(() => {
    if (selectedTemplate) {
      setFormData(prev => ({
        ...prev,
        templateId: selectedTemplate.id,
        venue: selectedTemplate.venues.primary,
        capacity: selectedTemplate.eventDefaults.capacity,
        price: selectedTemplate.eventDefaults.price,
        membershipRequired: selectedTemplate.eventDefaults.membershipRequired
      }));
    }
  }, [selectedTemplate]);

  // Generate preview instances when form data changes
  useEffect(() => {
    if (selectedTemplate && formData.startDate) {
      const startDate = new Date(formData.startDate);
      const instances = generateRecurrenceOccurrences(selectedTemplate.pattern, startDate, 5);
      setPreviewInstances(instances);
    }
  }, [selectedTemplate, formData.startDate]);

  // Validate cultural authenticity when template or customizations change
  useEffect(() => {
    if (selectedTemplate) {
      const result = validateCulturalAuthenticity(selectedTemplate, {
        title: formData.customTitle,
        description: formData.customDescription,
        venue: formData.venue,
        capacity: formData.capacity,
        price: formData.price
      });
      setValidationResult(result);
    }
  }, [selectedTemplate, formData]);

  const handleTemplateSelect = (template: RecurringEventTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  const handleFormSubmit = async () => {
    if (!selectedTemplate || !validationResult?.isValid) return;

    setLoading(true);
    
    try {
      // Generate recurring event instances
      const startDate = new Date(formData.startDate);
      const occurrenceDates = generateRecurrenceOccurrences(selectedTemplate.pattern, startDate, 12);
      
      const instances: RecurrenceInstance[] = occurrenceDates.map((date, index) => ({
        id: `${selectedTemplate.id}-${date.getTime()}`,
        templateId: selectedTemplate.id,
        occurrenceDate: date.toISOString(),
        status: 'scheduled',
        customizations: {
          title: formData.customTitle,
          description: formData.customDescription,
          venue: formData.venue,
          capacity: formData.capacity,
          price: formData.price
        }
      }));

      // Call the callback to create the recurring event series
      onEventSeriesCreated?.(selectedTemplate.id, instances);
      
      // Show success message or redirect
      // For now, we'll just close the creator
      onClose?.();
      
    } catch (error) {
      console.error('Error creating recurring event series:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTemplateCard = (template: RecurringEventTemplate) => (
    <motion.div
      key={template.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden"
      onClick={() => handleTemplateSelect(template)}
    >
      <div className="relative">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{template.flagEmojis}</span>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {isPortuguese ? template.name.pt : template.name.en}
                </h3>
                <p className="text-white/80 text-sm">
                  {template.culturalOrigin.join(', ')}
                </p>
              </div>
            </div>
            {template.featured && (
              <SparklesIcon className="w-6 h-6 text-yellow-300" />
            )}
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {isPortuguese ? template.description.pt : template.description.en}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {template.pattern.type === 'weekly' ? 
                  (isPortuguese ? 'Semanal' : 'Weekly') :
                template.pattern.type === 'monthly' ?
                  (isPortuguese ? 'Mensal' : 'Monthly') :
                  (isPortuguese ? 'Personalizado' : 'Custom')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <UsersIcon className="w-4 h-4" />
              <span>{template.eventDefaults.capacity} {isPortuguese ? 'pessoas' : 'people'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CurrencyPoundIcon className="w-4 h-4" />
              <span>£{template.eventDefaults.price}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ClockIcon className="w-4 h-4" />
              <span>{Math.floor(template.eventDefaults.duration / 60)}h</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {template.eventDefaults.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {template.eventDefaults.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{template.eventDefaults.tags.length - 3} more</span>
            )}
          </div>
          
          <div className="text-right">
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm">
              {isPortuguese ? 'Selecionar' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Escolha um Modelo Cultural' : 'Choose a Cultural Template'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Selecione um modelo de evento português para criar uma série recorrente'
            : 'Select a Portuguese event template to create a recurring series'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">{RECURRING_EVENT_TEMPLATES.length}</div>
          <div className="text-sm text-green-700">
            {isPortuguese ? 'Modelos Disponíveis' : 'Available Templates'}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">
            {RECURRING_EVENT_TEMPLATES.filter(t => t.featured).length}
          </div>
          <div className="text-sm text-blue-700">
            {isPortuguese ? 'Em Destaque' : 'Featured'}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">8</div>
          <div className="text-sm text-purple-700">
            {isPortuguese ? 'Países Representados' : 'Countries Represented'}
          </div>
        </div>
      </div>

      {/* Cultural Calendar Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowCulturalCalendar(!showCulturalCalendar)}
          className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <CalendarIcon className="w-5 h-5" />
          {isPortuguese ? 'Ver Calendário Cultural' : 'View Cultural Calendar'}
        </button>
      </div>

      {/* Cultural Calendar */}
      {showCulturalCalendar && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" />
            {isPortuguese ? 'Próximas Celebrações Culturais' : 'Upcoming Cultural Celebrations'}
          </h3>
          <div className="space-y-3">
            {upcomingCelebrations.slice(0, 5).map((celebration, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <div>
                  <div className="font-medium text-amber-900">
                    {isPortuguese ? celebration.celebration.name.pt : celebration.celebration.name.en}
                  </div>
                  <div className="text-sm text-amber-700">
                    {new Date(celebration.date).toLocaleDateString('en-GB')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-amber-600">
                    {celebration.suggestedTemplates.length} {isPortuguese ? 'modelos sugeridos' : 'suggested templates'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECURRING_EVENT_TEMPLATES
          .filter(template => template.isActive)
          .sort((a, b) => {
            // Featured templates first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.name.en.localeCompare(b.name.en);
          })
          .map(renderTemplateCard)}
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Configurar Detalhes do Evento' : 'Configure Event Details'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Personalize os detalhes para sua série de eventos recorrentes'
            : 'Customize the details for your recurring event series'}
        </p>
      </div>

      {selectedTemplate && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{selectedTemplate.flagEmojis}</span>
            <h3 className="text-lg font-bold text-gray-900">
              {isPortuguese ? selectedTemplate.name.pt : selectedTemplate.name.en}
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            {isPortuguese ? selectedTemplate.description.pt : selectedTemplate.description.en}
          </p>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Custom Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Título Personalizado (Opcional)' : 'Custom Title (Optional)'}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={isPortuguese ? 'Título em inglês' : 'Title in English'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.customTitle?.en || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                customTitle: { ...prev.customTitle, en: e.target.value, pt: prev.customTitle?.pt || '' }
              }))}
            />
            <input
              type="text"
              placeholder={isPortuguese ? 'Título em português' : 'Title in Portuguese'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.customTitle?.pt || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                customTitle: { ...prev.customTitle, pt: e.target.value, en: prev.customTitle?.en || '' }
              }))}
            />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Data de Início' : 'Start Date'}
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Local' : 'Venue'}
          </label>
          <select
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={formData.venue}
            onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
          >
            <option value="">{isPortuguese ? 'Selecionar local' : 'Select venue'}</option>
            <option value={selectedTemplate?.venues.primary}>{selectedTemplate?.venues.primary} (Primary)</option>
            {selectedTemplate?.venues.alternates.map(venue => (
              <option key={venue} value={venue}>{venue} (Alternative)</option>
            ))}
          </select>
        </div>

        {/* Capacity and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Capacidade' : 'Capacity'}
            </label>
            <input
              type="number"
              required
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isPortuguese ? 'Preço (£)' : 'Price (£)'}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>

        {/* Membership Required */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPortuguese ? 'Acesso de Membros' : 'Membership Access'}
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={formData.membershipRequired}
            onChange={(e) => setFormData(prev => ({ ...prev, membershipRequired: e.target.value as any }))}
          >
            <option value="free">{isPortuguese ? 'Membros Grátis' : 'Free Members'}</option>
            <option value="core">{isPortuguese ? 'Membros Core+' : 'Core Members+'}</option>
            <option value="premium">{isPortuguese ? 'Apenas Premium' : 'Premium Only'}</option>
          </select>
        </div>
      </div>

      {/* Preview of Next Instances */}
      {previewInstances.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {isPortuguese ? 'Próximas Ocorrências' : 'Next Occurrences'}
          </h3>
          <div className="space-y-2">
            {previewInstances.slice(0, 5).map((date, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-600">
                <CalendarIcon className="w-4 h-4" />
                <span>{date.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            ))}
            {previewInstances.length > 5 && (
              <p className="text-sm text-gray-500 mt-2">
                ...{isPortuguese ? 'e mais' : 'and more'} {previewInstances.length - 5} {isPortuguese ? 'datas' : 'dates'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Revisão e Confirmação' : 'Review & Confirmation'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Revise os detalhes e confirme a criação da sua série de eventos'
            : 'Review the details and confirm creating your event series'}
        </p>
      </div>

      {/* Cultural Authenticity Validation */}
      {validationResult && (
        <div className={`border rounded-2xl p-6 ${
          validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {validationResult.isValid ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />
            )}
            <h3 className="text-lg font-bold">
              {isPortuguese ? 'Validação de Autenticidade Cultural' : 'Cultural Authenticity Validation'}
            </h3>
          </div>

          {validationResult.warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-amber-800 mb-2">
                {isPortuguese ? 'Avisos:' : 'Warnings:'}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                {validationResult.warnings.map((warning, index) => (
                  <li key={index} className="text-sm">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-800 mb-2">
                {isPortuguese ? 'Sugestões:' : 'Suggestions:'}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {validationResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Event Summary */}
      {selectedTemplate && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedTemplate.flagEmojis}</span>
              <div>
                <h3 className="text-xl font-bold">
                  {formData.customTitle ? 
                    (isPortuguese ? formData.customTitle.pt : formData.customTitle.en) :
                    (isPortuguese ? selectedTemplate.name.pt : selectedTemplate.name.en)
                  }
                </h3>
                <p className="text-white/80">
                  {selectedTemplate.culturalOrigin.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">{isPortuguese ? 'Início' : 'Starts'}</div>
                  <div className="font-medium">{new Date(formData.startDate).toLocaleDateString('en-GB')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">{isPortuguese ? 'Local' : 'Venue'}</div>
                  <div className="font-medium">{formData.venue}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">{isPortuguese ? 'Capacidade' : 'Capacity'}</div>
                  <div className="font-medium">{formData.capacity} {isPortuguese ? 'pessoas' : 'people'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyPoundIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">{isPortuguese ? 'Preço' : 'Price'}</div>
                  <div className="font-medium">
                    {formData.price === 0 ? 
                      (isPortuguese ? 'Grátis' : 'Free') : 
                      `£${formData.price.toFixed(2)}`
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern Description */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                {isPortuguese ? 'Padrão de Recorrência' : 'Recurrence Pattern'}
              </h4>
              <p className="text-gray-600 text-sm">
                {selectedTemplate.pattern.type === 'weekly' && 
                  `${isPortuguese ? 'Semanalmente' : 'Weekly'} - ${isPortuguese ? 'a cada' : 'every'} ${selectedTemplate.pattern.interval} ${isPortuguese ? 'semana(s)' : 'week(s)'}`
                }
                {selectedTemplate.pattern.type === 'monthly' && 
                  `${isPortuguese ? 'Mensalmente' : 'Monthly'} - ${isPortuguese ? 'a cada' : 'every'} ${selectedTemplate.pattern.interval} ${isPortuguese ? 'mês(es)' : 'month(s)'}`
                }
                {selectedTemplate.pattern.type === 'custom' && 
                  `${isPortuguese ? 'Personalizado' : 'Custom'} - ${isPortuguese ? 'baseado em' : 'based on'} ${selectedTemplate.pattern.culturalContext?.significance}`
                }
              </p>
            </div>

            {/* Cultural Elements */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">
                {isPortuguese ? 'Elementos Culturais Autênticos' : 'Authentic Cultural Elements'}
              </h4>
              <div className="space-y-2">
                {selectedTemplate.culturalAuthenticity.requiredElements.slice(0, 3).map((element, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{element}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="mb-2">
              {isPortuguese 
                ? 'Ao criar esta série de eventos recorrentes, você estará:'
                : 'By creating this recurring event series, you will be:'}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                {isPortuguese 
                  ? 'Gerando automaticamente eventos futuros baseados no padrão selecionado'
                  : 'Automatically generating future events based on the selected pattern'}
              </li>
              <li>
                {isPortuguese 
                  ? 'Comprometendo-se a manter a autenticidade cultural portuguesa'
                  : 'Committing to maintaining Portuguese cultural authenticity'}
              </li>
              <li>
                {isPortuguese 
                  ? 'Proporcionando experiências educativas sobre a herança lusófona'
                  : 'Providing educational experiences about Portuguese heritage'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {isPortuguese ? 'Criar Eventos Culturais Recorrentes' : 'Create Recurring Cultural Events'}
            </h1>
            <p className="text-white/90">
              {isPortuguese 
                ? 'Sistema avançado para eventos portugueses autênticos'
                : 'Advanced system for authentic Portuguese events'}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mt-6">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step <= currentStep 
                  ? 'bg-white text-primary-600' 
                  : 'bg-white/20 text-white/60'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 rounded-full mx-2 transition-all ${
                  step < currentStep ? 'bg-white' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepOne()}
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepTwo()}
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepThree()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
        <button
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose?.()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {currentStep > 1 ? 
            (isPortuguese ? 'Voltar' : 'Back') : 
            (isPortuguese ? 'Cancelar' : 'Cancel')
          }
        </button>

        <div className="flex items-center gap-3">
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid(currentStep)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isStepValid(currentStep)
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isPortuguese ? 'Próximo' : 'Next'}
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFormSubmit}
              disabled={!validationResult?.isValid || loading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                validationResult?.isValid && !loading
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isPortuguese ? 'Criando...' : 'Creating...'}
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  {isPortuguese ? 'Criar Série de Eventos' : 'Create Event Series'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringEventCreator;