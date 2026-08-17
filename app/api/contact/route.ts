import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TEMPORARY: onboarding@resend.dev (Resend's sandbox sender) can only deliver to
        // the email address the Resend account signed up with — gmargaryan@mpplabs.io in
        // this case — so that's the recipient below for now. Once mpp-insights.com is
        // verified at resend.com/domains, switch `to` back to welcome@mpp-insights.com
        // and change `from` to an address on the verified domain (e.g.
        // 'MPP BI <noreply@mpp-insights.com>'), or Resend will reject it the same way.
        // https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
        from: 'MPP BI Website <onboarding@resend.dev>',
        to: 'gmargaryan@mpplabs.io',
        reply_to: email,
        subject: `New Demo Request from ${name}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || 'Not provided'}</p><p><b>Message:</b> ${message}</p>`,
      }),
    })
    if (!res.ok) {
      const errorBody = await res.text()
      console.error('Resend API error:', res.status, errorBody)
      return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form send failed:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
