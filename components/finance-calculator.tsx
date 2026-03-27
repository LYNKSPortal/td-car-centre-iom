'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { formatPrice } from '@/lib/utils';

interface FinanceCalculatorProps {
  vehiclePrice?: number;
}

const TERM_OPTIONS = [12, 24, 36, 48, 54, 60];
const FIXED_INTEREST_RATE = 7; // 7% APR fixed

export function FinanceCalculator({ vehiclePrice = 30000 }: FinanceCalculatorProps) {
  const [deposit, setDeposit] = useState(0);
  const [termMonths, setTermMonths] = useState(60); // Default 60 months

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    // Prevent deposit from exceeding vehicle price
    if (value <= vehiclePrice) {
      setDeposit(value);
    }
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    setTermMonths(TERM_OPTIONS[index]);
  };

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - deposit;
    if (principal <= 0) return 0;
    
    const monthlyRate = FIXED_INTEREST_RATE / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                    (Math.pow(1 + monthlyRate, termMonths) - 1);
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const currentTermIndex = TERM_OPTIONS.indexOf(termMonths);

  return (
    <div className="bg-zinc-900/50 border border-white/10 p-8">
      <div className="space-y-6 mb-8">
        {/* Vehicle Price Display */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Vehicle Sale Price
          </label>
          <div className="text-2xl font-bold text-white">
            {formatPrice(vehiclePrice)}
          </div>
        </div>

        {/* Deposit Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Deposit
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">£</span>
            <Input
              type="number"
              min="0"
              max={vehiclePrice}
              value={deposit}
              onChange={handleDepositChange}
              className="pl-8"
              placeholder="0"
            />
          </div>
        </div>

        {/* Repayment Term Slider */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Repayment Term: {termMonths} months
          </label>
          <input
            type="range"
            min="0"
            max={TERM_OPTIONS.length - 1}
            step="1"
            value={currentTermIndex}
            onChange={handleTermChange}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-2">
            {TERM_OPTIONS.map((term) => (
              <span key={term}>{term}m</span>
            ))}
          </div>
        </div>

        {/* Fixed Interest Rate Display */}
        <div className="text-sm text-zinc-400">
          Interest Rate: <span className="font-semibold text-white">{FIXED_INTEREST_RATE}% APR</span> (fixed)
        </div>
      </div>

      {/* Monthly Payment Display */}
      <div className="bg-gradient-to-r from-red-600 to-red-600 p-6">
        <p className="text-white/70 mb-1 text-sm">Estimated Repayment</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {formatPrice(monthlyPayment)} <span className="text-lg font-normal">per month</span>
        </h2>
        <p className="text-white/70 mt-1 text-sm">over {termMonths} months</p>
      </div>
    </div>
  );
}
