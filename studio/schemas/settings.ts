import {defineType, defineField} from 'sanity'

/** One document. Everything that is true about the house rather than about a room. */
export const settings = defineType({
  name: 'settings',
  title: 'The house',
  type: 'document',
  groups: [
    {name: 'top', title: 'Front of the site', default: true},
    {name: 'story', title: 'The story'},
    {name: 'practical', title: 'Rules & contact'},
  ],
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', group: 'top', validation: (r) => r.required()}),
    defineField({
      name: 'strapline',
      title: 'The line under the name',
      type: 'text',
      rows: 2,
      group: 'top',
      description: 'One sentence, about 25 words. This is the first thing anybody reads.',
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Google result title',
      type: 'string',
      group: 'top',
      description: 'About 60 characters. Put the name first and the place second: "Hiranya Guest House — Patan, Nepal".',
      validation: (r) => r.required().max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Google result description',
      type: 'text',
      rows: 2,
      group: 'top',
      description: 'About 155 characters. Say what it is, where it is, and how far from Durbar Square. This is the sentence people read before they click.',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'said',
      title: 'The big line',
      type: 'string',
      group: 'story',
      description: 'One sentence in large type under the hero. Wrap the words to highlight in <em> and </em>, e.g. "A <em>seven-room homestay</em> in old Patan."',
      validation: (r) => r.required().max(120),
    }),
    defineField({name: 'heroPhoto', title: 'The opening photograph', type: 'photo', group: 'top', validation: (r) => r.required()}),
    defineField({
      name: 'statement',
      title: 'A word from the house',
      type: 'array',
      of: [{type: 'block', styles: [], lists: [], marks: {decorators: [{title: 'Emphasis', value: 'strong'}]}}],
      group: 'story',
      description: 'Written in the first person, as you. Short sentences.',
    }),
    defineField({name: 'hostPhoto', type: 'photo', group: 'story'}),
    defineField({
      name: 'hostBody',
      title: 'About the person who runs it',
      type: 'array',
      of: [{type: 'block', styles: [], lists: [], marks: {decorators: [{title: 'Emphasis', value: 'strong'}]}}],
      group: 'story',
    }),
    defineField({name: 'cafeName', title: 'Café name', type: 'string', group: 'story'}),
    defineField({name: 'cafeHours', title: 'Café hours', type: 'string', group: 'story', description: 'Plain words. e.g. "Coffee from seven, kitchen until ten".'}),
    defineField({
      name: 'cafeBody',
      title: 'About the café',
      type: 'array',
      of: [{type: 'block', styles: [], lists: [], marks: {decorators: [{title: 'Emphasis', value: 'strong'}]}}],
      group: 'story',
    }),
    defineField({name: 'cafePhotos', title: 'Café photographs', type: 'array', of: [{type: 'photo'}], group: 'story'}),
    defineField({name: 'neighbourhoodPhotos', title: 'The lane and Patan', type: 'array', of: [{type: 'photo'}], group: 'story'}),
    defineField({
      name: 'goodToKnow',
      title: 'Good to know',
      type: 'array',
      group: 'practical',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'The question', type: 'string', validation: (r: any) => r.required()},
            {name: 'value', title: 'The answer', type: 'string', validation: (r: any) => r.required()},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
      description:
        'What guests ask before booking: heating, hot water, stairs, breakfast, wifi, how to get here from the airport. These also become the questions Google shows under the search result, so answer each one in a full sentence.',
    }),
    defineField({
      name: 'houseRules',
      title: 'House rules',
      type: 'array',
      group: 'practical',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Heading', type: 'string', validation: (r: any) => r.required()},
            {name: 'value', title: 'What it says', type: 'string', validation: (r: any) => r.required()},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
      description: 'Say them the way you would say them out loud. "The gate is locked from eleven until six" beats "curfew 23:00".',
    }),
    defineField({name: 'address', type: 'string', group: 'practical'}),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      group: 'practical',
      description:
        'Country code first, digits only, no spaces or plus sign. Nepal is 977, so a mobile 9800000000 becomes 9779800000000. Leave this empty and every WhatsApp button on the site disappears, which is safer than a wrong number.',
      validation: (r) =>
        r.regex(/^[0-9]{8,15}$/, {name: 'digits only, country code first'}).warning(
          'Digits only, starting with the country code. 9779800000000, not +977 980-000-0000.',
        ),
    }),
    defineField({name: 'email', type: 'string', group: 'practical'}),
    defineField({
      name: 'bookingNote',
      title: 'Note under the rates',
      type: 'string',
      group: 'practical',
      description: 'Rates themselves come from Beds24 and cannot be edited here on purpose, so they can never disagree with Airbnb and Booking.com.',
    }),
  ],
  preview: {prepare: () => ({title: 'The house'})},
})
