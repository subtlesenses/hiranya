import {defineType, defineField} from 'sanity'

/**
 * Every image on the site goes through this type.
 *
 * `hotspot` is the reason we chose Sanity. The site crops hard — a room card is
 * 3:4, the same photo appears full-bleed at 16:9 — and the owner needs to say
 * "keep this bit" once, not fight the layout. Clicking the hotspot in the Studio
 * sets it for every crop everywhere.
 */
export const photo = defineType({
  name: 'photo',
  title: 'Photograph',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'What is in the picture',
      type: 'string',
      description:
        'One plain sentence. Read aloud to people who cannot see it, and used by Google. e.g. "The courtyard at six in the morning with the marigolds in shade".',
      validation: (r) => r.required().min(10).warning('A few more words would help.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption shown on the photo',
      type: 'string',
      description: 'Optional. Short. Appears in the corner of the image. e.g. "Kausi, first light".',
      validation: (r) => r.max(48),
    }),
  ],
  preview: {
    select: {media: 'asset', title: 'alt', subtitle: 'caption'},
  },
})
