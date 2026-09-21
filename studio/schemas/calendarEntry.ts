import {defineType, defineField} from 'sanity'

/** The "when to come" strip. Six or so rows, edited about once a year. */
export const calendarEntry = defineType({
  name: 'calendarEntry',
  title: 'When to come',
  type: 'document',
  fields: [
    defineField({name: 'months', title: 'Months', type: 'string', description: 'e.g. "Apr — May"', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'What happens', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'note', title: 'The detail', type: 'text', rows: 3, validation: (r) => r.required().max(260)}),
    defineField({name: 'order', title: 'Position', type: 'number', validation: (r) => r.required().integer()}),
  ],
  orderings: [{title: 'Page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'months'}},
})
