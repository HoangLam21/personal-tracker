// context/UserContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const defaultUser: User = {
  name: "",
  avatar: "",
  email: "",
  phoneNumber: ""
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
