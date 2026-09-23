export const bookingUrl = '/book/?cur=USD'
export const roomIds: Record<string, string> = {
  Mahalaxmi: '733187', Mahakali: '733189', Brahmayani: '733192',
  Indrayani: '733190', Rudrayani: '733191', Vaishnavi: '733429',
  Kumari: '733432', Barahi: '733431',
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
