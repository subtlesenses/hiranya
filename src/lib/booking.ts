export const bookingUrl = '/book/'

export function roomKey(room: {title: string; slug?: {current?: string}}): string {
  return room.slug?.current || room.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Room categories cross-checked against Booking.com; Barahi confirmed by the owner.
// Named-room mapping and occupancy retain the existing house inventory.
export const roomTypes: Record<string, string> = {
  Mahalaxmi: 'Duplex apartment', Mahakali: 'Duplex apartment',
  Brahmayani: 'Standard twin room',
  Indrayani: 'Double room with private bathroom',
  Rudrayani: 'Double room with private bathroom',
  Vaishnavi: 'Single room with bathroom',
  Kumari: 'Twin room with shared bathroom',
  Barahi: 'Single room with shared bathroom',
}
