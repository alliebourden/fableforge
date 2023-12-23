import { useState } from "react";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <div>
      <Layout />
      <Dashboard />
      {/* <SessionForm onAddSession={handleAddSession} />
      <SessionList sessions={sessions} /> */}
    </div>
  );
};

export default App;
