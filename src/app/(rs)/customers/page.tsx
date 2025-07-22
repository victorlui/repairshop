import { Metadata } from "next";
import React from "react";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";

export const metadata: Metadata = {
  title: "Customers",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const results = await getCustomerSearchResults(searchText);

  return (
    <div>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
};

export default Customers;
