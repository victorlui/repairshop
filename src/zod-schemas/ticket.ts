import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod/v4";

export const insertTicketcSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.min(1, "Title is required"),
  description: (schema) => schema.min(1, "Description is required"),
  tech: (schema) => schema.email("Invalid email address"),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type InsertTicketcSchemaType = z.infer<typeof insertTicketcSchema>;
export type SelectTicketSchemaType = z.infer<typeof selectTicketSchema>;
