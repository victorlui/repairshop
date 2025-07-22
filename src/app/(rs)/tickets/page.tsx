import { Metadata } from "next";
import React from "react";
import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResult } from "@/lib/queries/getTicketSearchResults";

export const metadata: Metadata = {
  title: "Tickets Search",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  const results = await getTicketSearchResult(searchText);

  return (
    <div>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
};

export default Tickets;
