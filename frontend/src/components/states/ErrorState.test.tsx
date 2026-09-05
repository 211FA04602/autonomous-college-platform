import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders as an alert and invokes onRetry when the retry button is activated", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorState message="Could not reach the server." onRetry={onRetry} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Could not reach the server.")).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry/i });
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders no retry button when onRetry is not supplied", () => {
    render(<ErrorState message="No retry here." />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
