import { NextResponse } from 'next/server';
import { getBookedDates } from '@/lib/cosmos';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ranges = await getBookedDates();
    return NextResponse.json(ranges, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('Availability API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
