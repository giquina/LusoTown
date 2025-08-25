/**
 * Portuguese-specific error messages for bilingual error handling
 * Maintains cultural context and user experience during errors
 */

import { ErrorType } from '@/lib/errorHandling'
import { PORTUGUESE_ERROR_CONTEXTS } from '@/config/error-monitoring'

export interface BilingualErrorMessage {
  en: string
  pt: string
}

export interface ErrorMessageConfig {
  userFriendly: BilingualErrorMessage
  technical: BilingualErrorMessage
  recovery: BilingualErrorMessage
}

// General error messages
export const GENERAL_ERROR_MESSAGES: Record<ErrorType, ErrorMessageConfig> = {
  [ErrorType.AUTHENTICATION]: {
    userFriendly: {
      en: 'Session expired. Please log in again.',
      pt: 'Sessão expirada. Por favor, faça login novamente.'
    },
    technical: {
      en: 'Authentication token is invalid or expired',
      pt: 'Token de autenticação inválido ou expirado'
    },
    recovery: {
      en: 'Redirecting to login page...',
      pt: 'Redirecionando para a página de login...'
    }
  },
  [ErrorType.AUTHORIZATION]: {
    userFriendly: {
      en: 'You don\'t have permission to access this feature.',
      pt: 'Não tem permissão para aceder a esta funcionalidade.'
    },
    technical: {
      en: 'User lacks required permissions for this resource',
      pt: 'Utilizador não tem as permissões necessárias para este recurso'
    },
    recovery: {
      en: 'Contact support if you believe this is an error.',
      pt: 'Contacte o suporte se acredita que isto é um erro.'
    }
  },
  [ErrorType.NETWORK]: {
    userFriendly: {
      en: 'Connection problem. Check your internet and try again.',
      pt: 'Problema de ligação. Verifique a sua internet e tente novamente.'
    },
    technical: {
      en: 'Network request failed or timed out',
      pt: 'Pedido de rede falhou ou excedeu o tempo limite'
    },
    recovery: {
      en: 'Retrying automatically...',
      pt: 'A tentar novamente automaticamente...'
    }
  },
  [ErrorType.VALIDATION]: {
    userFriendly: {
      en: 'Invalid data. Please check your information and try again.',
      pt: 'Dados inválidos. Verifique as suas informações e tente novamente.'
    },
    technical: {
      en: 'Input validation failed for one or more fields',
      pt: 'Validação de entrada falhou para um ou mais campos'
    },
    recovery: {
      en: 'Please correct the highlighted fields.',
      pt: 'Por favor, corrija os campos destacados.'
    }
  },
  [ErrorType.NOT_FOUND]: {
    userFriendly: {
      en: 'The requested resource could not be found.',
      pt: 'O recurso solicitado não foi encontrado.'
    },
    technical: {
      en: 'HTTP 404 - Resource not found',
      pt: 'HTTP 404 - Recurso não encontrado'
    },
    recovery: {
      en: 'Try going back or visiting our homepage.',
      pt: 'Tente voltar atrás ou visitar a nossa página inicial.'
    }
  },
  [ErrorType.SERVER_ERROR]: {
    userFriendly: {
      en: 'Server error. Please try again in a few moments.',
      pt: 'Erro do servidor. Tente novamente dentro de alguns momentos.'
    },
    technical: {
      en: 'Internal server error occurred',
      pt: 'Ocorreu um erro interno do servidor'
    },
    recovery: {
      en: 'Our team has been notified. Please try again later.',
      pt: 'A nossa equipa foi notificada. Tente novamente mais tarde.'
    }
  },
  [ErrorType.CLIENT_ERROR]: {
    userFriendly: {
      en: 'Request error. Please check the data and try again.',
      pt: 'Erro na solicitação. Verifique os dados e tente novamente.'
    },
    technical: {
      en: 'Client request error (4xx status code)',
      pt: 'Erro na solicitação do cliente (código de estado 4xx)'
    },
    recovery: {
      en: 'Please review your input and try again.',
      pt: 'Por favor, reveja a sua entrada e tente novamente.'
    }
  },
  [ErrorType.UNKNOWN]: {
    userFriendly: {
      en: 'An unexpected error occurred. Please try again.',
      pt: 'Ocorreu um erro inesperado. Tente novamente.'
    },
    technical: {
      en: 'Unhandled error with unknown cause',
      pt: 'Erro não tratado com causa desconhecida'
    },
    recovery: {
      en: 'If the problem persists, please contact support.',
      pt: 'Se o problema persistir, contacte o suporte.'
    }
  }
}

// Portuguese community-specific error messages
export const PORTUGUESE_FEATURE_ERROR_MESSAGES: Record<string, ErrorMessageConfig> = {
  [PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT]: {
    userFriendly: {
      en: 'Unable to load Portuguese cultural content. Please try again.',
      pt: 'Não foi possível carregar o conteúdo cultural português. Tente novamente.'
    },
    technical: {
      en: 'Portuguese cultural content API failed to respond',
      pt: 'API de conteúdo cultural português falhou em responder'
    },
    recovery: {
      en: 'Showing cached content while we fix this issue.',
      pt: 'A mostrar conteúdo em cache enquanto resolvemos esta questão.'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY]: {
    userFriendly: {
      en: 'Portuguese business directory is temporarily unavailable.',
      pt: 'O diretório de empresas portuguesas está temporariamente indisponível.'
    },
    technical: {
      en: 'Business directory PostGIS query failed or timed out',
      pt: 'Consulta PostGIS do diretório de empresas falhou ou excedeu o tempo'
    },
    recovery: {
      en: 'Try searching with different criteria or check back shortly.',
      pt: 'Tente pesquisar com critérios diferentes ou volte em breve.'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.LANGUAGE_SWITCHING]: {
    userFriendly: {
      en: 'Language switching is experiencing issues.',
      pt: 'A troca de idioma está com problemas.'
    },
    technical: {
      en: 'Bilingual language context failed to update',
      pt: 'Contexto de idioma bilingue falhou ao atualizar'
    },
    recovery: {
      en: 'Refreshing page to reset language settings...',
      pt: 'A atualizar página para repor configurações de idioma...'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.CHARACTER_ENCODING]: {
    userFriendly: {
      en: 'Portuguese characters are not displaying correctly.',
      pt: 'Os caracteres portugueses não estão a ser exibidos corretamente.'
    },
    technical: {
      en: 'UTF-8 character encoding issue detected with Portuguese diacritics',
      pt: 'Problema de codificação UTF-8 detectado com diacríticos portugueses'
    },
    recovery: {
      en: 'Refreshing the page may resolve this display issue.',
      pt: 'Atualizar a página pode resolver este problema de exibição.'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.CULTURAL_MATCHING]: {
    userFriendly: {
      en: 'Cultural matching feature is currently unavailable.',
      pt: 'A funcionalidade de correspondência cultural está indisponível.'
    },
    technical: {
      en: 'AI cultural matching algorithm timed out or failed',
      pt: 'Algoritmo de correspondência cultural IA expirou ou falhou'
    },
    recovery: {
      en: 'Please try again later or browse profiles manually.',
      pt: 'Tente novamente mais tarde ou navegue pelos perfis manualmente.'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.EVENT_BOOKING]: {
    userFriendly: {
      en: 'Unable to complete event booking. Please try again.',
      pt: 'Não foi possível completar a reserva do evento. Tente novamente.'
    },
    technical: {
      en: 'Lusophone event booking API transaction failed',
      pt: 'Transação da API de reserva de eventos lusófonos falhou'
    },
    recovery: {
      en: 'Your payment was not processed. You can safely try again.',
      pt: 'O seu pagamento não foi processado. Pode tentar novamente com segurança.'
    }
  },
  [PORTUGUESE_ERROR_CONTEXTS.UNIVERSITY_PARTNERSHIPS]: {
    userFriendly: {
      en: 'University partnership features are experiencing issues.',
      pt: 'As funcionalidades de parcerias universitárias estão com problemas.'
    },
    technical: {
      en: 'University integration API failed to authenticate or respond',
      pt: 'API de integração universitária falhou na autenticação ou resposta'
    },
    recovery: {
      en: 'Try accessing through your university portal directly.',
      pt: 'Tente aceder diretamente através do portal da sua universidade.'
    }
  }
}

// Mobile-specific error messages for Portuguese users
export const MOBILE_ERROR_MESSAGES = {
  OFFLINE: {
    userFriendly: {
      en: 'You\'re currently offline. Some features may not be available.',
      pt: 'Está atualmente offline. Algumas funcionalidades podem não estar disponíveis.'
    },
    technical: {
      en: 'Network connection lost - using cached content',
      pt: 'Ligação de rede perdida - usando conteúdo em cache'
    },
    recovery: {
      en: 'Connect to internet to access all Portuguese community features.',
      pt: 'Ligue-se à internet para aceder a todas as funcionalidades da comunidade portuguesa.'
    }
  },
  SLOW_CONNECTION: {
    userFriendly: {
      en: 'Slow connection detected. Loading essential content first.',
      pt: 'Ligação lenta detectada. A carregar primeiro o conteúdo essencial.'
    },
    technical: {
      en: 'Network speed below optimal threshold',
      pt: 'Velocidade da rede abaixo do limite ideal'
    },
    recovery: {
      en: 'Portuguese cultural content will load progressively.',
      pt: 'O conteúdo cultural português será carregado progressivamente.'
    }
  },
  TOUCH_TARGET_ERROR: {
    userFriendly: {
      en: 'Button tap not registered. Please try again.',
      pt: 'Toque no botão não foi registado. Tente novamente.'
    },
    technical: {
      en: 'Touch event handler failed or element too small',
      pt: 'Manipulador de evento de toque falhou ou elemento muito pequeno'
    },
    recovery: {
      en: 'Try tapping slightly higher or using landscape mode.',
      pt: 'Tente tocar um pouco mais acima ou usar modo paisagem.'
    }
  }
}

// Error message helper functions
export function getErrorMessage(
  errorType: ErrorType | string, 
  language: 'en' | 'pt' = 'en',
  messageType: 'userFriendly' | 'technical' | 'recovery' = 'userFriendly'
): string {
  // Check Portuguese-specific contexts first
  const portugalContext = PORTUGUESE_FEATURE_ERROR_MESSAGES[errorType]
  if (portugalContext) {
    return portugalContext[messageType][language]
  }

  // Check mobile-specific errors
  const mobileContext = (MOBILE_ERROR_MESSAGES as any)[errorType]
  if (mobileContext) {
    return mobileContext[messageType][language]
  }

  // Fall back to general error messages
  const generalError = GENERAL_ERROR_MESSAGES[errorType as ErrorType]
  if (generalError) {
    return generalError[messageType][language]
  }

  // Ultimate fallback
  const fallbackMessages = {
    userFriendly: {
      en: 'An unexpected error occurred. Please try again.',
      pt: 'Ocorreu um erro inesperado. Tente novamente.'
    },
    technical: {
      en: 'Unhandled error occurred',
      pt: 'Ocorreu um erro não tratado'
    },
    recovery: {
      en: 'Please refresh the page or contact support.',
      pt: 'Atualize a página ou contacte o suporte.'
    }
  }

  return fallbackMessages[messageType][language]
}

// Get contextual error messages with Portuguese cultural sensitivity
export function getContextualErrorMessage(
  error: any,
  context: {
    isPortugueseFeature?: boolean
    isMobile?: boolean
    language?: 'en' | 'pt'
    userAction?: string
  } = {}
): BilingualErrorMessage {
  const language = context.language || 'en'
  
  // Determine error type and context
  let errorType = ErrorType.UNKNOWN
  let errorContext = 'unknown'

  if (error?.type) {
    errorType = error.type
  } else if (error?.status) {
    if (error.status === 401) errorType = ErrorType.AUTHENTICATION
    else if (error.status === 403) errorType = ErrorType.AUTHORIZATION
    else if (error.status === 404) errorType = ErrorType.NOT_FOUND
    else if (error.status >= 500) errorType = ErrorType.SERVER_ERROR
    else if (error.status >= 400) errorType = ErrorType.CLIENT_ERROR
  } else if (error?.name === 'NetworkError' || error?.message?.includes('fetch')) {
    errorType = ErrorType.NETWORK
  }

  // Add Portuguese context if this is a Portuguese feature
  if (context.isPortugueseFeature) {
    errorContext = context.userAction || PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT
  }

  const userMessage = getErrorMessage(
    errorContext !== 'unknown' ? errorContext : errorType,
    language,
    'userFriendly'
  )

  const recoveryMessage = getErrorMessage(
    errorContext !== 'unknown' ? errorContext : errorType,
    language,
    'recovery'
  )

  return {
    en: context.language === 'pt' ? 
      getErrorMessage(errorContext !== 'unknown' ? errorContext : errorType, 'en', 'userFriendly') : 
      userMessage,
    pt: context.language === 'en' ? 
      getErrorMessage(errorContext !== 'unknown' ? errorContext : errorType, 'pt', 'userFriendly') : 
      userMessage
  }
}

export default {
  GENERAL_ERROR_MESSAGES,
  PORTUGUESE_FEATURE_ERROR_MESSAGES,
  MOBILE_ERROR_MESSAGES,
  getErrorMessage,
  getContextualErrorMessage
}
