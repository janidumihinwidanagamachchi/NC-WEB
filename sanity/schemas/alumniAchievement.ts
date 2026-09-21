import { defineField, defineType } from 'sanity'

export const alumniAchievement = defineType({
  name: 'alumniAchievement',
  title: 'Alumni Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Graduation Year',
      type: 'number',
    }),
    defineField({
      name: 'field',
      type: 'string',
      options: {
        list: ['Sports', 'Politics', 'Business', 'Arts', 'Science', 'Medicine', 'Law', 'Military'],
      },
    }),
    defineField({
      name: 'achievement',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      type: 'string',
    }),
    defineField({
      name: 'linkedIn',
      type: 'url',
    }),
    defineField({
      name: 'year',
      title: 'Year of Achievement',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'field' },
  },
})
