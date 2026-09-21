import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

/**
 * The Studio is arranged for one person editing on a phone.
 *
 * "What's on" sits at the top because it is the only thing that changes weekly.
 * Everything below it is ordered by how often it is actually touched. The house
 * document and the storeys are singletons, opened directly rather than through
 * a list of one item.
 */
export default defineConfig({
  name: 'hiranya',
  title: 'Hiranya Guest House',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_ME',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Hiranya')
          .items([
            S.listItem()
              .title("What's on")
              .child(S.documentTypeList('whatsOn').title("What's on").defaultOrdering([{field: 'startDate', direction: 'desc'}])),
            S.divider(),
            S.listItem().title('Rooms').child(S.documentTypeList('room').title('Rooms').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.listItem().title('The house').child(S.document().schemaType('settings').documentId('settings')),
            S.listItem().title('The five storeys').child(S.documentTypeList('storey').title('Storeys').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.divider(),
            S.listItem().title('When to come').child(S.documentTypeList('calendarEntry').defaultOrdering([{field: 'order', direction: 'asc'}])),
            S.listItem().title('Guest words').child(S.documentTypeList('quote').defaultOrdering([{field: 'order', direction: 'asc'}])),
          ]),
    }),
    visionTool(),
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
