/** Escape editor text before allowing the one emphasis tag documented in the Studio. */
export function emphasisHtml(value: unknown): string {
  if (typeof value !== 'string') return ''
  const escaped = value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!)

  // Only the exact, attribute-free <em> and </em> spellings become markup.
  // Encoded input stays encoded, so an editor cannot smuggle a tag via entities.
  return escaped.replace(/&lt;(\/?em)&gt;/g, '<$1>')
}

/** Only site-local references and explicit HTTPS links may leave editor-controlled fields. */
export function safeLinkHref(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const href = value.trim()
  if (!href || /[\u0000-\u0020\u007f-\u009f\\]/.test(href)) return null
  if (href.startsWith('#')) return href
  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (!/^https:\/\//i.test(href)) return null

  try {
    const url = new URL(href)
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) return null
    return url.href
  } catch {
    return null
  }
}

/** Reviews currently have a platform label, not a URL field, so link only known sources. */
export function reviewSourceHref(source: unknown): string | null {
  switch (source) {
    case 'Airbnb': return safeLinkHref('https://www.airbnb.com/rooms/23432174')
    case 'Booking.com': return safeLinkHref('https://www.booking.com/hotel/np/hiranya-guest-house.html#tab-reviews')
    default: return null
  }
}

/** JSON in an HTML script element must not contain a literal closing-script delimiter. */
export function serializeJsonLd(value: unknown): string {
  return (JSON.stringify(value) ?? 'null').replace(/[<>&\u2028\u2029]/g, (character) => ({
    '<': '\\u003c', '>': '\\u003e', '&': '\\u0026', '\u2028': '\\u2028', '\u2029': '\\u2029',
  })[character]!)
}
