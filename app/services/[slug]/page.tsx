import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/enquiry-form';

const servicePages = {
  'warranty': {
    title: 'Vehicle Warranty',
    heroTitle: 'Comprehensive Vehicle Warranty',
    heroSubtitle: 'Drive with complete peace of mind',
    content: `
      <h2>Protection You Can Trust</h2>
      <p>All our vehicles come with comprehensive warranty options to give you complete peace of mind. We understand that purchasing a prestige vehicle is a significant investment, which is why we offer industry-leading warranty coverage.</p>
      
      <h3>What's Covered</h3>
      <ul>
        <li>Engine and transmission</li>
        <li>Electrical systems</li>
        <li>Suspension and steering</li>
        <li>Braking system</li>
        <li>Air conditioning</li>
        <li>And much more...</li>
      </ul>
      
      <h3>Warranty Options</h3>
      <p>We offer flexible warranty packages from 3 months to 3 years, with options to extend coverage. All warranties include:</p>
      <ul>
        <li>UK-wide coverage</li>
        <li>Roadside assistance</li>
        <li>Courtesy car provision</li>
        <li>No excess on claims</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
  },
  'part-exchange': {
    title: 'Part Exchange',
    heroTitle: 'Part Exchange Your Vehicle',
    heroSubtitle: 'Get the best value for your current car',
    content: `
      <h2>Simple and Hassle-Free</h2>
      <p>Looking to upgrade to a prestige vehicle? Our part exchange service makes it simple and convenient. We'll give you a competitive valuation for your current vehicle and use it as part payment towards your next dream car.</p>
      
      <h3>How It Works</h3>
      <ol>
        <li><strong>Get a Valuation:</strong> Contact us with details of your vehicle</li>
        <li><strong>Vehicle Inspection:</strong> We'll arrange to inspect your car</li>
        <li><strong>Receive Your Offer:</strong> Get a competitive offer within 24 hours</li>
        <li><strong>Choose Your New Car:</strong> Browse our stock and select your upgrade</li>
        <li><strong>Complete the Deal:</strong> We handle all the paperwork</li>
      </ol>
      
      <h3>What We Accept</h3>
      <p>We accept all makes and models in part exchange, from everyday vehicles to prestige and performance cars. Get in touch today for a no-obligation valuation.</p>
    `,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  'sell-your-car': {
    title: 'Sell Your Car',
    heroTitle: 'Sell Your Car to Us',
    heroSubtitle: 'Quick, easy, and competitive prices',
    content: `
      <h2>We're Always Buying</h2>
      <p>Looking to sell your prestige or performance vehicle? TD Car Centre is always interested in purchasing quality vehicles. We offer competitive prices and a straightforward, hassle-free process.</p>
      
      <h3>Why Sell to Us?</h3>
      <ul>
        <li>Competitive market valuations</li>
        <li>Quick decision - often within 24 hours</li>
        <li>Immediate payment</li>
        <li>No fees or hidden charges</li>
        <li>We handle all paperwork</li>
        <li>Collection service available</li>
      </ul>
      
      <h3>What We're Looking For</h3>
      <p>We're particularly interested in:</p>
      <ul>
        <li>Prestige and luxury vehicles</li>
        <li>Performance and sports cars</li>
        <li>Premium SUVs</li>
        <li>Low mileage, well-maintained vehicles</li>
        <li>Full service history preferred</li>
      </ul>
      
      <p>Get in touch today for a no-obligation valuation. Simply fill in the form below with your vehicle details and we'll get back to you promptly.</p>
    `,
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80',
  },
  'vehicle-sourcing': {
    title: 'Vehicle Sourcing',
    heroTitle: 'Vehicle Sourcing Service',
    heroSubtitle: "Can't find what you're looking for? We'll find it for you",
    content: `
      <h2>Your Dream Car, Sourced</h2>
      <p>Can't find the exact vehicle you're looking for in our current stock? Our vehicle sourcing service gives you access to an extensive network of prestige and performance vehicles across the UK and Europe.</p>
      
      <h3>How Our Sourcing Service Works</h3>
      <ol>
        <li><strong>Tell Us What You Want:</strong> Provide details of your ideal vehicle</li>
        <li><strong>We Search:</strong> Our team searches our extensive network</li>
        <li><strong>We Present Options:</strong> Receive details of suitable vehicles</li>
        <li><strong>Inspection & Purchase:</strong> We inspect and acquire your chosen vehicle</li>
        <li><strong>Delivery:</strong> Your car is prepared and delivered to you</li>
      </ol>
      
      <h3>What We Can Source</h3>
      <ul>
        <li>Specific models and variants</li>
        <li>Particular colors and specifications</li>
        <li>Low mileage examples</li>
        <li>Rare and limited edition vehicles</li>
        <li>Classic and modern prestige cars</li>
      </ul>
      
      <h3>The Benefits</h3>
      <ul>
        <li>Access to vehicles not publicly advertised</li>
        <li>Expert knowledge and industry connections</li>
        <li>Full pre-purchase inspection</li>
        <li>Competitive pricing</li>
        <li>Complete peace of mind</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  },
};

export async function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = servicePages[slug as keyof typeof servicePages];

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} - TD Car Centre`,
    description: service.heroSubtitle,
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = servicePages[slug as keyof typeof servicePages];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-zinc-950 border-b border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">{service.heroTitle}</h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400">{service.heroSubtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div 
              className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-xl md:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-3 md:prose-h2:mb-5 lg:prose-h2:mb-6 prose-h2:mt-6 md:prose-h2:mt-10 lg:prose-h2:mt-12
                prose-h3:text-base md:prose-h3:text-lg lg:prose-h3:text-xl prose-h3:mb-2 md:prose-h3:mb-3 lg:prose-h3:mb-4 prose-h3:mt-4 md:prose-h3:mt-6 lg:prose-h3:mt-8 prose-h3:text-red-600
                prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-3 md:prose-p:mb-5 lg:prose-p:mb-6
                prose-ul:text-zinc-300 prose-ul:mb-3 md:prose-ul:mb-5 lg:prose-ul:mb-6
                prose-ol:text-zinc-300 prose-ol:mb-3 md:prose-ol:mb-5 lg:prose-ol:mb-6
                prose-li:mb-1 md:prose-li:mb-2
                prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EnquiryForm />
              
              <div className="mt-4 md:mt-5 lg:mt-6 bg-zinc-900/50 border border-white/10 p-4 md:p-5 lg:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
                <div className="space-y-1.5 md:space-y-2">
                  <Link href="/inventory" className="block text-sm md:text-base text-zinc-400 hover:text-white transition-colors">
                    View Our Stock
                  </Link>
                  <Link href="/finance" className="block text-zinc-400 hover:text-white transition-colors">
                    Finance Options
                  </Link>
                  <Link href="/contact" className="block text-zinc-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/about" className="block text-zinc-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-zinc-900 to-black border border-white/10 p-6 md:p-10 lg:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Get Started?</h2>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 mb-4 md:mb-6 lg:mb-8">
            Get in touch with our team today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+441234567890">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
