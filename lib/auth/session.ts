import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.AUTH_SECRET || 'dev-secret-change-me'

export function signSession(payload: string) {
  const hmac = createHmac('sha256', SECRET).update(payload).digest('hex')
  return `${payload}.${hmac}`
}

export function verifySession(cookie: string) {
  const [payload, hmac] = cookie.split('.')
  if (!payload || !hmac) return null

  const expected = createHmac('sha256', SECRET).update(payload).digest('hex')
  if (hmac.length !== expected.length) return null

  try {
    if (timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) {
      return payload
    }
  } catch {
    return null
  }
  return null
}
