import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const User = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  otp: varchar("otp", { length: 6 }),
  otpExpiry: timestamp("otp_expiry", { mode: "string" }).default(null),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default User;

export const getUserInfo = ({
  otp,
  otpExpiry,
  updatedAt,
  createdAt,
  ...rest
}: typeof User.$inferSelect) => rest;
