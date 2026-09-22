import type {AvailabilityProvider, RoomAvailability} from '../availability'
import {nightsBetween} from '../availability'

/**
 * Beds24 API v2.
 *
 * Prefer a read-only long-life BEDS24_API_TOKEN on the server. Existing
 * refresh-token installations remain supported as a fallback.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * BEFORE PRODUCTION: the parsing in `normalise()` is written to the published
 * v2 schema but has NOT been checked against a live Hiranya account. Run
 * `npm run beds24:probe` once the account exists, look at the real payload, and
 * correct `normalise()` if the field names differ. Nothing else in the codebase
 * needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE = 'https://beds24.com/api/v2'

let cachedToken: {value: string; expires: number} | null = null

async function accessToken(): Promise<string> {
  const longLife = (process.env.BEDS24_API_TOKEN ?? import.meta.env.BEDS24_API_TOKEN)?.trim()
  if (longLife) return longLife

  if (cachedToken && cachedToken.expires > Date.now() + 60_000) return cachedToken.value

  const refresh = (process.env.BEDS24_REFRESH_TOKEN ?? import.meta.env.BEDS24_REFRESH_TOKEN)?.trim()
  if (!refresh) throw new Error('Beds24 API credentials are not configured')

  const res = await fetch(`${BASE}/authentication/token`, {headers: {refreshToken: refresh}})
  if (!res.ok) throw new Error(`Beds24 auth failed: ${res.status}`)

  const json = await res.json()
  const ttl = (json.expiresIn ?? 86400) * 1000
  cachedToken = {value: json.token, expires: Date.now() + ttl}
  return cachedToken.value
}

async function get(path: string, params: Record<string, string>) {
  const token = await accessToken()
  const url = new URL(BASE + path)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url, {headers: {token, accept: 'application/json'}})
  if (!res.ok) throw new Error(`Beds24 ${path} failed: ${res.status}`)
  return res.json()
}

/** The one function to correct after looking at a real response. */
function normalise(payload: any, nights: number): RoomAvailability[] {
  const rows: any[] = payload?.data ?? []
  return rows.map((row) => {
    const days: any[] = Object.values(row.calendar ?? row.days ?? {})
    const openDays = days.filter((d) => Number(d.numAvail ?? d.available ?? 0) > 0)
    const prices = openDays.map((d) => Number(d.price1 ?? d.price ?? NaN)).filter((n) => Number.isFinite(n) && n > 0)
    return {
      channelRoomId: String(row.roomId ?? row.id),
      fromPrice: prices.length ? Math.min(...prices) : null,
      currency: payload?.currency ?? 'NPR',
      available: nights > 0 && openDays.length >= nights,
      nightsFree: openDays.length,
    }
  })
}

function isoDaysFromNow(days: number) {
  return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10)
}

export const beds24: AvailabilityProvider = {
  name: 'beds24',

  async getAvailability(checkIn, checkOut) {
    const nights = nightsBetween(checkIn, checkOut)
    if (!nights) return []
    const payload = await get('/inventory/rooms/calendar', {
      propertyId: process.env.BEDS24_PROPERTY_ID ?? import.meta.env.BEDS24_PROPERTY_ID,
      startDate: checkIn,
      endDate: checkOut,
      includeNumAvail: 'true',
      includePrices: 'true',
    })
    return normalise(payload, nights)
  },

  async getLeadPrices() {
    const payload = await get('/inventory/rooms/calendar', {
      propertyId: process.env.BEDS24_PROPERTY_ID ?? import.meta.env.BEDS24_PROPERTY_ID,
      startDate: isoDaysFromNow(1),
      endDate: isoDaysFromNow(90),
      includeNumAvail: 'true',
      includePrices: 'true',
    })
    return normalise(payload, 1)
  },
}
