'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactInput } from '@/lib/validations/contact'

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

const inputClass =
  'w-full border border-line bg-transparent px-4 py-2.5 text-heading placeholder:text-dim transition-colors focus:border-maroon-mid focus:outline-none'

const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-dim'

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
          subject: parsed.data.subject,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-line p-7 md:p-10">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" {...register('name')} className={inputClass} />
        {errors.name && <p className="mt-1 text-xs text-maroon-glow">{errors.name.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" type="email" {...register('email')} className={inputClass} />
          {errors.email && <p className="mt-1 text-xs text-maroon-glow">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone (optional)
          </label>
          <input id="phone" {...register('phone')} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input id="subject" {...register('subject')} className={inputClass} />
        {errors.subject && (
          <p className="mt-1 text-xs text-maroon-glow">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" rows={5} {...register('message')} className={inputClass} />
        {errors.message && (
          <p className="mt-1 text-xs text-maroon-glow">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
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
