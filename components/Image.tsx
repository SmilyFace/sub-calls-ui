import React, { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative h-10 w-10 object-cover ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${loading ? 'hidden' : ''}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/image.webp';
          setLoading(false);
        }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
