/**
 * RapidAid - DisclaimerScreen
 * Medical disclaimer shown on first launch
 */

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

const DisclaimerScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { acceptDisclaimer } = useApp();

  const handleAccept = async () => {
    await acceptDisclaimer();
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="shield-alert" size={40} color={COLORS.emergency} />
        <Text style={styles.headerTitle}>{t('disclaimer')}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <View style={styles.warningBox}>
            <MaterialCommunityIcons name="alert" size={32} color={COLORS.emergency} />
            <Text style={styles.warningText}>
              IMPORTANT MEDICAL DISCLAIMER
            </Text>
          </View>

          <Text style={styles.disclaimerText}>
            {t('disclaimerText')}
          </Text>

          <View style={styles.pointsContainer}>
            <View style={styles.point}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.pointText}>
                This app provides general first aid information for educational purposes.
              </Text>
            </View>
            <View style={styles.point}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.pointText}>
                Always call emergency services (108/112) for serious medical conditions.
              </Text>
            </View>
            <View style={styles.point}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.pointText}>
                Follow instructions from trained medical professionals over app guidance.
              </Text>
            </View>
            <View style={styles.point}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.pointText}>
                The app developers are not responsible for outcomes of emergency situations.
              </Text>
            </View>
          </View>

          <View style={styles.emergencyBox}>
            <MaterialCommunityIcons name="phone-alert" size={24} color={COLORS.emergency} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyTitle}>Always Call Emergency Services</Text>
              <Text style={styles.emergencyNumbers}>Ambulance: 108 | Emergency: 112</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={handleAccept}
          accessibilityLabel="Accept disclaimer and continue"
          accessibilityRole="button"
        >
          <Text style={styles.acceptButtonText}>I Understand & Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.emergencyLight,
  },
  headerTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: '700',
    color: COLORS.emergency,
    marginTop: SPACING.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  contentCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.base,
  },
  warningBox: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.emergencyLight,
    borderRadius: BORDER_RADIUS.md,
  },
  warningText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.emergency,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    lineHeight: 26,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  pointsContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  pointText: {
    flex: 1,
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  emergencyBox: {
    backgroundColor: COLORS.emergencyLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.emergency,
  },
  emergencyTextContainer: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.emergency,
  },
  emergencyNumbers: {
    fontSize: FONTS.sizes.base,
    color: COLORS.emergency,
    marginTop: SPACING.xs,
  },
  bottomBar: {
    backgroundColor: COLORS.background,
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
});

export default DisclaimerScreen;
