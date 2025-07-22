import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod/v4";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "Primeiro nome é obrigatório"),
  lastName: (schema) => schema.min(1, "Sobrenome é obrigatório"),
  address1: (schema) => schema.min(1, "Endereço é obrigatório"),
  city: (schema) => schema.min(1, "Cidade é obrigatória"),
  state: (schema) => schema.length(2, "UF deve ter exatamente 2 caracteres"),
  email: (schema) => schema.email("E-mail inválido"),
  zip: (schema) =>
    schema.regex(/^\d{5}\d{3}$/, "CEP inválido. Use o formato 00000000"),
  phone: (schema) => schema.min(1, "Celular é obrigatório"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
