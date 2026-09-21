import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel'

// Static pages, with one server endpoint for live availability (a Vercel function).
// Everything the owner edits is baked at build time; only free nights and
// prices are fetched at request time, because only the channel manager knows
// what Airbnb and Booking.com have already sold.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://hiranyainpatan.com',
})
