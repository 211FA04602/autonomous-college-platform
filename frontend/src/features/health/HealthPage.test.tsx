import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("../../api/client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../api/client")>();
  return {
    ...actual,
    getSystemHealth: vi.fn(),
  };
});

import { HealthPage } from "./HealthPage";
import { ApiError, getSystemHealth } from "../../api/client";

const mockedGetSystemHealth = vi.mocked(getSystemHealth);

describe("HealthPage", () => {
  beforeEach(() => {
    mockedGetSystemHealth.mockReset();
  });

  it("shows a loading state while the health check is in flight", () => {
    mockedGetSystemHealth.mockReturnValue(new Promise(() => {}));

    render(<HealthPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows status, version, and last-checked details on success", async () => {
    mockedGetSystemHealth.mockResolvedValue({
      status: "UP",
      version: "1.2.3",
      timestampUtc: "2026-01-01T00:00:00.000Z",
    });

    render(<HealthPage />);

    expect(await screen.findByText("1.2.3")).toBeInTheDocument();
    expect(screen.getByText("UP")).toBeInTheDocument();
  });

  it("shows an error state on failure and recovers after a successful retry", async () => {
    const user = userEvent.setup();
    mockedGetSystemHealth
      .mockRejectedValueOnce(
        new ApiError("Request failed with status 503", 503, "corr-1", {
          title: "Service Unavailable",
          detail: "The backend is temporarily unavailable.",
        }),
      )
      .mockResolvedValueOnce({
        status: "UP",
        version: "9.9.9",
        timestampUtc: "2026-01-01T00:05:00.000Z",
      });

    render(<HealthPage />);

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("The backend is temporarily unavailable.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(await screen.findByText("9.9.9")).toBeInTheDocument();
  });
});
