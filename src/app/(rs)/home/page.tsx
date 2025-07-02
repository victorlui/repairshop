import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

const Home: React.FC = () => {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
};

export default Home;
