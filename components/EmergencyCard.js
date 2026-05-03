/**
 * RapidAid - EmergencyCard Component
 * Displays emergency summary with severity badge
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedText } from '../utils/helpers';
import SeverityBadge from './SeverityBadge';

const EmergencyCard = ({ emergency, onPress, style }) => {
  const { language } = useLanguage();

  const title = getLocalizedText(emergency.title, language);
  const symptoms = getLocalizedText(emergency.symptoms, language);
  const firstSymptoms = symptoms?.slice(0, 3) || [];

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel={`${title} emergency, severity ${emergency.severity}`}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons 
            name="alert-circle" 
            size={20} 
            color={COLORS.emergency} 
            style={styles.icon}
          />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <SeverityBadge severity={emergency.severity} size="small" />
      </View>

      <View style={styles.symptomsContainer}>
        {firstSymptoms.map((symptom, index) => (
          <View key={index} style={styles.symptomRow}>
            <View style={styles.bullet} />
            <Text style={styles.symptomText} numberOfLines={1}>
              {symptom}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.stepCount}>
          {emergency.steps?.length || 0} steps
        </Text>
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={20} 
          color={COLORS.textMuted} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  symptomsContainer: {
    marginBottom: SPACING.sm,
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    marginRight: SPACING.sm,
  },
  symptomText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.sm,
  },
  stepCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },
});

export default EmergencyCard;
