# LusoTown Streaming Platform - API Documentation

## Overview

This document provides comprehensive API documentation for LusoTown's streaming platform, including Portuguese cultural features, creator monetization, and real-time chat functionality.

**Base URL:** `https://api.lusotown.com/v1`  
**Authentication:** JWT Bearer tokens  
**Rate Limiting:** 1000 requests/hour per authenticated user  
**Response Format:** JSON with Portuguese/English bilingual support  

---

## 🔐 Authentication

### Auth Endpoints

#### `POST /auth/creator-login`
Creator-specific authentication with streaming permissions.

**Request:**
```json
{
  "email": "creator@example.com",
  "password": "securePassword",
  "creator_mode": true,
  "language": "pt" // or "en"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "creator@example.com",
    "is_creator": true,
    "creator_tier": "partner", // affiliate, partner, elite
    "portuguese_verified": true,
    "cultural_regions": ["portugal", "diaspora"]
  },
  "streaming_permissions": {
    "can_stream": true,
    "can_monetize": true,
    "max_concurrent_streams": 3,
    "rtmp_endpoint": "rtmp://stream.lusotown.com/live",
    "stream_key": "encrypted_stream_key"
  }
}
```

#### `POST /auth/refresh-stream-token`
Refresh streaming credentials for active sessions.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "success": true,
  "new_stream_key": "refreshed_encrypted_key",
  "expires_at": "2025-08-19T12:00:00Z",
  "rtmp_endpoint": "rtmp://stream.lusotown.com/live"
}
```

---

## 📺 Streaming Management

### Stream Creation

#### `POST /streaming/create`
Create a new streaming session with Portuguese cultural context.

**Request:**
```json
{
  "title": {
    "pt": "Workshop de Negócios Lusófonos",
    "en": "Lusophone Business Workshop"
  },
  "description": {
    "pt": "Como criar negócios digitais na diáspora portuguesa",
    "en": "How to create digital businesses in the Portuguese diaspora"
  },
  "category_id": "business_workshops",
  "cultural_tags": ["business", "diaspora", "entrepreneurship"],
  "target_regions": ["portugal", "brazil", "diaspora"],
  "access_level": "premium", // public, registered, premium
  "scheduled_start": "2025-08-20T15:00:00Z",
  "expected_duration_minutes": 90,
  "max_viewers": 500,
  "portuguese_content_percentage": 85,
  "enable_portuguese_emotes": true,
  "enable_multi_region_moderation": true
}
```

**Response:**
```json
{
  "success": true,
  "stream": {
    "id": "stream_uuid",
    "rtmp_url": "rtmp://stream.lusotown.com/live/encrypted_key",
    "stream_key": "encrypted_stream_key",
    "playback_urls": {
      "hls": "https://cdn.lusotown.com/hls/stream_uuid/index.m3u8",
      "webrtc": "wss://webrtc.lusotown.com/stream_uuid",
      "youtube_backup": "https://youtube.com/watch?v=backup_id"
    },
    "chat_room_id": "chat_room_uuid",
    "portuguese_emotes_enabled": true,
    "moderation_settings": {
      "auto_moderation": true,
      "portuguese_toxicity_detection": true,
      "cultural_sensitivity_filter": true,
      "regional_moderators": ["portugal", "brazil"]
    }
  },
  "monetization": {
    "donations_enabled": true,
    "subscriptions_enabled": true,
    "virtual_gifts_enabled": true,
    "lusocoins_rate": 0.01,
    "revenue_share": 0.80 // 80% creator, 20% platform
  }
}
```

### Stream Status Management

#### `PUT /streaming/{stream_id}/status`
Update stream status (live, ended, paused).

**Request:**
```json
{
  "status": "live", // live, ended, paused, scheduled
  "viewer_count": 125,
  "portuguese_viewers_percentage": 78,
  "peak_viewers": 145,
  "engagement_metrics": {
    "chat_messages_per_minute": 12,
    "portuguese_emotes_used": 45,
    "donations_received": 8,
    "new_subscribers": 3
  }
}
```

#### `GET /streaming/{stream_id}`
Retrieve detailed stream information.

**Response:**
```json
{
  "success": true,
  "stream": {
    "id": "stream_uuid",
    "title": {
      "pt": "Workshop de Negócios Lusófonos",
      "en": "Lusophone Business Workshop"
    },
    "creator": {
      "id": "creator_uuid",
      "username": "joao_entrepreneur",
      "display_name": "João Silva",
      "portuguese_verified": true,
      "origin_country": "portugal",
      "subscriber_count": 2150
    },
    "status": "live",
    "started_at": "2025-08-20T15:00:00Z",
    "current_viewers": 125,
    "peak_viewers": 145,
    "total_viewers": 230,
    "chat_activity": {
      "messages_count": 1080,
      "portuguese_percentage": 82,
      "top_emotes": [":saudade:", ":festa:", ":futebol:"],
      "active_users": 95
    },
    "monetization_stats": {
      "donations_total": "€45.50",
      "lusocoins_received": 4550,
      "new_subscribers": 8,
      "revenue_today": "€67.30"
    }
  }
}
```

---

## 💰 Creator Monetization

### Revenue Tracking

#### `GET /creator/revenue`
Comprehensive revenue analytics for Portuguese creators.

**Query Parameters:**
- `period`: day, week, month, year
- `currency`: EUR, GBP, BRL
- `region`: portugal, brazil, africa, diaspora

**Response:**
```json
{
  "success": true,
  "revenue_summary": {
    "total_revenue": {
      "eur": 1250.75,
      "gbp": 1089.50,
      "brl": 6753.20
    },
    "revenue_sources": {
      "subscriptions": {
        "amount": 750.00,
        "percentage": 60,
        "subscriber_breakdown": {
          "portugal": 145,
          "brazil": 320,
          "diaspora": 85,
          "other": 45
        }
      },
      "donations": {
        "amount": 320.50,
        "percentage": 25.6,
        "top_donors_regions": ["brazil", "portugal", "diaspora"]
      },
      "virtual_gifts": {
        "amount": 180.25,
        "percentage": 14.4,
        "lusocoins_total": 18025,
        "popular_gifts": ["festa", "coracao", "saudade"]
      }
    }
  },
  "performance_metrics": {
    "average_revenue_per_viewer": 2.15,
    "portuguese_audience_percentage": 84,
    "cultural_content_bonus": 125.00,
    "partner_tier_bonus": 85.50
  }
}
```

#### `POST /creator/payout-request`
Request payout with multi-currency support.

**Request:**
```json
{
  "amount": 500.00,
  "currency": "EUR",
  "payment_method": "bank_transfer", // bank_transfer, pix, mb_way, paypal
  "account_details": {
    "iban": "PT50XXXXXXXXXXXXXXXXX",
    "swift": "BPIPMXXX",
    "account_holder": "João Silva",
    "tax_id": "123456789"
  },
  "region": "portugal"
}
```

### Virtual Economy

#### `GET /economy/lusocoins/rates`
Current LusoCoins exchange rates and gift catalog.

**Response:**
```json
{
  "success": true,
  "exchange_rates": {
    "lusocoins_to_eur": 0.01,
    "lusocoins_to_gbp": 0.0087,
    "lusocoins_to_brl": 0.054
  },
  "virtual_gifts": {
    "cultural_gifts": [
      {
        "id": "saudade_heart",
        "name": {
          "pt": "Coração de Saudade",
          "en": "Saudade Heart"
        },
        "cost_lusocoins": 100,
        "cultural_context": "Expresses deep Portuguese longing",
        "regions": ["portugal", "brazil", "diaspora"],
        "rarity": "common"
      },
      {
        "id": "golden_bacalhau",
        "name": {
          "pt": "Bacalhau Dourado",
          "en": "Golden Codfish"
        },
        "cost_lusocoins": 500,
        "cultural_context": "Premium gift honoring Portuguese cuisine",
        "regions": ["portugal"],
        "rarity": "rare"
      }
    ]
  }
}
```

---

## 💬 Portuguese Chat System

### Real-time Chat

#### `WebSocket: wss://chat.lusotown.com/stream/{stream_id}`
Real-time chat with Portuguese cultural features.

**Connection:**
```javascript
const socket = new WebSocket('wss://chat.lusotown.com/stream/stream_uuid');

socket.onopen = function(event) {
  // Authenticate
  socket.send(JSON.stringify({
    action: 'authenticate',
    token: 'jwt_token',
    language: 'pt',
    region: 'portugal'
  }));
};
```

**Send Message:**
```json
{
  "action": "send_message",
  "message": "Que bela apresentação! :saudade:",
  "contains_emotes": [":saudade:"],
  "user_region": "portugal",
  "is_subscriber": true
}
```

**Receive Message:**
```json
{
  "type": "message",
  "id": "msg_uuid",
  "user": {
    "id": "user_uuid",
    "username": "maria_lisboa",
    "display_name": "Maria Santos",
    "region": "portugal",
    "is_subscriber": true,
    "is_moderator": false,
    "badges": ["portuguese_verified", "long_time_supporter"]
  },
  "message": "Que bela apresentação! :saudade:",
  "emotes": [
    {
      "code": ":saudade:",
      "url": "https://emotes.lusotown.com/saudade.png",
      "cultural_context": "Portuguese expression of longing"
    }
  ],
  "timestamp": "2025-08-20T15:30:45Z",
  "moderation_score": 0.95 // AI confidence in message appropriateness
}
```

#### `POST /chat/{stream_id}/moderate`
Moderate chat messages with Portuguese cultural sensitivity.

**Request:**
```json
{
  "message_id": "msg_uuid",
  "action": "warn", // warn, timeout, ban
  "reason": "inappropriate_cultural_reference",
  "duration_minutes": 10,
  "moderator_note": "Insensitive comment about regional differences"
}
```

### Portuguese Emotes System

#### `GET /emotes/cultural`
Retrieve Portuguese cultural emotes catalog.

**Query Parameters:**
- `region`: portugal, brazil, africa, diaspora
- `category`: cultural, emotional, celebratory, traditional

**Response:**
```json
{
  "success": true,
  "emotes": {
    "portugal": [
      {
        "code": ":pastelnata:",
        "name": {
          "pt": "Pastel de Nata",
          "en": "Portuguese Custard Tart"
        },
        "url": "https://emotes.lusotown.com/pt/pastelnata.png",
        "cultural_meaning": "Traditional Portuguese pastry, symbol of heritage",
        "usage_context": "Food discussions, cultural pride",
        "creator_required_tier": "affiliate"
      }
    ],
    "brazil": [
      {
        "code": ":acai:",
        "name": {
          "pt": "Açaí",
          "en": "Acai Bowl"
        },
        "url": "https://emotes.lusotown.com/br/acai.png",
        "cultural_meaning": "Popular Brazilian superfruit",
        "usage_context": "Health, fitness, Brazilian culture",
        "creator_required_tier": "affiliate"
      }
    ],
    "universal": [
      {
        "code": ":saudade:",
        "name": {
          "pt": "Saudade",
          "en": "Portuguese Longing"
        },
        "url": "https://emotes.lusotown.com/universal/saudade.png",
        "cultural_meaning": "Uniquely Portuguese emotion of deep longing",
        "usage_context": "Missing home, nostalgia, deep emotion",
        "creator_required_tier": "public"
      }
    ]
  }
}
```

---

## 📊 Analytics & Insights

### Portuguese Community Analytics

#### `GET /analytics/cultural-insights`
Analytics focused on Portuguese community engagement.

**Response:**
```json
{
  "success": true,
  "cultural_analytics": {
    "audience_demographics": {
      "by_region": {
        "portugal": {
          "percentage": 28,
          "avg_watch_time_minutes": 24.5,
          "peak_viewing_hours": ["20:00-22:00 WET"],
          "preferred_content": ["fado", "business", "cultural_heritage"]
        },
        "brazil": {
          "percentage": 45,
          "avg_watch_time_minutes": 18.2,
          "peak_viewing_hours": ["19:00-21:00 BRT"],
          "preferred_content": ["samba", "entrepreneurship", "festivals"]
        },
        "diaspora": {
          "percentage": 22,
          "avg_watch_time_minutes": 26.8,
          "peak_viewing_hours": ["18:00-20:00 GMT"],
          "preferred_content": ["nostalgia", "connection", "business_networking"]
        },
        "other": {
          "percentage": 5,
          "avg_watch_time_minutes": 15.3
        }
      }
    },
    "cultural_engagement": {
      "portuguese_emotes_usage": {
        "total_uses": 15420,
        "top_emotes": [
          {":saudade:": 3240},
          {":festa:": 2180},
          {":futebol:": 1950},
          {":fado:": 1420}
        ],
        "regional_preferences": {
          "portugal": [":pastelnata:", ":fado:", ":azulejo:"],
          "brazil": [":caipirinha:", ":samba:", ":acai:"],
          "diaspora": [":saudade:", ":coracao:", ":tradicao:"]
        }
      },
      "cultural_events_engagement": {
        "santos_populares_2025": {
          "viewer_increase": "150%",
          "engagement_rate": "85%",
          "new_subscribers": 245
        },
        "festa_junina_streams": {
          "total_viewers": 12500,
          "peak_concurrent": 890,
          "revenue_increase": "200%"
        }
      }
    }
  }
}
```

#### `GET /analytics/creator/{creator_id}/portuguese-metrics`
Creator-specific Portuguese community metrics.

**Response:**
```json
{
  "success": true,
  "portuguese_metrics": {
    "cultural_authenticity_score": 0.89,
    "language_distribution": {
      "portuguese": 82,
      "english": 15,
      "mixed": 3
    },
    "cultural_content_breakdown": {
      "traditional_music": 25,
      "business_education": 35,
      "heritage_stories": 20,
      "community_events": 20
    },
    "community_impact": {
      "portuguese_followers_growth": 15.2,
      "cultural_event_attendance": 78,
      "cross_regional_connections": 156,
      "heritage_preservation_contributions": 12
    },
    "monetization_effectiveness": {
      "portuguese_audience_conversion": 0.28,
      "cultural_gift_preference": {
        "traditional_gifts": 65,
        "modern_gifts": 35
      },
      "subscription_retention_by_region": {
        "portugal": 0.85,
        "brazil": 0.78,
        "diaspora": 0.91
      }
    }
  }
}
```

---

## 🎭 Cultural Content Management

### Cultural Categories

#### `GET /content/categories/cultural`
Portuguese cultural content categories.

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "id": "portuguese_cultural",
      "names": {
        "pt": "Conteúdo Cultural Português",
        "en": "Portuguese Cultural Content"
      },
      "description": {
        "pt": "Música tradicional, fado, festivais e patrimônio cultural",
        "en": "Traditional music, fado, festivals and cultural heritage"
      },
      "access_level": "public",
      "cultural_focus": 95,
      "subcategories": [
        "fado_music",
        "traditional_cooking",
        "heritage_stories",
        "festivals_celebrations"
      ]
    },
    {
      "id": "lusophone_business",
      "names": {
        "pt": "Negócios Lusófonos",
        "en": "Lusophone Business"
      },
      "description": {
        "pt": "Empreendedorismo e desenvolvimento de negócios para a comunidade portuguesa",
        "en": "Entrepreneurship and business development for the Portuguese community"
      },
      "access_level": "premium",
      "cultural_focus": 75,
      "subcategories": [
        "startup_workshops",
        "digital_marketing",
        "investment_strategies",
        "networking_events"
      ]
    }
  ]
}
```

### Cultural Event Integration

#### `POST /cultural/events/integrate`
Integrate cultural events with streaming schedule.

**Request:**
```json
{
  "event_type": "santos_populares",
  "date": "2025-06-24",
  "regions": ["portugal", "diaspora"],
  "suggested_content": [
    {
      "title": {
        "pt": "Noite de Santo António - Ao Vivo",
        "en": "Saint Anthony's Night - Live"
      },
      "content_type": "live_celebration",
      "duration_hours": 4,
      "expected_viewers": 2500
    }
  ],
  "promotional_emotes": [":santo_antonio:", ":sardinha:", ":manjerico:"],
  "special_features": {
    "collaborative_playlist": true,
    "virtual_altar": true,
    "traditional_recipes_sharing": true
  }
}
```

---

## 🔒 Moderation & Safety

### Portuguese Content Moderation

#### `POST /moderation/analyze-portuguese`
AI-powered Portuguese content analysis.

**Request:**
```json
{
  "content": "Esse criador é muito chato, não gosto dele!",
  "content_type": "chat_message", // chat_message, stream_title, description
  "user_region": "brazil",
  "context": {
    "stream_category": "cultural",
    "is_live": true,
    "audience_age_range": "adult"
  }
}
```

**Response:**
```json
{
  "success": true,
  "moderation_result": {
    "toxicity_score": 0.65,
    "cultural_sensitivity_score": 0.40,
    "recommended_action": "warn",
    "detected_issues": [
      {
        "type": "mild_negativity",
        "confidence": 0.78,
        "cultural_context": "Brazilian informal criticism"
      }
    ],
    "suggested_response": {
      "pt": "Lembramos que devemos manter respeito na comunidade lusófona.",
      "en": "We remind everyone to maintain respect in the Portuguese community."
    }
  }
}
```

#### `GET /moderation/regional-moderators`
List of regional moderators for Portuguese communities.

**Response:**
```json
{
  "success": true,
  "moderators": {
    "portugal": [
      {
        "id": "mod_uuid_pt",
        "username": "moderador_lisboa",
        "languages": ["portuguese", "english"],
        "specialties": ["cultural_heritage", "traditional_music"],
        "timezone": "WET",
        "active_hours": "14:00-22:00"
      }
    ],
    "brazil": [
      {
        "id": "mod_uuid_br",
        "username": "moderador_sao_paulo",
        "languages": ["portuguese"],
        "specialties": ["business_content", "entertainment"],
        "timezone": "BRT",
        "active_hours": "18:00-02:00"
      }
    ],
    "diaspora": [
      {
        "id": "mod_uuid_diaspora",
        "username": "moderador_london",
        "languages": ["portuguese", "english"],
        "specialties": ["integration", "community_support"],
        "timezone": "GMT",
        "active_hours": "17:00-01:00"
      }
    ]
  }
}
```

---

## 📱 Mobile Integration

### Mobile Streaming

#### `GET /mobile/streaming-config`
Mobile-optimized streaming configuration.

**Response:**
```json
{
  "success": true,
  "mobile_config": {
    "optimized_bitrates": {
      "4g": 2500,
      "wifi": 4000,
      "low_data": 1200
    },
    "portuguese_ui_elements": {
      "go_live_button": {
        "pt": "Transmitir Ao Vivo",
        "en": "Go Live"
      },
      "viewer_count": {
        "pt": "espectadores",
        "en": "viewers"
      }
    },
    "cultural_quick_actions": [
      {
        "action": "add_portuguese_emote",
        "icon": "🇵🇹",
        "label": {
          "pt": "Emote Português",
          "en": "Portuguese Emote"
        }
      },
      {
        "action": "cultural_tag_selector",
        "icon": "🎭",
        "label": {
          "pt": "Tags Culturais",
          "en": "Cultural Tags"
        }
      }
    ]
  }
}
```

---

## 🌍 Multi-Region Support

### Regional Preferences

#### `GET /regions/preferences/{region}`
Region-specific preferences and configurations.

**Path Parameters:**
- `region`: portugal, brazil, angola, mozambique, cape_verde, guinea_bissau, sao_tome, east_timor, diaspora

**Response for Portugal:**
```json
{
  "success": true,
  "region": "portugal",
  "preferences": {
    "default_language": "pt",
    "timezone": "WET",
    "currency": "EUR",
    "peak_hours": ["20:00-22:00"],
    "popular_content_types": [
      "fado_music",
      "traditional_cooking",
      "business_workshops",
      "heritage_preservation"
    ],
    "cultural_celebrations": [
      {
        "name": "Santos Populares",
        "date": "2025-06-24",
        "streaming_boost_expected": 2.5
      },
      {
        "name": "Festa das Vindimas",
        "date": "2025-09-15",
        "streaming_boost_expected": 1.8
      }
    ],
    "preferred_emotes": [
      ":pastelnata:",
      ":fado:",
      ":azulejo:",
      ":vinho_porto:"
    ],
    "payment_preferences": [
      "mb_way",
      "bank_transfer",
      "paypal"
    ]
  }
}
```

---

## 🚨 Error Handling

### Common Error Responses

#### Authentication Errors
```json
{
  "success": false,
  "error": {
    "code": "CREATOR_NOT_VERIFIED",
    "message": {
      "pt": "Conta de criador não verificada. Complete a verificação cultural.",
      "en": "Creator account not verified. Please complete cultural verification."
    },
    "details": {
      "verification_url": "/creator/verify",
      "required_documents": ["cultural_connection_proof", "identity_document"]
    }
  }
}
```

#### Streaming Errors
```json
{
  "success": false,
  "error": {
    "code": "STREAM_LIMIT_EXCEEDED",
    "message": {
      "pt": "Limite de streams simultâneas excedido para o seu tier.",
      "en": "Concurrent stream limit exceeded for your tier."
    },
    "details": {
      "current_streams": 3,
      "tier_limit": 3,
      "upgrade_url": "/creator/upgrade"
    }
  }
}
```

#### Cultural Content Errors
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PORTUGUESE_CONTENT",
    "message": {
      "pt": "Percentagem de conteúdo português insuficiente para monetização.",
      "en": "Insufficient Portuguese content percentage for monetization."
    },
    "details": {
      "current_percentage": 45,
      "required_percentage": 60,
      "improvement_suggestions": [
        "Add more Portuguese cultural elements",
        "Include traditional music",
        "Discuss heritage topics"
      ]
    }
  }
}
```

---

## 📋 Rate Limiting

### API Rate Limits

| Endpoint Category | Rate Limit | Reset Period | 
|-------------------|------------|--------------|
| Authentication | 10/minute | 60 seconds |
| Streaming Management | 100/hour | 1 hour |
| Chat Messages | 30/minute | 60 seconds |
| Analytics | 500/hour | 1 hour |
| Cultural Content | 200/hour | 1 hour |

### Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1629825600
X-RateLimit-Category: streaming_management
```

---

## 🔧 SDKs and Integration

### JavaScript SDK Example

```javascript
import LusoTownStreaming from '@lusotown/streaming-sdk';

const client = new LusoTownStreaming({
  apiKey: 'your_api_key',
  language: 'pt',
  region: 'portugal'
});

// Create Portuguese cultural stream
const stream = await client.createStream({
  title: {
    pt: 'Aula de Fado Tradicional',
    en: 'Traditional Fado Lesson'
  },
  category: 'portuguese_cultural',
  culturalTags: ['fado', 'music', 'heritage'],
  enablePortugueseEmotes: true
});

// Monitor Portuguese community engagement
client.onPortugueseEmote((emote) => {
  console.log(`Portuguese emote used: ${emote.code} by ${emote.region}`);
});
```

### Python SDK Example

```python
from lusotown_streaming import LusoTownClient

client = LusoTownClient(
    api_key="your_api_key",
    language="pt",
    region="brazil"
)

# Analyze Portuguese content
result = client.moderate_portuguese_content(
    content="Que bela transmissão!",
    context="chat_message",
    user_region="brazil"
)

print(f"Cultural sensitivity score: {result.cultural_score}")
```

---

## 📞 Support & Contact

### Technical Support
- **Email:** developers@lusotown.com
- **Discord:** LusoTown Developers Community
- **Documentation:** https://docs.lusotown.com
- **Status Page:** https://status.lusotown.com

### Portuguese Community Support
- **Email:** comunidade@lusotown.com
- **WhatsApp:** +44 7XXX XXXXXX
- **Telegram:** @LusoTownPortugues

### Business Partnerships
- **Email:** partnerships@lusotown.com
- **LinkedIn:** /company/lusotown
- **Cultural Consultancy:** cultura@lusotown.com

---

**API Version:** v1.0  
**Last Updated:** August 18, 2025  
**Languages:** Portuguese (PT), Portuguese (BR), English (UK)

*© 2025 LusoTown. All rights reserved. | Todos os direitos reservados.*