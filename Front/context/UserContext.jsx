import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function setUserInfo(userInfo) {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  function isUserInfoSaved() {
    let userInfo = localStorage.getItem("user");
    setUser(JSON.parse(userInfo));
  }

  function removeUserInfo() {
    localStorage.removeItem("user");
  }

  useEffect(() => {
    isUserInfoSaved();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserInfo, removeUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
