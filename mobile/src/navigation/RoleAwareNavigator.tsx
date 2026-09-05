/**
 * Role-aware navigation shell.
 *
 * IMPORTANT (constitution rule 19; ADR-007): this controls UX visibility
 * ONLY. It is NOT an authorization boundary. Every screen still calls
 * backend APIs that enforce access rules server-side, identically
 * regardless of which client (web, Android, iOS) calls them — a native app
 * can be decompiled/inspected far more easily than a web app's network
 * calls can be hidden, so "the tab isn't shown" is never treated as a
 * security control anywhere in this codebase.
 *
 * A role appearing here is a navigation-shell placeholder, not a claim that
 * its feature screens exist — see docs/mobile/ROLE_FEATURE_MATRIX.md
 * (every role's implementation status is honestly "not implemented" at
 * this foundation stage, per constitution rule 13).
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Role } from './roles';
import { ROLE_LABELS } from './roles';
import { RoleHomeScreen } from '../screens/RoleHomeScreen';
import { HealthScreen } from '../screens/HealthScreen';

type RoleStackParamList = {
  RoleHomeScreen: undefined;
};

const RoleStack = createNativeStackNavigator<RoleStackParamList>();

/** Wraps the per-role placeholder in its own stack so future per-role drill-down screens have somewhere to push to. */
function RoleHomeStack({ role }: { role: Role }) {
  return (
    <RoleStack.Navigator screenOptions={{ title: ROLE_LABELS[role] }}>
      <RoleStack.Screen name="RoleHomeScreen">{() => <RoleHomeScreen role={role} />}</RoleStack.Screen>
    </RoleStack.Navigator>
  );
}

type RootTabParamList = {
  RoleHome: undefined;
  SystemHealth: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RoleAwareNavigator({ role }: { role: Role }) {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="RoleHome" options={{ title: ROLE_LABELS[role] }}>
          {() => <RoleHomeStack role={role} />}
        </Tab.Screen>
        <Tab.Screen name="SystemHealth" component={HealthScreen} options={{ title: 'System status' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
