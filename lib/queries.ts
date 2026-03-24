import { db } from './db';
import { vehicles, vehicleImages, vehicleFeatures, enquiries, dealershipSettings } from './db/schema';
import { eq, and, gte, lte, desc, asc, sql, or } from 'drizzle-orm';
import { VehicleFilter } from './validations';

export async function getVehicles(filters: VehicleFilter) {
  const { 
    make, 
    model, 
    minPrice, 
    maxPrice, 
    minYear, 
    maxYear, 
    maxMileage, 
    transmission, 
    fuelType, 
    bodyType, 
    drivetrain, 
    status,
    sort = 'newest',
    page = 1 
  } = filters;

  const limit = 12;
  const offset = (page - 1) * limit;

  let conditions = [eq(vehicles.published, true)];

  if (make) conditions.push(eq(vehicles.make, make));
  if (model) conditions.push(eq(vehicles.model, model));
  if (minPrice) conditions.push(gte(vehicles.price, minPrice.toString()));
  if (maxPrice) conditions.push(lte(vehicles.price, maxPrice.toString()));
  if (minYear) conditions.push(gte(vehicles.year, minYear));
  if (maxYear) conditions.push(lte(vehicles.year, maxYear));
  if (maxMileage) conditions.push(lte(vehicles.mileage, maxMileage));
  if (transmission) conditions.push(eq(vehicles.transmission, transmission));
  if (fuelType) conditions.push(eq(vehicles.fuelType, fuelType));
  if (bodyType) conditions.push(eq(vehicles.bodyType, bodyType));
  if (drivetrain) conditions.push(eq(vehicles.drivetrain, drivetrain));
  if (status) conditions.push(eq(vehicles.status, status));

  let orderBy;
  switch (sort) {
    case 'price-asc':
      orderBy = asc(vehicles.price);
      break;
    case 'price-desc':
      orderBy = desc(vehicles.price);
      break;
    case 'mileage-asc':
      orderBy = asc(vehicles.mileage);
      break;
    case 'year-desc':
      orderBy = desc(vehicles.year);
      break;
    default:
      orderBy = desc(vehicles.createdAt);
  }

  const [vehiclesList, totalCount] = await Promise.all([
    db.query.vehicles.findMany({
      where: and(...conditions),
      orderBy,
      limit,
      offset,
      with: {
        images: {
          orderBy: asc(vehicleImages.sortOrder),
          limit: 1,
        },
      },
    }),
    db.select({ count: sql<number>`count(*)` })
      .from(vehicles)
      .where(and(...conditions))
      .then(res => Number(res[0].count)),
  ]);

  return {
    vehicles: vehiclesList,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
}

export async function getVehicleBySlug(slug: string) {
  const vehicle = await db.query.vehicles.findFirst({
    where: and(eq(vehicles.slug, slug), eq(vehicles.published, true)),
    with: {
      images: {
        orderBy: asc(vehicleImages.sortOrder),
      },
      features: true,
    },
  });

  return vehicle;
}

export async function getFeaturedVehicles(limit = 6) {
  return await db.query.vehicles.findMany({
    where: and(
      eq(vehicles.featured, true),
      eq(vehicles.published, true),
      eq(vehicles.status, 'available')
    ),
    orderBy: desc(vehicles.createdAt),
    limit,
    with: {
      images: {
        orderBy: asc(vehicleImages.sortOrder),
        limit: 1,
      },
    },
  });
}

export async function getSimilarVehicles(vehicleId: string, make: string, bodyType: string, limit = 4) {
  return await db.query.vehicles.findMany({
    where: and(
      eq(vehicles.published, true),
      eq(vehicles.status, 'available'),
      sql`${vehicles.id} != ${vehicleId}`,
      or(
        eq(vehicles.make, make),
        sql`${vehicles.bodyType} = ${bodyType}`
      )
    ),
    orderBy: desc(vehicles.createdAt),
    limit,
    with: {
      images: {
        orderBy: asc(vehicleImages.sortOrder),
        limit: 1,
      },
    },
  });
}

export async function getFilterOptions() {
  const [makes, models, transmissions, fuelTypes, bodyTypes, drivetrains] = await Promise.all([
    db.selectDistinct({ make: vehicles.make })
      .from(vehicles)
      .where(eq(vehicles.published, true))
      .orderBy(asc(vehicles.make)),
    db.selectDistinct({ model: vehicles.model })
      .from(vehicles)
      .where(eq(vehicles.published, true))
      .orderBy(asc(vehicles.model)),
    db.selectDistinct({ transmission: vehicles.transmission })
      .from(vehicles)
      .where(eq(vehicles.published, true)),
    db.selectDistinct({ fuelType: vehicles.fuelType })
      .from(vehicles)
      .where(eq(vehicles.published, true)),
    db.selectDistinct({ bodyType: vehicles.bodyType })
      .from(vehicles)
      .where(eq(vehicles.published, true)),
    db.selectDistinct({ drivetrain: vehicles.drivetrain })
      .from(vehicles)
      .where(eq(vehicles.published, true)),
  ]);

  return {
    makes: makes.map(m => m.make),
    models: models.map(m => m.model),
    transmissions: transmissions.map(t => t.transmission),
    fuelTypes: fuelTypes.map(f => f.fuelType),
    bodyTypes: bodyTypes.map(b => b.bodyType),
    drivetrains: drivetrains.map(d => d.drivetrain).filter(Boolean),
  };
}

export async function getDealershipSettings() {
  const settings = await db.query.dealershipSettings.findFirst();
  return settings;
}

export async function createEnquiry(data: {
  vehicleId?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  enquiryType: 'general' | 'vehicle' | 'finance' | 'test_drive' | 'part_exchange' | 'sell_my_car' | 'sourcing';
}) {
  const [enquiry] = await db.insert(enquiries).values(data).returning();
  return enquiry;
}

export async function getStockStats() {
  const [stats] = await db.select({
    total: sql<number>`count(*)`,
    available: sql<number>`count(*) filter (where ${vehicles.status} = 'available')`,
    reserved: sql<number>`count(*) filter (where ${vehicles.status} = 'reserved')`,
    sold: sql<number>`count(*) filter (where ${vehicles.status} = 'sold')`,
  }).from(vehicles).where(eq(vehicles.published, true));

  return {
    total: Number(stats.total),
    available: Number(stats.available),
    reserved: Number(stats.reserved),
    sold: Number(stats.sold),
  };
}
