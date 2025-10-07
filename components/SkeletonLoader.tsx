'use client';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export function SkeletonLoader({ 
  className = '', 
  variant = 'rectangular',
  width = 'w-full',
  height = 'h-4'
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-slate-700 bg-opacity-50';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${width} ${height} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SkeletonLoader variant="circular" width="w-10" height="h-10" />
          <SkeletonLoader width="w-20" height="h-5" />
        </div>
        <SkeletonLoader width="w-16" height="h-8" />
      </div>
      <SkeletonLoader width="w-24" height="h-4" />
    </div>
  );
}

export function InsightSkeleton() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-start gap-3">
        <SkeletonLoader variant="circular" width="w-10" height="h-10" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader width="w-full" height="h-4" />
          <SkeletonLoader width="w-3/4" height="h-4" />
          <SkeletonLoader width="w-24" height="h-8" className="mt-3" />
        </div>
      </div>
    </div>
  );
}