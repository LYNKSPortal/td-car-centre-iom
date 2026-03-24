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
      <div className="bg-zinc-950 border-b border-white/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Finance</h1>
          <p className="text-xl text-zinc-400">
            Competitive rates and flexible terms to suit your budget
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Finance Made <span className="text-red-600">Simple</span>
            </h2>
            <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
              At TD Car Centre, we understand that purchasing a prestige vehicle is a significant investment. 
              That's why we offer flexible finance solutions tailored to your individual circumstances.
            </p>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Our finance packages are designed to make luxury motoring accessible, with competitive rates 
              starting from 6.9% APR representative.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Competitive Rates</h3>
                  <p className="text-zinc-400 text-sm">From 6.9% APR representative on selected vehicles</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Flexible Terms</h3>
                  <p className="text-zinc-400 text-sm">Choose from 12 to 84 months to suit your budget</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Deposit Options</h3>
                  <p className="text-zinc-400 text-sm">Low deposit options available, or use your part exchange</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">FCA Regulated</h3>
                  <p className="text-zinc-400 text-sm">All finance provided by FCA regulated lenders</p>
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

        <div className="bg-zinc-900/50 border border-white/10 p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-red-600 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Choose Your Vehicle</h3>
              <p className="text-zinc-400 text-sm">
                Browse our stock and find your perfect prestige vehicle
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-red-600 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Get a Quote</h3>
              <p className="text-zinc-400 text-sm">
                Use our calculator or speak to our team for a personalized quote
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-red-600 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Drive Away</h3>
              <p className="text-zinc-400 text-sm">
                Complete your application and collect your vehicle
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-4">Important Information</h2>
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
