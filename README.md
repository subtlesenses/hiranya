# Hiranya Guest House

Astro website with optional Sanity content management and WhatsApp booking enquiries.

## Booking enquiries

Guests choose dates, adult/child counts and a preferred room on `/book/`. The page
opens a prepared message to the WhatsApp number in Sanity settings (or seed content).
Guests review and send the message themselves. The website does not create
reservations, collect payments, or synchronise room inventory.

The host checks availability, agrees rates and cancellation/payment terms, confirms
the booking, and updates any other booking channels manually.

Rooms use their Sanity slug, falling back to a slug made from the room name, for
links such as `/book/?room=barahi`. Dates and guest counts carry into the enquiry.

## Project layout

- `src/pages/index.astro`: homepage and room carousel
- `src/pages/book.astro`: WhatsApp enquiry form
- `src/lib/booking.ts`: room keys and room categories
- `src/scripts/enquiry.js`: carries homepage dates and guests into enquiry links
- `src/lib/seed.ts`: fallback content
- `studio/`: Sanity content schemas

## Development

```bash
npm ci
cp .env.example .env
npm run dev
```

Sanity is optional: without a project configured, the site uses the seed content.
Keep the WhatsApp number current. The owner-confirmed number is +977 984 155 1450.

```bash
npm run build
```

Hosting uses Vercel. Pages are built statically. Configure a Sanity publish webhook
to trigger a new deployment when content changes.

## Content management

Room names, descriptions, photos, house information and the WhatsApp contact are
edited in Sanity. Install the Studio dependencies separately under `studio/`.
The `npm run seed:sanity` command populates a dataset from seed content and local
photos; it overwrites matching documents and should only be run intentionally.

Photography updates are pending. Confirm any unverified amenities and commercial
policies with the owner before changing published content. See `SEO.md` for the
existing search checklist.

## Room photo galleries

Each room has its own ordered `photos` array. In Sanity Studio, open a Room and
add images under Photographs, add descriptive alt text, then drag to reorder.
The first image is the portrait cover; View photos opens only that room's images.
Publish the room and trigger a Vercel rebuild (or use the Sanity publish webhook).
Without Sanity configured, add photos to the matching room in `src/lib/seed.ts`
and place the corresponding files in `public/photos/`. Do not mix rooms or
add placeholder duplicates to increase the photo count.

The gallery supports touch swiping, arrow buttons/keys, Escape to close, and
returns keyboard focus to its opener. Full-size images load only on opening.
