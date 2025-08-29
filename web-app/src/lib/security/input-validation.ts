import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

// Lusophone-specific validation patterns
export const PORTUGUESE_PATTERNS = {
  // Portuguese postal codes: 1234-123
  portugalPostalCode: /^\d{4}-\d{3}$/,
  
  // Brazilian postal codes: 12345-678
  brazilPostalCode: /^\d{5}-\d{3}$/,
  
  // UK postal codes for Portuguese community
  ukPostalCode: /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i,

  // Portuguese phone numbers: +351 123 456 789
  portugalPhone: /^\+351\s?\d{3}\s?\d{3}\s?\d{3}$/,
  
  // Brazilian phone numbers: +55 (11) 12345-6789
  brazilPhone: /^\+55\s?\(\d{2}\)\s?\d{4,5}-\d{4}$/,
  
  // UK phone numbers for Portuguese community: +44 20 1234 5678
  ukPhone: /^\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4}$/,
  
  // General international phone for Portuguese speakers
  internationalPhone: /^\+\d{1,3}\s?[\d\s\-\(\)]{7,15}$/,

  // Portuguese NIF (tax number): 123456789
  nif: /^\d{9}$/,
  
  // Brazilian CPF: 123.456.789-01
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  
  // UK National Insurance for Portuguese residents: AB123456C
  ukNationalInsurance: /^[A-Z]{2}\d{6}[A-Z]$/,

  // Portuguese names (allows all Portuguese characters including ã, ç, õ, etc.)
  name: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ\s'-]{1,100}$/,
  
  // Portuguese business names (more flexible for cultural businesses)
  businessName: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ\s\d.,!?()':;\-@#$%&+=\[\]{}|\\\/]{1,200}$/,

  // Portuguese cultural text content with enhanced character support
  culturalText: /^(?!.*(<script|javascript:|vbscript:|data:text\/html|<iframe|<object))[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ\s\d.,!?()'":;\-@#$%&+=\[\]{}|\\\/\n\r\t]{1,5000}$/i,
  
  // Enhanced Portuguese address pattern
  address: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ\s\d.,\-\/]{5,200}$/,
  
  // Portuguese cultural keywords and tags
  culturalKeyword: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ\s\-]{1,50}$/,
  
  // Portuguese email pattern (allows cultural domains)
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // URL pattern for Portuguese websites
  url: /^https?:\/\/(www\.)?[a-zA-Z0-9]([a-zA-ZÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-ZÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ0-9]([a-zA-ZÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ0-9\-]{0,61}[a-zA-ZÀ-ÖØ-öø-ÿĀ-žÇçÃãÕõÑñ0-9])?)*(\/.*)?$/i,
};

// Security validation schemas using Zod
export const ValidationSchemas = {
  // User profile validation
  userProfile: z.object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name too long")
      .regex(PORTUGUESE_PATTERNS.name, "Invalid characters in name"),

    lastName: z
      .string()
      .max(50, "Last name too long")
      .regex(PORTUGUESE_PATTERNS.name, "Invalid characters in name")
      .optional(),

    email: z
      .string()
      .email("Invalid email format")
      .max(255, "Email too long")
      .transform((email) => email.toLowerCase().trim()),

    bio: z
      .string()
      .max(500, "Bio too long")
      .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in bio")
      .optional(),

    location: z
      .string()
      .max(100, "Location too long")
      .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid location format")
      .optional(),

    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
      .refine((date) => {
        const birthDate = new Date(date);
        const now = new Date();
        const age = now.getFullYear() - birthDate.getFullYear();
        return age >= 16 && age <= 120;
      }, "Invalid age range"),
  }),

  // Message validation
  message: z.object({
    content: z
      .string()
      .min(1, "Message cannot be empty")
      .max(1000, "Message too long")
      .transform((content) => sanitizeText(content))
      .refine((content) => content.length >= 1, "Message cannot be empty after sanitization"),

    messageType: z.enum(["text", "image", "file"]).default("text"),

    conversationId: z.string().uuid("Invalid conversation ID"),

    receiverId: z.string().uuid("Invalid receiver ID"),
  }),

  // Cultural preferences validation
  culturalPreferences: z.object({
    origins: z
      .array(
        z.enum([
          "portugal",
          "brazil",
          "angola",
          "mozambique",
          "cape_verde",
          "guinea_bissau",
          "sao_tome_principe",
          "east_timor",
          "macau",
        ])
      )
      .min(1, "Select at least one origin"),

    languagePreference: z.enum(["portuguese", "english", "both"]),

    culturalCelebrations: z.array(z.string().max(50)).max(10),

    professionalGoals: z.array(z.string().max(100)).max(5),

    culturalValues: z.record(z.number().min(1).max(5)),

    lifestylePreferences: z.array(z.string().max(50)).max(10),
  }),

  // Event creation validation with Portuguese cultural celebration support
  eventCreation: z
    .object({
      title: z
        .string()
        .min(5, "Title too short")
        .max(100, "Title too long")
        .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in title")
        .transform((title) => sanitizeText(title)),

      titlePortuguese: z
        .string()
        .max(100, "Portuguese title too long")
        .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in Portuguese title")
        .transform((title) => sanitizeText(title))
        .optional(),

      description: z
        .string()
        .min(10, "Description too short")
        .max(2000, "Description too long")
        .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in description")
        .transform((desc) => sanitizeText(desc)),

      descriptionPortuguese: z
        .string()
        .max(2000, "Portuguese description too long")
        .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in Portuguese description")
        .transform((desc) => sanitizeText(desc))
        .optional(),

      eventType: z.enum(["online", "in_person", "hybrid"]),

      culturalCategory: z
        .enum([
          'festival', 'cultural_celebration', 'religious_celebration', 'food_wine',
          'music_concert', 'dance_event', 'art_exhibition', 'language_exchange',
          'business_networking', 'educational', 'sports', 'family_event',
          'community_gathering', 'charity_fundraiser', 'academic', 'other'
        ])
        .optional(),

      portugueseCelebration: z
        .enum([
          'festa_de_sao_joao', 'festa_de_santo_antonio', 'festa_de_sao_pedro',
          'festa_dos_tabuleiros', 'carnaval', 'festa_da_flor', 'festa_do_avante',
          'festa_das_vindimas', 'natal', 'pascoa', 'dia_de_portugal',
          'dia_da_independencia_brasil', 'dia_da_consciencia_negra',
          'festa_junina', 'festa_de_iemanja', 'festa_do_divino', 'other', 'none'
        ])
        .default('none')
        .optional(),

      location: z
        .string()
        .max(200, "Location too long")
        .regex(PORTUGUESE_PATTERNS.address, "Invalid characters in location")
        .transform((loc) => sanitizeText(loc))
        .optional(),

      virtualLink: z
        .string()
        .regex(PORTUGUESE_PATTERNS.url, "Invalid URL format")
        .optional(),

      startDatetime: z
        .string()
        .datetime("Invalid datetime format")
        .refine(
          (date) => new Date(date) > new Date(),
          "Event must be in the future"
        ),

      endDatetime: z.string().datetime("Invalid datetime format"),

      maxAttendees: z
        .number()
        .min(1, "At least 1 attendee required")
        .max(1000, "Too many attendees")
        .optional(),

      price: z
        .number()
        .min(0, "Price cannot be negative")
        .max(1000, "Price too high"),

      currency: z
        .enum(['GBP', 'EUR', 'USD'])
        .default('GBP'),

      tags: z
        .array(
          z.string()
            .max(30, "Tag too long")
            .regex(PORTUGUESE_PATTERNS.culturalKeyword, "Invalid tag format")
        )
        .max(10, "Too many tags")
        .transform((tags) => tags.map(tag => sanitizeText(tag)))
        .optional(),

      ageRestriction: z
        .object({
          minimumAge: z.number().min(0).max(100).optional(),
          maximumAge: z.number().min(0).max(100).optional(),
        })
        .refine((data) => {
          if (data.minimumAge && data.maximumAge) {
            return data.minimumAge <= data.maximumAge;
          }
          return true;
        }, "Minimum age must be less than or equal to maximum age")
        .optional(),

      accessibility: z
        .object({
          wheelchairAccessible: z.boolean().default(false),
          hearingLoop: z.boolean().default(false),
          signLanguage: z.boolean().default(false),
          portugueseTranslation: z.boolean().default(false),
          brailleProgram: z.boolean().default(false),
        })
        .optional(),

      organizerContact: z
        .object({
          name: z.string().min(2).max(100).regex(PORTUGUESE_PATTERNS.name),
          email: z.string().email().regex(PORTUGUESE_PATTERNS.email),
          phone: z
            .string()
            .refine((phone) => {
              return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
                     PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
                     PORTUGUESE_PATTERNS.brazilPhone.test(phone) ||
                     PORTUGUESE_PATTERNS.internationalPhone.test(phone);
            }, "Invalid organizer phone number")
            .optional(),
        }),

      requiresApproval: z.boolean().default(false),

      gdprConsent: z
        .boolean()
        .refine((consent) => consent === true, "GDPR consent required for event creation"),

      culturalAuthenticityVerified: z.boolean().default(false),
    })
    .refine(
      (data) => new Date(data.endDatetime) > new Date(data.startDatetime),
      "End time must be after start time"
    )
    .refine(
      (data) => {
        // If it's a cultural celebration, require Portuguese title
        if (data.culturalCategory === 'cultural_celebration' && data.portugueseCelebration !== 'none') {
          return data.titlePortuguese && data.titlePortuguese.length > 0;
        }
        return true;
      },
      "Portuguese title required for cultural celebrations"
    ),

  // Business directory validation with Portuguese-specific rules
  businessSubmission: z.object({
    name: z
      .string()
      .min(2, "Business name too short")
      .max(100, "Business name too long")
      .regex(PORTUGUESE_PATTERNS.businessName, "Invalid characters in business name")
      .transform((name) => sanitizeText(name)),

    namePortuguese: z
      .string()
      .max(100, "Portuguese name too long")
      .regex(PORTUGUESE_PATTERNS.businessName, "Invalid characters in Portuguese name")
      .transform((name) => sanitizeText(name))
      .optional(),

    description: z
      .string()
      .min(10, "Description too short")
      .max(1000, "Description too long")
      .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in description")
      .transform((desc) => sanitizeText(desc))
      .refine((desc) => desc.length >= 5, "Description too short after sanitization"),

    descriptionPortuguese: z
      .string()
      .max(1000, "Portuguese description too long")
      .regex(PORTUGUESE_PATTERNS.culturalText, "Invalid characters in Portuguese description")
      .transform((desc) => sanitizeText(desc))
      .optional(),

    address: z
      .string()
      .min(5, "Address too short")
      .max(200, "Address too long")
      .regex(PORTUGUESE_PATTERNS.address, "Invalid characters in address")
      .transform((addr) => sanitizeText(addr)),

    postcode: z
      .string()
      .regex(PORTUGUESE_PATTERNS.ukPostalCode, "Invalid UK postcode format")
      .transform((pc) => pc.toUpperCase().trim()),

    phone: z
      .string()
      .refine((phone) => {
        return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
               PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
               PORTUGUESE_PATTERNS.brazilPhone.test(phone) ||
               PORTUGUESE_PATTERNS.internationalPhone.test(phone);
      }, "Invalid phone number format for Portuguese business")
      .transform((phone) => sanitizeText(phone)),

    email: z
      .string()
      .email("Invalid email format")
      .max(255, "Email too long")
      .regex(PORTUGUESE_PATTERNS.email, "Invalid email format for Portuguese business")
      .transform((email) => email.toLowerCase().trim()),

    website: z
      .string()
      .regex(PORTUGUESE_PATTERNS.url, "Invalid website URL format")
      .max(255, "Website URL too long")
      .transform((url) => sanitizeText(url))
      .optional(),

    ownerName: z
      .string()
      .min(2, "Owner name too short")
      .max(100, "Owner name too long")
      .regex(PORTUGUESE_PATTERNS.name, "Invalid characters in owner name")
      .transform((name) => sanitizeText(name)),

    yearEstablished: z
      .number()
      .min(1800, "Year too early")
      .max(new Date().getFullYear(), "Year cannot be in the future"),

    businessCategory: z
      .enum([
        'restaurant', 'cafe', 'grocery', 'bakery', 'clothing', 'services',
        'healthcare', 'education', 'entertainment', 'professional_services',
        'cultural_center', 'religious_organization', 'sports_recreation',
        'travel_tourism', 'media_communication', 'other'
      ], { errorMap: () => ({ message: "Invalid business category" }) }),

    culturalSpecialties: z
      .array(
        z.enum([
          'fado_music', 'traditional_food', 'bacalhau_specialties', 'pastéis_de_nata',
          'portuguese_wine', 'azulejo_tiles', 'handicrafts', 'cultural_events',
          'language_classes', 'dance_lessons', 'kizomba', 'portuguese_books',
          'religious_services', 'traditional_celebrations', 'other'
        ])
      )
      .max(5, "Too many cultural specialties")
      .optional(),

    keywords: z
      .array(
        z.string()
          .max(30, "Keyword too long")
          .regex(PORTUGUESE_PATTERNS.culturalKeyword, "Invalid keyword format")
      )
      .max(10, "Too many keywords")
      .transform((keywords) => keywords.map(k => sanitizeText(k))),

    operatingHours: z
      .object({
        monday: z.string().optional(),
        tuesday: z.string().optional(),
        wednesday: z.string().optional(),
        thursday: z.string().optional(),
        friday: z.string().optional(),
        saturday: z.string().optional(),
        sunday: z.string().optional(),
      })
      .optional(),

    socialMedia: z
      .object({
        facebook: z.string().regex(PORTUGUESE_PATTERNS.url, "Invalid Facebook URL").optional(),
        instagram: z.string().regex(PORTUGUESE_PATTERNS.url, "Invalid Instagram URL").optional(),
        twitter: z.string().regex(PORTUGUESE_PATTERNS.url, "Invalid Twitter URL").optional(),
        whatsapp: z.string().regex(PORTUGUESE_PATTERNS.internationalPhone, "Invalid WhatsApp number").optional(),
      })
      .optional(),

    verificationDocuments: z
      .array(
        z.object({
          type: z.enum(['business_license', 'vat_registration', 'insurance', 'other']),
          documentId: z.string().max(100),
          isVerified: z.boolean().default(false),
        })
      )
      .max(5, "Too many verification documents")
      .optional(),

    gdprConsent: z
      .boolean()
      .refine((consent) => consent === true, "GDPR consent required for Portuguese business directory"),

    marketingConsent: z
      .boolean()
      .optional(),
  }),

  // File upload validation
  fileUpload: z.object({
    file: z.object({
      name: z
        .string()
        .max(255, "Filename too long")
        .regex(/^[A-Za-z0-9\s\-_\.\(\)]+$/, "Invalid filename characters")
        .transform((name) => sanitizeText(name)),
      size: z.number().max(5 * 1024 * 1024, "File too large (max 5MB)"),
      type: z.enum(
        [
          "image/jpeg",
          "image/jpg", 
          "image/png",
          "image/webp",
          "application/pdf",
          "text/plain",
        ],
        { errorMap: () => ({ message: "Invalid file type" }) }
      ),
    }),
  }),

  // Search filters validation
  searchFilters: z.object({
    query: z
      .string()
      .max(100, "Search query too long")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.-]{0,100}$/,
        "Invalid search characters"
      )
      .optional(),

    ageRange: z
      .object({
        min: z.number().min(16).max(100),
        max: z.number().min(16).max(100),
      })
      .refine((data) => data.min <= data.max, "Invalid age range")
      .optional(),

    location: z.array(z.string().max(50)).max(5).optional(),

    interests: z.array(z.string().max(30)).max(10).optional(),

    membershipTier: z.enum(["free", "core", "premium"]).optional(),

    limit: z.number().min(1).max(100).default(20),
  }),
};

// Enhanced text sanitization functions for Portuguese community
export function sanitizeText(text: string): string {
  // Always use server-side sanitization for consistent behavior
  // DOMPurify will be used in React components via useSafeHTML hook

  // Server-side sanitization with enhanced Portuguese support
  // First decode HTML entities to catch encoded XSS attempts
  let cleaned = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#47;/g, "/");
  
  // Now sanitize the decoded content
  cleaned = cleaned
    .replace(/<[^>]*>/g, "") // Remove HTML tags after decoding
    .replace(/javascript\s*:/gi, "") // Remove javascript: protocols
    .replace(/vbscript\s*:/gi, "") // Remove vbscript: protocols  
    .replace(/data\s*:\s*(?!image\/(png|jpg|jpeg|gif|webp))/gi, "") // Only allow safe data: URLs
    .replace(/&#x[0-9a-fA-F]+;?/g, "") // Remove remaining hex entities
    .replace(/&#\d+;?/g, "") // Remove remaining numeric entities
    .replace(/&[a-zA-Z]+;/g, "") // Remove remaining named entities
    .replace(/alert\s*\(/gi, "blocked()") // Neutralize alert calls completely
    .replace(/eval\s*\(/gi, "blocked()") // Neutralize eval calls completely
    .replace(/document\./gi, "blocked.") // Neutralize document access completely
    .replace(/alert/gi, "blocked") // Remove any remaining alert references completely
    .trim();

  // Preserve safe data URLs before encoding
  const dataUrlPattern = /data:image\/(png|jpg|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+/g;
  const safeDataUrls: string[] = [];
  let match;
  let safeContent = cleaned;
  
  // Extract and temporarily replace safe data URLs
  while ((match = dataUrlPattern.exec(cleaned)) !== null) {
    const placeholder = `SAFE_DATA_URL_${safeDataUrls.length}`;
    safeDataUrls.push(match[0]);
    safeContent = safeContent.replace(match[0], placeholder);
  }

  // HTML encode remaining content
  let encoded = safeContent
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
    // Don't encode slashes to preserve safe URLs
    
  // Restore safe data URLs
  safeDataUrls.forEach((url, index) => {
    encoded = encoded.replace(`SAFE_DATA_URL_${index}`, url);
  });
  
  return encoded;
}

export function sanitizeHTML(html: string, allowedTags: string[] = []): string {
  if (typeof window !== "undefined") {
    // Enhanced DOMPurify configuration for Portuguese content
    return DOMPurify.sanitize(html, { 
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: ['href', 'target', 'title', 'alt', 'src'],
      FORBID_CONTENTS: ['script', 'style', 'form'],
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
      FORBID_ATTR: [
        'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur',
        'onchange', 'onsubmit', 'onreset', 'onselect', 'onabort', 'onunload'
      ],
      // Sanitize URLs to prevent XSS via href/src attributes
      SANITIZE_NAMED_PROPS: true,
      // Keep Portuguese characters intact
      KEEP_CONTENT: true
    });
  }

  // Server-side: strip all HTML if no DOMPurify available
  return sanitizeText(html);
}

// Safe HTML rendering utility specifically for Portuguese cultural content
export function sanitizePortugueseCulturalContent(html: string): string {
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: ['title'],
      FORBID_CONTENTS: ['script', 'style', 'form'],
      KEEP_CONTENT: true,
      // Additional protection for Portuguese community content
      ADD_TAGS: [], // Don't allow any additional tags
      ADD_ATTR: [], // Don't allow any additional attributes
      // Remove any potentially dangerous protocols
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });
  }

  return sanitizeText(html);
}

// Lusophone-specific content validation
export function validatePortugueseContent(content: string): {
  isValid: boolean;
  issues: string[];
  sanitizedContent: string;
} {
  const issues: string[] = [];
  let sanitizedContent = sanitizeText(content);

  // Check for potentially harmful Lusophone phrases
  const suspiciousPatterns = [
    /golpe|fraude|esquema/i, // Scam/fraud
    /dados\s+pessoais/i, // Personal data harvesting
    /transferir\s+dinheiro/i, // Money transfer scams
  ];

  const hasSuspiciousContent = suspiciousPatterns.some((pattern) =>
    pattern.test(content)
  );

  if (hasSuspiciousContent) {
    issues.push("Content may contain suspicious patterns");
  }

  // Validate cultural sensitivity
  if (!PORTUGUESE_PATTERNS.culturalText.test(content)) {
    issues.push("Content contains invalid characters");
  }

  return {
    isValid: issues.length === 0,
    issues,
    sanitizedContent,
  };
}

// Rate limiting validation
export function validateRateLimit(
  identifier: string,
  action: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  // This would integrate with your rate limiting store
  // For now, return a basic implementation
  return {
    allowed: true,
    remaining: maxAttempts - 1,
    resetTime: Date.now() + windowMs,
  };
}

// CSRF token validation
export function generateCSRFToken(): string {
  if (typeof crypto !== "undefined") {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // Fallback for environments without crypto
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function validateCSRFToken(
  token: string,
  sessionToken: string
): boolean {
  return token === sessionToken && token.length >= 32;
}

// SQL injection prevention helpers
export function escapeString(str: string): string {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return `\\${char}`;
      default:
        return char;
    }
  });
}

// Password validation for Lusophone users
export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 0;

  if (password.length < 8) {
    issues.push("Password must be at least 8 characters long");
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    issues.push("Password must contain lowercase letters");
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    issues.push("Password must contain uppercase letters");
  } else {
    score += 1;
  }

  if (!/\d/.test(password)) {
    issues.push("Password must contain numbers");
  } else {
    score += 1;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password)) {
    issues.push("Password must contain special characters");
  } else {
    score += 1;
  }

  // Check for common Lusophone passwords
  const commonPortuguesePasswords = [
    "portugal",
    "lisboa",
    "porto",
    "benfica",
    "sporting",
    "futebol",
    "saudade",
    "fado",
    "bacalhau",
    "azulejo",
  ];

  if (
    commonPortuguesePasswords.some((common) =>
      password.toLowerCase().includes(common)
    )
  ) {
    issues.push("Password contains common Lusophone words");
    score = Math.max(0, score - 2);
  }

  return {
    isValid: issues.length === 0 && score >= 4,
    score: Math.min(5, score),
    issues,
  };
}

// Export validation functions for API routes
export const validateInput = {
  userProfile: (data: unknown) => ValidationSchemas.userProfile.parse(data),
  message: (data: unknown) => ValidationSchemas.message.parse(data),
  culturalPreferences: (data: unknown) =>
    ValidationSchemas.culturalPreferences.parse(data),
  eventCreation: (data: unknown) => ValidationSchemas.eventCreation.parse(data),
  businessSubmission: (data: unknown) => ValidationSchemas.businessSubmission.parse(data),
  fileUpload: (data: unknown) => ValidationSchemas.fileUpload.parse(data),
  searchFilters: (data: unknown) => ValidationSchemas.searchFilters.parse(data),
};

// Error handling for validation
export class ValidationError extends Error {
  public issues: string[];

  constructor(message: string, issues: string[] = []) {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
  }
}
