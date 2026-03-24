import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Truck, Search, CreditCard, RefreshCw, Headphones, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VehicleCard } from '@/components/vehicle-card';
import { getFeaturedVehicles } from '@/lib/queries';

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <div className="bg-black">
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
            alt="Luxury vehicle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Prestige Vehicles,<br />
              <span className="text-red-600">Exceptional Service</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Discover our curated collection of luxury and performance vehicles. 
              Competitive finance, nationwide delivery, and unparalleled customer care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="xl" asChild>
                <Link href="/inventory">
                  View Stock <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/finance">Apply for Finance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-red-600 to-red-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-black">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Car Finance Made Easy</h2>
              <p className="text-lg">Competitive rates from 6.9% APR representative</p>
            </div>
            <Button variant="default" size="lg" asChild>
              <Link href="/finance">Calculate Finance</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-xl text-zinc-400">Handpicked prestige and performance cars</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/inventory">
                View All Stock <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose TD Car Centre</h2>
            <p className="text-xl text-zinc-400">Premium service at every step</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Warranty</h3>
              <p className="text-zinc-400">All vehicles come with warranty options for complete peace of mind</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <Truck className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nationwide Delivery</h3>
              <p className="text-zinc-400">We deliver your dream car directly to your door, anywhere in the UK</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vehicle Sourcing</h3>
              <p className="text-zinc-400">Can't find what you're looking for? We'll source your perfect vehicle</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Finance</h3>
              <p className="text-zinc-400">Competitive finance packages tailored to your budget and requirements</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <RefreshCw className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Part Exchange</h3>
              <p className="text-zinc-400">Get the best value for your current vehicle with our part exchange service</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 text-center group hover:border-red-600/50 transition-all">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                <Headphones className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">After Sales Support</h3>
              <p className="text-zinc-400">Dedicated support team available to assist you after your purchase</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80"
                alt="About TD Car Centre"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Partner in<br />
                <span className="text-red-600">Luxury Motoring</span>
              </h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                At TD Car Centre, we specialize in premium and prestige vehicles. Our carefully curated 
                collection features the finest luxury cars from the world's most prestigious manufacturers.
              </p>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                With years of experience in the luxury automotive sector, we pride ourselves on delivering 
                exceptional customer service, competitive finance options, and a seamless purchasing experience.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <p className="text-xl text-zinc-400">Rated 5.0 out of 5 from over 200 reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-8">
              <div className="flex gap-1 text-red-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "Exceptional service from start to finish. The team went above and beyond to help me find 
                the perfect vehicle. Highly recommended!"
              </p>
              <p className="font-semibold">James Mitchell</p>
              <p className="text-sm text-zinc-500">Porsche 911 Owner</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8">
              <div className="flex gap-1 text-red-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "The finance process was incredibly smooth and transparent. Got a great deal on my Range Rover 
                and couldn't be happier with the service."
              </p>
              <p className="font-semibold">Sarah Thompson</p>
              <p className="text-sm text-zinc-500">Range Rover Owner</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8">
              <div className="flex gap-1 text-red-600 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "Professional, knowledgeable, and trustworthy. The car was delivered exactly as described. 
                Will definitely be returning for my next purchase."
              </p>
              <p className="font-semibold">David Chen</p>
              <p className="text-sm text-zinc-500">Mercedes-AMG Owner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-zinc-900 to-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-12 group hover:border-red-600/50 transition-all">
              <h3 className="text-3xl font-bold mb-4">Sell Your Car</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Get an instant valuation for your vehicle. We offer competitive prices and a hassle-free selling experience.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/services/sell-your-car">Get Valuation</Link>
              </Button>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-12 group hover:border-red-600/50 transition-all">
              <h3 className="text-3xl font-bold mb-4">Part Exchange</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Use your current vehicle as part payment towards your next dream car. Simple, quick, and convenient.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/services/part-exchange">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
