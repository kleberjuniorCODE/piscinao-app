import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'inactive' | 'featured' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`ui-badge badge-${variant}`}>
      {children}
    </span>
  );
}
