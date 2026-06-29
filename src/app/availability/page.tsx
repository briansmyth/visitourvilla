import type { Metadata } from 'next';
import { getBookedDates } from '@/lib/cosmos';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata: Metadata = {
  title: 'Availability – Vista Loop Villa',
  description: 'Check available dates and send a booking request for Vista Loop Villa.',
};

export const dynamic = 'force-dynamic';

export default async function AvailabilityPage() {
  const bookedRanges = await getBookedDates();

  return (
    <div className="max-w-[1180px] mx-auto" style={{ padding: '64px 32px 90px' }}>
      <div
        style={{
          fontSize: 12.5,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: '#bd6a44',
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        Availability
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 'clamp(34px, 4.6vw, 52px)',
          lineHeight: 1.05,
          margin: '0 0 14px',
          color: '#2a231d',
        }}
      >
        Check dates &amp; request to book
      </h1>
      <p
        style={{ fontSize: 18, color: '#6f655c', maxWidth: 560, margin: '0 0 44px', lineHeight: 1.6 }}
      >
        Pick your check-in and check-out dates below, then send a request — we'll confirm your
        stay by email, usually within a few hours.
      </p>

      <AvailabilityCalendar bookedRanges={bookedRanges} />
    </div>
  );
}
