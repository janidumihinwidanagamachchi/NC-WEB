import Image from 'next/image'
import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).url()
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="w-full rounded-xl"
          />
          {value.alt && (
            <figcaption className="text-center text-sm text-silver-dim mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-display text-silver-bright mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-display text-silver-bright mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-silver-dim leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-maroon-glow pl-5 italic text-silver my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-silver-dim space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-silver-dim space-y-1">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="text-maroon-glow hover:underline">
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: unknown }) {
  if (!value) return null
  return <SanityPortableText value={value as never} components={components} />
}
