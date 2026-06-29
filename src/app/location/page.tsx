import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location & Area – Vista Loop Villa',
  description:
    'Vista Loop Villa is in Vista Park Resort, Davenport, FL — 15 min from Disney, 10 min from ChampionsGate golf.',
};

const DRIVE_TIMES = [
  { time: '15 min', label: 'Walt Disney World' },
  { time: '10 min', label: 'ChampionsGate golf' },
  { time: '30 min', label: 'Universal Orlando' },
  { time: '20 min', label: 'Outlet shopping' },
  { time: '6 min', label: 'Publix grocery' },
  { time: '35 min', label: "Orlando Int'l (MCO)" },
];

const NEARBY = [
  {
    title: 'Theme parks',
    body: 'Disney, Universal, SeaWorld and LEGOLAND are all within easy reach for park-hopping days.',
  },
  {
    title: 'Championship golf',
    body: 'ChampionsGate, Reunion and Mystic Dunes put dozens of acclaimed courses on your doorstep.',
  },
  {
    title: 'Dining & shopping',
    body: 'Posner Park and the Vineland outlets cover everything from quick bites to a full day of retail.',
  },
  {
    title: 'Nature & springs',
    body: 'Trade the crowds for a day at the crystal-clear springs and state parks of Central Florida.',
  },
];

export default function LocationPage() {
  return (
    <div>
      {/* Intro + map */}
      <div className="max-w-[1180px] mx-auto" style={{ padding: '64px 32px 40px' }}>
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
          Location &amp; area
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
          Vista Park Resort, Davenport
        </h1>
        <p style={{ fontSize: 18, color: '#6f655c', maxWidth: 560, margin: '0 0 36px', lineHeight: 1.6 }}>
          A quiet, gated community on Vista Loop, central to the parks, golf, and everything Central Florida.
        </p>
        <div
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            height: 'clamp(280px, 42vh, 420px)',
            border: '1px solid #ddd3c4',
          }}
        >
          <iframe
            title="Map of Vista Loop, Davenport FL"
            src="https://maps.google.com/maps?q=Vista%20Loop%2C%20Davenport%2C%20FL%2033897&t=&z=14&ie=UTF8&iwloc=&output=embed"
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Drive times */}
      <div className="max-w-[1180px] mx-auto" style={{ padding: '32px 32px 40px' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 28,
            color: '#2a231d',
            margin: '0 0 22px',
          }}
        >
          Drive times
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {DRIVE_TIMES.map(({ time, label }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                border: '1px solid #ecebe6',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: '#bd6a44' }}
              >
                {time}
              </div>
              <div style={{ fontSize: 15, color: '#2c2723', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What's nearby */}
      <section style={{ background: '#f7f3ec' }}>
        <div className="max-w-[1180px] mx-auto" style={{ padding: '64px 32px' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 28,
              color: '#2a231d',
              margin: '0 0 26px',
            }}
          >
            What&apos;s nearby
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 22,
            }}
          >
            {NEARBY.map(({ title, body }) => (
              <div
                key={title}
                style={{
                  background: '#fff',
                  border: '1px solid #ece6da',
                  borderRadius: 18,
                  padding: 30,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 21,
                    margin: '0 0 10px',
                    color: '#2a231d',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6f655c', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
