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
        <figure>
          <Image
            src={src}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="w-full border border-line"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-dim">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: unknown }) {
  if (!value) return null
  return <SanityPortableText value={value as never} components={components} />
}
