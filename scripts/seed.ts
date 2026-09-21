/**
 * Seed script for Nalanda College Sanity CMS.
 *
 * Run after creating your Sanity project and adding credentials to .env.local:
 *   npx tsx scripts/seed.ts
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */

import { client } from '../lib/sanity/client'

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
    process.exit(1)
  }

  const settings = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    title: 'Nalanda College Colombo',
    description:
      "Sri Lanka's premier Buddhist national school — Nurturing Excellence, Wisdom & Character since 1924.",
    contactEmail: 'info@nalandacollege.lk',
    phone: '+94 11 269 5296',
    address: '49/1 Sri Sangaraja Mawatha, Colombo 10, Sri Lanka',
    admissionsOpen: false,
    admissionsBanner: 'Applications for the 2027 academic year are now open.',
  }

  await client.createOrReplace(settings)
  console.log('Seeded site settings.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
