import { pgTable, uuid, varchar, text, integer, numeric, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const vehicleStatusEnum = pgEnum('vehicle_status', ['available', 'reserved', 'sold']);
export const transmissionEnum = pgEnum('transmission', ['Manual', 'Automatic', 'Semi-Automatic']);
export const fuelTypeEnum = pgEnum('fuel_type', ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid']);
export const bodyTypeEnum = pgEnum('body_type', [
  'Saloon',
  'Hatchback',
  'Estate',
  'SUV',
  'Coupe',
  'Convertible',
  'MPV',
  'Crossover (CUV)',
  'Convertible SUV',
  'Coupe SUV',
  'Hatchback SUV',
  'Electric (EV)',
  'Hybrid',
  'Pickup Truck',
  'Off-road (4x4)',
  'Luxury Saloon',
  'Sports Car',
  'Supercar',
  'Hypercar',
  'Roadster',
  'Fastback',
  'Shooting Brake',
  'Microcar',
  'City Car'
]);
export const drivetrainEnum = pgEnum('drivetrain', ['FWD', 'RWD', 'AWD', '4WD']);
export const enquiryTypeEnum = pgEnum('enquiry_type', ['general', 'vehicle', 'finance', 'test_drive', 'part_exchange', 'sell_my_car', 'sourcing']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'staff']);

export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  variant: varchar('variant', { length: 100 }),
  year: integer('year').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  financeMonthly: numeric('finance_monthly', { precision: 10, scale: 2 }),
  mileage: integer('mileage').notNull(),
  transmission: transmissionEnum('transmission').notNull(),
  fuelType: fuelTypeEnum('fuel_type').notNull(),
  bodyType: bodyTypeEnum('body_type').notNull(),
  drivetrain: drivetrainEnum('drivetrain'),
  colour: varchar('colour', { length: 50 }),
  interiorColour: varchar('interior_colour', { length: 50 }),
  engineSize: varchar('engine_size', { length: 50 }),
  doors: integer('doors'),
  seats: integer('seats'),
  registration: varchar('registration', { length: 20 }),
  previousOwners: integer('previous_owners'),
  height: varchar('height', { length: 50 }),
  length: varchar('length', { length: 50 }),
  width: varchar('width', { length: 50 }),
  description: text('description'),
  status: vehicleStatusEnum('status').default('available').notNull(),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const vehicleImages = pgTable('vehicle_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').notNull().references(() => vehicles.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  publicId: text('public_id'),
  altText: varchar('alt_text', { length: 255 }),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vehicleFeatures = pgTable('vehicle_features', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').notNull().references(() => vehicles.id, { onDelete: 'cascade' }),
  featureName: varchar('feature_name', { length: 255 }).notNull(),
});

export const enquiries = pgTable('enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  enquiryType: enquiryTypeEnum('enquiry_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  handled: boolean('handled').default(false).notNull(),
});

export const servicePages = pgTable('service_pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  heroTitle: varchar('hero_title', { length: 255 }),
  heroSubtitle: varchar('hero_subtitle', { length: 255 }),
  published: boolean('published').default(true).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const dealershipSettings = pgTable('dealership_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  address: text('address').notNull(),
  companyNumber: varchar('company_number', { length: 50 }),
  openingHours: text('opening_hours'),
  termsUrl: varchar('terms_url', { length: 255 }),
  privacyUrl: varchar('privacy_url', { length: 255 }),
  instagramUrl: varchar('instagram_url', { length: 255 }),
  facebookUrl: varchar('facebook_url', { length: 255 }),
  youtubeUrl: varchar('youtube_url', { length: 255 }),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('staff').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  images: many(vehicleImages),
  features: many(vehicleFeatures),
  enquiries: many(enquiries),
}));

export const vehicleImagesRelations = relations(vehicleImages, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleImages.vehicleId],
    references: [vehicles.id],
  }),
}));

export const vehicleFeaturesRelations = relations(vehicleFeatures, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleFeatures.vehicleId],
    references: [vehicles.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [enquiries.vehicleId],
    references: [vehicles.id],
  }),
}));
