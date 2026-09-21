import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'
import { writeClient } from '@/lib/sanity/client'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = result.data

    if (process.env.SANITY_API_WRITE_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      await writeClient.create({
        _type: 'formSubmission',
        formType: 'contact',
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString(),
        read: false,
      })
    }

    if (resend && process.env.RESEND_FROM_EMAIL && process.env.CONTACT_RECIPIENT_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.CONTACT_RECIPIENT_EMAIL,
        subject: `[Nalanda Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'N/A'}\n\n${message}`,
        replyTo: email,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
