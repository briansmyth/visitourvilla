'use client';

import { useState } from 'react';
import Link from 'next/link';
import Placeholder from '@/components/Placeholder';

type HomeStyle = 'A' | 'B';

const STATS = [
  { value: '4', label: 'Bedrooms' },
  { value: '4', label: 'Bathrooms' },
  { value: '8', label: 'Sleeps' },
  { value: 'Heated', label: 'Private pool' },
  { value: 'Gated', label: 'Community' },
];

const FEATURES = [
  {
    title: 'Spacious & private',
    body: 'Four en-suite bedrooms and open living spaces give everyone room to spread out, perfect for families or two couples traveling together.',
  },
  {
    title: 'Resort-style pool',
    body: 'Unwind in your own screened, heated pool after a long day at the parks — sunshine without the crowds, lizards, or queues.',
  },
  {
    title: 'Ideal location',
    body: 'Fifteen minutes to Disney, close to championship golf, outlet shopping, and restaurants — all from a quiet gated street.',
  },
];

const DISTANCES = [
  { place: 'Walt Disney World', time: '15 min' },
  { place: 'ChampionsGate golf', time: '10 min' },
  { place: 'Universal Orlando', time: '30 min' },
  { place: "Orlando Int'l Airport (MCO)", time: '35 min' },
];

const REVIEWS = [
  {
    quote: '"Spotless, beautiful, and the pool was the highlight for our kids. We\'ll be back next spring."',
    name: 'The Harrisons',
    loc: 'Atlanta, GA',
  },
  {
    quote: '"Ten minutes to the first tee and fifteen to Disney. The perfect base for our golf-and-parks week."',
    name: 'Mark D.',
    loc: 'Columbus, OH',
  },
  {
    quote: '"Communication was effortless and the villa was even better than the photos. Truly a home away from home."',
    name: 'Priya & Sam',
    loc: 'Toronto, ON',
  },
];

const GALLERY_TILES = [
  { label: 'living room', span2: true },
  { label: 'kitchen', span2: false },
  { label: 'primary suite', span2: false },
  { label: 'pool deck', span2: false },
  { label: 'dining', span2: false },
];

export default function HomePage() {
  const [style, setStyle] = useState<HomeStyle>('A');

  return (
    <>
      {/* ── Hero A: Editorial ── */}
      {style === 'A' && (
        <section
          className="max-w-[1180px] mx-auto animate-vfade"
          style={{ padding: '72px 32px 64px' }}
        >
          <div
            className="flex gap-14 items-center flex-col md:flex-row"
          >
            {/* Left */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div
                style={{
                  fontSize: 12.5,
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  color: '#bd6a44',
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                Davenport · Orlando, Florida
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 'clamp(38px, 5vw, 60px)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.01em',
                  margin: '0 0 22px',
                  color: '#2a231d',
                }}
              >
                Your home away from home, minutes from the magic.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: '#6f655c', maxWidth: 480, margin: '0 0 32px' }}>
                A luxury 4-bedroom villa with a private heated pool in a gated resort community, just 15 minutes from
                Walt Disney World. Sleeps 8 in airy, light-filled comfort.
              </p>
              <div className="flex flex-wrap mb-7" style={{ gap: 14 }}>
                <Link
                  href="/availability"
                  style={{
                    background: '#bd6a44',
                    color: '#fff',
                    borderRadius: 999,
                    padding: '15px 30px',
                    fontSize: 15.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Check availability
                </Link>
                <Link
                  href="/gallery"
                  style={{
                    background: '#fff',
                    color: '#2c2723',
                    border: '1px solid #ddd2c2',
                    borderRadius: 999,
                    padding: '15px 30px',
                    fontSize: 15.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  View the gallery
                </Link>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14.5, color: '#6f655c' }}>
                <span style={{ color: '#c2a36b', letterSpacing: 2 }}>★★★★★</span>
                <span>
                  <strong style={{ color: '#2c2723' }}>4.9</strong> · 47 guest reviews
                </span>
              </div>
            </div>

            {/* Right: hero image */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <Placeholder
                label="photo, pool & villa exterior"
                variant="terracotta"
                style={{ borderRadius: 20, aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Hero B: Resort ── */}
      {style === 'B' && (
        <section className="relative animate-vfade">
          <div
            style={{
              position: 'relative',
              height: 'clamp(460px, 68vh, 640px)',
              background:
                'repeating-linear-gradient(135deg, #d8c3b0 0, #d8c3b0 20px, #cbb29c 20px, #cbb29c 40px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 18,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: 12,
                letterSpacing: '.1em',
                color: '#9a7f68',
                textTransform: 'uppercase',
              }}
            >
              photo, full-bleed hero (pool at dusk)
            </span>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(42,30,22,.20), rgba(42,30,22,.50))',
              }}
            />
            <div style={{ position: 'relative', textAlign: 'center', maxWidth: 760, padding: '0 32px' }}>
              <div
                style={{
                  fontSize: 12.5,
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  color: '#f0e2d6',
                  fontWeight: 600,
                  marginBottom: 18,
                }}
              >
                Davenport · Orlando, Florida
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 6vw, 66px)',
                  lineHeight: 1.03,
                  letterSpacing: '-0.01em',
                  margin: '0 0 20px',
                  color: '#fff',
                }}
              >
                Where your Orlando story begins.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: '#f3ebe2', maxWidth: 540, margin: '0 auto 30px' }}>
                A luxury 4-bedroom villa with a private heated pool, gated and serene, 15 minutes from the parks.
              </p>
              <Link
                href="/availability"
                style={{
                  background: '#fff',
                  color: '#2c2723',
                  borderRadius: 999,
                  padding: '16px 34px',
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Book your stay
              </Link>
            </div>
          </div>

          {/* Quick-bar */}
          <div
            className="max-w-[1000px] mx-auto"
            style={{ marginTop: -46, padding: '0 32px', position: 'relative', zIndex: 2 }}
          >
            <div
              className="flex flex-col md:flex-row gap-2 items-stretch"
              style={{
                background: '#fff',
                border: '1px solid #ecebe6',
                borderRadius: 18,
                boxShadow: '0 18px 50px -24px rgba(22,43,64,.32)',
                padding: 14,
              }}
            >
              {[
                { label: 'Check in', val: 'Select dates' },
                { label: 'Check out', val: 'Select dates' },
                { label: 'Nights', val: 'Flexible' },
              ].map(({ label, val }, i, arr) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRight: i < arr.length - 1 ? '1px solid #f0eee9' : undefined,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: '#8a96a5',
                      marginBottom: 5,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 15.5, color: '#2c2723', fontWeight: 500 }}>{val}</div>
                </div>
              ))}
              <Link
                href="/availability"
                style={{
                  background: '#bd6a44',
                  color: '#fff',
                  borderRadius: 13,
                  padding: '0 28px',
                  fontSize: 15.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 52,
                }}
              >
                Check availability
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Stats strip ── */}
      <section
        className="max-w-[1180px] mx-auto"
        style={{ padding: '48px 32px' }}
      >
        <div
          className="flex flex-wrap gap-6 justify-between"
          style={{ borderTop: '1px solid #ecebe6', borderBottom: '1px solid #ecebe6', padding: '28px 0' }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: 120, flex: 1 }}>
              <div
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: '#2a231d' }}
              >
                {value}
              </div>
              <div style={{ fontSize: 13.5, color: '#6f655c', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: '#f7f3ec' }}>
        <div className="max-w-[1180px] mx-auto" style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 560, marginBottom: 44 }}>
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
              Why guests love it
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                lineHeight: 1.1,
                margin: 0,
                color: '#2a231d',
              }}
            >
              Everything you need for an easy Orlando trip.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
            }}
          >
            {FEATURES.map(({ title, body }) => (
              <div
                key={title}
                style={{
                  background: '#fff',
                  border: '1px solid #ece6da',
                  borderRadius: 18,
                  padding: 34,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: '#f0dccd',
                    marginBottom: 20,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 22,
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

      {/* ── Gallery preview ── */}
      <section className="max-w-[1180px] mx-auto" style={{ padding: '80px 32px' }}>
        <div
          className="flex items-end justify-between gap-6 flex-wrap"
          style={{ marginBottom: 32 }}
        >
          <div>
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
              A peek inside
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                lineHeight: 1.1,
                margin: 0,
                color: '#2a231d',
              }}
            >
              Light, airy, and made for relaxing.
            </h2>
          </div>
          <Link
            href="/gallery"
            style={{
              color: '#bd6a44',
              fontSize: 15.5,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            View full gallery →
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 200,
            gap: 14,
          }}
        >
          {GALLERY_TILES.map(({ label, span2 }) => (
            <Placeholder
              key={label}
              label={label}
              style={{
                gridColumn: span2 ? 'span 2' : undefined,
                gridRow: span2 ? 'span 2' : undefined,
                borderRadius: 16,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Location preview ── */}
      <section style={{ background: '#f7f3ec' }}>
        <div className="max-w-[1180px] mx-auto" style={{ padding: '80px 32px' }}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Map */}
            <div
              style={{
                flex: 1.2,
                minWidth: 300,
                position: 'relative',
                borderRadius: 18,
                overflow: 'hidden',
                aspectRatio: '16/11',
                border: '1px solid #ddd3c4',
              }}
            >
              <iframe
                title="Map of Vista Park Resort, Davenport FL"
                src="https://maps.google.com/maps?q=Vista%20Loop%2C%20Davenport%2C%20FL%2033897&t=&z=14&ie=UTF8&iwloc=&output=embed"
                style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right column */}
            <div style={{ flex: 1, minWidth: 280 }}>
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
                Perfectly placed
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.4vw, 40px)',
                  lineHeight: 1.1,
                  margin: '0 0 24px',
                  color: '#2a231d',
                }}
              >
                Close to everything, away from the noise.
              </h2>
              <div className="flex flex-col gap-0">
                {DISTANCES.map(({ place, time }, i) => (
                  <div
                    key={place}
                    className="flex justify-between"
                    style={{
                      padding: '13px 0',
                      borderBottom: i < DISTANCES.length - 1 ? '1px solid #e6ddcd' : undefined,
                    }}
                  >
                    <span style={{ fontSize: 15.5, color: '#2c2723' }}>{place}</span>
                    <span style={{ fontSize: 15, color: '#bd6a44', fontWeight: 600 }}>{time}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/location"
                style={{
                  marginTop: 24,
                  display: 'inline-block',
                  color: '#bd6a44',
                  fontSize: 15.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Explore the area →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews preview ── */}
      <section className="max-w-[1180px] mx-auto" style={{ padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px' }}>
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
            Guest reviews
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 'clamp(28px, 3.4vw, 40px)',
              lineHeight: 1.1,
              margin: 0,
              color: '#2a231d',
            }}
          >
            Loved by families and golfers alike.
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 22,
          }}
        >
          {REVIEWS.map(({ quote, name, loc }) => (
            <div
              key={name}
              style={{
                background: '#fff',
                border: '1px solid #ecebe6',
                borderRadius: 18,
                padding: 30,
              }}
            >
              <div style={{ color: '#c2a36b', letterSpacing: 2, fontSize: 14, marginBottom: 14 }}>★★★★★</div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: '#2b3a4c',
                  margin: '0 0 20px',
                }}
              >
                {quote}
              </p>
              <div style={{ fontSize: 14, color: '#6f655c' }}>
                <strong style={{ color: '#2c2723' }}>{name}</strong> · {loc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="max-w-[1180px] mx-auto" style={{ padding: '0 32px 90px' }}>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-10 flex-wrap"
          style={{ background: '#bd6a44', borderRadius: 24, padding: '64px 56px' }}
        >
          <div style={{ minWidth: 280 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                lineHeight: 1.08,
                margin: '0 0 12px',
                color: '#fff',
              }}
            >
              Ready for your Orlando getaway?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: '#f0ddd0', margin: 0, maxWidth: 440 }}>
              Check the live calendar and send a request — we usually reply within a few hours.
            </p>
          </div>
          <Link
            href="/availability"
            style={{
              background: '#fff',
              color: '#2c2723',
              borderRadius: 999,
              padding: '16px 34px',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Check availability
          </Link>
        </div>
      </section>

      {/* ── Floating home style toggle ── */}
      <div
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 60,
          background: '#fff',
          border: '1px solid #e2ddd3',
          borderRadius: 999,
          boxShadow: '0 10px 30px -12px rgba(22,43,64,.4)',
          padding: 5,
          display: 'flex',
          gap: 4,
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 11, color: '#8a96a5', padding: '0 8px 0 10px', letterSpacing: '.04em' }}>
          Home style
        </span>
        {(['A', 'B'] as HomeStyle[]).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            style={{
              background: style === s ? '#bd6a44' : '#fff',
              color: style === s ? '#fff' : '#2c2723',
              border: 'none',
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {s === 'A' ? 'Editorial' : 'Resort'}
          </button>
        ))}
      </div>
    </>
  );
}
