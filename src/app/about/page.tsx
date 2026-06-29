import type { Metadata } from 'next';
import Placeholder from '@/components/Placeholder';

export const metadata: Metadata = {
  title: 'About Your Hosts – Vista Loop Villa',
  description: 'Meet the local hosts behind Vista Loop Villa — a family who built the villa they always wished they had on holiday.',
};

const STATS = [
  { value: '< 3 hrs', label: 'Avg. reply time' },
  { value: 'Local', label: 'Hosts on call' },
  { value: '5 yrs', label: 'Hosting guests' },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1080px] mx-auto" style={{ padding: '64px 32px 90px' }}>
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
        Your hosts
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 'clamp(34px, 4.6vw, 52px)',
          lineHeight: 1.05,
          margin: '0 0 44px',
          color: '#2a231d',
        }}
      >
        Hospitality is personal here.
      </h1>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Portrait */}
        <div style={{ flex: '0 0 300px', maxWidth: 340 }}>
          <Placeholder
            label="photo, host portrait"
            style={{ aspectRatio: '1/1', borderRadius: 20 }}
          />
        </div>

        {/* Bio */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 19,
              lineHeight: 1.65,
              color: '#2b3a4c',
              margin: '0 0 20px',
            }}
          >
            We're a family who fell in love with Central Florida years ago, and we built this villa to be the
            home we always wished we'd had on our own trips.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6f655c', margin: '0 0 20px' }}>
            Every detail — from the heated pool to the fully stocked kitchen and the blackout blinds in the
            kids' rooms — comes from real family travel. We live nearby, so if anything comes up during your
            stay, we're only a message away.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6f655c', margin: '0 0 32px' }}>
            Whether you're here for the parks, a golf week, or just some quiet pool time, we want your stay
            to feel effortless. Welcome to your home away from home.
          </p>

          {/* Host stat cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16,
            }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: '#f7f3ec',
                  border: '1px solid #ece6da',
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#2a231d' }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 13.5, color: '#6f655c', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
