/**
 * Formatting helpers for percentages and scores.
 */

const FULL = new Intl.NumberFormat("en-US")

/** Format a number with thousands separators: 1234567 -> "1,234,567". */
export function formatFull(value: number): string {
  if (!Number.isFinite(value)) return "0"
  return FULL.format(Math.round(value))
}

/** Format as percentage: 0.856 -> "85.6%". */
export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "0%"
  return `${(value * 100).toFixed(digits)}%`
}

/** Format as percentage without symbol: 0.856 -> "85.6". */
export function formatPercentNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "0"
  return (value * 100).toFixed(digits)
}

/** Round a number to N decimal places. */
export function roundTo(value: number, digits: number): string {
  if (!Number.isFinite(value)) return "0"
  return value.toFixed(digits)
}
