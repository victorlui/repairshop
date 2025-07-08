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
import { InputWithLabel } from "@/components/inputs/inputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";

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
          className="flex flex-col md:flex-row gap-4 sm:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketcSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />
            <InputWithLabel<InsertTicketcSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled
            />

            <CheckboxWithLabel<InsertTicketcSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer?.firstName} {customer?.lastName}
              </p>
              <p>{customer?.address1}</p>
              <p>{customer?.address2 ? <p>{customer.address2}</p> : null}</p>
              <p>
                {customer?.city}, {customer?.state} {customer?.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer?.email}</p>
              <p>Phone: {customer?.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<InsertTicketcSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              clasName="h-40"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
