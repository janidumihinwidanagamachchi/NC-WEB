import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Facebook, Youtube, Mail } from 'lucide-react'

export async function Footer() {
  const t = await getTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-maroon/20 bg-bg-dark">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-gradient-to-br from-maroon-mid to-maroon-bright text-silver-bright font-display">
                NC
              </div>
              <div>
                <div className="font-semibold font-display text-silver-bright">Nalanda College</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-maroon-glow">
                  Colombo · Est. 1924
                </div>
              </div>
            </div>
            <p className="text-sm text-silver-muted max-w-sm">{t('metadata.description')}</p>
          </div>

          <div>
            <h4 className="font-display text-silver-bright mb-4">{t('nav.about')}</h4>
            <ul className="space-y-2 text-sm text-silver-muted">
              <li>
                <Link href="/about" className="hover:text-maroon-glow transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-maroon-glow transition-colors">
                  {t('nav.academics')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-maroon-glow transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-maroon-glow transition-colors">
                  {t('nav.admissions')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-silver-bright mb-4">Connect</h4>
            <div className="flex items-center gap-3 text-silver-muted">
              <a
                href="https://www.facebook.com/NalandaCollegeColombo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} className="hover:text-maroon-glow transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCCOaxljN65_1vKFuJpmHCsw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={18} className="hover:text-maroon-glow transition-colors" />
              </a>
              <a href="mailto:info@nalandacollege.lk" aria-label="Email">
                <Mail size={18} className="hover:text-maroon-glow transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-maroon/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-silver-dim">
          <span>{t('footer.copyright', { year })}</span>
          <span>{t('footer.motto')}</span>
        </div>
      </div>
    </footer>
  )
}
