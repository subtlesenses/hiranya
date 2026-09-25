import {defineCliConfig} from 'sanity/cli'
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 's7s7kahm',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
