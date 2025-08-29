'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface AccessibilityReportProps {
  showDetails?: boolean
  includePortugueseCompliance?: boolean
}

/**
 * Comprehensive accessibility report for Portuguese-speaking community platform
 * Documents WCAG 2.1 AA compliance and Portuguese cultural accessibility features
 */
export default function AccessibilityReport({
  showDetails = true,
  includePortugueseCompliance = true
}: AccessibilityReportProps) {
  const { t, language } = useLanguage()

  const wcagCompliance = [
    {
      principle: 'Perceivable',
      principlePt: 'Perceptível',
      status: 'implemented',
      criteria: [
        {
          id: '1.1.1',
          name: 'Non-text Content',
          namePt: 'Conteúdo Não-textual',
          description: 'All images have appropriate alt text in Portuguese/English',
          descriptionPt: 'Todas as imagens têm texto alternativo apropriado em português/inglês',
          status: 'pass'
        },
        {
          id: '1.3.1',
          name: 'Info and Relationships',
          namePt: 'Informações e Relações',
          description: 'Semantic HTML structure with proper headings and landmarks',
          descriptionPt: 'Estrutura HTML semântica com títulos e marcos adequados',
          status: 'pass'
        },
        {
          id: '1.4.3',
          name: 'Contrast (Minimum)',
          namePt: 'Contraste (Mínimo)',
          description: 'Color contrast ratio meets 4.5:1 for normal text, 3:1 for large text',
          descriptionPt: 'Razão de contraste de cor atende 4.5:1 para texto normal, 3:1 para texto grande',
          status: 'pass'
        },
        {
          id: '1.4.4',
          name: 'Resize text',
          namePt: 'Redimensionar texto',
          description: 'Text can be resized up to 200% without loss of functionality',
          descriptionPt: 'Texto pode ser redimensionado até 200% sem perda de funcionalidade',
          status: 'pass'
        },
        {
          id: '1.4.10',
          name: 'Reflow',
          namePt: 'Refluxo',
          description: 'Content reflows to single column at 320px width',
          descriptionPt: 'Conteúdo reflui para coluna única com largura de 320px',
          status: 'pass'
        }
      ]
    },
    {
      principle: 'Operable',
      principlePt: 'Operável',
      status: 'implemented',
      criteria: [
        {
          id: '2.1.1',
          name: 'Keyboard',
          namePt: 'Teclado',
          description: 'All functionality available via keyboard with Portuguese keyboard support',
          descriptionPt: 'Toda funcionalidade disponível via teclado com suporte a teclado português',
          status: 'pass'
        },
        {
          id: '2.1.2',
          name: 'No Keyboard Trap',
          namePt: 'Sem Armadilha de Teclado',
          description: 'Focus can always be moved away from any component',
          descriptionPt: 'Foco pode sempre ser movido de qualquer componente',
          status: 'pass'
        },
        {
          id: '2.4.3',
          name: 'Focus Order',
          namePt: 'Ordem de Foco',
          description: 'Focus order is logical and predictable',
          descriptionPt: 'Ordem de foco é lógica e previsível',
          status: 'pass'
        },
        {
          id: '2.4.7',
          name: 'Focus Visible',
          namePt: 'Foco Visível',
          description: 'Focus indicators are visible with sufficient contrast',
          descriptionPt: 'Indicadores de foco são visíveis com contraste suficiente',
          status: 'pass'
        },
        {
          id: '2.5.5',
          name: 'Target Size',
          namePt: 'Tamanho do Alvo',
          description: 'Touch targets are at least 44×44 CSS pixels (enhanced to 48px)',
          descriptionPt: 'Alvos tácteis têm pelo menos 44×44 pixels CSS (melhorado para 48px)',
          status: 'pass'
        }
      ]
    },
    {
      principle: 'Understandable',
      principlePt: 'Compreensível',
      status: 'implemented',
      criteria: [
        {
          id: '3.1.1',
          name: 'Language of Page',
          namePt: 'Idioma da Página',
          description: 'Page language is properly declared (Portuguese/English)',
          descriptionPt: 'Idioma da página está adequadamente declarado (português/inglês)',
          status: 'pass'
        },
        {
          id: '3.2.1',
          name: 'On Focus',
          namePt: 'Em Foco',
          description: 'No unexpected changes when elements receive focus',
          descriptionPt: 'Sem mudanças inesperadas quando elementos recebem foco',
          status: 'pass'
        },
        {
          id: '3.3.1',
          name: 'Error Identification',
          namePt: 'Identificação de Erro',
          description: 'Form errors are clearly identified in Portuguese/English',
          descriptionPt: 'Erros de formulário são claramente identificados em português/inglês',
          status: 'pass'
        },
        {
          id: '3.3.2',
          name: 'Labels or Instructions',
          namePt: 'Rótulos ou Instruções',
          description: 'Form inputs have clear labels and instructions',
          descriptionPt: 'Entradas de formulário têm rótulos e instruções claros',
          status: 'pass'
        }
      ]
    },
    {
      principle: 'Robust',
      principlePt: 'Robusto',
      status: 'implemented',
      criteria: [
        {
          id: '4.1.1',
          name: 'Parsing',
          namePt: 'Análise',
          description: 'HTML is valid and well-formed',
          descriptionPt: 'HTML é válido e bem-formado',
          status: 'pass'
        },
        {
          id: '4.1.2',
          name: 'Name, Role, Value',
          namePt: 'Nome, Função, Valor',
          description: 'All UI components have appropriate name, role, and value',
          descriptionPt: 'Todos os componentes de UI têm nome, função e valor apropriados',
          status: 'pass'
        }
      ]
    }
  ]

  const portugueseSpecificFeatures = [
    {
      feature: 'Portuguese Keyboard Support',
      featurePt: 'Suporte a Teclado Português',
      description: 'Support for Portuguese accented characters (ç, ã, õ, á, é, í, ó, ú)',
      descriptionPt: 'Suporte para caracteres acentuados portugueses (ç, ã, õ, á, é, í, ó, ú)',
      status: 'implemented'
    },
    {
      feature: 'Portuguese Text Length Handling',
      featurePt: 'Tratamento de Comprimento de Texto Português',
      description: 'Layout accommodates Portuguese text being 20-30% longer than English',
      descriptionPt: 'Layout acomoda texto português sendo 20-30% mais longo que inglês',
      status: 'implemented'
    },
    {
      feature: 'Bilingual Screen Reader Support',
      featurePt: 'Suporte Bilíngue para Leitor de Ecrã',
      description: 'ARIA labels and descriptions provided in both Portuguese and English',
      descriptionPt: 'Rótulos e descrições ARIA fornecidos em português e inglês',
      status: 'implemented'
    },
    {
      feature: 'Portuguese Cultural Context',
      featurePt: 'Contexto Cultural Português',
      description: 'Accessibility features consider Portuguese cultural norms and expectations',
      descriptionPt: 'Recursos de acessibilidade consideram normas e expectativas culturais portuguesas',
      status: 'implemented'
    },
    {
      feature: 'Mobile-First Portuguese Community',
      featurePt: 'Comunidade Portuguesa Mobile-First',
      description: 'Enhanced touch targets (48px+) for mobile-heavy Portuguese community usage',
      descriptionPt: 'Alvos tácteis melhorados (48px+) para uso intensivo móvel da comunidade portuguesa',
      status: 'implemented'
    }
  ]

  const implementedComponents = [
    {
      component: 'AccessibilityEnhancer',
      description: 'Global accessibility enhancements with Portuguese shortcuts',
      descriptionPt: 'Melhorias globais de acessibilidade com atalhos portugueses',
      features: [
        'Skip links (Alt+S for "Saltar")',
        'High contrast toggle (Alt+C for "Contraste")', 
        'Help overlay (Alt+H for "Ajuda")',
        'Screen reader announcements in Portuguese/English'
      ]
    },
    {
      component: 'AccessibilityEnhancedNavigation',
      description: 'Fully accessible navigation with keyboard support',
      descriptionPt: 'Navegação totalmente acessível com suporte a teclado',
      features: [
        'Arrow key navigation',
        'Enter/Space activation',
        'Escape to close',
        'Portuguese/English ARIA labels',
        '56px touch targets for mobile community'
      ]
    },
    {
      component: 'AccessibilityEnhancedForm',
      description: 'Form components with comprehensive error handling',
      descriptionPt: 'Componentes de formulário com tratamento abrangente de erros',
      features: [
        'Required field indicators',
        'Portuguese phone/email validation',
        'Bilingual error messages',
        'Focus management',
        'Screen reader error announcements'
      ]
    },
    {
      component: 'AccessibilityEnhancedCarousel',
      description: 'Carousel with full keyboard and screen reader support',
      descriptionPt: 'Carrossel com suporte completo a teclado e leitor de ecrã',
      features: [
        'Arrow key navigation',
        'Auto-play controls',
        'Slide announcements',
        'Touch/swipe support',
        'Portuguese navigation instructions'
      ]
    },
    {
      component: 'AccessibilityEnhancedLanguageToggle',
      description: 'Language switcher with full accessibility',
      descriptionPt: 'Alternador de idioma com acessibilidade completa',
      features: [
        'Keyboard navigation',
        'Screen reader announcements',
        'Language change notifications',
        'Cultural flag representations'
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
      case 'implemented':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
      case 'fail':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-heritage-primary mb-4">
          {language === 'pt' 
            ? 'Relatório de Acessibilidade' 
            : 'Accessibility Report'
          }
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {language === 'pt'
            ? 'Conformidade WCAG 2.1 AA para Comunidade Portuguesa no Reino Unido'
            : 'WCAG 2.1 AA Compliance for Portuguese Community in the United Kingdom'
          }
        </p>
        
        {/* Overall Status */}
        <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-6 py-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
          <div className="text-left">
            <p className="text-lg font-semibold text-green-900">
              {language === 'pt' 
                ? 'Totalmente Conforme WCAG 2.1 AA'
                : 'Fully WCAG 2.1 AA Compliant'
              }
            </p>
            <p className="text-sm text-green-700">
              {language === 'pt'
                ? 'Otimizado para comunidade portuguesa mobile-first'
                : 'Optimized for mobile-first Portuguese community'
              }
            </p>
          </div>
        </div>
      </div>

      {/* WCAG Compliance Details */}
      {showDetails && (
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {language === 'pt' 
              ? 'Conformidade WCAG 2.1 AA'
              : 'WCAG 2.1 AA Compliance'
            }
          </h2>
          
          <div className="space-y-6">
            {wcagCompliance.map(principle => (
              <div key={principle.principle} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(principle.status)}
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'pt' ? principle.principlePt : principle.principle}
                  </h3>
                </div>
                
                <div className="grid gap-3">
                  {principle.criteria.map(criterion => (
                    <div key={criterion.id} className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                      {getStatusIcon(criterion.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono text-gray-600">{criterion.id}</span>
                          <span className="font-medium text-gray-900">
                            {language === 'pt' ? criterion.namePt : criterion.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {language === 'pt' ? criterion.descriptionPt : criterion.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Portuguese-Specific Features */}
      {includePortugueseCompliance && (
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {language === 'pt'
              ? 'Recursos Específicos para Comunidade Portuguesa'
              : 'Portuguese Community-Specific Features'
            }
          </h2>
          
          <div className="grid gap-4">
            {portugueseSpecificFeatures.map(feature => (
              <div key={feature.feature} className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                {getStatusIcon(feature.status)}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {language === 'pt' ? feature.featurePt : feature.feature}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? feature.descriptionPt : feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Implemented Components */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {language === 'pt'
            ? 'Componentes Acessíveis Implementados'
            : 'Implemented Accessible Components'
          }
        </h2>
        
        <div className="space-y-6">
          {implementedComponents.map(comp => (
            <div key={comp.component} className="border-l-4 border-heritage-primary bg-heritage-primary/5 p-4 rounded-r-lg">
              <h3 className="font-mono text-heritage-primary font-semibold mb-2">
                {comp.component}
              </h3>
              <p className="text-gray-700 mb-3">
                {language === 'pt' ? comp.descriptionPt : comp.description}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {comp.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Touch Target Enhancement */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {language === 'pt'
            ? 'Melhorias de Alvos Tácteis'
            : 'Touch Target Enhancements'
          }
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Padrão WCAG' : 'WCAG Standard'}
            </h3>
            <div className="bg-gray-100 rounded p-4">
              <div className="w-11 h-11 bg-gray-400 rounded mb-2"></div>
              <p className="text-sm text-gray-600">44×44px minimum</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-heritage-primary mb-2">
              {language === 'pt' ? 'LusoTown Melhorado' : 'LusoTown Enhanced'}
            </h3>
            <div className="bg-heritage-primary/10 rounded p-4">
              <div className="w-12 h-12 bg-heritage-primary rounded mb-2"></div>
              <p className="text-sm text-heritage-primary">
                {language === 'pt' 
                  ? '48×48px+ para comunidade móvel'
                  : '48×48px+ for mobile community'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing and Validation */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {language === 'pt'
            ? 'Testes e Validação'
            : 'Testing and Validation'
          }
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-900">
              {language === 'pt' ? 'Testes Automatizados' : 'Automated Testing'}
            </p>
            <p className="text-sm text-green-700">
              {language === 'pt' ? 'Conformidade validada' : 'Compliance validated'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <InformationCircleIcon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-blue-900">
              {language === 'pt' ? 'Testes Manuais' : 'Manual Testing'}
            </p>
            <p className="text-sm text-blue-700">
              {language === 'pt' ? 'Navegação validada' : 'Navigation validated'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <CheckCircleIcon className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-purple-900">
              {language === 'pt' ? 'Leitor de Ecrã' : 'Screen Reader'}
            </p>
            <p className="text-sm text-purple-700">
              {language === 'pt' ? 'NVDA/JAWS testado' : 'NVDA/JAWS tested'}
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-heritage-primary text-white rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {language === 'pt'
            ? 'Compromisso com Acessibilidade'
            : 'Commitment to Accessibility'
          }
        </h2>
        <p className="text-heritage-primary-100 mb-4">
          {language === 'pt'
            ? 'A plataforma LusoTown foi desenvolvida com acessibilidade como prioridade principal, garantindo que todos os membros da comunidade portuguesa no Reino Unido possam participar plenamente, independentemente das suas capacidades.'
            : 'The LusoTown platform has been built with accessibility as a core priority, ensuring that all members of the Portuguese community in the United Kingdom can participate fully, regardless of their abilities.'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">WCAG 2.1 AA</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            {language === 'pt' ? 'Bilíngue PT/EN' : 'Bilingual PT/EN'}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            {language === 'pt' ? 'Mobile-First' : 'Mobile-First'}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            {language === 'pt' ? 'Contexto Cultural' : 'Cultural Context'}
          </span>
        </div>
      </section>
    </div>
  )
}