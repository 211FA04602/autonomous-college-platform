import {
  CACHEABLE_DATA_TYPES,
  DisallowedCacheDataTypeError,
  InMemoryOfflineCache,
  type CacheableDataType,
} from '../offlineCache';

describe('offline cache allowlist (constitution rule 20 / ADR-008)', () => {
  let cache: InMemoryOfflineCache;

  beforeEach(() => {
    cache = new InMemoryOfflineCache();
  });

  it('accepts an allowlisted data type', async () => {
    await cache.put('own_published_timetable', 'student-1', { periods: [] });
    await expect(cache.get('own_published_timetable', 'student-1')).resolves.toEqual({ periods: [] });
  });

  it.each([
    'confidential_question_paper',
    'hidden_grading_test_case',
    'raw_payment_card_number',
    'auth_refresh_token',
  ])('rejects a non-allowlisted data type: %s', async (disallowed) => {
    // Cast bypasses compile-time protection to prove the RUNTIME guard also
    // rejects it — callers must never be able to widen the allowlist simply
    // by asserting past the type system.
    const dataType = disallowed as CacheableDataType;
    await expect(cache.put(dataType, 'k', 'v')).rejects.toThrow(DisallowedCacheDataTypeError);
    await expect(cache.get(dataType, 'k')).rejects.toThrow(DisallowedCacheDataTypeError);
    await expect(cache.remove(dataType, 'k')).rejects.toThrow(DisallowedCacheDataTypeError);
  });

  it('never allowlists confidential exam/payment/secret categories', () => {
    const forbidden = [
      'question_paper',
      'grading_test',
      'payment_card',
      'bank_account',
      'secret',
      'token',
    ];
    for (const term of forbidden) {
      expect(CACHEABLE_DATA_TYPES.some((allowed) => allowed.includes(term))).toBe(false);
    }
  });
});
