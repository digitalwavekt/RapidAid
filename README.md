# RapidAid - Offline Emergency First Aid Guide (India)

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0-black)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> A production-ready, offline-first emergency first aid mobile application designed specifically for Indian users. Built with React Native (Expo) to help save lives during critical situations.

## Features

- **Fully Offline** - All content bundled in the app, works without internet
- **Bilingual Support** - English and Hindi language support
- **Voice Guidance** - Step-by-step audio instructions for each emergency
- **Panic Mode** - Simplified UI for high-stress emergency situations
- **Emergency Calling** - One-tap dial to 108, 112, and other Indian emergency numbers
- **Medical Profile** - Offline storage of personal medical information
- **Emergency Contacts** - Manage personal and system emergency contacts
- **High-Contrast UI** - Emergency-optimized design for visibility in panic situations
- **50+ Emergency Scenarios** - Comprehensive coverage of medical, accident, poisoning, and disaster situations

## Tech Stack

- **React Native** (Expo SDK 50)
- **React Navigation** (Stack + Bottom Tabs)
- **AsyncStorage** (Offline data persistence)
- **Expo AV** (Audio playback for voice guidance)
- **Lottie** (Animations)
- **React Native Paper** (UI Components)
- **i18next** (Internationalization)

## Project Structure

```
RapidAid/
├── App.js                          # Main app entry point
├── index.js                        # Expo root registration
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── tsconfig.json                   # TypeScript configuration
│
├── assets/
│   ├── images/                     # App icons and images
│   ├── audio/                      # Pre-recorded voice instructions
│   └── animations/                 # Lottie animation files
│
├── data/
│   ├── emergencies.json            # Complete emergency database
│   ├── emergency_numbers.json      # India emergency numbers
│   ├── translations_en.json        # English translations
│   └── translations_hi.json        # Hindi translations
│
├── screens/
│   ├── HomeScreen.js               # Dashboard with search & categories
│   ├── EmergencyDetailScreen.js    # Emergency info & symptoms
│   ├── StepGuideScreen.js          # Step-by-step guide with audio
│   ├── PanicModeScreen.js          # Simplified panic UI
│   ├── MedicalProfileScreen.js     # Offline medical profile
│   ├── EmergencyContactsScreen.js  # Contact management
│   ├── SettingsScreen.js           # App settings & language
│   ├── DisclaimerScreen.js         # Medical disclaimer
│   ├── AboutScreen.js              # App info & credits
│   └── EmergencyCompleteScreen.js  # Guide completion screen
│
├── components/
│   ├── EmergencyButton.js          # Large emergency call button
│   ├── SeverityBadge.js            # Color-coded severity indicator
│   ├── SearchBar.js                # Debounced search input
│   ├── CategoryCard.js             # Category grid item
│   ├── EmergencyCard.js            # Emergency list item
│   ├── StepCard.js                 # Individual step display
│   ├── DosDonts.js                 # Do's and Don'ts list
│   ├── ProgressBar.js              # Step completion progress
│   ├── FloatingEmergencyButton.js  # Fixed emergency FAB
│   └── EmptyState.js               # Empty state placeholder
│
├── navigation/
│   └── AppNavigator.js             # Root navigation setup
│
├── services/
│   ├── storageService.js           # AsyncStorage wrapper
│   ├── audioService.js             # Expo AV audio manager
│   └── dataService.js              # Local JSON data loader
│
├── context/
│   ├── LanguageContext.js          # Language state management
│   └── AppContext.js               # Global app state
│
├── utils/
│   ├── helpers.js                  # Common utility functions
│   └── constants.js                # App constants
│
└── styles/
    ├── theme.js                    # Design system & colors
    └── globalStyles.js             # Reusable style patterns
```

## Emergency Database Coverage

### Medical Emergencies
- Heart Attack, Cardiac Arrest, Stroke
- Seizure, Fainting, Asthma Attack
- Diabetic Emergency, Anaphylaxis
- High Fever, Heat Stroke, Hypothermia

### Accident & Injury
- Road Accident, Head Injury, Fracture
- Heavy Bleeding, Internal Bleeding
- Spinal Injury, Eye Injury

### Water Emergencies
- Drowning, Water Choking, Near-drowning

### Burn & Chemical
- Fire Burn, Hot Liquid Burn, Electrical Burn
- Acid Attack, Chemical Exposure

### Poisoning & Gas
- Food Poisoning, Alcohol Poisoning, Drug Overdose
- Pesticide Poisoning, Snake Bite, Insect Bite
- Dog Bite, Carbon Monoxide, LPG Gas Leak

### Women & Child
- Pregnancy Emergency, Labor Pain, Miscarriage
- Child Choking, Infant CPR, Dehydration

### Environmental / Rural India
- Snake Bite, Scorpion Sting, Heat Stroke
- Dehydration, Sunburn, Electric Shock
- Well / Borewell Fall

### Disaster / Public Emergency
- Fire Breakout, Building Collapse
- Earthquake Response, Flood Survival
- Crowd Stampede

### Special Cases
- Panic Attack, Suicide Prevention
- Violence Injury, Bleeding Control

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode (for emulators)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rapidaid.git
cd rapidaid

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

### Building for Production

```bash
# Build Android APK
npx expo build:android

# Build iOS IPA
npx expo build:ios

# Or use EAS Build
npx eas build --platform android
npx eas build --platform ios
```

## Adding Audio Files

1. Record or source audio instructions for each step
2. Place files in `assets/audio/` with naming convention: `{emergency_id}_step{number}.mp3`
3. Update the `getAudioSource()` method in `services/audioService.js`

Example:
```
assets/audio/
  heart_attack_step1.mp3
  heart_attack_step2.mp3
  snake_bite_step1.mp3
  ...
```

## Adding Images

1. Add step illustration images to `assets/images/`
2. Reference them in the JSON data files
3. Update image rendering in components as needed

## Customization

### Adding New Emergencies

Edit `data/emergencies.json` and add new emergency objects following the existing schema:

```json
{
  "id": "new-emergency",
  "title": { "en": "English Title", "hi": "Hindi Title" },
  "category": "category-id",
  "severity": "critical|high|medium|low",
  "symptoms": { "en": [], "hi": [] },
  "steps": [
    {
      "stepNo": 1,
      "title": { "en": "", "hi": "" },
      "description": { "en": "", "hi": "" },
      "image": "step1_image",
      "audio": "new_emergency_step1.mp3",
      "duration": 5
    }
  ],
  "dos": { "en": [], "hi": [] },
  "donts": { "en": [], "hi": [] },
  "hospitalTransfer": { "en": "", "hi": "" },
  "emergencyNumber": "108",
  "estimatedTime": "5-10 minutes"
}
```

### Adding New Languages

1. Create `data/translations_{lang}.json`
2. Add language to `utils/constants.js` LANGUAGES
3. Import in `context/LanguageContext.js`

## Architecture Decisions

### Offline-First Design
- All emergency data bundled as JSON
- No API calls required after installation
- AsyncStorage for user preferences and profiles
- Images and audio assets included in app bundle

### Panic-Optimized UI
- Large touch targets (minimum 48x48dp)
- High-contrast emergency colors (red/yellow/white)
- Minimal text, maximum visual cues
- One-tap emergency calling
- Bottom navigation for thumb accessibility

### Audio System
- Expo AV for cross-platform audio
- Auto-play on step navigation
- Pause/replay controls
- Background audio support

## Performance Considerations

- JSON data loaded once at app initialization
- Images lazy-loaded with placeholders
- Audio files loaded on-demand
- Debounced search input
- FlatList for long emergency lists (future optimization)

## Accessibility

- Screen reader labels on all interactive elements
- High contrast ratios for text readability
- Large font sizes for emergency visibility
- Haptic feedback for button presses
- Voice guidance for step instructions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

> This application provides general first aid guidance for educational purposes only. It is NOT a substitute for professional medical care. Always call emergency services (108/112) for serious medical conditions. The developers are not responsible for outcomes of emergency situations.

## Emergency Numbers (India)

| Service | Number |
|---------|--------|
| Ambulance | 108 |
| Emergency | 112 |
| Police | 100 |
| Fire | 101 |
| Women Helpline | 181 |
| Child Helpline | 1098 |
| Suicide Prevention | 9152987821 |
| Disaster Management | 1078 |

---

**Built with ❤️ for India**
