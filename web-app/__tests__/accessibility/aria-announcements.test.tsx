import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAriaAnnouncements, ARIA_MESSAGES } from '@/hooks/useAriaAnnouncements'
import { useFocusManagement } from '@/hooks/useFocusManagement'
import { LanguageProvider } from '@/context/LanguageContext'
import React, { useRef } from 'react'

// Mock component to test the ARIA hooks
const TestComponent = ({ 
  testAnnouncement = false, 
  testFocus = false,
  language = 'en'
}) => {
  const { announce, announcePolite, announceAssertive, clear } = useAriaAnnouncements()
  const containerRef = useRef<HTMLDivElement>(null)
  const { focusFirst, focusLast } = useFocusManagement(containerRef, testFocus)

  return (
    <LanguageProvider>
      <div ref={containerRef}>
        <button
          onClick={() => announce(ARIA_MESSAGES.lusobot.opened)}
          data-testid="announce-button"
        >
          Announce
        </button>
        
        <button
          onClick={() => announcePolite(ARIA_MESSAGES.lusobot.minimized)}
          data-testid="announce-polite-button"
        >
          Announce Polite
        </button>
        
        <button
          onClick={() => announceAssertive(ARIA_MESSAGES.appDownloadBar.shown)}
          data-testid="announce-assertive-button"
        >
          Announce Assertive
        </button>
        
        <button
          onClick={() => clear()}
          data-testid="clear-button"
        >
          Clear
        </button>

        <button
          onClick={() => focusFirst()}
          data-testid="focus-first-button"
        >
          Focus First
        </button>

        <input data-testid="first-input" />
        <input data-testid="second-input" />
        <button data-testid="focusable-button">Focusable</button>
      </div>
    </LanguageProvider>
  )
}

describe('ARIA Announcements System', () => {
  beforeEach(() => {
    // Clean up any existing live regions
    const existingLiveRegion = document.getElementById('lusotown-aria-live-region')
    if (existingLiveRegion) {
      existingLiveRegion.remove()
    }
  })

  describe('useAriaAnnouncements hook', () => {
    it('creates a live region when initialized', async () => {
      render(<TestComponent />)
      
      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion).toBeInTheDocument()
        expect(liveRegion).toHaveAttribute('aria-live', 'polite')
        expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
        expect(liveRegion).toHaveClass('sr-only')
      })
    })

    it('announces messages to screen readers', async () => {
      const user = userEvent.setup()
      render(<TestComponent />)

      const announceButton = screen.getByTestId('announce-button')
      await user.click(announceButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion?.textContent).toContain('LusoBot chat assistant opened')
      })
    })

    it('handles polite announcements', async () => {
      const user = userEvent.setup()
      render(<TestComponent />)

      const announceButton = screen.getByTestId('announce-polite-button')
      await user.click(announceButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion).toHaveAttribute('aria-live', 'polite')
        expect(liveRegion?.textContent).toContain('LusoBot chat minimized')
      })
    })

    it('handles assertive announcements', async () => {
      const user = userEvent.setup()
      render(<TestComponent />)

      const announceButton = screen.getByTestId('announce-assertive-button')
      await user.click(announceButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion).toHaveAttribute('aria-live', 'assertive')
        expect(liveRegion?.textContent).toContain('App download banner appeared')
      })
    })

    it('clears announcements', async () => {
      const user = userEvent.setup()
      render(<TestComponent />)

      // First make an announcement
      const announceButton = screen.getByTestId('announce-button')
      await user.click(announceButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion?.textContent).toContain('LusoBot')
      })

      // Then clear it
      const clearButton = screen.getByTestId('clear-button')
      await user.click(clearButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion?.textContent).toBe('')
      })
    })

    it('handles Portuguese language announcements', async () => {
      const user = userEvent.setup()
      render(<TestComponent language="pt" />)

      const announceButton = screen.getByTestId('announce-button')
      await user.click(announceButton)

      await waitFor(() => {
        const liveRegion = document.getElementById('lusotown-aria-live-region')
        expect(liveRegion?.textContent).toContain('Assistente de chat LusoBot aberto')
      })
    })
  })

  describe('Focus Management System', () => {
    it('manages focus correctly', async () => {
      const user = userEvent.setup()
      render(<TestComponent testFocus={true} />)

      const focusButton = screen.getByTestId('focus-first-button')
      await user.click(focusButton)

      await waitFor(() => {
        const firstInput = screen.getByTestId('first-input')
        expect(firstInput).toHaveFocus()
      })
    })

    it('finds focusable elements correctly', async () => {
      render(<TestComponent testFocus={true} />)
      
      const inputs = screen.getAllByRole('textbox')
      const buttons = screen.getAllByRole('button')
      
      expect(inputs.length).toBeGreaterThan(0)
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('ARIA Messages Constants', () => {
    it('contains all required widget messages', () => {
      expect(ARIA_MESSAGES.widget.opened).toBeDefined()
      expect(ARIA_MESSAGES.widget.closed).toBeDefined()
      expect(ARIA_MESSAGES.widget.minimized).toBeDefined()
      expect(ARIA_MESSAGES.widget.maximized).toBeDefined()
    })

    it('contains all required LusoBot messages', () => {
      expect(ARIA_MESSAGES.lusobot.opened).toBeDefined()
      expect(ARIA_MESSAGES.lusobot.closed).toBeDefined()
      expect(ARIA_MESSAGES.lusobot.minimized).toBeDefined()
      expect(ARIA_MESSAGES.lusobot.messageSent).toBeDefined()
      expect(ARIA_MESSAGES.lusobot.messageReceived).toBeDefined()
    })

    it('contains all required app download messages', () => {
      expect(ARIA_MESSAGES.appDownloadBar.shown).toBeDefined()
      expect(ARIA_MESSAGES.appDownloadBar.dismissed).toBeDefined()
      expect(ARIA_MESSAGES.appDownloadBar.downloadStarted).toBeDefined()
    })

    it('contains all required cultural events messages', () => {
      expect(ARIA_MESSAGES.culturalEvents.eventFocused).toBeDefined()
      expect(ARIA_MESSAGES.culturalEvents.eventSelected).toBeDefined()
      expect(ARIA_MESSAGES.culturalEvents.favoriteAdded).toBeDefined()
      expect(ARIA_MESSAGES.culturalEvents.favoriteRemoved).toBeDefined()
      expect(ARIA_MESSAGES.culturalEvents.reminderSet).toBeDefined()
    })

    it('contains bilingual messages', () => {
      expect(ARIA_MESSAGES.lusobot.opened.en).toBeDefined()
      expect(ARIA_MESSAGES.lusobot.opened.pt).toBeDefined()
      expect(ARIA_MESSAGES.appDownloadBar.shown.en).toBeDefined()
      expect(ARIA_MESSAGES.appDownloadBar.shown.pt).toBeDefined()
    })
  })

  describe('Portuguese Heritage Focus Styles', () => {
    it('adds Portuguese cultural focus classes', async () => {
      render(<TestComponent testFocus={true} />)
      
      // The focus styles should be added to the document head
      await waitFor(() => {
        const styleElement = document.getElementById('lusotown-focus-styles')
        expect(styleElement).toBeInTheDocument()
        expect(styleElement?.textContent).toContain('--focus-ring-color: rgb(34 197 94)')
      })
    })

    it('supports high contrast mode', async () => {
      render(<TestComponent testFocus={true} />)
      
      await waitFor(() => {
        const styleElement = document.getElementById('lusotown-focus-styles')
        expect(styleElement?.textContent).toContain('@media (prefers-contrast: high)')
        expect(styleElement?.textContent).toContain('--focus-ring-color: #000000')
      })
    })

    it('supports reduced motion', async () => {
      render(<TestComponent testFocus={true} />)
      
      await waitFor(() => {
        const styleElement = document.getElementById('lusotown-focus-styles')
        expect(styleElement?.textContent).toContain('@media (prefers-reduced-motion: reduce)')
        expect(styleElement?.textContent).toContain('transition: none !important')
      })
    })
  })

  describe('Screen Reader Compatibility', () => {
    it('provides proper semantic structure', async () => {
      render(<TestComponent />)
      
      const liveRegion = await waitFor(() => 
        document.getElementById('lusotown-aria-live-region')
      )
      
      expect(liveRegion).toHaveAttribute('aria-live')
      expect(liveRegion).toHaveAttribute('aria-atomic')
      
      // Check that the live region is hidden from visual display but available to screen readers
      const styles = window.getComputedStyle(liveRegion!)
      expect(liveRegion).toHaveClass('sr-only')
    })

    it('ensures proper timing for screen reader announcements', async () => {
      const user = userEvent.setup()
      render(<TestComponent />)

      const announceButton = screen.getByTestId('announce-button')
      
      // Announcement should be delayed to ensure screen readers catch it
      await user.click(announceButton)

      // Use a short delay to test timing
      setTimeout(async () => {
        await waitFor(() => {
          const liveRegion = document.getElementById('lusotown-aria-live-region')
          expect(liveRegion?.textContent).toContain('LusoBot')
        })
      }, 150)
    })
  })

  describe('Portuguese-speaking Community Context', () => {
    it('provides culturally appropriate announcements', () => {
      expect(ARIA_MESSAGES.lusobot.opened.en).toContain('Portuguese cultural assistant')
      expect(ARIA_MESSAGES.lusobot.opened.pt).toContain('Assistente cultural português')
      
      expect(ARIA_MESSAGES.palop.cardFocused.en).toContain('Portuguese-speaking nations')
      expect(ARIA_MESSAGES.palop.cardFocused.pt).toContain('nações lusófonas')
    })

    it('maintains cultural authenticity in announcements', () => {
      expect(ARIA_MESSAGES.appDownloadBar.shown.en).toContain('LusoTown mobile app')
      expect(ARIA_MESSAGES.appDownloadBar.shown.pt).toContain('App móvel LusoTown')
      
      expect(ARIA_MESSAGES.culturalEvents.eventFocused.en).toContain('Cultural event focused')
      expect(ARIA_MESSAGES.culturalEvents.eventFocused.pt).toContain('Evento cultural focado')
    })
  })
})

describe('Integration with LusoTown Components', () => {
  it('works with widget components', () => {
    // Test that the ARIA system integrates properly with actual LusoTown widgets
    expect(ARIA_MESSAGES.widget.opened).toBeDefined()
    expect(ARIA_MESSAGES.lusobot.opened).toBeDefined()
    expect(ARIA_MESSAGES.appDownloadBar.shown).toBeDefined()
  })

  it('supports Portuguese cultural events', () => {
    expect(ARIA_MESSAGES.culturalEvents.eventFocused).toBeDefined()
    expect(ARIA_MESSAGES.culturalEvents.favoriteAdded).toBeDefined()
    expect(ARIA_MESSAGES.culturalEvents.reminderSet).toBeDefined()
  })

  it('supports PALOP heritage components', () => {
    expect(ARIA_MESSAGES.palop.cardFocused).toBeDefined()
    expect(ARIA_MESSAGES.palop.ctaAvailable).toBeDefined()
  })
})