'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, MessageCircle, ExternalLink } from 'lucide-react'
import { LiveBackground } from '@/components/shared/LiveBackground'

interface FBPost {
  id: string
  message?: string
  full_picture?: string
  created_time: string
  permalink_url: string
  likes_count?: number
  comments_count?: number
}

const DEMO: FBPost[] = [
  {
    id: '1',
    message:
      '🏆 Congratulations to our A/L batch of 2025! Record-breaking results — 47 straight-A achievers. Nalanda pride!',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    permalink_url: 'https://www.facebook.com/NalandaCollegeColombo',
    likes_count: 1247,
    comments_count: 89,
  },
  {
    id: '2',
    message:
      '🏏 BATTLE OF THE MAROONS! Nalanda vs Dharmaraja — the biggest school cricket rivalry in Sri Lanka!',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    permalink_url: 'https://www.facebook.com/NalandaCollegeColombo',
    likes_count: 892,
    comments_count: 134,
  },
  {
    id: '3',
    message:
      '🌸 Happy Vesak! May the blessings of the Triple Gem be with all Nalandians and their families.',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    permalink_url: 'https://www.facebook.com/NalandaCollegeColombo',
    likes_count: 2341,
    comments_count: 210,
  },
]

function timeAgo(s: string) {
  const diff = Date.now() - new Date(s).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function FacebookFeed() {
  const [posts, setPosts] = useState<FBPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/facebook?type=posts')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPosts(d?.data?.length ? d.data : DEMO))
      .catch(() => setPosts(DEMO))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-maroon-glow">
            Social Media
          </p>
          <h2 className="section-heading">
            Latest from <span>Facebook</span>
          </h2>
          <p className="text-sm mt-3 text-silver-dim">
            Follow us{' '}
            <a
              href="https://www.facebook.com/NalandaCollegeColombo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon-glow hover:underline"
            >
              @NalandaCollegeColombo
            </a>
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton rounded-xl h-52" />
            ))}
          </div>
        )}

        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {posts.slice(0, 6).map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="card group flex flex-col"
                >
                  {post.full_picture && (
                    <div className="relative h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.full_picture}
                        alt="Post"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {post.message && (
                      <p className="text-sm leading-relaxed line-clamp-4 flex-1 mb-4 text-silver-dim">
                        {post.message}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs pt-3 text-silver-dim border-t border-maroon/15">
                      <span className="text-silver/30">{timeAgo(post.created_time)}</span>
                      <div className="flex items-center gap-3">
                        {post.likes_count != null && (
                          <span className="flex items-center gap-1">
                            <ThumbsUp size={11} />
                            {post.likes_count.toLocaleString()}
                          </span>
                        )}
                        {post.comments_count != null && (
                          <span className="flex items-center gap-1">
                            <MessageCircle size={11} />
                            {post.comments_count}
                          </span>
                        )}
                        <a
                          href={post.permalink_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-maroon-glow transition-colors"
                          aria-label="View on Facebook"
                        >
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
