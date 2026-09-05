/**
 * Shared design tokens for the Autonomous College Platform.
 * Consumed by `frontend` (web) and `mobile` (React Native) so both surfaces
 * render a visually consistent, accessible product. Values here are the
 * initial foundation palette — extend, do not fork, per institution.
 */

export const color = {
  brand: {
    50: "#eef4ff",
    100: "#d9e6ff",
    200: "#b3ccff",
    300: "#84acf7",
    400: "#5586e6",
    500: "#2f63c9", // primary brand color — WCAG AA on white for text >= 14px bold / 18px regular
    600: "#234d9e",
    700: "#1a3a78",
    800: "#142c5c",
    900: "#0f2246",
  },
  neutral: {
    0: "#ffffff",
    50: "#f7f8fa",
    100: "#eef0f3",
    200: "#dde1e7",
    300: "#c3c9d1",
    400: "#9aa2ad",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  semantic: {
    success: "#1e7a3c",
    warning: "#8a5a00",
    danger: "#b3261e",
    info: "#0b5fae",
  },
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    base: "System",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

/** Minimum recommended touch target (WCAG 2.5.8 / platform HIG baseline). */
export const minTouchTargetPx = 44;

export type ColorTokens = typeof color;
export type SpacingTokens = typeof spacing;
