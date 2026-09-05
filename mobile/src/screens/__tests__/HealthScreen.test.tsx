import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { ApiError, fetchSystemHealth } from '@acplatform/api-contracts';
import { HealthScreen } from '../HealthScreen';
import '../../i18n';

jest.mock('@acplatform/api-contracts', () => {
  const actual = jest.requireActual('@acplatform/api-contracts');
  return {
    ...actual,
    fetchSystemHealth: jest.fn(),
  };
});

const mockedFetchSystemHealth = fetchSystemHealth as jest.MockedFunction<typeof fetchSystemHealth>;

describe('HealthScreen', () => {
  beforeEach(() => {
    mockedFetchSystemHealth.mockReset();
  });

  it('shows loading then healthy state on success', async () => {
    mockedFetchSystemHealth.mockResolvedValueOnce({
      status: 'UP',
      version: '1.2.3',
      timestampUtc: '2026-09-05T10:00:00.000Z',
    });

    render(<HealthScreen />);

    expect(screen.getByTestId('health-loading')).toBeTruthy();

    await waitFor(() => expect(screen.getByTestId('health-healthy')).toBeTruthy());
    expect(screen.getByText('1.2.3')).toBeTruthy();
  });

  it('shows loading then error+retry state on failure, and recovers on retry', async () => {
    mockedFetchSystemHealth.mockRejectedValueOnce(
      new ApiError('Request to /system/health failed with status 503', 503, 'corr-1', undefined),
    );

    render(<HealthScreen />);

    expect(screen.getByTestId('health-loading')).toBeTruthy();

    await waitFor(() => expect(screen.getByTestId('health-unavailable')).toBeTruthy());

    mockedFetchSystemHealth.mockResolvedValueOnce({
      status: 'UP',
      version: '1.2.3',
      timestampUtc: '2026-09-05T10:05:00.000Z',
    });

    fireEvent.press(screen.getByTestId('health-retry-button'));

    await waitFor(() => expect(screen.getByTestId('health-healthy')).toBeTruthy());
  });
});
