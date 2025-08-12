import React, { useState } from 'react';
import { getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages';

interface ProfileImageProps {
  imageId: string;
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

/**
 * ProfileImage Component
 * 
 * A robust image component with built-in fallback handling for profile images.
 * Automatically falls back to default avatar if the specified image fails to load.
 */
export default function ProfileImage({ 
  imageId, 
  className = '', 
  alt,
  size = 'md',
  loading = 'lazy',
  onError 
}: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageSrc = hasError 
    ? '/profiles/default-avatar.svg'
    : getImageWithFallback(imageId);

  const altText = alt || getAltTextWithFallback(imageId);

  const baseClasses = 'object-cover rounded-full';
  const sizeClass = sizeClasses[size];
  const loadingClass = isLoading ? 'animate-pulse bg-gray-200' : '';

  return (
    <div className={`${sizeClass} ${baseClasses} ${loadingClass} ${className} relative overflow-hidden`}>
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover"
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
      />
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * <ProfileImage imageId="sarah-chen" size="lg" />
 * <ProfileImage imageId="maya-patel" className="ring-2 ring-primary-200" />
 * <ProfileImage imageId="invalid-id" onError={() => console.log('Image failed')} />
 */