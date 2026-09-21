'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema, type ContactInput } from '@/lib/validations/contact'

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

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
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
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-silver-light mb-1">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
        />
        {errors.name && <p className="text-maroon-glow text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm text-silver-light mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
          />
          {errors.email && <p className="text-maroon-glow text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-silver-light mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            {...register('phone')}
            className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-silver-light mb-1">
          Subject
        </label>
        <input
          id="subject"
          {...register('subject')}
          className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
        />
        {errors.subject && (
          <p className="text-maroon-glow text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-silver-light mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
        />
        {errors.message && (
          <p className="text-maroon-glow text-xs mt-1">{errors.message.message}</p>
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
        <p className="text-green-400 text-sm text-center">
          Thank you — your message has been sent.
        </p>
      )}
      {status === 'error' && (
        <p className="text-maroon-glow text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
