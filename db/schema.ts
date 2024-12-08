import { 
  pgTable, 
  text, 
  timestamp, 
  integer,
  real,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const serviceProviders = pgTable("service_providers", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // in minutes
  price: real("price"),
  providerId: text("provider_id")
    .notNull()
    .references(() => serviceProviders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const availabilities = pgTable("availabilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday-Saturday)
  startTime: text("start_time").notNull(), // Format: HH:mm
  endTime: text("end_time").notNull(), // Format: HH:mm
  providerId: text("provider_id")
    .notNull()
    .references(() => serviceProviders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blockedTimes = pgTable("blocked_times", {
  id: uuid("id").defaultRandom().primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  reason: text("reason"),
  providerId: text("provider_id")
    .notNull()
    .references(() => serviceProviders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calendarConnections = pgTable("calendar_connections", {
  id: uuid("id").defaultRandom().primaryKey(),
  provider: text("provider").notNull(), // 'google' | 'apple' | 'outlook'
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  providerId: text("provider_id")
    .notNull()
    .references(() => serviceProviders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const customers = pgTable("customers", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull(), // 'pending' | 'confirmed' | 'cancelled'
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id),
  customerId: text("customer_id").references(() => customers.id),
  guestEmail: text("guest_email"),
  guestName: text("guest_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const serviceProvidersRelations = relations(serviceProviders, ({ many }) => ({
  services: many(services),
  availabilities: many(availabilities),
  blockedTimes: many(blockedTimes),
  calendarConnections: many(calendarConnections),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  serviceProvider: one(serviceProviders, {
    fields: [services.providerId],
    references: [serviceProviders.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
  customer: one(customers, {
    fields: [bookings.customerId],
    references: [customers.id],
  }),
})); 