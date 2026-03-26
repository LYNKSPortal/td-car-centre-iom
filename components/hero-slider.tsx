'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const slides = [
  {
    id: 1,
    image: '/images/homepage-screen.jpg',
    title: 'Car Finance Made Easy',
    subtitle: "Wigan's finance Specialists",
    buttonText: 'Apply for Finance',
    buttonLink: '/finance',
  },
  {
    id: 2,
    image: '/images/homepage-screen.jpg',
    title: 'Premium Vehicles',
    subtitle: 'Handpicked prestige cars',
    buttonText: 'View Stock',
    buttonLink: '/inventory',
  },
  {
    id: 3,
    image: '/images/homepage-screen.jpg',
    title: 'Part Exchange Available',
    subtitle: 'Get the best value for your car',
    buttonText: 'Learn More',
    buttonLink: '/services/part-exchange',
  },
  {
    id: 4,
    image: '/images/homepage-screen.jpg',
    title: 'Nationwide Delivery',
    subtitle: 'We deliver to your door',
    buttonText: 'Contact Us',
    buttonLink: '/contact',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          <div className="relative container mx-auto h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-sm text-zinc-300 mb-2">{slide.subtitle}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                {slide.title}
              </h1>
              <Button variant="outline" size="lg" asChild>
                <Link href={slide.buttonLink}>
                  {slide.buttonText} →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 transition-all disabled:opacity-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-2 text-white text-lg font-semibold">
          <span>{currentSlide + 1}</span>
          <span className="text-zinc-400">/</span>
          <span className="text-zinc-400">{slides.length}</span>
        </div>
        
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 transition-all disabled:opacity-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
