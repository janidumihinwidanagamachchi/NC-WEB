import { defineField, defineType } from 'sanity'

export const staffMember = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      type: 'string',
    }),
    defineField({
      name: 'department',
      type: 'string',
      options: {
        list: ['Administration', 'Science', 'Arts', 'Commerce', 'Sports', 'Prefect Board'],
      },
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'order',
      type: 'number',
    }),
    defineField({
      name: 'isPrincipal',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'designation' },
  },
})
