import React from "react";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="appear">{children}</div>;
}
