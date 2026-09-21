import { defineField, defineType } from 'sanity'

export const downloadableResource = defineType({
  name: 'downloadableResource',
  title: 'Downloadable Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Admission', 'Academic', 'Sports', 'General'],
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isPublic',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
