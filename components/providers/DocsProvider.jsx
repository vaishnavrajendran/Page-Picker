"use client";
import { useContext, createContext, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";

import { getUserDocs } from "@/lib/requests";

const DocsContext = createContext();

export const useDocs = () => {
  return useContext(DocsContext);
};

export const DocsProvider = ({ children }) => {
  const [docs, setDocs] = useState([]);
  const { user } = useClerk();
  const id = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserDocs(id);
        setDocs(data);
      }
    };

    fetchData();
  }, [id]);

  const pushDocs = (updatedDocs) => {
    setDocs((prev) => [...prev, updatedDocs]);
  };

  return (
    <DocsContext.Provider value={{ docs, pushDocs }}>
      {children}
    </DocsContext.Provider>
  );
};
