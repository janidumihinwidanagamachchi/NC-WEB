'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

const ALBUMS = ['All', 'Sports', 'Cultural', 'Academic', 'Campus']

const GALLERY = Array.from({ length: 16 }, (_, i) => {
  const id = i + 1
  return {
    id,
    album: ALBUMS[1 + (i % 4)],
    title: `Photo ${id}`,
    image: `https://picsum.photos/seed/nalanda-gallery-${id}/600/600`,
  }
})

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.album === filter)

  const prev = () => setLightbox((i) => (i === null ? null : Math.max(0, i - 1)))
  const next = () => setLightbox((i) => (i === null ? null : Math.min(filtered.length - 1, i + 1)))

  return (
    <>
      <PageHeader eyebrow="Memories" title="Photo" highlight="Gallery" />

      <section className="section">
        <div className="container">
          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-2">
              {ALBUMS.map((a) => (
                <button
                  key={a}
                  onClick={() => setFilter(a)}
                  className={`border px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    filter === a
                      ? 'border-maroon-bright bg-maroon-bright text-cream'
                      : 'border-line text-dim hover:border-maroon-mid hover:text-heading'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.02}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block aspect-square w-full overflow-hidden border border-line transition-colors hover:border-maroon-mid focus-visible:ring-2 focus-visible:ring-maroon-glow"
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn size={20} className="text-gold" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {item.title}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-4 top-4 p-2 text-white transition-colors hover:text-gold"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 p-2 text-white transition-colors hover:text-gold disabled:opacity-30"
              disabled={lightbox === 0}
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 p-2 text-white transition-colors hover:text-gold disabled:opacity-30"
              disabled={lightbox === filtered.length - 1}
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>

            <div
              className="relative h-[70vh] w-[80vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].image.replace('/600/600', '/1200/1200')}
                alt={filtered[lightbox].title}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </div>

            <div className="absolute bottom-4 text-sm text-dim">
              {lightbox + 1} / {filtered.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
