/**
 * RapidAid - AppNavigator
 * Root navigation with stack and tab configuration
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import EmergencyDetailScreen from '../screens/EmergencyDetailScreen';
import StepGuideScreen from '../screens/StepGuideScreen';
import PanicModeScreen from '../screens/PanicModeScreen';
import MedicalProfileScreen from '../screens/MedicalProfileScreen';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DisclaimerScreen from '../screens/DisclaimerScreen';
import AboutScreen from '../screens/AboutScreen';
import EmergencyCompleteScreen from '../screens/EmergencyCompleteScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Main Tab Navigator
 * Bottom tabs for primary navigation
 */
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: FONTS.sizes.xs,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PanicTab"
        component={PanicModeScreen}
        options={{
          tabBarLabel: 'Emergency',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-octagon" size={24} color={COLORS.emergency} />
          ),
          tabBarActiveTintColor: COLORS.emergency,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={MedicalProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={EmergencyContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 * Handles all screen navigation with modal and stack transitions
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        {/* Main App Flow */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Emergency Screens */}
        <Stack.Screen 
          name="EmergencyDetail" 
          component={EmergencyDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="StepGuide" 
          component={StepGuideScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen 
          name="PanicMode" 
          component={PanicModeScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen 
          name="EmergencyComplete" 
          component={EmergencyCompleteScreen}
          options={{ animation: 'fade' }}
        />

        {/* Settings & Info Screens */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="MedicalProfile" 
          component={MedicalProfileScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="EmergencyContacts" 
          component={EmergencyContactsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="Disclaimer" 
          component={DisclaimerScreen}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
