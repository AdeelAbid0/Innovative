import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export function LoadingSpinner({ size = 'md', variant = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-muted-foreground'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`
        ${sizeClasses[size]} 
        border-2 
        ${colorClasses[variant]} 
        border-t-transparent 
        rounded-full 
        animate-spin
      `} />
    </div>
  );
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`loading-skeleton rounded-lg ${className}`} />
  );
}

export function LoadingCard() {
  return (
    <div className="card-premium p-6 space-y-4">
      <LoadingSkeleton className="h-48 w-full" />
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center">
        <LoadingSkeleton className="h-8 w-20" />
        <LoadingSkeleton className="h-6 w-16" />
      </div>
    </div>
  );
}