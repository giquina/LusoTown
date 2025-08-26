'use client';

import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface ModalEscapeHatchesProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  preventCloseOnOverlayClick?: boolean;
  preventEscapeClose?: boolean;
  showCloseButton?: boolean;
  customCloseButton?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

/**
 * Enhanced Modal with comprehensive escape hatches for Portuguese-speaking community
 * Features:
 * - ESC key to close
 * - Click outside to close
 * - Visible close button
 * - Focus management
 * - Accessibility support
 * - Portuguese translations
 */
export default function ModalEscapeHatches({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  preventCloseOnOverlayClick = false,
  preventEscapeClose = false,
  showCloseButton = true,
  customCloseButton,
  className = '',
  overlayClassName = ''
}: ModalEscapeHatchesProps) {
  const { language } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'full': return 'max-w-full mx-4';
      default: return 'max-w-md';
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !preventEscapeClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, onClose, preventEscapeClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElement = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          
          if (focusableElement) {
            focusableElement.focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 100);
    } else {
      // Return focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !preventCloseOnOverlayClick) {
      onClose();
    }
  };

  // Focus trap
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-y-auto ${overlayClassName}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" />
        
        {/* Centering trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`inline-block w-full ${getSizeClasses()} my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl ${className}`}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            
            {showCloseButton && (
              <div className="flex items-center space-x-2">
                {/* Escape hint */}
                {!preventEscapeClose && (
                  <div className="hidden sm:flex items-center text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    <span>ESC</span>
                  </div>
                )}
                
                {/* Custom close button or default */}
                {customCloseButton || (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label={language === 'pt' ? 'Fechar modal' : 'Close modal'}
                    title={language === 'pt' ? 'Fechar (ESC)' : 'Close (ESC)'}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Modal content */}
          <div className="p-6">
            {children}
          </div>

          {/* Accessibility instructions (hidden but available to screen readers) */}
          <div className="sr-only">
            {language === 'pt' ? (
              <>
                <p>Para fechar este modal, pressione a tecla Escape ou clique fora da janela.</p>
                <p>Use Tab para navegar entre os elementos interativos.</p>
              </>
            ) : (
              <>
                <p>To close this modal, press the Escape key or click outside the window.</p>
                <p>Use Tab to navigate between interactive elements.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Convenience hook for modal state management
export function useModalEscapeHatches(initialState: boolean = false) {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen
  };
}

// Example usage component for demonstration
export function ModalEscapeHatchesDemo() {
  const { language } = useLanguage();
  const { isOpen, openModal, closeModal } = useModalEscapeHatches();
  const [selectedExample, setSelectedExample] = React.useState<string>('');

  const openExampleModal = (example: string) => {
    setSelectedExample(example);
    openModal();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {language === 'pt' ? 'Demonstração de Modais com Saídas de Emergência' : 'Modal Escape Hatches Demo'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => openExampleModal('portuguese-events')}
          className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {language === 'pt' ? 'Modal de Eventos' : 'Events Modal'}
        </button>
        <button
          onClick={() => openExampleModal('palop-heritage')}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {language === 'pt' ? 'Modal PALOP' : 'PALOP Modal'}
        </button>
        <button
          onClick={() => openExampleModal('settings')}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {language === 'pt' ? 'Modal de Configurações' : 'Settings Modal'}
        </button>
      </div>

      <ModalEscapeHatches
        isOpen={isOpen}
        onClose={closeModal}
        title={getModalTitle(selectedExample, language)}
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {language === 'pt' 
              ? 'Este modal demonstra as funcionalidades de saída de emergência:'
              : 'This modal demonstrates escape hatch functionality:'
            }
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>{language === 'pt' ? 'Pressione ESC para fechar' : 'Press ESC to close'}</li>
            <li>{language === 'pt' ? 'Clique fora para fechar' : 'Click outside to close'}</li>
            <li>{language === 'pt' ? 'Use Tab para navegar' : 'Use Tab to navigate'}</li>
            <li>{language === 'pt' ? 'Botão X sempre visível' : 'X button always visible'}</li>
          </ul>
          
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h4 className="font-medium text-primary-900">
              {getModalTitle(selectedExample, language)}
            </h4>
            <p className="text-primary-700 mt-2">
              {getModalContent(selectedExample, language)}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {language === 'pt' ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {language === 'pt' ? 'Confirmar' : 'Confirm'}
            </button>
          </div>
        </div>
      </ModalEscapeHatches>
    </div>
  );
}

function getModalTitle(example: string, language: string): string {
  const titles = {
    'portuguese-events': {
      pt: 'Eventos Portugueses em Londres',
      en: 'Portuguese Events in London'
    },
    'palop-heritage': {
      pt: 'Património dos Países PALOP',
      en: 'PALOP Countries Heritage'
    },
    'settings': {
      pt: 'Configurações da Comunidade',
      en: 'Community Settings'
    }
  };
  
  return titles[example as keyof typeof titles]?.[language as keyof typeof titles['portuguese-events']] || 'Modal';
}

function getModalContent(example: string, language: string): string {
  const content = {
    'portuguese-events': {
      pt: 'Descubra eventos autênticos da comunidade portuguesa em Londres, incluindo noites de Fado, festivais culturais e networking empresarial.',
      en: 'Discover authentic Portuguese community events in London, including Fado nights, cultural festivals, and business networking.'
    },
    'palop-heritage': {
      pt: 'Explore a rica herança cultural dos países africanos de língua portuguesa: Angola, Cabo Verde, Guiné-Bissau, Moçambique e São Tomé e Príncipe.',
      en: 'Explore the rich cultural heritage of Portuguese-speaking African countries: Angola, Cape Verde, Guinea-Bissau, Mozambique, and São Tomé and Príncipe.'
    },
    'settings': {
      pt: 'Personalize sua experiência na comunidade lusófona, incluindo preferências de idioma, notificações e matching cultural.',
      en: 'Customize your Portuguese-speaking community experience, including language preferences, notifications, and cultural matching.'
    }
  };
  
  return content[example as keyof typeof content]?.[language as keyof typeof content['portuguese-events']] || 'Modal content';
}