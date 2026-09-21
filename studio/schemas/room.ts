import {defineType, defineField} from 'sanity'

/**
 * A room type. Seven of them.
 *
 * There is deliberately NO price and NO availability field here. Those live in
 * the channel manager, which is the only system that knows what Airbnb and
 * Booking.com have already sold. `channelRoomId` is the thread between the two.
 */
export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Room name',
      type: 'string',
      description: 'What you would call it to a guest. e.g. "Duplex apartment, courtyard".',
      validation: (r) => r.required(),
    }),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({
      name: 'order',
      title: 'Position on the page',
      type: 'number',
      description: 'Low numbers come first in the row of rooms.',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'summary',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Two sentences. Say the one thing about this room nobody else would think to mention.',
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'beds',
      title: 'Beds',
      type: 'string',
      description: 'e.g. "1 full bed" or "2 twin beds".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sleeps',
      type: 'number',
      validation: (r) => r.required().integer().min(1).max(6),
    }),
    defineField({
      name: 'bathroom',
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
      title: 'Photographs',
      type: 'array',
      of: [{type: 'photo'}],
      description: 'The first one is the card. Three or four is plenty.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'channelRoomId',
      title: 'Channel manager room ID',
      type: 'string',
      description:
        'The room ID from Beds24. This is how the site knows which prices and free nights belong to this room. Do not change it unless you added the room in Beds24 again.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'active',
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
