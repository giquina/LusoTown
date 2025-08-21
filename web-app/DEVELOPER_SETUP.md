# LusoTown Developer Setup Guide

**Version**: 1.0.0  
**Platform**: Premium Portuguese Community Platform  
**Last Updated**: August 2025

---

## 🚀 Quick Start

Get the LusoTown premium platform running locally in under 10 minutes.

### Prerequisites
```bash
# Required versions
Node.js: 22.x or higher
npm: 9.x or higher
Git: Latest version
```

### One-Command Setup
```bash
# Clone and setup in one go
git clone https://github.com/LusoTown/web-app.git lusotown && cd lusotown && npm install && cp .env.example .env.local && npm run dev
```

---

## 📋 Detailed Setup Instructions

### 1. Environment Setup

#### Required Tools
```bash
# macOS (using Homebrew)
brew install node@22 git

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Windows (using Chocolatey)
choco install nodejs git
```

#### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "supabase.supabase"
  ]
}
```

### 2. Project Installation

```bash
# Clone repository
git clone https://github.com/LusoTown/web-app.git
cd web-app

# Install dependencies (this will take 2-3 minutes)
npm install

# Copy environment template
cp .env.example .env.local
```

### 3. Environment Configuration

Create `.env.local` with your credentials:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="LusoTown London"

# Media & Storage (Optional for development)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payments (Optional for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret

# Streaming (Optional for development)
NEXT_PUBLIC_HLS_STREAM_URL=your_hls_stream_url

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_ga_id
```

### 4. Database Setup

#### Option A: Use Existing Demo Database
```bash
# The app comes with demo data - just start developing
npm run dev
```

#### Option B: Setup Your Own Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run database schema:
   ```bash
   # Apply database migrations
   npm run db:migrate
   ```

---

## 🛠️ Development Workflow

### Starting Development Server
```bash
# Start development server (with hot reload)
npm run dev

# Access application
open http://localhost:3000
```

### Available Development Commands
```bash
# Core development
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Testing
npm run test             # Run all tests
npm run test:unit        # Unit tests only
npm run test:mobile      # Mobile-specific tests
npm run test:portuguese  # Portuguese language tests
npm run test:e2e         # End-to-end tests

# Database
npm run db:migrate       # Apply database migrations
npm run db:migrate:streaming  # Setup streaming tables

# Documentation
npm run docs:update      # Update documentation
npm run docs:validate    # Validate documentation
```

---

## 🏗️ Project Structure

```
lusotown/
├── src/                        # Source code
│   ├── app/                    # Next.js 14 app directory
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── events/             # Event pages
│   │   ├── services/           # Premium services
│   │   ├── tv/                 # LusoTown TV streaming
│   │   └── api/                # API routes
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Navigation with premium dropdowns
│   │   ├── Footer.tsx          # Footer with service links
│   │   ├── Hero.tsx            # Landing page hero
│   │   ├── StreamPlayer.tsx    # Premium video player
│   │   ├── ServiceCard.tsx     # Luxury service cards
│   │   └── ...                 # 100+ other components
│   ├── context/                # React Context providers
│   │   ├── LanguageContext.tsx # Portuguese/English switching
│   │   ├── CartContext.tsx     # Shopping cart state
│   │   ├── SubscriptionContext.tsx # Premium membership
│   │   └── ...                 # Other context providers
│   ├── lib/                    # Utilities and configurations
│   │   ├── design.ts           # Portuguese design system
│   │   ├── search.ts           # Platform search functionality
│   │   └── serviceCartUtils.ts # Premium service utilities
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
│   ├── events/                 # Event images
│   ├── hero/                   # Hero section images
│   └── services/               # Service images
├── docs/                       # Documentation (optional)
├── scripts/                    # Development scripts
│   └── docs/                   # Documentation automation
├── __tests__/                  # Test files
├── .env.example                # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Portuguese-inspired design config
├── package.json                # Dependencies and scripts
└── README.md                   # Main documentation
```

---

## 🎨 Portuguese Design System

### Color Palette
The platform uses a Portuguese-inspired color system:

```typescript
// Primary Colors
const colors = {
  primary: '#1e40af',     // Azul Atlântico (Atlantic Blue)
  secondary: '#059669',   // Verde Esperança (Hope Green)  
  accent: '#f59e0b',      // Dourado Sol (Golden Sun)
  action: '#dc2626',      // Vermelho Paixão (Passion Red)
  premium: '#7c3aed',     // Roxo Fado (Fado Purple)
  coral: '#f97316'        // Coral Tropical (Tropical Coral)
}
```

### Component Usage
```tsx
import { ButtonStyles, Typography, CardStyles } from '@/lib/design'

// Primary CTA button with Portuguese flag gradient
<button className={ButtonStyles.primaryCTA}>
  JOIN NOW
</button>

// Portuguese cultural card styling
<div className={CardStyles.featured}>
  Cultural content here
</div>
```

---

## 💻 Development Guidelines

### Code Style
```typescript
// Use TypeScript for all new files
interface EventProps {
  id: string
  title: string
  title_pt?: string  // Portuguese translation
  date: string
  location: string
  is_premium: boolean
}

// Always include Portuguese language support
const { language, t } = useLanguage()
const displayTitle = language === 'pt' ? title_pt || title : title
```

### Portuguese Language Integration
```tsx
// Language context usage
const { language, t } = useLanguage()

// Bilingual content
<h1 className="text-3xl font-bold">
  {language === 'pt' 
    ? 'Bem-vindos à Comunidade Portuguesa' 
    : 'Welcome to the Portuguese Community'
  }
</h1>

// Using translation function
<p>{t('events.discover.description')}</p>
```

### Component Development
```tsx
// Premium component template
interface PremiumComponentProps {
  hasAccess: boolean
  isLoading?: boolean
  language?: 'pt' | 'en'
}

export default function PremiumComponent({ 
  hasAccess, 
  isLoading = false,
  language = 'en'
}: PremiumComponentProps) {
  const { hasActiveSubscription } = useSubscription()
  
  if (!hasAccess && !hasActiveSubscription) {
    return <SubscriptionGate feature="premium_component" />
  }
  
  return (
    <div className="premium-component">
      {/* Component content */}
    </div>
  )
}
```

---

## 🔧 Configuration

### Next.js Configuration
```javascript
// next.config.js - Production optimized
const nextConfig = {
  images: {
    unoptimized: true,  // Disable optimization for compatibility
    domains: ['res.cloudinary.com', 'images.unsplash.com']
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true  // Build optimization
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js - Portuguese design system
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#1e40af',
          900: '#1e3a8a'
        },
        secondary: {
          50: '#ecfdf5',
          500: '#059669',
          900: '#022c22'
        },
        // Portuguese cultural colors
        premium: {
          500: '#7c3aed',
          600: '#6d28d9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
```

---

## 📱 Mobile Development

### Mobile Testing
```bash
# Test mobile-specific functionality
npm run test:mobile

# Test responsive breakpoints
npm run test:responsive

# Validate mobile UX
npm run test:mobile-validation
```

### Mobile-First Approach
```tsx
// Mobile-responsive component structure
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content scales from 1 column (mobile) to 3 columns (desktop) */}
</div>

// Mobile-optimized Portuguese content
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  {language === 'pt' ? 'LusoTown TV' : 'LusoTown TV'}
</h1>
```

---

## 🧪 Testing

### Test Structure
```
__tests__/
├── components/           # Component unit tests
├── contexts/            # Context provider tests
├── integration/         # API and database tests
├── mobile-ux-tests/     # Mobile experience tests
├── performance/         # Performance tests
└── portuguese/          # Portuguese language tests
```

### Running Tests
```bash
# Comprehensive test suite
npm run test:all

# Portuguese-specific testing
npm run test:portuguese

# Mobile user experience testing
npm run test:mobile-ux

# Premium feature testing
npm run test:premium
```

### Writing Tests
```typescript
// Component test example
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'
import PremiumServiceCard from '@/components/ServiceCard'

test('displays service in Portuguese when language is pt', () => {
  render(
    <LanguageProvider defaultLanguage="pt">
      <PremiumServiceCard 
        service={mockPortugueseService}
        hasAccess={true}
      />
    </LanguageProvider>
  )
  
  expect(screen.getByText('Serviços Premium')).toBeInTheDocument()
})
```

---

## 🚀 Deployment

### Development Deployment
```bash
# Local production build testing
npm run build
npm run start

# Deploy to development environment
git push origin develop
```

### Production Deployment
```bash
# Production deployment via Vercel
npm run deploy

# Or manual deployment
npm run build
vercel --prod
```

### Environment Setup for Deployment
```bash
# Set production environment variables in Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_APP_URL production
```

---

## 🔍 Debugging

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Analyze bundle size
npm run build -- --analyze
```

#### Database Connection Issues
```bash
# Test Supabase connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
client.from('events').select('*').limit(1).then(console.log);
"
```

#### Portuguese Language Issues
```bash
# Test language switching
npm run test:portuguese

# Validate Portuguese content
node scripts/validate-portuguese-content.js
```

---

## 📚 Resources

### Documentation
- **[README.md](./README.md)** - Project overview and features
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Portuguese design guidelines
- **[FEATURES_README.md](./FEATURES_README.md)** - Feature implementation details

### External Resources
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework documentation
- **[Supabase Documentation](https://supabase.com/docs)** - Database and authentication
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling framework
- **[Vercel Platform](https://vercel.com/docs)** - Deployment platform

### Community Support
- **GitHub Issues** - Bug reports and feature requests
- **Discord Community** - Developer discussions
- **WhatsApp Support** - Portuguese community support

---

## 🤝 Contributing

### Development Process
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/premium-service-enhancement`
3. **Make changes with Portuguese support**
4. **Add comprehensive tests**
5. **Submit pull request with detailed description**

### Code Review Guidelines
- All code must support Portuguese/English bilingual interface
- Mobile-first responsive design required
- Premium features must include subscription gating
- Cultural sensitivity and Portuguese community focus
- Comprehensive testing coverage required

---

**Built with ❤️ for the Portuguese community in London & UK**  
**Developer Setup Guide v1.0.0 | Last Updated: August 2025**