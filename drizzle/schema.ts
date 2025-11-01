import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table - stores the 16 travel categories
 */
export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 50 }).primaryKey(),
  icon: varchar("icon", { length: 10 }).notNull(),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Translations table - stores multilingual content for categories
 * Supports English, Korean, Chinese, Japanese
 */
export const translations = mysqlTable("translations", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: varchar("categoryId", { length: 50 }).notNull(),
  language: mysqlEnum("language", ["en", "ko", "zh", "ja"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: text("subtitle").notNull(),
  overview: text("overview").notNull(),
  sections: json("sections").notNull(), // Array of {title, content, links}
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = typeof translations.$inferInsert;

/**
 * Advertisements table - stores ad data for top carousel, bottom grid, and in-content ads
 */
export const advertisements = mysqlTable("advertisements", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["top_slot", "bottom_box", "in_content"]).notNull(),
  position: int("position").notNull(), // Order/position of the ad
  imageUrl: text("imageUrl").notNull(),
  linkUrl: text("linkUrl").notNull(),
  language: mysqlEnum("language", ["en", "ko", "zh", "ja"]).notNull(),
  text: text("text").notNull(), // Ad text/description
  categoryId: varchar("categoryId", { length: 50 }), // For in-content ads only
  active: int("active").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Advertisement = typeof advertisements.$inferSelect;
export type InsertAdvertisement = typeof advertisements.$inferInsert;
