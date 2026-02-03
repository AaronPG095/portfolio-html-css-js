'use client';

import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'quality' | 'sizes'> {
  /**
   * Image quality (1-100). Default: 85 for photos, 90 for graphics
   */
  quality?: number;
  /**
   * Responsive image sizes. Default: responsive sizes for most use cases
   */
  sizes?: string;
  /**
   * Whether this is a priority image (above the fold). Default: false
   */
  priority?: boolean;
}

/**
 * OptimizedImage component that ensures WebP/AVIF optimization
 * with proper quality and responsive sizing.
 * 
 * Next.js automatically converts images to WebP/AVIF format when configured.
 * This component provides consistent optimization settings across the app.
 */
export default function OptimizedImage({
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      quality={quality}
      sizes={sizes}
      priority={priority}
      // Ensure proper loading strategy
      loading={priority ? undefined : 'lazy'}
    />
  );
}
