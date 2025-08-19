// Central brand tokens shared across web and mobile.
export const colors = {
  primary: {
    500: '#1e40af',
    600: '#1e3a8a',
  },
  secondary: {
    500: '#059669',
    600: '#047857',
  },
  accent: {
    500: '#f59e0b',
    600: '#d97706',
  },
  action: {
    500: '#dc2626',
    600: '#b91c1c',
  },
  neutral: {
    50: '#fafafa',
    900: '#111827',
    text: '#1f2937',
    textSecondary: '#6b7280',
  },
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radii = { sm: 6, md: 12, lg: 20, pill: 999 } as const;

export const typography = {
  body: { fontSize: 16, lineHeight: 24 },
  h1: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
} as const;

export type Tokens = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export const tokens: Tokens = { colors, spacing, radii, typography };
