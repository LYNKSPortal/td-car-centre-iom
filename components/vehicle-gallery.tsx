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

  // Create placeholder images array if no images
  const displayImages = images.length === 0 
    ? [
        { id: '1', imageUrl: '/images/images-coming-soon.jpg', altText: 'Images coming soon' },
        { id: '2', imageUrl: '/images/images-coming-soon.jpg', altText: 'Images coming soon' },
        { id: '3', imageUrl: '/images/images-coming-soon.jpg', altText: 'Images coming soon' }
      ]
    : images;

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getPrevIndex = () => (currentIndex === 0 ? displayImages.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === displayImages.length - 1 ? 0 : currentIndex + 1);

  return (
    <div className="space-y-4">
      {/* Main carousel with side previews */}
      <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center gap-4">
        {displayImages.length > 1 && (
          <>
            {/* Previous image preview (left side) - 50% visible */}
            <div className="relative w-1/6 h-full z-0 opacity-50 overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-[200%]">
                <Image
                  src={displayImages[getPrevIndex()].imageUrl}
                  alt="Previous"
                  fill
                  sizes="12vw"
                  className="object-cover"
                />
              </div>
            </div>
          </>
        )}

        {/* Main centered image */}
        <div className="relative flex-1 h-full z-10">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
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
        </div>

        {displayImages.length > 1 && (
          <>
            {/* Next image preview (right side) - 50% visible */}
            <div className="relative w-1/6 h-full z-0 opacity-50 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[200%]">
                <Image
                  src={displayImages[getNextIndex()].imageUrl}
                  alt="Next"
                  fill
                  sizes="12vw"
                  className="object-cover"
                />
              </div>
            </div>
          </>
        )}

        {displayImages.length > 1 && (
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
              <span className="text-white/50">{displayImages.length}</span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail row */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`relative flex-shrink-0 w-32 h-24 overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-red-600' : 'opacity-70 hover:opacity-100'
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
