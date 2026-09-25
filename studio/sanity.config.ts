import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

if (!process.env.SANITY_STUDIO_PROJECT_ID) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env before starting the editor.')
}

// Put daily room and photo editing first; use Sanity authentication and permissions.
export default defineConfig({
  name: 'hiranya',
  title: 'Hiranya Guest House',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Hiranya')
          .items([
            S.listItem().title('Rooms & photos').child(S.documentTypeList('room').title('Rooms & photos').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.divider(),
            S.listItem().title('The house').child(S.document().schemaType('settings').documentId('settings')),
            S.listItem().title('The five storeys').child(S.documentTypeList('storey').title('Storeys').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.listItem().title("What's on").child(S.documentTypeList('whatsOn').title("What's on").defaultOrdering([{field: 'startDate', direction: 'desc'}])),
            S.divider(),
            S.listItem().title('When to come').child(S.documentTypeList('calendarEntry').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.listItem().title('Guest words').child(S.documentTypeList('quote').defaultOrdering([{field: 'order', direction: 'asc'}])),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Singletons must not be creatable or deletable from the list.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'settings'),
  },
  document: {
    actions: (prev, {schemaType}) =>
      schemaType === 'settings' ? prev.filter(({action}) => action !== 'unpublish' && action !== 'delete' && action !== 'duplicate') : prev,
  },
})
