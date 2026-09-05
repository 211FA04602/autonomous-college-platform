import { describe, expect, it } from "vitest";
import { formatInstantForDisplay, nowUtcIso } from "./datetime";

describe("datetime", () => {
  it("formats a UTC instant in a given time zone", () => {
    const formatted = formatInstantForDisplay("2026-01-15T10:30:00.000Z", "Asia/Kolkata", "en-IN");
    expect(formatted).toContain("2026");
  });

  it("throws on an invalid instant", () => {
    expect(() => formatInstantForDisplay("not-a-date")).toThrow();
  });

  it("produces a parseable current UTC instant", () => {
    expect(Number.isNaN(new Date(nowUtcIso()).getTime())).toBe(false);
  });
});
