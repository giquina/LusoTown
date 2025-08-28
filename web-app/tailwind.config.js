/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Modern Portuguese-inspired shadow system
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)', // Modern card shadow
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)', // Card hover effect
        'elevated': '0 12px 40px rgba(0, 0, 0, 0.15)', // Elevated components
        'premium': '0 20px 50px rgba(0, 0, 0, 0.20)', // Premium elements
        'portuguese': '0 8px 25px rgba(30, 64, 175, 0.15)', // Portuguese themed
        'cultural': '0 6px 20px rgba(5, 150, 105, 0.12), 0 2px 6px rgba(245, 158, 11, 0.08)', // Multi-cultural
        'lusophone': '0 10px 30px rgba(220, 38, 38, 0.10), 0 4px 12px rgba(22, 163, 74, 0.08)', // PALOP nations
      },
      // Modern border radius scale
      borderRadius: {
        'card': '12px', // Standard card radius
        'card-lg': '16px', // Large card radius
        'button': '8px', // Button radius
        'input': '6px', // Input radius
      },
      colors: {
        // Heritage-configurable brand colors (dynamically applied via CSS custom properties)
        // Default fallbacks based on Portuguese heritage, configurable through HeritageContext
        
        // Primary heritage color
        primary: {
          25: 'var(--heritage-primary-25, #f8fafc)',
          50: 'var(--heritage-primary-50, #eff6ff)',
          100: 'var(--heritage-primary-100, #dbeafe)',
          200: 'var(--heritage-primary-200, #bfdbfe)',
          300: 'var(--heritage-primary-300, #93c5fd)',
          400: 'var(--heritage-primary-400, #60a5fa)',
          500: 'var(--heritage-primary, #1e40af)', // Main brand color - heritage configurable
          600: 'var(--heritage-primary-600, #1e3a8a)',
          700: 'var(--heritage-primary-700, #1d4ed8)',
          800: 'var(--heritage-primary-800, #1e3a8a)',
          900: 'var(--heritage-primary-900, #1e3a8a)',
        },
        
        // Secondary heritage color
        secondary: {
          25: 'var(--heritage-secondary-25, #f0fdf4)',
          50: 'var(--heritage-secondary-50, #ecfdf5)',
          100: 'var(--heritage-secondary-100, #d1fae5)',
          200: 'var(--heritage-secondary-200, #a7f3d0)',
          300: 'var(--heritage-secondary-300, #6ee7b7)',
          400: 'var(--heritage-secondary-400, #34d399)',
          500: 'var(--heritage-secondary, #059669)', // Main secondary - heritage configurable
          600: 'var(--heritage-secondary-600, #047857)',
          700: 'var(--heritage-secondary-700, #065f46)',
          800: 'var(--heritage-secondary-800, #064e3b)',
          900: 'var(--heritage-secondary-900, #022c22)',
        },
        
        // Accent heritage color
        accent: {
          25: 'var(--heritage-accent-25, #fffdf7)',
          50: 'var(--heritage-accent-50, #fffbeb)',
          100: 'var(--heritage-accent-100, #fef3c7)',
          200: 'var(--heritage-accent-200, #fde68a)',
          300: 'var(--heritage-accent-300, #fcd34d)',
          400: 'var(--heritage-accent-400, #fbbf24)',
          500: 'var(--heritage-accent, #f59e0b)', // Main accent - heritage configurable
          600: 'var(--heritage-accent-600, #d97706)',
          700: 'var(--heritage-accent-700, #b45309)',
          800: 'var(--heritage-accent-800, #92400e)',
          900: 'var(--heritage-accent-900, #78350f)',
        },
        
        // Action heritage color
        action: {
          25: 'var(--heritage-action-25, #fefcfc)',
          50: 'var(--heritage-action-50, #fef2f2)',
          100: 'var(--heritage-action-100, #fee2e2)',
          200: 'var(--heritage-action-200, #fecaca)',
          300: 'var(--heritage-action-300, #fca5a5)',
          400: 'var(--heritage-action-400, #f87171)',
          500: 'var(--heritage-action, #dc2626)', // Main action - heritage configurable
          600: 'var(--heritage-action-600, #b91c1c)',
          700: 'var(--heritage-action-700, #991b1b)',
          800: 'var(--heritage-action-800, #7f1d1d)',
          900: 'var(--heritage-action-900, #7f1d1d)',
        },
        
        // Premium heritage color
        premium: {
          25: 'var(--heritage-premium-25, #fdfdff)',
          50: 'var(--heritage-premium-50, #faf5ff)',
          100: 'var(--heritage-premium-100, #ede9fe)',
          200: 'var(--heritage-premium-200, #ddd6fe)',
          300: 'var(--heritage-premium-300, #c4b5fd)',
          400: 'var(--heritage-premium-400, #a78bfa)',
          500: 'var(--heritage-premium, #7c3aed)', // Main premium - heritage configurable
          600: 'var(--heritage-premium-600, #5b21b6)',
          700: 'var(--heritage-premium-700, #4c1d95)',
          800: 'var(--heritage-premium-800, #3730a3)',
          900: 'var(--heritage-premium-900, #312e81)',
        },
        
        // Coral heritage color
        coral: {
          25: 'var(--heritage-coral-25, #fffaf8)',
          50: 'var(--heritage-coral-50, #fff7ed)',
          100: 'var(--heritage-coral-100, #fed7aa)',
          200: 'var(--heritage-coral-200, #fed7aa)',
          300: 'var(--heritage-coral-300, #fdba74)',
          400: 'var(--heritage-coral-400, #fb923c)',
          500: 'var(--heritage-coral, #f97316)', // Main coral - heritage configurable
          600: 'var(--heritage-coral-600, #ea580c)',
          700: 'var(--heritage-coral-700, #c2410c)',
          800: 'var(--heritage-coral-800, #9a3412)',
          900: 'var(--heritage-coral-900, #7c2d12)',
        },
        
        // Gold color for referral rewards (heritage neutral)
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        // Updated Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        
        // Heritage-aware text colors
        text: '#1f2937',
        textSecondary: '#6b7280',
        textLight: '#9ca3af',
        
        // Heritage brand colors (legacy support - prefer CSS custom properties)
        heritage: {
          primary: 'var(--heritage-primary, #1e40af)',
          secondary: 'var(--heritage-secondary, #059669)',
          accent: 'var(--heritage-accent, #f59e0b)',
          action: 'var(--heritage-action, #dc2626)',
          premium: 'var(--heritage-premium, #7c3aed)',
          coral: 'var(--heritage-coral, #f97316)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Modern Typography Scale for Portuguese-speaking Community
        'display-large': ['4rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '0.02em' }], // 64px
        'display': ['3rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.02em' }], // 48px
        'display-small': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.01em' }], // 40px
        'heading-1': ['2rem', { lineHeight: '1.3', fontWeight: '700' }], // 32px
        'heading-2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }], // 28px
        'heading-3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'body-large': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-small': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }], // 12px
        // Mobile optimized sizes
        'mobile-display': ['2rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.02em' }], // 32px
        'mobile-heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'mobile-body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        // Enhanced spacing scale for modern cards and components
        '6': '1.5rem', // 24px - minimum card padding
        '7': '1.75rem', // 28px
        '9': '2.25rem', // 36px
        '11': '2.75rem', // 44px
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
        '17': '4.25rem', // 68px
        '19': '4.75rem', // 76px
        '21': '5.25rem', // 84px
        '22': '5.5rem',  // 88px
        '23': '5.75rem', // 92px
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'luxury-float': 'luxuryFloat 3s ease-in-out infinite',
        'luxury-pulse': 'luxuryPulse 2s ease-in-out infinite',
        'portuguese-wave': 'portugueseWave 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmerSlow 3s linear infinite',
        'elite-glow': 'eliteGlow 2s ease-in-out infinite alternate',
        'portuguese-pattern': 'portuguesePattern 8s linear infinite',
        'aristocratic-float': 'aristocraticFloat 4s ease-in-out infinite',
        'royal-sparkle': 'royalSparkle 3s ease-in-out infinite',
        'imperial-shine': 'imperialShine 2.5s linear infinite',
        'diamond-rotate': 'diamondRotate 4s linear infinite',
        'cultural-pulse': 'culturalPulse 3s ease-in-out infinite',
        'majestic-hover': 'majesticHover 0.5s ease-out',
        'luxury-breathe': 'luxuryBreathe 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(2rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        luxuryFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        luxuryPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        portugueseWave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        shimmerSlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        eliteGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.1)',
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.2)',
          },
        },
        portuguesePattern: {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '100% 50%' },
          '75%': { backgroundPosition: '50% 100%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        aristocraticFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
        royalSparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        imperialShine: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        diamondRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        culturalPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(220, 38, 38, 0.2), 0 0 60px rgba(22, 163, 74, 0.1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(220, 38, 38, 0.3), 0 0 90px rgba(22, 163, 74, 0.2)',
          },
        },
        majesticHover: {
          '0%': { transform: 'scale(1) translateY(0px)' },
          '100%': { transform: 'scale(1.03) translateY(-2px)' },
        },
        luxuryBreathe: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.02)', filter: 'brightness(1.1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // @tailwindcss/line-clamp is now included by default in Tailwind CSS v3.3+
  ],
}