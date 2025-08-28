import { useEffect, useCallback, useRef } from 'react';

interface UseModalEscapeOptions {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
  allowClickOutside?: boolean;
  preventBodyScroll?: boolean;
}

/**
 * Custom hook for comprehensive modal escape functionality
 * Handles:
 * - Escape key press
 * - Click outside to close
 * - Body scroll prevention
 * - Focus management
 * - Multiple modal stacking
 */
export function useModalEscape({
  isOpen,
  onClose,
  enabled = true,
  allowClickOutside = true,
  preventBodyScroll = true
}: UseModalEscapeOptions) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !isOpen) return;
    
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }
  }, [isOpen, onClose, enabled]);

  // Handle click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!enabled || !isOpen || !allowClickOutside) return;
    
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      // Check if clicking on backdrop (not another modal)
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal-backdrop') || 
          target.closest('.modal-backdrop')) {
        onClose();
      }
    }
  }, [isOpen, onClose, enabled, allowClickOutside]);

  // Manage body scroll and focus
  useEffect(() => {
    if (!enabled) return;

    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      }

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown, true);
      document.addEventListener('mousedown', handleClickOutside, true);

      // Focus modal container
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restore body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }

      // Remove event listeners
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleClickOutside, true);

      // Restore focus
      if (previousActiveElement.current && 
          document.contains(previousActiveElement.current)) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      // Cleanup on unmount
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleClickOutside, true);
      
      if (preventBodyScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen, handleKeyDown, handleClickOutside, enabled, preventBodyScroll]);

  // Calculate scrollbar width for proper body padding
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  return {
    modalRef,
    // Helper function to check if modal should close
    shouldClose: (event: React.MouseEvent) => {
      if (!enabled || !allowClickOutside) return false;
      
      const target = event.target as HTMLElement;
      return target.classList.contains('modal-backdrop') || 
             target.closest('.modal-backdrop');
    }
  };
}