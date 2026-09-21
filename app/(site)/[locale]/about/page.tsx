import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { CheckCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('about') }
}

export default async function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Nalanda"
        highlight="College"
        description="Sri Lanka's premier Buddhist national school, nurturing noble sons endowed with virtues and wisdom since 1924."
      />

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  A century of <span>virtue & wisdom</span>
                </>
              }
            />
            <div className="space-y-4 leading-relaxed text-body">
              <p>
                Founded in 1924 by a group of Buddhist leaders in Colombo, Nalanda College began as
                a small institution with a profound vision: to provide a holistic education rooted
                in Buddhist values and national identity.
              </p>
              <p>
                Over the past century, Nalanda has grown into one of Sri Lanka&apos;s largest and
                most respected national schools, producing leaders in politics, medicine, law,
                sports, business, and the arts while staying true to its motto: Wisdom Illuminates
                Character.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {[
                '100+ years of excellence',
                'Buddhist values & discipline',
                'National school status since 1956',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-heading">
                  <CheckCircle size={18} className="text-gold" /> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://picsum.photos/seed/nalanda-about/800/600"
                alt="Nalanda College"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
