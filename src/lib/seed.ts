import fs from 'node:fs/promises';
import path from 'node:path';
import { db, dbClient } from '@/libs/DB';
import {
  amenities,
  facilities,
  facilityAmenities,
  facilityTypes,
  locations,
} from '@/models/Schema';
import { sql } from 'drizzle-orm';

async function loadJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'src/data', filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

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

  const locationData = await loadJSON<any[]>('locations.json');
  const insertedLocations = await db.insert(locations).values(locationData).returning();
  const locationMap = Object.fromEntries(insertedLocations.map(l => [l.name, l.id]));

  const facilityTypeData = await loadJSON<any[]>('facilityTypes.json');
  const insertedTypes = await db.insert(facilityTypes).values(facilityTypeData).returning();
  const typeMap = Object.fromEntries(insertedTypes.map(t => [t.name, t.id]));

  const amenityData = await loadJSON<any[]>('amenities.json');
  const insertedAmenities = await db.insert(amenities).values(amenityData).returning();
  const amenityMap = Object.fromEntries(insertedAmenities.map(a => [a.name, a.id]));

  const facilityData = await loadJSON<any[]>('facilities.json');
  const facilitiesToInsert = facilityData
    .map((f) => {
      const locationId = locationMap[f.locationName];
      const facilityTypeId = typeMap[f.facilityTypeName];

      if (locationId === undefined) {
        console.error(`Unknown locationName: ${f.locationName}`);
      }
      if (facilityTypeId === undefined) {
        console.error(`Unknown facilityTypeName: ${f.facilityTypeName}`);
      }

      return locationId !== undefined && facilityTypeId !== undefined
        ? {
            locationId,
            facilityTypeId,
            floor: f.floor,
            isAccessible: f.isAccessible,
            description: f.description,
            hasDiaperChangingStation: f.hasDiaperChangingStation ?? false,
            hasLactationRoom: f.hasLactationRoom ?? false,
          }
        : null;
    })
    .filter((f): f is NonNullable<typeof f> => f !== null); // type guard

  const insertedFacilities = await db.insert(facilities).values(facilitiesToInsert).returning();

  const facilityMap = Object.fromEntries(insertedFacilities.map(f => [f.description, f.id]));

  const facilityAmenityData = await loadJSON<any[]>('facilityAmenities.json');
  await db.insert(facilityAmenities).values(
    facilityAmenityData.flatMap(f =>
      f.amenities.map((a: string) => ({
        facilityId: facilityMap[f.facilityDesc],
        amenityId: amenityMap[a],
      })),
    ),
  );

  console.warn('✅ Seed data inserted successfully!');
  await dbClient.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  dbClient?.end();
  process.exit(1);
});
