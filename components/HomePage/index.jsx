import React from "react";

import Header from "@/components/Header";
import DocsContainer from "../DocsContainer";
import { getDocs } from "@/providers/DocsProvider";

const HomePage = () => {
  const { docs } = getDocs();

  return (
    <div className="w-full min-h-screen bg-slate-700">
      <Header />
      <DocsContainer docs={docs} />
    </div>
  );
};

export default HomePage;
