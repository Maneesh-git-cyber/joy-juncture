import React from 'react';

type Props = {
  size?: 'small' | 'medium' | 'large' | number;
  label?: string;
};

const Loading: React.FC<Props> = ({ size = 'medium', label = 'Loading' }) => {
  const numericSize = typeof size === 'number' ? size : (size === 'small' ? 28 : size === 'large' ? 72 : 44);
  const svgSize = numericSize;
  const radius = 18; // for viewBox 44x44
  const strokeWidth = 4;
  const gradientId = React.useId ? `m3grad-${React.useId()}` : 'm3grad';

  return (
    <div role="status" aria-busy="true" className="flex items-center justify-center">
      <svg
        className="m3-svg-spinner"
        width={svgSize}
        height={svgSize}
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--m3-spinner-1)" />
            <stop offset="60%" stopColor="var(--m3-spinner-2)" />
            <stop offset="100%" stopColor="var(--m3-spinner-3)" />
          </linearGradient>
        </defs>

        <circle className="m3-track" cx="22" cy="22" r={radius} fill="none" strokeWidth={strokeWidth} />
        <circle
          className="m3-head"
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
        />
      </svg>
      <span className="m3-visually-hidden">{label}</span>
    </div>
  );
};

export default Loading;
