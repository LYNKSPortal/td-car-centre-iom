import { z } from 'zod';

export const vehicleFilterSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxYear: z.coerce.number().optional(),
  maxMileage: z.coerce.number().optional(),
  transmission: z.enum(['Manual', 'Automatic', 'Semi-Automatic']).optional(),
  fuelType: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid']).optional(),
  bodyType: z.enum(['Saloon', 'Coupe', 'SUV', 'Estate', 'Convertible', 'Hatchback', 'Sports Car']).optional(),
  drivetrain: z.enum(['FWD', 'RWD', 'AWD', '4WD']).optional(),
  status: z.enum(['available', 'reserved', 'sold']).optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'mileage-asc', 'year-desc']).optional(),
  page: z.coerce.number().default(1),
});

export const enquirySchema = z.object({
  vehicleId: z.string().uuid().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  enquiryType: z.enum(['general', 'vehicle', 'finance', 'test_drive', 'part_exchange', 'sell_my_car', 'sourcing']),
});

export const vehicleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  variant: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive('Price must be positive'),
  financeMonthly: z.number().positive().optional(),
  mileage: z.number().min(0),
  transmission: z.enum(['Manual', 'Automatic', 'Semi-Automatic']),
  fuelType: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid']),
  bodyType: z.enum(['Saloon', 'Coupe', 'SUV', 'Estate', 'Convertible', 'Hatchback', 'Sports Car']),
  drivetrain: z.enum(['FWD', 'RWD', 'AWD', '4WD']).optional(),
  colour: z.string().optional(),
  engineSize: z.string().optional(),
  doors: z.number().optional(),
  seats: z.number().optional(),
  registration: z.string().optional(),
  previousOwners: z.number().optional(),
  description: z.string().optional(),
  status: z.enum(['available', 'reserved', 'sold']).default('available'),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const financeCalculatorSchema = z.object({
  vehiclePrice: z.number().positive('Vehicle price must be positive'),
  deposit: z.number().min(0, 'Deposit cannot be negative'),
  interestRate: z.number().min(0).max(100, 'Interest rate must be between 0 and 100'),
  termMonths: z.number().min(12).max(84, 'Term must be between 12 and 84 months'),
});

export type VehicleFilter = z.infer<typeof vehicleFilterSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type VehicleInput = z.infer<typeof vehicleSchema>;
export type FinanceCalculatorInput = z.infer<typeof financeCalculatorSchema>;
