# LusoTown Codemod & i18n Workflow Guide

This document describes the automated codemod tools and i18n workflow for maintaining hardcoding-free code in the LusoTown platform.

## 📋 Quick Reference

```bash
# Check for hardcoding violations
npm run i18n-check

# Extract hardcoded strings to i18n
npm run codemod:i18n

# Replace hardcoded URLs with config constants  
npm run codemod:urls

# Run security audit
npm run audit:hardcoding
```

## 🛠️ Available Codemods

### 1. i18n String Extraction (`extract-i18n.js`)

Automatically extracts hardcoded strings from JSX/TSX files and replaces them with `t('key')` function calls.

**Usage:**
```bash
# Dry run (safe - shows what would change)
npm run codemod:i18n:dry

# Apply changes
npm run codemod:i18n

# Extract from critical components only
npm run i18n-extract-critical

# Test single component
node scripts/codemods/extract-i18n.js --about-only
```

**Features:**
- Smart filtering excludes CSS classes, imports, technical strings
- Generates semantic translation keys (`components.SafetyCenter.title`)
- Handles object properties correctly (`title: t('key')` not `title: {t('key')}`)
- Preserves existing `t()` calls to avoid nesting
- Auto-adds `useLanguage` import and hook
- Creates both English and Portuguese translation placeholders

**Example Output:**
```typescript
// Before
const features = [
  { title: "Discover Events", description: "Find Portuguese cultural events" }
]

// After  
const features = [
  { title: t('components.about.discover_events_cta'), description: t('components.about.find_portuguese_events_desc') }
]
```

### 2. URL Constants Replacement (`replace-urls.js`)

Replaces hardcoded URLs with configuration constants from `@/config`.

**Usage:**
```bash
# Dry run
npm run codemod:urls:dry

# Apply changes
npm run codemod:urls
```

**Replaces:**
- `"https://images.unsplash.com/photo-123"` → `buildUnsplashUrl('123')`
- `"/events"` → `ROUTES.events`
- `"rtmp://localhost:1935"` → `STREAMING_URLS.rtmp.local`
- Social media URLs → `SOCIAL_URLS.twitter.profile`

**Auto-adds imports:**
```typescript
import { ROUTES, buildUnsplashUrl, STREAMING_URLS } from '@/config';
```

## 📝 Translation Workflow

### Adding New Strings

1. **Write code with hardcoded strings** (development phase):
   ```tsx
   <h1>Welcome to LusoTown</h1>
   <p>Find Portuguese speakers in London</p>
   ```

2. **Run extraction codemod**:
   ```bash
   npm run codemod:i18n
   ```

3. **Review generated translations**:
   ```json
   // src/i18n/en.json
   {
     "components.welcome.title": "Welcome to LusoTown",
     "components.welcome.description": "Find Portuguese speakers in London"
   }
   
   // src/i18n/pt.json  
   {
     "components.welcome.title": "[PT] Welcome to LusoTown",
     "components.welcome.description": "[PT] Find Portuguese speakers in London"
   }
   ```

4. **Update Portuguese translations**:
   ```json
   // src/i18n/pt.json
   {
     "components.welcome.title": "Bem-vindos ao LusoTown",
     "components.welcome.description": "Encontre falantes de português em Londres"
   }
   ```

### Translation Key Naming Convention

- **Pages**: `pages.{pageName}.{element}_{type}`
- **Components**: `components.{componentName}.{element}_{type}`
- **Common**: `common.{category}.{element}_{type}`

**Type suffixes:**
- `_title` - Headings and titles
- `_description` - Longer descriptive text
- `_cta` - Call-to-action buttons
- `_label` - Short labels
- `_question` - Questions (contains `?`)
- `_exclamation` - Exclamations (contains `!`)

## 🔒 Security & Hardcoding Audit

### Monthly Audit Process

```bash
# Run comprehensive audit
npm run audit:monthly

# View detailed report
cat ./audits/hardcoding-audit-YYYY-MM-DD.json
```

**Violation Categories:**
- **CRITICAL**: API keys, secrets, passwords
- **HIGH**: Hardcoded URLs, prices, user-facing text  
- **MEDIUM**: Routes, colors, analytics events
- **LOW**: Console.log statements

### Secret Detection Patterns

The audit script detects:
```javascript
// ❌ CRITICAL - Secrets
const apiKey = "sk_live_abc123";
const password = "mypassword123";

// ❌ HIGH - Hardcoded values
const price = "£19.99";
const url = "https://api.example.com";

// ❌ MEDIUM - Should use constants
const route = "/events";
const color = "#FF5733";
```

**Exceptions** (allowed):
- `.env.example` files
- Documentation examples
- Test fixtures

## 🚀 CI/CD Integration

### GitHub Actions Workflow

The `i18n-codemod.yml` workflow runs on every PR and checks:

1. **i18n Compliance**: No new hardcoded strings
2. **URL Compliance**: No hardcoded URLs  
3. **Translation Consistency**: EN/PT key parity
4. **Secret Detection**: No committed secrets
5. **Syntax Validation**: Valid JSON in translation files

**Workflow Triggers:**
- Pull requests to `main` or `develop`
- Changes in `web-app/src/**/*.{ts,tsx,js,jsx}`
- Changes in `web-app/src/i18n/**/*.json`
- Changes in `web-app/src/config/**/*.ts`

### Local Pre-commit Hook

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/sh
cd web-app
npm run i18n-check
if [ $? -ne 0 ]; then
  echo "❌ Hardcoding violations found. Run codemods before committing."
  exit 1
fi
```

## 🐛 Troubleshooting

### Common Issues

**1. Codemod Breaks Syntax**
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Restore from git if needed
git checkout -- src/components/BrokenComponent.tsx
```

**2. Translation Keys Conflict**
```bash
# Manual key resolution in translation files
# Update duplicate keys with more specific names
```

**3. Missing Config Imports**
```bash
# Re-run URL codemod to fix imports
npm run codemod:urls
```

**4. CI Workflow Fails**
```bash
# Run checks locally
npm run i18n-check
npm run audit:hardcoding

# Fix violations then commit
npm run codemod:i18n
npm run codemod:urls
```

### Manual Overrides

**Skip extraction for specific strings:**
```typescript
// Use /* i18n-ignore */ comment
const technicalString = "className"; /* i18n-ignore */
```

**Complex translation scenarios:**
```typescript
// For interpolation and complex logic
const message = t('welcome.message', { 
  name: user.name, 
  count: events.length 
});
```

## 📊 Monitoring & Metrics

### Audit Reports

Located in `./audits/hardcoding-audit-YYYY-MM-DD.json`:

```json
{
  "summary": {
    "totalViolations": 45,
    "byCategory": {
      "hardcoded_text": 30,
      "hardcoded_urls": 10,
      "hardcoded_prices": 5
    },
    "bySeverity": {
      "critical": 0,
      "high": 35,
      "medium": 10,
      "low": 0
    },
    "filesAffected": 12,
    "recommendations": [
      "🚨 CRITICAL: Implement bilingual system with t() function",
      "🔧 Create config/cdn.ts for URL management"
    ]
  }
}
```

### Translation Coverage

```bash
# Check translation completeness
node -e "
  const en = require('./src/i18n/en.json');
  const pt = require('./src/i18n/pt.json');
  const pending = Object.entries(pt).filter(([k,v]) => v.startsWith('[PT]')).length;
  console.log(\`Translation coverage: \${((Object.keys(pt).length - pending) / Object.keys(en).length * 100).toFixed(1)}%\`);
"
```

## 🔄 Maintenance Schedule

- **Weekly**: Run `npm run i18n-check` on feature branches
- **Monthly**: Full audit with `npm run audit:monthly`  
- **Before releases**: Complete translation review
- **Quarterly**: Codemod script updates and pattern refinement

## 📚 Related Documentation

- [Configuration System](../src/config/README.md)
- [Translation Guidelines](../docs/TRANSLATION_GUIDE.md)  
- [Component Development](../docs/COMPONENT_STANDARDS.md)
- [Security Best Practices](../docs/SECURITY.md)