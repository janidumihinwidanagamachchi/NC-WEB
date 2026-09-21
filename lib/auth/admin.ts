import { cookies } from 'next/headers'
import { signSession, verifySession } from './session'

const ADMIN_PASSWORD = process.env.AUTH_ADMIN_PASSWORD
const COOKIE_NAME = 'nc_admin_session'

export async function getAdminSession() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export async function loginAdmin(password: string) {
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return false
  }

  const token = signSession('admin')
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return true
}

export async function logoutAdmin() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
