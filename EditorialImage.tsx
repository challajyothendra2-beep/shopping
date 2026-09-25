import React, { useState } from 'react';

interface EditorialImageProps {
  primarySrc: string;
  secondarySrc?: string;
  alt: string;
  aspectRatio?: '3/4' | '4/3' | '16/9' | '1/1';
  className?: string;
  isHovered?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  primarySrc,
  secondarySrc,
  alt,
  aspectRatio = '3/4',
  className = '',
  isHovered = false
}) => {
  const [primaryLoaded, setPrimaryLoaded] = useState(false);
  const [primaryError, setPrimaryError] = useState(false);
  const [secondaryError, setSecondaryError] = useState(false);

  const aspectClass = {
    '3/4': 'aspect-[3/4]',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square'
  }[aspectRatio];

  const showSecondary = isHovered && secondarySrc && !secondaryError;

  return (
    <div className={`relative overflow-hidden bg-[#f4f4f4] ${aspectClass} ${className}`}>
      {/* Loading shimmer placeholder */}
      {!primaryLoaded && !primaryError && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}

      {/* Primary Image */}
      {!primaryError ? (
        <img
          src={primarySrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setPrimaryLoaded(true)}
          onError={() => setPrimaryError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            showSecondary ? 'opacity-0 scale-100' : 'opacity-100 scale-100 group-hover:scale-105'
          } ${primaryLoaded ? 'filter-none' : 'blur-sm'}`}
        />
      ) : null}

      {/* Secondary Image (Hover Lookbook Angle) */}
      {secondarySrc && !secondaryError && (
        <img
          src={secondarySrc}
          alt={`${alt} - alternate perspective`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setSecondaryError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            showSecondary ? 'opacity-100 scale-105' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* Styled Minimalist High-Fashion Fallback Container if images fail */}
      {(primaryError || (showSecondary && secondaryError)) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#f8f8f8] to-[#ebebeb] text-black text-center select-none">
          <div className="w-10 h-10 mb-4 border border-black/30 flex items-center justify-center">
            <span className="font-zara-serif italic text-xs tracking-widest font-serif">Z</span>
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-1">
            EDITORIAL ARCHIVE
          </span>
          <p className="text-xs font-medium tracking-wider uppercase text-neutral-900 max-w-[200px] line-clamp-2">
            {alt}
          </p>
          <span className="text-[9px] tracking-widest text-neutral-400 mt-2 font-mono">
            COLLECTION / 2026
          </span>
        </div>
      )}
    </div>
  );
};
