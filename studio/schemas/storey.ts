import {defineType, defineField} from 'sanity'

/** The five floors. Edited once, then left alone. */
export const storey = defineType({
  name: 'storey',
  title: 'Storey',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Floor number, from the ground up', type: 'number', validation: (r) => r.required().integer().min(1).max(6)}),
    defineField({name: 'nepali', title: 'Nepal Bhasa name', type: 'string', description: 'In Devanagari. e.g. छेली', validation: (r) => r.required()}),
    defineField({name: 'roman', title: 'Written in roman letters', type: 'string', description: 'e.g. chheli', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'What the guest clicks', type: 'string', description: 'Plain English. e.g. Arrive', validation: (r) => r.required()}),
    defineField({name: 'floorName', title: 'Which floor, in plain words', type: 'string', description: 'e.g. ground floor, first floor, attic, roof', validation: (r) => r.required()}),
    defineField({name: 'body', title: 'The paragraphs', type: 'array', of: [{type: 'block', styles: [], lists: [], marks: {decorators: [{title: 'Emphasis', value: 'strong'}]}}], validation: (r) => r.required()}),
    defineField({name: 'photo', type: 'photo', validation: (r) => r.required()}),
    defineField({name: 'linkLabel', title: 'Link text', type: 'string'}),
    defineField({name: 'linkHref', title: 'Link target', type: 'string', description: 'e.g. #rooms'}),
  ],
  orderings: [{title: 'Ground up', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'label', subtitle: 'roman', media: 'photo.asset'}},
})
