-- Add vehicle dimension fields
ALTER TABLE vehicles ADD COLUMN height VARCHAR(50);
ALTER TABLE vehicles ADD COLUMN length VARCHAR(50);
ALTER TABLE vehicles ADD COLUMN width VARCHAR(50);
