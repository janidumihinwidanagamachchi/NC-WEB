'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn btn-sm"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled || open
            ? 'bg-bg/95 backdrop-blur-md border-b border-line'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <span className="flex h-11 w-11 items-center justify-center border border-line-warm font-display text-sm tracking-widest text-gold transition-colors group-hover:border-gold">
              NC
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-lg leading-none text-heading">
                Nalanda College
              </span>
              <span className="mt-1 block text-[10px] font-semibold tracking-[0.28em] uppercase text-gold">
                Colombo · Est. 1924
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2.5 font-sans text-[15px] font-medium transition-colors',
                    isActive(item.href) ? 'text-gold' : 'text-body hover:text-heading'
                  )}
                >
                  {t(item.labelKey)}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      className="opacity-60 transition-transform group-hover:rotate-180"
                    />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute top-full left-0 z-50 pt-0 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[210px] border border-line bg-bg-panel">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block border-b border-line px-4 py-3 font-sans text-sm transition-colors last:border-b-0',
                            isActive(child.href)
                              ? 'text-gold'
                              : 'text-body hover:text-gold-light hover:bg-bg-raise'
                          )}
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/admissions" className="ml-3 btn btn-outline btn-sm">
              {t('applyNow')}
            </Link>
            <LocaleSwitcher />
          </nav>

          <button
            className="lg:hidden p-2 text-heading"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-full max-w-sm flex-col border-l border-line bg-bg-sidebar">
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <span className="flex h-10 w-10 items-center justify-center border border-line-warm font-display text-sm tracking-widest text-gold">
                  NC
                </span>
                <span className="font-display text-base leading-none text-heading">
                  Nalanda College
                </span>
              </Link>
              <button
                className="p-2 text-heading hover:text-gold"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
              {NAV.map((item) => (
                <div key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-4 font-display text-lg transition-colors',
                      isActive(item.href) ? 'text-gold' : 'text-heading hover:text-gold-light'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                  {item.children && (
                    <div className="pb-3 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 font-sans text-sm text-body transition-colors hover:text-gold-light"
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/admissions"
                  className="btn btn-outline btn-sm"
                  onClick={() => setOpen(false)}
                >
                  {t('applyNow')}
                </Link>
                <LocaleSwitcher />
              </div>
            </nav>

            <div className="border-t border-line px-6 py-5 font-sans text-xs tracking-[0.18em] uppercase text-dim">
              © {new Date().getFullYear()} Nalanda College Colombo
            </div>
          </div>
        </div>
      )}
    </>
  )
}
