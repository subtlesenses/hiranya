import {createClient, type SanityClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.SANITY_PROJECT_ID
const dataset = import.meta.env.SANITY_DATASET || 'production'

/**
 * Built lazily and only when configured.
 *
 * `createClient` throws the moment it is called without a projectId, so
 * constructing it at module scope would take the whole site down on a fresh
 * clone — exactly the case the seed content exists to cover.
 */
let client: SanityClient | null = null
let builder: ReturnType<typeof imageUrlBuilder> | null = null

export const isConfigured = Boolean(projectId)

export function sanityClient(): SanityClient | null {
  if (!isConfigured) return null
  if (!client) client = createClient({projectId, dataset, apiVersion: '2026-01-01', useCdn: false})
  return client
}

function urls() {
  if (!builder) {
    const c = sanityClient()
    if (!c) return null
    builder = imageUrlBuilder(c)
  }
  return builder
}

/**
 * Build a cropped URL that respects the hotspot the owner set in the Studio.
 * Passing both width and height is what makes Sanity honour the hotspot; ask
 * for width alone and you get a plain resize with the crop back in the layout's
 * hands, which is exactly the problem we bought Sanity to avoid.
 */
export function crop(source: any, w: number, h: number): string | null {
  const b = urls()
  if (!b || !source?.asset) return null
  return b.image(source).width(w).height(h).fit('crop').auto('format').quality(72).url()
}

/** Preserve the photograph's proportions in the room gallery. */
export function galleryImage(source: any): string | null {
  const b = urls()
  if (!b || !source?.asset) return source?._placeholder ?? null
  return b.image(source).width(1800).fit('max').auto('format').quality(85).url()
}

export function srcset(source: any, ratio: number, widths = [640, 960, 1400, 1900]): string | null {
  if (!urls() || !source?.asset) return null
  return widths.map((w) => `${crop(source, w, Math.round(w / ratio))} ${w}w`).join(', ')
}

export const HOME_QUERY = `{
  "settings": *[_type == "settings"][0],
  "storeys": *[_type == "storey"] | order(order asc),
  "rooms": *[_type == "room" && active == true] | order(order asc),
  "calendar": *[_type == "calendarEntry"] | order(order asc),
  "quotes": *[_type == "quote"] | order(order asc)[0...3],
  "whatsOn": *[_type == "whatsOn" && startDate >= now()] | order(startDate asc)[0...4]
}`
