import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";
import QuestTracker from "./components/QuestTracker";
import QuestTrackerForm from "./components/QuestTrackerForm";
import LootManager from "./components/LootManagerTable";
import CampaignSummary from "./components/CampaignSummary";

export const paths = {
  dashboard: "/fableforge/dashboard",
  campaignsummary: "fableforge/campaign-summary",
};

const router = createBrowserRouter([
  {
    path: "/fableforge",
    element: <Layout />,
    children: [
      { path: paths.dashboard, element: <Dashboard /> },
      {
        path: paths.campaignsummary,
        element: (
          <div>
            <CampaignSummary />
          </div>
        ),
      },
      {
        path: "/fableforge/quest-tracker",
        element: (
          <div>
            <QuestTracker />
          </div>
        ),
      },
      {
        path: "/fableforge/loot-manager",
        element: (
          <div>
            <LootManager />
          </div>
        ),
      },
      {
        path: "/fableforge/session-editor",
        element: (
          <div>
            <SessionEditor />
          </div>
        ),
      },
      {
        path: "/fableforge/session-list",
        element: (
          <div>
            <SessionList />
          </div>
        ),
      },
      {
        path: "/fableforge/quest-tracker-form",
        element: (
          <div>
            <QuestTrackerForm />
          </div>
        ),
      },
    ],
  },
]);

export default router;
