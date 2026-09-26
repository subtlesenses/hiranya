import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel'

// Sanity-backed pages render on request. Booking enquiries open WhatsApp.
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: 'https://www.hiranyaguesthouse.com',
})
