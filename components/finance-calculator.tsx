'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { formatPrice } from '@/lib/utils';

export function FinanceCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(50000);
  const [deposit, setDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(6.9);
  const [termMonths, setTermMonths] = useState(48);

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                    (Math.pow(1 + monthlyRate, termMonths) - 1);
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayable = monthlyPayment * termMonths + deposit;
  const totalInterest = totalPayable - vehiclePrice;

  return (
    <div className="bg-zinc-900/50 border border-white/10 p-8">
      <div className="space-y-6 mb-8 finance-calculator-content">
        <div>
          <label className="block font-medium mb-2 text-zinc-300">
            Vehicle Price: {formatPrice(vehiclePrice)}
          </label>
          <input
            type="range"
            min="10000"
            max="300000"
            step="1000"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-zinc-500 mt-1">
            <span>£10,000</span>
            <span>£300,000</span>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-zinc-300">
            Deposit: {formatPrice(deposit)}
          </label>
          <input
            type="range"
            min="0"
            max={vehiclePrice * 0.5}
            step="500"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-zinc-500 mt-1">
            <span>£0</span>
            <span>{formatPrice(vehiclePrice * 0.5)}</span>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-zinc-300">
            Interest Rate: {interestRate.toFixed(1)}% APR
          </label>
          <input
            type="range"
            min="3"
            max="15"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-zinc-500 mt-1">
            <span>3.0%</span>
            <span>15.0%</span>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-zinc-300">
            Term: {termMonths} months ({Math.floor(termMonths / 12)} years)
          </label>
          <input
            type="range"
            min="12"
            max="84"
            step="12"
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-zinc-500 mt-1">
            <span>12 months</span>
            <span>84 months</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 to-red-600 p-6 finance-calculator-content">
        <p className="text-white/70 mb-1">Estimated Monthly Payment</p>
        <h2 className="text-4xl font-bold text-white">{formatPrice(monthlyPayment)}</h2>
      </div>
    </div>
  );
}
