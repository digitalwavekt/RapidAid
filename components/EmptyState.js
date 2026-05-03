/**
 * RapidAid - EmptyState Component
 * Displayed when no search results or data available
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';

const EmptyState = ({ 
  icon = 'alert-circle-outline',
  message,
  subMessage,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name={icon} 
        size={64} 
        color={COLORS.textMuted} 
      />
      <Text style={styles.message}>
        {message || t('noResults')}
      </Text>
      {subMessage && (
        <Text style={styles.subMessage}>{subMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  message: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  subMessage: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});

export default EmptyState;
