-- Migration: Add interior_colour column to vehicles table
-- Created: 2026-03-25

ALTER TABLE "vehicles" ADD COLUMN "interior_colour" varchar(50);
