import { db, dbClient } from '@/libs/DB';
import {
  amenities,
  facilities,
  facilityAmenities,
  facilityTypes,
  locations,
} from '@/models/Schema';
import { sql } from 'drizzle-orm';

async function resetSequences() {
  await db.execute(sql`ALTER SEQUENCE locations_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE facility_types_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE amenities_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE facilities_id_seq RESTART WITH 1`);
}

async function seed() {
  console.warn('🧼 Clearing tables...');
  await db.delete(facilityAmenities);
  await db.delete(facilities);
  await db.delete(facilityTypes);
  await db.delete(amenities);
  await db.delete(locations);

  await resetSequences();

  console.warn('🌱 Seeding data...');
  const [location] = await db.insert(locations).values({
    name: 'Sunshine Mall',
    address: '123 Sunshine St, City, Country',
    latitude: '1.2935',
    longitude: '103.845',
    description: 'A popular mall with baby-friendly facilities.',
  }).returning();

  if (!location) {
    throw new Error('Failed to insert location!');
  }

  await db.insert(facilityTypes).values([
    { name: 'Lactation Room', description: 'Private space for breastfeeding or pumping' },
    { name: 'Diaper Changing Station', description: 'Surface for changing baby diapers' },
    { name: 'Baby Care Room', description: 'Room equipped for baby care needs' },
    { name: 'Accessible Toilet', description: 'Toilet accessible for wheelchair users' },
    { name: 'Communal Toilet', description: 'Shared restroom space' },
  ]);

  const facilityTypeRecords = await db.select().from(facilityTypes);
  const getFacilityTypeId = (name: string) => facilityTypeRecords.find(f => f.name === name)?.id;

  await db.insert(amenities).values([
    { name: 'Sink', description: 'Water sink available' },
    { name: 'Hot Water Dispenser', description: 'Provides hot water for feeding' },
    { name: 'Changing Table', description: 'Flat surface for diaper changes' },
    { name: 'Nursing Chair', description: 'Comfortable chair for nursing' },
    { name: 'Electrical Outlet', description: 'Power socket for breast pumps' },
  ]);

  const amenityRecords = await db.select().from(amenities);
  const getAmenityId = (name: string) => amenityRecords.find(a => a.name === name)?.id;

  await db.insert(facilities).values([
    {
      locationId: location.id,
      facilityTypeId: getFacilityTypeId('Lactation Room')!,
      floor: '2',
      isAccessible: true,
      description: 'Private lactation room with chair, outlet and sink',
    },
    {
      locationId: location.id,
      facilityTypeId: getFacilityTypeId('Diaper Changing Station')!,
      floor: '2',
      isAccessible: true,
      description: 'Wall-mounted changing station in the restroom',
    },
    {
      locationId: location.id,
      facilityTypeId: getFacilityTypeId('Baby Care Room')!,
      floor: '3',
      isAccessible: false,
      description: 'Baby room with both lactation and diaper changing facilities',
    },
  ]);

  const facilityRecords = await db.select().from(facilities);
  const getFacilityId = (description: string) => facilityRecords.find(f => f.description?.includes(description))?.id;

  await db.insert(facilityAmenities).values([
    {
      facilityId: getFacilityId('Private lactation room')!,
      amenityId: getAmenityId('Nursing Chair')!,
    },
    {
      facilityId: getFacilityId('Private lactation room')!,
      amenityId: getAmenityId('Electrical Outlet')!,
    },
    {
      facilityId: getFacilityId('Private lactation room')!,
      amenityId: getAmenityId('Sink')!,
    },
    {
      facilityId: getFacilityId('Wall-mounted changing station')!,
      amenityId: getAmenityId('Changing Table')!,
    },
    {
      facilityId: getFacilityId('Baby room with both lactation and diaper changing facilities')!,
      amenityId: getAmenityId('Changing Table')!,
    },
    {
      facilityId: getFacilityId('Baby room with both lactation and diaper changing facilities')!,
      amenityId: getAmenityId('Hot Water Dispenser')!,
    },
  ]);

  console.warn('✅ Seed data inserted successfully!');
  await dbClient.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  dbClient?.end();
  process.exit(1);
});
