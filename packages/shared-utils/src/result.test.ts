import { describe, expect, it } from "vitest";
import { err, ok } from "./result";

describe("Result", () => {
  it("wraps a success value", () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe(42);
  });

  it("wraps an error value", () => {
    const result = err(new Error("boom"));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toBe("boom");
  });
});
