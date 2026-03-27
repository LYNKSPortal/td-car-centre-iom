import { FinanceCalculator } from '@/components/finance-calculator';
import { Shield, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Car Finance - TD Car Centre',
  description: 'Flexible car finance options with competitive rates. Calculate your monthly payments and apply online.',
};

export default function FinancePage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-zinc-950 border-b border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">Car Finance</h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400">
            Competitive rates and flexible terms to suit your budget
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 lg:mb-6">
              Finance Made <span className="text-red-600">Simple</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-zinc-300 mb-3 md:mb-5 lg:mb-6 leading-relaxed">
              At TD Car Centre, we understand that purchasing a prestige vehicle is a significant investment. 
              That's why we offer flexible finance solutions tailored to your individual circumstances.
            </p>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Our finance packages are designed to make luxury motoring accessible, with competitive rates 
              starting from 6.9% APR representative.
            </p>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 lg:mb-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">Competitive Rates</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">From 6.9% APR representative on selected vehicles</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">Flexible Terms</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">Choose from 12 to 84 months to suit your budget</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">Deposit Options</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">Low deposit options available, or use your part exchange</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">FCA Regulated</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">All finance provided by FCA regulated lenders</p>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Speak to a Finance Specialist</Link>
            </Button>
          </div>

          <div>
            <FinanceCalculator />
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 lg:mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-3 md:mb-4">
                1
              </div>
              <h3 className="text-sm md:text-base font-semibold mb-2">Choose Your Vehicle</h3>
              <p className="text-zinc-400 text-sm">
                Browse our stock and find your perfect prestige vehicle
              </p>
            </div>

            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-3 md:mb-4">
                2
              </div>
              <h3 className="text-sm md:text-base font-semibold mb-2">Get a Quote</h3>
              <p className="text-zinc-400 text-sm">
                Use our calculator or speak to our team for a personalized quote
              </p>
            </div>

            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl mb-3 md:mb-4">
                3
              </div>
              <h3 className="text-sm md:text-base font-semibold mb-2">Drive Away</h3>
              <p className="text-zinc-400 text-sm">
                Complete your application and collect your vehicle
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-4 md:p-6 lg:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Important Information</h2>
          <div className="text-sm text-zinc-400 space-y-2">
            <p>
              <strong className="text-white">Representative Example:</strong> 6.9% APR representative. 
              Based on a cash price of £30,000 with a £3,000 deposit, leaving an amount of credit of £27,000. 
              48 monthly payments of £642.47. Total amount payable £33,838.56. Interest charged £6,838.56.
            </p>
            <p>
              Finance is subject to status. Terms and conditions apply. Applicants must be 18 or over. 
              Guarantees and indemnities may be required. Finance provided by FCA regulated lenders.
            </p>
            <p>
              TD Car Centre is a credit broker and not a lender. We can introduce you to a limited number 
              of lenders who may be able to offer you finance facilities for your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
