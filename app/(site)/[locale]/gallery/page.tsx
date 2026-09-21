'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const ALBUMS = ['All', 'Sports', 'Cultural', 'Academic', 'Campus']

const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  album: ALBUMS[1 + (i % 4)],
  title: `Photo ${i + 1}`,
  color: ['#1a0a00', '#0a0500', '#05060a', '#000a05'][i % 4],
  accent: ['#c8960c', '#6b0f1a', '#2a5f3f', '#1a3a6b'][i % 4],
}))

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.album === filter)

  const prev = () => setLightbox((i) => (i === null ? null : Math.max(0, i - 1)))
  const next = () => setLightbox((i) => (i === null ? null : Math.min(filtered.length - 1, i + 1)))

  return (
    <>
      <PageHeader eyebrow="Memories" title="Photo" highlight="Gallery" />

      <section className="section relative overflow-hidden min-h-screen">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection className="sticky top-20 z-30 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {ALBUMS.map((a) => (
                <button
                  key={a}
                  onClick={() => setFilter(a)}
                  className={`shrink-0 px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filter === a
                      ? 'bg-maroon-glow text-white'
                      : 'text-silver-dim border border-maroon/20 hover:border-maroon-glow hover:text-silver-bright'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.03}>
                <button
                  onClick={() => setLightbox(i)}
                  className="relative aspect-square rounded-xl overflow-hidden group focus-visible:ring-2 ring-maroon-glow"
                  aria-label={`View ${item.title}`}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.accent}33)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <ZoomIn size={20} className="text-maroon-glow" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/60 truncate">
                    {item.title}
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white p-2 hover:text-maroon-glow transition-colors">
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 text-white p-2 hover:text-maroon-glow transition-colors disabled:opacity-30"
              disabled={lightbox === 0}
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 text-white p-2 hover:text-maroon-glow transition-colors disabled:opacity-30"
              disabled={lightbox === filtered.length - 1}
            >
              <ChevronRight size={36} />
            </button>

            <div
              className="w-[80vw] h-[70vh] max-w-4xl rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${filtered[lightbox].color}, ${filtered[lightbox].accent}33)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-silver-bright">
                <div className="text-6xl mb-3" style={{ color: filtered[lightbox].accent }}>
                  ◆
                </div>
                <p className="text-sm">{filtered[lightbox].title}</p>
                <p className="text-xs mt-1 text-silver-dim">{filtered[lightbox].album}</p>
              </div>
            </div>

            <div className="absolute bottom-4 text-silver-dim text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
