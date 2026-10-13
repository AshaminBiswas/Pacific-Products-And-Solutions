import React, { useState } from 'react'
import { getOptimizedImageUrl } from '../../../lib/imageOptimization'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Target render width in pixels — used to request a correctly-sized image from CDN */
  renderWidth?: number;
  /** 1-100 quality for the transformed image (default 80) */
  quality?: number;
  /** Set to true for above-the-fold / hero images to skip lazy loading and elevate priority */
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  renderWidth = 800,
  quality = 80,
  priority = false,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const optimizedSrc = getOptimizedImageUrl(src, renderWidth, quality)

  const handleError = () => setDidError(true)
  const handleLoad  = () => setIsLoaded(true)

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 dark:bg-gray-800 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-ignore - fetchPriority is supported in HTML but missing in older React type definitions
      fetchpriority={priority ? 'high' : undefined}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  )
}
