'use client';

import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  border: '1px solid #d9d4ca',
  borderRadius: 11,
  padding: '13px 15px',
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#2c2723',
  outline: 'none',
  width: '100%',
  background: '#fff',
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: '#2c2723',
  marginBottom: 7,
  display: 'block',
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      preferredDates: (form.elements.namedItem('preferredDates') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div
        style={{
          background: '#e7f1ea',
          border: '1px solid #c7e0d2',
          borderRadius: 18,
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            color: '#1f6b46',
            marginBottom: 10,
          }}
        >
          Thanks for reaching out!
        </div>
        <p style={{ fontSize: 15.5, color: '#3a6b53', lineHeight: 1.6, margin: 0 }}>
          We've received your message and will reply within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Name + Email row */}
      <div className="flex flex-col md:flex-row gap-4">
        <div style={{ flex: 1 }}>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" name="name" type="text" required style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" required style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="preferredDates" style={labelStyle}>Preferred dates</label>
        <input
          id="preferredDates"
          name="preferredDates"
          type="text"
          placeholder="e.g. July 10–17"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {error && <p style={{ fontSize: 13.5, color: '#b4564b', margin: 0 }}>{error}</p>}

      <div>
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: '#bd6a44',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '15px 32px',
            fontSize: 15.5,
            fontWeight: 600,
            cursor: submitting ? 'default' : 'pointer',
          }}
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
