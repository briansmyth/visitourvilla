interface PlaceholderProps {
  label: string;
  variant?: 'terracotta' | 'neutral';
  className?: string;
  style?: React.CSSProperties;
}

export default function Placeholder({ label, variant = 'neutral', className, style }: PlaceholderProps) {
  const colors =
    variant === 'terracotta'
      ? { a: '#efe0d3', b: '#e7d2c0', text: '#a8836a' }
      : { a: '#eef2f5', b: '#e6ebef', text: '#8a99a8' };

  return (
    <div
      className={className}
      style={{
        background: `repeating-linear-gradient(135deg, ${colors.a} 0, ${colors.a} 16px, ${colors.b} 16px, ${colors.b} 32px)`,
        border: variant === 'terracotta' ? '1px solid #e6d4c4' : '1px solid #e7e2d8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '.08em',
          color: colors.text,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}
