/**
 * RapidAid - SearchBar Component
 * Emergency search with debounced input
 */

import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';
import { debounce } from '../utils/helpers';

const SearchBar = ({ 
  placeholder = 'Search emergencies...', 
  onSearch,
  value = '',
  style,
}) => {
  const [query, setQuery] = useState(value);

  const debouncedSearch = useCallback(
    debounce((text) => {
      onSearch?.(text);
    }, 300),
    [onSearch]
  );

  const handleChangeText = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons 
        name="magnify" 
        size={22} 
        color={COLORS.textMuted} 
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={query}
        onChangeText={handleChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search emergencies"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <MaterialCommunityIcons 
            name="close-circle" 
            size={20} 
            color={COLORS.textMuted} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});

export default SearchBar;
