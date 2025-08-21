# Hardcoding Prevention Guide

This guide explains LusoTown's comprehensive hardcoding prevention system, including automated codemods, CI validation, and centralized configuration management.

## Overview

LusoTown enforces strict configurability for bilingual support, dynamic pricing, URL management, and content centralization. This system prevents hardcoded values that would break internationalization, maintainability, and scalability.

## Automated Codemods

### i18n Extraction Codemod

Automatically extracts hardcoded UI strings and replaces them with i18n lookups.

```bash
# Check for hardcoded strings (dry run)
npm run i18n-check

# Extract all hardcoded strings
npm run codemod:i18n

# Extract from specific directory/file
node ../scripts/codemods/extract-i18n.js --path=src/components/MyComponent.tsx
```

**Features:**
- Extracts JSX text content and attributes
- Generates semantic keys (e.g., `components.SafetyCenter.title`)
- Preserves existing t() calls
- Adds useLanguage imports automatically
- Creates backup files before modifications
- Updates both en.json and pt.json

### URL Replacement Codemod

Finds and replaces literal URLs with config constants.

```bash
# Check for hardcoded URLs (dry run)
npm run url-check

# Replace all hardcoded URLs
npm run codemod:urls

# Replace URLs in specific files
node ../scripts/codemods/replace-urls.js --path=src/lib/streaming.ts
```

**Features:**
- Detects HTTP/HTTPS, RTMP, WebSocket URLs
- Categorizes URLs (streaming, API, CDN, routes)
- Generates appropriate config constants
- Updates imports automatically
- Creates config files if missing

## Configuration Files

### Core Config Files

- `src/config/pricing.ts` - All pricing constants and formatters
- `src/config/routes.ts` - Application routes and navigation
- `src/config/brand.ts` - Brand assets, colors, contact info
- `src/config/streaming.ts` - Streaming server URLs and RTMP config
- `src/config/api.ts` - API endpoint constants
- `src/config/cdn.ts` - CDN and external URL constants

### Pricing Configuration

```typescript
import { formatPrice, SUBSCRIPTION_PLANS } from '@/config/pricing';

// ❌ Hardcoded
const price = "£19.99";

// ✅ Configured
const price = formatPrice(SUBSCRIPTION_PLANS.community.monthly);
```

### Route Configuration

```typescript
import { ROUTES } from '@/config/routes';

// ❌ Hardcoded
<Link href="/events">Events</Link>

// ✅ Configured
<Link href={ROUTES.events}>Events</Link>
```

### i18n Configuration

```typescript
import { useLanguage } from '@/context/LanguageContext';

// ❌ Hardcoded
<h1>Welcome to LusoTown</h1>

// ✅ i18n
const { t } = useLanguage();
<h1>{t('welcome.title')}</h1>
```

## Secret Detection

Enhanced secret pattern detection prevents hardcoded credentials:

```bash
# Run secret checker
npm run secret-check

# Run with strict mode (includes test files)
node scripts/secret-checker.js --strict
```

**Detects:**
- API keys and tokens
- Database URLs
- Private keys
- Passwords
- Stripe keys
- JWT secrets

## NPM Scripts

### Hardcoding Prevention Scripts

```bash
npm run i18n-check          # Check for hardcoded UI strings
npm run url-check           # Check for hardcoded URLs
npm run secret-check        # Check for hardcoded secrets
npm run hardcoding-prevention  # Run all checks
```

### Codemod Scripts

```bash
npm run codemod:i18n        # Extract i18n strings
npm run codemod:urls        # Replace hardcoded URLs
```

### Legacy Scripts

```bash
npm run audit:hardcoding    # Legacy hardcoding audit
npm run audit:monthly       # Monthly compliance check
```

## CI Validation

The `i18n-codemod.yml` GitHub workflow validates hardcoding prevention on every PR:

1. **i18n Validation** - Fails if hardcoded strings detected
2. **URL Validation** - Fails if hardcoded URLs detected  
3. **ESLint Check** - Runs hardcoding prevention rules
4. **Secret Check** - Scans for potential secrets

### Workflow Triggers

- Changes to `.tsx`, `.jsx`, `.ts`, `.js` files
- Changes to i18n files
- Pull request validation

## ESLint Rules

Configured in `.eslintrc.json`:

```json
{
  "rules": {
    "react/jsx-no-literals": ["error", {
      "noStrings": true,
      "allowedStrings": ["/", "className", "key", "id"]
    }],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value*='https://']",
        "message": "🚨 Hardcoded URL detected! Use config/cdn.ts instead."
      },
      {
        "selector": "Literal[value*='£']",
        "message": "🚨 Hardcoded price detected! Use formatPrice() instead."
      }
    ]
  }
}
```

## Development Workflow

### Before Code Changes

```bash
# Check current hardcoding status
npm run hardcoding-prevention
```

### After Code Changes

```bash
# Run codemods if needed
npm run codemod:i18n
npm run codemod:urls

# Update Portuguese translations
# Edit src/i18n/pt.json to replace [PT] placeholders

# Validate changes
npm run lint
npm run hardcoding-prevention
```

### During PR Review

1. CI validates no new hardcoding violations
2. Review generated i18n keys for clarity
3. Verify Portuguese translations are complete
4. Check config constants are properly used

## Best Practices

### Never Hardcode

- ❌ UI text strings
- ❌ Routes and URLs  
- ❌ API keys and credentials
- ❌ Prices and currencies
- ❌ Brand information
- ❌ Feature flags

### Always Use

- ✅ `t('key')` for all UI text
- ✅ `ROUTES.page` for navigation
- ✅ `formatPrice()` for pricing
- ✅ `process.env.VAR` for secrets
- ✅ Config constants for URLs
- ✅ Brand config for assets

### Translation Keys

Use semantic, hierarchical keys:

```typescript
// ✅ Good
t('components.SafetyCenter.title')
t('pages.pricing.community_plan')
t('common.loading')

// ❌ Avoid
t('title1')
t('string_123')
t('portuguese_text')
```

## Troubleshooting

### Common Issues

**"Hardcoded strings detected in CI"**
```bash
# Run extraction locally
npm run codemod:i18n
git add .
git commit -m "Extract hardcoded strings to i18n"
```

**"Missing Portuguese translations"**
```bash
# Edit src/i18n/pt.json
# Replace [PT] prefixes with actual Portuguese translations
```

**"ESLint jsx-no-literals errors"**
```bash
# Extract strings with codemod
npm run codemod:i18n

# Or add to allowedStrings for technical values
```

**"False positive secret detection"**
```bash
# Add pattern to SAFE_PATTERNS in scripts/secret-checker.js
# Or use environment variables for actual secrets
```

### Manual Override

For legitimate hardcoded values (rare), add ESLint disable:

```typescript
// eslint-disable-next-line react/jsx-no-literals
<div className="fixed-technical-string">
```

## Migration Notes

### Database Updates

After pricing changes, update database defaults:

```sql
-- Update subscription plan prices
UPDATE subscription_plans 
SET monthly_price = 19.99 
WHERE plan_id = 'community';

-- Update transport pricing
UPDATE transport_rates 
SET base_rate = 45.00 
WHERE service_type = 'luxury';
```

### Environment Variables

Update `.env.local` with new config constants:

```env
# Streaming URLs
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://localhost:1935

# CDN URLs  
NEXT_PUBLIC_CLOUDINARY_URL=https://res.cloudinary.com
```

## Maintenance

### Monthly Review

```bash
# Run comprehensive audit
npm run audit:monthly

# Check for new hardcoding patterns
npm run hardcoding-prevention

# Update documentation if needed
```

### Quarterly Updates

1. Review and update config constants
2. Audit translation completeness
3. Update ESLint rules if needed
4. Review secret detection patterns