import type { Metadata } from 'next'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  title: 'Nalanda College Colombo',
  description: 'Redirecting to Nalanda College Colombo.',
}

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/`} />
      </head>
      <body>{children}</body>
    </html>
  )
}
