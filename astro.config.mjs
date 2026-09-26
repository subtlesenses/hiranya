import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel'

// Content is built into static pages. Booking enquiries open WhatsApp.
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: 'https://www.hiranyaguesthouse.com',
})
