'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleGalleryProps {
  images: Array<{
    id: string;
    imageUrl: string;
    altText: string | null;
  }>;
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (images.length === 0) {
    return (
      <div className="relative w-full pb-[100%] bg-zinc-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-zinc-500">No images available</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={image.altText || title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="absolute bottom-0 left-0 z-20 bg-white hover:bg-zinc-100 transition-all disabled:opacity-50 p-4 pl-6 pr-8"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="absolute bottom-0 right-0 z-20 bg-white hover:bg-zinc-100 transition-all disabled:opacity-50 p-4 pr-6 pl-8"
              style={{
                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            <div className="absolute bottom-16 right-8 z-20 text-white text-4xl font-light">
              <span className="font-normal">{currentIndex + 1}</span>
              <span className="text-white/50 mx-2">/</span>
              <span className="text-white/50">{images.length}</span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`relative flex-shrink-0 w-32 h-24 overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-red-600' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${title} - Image ${index + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
