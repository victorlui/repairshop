"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  insertTicketcSchema,
  InsertTicketcSchemaType,
  SelectTicketSchemaType,
} from "@/zod-schemas/ticket";
import { SelectCustomerSchemaType } from "@/zod-schemas/customer";
import { Form } from "@/components/ui/form";

type Props = {
  customer?: SelectCustomerSchemaType;
  ticket?: SelectTicketSchemaType;
};

export function TicketForm({ customer, ticket }: Props) {
  const defaultValues: InsertTicketcSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer?.id ?? 0,
    title: ticket?.description ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<InsertTicketcSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketcSchema),
    defaultValues,
  });

  async function submitForm(data: InsertTicketcSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Edit" : "New"} Ticket{" "}
          {ticket?.id ? `# ${ticket.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
}
