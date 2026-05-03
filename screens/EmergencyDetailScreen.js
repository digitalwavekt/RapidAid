/**
 * RapidAid - EmergencyDetailScreen
 * Shows emergency details: symptoms, severity, dos/donts
 */

import React, { useState } from 'react';
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
import DataService from '../services/dataService';
import { getLocalizedText, getSeverityColor } from '../utils/helpers';
import SeverityBadge from '../components/SeverityBadge';
import DosDonts from '../components/DosDonts';
import EmergencyButton from '../components/EmergencyButton';
import FloatingEmergencyButton from '../components/FloatingEmergencyButton';

const EmergencyDetailScreen = ({ route, navigation }) => {
  const { emergencyId } = route.params;
  const { language, t } = useLanguage();

  const emergency = DataService.getEmergencyById(emergencyId);

  const [activeTab, setActiveTab] = useState('symptoms'); // symptoms | info

  if (!emergency) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Emergency not found</Text>
      </SafeAreaView>
    );
  }

  const title = getLocalizedText(emergency.title, language);
  const symptoms = getLocalizedText(emergency.symptoms, language) || [];
  const hospitalTransfer = getLocalizedText(emergency.hospitalTransfer, language);
  const emergencyNumber = emergency.emergencyNumber || '108';

  const tabs = [
    { id: 'symptoms', label: t('symptoms'), icon: 'clipboard-pulse' },
    { id: 'info', label: t('steps'), icon: 'format-list-numbered' },
  ];

  const handleStartGuide = () => {
    navigation.navigate('StepGuide', { emergencyId: emergency.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons 
              name="alert-circle" 
              size={32} 
              color={COLORS.emergency} 
            />
            <View style={styles.titleInfo}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.badgeRow}>
                <SeverityBadge severity={emergency.severity} />
                <Text style={styles.estimatedTime}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.textMuted} />
                  {' '}{emergency.estimatedTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Call Card */}
        <View style={styles.callCard}>
          <View style={styles.callInfo}>
            <MaterialCommunityIcons name="phone-alert" size={24} color={COLORS.emergency} />
            <View style={styles.callTextContainer}>
              <Text style={styles.callLabel}>{t('emergencyNumber')}</Text>
              <Text style={styles.callNumber}>{emergencyNumber}</Text>
            </View>
          </View>
          <EmergencyButton 
            number={emergencyNumber} 
            label={t('callNow')}
            size="small"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <MaterialCommunityIcons 
                name={tab.icon} 
                size={20} 
                color={activeTab === tab.id ? COLORS.primary : COLORS.textMuted} 
              />
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'symptoms' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>{t('symptoms')}</Text>
            {symptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <View style={[styles.symptomBullet, { backgroundColor: getSeverityColor(emergency.severity) }]} />
                <Text style={styles.symptomText}>{symptom}</Text>
              </View>
            ))}

            {/* Hospital Transfer */}
            <View style={styles.hospitalCard}>
              <View style={styles.hospitalHeader}>
                <MaterialCommunityIcons name="hospital-building" size={20} color={COLORS.info} />
                <Text style={styles.hospitalTitle}>{t('hospitalTransfer')}</Text>
              </View>
              <Text style={styles.hospitalText}>{hospitalTransfer}</Text>
            </View>

            {/* Dos and Don'ts */}
            <DosDonts dos={emergency.dos} donts={emergency.donts} />
          </View>
        )}

        {activeTab === 'info' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>{t('steps')}</Text>
            {emergency.steps?.map((step, index) => (
              <View key={index} style={styles.stepPreview}>
                <View style={styles.stepPreviewNumber}>
                  <Text style={styles.stepPreviewNumberText}>{step.stepNo}</Text>
                </View>
                <View style={styles.stepPreviewContent}>
                  <Text style={styles.stepPreviewTitle}>
                    {getLocalizedText(step.title, language)}
                  </Text>
                  <Text style={styles.stepPreviewDesc} numberOfLines={2}>
                    {getLocalizedText(step.description, language)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Start Guide Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartGuide}
          accessibilityLabel="Start emergency guide"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="play-circle" size={28} color={COLORS.textInverse} />
          <Text style={styles.startButtonText}>{t('startGuide')}</Text>
        </TouchableOpacity>
      </View>

      <FloatingEmergencyButton number={emergencyNumber} />
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.md,
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
  titleCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  estimatedTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },
  callCard: {
    backgroundColor: COLORS.emergencyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.emergency,
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  callTextContainer: {
    marginLeft: SPACING.md,
  },
  callLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  callNumber: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.emergency,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginBottom: SPACING.base,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.emergencyLight,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabContent: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.base,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  symptomBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  symptomText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  hospitalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  hospitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  hospitalTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.info,
    marginLeft: SPACING.sm,
  },
  hospitalText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  stepPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  stepPreviewNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  stepPreviewNumberText: {
    color: COLORS.textInverse,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  stepPreviewContent: {
    flex: 1,
  },
  stepPreviewTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  stepPreviewDesc: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomBar: {
    backgroundColor: COLORS.background,
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  startButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});

export default EmergencyDetailScreen;
