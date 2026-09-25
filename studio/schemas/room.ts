import {defineType, defineField} from 'sanity'

/** Room content only; rates and availability are confirmed by the host on WhatsApp. */
export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  groups: [
    {name: 'details', title: 'Room details', default: true},
    {name: 'photos', group: 'photos', title: 'Photos'},
    {name: 'visibility', title: 'Visibility & order'},
  ],
  fields: [
    defineField({
      name: 'title', group: 'details',
      title: 'Room name',
      type: 'string',
      description: 'What you would call it to a guest. e.g. "Duplex apartment, courtyard".',
      validation: (r) => r.required(),
    }),
    defineField({name: 'roomType', group: 'details', title: 'Room type', type: 'string', description: 'Guest-facing category, such as Duplex apartment or Twin room with shared bathroom.'}),
    defineField({name: 'slug', group: 'visibility', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({
      name: 'order', group: 'visibility',
      title: 'Position on the page',
      type: 'number',
      description: 'Low numbers come first in the row of rooms.',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'summary', group: 'details',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Two sentences. Say the one thing about this room nobody else would think to mention.',
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'beds', group: 'details',
      title: 'Beds',
      type: 'string',
      description: 'e.g. "1 full bed" or "2 twin beds".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sleeps', group: 'details',
      type: 'number',
      validation: (r) => r.required().integer().min(1).max(6),
    }),
    defineField({
      name: 'bathroom', group: 'details',
      type: 'string',
      options: {
        list: [
          {title: 'Private bathroom', value: 'private'},
          {title: 'Shared bathroom', value: 'shared'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Room photographs',
      type: 'array',
      of: [{type: 'photo'}],
      options: {layout: 'grid'},
      description: 'Add photos for this room only. Drag to reorder: the first is the cover, and all photos appear in this room’s gallery. Add a description to each photo for accessibility.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'active', group: 'visibility',
      title: 'Show on the site',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide a room without deleting it.',
    }),
  ],
  orderings: [{title: 'Page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'beds', media: 'photos.0.asset', active: 'active'},
    prepare: ({title, subtitle, media, active}) => ({
      title: active ? title : title + '  (hidden)',
      subtitle,
      media,
    }),
  },
})
