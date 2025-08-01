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
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";

//server actions
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerResponse";
import { saveTicketAction } from "@/app/actions/saveTicketAction";

type Props = {
  customer?: SelectCustomerSchemaType;
  ticket?: SelectTicketSchemaType;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
};

export function TicketForm({
  customer,
  ticket,
  techs,
  isEditable = true,
}: Props) {
  const isManager = Array.isArray(techs);

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

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      // toast user
      toast(data.message);
    },
    onError() {
      // toast user
      toast("Save Failed");
    },
  });

  async function submitForm(data: InsertTicketcSchemaType) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Edit Ticket # ${ticket.id}`
            : ticket?.id
            ? `View Ticket # ${ticket.id}`
            : "New Ticket Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketcSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />

            {isManager ? (
              <SelectWithLabel<InsertTicketcSchemaType>
                fieldTitle="Tech ID"
                nameInSchema="tech"
                data={[
                  {
                    id: "new-ticket@example.com",
                    description: "new-ticket@example.com",
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<InsertTicketcSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<InsertTicketcSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer?.firstName} {customer?.lastName}
              </p>
              <p>{customer?.address1}</p>
              {customer?.address2 ? <p>{customer?.address2}</p> : null}
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
              className="h-96"
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
