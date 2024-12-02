import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [openUserList, setOpenUserList] = useState(false);

  return (
    <ContextApi.Provider value={{ openUserList, setOpenUserList }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
