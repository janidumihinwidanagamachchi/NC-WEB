'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/login')
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-900 text-sm font-medium transition-colors"
    >
      Sign out
    </button>
  )
}
