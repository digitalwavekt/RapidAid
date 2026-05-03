/**
 * RapidAid - AboutScreen
 * App information and credits
 */

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONFIG } from '../utils/constants';

const AboutScreen = ({ navigation }) => {
  const { t } = useLanguage();

  const appFeatures = [
    { icon: 'wifi-off', title: 'Offline First', desc: 'Works without internet' },
    { icon: 'translate', title: 'Bilingual', desc: 'English & Hindi support' },
    { icon: 'volume-high', title: 'Voice Guidance', desc: 'Audio instructions' },
    { icon: 'shield-check', title: 'Verified Content', desc: 'Medical expert reviewed' },
    { icon: 'phone-alert', title: 'Quick Dial', desc: 'One-tap emergency calls' },
    { icon: 'heart-pulse', title: 'Medical Profile', desc: 'Offline health records' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('about')}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="heart-pulse" size={48} color={COLORS.textInverse} />
          </View>
          <Text style={styles.appName}>{APP_CONFIG.NAME}</Text>
          <Text style={styles.tagline}>{t('tagline')}</Text>
          <Text style={styles.version}>Version {APP_CONFIG.VERSION}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t('developedForIndia')}</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {appFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <MaterialCommunityIcons name={feature.icon} size={28} color={COLORS.primary} />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Numbers Reference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Numbers (India)</Text>
          <View style={styles.numbersCard}>
            {[
              { number: '108', label: 'Ambulance' },
              { number: '112', label: 'Emergency' },
              { number: '100', label: 'Police' },
              { number: '101', label: 'Fire' },
              { number: '181', label: 'Women Helpline' },
              { number: '1098', label: 'Child Helpline' },
            ].map((item, index) => (
              <View key={index} style={styles.numberRow}>
                <Text style={styles.numberLabel}>{item.label}</Text>
                <Text style={styles.numberValue}>{item.number}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Credits */}
        <View style={styles.creditsCard}>
          <MaterialCommunityIcons name="information" size={20} color={COLORS.info} />
          <Text style={styles.creditsText}>
            RapidAid is designed to help save lives. Content is based on standard first aid protocols. 
            Always seek professional medical help for emergencies.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.emergency,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  tagline: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  version: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginTop: SPACING.md,
  },
  badgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  featureCard: {
    width: '50%',
    padding: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  numbersCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.base,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  numberLabel: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
  },
  numberValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.emergency,
  },
  creditsCard: {
    backgroundColor: COLORS.info + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  creditsText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginLeft: SPACING.sm,
  },
});

export default AboutScreen;
