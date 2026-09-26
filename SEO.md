# Search: keywords, pages, and what actually matters

## Read this first

These terms come from inspecting live search results, competitor page titles,
and the language guests use in their own reviews. **They carry no volume
figures**, because I have no access to Keyword Planner, Ahrefs or this
property's Search Console. Treat the list as a hypothesis with the right shape,
and put real numbers against it before spending money on any of it.

Two things matter more than every keyword below, and both are free:

1. **Use the current domain.** The live site is `www.hiranyaguesthouse.com`.
   Update any old citations that point to `hiranyainpatan.com`, and redirect
   that domain if it is recovered.
2. **Google Business Profile.** For a seven-room guest house, the map pack
   outranks the website for almost every local query. Claim the listing, put the
   real photographs on it, and answer reviews. This will send more bookings than
   the whole site in year one.

---

## Who we are competing with

Not Dwarika's. The properties occupying the results for the terms below:

| Property | Positioning it already owns |
|---|---|
| Boutique Heritage Home | "150-year-old traditional Newari house", "family run", "3 minutes from Durbar Square" |
| The Inn Patan | "century-old Newari townhouse", "exposed brick and reclaimed timber" |
| Hotel Patan House | "traditional Newari charm in the heart of Lalitpur" |
| Durbar Guest House | Proximity, and a rooftop terrace over old Patan |

Every one of them says "traditional Newari" and "walk to Durbar Square", and
three of the four say "family run". We cannot win those on wording alone.

Two things are genuinely ours: **Nakabahil and the bell-casting lineage**, and
**a working musician who lives in the house**. The copy leans on both, and it
says *homestay* rather than *family-run*, which is both more accurate and a term
none of the four competitors is using.

---

## Terms, by what the searcher is doing

### Deciding where in Kathmandu to stay

The most valuable traffic, because nobody searching this has picked a hotel yet.

| Term | Where it goes |
|---|---|
| where to stay in Kathmandu | a guide page, honestly written |
| Patan vs Thamel | the same guide, this is a real and repeated forum question |
| best area to stay Kathmandu first time | the same guide |
| is Patan worth staying in | the same guide |

Write one honest page that says Thamel is better for trekking shops and
nightlife and Patan is better for heritage, craft and quiet. Recommending the
competition where it is true is what makes the page rank and what makes it
believed.

### Looking for a bed in Patan

Realistic to win, and high intent.

| Term | Where it goes |
|---|---|
| guest house Patan Nepal | home |
| hotels near Patan Durbar Square | home |
| where to stay in Patan | home and the guide |
| traditional Newari house stay | home |
| boutique heritage hotel Lalitpur | home |
| Patan homestay | home |

### Choosing between two shortlisted rooms

Long tail, low competition, close to booking. Needs one page per room type.

| Term | Where it goes |
|---|---|
| duplex room Patan guest house | /rooms/duplex-apartment |
| twin room shared bathroom Patan | /rooms/twin-shared-bathroom |
| guest house Patan private bathroom | /rooms |
| cheap guest house near Patan Durbar Square | /rooms |

### Questions, asked before booking

These are the ones the Good to know section and the FAQ markup target. They are
also the questions the site previously left unanswered.

- how far is Patan Durbar Square from the airport
- do hotels in Kathmandu have heating
- is there hot water in Kathmandu guest houses
- can you pay by card in Nepal guest houses
- how to get from Kathmandu airport to Patan
- Rato Machhindranath Jatra dates

### Branded

| Term | Note |
|---|---|
| Hiranya Guest House | Currently owned by Booking.com and TripAdvisor. Our own site should outrank them for our own name. |
| Frydays Soul Food Patan | The café has its own small search demand. Give it a page. |
| Nakabahil / Lokakirti Bihar | Tiny volume, near-zero competition, and completely ours. |

---

## Page plan

One long scroll cannot rank for more than one thing. Split it.

| Page | Primary term | Title tag |
|---|---|---|
| `/` | guest house Patan Nepal | Hiranya Guest House — Patan, Nepal |
| `/rooms` | rooms Patan guest house | Rooms — Hiranya Guest House, Patan |
| `/rooms/[slug]` | the room type | Duplex Apartment — Hiranya Guest House |
| `/patan` | where to stay in Patan | Where to Stay in Patan: Patan or Thamel? |
| `/getting-here` | Kathmandu airport to Patan | Getting to Patan from Kathmandu Airport |
| `/good-to-know` | the FAQ questions | Good to Know Before You Book |
| `/whats-on` | Patan festival dates | What's On in Patan |

Only the home page exists today. The rest is the next build.

---

## Technical checklist

- [x] One `h1` per page, and the `h2` set reads as a summary of the page
- [x] `LodgingBusiness` and `FAQPage` structured data, generated from the same content the page shows
- [x] Meta title and description editable in Sanity, with character limits enforced
- [x] Alt text required on every image by the schema, so it cannot be skipped
- [x] `sitemap.xml` and `robots.txt` for the two current pages; update the
      sitemap when adding pages
- [ ] Google Business Profile claimed, with the real photographs
- [ ] If `hiranyainpatan.com` is recovered, redirect old URLs to the current domain
- [ ] Search Console verified, so the guesses above can be replaced with data
- [ ] Nepali translation, once English is settled

Page weight is already the strong point. The site is static, the images are
cropped by Sanity at the size they are displayed, and nothing blocks the first
paint. That matters here more than in most markets: a lot of this audience is
researching on Nepali mobile data or on hotel wifi in Thamel.
