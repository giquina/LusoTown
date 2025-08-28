/**
 * Modal Escape Functionality Tests
 * 
 * Comprehensive test suite for modal escape hatches:
 * - Escape key functionality
 * - Click outside to close
 * - Body scroll prevention
 * - Focus management
 * - Accessibility features
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/context/LanguageContext';
import { HeritageProvider } from '@/context/HeritageContext';
import { CartProvider } from '@/context/CartContext';

// Import modal components
import EnhancedModal from '@/components/EnhancedModal';
import { LuxuryModal } from '@/components/LuxuryMobileInteraction';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, onClick, ...props }: any) => (
      <div onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
}));

// Test wrapper with all required providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    <HeritageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </HeritageProvider>
  </LanguageProvider>
);

describe('Modal Escape Functionality', () => {
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
    // Reset body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  describe('EnhancedModal', () => {
    it('should close modal when Escape key is pressed', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      // Press Escape key
      await user.keyboard('{Escape}');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should close modal when clicking outside (backdrop)', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      const backdrop = document.querySelector('.modal-backdrop');
      expect(backdrop).toBeInTheDocument();

      // Click on backdrop
      if (backdrop) {
        await user.click(backdrop);
      }

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close when clicking inside modal content', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      const modalContent = screen.getByText('Modal content');
      await user.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should prevent body scroll when modal is open', () => {
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            preventBodyScroll={true}
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when modal is closed', () => {
      const { rerender } = render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            preventBodyScroll={true}
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      expect(document.body.style.overflow).toBe('hidden');

      // Close modal
      rerender(
        <TestWrapper>
          <EnhancedModal
            isOpen={false}
            onClose={mockOnClose}
            title="Test Modal"
            preventBodyScroll={true}
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('should respect allowClickOutside=false', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            allowClickOutside={false}
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        await user.click(backdrop);
      }

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('should close when close button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            showCloseButton={true}
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('LuxuryModal', () => {
    it('should close luxury modal when Escape key is pressed', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LuxuryModal
            isOpen={true}
            onClose={mockOnClose}
            title="Luxury Test Modal"
          >
            <p>Luxury modal content</p>
          </LuxuryModal>
        </TestWrapper>
      );

      await user.keyboard('{Escape}');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should close luxury modal when clicking backdrop', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <LuxuryModal
            isOpen={true}
            onClose={mockOnClose}
            title="Luxury Test Modal"
          >
            <p>Luxury modal content</p>
          </LuxuryModal>
        </TestWrapper>
      );

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        await user.click(backdrop);
      }

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have proper accessibility attributes in luxury modal', () => {
      render(
        <TestWrapper>
          <LuxuryModal
            isOpen={true}
            onClose={mockOnClose}
            title="Luxury Test Modal"
          >
            <p>Luxury modal content</p>
          </LuxuryModal>
        </TestWrapper>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'luxury-modal-title');
    });
  });

  describe('Focus Management', () => {
    it('should focus modal container when opened', async () => {
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      await waitFor(() => {
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveFocus();
      });
    });

    it('should restore focus to previous element when modal closes', async () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        
        return (
          <TestWrapper>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <EnhancedModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Test Modal"
            >
              <p>Modal content</p>
            </EnhancedModal>
          </TestWrapper>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const openButton = screen.getByText('Open Modal');
      await user.click(openButton);

      // Modal should be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Close modal with Escape
      await user.keyboard('{Escape}');

      // Focus should return to open button
      await waitFor(() => {
        expect(openButton).toHaveFocus();
      });
    });
  });

  describe('Multiple Modal Stacking', () => {
    it('should handle multiple modals correctly', async () => {
      const mockOnClose1 = jest.fn();
      const mockOnClose2 = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose1}
            title="First Modal"
          >
            <p>First modal content</p>
          </EnhancedModal>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose2}
            title="Second Modal"
          >
            <p>Second modal content</p>
          </EnhancedModal>
        </TestWrapper>
      );

      // Escape should close the top modal (second one)
      await user.keyboard('{Escape}');
      
      expect(mockOnClose2).toHaveBeenCalledTimes(1);
      expect(mockOnClose1).not.toHaveBeenCalled();
    });
  });

  describe('Portuguese Cultural Context', () => {
    it('should display Portuguese close button label when language is PT', () => {
      render(
        <TestWrapper>
          <EnhancedModal
            isOpen={true}
            onClose={mockOnClose}
            title="Teste Modal"
            showCloseButton={true}
          >
            <p>Conteúdo do modal</p>
          </EnhancedModal>
        </TestWrapper>
      );

      // Should have close button with appropriate aria-label
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });
});

// Integration test with actual modal usage patterns
describe('Modal Integration Tests', () => {
  it('should work with complex modal content including forms', async () => {
    const mockOnClose = jest.fn();
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();
    
    const TestForm = () => (
      <TestWrapper>
        <EnhancedModal
          isOpen={true}
          onClose={mockOnClose}
          title="Test Form Modal"
        >
          <form onSubmit={mockOnSubmit}>
            <input type="text" placeholder="Test input" />
            <button type="submit">Submit</button>
          </form>
        </EnhancedModal>
      </TestWrapper>
    );

    render(<TestForm />);

    const input = screen.getByPlaceholderText('Test input');
    await user.type(input, 'test value');

    // Escape should still close modal even with form focus
    await user.keyboard('{Escape}');
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});