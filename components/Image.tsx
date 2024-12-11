import React, { useState } from 'react';

const ImageWithSkeleton: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-10 w-10 object-cover">
      {loading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded ${loading ? 'hidden' : ''}`}
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
