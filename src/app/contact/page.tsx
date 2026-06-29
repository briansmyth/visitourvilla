import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact – Vista Loop Villa',
  description: 'Get in touch with the hosts of Vista Loop Villa. Questions, availability, or anything else — we reply within a few hours.',
};

export default function ContactPage() {
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
        Contact
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
        Questions? Get in touch.
      </h1>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Form */}
        <div style={{ flex: 1.2, minWidth: 300 }}>
          <ContactForm />
        </div>

        {/* Contact card */}
        <div
          style={{
            flex: 1,
            minWidth: 260,
            background: '#f7f3ec',
            border: '1px solid #ece6da',
            borderRadius: 20,
            padding: 34,
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 22,
              margin: '0 0 22px',
              color: '#2a231d',
            }}
          >
            Reach us directly
          </h3>
          <div className="flex flex-col gap-5">
            {[
              { label: 'Email', value: 'stay@vistaloopvilla.com' },
              { label: 'Phone / WhatsApp', value: '+1 (407) 555-0148' },
              { label: 'Response time', value: 'Usually within a few hours' },
              {
                label: 'Address',
                value: (
                  <>
                    Vista Loop, Vista Park Resort
                    <br />
                    Davenport, FL 33897
                  </>
                ),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 11.5,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#8a96a5',
                    marginBottom: 5,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 15.5, color: '#2c2723', lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
