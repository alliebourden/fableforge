import { useState } from "react";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import Layout from "./pages/Layout";
import "./App.css";
import router from "./Routes";
import { RouterProvider, Route } from "react-router-dom";

const App = () => {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <>
      <RouterProvider router={router}>
        <Route>{({ children }) => children}</Route>
      </RouterProvider>
    </>
  );
};

export default App;
