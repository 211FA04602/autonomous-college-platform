/**
 * All instants from the backend are UTC ISO-8601 strings (see
 * docs/engineering/CONSTITUTION.md rule 8). These helpers convert to the
 * institution/browser display time zone; they must not be used to derive
 * business-calendar logic (academic year, term boundaries, etc.) — that
 * belongs to the backend academic-calendar domain, not the client.
 */

export function formatInstantForDisplay(
  isoUtc: string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
  locale: string = "en-IN",
): string {
  const date = new Date(isoUtc);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO-8601 UTC instant: ${isoUtc}`);
  }
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function nowUtcIso(): string {
  return new Date().toISOString();
}
