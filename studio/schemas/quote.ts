import {defineType, defineField} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Guest words',
  type: 'document',
  fields: [
    defineField({name: 'text', title: 'What they wrote', type: 'text', rows: 4, validation: (r) => r.required().max(320)}),
    defineField({name: 'name', title: 'First name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'country', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'source',
      type: 'string',
      options: {list: ['Booking.com', 'Airbnb', 'Google', 'Written to us directly']},
      description: 'Kept for our own records. Not shown on the site.',
    }),
    defineField({name: 'order', type: 'number', validation: (r) => r.required().integer()}),
  ],
  orderings: [{title: 'Page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'text'}},
})
