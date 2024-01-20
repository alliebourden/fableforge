import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleAddSession = (newSession) => {
    setSessions((prevSessions) => [...prevSessions, newSession]);
  };

  useEffect(() => console.log(sessions), [sessions]);

  return (
    <SessionContext.Provider
      value={{ sessions, selectedDates, handleAddSession, setSelectedDates }}
    >
      {children}
    </SessionContext.Provider>
  );
};
