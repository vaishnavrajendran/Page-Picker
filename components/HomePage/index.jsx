import React from "react";
import { useEffect } from "react";

import Header from "@/components/Header";
import { getUserDocs } from "@/lib/requests";
import { useState } from "react";
import DocsContainer from "../DocsContainer";

const HomePage = ({ user }) => {
  const [userDocs, setUserDocs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDocs(user.userId);
      setUserDocs(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-slate-700">
      <Header />
      <DocsContainer docs={userDocs} />
    </div>
  );
};

export default HomePage;
