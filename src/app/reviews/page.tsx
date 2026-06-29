import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews – Vista Loop Villa',
  description: '47 verified guest reviews. Rated 4.9 stars. Read what families and golfers say about Vista Loop Villa.',
};

const REVIEWS = [
  {
    stars: 5,
    quote:
      '"Spotless and beautiful. The pool was the highlight for our kids and the beds were so comfortable. We\'ll be back next spring."',
    name: 'The Harrisons',
    loc: 'Atlanta, GA',
    date: 'May 2026',
  },
  {
    stars: 5,
    quote:
      '"Ten minutes to the first tee and fifteen to Disney — the perfect base for our golf-and-parks week. Host was incredibly responsive."',
    name: 'Mark D.',
    loc: 'Columbus, OH',
    date: 'Apr 2026',
  },
  {
    stars: 5,
    quote:
      '"Even better than the photos. Communication was effortless from booking to checkout. Truly a home away from home."',
    name: 'Priya & Sam',
    loc: 'Toronto, ON',
    date: 'Mar 2026',
  },
  {
    stars: 5,
    quote:
      '"Gated and quiet, but so close to everything. We felt safe letting the kids ride bikes and the heated pool meant swimming every evening."',
    name: 'The Nguyen family',
    loc: 'Houston, TX',
    date: 'Feb 2026',
  },
  {
    stars: 5,
    quote:
      '"Roomy enough for two families. Four en-suites meant no one fought over bathrooms — a small miracle on a group trip."',
    name: 'Karen B.',
    loc: 'Chicago, IL',
    date: 'Jan 2026',
  },
  {
    stars: 5,
    quote:
      '"The kitchen is fully stocked and the layout is great for entertaining. We cooked most nights and saved a fortune. Highly recommend."',
    name: 'James & Olivia',
    loc: 'London, UK',
    date: 'Dec 2025',
  },
];

const BARS = [
  { label: '5 ★', pct: 90 },
  { label: '4 ★', pct: 8 },
  { label: '3 ★', pct: 2 },
  { label: '2 ★', pct: 0 },
  { label: '1 ★', pct: 0 },
];

export default function ReviewsPage() {
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
        Reviews
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 'clamp(34px, 4.6vw, 52px)',
          lineHeight: 1.05,
          margin: '0 0 36px',
          color: '#2a231d',
        }}
      >
        What guests are saying
      </h1>

      {/* Summary band */}
      <div
        className="flex flex-col md:flex-row gap-12 items-center"
        style={{
          background: '#f7f3ec',
          border: '1px solid #ece6da',
          borderRadius: 20,
          padding: 40,
          marginBottom: 44,
        }}
      >
        <div style={{ textAlign: 'center', minWidth: 160 }}>
          <div
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, lineHeight: 1, color: '#2a231d' }}
          >
            4.9
          </div>
          <div style={{ color: '#c2a36b', letterSpacing: 3, fontSize: 16, margin: '10px 0 6px' }}>★★★★★</div>
          <div style={{ fontSize: 14, color: '#6f655c' }}>47 verified reviews</div>
        </div>
        <div className="flex flex-col gap-[9px]" style={{ flex: 1, minWidth: 240 }}>
          {BARS.map(({ label, pct }) => (
            <div key={label} className="flex items-center gap-3">
              <span style={{ fontSize: 13, color: '#6f655c', width: 36 }}>{label}</span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: '#e6ddcd',
                  borderRadius: 99,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{ width: `${pct}%`, height: '100%', background: '#bd6a44' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards — CSS columns */}
      <div style={{ columns: 2, columnGap: 22 }} className="[columns:1] md:[columns:2]">
        {REVIEWS.map(({ stars, quote, name, loc, date }) => (
          <div
            key={name}
            style={{
              breakInside: 'avoid',
              background: '#fff',
              border: '1px solid #ecebe6',
              borderRadius: 18,
              padding: 28,
              marginBottom: 22,
            }}
          >
            <div style={{ color: '#c2a36b', letterSpacing: 2, fontSize: 13, marginBottom: 12 }}>
              {'★'.repeat(stars)}
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                lineHeight: 1.55,
                color: '#2b3a4c',
                margin: '0 0 16px',
              }}
            >
              {quote}
            </p>
            <div style={{ fontSize: 13.5, color: '#6f655c' }}>
              <strong style={{ color: '#2c2723' }}>{name}</strong> · {loc} · {date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
