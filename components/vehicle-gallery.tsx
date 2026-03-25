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
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full pb-[100%] bg-zinc-950 overflow-hidden group">
        <Image
          src={images[currentIndex].imageUrl}
          alt={images[currentIndex].altText || title}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="absolute inset-0 object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-full pb-[100%] overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-red-600' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${title} - Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 10vw"
                className="absolute inset-0 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
