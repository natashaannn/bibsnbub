import { boolean, integer, numeric, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// --- Location Table ---
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  address: text('address').notNull(),
  latitude: numeric('latitude', { precision: 9, scale: 6 }).notNull(),
  longitude: numeric('longitude', { precision: 9, scale: 6 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Facility Types ---
export const facilityTypes = pgTable('facility_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

// --- Amenities ---
export const amenities = pgTable('amenities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

// --- Facilities ---
export const facilities = pgTable('facilities', {
  id: serial('id').primaryKey(),
  locationId: integer('location_id').notNull().references(() => locations.id, { onDelete: 'cascade' }),
  facilityTypeId: integer('facility_type_id').notNull().references(() => facilityTypes.id, { onDelete: 'cascade' }),
  floor: varchar('floor', { length: 50 }),
  isAccessible: boolean('is_accessible').default(false),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  hasDiaperChangingStation: boolean('has_diaper_changing_station').default(true),
  hasLactationRoom: boolean('has_lactation_room').default(false),
});

// --- Facility <-> Amenities Many-to-Many Join Table ---
export const facilityAmenities = pgTable('facility_amenities', {
  facilityId: integer('facility_id').notNull().references(() => facilities.id, { onDelete: 'cascade' }),
  amenityId: integer('amenity_id').notNull().references(() => amenities.id, { onDelete: 'cascade' }),
});
