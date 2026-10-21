import React, { useState } from 'react';

export interface WillovateLogoProps {
  height?: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  title?: string;
  /**
   * 'light' for light backgrounds (default: dark typography)
   * 'dark' for dark backgrounds (white typography)
   */
  variant?: 'light' | 'dark';
  /** Alternative alias for variant="dark" */
  inverted?: boolean;
}

export default function WillovateLogo({
  height = 32,
  className = '',
  onClick,
  style = {},
  title,
  variant = 'light',
  inverted = false,
}: WillovateLogoProps) {
  const isDark = variant === 'dark' || inverted;
  const targetSrc = isDark ? '/willovate-one-logo-white.png' : '/willovate-one-logo.png';
  const [hasError, setHasError] = useState(false);

  const src = hasError ? '/willovate-one-logo.png' : targetSrc;

  return (
    <div
      className={`willovate-one-brand ${isDark ? 'willovate-one-brand-dark' : 'willovate-one-brand-light'} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
      title={title || "Willovate One"}
    >
      <img
        src={src}
        alt="Willovate One"
        onError={() => {
          if (!hasError && isDark) {
            setHasError(true);
          }
        }}
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
