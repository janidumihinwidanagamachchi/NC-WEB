'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'
import { cn } from '@/lib/utils'

type NavItem = {
  labelKey: string
  href: string
  children?: { labelKey: string; href: string }[]
}

const NAV: NavItem[] = [
  {
    labelKey: 'about',
    href: '/about',
    children: [
      { labelKey: 'about', href: '/about' },
      { labelKey: 'history', href: '/history' },
      { labelKey: 'principals', href: '/about/principals' },
    ],
  },
  { labelKey: 'academics', href: '/academics' },
  { labelKey: 'news', href: '/news' },
  {
    labelKey: 'extracurricular',
    href: '/extracurricular',
    children: [
      { labelKey: 'clubs', href: '/extracurricular' },
      { labelKey: 'sports', href: '/sports' },
    ],
  },
  { labelKey: 'events', href: '/events' },
  { labelKey: 'gallery', href: '/gallery' },
  { labelKey: 'contact', href: '/contact' },
]

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn btn-primary"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b',
          scrolled
            ? 'bg-bg-deep/88 backdrop-blur-md border-maroon/20 py-3'
            : 'bg-transparent border-transparent py-5'
        )}
      >
        <div className="container flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-gradient-to-br from-maroon-mid to-maroon-bright text-silver-bright font-display shadow-lg shadow-maroon/30 group-hover:scale-110 transition-transform">
              NC
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-sm leading-tight font-display text-silver-bright">
                Nalanda College
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-maroon-glow">
                Colombo · Est. 1924
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV.map((item) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => item.children && setDropdown(item.labelKey)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors',
                    isActive(item.href)
                      ? 'text-maroon-glow'
                      : 'text-silver-muted hover:text-silver-bright'
                  )}
                >
                  {t(item.labelKey)}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className="opacity-50 group-hover:rotate-180 transition-transform"
                    />
                  )}
                </Link>

                {item.children && dropdown === item.labelKey && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="min-w-[190px] rounded-xl overflow-hidden bg-bg-dark/95 border border-maroon/30 backdrop-blur-md shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-silver-muted hover:text-maroon-glow transition-colors"
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/admissions" className="ml-2 btn btn-primary text-xs px-5 py-2">
              {t('applyNow')}
            </Link>
            <LocaleSwitcher />
          </nav>

          <button
            className="lg:hidden p-2 text-silver-muted hover:text-silver-bright"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-bg-deep"
          role="dialog"
          aria-modal="true"
        >
          <div className="container flex items-center justify-between py-5">
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-gradient-to-br from-maroon-mid to-maroon-bright text-silver-bright font-display">
                NC
              </div>
              <span className="font-semibold text-sm font-display text-silver-bright">
                Nalanda College
              </span>
            </Link>
            <button
              className="p-2 text-silver-muted hover:text-silver-bright"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center container gap-1">
            {NAV.map((item, i) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-maroon/15 font-semibold text-2xl font-display text-silver-muted hover:text-maroon-glow transition-colors"
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  {t(item.labelKey)}
                  <span className="text-base opacity-0 group-hover:opacity-100 transition-opacity text-maroon-glow">
                    →
                  </span>
                </Link>
                {item.children && (
                  <div className="pl-4 py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-silver-dim hover:text-silver-bright transition-colors"
                      >
                        {t(child.labelKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admissions"
              className="btn btn-primary mt-6 self-start text-sm"
              onClick={() => setOpen(false)}
            >
              {t('applyNow')}
            </Link>
          </nav>

          <div className="container pb-8 text-xs text-silver-dim/40">
            © {new Date().getFullYear()} Nalanda College Colombo · Wisdom Illuminates Character
          </div>
        </div>
      )}
    </>
  )
}
