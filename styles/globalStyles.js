/**
 * RapidAid - Global Styles
 * Reusable style patterns for consistent UI
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from './theme';

export const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.base,
  },
  scrollContent: {
    paddingBottom: SPACING['3xl'],
  },

  // Header Styles
  header: {
    backgroundColor: COLORS.emergency,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.base,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  cardElevated: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.md,
  },

  // Text Styles
  title: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  caption: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },

  // Button Styles
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },

  // Emergency Button
  emergencyButton: {
    backgroundColor: COLORS.emergency,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.emergency,
  },
  emergencyButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },

  // Input Styles
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.base,
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
  },

  // List Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },

  // Badge Styles
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    color: COLORS.textInverse,
  },

  // Severity Badge Colors
  badgeCritical: { backgroundColor: COLORS.critical },
  badgeHigh: { backgroundColor: COLORS.high },
  badgeMedium: { backgroundColor: COLORS.medium },
  badgeLow: { backgroundColor: COLORS.low },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.base,
  },

  // Row Layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  gridItem: {
    width: '50%',
    padding: SPACING.sm,
  },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Panic Mode Styles
  panicContainer: {
    flex: 1,
    backgroundColor: COLORS.emergency,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  panicTitle: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '700',
    color: COLORS.textInverse,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  panicButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.textInverse,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  panicButtonText: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.emergency,
  },

  // Fixed Bottom Button
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
});

export default globalStyles;
