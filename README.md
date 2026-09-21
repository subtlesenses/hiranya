# Hiranya Guest House

Astro site, Sanity Studio, and one channel manager holding the calendar.

```
hiranya/
  src/pages/index.astro          the page
  src/pages/api/availability.json.ts   the only non-static route
  src/lib/availability.ts        the seam: swap channel managers here
  src/lib/providers/beds24.ts    the implementation
  src/lib/seed.ts                content before Sanity is connected
  studio/                        Sanity Studio
```

---

## The calendar

Three places can sell the same bed: Airbnb, Booking.com, and this site. Whatever
we build, **exactly one system must own the calendar**, and it is not this repo.

### Do not use iCal

Airbnb and Booking.com both offer iCal calendar links, and this is where small
properties get hurt. iCal is a file that each platform re-reads on its own
schedule, typically every few hours. In that window two guests can book the same
room on two platforms, and you find out at check-in. iCal is also one-way per
link and carries no prices, so rates still have to be typed in three times.

For a seven-room property in a city where a double-booking means physically
turning someone away at eleven at night, iCal is not good enough.

### Use a channel manager with real API connections

**Recommendation: Beds24.**

| | |
|---|---|
| Cost | from about €8.40/month at this size |
| Airbnb | API connection, not iCal |
| Booking.com | API connection, not iCal |
| Room-type model | Yes — matters, because this is a hotel with seven room types, not seven whole-home listings |
| Public API | Yes, documented v2, which is what lets this site show real availability in its own design instead of an embedded widget |

The last row is the one that decides it. Most channel managers will happily sync
your calendar and then hand you an iframe booking widget that looks nothing like
the site. Beds24 exposes the data, so the room cards and the rate table on this
page are real numbers rendered in our own type.

**If the owner finds Beds24 too technical**, swap to Smoobu — about €23/month,
a much better phone app, same API idea. That is a change to one file,
`src/lib/providers/`, because nothing else in the codebase knows the name
Beds24. Little Hotelier is the third option if the site ever grows into a small
hotel operation.

### How it fits together

```
Airbnb ─┐
        ├──► Beds24 (owns the calendar) ──► /api/availability.json ──► the page
Booking─┘                ▲
                         │
             direct bookings from this site
```

- Beds24 holds availability and rates. Every channel writes to it and reads from it.
- The site **never stores a price**. There is no price field in Sanity, on purpose.
  A price typed in two systems is a price that will disagree with itself inside a month.
- `/api/availability.json` is the single server route. It caches for five
  minutes, so a room sold on Airbnb this morning is gone from the site before lunch.
- If Beds24 is unreachable, the price line hides itself and the page keeps working.
  A calendar outage must never take the website down.

### Payments

Stripe is still not properly available in Nepal, so a card-on-file checkout is
not a realistic day-one goal. The honest flow:

- **International guests** — book direct, card taken as a guarantee through
  Beds24's own gateway, balance paid in cash or by card on arrival. This is what
  the current Booking.com listing already does.
- **Nepali guests** — a deposit through eSewa, Khalti or Fonepay, which is what
  people here actually use.

Do not build a custom checkout. The channel manager's hosted payment page is
boring, works, and keeps card data out of this repo entirely.

---

## Who edits what

The owner edits alone, from a phone. That constraint shaped the Studio.

| They change | Where | How often |
|---|---|---|
| What's on — music, workshops | Sanity, top of the list | weekly |
| Photographs | Sanity, with a hotspot they set once | monthly |
| Room descriptions | Sanity | rarely |
| The story, house rules | Sanity | rarely |
| **Prices and free nights** | **Beds24, never Sanity** | daily, automatically |

Sanity's hotspot tool is the reason it was chosen over a free git-based CMS like
Sveltia. This layout crops hard — the same photograph appears as a 3:4 room card
and as a 16:9 full-bleed panel. The owner clicks the part of the picture that
must stay in frame, once, and every crop on the site obeys it. Without that,
uploading a photo means guessing, and fixing it means calling a developer.

---

## Setup

```bash
# 1. content
cd studio && npm install && npx sanity init --project <id> && npm run dev
```

```bash
# 2. site
npm install && cp .env.example .env   # fill in the values
npm run dev
```

The site builds and runs with no Sanity project at all — it falls back to
`src/lib/seed.ts` and the placeholder photographs in `public/photos`. Wire
Sanity up when the real content exists.

```bash
# 3. confirm the Beds24 payload before trusting it
BEDS24_REFRESH_TOKEN=... BEDS24_PROPERTY_ID=... node scripts/beds24-probe.mjs
```

Read the output and correct `normalise()` in `src/lib/providers/beds24.ts` if
the field names differ. This is written to the published v2 schema but has not
been checked against a live Hiranya account.

**Rebuild on publish.** Add a webhook in Sanity pointing at the host's deploy
hook so the owner's edits appear without anyone running a command.

---

## To confirm with the owner

The Good to know section is the most useful part of the site for a guest and the
least verified. Every line below is written as a recommendation, not a fact, and
needs checking before launch:

- Heating. Is there a room heater available in winter, and is it charged for?
- Hot water. Solar, gas or electric, and is it reliable in the morning?
- Breakfast. Included in the rate, or paid separately?
- Airport pickup. Offered, and at what price?
- Luggage storage and laundry. Offered, and charged?
- Vegetarian food in the café.
- Whether Frydays' Soul Food is the family's or a tenant's.
- Which rooms share which bathroom.
- The host's name and instrument.
- ~~The WhatsApp number~~ — confirmed as +977 984 155 1450 and set in the seed.
  Note that a web search returns +977 9841229992 for this property; that number
  belongs to Hira Guest House, a different place. Do not use it.

## Still outstanding

- Photography is generated placeholder imagery, not the house. Budget a
  photographer before launch; the design depends on it more than on any code here.
- The host's name and instrument are still unconfirmed.
- Smooth scrolling uses Lenis from jsdelivr. If the CDN is blocked in a
  region, the page falls back to native scrolling with nothing else lost.
- `channelRoomId` values in the seed are `R1`–`R7`. Replace them with the real
  Beds24 room IDs or the price line stays blank.
- Nepali translation: the content model and the typeface already support it.
  Add `i18n` to the Sanity schema when the owner wants it.
- Search: see `SEO.md`. The domain `hiranyainpatan.com` is dead and should be
  recovered, and a Google Business Profile matters more than the site in year one.
