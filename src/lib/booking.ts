export const bookingUrl = '/book/'

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
