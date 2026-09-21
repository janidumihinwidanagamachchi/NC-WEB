import { defineField, defineType } from 'sanity'

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'formType',
      type: 'string',
      options: {
        list: ['contact', 'admission', 'general'],
      },
    }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'subject', type: 'string' }),
    defineField({
      name: 'message',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'read',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'formType' },
  },
})
