import { useState } from "react";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import Layout from "./pages/Layout";

const App = () => {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <div>
      <SessionForm onAddSession={handleAddSession} />
      <SessionList sessions={sessions} />
    </div>
  );
};

export default App;
