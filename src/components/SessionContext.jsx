import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [npcDescriptions, setNpcDescriptions] = useState([]);

  const handleAddSession = (newSession) => {
    setSessions((prevSessions) => [...prevSessions, newSession]);
  };
  const handleAddQuest = (newQuest) => {
    setQuests((prevQuests) => [...prevQuests, newQuest]);
  };

  const handleSelectQuest = (quest) => {
    setSelectedQuest(quest);
  };

  useEffect(() => console.log(quests), [quests]);
  useEffect(() => console.log(sessions), [sessions]);

  return (
    <SessionContext.Provider
      value={{
        sessions,
        selectedDates,
        handleAddSession,
        setSelectedDates,
        quests,
        handleAddQuest,
        selectedQuest,
        handleSelectQuest,
        apiKey,
        setApiKey,
        npcDescriptions,
        setNpcDescriptions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
