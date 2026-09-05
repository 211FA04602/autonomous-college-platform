/**
 * Autonomous College Platform — mobile foundation entry point.
 *
 * Role resolution from an authenticated session is out of scope for this
 * foundation prompt (identity/access ships separately) — a fixed
 * placeholder role demonstrates the role-aware navigation shell end to
 * end. See docs/mobile/ROLE_FEATURE_MATRIX.md and
 * docs/architecture/ADR-007-react-native-architecture.md.
 *
 * @format
 */
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { RoleAwareNavigator } from './src/navigation/RoleAwareNavigator';
import type { Role } from './src/navigation/roles';

const PLACEHOLDER_ROLE: Role = 'student';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RoleAwareNavigator role={PLACEHOLDER_ROLE} />
    </SafeAreaProvider>
  );
}

export default App;
