import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#2a231d', color: '#d8cfc2', marginTop: 'auto' }}>
      <div
        className="max-w-[1180px] mx-auto"
        style={{ padding: '60px 32px 40px' }}
      >
        <div className="flex flex-wrap gap-12 justify-between mb-11">
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div className="flex items-center gap-[11px] mb-4">
              <span
                className="flex items-center justify-center text-white"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: '#bd6a44',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17,
                }}
              >
                V
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#fff' }}>
                Vista Loop Villa
              </span>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#a89e90', margin: 0 }}>
              A luxury 4-bedroom villa with a private heated pool in Davenport, Orlando, 15 minutes from Disney.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#8a8073',
                marginBottom: 16,
              }}
            >
              Explore
            </div>
            <div className="flex flex-col gap-[11px]">
              {[
                { label: 'Gallery', href: '/gallery' },
                { label: 'Availability', href: '/availability' },
                { label: 'Location & area', href: '/location' },
                { label: 'Reviews', href: '/reviews' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: '#d8cfc2', fontSize: 14.5, textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: '#8a8073',
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: 14.5, color: '#d8cfc2' }}>
              <span>stay@vistaloopvilla.com</span>
              <span>+1 (407) 555-0148</span>
              <span>Davenport, FL 33897</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #3d342c',
            paddingTop: 24,
            fontSize: 13,
            color: '#8a8073',
          }}
        >
          © 2026 Vista Loop Villa · Vista Park Resort, Davenport, Florida
        </div>
      </div>
    </footer>
  );
}
