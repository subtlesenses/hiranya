/**
 * Load the seed content and the current photographs into a fresh Sanity dataset.
 *
 *   SANITY_PROJECT_ID=xxxx SANITY_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity.ts
 *
 * Creates missing documents only. Existing documents and drafts are preserved.
 * Pass --rooms-only to import just the eight existing rooms.
 */
import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {seed} from '../src/lib/seed'
import {roomTypes} from '../src/lib/booking'

const projectId = process.env.SANITY_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.SANITY_DATASET || 'production'
if (!projectId || !token) {
  console.error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN (a token with Editor rights, from sanity.io/manage).')
  process.exit(1)
}
const client = createClient({projectId, dataset, token, apiVersion: '2026-01-01', useCdn: false})

// ---- the seed writes paragraphs as small HTML; the Studio wants Portable Text ----
// Only <p> and <strong>/<b>/<em> occur in the seed, so a tiny converter is enough.
let keyN = 0
const key = () => 'k' + (++keyN).toString(36)
function toBlocks(html: string) {
  return html
    .split(/<\/p>/i)
    .map((p) => p.replace(/<p[^>]*>/i, '').trim())
    .filter(Boolean)
    .map((p) => {
      const children: any[] = []
      const re = /<(strong|b|em)>(.*?)<\/\1>|([^<]+)/gi
      let m: RegExpExecArray | null
      while ((m = re.exec(p))) {
        if (m[3]) children.push({_type: 'span', _key: key(), text: m[3], marks: []})
        else children.push({_type: 'span', _key: key(), text: m[2], marks: [m[1].toLowerCase() === 'em' ? 'em' : 'strong']})
      }
      return {_type: 'block', _key: key(), style: 'normal', markDefs: [], children}
    })
}

// ---- photos: upload each file once, keep the asset id ----
const assets = new Map<string, string>()
async function photo(p: any) {
  if (!p?._placeholder) return undefined
  const file = join(process.cwd(), 'public', p._placeholder)
  if (!existsSync(file)) throw new Error('missing photo ' + file)
  const name = basename(file)
  if (!assets.has(name)) {
    const a = await client.assets.upload('image', createReadStream(file), {filename: name})
    assets.set(name, a._id)
    console.log('uploaded', name)
  }
  return {
    _type: 'photo',
    asset: {_type: 'reference', _ref: assets.get(name)},
    alt: p.alt,
    caption: p.caption,
    hotspot: {x: 0.5, y: 0.5, height: 1, width: 1},
  }
}
const photos = async (list: any[] = []) => Promise.all(list.map(async (p) => ({...(await photo(p)), _key: key()})))
const withKeys = (list: any[] = []) => list.map((x) => ({...x, _key: key()}))

async function main() {
  const s = seed.settings
  const docs: any[] = []

  const roomsOnly = process.argv.includes('--rooms-only')
  const existing = new Set(await client.fetch<string[]>('*[]._id'))
  const missing = (id: string) => !existing.has(id) && !existing.has('drafts.' + id)

  if (!roomsOnly && missing('settings')) docs.push({
    _id: 'settings',
    _type: 'settings',
    name: s.name,
    seoTitle: s.seoTitle,
    metaDescription: s.metaDescription,
    strapline: s.strapline,
    said: s.said,
    heroPhoto: await photo(s.heroPhoto),
    statement: toBlocks(s.statementHtml),
    hostPhoto: await photo(s.hostPhoto),
    hostBody: toBlocks(s.hostBodyHtml),
    cafeName: s.cafeName,
    cafeHours: s.cafeHours,
    cafeBody: toBlocks(s.cafeBodyHtml),
    cafePhotos: await photos(s.cafePhotos),
    neighbourhoodPhotos: await photos(s.neighbourhoodPhotos),
    goodToKnow: withKeys(s.goodToKnow),
    houseRules: withKeys(s.houseRules),
    address: s.address,
    whatsapp: s.whatsapp,
    bookingNote: s.bookingNote,
  })

  for (const st of roomsOnly ? [] : seed.storeys) {
    if (!missing("storey-" + st.order)) continue
    docs.push({
      _id: 'storey-' + st.order, _type: 'storey',
      order: st.order, nepali: st.nepali, roman: st.roman, label: st.label, floorName: st.floorName,
      body: toBlocks(st.bodyHtml), photo: await photo(st.photo), linkLabel: st.linkLabel, linkHref: st.linkHref,
    })
  }
  for (const r of seed.rooms) {
    if (!missing("room-" + r.order)) continue
    docs.push({
      _id: 'room-' + r.order, _type: 'room',
      roomType: roomTypes[r.title],
      title: r.title, slug: {_type: 'slug', current: r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')},
      order: r.order, summary: r.summary, beds: r.beds, sleeps: r.sleeps, bathroom: r.bathroom,
      photos: await photos(r.photos), active: true,
    })
  }
  if (!roomsOnly) seed.calendar.forEach((c, i) => docs.push({_id: 'calendar-' + (i + 1), _type: 'calendarEntry', order: i + 1, ...c}))
  if (!roomsOnly) seed.quotes.forEach((q, i) => docs.push({_id: 'quote-' + (i + 1), _type: 'quote', order: i + 1, source: 'Booking.com', ...q}))

  let tx = client.transaction()
  docs.filter(d => missing(d._id)).forEach((d) => (tx = tx.createIfNotExists(d)))
  await tx.commit()
  console.log(`done: ${docs.length} documents, ${assets.size} photos, dataset "${dataset}"`)
}

main().catch((e) => { console.error(e); process.exit(1) })
