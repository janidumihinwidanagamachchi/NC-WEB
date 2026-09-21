import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export async function Footer() {
  const t = await getTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-line-warm font-display text-base tracking-widest text-gold">
                NC
              </span>
              <span className="font-display text-xl text-heading">Nalanda College</span>
            </div>
            <p className="mt-6 font-display text-3xl leading-tight text-heading md:text-4xl">
              Wisdom illuminates <span className="text-gold">character.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim">
              {t('metadata.description')}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.facebook.com/NalandaCollegeColombo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-line text-body transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCCOaxljN65_1vKFuJpmHCsw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center border border-line text-body transition-colors hover:border-gold hover:text-gold"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-line text-body transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:info@nalandacollege.lk"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center border border-line text-body transition-colors hover:border-gold hover:text-gold"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow">Contact</p>
            <div className="mt-6 space-y-7">
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-dim">
                  Email
                </h4>
                <a
                  href="mailto:info@nalandacollege.lk"
                  className="mt-1.5 block font-display text-lg text-heading transition-colors hover:text-gold"
                >
                  info@nalandacollege.lk
                </a>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-dim">
                  Office
                </h4>
                <p className="mt-1.5 font-display text-lg leading-snug text-heading">
                  49/1 Sri Sangaraja Mawatha, Colombo 10, Sri Lanka
                </p>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-dim">
                  Phone
                </h4>
                <a
                  href="tel:+94112695296"
                  className="mt-1.5 block font-display text-lg text-heading transition-colors hover:text-gold"
                >
                  +94 11 269 5296
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start">
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-1 font-sans text-sm">
              {[
                { key: 'about', href: '/about' },
                { key: 'history', href: '/history' },
                { key: 'academics', href: '/academics' },
                { key: 'news', href: '/news' },
                { key: 'events', href: '/events' },
                { key: 'alumni', href: '/alumni' },
                { key: 'admissions', href: '/admissions' },
              ].map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="block py-1.5 text-body transition-colors hover:text-gold-light"
                  >
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            <Button href="/contact" variant="outline" size="sm" className="mt-8">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <span className="text-xs tracking-[0.14em] text-dim">
            {t('footer.copyright', { year })}
          </span>
          <span className="text-xs tracking-[0.14em] uppercase text-dim">{t('footer.motto')}</span>
        </div>
      </div>
    </footer>
  )
}
