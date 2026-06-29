import type { Metadata } from 'next';
import Placeholder from '@/components/Placeholder';

export const metadata: Metadata = {
  title: 'Gallery – Vista Loop Villa',
  description: 'Browse photos of the villa, pool, bedrooms, and outdoor spaces.',
};

const POOL = ['Heated pool', 'Screened lanai', 'Sun loungers', 'Exterior'];
const LIVING = ['Living room', 'Kitchen', 'Dining table'];
const BEDS = ['Primary suite', "Kids' room", 'Guest room', 'En-suite bath'];

function PhotoGrid({ items, variant }: { items: string[]; variant: 'terracotta' | 'neutral' }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 14,
        marginBottom: 48,
      }}
    >
      {items.map((label) => (
        <Placeholder
          key={label}
          label={label}
          variant={variant}
          style={{ aspectRatio: '4/3', borderRadius: 16 }}
        />
      ))}
    </div>
  );
}

export default function GalleryPage() {
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
        Gallery
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
        Take the tour
      </h1>
      <p style={{ fontSize: 17, color: '#6f655c', maxWidth: 540, margin: '0 0 48px', lineHeight: 1.6 }}>
        Replace these placeholders with your professional photos, drop them in and the layout adapts automatically.
      </p>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 24,
          color: '#2a231d',
          margin: '0 0 18px',
        }}
      >
        Pool &amp; outdoor
      </h3>
      <PhotoGrid items={POOL} variant="terracotta" />

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 24,
          color: '#2a231d',
          margin: '0 0 18px',
        }}
      >
        Living &amp; kitchen
      </h3>
      <PhotoGrid items={LIVING} variant="neutral" />

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 24,
          color: '#2a231d',
          margin: '0 0 18px',
        }}
      >
        Bedrooms &amp; baths
      </h3>
      <PhotoGrid items={BEDS} variant="neutral" />
    </div>
  );
}
