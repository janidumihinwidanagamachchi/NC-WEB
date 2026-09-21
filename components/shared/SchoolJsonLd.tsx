export function SchoolJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Nalanda College Colombo',
    alternateName: 'නාලන්දා විද්‍යාලය',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nalandacollege.lk',
    logo: 'https://nalandacollege.lk/images/crest.png',
    foundingDate: '1924',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '49/1 Sri Sangaraja Mawatha',
      addressLocality: 'Colombo',
      postalCode: '01000',
      addressCountry: 'LK',
    },
    telephone: '+94112695296',
    sameAs: [
      'https://www.facebook.com/NalandaCollegeColombo',
      'https://www.youtube.com/channel/UCCOaxljN65_1vKFuJpmHCsw',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
