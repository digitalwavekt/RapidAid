/**
 * RapidAid - HomeScreen
 * Main dashboard with search, categories, and quick emergency access
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import DataService from '../services/dataService';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import EmergencyCard from '../components/EmergencyCard';
import EmergencyButton from '../components/EmergencyButton';
import FloatingEmergencyButton from '../components/FloatingEmergencyButton';
import EmptyState from '../components/EmptyState';

const HomeScreen = ({ navigation }) => {
  const { language, t } = useLanguage();
  const { settings } = useApp();

  const [categories, setCategories] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [filteredEmergencies, setFilteredEmergencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allCategories = DataService.getAllCategories();
    const allEmergencies = DataService.getAllEmergencies();
    const counts = DataService.getCategoryCounts();

    setCategories(allCategories);
    setEmergencies(allEmergencies);
    setFilteredEmergencies(allEmergencies);
    setCategoryCounts(counts);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null);

    if (!query.trim()) {
      setFilteredEmergencies(emergencies);
      return;
    }

    const results = DataService.searchEmergencies(query, language);
    setFilteredEmergencies(results);
  };

  const handleCategoryPress = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredEmergencies(emergencies);
    } else {
      setSelectedCategory(categoryId);
      const categoryEmergencies = DataService.getEmergenciesByCategory(categoryId);
      setFilteredEmergencies(categoryEmergencies);
    }
    setSearchQuery('');
  };

  const handleEmergencyPress = (emergency) => {
    navigation.navigate('EmergencyDetail', { emergencyId: emergency.id });
  };

  const handleQuickEmergency = () => {
    navigation.navigate('PanicMode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.emergency} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.tagline}>{t('tagline')}</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
            accessibilityLabel="Settings"
          >
            <MaterialCommunityIcons name="cog" size={24} color={COLORS.textInverse} />
          </TouchableOpacity>
        </View>

        {/* Quick Emergency Button */}
        <TouchableOpacity 
          style={styles.quickEmergencyButton}
          onPress={handleQuickEmergency}
          accessibilityLabel="Quick emergency mode"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="alert-octagon" size={28} color={COLORS.textInverse} />
          <Text style={styles.quickEmergencyText}>{t('quickEmergency')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <SearchBar 
          placeholder={t('searchPlaceholder')}
          onSearch={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('emergencyCategories')}</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <CategoryCard
                  category={category}
                  count={categoryCounts[category.id] || 0}
                  onPress={() => handleCategoryPress(category.id)}
                  style={[
                    selectedCategory === category.id && styles.selectedCategory,
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Emergency List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name?.[language] || t('emergencyCategories')
                : searchQuery 
                  ? `Search Results (${filteredEmergencies.length})`
                  : 'All Emergencies'
              }
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => handleCategoryPress(selectedCategory)}>
                <Text style={styles.clearFilter}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredEmergencies.length > 0 ? (
            filteredEmergencies.map((emergency) => (
              <EmergencyCard
                key={emergency.id}
                emergency={emergency}
                onPress={() => handleEmergencyPress(emergency)}
              />
            ))
          ) : (
            <EmptyState 
              icon="magnify-close"
              message={t('noResults')}
              subMessage="Try different search terms"
            />
          )}
        </View>
      </ScrollView>

      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
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
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.base,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  appName: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    color: COLORS.textInverse,
  },
  tagline: {
    fontSize: FONTS.sizes.base,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
  },
  settingsButton: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BORDER_RADIUS.md,
  },
  quickEmergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  quickEmergencyText: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textInverse,
    marginLeft: SPACING.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  searchBar: {
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  clearFilter: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  categoryItem: {
    width: '33.33%',
    padding: SPACING.sm,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});

export default HomeScreen;
