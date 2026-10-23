import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel'

// Sanity-backed pages render on request. Booking enquiries open WhatsApp.
export default defineConfig({
  // Keep existing inline spacing when upgrading to Astro 7.
  compressHTML: true,
  markdown: {syntaxHighlight: false},
  security: {
    // Astro hashes its bundled scripts and styles for each rendered page.
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "frame-src 'none'",
        "form-action 'self'",
        "img-src 'self' https://cdn.sanity.io data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://vitals.vercel-insights.com",
      ],
      scriptDirective: {
        resources: [
          {resource: "'self'", kind: 'element'},
          {resource: "'none'", kind: 'attribute'},
        ],
      },
      styleDirective: {
        resources: [
          {resource: "'self'", kind: 'element'},
          {resource: 'https://fonts.googleapis.com', kind: 'element'},
          // Existing layout values and scroll animations use style attributes.
          {resource: "'unsafe-inline'", kind: 'attribute'},
        ],
      },
    },
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: 'https://www.hiranyaguesthouse.com',
})
