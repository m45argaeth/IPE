/**
 * Share / copy helpers for the Internet Packet Explorer.
 */

/** Encode a message for use in a URL hash. */
export function encodeShareMessage(message: string): string {
  return encodeURIComponent(message.trim())
}

/** Decode a message from a URL hash. */
export function decodeShareMessage(hash: string): string | null {
  try {
    const decoded = decodeURIComponent(hash.replace(/^#/, "").trim())
    return decoded || null
  } catch {
    return null
  }
}

/** Copy text to clipboard, returning success boolean. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Build a share URL for a specific message. */
export function buildShareUrl(message: string): string {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}/playground#${encodeShareMessage(message)}`
}
