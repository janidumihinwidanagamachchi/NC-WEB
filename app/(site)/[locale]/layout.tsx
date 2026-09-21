import type { Metadata } from 'next'
import { Cinzel, Crimson_Pro, Noto_Sans_Sinhala } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { SchoolJsonLd } from '@/components/shared/SchoolJsonLd'

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const crimson = Crimson_Pro({
  variable: '--font-crimson',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const notoSinhala = Noto_Sans_Sinhala({
  variable: '--font-sinhala',
  subsets: ['sinhala'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Nalanda College Colombo',
    template: '%s | Nalanda College Colombo',
  },
  description:
    "Sri Lanka's premier Buddhist national school — Nurturing Excellence, Wisdom & Character since 1924.",
  keywords: ['Nalanda College', 'Colombo', 'Sri Lanka', 'school', 'education', 'Buddhist'],
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    siteName: 'Nalanda College Colombo',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!(routing.locales as ReadonlyArray<string>).includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${cinzel.variable} ${crimson.variable} ${notoSinhala.variable}`}
    >
      <body className="min-h-screen bg-bg-deep text-silver-light antialiased">
        <SchoolJsonLd />
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
