'use client';

import { useState, useCallback } from 'react';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

interface Props {
  bookedRanges: { start: string; end: string }[];
}

function toMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDateKey(k: string): Date {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function fmtShort(d: Date | null): string {
  if (!d) return 'Select';
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
}

export default function AvailabilityCalendar({ bookedRanges }: Props) {
  const today = toMidnight(new Date());
  // Start calendar on the next month after today if we're past mid-month, else current month
  const initYear = today.getFullYear();
  const initMonth = today.getMonth();

  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const bookedSet = new Set<string>();
  for (const { start, end } of bookedRanges) {
    let cur = parseDateKey(start);
    const endDate = parseDateKey(end);
    while (cur < endDate) {
      bookedSet.add(dateKey(cur));
      cur = new Date(cur.getTime() + 86400000);
    }
  }

  const isBooked = (d: Date) => bookedSet.has(dateKey(d));

  const rangeHasBooked = useCallback(
    (a: Date, b: Date): boolean => {
      let cur = new Date(a.getTime() + 86400000);
      while (cur < b) {
        if (isBooked(cur)) return true;
        cur = new Date(cur.getTime() + 86400000);
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookedSet],
  );

  const pickDate = (date: Date) => {
    setBookingStatus('idle');
    if (!checkIn || checkOut) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    if (date.getTime() === checkIn.getTime()) {
      setCheckIn(null);
      setCheckOut(null);
      return;
    }
    if (date > checkIn) {
      if (rangeHasBooked(checkIn, date)) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
      }
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const shiftMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    const proposed = new Date(y, m, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (proposed < currentMonthStart) return;
    setViewYear(y);
    setViewMonth(m);
  };

  const canPrev = !(viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  // Build calendar cells
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: { day: number | null; date: Date | null; state: string }[] = [];
  for (let i = 0; i < firstDow; i++) cells.push({ day: null, date: null, state: 'empty' });

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewYear, viewMonth, d);
    const past = date < today;
    const booked = isBooked(date);
    const isStart = checkIn && date.getTime() === checkIn.getTime();
    const isEnd = checkOut && date.getTime() === checkOut.getTime();
    const inRange = checkIn && checkOut && date > checkIn && date < checkOut;

    let state = 'available';
    if (booked) state = 'booked';
    else if (past) state = 'past';
    else if (isStart || isEnd) state = 'selected';
    else if (inRange) state = 'inrange';

    cells.push({ day: d, date, state });
  }

  const cellStyle = (state: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      borderRadius: 10,
      userSelect: 'none',
      cursor: 'default',
    };
    switch (state) {
      case 'booked':
        return { ...base, color: '#b3bac3', textDecoration: 'line-through', background: '#f1f1ee' };
      case 'past':
        return { ...base, color: '#cdd2d9' };
      case 'selected':
        return { ...base, background: '#bd6a44', color: '#fff', fontWeight: 600, cursor: 'pointer' };
      case 'inrange':
        return { ...base, background: '#f3e3d9', color: '#bd6a44', borderRadius: 0, cursor: 'pointer' };
      case 'available':
        return { ...base, color: '#2c2723', background: '#fff', cursor: 'pointer' };
      default:
        return base;
    }
  };

  const nights =
    checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000) : 0;
  const hasDates = !!(checkIn && checkOut);

  const handleRequest = async () => {
    if (!hasDates) {
      setBookingStatus('error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: dateKey(checkIn!),
          checkOut: dateKey(checkOut!),
          nights,
        }),
      });
      setBookingStatus(res.ok ? 'sent' : 'error');
    } catch {
      setBookingStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row gap-8 items-start"
    >
      {/* ── Calendar card ── */}
      <div
        style={{
          flex: 1.3,
          minWidth: 300,
          background: '#fff',
          border: '1px solid #ecebe6',
          borderRadius: 20,
          padding: 28,
        }}
      >
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => shiftMonth(-1)}
            disabled={!canPrev}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: '1px solid #e2ddd3',
              background: '#fff',
              cursor: canPrev ? 'pointer' : 'default',
              fontSize: 18,
              color: canPrev ? '#2c2723' : '#cdd2d9',
            }}
          >
            ‹
          </button>
          <div
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: '#2a231d' }}
          >
            {MONTHS[viewMonth]} {viewYear}
          </div>
          <button
            onClick={() => shiftMonth(1)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: '1px solid #e2ddd3',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 18,
              color: '#2c2723',
            }}
          >
            ›
          </button>
        </div>

        {/* Weekday headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            marginBottom: 6,
          }}
        >
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: 'center',
                fontSize: 11.5,
                color: '#94a0ae',
                fontWeight: 600,
                padding: '6px 0',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((cell, i) => (
            <div
              key={i}
              style={cell.state === 'empty' ? { height: 42 } : cellStyle(cell.state)}
              onClick={
                cell.date && cell.state !== 'booked' && cell.state !== 'past'
                  ? () => pickDate(cell.date!)
                  : undefined
              }
            >
              {cell.day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-5"
          style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid #f0eee9' }}
        >
          {[
            { color: '#bd6a44', label: 'Selected' },
            { color: '#f3e3d9', label: 'Your stay' },
            { color: '#fff', label: 'Available', border: '1px solid #d9d4ca' },
            { color: '#f1f1ee', label: 'Booked', muted: true },
          ].map(({ color, label, border, muted }) => (
            <div
              key={label}
              className="flex items-center gap-[7px]"
              style={{ fontSize: 13, color: muted ? '#a6aeb8' : '#6f655c' }}
            >
              <span
                style={{ width: 13, height: 13, borderRadius: 4, background: color, border, display: 'inline-block' }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary card ── */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          background: '#f7f3ec',
          border: '1px solid #ece6da',
          borderRadius: 20,
          padding: 30,
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 24,
            color: '#2a231d',
            margin: '0 0 20px',
          }}
        >
          Your stay
        </h3>

        {/* Check-in / check-out pill */}
        <div
          style={{
            display: 'flex',
            border: '1px solid #e2ddd3',
            borderRadius: 13,
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          {[
            { label: 'Check in', val: fmtShort(checkIn) },
            { label: 'Check out', val: fmtShort(checkOut) },
          ].map(({ label, val }, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                padding: '13px 16px',
                borderRight: i === 0 ? '1px solid #e2ddd3' : undefined,
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#8a96a5',
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 15, color: '#2c2723', fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>

        {hasDates ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '18px 0',
              borderTop: '1px solid #e6ddcd',
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 15, color: '#6f655c' }}>Length of stay</span>
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: '#2a231d' }}
            >
              {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
        ) : (
          <p
            style={{
              fontSize: 14.5,
              color: '#7a8694',
              lineHeight: 1.55,
              margin: '0 0 20px',
              padding: '18px 0',
              borderTop: '1px solid #e6ddcd',
            }}
          >
            Select your check-in and check-out dates on the calendar.
          </p>
        )}

        <button
          onClick={handleRequest}
          disabled={submitting}
          style={{
            width: '100%',
            background: hasDates ? '#bd6a44' : '#d3c1b3',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: 15,
            fontSize: 15.5,
            fontWeight: 600,
            cursor: hasDates && !submitting ? 'pointer' : 'default',
          }}
        >
          {submitting ? 'Sending…' : 'Request to book'}
        </button>

        {bookingStatus === 'sent' && (
          <div
            style={{
              marginTop: 16,
              background: '#e7f1ea',
              border: '1px solid #c7e0d2',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 14.5, fontWeight: 600, color: '#1f6b46', marginBottom: 4 }}>
              Request sent ✓
            </div>
            <div style={{ fontSize: 13.5, color: '#3a6b53', lineHeight: 1.5 }}>
              Thanks! We'll confirm your dates by email within a few hours.
            </div>
          </div>
        )}

        {bookingStatus === 'error' && (
          <div style={{ marginTop: 16, fontSize: 13.5, color: '#b4564b' }}>
            Please select both check-in and check-out dates first.
          </div>
        )}
      </div>
    </div>
  );
}
