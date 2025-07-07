import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod/v4";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email("Ivalid email address"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digites or 5 digitis followed by a hypehn and 4 digits"
    ),
  phone: (schema) =>
    schema.regex(
      /^\d{2}-\d{3}-\d{4}$/,
      "Invalid phone number. Use XX-XXXXX-XXXX"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
