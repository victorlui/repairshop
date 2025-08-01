import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  console.log("api", customer);
  return customer[0];
}
