/**
 * The seam between the website and whatever is running the calendar.
 *
 * Nothing outside this file knows the name Beds24. If the owner moves to Smoobu
 * or Little Hotelier in two years, one file in ./providers changes and the site
 * does not notice. That is the whole point of it existing.
 */

export type RoomAvailability = {
  /** Matches `channelRoomId` on the Sanity room document. */
  channelRoomId: string
  /** Cheapest nightly rate across the requested stay, in minor-unit-free NPR. */
  fromPrice: number | null
  currency: string
  /** False when any night of the requested stay is already sold or closed. */
  available: boolean
  /** Nights the guest asked for that are actually free. */
  nightsFree: number
}

export interface AvailabilityProvider {
  name: string
  getAvailability(checkIn: string, checkOut: string): Promise<RoomAvailability[]>
  /** Cheapest open rate over the next 90 days, for the "from NPR ..." line. */
  getLeadPrices(): Promise<RoomAvailability[]>
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = Date.parse(checkIn + 'T00:00:00Z')
  const b = Date.parse(checkOut + 'T00:00:00Z')
  if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return 0
  return Math.round((b - a) / 86400000)
}
