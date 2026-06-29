import { NextRequest, NextResponse } from 'next/server';
import { getMessagesContainer } from '@/lib/cosmos';
import { ContactMessage } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, preferredDates, message } = body as ContactMessage;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const item: ContactMessage = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      preferredDates: preferredDates?.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    const container = await getMessagesContainer();
    await container.items.create(item);

    await notifyHostOfMessage(item);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function notifyHostOfMessage(msg: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const hostEmail = process.env.HOST_EMAIL ?? 'stay@vistaloopvilla.com';
  if (!apiKey) return;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Vista Loop Villa <noreply@vistaloopvilla.com>',
      to: hostEmail,
      reply_to: msg.email,
      subject: `New message from ${msg.name} – Vista Loop Villa`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${msg.name} &lt;${msg.email}&gt;</p>
        ${msg.preferredDates ? `<p><strong>Preferred dates:</strong> ${msg.preferredDates}</p>` : ''}
        <p><strong>Message:</strong></p>
        <blockquote>${msg.message.replace(/\n/g, '<br>')}</blockquote>
        <p><em>Reply directly to this email to respond.</em></p>
      `,
    });
  } catch (e) {
    console.warn('Email notification failed (non-fatal):', e);
  }
}
