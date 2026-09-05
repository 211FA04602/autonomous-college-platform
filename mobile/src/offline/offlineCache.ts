/**
 * Encrypted local-cache / offline-sync interface (ADR-008, constitution
 * rule 20).
 *
 * ALLOWLIST-ONLY: `put`/`get`/`remove` reject any `dataType` that is not in
 * `CACHEABLE_DATA_TYPES` below. This allowlist starts intentionally small —
 * only what a currently-planned feature explicitly justifies caching.
 *
 * PERMANENTLY EXCLUDED (never add these categories, regardless of future
 * feature pressure — constitution rule 20, ADR-008):
 *   - confidential/unpublished examination question papers
 *   - hidden grading test cases / answer keys
 *   - raw payment/card/bank credentials
 *   - authentication secrets or tokens beyond what `secureStorage` protects
 *   - any data category an institution flags as non-cacheable
 * Widening this allowlist is a deliberate, reviewed change tied to a
 * specific feature — never a generic "cache anything" escape hatch.
 *
 * Backing store: this foundation prompt ships an in-memory stub only. It is
 * NOT a working offline cache — data does not survive an app restart and
 * is not encrypted at rest. TODO (follow-up prompt): wire to a real
 * encrypted on-device store (e.g. an encrypted MMKV/SQLCipher-backed
 * configuration) before any feature relies on data surviving a restart.
 * This is documented rather than silently pretended to work (constitution
 * rule 13).
 */

/** Start deliberately small — extend only alongside a justified feature. */
export type CacheableDataType = 'own_published_timetable';

export const CACHEABLE_DATA_TYPES: readonly CacheableDataType[] = ['own_published_timetable'] as const;

export class DisallowedCacheDataTypeError extends Error {
  constructor(dataType: string) {
    super(
      `offlineCache: '${dataType}' is not on the allowlist and must never be cached on-device. See ADR-008 and docs/engineering/CONSTITUTION.md rule 20.`,
    );
    this.name = 'DisallowedCacheDataTypeError';
  }
}

export interface OfflineCacheEntry<T = unknown> {
  dataType: CacheableDataType;
  key: string;
  value: T;
  /** ISO-8601 UTC instant. */
  cachedAtUtc: string;
}

export interface OfflineCache {
  put<T>(dataType: CacheableDataType, key: string, value: T): Promise<void>;
  get<T>(dataType: CacheableDataType, key: string): Promise<T | null>;
  remove(dataType: CacheableDataType, key: string): Promise<void>;
  clearAll(): Promise<void>;
}

function isAllowlisted(dataType: string): dataType is CacheableDataType {
  return (CACHEABLE_DATA_TYPES as readonly string[]).includes(dataType);
}

function assertAllowlisted(dataType: string): void {
  if (!isAllowlisted(dataType)) {
    throw new DisallowedCacheDataTypeError(dataType);
  }
}

/**
 * In-memory stub implementation — see the module doc comment above for why
 * this is explicitly NOT production-ready offline storage. Safe for tests;
 * must not be assumed durable or encrypted.
 */
export class InMemoryOfflineCache implements OfflineCache {
  private readonly store = new Map<string, OfflineCacheEntry>();

  async put<T>(dataType: CacheableDataType, key: string, value: T): Promise<void> {
    assertAllowlisted(dataType);
    this.store.set(`${dataType}:${key}`, {
      dataType,
      key,
      value,
      cachedAtUtc: new Date().toISOString(),
    });
  }

  async get<T>(dataType: CacheableDataType, key: string): Promise<T | null> {
    assertAllowlisted(dataType);
    const entry = this.store.get(`${dataType}:${key}`);
    return entry ? (entry.value as T) : null;
  }

  async remove(dataType: CacheableDataType, key: string): Promise<void> {
    assertAllowlisted(dataType);
    this.store.delete(`${dataType}:${key}`);
  }

  async clearAll(): Promise<void> {
    this.store.clear();
  }
}

export const offlineCache: OfflineCache = new InMemoryOfflineCache();
