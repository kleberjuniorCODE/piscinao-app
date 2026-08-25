import React from 'react';

export default function PiscinaoLogo({ width = 160, height = 36, color = '#FFFFFF' }: { width?: number; height?: number; color?: string }) {
  return (
    <span
      className="brand-kardust"
      style={{
        display: 'block',
        fontSize: '1.6rem',
        letterSpacing: '3px',
        color: color,
        textAlign: 'center',
        lineHeight: `${height}px`,
      }}
    >
      PISCINÃO
    </span>
  );
}
