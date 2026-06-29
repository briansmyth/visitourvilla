'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Availability', href: '/availability' },
  { label: 'Location', href: '/location' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#ecebe6]"
      style={{ background: 'rgba(255,255,255,0.86)', backdropFilter: 'saturate(140%) blur(10px)' }}
    >
      <div
        className="max-w-[1180px] mx-auto flex items-center h-[74px]"
        style={{ padding: '0 32px', gap: 24 }}
      >
        {/* Logo — left */}
        <Link href="/" className="flex items-center no-underline flex-shrink-0" style={{ gap: 11 }}>
          <span
            className="flex items-center justify-center text-white flex-shrink-0"
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
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: '#2c2723',
              lineHeight: 1.15,
            }}
          >
            Vista Loop
            <br />
            Villa
          </span>
        </Link>

        {/* Desktop nav — true center */}
        <nav className="hidden md:flex items-center flex-1 justify-center" style={{ gap: 28 }}>
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#bd6a44' : '#2c2723',
                  textDecoration: 'none',
                  letterSpacing: '.01em',
                  paddingBottom: 2,
                  borderBottom: active ? '2px solid #bd6a44' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Book CTA + hamburger — right */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto md:ml-0">
          <Link
            href="/availability"
            className="hidden md:flex items-center justify-center text-center"
            style={{
              background: '#bd6a44',
              color: '#fff',
              borderRadius: 999,
              padding: '10px 20px',
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: 'none',
              lineHeight: 1.25,
              minWidth: 80,
            }}
          >
            Book your
            <br />
            stay
          </Link>
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ width: 22, height: 2, background: '#2c2723', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 22, height: 2, background: '#2c2723', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 22, height: 2, background: '#2c2723', borderRadius: 2, display: 'block' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-[#ecebe6] bg-white"
          style={{ padding: '12px 20px 18px' }}
        >
          <div className="flex flex-col gap-1">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontSize: 16,
                  color: '#2c2723',
                  padding: '11px 4px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/availability"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 8,
                background: '#bd6a44',
                color: '#fff',
                borderRadius: 999,
                padding: '13px',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
              }}
            >
              Book your stay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
