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

export const SkeletonProductCard: React.FC = () => (
  <div className="skeleton-product-card">
    <Skeleton width="100%" height="160px" borderRadius="14px" />
    <div className="skeleton-product-content">
      <Skeleton width="70%" height="18px" style={{ marginTop: '10px' }} />
      <Skeleton width="90%" height="14px" style={{ marginTop: '6px' }} />
      <div className="skeleton-product-footer">
        <Skeleton width="80px" height="22px" borderRadius="6px" />
        <Skeleton width="90px" height="36px" borderRadius="10px" />
      </div>
    </div>
  </div>
);
