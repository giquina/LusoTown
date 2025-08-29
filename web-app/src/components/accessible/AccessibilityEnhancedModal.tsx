"use client";
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFocusManagement, useScreenReaderAnnouncements } from './AccessibilityUtilities';

interface AccessibilityEnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  autoFocus?: boolean;
  returnFocusRef?: React.RefObject<HTMLElement>;
}

export default function AccessibilityEnhancedModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  autoFocus = true,
  returnFocusRef
}: AccessibilityEnhancedModalProps) {
  const { t, language } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { trapFocus, restoreFocus } = useFocusManagement();
  const { announceToScreenReader } = useScreenReaderAnnouncements();

  // Size classes for responsive Portuguese content
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // Handle modal opening
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Announce modal opening to screen reader
      announceToScreenReader(
        t('modal.opened', 'Modal dialog opened: {{title}}', { title }), 
        'assertive'
      );

      // Set animation state
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      // Set up focus trap
      let focusTrapCleanup: (() => void) | undefined;
      if (modalRef.current && autoFocus) {
        focusTrapCleanup = trapFocus(modalRef.current);
      }

      return () => {
        focusTrapCleanup?.();
      };
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to previous element or provided ref
      const elementToFocus = returnFocusRef?.current || previousActiveElement.current;
      restoreFocus(elementToFocus);
      
      // Announce modal closing
      announceToScreenReader(
        t('modal.closed', 'Modal dialog closed'), 
        'polite'
      );
    }
  }, [isOpen, autoFocus, trapFocus, restoreFocus, announceToScreenReader, t, title, returnFocusRef]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      e.preventDefault();
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`relative bg-white rounded-2xl shadow-2xl transition-all duration-300 transform w-full ${sizeClasses[size]} ${
            isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          } ${className}`}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex-1 min-w-0">
              <h1
                id="modal-title"
                className="text-xl font-bold text-gray-900 truncate pr-4"
              >
                {title}
              </h1>
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-gray-600"
                >
                  {description}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={handleCloseClick}
              className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-600 focus:text-gray-600 hover:bg-gray-100 focus:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={t('modal.close_button', 'Close modal dialog')}
              type="button"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Screen reader only instructions */}
          <div className="sr-only">
            <p>{t('modal.instructions', 'Use Tab to navigate between elements. Press Escape to close modal.')}</p>
            {closeOnOverlayClick && (
              <p>{t('modal.overlay_instructions', 'Click outside modal to close.')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Focus sentinel to prevent focus from leaving modal */}
      <div tabIndex={0} aria-hidden="true" />
    </div>
  );
}

// Portuguese-specific modal variants
export function PortugueseBusinessModal({
  business,
  isOpen,
  onClose,
  children
}: {
  business?: { name: string; category: string; location: string };
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  if (!business) return null;

  return (
    <AccessibilityEnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={business.name}
      description={t('business.modal.description', '{{category}} business in {{location}}', {
        category: business.category,
        location: business.location
      })}
      size="lg"
    >
      {children}
    </AccessibilityEnhancedModal>
  );
}

export function PortugueseEventModal({
  event,
  isOpen,
  onClose,
  children
}: {
  event?: { title: string; date: string; location: string };
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  if (!event) return null;

  return (
    <AccessibilityEnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      description={t('event.modal.description', 'Portuguese community event on {{date}} at {{location}}', {
        date: event.date,
        location: event.location
      })}
      size="lg"
    >
      {children}
    </AccessibilityEnhancedModal>
  );
}

// Form modal specifically for Portuguese cultural forms
export function PortugueseCulturalFormModal({
  isOpen,
  onClose,
  title,
  formType,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formType: 'signup' | 'business_submission' | 'event_booking' | 'contact';
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  const formDescriptions = {
    signup: t('form.signup.description', 'Join the Portuguese-speaking community platform'),
    business_submission: t('form.business.description', 'Submit your business to the Portuguese community directory'),
    event_booking: t('form.event.description', 'Book tickets for Portuguese community events'),
    contact: t('form.contact.description', 'Contact the Portuguese community team')
  };

  return (
    <AccessibilityEnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={formDescriptions[formType]}
      size="md"
      className="portuguese-cultural-form"
    >
      <div role="form" aria-label={title}>
        {children}
      </div>
    </AccessibilityEnhancedModal>
  );
}