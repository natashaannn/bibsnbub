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

  console.warn('✅ Data cleared successfully!');
  await dbClient.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Clearing data failed:', err);
  dbClient?.end();
  process.exit(1);
});
