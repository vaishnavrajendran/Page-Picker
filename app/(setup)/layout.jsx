import Header from "../../components/Header";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-700">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
