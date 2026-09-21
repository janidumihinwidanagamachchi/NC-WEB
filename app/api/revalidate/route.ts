import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''
  const body = await req.text()

  if (!SECRET || !(await isValidSignature(body, signature, SECRET))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const json = JSON.parse(body)
  const type = json._type as string | undefined

  if (type) {
    revalidateTag(type, 'default')
  }

  return NextResponse.json({ revalidated: true, type })
}
