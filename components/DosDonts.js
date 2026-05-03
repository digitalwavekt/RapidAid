/**
 * RapidAid - DosDonts Component
 * Displays Do's and Don'ts for emergency situations
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedText } from '../utils/helpers';

const DosDonts = ({ dos, donts }) => {
  const { language, t } = useLanguage();

  const dosList = getLocalizedText(dos, language) || [];
  const dontsList = getLocalizedText(donts, language) || [];

  return (
    <View style={styles.container}>
      {/* DO's Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
          <Text style={[styles.sectionTitle, { color: COLORS.success }]}>
            {t('dos')}
          </Text>
        </View>
        {dosList.map((item, index) => (
          <View key={`do-${index}`} style={styles.item}>
            <View style={[styles.bullet, { backgroundColor: COLORS.success }]} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* DON'Ts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
          <Text style={[styles.sectionTitle, { color: COLORS.error }]}>
            {t('donts')}
          </Text>
        </View>
        {dontsList.map((item, index) => (
          <View key={`dont-${index}`} style={styles.item}>
            <View style={[styles.bullet, { backgroundColor: COLORS.error }]} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.md,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: SPACING.sm,
  },
  itemText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    lineHeight: 22,
    flex: 1,
  },
});

export default DosDonts;
