/**
 * RapidAid - SettingsScreen (FIXED)
 * App settings, language, and about
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,  // ✅ FIXED: Import Switch for proper toggle
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { APP_CONFIG } from '../utils/constants';

const SettingsScreen = ({ navigation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings, setSettings, medicalProfile, emergencyContacts } = useApp();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // ✅ FIXED: Proper toggle with Switch component
  const handleToggleSetting = (key) => {
    const newValue = !settings[key];
    setSettings({ [key]: newValue });
  };

  const settingsSections = [
    {
      title: t('language'),
      items: [
        {
          icon: 'translate',
          label: t('english'),
          value: language === 'en',
          onPress: () => handleLanguageChange('en'),
          type: 'radio',
        },
        {
          icon: 'translate',
          label: t('hindi'),
          value: language === 'hi',
          onPress: () => handleLanguageChange('hi'),
          type: 'radio',
        },
      ],
    },
    {
      title: t('settings'),
      items: [
        {
          icon: 'volume-high',
          label: t('autoPlayAudio') || 'Auto-play Audio',
          value: settings.autoPlayAudio,
          onPress: () => handleToggleSetting('autoPlayAudio'),
          type: 'toggle',
        },
        {
          icon: 'vibrate',
          label: t('hapticFeedback') || 'Haptic Feedback',
          value: settings.hapticFeedback,
          onPress: () => handleToggleSetting('hapticFeedback'),
          type: 'toggle',
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          icon: 'account-heart',
          label: t('medicalProfile'),
          onPress: () => navigation.navigate('MedicalProfile'),
          type: 'navigate',
        },
        {
          icon: 'contacts',
          label: t('emergencyContacts'),
          onPress: () => navigation.navigate('EmergencyContacts'),
          type: 'navigate',
        },
        {
          icon: 'information',
          label: t('about'),
          onPress: () => navigation.navigate('About'),
          type: 'navigate',
        },
        {
          icon: 'shield-alert',
          label: t('disclaimer'),
          onPress: () => navigation.navigate('Disclaimer'),
          type: 'navigate',
        },
      ],
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.label}
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={item.type === 'toggle' ? 1 : 0.7}  // ✅ Don't fade for toggle (Switch handles it)
    >
      <View style={styles.settingItemLeft}>
        <MaterialCommunityIcons
          name={item.icon}
          size={22}
          color={COLORS.primary}
          style={styles.settingIcon}
        />
        <Text style={styles.settingLabel}>{item.label}</Text>
      </View>

      {/* ✅ FIXED: Use Switch component for toggles */}
      {item.type === 'toggle' && (
        <Switch
          value={item.value}
          onValueChange={item.onPress}
          trackColor={{ false: COLORS.border, true: COLORS.primary + '80' }}
          thumbColor={item.value ? COLORS.primary : COLORS.background}
        />
      )}

      {item.type === 'radio' && (
        <View style={[styles.radio, item.value && styles.radioActive]}>
          {item.value && <View style={styles.radioDot} />}
        </View>
      )}

      {item.type === 'navigate' && (
        <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Summary */}
        <View style={styles.profileSummary}>
          <View style={styles.profileAvatar}>
            <MaterialCommunityIcons name="account" size={28} color={COLORS.textInverse} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{medicalProfile?.name || 'Guest User'}</Text>
            <Text style={styles.profileDetail}>
              {emergencyContacts?.length || 0} emergency contacts
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item) => renderSettingItem(item))}
            </View>
          </View>
        ))}

        {/* Offline Badge */}
        <View style={styles.offlineBadge}>
          <MaterialCommunityIcons name="wifi-off" size={24} color={COLORS.success} />
          <View style={styles.offlineTextContainer}>
            <Text style={styles.offlineTitle}>{t('offlineReady')}</Text>
            <Text style={styles.offlineSubtitle}>{t('allContentAvailable')}</Text>
          </View>
        </View>

        {/* Version */}
        <Text style={styles.version}>
          {APP_CONFIG.NAME} v{APP_CONFIG.VERSION}
        </Text>
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
  profileSummary: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.base,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  profileName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileDetail: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: SPACING.md,
  },
  settingLabel: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.success + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  offlineTextContainer: {
    marginLeft: SPACING.md,
  },
  offlineTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.success,
  },
  offlineSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  version: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export default SettingsScreen;