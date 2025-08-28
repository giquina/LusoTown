'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useModalEscape } from '@/hooks/useModalEscape';
import { useLanguage } from '@/context/LanguageContext';

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  allowClickOutside?: boolean;
  preventBodyScroll?: boolean;
  className?: string;
  contentClassName?: string;
  backdropClassName?: string;
  closeButtonLabel?: string;
}

const EnhancedModal = forwardRef<HTMLDivElement, EnhancedModalProps>(({
  isOpen,
  onClose,
  children,
  title,
  size = 'medium',
  showCloseButton = true,
  allowClickOutside = true,
  preventBodyScroll = true,
  className = '',
  contentClassName = '',
  backdropClassName = '',
  closeButtonLabel
}, ref) => {
  const { t } = useLanguage();
  const { modalRef } = useModalEscape({
    isOpen,
    onClose,
    allowClickOutside,
    preventBodyScroll
  });

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl', 
    large: 'max-w-4xl',
    fullscreen: 'max-w-[95vw] max-h-[95vh]'
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (allowClickOutside && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with enhanced escape functionality */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm ${backdropClassName}`}
            onClick={handleBackdropClick}
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              ref={modalRef || ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className={`
                relative w-full ${sizeClasses[size]} 
                bg-white rounded-2xl shadow-2xl 
                border border-primary-100/20
                ${className}
              `}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              tabIndex={-1}
            >
              {/* Header with close button */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 pb-4">
                  {title && (
                    <h2 
                      id="modal-title"
                      className="text-xl font-bold text-primary-900 pr-4"
                    >
                      {title}
                    </h2>
                  )}
                  
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="
                        p-2 rounded-lg text-gray-400 hover:text-gray-600 
                        hover:bg-gray-100 transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary-500
                      "
                      aria-label={closeButtonLabel || t('common.close')}
                      type="button"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={`
                ${title || showCloseButton ? 'px-6 pb-6' : 'p-6'} 
                ${contentClassName}
              `}>
                {children}
              </div>

              {/* Accessibility enhancement: Instructions for screen readers */}
              <div className="sr-only">
                {t('accessibility.modalInstructions') || 'Press Escape key to close modal. Click outside to close.'}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
});

EnhancedModal.displayName = 'EnhancedModal';

export default EnhancedModal;