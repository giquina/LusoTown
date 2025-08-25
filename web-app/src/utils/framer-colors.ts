/**
 * Framer Motion Color Utilities
 * Converts Tailwind CSS color classes to hex values for animations
 */

export const FRAMER_COLORS = {
  // Red colors
  'text-red-50': '#fef2f2',
  'text-red-100': '#fee2e2',
  'text-red-200': '#fecaca',
  'text-red-300': '#fca5a5',
  'text-red-400': '#f87171',
  'text-red-500': '#ef4444',
  'text-red-600': '#dc2626',
  'text-red-700': '#b91c1c',
  'text-red-800': '#991b1b',
  'text-red-900': '#7f1d1d',

  // Green colors
  'text-green-50': '#f0fdf4',
  'text-green-100': '#dcfce7',
  'text-green-200': '#bbf7d0',
  'text-green-300': '#86efac',
  'text-green-400': '#4ade80',
  'text-green-500': '#22c55e',
  'text-green-600': '#16a34a',
  'text-green-700': '#15803d',
  'text-green-800': '#166534',
  'text-green-900': '#14532d',

  // Blue colors
  'text-blue-50': '#eff6ff',
  'text-blue-100': '#dbeafe',
  'text-blue-200': '#bfdbfe',
  'text-blue-300': '#93c5fd',
  'text-blue-400': '#60a5fa',
  'text-blue-500': '#3b82f6',
  'text-blue-600': '#2563eb',
  'text-blue-700': '#1d4ed8',
  'text-blue-800': '#1e40af',
  'text-blue-900': '#1e3a8a',

  // Yellow colors
  'text-yellow-50': '#fefce8',
  'text-yellow-100': '#fef3c7',
  'text-yellow-200': '#fde68a',
  'text-yellow-300': '#fcd34d',
  'text-yellow-400': '#fbbf24',
  'text-yellow-500': '#f59e0b',
  'text-yellow-600': '#d97706',
  'text-yellow-700': '#b45309',
  'text-yellow-800': '#92400e',
  'text-yellow-900': '#78350f',

  // Gray colors
  'text-gray-50': '#f9fafb',
  'text-gray-100': '#f3f4f6',
  'text-gray-200': '#e5e7eb',
  'text-gray-300': '#d1d5db',
  'text-gray-400': '#9ca3af',
  'text-gray-500': '#6b7280',
  'text-gray-600': '#4b5563',
  'text-gray-700': '#374151',
  'text-gray-800': '#1f2937',
  'text-gray-900': '#111827',

  // Lusophone brand colors (from our config)
  'text-primary-600': '#D4A574',
  'text-secondary-600': '#8B4513',
  'text-accent-600': '#228B22',
  'text-action-600': '#DC143C',
  'text-premium-600': '#8B008B',
  'text-coral-600': '#FF7F50'
} as const;

/**
 * Convert a Tailwind CSS color class to hex value
 */
export function getTailwindColorHex(colorClass: string): string {
  return FRAMER_COLORS[colorClass as keyof typeof FRAMER_COLORS] || colorClass;
}

/**
 * Create animation-safe color properties for Framer Motion
 */
export function createColorAnimation(from: string, to: string) {
  return {
    from: getTailwindColorHex(from),
    to: getTailwindColorHex(to)
  };
}

/**
 * Convert color variants for animations
 */
export function getAnimationColors(baseColor: string) {
  const variations = {
    50: getTailwindColorHex(`text-${baseColor}-50`),
    100: getTailwindColorHex(`text-${baseColor}-100`),
    200: getTailwindColorHex(`text-${baseColor}-200`),
    300: getTailwindColorHex(`text-${baseColor}-300`),
    400: getTailwindColorHex(`text-${baseColor}-400`),
    500: getTailwindColorHex(`text-${baseColor}-500`),
    600: getTailwindColorHex(`text-${baseColor}-600`),
    700: getTailwindColorHex(`text-${baseColor}-700`),
    800: getTailwindColorHex(`text-${baseColor}-800`),
    900: getTailwindColorHex(`text-${baseColor}-900`),
  };
  
  return variations;
}