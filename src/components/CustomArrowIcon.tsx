import React from 'react';
import svgPaths from "../imports/svg-q963j19ivh";

interface CustomArrowIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CustomArrowIcon({ size = 'md', className = '' }: CustomArrowIconProps) {
  const dimensions = {
    sm: { width: 14, height: 10, iconSize: 16 },
    md: { width: 18, height: 13.32, iconSize: 20 },
    lg: { width: 22, height: 16, iconSize: 24 }
  };

  const { width, height, iconSize } = dimensions[size];

  return (
    <div 
      className={`overflow-hidden relative shrink-0 flex items-center justify-center ${className}`}
      style={{ 
        width: `${iconSize}px`, 
        height: `${iconSize}px`,
        borderRadius: '99px',
        background: 'var(--heading, #292929)'
      }}
    >
      <div className="flex items-center justify-center rotate-[315deg]">
        <svg 
          className="block" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 18 14"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <g clipPath="url(#clip0_118_853)">
            <path 
              clipRule="evenodd" 
              d={svgPaths.p31afb900} 
              fill="currentColor" 
              fillRule="evenodd" 
            />
          </g>
          <defs>
            <clipPath id="clip0_118_853">
              <rect fill="white" height="13.32" width="18" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}