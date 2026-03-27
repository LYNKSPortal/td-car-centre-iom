import Image from 'next/image';
import { Shield, Award, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - TD Car Centre',
  description: 'Learn about TD Car Centre, your trusted partner in luxury and prestige vehicles.',
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-zinc-950 border-b border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">About TD Car Centre</h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400">
            Your trusted partner in luxury motoring
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-16 lg:mb-24">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&q=80"
              alt="TD Car Centre Showroom"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-5 lg:mb-6">
              Excellence in <span className="text-red-600">Luxury Motoring</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-zinc-300 mb-3 md:mb-5 lg:mb-6 leading-relaxed">
              TD Car Centre has established itself as a premier destination for luxury and prestige vehicles. 
              With years of experience in the automotive industry, we specialize in sourcing and supplying 
              the finest vehicles from the world's most prestigious manufacturers.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-zinc-300 mb-3 md:mb-5 lg:mb-6 leading-relaxed">
              Our passion for exceptional automobiles drives everything we do. From our carefully curated 
              inventory to our personalized customer service, we ensure that every aspect of your experience 
              with us reflects the premium nature of the vehicles we represent.
            </p>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Whether you're searching for a high-performance sports car, a luxurious SUV, or an elegant 
              grand tourer, our team of automotive specialists is dedicated to helping you find the perfect 
              vehicle to match your lifestyle and aspirations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16 lg:mb-24">
          <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6">
              <Shield className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">10+</h3>
            <p className="text-xs md:text-sm lg:text-base text-zinc-400">Years Experience</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6">
              <Award className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">500+</h3>
            <p className="text-xs md:text-sm lg:text-base text-zinc-400">Vehicles Sold</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6">
              <Users className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">98%</h3>
            <p className="text-xs md:text-sm lg:text-base text-zinc-400">Customer Satisfaction</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6">
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">5.0</h3>
            <p className="text-xs md:text-sm lg:text-base text-zinc-400">Average Rating</p>
          </div>
        </div>

        <div className="mb-8 md:mb-16 lg:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 lg:mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 lg:mb-4 text-red-600">Quality</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Every vehicle in our inventory is meticulously inspected and prepared to the highest standards. 
                We only offer vehicles that meet our exacting quality criteria.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 lg:mb-4 text-red-600">Transparency</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Honesty and transparency are at the core of our business. We provide complete vehicle histories 
                and detailed information to help you make informed decisions.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 lg:mb-4 text-red-600">Service</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                Our commitment to exceptional service extends beyond the sale. We're here to support you 
                throughout your ownership journey with dedicated after-sales care.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 p-6 md:p-10 lg:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 mb-4 md:mb-6 lg:mb-8">
            Browse our exceptional collection or get in touch with our team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/inventory">View Our Stock</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
