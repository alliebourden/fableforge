import { useEffect, useState } from "react";
import Layout from "./pages/Layout";
import "./App.css";
import router from "./Routes";
import { RouterProvider, Route } from "react-router-dom";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";
import { SessionContext } from "./components/SessionContext";
import { SessionProvider } from "./components/SessionContext";
import QuestTracker from "./components/QuestTracker";
import QuestTrackerForm from "./components/QuestTrackerForm";
import SelectedQuestDetails from "./components/SelectedQuestDetails";
import CampaignSummary from "./components/CampaignSummary";

const App = () => {
  return (
    <>
      <SessionProvider>
        <RouterProvider router={router}>
          <Route>
            {({ children }) => (
              <Layout>
                {children}
                <SessionEditor />
                <SessionList />
                <QuestTracker />
                <QuestTrackerForm />
                <SelectedQuestDetails />
                <CampaignSummary />
              </Layout>
            )}
          </Route>
        </RouterProvider>
      </SessionProvider>
    </>
  );
};

export default App;
