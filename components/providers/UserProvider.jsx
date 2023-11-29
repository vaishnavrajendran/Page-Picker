"use client";
import { useContext, createContext, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";

import { loadUser } from "@/lib/requests";

const UserContext = createContext();

export const useUserData = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useClerk();
  const id = user?.id
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { fullName, id, imageUrl } = user;
        const data = await loadUser({ fullName, id, imageUrl });
        setCurrentUser(data);
      }
    };

    fetchData();
  }, [id]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
