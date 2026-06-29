import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vista Loop Villa – Luxury Villa in Davenport, Orlando',
  description:
    'A luxury 4-bedroom villa with a private heated pool in Vista Park Resort, Davenport, Florida. 15 minutes from Walt Disney World. Sleeps 8.',
  openGraph: {
    title: 'Vista Loop Villa – Luxury Villa in Davenport, Orlando',
    description:
      'A luxury 4-bedroom villa with a private heated pool in Vista Park Resort, Davenport, Florida. 15 minutes from Walt Disney World.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
