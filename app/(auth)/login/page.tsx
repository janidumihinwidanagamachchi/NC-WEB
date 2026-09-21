'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm p-8 rounded-2xl bg-bg-card border border-maroon/20 shadow-2xl">
      <h1 className="text-2xl font-display text-silver-bright mb-2">Admin Login</h1>
      <p className="text-sm text-silver-dim mb-6">Nalanda College dashboard</p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm text-silver-light mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-bg-mid border border-maroon/20 px-4 py-2.5 text-silver-bright focus:border-maroon-glow focus:outline-none"
            autoFocus
          />
        </div>

        {error && <p className="text-maroon-glow text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full justify-center disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
