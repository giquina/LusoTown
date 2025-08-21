'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { 
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Info,
  Target,
  Users,
  Star,
  Award
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Learning module types
export interface LearningStep {
  id: string;
  title: string;
  titlePortuguese: string;
  type: 'introduction' | 'tutorial' | 'interactive' | 'checklist' | 'decision-tree' | 'summary';
  content: string;
  contentPortuguese: string;
  estimatedTime: number; // in minutes
  mediaUrl?: string;
  interactive?: {
    type: 'checklist' | 'quiz' | 'form' | 'decision-tree';
    data: any;
  };
  tips?: string[];
  tipsPortuguese?: string[];
  warnings?: string[];
  warningsPortuguese?: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  titlePortuguese: string;
  description: string;
  descriptionPortuguese: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number; // total time in minutes
  icon: React.ComponentType<any>;
  category: string;
  categoryPortuguese: string;
  prerequisites: string[];
  prerequisitesPortuguese: string[];
  learningObjectives: string[];
  learningObjectivesPortuguese: string[];
  steps: LearningStep[];
  practicalExercises: any[];
  resources: {
    title: string;
    titlePortuguese: string;
    url: string;
    type: 'guide' | 'video' | 'external' | 'download';
  }[];
}

interface LearningModuleFrameworkProps {
  module: LearningModule;
  onComplete: () => void;
  onStepComplete: (stepId: string) => void;
  completedSteps: string[];
  showProgress?: boolean;
}

export default function LearningModuleFramework({
  module,
  onComplete,
  onStepComplete,
  completedSteps,
  showProgress = true
}: LearningModuleFrameworkProps) {
  const { language } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [interactiveState, setInteractiveState] = useState<any>({});
  const [showingSummary, setShowingSummary] = useState(false);

  const isPortuguese = language === 'pt';
  const currentStep = module.steps[currentStepIndex];
  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const progressPercentage = Math.round((completedSteps.length / module.steps.length) * 100);

  // Auto-save progress to localStorage
  useEffect(() => {
    const progressKey = `lusotown-academy-${module.id}-progress`;
    localStorage.setItem(progressKey, JSON.stringify({
      currentStepIndex,
      completedSteps,
      interactiveState,
      lastAccess: Date.now()
    }));
  }, [currentStepIndex, completedSteps, interactiveState, module.id]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleStepComplete = () => {
    if (!isStepCompleted(currentStep.id)) {
      onStepComplete(currentStep.id);
    }
    
    // Move to next step or show summary
    if (currentStepIndex < module.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setShowingSummary(true);
      onComplete();
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
    setShowingSummary(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const renderInteractiveElement = (step: LearningStep) => {
    if (!step.interactive) return null;

    switch (step.interactive.type) {
      case 'checklist':
        return (
          <div className="bg-secondary-50 rounded-2xl p-6 mt-6">
            <h4 className="font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Lista de Verificação' : 'Checklist'}
            </h4>
            <div className="space-y-3">
              {step.interactive.data.items.map((item: any, index: number) => (
                <label key={index} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={interactiveState[`${step.id}-${index}`] || false}
                    onChange={(e) => setInteractiveState(prev => ({
                      ...prev,
                      [`${step.id}-${index}`]: e.target.checked
                    }))}
                    className="mt-1 w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-secondary-700">
                    {isPortuguese ? item.textPortuguese || item.text : item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'decision-tree':
        return (
          <div className="bg-primary-50 rounded-2xl p-6 mt-6 border border-primary-200">
            <h4 className="font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Árvore de Decisão' : 'Decision Tree'}
            </h4>
            {/* Decision tree implementation would go here */}
            <p className="text-secondary-600">
              {isPortuguese ? 'Funcionalidade interativa em desenvolvimento' : 'Interactive feature in development'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepContent = (step: LearningStep) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="prose prose-lg max-w-none"
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-secondary-100">
        {/* Step header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">{currentStepIndex + 1}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isPortuguese ? step.titlePortuguese : step.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-secondary-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {step.estimatedTime} {isPortuguese ? 'min' : 'min'}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {step.type === 'tutorial' ? (isPortuguese ? 'Tutorial' : 'Tutorial') :
                 step.type === 'interactive' ? (isPortuguese ? 'Interativo' : 'Interactive') :
                 step.type === 'checklist' ? (isPortuguese ? 'Lista' : 'Checklist') :
                 isPortuguese ? 'Leitura' : 'Reading'}
              </div>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="mb-6">
          <div 
            className="text-secondary-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: isPortuguese ? step.contentPortuguese : step.content 
            }}
          />
        </div>

        {/* Tips section */}
        {step.tips && step.tips.length > 0 && (
          <div className="mb-6">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection(`tips-${step.id}`)}
            >
              <Lightbulb className="w-5 h-5 text-accent-500" />
              <h4 className="font-semibold text-gray-900">
                {isPortuguese ? 'Dicas Úteis' : 'Helpful Tips'}
              </h4>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                expandedSections.has(`tips-${step.id}`) ? 'rotate-180' : ''
              }`} />
            </div>
            <AnimatePresence>
              {expandedSections.has(`tips-${step.id}`) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 bg-yellow-50 rounded-xl p-4 border border-yellow-200"
                >
                  <ul className="space-y-2">
                    {(isPortuguese ? step.tipsPortuguese || step.tips : step.tips).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Warnings section */}
        {step.warnings && step.warnings.length > 0 && (
          <div className="mb-6">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection(`warnings-${step.id}`)}
            >
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-gray-900">
                {isPortuguese ? 'Avisos Importantes' : 'Important Warnings'}
              </h4>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                expandedSections.has(`warnings-${step.id}`) ? 'rotate-180' : ''
              }`} />
            </div>
            <AnimatePresence>
              {expandedSections.has(`warnings-${step.id}`) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 bg-orange-50 rounded-xl p-4 border border-orange-200"
                >
                  <ul className="space-y-2">
                    {(isPortuguese ? step.warningsPortuguese || step.warnings : step.warnings).map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-orange-800">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Interactive elements */}
        {renderInteractiveElement(step)}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-secondary-200">
          <button
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStepIndex === 0
                ? 'bg-secondary-100 text-gray-400 cursor-not-allowed'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isPortuguese ? 'Anterior' : 'Previous'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-600">
              {currentStepIndex + 1} {isPortuguese ? 'de' : 'of'} {module.steps.length}
            </span>
          </div>

          <button
            onClick={handleStepComplete}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {currentStepIndex === module.steps.length - 1 ? 
              (isPortuguese ? 'Concluir' : 'Complete') : 
              (isPortuguese ? 'Próximo' : 'Next')
            }
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Module header */}
      <div className="bg-white border-b border-secondary-200 sticky top-0 z-10">
        <div className="container-width py-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <module.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {isPortuguese ? module.titlePortuguese : module.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
                <div className="flex items-center gap-1 text-secondary-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{module.estimatedTime} {isPortuguese ? 'minutos' : 'minutes'}</span>
                </div>
                <div className="flex items-center gap-1 text-secondary-600">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">{module.steps.length} {isPortuguese ? 'passos' : 'steps'}</span>
                </div>
              </div>
            </div>
            
            {showProgress && (
              <div className="text-right">
                <div className="text-sm text-secondary-600 mb-1">
                  {isPortuguese ? 'Progresso' : 'Progress'}
                </div>
                <div className="w-32 bg-secondary-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium text-primary-600">
                  {progressPercentage}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-width py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Step navigation sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Passos do Módulo' : 'Module Steps'}
              </h3>
              <nav className="space-y-2">
                {module.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      currentStepIndex === index
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : isStepCompleted(step.id)
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isStepCompleted(step.id)
                        ? 'bg-action-500 text-white'
                        : currentStepIndex === index
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-300 text-secondary-600'
                    }`}>
                      {isStepCompleted(step.id) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {isPortuguese ? step.titlePortuguese : step.title}
                      </div>
                      <div className="text-xs opacity-75">
                        {step.estimatedTime} {isPortuguese ? 'min' : 'min'}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Step content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!showingSummary ? (
                renderStepContent(currentStep)
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-secondary-100 text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Módulo Concluído!' : 'Module Completed!'}
                  </h2>
                  <p className="text-secondary-600 mb-8">
                    {isPortuguese 
                      ? `Parabéns! Você concluiu com sucesso o módulo "${module.titlePortuguese}".`
                      : `Congratulations! You have successfully completed the "${module.title}" module.`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                      {isPortuguese ? 'Próximo Módulo' : 'Next Module'}
                    </button>
                    <button 
                      onClick={() => setShowingSummary(false)}
                      className="border border-secondary-300 text-secondary-700 px-8 py-3 rounded-xl font-semibold hover:bg-secondary-50 transition-all duration-200"
                    >
                      {isPortuguese ? 'Revisar Módulo' : 'Review Module'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}