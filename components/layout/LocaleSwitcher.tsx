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
    <div className="group relative ml-2">
      <button
        className="flex items-center gap-1 px-2 py-2 text-xs uppercase tracking-[0.18em] text-body transition-colors hover:text-heading"
        aria-label={t('language')}
      >
        <Globe size={14} /> {locale}
      </button>
      <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="min-w-[80px] overflow-hidden border border-line bg-bg-panel">
          <button
            onClick={() => switchLocale('en')}
            className={`w-full px-3 py-2 text-left text-xs transition-colors ${
              locale === 'en' ? 'text-gold' : 'text-body hover:text-heading'
            }`}
          >
            English
          </button>
          <button
            onClick={() => switchLocale('si')}
            className={`w-full px-3 py-2 text-left text-xs transition-colors ${
              locale === 'si' ? 'text-gold' : 'text-body hover:text-heading'
            }`}
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  )
}
