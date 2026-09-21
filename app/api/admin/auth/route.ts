import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin, logoutAdmin } from '@/lib/auth/admin'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const ok = await loginAdmin(password)
    if (!ok) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE() {
  await logoutAdmin()
  return NextResponse.json({ success: true })
}
