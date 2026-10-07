export const bookingUrl = '/book/'

// Booking.com Basic Room rates in USD, verified in the extranet on 7 October 2026.
// This is a manual snapshot, not a live rate or availability connection.
export const roomRates: Record<string, number> = {
  mahalaxmi: 38, mahakali: 38, brahmayani: 29,
  indrayani: 26, rudrayani: 26, vaishnavi: 23, kumari: 23, barahi: 15,
}

export function nightlyRate(key: string): string | null {
  const rate = roomRates[key]
  return typeof rate === 'number' && Number.isFinite(rate) && rate > 0
    ? 'USD ' + rate.toLocaleString('en-US', {maximumFractionDigits: 2}) + ' / night'
    : null
}

export function roomKey(room: {title: string; slug?: {current?: string}}): string {
  return room.slug?.current || room.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Guest-facing room categories reflect the owner-confirmed bed and bathroom setup.
export const roomTypes: Record<string, string> = {
  Mahalaxmi: 'Duplex apartment', Mahakali: 'Duplex apartment',
  Brahmayani: 'Twin room with private bathroom',
  Indrayani: 'Double room with private bathroom',
  Rudrayani: 'Double room with private bathroom',
  Vaishnavi: 'Single room with private bathroom',
  Kumari: 'Room with shared bathroom',
  Barahi: 'Single room with shared bathroom',
}
