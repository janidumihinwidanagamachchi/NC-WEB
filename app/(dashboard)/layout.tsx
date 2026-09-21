import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth/admin'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await getAdminSession())) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">{children}</body>
    </html>
  )
}
