import { createContext, useContext, useState } from "react";

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

  const handleRemoveQuest = (questToRemove) => {
    setQuests((prevQuests) =>
      prevQuests.filter((quest) => quest !== questToRemove)
    );
    if (selectedQuest === questToRemove) {
      setSelectedQuest(null);
    }
  };

  const handleSelectQuest = (quest) => {
    setSelectedQuest(quest);
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        selectedDates,
        handleAddSession,
        setSelectedDates,
        quests,
        handleAddQuest,
        handleRemoveQuest,
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
