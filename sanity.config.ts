import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'nc-web',
  title: 'Nalanda College',
  projectId,
  dataset,
  basePath: '/studio',
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
})
