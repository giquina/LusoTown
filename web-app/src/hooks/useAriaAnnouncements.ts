'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export interface AriaAnnouncementOptions {
  priority?: 'polite' | 'assertive'
  delay?: number
  clearOnUnmount?: boolean
  bilingual?: boolean
}

export interface BilingualMessage {
  en: string
  pt: string
}

/**
 * Custom hook for managing ARIA live region announcements
 * Supports bilingual announcements for Portuguese-speaking community
 */
export function useAriaAnnouncements() {
  const { language } = useLanguage()
  const liveRegionRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div')
      liveRegion.id = 'lusotown-aria-live-region'
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0,0,0,0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `
      document.body.appendChild(liveRegion)
      liveRegionRef.current = liveRegion
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const announce = (
    message: string | BilingualMessage,
    options: AriaAnnouncementOptions = {}
  ) => {
    const {
      priority = 'polite',
      delay = 100,
      bilingual = false
    } = options

    if (!liveRegionRef.current) return

    // Clear any pending announcements
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const liveRegion = liveRegionRef.current
    
    // Update live region priority if needed
    if (liveRegion.getAttribute('aria-live') !== priority) {
      liveRegion.setAttribute('aria-live', priority)
    }

    // Determine message text
    let messageText: string
    if (typeof message === 'string') {
      messageText = message
    } else {
      messageText = language === 'pt' ? message.pt : message.en
      // If bilingual is enabled, announce in both languages
      if (bilingual) {
        messageText = `${message.en}. ${message.pt}`
      }
    }

    timeoutRef.current = setTimeout(() => {
      if (liveRegion) {
        // Clear first to ensure announcement
        liveRegion.textContent = ''
        // Small delay to ensure screen readers register the change
        setTimeout(() => {
          liveRegion.textContent = messageText
        }, 50)
      }
    }, delay)
  }

  const announcePolite = (message: string | BilingualMessage, bilingual = false) => {
    announce(message, { priority: 'polite', bilingual })
  }

  const announceAssertive = (message: string | BilingualMessage, bilingual = false) => {
    announce(message, { priority: 'assertive', bilingual })
  }

  const clear = () => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ''
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return {
    announce,
    announcePolite,
    announceAssertive,
    clear
  }
}

/**
 * Pre-defined announcement messages for common widget states
 */
export const ARIA_MESSAGES = {
  widget: {
    opened: {
      en: 'Widget opened',
      pt: 'Widget aberto'
    },
    closed: {
      en: 'Widget closed',
      pt: 'Widget fechado'
    },
    minimized: {
      en: 'Widget minimized',
      pt: 'Widget minimizado'
    },
    maximized: {
      en: 'Widget maximized',
      pt: 'Widget maximizado'
    }
  },
  lusobot: {
    opened: {
      en: 'LusoBot chat assistant opened. Portuguese cultural assistant ready to help.',
      pt: 'Assistente de chat LusoBot aberto. Assistente cultural português pronto para ajudar.'
    },
    closed: {
      en: 'LusoBot chat assistant closed',
      pt: 'Assistente de chat LusoBot fechado'
    },
    minimized: {
      en: 'LusoBot chat minimized. Click to expand.',
      pt: 'Chat LusoBot minimizado. Clique para expandir.'
    },
    messageSent: {
      en: 'Message sent to LusoBot',
      pt: 'Mensagem enviada para LusoBot'
    },
    messageReceived: {
      en: 'New message from LusoBot received',
      pt: 'Nova mensagem do LusoBot recebida'
    }
  },
  appDownloadBar: {
    shown: {
      en: 'App download banner appeared. LusoTown mobile app is available.',
      pt: 'Banner de download da app apareceu. App móvel LusoTown está disponível.'
    },
    dismissed: {
      en: 'App download banner dismissed',
      pt: 'Banner de download da app dispensado'
    },
    downloadStarted: {
      en: 'App download started',
      pt: 'Download da app iniciado'
    }
  },
  culturalEvents: {
    eventFocused: {
      en: 'Cultural event focused. Press Enter to view details.',
      pt: 'Evento cultural focado. Prima Enter para ver detalhes.'
    },
    eventSelected: {
      en: 'Event selected. Details panel opened.',
      pt: 'Evento selecionado. Painel de detalhes aberto.'
    },
    favoriteAdded: {
      en: 'Event added to favorites',
      pt: 'Evento adicionado aos favoritos'
    },
    favoriteRemoved: {
      en: 'Event removed from favorites',
      pt: 'Evento removido dos favoritos'
    },
    reminderSet: {
      en: 'Reminder set for this event',
      pt: 'Lembrete definido para este evento'
    }
  },
  navigation: {
    menuOpened: {
      en: 'Navigation menu opened',
      pt: 'Menu de navegação aberto'
    },
    menuClosed: {
      en: 'Navigation menu closed',
      pt: 'Menu de navegação fechado'
    },
    pageChanged: {
      en: 'Page changed',
      pt: 'Página alterada'
    }
  },
  forms: {
    validationError: {
      en: 'Form has validation errors. Please check the highlighted fields.',
      pt: 'Formulário tem erros de validação. Verifique os campos destacados.'
    },
    submitted: {
      en: 'Form submitted successfully',
      pt: 'Formulário submetido com sucesso'
    },
    loading: {
      en: 'Form is being processed, please wait',
      pt: 'Formulário está sendo processado, aguarde'
    }
  },
  palop: {
    cardFocused: {
      en: 'PALOP heritage card focused. Explore Portuguese-speaking nations culture.',
      pt: 'Cartão de herança PALOP focado. Explore a cultura das nações lusófonas.'
    },
    ctaAvailable: {
      en: 'Call to action buttons available. Press Tab to navigate.',
      pt: 'Botões de chamada para ação disponíveis. Prima Tab para navegar.'
    }
  }
} as const