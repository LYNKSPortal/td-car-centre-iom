-- Add 'coming_soon' value to vehicle_status enum
ALTER TYPE vehicle_status ADD VALUE IF NOT EXISTS 'coming_soon';
