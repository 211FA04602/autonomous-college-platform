/**
 * Health vertical slice — the one real (non-placeholder) route in this
 * foundation prompt. Uses the same `fetchSystemHealth` contract as the web
 * client (constitution rule 19: mobile and web call identical backend
 * contracts) via the Android/iOS-aware base URL helper.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ApiError, fetchSystemHealth } from '@acplatform/api-contracts';
import { formatInstantForDisplay } from '@acplatform/shared-utils';
import { color, spacing, typography } from '@acplatform/design-tokens';
import { getApiBaseUrl } from '../api/getApiBaseUrl';

type HealthState =
  | { kind: 'loading' }
  | { kind: 'healthy'; version: string; timestampUtc: string }
  | { kind: 'unavailable'; message: string };

export function HealthScreen() {
  const { t } = useTranslation(['systemHealth', 'common']);
  const [state, setState] = useState<HealthState>({ kind: 'loading' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const result = await fetchSystemHealth({ baseUrl: getApiBaseUrl() });
      setState({ kind: 'healthy', version: result.version, timestampUtc: result.timestampUtc });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : t('common:state.error.title');
      setState({ kind: 'unavailable', message });
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container} testID="health-screen">
      <Text style={styles.title}>{t('systemHealth:health.title')}</Text>

      {state.kind === 'loading' && (
        <View testID="health-loading" style={styles.stateBlock}>
          <ActivityIndicator />
          <Text style={styles.bodyText}>{t('systemHealth:health.status.checking')}</Text>
        </View>
      )}

      {state.kind === 'healthy' && (
        <View testID="health-healthy" style={styles.stateBlock}>
          <Text style={[styles.bodyText, styles.healthyText]}>
            {t('systemHealth:health.status.healthy')}
          </Text>
          <Text style={styles.bodyText}>
            {t('systemHealth:health.lastChecked', {
              time: formatInstantForDisplay(state.timestampUtc),
            })}
          </Text>
          <Text style={styles.metaText}>{state.version}</Text>
        </View>
      )}

      {state.kind === 'unavailable' && (
        <View testID="health-unavailable" style={styles.stateBlock}>
          <Text style={[styles.bodyText, styles.errorText]}>
            {t('systemHealth:health.status.unavailable')}
          </Text>
          <Text style={styles.metaText}>{state.message}</Text>
          <Button
            testID="health-retry-button"
            title={t('common:action.retry')}
            onPress={() => load()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.lg,
  },
  stateBlock: {
    gap: spacing.sm,
  },
  bodyText: {
    fontSize: typography.size.md,
    color: color.neutral[800],
  },
  metaText: {
    fontSize: typography.size.sm,
    color: color.neutral[500],
  },
  healthyText: {
    color: color.semantic.success,
    fontWeight: typography.weight.semibold,
  },
  errorText: {
    color: color.semantic.danger,
    fontWeight: typography.weight.semibold,
  },
});
