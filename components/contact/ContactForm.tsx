'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactInput } from '@/lib/validations/contact'

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

const inputClass =
  'w-full border-0 border-b border-line bg-transparent px-0 py-4 text-heading placeholder:text-dim transition-colors focus:border-maroon-mid focus:outline-none'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (data: ContactInput) => {
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
      setStatus('error')
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || '',
          subject: 'Nalanda College Contact Form',
          message: parsed.data.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input id="name" placeholder="Full name *" {...register('name')} className={inputClass} />
        {errors.name && <p className="mt-1 text-xs text-maroon-glow">{errors.name.message}</p>}
      </div>

      <div>
        <input
          id="phone"
          type="tel"
          placeholder="Phone *"
          {...register('phone')}
          className={inputClass}
        />
        {errors.phone && <p className="mt-1 text-xs text-maroon-glow">{errors.phone.message}</p>}
      </div>

      <div>
        <input
          id="email"
          type="email"
          placeholder="E-mail address *"
          {...register('email')}
          className={inputClass}
        />
        {errors.email && <p className="mt-1 text-xs text-maroon-glow">{errors.email.message}</p>}
      </div>

      <div>
        <textarea
          id="message"
          rows={4}
          placeholder="Your message..."
          {...register('message')}
          className={inputClass}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-maroon-glow">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'SEND MESSAGE'}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-gold">Thank you — your message has been sent.</p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-maroon-glow">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
