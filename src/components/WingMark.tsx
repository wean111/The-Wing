import React from 'react';

interface WingMarkProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Official geometric ascending zig-zag wing mark matching The Wing Labs deboss and brand identity.
 */
export const WingMark: React.FC<WingMarkProps> = ({
  className = 'w-7 h-5',
  strokeWidth = 2.6,
}) => {
  return (
    <svg
      viewBox="0 0 44 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 22L14.5 10.5L20.5 16.5L32.5 4.5L41 13"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};
