'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/lib/navigation'
import { Globe } from 'lucide-react'

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')

  const switchLocale = (next: 'en' | 'si') => {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="relative group ml-2">
      <button
        className="flex items-center gap-1 px-2 py-2 text-xs uppercase tracking-wider text-silver-muted hover:text-silver-bright transition-colors"
        aria-label={t('language')}
      >
        <Globe size={14} /> {locale}
      </button>
      <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="min-w-[80px] rounded-lg bg-bg-dark/95 border border-maroon/30 backdrop-blur-md shadow-xl overflow-hidden">
          <button
            onClick={() => switchLocale('en')}
            className={`w-full text-left px-3 py-2 text-xs hover:text-maroon-glow transition-colors ${
              locale === 'en' ? 'text-maroon-glow' : 'text-silver-muted'
            }`}
          >
            English
          </button>
          <button
            onClick={() => switchLocale('si')}
            className={`w-full text-left px-3 py-2 text-xs hover:text-maroon-glow transition-colors ${
              locale === 'si' ? 'text-maroon-glow' : 'text-silver-muted'
            }`}
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  )
}
