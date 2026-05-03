/**
 * RapidAid - Main App Entry Point
 * Offline Emergency First Aid Guide for India
 * 
 * @version 1.0.0
 * @author RapidAid Team
 */

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

// Context Providers
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';

// Navigation
import AppNavigator from './navigation/AppNavigator';

// Theme
import { COLORS } from './styles/theme';

// Ignore specific warnings for cleaner console
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed from React Native',
]);

/**
 * RapidAid App Component
 * Wraps the entire application with necessary providers
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <LanguageProvider>
          <AppProvider>
            <StatusBar 
              backgroundColor={COLORS.emergency} 
              barStyle="light-content" 
            />
            <AppNavigator />
          </AppProvider>
        </LanguageProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
