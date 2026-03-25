-- Add publicId column to vehicle_images table for Cloudinary integration
ALTER TABLE vehicle_images ADD COLUMN IF NOT EXISTS public_id TEXT;
