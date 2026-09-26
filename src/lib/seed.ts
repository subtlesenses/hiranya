/**
 * What the site shows before Sanity is connected, so `npm run dev` works on a
 * fresh clone. It is also the content to import into Sanity on day one.
 *
 * Copy is deliberately literal. A guest reading this is deciding whether to
 * hand over money for a bed in a city they have not been to; atmosphere is
 * worth nothing to them until the practical questions are answered.
 */
const p = (n: string, alt: string, caption?: string) => ({_placeholder: `/photos/${n}.jpg`, alt, caption})

export const seed = {
  settings: {
    name: 'Hiranya Guest House',
    seoTitle: 'Hiranya Guest House — Patan, Nepal',
    metaDescription:
      'An eight-room homestay in a traditional Newari house in Patan, 650m from Patan Durbar Square. A courtyard café, with rooftop access exclusively for Mahakali and Mahalaxmi apartment guests.',
    strapline:
      "An eight-room homestay in a traditional Newari house in Patan, eight minutes' walk from Durbar Square. A café in the courtyard. The roof terrace is accessible only to guests staying in Mahakali and Mahalaxmi.",
    heroPhoto: p('01', 'The carved timber doorway of Hiranya Guest House seen from the lane in Patan'),
    said: 'An <em>eight-room homestay</em> in a traditional Newari house in old Patan.',
    statementHtml:
      '<p>The house is about ninety years old. It was built after the 1934 A.D. earthquake with a very strong structure.</p>' +
      '<p>Six rooms have a private bathroom and two share one. A café on the ground floor serves breakfast from eight in the morning and stays open till eight in the evening.</p>' +
      '<p><strong>Patan Durbar Square is 650 metres away, about eight minutes on foot.</strong> Tribhuvan airport is 3.4 km, roughly 25 minutes by taxi.</p>',
    hostPhoto: p('08', 'Hands playing a sarangi beside a lattice window', 'Third floor'),
    hostBodyHtml:
      '<p>Nakabahil is one of old most quietly extraordinary corners. At its heart stands Lokakriti Mahabihar also known in Newari as Nakabahi, a two-storey red-brick monastery whose history stretches back through the Malla kings, its long facade a familiar landmark to the Vajracharya priests, Shakya artisans, and Dongol families who have called this neighbourhood home for generations.</p>',
      '<p>Every year at Ghatasthapana, the opening of Dashain, Lokakriti Mahabihar comes alive with the Astamatrika dance, a tradition that belongs to this place alone. True to its Buddhist spirit, no violence or sacrifice marks the occasion; only movement, ritual, and the continuity of a culture that has held its ground for centuries.</p>',
    cafeName: "Hiranya Cafe",
    cafeHours: 'Breakfast from 8am, kitchen open until noon',
    cafeBodyHtml:
      '<p>The café is on the ground floor, off the courtyard. Brick walls, carved wooden posts and about eleven tables.</p>' +
      '<p>Coffee and breakfast from 8am, then we serve homemade momo and fresh juices all day. <strong>Open to non-guests as well as guests.</strong></p>',
    cafePhotos: [
      p('07', 'The café at Hiranya Guest House with brick walls and carved wooden posts', "Hiranya Cafe"),
      p('12', 'Nepali breakfast served on brass plates', 'Breakfast from 8am'),
    ],
    neighbourhoodPhotos: [
      p('11', 'Nakabahil courtyard in Patan with a stone chaitya', 'Nakabahil, Lokakirti Bihar'),
      p('10', 'An old bronze temple bell in a Patan courtyard', 'Bell metal'),
      p('09', 'A carved tikijhya lattice window in a brick wall in Patan', 'तिकिझ्या tikijhya'),
      p('02', 'The brick courtyard of the guest house seen from the doorway', '650m to Durbar Square'),
    ],
    goodToKnow: [
      {label: 'Getting here', value: 'Tribhuvan airport is 3.4 km, about 25 minutes by taxi. Airport pickup can be arranged on request.'},
      {label: 'Wifi', value: 'Free throughout the house, around 300 Mbps. It is slower on the top floor.'},
      {label: 'Bathrooms', value: 'Six rooms have their own. Two share one bathroom between them. Hot showers powered by the Sun, towels and toiletries in every room.'},
      {label: 'Heating', value: 'No central heating, as in most houses in the valley. Extra blankets always, and a room heater on request from November to February.'},
      {label: 'Stairs', value: 'Four floors and no lift. The staircases are steep and narrow, which is normal in a house of this age.'},
      {label: 'Breakfast', value: 'Served in the café from 8am. Nepali or continental.'},
      {label: 'Paying', value: 'Cash in Nepali rupees/Card/QR payment on arrival. There are ATMs on the way to Durbar Square.'},
      {label: 'Luggage', value: 'Bags can be left before check-in and after check-out at no charge.'},
      {label: 'Laundry', value: 'Available on request, charged by the load.'},
      {label: 'Languages', value: 'English, Nepali, Chinese, Newari and Hindi.'},
    ],
    houseRules: [
      {label: 'Check in', value: '1pm to 9pm. Please give an arrival time in advance.'},
      {label: 'Check out', value: 'By 12:30pm'},
      {label: 'The gate', value: 'Locked 11pm to 6am. Late arrivals are fine if the house knows beforehand.'},
      {label: 'Quiet hours', value: '10pm to 6am. Sound carries through the timber floors.'},
      {label: 'Paying', value: 'Cash/Card/QR payment on arrival. Photo ID and a card are needed at check-in.'},
      {label: 'Pets', value: 'Welcome at no charge. Please ask before you book.'},
      {label: 'Children', value: 'All ages welcome. No cots or extra beds available.'},
      {label: 'Parties', value: 'Not allowed. Minimum check-in age is 18.'},
    ],
    address: 'Nakabahil, Lalitpur 44700, Nepal',
    // Digits only, country code first. Confirmed by the owner, 11 Sep 2026.
    whatsapp: '9779841551450',
    bookingNote: 'Booking direct is cheaper than a booking site and it is the only way to request a specific room.',
  },

  storeys: [
    {order: 1, nepali: 'छेली', roman: 'chheli', label: 'Arrive', photo: p('02', 'The brick courtyard of the guest house in early morning light', 'The courtyard'), floorName: 'ground floor', linkLabel: 'Staying in Patan', linkHref: '#patan',
      bodyHtml: '<p>The entrance is off a narrow lane, into a brick courtyard that is open to the sky. The café tables are here.</p><p>Free parking in the lane, and covered bicycle parking. <strong>Patan Durbar Square is 650 metres away, about eight minutes on foot.</strong></p>'},
    {order: 2, nepali: 'मातं', roman: 'mātan', label: 'Rooms', photo: p('04', 'A guest room with original beams and a carved lattice window', 'Double, private bathroom'), floorName: 'first floor', linkLabel: 'See the eight rooms', linkHref: '#rooms',
      bodyHtml: '<p>Eight rooms across three floors. Original beams overhead, lime-plastered walls and terracotta tile underfoot. Every room has a desk, a shower, towels and toiletries.</p><p>Six rooms have a private bathroom. Two duplex rooms have their own internal stair. <strong>Windows are small and set deep in thick walls,</strong> so the rooms stay cool in summer and dim in the afternoon.</p>'},
    {order: 3, nepali: 'छ्वत', roman: 'chvata', label: 'The Host', photo: p('08', 'Hands playing a sarangi in a dark room', 'Sarangi, third floor'), floorName: 'second floor', linkLabel: 'More about the house', linkHref: '#the-host',
      bodyHtml: '<p>Traditionally the shrine floor. Now the common area for guests.</p><p>There is usually music and gatherings here in the evening, and guests are welcome to come up and enjoy. <strong>Ask when booking to find out what is on during your dates.</strong></p>'},
    {order: 4, nepali: 'बैगः', roman: 'baiga', label: 'Eat', photo: p('12', 'Nepali breakfast on brass plates', 'Breakfast from 8am'), floorName: 'attic', linkLabel: 'About the café', linkHref: '#eat',
      bodyHtml: "<p>In a Newari house the kitchen sits at the top, under the roof. This one still does.</p><p>Guests eat downstairs in the courtyard at <strong>Hiranya Cafe</strong>. Breakfast from 8am, Nepali, Newari and international dishes until noon. Non-guests can walk in.</p>"},
    {order: 5, nepali: 'कौसी', roman: 'kausi', label: 'The Roof', photo: p('03', 'The roof terrace looking over Patan to the Himalaya', 'Roof terrace'), floorName: 'roof', linkLabel: 'Rates and dates', linkHref: '#book',
      bodyHtml: '<p>A brick terrace with tables and chairs, accessible only to guests staying in the Mahakali and Mahalaxmi apartments. It looks out over the tiled roofs of Patan.</p><p><strong>Between October and February you can usually see the Himalaya from here in the morning.</strong> The rest of the year it is hazy by mid-morning.</p>'},
  ],

  rooms: [
    {order: 1, title: 'Mahalaxmi', beds: '1 full bed', sleeps: 2, bathroom: 'private', summary: 'Two floors joined by a steep internal stair. Double bed upstairs, sitting area below. Includes rooftop access.', photos: [p('06', 'Duplex apartment with a narrow timber stair')]},
    {order: 2, title: 'Mahakali', beds: '1 full bed', sleeps: 2, bathroom: 'private', summary: 'The same layout, facing the courtyard through a carved lattice window. Includes rooftop access.', photos: [p('04', 'Duplex apartment facing the courtyard')]},
    {order: 3, title: 'Brahmayani', beds: '2 twin beds', sleeps: 2, bathroom: 'private', summary: 'Second floor, under the painted roof beams. Two single beds and a deep-set window.', photos: [p('05', 'Twin room under whitewashed roof beams')]},
    {order: 4, title: 'Indrayani', beds: '1 full bed', sleeps: 2, bathroom: 'private', summary: 'Original beams, lime-plastered walls, terracotta floor. Double bed, desk and wardrobe.', photos: [p('17', 'Double room with private bathroom')]},
    {order: 5, title: 'Rudrayani', beds: '1 full bed', sleeps: 2, bathroom: 'private', summary: 'The same size, on the darker side of the house. The quietest room in the afternoon.', photos: [p('13', 'Second double room with private bathroom')]},
    {order: 6, title: 'Vaishnavi', beds: '1 full bed', sleeps: 1, bathroom: 'private', summary: 'Smaller room. Original beams, lime-plastered walls, terracotta floor. Double bed, desk and wardrobe.', photos: [p('14', 'Third small room with private bathroom')]},
    {order: 7, title: 'Kumari', beds: '2 twin beds', sleeps: 2, bathroom: 'shared', summary: 'Two single beds. The bathroom is shared with one other room on the same floor.', photos: [p('15', 'Twin room with shared bathroom')]},
    {order: 8, title: 'Barahi', beds: '1 single bed', sleeps: 1, bathroom: 'shared', summary: 'A single room with one single bed and a shared bathroom.', photos: [p('16', 'Single room with shared bathroom')]},
  ],

  calendar: [
    {months: 'Nov — Feb', title: 'Clearest mountain views', note: 'The clearest views of the year from the roof, accessible only to Mahakali and Mahalaxmi guests. Nights are cold and Nepali houses are not centrally heated, so bring warm clothes.'},
    {months: 'Feb — Mar', title: 'Holi and Shivaratri', note: 'Two of the busiest days in the streets around the house. Expect noise during the day.'},
    {months: 'Apr — May', title: 'Rato Machhindranath Jatra', note: "Patan's biggest festival and the longest chariot festival in Nepal. A tall wooden chariot is pulled through the streets over several weeks. Rooms fill early."},
    {months: 'Jun — Aug', title: 'Monsoon', note: 'The low season, and the cheapest time to stay. Rain falls mostly at night. Mountain views are rare.'},
    {months: 'Aug — Sep', title: 'Krishna Janmashtami', note: 'Krishna Mandir, the stone temple of 1637 on Durbar Square, stays open and lit all night. Ten minutes on foot.'},
    {months: 'Oct — Nov', title: 'Dashain, Tihar, Kartik Naach', note: "Nepal's main holidays, plus weeks of masked dance in Durbar Square. Busy, and the best weather of the year."},
  ],

  quotes: [
    {text: 'Amazing guest house in the middle of Patan. Very cute and traditional Patan house, hidden from the road in a little courtyard with a café on the ground floor.', name: 'Laura', country: 'France'},
    {text: 'Beautiful old building; great ambiance. Everyone was extremely friendly. Fabulous location in the beautiful historic district of Patan.', name: 'Anahita', country: 'United States'},
    {text: 'The staff are really nice, new opportunities to meet new people and experience all types of cultures in Nepal. I felt at home and welcomed.', name: 'Supravab', country: 'Nepal'},
  ],

  whatsOn: [] as any[],
}
