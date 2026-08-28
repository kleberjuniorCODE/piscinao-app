import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style,
      }}
    />
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="skeleton-card-container">
    <div className="skeleton-card-header">
      <Skeleton width="48px" height="48px" borderRadius="50%" />
      <div className="skeleton-card-text">
        <Skeleton width="140px" height="16px" />
        <Skeleton width="90px" height="12px" style={{ marginTop: '6px' }} />
      </div>
    </div>
    <Skeleton width="100%" height="40px" borderRadius="10px" style={{ margin: '14px 0' }} />
    <Skeleton width="100%" height="8px" borderRadius="4px" />
    <div className="skeleton-card-actions">
      <Skeleton width="48%" height="34px" borderRadius="8px" />
      <Skeleton width="48%" height="34px" borderRadius="8px" />
    </div>
  </div>
);

export const SkeletonTableRows: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} className="skeleton-table-row">
        <td><Skeleton width="40px" height="40px" borderRadius="50%" /></td>
        <td><Skeleton width="160px" height="16px" /></td>
        <td><Skeleton width="120px" height="14px" /></td>
        <td><Skeleton width="80px" height="24px" borderRadius="20px" /></td>
        <td><Skeleton width="100px" height="14px" /></td>
        <td><Skeleton width="80px" height="32px" borderRadius="8px" /></td>
      </tr>
    ))}
  </>
);
