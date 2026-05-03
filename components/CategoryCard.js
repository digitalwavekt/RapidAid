/**
 * RapidAid - CategoryCard Component
 * Displays emergency category with icon and count
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';

const CategoryCard = ({ category, count = 0, onPress, style }) => {
  const { language, t } = useLanguage();

  const iconMap = {
    'medical-bag': 'medical-bag',
    'car-emergency': 'car-emergency',
    'waves': 'waves',
    'fire': 'fire',
    'skull-crossbones': 'skull-crossbones',
    'baby-face': 'baby-face-outline',
    'sun-thermometer': 'sun-thermometer',
    'alert-octagon': 'alert-octagon',
    'shield-alert': 'shield-alert',
  };

  const iconName = iconMap[category.icon] || 'alert-circle';
  const categoryName = category.name?.[language] || category.name?.en || category.name;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel={`${categoryName} category, ${count} emergencies`}
      accessibilityRole="button"
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '15' }]}>
        <MaterialCommunityIcons 
          name={iconName} 
          size={28} 
          color={category.color} 
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {categoryName}
      </Text>
      <Text style={styles.count}>
        {count} {t('steps')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  count: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
  },
});

export default CategoryCard;
