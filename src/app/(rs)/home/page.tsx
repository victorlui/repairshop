import React from "react";
import { redirect } from "next/navigation";

const Home: React.FC = () => {
  redirect("/tickets");
};

export default Home;
