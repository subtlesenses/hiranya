import {defineType, defineField} from 'sanity'

/**
 * The only thing that changes weekly, and the actual reason this house needs a CMS.
 * Designed to be filled in from a phone in under a minute.
 */
export const whatsOn = defineType({
  name: 'whatsOn',
  title: "What's on",
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'What is it',
      type: 'string',
      description: 'e.g. "Sarangi and tabla on the third floor" or "Two-day paubha workshop".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          {title: 'Music', value: 'music'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'A meal', value: 'meal'},
          {title: 'Festival in the lane', value: 'festival'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'startDate', title: 'Date', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'endDate',
      title: 'Last day',
      type: 'date',
      description: 'Leave empty for a single evening.',
    }),
    defineField({name: 'time', title: 'Time', type: 'string', description: 'e.g. "from about 8pm". Words are fine.'}),
    defineField({
      name: 'body',
      title: 'A line or two',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({name: 'photo', type: 'photo'}),
    defineField({
      name: 'guestsWelcome',
      title: 'Guests can join',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [{title: 'Soonest first', name: 'date', by: [{field: 'startDate', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', date: 'startDate', kind: 'kind', media: 'photo.asset'},
    prepare: ({title, date, kind, media}) => ({title, subtitle: [date, kind].filter(Boolean).join('  ·  '), media}),
  },
})
