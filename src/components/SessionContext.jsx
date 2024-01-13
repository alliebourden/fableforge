import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const handleAddSession = async (newSession) => {
    setSessions([...sessions, newSession]);
  };
  useEffect(() => console.log(sessions), [sessions]);
  return (
    <SessionContext.Provider value={{ sessions, handleAddSession }}>
      {children}
    </SessionContext.Provider>
  );
};
