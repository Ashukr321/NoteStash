import React, { createContext, useContext, useState, useEffect } from "react";
import userServices from "@/services/users/users.services";

// Define the user type based on your API response
type UserType = { user?: { UserName?: string; email?: string } };

type UserContextType = {
  userInfo: UserType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType>>;
  refreshUserInfo: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserType>({});

  const refreshUserInfo = async () => {
    const data = await userServices.getUserInfo();
    setUserInfo(data);
  };

  useEffect(() => {
    refreshUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, refreshUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
