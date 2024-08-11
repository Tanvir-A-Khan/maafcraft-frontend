"use client"
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const tokenData = typeof localStorage !== "undefined" ? localStorage.getItem("auth") : null;
  // console.log("tokendata", tokenData);

  const emailData = typeof  localStorage !== "undefined" ? localStorage.getItem("email") : null;
  // console.log("context email", emailData);
  const [globalState, setGlobalState] = useState(tokenData);
  const [token, setToken] = useState(emailData);

  useEffect(() => {
    setGlobalState(tokenData); // Update globalState when tokenData changes
  }, [tokenData]);

  return (
    <StateContext.Provider value={{ globalState, setGlobalState, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);