import type { Metadata } from 'next'
import {
  Nanum_Myeongjo,
  Noto_Sans_Sinhala,
  Noto_Serif_Sinhala,
  Poppins,
  Public_Sans,
} from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SchoolJsonLd } from '@/components/shared/SchoolJsonLd'

const nanum = Nanum_Myeongjo({
  variable: '--font-nanum',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
})

const publicSans = Public_Sans({
  variable: '--font-public',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const notoSinhala = Noto_Sans_Sinhala({
  variable: '--font-sinhala-sans',
  subsets: ['sinhala'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false,
})

const notoSerifSinhala = Noto_Serif_Sinhala({
  variable: '--font-sinhala-serif',
  subsets: ['sinhala'],
  weight: ['400', '700'],
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
      className={`${nanum.variable} ${publicSans.variable} ${poppins.variable} ${notoSinhala.variable} ${notoSerifSinhala.variable}`}
    >
      <body className="min-h-screen bg-bg text-body antialiased">
        <SchoolJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
