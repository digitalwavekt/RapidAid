/**
 * RapidAid - App Context
 * Global app state management
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../services/storageService';
import DataService from '../services/dataService';
import AudioService from '../services/audioService';
import { DEFAULT_SETTINGS } from '../utils/constants';

const AppContext = createContext({
  isLoading: true,
  isFirstLaunch: true,
  disclaimerAccepted: false,
  settings: DEFAULT_SETTINGS,
  medicalProfile: {},
  emergencyContacts: [],
  setSettings: () => {},
  setMedicalProfile: () => {},
  setEmergencyContacts: () => {},
  acceptDisclaimer: () => {},
  completeFirstLaunch: () => {},
});

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);
  const [medicalProfile, setMedicalProfileState] = useState({});
  const [emergencyContacts, setEmergencyContactsState] = useState([]);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize services
      await DataService.initialize();
      await AudioService.initialize();

      // Load persisted data
      const [firstLaunch, disclaimer, savedSettings, profile, contacts] = 
        await Promise.all([
          StorageService.isFirstLaunch(),
          StorageService.isDisclaimerAccepted(),
          StorageService.getSettings(),
          StorageService.getMedicalProfile(),
          StorageService.getEmergencyContacts(),
        ]);

      setIsFirstLaunch(firstLaunch);
      setDisclaimerAccepted(disclaimer);
      setSettingsState({ ...DEFAULT_SETTINGS, ...savedSettings });
      setMedicalProfileState(profile);
      setEmergencyContactsState(contacts);
    } catch (error) {
      console.error('App initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    await StorageService.saveSettings(updated);
  };

  const setMedicalProfile = async (profile) => {
    setMedicalProfileState(profile);
    await StorageService.saveMedicalProfile(profile);
  };

  const setEmergencyContacts = async (contacts) => {
    setEmergencyContactsState(contacts);
    await StorageService.saveEmergencyContacts(contacts);
  };

  const acceptDisclaimer = async () => {
    setDisclaimerAccepted(true);
    await StorageService.setDisclaimerAccepted(true);
  };

  const completeFirstLaunch = async () => {
    setIsFirstLaunch(false);
    await StorageService.setFirstLaunchComplete();
  };

  const value = {
    isLoading,
    isFirstLaunch,
    disclaimerAccepted,
    settings,
    medicalProfile,
    emergencyContacts,
    setSettings,
    setMedicalProfile,
    setEmergencyContacts,
    acceptDisclaimer,
    completeFirstLaunch,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
