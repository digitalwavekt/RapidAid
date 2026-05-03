/**
 * RapidAid - Global Theme & Design System
 * Emergency-optimized color palette and styling constants
 * Designed for high visibility in panic situations
 */

export const COLORS = {
  // Primary Emergency Colors
  emergency: '#DC2626',      // Red - primary emergency
  emergencyDark: '#991B1B',  // Dark red
  emergencyLight: '#FEE2E2', // Light red background

  // Severity Colors
  critical: '#DC2626',       // Red
  high: '#EA580C',           // Orange
  medium: '#F59E0B',         // Amber/Yellow
  low: '#16A34A',            // Green

  // UI Colors
  primary: '#DC2626',
  secondary: '#1F2937',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
  border: '#E5E7EB',
  divider: '#F3F4F6',

  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Status Colors
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#3B82F6',

  // Emergency Button Gradient
  emergencyGradient: ['#DC2626', '#B91C1C'],
  emergencyGlow: 'rgba(220, 38, 38, 0.3)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 40,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const BORDER_RADIUS = {
  sm: 6,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  emergency: {
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
};

export const ANIMATIONS = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'bounce',
  },
};

// Emergency-optimized button sizes
export const BUTTON_SIZES = {
  small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
  medium: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
  large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 },
  emergency: { paddingVertical: 20, paddingHorizontal: 40, fontSize: 22 },
};

export default {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATIONS,
  BUTTON_SIZES,
};
