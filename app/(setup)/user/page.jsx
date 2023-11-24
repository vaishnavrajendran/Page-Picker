"use client"
import React from "react";
import { useSearchParams } from "next/navigation";

const SelectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("ID", id);
  return <div>SelectPage</div>;
};

export default SelectPage;
