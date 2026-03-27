import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('en-GB').format(mileage);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDimension(dimension: string): string {
  // Extract numeric value from dimension string (e.g., "1850mm" or "1850")
  const numericValue = parseFloat(dimension.replace(/[^0-9.]/g, ''));
  
  if (isNaN(numericValue)) {
    return dimension;
  }
  
  // Convert mm to feet (1mm = 0.00328084 feet)
  const feet = (numericValue * 0.00328084).toFixed(1);
  
  return `${numericValue}mm (${feet} Feet)`;
}
