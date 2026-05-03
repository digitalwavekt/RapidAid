/**
 * RapidAid - EmergencyCompleteScreen
 * Shown after completing emergency guide steps
 */

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { callEmergencyNumber } from '../utils/helpers';
import EmergencyButton from '../components/EmergencyButton';

const EmergencyCompleteScreen = ({ route, navigation }) => {
  const { emergencyTitle } = route.params || {};
  const { t } = useLanguage();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleCallEmergency = () => {
    callEmergencyNumber('108');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="check-circle" size={80} color={COLORS.success} />
        </View>

        <Text style={styles.title}>Guide Completed</Text>
        <Text style={styles.subtitle}>
          You have completed the emergency guide for:
        </Text>
        <Text style={styles.emergencyName}>{emergencyTitle || 'Emergency'}</Text>

        {/* Important Reminder */}
        <View style={styles.reminderCard}>
          <MaterialCommunityIcons name="alert" size={24} color={COLORS.warning} />
          <Text style={styles.reminderText}>
            Remember: This guide is for first aid only. Always seek professional medical help.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <EmergencyButton 
            number="108"
            label="Call Ambulance"
            size="large"
            style={styles.emergencyButton}
          />

          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleGoHome}
          >
            <MaterialCommunityIcons name="home" size={20} color={COLORS.primary} />
            <Text style={styles.homeButtonText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    color: COLORS.success,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emergencyName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  reminderCard: {
    backgroundColor: COLORS.warning + '15',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  reminderText: {
    flex: 1,
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginLeft: SPACING.md,
  },
  actions: {
    width: '100%',
    gap: SPACING.md,
  },
  emergencyButton: {
    width: '100%',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  homeButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default EmergencyCompleteScreen;
