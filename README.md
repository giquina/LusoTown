# LusoTown London

**A digital home for Portuguese-speaking communities in London**

LusoTown London is a vibrant online community platform created especially for Portuguese speakers and their families living in London. Whether you've recently moved here, have relatives from Lusophone countries, or simply want to connect with like-minded people who share your language and culture, this platform is your digital home away from home.

## 🌍 About LusoTown London

We know how much it means to keep the language alive and stay connected to the places and people that shaped us. LusoTown London helps you:

- **Find Events** - Attend local events that celebrate Lusophone culture — from music nights to food festivals and social meetups
- **Connect** - Meet friends, family, and new acquaintances who understand your heritage and experiences  
- **Share Stories** - Exchange memories and tips about living in London as a Portuguese speaker or descendant
- **Discover Businesses** - Find Portuguese-speaking businesses and services that make life easier in London
- **Build Community** - Create friendships and networks to support one another and celebrate your roots

## 🎯 Target Audience

- Portuguese speakers who have moved to London and want to find a community
- British-born Lusophone descendants looking to connect with their cultural heritage
- Families with roots in Portuguese-speaking countries seeking a friendly social space
- Anyone who values Portuguese language and culture and wants to belong

## ✨ Key Features

### 📅 Events Calendar
Cultural gatherings, community fairs, language practice sessions, and family-friendly activities

### 👥 Community Groups  
Interest-based forums for sharing advice, arranging meetups, and making friends

### 🏪 Business Directory
Restaurants, shops, legal & financial advisors, and more serving the Lusophone community

### 📚 Resource Hub
Information on housing, jobs, education, and language classes in London

### 📖 Stories & Culture
Articles, videos, and user stories celebrating Lusophone traditions and life in the UK

## 🌈 Countries & Regions Represented

- **Portugal** 🇵🇹
- **Brazil** 🇧🇷  
- **Angola** 🇦🇴
- **Mozambique** 🇲🇿
- **Cape Verde** 🇨🇻
- **Guinea-Bissau** 🇬🇼
- **São Tomé and Príncipe** 🇸🇹
- **East Timor** 🇹🇱
- **Macau** 🇲🇴
- **Equatorial Guinea** 🇬🇶

And their diaspora communities in London

## 🎨 Brand Colors

Our warm and welcoming palette inspired by the flags and spirit of Portuguese-speaking nations:

- **Emerald Green** (#059669) — Growth, culture, heritage
- **Deep Ocean Blue** (#1E40AF) — Connection, trust, and calm  
- **Golden Yellow** (#F59E0B) — Warmth, joy, and community
- **Warm Red** (#DC2626) — Passion, unity, and celebration
- **Fado Purple** (#7C3AED) — Cultural traditions and premium experiences
- **Tropical Coral** (#F97316) — Warm interactions and celebration

## 🛠 Technology Stack

### Web Application
- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling with Portuguese-inspired design system
- **Framer Motion** for animations
- **Headless UI** for accessible components
- **Lucide React** for icons

### Backend Infrastructure
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions)
- **Stripe** for payment processing (planned)

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/LusoTown.git
cd LusoTown

# Install web app dependencies
cd web-app
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production  
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Build and export static site

# Code Quality
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting files
```

## 📁 Project Structure

```
LusoTown/
├── web-app/                 # Next.js web application
│   ├── src/
│   │   ├── app/            # Next.js 14 app router pages
│   │   ├── components/     # React components
│   │   └── lib/           # Utility functions and Supabase client
│   ├── public/            # Static assets
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json       # Web dependencies
├── mobile-app/             # React Native + Expo mobile app (future development)
├── docs/                  # Project documentation
└── supabase/              # Database migrations and configuration
```

## 🌐 Deployment

The web application is configured for static export and can be deployed to various platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Environment Variables

Create a `.env.local` file in the `web-app` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🤝 Contributing

We welcome contributions from the Portuguese-speaking community! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, suggestions, or support:

- Website: [LusoTown London](https://lusotown-london.vercel.app)
- Email: hello@lusotown.london (coming soon)
- Community: Join our platform to connect directly

---

**LusoTown London** - Proudly built for the Portuguese-speaking community in London 🌍

*Unidos pela Língua* (United by Language)