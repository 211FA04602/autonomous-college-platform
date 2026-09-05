/**
 * Generic per-role placeholder screen. This is intentionally NOT a real
 * feature screen — every role renders the same "coming soon" shell until a
 * concrete feature is designed and built for it. See
 * docs/mobile/ROLE_FEATURE_MATRIX.md for the honest per-role status
 * (constitution rule 13: no role may be reported as complete here).
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color, spacing, typography } from '@acplatform/design-tokens';
import type { Role } from '../navigation/roles';
import { ROLE_LABELS } from '../navigation/roles';

export function RoleHomeScreen({ role }: { role: Role }) {
  return (
    <View style={styles.container} testID="role-home-screen">
      <Text style={styles.title}>{ROLE_LABELS[role]}</Text>
      <Text style={styles.subtitle}>{ROLE_LABELS[role]} — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.size.md,
    color: color.neutral[600],
  },
});
