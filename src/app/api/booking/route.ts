import { NextRequest, NextResponse } from 'next/server';
import { getBookingsContainer } from '@/lib/cosmos';
import { BookingRequest } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkIn, checkOut, nights } = body as BookingRequest;

    if (!checkIn || !checkOut || typeof nights !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const item: BookingRequest = {
      id: crypto.randomUUID(),
      checkIn,
      checkOut,
      nights,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    const container = await getBookingsContainer();
    await container.items.create(item);

    // Optionally send a notification email via Resend
    await notifyHostOfBooking(item);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const container = await getBookingsContainer();
    const { resources } = await container.items
      .query("SELECT c.checkIn, c.checkOut, c.status FROM c")
      .fetchAll();
    return NextResponse.json(resources);
  } catch (err) {
    console.error('Booking GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function notifyHostOfBooking(booking: BookingRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const hostEmail = process.env.HOST_EMAIL ?? 'stay@vistaloopvilla.com';
  if (!apiKey) return;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Vista Loop Villa <noreply@vistaloopvilla.com>',
      to: hostEmail,
      subject: `New booking request: ${booking.checkIn} – ${booking.checkOut}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Check in:</strong> ${booking.checkIn}</p>
        <p><strong>Check out:</strong> ${booking.checkOut}</p>
        <p><strong>Nights:</strong> ${booking.nights}</p>
        <p><strong>Submitted:</strong> ${booking.submittedAt}</p>
        <p>Log in to your dashboard to confirm or decline.</p>
      `,
    });
  } catch (e) {
    console.warn('Email notification failed (non-fatal):', e);
  }
}
