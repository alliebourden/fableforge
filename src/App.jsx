import { useState } from "react";
import Layout from "./pages/Layout";
import "./App.css";
import router from "./Routes";
import { RouterProvider, Route } from "react-router-dom";
import SessionEditor from "./components/SessionEditor";

const App = () => {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = async (newSession) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setSessions([...sessions, newSession]);
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <RouterProvider router={router}>
        <Route>
          {({ children }) => (
            <Layout>
              {children}
              <SessionEditor onAddSession={handleAddSession} />
            </Layout>
          )}
        </Route>
      </RouterProvider>
    </>
  );
};

export default App;
