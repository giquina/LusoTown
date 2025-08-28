import { NextResponse } from 'next/server';
import logger from '@/utils/logger';

export interface PortugueseApiError {
  code: string;
  message: {
    en: string;
    pt: string;
  };
  details?: any;
  statusCode: number;
}

export const PORTUGUESE_API_ERRORS: Record<string, PortugueseApiError> = {
  // Authentication Errors
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: {
      en: 'Authentication required to access this resource',
      pt: 'Autenticação necessária para aceder a este recurso'
    },
    statusCode: 401
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: {
      en: 'You do not have permission to access this resource',
      pt: 'Não tem permissão para aceder a este recurso'
    },
    statusCode: 403
  },
  COMMUNITY_GUIDELINES_REQUIRED: {
    code: 'COMMUNITY_GUIDELINES_REQUIRED',
    message: {
      en: 'You must accept community guidelines to use this feature',
      pt: 'Deve aceitar as diretrizes da comunidade para usar esta funcionalidade'
    },
    statusCode: 403
  },

  // Event Errors
  EVENT_NOT_FOUND: {
    code: 'EVENT_NOT_FOUND',
    message: {
      en: 'Portuguese cultural event not found',
      pt: 'Evento cultural português não encontrado'
    },
    statusCode: 404
  },
  EVENT_FULLY_BOOKED: {
    code: 'EVENT_FULLY_BOOKED',
    message: {
      en: 'This event is fully booked',
      pt: 'Este evento está completamente reservado'
    },
    statusCode: 400
  },
  BOOKING_DEADLINE_PASSED: {
    code: 'BOOKING_DEADLINE_PASSED',
    message: {
      en: 'The booking deadline for this event has passed',
      pt: 'O prazo de reserva para este evento já passou'
    },
    statusCode: 400
  },
  ALREADY_BOOKED: {
    code: 'ALREADY_BOOKED',
    message: {
      en: 'You have already booked this event',
      pt: 'Já reservou este evento'
    },
    statusCode: 400
  },

  // Business Directory Errors
  BUSINESS_NOT_FOUND: {
    code: 'BUSINESS_NOT_FOUND',
    message: {
      en: 'Portuguese business not found',
      pt: 'Negócio português não encontrado'
    },
    statusCode: 404
  },
  INVALID_LOCATION: {
    code: 'INVALID_LOCATION',
    message: {
      en: 'Invalid location coordinates provided',
      pt: 'Coordenadas de localização inválidas fornecidas'
    },
    statusCode: 400
  },

  // Matching Errors
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: {
      en: 'User not found in Portuguese-speaking community',
      pt: 'Utilizador não encontrado na comunidade de língua portuguesa'
    },
    statusCode: 404
  },
  CONNECTION_EXISTS: {
    code: 'CONNECTION_EXISTS',
    message: {
      en: 'You already have a connection with this community member',
      pt: 'Já tem uma ligação com este membro da comunidade'
    },
    statusCode: 400
  },
  PROFILE_PRIVATE: {
    code: 'PROFILE_PRIVATE',
    message: {
      en: 'This user is not accepting new connections',
      pt: 'Este utilizador não está a aceitar novas ligações'
    },
    statusCode: 403
  },

  // Transport Errors
  TRANSPORT_SERVICE_NOT_FOUND: {
    code: 'TRANSPORT_SERVICE_NOT_FOUND',
    message: {
      en: 'Transport service not available',
      pt: 'Serviço de transporte não disponível'
    },
    statusCode: 404
  },
  INVALID_ROUTE: {
    code: 'INVALID_ROUTE',
    message: {
      en: 'Invalid transport route specified',
      pt: 'Rota de transporte inválida especificada'
    },
    statusCode: 400
  },
  CANNOT_CANCEL_TRANSPORT: {
    code: 'CANNOT_CANCEL_TRANSPORT',
    message: {
      en: 'Cannot cancel transport request at this time',
      pt: 'Não é possível cancelar pedido de transporte neste momento'
    },
    statusCode: 400
  },

  // Streaming Errors
  STREAMING_NOT_PERMITTED: {
    code: 'STREAMING_NOT_PERMITTED',
    message: {
      en: 'You are not permitted to stream cultural content',
      pt: 'Não tem permissão para transmitir conteúdo cultural'
    },
    statusCode: 403
  },
  STREAM_NOT_FOUND: {
    code: 'STREAM_NOT_FOUND',
    message: {
      en: 'Portuguese cultural stream not found',
      pt: 'Transmissão cultural portuguesa não encontrada'
    },
    statusCode: 404
  },

  // Community Errors
  COMMUNITY_REPORT_FAILED: {
    code: 'COMMUNITY_REPORT_FAILED',
    message: {
      en: 'Failed to submit community safety report',
      pt: 'Falha ao enviar relatório de segurança da comunidade'
    },
    statusCode: 500
  },
  VOLUNTEER_REGISTRATION_FAILED: {
    code: 'VOLUNTEER_REGISTRATION_FAILED',
    message: {
      en: 'Failed to register volunteer interest',
      pt: 'Falha ao registar interesse de voluntário'
    },
    statusCode: 500
  },

  // General Errors
  VALIDATION_FAILED: {
    code: 'VALIDATION_FAILED',
    message: {
      en: 'Request validation failed',
      pt: 'Validação do pedido falhada'
    },
    statusCode: 400
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: {
      en: 'Too many requests. Please try again later',
      pt: 'Muitos pedidos. Tente novamente mais tarde'
    },
    statusCode: 429
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: {
      en: 'An internal error occurred. Our team has been notified',
      pt: 'Ocorreu um erro interno. A nossa equipa foi notificada'
    },
    statusCode: 500
  },
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    message: {
      en: 'Service temporarily unavailable. Please try again later',
      pt: 'Serviço temporariamente indisponível. Tente novamente mais tarde'
    },
    statusCode: 503
  }
};

export class PortugueseApiErrorHandler {
  static createError(
    errorCode: keyof typeof PORTUGUESE_API_ERRORS,
    language: 'en' | 'pt' = 'en',
    details?: any
  ): NextResponse {
    const error = PORTUGUESE_API_ERRORS[errorCode];
    
    if (!error) {
      return this.createError('INTERNAL_SERVER_ERROR', language);
    }

    const response = {
      success: false,
      error: {
        code: error.code,
        message: error.message[language],
        details: details || undefined
      },
      culturalContext: 'portuguese-speaking-community',
      supportInfo: {
        en: 'Contact support at support@lusotown.com',
        pt: 'Contacte o apoio em support@lusotown.com'
      }[language]
    };

    logger.error('Portuguese API Error', {
      code: error.code,
      language,
      details,
      statusCode: error.statusCode
    });

    return NextResponse.json(response, { status: error.statusCode });
  }

  static handleDatabaseError(error: any, language: 'en' | 'pt' = 'en'): NextResponse {
    logger.error('Database error in Portuguese API', error, {
      area: 'database',
      culturalContext: 'portuguese'
    });

    // Map common database errors to user-friendly messages
    if (error.code === '23505') { // Unique constraint violation
      return this.createError('VALIDATION_FAILED', language, {
        reason: language === 'pt' ? 'Dados duplicados' : 'Duplicate data'
      });
    }

    if (error.code === '23503') { // Foreign key constraint violation
      return this.createError('VALIDATION_FAILED', language, {
        reason: language === 'pt' ? 'Referência inválida' : 'Invalid reference'
      });
    }

    return this.createError('INTERNAL_SERVER_ERROR', language);
  }

  static handleAuthError(error: any, language: 'en' | 'pt' = 'en'): NextResponse {
    if (error.message?.includes('not authorized')) {
      return this.createError('FORBIDDEN', language);
    }

    if (error.message?.includes('JWT')) {
      return this.createError('UNAUTHORIZED', language);
    }

    return this.createError('UNAUTHORIZED', language);
  }

  static validateRequiredFields(
    data: any,
    requiredFields: string[],
    language: 'en' | 'pt' = 'en'
  ): NextResponse | null {
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      const fieldNames = language === 'pt' ? 'campos' : 'fields';
      const missing = language === 'pt' ? 'em falta' : 'missing';
      
      return this.createError('VALIDATION_FAILED', language, {
        missingFields,
        message: `${fieldNames} ${missing}: ${missingFields.join(', ')}`
      });
    }

    return null;
  }

  static getUserLanguage(request: Request): 'en' | 'pt' {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const url = new URL(request.url);
    const langParam = url.searchParams.get('lang');

    // Priority: URL parameter -> Accept-Language header -> default to Portuguese
    if (langParam === 'en' || langParam === 'pt') {
      return langParam;
    }

    if (acceptLanguage.includes('pt')) {
      return 'pt';
    }

    if (acceptLanguage.includes('en')) {
      return 'en';
    }

    return 'pt'; // Default to Portuguese for community
  }
}

// Middleware wrapper for consistent error handling
export function withPortugueseErrorHandling(
  handler: (request: Request, ...args: any[]) => Promise<NextResponse>
) {
  return async (request: Request, ...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error: any) {
      const language = PortugueseApiErrorHandler.getUserLanguage(request);

      // Handle specific error types
      if (error.code?.startsWith('PG')) {
        return PortugueseApiErrorHandler.handleDatabaseError(error, language);
      }

      if (error.message?.includes('auth') || error.message?.includes('JWT')) {
        return PortugueseApiErrorHandler.handleAuthError(error, language);
      }

      // Log unexpected errors
      logger.error('Unexpected API error', error, {
        area: 'api',
        culturalContext: 'portuguese',
        url: request.url
      });

      return PortugueseApiErrorHandler.createError('INTERNAL_SERVER_ERROR', language);
    }
  };
}