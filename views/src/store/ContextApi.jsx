import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  return <ContextApi.Provider value={{}}>{children}</ContextApi.Provider>;
};

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
