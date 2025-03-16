import { boolean, integer, pgTable, primaryKey, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// 1️⃣ Locations table (nursing & family rooms)
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', '255').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  accessible: boolean('accessible').default(false),
  hasChangingTable: boolean('has_changing_table').default(false),
  hasPrivateNursingArea: boolean('has_private_nursing_area').default(false),
  rating: integer('rating').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2️⃣ Reviews table (user-submitted ratings & comments)
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  locationId: integer('location_id').notNull().references(() => locations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // Clerk's user ID
  rating: integer('rating').notNull().default(3),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3️⃣ Favorites table (allow users to save locations)
export const favorites = pgTable(
  'favorites',
  {
    userId: text('user_id').notNull(),
    locationId: integer('location_id').notNull().references(() => locations.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.locationId] }),
    };
  },
);
